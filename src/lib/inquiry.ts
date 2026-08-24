import { z } from "zod";

/**
 * Validation for the enquiry form. Used on both the client and the server,
 * so the rules can never drift apart.
 */

export const SERVICE_OPTIONS = [
  { value: "registered-address", label: "Registered business address (SEC / BIR / permits)" },
  { value: "virtual-office", label: "Virtual office / business address" },
  { value: "company-registration", label: "Company registration" },
  { value: "workspace", label: "Desk, team space or private office" },
  { value: "meeting-room", label: "Meeting room booking" },
  { value: "accounting-payroll", label: "Accounting, tax, payroll or HR" },
  { value: "foreign-entry", label: "Foreign company entering the Philippines" },
  { value: "partner", label: "I am a consultant referring a client" },
  { value: "other", label: "Something else" },
] as const;

const serviceValues = SERVICE_OPTIONS.map((o) => o.value) as [
  string,
  ...string[],
];

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please tell us your name.")
    .max(120, "That name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please give us an email address.")
    .email("That does not look like an email address.")
    .max(200),
  mobile: z
    .string()
    .trim()
    .min(7, "Please give us a contact number we can reach you on.")
    .max(40, "That number is too long."),
  service: z.enum(serviceValues, {
    message: "Please tell us what you need.",
  }),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().max(3000).optional().or(z.literal("")),
  /** Which pricing tier the visitor clicked from, if any. */
  plan: z.string().trim().max(60).optional().or(z.literal("")),
  /** Referring partner firm, from a tracked link or typed in. */
  referrer: z.string().trim().max(160).optional().or(z.literal("")),
  /**
   * Honeypot. People never see this field, so anything in it means a bot.
   * Deliberately permissive here: the route accepts the request and silently
   * discards it, so the bot learns nothing and a browser that autofills the
   * field never shows a real person an error they cannot find.
   */
  website: z.string().max(400).optional().or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export function serviceLabel(value: string): string {
  return SERVICE_OPTIONS.find((o) => o.value === value)?.label ?? value;
}
