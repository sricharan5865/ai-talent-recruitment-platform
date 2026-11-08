import { useState } from "react"
import { useNavigate } from "react-router"
import { Check, CheckCircle2, Plus } from "lucide-react"
import {
  Badge,
  Button,
  Card,
  Input,
  Modal,
  Select,
} from "../components/ui"

export function EmployerSettingsPage() {
  const navigate = useNavigate()
  const [toast, setToast] = useState("")

  const [orgName, setOrgName] = useState("Nexora Labs Technologies Private Limited")
  const [orgGstin, setOrgGstin] = useState("29AABCN8291M1Z4")
  const [orgDomain, setOrgDomain] = useState("nexoralabs.com")
  const [orgHeadquarters, setOrgHeadquarters] = useState("Indiranagar, Bengaluru, Karnataka")

  const [teamMembers, setTeamMembers] = useState([
    { id: "tm-1", name: "Neha Kapoor", email: "neha@nexoralabs.com", role: "Talent Lead", status: "Active" },
    { id: "tm-2", name: "Rohan Deshmukh", email: "rohan@nexoralabs.com", role: "Senior Technical Recruiter", status: "Active" },
    { id: "tm-3", name: "Kunal Verma", email: "kunal@nexoralabs.com", role: "VP Engineering (Hiring Manager)", status: "Active" },
  ])
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("Recruiter")

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail.trim()) return
    setTeamMembers([
      ...teamMembers,
      {
        id: `tm-${Date.now()}`,
        name: inviteEmail.split("@")[0].replace(".", " "),
        email: inviteEmail.trim(),
        role: inviteRole,
        status: "Active",
      },
    ])
    setInviteEmail("")
    setInviteModalOpen(false)
    setToast("Invited new team member with role-based access!")
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-blue-700">Organization Settings</span>
            <Badge tone="green">GSTIN Verified</Badge>
            <Badge tone="blue">Enterprise Tier</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
            Company Profile & Team Permissions
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Manage your verified corporate legal entity, Indian GST taxation details, brand assets, and recruiter role permissions.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="secondary" onClick={() => navigate("/employer/billing")}>
            Manage Billing & GST
          </Button>
          <Button onClick={() => setToast("Saved organization settings to master registry!")}>
            <Check size={15} /> Save Changes
          </Button>
        </div>
      </div>

      {/* Organization Details */}
      <Card className="p-5 space-y-4">
        <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
          Legal Entity & Corporate Branding
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <label className="font-bold text-gray-800 block">
            Registered Legal Name
            <Input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="mt-1"
            />
          </label>

          <label className="font-bold text-gray-800 block">
            GSTIN (Goods and Services Tax ID)
            <Input
              value={orgGstin}
              onChange={(e) => setOrgGstin(e.target.value)}
              className="mt-1 font-mono"
            />
          </label>

          <label className="font-bold text-gray-800 block">
            Official Work Domain
            <Input
              value={orgDomain}
              onChange={(e) => setOrgDomain(e.target.value)}
              className="mt-1"
            />
          </label>

          <label className="font-bold text-gray-800 block">
            Headquarters Location
            <Input
              value={orgHeadquarters}
              onChange={(e) => setOrgHeadquarters(e.target.value)}
              className="mt-1"
            />
          </label>
        </div>
      </Card>

      {/* Team Management */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">Recruiter Seats & Team Permissions</h3>
            <p className="text-xs text-gray-500">Assign role-based access for recruiters, hiring managers, and panel interviewers.</p>
          </div>
          <Button onClick={() => setInviteModalOpen(true)}>
            <Plus size={14} /> Invite Teammate
          </Button>
        </div>

        <div className="divide-y divide-gray-100 text-xs">
          {teamMembers.map((m) => (
            <div key={m.id} className="py-3 flex items-center justify-between">
              <div>
                <strong className="text-gray-900 block text-sm">{m.name}</strong>
                <span className="text-gray-500">{m.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone="blue">{m.role}</Badge>
                <Badge tone="green">{m.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* INVITE MODAL */}
      {inviteModalOpen && (
        <Modal
          open={inviteModalOpen}
          onClose={() => setInviteModalOpen(false)}
          title="Invite Teammate to Workspace"
          footer={
            <>
              <Button variant="secondary" onClick={() => setInviteModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInvite}>Send Invitation</Button>
            </>
          }
        >
          <form onSubmit={handleInvite} className="space-y-3 text-xs text-gray-700">
            <label className="font-bold text-gray-800 block">
              Work Email Address
              <Input
                type="email"
                placeholder="colleague@nexoralabs.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="mt-1"
                required
              />
            </label>

            <label className="font-bold text-gray-800 block">
              Assigned Role Permission
              <Select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="mt-1"
              >
                <option>Recruiter (Full pipeline & candidate outreach)</option>
                <option>Hiring Manager (Scorecards & offer approvals)</option>
                <option>Interviewer (Assigned panel interviews only)</option>
                <option>HR Manager (All requisitions & compensation)</option>
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
