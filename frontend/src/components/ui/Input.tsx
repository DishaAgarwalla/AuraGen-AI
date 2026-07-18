"use client";

type InputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  onFocus?: (
    e: React.FocusEvent<HTMLInputElement>
  ) => void;

  onBlur?: (
    e: React.FocusEvent<HTMLInputElement>
  ) => void;
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
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-medium text-slate-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          shadow-sm
          transition-all
          duration-200
          outline-none

          hover:border-blue-400

          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
        "
      />
    </div>
  );
}