import { useState } from "react"
import { useNavigate } from "react-router"
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Plus,
  Search,
  Send,
  Sparkles,
  Target,
  X,
} from "lucide-react"
import {
  Badge,
  Button,
  Card,
  Input,
  Modal,
  Select,
} from "../components/ui"

export interface NViteCampaign {
  id: string
  name: string
  role: string
  channel: "WhatsApp + Email" | "WhatsApp Direct" | "Executive Email" | "Multi-Channel (App + Email + Inbox)"
  workMode: "In office" | "Hybrid" | "Remote"
  expRange: string
  candidatesCount: number
  sentCount: number
  deliveredRate: number
  openedRate: number
  repliedRate: number
  interestedCount: number
  status: "Active" | "Completed" | "Draft"
  createdAt: string
}

export function OutreachCampaignPage() {
  const navigate = useNavigate()
  const [toast, setToast] = useState("")
  const [newCampaignOpen, setNewCampaignOpen] = useState(false)

  // 11. NVite Composition State
  const [proceedMode, setProceedMode] = useState<"create_new" | "use_previous">("create_new")
  const [previousJobChoice, setPreviousJobChoice] = useState("Senior Product Designer (Active Requisition)")
  const [campaignRole, setCampaignRole] = useState("Staff Backend Engineer")
  const [workMode, setWorkMode] = useState<"In office" | "Hybrid" | "Remote">("In office")
  const [minExp, setMinExp] = useState(4)
  const [maxExp, setMaxExp] = useState(10)
  const [selectedChannels, setSelectedChannels] = useState<string[]>([
    "WhatsApp Business API",
    "App notification",
    "Email",
  ])
  const [targetCity, setTargetCity] = useState("Bengaluru (Indiranagar, HSR, Bellandur)")

  const [campaigns, setCampaigns] = useState<NViteCampaign[]>([
    {
      id: "camp-1",
      name: "Q4 Staff Backend Requisitions · Indiranagar",
      role: "Staff Backend Engineer",
      channel: "WhatsApp + Email",
      workMode: "In office",
      expRange: "6–12 yrs",
      candidatesCount: 48,
      sentCount: 48,
      deliveredRate: 97.9,
      openedRate: 83.3,
      repliedRate: 41.6,
      interestedCount: 16,
      status: "Active",
      createdAt: "Yesterday",
    },
    {
      id: "camp-2",
      name: "Senior AI Product Designer · Hybrid Hub",
      role: "Senior Product Designer",
      channel: "Multi-Channel (App + Email + Inbox)",
      workMode: "Hybrid",
      expRange: "5–9 yrs",
      candidatesCount: 32,
      sentCount: 32,
      deliveredRate: 100,
      openedRate: 90.6,
      repliedRate: 53.1,
      interestedCount: 12,
      status: "Active",
      createdAt: "3 days ago",
    },
    {
      id: "camp-3",
      name: "Enterprise Account Executive · Mumbai",
      role: "Enterprise Account Executive",
      channel: "Executive Email",
      workMode: "In office",
      expRange: "4–8 yrs",
      candidatesCount: 25,
      sentCount: 25,
      deliveredRate: 96.0,
      openedRate: 72.0,
      repliedRate: 36.0,
      interestedCount: 7,
      status: "Completed",
      createdAt: "1 week ago",
    },
  ])

  const toggleChannel = (ch: string) => {
    setSelectedChannels((prev) =>
      prev.includes(ch) ? prev.filter((item) => item !== ch) : [...prev, ch],
    )
  }

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault()
    setCampaigns([
      {
        id: `camp-${Date.now()}`,
        name: `${campaignRole} · ${workMode} · ${targetCity.split(" ")[0]}`,
        role: campaignRole,
        channel: selectedChannels.includes("WhatsApp Business API")
          ? "WhatsApp + Email"
          : "Multi-Channel (App + Email + Inbox)",
        workMode: workMode,
        expRange: `${minExp}–${maxExp} yrs`,
        candidatesCount: 24,
        sentCount: 24,
        deliveredRate: 100,
        openedRate: 85,
        repliedRate: 38,
        interestedCount: 8,
        status: "Active",
        createdAt: "Just now",
      },
      ...campaigns,
    ])
    setNewCampaignOpen(false)
    setToast("Dispatched personalized NVite campaign with interactive response options to 24 targeted candidates!")
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="eyebrow text-blue-700">Resdex Outreach Studio</span>
            <Badge tone="purple">NVite Autonomous Sequencing</Badge>
            <Badge tone="green">WhatsApp Business API</Badge>
            <Badge tone="blue">App Notification & Email</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
            Candidate Outreach & NVite Campaigns
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-3xl">
            Dispatch hyper-personalized invitation sequences across WhatsApp, mobile app push notifications, and email. Candidates receive interactive "Yes, I am interested" & "No, I don't require it" response buttons.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="secondary" onClick={() => navigate("/employer/search")}>
            <Search size={15} /> Discover in Resdex
          </Button>
          <Button
            onClick={() => setNewCampaignOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus size={15} /> Launch NVite Campaign
          </Button>
        </div>
      </div>

      {/* Campaign KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <Card className="p-4 border-l-4 border-l-blue-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Total NVites Dispatched</span>
          <strong className="text-2xl font-extrabold text-gray-900 mt-1 block">105 Candidates</strong>
          <span className="text-xs text-blue-600 font-bold mt-1 block">100% verified Indian mobile & email</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-purple-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">WhatsApp Open Rate</span>
          <strong className="text-2xl font-extrabold text-purple-700 mt-1 block">86.2%</strong>
          <span className="text-xs text-gray-500 mt-1 block">Industry average is 24%</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-emerald-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">"Yes, I'm Interested"</span>
          <strong className="text-2xl font-extrabold text-emerald-700 mt-1 block">44.8%</strong>
          <span className="text-xs text-emerald-600 font-bold mt-1 block">35 positive candidate replies</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-amber-500">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Consent & Opt-Outs</span>
          <strong className="text-2xl font-extrabold text-gray-900 mt-1 block">0.9% Opt-Out</strong>
          <span className="text-xs text-gray-500 mt-1 block">Strictly respects DPDPA withdrawal</span>
        </Card>
      </div>

      {/* Active Campaigns List */}
      <Card className="p-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">Active NVite Outreach Campaigns</h3>
            <p className="text-xs text-gray-500">Track delivery rates, open velocities, and positive interest signals in real time.</p>
          </div>
          <Button variant="secondary" className="text-xs h-8" onClick={() => setNewCampaignOpen(true)}>
            <Plus size={13} /> New Campaign
          </Button>
        </div>

        <div className="space-y-3.5">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="p-4 border border-gray-200 rounded-xl hover:border-blue-400 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-gray-900">{camp.name}</h4>
                  <Badge tone={camp.status === "Active" ? "green" : "neutral"}>{camp.status}</Badge>
                  <Badge tone="purple">{camp.channel}</Badge>
                  <Badge tone="blue">{camp.workMode}</Badge>
                  <span className="text-xs text-gray-400">{camp.createdAt}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Targeted Role: <strong>{camp.role}</strong> ({camp.expRange}) · {camp.candidatesCount} shortlisted candidates
                </p>
              </div>

              <div className="flex items-center gap-6 text-xs text-gray-600 flex-wrap">
                <div className="text-center">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Delivered</span>
                  <strong className="text-gray-900 font-bold text-sm">{camp.deliveredRate}%</strong>
                </div>
                <div className="text-center">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Opened</span>
                  <strong className="text-purple-700 font-bold text-sm">{camp.openedRate}%</strong>
                </div>
                <div className="text-center">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Replied</span>
                  <strong className="text-emerald-700 font-bold text-sm">{camp.repliedRate}%</strong>
                </div>
                <div className="text-center">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Interested</span>
                  <Badge tone="green">{camp.interestedCount} Interested</Badge>
                </div>
                <Button
                  variant="secondary"
                  className="h-8 text-xs px-3"
                  onClick={() => {
                    navigate("/employer/communication")
                    setToast(`Opened active communication threads for ${camp.name}`)
                  }}
                >
                  View Responses <ArrowRight size={13} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 11. NVITE COMPOSITION MODAL WITH EXACT SPEC DROPDOWNS */}
      {newCampaignOpen && (
        <Modal
          open={newCampaignOpen}
          onClose={() => setNewCampaignOpen(false)}
          title="Compose & Dispatch NVite Campaign"
          footer={
            <>
              <Button variant="secondary" onClick={() => setNewCampaignOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCampaign} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Send size={14} /> Dispatch NVite Campaign
              </Button>
            </>
          }
        >
          <form onSubmit={handleCreateCampaign} className="space-y-4 text-xs text-gray-700 max-h-[75vh] overflow-y-auto pr-1">
            {/* How would you like to proceed? */}
            <div>
              <span className="font-bold text-gray-900 block mb-1">
                How would you like to proceed?
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setProceedMode("create_new")}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition ${
                    proceedMode === "create_new"
                      ? "bg-blue-50 border-blue-500 font-bold text-blue-900"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <strong className="block">Create new</strong>
                  <span className="text-[11px] text-gray-500">Draft a tailored requisition & NVite sequence from scratch</span>
                </button>
                <button
                  type="button"
                  onClick={() => setProceedMode("use_previous")}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition ${
                    proceedMode === "use_previous"
                      ? "bg-blue-50 border-blue-500 font-bold text-blue-900"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <strong className="block">Use a previous one/posted job</strong>
                  <span className="text-[11px] text-gray-500">Reuse details & requirements from active job requisitions</span>
                </button>
              </div>
            </div>

            {proceedMode === "use_previous" ? (
              <label className="font-bold text-gray-800 block">
                Select Posted Job / Previous Template
                <Select
                  value={previousJobChoice}
                  onChange={(e) => {
                    setPreviousJobChoice(e.target.value)
                    setCampaignRole(e.target.value.split(" ")[0] + " " + e.target.value.split(" ")[1])
                  }}
                  className="mt-1 text-xs"
                >
                  <option>Senior Product Designer (Active Requisition · ₹24–36 LPA)</option>
                  <option>Staff Backend Architect (Active Requisition · ₹40–55 LPA)</option>
                  <option>Growth Marketing Lead (Active Requisition · ₹18–26 LPA)</option>
                  <option>AI Research & LLM Intern (Campus Requisition · ₹50k/mo)</option>
                </Select>
              </label>
            ) : (
              <label className="font-bold text-gray-800 block">
                Target Requisition Title
                <Input
                  value={campaignRole}
                  onChange={(e) => setCampaignRole(e.target.value)}
                  placeholder="e.g. Staff Backend Engineer"
                  className="mt-1 text-xs"
                />
              </label>
            )}

            {/* Work Mode Dropdown */}
            <label className="font-bold text-gray-800 block">
              Work Mode
              <Select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value as typeof workMode)}
                className="mt-1 text-xs"
              >
                <option value="In office">In office (Naukri Standard)</option>
                <option value="Hybrid">Hybrid (2-3 days office)</option>
                <option value="Remote">Remote (Anywhere in India)</option>
              </Select>
            </label>

            {/* Experience Range */}
            <div>
              <span className="font-bold text-gray-800 block mb-1">
                Experience Requirements
              </span>
              <div className="grid grid-cols-2 gap-2">
                <label className="text-gray-600 block">
                  Minimum experience
                  <Input
                    type="number"
                    min={0}
                    max={30}
                    value={minExp}
                    onChange={(e) => setMinExp(Number(e.target.value))}
                    className="mt-1 text-xs"
                    placeholder="Min Yrs"
                  />
                </label>
                <label className="text-gray-600 block">
                  Maximum experience
                  <Input
                    type="number"
                    min={0}
                    max={30}
                    value={maxExp}
                    onChange={(e) => setMaxExp(Number(e.target.value))}
                    className="mt-1 text-xs"
                    placeholder="Max Yrs"
                  />
                </label>
              </div>
            </div>

            {/* Candidate Communication Channels */}
            <div>
              <span className="font-bold text-gray-800 block mb-1.5">
                Candidate Communication Channels
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "App notification", label: "App notification (Instant Mobile Push)" },
                  { id: "Email", label: "Email (Executive Letterhead)" },
                  { id: "Naukri inbox", label: "Naukri & Talent Network inbox" },
                  { id: "WhatsApp Business API", label: "WhatsApp Business API (Verified)" },
                ].map((ch) => (
                  <label
                    key={ch.id}
                    className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition ${
                      selectedChannels.includes(ch.id)
                        ? "bg-blue-50 border-blue-400 font-semibold text-blue-900"
                        : "bg-gray-50 border-gray-200 text-gray-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedChannels.includes(ch.id)}
                      onChange={() => toggleChannel(ch.id)}
                      className="rounded text-blue-600 accent-blue-600"
                    />
                    <span>{ch.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional choices (Candidate response buttons) */}
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
              <span className="font-bold text-gray-900 block">
                Additional Choices / Candidate Call-to-Action Buttons
              </span>
              <p className="text-gray-500 text-[11px]">
                Recipients receive interactive 1-click response chips inside WhatsApp and In-App notification:
              </p>
              <div className="flex gap-2">
                <div className="flex-1 p-2 bg-emerald-100/70 border border-emerald-300 text-emerald-900 font-bold rounded-lg text-center flex items-center justify-center gap-1">
                  <Check size={14} className="text-emerald-700" /> Yes, I am interested
                </div>
                <div className="flex-1 p-2 bg-gray-100 border border-gray-300 text-gray-700 font-bold rounded-lg text-center flex items-center justify-center gap-1">
                  <X size={14} className="text-gray-500" /> No, I don't require it
                </div>
              </div>
            </div>

            {/* AI Dynamic Invitation Text */}
            <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1">
              <span className="font-bold text-purple-900 block flex items-center gap-1">
                <Sparkles size={13} /> AI Dynamic Personalization Template:
              </span>
              <p className="text-gray-800 leading-relaxed text-xs">
                "Hello <code className="bg-white px-1 rounded font-mono text-purple-700">&#123;&#123;candidate_name&#125;&#125;</code>, Nexora Labs has an open <strong>{campaignRole}</strong> role ({workMode}, {minExp}–{maxExp} years exp) matching your verified background. Would you like to explore this opportunity?"
              </p>
            </div>
          </form>
        </Modal>
      )}

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
