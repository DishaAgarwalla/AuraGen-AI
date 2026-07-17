import { getFormContext } from "./formContextService";
import { FormContext } from "../types/formContext";

export function getCurrentForm(): FormContext {
  console.log("====================================");
  console.log("📄 Form Service");
  console.log("====================================");

  return getFormContext();
}