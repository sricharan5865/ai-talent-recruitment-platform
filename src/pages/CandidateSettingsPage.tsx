import { useState } from "react"
import { useNavigate } from "react-router"
import {
  Bell,
  Building2,
  Check,
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Mail,
  MessageSquare,
  Plus,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  UserCheck,
  X,
} from "lucide-react"
import { Badge, Button, Card, Input, Modal, Select } from "../components/ui"

export function CandidateSettingsPage() {
  const navigate = useNavigate()
  const [toast, setToast] = useState("")

  // DPDP Consent toggles
  const [allowAiMatching, setAllowAiMatching] = useState(true)
  const [allowWhatsAppOutreach, setAllowWhatsAppOutreach] = useState(true)
  const [allowRecruiterDirectView, setAllowRecruiterDirectView] = useState(true)
  const [allowSalaryBenchmarking, setAllowSalaryBenchmarking] = useState(true)

  // Blocked Employers List (e.g. current employer)
  const [blockedCompanies, setBlockedCompanies] = useState([
    "Razorpay Software Private Limited (Current Employer)",
    "Razorpay Payments Services",
  ])
  const [newBlockCompany, setNewBlockCompany] = useState("")

  // Profile visibility
  const [visibilityMode, setVisibilityMode] = useState<"active" | "stealth" | "private">("stealth")

  const handleAddBlockCompany = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBlockCompany.trim()) return
    setBlockedCompanies([...blockedCompanies, newBlockCompany.trim()])
    setNewBlockCompany("")
    setToast("Added company to private blocklist. Recruiters from this entity cannot view your profile.")
  }

  const handleRemoveBlock = (idx: number) => {
    setBlockedCompanies(blockedCompanies.filter((_, i) => i !== idx))
    setToast("Removed company from blocklist.")
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-blue-700">Candidate Privacy Sovereignty</span>
            <Badge tone="green">DPDPA 2023 Compliant</Badge>
            <Badge tone="purple">Stealth Mode Active</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
            Privacy Controls, Blocklist & Settings
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            You own your career data. Control recruiter visibility, block your current employer, manage communication channels, and exercise your Digital Personal Data Protection rights.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="secondary" onClick={() => setToast("Exporting complete personal data ledger (JSON)")}>
            <Download size={15} /> Export Career Data
          </Button>
          <Button onClick={() => setToast("All privacy settings saved & synced to identity ledger!")}>
            <Check size={15} /> Save Changes
          </Button>
        </div>
      </div>

      {/* Profile Visibility Tier */}
      <Card className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye size={18} className="text-blue-600" />
            <h3 className="text-base font-bold text-gray-900">Profile Searchability & Visibility</h3>
          </div>
          <Badge tone={visibilityMode === "stealth" ? "purple" : visibilityMode === "active" ? "green" : "neutral"}>
            {visibilityMode === "stealth" ? "Stealth Mode (Recommended)" : visibilityMode.toUpperCase()}
          </Badge>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          Choose how verified recruiters discover your qualifications across the Talent Network.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {[
            {
              id: "stealth",
              title: "Stealth Mode (Recommended)",
              desc: "Visible to verified recruiters, but completely hidden from your current employer and affiliated entities.",
              tone: "purple",
            },
            {
              id: "active",
              title: "Open to All Opportunities",
              desc: "Maximum reach. Verified hiring leaders can discover your portfolio across India.",
              tone: "green",
            },
            {
              id: "private",
              title: "Private / Application Only",
              desc: "Hidden from candidate search engine. Only companies you directly apply to can view your CV.",
              tone: "neutral",
            },
          ].map((mode) => (
            <div
              key={mode.id}
              onClick={() => {
                setVisibilityMode(mode.id as typeof visibilityMode)
                setToast(`Switched profile visibility to ${mode.title}`)
              }}
              className={`p-3.5 rounded-xl border text-xs cursor-pointer transition ${
                visibilityMode === mode.id
                  ? "border-blue-600 bg-blue-50/30 shadow-xs"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <strong className="block font-bold text-gray-900">{mode.title}</strong>
              <span className="text-gray-500 mt-1 block leading-relaxed">{mode.desc}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Blocked Employers List */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900">Current Employer Blocklist</h3>
            <p className="text-xs text-gray-500">Recruiters and hiring managers from these corporate domains are blocked from seeing your profile.</p>
          </div>
          <Badge tone="blue">{blockedCompanies.length} Blocked</Badge>
        </div>

        <div className="space-y-2">
          {blockedCompanies.map((comp, idx) => (
            <div
              key={idx}
              className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <Building2 size={15} className="text-gray-400" />
                <span className="font-semibold text-gray-900">{comp}</span>
              </div>
              <button
                type="button"
                className="text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                onClick={() => handleRemoveBlock(idx)}
              >
                Unblock
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddBlockCompany} className="flex gap-2 pt-2">
          <Input
            placeholder="Add company name or domain (e.g. razorpay.com, cred.club)..."
            value={newBlockCompany}
            onChange={(e) => setNewBlockCompany(e.target.value)}
            className="h-9 text-xs flex-1"
          />
          <Button type="submit" variant="secondary" className="text-xs h-9">
            <Plus size={14} /> Add to Blocklist
          </Button>
        </form>
      </Card>

      {/* DPDPA 2023 Consent Toggles */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-emerald-600" />
          <h3 className="text-base font-bold text-gray-900">Digital Personal Data Protection (DPDP) Consents</h3>
        </div>

        <div className="divide-y divide-gray-100 text-xs">
          {[
            {
              title: "Autonomous AI Job Matching",
              desc: "Permits AI agents to calculate semantic compatibility against open requisitions without revealing identity.",
              checked: allowAiMatching,
              setter: setAllowAiMatching,
            },
            {
              title: "WhatsApp Business API Outreach",
              desc: "Allows verified employers to deliver confidential interview invites and salary details via WhatsApp.",
              checked: allowWhatsAppOutreach,
              setter: setAllowWhatsAppOutreach,
            },
            {
              title: "Verified Recruiter CV Unlocks",
              desc: "Allows hiring managers from verified companies to download your selected default PDF CV.",
              checked: allowRecruiterDirectView,
              setter: setAllowRecruiterDirectView,
            },
            {
              title: "Anonymous Salary & Compensation Benchmarking",
              desc: "Contributes anonymized compensation datapoints to keep Bengaluru market insights accurate for fellow candidates.",
              checked: allowSalaryBenchmarking,
              setter: setAllowSalaryBenchmarking,
            },
          ].map((item, idx) => (
            <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
              <div>
                <strong className="block text-gray-900 font-bold">{item.title}</strong>
                <span className="text-gray-500 mt-0.5 block leading-relaxed">{item.desc}</span>
              </div>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(e) => {
                  item.setter(e.target.checked)
                  setToast(`Updated consent for "${item.title}"`)
                }}
                className="w-4 h-4 accent-blue-600 cursor-pointer flex-shrink-0"
              />
            </div>
          ))}
        </div>
      </Card>

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
