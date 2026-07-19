"use client";

import { useState } from "react";
import { generateAIResponse } from "@/services/api";

interface Props {
  fieldName: string;
}

export default function FieldHelp({
  fieldName,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [help, setHelp] = useState("");

  const handleExplain = async () => {
    try {
      setLoading(true);

      const response = await generateAIResponse(
  `Explain the financial form field "${fieldName}" in simple language for a beginner. Keep the explanation under 40 words.`
);

setHelp(response.response);
    } catch (error) {
      console.error("Explain Field Error:", error);

      setHelp(
        "Sorry, an explanation could not be generated."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={handleExplain}
        disabled={loading}
        className="
          text-sm
          font-medium
          text-blue-600
          hover:text-blue-800
          hover:underline
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        {loading ? "Generating..." : "❓ What is this field?"}
      </button>

      {help && (
        <div
          className="
            mt-3
            rounded-lg
            border
            border-blue-200
            bg-blue-50
            p-3
            text-sm
            text-gray-700
            shadow-sm
          "
        >
          {help}
        </div>
      )}
    </div>
  );
}