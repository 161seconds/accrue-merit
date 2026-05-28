import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { userApi } from '@/api/user.api';
import { useNavigate } from 'react-router-dom';
import Dialog from '@/components/ui/Dialog';
import toast from 'react-hot-toast';
import { User, Lock, Type, Palette, Globe, Trash2, ChevronRight, LogOut, Settings as SettingsIcon, Shield, Mail, AlertTriangle } from 'lucide-react';

export default function SettingsPage() {
    const { user, updateUser, logout } = useAuth();
    const navigate = useNavigate();

    const [nameDialog, setNameDialog] = useState(false);
    const [pwDialog, setPwDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const [newName, setNewName] = useState(user?.name || '');
    const [pwForm, setPwForm] = useState({ old_password: '', password: '', confirm_password: '' });
    const [deletePassword, setDeletePassword] = useState('');

    const handleUpdateName = async () => {
        try {
            const res = await userApi.updateProfile({ name: newName.trim() });
            updateUser(res.data.result);
            toast.success('Cập nhật tên thành công');
            setNameDialog(false);
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Lỗi');
        }
    };

    const handleChangePassword = async () => {
        if (pwForm.password !== pwForm.confirm_password) return toast.error('Mật khẩu xác nhận không khớp');
        try {
            await userApi.changePassword(pwForm);
            toast.success('Đổi mật khẩu thành công');
            setPwDialog(false);
            setPwForm({ old_password: '', password: '', confirm_password: '' });
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Lỗi');
        }
    };

    const handleUpdateFont = async (font: string) => {
        try {
            await userApi.updateSettings({ font });
            if (user) updateUser({ ...user, settings: { ...user.settings, font } });
            toast.success('Đã đổi font');
        } catch { }
    };

    const handleDeleteAccount = async () => {
        try {
            await userApi.deleteAccount(deletePassword);
            toast.success('Tài khoản đã được xoá');
            await logout();
            navigate('/login');
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Mật khẩu không đúng');
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <main className="relative min-h-full overflow-x-hidden bg-transparent px-4 pb-16 pt-24 text-parchment sm:px-6 flex flex-col">
            {/* Background glow elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gold-light/10 blur-[120px]" />
                <div className="absolute -left-32 top-36 h-80 w-80 rounded-full bg-jade/10 blur-[90px]" />
                <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-gold-dim/10 blur-[110px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_60%)]" />
            </div>

            <section className="relative z-10 flex-1 w-full max-w-3xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-2 mb-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-parchment/60 shadow-lg backdrop-blur-xl w-fit">
                        <SettingsIcon size={14} className="text-gold-light" />
                        Tuỳ chỉnh & Cấu hình
                    </div>
                    <h1 className="text-4xl font-black tracking-tight font-display text-parchment sm:text-5xl">
                        Cài Đặt{' '}
                        <span className="text-transparent bg-gradient-to-r from-gold-light to-gold-dim bg-clip-text">
                            Hệ Thống
                        </span>
                    </h1>
                    <p className="max-w-xl mt-2 text-sm leading-6 text-parchment/50">
                        Quản lý tài khoản, giao diện và các tuỳ chọn cá nhân hoá của đạo hữu.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8 shadow-2xl backdrop-blur-xl group">
                    <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-gold-light/5 via-transparent to-transparent group-hover:opacity-100" />
                    
                    <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
                        <div className="relative shrink-0">
                            <div className="grid w-24 h-24 rounded-full sm:w-28 sm:h-28 place-items-center bg-gradient-to-br from-gold-dim/20 to-gold-light/5 ring-1 ring-gold-light/20 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover rounded-full p-1" />
                                ) : (
                                    <span className="text-4xl font-black font-display text-gold-light/60">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <button 
                                onClick={() => setNameDialog(true)}
                                className="absolute bottom-0 right-0 grid w-8 h-8 rounded-full bg-gold-light text-[#07100b] shadow-lg hover:scale-110 transition-transform place-items-center"
                            >
                                <User size={14} strokeWidth={2.5} />
                            </button>
                        </div>

                        <div className="flex-1">
                            <h2 className="text-2xl sm:text-3xl font-black font-display text-parchment">{user?.name}</h2>
                            <p className="flex items-center gap-2 mt-1.5 text-sm text-parchment/50">
                                <Mail size={14} className="text-gold-dim" /> {user?.email}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 mt-4">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-jade/20 bg-jade/10 px-3 py-1 text-xs font-bold text-jade-light">
                                    <Shield size={12} /> Đạo hữu chính thức
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-parchment/60">
                                    ID: {user?.username}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cài đặt tài khoản */}
                    <div className="space-y-4">
                        <h3 className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gold-light/80">
                            <User size={16} /> Tài Khoản
                        </h3>
                        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
                            <Item 
                                icon={<User size={16} className="text-gold-dim" />} 
                                label="Tên hiển thị" 
                                value={user?.name} 
                                onClick={() => setNameDialog(true)} 
                            />
                            <Item 
                                icon={<Lock size={16} className="text-gold-dim" />} 
                                label="Đổi mật khẩu" 
                                value="••••••" 
                                onClick={() => setPwDialog(true)} 
                            />
                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-between w-full px-5 py-4 text-sm text-left transition-colors bg-transparent border-t cursor-pointer text-parchment border-white/5 hover:bg-white/5 group"
                            >
                                <span className="flex items-center gap-3">
                                    <LogOut size={16} className="text-parchment/40 group-hover:text-parchment/70 transition-colors" /> Đăng xuất
                                </span>
                                <ChevronRight size={14} className="text-parchment/30 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Cài đặt giao diện */}
                    <div className="space-y-4">
                        <h3 className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gold-light/80">
                            <Palette size={16} /> Giao Diện
                        </h3>
                        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
                            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                                <span className="flex items-center gap-3 text-sm text-parchment">
                                    <Type size={16} className="text-gold-dim" /> Font chữ
                                </span>
                                <select
                                    className="px-3 py-1.5 text-xs font-medium bg-black/40 border rounded-lg outline-none cursor-pointer text-gold-light border-gold-dim/30 hover:border-gold-light/50 transition-colors"
                                    value={user?.settings.font || 'Lora'}
                                    onChange={(e) => handleUpdateFont(e.target.value)}
                                >
                                    {['Lora', 'Cinzel', 'Quicksand', 'Playfair Display'].map((f) => (
                                        <option key={f} value={f} className="bg-[#111812] text-parchment">{f}</option>
                                    ))}
                                </select>
                            </div>
                            <Item 
                                icon={<Palette size={16} className="text-gold-dim" />} 
                                label="Chủ đề" 
                                value={user?.settings.theme === 'dark' ? 'Tối (Mặc định)' : user?.settings.theme} 
                            />
                            <Item 
                                icon={<Globe size={16} className="text-gold-dim" />} 
                                label="Ngôn ngữ" 
                                value={user?.settings.language === 'vi' ? 'Tiếng Việt' : 'English'} 
                                hideBorder
                            />
                        </div>
                    </div>
                </div>

                {/* Vùng nguy hiểm */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <h3 className="flex items-center gap-2 mb-4 text-sm font-bold tracking-widest uppercase text-red-400/80">
                        <Shield size={16} /> Vùng Nguy Hiểm
                    </h3>
                    <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h4 className="text-parchment font-bold mb-1">Xoá tài khoản vĩnh viễn</h4>
                            <p className="text-xs text-parchment/40 max-w-sm">
                                Toàn bộ dữ liệu công đức, nhiệm vụ và vật phẩm sẽ bị xoá vĩnh viễn và không thể khôi phục.
                            </p>
                        </div>
                        <button
                            onClick={() => setDeleteDialog(true)}
                            className="shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-red-200 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Trash2 size={16} /> Xoá Tài Khoản
                        </button>
                    </div>
                </div>
            </section>

            {/* Dialogs */}
            <Dialog open={nameDialog} onClose={() => setNameDialog(false)} title="Đổi Tên Hiển Thị" actions={
                <div className="flex w-full gap-3 pt-2">
                    <button className="flex-1 py-3 text-sm font-bold rounded-xl bg-white/5 text-parchment/60 hover:bg-white/10 transition-colors" onClick={() => setNameDialog(false)}>Huỷ bỏ</button>
                    <button className="flex-1 py-3 text-sm font-bold text-[#07100b] rounded-xl bg-gradient-to-r from-gold-light to-gold-dim shadow-lg hover:shadow-gold-light/20 transition-all hover:-translate-y-0.5" onClick={handleUpdateName}>Lưu Thay Đổi</button>
                </div>
            }>
                <div className="space-y-4">
                    <p className="text-sm text-parchment/50">Tên hiển thị sẽ được dùng trong các bảng xếp hạng và giao tiếp với hệ thống.</p>
                    <div className="relative">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-parchment/30" />
                        <input 
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-11 py-3.5 text-parchment outline-none focus:border-gold-light/50 focus:ring-1 focus:ring-gold-light/50 transition-all" 
                            placeholder="Nhập tên mới..."
                            value={newName} 
                            onChange={(e) => setNewName(e.target.value)} 
                        />
                    </div>
                </div>
            </Dialog>

            <Dialog open={pwDialog} onClose={() => setPwDialog(false)} title="Đổi Mật Khẩu" actions={
                <div className="flex w-full gap-3 pt-2">
                    <button className="flex-1 py-3 text-sm font-bold rounded-xl bg-white/5 text-parchment/60 hover:bg-white/10 transition-colors" onClick={() => setPwDialog(false)}>Huỷ bỏ</button>
                    <button className="flex-1 py-3 text-sm font-bold text-[#07100b] rounded-xl bg-gradient-to-r from-gold-light to-gold-dim shadow-lg hover:shadow-gold-light/20 transition-all hover:-translate-y-0.5" onClick={handleChangePassword}>Xác Nhận Đổi</button>
                </div>
            }>
                <div className="space-y-3">
                    <div className="relative">
                        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-parchment/30" />
                        <input type="password" className="w-full bg-black/40 border border-white/10 rounded-xl px-11 py-3.5 text-parchment outline-none focus:border-gold-light/50 transition-all" placeholder="Mật khẩu cũ" value={pwForm.old_password} onChange={(e) => setPwForm({ ...pwForm, old_password: e.target.value })} />
                    </div>
                    <div className="relative">
                        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-parchment/30" />
                        <input type="password" className="w-full bg-black/40 border border-white/10 rounded-xl px-11 py-3.5 text-parchment outline-none focus:border-gold-light/50 transition-all" placeholder="Mật khẩu mới" value={pwForm.password} onChange={(e) => setPwForm({ ...pwForm, password: e.target.value })} />
                    </div>
                    <div className="relative">
                        <Shield size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-parchment/30" />
                        <input type="password" className="w-full bg-black/40 border border-white/10 rounded-xl px-11 py-3.5 text-parchment outline-none focus:border-gold-light/50 transition-all" placeholder="Xác nhận mật khẩu mới" value={pwForm.confirm_password} onChange={(e) => setPwForm({ ...pwForm, confirm_password: e.target.value })} />
                    </div>
                </div>
            </Dialog>

            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)} title={<span className="flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-red-500" /> Xoá Tài Khoản</span>} actions={
                <div className="flex w-full gap-3 pt-2">
                    <button className="flex-1 py-3 text-sm font-bold rounded-xl bg-white/5 text-parchment/60 hover:bg-white/10 transition-colors" onClick={() => setDeleteDialog(false)}>Huỷ, giữ lại</button>
                    <button className="flex-1 py-3 text-sm font-bold text-white rounded-xl bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all" onClick={handleDeleteAccount}>Xoá Vĩnh Viễn</button>
                </div>
            }>
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm leading-relaxed">
                        Hành động này <strong className="text-red-400">KHÔNG THỂ</strong> hoàn tác. Xin đạo hữu hãy suy nghĩ kỹ trước khi quyết định huỷ bỏ toàn bộ công đức đã tu tập.
                    </div>
                    <p className="text-sm text-parchment/60">Vui lòng nhập mật khẩu để xác nhận:</p>
                    <div className="relative">
                        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-parchment/30" />
                        <input type="password" className="w-full bg-black/40 border border-red-500/30 rounded-xl px-11 py-3.5 text-parchment outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" placeholder="Mật khẩu của bạn" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} />
                    </div>
                </div>
            </Dialog>
        </main>
    )
}

function Item({ icon, label, value, onClick, hideBorder = false }: { icon: React.ReactNode; label: string; value?: string; onClick?: () => void; hideBorder?: boolean }) {
    const Component = onClick ? 'button' : 'div'
    return (
        <Component
            onClick={onClick}
            className={`flex items-center justify-between w-full px-5 py-4 text-sm text-left transition-colors bg-transparent border-white/5 group ${onClick ? 'cursor-pointer hover:bg-white/5' : ''} ${!hideBorder ? 'border-b' : ''}`}
        >
            <span className="flex items-center gap-3 text-parchment">
                {icon} {label}
            </span>
            <span className="flex items-center gap-2 text-xs font-bold text-parchment/40">
                {value}
                {onClick && <ChevronRight size={14} className="text-parchment/30 group-hover:translate-x-1 group-hover:text-parchment/60 transition-all" />}
            </span>
        </Component>
    )
}