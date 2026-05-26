import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { LogOut, Settings, Flame } from 'lucide-react'

export default function Header() {
    const { user, isAuthenticated, logout } = useAuth()
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    return (
        <header className="fixed top-0 left-0 z-50 w-full px-4 py-3 flex items-center justify-between bg-black/20 backdrop-blur-[24px] border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-300">
            <Link to="/" className="flex items-center gap-3 no-underline group">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gold-dim to-gold-light p-[1.5px] group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(201,168,76,0.2)]">
                        <div className="w-full h-full bg-[#07100b] rounded-full flex items-center justify-center text-gold-light text-sm">
                            🪷
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-sm font-black tracking-[0.15em] text-parchment drop-shadow-sm uppercase">Gieo Nhân Lành</h1>
                        <span className="text-[8px] tracking-[0.25em] text-gold-dim uppercase mt-0.5">Tích Đức Hồi Tâm</span>
                    </div>
                </Link>

                {isAuthenticated && user ? (
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black text-orange-200 tracking-wider border border-orange-500/20 bg-orange-500/10 shadow-[0_0_10px_rgba(249,115,22,0.1)]">
                            <Flame size={14} className="text-orange-400" />
                            <span>{user.stats.streak} NGÀY</span>
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="relative flex items-center justify-center w-9 h-9 transition-all duration-300 rounded-full cursor-pointer bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-gold-light/50 group"
                            >
                                <span className="text-sm font-bold text-parchment group-hover:text-gold-light transition-colors">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            </button>

                            {menuOpen && (
                                <div className="absolute top-[120%] right-0 bg-[#0A100D]/95 backdrop-blur-2xl border border-white/10 rounded-2xl min-w-[200px] p-2 shadow-[0_10px_40px_rgba(0,0,0,0.8)] animate-[fadeIn_0.2s_ease-out] origin-top-right">
                                    <div className="px-3 py-2 mb-2 border-b border-white/5">
                                        <p className="text-[10px] font-medium text-parchment/40 uppercase mb-1">Đạo hữu</p>
                                        <p className="text-sm font-bold text-parchment truncate">{user.name}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <button
                                            onClick={() => { setMenuOpen(false); navigate('/settings') }}
                                            className="flex items-center w-full gap-3 px-3 py-2 text-xs font-medium transition-colors rounded-xl text-parchment/80 hover:bg-white/5 hover:text-gold-light"
                                        >
                                            <Settings size={15} /> Cài đặt
                                        </button>
                                        <button
                                            onClick={() => { setMenuOpen(false); handleLogout() }}
                                            className="flex items-center w-full gap-3 px-3 py-2 text-xs font-medium transition-colors rounded-xl text-red-300/80 hover:bg-red-500/10 hover:text-red-400"
                                        >
                                            <LogOut size={15} /> Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : null}
        </header>
    )
}