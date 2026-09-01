"use client"; 

import { useState } from "react";
import { submitFinancialForm } from "@/services/api";
import useTelemetry from "@/hooks/useTelemetry";
import { useSocket } from "@/hooks/useSocket";
import useAdaptiveUI from "@/hooks/useAdaptiveUI";

export default function PremiumForm() {
  useTelemetry();
  useSocket();
  const { adaptiveUI } = useAdaptiveUI();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    occupation: "",
    income: "",
    pan: "",
    account: "",
    ifsc: "",
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.terms) {
      alert("Please accept the terms");
      return;
    }
    setLoading(true);
    try {
      await submitFinancialForm(form);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Step indicators
  const steps = [
    { number: 1, label: "Personal", icon: "👤" },
    { number: 2, label: "Professional", icon: "💼" },
    { number: 3, label: "Financial", icon: "💰" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Brand Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow-sm border border-gray-200/50 mb-6">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">AI Powered</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AuraGen
            </span>
          </h1>
          <p className="text-gray-500 mt-2 text-lg">Intelligent Financial Onboarding</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100/80 overflow-hidden">
          {/* Top Progress Section */}
          <div className="px-10 pt-10 pb-8 bg-gradient-to-br from-blue-50/50 to-purple-50/50 border-b border-gray-100">
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-6">
              {steps.map((s, idx) => (
                <div key={s.number} className="flex items-center">
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold transition-all
                      ${step === s.number 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                        : step > s.number 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                      }
                    `}>
                      {step > s.number ? '✓' : s.icon}
                    </div>
                    <div className="hidden sm:block">
                      <p className={`text-xs font-medium ${step === s.number ? 'text-blue-600' : 'text-gray-400'}`}>
                        Step {s.number}
                      </p>
                      <p className={`text-sm font-semibold ${step === s.number ? 'text-gray-800' : 'text-gray-400'}`}>
                        {s.label}
                      </p>
                    </div>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-12 md:w-20 h-0.5 mx-2 bg-gray-200 relative">
                      <div className={`h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ${step > idx + 1 ? 'w-full' : 'w-0'}`} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Progress</span>
                <span className="font-semibold text-blue-600">{((step / 3) * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-gray-200/80 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-700 rounded-full"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Cognitive Load */}
            {adaptiveUI && (
              <div className="mt-4 flex items-center gap-4 text-sm bg-white/60 backdrop-blur rounded-xl px-4 py-2.5 border border-gray-200/50">
                <span className="text-gray-600">🧠 Cognitive Load</span>
                <span className={`px-3 py-0.5 rounded-full text-xs font-semibold ${
                  adaptiveUI.status === "HIGH" ? "bg-red-100 text-red-700" :
                  adaptiveUI.status === "MEDIUM" ? "bg-yellow-100 text-yellow-700" :
                  "bg-green-100 text-green-700"
                }`}>
                  {adaptiveUI.status}
                </span>
                <span className="text-gray-400 text-xs">{adaptiveUI.cognitiveScore}/100</span>
                {adaptiveUI.status === "HIGH" && (
                  <span className="text-xs text-blue-600 font-medium">⚡ Adaptive UI Active</span>
                )}
              </div>
            )}
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit}>
            <div className="px-10 py-10">
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <span className="text-3xl">👤</span>
                    Personal Information
                  </h3>
                  <p className="text-gray-500 text-sm -mt-2">Tell us about yourself</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-gray-800 placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-gray-800 placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 890"
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-gray-800 placeholder-gray-400"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="dob"
                        type="date"
                        value={form.dob}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-gray-800"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <span className="text-3xl">💼</span>
                    Professional Details
                  </h3>
                  <p className="text-gray-500 text-sm -mt-2">Your career and income information</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Occupation <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="occupation"
                        value={form.occupation}
                        onChange={handleChange}
                        placeholder="Software Engineer"
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-gray-800 placeholder-gray-400"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Annual Income (₹) <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="income"
                        value={form.income}
                        onChange={handleChange}
                        placeholder="10,00,000"
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-gray-800 placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <span className="text-3xl">💰</span>
                    Financial Information
                  </h3>
                  <p className="text-gray-500 text-sm -mt-2">Banking and tax details</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        PAN Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="pan"
                        value={form.pan}
                        onChange={handleChange}
                        placeholder="ABCDE1234F"
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-gray-800 placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Bank Account <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="account"
                        value={form.account}
                        onChange={handleChange}
                        placeholder="XXXXXXXXXXXX"
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-gray-800 placeholder-gray-400"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        IFSC Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="ifsc"
                        value={form.ifsc}
                        onChange={handleChange}
                        placeholder="SBIN0001234"
                        className="w-full max-w-md px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-gray-800 placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="pt-4 border-t border-gray-100">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="terms"
                        checked={form.terms}
                        onChange={handleChange}
                        className="w-5 h-5 rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer transition-all"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                        I agree to the <span className="text-blue-600 font-semibold">Terms & Conditions</span>
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="px-10 py-6 bg-gray-50/80 border-t border-gray-100 flex justify-between items-center">
              <button
                type="button"
                onClick={prevStep}
                className={`
                  px-6 py-2.5 text-sm font-medium rounded-xl transition-all
                  ${step > 1 
                    ? 'text-gray-600 hover:bg-gray-200 hover:text-gray-800' 
                    : 'text-gray-300 cursor-not-allowed'
                  }
                `}
                disabled={step === 1}
              >
                ← Back
              </button>
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  Continue
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !form.terms}
                  className="px-8 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl text-green-700 text-center font-medium">
            🎉 Application submitted successfully!
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-xs text-gray-400">
            Built with ❤️ using Next.js, TypeScript, LangChain, Groq & Socket.IO
          </p>
        </div>
      </div>
    </div>
  );
}
