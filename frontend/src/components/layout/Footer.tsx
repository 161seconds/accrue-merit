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
        <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
            {/* Ambient bottom glow - masks content scrolling behind the nav */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#07100b] via-[#07100b]/70 to-transparent" />

            <div className="relative flex justify-center px-4 pb-4">
                <nav className="pointer-events-auto w-full max-w-[400px] bg-[#101812]/90 backdrop-blur-3xl border border-white/10 rounded-[18px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] flex items-center justify-around px-1.5 py-1.5">
                {navItems.map((item) => {
                    const active = location.pathname === item.path
                    
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`relative flex flex-col items-center justify-center w-[56px] h-[46px] rounded-[14px] transition-all duration-300 ${active
                                ? 'text-gold-light'
                                : 'text-parchment/40 hover:text-parchment/80 hover:bg-white/5'
                                }`}
                        >
                            {active && (
                                <div className="absolute inset-0 bg-gold-light/10 rounded-[14px] transition-all duration-300 scale-100 opacity-100" />
                            )}

                            <div className={`relative z-10 transition-transform duration-300 ${active ? '-translate-y-1.5' : 'translate-y-0'}`}>
                                <item.icon size={20} strokeWidth={active ? 2.5 : 2} />
                            </div>

                            <span className={`absolute bottom-1 text-[9px] font-bold tracking-wide transition-all duration-300 whitespace-nowrap ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                }`}>
                                {item.label}
                            </span>
                        </button>
                    )
                })}
            </nav>
            </div>
        </div>
    )
}