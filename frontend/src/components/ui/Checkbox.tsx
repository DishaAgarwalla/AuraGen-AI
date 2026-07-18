type CheckboxProps = {
  label: string;
  name: string;
  checked: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

export default function Checkbox({
  label,
  name,
  checked,
  onChange,
}: CheckboxProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="
          mt-1
          h-5
          w-5
          rounded
          border-gray-300
          text-blue-600
          focus:ring-2
          focus:ring-blue-400
        "
      />

      <span className="text-gray-700 leading-6">
        {label}
      </span>
    </label>
  );
}