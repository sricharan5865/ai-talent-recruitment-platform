import { useState } from "react"
import { useNavigate } from "react-router"
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileCheck2,
  Filter,
  Key,
  Layers,
  Lock,
  Plus,
  RefreshCw,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  UserCheck,
  Users,
  X,
  Zap,
} from "lucide-react"
import { Badge, Button, Card, Input, Modal, Select } from "../components/ui"

// ADMIN USERS PAGE
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-blue-700">Platform Identity & Access</span>
            <Badge tone="purple">10-Role RBAC</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
            Global Users & Role Governance
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Supervise cross-tenant authentication, seat allocations, candidate identities, and enterprise role delegations.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="secondary" onClick={() => setToast("Exported user roster (CSV)")}>
            <Download size={15} /> Export Users
          </Button>
          <Button onClick={() => setToast("Opening invite user modal")}>
            <Plus size={15} /> Add User
          </Button>
        </div>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <Input
            placeholder="Search by user name, email or tenant organization..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-md h-9 text-xs"
          />
          <Badge tone="blue">{filtered.length} Users Found</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-gray-800 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-2.5 px-3">User Name</th>
                <th className="py-2.5 px-3">Email Address</th>
                <th className="py-2.5 px-3">Tenant Organization</th>
                <th className="py-2.5 px-3">Assigned Role (RBAC)</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-3 px-3 font-bold text-gray-900">{u.name}</td>
                  <td className="py-3 px-3">{u.email}</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">{u.org}</td>
                  <td className="py-3 px-3">
                    <Badge tone="purple">{u.role}</Badge>
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

// ADMIN SECURITY & DPDP PAGE
export function AdminSecurityPage() {
  const [toast, setToast] = useState("")

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-emerald-700">Governance & Security Posture</span>
            <Badge tone="green">SOC-2 Type II Certified</Badge>
            <Badge tone="purple">DPDPA 2023 Compliant</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
            Platform Security & Consent Governance
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Real-time compliance monitoring, AES-256 data-at-rest encryption, right-to-be-forgotten requests, and automated model PII masking.
          </p>
        </div>
        <Button onClick={() => setToast("Exported complete platform security and compliance audit package (PDF)")}>
          <Download size={15} /> Download SOC-2 Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-l-4 border-l-emerald-600">
          <span className="text-xs text-gray-500 font-bold uppercase block">Security Posture Score</span>
          <strong className="text-2xl font-extrabold text-emerald-700 mt-1 block">99.4 / 100</strong>
          <small className="text-xs text-gray-500 mt-1 block">Zero unauthorized database intrusions</small>
        </Card>
        <Card className="p-4 border-l-4 border-l-blue-600">
          <span className="text-xs text-gray-500 font-bold uppercase block">Active DPDP Consents</span>
          <strong className="text-2xl font-extrabold text-gray-900 mt-1 block">1,248,910</strong>
          <small className="text-xs text-blue-600 font-bold mt-1 block">Full digital audit trail</small>
        </Card>
        <Card className="p-4 border-l-4 border-l-purple-600">
          <span className="text-xs text-gray-500 font-bold uppercase block">PII Redaction Rate</span>
          <strong className="text-2xl font-extrabold text-purple-700 mt-1 block">100% Redacted</strong>
          <small className="text-xs text-gray-500 mt-1 block">External LLMs receive zero raw PII</small>
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

// ADMIN AUDIT LOGS PAGE
export function AdminAuditLogsPage() {
  const [toast, setToast] = useState("")

  const logs = [
    { id: "aud-1", actor: "Candidate Sourcing Agent", action: "Dispatched 24 NVite invites", tenant: "Nexora Labs", time: "10:14:02", ip: "Internal Daemon" },
    { id: "aud-2", actor: "Neha Kapoor (Recruiter)", action: "Released formal offer letter", tenant: "Nexora Labs", time: "09:58:14", ip: "49.207.211.14" },
    { id: "aud-3", actor: "Matching Agent", action: "Recalculated 128 compatibility scores", tenant: "PhonePe", time: "09:45:00", ip: "Internal Daemon" },
    { id: "aud-4", actor: "Priya Sharma (Candidate)", action: "Updated stealth mode blocklist", tenant: "Razorpay (Candidate)", time: "09:12:45", ip: "157.48.192.8" },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-blue-700">Governance & Compliance</span>
            <Badge tone="purple">Immutable Audit Ledger</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
            Platform Audit Trail & Event Ledger
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Append-only record of all recruiter, candidate, and autonomous AI actions across every multi-tenant organization.
          </p>
        </div>
        <Button onClick={() => setToast("Exported immutable audit ledger as signed CSV")}>
          <Download size={15} /> Export Audit Log
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
