export function validateGeneratedCode(
  code: string
): boolean {

  console.log("====================================");
  console.log("🛡 AST Validator");
  console.log("====================================");

  if (!code || code.trim().length === 0) {
    console.log("❌ Empty generated code.");
    return false;
  }

  //--------------------------------------------------
  // Dangerous patterns
  //--------------------------------------------------

  const blockedPatterns = [
    "eval(",
    "Function(",
    "document.write",
    "innerHTML",
    "<script",
    "window.location",
    "localStorage.clear",
    "sessionStorage.clear",
    "fetch(",
    "XMLHttpRequest",
  ];

  for (const pattern of blockedPatterns) {
    if (code.includes(pattern)) {
      console.log(`❌ Blocked Pattern: ${pattern}`);
      return false;
    }
  }

  //--------------------------------------------------
  // Basic React checks
  //--------------------------------------------------

  const requiredPatterns = [
    "export default",
    "function",
    "return",
  ];

  for (const pattern of requiredPatterns) {
    if (!code.includes(pattern)) {
      console.log(`❌ Missing Pattern: ${pattern}`);
      return false;
    }
  }

  console.log("✅ Generated React Component Passed Validation");

  return true;
}