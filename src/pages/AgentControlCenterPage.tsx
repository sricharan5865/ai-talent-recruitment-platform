import { useState } from "react"
import { useNavigate } from "react-router"
import {
  AlertCircle,
  ArrowRight,
  Bot,
  BrainCircuit,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  Cpu,
  FileCheck2,
  FileText,
  Filter,
  Flame,
  HelpCircle,
  IndianRupee,
  Layers,
  Lock,
  MessageSquare,
  Pause,
  Play,
  RefreshCw,
  Search,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  UserCheck,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react"
import { Badge, Button, Card, Input, Modal, Progress, Select } from "../components/ui"

export interface AgentDefinition {
  id: string
  name: string
  category: "Sourcing & Parsing" | "Matching & Outreach" | "Screening & Interviews" | "Operations & Governance"
  description: string
  triggerEvent: string
  status: "Active" | "Paused" | "Standby"
  autonomyLevel: "Autonomous with guardrails" | "Human approval required" | "Advisory only"
  executionsToday: number
  successRate: number
  avgLatency: string
  tokensUsedToday: number
  primaryTools: string[]
  icon: typeof Bot
  color: string
}

export const autonomousAgents: AgentDefinition[] = [
  {
    id: "job-creator",
    name: "Job Creation Agent",
    category: "Operations & Governance",
    description: "Interviews hiring managers, clarifies ambiguous requirements, drafts inclusive outcome-driven JDs, and benchmarks market compensation across Bengaluru/Mumbai/Delhi NCR.",
    triggerEvent: "Hiring requisition initiated",
    status: "Active",
    autonomyLevel: "Human approval required",
    executionsToday: 42,
    successRate: 98.4,
    avgLatency: "1.2s",
    tokensUsedToday: 48200,
    primaryTools: ["SalaryBenchmarkDB", "SkillTaxonomyAPI", "JobDescriptionOptimizer", "InternalEquityCheck"],
    icon: Sparkles,
    color: "#6366f1",
  },
  {
    id: "candidate-sourcing",
    name: "Candidate Sourcing Agent",
    category: "Sourcing & Parsing",
    description: "Autonomously searches authorized internal talent pools and external verified networks, surfaces equivalent designations, and builds ranked shortlists with zero demographic bias.",
    triggerEvent: "Job published to Talent Network",
    status: "Active",
    autonomyLevel: "Autonomous with guardrails",
    executionsToday: 218,
    successRate: 99.1,
    avgLatency: "2.4s",
    tokensUsedToday: 184500,
    primaryTools: ["SemanticVectorSearch", "TaxonomySynonyms", "TalentPoolCrawler", "DPDPConsentValidator"],
    icon: Search,
    color: "#3b82f6",
  },
  {
    id: "resume-intelligence",
    name: "Resume Intelligence Agent",
    category: "Sourcing & Parsing",
    description: "Ingests complex PDF/DOCX resumes, normalizes job titles, extracts technical/soft skills & verified tenure, flags potential duplicate profiles, and produces standardized summaries.",
    triggerEvent: "Resume uploaded or synced",
    status: "Active",
    autonomyLevel: "Autonomous with guardrails",
    executionsToday: 1420,
    successRate: 99.8,
    avgLatency: "0.8s",
    tokensUsedToday: 342100,
    primaryTools: ["PdfDocxParser", "SkillEntityExtractor", "DuplicateFingerprint", "CareerTimelineBuilder"],
    icon: FileCheck2,
    color: "#059669",
  },
  {
    id: "matching-ranking",
    name: "Matching Agent",
    category: "Matching & Outreach",
    description: "Evaluates multi-dimensional compatibility (skills, tenure, budget, notice period, location preference) and generates explainable matching scores with zero demographic bias.",
    triggerEvent: "Candidate pool update",
    status: "Active",
    autonomyLevel: "Human approval required",
    executionsToday: 684,
    successRate: 99.6,
    avgLatency: "1.1s",
    tokensUsedToday: 124800,
    primaryTools: ["VectorSimilarityEngine", "NoticePeriodCompatibility", "CompensationFitScorer", "ExplainableReportGen"],
    icon: Target,
    color: "#7c3aed",
  },
  {
    id: "outreach-nvite",
    name: "Outreach Agent (NVite)",
    category: "Matching & Outreach",
    description: "Generates hyper-personalized outreach campaigns across consented WhatsApp and Email, tracks open/response rates, schedules follow-ups, and halts immediately upon candidate opt-out.",
    triggerEvent: "Recruiter approves shortlist",
    status: "Active",
    autonomyLevel: "Human approval required",
    executionsToday: 186,
    successRate: 97.9,
    avgLatency: "1.4s",
    tokensUsedToday: 89400,
    primaryTools: ["WhatsAppBusinessAPI", "EmailSequencer", "PersonalizedPitchGen", "OptOutRegistry"],
    icon: Send,
    color: "#d97706",
  },
  {
    id: "screening-copilot",
    name: "Screening Agent",
    category: "Screening & Interviews",
    description: "Conducts structured conversational screening via chat or interactive forms, validates role eligibility, answers candidate questions, and produces objective recruiter screening dossiers.",
    triggerEvent: "Candidate accepts outreach invite",
    status: "Active",
    autonomyLevel: "Autonomous with guardrails",
    executionsToday: 94,
    successRate: 98.7,
    avgLatency: "1.6s",
    tokensUsedToday: 95400,
    primaryTools: ["InteractiveScreeningDialog", "KnockoutQuestionCheck", "CandidateDossierBuilder", "RecruiterEscalator"],
    icon: MessageSquare,
    color: "#2563eb",
  },
  {
    id: "interview-coordinator",
    name: "Interview Agent",
    category: "Screening & Interviews",
    description: "Checks panel calendars across Google & Outlook, generates role-specific interview kits & question rubrics, collects structured feedback scorecards, and synthesizes interview summaries.",
    triggerEvent: "Candidate shortlisted for round",
    status: "Active",
    autonomyLevel: "Autonomous with guardrails",
    executionsToday: 68,
    successRate: 99.3,
    avgLatency: "1.5s",
    tokensUsedToday: 74200,
    primaryTools: ["GoogleCalendarAPI", "OutlookCalendarAPI", "QuestionKitGenerator", "ScorecardSynthesizer"],
    icon: Calendar,
    color: "#0891b2",
  },
  {
    id: "candidate-engagement",
    name: "Candidate Engagement Agent",
    category: "Screening & Interviews",
    description: "Sends real-time stage updates, interview reminders, preparation kits, answers transparent questions regarding company culture, and manages candidate communication consent.",
    triggerEvent: "Pipeline stage change or candidate message",
    status: "Active",
    autonomyLevel: "Autonomous with guardrails",
    executionsToday: 412,
    successRate: 99.9,
    avgLatency: "0.9s",
    tokensUsedToday: 62000,
    primaryTools: ["ConsentedNotifier", "PrepGuideDistributor", "FAQKnowledgeBase", "PrivacyPreferenceStore"],
    icon: Users,
    color: "#16a34a",
  },
  {
    id: "recruitment-coordinator",
    name: "Recruitment Coordinator Agent",
    category: "Operations & Governance",
    description: "Supervises end-to-end recruitment pipelines, detects SLA bottlenecks, assigns pending tasks to recruiters, escalates stalled candidates, and produces daily morning executive briefings.",
    triggerEvent: "Continuous scheduled daemon (every 15 min)",
    status: "Active",
    autonomyLevel: "Autonomous with guardrails",
    executionsToday: 96,
    successRate: 100,
    avgLatency: "2.1s",
    tokensUsedToday: 112000,
    primaryTools: ["PipelineWatchdog", "SLABottleneckDetector", "TaskQueueDispatcher", "DailyBriefingCompiler"],
    icon: Workflow,
    color: "#ea580c",
  },
  {
    id: "recruitment-analytics",
    name: "Recruitment Analytics Agent",
    category: "Operations & Governance",
    description: "Analyzes funnel conversion velocity, forecasts time-to-hire using historical cohort data, identifies high-ROI sourcing channels, and recommends process optimizations.",
    triggerEvent: "Daily midnight & on-demand query",
    status: "Active",
    autonomyLevel: "Advisory only",
    executionsToday: 18,
    successRate: 100,
    avgLatency: "3.2s",
    tokensUsedToday: 54000,
    primaryTools: ["CohortFunnelAnalyzer", "TimeToFillPredictor", "ChannelROICalculator", "ExecutiveReportGenerator"],
    icon: TrendingUp,
    color: "#4f46e5",
  },
]

export function AgentControlCenterPage() {
  const navigate = useNavigate()
  const [agents, setAgents] = useState(autonomousAgents)
  const [activeTab, setActiveTab] = useState<"registry" | "approvals" | "traces" | "guardrails" | "telemetry">("registry")
  const [selectedAgent, setSelectedAgent] = useState<AgentDefinition | null>(null)
  const [toast, setToast] = useState("")

  // Human approval queue items
  const [approvals, setApprovals] = useState([
    {
      id: "appr-1",
      agentName: "Candidate Sourcing Agent",
      role: "Staff Backend Engineer (Indiranagar / Bengaluru)",
      action: "Send outreach invitations to 24 pre-screened Tier-1 candidates",
      confidence: 96,
      details: "Top matches include 18 immediate or 15-day joiners from CRED, Razorpay, and Swiggy with Go & distributed systems experience.",
      createdAt: "12m ago",
      status: "Pending",
      impact: "High",
    },
    {
      id: "appr-2",
      agentName: "Job Creation Agent",
      role: "Lead AI Product Designer (Hybrid)",
      action: "Publish optimized Job Description to India Talent Network & Career Portal",
      confidence: 94,
      details: "Benchmarked compensation at ₹32L–₹40L LPA. 4 bias phrases removed; required skills normalized to 6 core competencies.",
      createdAt: "28m ago",
      status: "Pending",
      impact: "Medium",
    },
    {
      id: "appr-3",
      agentName: "Screening Agent",
      role: "Enterprise Account Executive (Mumbai)",
      action: "Advance candidate Vikram Deshmukh directly to Hiring Manager Panel",
      confidence: 91,
      details: "Passed all 4 knockout criteria: 6 yrs SaaS B2B sales experience, closed ₹4 Cr quota in FY25, notice period 30 days.",
      createdAt: "1h ago",
      status: "Pending",
      impact: "High",
    },
  ])

  // Live execution logs
  const [executionLogs, setExecutionLogs] = useState([
    {
      id: "log-1",
      agent: "Matching Agent",
      event: "Job #4028 (Staff Backend Engineer)",
      step: "Vector similarity search executed across 1,248 candidates. Notice period & salary filter applied. 18 candidates ranked >=90%.",
      latency: "1.12s",
      tokens: "3,840",
      status: "Success",
      time: "10:18:22",
    },
    {
      id: "log-2",
      agent: "Resume Intelligence Agent",
      event: "CV Ingestion: Ananya_Verma_Resume.pdf",
      step: "Parsed 3 pages. Extracted 14 skills, 3 employment roles, B.Tech IIT Bombay (2020). Duplicate detection check: 0 duplicate hashes.",
      latency: "0.84s",
      tokens: "1,920",
      status: "Success",
      time: "10:17:54",
    },
    {
      id: "log-3",
      agent: "Recruitment Coordinator Agent",
      event: "Pipeline SLA Audit",
      step: "Scanned 14 pipeline stages. Detected 2 candidates pending feedback in 'Interview Completed' >72 hrs. Dispatched nudge to Interviewer Rohan.",
      latency: "1.98s",
      tokens: "4,110",
      status: "Success",
      time: "10:15:00",
    },
    {
      id: "log-4",
      agent: "Candidate Engagement Agent",
      event: "Interview Reminder: Priya Sharma",
      step: "Delivered WhatsApp & Google Calendar reminder for Nexora Labs Portfolio Review tomorrow 10:00 AM. Delivered & Read receipt confirmed.",
      latency: "0.62s",
      tokens: "850",
      status: "Success",
      time: "10:12:18",
    },
  ])

  const toggleAgentStatus = (id: string) => {
    setAgents(agents.map(a => {
      if (a.id === id) {
        const nextStatus = a.status === "Active" ? "Paused" : "Active"
        setToast(`${a.name} is now ${nextStatus}`)
        return { ...a, status: nextStatus }
      }
      return a
    }))
  }

  const approveItem = (id: string, actionDesc: string) => {
    setApprovals(approvals.filter(a => a.id !== id))
    setToast(`Approved action: ${actionDesc}`)
  }

  const rejectItem = (id: string) => {
    setApprovals(approvals.filter(a => a.id !== id))
    setToast("Rejected agent action. Fallback returned to recruiter queue.")
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-purple-700">Autonomous multi-agent OS</span>
            <Badge tone="purple">100% Agentic AI</Badge>
            <Badge tone="green">DPDPA 2023 Compliant</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
            Agent Control Center
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Orchestrate, monitor, and govern India's first multi-agent autonomous recruitment operating system. High-impact hiring decisions strictly enforce human approval.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="secondary" onClick={() => setActiveTab("approvals")}>
            <ShieldCheck size={15} />
            Approvals Queue ({approvals.length})
          </Button>
          <Button onClick={() => setToast("All 10 agents synced with latest company knowledge base")}>
            <RefreshCw size={15} /> Sync Knowledge Base
          </Button>
        </div>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <Card className="p-4 border-l-4 border-l-purple-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Autonomous Agents</span>
          <div className="flex items-baseline justify-between mt-1">
            <strong className="text-2xl font-extrabold text-gray-900">
              {agents.filter(a => a.status === "Active").length} / {agents.length}
            </strong>
            <span className="text-xs text-emerald-600 font-bold">100% Operational</span>
          </div>
          <small className="text-xs text-gray-500 mt-1 block">Zero unauthorized database writes</small>
        </Card>

        <Card className="p-4 border-l-4 border-l-blue-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Executions Today</span>
          <div className="flex items-baseline justify-between mt-1">
            <strong className="text-2xl font-extrabold text-gray-900">3,150</strong>
            <span className="text-xs text-blue-600 font-bold">+28% vs yday</span>
          </div>
          <small className="text-xs text-gray-500 mt-1 block">Avg latency: 1.42s per task</small>
        </Card>

        <Card className="p-4 border-l-4 border-l-amber-500">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Human Approvals Pending</span>
          <div className="flex items-baseline justify-between mt-1">
            <strong className="text-2xl font-extrabold text-amber-700">{approvals.length}</strong>
            <Badge tone="amber">Action Needed</Badge>
          </div>
          <small className="text-xs text-gray-500 mt-1 block">High-consequence actions</small>
        </Card>

        <Card className="p-4 border-l-4 border-l-emerald-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Cost & Token Velocity</span>
          <div className="flex items-baseline justify-between mt-1">
            <strong className="text-2xl font-extrabold text-gray-900">₹842.10</strong>
            <span className="text-xs text-emerald-700 font-bold">1.18M tokens</span>
          </div>
          <small className="text-xs text-gray-500 mt-1 block">Est. 42 recruiter hours saved today</small>
        </Card>
      </div>

      {/* Control Center Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6 overflow-x-auto text-sm font-semibold">
          {[
            { id: "registry", label: "Agent Registry (10 Agents)", icon: Cpu },
            { id: "approvals", label: `Human Approval Queue (${approvals.length})`, icon: ShieldCheck },
            { id: "traces", label: "Live Execution & Tool Traces", icon: Terminal },
            { id: "guardrails", label: "Safety & DPDP Guardrails", icon: Lock },
            { id: "telemetry", label: "Cost & Token Telemetry", icon: TrendingUp },
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
                    ? "border-purple-600 text-purple-700 font-bold"
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

      {/* TAB 1: AGENT REGISTRY */}
      {activeTab === "registry" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">Configured Autonomous Agent Fleet</h3>
              <p className="text-xs text-gray-500">Each agent operates under explicit tool boundaries, memory scopes, and human escalation policies.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">Filter category:</span>
              <Badge tone="blue">All (10)</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map((ag) => {
              const Icon = ag.icon
              return (
                <Card key={ag.id} className="p-5 hover:border-purple-400 transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl grid place-items-center text-white"
                          style={{ backgroundColor: ag.color }}
                        >
                          <Icon size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-gray-900">{ag.name}</h4>
                            <Badge tone={ag.status === "Active" ? "green" : "amber"}>
                              {ag.status}
                            </Badge>
                          </div>
                          <span className="text-xs text-gray-500 font-medium">{ag.category}</span>
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        className="h-8 text-xs px-2.5"
                        onClick={() => toggleAgentStatus(ag.id)}
                      >
                        {ag.status === "Active" ? (
                          <>
                            <Pause size={12} /> Pause
                          </>
                        ) : (
                          <>
                            <Play size={12} /> Activate
                          </>
                        )}
                      </Button>
                    </div>

                    <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                      {ag.description}
                    </p>

                    <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-1">
                      <span className="text-[11px] font-semibold text-gray-500 mr-1">Permitted Tools:</span>
                      {ag.primaryTools.map(t => (
                        <span key={t} className="text-[10px] font-mono bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>
                      Trigger: <strong className="text-gray-800">{ag.triggerEvent}</strong>
                    </span>
                    <button
                      type="button"
                      className="text-purple-600 hover:text-purple-800 font-semibold cursor-pointer flex items-center gap-1"
                      onClick={() => setSelectedAgent(ag)}
                    >
                      Inspect agent telemetry <ChevronRight size={13} />
                    </button>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* TAB 2: HUMAN APPROVAL QUEUE */}
      {activeTab === "approvals" && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-start gap-3">
            <ShieldAlert size={20} className="text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-900">Safety Checkpoint: Human-in-the-Loop Enforced</h4>
              <p className="text-xs text-amber-800 mt-0.5">
                In compliance with responsible recruitment AI standards, autonomous agents cannot autonomously dispatch mass candidate outreach or reject candidates without recruiter confirmation.
              </p>
            </div>
          </div>

          {approvals.length === 0 ? (
            <Card className="p-10 text-center">
              <CheckCircle2 size={36} className="text-emerald-500 mx-auto mb-2" />
              <h3 className="text-base font-bold text-gray-900">All agent actions approved!</h3>
              <p className="text-xs text-gray-500 mt-1">The queue is clean. Autonomous agents will signal when human sign-off is required.</p>
            </Card>
          ) : (
            approvals.map((appr) => (
              <Card key={appr.id} className="p-5 border-l-4 border-l-amber-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge tone="purple">{appr.agentName}</Badge>
                      <Badge tone="amber">Pending Approval</Badge>
                      <span className="text-xs text-gray-500">{appr.createdAt}</span>
                    </div>
                    <h4 className="text-base font-bold text-gray-900 mt-1.5">{appr.role}</h4>
                    <p className="text-sm text-gray-800 font-semibold mt-0.5">{appr.action}</p>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed max-w-3xl">{appr.details}</p>
                  </div>
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <Button
                      variant="secondary"
                      className="text-xs h-9 px-3"
                      onClick={() => rejectItem(appr.id)}
                    >
                      <X size={14} /> Reject
                    </Button>
                    <Button
                      className="text-xs h-9 px-4 bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => approveItem(appr.id, appr.action)}
                    >
                      <Check size={14} /> Authorize Action
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* TAB 3: LIVE EXECUTION TRACES */}
      {activeTab === "traces" && (
        <Card className="p-0 overflow-hidden">
          <div className="p-4 bg-gray-900 text-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs">
              <Terminal size={15} className="text-emerald-400" />
              <span>live_agent_orchestration_stream.log</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Stream Connected
              </span>
              <Button
                variant="ghost"
                className="h-7 text-xs text-gray-300 hover:text-white"
                onClick={() => setToast("Log buffer refreshed")}
              >
                Clear buffer
              </Button>
            </div>
          </div>
          <div className="divide-y divide-gray-100 font-mono text-xs">
            {executionLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-gray-50/80 transition flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-gray-400">[{log.time}]</span>
                    <strong className="text-purple-700">{log.agent}</strong>
                    <span className="text-gray-600">→ {log.event}</span>
                    <Badge tone="green">{log.status}</Badge>
                  </div>
                  <p className="text-gray-700 font-sans text-xs leading-relaxed">{log.step}</p>
                </div>
                <div className="text-right flex-shrink-0 text-gray-500">
                  <div>⏱️ {log.latency}</div>
                  <div>⚡ {log.tokens} tokens</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 4: SAFETY & DPDP GUARDRAILS */}
      {activeTab === "guardrails" && (
        <div className="space-y-5">
          <div className="p-5 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-300 font-semibold text-xs mb-1">
                <ShieldCheck size={16} /> REGULATORY GOVERNANCE
              </div>
              <h3 className="text-lg font-bold">Digital Personal Data Protection (DPDP) Act Compliance</h3>
              <p className="text-xs text-blue-200 mt-1 max-w-2xl">
                Talent Network autonomously enforces candidate consent boundaries, purposeful data usage, and complete right-to-be-forgotten erasure across all 10 AI agents.
              </p>
            </div>
            <Badge tone="green">Audit Grade A+</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Zero Demographic Bias Ranking Policy",
                desc: "Strictly forbids ranking or filtering candidates based on gender, religion, caste, age, marital status, or demographic proxies.",
                active: true,
              },
              {
                title: "Candidate Consent Verification Barrier",
                desc: "The Outreach & Screening Agents are blocked from initiating communication unless verified explicit opt-in is recorded in the consent ledger.",
                active: true,
              },
              {
                title: "Human Escalation for Consequential Hiring Decisions",
                desc: "Algorithms cannot reject or hire candidates autonomously. Final stage decisions require verified recruiter or hiring manager sign-off.",
                active: true,
              },
              {
                title: "Automated Sensitive PII Redaction in Model Prompts",
                desc: "Candidate phone numbers, personal email, and residential addresses are tokenized before sending prompts to external foundation models.",
                active: true,
              },
            ].map((rule, idx) => (
              <Card key={idx} className="p-4 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    <h4 className="text-sm font-bold text-gray-900">{rule.title}</h4>
                  </div>
                  <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{rule.desc}</p>
                </div>
                <Badge tone="green">Enforced</Badge>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: COST & TOKEN TELEMETRY */}
      {activeTab === "telemetry" && (
        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="text-base font-bold text-gray-900 mb-2">Model Token Usage & Operational Cost</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-xs text-gray-500 font-semibold block">Total Tokens Consumed (Today)</span>
                <strong className="text-2xl font-extrabold text-gray-900 mt-1 block">1,187,400</strong>
                <span className="text-xs text-emerald-600 mt-1 block">Within allocated tenant quota</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-xs text-gray-500 font-semibold block">Incurred Model Cost (INR)</span>
                <strong className="text-2xl font-extrabold text-gray-900 mt-1 block">₹842.10</strong>
                <span className="text-xs text-gray-500 mt-1 block">₹0.26 avg cost per processed applicant</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-xs text-gray-500 font-semibold block">Recruiter Hours Saved</span>
                <strong className="text-2xl font-extrabold text-purple-700 mt-1 block">42.5 hrs</strong>
                <span className="text-xs text-purple-600 mt-1 block">ROI factor: 14.8x cost saving</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* AGENT DETAIL MODAL */}
      {selectedAgent && (
        <Modal
          open={Boolean(selectedAgent)}
          onClose={() => setSelectedAgent(null)}
          title={`${selectedAgent.name} · Agent Specification`}
          footer={
            <Button onClick={() => setSelectedAgent(null)}>
              Close Telemetry
            </Button>
          }
        >
          <div className="space-y-3 text-xs text-gray-700">
            <p><strong>Role & Purpose:</strong> {selectedAgent.description}</p>
            <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-lg">
              <div>Trigger: <strong>{selectedAgent.triggerEvent}</strong></div>
              <div>Autonomy: <strong>{selectedAgent.autonomyLevel}</strong></div>
              <div>Executions Today: <strong>{selectedAgent.executionsToday}</strong></div>
              <div>Success Rate: <strong>{selectedAgent.successRate}%</strong></div>
              <div>Avg Latency: <strong>{selectedAgent.avgLatency}</strong></div>
              <div>Tokens: <strong>{selectedAgent.tokensUsedToday.toLocaleString()}</strong></div>
            </div>
            <div>
              <strong className="block mb-1">Permitted Tool Interfaces:</strong>
              <div className="flex flex-wrap gap-1">
                {selectedAgent.primaryTools.map(t => (
                  <span key={t} className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-mono">
                    {t}
                  </span>
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
