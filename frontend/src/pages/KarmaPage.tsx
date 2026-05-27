import { useState, useEffect } from 'react'
import { karmaApi } from '@/api/karma.api'
import { KarmaLog } from '@/types'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'
import { Plus, Trash2, Sparkles, TrendingUp, TrendingDown } from 'lucide-react'
import GoldDust from '@/components/ui/GoldDust'

const CATEGORIES = ['Từ thiện', 'Gia đình', 'Học tập', 'Công việc', 'Sức khoẻ', 'Môi trường', 'Khác']

export default function KarmaPage() {
    const { user, refreshProfile } = useAuth()
    const [logs, setLogs] = useState<KarmaLog[]>([])
    const [tab, setTab] = useState<'duc' | 'toi'>('duc')
    const [form, setForm] = useState({ title: '', description: '', points: 5, category: 'Khác' })
    const [loading, setLoading] = useState(false)

    const fetchLogs = async () => {
        try {
            const res = await karmaApi.getAll({ type: tab, limit: 50 })
            setLogs(res.data.result.logs)
        } catch { }
    }

    useEffect(() => { fetchLogs() }, [tab])

    const handleCreate = async () => {
        if (!form.title.trim()) return toast.error('Vui lòng nhập tên hành động')
        setLoading(true)
        try {
            await karmaApi.create({ type: tab, ...form })
            toast.success(tab === 'duc' ? 'Ghi đức thành công 🪷' : 'Ghi tội thành công')
            setForm({ title: '', description: '', points: 5, category: 'Khác' })
            fetchLogs()
            refreshProfile()
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Lỗi')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await karmaApi.delete(id)
            toast.success('Đã xoá')
            fetchLogs()
            refreshProfile()
        } catch { }
    }

    return (
        <div className="flex flex-col min-h-full bg-transparent relative pt-24 pb-16 px-6">
            <GoldDust />
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-jade-light/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto w-full">
                <div className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-parchment/60 shadow-lg backdrop-blur-xl">
                            <Sparkles size={14} className="text-gold-light" />
                            Nhật ký nhân quả
                        </div>
                        <h1 className="text-4xl font-black tracking-tight font-display text-parchment sm:text-5xl drop-shadow-lg">
                            Sổ Tay <span className="text-transparent bg-gradient-to-r from-gold-light to-gold-dim bg-clip-text">Công Đức</span>
                        </h1>
                    </div>

                    {/* Stats Dashboard */}
                    <div className="flex gap-4">
                        <div className="px-6 py-4 rounded-3xl border border-jade-500/20 bg-jade-950/30 backdrop-blur-md shadow-[0_0_30px_rgba(74,155,106,0.1)] flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-jade-500/20 text-jade-light flex items-center justify-center">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <div className="text-[10px] text-jade-light/70 uppercase tracking-widest font-bold">Tổng Phước Đức</div>
                                <div className="text-2xl font-black text-jade-light font-display">{user?.stats?.ducTotal || 0}</div>
                            </div>
                        </div>

                        <div className="px-6 py-4 rounded-3xl border border-red-500/20 bg-red-950/30 backdrop-blur-md shadow-[0_0_30px_rgba(239,68,68,0.05)] flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center">
                                <TrendingDown size={24} />
                            </div>
                            <div>
                                <div className="text-[10px] text-red-400/70 uppercase tracking-widest font-bold">Tổng Nghiệp Chướng</div>
                                <div className="text-2xl font-black text-red-400 font-display">{user?.stats?.toiTotal || 0}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Form & Controls */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Tabs */}
                        <div className="flex p-1.5 bg-[#0a100d]/80 backdrop-blur-md rounded-2xl border border-white/5">
                            {(['duc', 'toi'] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTab(t)}
                                    className={`flex-1 py-3 rounded-xl text-sm font-bold tracking-wider transition-all cursor-pointer border ${tab === t
                                        ? t === 'duc'
                                            ? 'bg-gradient-to-br from-jade-600 to-jade-800 text-white shadow-lg shadow-jade-900/50 border-jade-400/30'
                                            : 'bg-gradient-to-br from-red-600 to-red-800 text-white shadow-lg shadow-red-900/50 border-red-400/30'
                                        : 'text-parchment/40 hover:text-parchment/70 bg-transparent border-transparent'
                                        }`}
                                >
                                    {t === 'duc' ? '🪷 Tích Đức' : '⚡ Ghi Tội'}
                                </button>
                            ))}
                        </div>

                        {/* Bento Form */}
                        <div className="bg-[#0a100d]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark opacity-50" />
                            
                            <h3 className="text-lg font-bold text-parchment mb-4 font-display flex items-center gap-2">
                                <Plus size={18} className="text-gold-light" /> Thêm bản ghi mới
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] text-parchment/50 uppercase tracking-widest mb-1.5 ml-1">Hành động</label>
                                    <input
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-light/50 focus:ring-1 focus:ring-gold-light/50 transition-all placeholder:text-parchment/20"
                                        placeholder="Ví dụ: Giúp đỡ người già..."
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] text-parchment/50 uppercase tracking-widest mb-1.5 ml-1">Mô tả chi tiết</label>
                                    <textarea
                                        className="w-full h-24 resize-none bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-light/50 focus:ring-1 focus:ring-gold-light/50 transition-all placeholder:text-parchment/20"
                                        placeholder="Ghi chú thêm (tuỳ chọn)..."
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] text-parchment/50 uppercase tracking-widest mb-1.5 ml-1">Phân loại</label>
                                        <select
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-light/50 focus:ring-1 focus:ring-gold-light/50 transition-all"
                                            value={form.category}
                                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        >
                                            {CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#0a100d]">{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-parchment/50 uppercase tracking-widest mb-1.5 ml-1">Điểm số</label>
                                        <input
                                            type="number"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-light/50 focus:ring-1 focus:ring-gold-light/50 transition-all text-center font-bold font-display"
                                            min={1}
                                            max={100}
                                            value={form.points}
                                            onChange={(e) => setForm({ ...form, points: Number(e.target.value) })}
                                        />
                                    </div>
                                </div>

                                <button 
                                    onClick={handleCreate} 
                                    disabled={loading} 
                                    className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex justify-center items-center gap-2 ${
                                        tab === 'duc' 
                                        ? 'bg-jade-500 hover:bg-jade-400 text-white shadow-[0_0_20px_rgba(74,155,106,0.3)] hover:shadow-[0_0_30px_rgba(74,155,106,0.5)]' 
                                        : 'bg-red-500 hover:bg-red-400 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]'
                                    }`}
                                >
                                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (tab === 'duc' ? '🪷 Lưu Phước Đức' : '⚡ Ghi Nhận Nghiệp')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Log List */}
                    <div className="lg:col-span-8">
                        <div className="bg-[#0a100d]/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-2 md:p-6 min-h-[600px] flex flex-col">
                            <div className="flex items-center justify-between px-4 mb-6">
                                <h2 className="text-xl font-bold font-display text-parchment flex items-center gap-2">
                                    {tab === 'duc' ? 'Danh sách Việc Thiện' : 'Danh sách Lỗi Lầm'}
                                </h2>
                                <div className="text-xs text-parchment/40 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                    {logs.length} bản ghi
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                                {logs.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-parchment/30 space-y-4 py-20">
                                        <div className="w-20 h-20 rounded-full border border-dashed border-white/20 flex items-center justify-center text-3xl">
                                            {tab === 'duc' ? '🪷' : '🍃'}
                                        </div>
                                        <div className="text-sm">Chưa có bản ghi nào trong sổ tay.</div>
                                    </div>
                                ) : (
                                    logs.map((log) => (
                                        <div 
                                            key={log._id} 
                                            className="group relative bg-black/40 border border-white/5 hover:border-white/10 rounded-2xl p-5 transition-all hover:-translate-y-1 hover:shadow-xl hover:bg-[#15201b]"
                                        >
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 rounded-r-full bg-gradient-to-b opacity-50 group-hover:opacity-100 transition-opacity" 
                                                 style={{ backgroundImage: tab === 'duc' ? 'linear-gradient(to bottom, #4A9B6A, #A3E635)' : 'linear-gradient(to bottom, #EF4444, #FCA5A5)' }} 
                                            />
                                            
                                            <div className="flex justify-between items-start gap-4">
                                                <div className="flex-1 min-w-0 pl-3">
                                                    <h4 className="text-base font-bold text-parchment mb-1 truncate">{log.title}</h4>
                                                    {log.description && (
                                                        <p className="text-sm text-parchment/50 line-clamp-2 mb-3 leading-relaxed">
                                                            {log.description}
                                                        </p>
                                                    )}
                                                    <div className="flex items-center gap-3">
                                                        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-parchment/60 uppercase tracking-wider font-semibold">
                                                            {log.category}
                                                        </span>
                                                        <span className="text-[11px] text-parchment/30">
                                                            {new Date(log.created_at).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex flex-col items-end gap-3">
                                                    <div className={`px-4 py-2 rounded-xl font-display font-black text-lg border ${
                                                        tab === 'duc' 
                                                        ? 'bg-jade-900/30 text-jade-400 border-jade-500/20' 
                                                        : 'bg-red-900/30 text-red-400 border-red-500/20'
                                                    }`}>
                                                        {tab === 'duc' ? '+' : '-'}{log.points}
                                                    </div>
                                                    
                                                    <button
                                                        onClick={() => handleDelete(log._id)}
                                                        className="w-8 h-8 rounded-full bg-black/50 border border-white/10 text-parchment/30 hover:text-red-400 hover:border-red-500/30 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 cursor-pointer"
                                                        title="Xóa bản ghi"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
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
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
            `}</style>
        </div>
    )
}