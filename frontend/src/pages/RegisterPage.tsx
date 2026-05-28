import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '@/api/auth.api';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Lock, User, Calendar, Star, Leaf, Flower2, ChevronRight, Flame, Mail, BadgeCent } from 'lucide-react';

// --- HIỆU ỨNG THẺ LƠ LỬNG BÊN TRÁI (BUDDHIST & AMBER THEME) ---
function FloatingBuddhistCards() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
                    <p className="text-lg font-black tracking-tight text-[#fef3c7] leading-tight">Ghi Danh Tu Tập</p>
                    <p className="text-[#a8a18e] text-[11px] mt-0.5">Mở cửa luân hồi</p>
                </div>
            </div>

            {/* Card 2: Đồng Tu Online */}
            <div className="absolute top-[15%] right-[12%] animate-[float_7s_ease-in-out_infinite_0.5s]">
                <div className="bg-[#101213]/80 backdrop-blur-xl border border-white/5 rounded-2xl px-5 py-4 shadow-2xl shadow-black/40 w-44">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center justify-center border w-9 h-9 rounded-xl bg-orange-950 border-amber-800">
                            <Flame className="w-4 h-4 text-amber-400" />
                        </div>
                    </div>
                    <p className="text-xl font-black tracking-tight text-white">Bắt đầu</p>
                    <p className="text-[#a8a18e] text-[11px] mt-0.5">Hành trình giác ngộ</p>
                </div>
            </div>

            {/* Card 3: Tâm Bồ Đề (Bodhi Leaf icon) */}
            <div className="absolute bottom-[20%] left-[25%] animate-[float_5s_ease-in-out_infinite_1.5s]">
                <div className="bg-[#101213]/80 backdrop-blur-xl border border-amber-500/10 rounded-2xl px-5 py-4 shadow-2xl shadow-black/40 w-40">
                    <div className="flex items-center justify-center mb-2 border border-purple-800 w-9 h-9 rounded-xl bg-purple-500/15">
                        <Leaf className="w-4 h-4 text-purple-400 fill-purple-400/20" />
                    </div>
                    <p className="text-xl font-black leading-tight tracking-tight text-white">An Lạc</p>
                    <p className="text-[#a8a18e] text-[11px] mt-0.5">Tâm bồ đề kiên cố</p>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute bottom-[10%] right-[35%] w-24 h-24 rounded-full border border-amber-500/10 animate-[spin_30s_linear_infinite]" />
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

export default function RegisterPage() {
    const [form, setForm] = useState({ username: '', email: '', password: '', confirm_password: '', name: '' });
    const [showPw, setShowPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const update = (field: string) => (value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirm_password) {
            toast.error('Mật khẩu xác nhận không khớp!');
            return;
        }
        setLoading(true);
        try {
            const res = await authApi.register({ ...form, name: form.name || form.username });
            const { access_token, refresh_token, user } = res.data.result;
            await login(access_token, refresh_token, user);
            toast.success('Đăng ký thành công ✦');
            navigate('/');
        } catch (err: any) {
            const msg = err.response?.data?.message || err.response?.data?.errors?.[Object.keys(err.response?.data?.errors || {})[0]]?.msg;
            toast.error(msg || 'Đăng ký thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-[#0a0d0f]">
            {/* TRÁI: BUDDHIST BRANDING & EFFECT (Ẩn trên mobile) */}
            <div className="relative items-center justify-center hidden overflow-hidden lg:flex lg:w-[55%] bg-[#0d0f10]">
                <FloatingBuddhistCards />

                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M30 0c16.568 0 30 13.432 30 30S46.568 60 30 60 0 46.568 0 30 13.432 0 30 0zm0 10C18.954 10 10 18.954 10 30s8.954 20 20 20 20-8.954 20-20S41.046 10 30 10z" fill="%23f59e0b" fill-rule="evenodd"/%3E%3C/svg%3E')`, backgroundSize: '150px 150px' }} />

                <div className="relative z-10 px-12 text-center group">
                    <div className="relative flex items-center justify-center w-20 h-20 mx-auto mb-6">
                        <div className="w-20 h-20 rounded-3xl bg-[#451a03] flex items-center justify-center border border-amber-700 shadow-[0_0_50px_rgba(245,158,11,0.2)] group-hover:scale-105 group-hover:border-amber-500 group-hover:shadow-[0_0_60px_rgba(245,158,11,0.35)] transition-all duration-300">
                            <Flower2 className="w-10 h-10 transition-transform duration-300 text-amber-400 fill-amber-400/10 group-hover:scale-110" strokeWidth={1.5} />
                        </div>
                        <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-amber-400 border-4 border-[#0d0f10] animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.6)]"></div>
                    </div>

                    <h2 className="mb-3 text-4xl font-black tracking-tight text-white uppercase">
                        Ghi Danh <span className="text-amber-400">An Lạc</span>
                    </h2>
                    <p className="max-w-xs mx-auto text-sm leading-relaxed text-[#a8a18e]">
                        Bắt đầu hành trình tĩnh lặng của bạn. Tạo tài khoản để lưu giữ dữ liệu và quản trị hệ thống.
                    </p>
                </div>
            </div>

            {/* PHẢI: FORM ĐĂNG KÝ */}
            <div className="relative flex items-center justify-center flex-1 px-6 py-8 overflow-y-auto bg-[#0a0d0f]">
                <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[100px] opacity-[0.06] bg-amber-400 pointer-events-none" />

                <div className="relative z-10 w-full max-w-sm mt-8">
                    <div className="relative mb-6">
                        <div className="absolute -top-10 -right-10 w-32 h-32 opacity-[0.02] border border-amber-600 rounded-full animate-[spin_60s_linear_infinite]" />

                        <h1 className="text-3xl font-black tracking-tight text-white">
                            Khởi đầu hành trình <Sparkles className="inline-block animate-[wave_1.8s_ease-in-out_infinite] w-5 h-5 ml-1" />
                        </h1>
                        <p className="mt-2 text-sm leading-relaxed text-[#a8a18e]">
                            Điền thông tin bên dưới để tạo tài khoản mới.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormField
                            icon={<User className="w-4 h-4" />}
                            label="Tên tài khoản"
                            placeholder="Nhập username"
                            value={form.username}
                            onChange={update('username')}
                        />

                        <FormField
                            icon={<BadgeCent className="w-4 h-4" />}
                            label="Tên hiển thị"
                            placeholder="Nhập tên của bạn"
                            value={form.name}
                            onChange={update('name')}
                        />

                        <FormField
                            icon={<Mail className="w-4 h-4" />}
                            label="Email"
                            placeholder="you@example.com"
                            type="email"
                            value={form.email}
                            onChange={update('email')}
                        />

                        <FormField
                            icon={<Lock className="w-4 h-4" />}
                            label="Mật khẩu"
                            placeholder="Tối thiểu 6 ký tự"
                            type={showPw ? 'text' : 'password'}
                            value={form.password}
                            onChange={update('password')}
                            rightElement={
                                <button type="button" onClick={() => setShowPw(!showPw)} className="flex items-center justify-center h-full px-4 text-[#a8a18e] hover:text-amber-400 transition-colors">
                                    {showPw ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                                </button>
                            }
                        />

                        <FormField
                            icon={<Lock className="w-4 h-4" />}
                            label="Xác nhận mật khẩu"
                            placeholder="Nhập lại mật khẩu"
                            type={showConfirmPw ? 'text' : 'password'}
                            value={form.confirm_password}
                            onChange={update('confirm_password')}
                            rightElement={
                                <button type="button" onClick={() => setShowConfirmPw(!showConfirmPw)} className="flex items-center justify-center h-full px-4 text-[#a8a18e] hover:text-amber-400 transition-colors">
                                    {showConfirmPw ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                                </button>
                            }
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center w-full gap-2 py-3.5 mt-8 text-sm font-bold text-black transition-all shadow-lg rounded-xl bg-amber-500 shadow-amber-500/20 hover:bg-amber-400 hover:shadow-amber-500/40 active:scale-[0.98] disabled:opacity-50 group"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 rounded-full border-black/30 border-t-black animate-spin" />
                            ) : (
                                <>Tạo Tài Khoản <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-center text-[#a8a18e]">
                        Đã có tài khoản?
                        <Link to="/login" className="ml-1.5 font-semibold transition-colors text-amber-300 hover:text-amber-400">
                            Đăng nhập
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