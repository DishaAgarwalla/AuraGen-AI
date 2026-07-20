"use client";

import { useRef, useState } from "react";
import { submitFinancialForm } from "@/services/api";
import useTelemetry from "@/hooks/useTelemetry";
import { useSocket } from "@/hooks/useSocket";
import useAdaptiveUI from "@/hooks/useAdaptiveUI";
import ProgressIndicator from "../adaptive/ProgressIndicator";
import AdaptiveRenderer from "../adaptive/AdaptiveRenderer";

export default function ModernFinancialForm() {
  useTelemetry();
  useSocket();
  const { adaptiveUI } = useAdaptiveUI();

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    occupation: "",
    income: "",
    employment: "",
    pan: "",
    account: "",
    ifsc: "",
    agree: false,
  });

  const steps = [
    { id: "personal", label: "Personal Info", icon: "👤" },
    { id: "professional", label: "Work Details", icon: "💼" },
    { id: "financial", label: "Financial Info", icon: "🏦" },
    { id: "review", label: "Review & Submit", icon: "✅" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const fields = step === 0 ? ["fullName", "email", "phone", "dob"] :
                   step === 1 ? ["occupation", "income", "employment"] :
                   step === 2 ? ["pan", "account", "ifsc"] : [];
    
    const errors: Record<string, string> = {};
    let hasError = false;

    fields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        const label = field === "fullName" ? "Full Name" :
                      field === "dob" ? "Date of Birth" :
                      field.charAt(0).toUpperCase() + field.slice(1);
        errors[field] = `${label} is required`;
        hasError = true;
      }
    });

    setFormErrors(errors);
    return !hasError;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("Please agree to the Terms & Conditions.");
      return;
    }
    try {
      setLoading(true);
      await submitFinancialForm(formData);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      alert("❌ Failed to submit form.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 890"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-800"
                />
              </div>
            </div>
            <div className="max-w-md">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-800 bg-white"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Occupation <span className="text-red-500">*</span>
                </label>
                <input
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Software Engineer"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Annual Income (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  placeholder="10,00,000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-800"
                />
              </div>
            </div>
            <div className="max-w-md">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Employment Type <span className="text-red-500">*</span>
              </label>
              <select
                name="employment"
                value={formData.employment}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-800 bg-white"
              >
                <option value="">Select Employment Type</option>
                <option value="Salaried">Salaried</option>
                <option value="Self Employed">Self Employed</option>
                <option value="Business">Business</option>
                <option value="Student">Student</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  PAN Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  placeholder="ABCDE1234F"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Bank Account <span className="text-red-500">*</span>
                </label>
                <input
                  name="account"
                  value={formData.account}
                  onChange={handleChange}
                  placeholder="XXXXXXXXXXXX"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-800"
                />
              </div>
            </div>
            <div className="max-w-md">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                IFSC Code <span className="text-red-500">*</span>
              </label>
              <input
                name="ifsc"
                value={formData.ifsc}
                onChange={handleChange}
                placeholder="SBIN0001234"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-800"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Your Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(formData).map(([key, value]) => {
                  if (key === "agree") return null;
                  if (!value) return null;
                  const label = key === "fullName" ? "Full Name" :
                                key === "dob" ? "Date of Birth" :
                                key.charAt(0).toUpperCase() + key.slice(1);
                  return (
                    <div key={key} className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
                      <p className="text-sm font-medium text-gray-800 mt-1">{String(value)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
              />
              <label className="text-sm text-gray-700 cursor-pointer">
                I agree to the <span className="text-blue-600 font-medium">Terms & Conditions</span>
              </label>
            </div>
            {formErrors.agree && (
              <p className="text-sm text-red-500">{formErrors.agree}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <AdaptiveRenderer adaptiveUI={adaptiveUI} />
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">AuraGen</h1>
                <p className="text-blue-100 text-sm mt-0.5">Financial Onboarding</p>
              </div>
              {submitted && (
                <span className="bg-green-400/20 text-green-100 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                  ✅ Submitted
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Cognitive Load */}
            <div className="mb-8">
              <ProgressIndicator
                score={adaptiveUI?.cognitiveScore ?? 0}
                status={adaptiveUI?.status ?? "LOW"}
              />
            </div>

            {/* Steps */}
            <div className="mb-8">
              <div className="flex items-center gap-2">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <button
                      type="button"
                      onClick={() => index <= currentStep + 1 && setCurrentStep(index)}
                      className={`
                        flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap
                        ${index === currentStep 
                          ? "bg-blue-600 text-white shadow-md shadow-blue-100" 
                          : index < currentStep 
                          ? "bg-green-50 text-green-700 border border-green-200" 
                          : "bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed"
                        }
                      `}
                      disabled={index > currentStep + 1}
                    >
                      <span className="text-lg">{step.icon}</span>
                      <span className="hidden sm:inline">{step.label}</span>
                      {index < currentStep && (
                        <span className="text-green-600 text-sm">✓</span>
                      )}
                    </button>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 ${index < currentStep ? "bg-green-300" : "bg-gray-200"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {renderStep()}

              {/* Errors */}
              {formErrors && Object.keys(formErrors).length > 0 && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  {Object.values(formErrors).map((error, i) => (
                    <p key={i} className="text-sm text-red-600 flex items-center gap-2">
                      <span className="text-lg">•</span> {error}
                    </p>
                  ))}
                </div>
              )}

              {/* Navigation */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex gap-3">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    ← Back
                  </button>
                )}
                <div className="flex-1" />
                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || !formData.agree}
                    className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Submitting..." : "Submit Application"}
                  </button>
                )}
              </div>
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
    </>
  );
}