type CheckboxProps = {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({
  label,
  name,
  checked,
  onChange,
}: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="
          w-5 h-5
          rounded
          border-gray-300
          text-blue-600
          focus:ring-2
          focus:ring-blue-500
          focus:ring-offset-0
          cursor-pointer
          transition-all
        "
      />
      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
        {label}
      </span>
    </label>
  );
}