import { createServerFn } from "@tanstack/react-start";
import process from "node:process";
import { z } from "zod";

import { getSupabaseServerClient } from "../supabase.server";

const TABLE = "rsvp_responses";

function checkAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD || "1317";
  if (password !== expected) {
    throw new Error("invalid_password");
  }
}

// Called from the public RSVP form.
export const submitRsvp = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().trim().min(1),
      guestCount: z.number().int().min(1).max(5),
      attending: z.enum(["yes", "no"]),
      comment: z.string().trim().optional().default(""),
    }),
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from(TABLE).insert({
      name: data.name,
      guest_count: data.guestCount,
      attending: data.attending,
      comment: data.comment || null,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

// Called when the admin types the password in the modal, just to validate it.
export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator(z.object({ password: z.string() }))
  .handler(async ({ data }) => {
    checkAdminPassword(data.password);
    return { ok: true as const };
  });

// Called by the admin panel to load all responses. Re-checks the password
// server-side on every call, so data is never returned without it.
export const getRsvpResponses = createServerFn({ method: "POST" })
  .inputValidator(z.object({ password: z.string() }))
  .handler(async ({ data }) => {
    checkAdminPassword(data.password);

    const supabase = getSupabaseServerClient();
    const { data: rows, error } = await supabase
      .from(TABLE)
      .select("id, name, guest_count, attending, comment, created_at")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    const totalResponses = rows?.length ?? 0;
    const totalGuests = (rows ?? []).reduce(
      (sum, r) => sum + (r.attending === "yes" ? r.guest_count : 0),
      0,
    );

    return {
      rows: rows ?? [],
      totalResponses,
      totalGuests,
    };
  });
