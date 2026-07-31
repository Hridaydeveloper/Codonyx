import PhoneInputBase from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./phone-input.css";
import { cn } from "@/lib/utils";

interface PhoneNumberInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  /** ISO code of the country picked elsewhere in the form (e.g. Country field). */
  country?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

/**
 * International phone input with country flag, dial-code selector and
 * automatic formatting. The country selector follows the form's Country
 * field but can still be changed manually.
 */
export function PhoneNumberInput({
  id,
  value,
  onChange,
  country,
  placeholder = "Enter phone number",
  required,
  className,
}: PhoneNumberInputProps) {
  return (
    <PhoneInputBase
      id={id}
      international
      withCountryCallingCode
      defaultCountry={(country || undefined) as Country | undefined}
      country={(country || undefined) as Country | undefined}
      value={value || undefined}
      onChange={(v) => onChange(v || "")}
      placeholder={placeholder}
      limitMaxLength
      numberInputProps={{ required, maxLength: 20 }}
      className={cn("codonyx-phone-input", className)}
    />
  );
}

export default PhoneNumberInput;
