import FinancialForm from "@/components/forms/FinancialForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 py-12 px-4">
      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-10 text-center">

          <h1 className="text-5xl font-extrabold text-blue-700">
            AuraGen
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            AI-Powered Self-Healing User Interface
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-gray-500">
            AuraGen continuously observes user interaction,
            estimates cognitive load, and dynamically
            simplifies complex interfaces using Generative AI.
          </p>

        </div>

        {/* Main Form */}

        <FinancialForm />

        {/* Footer */}

        <footer className="mt-12 text-center text-sm text-gray-500">
          Built with ❤️ using Next.js, TypeScript,
          LangChain, Groq and Socket.IO
        </footer>

      </div>
    </main>
  );
}