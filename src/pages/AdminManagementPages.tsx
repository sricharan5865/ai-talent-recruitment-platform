import { useState } from "react"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  CheckCircle2,
  Download,
  Plus,
  RefreshCw,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import {
  Badge,
  Button,
  Card,
  Input,
  Modal,
  Select,
} from "../components/ui"

// 1. ADMIN USERS PAGE
export function AdminUsersPage() {
  const [query, setQuery] = useState("")
  const [toast, setToast] = useState("")
  const [usersList, setUsersList] = useState([
    { id: "u-1", name: "Neha Kapoor", email: "neha@nexoralabs.com", org: "Nexora Labs", role: "Company Administrator", status: "Active" },
    { id: "u-2", name: "Priya Sharma", email: "priya.sharma@gmail.com", org: "Razorpay (Candidate)", role: "Candidate", status: "Active" },
    { id: "u-3", name: "Karan Singhania", email: "karan@cred.club", org: "CRED", role: "Recruiter", status: "Active" },
    { id: "u-4", name: "Vikram Nambiar", email: "vikram@swiggy.in", org: "Swiggy", role: "Hiring Manager", status: "Active" },
    { id: "u-5", name: "SuperAdmin Root", email: "ops@talentnetwork.ai", org: "Talent Network HQ", role: "Super Administrator", status: "Active" },
  ])

  const toggleStatus = (id: string) => {
    setUsersList(
      usersList.map((u) =>
        u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u,
      ),
    )
    const target = usersList.find((u) => u.id === id)
    setToast(`Updated access state for ${target?.name}`)
  }

  const filtered = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase()) ||
      u.org.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-blue-700">Governance & IAM</span>
            <Badge tone="purple">Multi-Tenant RBAC</Badge>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mt-1">
            Global User Management
          </h1>
          <p className="text-xs text-gray-600 mt-0.5">
            Audit and govern user permissions, enterprise tenants, and session authorizations across 10 specialized roles.
          </p>
        </div>
        <Button onClick={() => setToast("Dispatched invite token to new administrator")} className="text-xs bg-blue-600 hover:bg-blue-700 text-white">
          <Plus size={13} /> Invite Administrator
        </Button>
      </div>

      <div className="flex items-center justify-between bg-white p-3 border border-gray-200 rounded-xl">
        <div className="search-box max-w-sm flex-1">
          <Search size={14} />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, or company…"
            className="text-xs"
          />
        </div>
        <div className="text-xs text-gray-500 font-medium">
          Showing {filtered.length} of {usersList.length} accounts
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">User</th>
                <th className="py-3 px-3">Organization</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/60 transition">
                  <td className="py-3 px-3">
                    <strong className="text-gray-900 block font-semibold">{u.name}</strong>
                    <span className="text-gray-400 text-[11px]">{u.email}</span>
                  </td>
                  <td className="py-3 px-3 text-gray-700">{u.org}</td>
                  <td className="py-3 px-3">
                    <span className="font-medium text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <Badge tone={u.status === "Active" ? "green" : "red"}>{u.status}</Badge>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Button
                      variant="secondary"
                      className="h-7 text-xs px-2.5"
                      onClick={() => toggleStatus(u.id)}
                    >
                      {u.status === "Active" ? "Suspend Access" : "Activate"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {toast && (
        <div className="toast">
          <CheckCircle2 /> {toast}
          <Button variant="ghost" onClick={() => setToast("")}>×</Button>
        </div>
      )}
    </div>
  )
}

// 2. ADMIN SECURITY & DPDPA PAGE
export function AdminSecurityPage() {
  const [toast, setToast] = useState("")
  const [mfaEnforced, setMfaEnforced] = useState(true)
  const [dpdpStrict, setDpdpStrict] = useState(true)

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="eyebrow text-emerald-700">Security Posture</span>
          <Badge tone="green">SOC2 Type II Ready</Badge>
          <Badge tone="blue">India DPDPA 2023 Compliant</Badge>
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 mt-1">
          Security & Compliance Hub
        </h1>
        <p className="text-xs text-gray-600 mt-0.5">
          AES-256-GCM encryption at rest, TLS 1.3 in transit, and immutable WORM audit trails.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-l-4 border-l-emerald-600 space-y-2">
          <div className="flex items-center justify-between">
            <strong className="text-sm font-bold text-gray-900">DPDPA 2023 Consent</strong>
            <Badge tone="green">Enforced</Badge>
          </div>
          <p className="text-xs text-gray-600">
            Automated purpose-specific consent logging for all candidate outreach and resume parsing.
          </p>
          <button
            type="button"
            onClick={() => {
              setDpdpStrict(!dpdpStrict)
              setToast(`Toggled DPDPA enforcement mode`)
            }}
            className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            {dpdpStrict ? "Strict Mode Active" : "Permissive Mode"}
          </button>
        </Card>

        <Card className="p-4 border-l-4 border-l-blue-600 space-y-2">
          <div className="flex items-center justify-between">
            <strong className="text-sm font-bold text-gray-900">Mandatory Enterprise 2FA</strong>
            <Badge tone={mfaEnforced ? "blue" : "neutral"}>{mfaEnforced ? "Active" : "Disabled"}</Badge>
          </div>
          <p className="text-xs text-gray-600">
            FIDO2 WebAuthn, TOTP, and SMS OTP verification required for all recruiter logins.
          </p>
          <button
            type="button"
            onClick={() => {
              setMfaEnforced(!mfaEnforced)
              setToast(`MFA enforcement updated to ${!mfaEnforced}`)
            }}
            className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            {mfaEnforced ? "Disable for testing" : "Enforce 2FA"}
          </button>
        </Card>

        <Card className="p-4 border-l-4 border-l-purple-600 space-y-2">
          <div className="flex items-center justify-between">
            <strong className="text-sm font-bold text-gray-900">India Data Residency</strong>
            <Badge tone="purple">Mumbai AWS (ap-south-1)</Badge>
          </div>
          <p className="text-xs text-gray-600">
            100% of candidate biometric, resume, and salary data resides strictly within Indian territory.
          </p>
          <span className="text-xs text-emerald-700 font-bold">Encrypted via HSM KMS</span>
        </Card>
      </div>

      {toast && (
        <div className="toast">
          <CheckCircle2 /> {toast}
          <Button variant="ghost" onClick={() => setToast("")}>×</Button>
        </div>
      )}
    </div>
  )
}

// 3. ADMIN AUDIT LOGS PAGE
export function AdminAuditLogsPage() {
  const [toast, setToast] = useState("")

  const logs = [
    { id: "l-1", actor: "AI Screening Agent", action: "Parsed 14 resumes with candidate consent check", tenant: "Nexora Labs", time: "2 mins ago", ip: "10.0.4.12" },
    { id: "l-2", actor: "Neha Kapoor (Recruiter)", action: "Released formal offer letter (₹34 LPA) to Priya Sharma", tenant: "Nexora Labs", time: "18 mins ago", ip: "49.207.210.45 (Bengaluru)" },
    { id: "l-3", actor: "Priya Sharma (Candidate)", action: "Updated Stealth Mode visibility and added Razorpay to blocklist", tenant: "Candidate Portal", time: "42 mins ago", ip: "106.51.78.19 (Bengaluru)" },
    { id: "l-4", actor: "Security Policy Agent", action: "Detected and blocked suspicious bulk scrape attempt on candidate directory", tenant: "Platform Core", time: "1 hour ago", ip: "185.220.101.5" },
    { id: "l-5", actor: "SuperAdmin Root", action: "Provisioned new enterprise tenant workspace for Tata Digital", tenant: "Tata Sons", time: "3 hours ago", ip: "14.143.18.2 (Mumbai)" },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-blue-700">Governance & Compliance</span>
            <Badge tone="purple">Immutable Audit Trail</Badge>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mt-1">
            System & Agentic Audit Logs
          </h1>
          <p className="text-xs text-gray-600 mt-0.5">
            Cryptographically signed records of all human recruiter decisions and autonomous agent actions.
          </p>
        </div>
        <Button
          onClick={() => setToast("Exported immutable audit ledger (JSON-L with SHA-256 signatures)")}
          className="text-xs bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Download size={13} /> Export Ledger
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center text-xs">
          <span className="font-bold text-gray-800">Streaming Live Security Events</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> WORM Ledger Connected
          </span>
        </div>

        <div className="divide-y divide-gray-100 text-xs">
          {logs.map((l) => (
            <div key={l.id} className="p-3.5 flex items-center justify-between hover:bg-gray-50/60 transition">
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-gray-900">{l.actor}</strong>
                  <span className="text-gray-400">·</span>
                  <span className="text-blue-700 font-medium">{l.tenant}</span>
                </div>
                <p className="text-gray-600 mt-0.5">{l.action}</p>
              </div>
              <div className="text-right text-gray-400 font-mono text-[11px]">
                <div>{l.time}</div>
                <div>{l.ip}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {toast && (
        <div className="toast">
          <CheckCircle2 /> {toast}
          <Button variant="ghost" onClick={() => setToast("")}>×</Button>
        </div>
      )}
    </div>
  )
}

// 4. ADMIN & RECRUITER INTEGRATIONS STUDIO
export function AdminIntegrationsPage() {
  const [toast, setToast] = useState("")
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [configureModal, setConfigureModal] = useState<any | null>(null)

  const [integrationsList, setIntegrationsList] = useState([
    {
      id: "int-1",
      name: "Darwinbox HRMS",
      category: "hris",
      desc: "Enterprise HRMS sync for employee master, requisitions & payroll",
      status: "Connected",
      authType: "OAuth 2.0 / MTLS",
      lastSync: "4 mins ago",
      events: "14.2k events/mo",
    },
    {
      id: "int-2",
      name: "Keka HR",
      category: "hris",
      desc: "Fast-growing Indian tech startup HR & attendance workflow sync",
      status: "Connected",
      authType: "API Key + Webhook",
      lastSync: "12 mins ago",
      events: "8.1k events/mo",
    },
    {
      id: "int-3",
      name: "RazorpayX Payroll",
      category: "hris",
      desc: "Direct candidate reimbursements, signing bonuses & statutory PF/ESIC",
      status: "Connected",
      authType: "Razorpay Connect",
      lastSync: "1 hour ago",
      events: "3.4k events/mo",
    },
    {
      id: "int-4",
      name: "WhatsApp Business API",
      category: "messaging",
      desc: "Meta verified Cloud API BSP connection for autonomous NVite campaigns",
      status: "Connected",
      authType: "Meta Graph API v20",
      lastSync: "Realtime",
      events: "48.9k msgs/mo",
    },
    {
      id: "int-5",
      name: "Slack Hiring Rooms",
      category: "messaging",
      desc: "Instant candidate submission alerts and 1-click recruiter approvals",
      status: "Connected",
      authType: "Slack Bot Token",
      lastSync: "Realtime",
      events: "1.2k alerts/mo",
    },
    {
      id: "int-6",
      name: "Google Workspace & Meet",
      category: "calendar",
      desc: "Automated panel calendar availability and video interview links",
      status: "Connected",
      authType: "Google Service Account",
      lastSync: "Realtime",
      events: "840 links/mo",
    },
    {
      id: "int-7",
      name: "Microsoft Teams & 365",
      category: "calendar",
      desc: "Outlook calendar scheduling and automated MS Teams room links",
      status: "Available",
      authType: "Azure AD App",
      lastSync: "Not connected",
      events: "0",
    },
    {
      id: "int-8",
      name: "HackerEarth Assessments",
      category: "assessment",
      desc: "Technical coding assessments, proctoring scores & report sync",
      status: "Connected",
      authType: "HackerEarth API",
      lastSync: "2 hours ago",
      events: "210 tests/mo",
    },
  ])

  const toggleConnection = (id: string) => {
    setIntegrationsList(
      integrationsList.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Connected" ? "Available" : "Connected",
              lastSync: item.status === "Connected" ? "Disconnected" : "Just now",
            }
          : item,
      ),
    )
    const target = integrationsList.find((i) => i.id === id)
    setToast(
      target?.status === "Connected"
        ? `Disconnected ${target.name}`
        : `Connected & authenticated ${target?.name} securely!`,
    )
  }

  const filtered = integrationsList.filter((item) => {
    if (category !== "all" && item.category !== category) return false
    if (
      query &&
      !item.name.toLowerCase().includes(query.toLowerCase()) &&
      !item.desc.toLowerCase().includes(query.toLowerCase())
    )
      return false
    return true
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="eyebrow text-blue-700">Ecosystem & Webhooks</span>
            <Badge tone="purple">Indian Enterprise HRMS Stack</Badge>
            <Badge tone="green">DPDPA 2023 Compliant Pipelines</Badge>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mt-1">
            Integrations & API Hub
          </h1>
          <p className="text-xs text-gray-600 mt-0.5">
            Bi-directional synchronization with Darwinbox, Keka, RazorpayX, Meta WhatsApp BSP, and calendar rails.
          </p>
        </div>
        <Button
          onClick={() => setToast("Triggered global ecosystem sync across all 7 connected services")}
          className="text-xs bg-blue-600 hover:bg-blue-700 text-white"
        >
          <RefreshCw size={13} /> Trigger Global Sync
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 border border-gray-200 rounded-xl">
        <div className="search-box max-w-sm flex-1">
          <Search size={14} />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search integrations, HRMS, webhooks…"
            className="text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: "all", label: "All Connectors" },
            { id: "hris", label: "HRMS & Payroll" },
            { id: "messaging", label: "Messaging & Alerts" },
            { id: "calendar", label: "Calendars & Meetings" },
            { id: "assessment", label: "Code Assessments" },
          ].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                category === c.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <Card key={item.id} className="p-4 flex flex-col justify-between space-y-4 hover:border-blue-400 transition">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs border border-blue-200">
                    {item.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <strong className="text-sm text-gray-900 block font-bold">{item.name}</strong>
                    <span className="text-[11px] text-gray-400">{item.authType}</span>
                  </div>
                </div>
                <Badge tone={item.status === "Connected" ? "green" : "neutral"}>
                  {item.status}
                </Badge>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-400 text-[11px]">
                Sync: <strong className="text-gray-700">{item.lastSync}</strong>
              </span>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="secondary"
                  className="h-7 text-xs px-2"
                  onClick={() => setConfigureModal(item)}
                >
                  Configure
                </Button>
                <Button
                  className={`h-7 text-xs px-2.5 ${
                    item.status === "Connected"
                      ? "bg-gray-100 text-rose-600 hover:bg-rose-50"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  onClick={() => toggleConnection(item.id)}
                >
                  {item.status === "Connected" ? "Disconnect" : "Connect"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* CONFIGURE INTEGRATION MODAL */}
      {configureModal && (
        <Modal
          open={Boolean(configureModal)}
          onClose={() => setConfigureModal(null)}
          title={`Configure ${configureModal.name} Integration`}
          footer={
            <>
              <Button variant="secondary" onClick={() => setConfigureModal(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setConfigureModal(null)
                  setToast(`Saved configuration and rotated credentials for ${configureModal.name}`)
                }}
              >
                Save Credentials
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-xs text-gray-700">
            <div>
              <span className="font-bold text-gray-800 block mb-1">Webhook Endpoint URL</span>
              <Input
                defaultValue={`https://api.talentnetwork.ai/v1/webhooks/${configureModal.id}`}
                className="text-xs font-mono bg-gray-50"
              />
            </div>
            <div>
              <span className="font-bold text-gray-800 block mb-1">OAuth Client ID / API Key</span>
              <Input
                type="password"
                defaultValue="tn_live_sk_94820194857201928374"
                className="text-xs font-mono"
              />
            </div>
            <div>
              <span className="font-bold text-gray-800 block mb-1">Sync Cadence</span>
              <Select defaultValue="Realtime Event Streaming">
                <option>Realtime Event Streaming (Webhook Push)</option>
                <option>Hourly Batch Synchronization</option>
                <option>Daily 12:00 AM Reconciliation</option>
              </Select>
            </div>
          </div>
        </Modal>
      )}

      {toast && (
        <div className="toast">
          <CheckCircle2 /> {toast}
          <Button variant="ghost" onClick={() => setToast("")}>×</Button>
        </div>
      )}
    </div>
  )
}

// 5. RECRUITMENT & PLATFORM ANALYTICS OPERATING PAGE
export function AnalyticsPage({ portal }: { portal?: "employer" | "admin" }) {
  const [timeframe, setTimeframe] = useState("Last 30 Days")
  const [toast, setToast] = useState("")

  const funnelData = [
    { stage: "Sourced", count: 12450, prev: 8200 },
    { stage: "AI Screened", count: 2840, prev: 1940 },
    { stage: "Shortlisted", count: 840, prev: 520 },
    { stage: "Interviewed", count: 312, prev: 180 },
    { stage: "Offer Released", count: 94, prev: 52 },
    { stage: "Joined", count: 82, prev: 42 },
  ]

  const corridorData = [
    { city: "Bengaluru", hires: 42, pct: "51%", avgCTC: "₹34 LPA" },
    { city: "Mumbai (BKC/Powai)", hires: 18, pct: "22%", avgCTC: "₹28 LPA" },
    { city: "Delhi NCR (Gurugram)", hires: 12, pct: "15%", avgCTC: "₹26 LPA" },
    { city: "Hyderabad (HITEC)", hires: 6, pct: "7%", avgCTC: "₹24 LPA" },
    { city: "Pune (Hinjawadi)", hires: 4, pct: "5%", avgCTC: "₹22 LPA" },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="eyebrow text-blue-700">Talent Intelligence</span>
            <Badge tone="purple">Predictive Analytics Engine</Badge>
            <Badge tone="green">DPDPA 2023 Verified</Badge>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mt-1">
            {portal === "admin" ? "Platform-Wide Recruitment Analytics" : "Executive Hiring & Funnel Analytics"}
          </h1>
          <p className="text-xs text-gray-600 mt-0.5">
            Real-time telemetry across time-to-hire, funnel velocity, Indian tech corridors, and autonomous agent ROI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="text-xs h-8 bg-white"
          >
            <option>Last 30 Days</option>
            <option>Quarter to Date (Q4)</option>
            <option>Year to Date (FY26)</option>
          </Select>
          <Button
            variant="secondary"
            className="text-xs h-8"
            onClick={() => setToast("Exported executive analytics summary to CSV")}
          >
            <Download size={13} /> Export Report
          </Button>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <Card className="p-4 border-l-4 border-l-blue-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Average Time-to-Hire</span>
          <strong className="text-2xl font-extrabold text-gray-900 mt-1 block">18.2 Days</strong>
          <span className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <TrendingDown size={14} /> 42% faster than Indian average (45d)
          </span>
        </Card>

        <Card className="p-4 border-l-4 border-l-purple-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Offer Acceptance Rate</span>
          <strong className="text-2xl font-extrabold text-purple-700 mt-1 block">86.4%</strong>
          <span className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <TrendingUp size={14} /> +14.8% over Q3 baseline
          </span>
        </Card>

        <Card className="p-4 border-l-4 border-l-emerald-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Agency Spend Saved</span>
          <strong className="text-2xl font-extrabold text-emerald-700 mt-1 block">₹14.8 Lakhs</strong>
          <span className="text-xs text-gray-500 mt-1 block">Across 18 closed tech requisitions</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-amber-500">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">AI Screening Precision</span>
          <strong className="text-2xl font-extrabold text-gray-900 mt-1 block">94.2%</strong>
          <span className="text-xs text-gray-500 mt-1 block">Recruiter acceptance on shortlists</span>
        </Card>
      </div>

      {/* Funnel Chart & Tech Corridor Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Funnel Chart (7 cols) */}
        <Card className="lg:col-span-7 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <strong className="text-sm font-bold text-gray-900 block">Sourcing to Joining Velocity Funnel</strong>
              <span className="text-xs text-gray-500">Candidate progression from Resdex sourcing to final onboarding</span>
            </div>
            <Badge tone="blue">Autonomous Agentic Tracking</Badge>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="stage" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} name="Candidates" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Indian Tech Corridors (5 cols) */}
        <Card className="lg:col-span-5 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <strong className="text-sm font-bold text-gray-900 block">Indian Tech Hub Hiring Distribution</strong>
              <span className="text-xs text-gray-500">Joined talent by metropolitan ecosystem</span>
            </div>
            <Badge tone="purple">Top Metro Hubs</Badge>
          </div>

          <div className="divide-y divide-gray-100 text-xs">
            {corridorData.map((c) => (
              <div key={c.city} className="py-2.5 flex items-center justify-between">
                <div>
                  <strong className="text-gray-900 block">{c.city}</strong>
                  <span className="text-[11px] text-gray-400">Benchmark Avg: {c.avgCTC}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-blue-700 block">{c.hires} Hires</span>
                  <span className="text-[11px] text-gray-500">{c.pct} share</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Autonomous AI Agents Efficiency Matrix */}
      <Card className="p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <strong className="text-sm font-bold text-gray-900 block">Autonomous AI Agent Workload & Output</strong>
            <span className="text-xs text-gray-500">Hours saved and automated decision volume across the 10 specialized agents</span>
          </div>
          <Badge tone="green">All 10 Agents Healthy</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
            <span className="font-bold text-gray-900 block">Job Creation Agent</span>
            <div className="mt-1 text-gray-600">48 JDs generated with Indian salary benchmarks</div>
            <strong className="text-blue-700 block mt-2">128 Recruiter Hours Saved</strong>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
            <span className="font-bold text-gray-900 block">Resume Intelligence Agent</span>
            <div className="mt-1 text-gray-600">8,420 Indian resumes parsed & normalized</div>
            <strong className="text-purple-700 block mt-2">1.4s Average Latency</strong>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
            <span className="font-bold text-gray-900 block">NVite Sourcing Agent</span>
            <div className="mt-1 text-gray-600">1,840 personalized WhatsApp sequences sent</div>
            <strong className="text-emerald-700 block mt-2">86.2% Open Velocity</strong>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
            <span className="font-bold text-gray-900 block">Fraud & Moonlighting Agent</span>
            <div className="mt-1 text-gray-600">14 duplicate profiles & dual-employment alerts</div>
            <strong className="text-rose-700 block mt-2">100% Risk Avoidance</strong>
          </div>
        </div>
      </Card>

      {toast && (
        <div className="toast">
          <CheckCircle2 /> {toast}
          <Button variant="ghost" onClick={() => setToast("")}>×</Button>
        </div>
      )}
    </div>
  )
}
