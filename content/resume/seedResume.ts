import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const googleApiKey = process.env.GOOGLE_API_KEY;

async function main() {
  if (!supabaseUrl || !supabaseServiceKey || !googleApiKey) {
    throw new Error("Missing env vars for Supabase or Gemini");
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // 1. Load resume text
  const filePath = path.join(__dirname, "resume.md");
  const fileContents = await fs.readFile(filePath, "utf8");

  // 2. Split into chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 200,
  });

  const docs = await splitter.createDocuments([fileContents], [
    { source: "resume" },
  ]);

  // 3. Setup embeddings (Gemini)
  const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: googleApiKey,
  modelName: "text-embedding-004",
});

  // 4. Store via LangChain SupabaseVectorStore
  await SupabaseVectorStore.fromDocuments(docs, embeddings, {
    client: supabase,
    tableName: "resume_chunks",
  });

  console.log("Resume ingested into Supabase vector table");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
