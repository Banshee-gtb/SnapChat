import { useNavigate } from "react-router-dom";
import ghostImg from "@/assets/snapchat-ghost.png";

export default function SnapHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-black flex items-center justify-between px-5 pt-10 pb-3">
        <button className="text-gray-300">
          <SearchIcon />
        </button>
        <img src={ghostImg} alt="Snapchat" className="w-9 h-9 object-contain" />
        <button className="text-gray-300">
          <ChatIcon />
        </button>
      </div>

      {/* Camera Shutter */}
      <div className="flex flex-col items-center gap-6 mt-8">
        <div className="w-72 h-72 rounded-3xl bg-gray-900 border border-gray-800 flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-950" />
          <div className="relative z-10 flex flex-col items-center gap-2">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            <p className="text-gray-600 text-sm">Tap to take a Snap</p>
          </div>
        </div>

        {/* Shutter Button */}
        <button className="w-20 h-20 rounded-full border-4 border-white bg-transparent flex items-center justify-center hover:scale-95 transition-transform">
          <div className="w-14 h-14 rounded-full bg-white" />
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-black pb-8 pt-4 flex items-center justify-around px-8">
        <NavBtn icon={<MapIcon />} label="Map" />
        <NavBtn icon={<BitzIcon />} label="Discover" />
        <NavBtn icon={<FriendsIcon />} label="Friends" />
        <NavBtn icon={<SpotlightIcon />} label="Spotlight" />
        <NavBtn
          icon={
            <div className="w-7 h-7 rounded-full bg-[#FFFC00] flex items-center justify-center text-black font-bold text-xs">
              S
            </div>
          }
          label="Profile"
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
}

function NavBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition">
      {icon}
      <span className="text-[10px]">{label}</span>
    </button>
  );
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
      <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
    </svg>
  );
}

function BitzIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}

function FriendsIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function SpotlightIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}
