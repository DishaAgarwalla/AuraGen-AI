type CardProps = {
  children: React.ReactNode;
};

export default function Card({
  children,
}: CardProps) {
  return (
    <div
      className="
        w-full
        max-w-5xl
        rounded-3xl
        bg-white
        shadow-2xl
        border
        border-slate-200
        p-8
        md:p-10
        transition-all
      "
    >
      {children}
    </div>
  );
}