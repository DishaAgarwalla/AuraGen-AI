"use client";

import { useRef, useState } from "react";

import Button from "../ui/Button";
import Card from "../ui/Card";
import Checkbox from "../ui/Checkbox";
import Input from "../ui/Input";
import Select from "../ui/Select";

import { submitFinancialForm } from "@/services/api";
import useTelemetry from "@/hooks/useTelemetry";

export default function FinancialForm() {
  useTelemetry();

  const fieldStartTime = useRef<Record<string, number>>({});

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    fieldStartTime.current[e.target.name] = Date.now();

    console.log(`🟢 Focused: ${e.target.name}`);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const start =
      fieldStartTime.current[e.target.name] || Date.now();

    const duration = (
      (Date.now() - start) /
      1000
    ).toFixed(2);

    console.log(
      `🔵 ${e.target.name} completed in ${duration}s`
    );
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await submitFinancialForm(formData);

      console.log("Backend Response:", response);

      alert("🎉 Form Submitted Successfully!");
    } catch (error) {
      console.error(error);

      alert("❌ Failed to submit form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-700">
            AuraGen
          </h1>

          <p className="text-gray-500 mt-2">
            Financial Onboarding Form
          </p>
        </div>

        {/* Personal Information */}

        <div>
          <h2 className="text-xl font-semibold mb-5">
            Personal Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <Input
              label="Full Name"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

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

            <Input
              label="Phone Number"
              name="phone"
              placeholder="+91 XXXXX XXXXX"
              value={formData.phone}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <Input
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

          </div>
        </div>

        {/* Professional Information */}

        <div>
          <h2 className="text-xl font-semibold mb-5">
            Professional Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <Input
              label="Occupation"
              name="occupation"
              placeholder="Software Engineer"
              value={formData.occupation}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <Input
              label="Annual Income"
              name="income"
              placeholder="₹ 10,00,000"
              value={formData.income}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

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

          </div>
        </div>

        {/* Financial Information */}

        <div>
          <h2 className="text-xl font-semibold mb-5">
            Financial Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <Input
              label="PAN Number"
              name="pan"
              placeholder="ABCDE1234F"
              value={formData.pan}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <Input
              label="Bank Account Number"
              name="account"
              placeholder="XXXXXXXXXXXX"
              value={formData.account}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <Input
              label="IFSC Code"
              name="ifsc"
              placeholder="SBIN0001234"
              value={formData.ifsc}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <Input
              label="Aadhaar Number"
              name="aadhaar"
              placeholder="XXXX XXXX XXXX"
              value={formData.aadhaar}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

          </div>
        </div>

        <Checkbox
          label="I agree to the Terms & Conditions."
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
        />

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
  );
}