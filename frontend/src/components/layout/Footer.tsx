import { useLocation, useNavigate } from 'react-router-dom'
import { Home, BookOpen, Flame, Bell, ClipboardList, Heart } from 'lucide-react'

const navItems = [
    { path: '/', icon: Home, label: 'Nhà' },
    { path: '/karma', icon: BookOpen, label: 'Sổ' },
    { path: '/incense', icon: Flame, label: 'Nhang' },
    { path: '/wooden-fish', icon: Bell, label: 'Mõ' },
    { path: '/tasks', icon: ClipboardList, label: 'Nhiệm vụ' },
    { path: '/donate', icon: Heart, label: 'Góp' }
]

export default function Footer() {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full pointer-events-none">
            {/* Ambient bottom glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07100b] via-[#07100b]/60 to-transparent h-32 bottom-0 top-auto" />
            
            <nav className="relative px-3 pb-6 pt-4 pointer-events-auto">
                <div className="flex items-center justify-around max-w-[400px] mx-auto p-2 bg-[#101812]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                    {navItems.map((item) => {
                        const active = location.pathname === item.path
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-[1.2rem] transition-all duration-300 ease-out ${active ? 'bg-gold-light/10 shadow-[inset_0_0_12px_rgba(201,168,76,0.1)]' : 'hover:bg-white/5'}`}
                            >
                                <div className={`transition-all duration-300 ${active ? 'text-gold-light -translate-y-2 drop-shadow-[0_0_8px_rgba(201,168,76,0.5)]' : 'text-parchment/40 group-hover:text-parchment'}`}>
                                    <item.icon size={22} strokeWidth={active ? 2.5 : 2} />
                                </div>
                                
                                {active && (
                                    <span className="absolute bottom-2 text-[9px] font-bold tracking-widest text-gold-light uppercase animate-[slideUp_0.2s_ease-out]">
                                        {item.label}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>
            </nav>
        </div>
    )
}