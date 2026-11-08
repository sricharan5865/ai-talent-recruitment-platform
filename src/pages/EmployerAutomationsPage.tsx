import { useState } from "react"
import { useNavigate } from "react-router"
import {
  ArrowRight,
  Bot,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Layers,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Sliders,
  Sparkles,
  Workflow,
  X,
  Zap,
} from "lucide-react"
import { Badge, Button, Card, Input, Modal, Select } from "../components/ui"

export interface AutomationRule {
  id: string
  name: string
  triggerEvent: string
  condition: string
  action: string
  status: "Active" | "Paused"
  executionsCount: number
  lastTriggered: string
}

export const initialAutomations: AutomationRule[] = [
  {
    id: "auto-1",
    name: "Auto-Screen & Tag Tier-1 Engineering Applicants",
    triggerEvent: "Application received for Engineering roles",
    condition: "Candidate education has IIT / BITS / NIT AND exp >= 5 yrs",
    action: "Tag as 'Tier-1 Candidate' and fast-track to Recruiter Screening stage",
    status: "Active",
    executionsCount: 248,
    lastTriggered: "14m ago",
  },
  {
    id: "auto-2",
    name: "SLA Escalation for Stalled Interview Scorecards",
    triggerEvent: "Candidate in 'Interview Completed' > 48 hours",
    condition: "Panel scorecard submission is pending",
    action: "Dispatch WhatsApp & Slack nudge to interview panel members",
    status: "Active",
    executionsCount: 84,
    lastTriggered: "2h ago",
  },
  {
    id: "auto-3",
    name: "Automatic Candidate Rejection for Non-India Work Authorization",
    triggerEvent: "Application submitted",
    condition: "Candidate work authorization is 'Requires Visa Sponsorship'",
    action: "Send polite automated rejection email after 24h delay buffer",
    status: "Active",
    executionsCount: 112,
    lastTriggered: "Yesterday",
  },
  {
    id: "auto-4",
    name: "High-Match Immediate Joiner Instant Outreach",
    triggerEvent: "New candidate discovered with match >= 92%",
    condition: "Candidate notice period is 'Immediate' or '<= 15 days'",
    action: "Queue personalized NVite invitation draft in Recruiter Approval Queue",
    status: "Active",
    executionsCount: 62,
    lastTriggered: "3h ago",
  },
]

export function EmployerAutomationsPage() {
  const navigate = useNavigate()
  const [automations, setAutomations] = useState<AutomationRule[]>(initialAutomations)
  const [newRuleModal, setNewRuleModal] = useState(false)
  const [ruleName, setRuleName] = useState("")
  const [ruleTrigger, setRuleTrigger] = useState("Candidate reaches Shortlisted stage")
  const [ruleAction, setRuleAction] = useState("Trigger Automated Screening Agent dialog")
  const [toast, setToast] = useState("")

  const toggleStatus = (id: string) => {
    setAutomations(
      automations.map((a) =>
        a.id === id ? { ...a, status: a.status === "Active" ? "Paused" : "Active" } : a,
      ),
    )
    const target = automations.find((a) => a.id === id)
    setToast(`Toggled automation rule "${target?.name}"`)
  }

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ruleName.trim()) return
    const newRule: AutomationRule = {
      id: `auto-${Date.now()}`,
      name: ruleName.trim(),
      triggerEvent: ruleTrigger,
      condition: "Role criteria matches requisition standards",
      action: ruleAction,
      status: "Active",
      executionsCount: 0,
      lastTriggered: "Just now",
    }
    setAutomations([newRule, ...automations])
    setRuleName("")
    setNewRuleModal(false)
    setToast(`Created automation rule "${newRule.name}"!`)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-blue-700">Recruitment Process Automation</span>
            <Badge tone="purple">Autonomous Trigger Engine</Badge>
            <Badge tone="green">Zero Human Busywork</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
            Workflow Automation Studio
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Configure event-based triggers, SLA escalation rules, automated candidate stage transitions, and multi-agent coordination.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="secondary" onClick={() => navigate("/employer/agents")}>
            <Bot size={15} /> Agent Control Center
          </Button>
          <Button onClick={() => setNewRuleModal(true)}>
            <Plus size={15} /> Create Automation Rule
          </Button>
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-3.5">
        {automations.map((rule) => (
          <Card key={rule.id} className="p-5 hover:border-blue-400 transition flex flex-col justify-between">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-gray-900">{rule.name}</h3>
                  <Badge tone={rule.status === "Active" ? "green" : "neutral"}>{rule.status}</Badge>
                  <span className="text-xs text-gray-400">Triggered {rule.lastTriggered}</span>
                </div>

                <div className="mt-2.5 space-y-1 text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div>
                    <span className="text-gray-400 font-bold uppercase text-[10px] mr-1.5">When:</span>
                    <strong className="text-blue-700">{rule.triggerEvent}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase text-[10px] mr-1.5">Condition:</span>
                    <span>{rule.condition}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase text-[10px] mr-1.5">Action:</span>
                    <strong className="text-purple-700">{rule.action}</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right text-xs">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Executions</span>
                  <strong className="text-base font-bold text-gray-900 font-mono">{rule.executionsCount}</strong>
                </div>
                <Button
                  variant="secondary"
                  className="h-8 text-xs px-3"
                  onClick={() => toggleStatus(rule.id)}
                >
                  {rule.status === "Active" ? <><Pause size={12} /> Pause</> : <><Play size={12} /> Resume</>}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* CREATE AUTOMATION MODAL */}
      {newRuleModal && (
        <Modal
          open={newRuleModal}
          onClose={() => setNewRuleModal(false)}
          title="Create New Workflow Automation Rule"
          footer={
            <>
              <Button variant="secondary" onClick={() => setNewRuleModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRule}>
                <Plus size={14} /> Save & Activate Rule
              </Button>
            </>
          }
        >
          <form onSubmit={handleCreateRule} className="space-y-4 text-xs text-gray-700">
            <label className="font-bold text-gray-800 block">
              Rule Name
              <Input
                placeholder="e.g. Fast-Track Candidates with 90%+ AI Match"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                className="mt-1"
                required
              />
            </label>

            <label className="font-bold text-gray-800 block">
              Event Trigger
              <Select
                value={ruleTrigger}
                onChange={(e) => setRuleTrigger(e.target.value)}
                className="mt-1"
              >
                <option>Application received for any open job</option>
                <option>Candidate reaches Shortlisted stage</option>
                <option>Panel interview marked as completed</option>
                <option>Candidate in stage exceeds 72 hour SLA</option>
              </Select>
            </label>

            <label className="font-bold text-gray-800 block">
              Automated Action to Execute
              <Select
                value={ruleAction}
                onChange={(e) => setRuleAction(e.target.value)}
                className="mt-1"
              >
                <option>Trigger Automated Screening Agent dialog</option>
                <option>Dispatch WhatsApp interview reminder to candidate</option>
                <option>Promote to next pipeline stage autonomously</option>
                <option>Alert hiring manager via Slack and Email</option>
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
