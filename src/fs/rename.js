import { fileURLToPath } from "url";
import { promises as fs } from "fs";
import { dirname, join } from "path";

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const currentFolderPath = join(__dirname, "files");
  const filePath = join(currentFolderPath, "wrongFilename.txt");
  const newFilePath = join(currentFolderPath, "properFilename.md");

  try {
    try {
      await fs.access(filePath, fs.constants.F_OK);
      await fs.rename(filePath, newFilePath);
      console.log(`File ${filePath} was renamed to ${newFilePath}`);
    } catch (error) {
        throw error;
    }
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await rename();
