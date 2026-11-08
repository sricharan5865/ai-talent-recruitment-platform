import { useState } from "react"
import { useNavigate } from "react-router"
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  KeyRound,
  Lock,
  Plus,
  Shield,
  Users,
  Workflow,
} from "lucide-react"
import {
  Badge,
  Button,
  Card,
  Input,
  Modal,
  Select,
} from "../components/ui"

export interface BusinessUnit {
  id: string
  name: string
  code: string
  head: string
  headcount: number
  activeJobs: number
  location: string
  recruiterSquad: string
}

const mockEnterpriseHierarchy: BusinessUnit[] = [
  {
    id: "bu-1",
    name: "Tata Digital (SuperApp & Neu)",
    code: "TD-IN",
    head: "Pratik Pal (CEO)",
    headcount: 4200,
    activeJobs: 48,
    location: "Bengaluru · Bellandur",
    recruiterSquad: "Squad Alpha (12 Recruiters)",
  },
  {
    id: "bu-2",
    name: "Tata Consultancy Services (BFSI Tech)",
    code: "TCS-BFSI",
    head: "K. Krithivasan (CEO)",
    headcount: 615000,
    activeJobs: 320,
    location: "Mumbai · Powai HQ",
    recruiterSquad: "Global BFSI Talent Team (85 Recruiters)",
  },
  {
    id: "bu-3",
    name: "Tata Motors Passenger Electric Vehicles",
    code: "TM-EV",
    head: "Shailesh Chandra (MD)",
    headcount: 14500,
    activeJobs: 62,
    location: "Pune · Tech Corridor",
    recruiterSquad: "Automotive & Firmware Squad (8 Recruiters)",
  },
  {
    id: "bu-4",
    name: "Titan Company Digital Platforms",
    code: "TITAN-DIGI",
    head: "C.K. Venkataraman (MD)",
    headcount: 8900,
    activeJobs: 24,
    location: "Bengaluru · Electronic City",
    recruiterSquad: "Consumer Tech Squad (6 Recruiters)",
  },
]

export const enterpriseRoles = [
  { id: "super_admin", label: "Super Administrator", desc: "Full multi-tenant platform & cross-company sovereignty" },
  { id: "company_admin", label: "Company Administrator", desc: "Tenant branding, legal entity setup & billing authority" },
  { id: "hr_manager", label: "HR Manager", desc: "Workforce headcount planning & compensation approval" },
  { id: "recruiter", label: "Recruiter", desc: "Job publishing, candidate sourcing, NVite outreach & pipeline" },
  { id: "hiring_manager", label: "Hiring Manager", desc: "JD requirement inputs, interview scorecards & offer approvals" },
  { id: "interviewer", label: "Interviewer", desc: "Calendar panel interviews & objective skill assessment submission" },
  { id: "candidate", label: "Candidate", desc: "Verified career passport, application tracking & interview room" },
  { id: "enterprise_customer", label: "Enterprise Customer", desc: "Executive dashboards, group-level audit & SLA reports" },
  { id: "finance_billing", label: "Finance & Billing Admin", desc: "GSTIN tax invoices, credits & Indian payment reconciliation" },
  { id: "support_admin", label: "Support Administrator", desc: "Tenant diagnostics, integration audits & user access recovery" },
]

export function EnterprisePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"units" | "rbac" | "pools" | "sso" | "governance">("units")
  const [units, setUnits] = useState(mockEnterpriseHierarchy)
  const [toast, setToast] = useState("")

  // SSO state
  const [ssoProvider, setSsoProvider] = useState("Okta")
  const [ssoDomain, setSsoDomain] = useState("tata.enterprise.talentnetwork.ai")
  const [samlEnforced, setSamlEnforced] = useState(true)

  // New BU modal
  const [addBuOpen, setAddBuOpen] = useState(false)
  const [newBuName, setNewBuName] = useState("")
  const [newBuLocation, setNewBuLocation] = useState("Bengaluru")

  const handleAddUnit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBuName) return
    setUnits([
      ...units,
      {
        id: `bu-${Date.now()}`,
        name: newBuName,
        code: `${newBuName.slice(0, 3).toUpperCase()}-ENT`,
        head: "Leadership Nominee",
        headcount: 850,
        activeJobs: 14,
        location: newBuLocation,
        recruiterSquad: "Dedicated Squad (4 Recruiters)",
      },
    ])
    setNewBuName("")
    setAddBuOpen(false)
    setToast(`Registered new business unit under enterprise tenant`)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-blue-700">Multi-Entity Enterprise Hub</span>
            <Badge tone="purple">Tata Group Global Tenant</Badge>
            <Badge tone="green">4 Business Units Synced</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
            Enterprise Recruitment Operating System
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Centralized recruitment governance across distributed operating subsidiaries, shared group talent pools, and enterprise role-based security.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="secondary" onClick={() => setActiveTab("sso")}>
            <KeyRound size={15} /> SSO & IAM Configuration
          </Button>
          <Button onClick={() => setAddBuOpen(true)}>
            <Plus size={15} /> Add Business Unit
          </Button>
        </div>
      </div>

      {/* Enterprise KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <Card className="p-4 border-l-4 border-l-blue-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Total Enterprise Headcount</span>
          <strong className="text-2xl font-extrabold text-gray-900 mt-1 block">638,400+</strong>
          <span className="text-xs text-blue-600 font-bold mt-1 block">Across 4 major Indian entities</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-purple-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Active Open Requisitions</span>
          <strong className="text-2xl font-extrabold text-purple-700 mt-1 block">454 Jobs</strong>
          <span className="text-xs text-gray-500 mt-1 block">Centralized recruitment governance</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-emerald-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Shared Cross-Unit Talent Pool</span>
          <strong className="text-2xl font-extrabold text-gray-900 mt-1 block">84,200</strong>
          <span className="text-xs text-emerald-600 font-bold mt-1 block">18% internal mobility rate</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-amber-500">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Enterprise IAM Security</span>
          <strong className="text-2xl font-extrabold text-amber-700 mt-1 block">SAML 2.0 Active</strong>
          <span className="text-xs text-gray-500 mt-1 block">Okta & Azure AD Multi-Factor</span>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6 overflow-x-auto text-sm font-semibold">
          {[
            { id: "units", label: "Business Units & Subsidiaries", icon: Building2 },
            { id: "rbac", label: "Role-Based Access (10 Roles)", icon: Shield },
            { id: "pools", label: "Shared Cross-Entity Talent Pools", icon: Users },
            { id: "sso", label: "SSO & SAML Identity Federation", icon: Lock },
            { id: "governance", label: "Group SLA & Compliance Ledger", icon: Workflow },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-3 px-1 border-b-2 transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "border-blue-600 text-blue-700 font-bold"
                    : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* TAB 1: BUSINESS UNITS */}
      {activeTab === "units" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">Federated Operating Subsidiaries</h3>
              <p className="text-xs text-gray-500">Each entity manages independent recruiter squads while adhering to group-level hiring compliance.</p>
            </div>
            <Button variant="secondary" className="text-xs h-8" onClick={() => setAddBuOpen(true)}>
              <Plus size={13} /> Add Entity
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {units.map((u) => (
              <Card key={u.id} className="p-5 hover:border-blue-400 transition flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-gray-900">{u.name}</h4>
                        <Badge tone="blue">{u.code}</Badge>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{u.location}</span>
                    </div>
                    <Badge tone="purple">{u.activeJobs} Active Jobs</Badge>
                  </div>

                  <div className="mt-3.5 space-y-1.5 text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div>Unit Leadership: <strong>{u.head}</strong></div>
                    <div>Subsidiary Headcount: <strong>{u.headcount.toLocaleString()} employees</strong></div>
                    <div>Assigned Talent Squad: <strong className="text-blue-700">{u.recruiterSquad}</strong></div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={13} /> Shared Pool Connected
                  </span>
                  <Button
                    variant="secondary"
                    className="h-8 text-xs px-2.5"
                    onClick={() => {
                      navigate("/employer/jobs")
                      setToast(`Switched workspace context to ${u.name}`)
                    }}
                  >
                    View Requisitions <ChevronRight size={13} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ROLE-BASED ACCESS CONTROL (10 ROLES) */}
      {activeTab === "rbac" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">Configured Enterprise Roles (RBAC Matrix)</h3>
              <p className="text-xs text-gray-500">Explicit granular permissions mapped to 10 distinct recruitment personas across the organization.</p>
            </div>
            <Button
              variant="secondary"
              className="text-xs h-8"
              onClick={() => setToast("Exporting enterprise permission matrix (PDF)")}
            >
              Export Matrix
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {enterpriseRoles.map((role, idx) => (
              <Card key={role.id} className="p-4 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold grid place-items-center">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900">{role.label}</h4>
                    <Badge tone={idx === 0 ? "purple" : idx <= 3 ? "blue" : "neutral"}>
                      {idx === 0 ? "Global Sovereign" : idx <= 3 ? "Administrative" : "Functional"}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{role.desc}</p>
                </div>
                <Button
                  variant="ghost"
                  className="h-7 text-xs text-blue-600 hover:text-blue-800"
                  onClick={() => setToast(`Previewing workspace as ${role.label}`)}
                >
                  Preview Role
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SHARED TALENT POOLS */}
      {activeTab === "pools" && (
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-emerald-950">Cross-Entity Talent Mobility Pool</h4>
              <p className="text-xs text-emerald-800 mt-0.5">
                Silver-medalist candidates who passed final technical rounds at Tata Digital or TCS are automatically discoverable by Tata Motors EV squads with candidate consent.
              </p>
            </div>
            <Badge tone="green">84,200 Profiles</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {[
              { name: "Principal Systems Architects (Go/Rust/C++)", count: 1840, speed: "Avg fill time 18d", tone: "blue" as const },
              { name: "Fintech & Embedded Finance Leaders", count: 2420, speed: "Avg fill time 22d", tone: "purple" as const },
              { name: "Automotive Battery & Embedded Software", count: 960, speed: "Avg fill time 26d", tone: "green" as const },
            ].map(p => (
              <Card key={p.name} className="p-4">
                <Badge tone={p.tone}>{p.count} Pre-Screened</Badge>
                <h4 className="text-sm font-bold text-gray-900 mt-2">{p.name}</h4>
                <span className="text-xs text-gray-500 mt-1 block">{p.speed}</span>
                <Button
                  variant="secondary"
                  className="w-full text-xs h-8 mt-3"
                  onClick={() => {
                    navigate("/employer/search")
                    setToast(`Opened shared pool for ${p.name}`)
                  }}
                >
                  Source From Pool
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SSO & SAML IDENTITY FEDERATION */}
      {activeTab === "sso" && (
        <Card className="p-6 max-w-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Lock size={18} className="text-blue-600" />
            <h3 className="text-base font-bold text-gray-900">Single Sign-On (SAML 2.0 / OpenID Connect)</h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="font-bold text-gray-800 block">
              Enterprise Identity Provider (IdP)
              <Select
                value={ssoProvider}
                onChange={(e) => setSsoProvider(e.target.value)}
                className="mt-1"
              >
                <option>Okta Enterprise</option>
                <option>Microsoft Entra ID (Azure AD)</option>
                <option>Google Workspace Enterprise</option>
                <option>PingFederate</option>
              </Select>
            </label>

            <label className="font-bold text-gray-800 block">
              SAML ACS (Assertion Consumer Service) URL
              <Input
                readOnly
                value="https://api.talentnetwork.ai/v1/auth/saml/acs/tata-group"
                className="mt-1 font-mono bg-gray-50 text-gray-600"
              />
            </label>

            <label className="font-bold text-gray-800 block">
              IdP Metadata XML / Issuer URL
              <Input
                value={ssoDomain}
                onChange={(e) => setSsoDomain(e.target.value)}
                className="mt-1 font-mono"
              />
            </label>

            <div className="pt-2 flex items-center justify-between">
              <div>
                <strong className="block text-gray-900 font-bold">Enforce SAML SSO for all employees</strong>
                <span className="text-gray-500">Disallow username & password fallback login</span>
              </div>
              <input
                type="checkbox"
                checked={samlEnforced}
                onChange={(e) => setSamlEnforced(e.target.checked)}
                className="w-4 h-4 accent-blue-600"
              />
            </div>

            <Button
              className="mt-3 text-xs h-9"
              onClick={() => setToast("Saved SAML SSO Identity Configuration")}
            >
              Save Identity Settings
            </Button>
          </div>
        </Card>
      )}

      {/* TAB 5: GOVERNANCE & SLA */}
      {activeTab === "governance" && (
        <Card className="p-5 space-y-4">
          <h3 className="text-base font-bold text-gray-900">Group SLA Compliance & Audit Ledger</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-xs text-gray-500 block">Time to Shortlist SLA (Target: 48h)</span>
              <strong className="text-xl font-bold text-emerald-700 mt-1 block">31.2 hrs avg</strong>
              <Badge tone="green">96.4% Compliance</Badge>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-xs text-gray-500 block">Interview Feedback SLA (Target: 24h)</span>
              <strong className="text-xl font-bold text-blue-700 mt-1 block">18.4 hrs avg</strong>
              <Badge tone="blue">98.1% Compliance</Badge>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-xs text-gray-500 block">DPDP Consent Expiry Audit</span>
              <strong className="text-xl font-bold text-purple-700 mt-1 block">Zero Violations</strong>
              <Badge tone="purple">Audited Daily</Badge>
            </div>
          </div>
        </Card>
      )}

      {/* ADD BUSINESS UNIT MODAL */}
      {addBuOpen && (
        <Modal
          open={addBuOpen}
          onClose={() => setAddBuOpen(false)}
          title="Register New Subsidiary Business Unit"
          footer={
            <>
              <Button variant="secondary" onClick={() => setAddBuOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUnit}>
                Register Business Unit
              </Button>
            </>
          }
        >
          <form onSubmit={handleAddUnit} className="space-y-3 text-xs text-gray-700">
            <label className="font-bold text-gray-800 block">
              Subsidiary / Legal Entity Name
              <Input
                value={newBuName}
                onChange={(e) => setNewBuName(e.target.value)}
                placeholder="e.g. Tata Electronics Semiconductor"
                className="mt-1"
                required
              />
            </label>

            <label className="font-bold text-gray-800 block">
              Primary Operating Location
              <Select
                value={newBuLocation}
                onChange={(e) => setNewBuLocation(e.target.value)}
                className="mt-1"
              >
                <option>Bengaluru · Karnataka</option>
                <option>Hosur · Tamil Nadu</option>
                <option>Pune · Maharashtra</option>
                <option>Mumbai · Maharashtra</option>
                <option>Hyderabad · Telangana</option>
                <option>Delhi NCR</option>
              </Select>
            </label>
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
