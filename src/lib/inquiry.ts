import { z } from "zod";

/**
 * Validation for the inquiry form. Used on both the client and the server,
 * so the rules can never drift apart.
 */

export const SERVICE_OPTIONS = [
  {
    "value": "basic",
    "label": "Virtual Office Basic"
  },
  {
    "value": "corporate",
    "label": "Virtual Office Corporate"
  },
  {
    "value": "vip",
    "label": "VIP Virtual Office"
  },
  {
    "value": "visit",
    "label": "I would like to see the office"
  },
  {
    "value": "other",
    "label": "Help me choose a package"
  }
] as const;

const serviceValues = SERVICE_OPTIONS.map((o) => o.value) as [
  string,
  ...string[],
];

export const inquirySchema = z.object({
  /* The `error` option covers the field being ABSENT as well as invalid.
     Without it, a payload with no `name` key fails with Zod's internal
     "Invalid input: expected string, received undefined", which the form would
     then show verbatim to a person. */
  name: z
    .string({ error: "Please tell us your name." })
    .trim()
    .min(2, "Please tell us your name.")
    .max(120, "That name is too long."),
  email: z
    .string({ error: "Please give us an email address." })
    .trim()
    .min(1, "Please give us an email address.")
    .email("That does not look like an email address.")
    .max(200),
  mobile: z
    .string({ error: "Please give us a contact number we can reach you on." })
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
  /* Set by the room showcase CTAs, so the inquiry says which room. */
  room: z.string().trim().max(60).optional().or(z.literal("")),
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
