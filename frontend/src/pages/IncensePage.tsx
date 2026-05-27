import { useState, useEffect } from 'react'
import { wishApi } from '@/api/wish.api'
import { Wish } from '@/types'
import toast from 'react-hot-toast'
import { Trash2, Sparkles, Send, Flame } from 'lucide-react'

const WISH_CATEGORIES = [
    { value: 'suc-khoe', label: 'Sức khoẻ' },
    { value: 'gia-dao', label: 'Gia đạo' },
    { value: 'hoc-tap', label: 'Học tập' },
    { value: 'su-nghiep', label: 'Sự nghiệp' },
    { value: 'tinh-duyen', label: 'Tình duyên' },
    { value: 'binh-an', label: 'Bình an' },
    { value: 'khac', label: 'Khác' }
]

const INCENSE_TYPES = [
    { value: 'tram-huong', label: 'Trầm hương' },
    { value: 'que', label: 'Quế' },
    { value: 'nhai', label: 'Nhài' },
    { value: 'bach-dan', label: 'Bạch đàn' }
]

export default function IncensePage() {
    const [wishes, setWishes] = useState<Wish[]>([])
    const [category, setCategory] = useState('binh-an')
    const [incenseType, setIncenseType] = useState('tram-huong')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [burning, setBurning] = useState(false)

    const fetchWishes = async () => {
        try {
            const res = await wishApi.getAll({ limit: 20 })
            setWishes(res.data.result.wishes)
        } catch { }
    }

    useEffect(() => { fetchWishes() }, [])

    const handleSubmit = async () => {
        if (!content.trim()) return toast.error('Vui lòng nhập lời nguyện')
        setLoading(true)
        setBurning(true)
        try {
            await wishApi.create({ category, content: content.trim(), incense_type: incenseType })
            toast.success('Lời nguyện đã được gửi đi 🙏')
            setContent('')
            fetchWishes()
            setTimeout(() => setBurning(false), 60000) // Khói bốc 1 phút
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Lỗi')
            setBurning(false)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await wishApi.delete(id)
            toast.success('Đã xoá')
            fetchWishes()
        } catch { }
    }

    return (
        <div className="flex flex-col min-h-full bg-[#07100b] relative pt-24 pb-16 px-6">
            {/* Dark Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute top-1/2 left-1/4 w-96 h-96 rounded-full blur-[150px] transition-all duration-1000 ${burning ? 'bg-orange-500/10 scale-150' : 'bg-gold-dark/5 scale-100'}`} />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto w-full">
                <div className="mb-8 text-center flex flex-col items-center">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-parchment/60 shadow-lg backdrop-blur-xl">
                        <Sparkles size={14} className="text-gold-light" />
                        Không gian thanh tịnh
                    </div>
                    <h1 className="text-4xl font-black tracking-tight font-display text-parchment sm:text-5xl drop-shadow-lg">
                        Dâng Hương <span className="text-transparent bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text">Cầu Nguyện</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">

                    {/* Left Column: The Altar */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center bg-gradient-to-b from-black/20 to-black/60 rounded-[2rem] border border-white/5 relative min-h-[500px]">
                        <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-transparent to-orange-500/5 pointer-events-none opacity-50" />

                        <div className="relative w-full h-full flex flex-col items-center justify-end pb-12">
                            {/* Incense Sticks */}
                            <div className="relative flex justify-center gap-2 mb-[-20px] z-10">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="w-1.5 h-32 bg-gradient-to-b from-[#8c593b] to-[#2d1b11] rounded-full relative shadow-[2px_0_5px_rgba(0,0,0,0.5)]">
                                        <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-3 rounded-full transition-all duration-500 ${burning ? 'bg-gradient-to-t from-red-500 to-orange-300 shadow-[0_0_15px_#f97316]' : 'bg-[#1a0f0a]'}`}>
                                            {/* Animated Smoke from the tip */}
                                            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 pointer-events-none transition-opacity duration-1000 z-30 ${burning ? 'opacity-100' : 'opacity-0'}`}>
                                                <div className="smoke" style={{ animationDelay: `${i * 0.8}s` }} />
                                                <div className="smoke" style={{ animationDelay: `${i * 0.8 + 2.5}s` }} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Incense Burner (Lư Hương) */}
                            <div className="relative z-20 w-48 h-24 bg-gradient-to-b from-[#b8860b] via-[#8b6508] to-[#553c00] rounded-b-3xl rounded-t-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-t-4 border-[#ffd700]/30 flex flex-col items-center justify-start pt-2">
                                {/* Decor details on burner */}
                                <div className="w-40 h-2 bg-black/30 rounded-full mb-3" />
                                <div className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full border-2 border-black/20" />
                                    <div className="w-8 h-8 rounded-full border-2 border-black/20" />
                                    <div className="w-6 h-6 rounded-full border-2 border-black/20" />
                                </div>
                                {/* Legs */}
                                <div className="absolute -bottom-4 left-6 w-4 h-6 bg-[#553c00] rounded-b-full skew-x-12 shadow-lg" />
                                <div className="absolute -bottom-4 right-6 w-4 h-6 bg-[#553c00] rounded-b-full -skew-x-12 shadow-lg" />
                            </div>

                            <div className="mt-8 text-center z-20">
                                <p className="text-gold-light/60 font-display tracking-widest text-sm uppercase mb-1">
                                    {burning ? 'Hương đang cháy...' : 'Lư Hương'}
                                </p>
                                <p className="text-[10px] text-parchment/30">Thành tâm thì linh</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form & List */}
                    <div className="lg:col-span-7 flex flex-col gap-6">

                        {/* Send Wish Form */}
                        <div className="bg-[#0a100d]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl relative">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-[10px] text-parchment/50 uppercase tracking-widest mb-1.5 ml-1">Loại hương</label>
                                    <select
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-parchment focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all appearance-none"
                                        value={incenseType}
                                        onChange={(e) => setIncenseType(e.target.value)}
                                    >
                                        {INCENSE_TYPES.map((t) => <option key={t.value} value={t.value} className="bg-[#0a100d]">{t.label}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] text-parchment/50 uppercase tracking-widest mb-1.5 ml-1">Lĩnh vực cầu nguyện</label>
                                    <select
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-parchment focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all appearance-none"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        {WISH_CATEGORIES.map((c) => <option key={c.value} value={c.value} className="bg-[#0a100d]">{c.label}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-[10px] text-parchment/50 uppercase tracking-widest mb-1.5 ml-1">Lời khấn nguyện</label>
                                <textarea
                                    className="w-full h-28 resize-none bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-parchment focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all placeholder:text-parchment/20"
                                    placeholder="Viết lời nguyện cầu từ tâm..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    maxLength={300}
                                />
                                <div className="text-right text-[10px] text-parchment/30 mt-1">{content.length}/300</div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={loading || burning}
                                className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex justify-center items-center gap-2 ${burning
                                    ? 'bg-black/50 text-orange-500/50 border border-orange-500/20 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] cursor-pointer'
                                    }`}
                            >
                                {burning ? <Flame size={18} className="animate-pulse" /> : <Send size={16} />}
                                {burning ? 'Hương đang cháy...' : 'Dâng Hương & Gửi Lời Nguyện'}
                            </button>
                        </div>

                        {/* Recent Wishes List */}
                        <div className="bg-[#0a100d]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 flex-1 flex flex-col min-h-[300px]">
                            <h3 className="text-sm font-bold text-parchment mb-4 font-display flex items-center justify-between">
                                Sổ Lưu Nguyện Cầu
                                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-normal">Gần đây</span>
                            </h3>

                            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                                {wishes.length === 0 ? (
                                    <div className="h-full flex items-center justify-center text-parchment/30 text-sm">Chưa có lời nguyện nào.</div>
                                ) : (
                                    wishes.map((w) => (
                                        <div key={w._id} className="group relative bg-black/30 border border-white/5 hover:border-white/10 rounded-2xl p-4 transition-all">
                                            <div className="flex justify-between items-start gap-3">
                                                <div className="flex-1">
                                                    <p className="text-sm text-parchment/90 leading-relaxed font-serif italic mb-2">"{w.content}"</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-400 text-[9px] uppercase tracking-wider font-bold">
                                                            {WISH_CATEGORIES.find((c) => c.value === w.category)?.label}
                                                        </span>
                                                        <span className="text-[10px] text-parchment/30">
                                                            {new Date(w.created_at).toLocaleDateString('vi-VN')}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleDelete(w._id)}
                                                    className="opacity-0 group-hover:opacity-100 text-parchment/30 hover:text-red-400 transition-all bg-transparent border-none cursor-pointer p-1"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                
                .smoke {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background: radial-gradient(circle, rgba(220,220,220,0.6) 0%, rgba(220,220,220,0) 70%);
                    border-radius: 50%;
                    bottom: 0;
                    left: -15px; /* Center relative to w-0 container */
                    opacity: 0;
                    animation: rise 5s infinite ease-in;
                    filter: blur(5px);
                }

                @keyframes rise {
                    0% {
                        bottom: 0;
                        transform: scale(0.5) translateX(0);
                        opacity: 0;
                    }
                    20% {
                        opacity: 0.8;
                    }
                    50% {
                        transform: scale(2) translateX(-15px);
                        opacity: 0.5;
                    }
                    80% {
                        opacity: 0.2;
                    }
                    100% {
                        bottom: 250px;
                        transform: scale(5) translateX(20px);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    )
}