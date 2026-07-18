"use client";

import { useRef, useState } from "react";

import Button from "../ui/Button";
import Card from "../ui/Card";
import Checkbox from "../ui/Checkbox";
import Input from "../ui/Input";
import Select from "../ui/Select";

import ProgressIndicator from "../adaptive/ProgressIndicator";
import AdaptiveRenderer from "../adaptive/AdaptiveRenderer";
import FieldHelp from "../adaptive/FieldHelp";

import { submitFinancialForm } from "@/services/api";

import useTelemetry from "@/hooks/useTelemetry";
import useSocket from "@/hooks/useSocket";
import useAdaptiveUI from "@/hooks/useAdaptiveUI";

export default function FinancialForm() {
  //----------------------------------------------------
  // Hooks
  //----------------------------------------------------

  useTelemetry();

  const socketData = useSocket();

 const {
  adaptiveUI,
} = useAdaptiveUI();

  //----------------------------------------------------
  // Refs
  //----------------------------------------------------

  const fieldStartTime =
    useRef<Record<string, number>>({});

  //----------------------------------------------------
  // State
  //----------------------------------------------------

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",

    occupation: "",
    income: "",
    employment: "",
    goal: "",

    pan: "",
    account: "",
    ifsc: "",
    aadhaar: "",

    agree: false,
  });

  //----------------------------------------------------
  // Input Change
  //----------------------------------------------------

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  //----------------------------------------------------
  // Focus Tracking
  //----------------------------------------------------

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    fieldStartTime.current[e.target.name] =
      Date.now();

    console.log(
      `🟢 Focused: ${e.target.name}`
    );
  };

  //----------------------------------------------------
  // Blur Tracking
  //----------------------------------------------------

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const start =
      fieldStartTime.current[e.target.name] ??
      Date.now();

    const duration = (
      (Date.now() - start) /
      1000
    ).toFixed(2);

    console.log(
      `🔵 ${e.target.name} completed in ${duration}s`
    );
  };

  //----------------------------------------------------
  // Submit
  //----------------------------------------------------

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await submitFinancialForm(formData);

      console.log(
        "Backend Response:",
        response
      );

      alert(
        "🎉 Form Submitted Successfully!"
      );
    } catch (error) {
      console.error(error);

      alert(
        "❌ Failed to submit form."
      );
    } finally {
      setLoading(false);
    }
  };

  //----------------------------------------------------
  // UI
  //----------------------------------------------------

  return (
    <>
      <AdaptiveRenderer
        adaptiveUI={adaptiveUI}
      />

      <Card>
        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-700">
              AuraGen
            </h1>

            <p className="mt-2 text-gray-500">
              Financial Onboarding Form
            </p>
          </div>

          <ProgressIndicator
            score={adaptiveUI?.cognitiveScore ?? 0}
            status={adaptiveUI?.status ?? "LOW"}
          />

          {/* Personal Information */}

          <div>
            <h2 className="mb-5 text-xl font-semibold">
              Personal Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
                            <div>
                <Input
                  label="Full Name"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />

                <FieldHelp fieldName="Full Name" />
              </div>

              <div>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="john@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />

                <FieldHelp fieldName="Email Address" />
              </div>

              <div>
                <Input
                  label="Phone Number"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />

                <FieldHelp fieldName="Phone Number" />
              </div>

              <div>
                <Input
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />

                <FieldHelp fieldName="Date of Birth" />
              </div>

            </div>
          </div>

          {/* Professional Information */}

          <div>
            <h2 className="mb-5 text-xl font-semibold">
              Professional Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <Input
                  label="Occupation"
                  name="occupation"
                  placeholder="Software Engineer"
                  value={formData.occupation}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />

                <FieldHelp fieldName="Occupation" />
              </div>

              <div>
                <Input
                  label="Annual Income"
                  name="income"
                  placeholder="₹ 10,00,000"
                  value={formData.income}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />

                <FieldHelp fieldName="Annual Income" />
              </div>

              <div>
                <Select
                  label="Employment Type"
                  name="employment"
                  value={formData.employment}
                  onChange={handleChange}
                  options={[
                    "Select",
                    "Salaried",
                    "Self Employed",
                    "Business",
                    "Student",
                  ]}
                />

                <FieldHelp fieldName="Employment Type" />
              </div>

              <div>
                <Select
                  label="Investment Goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  options={[
                    "Select",
                    "Retirement",
                    "Wealth Creation",
                    "Tax Saving",
                    "Emergency Fund",
                  ]}
                />

                <FieldHelp fieldName="Investment Goal" />
              </div>

            </div>
          </div>

          {/* Financial Information */}

          <div>
            <h2 className="mb-5 text-xl font-semibold">
              Financial Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2"></div>
                          <div>
                <Input
                  label="PAN Number"
                  name="pan"
                  placeholder="ABCDE1234F"
                  value={formData.pan}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />

                <FieldHelp fieldName="PAN Number" />
              </div>

              <div>
                <Input
                  label="Bank Account Number"
                  name="account"
                  placeholder="XXXXXXXXXXXX"
                  value={formData.account}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />

                <FieldHelp fieldName="Bank Account Number" />
              </div>

              <div>
                <Input
                  label="IFSC Code"
                  name="ifsc"
                  placeholder="SBIN0001234"
                  value={formData.ifsc}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />

                <FieldHelp fieldName="IFSC Code" />
              </div>

              <div>
                <Input
                  label="Aadhaar Number"
                  name="aadhaar"
                  placeholder="XXXX XXXX XXXX"
                  value={formData.aadhaar}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />

                <FieldHelp fieldName="Aadhaar Number" />
              </div>

            </div>
          

          {/* Adaptive UI Notification */}

          {adaptiveUI && (
            <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-5">
              <h3 className="text-lg font-semibold text-yellow-700">
                ⚡ Adaptive UI Activated
              </h3>

              <p className="mt-2 text-sm text-gray-700">
                AuraGen detected a high cognitive load and
                generated a simplified version of the interface.
              </p>

              <div className="mt-4 rounded-lg bg-white p-4 shadow">
                <p className="text-sm">
                  <strong>Cognitive Score:</strong>{" "}
                  {adaptiveUI.cognitiveScore}
                </p>

                <p className="text-sm">
                  <strong>Status:</strong>{" "}
                  {adaptiveUI.status}
                </p>
              </div>
            </div>
          )}

          {/* Agreement */}

          <Checkbox
            label="I agree to the Terms & Conditions."
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />

          {/* Submit */}

          <Button
            type="submit"
            text={
              loading
                ? "Submitting..."
                : "Submit Application"
            }
          />
        </form>
      </Card>
    </>
  );
}