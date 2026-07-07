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
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />

      <span>{label}</span>
    </label>
  );
}