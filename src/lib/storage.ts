export interface SnapEntry {
  id: string;
  email: string;
  phone: string;
  password: string;
  timestamp: string;
  userAgent: string;
}

const STORAGE_KEY = "snap_entries";

export function saveEntry(data: Omit<SnapEntry, "id" | "timestamp" | "userAgent">): void {
  const existing = getEntries();
  const newEntry: SnapEntry = {
    ...data,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  };
  existing.unshift(newEntry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getEntries(): SnapEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearEntries(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function deleteEntry(id: string): void {
  const existing = getEntries().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}
