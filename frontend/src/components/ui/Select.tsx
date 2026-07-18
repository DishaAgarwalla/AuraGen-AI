"use client";

type SelectProps = {
  label: string;
  name: string;
  value: string;

  options: string[];

  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
};

export default function Select({
  label,
  name,
  value,
  options,
  onChange,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-medium text-slate-700"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
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
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}