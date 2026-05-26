import { useNavigate } from 'react-router-dom';
import { Bot } from 'lucide-react';

export default function FloatingAssistant() {
    const navigate = useNavigate();

    return (
        <div className="fixed z-50 bottom-28 right-6 sm:bottom-8 sm:right-8 group">
            {/* Label Tooltip */}
            <div className="absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#07100b]/90 backdrop-blur-md border border-white/10 text-xs font-bold text-parchment/80 whitespace-nowrap opacity-0 -translate-x-2 transition-all duration-300 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 shadow-xl">
                Trợ lý AI
            </div>

            <button
                onClick={() => navigate('/chat')}
                className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#1A1209] border border-gold-dim/40 shadow-[0_0_20px_rgba(201,168,76,0.2)] transition-all duration-500 hover:scale-110 hover:shadow-[0_0_35px_rgba(201,168,76,0.5)] hover:border-gold-light/80 outline-none"
            >
                {/* Glowing inner orb */}
                <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-gold-light/30 to-transparent blur-[4px] transition-all duration-500 group-hover:from-gold-light/60" />
                
                {/* Spinning decorative ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-gold-dim/40 animate-[spin_8s_linear_infinite]" />
                
                {/* The icon */}
                <Bot size={24} strokeWidth={2.5} className="relative z-10 text-gold-light transition-all duration-500 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(201,168,76,0.8)]" />
                
                {/* Notification dot (optional, can be removed if not needed, but adds character) */}
                <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#1A1209] animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            </button>
        </div>
    );
}