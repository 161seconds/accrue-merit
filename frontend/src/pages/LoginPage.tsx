import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { authApi } from '@/api/auth.api';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Lock, User, Calendar, Star, Leaf, Flower2, ChevronRight, Flame } from 'lucide-react';

// --- HIỆU ỨNG THẺ LƠ LỬNG BÊN TRÁI (BUDDHIST & AMBER THEME) ---
function FloatingBuddhistCards() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Amber and Deep Maroon Glow blobs */}
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.18] bg-amber-500 -top-20 -left-20 animate-[drift_20s_ease-in-out_infinite]" />
            <div className="absolute w-[400px] h-[400px] rounded-full blur-[110px] opacity-[0.12] bg-yellow-400 bottom-10 right-10 animate-[drift_15s_ease-in-out_infinite_reverse]" />
            <div className="absolute w-[300px] h-[300px] rounded-full blur-[100px] opacity-[0.08] bg-[#671d1d] top-[30%] right-[30%] animate-[drift_25s_ease-in-out_infinite_0.5s]" />

            {/* Buddhist Clouds Pattern Watermark */}
            <div className="absolute inset-0 opacity-[0.015] bg-[#0d0f10] scale-150 animate-[drift_40s_linear_infinite]" style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43 7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 35c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm60-17c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM15 75c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm10 0c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 90c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM30 90c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23444" fill-opacity="0.4" fill-rule="evenodd"/%3E%3C/svg%3E')` }} />

            {/* Card 1: Pháp Hội Sắp Tới */}
            <div className="absolute top-[12%] left-[8%] animate-[float_6s_ease-in-out_infinite]">
                <div className="bg-[#101213]/80 backdrop-blur-xl border border-amber-500/15 rounded-2xl px-5 py-4 shadow-2xl shadow-black/40 w-50">
                    <div className="flex items-center justify-between mb-2">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                            <Calendar className="w-4 h-4 text-amber-400" />
                        </div>
                        <span className="flex items-center gap-0.5 text-xs font-bold text-amber-400">
                            Hôm nay
                        </span>
                    </div>
                    <p className="text-lg font-black tracking-tight text-[#fef3c7] leading-tight">Pháp Hội An Lạc</p>
                    <p className="text-[#a8a18e] text-[11px] mt-0.5">Khai đàn lúc 08:00</p>
                    <div className="mt-2">
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-semibold">Tĩnh lặng</span>
                    </div>
                </div>
            </div>

            {/* Card 2: Đồng Tu Online */}
            <div className="absolute top-[6%] right-[12%] animate-[float_7s_ease-in-out_infinite_0.5s]">
                <div className="bg-[#101213]/80 backdrop-blur-xl border border-white/5 rounded-2xl px-5 py-4 shadow-2xl shadow-black/40 w-44">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center justify-center border w-9 h-9 rounded-xl bg-orange-950 border-amber-800">
                            <Flame className="w-4 h-4 text-amber-400" />
                        </div>
                    </div>
                    <p className="text-xl font-black tracking-tight text-white">856</p>
                    <p className="text-[#a8a18e] text-[11px] mt-0.5">Đồng tu online</p>
                </div>
            </div>

            {/* Card 3: Phước Báu Tích Lũy (Sparkline) */}
            <div className="absolute bottom-[18%] right-[8%] animate-[float_8s_ease-in-out_infinite_1s]">
                <div className="bg-[#101213]/80 backdrop-blur-xl border border-white/5 rounded-2xl px-5 py-4 shadow-2xl shadow-black/40 w-52">
                    <div className="flex items-center gap-2 mb-1">
                        <p className="text-lg font-black tracking-tight text-white">4.9k</p>
                        <span className="flex items-center gap-0.5 text-xs font-bold text-yellow-400">
                            <Leaf className="w-3 h-3 fill-yellow-400" /> +0.2k
                        </span>
                    </div>
                    <p className="text-[#a8a18e] text-[11px]">Công đức tích lũy</p>
                    <svg className="w-full h-8 mt-3" viewBox="0 0 160 32">
                        <polyline
                            points="0,28 20,22 40,25 60,18 80,20 100,12 120,15 140,8 160,4"
                            fill="none" stroke="url(#sparkGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        />
                        <defs>
                            <linearGradient id="sparkGrad" x1="0" y1="0" x2="160" y2="0">
                                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#f59e0b" />
                            </linearGradient>
                        </defs>
                        <circle cx="160" cy="4" r="3" fill="#f59e0b" />
                    </svg>
                </div>
            </div>

            {/* Card 4: Tâm Bồ Đề (Bodhi Leaf icon) */}
            <div className="absolute bottom-[32%] left-[15%] animate-[float_5s_ease-in-out_infinite_1.5s]">
                <div className="bg-[#101213]/80 backdrop-blur-xl border border-amber-500/10 rounded-2xl px-5 py-4 shadow-2xl shadow-black/40 w-40">
                    <div className="flex items-center justify-center mb-2 border border-purple-800 w-9 h-9 rounded-xl bg-purple-500/15">
                        <Leaf className="w-4 h-4 text-purple-400 fill-purple-400/20" />
                    </div>
                    <p className="text-xl font-black leading-tight tracking-tight text-white">99%</p>
                    <p className="text-[#a8a18e] text-[11px] mt-0.5">Tâm Bồ Đề</p>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute bottom-[8%] left-[35%] w-24 h-24 rounded-full border border-amber-500/10 animate-[spin_30s_linear_infinite]" />
            {/* Spinning Bodhi Leaf Outline */}
            <div className="absolute top-[40%] left-[45%] w-16 h-16 animate-[spin_40s_linear_infinite_reverse] opacity-5">
                <Leaf className="w-16 h-16 text-amber-300" strokeWidth={1} />
            </div>
        </div>
    );
}

// --- FORM FIELD (FLOATING LABEL - AMBER THEME) ---
interface FormFieldProps {
    icon: React.ReactNode;
    label: string;
    placeholder: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    rightElement?: React.ReactNode;
}

function FormField({ icon, label, placeholder, type = 'text', value, onChange, rightElement }: FormFieldProps) {
    const [focused, setFocused] = useState(false);
    const isActive = focused || (value && value.length > 0);

    return (
        <div className="relative pt-2">
            <div className="relative">
                <label className={`absolute left-10 transition-all duration-200 pointer-events-none z-10 ${isActive ? '-top-2 text-[11px] px-1 bg-[#0d0f10]' : 'top-3.5 text-sm'} ${focused ? 'text-amber-400' : 'text-[#a8a18e]'}`}>
                    {label}
                </label>
                <span className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focused ? 'text-amber-400' : 'text-[#a8a18e]'}`}>
                    {icon}
                </span>
                <input
                    type={type}
                    placeholder={isActive ? placeholder : ''}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={`w-full h-12 pl-11 ${rightElement ? 'pr-12' : 'pr-4'} rounded-xl bg-transparent border-2 text-[#fef3c7] text-sm outline-none transition-colors ${focused ? 'border-amber-500/50' : 'border-[#1e2124] hover:border-[#2a2d30]'}`}
                    required
                />
                {rightElement && <div className="absolute right-0 flex items-center h-full -translate-y-1/2 top-1/2">{rightElement}</div>}
            </div>
        </div>
    );
}

// --- MAIN LOGIN PAGE ---
export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await authApi.login({ username: username.trim(), password });
            const { access_token, refresh_token, user } = res.data.result;
            await login(access_token, refresh_token, user);
            toast.success('Đăng nhập thành công ✦');
            navigate('/');
        } catch (err: any) {
            toast.error(err.response?.data?.message || err.response?.data?.errors?.username?.msg || 'Sai tài khoản hoặc mật khẩu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-[#0a0d0f]">
            {/* TRÁI: BUDDHIST BRANDING & EFFECT (Ẩn trên mobile) */}
            <div className="relative items-center justify-center hidden overflow-hidden lg:flex lg:w-[55%] bg-[#0d0f10]">
                <FloatingBuddhistCards />

                {/* Bodhi leaf watermark pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M30 0c16.568 0 30 13.432 30 30S46.568 60 30 60 0 46.568 0 30 13.432 0 30 0zm0 10C18.954 10 10 18.954 10 30s8.954 20 20 20 20-8.954 20-20S41.046 10 30 10z" fill="%23f59e0b" fill-rule="evenodd"/%3E%3C/svg%3E')`, backgroundSize: '150px 150px' }} />

                <div className="relative z-10 px-12 text-center group">
                    {/* Glowing Flower Logo (Hoa sen chớm nở) */}
                    <div className="relative flex items-center justify-center w-20 h-20 mx-auto mb-6">
                        <div className="w-20 h-20 rounded-3xl bg-[#451a03] flex items-center justify-center border border-amber-700 shadow-[0_0_50px_rgba(245,158,11,0.2)] group-hover:scale-105 group-hover:border-amber-500 group-hover:shadow-[0_0_60px_rgba(245,158,11,0.35)] transition-all duration-300">
                            <Flower2 className="w-10 h-10 transition-transform duration-300 text-amber-400 fill-amber-400/10 group-hover:scale-110" strokeWidth={1.5} />
                        </div>
                        <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-amber-400 border-4 border-[#0d0f10] animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.6)]"></div>
                    </div>

                    <h2 className="mb-3 text-4xl font-black tracking-tight text-white uppercase">
                        Quản Trị <span className="text-amber-400">An Lạc</span>
                    </h2>
                    <p className="max-w-xs mx-auto text-sm leading-relaxed text-[#a8a18e]">
                        Đăng nhập để tiếp tục hành trình tĩnh lặng, quản trị công việc chốn thiền môn an lạc.
                    </p>
                </div>
            </div>

            {/* PHẢI: FORM ĐĂNG NHẬP */}
            <div className="relative flex items-center justify-center flex-1 px-6 py-12 overflow-y-auto bg-[#0a0d0f]">
                {/* Top-right subtle glow */}
                <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[100px] opacity-[0.06] bg-amber-400 pointer-events-none" />

                <div className="relative z-10 w-full max-w-sm">
                    <div className="relative mb-8">
                        {/* Mandala outline watermark */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 opacity-[0.02] border border-amber-600 rounded-full animate-[spin_60s_linear_infinite]" />

                        <h1 className="text-3xl font-black tracking-tight text-white">
                            Tĩnh lặng và Thức tỉnh <span className="inline-block animate-[wave_1.8s_ease-in-out_infinite]">🙏</span>
                        </h1>
                        <p className="mt-2 text-sm leading-relaxed text-[#a8a18e]">
                            Vui lòng đăng nhập tài khoản để tiếp tục công việc an lạc.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <FormField
                            icon={<User className="w-4 h-4" />}
                            label="Tên tài khoản"
                            placeholder="Nhập tên đăng nhập chốn thiền"
                            value={username}
                            onChange={setUsername}
                        />

                        <FormField
                            icon={<Lock className="w-4 h-4" />}
                            label="Mật khẩu"
                            placeholder="••••••"
                            type={showPw ? 'text' : 'password'}
                            value={password}
                            onChange={setPassword}
                            rightElement={
                                <button type="button" onClick={() => setShowPw(!showPw)} className="flex items-center justify-center h-full px-4 text-[#a8a18e] hover:text-amber-400 transition-colors">
                                    {showPw ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                                </button>
                            }
                        />

                        <div className="flex items-center justify-between pt-1 pb-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <button type="button" onClick={() => setRememberMe(!rememberMe)}
                                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${rememberMe
                                        ? 'bg-amber-500 border-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                                        : `bg-[#0d0f10] border-[#2a2d30] group-hover:border-[#3a3d40]`
                                        }`}>
                                    {rememberMe && (
                                        <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 12 12" fill="none">
                                            <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>
                                <span className="text-sm text-[#a8a18e] group-hover:text-white transition-colors">Ghi nhớ</span>
                            </label>
                            <button type="button" className="text-sm font-medium transition-colors text-amber-300 hover:text-amber-400">
                                Quên mật khẩu?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center w-full gap-2 py-3.5 mt-6 text-sm font-bold text-black transition-all shadow-lg rounded-xl bg-amber-500 shadow-amber-500/20 hover:bg-amber-400 hover:shadow-amber-500/40 active:scale-[0.98] disabled:opacity-50 group"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 rounded-full border-black/30 border-t-black animate-spin" />
                            ) : (
                                <>Đăng Nhập <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-sm text-center text-[#a8a18e]">
                        Chưa có tài khoản chốn thiền môn?
                        <Link to="/register" className="ml-1.5 font-semibold transition-colors text-amber-300 hover:text-amber-400">
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
                @keyframes drift { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(30px, -20px) scale(1.05); } 66% { transform: translate(-20px, 15px) scale(0.95); } }
                @keyframes wave { 0%, 60%, 100% { transform: rotate(0deg); } 10%, 30% { transform: rotate(14deg); } 20% { transform: rotate(-8deg); } 40% { transform: rotate(-4deg); } 50% { transform: rotate(10deg); } }
            `}</style>
        </div>
    );
}