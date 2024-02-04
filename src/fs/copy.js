import { fileURLToPath } from "url";
import { promises as fs } from "fs";
import { dirname, join } from "path";

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const newFolderPath = join(__dirname, "files_copy");
  const oldFolderPath = join(__dirname, "files");

  try {
    try {
      await fs.access(newFolderPath);
      throw new Error("FS operation failed");
    } catch (error) {
      if (error.code === "ENOENT") {
        fs.mkdir("files_copy");
        console.log("Folder created successfully!");
      } else {
        throw new Error("FS operation failed");
      }
    }

    const files = await fs.readdir(oldFolderPath, { withFileTypes: true });
    await Promise.all(
      files.map(async (file) => {
        const oldPath = join(oldFolderPath, file.name);
        const newPath = join(newFolderPath, file.name);
        if (file.isDirectory()) {
          await fs.copyFolder(oldPath, newPath);
        } else {
          await fs.writeFile(newPath, await fs.readFile(oldPath));
        }
      })
    );
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await copy();