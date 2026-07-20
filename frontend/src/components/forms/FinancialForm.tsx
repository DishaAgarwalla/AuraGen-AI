"use client";

import { useState } from "react";
import { submitFinancialForm } from "@/services/api";
import useTelemetry from "@/hooks/useTelemetry";
import { useSocket } from "@/hooks/useSocket";
import useAdaptiveUI from "@/hooks/useAdaptiveUI";
import ProgressIndicator from "../adaptive/ProgressIndicator";
import AdaptiveRenderer from "../adaptive/AdaptiveRenderer";

export default function NewFinancialForm() {
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

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.terms) {
      alert("Please accept the terms to continue");
      return;
    }
    setLoading(true);
    try {
      await submitFinancialForm(form);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdaptiveRenderer adaptiveUI={adaptiveUI} />
      
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white">AuraGen</h1>
                  <p className="text-blue-100 text-sm mt-1">Smart Financial Onboarding</p>
                </div>
                <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-full">
                  <span className="text-white text-sm font-medium">Step {step} of {totalSteps}</span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-8">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Progress</span>
                  <span className="font-medium text-blue-600">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Cognitive Load */}
              <div className="mb-8">
                <ProgressIndicator
                  score={adaptiveUI?.cognitiveScore ?? 0}
                  status={adaptiveUI?.status ?? "LOW"}
                />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <span className="text-2xl">👤</span> Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+1 234 567 890"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="dob"
                          type="date"
                          value={form.dob}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <span className="text-2xl">💼</span> Professional Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Occupation <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="occupation"
                          value={form.occupation}
                          onChange={handleChange}
                          placeholder="Software Engineer"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Annual Income (₹) <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="income"
                          value={form.income}
                          onChange={handleChange}
                          placeholder="10,00,000"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <span className="text-2xl">🏦</span> Financial Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          PAN Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="pan"
                          value={form.pan}
                          onChange={handleChange}
                          placeholder="ABCDE1234F"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Bank Account <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="account"
                          value={form.account}
                          onChange={handleChange}
                          placeholder="XXXXXXXXXXXX"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          IFSC Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="ifsc"
                          value={form.ifsc}
                          onChange={handleChange}
                          placeholder="SBIN0001234"
                          className="w-full max-w-md px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex gap-3">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-all font-medium"
                    >
                      ← Back
                    </button>
                  )}
                  <div className="flex-1" />
                  {step < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg"
                    >
                      Continue →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Submitting..." : "Submit Application"}
                    </button>
                  )}
                </div>

                {/* Terms */}
                {step === totalSteps && (
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="terms"
                        checked={form.terms}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <label className="text-sm text-gray-600 cursor-pointer">
                        I agree to the <span className="text-blue-600 font-medium">Terms & Conditions</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center font-medium">
                    ✅ Application submitted successfully!
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              Built with ❤️ using Next.js, TypeScript, LangChain, Groq & Socket.IO
            </p>
          </div>
        </div>
      </div>
    </>
  );
}