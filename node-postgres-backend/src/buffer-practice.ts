// ============================================
// Buffer Practice: String → Buffer → Bytes → String
// ============================================

// 1. Start with a normal JavaScript string
const text = "Hello Stream";
console.log("1. Original string:", text);
console.log("   Type:", typeof text);
console.log("---");

// 2. Convert string → Buffer
//    Buffer holds raw binary data (bytes).
//    'utf-8' is the encoding: how characters map to bytes.
const buf = Buffer.from(text, "utf-8");
console.log("2. Buffer:", buf);
console.log("   Length (bytes):", buf.length);
console.log("---");

// 3. Print each byte
//    Each character becomes one or more numbers (0–255).
//    For English letters, one character ≈ one byte.
console.log("3. Bytes (decimal):");
for (let i = 0; i < buf.length; i++) {
  const byte = buf[i];
  const char = String.fromCharCode(byte!);
  console.log(`   index ${i}: byte=${byte}  char='${char}'`);
}
console.log("---");

// Also show bytes as hex (common when debugging streams)
console.log("   Bytes (hex):", buf.toString("hex"));
console.log("---");

// 4. Convert Buffer → string again
const backToString = buf.toString("utf-8");
console.log("4. Back to string:", backToString);
console.log("   Same as original?", backToString === text);
