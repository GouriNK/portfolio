// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  GoogleGenerativeAIEmbeddings,
  ChatGoogleGenerativeAI,
} from "@langchain/google-genai";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userQuestion: string = body.question;

    if (!userQuestion) {
      return NextResponse.json({ error: "Missing question" }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "text-embedding-004",
    });

    const vectorStore = new SupabaseVectorStore(embeddings, {
      client: supabase,
      tableName: "resume_chunks",
      queryName: "match_resume_chunks",
    });

    const relevantDocs = await vectorStore.similaritySearch(userQuestion, 5);

    const context = relevantDocs
      .map((d) => d.pageContent)
      .join("\n\n---\n\n");

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",  // valid as per LangChain docs
      temperature: 0.2,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
         {
          category: HarmCategory.HARM_CATEGORY_CIVIC_INTEGRITY,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        }
      ],
    });

    const systemPrompt = `
      You are a personal assistant chatbot on AG's portfolio website.
      You ONLY answer based on the provided resume context.
      If something is not in the context, say you don't know and that the info is not in the resume.

      Context:
      ${context}
      `;

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", systemPrompt],
      ["human", "{question}"],
    ]);

    const messages = await prompt.formatMessages({ question: userQuestion });

    const response = await model.invoke(messages);

    let answer: string;
    if (typeof response.content === "string") {
      answer = response.content;
    } else {
      answer = response.content
        .map((part: any) => (typeof part === "string" ? part : part.text ?? ""))
        .join(" ");
    }

    return NextResponse.json({
      answer,
      sources: relevantDocs.map((d) => d.metadata),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
