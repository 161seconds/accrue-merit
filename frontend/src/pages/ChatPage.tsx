import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, Bot, Sparkles, Loader2 } from 'lucide-react'

interface Message {
    id: string
    text: string
    displayText: string
    sender: 'ai' | 'user'
    timestamp: Date
    isStreaming: boolean
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const streamIntervalRef = useRef<number | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    useEffect(() => { scrollToBottom() }, [messages, isTyping])

    // Auto resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
        }
    }, [inputValue])

    const streamText = useCallback((msgId: string, fullText: string) => {
        let charIndex = 0
        const speed = 15

        if (streamIntervalRef.current) clearInterval(streamIntervalRef.current)

        streamIntervalRef.current = window.setInterval(() => {
            charIndex += 1 + Math.floor(Math.random() * 2)
            if (charIndex >= fullText.length) {
                charIndex = fullText.length
                if (streamIntervalRef.current) clearInterval(streamIntervalRef.current)
                setMessages(prev => prev.map(m => m.id === msgId ? { ...m, displayText: fullText, isStreaming: false } : m))
            } else {
                setMessages(prev => prev.map(m => m.id === msgId ? { ...m, displayText: fullText.slice(0, charIndex) } : m))
            }
        }, speed)
    }, [])

    useEffect(() => {
        if (messages.length === 0) {
            setIsTyping(true)
            const timer = setTimeout(() => {
                const welcomeText = 'Nam mô A Di Đà Phật. Bần Tăng ở đây để cùng Thí Chủ chia sẻ Phật pháp và gỡ rối những vướng mắc. Thí Chủ muốn đàm đạo điều gì?'
                const msg: Message = {
                    id: 'welcome-1', text: welcomeText, displayText: '',
                    sender: 'ai', timestamp: new Date(), isStreaming: true
                }
                setMessages([msg])
                setIsTyping(false)
                streamText('welcome-1', welcomeText)
            }, 800)
            return () => clearTimeout(timer)
        }
    }, [])

    const renderMessageText = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g)
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-bold text-gold-light">{part.slice(2, -2)}</strong>
            }
            return <span key={i}>{part}</span>
        })
    }

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return
        const userText = inputValue

        const userMsg: Message = {
            id: Date.now().toString(), text: userText, displayText: userText,
            sender: 'user', timestamp: new Date(), isStreaming: false
        }
        setMessages(prev => [...prev, userMsg])
        setInputValue('')
        if (textareaRef.current) textareaRef.current.style.height = 'auto'
        setIsTyping(true)

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`

            const historyContents = messages.filter(m => m.id !== 'welcome-1').map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            }))
            historyContents.push({ role: 'user', parts: [{ text: userText }] })

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{ text: "Bạn là Tuệ Năng AI, một trợ lý chánh niệm. Xưng là 'Bần Tăng' và gọi người dùng là 'Thí Chủ'. Trả lời từ bi, thiền học, ngắn gọn." }]
                    },
                    contents: historyContents
                })
            })

            const data = await response.json()
            if (!response.ok || !data.candidates) throw new Error(data.error?.message || `HTTP ${response.status}`)

            const aiText = data.candidates[0].content.parts[0].text
            const aiMsgId = (Date.now() + 1).toString()
            const aiMsg: Message = {
                id: aiMsgId, text: aiText, displayText: '',
                sender: 'ai', timestamp: new Date(), isStreaming: true
            }
            setMessages(prev => [...prev, aiMsg])
            setIsTyping(false)
            streamText(aiMsgId, aiText)
        } catch (error: any) {
            const errText = `A Di Đà Phật. Có chướng ngại khi kết nối (${error.message}). Thí Chủ vui lòng thử lại.`
            const errId = (Date.now() + 1).toString()
            setMessages(prev => [...prev, {
                id: errId, text: errText, displayText: '',
                sender: 'ai', timestamp: new Date(), isStreaming: true
            }])
            setIsTyping(false)
            streamText(errId, errText)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage() } }
    const formatTime = (d: Date) => d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })

    return (
        <div className="absolute inset-0 z-40 flex flex-col bg-[#07100b]">
            {/* Ambient Backgrounds */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] transition-all duration-[4000ms] ${isTyping ? 'bg-gold-light/20 scale-110' : 'bg-gold-dim/10 scale-100'} -translate-y-1/2 translate-x-1/3`} />
                <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] transition-all duration-[4000ms] delay-700 ${isTyping ? 'bg-jade/20 scale-110' : 'bg-jade/10 scale-100'} translate-y-1/3 -translate-x-1/4`} />
                {/* Subtle Zen Grid */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            {/* Messages — takes remaining space and scrolls */}
            <div className="relative z-10 flex-1 overflow-y-auto px-4 pt-24 pb-4 custom-scrollbar scroll-smooth">
                <div className="max-w-3xl mx-auto space-y-6">
                    {/* Decorative Header inside scroll area */}
                    <div className="flex flex-col items-center justify-center mb-8 animate-[fadeSlideIn_0.8s_ease-out]">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-gold-dim/20 to-gold-light/5 border border-gold-light/20 mb-3 shadow-[0_0_20px_rgba(201,168,76,0.15)]">
                            <Sparkles className="text-gold-light w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-black font-display tracking-widest text-transparent bg-gradient-to-r from-gold-light to-gold-dim bg-clip-text uppercase mb-1">
                            Tuệ Năng AI
                        </h2>
                        <div className="flex items-center gap-2 text-xs font-serif italic text-parchment/40">
                            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold-dim/50" />
                            Đàm đạo chánh niệm
                            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gold-dim/50" />
                        </div>
                    </div>
                    {messages.map((msg) => {
                        const isAI = msg.sender === 'ai'
                        return (
                            <div key={msg.id} className={`flex gap-3 w-full ${isAI ? 'justify-start' : 'justify-end'} animate-[fadeSlideIn_0.4s_ease-out]`}>
                                {isAI && (
                                    <div className="flex items-center justify-center w-8 h-8 mt-2 rounded-full bg-gradient-to-br from-gold-dim to-gold-light text-[#07100b] shrink-0 shadow-[0_0_15px_rgba(201,168,76,0.3)]">
                                        <Bot size={16} />
                                    </div>
                                )}
                                <div className={`relative max-w-[85%] px-5 py-4 shadow-2xl ${isAI
                                    ? 'bg-[#101812]/80 backdrop-blur-2xl border border-white/10 text-parchment/90 rounded-[2rem] rounded-tl-sm'
                                    : 'bg-gradient-to-br from-gold-light/20 to-gold-dim/10 backdrop-blur-2xl border border-gold-light/20 text-parchment rounded-[2rem] rounded-tr-sm'
                                    }`}>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap font-serif">
                                        {renderMessageText(msg.displayText)}
                                        {msg.isStreaming && (
                                            <span className="inline-block w-0.5 h-4 ml-0.5 bg-gold-light animate-[blink_0.8s_infinite] align-text-bottom rounded-full" />
                                        )}
                                    </p>
                                    {!msg.isStreaming && (
                                        <span className="block text-[9px] mt-2 opacity-30 text-right uppercase tracking-wider">
                                            {formatTime(msg.timestamp)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )
                    })}

                    {/* Typing indicator */}
                    {isTyping && (
                        <div className="flex justify-start w-full gap-3 animate-[fadeSlideIn_0.3s_ease-out]">
                            <div className="flex items-center justify-center w-8 h-8 mt-2 rounded-full bg-gradient-to-br from-gold-dim to-gold-light text-[#07100b] shrink-0 shadow-[0_0_10px_rgba(201,168,76,0.2)]">
                                <Loader2 size={14} className="animate-spin" />
                            </div>
                            <div className="bg-[#101812]/80 backdrop-blur-2xl px-6 py-5 rounded-[2rem] rounded-tl-sm border border-white/10 shadow-2xl">
                                <div className="flex gap-2 items-center">
                                    <div className="w-2 h-2 bg-gold-light/60 rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-gold-light/60 rounded-full animate-bounce [animation-delay:150ms]" />
                                    <div className="w-2 h-2 bg-gold-light/60 rounded-full animate-bounce [animation-delay:300ms]" />
                                    <span className="text-[10px] text-parchment/40 ml-3 italic font-serif">Bần tăng đang niệm...</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </div>

            {/* Input — pinned at bottom of this container */}
            <div className="relative z-20 w-full px-4 pb-28 pt-4 bg-gradient-to-t from-[#07100b] via-[#07100b]/95 to-transparent">
                <div className="relative flex items-end max-w-3xl gap-2 mx-auto p-1.5 bg-[#101812]/90 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                    <textarea
                        ref={textareaRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Thí chủ muốn đàm đạo điều gì..."
                        className="w-full bg-transparent border-none py-3.5 pl-4 pr-2 text-sm text-parchment focus:outline-none resize-none min-h-[48px] max-h-32 placeholder:text-parchment/30 font-serif leading-relaxed custom-scrollbar"
                        rows={1}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        className="p-3.5 mb-0.5 mr-0.5 transition-all rounded-2xl bg-gold-light text-[#07100b] hover:bg-parchment disabled:opacity-30 disabled:bg-white/5 disabled:text-parchment/50 cursor-pointer shadow-[0_0_15px_rgba(201,168,76,0.4)] disabled:shadow-none shrink-0 group"
                    >
                        <Send size={18} className={inputValue.trim() ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" : ""} />
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes fadeSlideIn {
                    0% { opacity: 0; transform: translateY(16px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 10px; }
            `}</style>
        </div>
    )
}