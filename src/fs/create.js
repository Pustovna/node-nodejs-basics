import { fileURLToPath } from "url";
import { access, writeFile } from "fs/promises";
import { dirname, join } from "path";

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const filePath = join(__dirname, "files", "fresh.txt");

  try {
    await access(filePath);
    throw new Error("FS operation failed: File already exists");
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(filePath, "I am fresh and young");
      console.log("File created successfully");
    } else {
      throw error;
    }
  }
};

await create();
