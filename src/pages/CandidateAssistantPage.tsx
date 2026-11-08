import { useState } from "react"
import { useNavigate } from "react-router"
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Check,
  CheckCircle2,
  Copy,
  FileCheck2,
  HelpCircle,
  IndianRupee,
  Lightbulb,
  MessageSquare,
  Play,
  RotateCcw,
  Send,
  Sparkles,
  Target,
  UserCheck,
  Zap,
} from "lucide-react"
import { Badge, Button, Card, Input, Modal, Select } from "../components/ui"

interface ChatMessage {
  id: string
  sender: "candidate" | "ai"
  text: string
  time: string
  suggestedAction?: string
}

export function CandidateAssistantPage() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-1",
      sender: "ai",
      text: "Hello Priya! I am your AI Career Copilot. I've analyzed your verified profile at Razorpay against 140+ Senior & Staff Design roles in Bengaluru. How can I assist your career progression today?",
      time: "10:00 AM",
      suggestedAction: "Run salary benchmark report",
    },
    {
      id: "m-2",
      sender: "candidate",
      text: "What compensation should I counter CRED with for the Staff Product Designer offer?",
      time: "10:02 AM",
    },
    {
      id: "m-3",
      sender: "ai",
      text: "Based on validated market data for Senior/Staff Design talent with 7+ years in Bengaluru, the median is ₹34.5 LPA and the 90th percentile is ₹44.0 LPA. Since you bring specialized multi-brand token system experience, I recommend countering with ₹38L CTC (₹30L fixed base + ₹8L performance ESOPs). Would you like me to draft the negotiation email?",
      time: "10:02 AM",
      suggestedAction: "Draft Counter-Offer Pitch",
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [toast, setToast] = useState("")

  const quickPrompts = [
    "How to answer: Tell me about a time metrics clashed with design?",
    "Simulate 5 tough behavioral interview questions for Nexora Labs",
    "Analyze skill gaps between my CV and Staff Designer benchmarks",
    "Generate a 60-second elevator pitch for tomorrow's portfolio review",
  ]

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText
    if (!text.trim()) return

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "candidate",
      text: text.trim(),
      time: "Just now",
    }
    setMessages((prev) => [...prev, newMsg])
    setInputText("")
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `Here is the AI strategy for: "${text.slice(0, 40)}...": Structure your response using the STAR framework. Start by stating the business objective, outline 2 trade-offs you evaluated, and conclude with the concrete metric lift (e.g. 24% activation lift). Keep answers under 90 seconds.`,
        time: "Just now",
        suggestedAction: "Copy talking points",
      };
      setMessages((prev) => [...prev, aiReply])
    }, 800)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-purple-700">AI Career Intelligence</span>
            <Badge tone="purple">Autonomous Career Copilot</Badge>
            <Badge tone="green">Trained on Top Indian Tech Roles</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
            Career Assistant & AI Mock Studio
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Get instant interview coaching, simulate difficult hiring panel questions, benchmark your salary against Bengaluru tech hubs, and practice elevator pitches.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="secondary" onClick={() => navigate("/candidate/radar")}>
            <Target size={15} /> Opportunity Radar
          </Button>
          <Button onClick={() => setToast("Saved conversation session to Career Journal")}>
            <Check size={15} /> Save Session
          </Button>
        </div>
      </div>

      {/* Main Chat & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Chat Area (8 Cols) */}
        <div className="lg:col-span-8">
          <Card className="flex flex-col h-[600px] p-0 overflow-hidden shadow-sm">
            {/* Chat Header */}
            <div className="p-4 bg-gradient-to-r from-purple-50 via-indigo-50 to-white border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white grid place-items-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Career Assistant Engine</h3>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Ready & Context-Aware
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                className="h-8 text-xs text-gray-500 hover:text-gray-900"
                onClick={() => {
                  setMessages(messages.slice(0, 1))
                  setToast("Cleared conversation buffer")
                }}
              >
                <RotateCcw size={13} /> Reset
              </Button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/40">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "candidate" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                      m.sender === "candidate"
                        ? "bg-blue-600 text-white rounded-br-xs shadow-xs"
                        : "bg-white text-gray-800 border border-gray-200/90 rounded-bl-xs shadow-xs"
                    }`}
                  >
                    <p>{m.text}</p>
                    <div
                      className={`flex items-center justify-between mt-2 pt-2 border-t ${
                        m.sender === "candidate" ? "border-blue-500 text-blue-200" : "border-gray-100 text-gray-400"
                      } text-[10px]`}
                    >
                      <span>{m.time}</span>
                      {m.suggestedAction && (
                        <button
                          type="button"
                          className="font-bold text-purple-700 hover:underline cursor-pointer"
                          onClick={() => setToast(`Executed: ${m.suggestedAction}`)}
                        >
                          ⚡ {m.suggestedAction}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl border border-gray-200 text-xs text-gray-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
                    <span>AI Copilot is structuring recommendations...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompts Bar */}
            <div className="p-2.5 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto text-[11px]">
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  type="button"
                  className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-800 transition whitespace-nowrap cursor-pointer"
                  onClick={() => handleSend(p)}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="p-3 bg-white border-t border-gray-200 flex gap-2"
            >
              <Input
                placeholder="Ask anything about salary, portfolio reviews, or interview simulations..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="h-10 text-xs flex-1"
              />
              <Button type="submit" className="h-10 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold">
                <Send size={14} /> Send
              </Button>
            </form>
          </Card>
        </div>

        {/* Sidebar Tools (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-4 space-y-3">
            <span className="eyebrow text-purple-700">Interview Simulation Drill</span>
            <h4 className="font-bold text-sm text-gray-900">Nexora Labs Portfolio Defense</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Tomorrow's panel focuses heavily on cross-functional token architecture and measurable conversion outcomes.
            </p>
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs space-y-2">
              <strong className="text-purple-900 block font-bold">Recommended Talking Points:</strong>
              <div className="space-y-1 text-gray-700">
                <div>• Start with the 24% merchant activation metric</div>
                <div>• Explain semantic token abstraction tiers</div>
                <div>• Highlight CI automated PR linting rules</div>
              </div>
            </div>
            <Button
              className="w-full text-xs h-9 bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => {
                handleSend("Simulate the first 5 minutes of my portfolio presentation for Nexora Labs")
              }}
            >
              <Sparkles size={14} /> Start AI Mock Presentation
            </Button>
          </Card>

          <Card className="p-4 space-y-3">
            <span className="eyebrow text-emerald-700">Salary Benchmark Quick-Check</span>
            <h4 className="font-bold text-sm text-gray-900">Staff Product Designer</h4>
            <div className="space-y-1.5 text-xs text-gray-700">
              <div className="flex justify-between">
                <span>Bengaluru Median:</span>
                <strong className="text-gray-900">₹34.5 LPA</strong>
              </div>
              <div className="flex justify-between">
                <span>Top 10% Percentile:</span>
                <strong className="text-emerald-700">₹44.0 LPA</strong>
              </div>
              <div className="flex justify-between">
                <span>Your Target Bracket:</span>
                <strong className="text-blue-700">₹36L – ₹40L</strong>
              </div>
            </div>
            <Button
              variant="secondary"
              className="w-full text-xs h-8"
              onClick={() => navigate("/candidate/radar")}
            >
              Open Full Opportunity Radar
            </Button>
          </Card>
        </div>
      </div>

      {/* Global Toast */}
      {toast && (
        <div className="toast">
          <CheckCircle2 /> {toast}
          <Button variant="ghost" onClick={() => setToast("")}>
            ×
          </Button>
        </div>
      )}
    </div>
  )
}
