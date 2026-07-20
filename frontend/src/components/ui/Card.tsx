type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        w-full
        max-w-4xl
        mx-auto
        rounded-3xl
        bg-white/90
        backdrop-blur-xl
        shadow-2xl
        border
        border-slate-200/50
        p-8
        sm:p-10
        lg:p-12
        transition-all
        duration-300
        hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.15)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}