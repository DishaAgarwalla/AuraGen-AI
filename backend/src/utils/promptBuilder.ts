import { CognitiveLoadResult } from "./cognitiveLoad";

export function buildUIPrompt(
  formDescription: string,
  analysis: CognitiveLoadResult
): string {
  return `
You are an expert UX Designer.

The user is struggling to complete the following form.

----------------------------------------
COGNITIVE LOAD
----------------------------------------

Score: ${analysis.score}

Status: ${analysis.status}

Reasons:

${analysis.reasons.map((r) => `- ${r}`).join("\n")}

----------------------------------------
FORM
----------------------------------------

${formDescription}

----------------------------------------
TASK
----------------------------------------

Simplify this form.

Requirements:

- Reduce cognitive load.
- Convert into a multi-step wizard.
- Group related fields.
- Hide optional fields.
- Improve readability.
- Keep all mandatory fields.
- Return only the simplified UI structure.
`;
}