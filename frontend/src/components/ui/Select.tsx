"use client";

import { useState } from "react";

type SelectProps = {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
};

export default function Select({
  label,
  name,
  value,
  options,
  onChange,
  required = false,
}: SelectProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full
            px-4
            py-2.5
            border-2
            rounded-xl
            transition-all
            duration-200
            outline-none
            bg-white
            text-gray-800
            appearance-none
            cursor-pointer
            ${isFocused 
              ? 'border-blue-500 ring-4 ring-blue-100' 
              : 'border-gray-200 hover:border-gray-300'
            }
          `}
          required={required}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isFocused ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}