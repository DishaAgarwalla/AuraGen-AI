import { bankingRegistrationForm } from "../utils/formTemplates";
import { FormContext } from "../types/formContext";

export function getFormContext(): FormContext {
  console.log("====================================");
  console.log("📄 Loading Current Form Context");
  console.log("====================================");

  return bankingRegistrationForm;
}