type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl border border-gray-200 p-8">
      {children}
    </div>
  );
}