import { useState } from "react"
import { useNavigate } from "react-router"
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Check,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileCheck2,
  FileText,
  IndianRupee,
  Layers,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  X,
  Zap,
} from "lucide-react"
import { Badge, Button, Card, Input, Modal, Progress, Select } from "../components/ui"

export interface OfferCandidate {
  id: string
  name: string
  role: string
  department: string
  baseSalary: string
  variableSalary: string
  esopsGrant: string
  totalCTC: string
  joiningDate: string
  status: "Draft" | "Pending Approval" | "Offer Released" | "Accepted" | "Joined"
  checklistProgress: number
  recruiter: string
}

export const initialOffers: OfferCandidate[] = [
  {
    id: "off-1",
    name: "Aditya Joshi",
    role: "Lead Product Designer",
    department: "Product & Design",
    baseSalary: "₹30,00,000",
    variableSalary: "₹4,00,000",
    esopsGrant: "₹12,00,000 (over 4 yrs)",
    totalCTC: "₹38,00,000",
    joiningDate: "18 Nov 2026",
    status: "Accepted",
    checklistProgress: 85,
    recruiter: "Neha Kapoor",
  },
  {
    id: "off-2",
    name: "Tanvi Desai",
    role: "Senior Product Designer",
    department: "Product & Design",
    baseSalary: "₹26,00,000",
    variableSalary: "₹3,00,000",
    esopsGrant: "₹8,00,000",
    totalCTC: "₹32,00,000",
    joiningDate: "01 Dec 2026",
    status: "Offer Released",
    checklistProgress: 40,
    recruiter: "Neha Kapoor",
  },
  {
    id: "off-3",
    name: "Priya Sharma",
    role: "Senior Product Designer",
    department: "Design System Squad",
    baseSalary: "₹28,00,000",
    variableSalary: "₹4,00,000",
    esopsGrant: "₹10,00,000",
    totalCTC: "₹35,00,000",
    joiningDate: "15 Dec 2026",
    status: "Pending Approval",
    checklistProgress: 20,
    recruiter: "Neha Kapoor",
  },
]

export function EmployerOffersPage() {
  const navigate = useNavigate()
  const [offersList, setOffersList] = useState<OfferCandidate[]>(initialOffers)
  const [createOfferOpen, setCreateOfferOpen] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState<OfferCandidate | null>(null)
  const [toast, setToast] = useState("")

  // New offer form
  const [candidateName, setCandidateName] = useState("")
  const [candidateRole, setCandidateRole] = useState("Staff Backend Engineer")
  const [fixedBase, setFixedBase] = useState(30)
  const [variableComp, setVariableComp] = useState(4)
  const [esopVal, setEsopVal] = useState(10)
  const [targetJoinDate, setTargetJoinDate] = useState("2026-12-01")

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!candidateName.trim()) return
    const newOffer: OfferCandidate = {
      id: `off-${Date.now()}`,
      name: candidateName.trim(),
      role: candidateRole,
      department: "Engineering Squad",
      baseSalary: `₹${fixedBase},00,000`,
      variableSalary: `₹${variableComp},00,000`,
      esopsGrant: `₹${esopVal},00,000`,
      totalCTC: `₹${fixedBase + variableComp + esopVal},00,000`,
      joiningDate: targetJoinDate,
      status: "Pending Approval",
      checklistProgress: 15,
      recruiter: "Neha Kapoor",
    }
    setOffersList([newOffer, ...offersList])
    setCandidateName("")
    setCreateOfferOpen(false)
    setToast(`Drafted offer for ${newOffer.name} and submitted to VP approval queue!`)
  }

  const approveAndRelease = (id: string) => {
    setOffersList(
      offersList.map((o) =>
        o.id === id ? { ...o, status: "Offer Released", checklistProgress: 45 } : o,
      ),
    )
    const target = offersList.find((o) => o.id === id)
    setToast(`Authorized and released formal digital offer letter to ${target?.name}!`)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-blue-700">Talent Acquisition Lifecycle</span>
            <Badge tone="green">Offer & Joining Operations</Badge>
            <Badge tone="purple">Digital Signature Enabled</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
            Offers & Onboarding Hub
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Streamline compensation approvals, India-compliant appointment letters, background checks, and candidate onboarding checklists.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="secondary" onClick={() => setToast("Exported monthly offers and joining report (CSV)")}>
            <Download size={15} /> Export Report
          </Button>
          <Button onClick={() => setCreateOfferOpen(true)}>
            <Plus size={15} /> Create Offer Letter
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <Card className="p-4 border-l-4 border-l-blue-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Offers Released (Nov)
          </span>
          <strong className="text-2xl font-extrabold text-gray-900 mt-1 block">
            {offersList.length} Offers
          </strong>
          <small className="text-xs text-blue-600 font-bold mt-1 block">100% within salary bands</small>
        </Card>

        <Card className="p-4 border-l-4 border-l-emerald-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Offer Acceptance Ratio
          </span>
          <strong className="text-2xl font-extrabold text-emerald-700 mt-1 block">
            91.4%
          </strong>
          <small className="text-xs text-emerald-600 font-bold mt-1 block">+12% vs. market average</small>
        </Card>

        <Card className="p-4 border-l-4 border-l-purple-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Upcoming Joiners
          </span>
          <strong className="text-2xl font-extrabold text-purple-700 mt-1 block">
            3 Candidates
          </strong>
          <small className="text-xs text-purple-600 font-medium mt-1 block">Pre-boarding underway</small>
        </Card>

        <Card className="p-4 border-l-4 border-l-amber-500">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Avg Turnaround Time
          </span>
          <strong className="text-2xl font-extrabold text-amber-700 mt-1 block">
            2.4 Days
          </strong>
          <small className="text-xs text-gray-500 mt-1 block">From final round to release</small>
        </Card>
      </div>

      {/* Offers Table */}
      <Card className="p-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-gray-900">Active Offer Queue & Onboarding</h3>
          <Button variant="secondary" className="text-xs h-8" onClick={() => setCreateOfferOpen(true)}>
            <Plus size={13} /> New Offer
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-gray-800 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-2.5 px-3">Candidate</th>
                <th className="py-2.5 px-3">Role & Squad</th>
                <th className="py-2.5 px-3">Total Package (CTC)</th>
                <th className="py-2.5 px-3">Target Joining</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Onboarding Checklist</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {offersList.map((off) => (
                <tr key={off.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-3 px-3">
                    <strong className="text-gray-900 block text-sm">{off.name}</strong>
                    <span className="text-gray-400 text-[11px]">Recruiter: {off.recruiter}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-gray-800 font-semibold block">{off.role}</span>
                    <span className="text-gray-400 text-[11px]">{off.department}</span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-700">
                    {off.totalCTC}
                    <span className="text-[10px] text-gray-400 block font-normal">Base: {off.baseSalary}</span>
                  </td>
                  <td className="py-3 px-3">{off.joiningDate}</td>
                  <td className="py-3 px-3">
                    <Badge
                      tone={
                        off.status === "Accepted"
                          ? "green"
                          : off.status === "Offer Released"
                            ? "blue"
                            : "amber"
                      }
                    >
                      {off.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 w-40">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span>Checklist</span>
                        <span className="font-bold">{off.checklistProgress}%</span>
                      </div>
                      <Progress value={off.checklistProgress} tone="green" />
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right space-x-1.5">
                    {off.status === "Pending Approval" && (
                      <Button
                        className="h-7 text-xs px-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold"
                        onClick={() => approveAndRelease(off.id)}
                      >
                        <Send size={12} /> Release
                      </Button>
                    )}
                    <Button
                      variant="secondary"
                      className="h-7 text-xs px-2.5"
                      onClick={() => setSelectedOffer(off)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* CREATE OFFER MODAL */}
      {createOfferOpen && (
        <Modal
          open={createOfferOpen}
          onClose={() => setCreateOfferOpen(false)}
          title="Draft Compensation & Offer Letter"
          footer={
            <>
              <Button variant="secondary" onClick={() => setCreateOfferOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateOffer}>
                <FileCheck2 size={14} /> Submit Offer for VP Sign-off
              </Button>
            </>
          }
        >
          <form onSubmit={handleCreateOffer} className="space-y-4 text-xs text-gray-700">
            <div className="grid grid-cols-2 gap-3">
              <label className="font-bold text-gray-800 block">
                Candidate Name
                <Input
                  placeholder="e.g. Rahul Sharma"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="mt-1"
                  required
                />
              </label>

              <label className="font-bold text-gray-800 block">
                Target Role Requisition
                <Select
                  value={candidateRole}
                  onChange={(e) => setCandidateRole(e.target.value)}
                  className="mt-1"
                >
                  <option>Senior Product Designer</option>
                  <option>Staff Backend Engineer</option>
                  <option>Enterprise Account Executive</option>
                  <option>Principal AI/ML Engineer</option>
                </Select>
              </label>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
              <span className="font-bold text-gray-900 block text-xs">
                Annual Compensation Structure (₹ Lakhs)
              </span>

              <div className="grid grid-cols-3 gap-2">
                <label className="block">
                  Fixed Base (₹ LPA)
                  <Input
                    type="number"
                    value={fixedBase}
                    onChange={(e) => setFixedBase(Number(e.target.value))}
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  Variable Bonus (₹ LPA)
                  <Input
                    type="number"
                    value={variableComp}
                    onChange={(e) => setVariableComp(Number(e.target.value))}
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  ESOPs Grant (₹ Lakhs)
                  <Input
                    type="number"
                    value={esopVal}
                    onChange={(e) => setEsopVal(Number(e.target.value))}
                    className="mt-1"
                  />
                </label>
              </div>

              <div className="flex justify-between items-center text-sm font-bold text-emerald-800 bg-emerald-50 p-2 rounded-lg">
                <span>Total Annual CTC Package:</span>
                <span className="text-base font-mono">₹{fixedBase + variableComp + esopVal},00,000</span>
              </div>
            </div>

            <label className="font-bold text-gray-800 block">
              Agreed Target Joining Date
              <Input
                type="date"
                value={targetJoinDate}
                onChange={(e) => setTargetJoinDate(e.target.value)}
                className="mt-1"
              />
            </label>
          </form>
        </Modal>
      )}

      {/* VIEW OFFER DETAILS MODAL */}
      {selectedOffer && (
        <Modal
          open={Boolean(selectedOffer)}
          onClose={() => setSelectedOffer(null)}
          title={`Offer Letter Package · ${selectedOffer.name}`}
          footer={
            <div className="w-full flex items-center justify-between text-xs">
              <span className="text-gray-500">Status: {selectedOffer.status}</span>
              <Button onClick={() => setSelectedOffer(null)}>Close</Button>
            </div>
          }
        >
          <div className="space-y-4 text-xs text-gray-700">
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
              <h3 className="text-base font-bold text-gray-900">{selectedOffer.name}</h3>
              <p className="text-gray-600">{selectedOffer.role} · {selectedOffer.department}</p>
              <p className="text-emerald-700 font-bold font-mono text-sm pt-1">
                Total CTC: {selectedOffer.totalCTC}
              </p>
            </div>

            <div className="space-y-2">
              <strong className="block text-gray-900 font-bold uppercase text-[11px]">
                Pre-Joining Verification Checklist
              </strong>
              <div className="space-y-1.5">
                {[
                  { task: "PAN & Aadhaar Government Identity Verification", done: true },
                  { task: "Previous Employer Relieving Letter & Form 16", done: selectedOffer.checklistProgress >= 40 },
                  { task: "Educational Degree Verification (University Registry)", done: selectedOffer.checklistProgress >= 80 },
                  { task: "IT Asset & Laptop Dispatch Provisioning", done: selectedOffer.checklistProgress >= 85 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                    <CheckCircle2 size={14} className={item.done ? "text-emerald-600" : "text-gray-300"} />
                    <span className={item.done ? "text-gray-800 font-medium" : "text-gray-400"}>{item.task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
