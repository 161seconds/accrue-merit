import { useState, useEffect, useCallback } from 'react'
import { woodenFishApi } from '@/api/woodenfish.api'
import { useAuth } from '@/contexts/AuthContext'
import { Sparkles } from 'lucide-react'
import GoldDust from '@/components/ui/GoldDust'

interface Ripple {
    id: number
    x: number
    y: number
}

interface FloatingText {
    id: number
    x: number
    y: number
}

export default function WoodenFishPage() {
    const { user, updateUser } = useAuth()
    const [moCount, setMoCount] = useState(user?.stats.moCount || 0)
    const [ripples, setRipples] = useState<Ripple[]>([])
    const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([])
    const [isPressed, setIsPressed] = useState(false)
    const [pulseAura, setPulseAura] = useState(false)

    useEffect(() => {
        woodenFishApi.getCount().then((res) => setMoCount(res.data.result.moCount)).catch(() => { })
    }, [])

    const handleTap = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        // Pressed animation
        setIsPressed(true)
        setTimeout(() => setIsPressed(false), 150)

        // Aura pulse
        setPulseAura(true)
        setTimeout(() => setPulseAura(false), 600)

        // Get click position relative to button center for directional ripple
        const rect = e.currentTarget.getBoundingClientRect()
        const cx = e.clientX - rect.left - rect.width / 2
        const cy = e.clientY - rect.top - rect.height / 2

        // Floating +1 text
        const textId = Date.now() + Math.random()
        const offsetX = (Math.random() - 0.5) * 60
        setFloatingTexts(prev => [...prev, { id: textId, x: offsetX, y: 0 }])
        setTimeout(() => setFloatingTexts(prev => prev.filter(t => t.id !== textId)), 1500)

        // Ripple effect
        const rippleId = Date.now() + Math.random() + 1
        setRipples(prev => [...prev, { id: rippleId, x: cx, y: cy }])
        setTimeout(() => setRipples(prev => prev.filter(r => r.id !== rippleId)), 1200)

        // Count
        setMoCount(prev => prev + 1)

        try {
            const res = await woodenFishApi.tap(1)
            setMoCount(res.data.result.moCount)
            if (user) {
                updateUser({
                    ...user,
                    stats: { ...user.stats, moCount: res.data.result.moCount, ducTotal: res.data.result.ducTotal }
                })
            }
        } catch { }
    }, [user, updateUser])

    return (
        <div className="flex flex-col items-center justify-center min-h-full bg-[#07100b] relative select-none">
            <GoldDust />
            {/* Deep Zen Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-dark/3 rounded-full blur-[200px]" />
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px] transition-all duration-600 ${pulseAura ? 'bg-gold-light/8 scale-150' : 'bg-gold-light/2 scale-100'}`} />
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            {/* Header badge */}
            <div className="relative z-10 mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-parchment/60 shadow-lg backdrop-blur-xl">
                <Sparkles size={14} className="text-gold-light" />
                Thiền định tĩnh tâm
            </div>

            <h1 className="relative z-10 text-4xl font-black tracking-tight font-display text-parchment sm:text-5xl drop-shadow-lg mb-2">
                Gõ <span className="text-transparent bg-gradient-to-r from-gold-light to-gold-dim bg-clip-text">Mõ</span>
            </h1>

            {/* Counter */}
            <div className="relative z-10 mb-10 text-center">
                <div className="text-[9px] tracking-[0.3em] text-gold-dim uppercase mb-2">Tổng số lần gõ</div>
                <div className="font-display text-6xl font-black text-gold-light drop-shadow-[0_0_40px_rgba(201,168,76,0.4)] tabular-nums">
                    {moCount.toLocaleString()}
                </div>
                <div className="text-[10px] text-parchment/30 tracking-wider mt-2 font-serif italic">Mỗi tiếng mõ là một niệm tâm an</div>
            </div>

            {/* Wooden Fish Button */}
            <div className="relative z-10 mb-10">
                {/* Floating +1 texts */}
                {floatingTexts.map((t) => (
                    <div
                        key={t.id}
                        className="absolute -top-2 left-1/2 font-display font-black text-xl text-gold-light pointer-events-none animate-[mokufloat_1.5s_ease-out_forwards] z-30"
                        style={{ transform: `translateX(calc(-50% + ${t.x}px))` }}
                    >
                        功德 +1
                    </div>
                ))}

                {/* Outer glow ring */}
                <div className={`absolute inset-[-20px] rounded-full transition-all duration-500 ${pulseAura ? 'shadow-[0_0_80px_20px_rgba(201,168,76,0.25)]' : 'shadow-[0_0_30px_5px_rgba(201,168,76,0.08)]'}`} />

                {/* Ripple rings */}
                {ripples.map((r) => (
                    <div
                        key={r.id}
                        className="absolute inset-0 rounded-full pointer-events-none z-20"
                    >
                        <div className="absolute inset-[-10px] border-2 border-gold-light/40 rounded-full animate-[rippleExpand_1.2s_ease-out_forwards]" />
                        <div className="absolute inset-[-10px] border border-gold-light/20 rounded-full animate-[rippleExpand_1.2s_0.15s_ease-out_forwards]" />
                    </div>
                ))}

                <button
                    onClick={handleTap}
                    className={`relative w-44 h-44 rounded-full cursor-pointer transition-all duration-150 border-none outline-none group ${isPressed ? 'scale-90' : 'scale-100 hover:scale-105'}`}
                    style={{
                        background: 'radial-gradient(circle at 40% 35%, #5a3e1e, #3D2B08 40%, #1A1209 90%)',
                        boxShadow: isPressed
                            ? '0 0 60px rgba(201,168,76,0.4), inset 0 4px 20px rgba(0,0,0,0.8)'
                            : '0 0 30px rgba(201,168,76,0.15), 0 20px 50px rgba(0,0,0,0.8), inset 0 2px 10px rgba(0,0,0,0.5)',
                    }}
                >
                    {/* Inner ring */}
                    <div className="absolute inset-3 rounded-full border border-gold-dim/30" />
                    <div className="absolute inset-6 rounded-full border border-gold-dim/15" />
                    
                    {/* Center icon area */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-5xl mb-1 drop-shadow-lg">🪘</div>
                        </div>
                    </div>

                    {/* Highlight arc */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-8 bg-gradient-to-b from-white/10 to-transparent rounded-full blur-sm" />
                </button>
            </div>

            <p className="relative z-10 text-xs text-parchment/40 text-center font-serif italic max-w-xs">
                Nhấn vào mõ để tích công đức
            </p>
            <p className="relative z-10 text-[10px] text-parchment/20 mt-1">
                Mỗi lần gõ = +1 điểm công đức
            </p>

            <style>{`
                @keyframes mokufloat {
                    0% { opacity: 1; transform: translateX(calc(-50% + var(--x, 0px))) translateY(0) scale(1); }
                    50% { opacity: 0.8; transform: translateX(calc(-50% + var(--x, 0px))) translateY(-50px) scale(1.2); }
                    100% { opacity: 0; transform: translateX(calc(-50% + var(--x, 0px))) translateY(-120px) scale(0.8); }
                }
                @keyframes rippleExpand {
                    0% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(2.5); opacity: 0; }
                }
            `}</style>
        </div>
    )
}