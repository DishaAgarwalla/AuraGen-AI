const API_URL = "http://localhost:3001";

export async function submitFinancialForm(data: unknown) {
  const response = await fetch(`${API_URL}/api/form`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit form");
  }

  return response.json();
}