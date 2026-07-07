type SelectProps = {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
      <label className="font-medium text-gray-700">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-lg px-4 py-3"
      >
        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}