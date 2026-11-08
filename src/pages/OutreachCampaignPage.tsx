import { useState } from "react"
import { useNavigate } from "react-router"
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Eye,
  Filter,
  IndianRupee,
  Layers,
  Mail,
  MessageSquare,
  MessageSquareText,
  Plus,
  RefreshCw,
  Search,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  X,
  Zap,
} from "lucide-react"
import { Badge, Button, Card, Input, Modal, Select } from "../components/ui"

export interface NViteCampaign {
  id: string
  name: string
  role: string
  channel: "WhatsApp + Email" | "WhatsApp Direct" | "Executive Email"
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
  const [campaignRole, setCampaignRole] = useState("Staff Backend Engineer")
  const [targetCity, setTargetCity] = useState("Bengaluru")
  const [campaignChannel, setCampaignChannel] = useState<"both" | "whatsapp" | "email">("both")

  const [campaigns, setCampaigns] = useState<NViteCampaign[]>([
    {
      id: "camp-1",
      name: "Q4 Staff Backend Requisitions · Indiranagar",
      role: "Staff Backend Engineer",
      channel: "WhatsApp + Email",
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
      name: "Senior AI Product Designer · Bengaluru / Hybrid",
      role: "Senior Product Designer",
      channel: "WhatsApp Direct",
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
      name: "Enterprise Account Executive · Mumbai Financial District",
      role: "Enterprise Account Executive",
      channel: "Executive Email",
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

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault()
    setCampaigns([
      {
        id: `camp-${Date.now()}`,
        name: `${campaignRole} · ${targetCity}`,
        role: campaignRole,
        channel: campaignChannel === "both" ? "WhatsApp + Email" : campaignChannel === "whatsapp" ? "WhatsApp Direct" : "Executive Email",
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
    setToast("Dispatched personalized NVite campaign to 24 targeted candidates!")
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-blue-700">Autonomous Talent Outreach</span>
            <Badge tone="purple">WhatsApp Business API Synced</Badge>
            <Badge tone="green">DPDP Consented Sequences</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
            Candidate Outreach & NVite Campaigns
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Dispatch hyper-personalized invitation sequences across WhatsApp and executive email. AI dynamically tailors compensation and tech stack highlights to each candidate.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="secondary" onClick={() => navigate("/employer/search")}>
            <Search size={15} /> Discover Audience
          </Button>
          <Button onClick={() => setNewCampaignOpen(true)}>
            <Plus size={15} /> Launch NVite Campaign
          </Button>
        </div>
      </div>

      {/* Campaign KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <Card className="p-4 border-l-4 border-l-blue-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Total NVites Dispatched</span>
          <strong className="text-2xl font-extrabold text-gray-900 mt-1 block">105 Candidates</strong>
          <span className="text-xs text-blue-600 font-bold mt-1 block">100% verified Indian mobile/email</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-purple-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">WhatsApp Open Rate</span>
          <strong className="text-2xl font-extrabold text-purple-700 mt-1 block">86.2%</strong>
          <span className="text-xs text-gray-500 mt-1 block">Industry average is 24%</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-emerald-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Candidate Reply Velocity</span>
          <strong className="text-2xl font-extrabold text-emerald-700 mt-1 block">44.8%</strong>
          <span className="text-xs text-emerald-600 font-bold mt-1 block">35 warm candidate responses</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-amber-500">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Consent & Opt-Outs</span>
          <strong className="text-2xl font-extrabold text-gray-900 mt-1 block">0.9% Opt-Out</strong>
          <span className="text-xs text-gray-500 mt-1 block">Strictly respects withdrawal</span>
        </Card>
      </div>

      {/* Active Campaigns List */}
      <Card className="p-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-gray-900">Active Outreach Campaigns</h3>
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
                  <span className="text-xs text-gray-400">{camp.createdAt}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Targeted Role: <strong>{camp.role}</strong> · {camp.candidatesCount} shortlisted candidates
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
                  <Badge tone="green">{camp.interestedCount} Candidates</Badge>
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

      {/* LAUNCH NEW CAMPAIGN MODAL */}
      {newCampaignOpen && (
        <Modal
          open={newCampaignOpen}
          onClose={() => setNewCampaignOpen(false)}
          title="Launch Autonomous NVite Campaign"
          footer={
            <>
              <Button variant="secondary" onClick={() => setNewCampaignOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCampaign}>
                <Send size={14} /> Dispatch to 24 Matched Candidates
              </Button>
            </>
          }
        >
          <form onSubmit={handleCreateCampaign} className="space-y-4 text-xs text-gray-700">
            <label className="font-bold text-gray-800 block">
              Target Open Requisition
              <Select
                value={campaignRole}
                onChange={(e) => setCampaignRole(e.target.value)}
                className="mt-1"
              >
                <option>Staff Backend Engineer (Indiranagar)</option>
                <option>Senior Product Designer (Bengaluru)</option>
                <option>Enterprise Account Executive (Mumbai)</option>
                <option>Principal AI/ML Engineer (Whitefield)</option>
              </Select>
            </label>

            <label className="font-bold text-gray-800 block">
              Target Tech Hub / Region
              <Select
                value={targetCity}
                onChange={(e) => setTargetCity(e.target.value)}
                className="mt-1"
              >
                <option>Bengaluru (Indiranagar, HSR, Bellandur)</option>
                <option>Mumbai (BKC, Powai)</option>
                <option>Delhi NCR (Cyber City Gurugram)</option>
                <option>Hyderabad (Hitec City)</option>
              </Select>
            </label>

            <div>
              <span className="font-bold text-gray-800 block mb-1">Outreach Delivery Rails</span>
              <div className="flex gap-2">
                {[
                  { id: "both", label: "WhatsApp + Email (Recommended 86% response)" },
                  { id: "whatsapp", label: "WhatsApp Direct Only" },
                  { id: "email", label: "Email Only" },
                ].map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                      campaignChannel === ch.id
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                    }`}
                    onClick={() => setCampaignChannel(ch.id as typeof campaignChannel)}
                  >
                    {ch.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-purple-50/60 border border-purple-200 rounded-xl">
              <span className="font-bold text-purple-900 block mb-1 flex items-center gap-1">
                <Sparkles size={13} /> AI Dynamic Personalization Tagging:
              </span>
              <p className="text-gray-700 leading-relaxed text-xs">
                "Hello <code className="bg-white px-1 rounded font-mono text-purple-700">&#123;&#123;candidate_first_name&#125;&#125;</code>, our engineering team at Nexora Labs was impressed by your distributed systems work at <code className="bg-white px-1 rounded font-mono text-purple-700">&#123;&#123;current_company&#125;&#125;</code>. We are opening a <code className="bg-white px-1 rounded font-mono text-purple-700">&#123;&#123;role_title&#125;&#125;</code> role with benchmarked comp matching your expected bracket of <code className="bg-white px-1 rounded font-mono text-purple-700">&#123;&#123;expected_salary&#125;&#125;</code>."
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
