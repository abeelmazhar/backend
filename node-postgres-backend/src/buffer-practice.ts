// ============================================
// Stream Practice: large.txt → Readable → Writable → copy.txt
// ============================================

import { createReadStream, createWriteStream } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourcePath = join(__dirname, "large.txt");
const destPath = join(__dirname, "copy.txt");

// 1. Create a Readable stream from the source file
//    highWaterMark = max bytes per chunk (small so you can see multiple chunks)
const readable = createReadStream(sourcePath, {
  highWaterMark: 32, // 32 bytes per chunk (for learning)
});

// 2. Create a Writable stream to the destination file
const writable = createWriteStream(destPath);

let chunkCount = 0;

console.log("1. Source file:", sourcePath);
console.log("2. Destination:", destPath);
console.log("---");
console.log("3. Reading chunks from Readable...\n");

// 3. Each time data is ready, Readable emits a "data" event (a Buffer chunk)
readable.on("data", (chunk: string | Buffer) => {
  chunkCount += 1;
  const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);

  console.log(`   Chunk #${chunkCount}`);
  console.log(`   bytes: ${buf.length}`);
  console.log(`   hex:   ${buf.toString("hex")}`);
  console.log(`   text:  ${JSON.stringify(buf.toString("utf-8"))}`);
  console.log("");

  // 4. Write that chunk into the Writable stream
  writable.write(buf);
});

// 5. When Readable finishes, close the Writable
readable.on("end", () => {
  writable.end();
  console.log("---");
  console.log(`4. Readable finished. Total chunks: ${chunkCount}`);
  console.log("5. Writable closed → copy.txt created");
});

readable.on("error", (err) => {
  console.error("Readable error:", err.message);
});

writable.on("error", (err) => {
  console.error("Writable error:", err.message);
});

writable.on("finish", () => {
  console.log("6. Done! Open src/copy.txt to verify the copy.");
});
