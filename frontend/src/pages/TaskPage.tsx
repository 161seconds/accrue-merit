import { useState, useEffect } from 'react';
import {
    CheckCircle2,
    Circle,
    BookOpen,
    Trophy,
    Flame,
    Loader2,
    Target,
    AlertCircle,
    Sparkles,
    Lock,
    Clock,
} from 'lucide-react';
import { PrayIcon } from '@/components/ui/Icons';
import { missionApi } from '@/api/mission.api';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import GoldDust from '@/components/ui/GoldDust';

interface Mission {
    _id?: string;
    id?: string;
    icon: string;
    name: string;
    desc: string;
    pts: number;
    streakBonus?: boolean;
    isChain: boolean;
    chainDays?: number;
}

export default function TaskPage() {
    const [missions, setMissions] = useState<Mission[]>([]);
    const [completed, setCompleted] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAllNormalMissions, setShowAllNormalMissions] = useState(false);

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await missionApi.getAll();
                const data = response.data.result || response.data || [];

                setMissions(Array.isArray(data) ? data : []);

                setCompleted(response.data.completedIds || []);
            } catch (err: any) {
                console.error('Lỗi kết nối Backend:', err);
                setError('Không thể thỉnh danh sách nhiệm vụ. Xin đạo hữu kiểm tra lại kết nối.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMissions();
    }, []);

    const getMissionId = (mission: Mission) => {
        return mission._id || mission.id || '';
    };

    const { refreshProfile } = useAuth();
    const toggleMission = async (missionId: string) => {
        if (!missionId) {
            toast.error('Không tìm thấy ID nhiệm vụ');
            return;
        }

        const isCurrentlyCompleted = completed.includes(missionId);

        setCompleted(prev =>
            isCurrentlyCompleted
                ? prev.filter(id => id !== missionId)
                : [...prev, missionId]
        );

        try {
            await missionApi.complete(missionId);

            if (!isCurrentlyCompleted) {
                toast.success(<span className="flex items-center gap-2">Đã hoàn thành nhiệm vụ và cộng điểm! <PrayIcon className="w-4 h-4" /></span>);
                await refreshProfile(); // Cập nhật lại điểm số
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Có lỗi xảy ra khi ghi nhận công đức');

            setCompleted(prev =>
                isCurrentlyCompleted
                    ? [...prev, missionId]
                    : prev.filter(id => id !== missionId)
            );
        }
    };

    const normalMissions = missions.filter(mission => !mission.isChain);
    const chainMissions = missions.filter(mission => mission.isChain);

    const visibleNormalMissions = showAllNormalMissions
        ? normalMissions
        : normalMissions.slice(0, 10);

    const progress =
        missions.length > 0 ? Math.round((completed.length / missions.length) * 100) : 0;

    const totalPoints = missions
        .filter(mission => completed.includes(getMissionId(mission)))
        .reduce((sum, mission) => sum + mission.pts, 0);

    const getCategoryName = (id: string) => {
        if (id.startsWith('d')) return 'Nhật tu';
        if (id.startsWith('w')) return 'Tuần / Đặc biệt';
        return 'Khác';
    };

    return (
        <main className="relative min-h-full bg-transparent px-4 pb-32 pt-24 text-parchment sm:px-6">
            <GoldDust />
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-gold-light/10 blur-[120px]" />
                <div className="absolute -left-32 top-36 h-80 w-80 rounded-full bg-jade/10 blur-[90px]" />
                <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-gold-dim/10 blur-[110px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.055),transparent_34%)]" />
            </div>

            <section className="relative z-10 mx-auto max-w-7xl">
                {/* Header */}
                <div className="flex flex-col gap-5 mb-8 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-parchment/60 shadow-lg backdrop-blur-xl">
                            <Sparkles size={14} className="text-gold-light" />
                            Sổ nhiệm vụ hằng ngày
                        </div>

                        <h1 className="text-4xl font-black tracking-tight font-display text-parchment sm:text-5xl">
                            Sổ Tay{' '}
                            <span className="text-transparent bg-gradient-to-r from-gold-light to-gold-dim bg-clip-text">
                                Tu Tập
                            </span>
                        </h1>

                        <p className="max-w-xl mt-3 text-sm leading-6 text-parchment/50">
                            Hoàn thành nhiệm vụ, giữ streak, tích điểm công đức.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:flex">
                        <StatCard
                            icon={<Trophy size={18} />}
                            label="Điểm"
                            value={totalPoints}
                            suffix="Pts"
                        />

                        <StatCard
                            icon={<Flame size={18} />}
                            label="Đã xong"
                            value={completed.length}
                            suffix={`/${missions.length}`}
                        />
                    </div>
                </div>

                {/* Progress box */}
                <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl md:p-6">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-5">
                            <ProgressCircle progress={progress} />

                            <div>
                                <h2 className="text-xl font-black text-parchment">
                                    Tiến độ Chánh niệm
                                </h2>

                                <p className="mt-1 text-sm text-parchment/50">
                                    {completed.length} / {missions.length} nhiệm vụ đã hoàn thành
                                </p>
                            </div>
                        </div>

                        <div className="w-full md:max-w-sm">
                            <div className="flex items-center justify-between mb-2 text-xs text-parchment/45">
                                <span>Tiến độ hôm nay</span>
                                <span>{progress}%</span>
                            </div>

                            <div className="h-3 overflow-hidden rounded-full bg-black/30 ring-1 ring-white/10">
                                <div
                                    className="h-full transition-all duration-700 rounded-full bg-gradient-to-r from-jade-light via-gold-dim to-gold-light"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* States */}
                {isLoading && <LoadingState />}

                {!isLoading && error && <ErrorState message={error} />}

                {!isLoading && !error && missions.length === 0 && <EmptyState />}

                {!isLoading && !error && missions.length > 0 && (
                    <div className="space-y-10">
                        <MissionGrid
                            title="Công phu"
                            desc="Hiển thị 10 nhiệm vụ hôm nay cho gọn."
                            icon={<BookOpen size={18} />}
                            missions={visibleNormalMissions}
                            totalCount={normalMissions.length}
                            completed={completed}
                            onToggle={toggleMission}
                            getMissionId={getMissionId}
                            getCategoryName={getCategoryName}
                            action={
                                normalMissions.length > 10 ? (
                                    <button
                                        type="button"
                                        onClick={() => setShowAllNormalMissions(prev => !prev)}
                                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-parchment/55 transition hover:border-gold-light/30 hover:text-gold-light"
                                    >
                                        {showAllNormalMissions
                                            ? 'Thu gọn'
                                            : `Xem thêm ${normalMissions.length - 10}`}
                                    </button>
                                ) : null
                            }
                        />

                        <MissionGrid
                            title="Chuỗi thử thách"
                            desc="Hệ thống tự động ghi nhận phần thưởng khi đạo hữu duy trì chuỗi tu tập liên tục. Đừng làm đứt chuỗi nhé!"
                            icon={<Target size={18} />}
                            missions={chainMissions}
                            totalCount={chainMissions.length}
                            completed={completed}
                            onToggle={toggleMission}
                            getMissionId={getMissionId}
                            getCategoryName={getCategoryName}
                            isChain
                        />
                    </div>
                )}
            </section>
        </main>
    );
}

function StatCard({
    icon,
    label,
    value,
    suffix,
}: {
    icon: React.ReactNode;
    label: string;
    value: number;
    suffix: string;
}) {
    return (
        <div className="min-w-[135px] rounded-3xl border border-white/10 bg-white/[0.045] p-4 shadow-xl shadow-black/20 backdrop-blur-xl">
            <div className="flex items-center justify-center mb-3 h-9 w-9 rounded-2xl bg-gold-light/10 text-gold-light">
                {icon}
            </div>

            <p className="text-xs font-medium text-parchment/45">{label}</p>

            <p className="mt-1 text-2xl font-black text-parchment">
                {value}
                <span className="ml-1 text-sm text-parchment/45">{suffix}</span>
            </p>
        </div>
    );
}

function ProgressCircle({ progress }: { progress: number }) {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative grid w-24 h-24 rounded-full shrink-0 place-items-center bg-black/20 ring-1 ring-white/10">
            <svg className="w-24 h-24 -rotate-90">
                <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-white/10"
                />

                <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-all duration-700 text-gold-light"
                />
            </svg>

            <div className="absolute text-center">
                <p className="text-xl font-black text-parchment">{progress}%</p>
                <p className="text-[10px] uppercase tracking-wide text-parchment/35">
                    done
                </p>
            </div>
        </div>
    );
}

function MissionGrid({
    title,
    desc,
    icon,
    missions,
    totalCount,
    completed,
    onToggle,
    getMissionId,
    getCategoryName,
    isChain = false,
    action = null,
}: {
    title: string;
    desc: string;
    icon: React.ReactNode;
    missions: Mission[];
    totalCount?: number;
    completed: string[];
    onToggle: (id: string) => void;
    getMissionId: (mission: Mission) => string;
    getCategoryName: (id: string) => string;
    isChain?: boolean;
    action?: React.ReactNode;
}) {
    if (missions.length === 0) return null;

    return (
        <section>
            <div className="flex items-start justify-between gap-4 mb-4 sm:items-center">
                <div>
                    <h2 className="flex items-center gap-2 text-xl font-black font-display text-parchment">
                        <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gold-light/10 text-gold-light">
                            {icon}
                        </span>
                        {title}
                    </h2>

                    <p className="mt-1 text-sm text-parchment/45">{desc}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    {action}

                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-parchment/45">
                        {missions.length}
                        {totalCount && totalCount !== missions.length ? `/${totalCount}` : ''} ô
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {missions.map(mission => {
                    const missionId = getMissionId(mission);
                    const categoryId = mission.id || missionId;

                    return (
                        <MissionTile
                            key={missionId}
                            mission={mission}
                            isCompleted={completed.includes(missionId)}
                            onClick={() => onToggle(missionId)}
                            category={
                                isChain
                                    ? `${mission.chainDays || 0} ngày`
                                    : getCategoryName(categoryId)
                            }
                            isChain={isChain}
                        />
                    );
                })}
            </div>
        </section>
    );
}

function MissionTile({
    mission,
    isCompleted,
    onClick,
    category,
    isChain,
}: {
    mission: Mission;
    isCompleted: boolean;
    onClick: () => void;
    category: string;
    isChain?: boolean;
}) {
    const Component = isChain ? 'div' : 'button';
    
    return (
        <Component
            type={isChain ? undefined : 'button'}
            onClick={isChain ? undefined : onClick}
            className={`group relative aspect-square overflow-hidden rounded-[1.7rem] border p-4 text-left shadow-xl transition-all duration-300 ${
                isChain ? '' : 'hover:-translate-y-1 cursor-pointer'
            } ${isCompleted
                ? 'border-jade-light/25 bg-jade/[0.08] shadow-[#0a1a10]/20'
                : `${isChain ? 'border-dashed border-white/20 bg-[#101812]/50 opacity-80' : 'border-white/10 bg-[#101812]/90 hover:border-gold-light/35 hover:bg-[#162018]'} shadow-black/25`
                }`}
        >
            {!isChain && (
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100">
                    <div className="absolute rounded-full -right-10 -top-10 h-28 w-28 bg-gold-light/15 blur-2xl" />
                </div>
            )}

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                    <div
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl ring-1 ring-white/10 ${isCompleted ? 'bg-jade-light/10 opacity-50' : 'bg-white/[0.05]'
                            }`}
                    >
                        {mission.icon}
                    </div>

                    <span
                        className={`transition shrink-0 flex items-center justify-center ${isCompleted
                            ? 'text-jade-light'
                            : `text-white/25 ${isChain ? '' : 'group-hover:text-gold-light'}`
                            }`}
                    >
                        {isCompleted ? <CheckCircle2 size={23} /> : (isChain ? <Lock size={18} /> : <Circle size={23} />)}
                    </span>
                </div>

                <div className="flex-1 min-h-0">
                    <h3
                        className={`line-clamp-2 text-sm font-black leading-snug ${isCompleted
                            ? 'text-parchment/45 line-through'
                            : 'text-parchment'
                            }`}
                    >
                        {mission.name}
                    </h3>

                    <p className="mt-2 text-xs leading-5 line-clamp-2 text-parchment/40">
                        {mission.desc}
                    </p>
                </div>

                <div className="flex items-center justify-between gap-2 mt-3">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <span className="truncate rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-parchment/40">
                            {category}
                        </span>
                        {isChain && (
                            <span className="shrink-0 rounded-full bg-orange-400/10 px-2 py-1 text-[10px] font-black text-orange-200 ring-1 ring-orange-300/10">
                                Streak
                            </span>
                        )}
                    </div>

                    <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-black ring-1 ${isCompleted
                            ? 'bg-jade-light/10 text-jade-light ring-jade-light/10'
                            : 'bg-gold-light/10 text-gold-light ring-gold-light/10'
                            }`}
                    >
                        +{mission.pts}
                    </span>
                </div>
            </div>
        </Component>
    );
}

function LoadingState() {
    return (
        <div className="grid min-h-[260px] place-items-center rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 text-center shadow-2xl shadow-black/20 backdrop-blur-2xl">
            <div>
                <Loader2 className="mx-auto mb-4 animate-spin text-gold-light" size={34} />

                <h3 className="text-lg font-black text-parchment">
                    Đang tải nhiệm vụ
                </h3>

                <p className="mt-2 text-sm text-parchment/45">
                    Đợi xíu, dữ liệu đang được kéo về.
                </p>
            </div>
        </div>
    );
}

function ErrorState({ message }: { message: string }) {
    return (
        <div className="rounded-[2rem] border border-red-400/20 bg-red-500/[0.08] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl">
            <div className="flex gap-4">
                <div className="grid text-red-200 h-11 w-11 shrink-0 place-items-center rounded-2xl bg-red-400/10">
                    <AlertCircle size={22} />
                </div>

                <div>
                    <h3 className="font-black text-red-100">
                        Backend đang có vấn đề
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-red-100/65">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="grid min-h-[260px] place-items-center rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 text-center shadow-2xl shadow-black/20 backdrop-blur-2xl">
            <div>
                <div className="grid mx-auto mb-4 h-14 w-14 place-items-center rounded-3xl bg-gold-light/10 text-gold-light">
                    <BookOpen size={26} />
                </div>

                <h3 className="text-lg font-black text-parchment">
                    Chưa có nhiệm vụ
                </h3>

                <p className="mt-2 text-sm text-parchment/45">
                    Database chưa trả về mission nào, nên màn hình đang trống.
                </p>
            </div>
        </div>
    );
}