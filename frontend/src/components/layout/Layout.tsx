import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useAuth } from '@/contexts/AuthContext'
import FloatingAssistant from '@/components/ui/FloatingAssistant'

export default function Layout() {
    const { isAuthenticated } = useAuth()
    const location = useLocation()
    const isHomePage = location.pathname === '/'

    return (
        <div className="relative flex flex-col h-[100dvh] w-full page-bg overflow-hidden">
            <Header />

            <main className="relative flex flex-col flex-1 w-full overflow-y-auto overflow-x-hidden custom-scrollbar">
                <Outlet />
            </main>

            {isAuthenticated && <Footer />}

            {isAuthenticated && <FloatingAssistant />}
        </div>
    )
}