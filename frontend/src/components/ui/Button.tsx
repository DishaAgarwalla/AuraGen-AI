type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
};

export default function Button({
  text,
  type = "button",
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className="
        w-full
        rounded-xl
        bg-blue-600
        px-6
        py-3.5
        text-white
        font-semibold
        shadow-md
        transition-all
        duration-300
        hover:bg-blue-700
        hover:shadow-lg
        disabled:bg-gray-400
        disabled:cursor-not-allowed
        active:scale-[0.98]
      "
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div
            className="
              h-4
              w-4
              animate-spin
              rounded-full
              border-2
              border-white
              border-t-transparent
            "
          />

          <span>Processing...</span>
        </div>
      ) : (
        text
      )}
    </button>
  );
}