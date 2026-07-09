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
        className="font-medium text-gray-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete="off"
        className="
          border
          border-gray-300
          rounded-lg
          px-4
          py-3
          outline-none
          transition
          duration-200
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
        "
      />
    </div>
  );
}