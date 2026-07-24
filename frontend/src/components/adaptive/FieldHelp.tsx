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
  const [isVisible, setIsVisible] = useState(false);

  const handleExplain = async () => {
    if (help) {
      setIsVisible(!isVisible);
      return;
    }

    try {
      setLoading(true);
      const response = await generateAIResponse(
        `Explain the financial form field "${fieldName}" in simple language for a beginner. Keep the explanation under 40 words.`
      );
      setHelp(response.response || response.message || "No explanation available.");
      setIsVisible(true);
    } catch (error) {
      console.error("Explain Field Error:", error);
      setHelp("Sorry, an explanation could not be generated.");
      setIsVisible(true);
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
          text-xs
          font-medium
          text-blue-500
          hover:text-blue-700
          transition-colors
          disabled:opacity-50
          disabled:cursor-not-allowed
          flex
          items-center
          gap-1.5
          group
        "
      >
        <span className="text-sm group-hover:scale-110 transition-transform">
          {help && isVisible ? "🔽" : "❓"}
        </span>
        {loading ? (
          <>
            <span className="animate-spin inline-block w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full" />
            Generating...
          </>
        ) : (
          help && isVisible ? "Hide explanation" : "What is this field?"
        )}
      </button>

      {help && isVisible && (
        <div
          className="
            mt-2
            rounded-lg
            border
            border-blue-200/60
            bg-gradient-to-br
            from-blue-50/80
            to-indigo-50/60
            p-3
            text-sm
            text-gray-700
            shadow-sm
            fade-in
          "
        >
          <div className="flex items-start gap-2">
            <span className="text-blue-500 text-sm mt-0.5">💡</span>
            <span>{help}</span>
          </div>
        </div>
      )}
    </div>
  );
}