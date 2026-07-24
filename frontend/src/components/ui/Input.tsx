"use client";

import { useState } from "react";

type InputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: string;
};

export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  required = false,
  icon,
}: InputProps) {
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
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
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
            placeholder-gray-400
            ${icon ? 'pl-10' : ''}
            ${isFocused 
              ? 'border-blue-500 ring-4 ring-blue-100' 
              : 'border-gray-200 hover:border-gray-300'
            }
          `}
          required={required}
        />
      </div>
    </div>
  );
}