import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Flower2, Leaf } from 'lucide-react'

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0d0f] relative overflow-hidden font-serif">
                {/* Amber and Yellow Glow Blobs */}
                <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.2] bg-amber-500 -top-20 -left-20 animate-[drift_20s_ease-in-out_infinite]" />
                <div className="absolute w-[300px] h-[300px] rounded-full blur-[100px] opacity-[0.12] bg-yellow-400 bottom-10 right-10 animate-[drift_15s_ease-in-out_infinite_reverse]" />

                {/* Spinning Bodhi Leaf Outline */}
                <div className="absolute top-[35%] left-[45%] w-24 h-24 animate-[spin_40s_linear_infinite_reverse] opacity-[0.03] pointer-events-none">
                    <Leaf className="w-full h-full text-amber-300" strokeWidth={1} />
                </div>

                <div className="relative z-10 text-center">
                    {/* Glowing Lotus / Flower Logo */}
                    <div className="relative flex items-center justify-center w-24 h-24 mx-auto mb-6">
                        {/* Outer rotating decorative ring */}
                        <div className="absolute inset-0 rounded-full border border-dashed border-amber-500/20 animate-[spin_20s_linear_infinite]" />
                        {/* Inner rotating ring */}
                        <div className="absolute w-20 h-20 rounded-full border border-amber-600/30 border-t-transparent border-b-transparent animate-[spin_8s_linear_infinite_reverse]" />

                        <div className="w-16 h-16 rounded-2xl bg-[#451a03] flex items-center justify-center border border-amber-700 shadow-[0_0_40px_rgba(245,158,11,0.25)] animate-pulse">
                            <Flower2 className="w-8 h-8 text-amber-400 fill-amber-400/10 animate-[spin_30s_linear_infinite]" strokeWidth={1.5} />
                        </div>
                        {/* Pulse Dot */}
                        <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-amber-400 border-[3px] border-[#0a0d0f] animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                    </div>

                    <h2 className="text-xl font-black tracking-[0.2em] text-[#fef3c7] uppercase leading-tight font-serif">
                        Đang Khởi Tạo
                    </h2>
                    <p className="text-amber-500/60 text-xs tracking-[0.15em] font-sans mt-2 animate-pulse">
                        Tĩnh lặng &amp; Thức tỉnh...
                    </p>
                </div>

                {/* CSS keyframe animations */}
                <style>{`
                    @keyframes drift {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        33% { transform: translate(30px, -20px) scale(1.05); }
                        66% { transform: translate(-20px, 15px) scale(0.95); }
                    }
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        )
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}