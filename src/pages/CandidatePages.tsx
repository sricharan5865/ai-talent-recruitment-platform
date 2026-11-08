import { Fragment, useState, type CSSProperties } from "react"
import { useNavigate } from "react-router"
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BellPlus,
  Bookmark,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  Copy,
  ExternalLink,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  GitCompareArrows,
  HelpCircle,
  IndianRupee,
  Layers,
  Lightbulb,
  ListTodo,
  MapPin,
  Play,
  Plus,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  UserRound,
  UsersRound,
  Zap,
} from "lucide-react"
import {
  Badge,
  Button,
  Card,
  Input,
  Modal,
  Progress,
  Select,
} from "../components/ui"
import { jobs } from "../data/mockData"
import { FeatureDemoPage } from "./DemoPages"

function Header({
  eyebrow,
  title,
  text,
  action,
}: {
  eyebrow: string
  title: string
  text: string
  action?: React.ReactNode
}) {
  return (
    <div className="page-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {action}
    </div>
  )
}

const homeImages = {
  interview:
    "https://images.unsplash.com/photo-1612299273045-362a39972259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  article:
    "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
}

export function CandidateDashboard() {
  const navigate = useNavigate()
  const [saved, setSaved] = useState<string[]>([])
  const [prepOpen, setPrepOpen] = useState(false)
  const [articleOpen, setArticleOpen] = useState(false)
  const [toast, setToast] = useState("")
  const profileScore = 82

  // AI Co-pilot & Modal states
  const [copilotResumeOpen, setCopilotResumeOpen] = useState(false)
  const [copilotNegotiateOpen, setCopilotNegotiateOpen] = useState(false)
  const [copilotPitchOpen, setCopilotPitchOpen] = useState(false)
  const [upskillModalOpen, setUpskillModalOpen] = useState(false)
  const [selectedApp, setSelectedApp] = useState<{
    id: string
    company: string
    role: string
    location: string
    stage: string
    stageTime: string
    statusTone: "purple" | "green" | "blue" | "amber"
    salary: string
    statusBadge: string
    recruiter: string
    appliedDate: string
    match: number
    interviewType?: string
  } | null>(null)
  const [applyModalJob, setApplyModalJob] = useState<{
    title: string
    company: string
    location: string
    salary: string
    match: number
  } | null>(null)
  const [selectedCvVersion, setSelectedCvVersion] = useState("Priya_Sharma_Fintech_Design_Systems_Lead_2026.pdf")

  // Interactive to-dos
  const [todos, setTodos] = useState([
    { id: "1", text: "Finalize Nexora Labs portfolio deck", due: "Today 6:00 PM", done: false, tag: "Interview" },
    { id: "2", text: "Review CRED revised stock grant terms", due: "Tomorrow", done: false, tag: "Offer" },
    { id: "3", text: "Complete AI Product Design assessment", due: "In 3 days", done: true, tag: "Skills" },
    { id: "4", text: "Upload updated Figma case study links", due: "This week", done: false, tag: "Profile" },
  ])
  const [newTodoText, setNewTodoText] = useState("")

  // Pipeline Filter
  const [pipelineFilter, setPipelineFilter] = useState<"all" | "interview" | "offer" | "review">("all")

  // Recommended Jobs filter & search
  const [jobCategory, setJobCategory] = useState<"all" | "match" | "remote" | "fintech">("all")
  const [jobSearch, setJobSearch] = useState("")

  // Interview drill practice state
  const [currentDrillIdx, setCurrentDrillIdx] = useState(0)
  const [showDrillAnswer, setShowDrillAnswer] = useState(false)
  const [speechPlaying, setSpeechPlaying] = useState(false)

  // Negotiation calculator state
  const [counterCTC, setCounterCTC] = useState(38)
  const [counterBase, setCounterBase] = useState(30)
  const [counterTone, setCounterTone] = useState<"confident" | "strategic" | "collaborative">("strategic")

  // Resume Scan tool state
  const [scanCompany, setScanCompany] = useState("CRED")
  const [isScanning, setIsScanning] = useState(false)
  const [scanResultReady, setScanResultReady] = useState(true)

  const toggleSave = (title: string) => {
    const exists = saved.includes(title)
    setSaved(exists ? saved.filter((t) => t !== title) : [...saved, title])
    setToast(exists ? `Removed ${title} from saved jobs` : `Saved ${title}`)
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodoText.trim()) return
    setTodos([
      ...todos,
      {
        id: String(Date.now()),
        text: newTodoText.trim(),
        due: "Pending",
        done: false,
        tag: "Action",
      },
    ])
    setNewTodoText("")
    setToast("Added new task to your dashboard")
  }

  const sendRecruiterWave = (name: string, company: string) => {
    setToast(`Sent proactive intro & verified portfolio to ${name} at ${company}!`)
  }

  const quickLinks: [string, string, typeof FileText, string][] = [
    ["My applications", "5", FileText, "/candidate/applications"],
    ["Interviews", "2", CalendarDays, "/candidate/interviews"],
    ["Saved jobs", String(7 + saved.length), Bookmark, "/candidate/jobs"],
    ["Profile views", "12", UsersRound, "/candidate/profile"],
  ]

  const applications = [
    {
      id: "app-1",
      company: "Nexora Labs",
      role: "Senior Product Designer",
      location: "Bengaluru · Hybrid",
      stage: "Portfolio Review",
      stageTime: "Tomorrow · 10:00 AM",
      statusTone: "purple" as const,
      salary: "₹32L - ₹36L",
      statusBadge: "Interview Tomorrow",
      recruiter: "Deepika Rao (Talent Partner)",
      appliedDate: "4 days ago",
      match: 94,
      interviewType: "Google Meet · 60 min",
    },
    {
      id: "app-2",
      company: "CRED",
      role: "Staff Product Designer",
      location: "Bengaluru · Indiranagar",
      stage: "Offer Stage",
      stageTime: "Offer valid till Nov 12",
      statusTone: "green" as const,
      salary: "₹38L + ₹12L ESOPs",
      statusBadge: "Offer Received",
      recruiter: "Karan Singhania (Head of Talent)",
      appliedDate: "2 weeks ago",
      match: 96,
      interviewType: "In-person debrief cleared",
    },
    {
      id: "app-3",
      company: "PhonePe",
      role: "Lead UI/UX Designer",
      location: "Bengaluru · Bellandur",
      stage: "System Design Cleared",
      stageTime: "Round 2 passed (+18% score)",
      statusTone: "blue" as const,
      salary: "₹30L - ₹35L",
      statusBadge: "Final Sync Pending",
      recruiter: "Aditi Sen (Sr. Recruiter)",
      appliedDate: "1 week ago",
      match: 90,
      interviewType: "Technical Case Review",
    },
    {
      id: "app-4",
      company: "Swiggy",
      role: "Principal Product Architect",
      location: "Bengaluru · Remote Friendly",
      stage: "Executive Screen",
      stageTime: "Shortlisted by VP Design",
      statusTone: "amber" as const,
      salary: "₹40L - ₹45L",
      statusBadge: "Under Review",
      recruiter: "Vikram Nambiar (VP Design)",
      appliedDate: "3 days ago",
      match: 88,
      interviewType: "Design Leadership Sync",
    },
  ]

  const filteredApps = applications.filter((app) => {
    if (pipelineFilter === "interview") return app.statusTone === "purple" || app.statusTone === "blue"
    if (pipelineFilter === "offer") return app.statusTone === "green"
    if (pipelineFilter === "review") return app.statusTone === "amber"
    return true
  })

  const baseJobs = jobs.slice(0, 6).map((job, i) => ({
    ...job,
    company: ["Nexora Labs", "PhonePe", "CRED", "Razorpay", "Swiggy", "Zepto"][i],
    initials: ["NL", "PP", "CR", "RZ", "SW", "ZP"][i],
    match: 96 - i * 3,
    category: i === 0 || i === 2 ? "fintech" : i === 1 || i === 4 ? "remote" : "match",
  }))

  const filteredJobs = baseJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.company.toLowerCase().includes(jobSearch.toLowerCase())
    if (!matchesSearch) return false
    if (jobCategory === "match") return job.match >= 90
    if (jobCategory === "remote") return job.location.toLowerCase().includes("remote") || job.location.toLowerCase().includes("hybrid")
    if (jobCategory === "fintech") return job.company === "CRED" || job.company === "PhonePe" || job.company === "Razorpay"
    return true
  })

  const drillQuestions = [
    {
      q: "How do you defend high-fidelity design decisions against stakeholders when short-term conversion metrics conflict with long-term UX?",
      context: "Asked in 86% of Senior/Staff Design interviews",
      answer: "1) Acknowledge the core business metric upfront to build trust. 2) Reframe the friction as long-term retention & churn prevention rather than 'aesthetics'. 3) Propose a guardrail metric A/B test (e.g. Test aggressive popups with 14-day user cohort retention monitored alongside immediate conversion).",
      keywords: ["Guardrail metrics", "Retention cohort analysis", "Empathetic business alignment"],
    },
    {
      q: "Walk us through an end-to-end design token architecture you scaled across Figma and a production React/Tailwind codebase.",
      context: "Nexora Labs portfolio review key focus area",
      answer: "1) Three-tier token schema: Global Primitives (colors/scales) -> Semantic Intent (surface-canvas, text-muted) -> Component Overrides. 2) CI/CD automation pipeline syncing Figma Variables to Style Dictionary JSON. 3) Automated linter disallowing raw hex codes in PRs.",
      keywords: ["Semantic token abstraction", "Style Dictionary", "Zero unaliased hex policies"],
    },
    {
      q: "How do you integrate autonomous AI agents into candidate onboarding workflows without creating algorithmic distrust?",
      context: "Key question for modern AI recruiting platforms",
      answer: "1) Explainability by default: Show clear match criteria breakdown (e.g., 94% match = 4 skills matched + 1 gap). 2) Always provide human escalation buttons. 3) Prevent cognitive overload by presenting AI recommendations as suggested drafts rather than irreversible decisions.",
      keywords: ["Explainable AI (XAI)", "Human-in-the-loop fallback", "Cognitive transparency"],
    },
  ]

  const skillsMatrix = [
    { name: "Design Systems & Token Architecture", score: 96, growth: "+18%", tone: "green" as const, status: "Mastery" },
    { name: "AI Interaction & Agentic UX", score: 88, growth: "+34%", tone: "purple" as const, status: "High ROI" },
    { name: "Enterprise B2B Workflows & Tables", score: 82, growth: "+12%", tone: "blue" as const, status: "Strong" },
    { name: "Micro-interactions & Prototyping", score: 94, growth: "+15%", tone: "green" as const, status: "Mastery" },
  ]

  const recruiterPulse = [
    { name: "Deepak Mehta", role: "VP Design @ Swiggy", action: "viewed your Design System project", time: "2h ago", initials: "DM", company: "Swiggy" },
    { name: "Ananya Rao", role: "Talent Partner @ Zepto", action: "shortlisted your profile for Founding Designer", time: "4h ago", initials: "AR", company: "Zepto" },
    { name: "Karan Singhania", role: "Head of Talent @ CRED", action: "downloaded your verified portfolio packet", time: "Yesterday", initials: "KS", company: "CRED" },
  ]

  return (
    <div className="home-simple">
      {/* Left Column: Profile & Navigation */}
      <aside className="home-left">
        <Card className="home-profile">
          <div
            className="home-avatar-ring"
            style={{ "--p": profileScore } as CSSProperties}
          >
            <span>PS</span>
          </div>
          <small className="home-ring-label">{profileScore}% complete</small>
          <h2>Priya Sharma</h2>
          <p>Senior Product Designer</p>
          <p className="home-muted">Razorpay · Bengaluru</p>
          <small className="home-faint">Profile active & open to offers</small>
          <Button
            className="home-pill-btn"
            onClick={() => navigate("/candidate/profile")}
          >
            Edit profile
          </Button>
        </Card>

        <Card className="home-links">
          {quickLinks.map(([label, count, Icon, to]) => (
            <button type="button" key={label} onClick={() => navigate(to)}>
              <Icon size={17} />
              <span>{label}</span>
              <b>{count}</b>
              <ChevronRight size={15} />
            </button>
          ))}
        </Card>

        {/* Market Worth Mini Card */}
        <Card className="home-side-card">
          <div className="home-section-head">
            <span className="eyebrow">Compensation index</span>
            <Badge tone="green">Top 24%</Badge>
          </div>
          <h3>₹31.5L Bengaluru Median</h3>
          <p>Your profile is valued 18% above the senior designer average in Bengaluru tech hubs.</p>
          <div className="salary-benchmark-bar">
            <div className="benchmark-track">
              <div className="benchmark-fill" style={{ width: "74%" }} />
            </div>
            <div className="benchmark-labels">
              <span>₹24L (Current)</span>
              <strong className="text-blue-600 font-semibold">₹31.5L</strong>
              <span>₹42L (Top 10%)</span>
            </div>
          </div>
          <button
            type="button"
            className="home-link"
            onClick={() => navigate("/candidate/radar")}
          >
            Explore salary breakdown →
          </button>
        </Card>
      </aside>

      {/* Center Column: Primary Workflows & Live Tracker */}
      <section className="home-center">
        {/* Hero banner */}
        <button
          type="button"
          className="home-hero"
          onClick={() => navigate("/candidate/radar")}
        >
          <h2>
            What’s your <span>market worth?</span>
          </h2>
          <p>See how your design system and AI UX skills rank against top talent in Bengaluru.</p>
          <div className="home-hero-chips">
            {[
              ["248", "open roles"],
              ["₹31.5L", "market midpoint"],
              ["Top 24%", "candidate bracket"],
              ["+34%", "AI UX demand surge"],
            ].map(([value, label]) => (
              <span key={label}>
                <strong>{value}</strong>
                <small>{label}</small>
              </span>
            ))}
          </div>
        </button>

        {/* AI Career Co-Pilot Bar (New Feature) */}
        <section className="copilot-section">
          <div className="copilot-header">
            <div>
              <span className="copilot-badge">
                <Sparkles size={12} /> AI Career Co-Pilot
              </span>
              <h3 className="text-base font-bold text-gray-900 mt-1">Instant AI Accelerators</h3>
            </div>
            <span className="text-xs text-gray-500 font-medium">Updated 10m ago</span>
          </div>
          <div className="copilot-grid">
            <div
              className="copilot-card"
              role="button"
              tabIndex={0}
              onClick={() => setCopilotResumeOpen(true)}
              onKeyDown={(e) => e.key === "Enter" && setCopilotResumeOpen(true)}
            >
              <div className="copilot-icon-wrap bg-blue-100 text-blue-600">
                <FileCheck2 size={18} />
              </div>
              <strong>ATS Resume Scanner</strong>
              <small>Simulate recruiter parser score & identify missing high-ROI keywords.</small>
            </div>

            <div
              className="copilot-card"
              role="button"
              tabIndex={0}
              onClick={() => setCopilotNegotiateOpen(true)}
              onKeyDown={(e) => e.key === "Enter" && setCopilotNegotiateOpen(true)}
            >
              <div className="copilot-icon-wrap bg-green-100 text-green-600">
                <IndianRupee size={18} />
              </div>
              <strong>Salary Counter Pitch</strong>
              <small>Generate data-backed counter-offer scripts for CRED & Nexora.</small>
            </div>

            <div
              className="copilot-card"
              role="button"
              tabIndex={0}
              onClick={() => setCopilotPitchOpen(true)}
              onKeyDown={(e) => e.key === "Enter" && setCopilotPitchOpen(true)}
            >
              <div className="copilot-icon-wrap bg-purple-100 text-purple-600">
                <Bot size={18} />
              </div>
              <strong>60s Elevator Pitch</strong>
              <small>AI-tailored intro speech for tomorrow’s portfolio interview.</small>
            </div>
          </div>
        </section>

        {/* Tomorrow's Interview Highlight */}
        <Card className="home-feature">
          <span className="home-tag">Tomorrow · 10:00 AM</span>
          <div className="home-feature-copy">
            <h3>Your portfolio review is tomorrow</h3>
            <ul>
              <li>
                <CalendarDays size={17} /> 10:00 AM · 60 minutes · Google Meet
              </li>
              <li>
                <Building2 size={17} /> Nexora Labs · Senior Product Designer
              </li>
            </ul>
            <div className="flex gap-2">
              <Button
                className="home-pill-btn"
                onClick={() => setPrepOpen(true)}
              >
                View preparation guide
              </Button>
              <Button
                variant="secondary"
                className="home-pill-btn"
                onClick={() => {
                  setCurrentDrillIdx(1)
                  setShowDrillAnswer(true)
                  setToast("Loaded Nexora token question into practice drill")
                }}
              >
                Practise token question
              </Button>
            </div>
          </div>
          <img
            src={homeImages.interview}
            alt="Candidate preparing for an interview on a laptop"
          />
        </Card>

        {/* Live Application Pipeline Tracker (New Feature) */}
        <Card className="pipeline-card">
          <div className="home-section-head">
            <div>
              <h3>Active Application Pipeline</h3>
              <p>Track real-time candidate stage progression and pending action items</p>
            </div>
            <Button
              variant="secondary"
              className="text-xs h-8"
              onClick={() => navigate("/candidate/applications")}
            >
              Full pipeline <ArrowRight size={13} />
            </Button>
          </div>

          <div className="pipeline-filter-tabs">
            <button
              type="button"
              className={`pipeline-tab ${pipelineFilter === "all" ? "active" : ""}`}
              onClick={() => setPipelineFilter("all")}
            >
              All ({applications.length})
            </button>
            <button
              type="button"
              className={`pipeline-tab ${pipelineFilter === "interview" ? "active" : ""}`}
              onClick={() => setPipelineFilter("interview")}
            >
              Interviews (2)
            </button>
            <button
              type="button"
              className={`pipeline-tab ${pipelineFilter === "offer" ? "active" : ""}`}
              onClick={() => setPipelineFilter("offer")}
            >
              Offers (1)
            </button>
            <button
              type="button"
              className={`pipeline-tab ${pipelineFilter === "review" ? "active" : ""}`}
              onClick={() => setPipelineFilter("review")}
            >
              Screening (1)
            </button>
          </div>

          <div className="pipeline-list">
            {filteredApps.map((app) => (
              <div key={app.id} className="pipeline-row">
                <div className="pipeline-avatar">
                  {app.company.slice(0, 2).toUpperCase()}
                </div>
                <div className="pipeline-info">
                  <div className="flex items-center gap-2">
                    <h4>{app.role}</h4>
                    <Badge tone={app.statusTone}>{app.statusBadge}</Badge>
                  </div>
                  <p>
                    <span className="font-semibold text-gray-800">{app.company}</span>
                    <span>·</span>
                    <span>{app.location}</span>
                    <span>·</span>
                    <span className="text-gray-900 font-medium">{app.salary}</span>
                    <span>·</span>
                    <span className="text-indigo-600 font-semibold">{app.match}% match</span>
                  </p>
                </div>
                <div className="pipeline-actions">
                  <Button
                    variant="secondary"
                    className="h-8 text-xs px-3"
                    onClick={() => setSelectedApp(app)}
                  >
                    View details
                  </Button>
                  {app.stage === "Offer Stage" && (
                    <Button
                      className="h-8 text-xs px-3"
                      onClick={() => setCopilotNegotiateOpen(true)}
                    >
                      Counter
                    </Button>
                  )}
                  {app.stage === "Portfolio Review" && (
                    <Button
                      className="h-8 text-xs px-3"
                      onClick={() => setPrepOpen(true)}
                    >
                      Prep
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Skill Gap & Market Readiness Matrix (New Feature) */}
        <Card className="home-section">
          <div className="home-section-head">
            <div>
              <h3>AI Skill Gap & Market Readiness</h3>
              <p>Evaluated against 140+ senior design roles in Bengaluru tech startups</p>
            </div>
            <Button
              variant="secondary"
              className="text-xs h-8"
              onClick={() => setUpskillModalOpen(true)}
            >
              <Lightbulb size={13} /> 14-Day Sprint Plan
            </Button>
          </div>

          <div className="skill-matrix-grid">
            {skillsMatrix.map((item) => (
              <div key={item.name} className="skill-item">
                <div className="skill-head">
                  <span>{item.name}</span>
                  <span className="skill-growth-tag">{item.growth}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                  <span className="font-bold text-gray-900">{item.score}% readiness</span>
                  <Badge tone={item.tone}>{item.status}</Badge>
                </div>
                <Progress value={item.score} tone={item.tone === "purple" ? "purple" : item.tone === "green" ? "green" : "blue"} />
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-purple-50/70 border border-purple-200/60 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles size={16} className="text-purple-600" />
              <span className="text-xs text-purple-900 font-medium">
                Recommendation: Complete the <strong>Token API integration</strong> module to boost Staff Designer match from 88% to 96%.
              </span>
            </div>
            <button
              type="button"
              className="text-xs font-bold text-purple-700 hover:underline cursor-pointer whitespace-nowrap ml-2"
              onClick={() => setUpskillModalOpen(true)}
            >
              Start Sprint →
            </button>
          </div>
        </Card>

        {/* Interactive AI Interview Drill & Flashcard (New Feature) */}
        <Card className="home-section">
          <div className="home-section-head">
            <div>
              <span className="eyebrow text-green-700">Daily warm-up</span>
              <h3>AI Interview Flashcard Drill</h3>
              <p>Practice tough scenario questions asked by hiring managers</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">
                Question {currentDrillIdx + 1} of {drillQuestions.length}
              </span>
              <Button
                variant="secondary"
                className="h-8 text-xs px-2.5"
                onClick={() => {
                  setCurrentDrillIdx((prev) => (prev + 1) % drillQuestions.length)
                  setShowDrillAnswer(false)
                }}
              >
                Next question →
              </Button>
            </div>
          </div>

          <div className="interview-drill-box">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                <Target size={13} /> {drillQuestions[currentDrillIdx].context}
              </span>
              <Badge tone="purple">STAR Model</Badge>
            </div>

            <p className="drill-question">
              "{drillQuestions[currentDrillIdx].q}"
            </p>

            <div className="flex items-center gap-3 mt-3">
              <Button
                variant={showDrillAnswer ? "secondary" : "primary"}
                className="h-8 text-xs"
                onClick={() => setShowDrillAnswer(!showDrillAnswer)}
              >
                <Sparkles size={13} />
                {showDrillAnswer ? "Hide AI Answer" : "Reveal Model STAR Answer"}
              </Button>

              <Button
                variant="ghost"
                className="h-8 text-xs text-gray-600"
                onClick={() => {
                  setSpeechPlaying(true)
                  setTimeout(() => setSpeechPlaying(false), 2000)
                  setToast("Simulating audio model delivery...")
                }}
              >
                <Play size={13} />
                {speechPlaying ? "Playing..." : "Hear audio sample"}
              </Button>
            </div>

            {showDrillAnswer && (
              <div className="drill-reveal-box">
                <strong className="text-gray-900 block mb-1">Recommended Response Strategy:</strong>
                <p>{drillQuestions[currentDrillIdx].answer}</p>
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  <span className="text-xs font-semibold text-gray-700">Key proof points:</span>
                  {drillQuestions[currentDrillIdx].keywords.map((kw) => (
                    <span key={kw} className="text-xs bg-white border border-gray-200 px-2 py-0.5 rounded-md font-medium text-gray-800">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Jobs Picked for You with Filter & Instant Search */}
        <Card className="home-section">
          <div className="home-section-head">
            <div>
              <h3>Jobs Picked for You</h3>
              <p>Ranked by semantic match with your design leadership experience</p>
            </div>
            <button
              type="button"
              className="home-link"
              onClick={() => navigate("/candidate/jobs")}
            >
              View all ({jobs.length})
            </button>
          </div>

          {/* Job Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex gap-2">
              <button
                type="button"
                className={`pipeline-tab ${jobCategory === "all" ? "active" : ""}`}
                onClick={() => setJobCategory("all")}
              >
                All Roles
              </button>
              <button
                type="button"
                className={`pipeline-tab ${jobCategory === "match" ? "active" : ""}`}
                onClick={() => setJobCategory("match")}
              >
                Top Match (90%+)
              </button>
              <button
                type="button"
                className={`pipeline-tab ${jobCategory === "remote" ? "active" : ""}`}
                onClick={() => setJobCategory("remote")}
              >
                Remote / Hybrid
              </button>
              <button
                type="button"
                className={`pipeline-tab ${jobCategory === "fintech" ? "active" : ""}`}
                onClick={() => setJobCategory("fintech")}
              >
                Fintech & AI
              </button>
            </div>
            <div className="w-56">
              <Input
                placeholder="Filter by title or company..."
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
          </div>

          <div className="home-job-row">
            {filteredJobs.slice(0, 3).map((job) => (
              <div
                className="home-job-tile"
                key={job.title}
                role="button"
                tabIndex={0}
                onClick={() => setApplyModalJob(job)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setApplyModalJob(job)
                }}
              >
                <div className="home-job-top">
                  <span className="company-logo">{job.initials}</span>
                  <button
                    type="button"
                    className="home-save"
                    aria-label={`Save ${job.title}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSave(job.title)
                    }}
                  >
                    <Bookmark
                      size={17}
                      className={saved.includes(job.title) ? "filled" : ""}
                    />
                  </button>
                </div>
                <strong>{job.title}</strong>
                <small>
                  {job.company} · {job.location}
                </small>
                <div className="home-job-tags">
                  <span>{job.salary}</span>
                  <span className="match">{job.match}% match</span>
                </div>
                <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-indigo-600 font-semibold flex items-center gap-1">
                    <Sparkles size={12} /> 1-Click AI Apply
                  </span>
                  <ChevronRight size={13} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Right Column: Interactive To-Dos, Recruiter Pulse, Guide */}
      <aside className="home-right">
        {/* Candidate Action Checklist */}
        <Card className="home-side-card">
          <div className="home-section-head">
            <div>
              <span className="eyebrow">Action items</span>
              <h3 className="font-bold">Due Deadlines</h3>
            </div>
            <Badge tone="blue">
              {todos.filter((t) => !t.done).length} open
            </Badge>
          </div>

          <div className="flex flex-col">
            {todos.map((todo) => (
              <label
                key={todo.id}
                className={`todo-item ${todo.done ? "checked" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <div className="flex-1 min-w-0">
                  <span className="font-medium block leading-snug">{todo.text}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <small className="text-xs text-amber-700 font-medium">{todo.due}</small>
                    <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
                      {todo.tag}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <form onSubmit={addTodo} className="flex gap-2 mt-3 pt-2 border-t border-gray-100">
            <Input
              placeholder="+ Add personal task..."
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              className="h-8 text-xs"
            />
            <Button type="submit" variant="secondary" className="h-8 text-xs px-2.5">
              <Plus size={14} />
            </Button>
          </form>
        </Card>

        {/* Live Recruiter Pulse Activity */}
        <Card className="home-side-card">
          <div className="home-section-head">
            <div>
              <span className="eyebrow text-indigo-600">Live Pulse</span>
              <h3 className="font-bold">Recruiter Views</h3>
            </div>
            <Badge tone="green">Real-time</Badge>
          </div>
          <p className="text-xs text-gray-500 mb-2">
            Hiring leaders actively viewing your credentials
          </p>

          <div className="flex flex-col">
            {recruiterPulse.map((item) => (
              <div key={item.name} className="recruiter-pulse-item">
                <div className="recruiter-avatar">{item.initials}</div>
                <div className="min-w-0">
                  <strong className="block text-xs font-semibold text-gray-900 truncate">
                    {item.name}
                  </strong>
                  <span className="text-[11px] text-gray-500 block truncate">
                    {item.role}
                  </span>
                  <span className="text-[10px] text-indigo-600 block">
                    {item.action} · {item.time}
                  </span>
                </div>
                <button
                  type="button"
                  title="Send quick introduction"
                  className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                  onClick={() => sendRecruiterWave(item.name, item.company)}
                >
                  <Send size={13} />
                </button>
              </div>
            ))}
          </div>

          <Button
            variant="secondary"
            className="w-full text-xs h-8 mt-2"
            onClick={() => navigate("/candidate/profile")}
          >
            Manage profile visibility
          </Button>
        </Card>

        {/* Portfolio Review Prep Guide Card */}
        <Card className="home-article">
          <img
            src={homeImages.article}
            alt="Designer sketching on a drawing tablet beside a laptop"
          />
          <div>
            <span className="eyebrow">Hiring playbook</span>
            <h3>How to ace a portfolio review: story, process and outcomes</h3>
            <p>
              Hiring panels decide in the first ten minutes. Lead with the
              problem, show how you got there, and close with measurable
              impact.
            </p>
            <button
              type="button"
              className="home-link"
              onClick={() => setArticleOpen(true)}
            >
              Read full article →
            </button>
          </div>
        </Card>
      </aside>

      {/* MODAL 1: Next Interview Prep Guide */}
      <Modal
        open={prepOpen}
        onClose={() => setPrepOpen(false)}
        title="Preparation guide · Nexora Labs"
        footer={
          <>
            <Button variant="secondary" onClick={() => setPrepOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setPrepOpen(false)
                navigate("/candidate/assistant")
              }}
            >
              Practise with AI <ArrowRight size={15} />
            </Button>
          </>
        }
      >
        <div className="suggestion-list">
          <div>
            <Badge tone="green">First 15 min</Badge>
            <p>Introduce your role and team setup at Razorpay, explaining cross-functional scale.</p>
          </div>
          <div>
            <Badge tone="blue">Next 30 min</Badge>
            <p>
              Walk through the merchant onboarding redesign and the 24%
              activation lift with token architecture.
            </p>
          </div>
          <div>
            <Badge tone="purple">Last 15 min</Badge>
            <p>Questions on design system governance, multi-brand theming, and engineering handoff.</p>
          </div>
        </div>
      </Modal>

      {/* MODAL 2: Reading Guide */}
      <Modal
        open={articleOpen}
        onClose={() => setArticleOpen(false)}
        title="How to ace a portfolio review"
        footer={<Button onClick={() => setArticleOpen(false)}>Done</Button>}
      >
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>1. Start with the problem.</strong> One sentence on who was
            struggling and why it mattered to the business.
          </p>
          <p>
            <strong>2. Show two or three key decisions.</strong> Explain the
            options you considered and why you chose one over another.
          </p>
          <p>
            <strong>3. End with outcomes.</strong> Share a number, such as
            conversion, time saved or adoption, and what you would do next.
          </p>
        </div>
      </Modal>

      {/* MODAL 3: AI ATS Resume Scanner Modal */}
      <Modal
        open={copilotResumeOpen}
        onClose={() => setCopilotResumeOpen(false)}
        title="AI ATS Resume Scanner & Matcher"
        footer={
          <>
            <Button variant="secondary" onClick={() => setCopilotResumeOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setCopilotResumeOpen(false)
                setToast("Applied suggested bullet points to your primary resume draft!")
              }}
            >
              <Check size={14} /> Adopt Suggested Bullet Points
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl">
            <div>
              <span className="text-xs text-gray-500 font-semibold block">Target Job Description</span>
              <strong className="text-sm text-gray-900">{scanCompany} · Staff Product Designer</strong>
            </div>
            <div className="text-right">
              <span className="text-xs text-emerald-600 font-bold block">ATS Match Score</span>
              <span className="text-xl font-extrabold text-emerald-700">92%</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-gray-700 block mb-1">Keywords Detected in Your Resume</span>
            <div className="flex flex-wrap gap-1.5">
              {["Design Tokens", "Figma Variables", "Design System Governance", "A/B Testing", "Fintech UX", "Cross-functional Leadership"].map((kw) => (
                <span key={kw} className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                  ✓ {kw}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-gray-700 block mb-1">Missing High-Impact Keywords</span>
            <div className="flex flex-wrap gap-1.5">
              {["Agentic UX Workflows", "RBI Compliance UX", "Multi-brand Tokenization"].map((kw) => (
                <span key={kw} className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                  + {kw}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 bg-indigo-50/60 border border-indigo-200 rounded-xl">
            <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5 mb-1">
              <Sparkles size={13} /> AI Suggested Resume Bullet Rewrite:
            </span>
            <p className="text-xs text-gray-700 italic">
              "Architected cross-platform design token pipeline reducing frontend handoff cycles by 42% while complying with multi-brand Fintech governance standards."
            </p>
          </div>
        </div>
      </Modal>

      {/* MODAL 4: Salary Negotiation Counter-Offer Pitcher */}
      <Modal
        open={copilotNegotiateOpen}
        onClose={() => setCopilotNegotiateOpen(false)}
        title="AI Salary Counter-Offer Strategist"
        footer={
          <>
            <Button variant="secondary" onClick={() => setCopilotNegotiateOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard?.writeText(
                  `Hi Karan, thank you for the offer of ₹34L. Based on market data for Senior/Staff roles in Bengaluru, I am seeking ₹${counterCTC}L CTC with ₹${counterBase}L fixed component.`
                )
                setCopilotNegotiateOpen(false)
                setToast("Copied customized counter-offer email draft to clipboard!")
              }}
            >
              <Copy size={14} /> Copy Pitch Email Draft
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs font-semibold text-gray-700">
              Target CTC (₹ Lakhs)
              <Input
                type="number"
                value={counterCTC}
                onChange={(e) => setCounterCTC(Number(e.target.value))}
                className="mt-1"
              />
            </label>
            <label className="text-xs font-semibold text-gray-700">
              Fixed Base (₹ Lakhs)
              <Input
                type="number"
                value={counterBase}
                onChange={(e) => setCounterBase(Number(e.target.value))}
                className="mt-1"
              />
            </label>
          </div>

          <div>
            <span className="text-xs font-semibold text-gray-700 block mb-1">Pitch Tone</span>
            <div className="flex gap-2">
              {(["strategic", "confident", "collaborative"] as const).map((tone) => (
                <button
                  key={tone}
                  type="button"
                  className={`pipeline-tab capitalize ${counterTone === tone ? "active" : ""}`}
                  onClick={() => setCounterTone(tone)}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 space-y-2">
            <strong className="block text-gray-900 font-bold">Generated AI Counter-Pitch Draft:</strong>
            <p>
              "Dear Hiring Team, thank you sincerely for the offer for the Staff Product Designer role. Given the scope of leading the design token architecture across multiple product squads, market benchmark data for senior design talent in Bengaluru places this role between ₹36L - ₹42L. I would be thrilled to sign immediately at <strong>₹{counterCTC}L CTC</strong> (with <strong>₹{counterBase}L</strong> base salary and balance in performance ESOPs)."
            </p>
          </div>
        </div>
      </Modal>

      {/* MODAL 5: 60s Elevator Pitch Generator */}
      <Modal
        open={copilotPitchOpen}
        onClose={() => setCopilotPitchOpen(false)}
        title="AI 60-Second Interview Elevator Pitch"
        footer={
          <>
            <Button variant="secondary" onClick={() => setCopilotPitchOpen(false)}>
              Done
            </Button>
            <Button
              onClick={() => {
                setSpeechPlaying(true)
                setTimeout(() => setSpeechPlaying(false), 3000)
                setToast("Playing simulated speech delivery...")
              }}
            >
              <Play size={14} /> Practice Audio Walkthrough
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl">
            <span className="text-xs font-bold text-purple-900 block mb-1">
              Tailored for: Nexora Labs Portfolio Review
            </span>
            <p className="text-xs text-gray-700 leading-relaxed">
              "Hi, I’m Priya Sharma. Over the last 5 years at Razorpay, I’ve specialized in building scalable design systems that bridge the gap between design vision and high-velocity engineering. Most recently, I led the merchant onboarding overhaul that improved activation by 24% while reducing design debt across 6 product squads. I’m eager to bring this systems mindset to Nexora Labs to scale your next generation of intelligent product experiences."
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>⏱️ Delivery duration: ~55 seconds</span>
            <span>⭐ Tone: Impact-driven & Authentic</span>
          </div>
        </div>
      </Modal>

      {/* MODAL 6: 14-Day Upskill Sprint Roadmap */}
      <Modal
        open={upskillModalOpen}
        onClose={() => setUpskillModalOpen(false)}
        title="14-Day AI Career Upskill Sprint"
        footer={
          <Button onClick={() => setUpskillModalOpen(false)}>
            Close Roadmap
          </Button>
        }
      >
        <div className="space-y-3 text-xs text-gray-700">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <strong className="text-blue-900 block font-bold mb-1">Week 1: Token Pipeline & Code Handoff</strong>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Configure Style Dictionary with Figma Variables export</li>
              <li>Implement semantic light/dark mode tokens in React & Tailwind CSS</li>
              <li>Setup automated Figma-to-code PR validation GitHub Action</li>
            </ul>
          </div>

          <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl">
            <strong className="text-purple-900 block font-bold mb-1">Week 2: Agentic UX & Explainable AI Patterns</strong>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Design candidate multi-step reasoning transparency cards</li>
              <li>Build human-in-the-loop fallback controls and confirmation states</li>
              <li>Publish interactive case study to portfolio with live metric proof points</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* MODAL 7: 1-Click AI Easy Apply Modal */}
      {applyModalJob && (
        <Modal
          open={Boolean(applyModalJob)}
          onClose={() => setApplyModalJob(null)}
          title={`1-Click AI Apply · ${applyModalJob.company}`}
          footer={
            <>
              <Button variant="secondary" onClick={() => setApplyModalJob(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const comp = applyModalJob.company
                  setApplyModalJob(null)
                  setToast(`Application submitted with AI tailored pitch to ${comp}!`)
                }}
              >
                <Sparkles size={14} /> Submit Application
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl">
              <div>
                <strong className="text-sm text-gray-900 block">{applyModalJob.title}</strong>
                <span className="text-xs text-gray-500">{applyModalJob.company} · {applyModalJob.location}</span>
              </div>
              <Badge tone="green">{applyModalJob.match}% Match</Badge>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-gray-700">Select CV Version to Attach</span>
                <button
                  type="button"
                  onClick={() => {
                    setApplyModalJob(null)
                    navigate("/candidate/resume")
                  }}
                  className="text-xs text-blue-600 hover:underline cursor-pointer font-medium"
                >
                  Manage CV Vault &rarr;
                </button>
              </div>
              <select
                value={selectedCvVersion}
                onChange={(e) => setSelectedCvVersion(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded-lg text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="Priya_Sharma_Fintech_Design_Systems_Lead_2026.pdf">
                  📄 Priya_Sharma_Fintech_Design_Systems_Lead_2026.pdf (Default · 96% ATS Score)
                </option>
                <option value="Priya_Sharma_Agentic_AI_UX_Architect.pdf">
                  📄 Priya_Sharma_Agentic_AI_UX_Architect.pdf (94% ATS Score · AI Focus)
                </option>
                <option value="Priya_Sharma_Founding_Designer_B2B_SaaS.pdf">
                  📄 Priya_Sharma_Founding_Designer_B2B_SaaS.pdf (90% ATS Score · High Equity & 0-to-1)
                </option>
              </select>
              <div className="flex items-center justify-between mt-1 text-[11px] text-gray-500">
                <span>Selected CV will be verified and parsed automatically</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  ✓ ATS Optimized
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-gray-700 block mb-1">AI-Generated Tailored Introduction</span>
              <textarea
                defaultValue={`Dear ${applyModalJob.company} hiring team, with 5+ years driving high-conversion design systems at Razorpay, my background directly matches your requirements for ${applyModalJob.title}. I look forward to contributing to your product velocity.`}
                className="w-full text-xs p-2.5 border border-gray-300 rounded-lg h-24 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL 8: Application Details Modal */}
      {selectedApp && (
        <Modal
          open={Boolean(selectedApp)}
          onClose={() => setSelectedApp(null)}
          title={`${selectedApp.company} · Application Details`}
          footer={
            <Button onClick={() => setSelectedApp(null)}>
              Close Details
            </Button>
          }
        >
          <div className="space-y-3 text-xs text-gray-700">
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
              <strong className="text-sm font-bold text-gray-900 block">{selectedApp.role}</strong>
              <span className="text-gray-500">{selectedApp.location} · {selectedApp.salary}</span>
              <div className="mt-2 flex items-center gap-2">
                <Badge tone={selectedApp.statusTone}>{selectedApp.statusBadge}</Badge>
                <span className="text-gray-600 font-medium">Applied {selectedApp.appliedDate}</span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-3">
              <strong className="block text-gray-900 mb-1 font-bold">Recruiter Contact:</strong>
              <p className="text-gray-600">{selectedApp.recruiter}</p>
              {selectedApp.interviewType && (
                <p className="text-indigo-600 font-medium mt-1">
                  Format: {selectedApp.interviewType}
                </p>
              )}
            </div>

            <div className="border border-gray-200 rounded-xl p-3">
              <strong className="block text-gray-900 mb-1 font-bold">Interview Stages Status:</strong>
              <div className="space-y-1.5 mt-2">
                <div className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 size={14} /> Resume Screening — Passed (Top 5%)
                </div>
                <div className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 size={14} /> Initial Recruiter Screen — Cleared
                </div>
                <div className="flex items-center gap-2 text-indigo-700 font-semibold">
                  <Clock3 size={14} /> {selectedApp.stage} — In Progress
                </div>
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

export function MarketplacePage() {
  const [query, setQuery] = useState("React developer")
  const [saved, setSaved] = useState<string[]>([])
  const [apply, setApply] = useState<string | null>(null)
  const [alertCreated, setAlertCreated] = useState(false)
  const [filters, setFilters] = useState(["Hybrid", "React", "Bengaluru"])
  const [location, setLocation] = useState("")
  const [sort, setSort] = useState("match")
  const [compare, setCompare] = useState<string[]>([])
  const [compareOpen, setCompareOpen] = useState(false)
  const [insightJob, setInsightJob] = useState<string | null>(null)
  const [toast, setToast] = useState("")
  const marketJobs = [
    {
      title: "Senior React Developer",
      company: "Zentrix Labs",
      initial: "Z",
      rating: "4.3",
      location: "Bengaluru",
      mode: "Hybrid",
      salary: "18–26 LPA",
      experience: "4–7 yrs",
      skills: ["React", "TypeScript", "GraphQL", "Jest"],
      match: 92,
      posted: "2 days ago",
      postedDays: 2,
      salaryMin: 18,
      response: "Usually responds in 2 days",
      applicants: 38,
      commute: "28 min from your preference",
      verified: true,
      missing: "AWS",
      culture: "4.6",
      growth: "High",
    },
    {
      title: "Frontend Engineer II",
      company: "Paytrail",
      initial: "P",
      rating: "4.1",
      location: "Pune",
      mode: "Remote",
      salary: "14–20 LPA",
      experience: "3–5 yrs",
      skills: ["React", "Redux", "CSS", "Webpack"],
      match: 86,
      posted: "1 day ago",
      postedDays: 1,
      salaryMin: 14,
      response: "Usually responds in 4 days",
      applicants: 64,
      commute: "Remote-first team",
      verified: true,
      missing: "Testing strategy",
      culture: "4.3",
      growth: "High",
    },
    {
      title: "React Native Engineer",
      company: "Cleartrip",
      initial: "C",
      rating: "4.4",
      location: "Bengaluru",
      mode: "Hybrid",
      salary: "16–24 LPA",
      experience: "4–6 yrs",
      skills: ["React Native", "TypeScript", "iOS", "Android"],
      match: 84,
      posted: "3 days ago",
      postedDays: 3,
      salaryMin: 16,
      response: "Usually responds in 3 days",
      applicants: 47,
      commute: "34 min from your preference",
      verified: true,
      missing: "Native iOS",
      culture: "4.4",
      growth: "Medium",
    },
  ]
  const workModeFilters = filters.filter((item) =>
    ["Remote", "Hybrid", "On-site"].includes(item),
  )
  const salaryFilters = filters.filter((item) =>
    ["0–10 LPA", "10–20 LPA", "20+ LPA"].includes(item),
  )
  const shown = marketJobs
    .filter((job) =>
      `${job.title} ${job.company} ${job.skills.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase().replace(" developer", "")),
    )
    .filter(
      (job) =>
        !location ||
        `${job.location} ${job.mode}`
          .toLowerCase()
          .includes(location.toLowerCase()),
    )
    .filter(
      (job) => !workModeFilters.length || workModeFilters.includes(job.mode),
    )
    .filter(
      (job) =>
        !salaryFilters.length ||
        salaryFilters.some((filter) =>
          filter === "20+ LPA"
            ? job.salaryMin >= 20
            : filter === "10–20 LPA"
              ? job.salaryMin >= 10 && job.salaryMin < 20
              : job.salaryMin < 10,
        ),
    )
    .sort((a, b) =>
      sort === "salary"
        ? b.salaryMin - a.salaryMin
        : sort === "recent"
          ? a.postedDays - b.postedDays
          : b.match - a.match,
    )
  const toggleFilter = (filter: string) =>
    setFilters(
      filters.includes(filter)
        ? filters.filter((item) => item !== filter)
        : [...filters, filter],
    )
  const selectedInsight = marketJobs.find((job) => job.title === insightJob)
  const comparedJobs = marketJobs.filter((job) => compare.includes(job.title))

  return (
    <>
      <div className="marketplace-heading">
        <div>
          <span className="eyebrow">Discover opportunities</span>
          <h1>Find jobs</h1>
          <p>1,240 jobs for “{query || "all roles"}”</p>
        </div>
        <Select
          aria-label="Sort jobs"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="match">Sort: Best match</option>
          <option value="recent">Sort: Most recent</option>
          <option value="salary">Sort: Salary</option>
        </Select>
      </div>
      <Card className="market-search">
        <div className="search-box">
          <Search />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Job title, skill, or company"
          />
        </div>
        <div className="search-box">
          <MapPin />
          <Input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Bengaluru, Mumbai, Remote"
          />
        </div>
        <Button
          onClick={() => setToast(`${shown.length} matching roles found`)}
        >
          Search jobs
        </Button>
      </Card>
      <div className="market-layout reference-market-layout">
        <aside>
          <Card className="job-filters reference-job-filters">
            {[
              ["Work mode", ["Remote", "Hybrid", "On-site"]],
              ["Salary", ["0–10 LPA", "10–20 LPA", "20+ LPA"]],
              ["Freshness", ["Today", "Last 3 days", "Last week"]],
              ["Job type", ["Full-time", "Contract", "Internship"]],
            ].map(([group, options]) => (
              <div className="market-filter-group" key={group as string}>
                <h3>{group as string}</h3>
                {(options as string[]).map((option) => (
                  <label className="market-check-row" key={option}>
                    <Input
                      type="checkbox"
                      checked={filters.includes(option)}
                      onChange={() => toggleFilter(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
          </Card>
        </aside>
        <section className="job-results reference-job-results">
          <div className="active-filter-row">
            <div>
              {filters.slice(0, 3).map((filter) => (
                <Button
                  variant="ghost"
                  className="filter-chip"
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                >
                  {filter} <span>×</span>
                </Button>
              ))}
              <Button variant="ghost" onClick={() => setFilters([])}>
                Clear all
              </Button>
            </div>
          </div>
          <div className="job-alert-banner">
            <BellPlus />
            <span>
              <strong>
                {alertCreated
                  ? "Your alert is active."
                  : "Get notified when new jobs match this search."}
              </strong>
              {alertCreated && (
                <small>We’ll notify you about relevant roles.</small>
              )}
            </span>
            <Button onClick={() => setAlertCreated(!alertCreated)}>
              {alertCreated ? "Alert created" : "Create alert"}
            </Button>
          </div>
          {shown.map((job) => (
            <Card className="market-job reference-market-job" key={job.title}>
              <div className="market-job-top">
                <span className="company-logo">{job.initial}</span>
                <div>
                  <h2>{job.title}</h2>
                  <p>
                    {job.company}
                    {job.verified && (
                      <BadgeCheck className="verified-company" />
                    )}
                    · <Star className="rating-star" /> {job.rating}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="match-detail-button"
                  onClick={() => setInsightJob(job.title)}
                >
                  <Badge tone="green">{job.match}% match</Badge>
                  <ChevronRight />
                </Button>
              </div>
              <div className="job-meta">
                <span>
                  <MapPin /> {job.location} · {job.mode}
                </span>
                <span>
                  <IndianRupee /> {job.salary}
                </span>
                <span>
                  <BriefcaseBusiness /> {job.experience}
                </span>
              </div>
              <div className="market-skill-row">
                {job.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
              <div className="market-job-foot">
                <span className="compare-control">
                  <Input
                    type="checkbox"
                    checked={compare.includes(job.title)}
                    onChange={() =>
                      setCompare(
                        compare.includes(job.title)
                          ? compare.filter((item) => item !== job.title)
                          : compare.length < 3
                            ? [...compare, job.title]
                            : compare,
                      )
                    }
                  />
                  Compare
                  <small>{job.posted}</small>
                </span>
                <span>
                  <Button
                    variant="secondary"
                    aria-label={`Save ${job.title}`}
                    onClick={() =>
                      setSaved(
                        saved.includes(job.title)
                          ? saved.filter((item) => item !== job.title)
                          : [...saved, job.title],
                      )
                    }
                  >
                    <Bookmark
                      className={saved.includes(job.title) ? "filled" : ""}
                    />
                  </Button>
                  <Button onClick={() => setApply(job.title)}>
                    Easy apply
                  </Button>
                </span>
              </div>
            </Card>
          ))}
          {!shown.length && (
            <Card className="market-no-results">
              <Search />
              <h2>No exact matches found</h2>
              <p>Try removing a keyword or clearing your filters.</p>
              <Button variant="secondary" onClick={() => setQuery("")}>
                Clear search
              </Button>
            </Card>
          )}
        </section>
      </div>
      {compare.length > 0 && (
        <div className="compare-dock">
          <span className="compare-dock-icon">
            <GitCompareArrows />
          </span>
          <span>
            <strong>
              {compare.length} role{compare.length > 1 ? "s" : ""} selected
            </strong>
            <small>Select up to 3 jobs for side-by-side comparison</small>
          </span>
          <div className="compare-company-list">
            {comparedJobs.map((job) => (
              <span className="company-logo" key={job.title}>
                {job.initial}
              </span>
            ))}
          </div>
          <Button variant="ghost" onClick={() => setCompare([])}>
            Clear
          </Button>
          <Button
            disabled={compare.length < 2}
            onClick={() => setCompareOpen(true)}
          >
            Compare jobs
          </Button>
        </div>
      )}
      <Modal
        open={!!selectedInsight}
        onClose={() => setInsightJob(null)}
        title={`Why this role matches you`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setInsightJob(null)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setApply(selectedInsight?.title || null)
                setInsightJob(null)
              }}
            >
              Apply with this profile
            </Button>
          </>
        }
      >
        {selectedInsight && (
          <div className="fit-insight">
            <div className="fit-insight-hero">
              <span>
                <strong>{selectedInsight.match}%</strong>
                <small>evidence-based fit</small>
              </span>
              <div>
                <Badge tone="purple">Advisory, not a hiring decision</Badge>
                <h3>{selectedInsight.title}</h3>
                <p>{selectedInsight.company}</p>
              </div>
            </div>
            {[
              [
                "Skills evidence",
                94,
                "Your React and TypeScript work samples strongly support this role.",
              ],
              [
                "Experience alignment",
                88,
                "Your 6 years of product experience sits within the requested range.",
              ],
              [
                "Work preferences",
                96,
                `${selectedInsight.mode} and ${selectedInsight.location} match your preferences.`,
              ],
            ].map(([label, value, text]) => (
              <div className="fit-factor" key={String(label)}>
                <span>
                  <strong>{label}</strong>
                  <b>{value}%</b>
                </span>
                <Progress value={Number(value)} tone="purple" />
                <p>{text}</p>
              </div>
            ))}
            <div className="fit-gap">
              <CircleAlert />
              <span>
                <strong>Potential gap: {selectedInsight.missing}</strong>
                <p>
                  This skill was not found in your profile. You can still apply
                  and add relevant evidence if available.
                </p>
              </span>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        title="Compare opportunities"
        footer={<Button onClick={() => setCompareOpen(false)}>Done</Button>}
      >
        <div className="job-compare-grid">
          <span />
          {comparedJobs.map((job) => (
            <div className="compare-job-head" key={job.title}>
              <span className="company-logo">{job.initial}</span>
              <strong>{job.title}</strong>
              <small>{job.company}</small>
            </div>
          ))}
          {[
            ["Profile match", "match", "%"],
            ["Salary", "salary", ""],
            ["Culture", "culture", "/5"],
            ["Growth", "growth", ""],
            ["Response", "response", ""],
          ].map(([label, key, suffix]) => (
            <Fragment key={label}>
              <strong className="compare-label">{label}</strong>
              {comparedJobs.map((job) => (
                <span key={`${job.title}-${key}`}>
                  {String(job[(key as keyof typeof job)])}
                  {suffix}
                </span>
              ))}
            </Fragment>
          ))}
        </div>
      </Modal>
      <Modal
        open={!!apply}
        onClose={() => setApply(null)}
        title={`Apply to ${apply}`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setApply(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setToast(`Application submitted to ${apply}`)
                setApply(null)
              }}
            >
              Submit application
            </Button>
          </>
        }
      >
        <div className="application-preview">
          <CheckCircle2 />
          <div>
            <strong>Your profile is ready</strong>
            <p>
              We’ll share your Talent Network profile and selected resume with
              this employer.
            </p>
          </div>
        </div>
        <label>
          Attach CV Version
          <Select>
            <option>Priya_Sharma_Fintech_Design_Systems_Lead_2026.pdf (Default · 96% Match)</option>
            <option>Priya_Sharma_Agentic_AI_UX_Architect.pdf (94% Match · AI/LLM Focus)</option>
            <option>Priya_Sharma_Founding_Designer_B2B_SaaS.pdf (90% Match · High Equity & 0-to-1)</option>
          </Select>
        </label>
        <label>
          Why are you interested?
          <textarea className="textarea" placeholder="Share a short note…" />
        </label>
        <label className="application-consent-row">
          <Input type="checkbox" defaultChecked />
          <span>
            <strong>Share my verified Career Passport</strong>
            <small>
              Includes work-sample evidence, verified skills, and profile
              preferences.
            </small>
          </span>
        </label>
      </Modal>
      {toast && (
        <div className="toast">
          <CheckCircle2 /> {toast}
          <Button variant="ghost" onClick={() => setToast("")}>
            ×
          </Button>
        </div>
      )}
    </>
  )
}

export function CandidateApplicationsPage() {
  const steps = [
    "Applied",
    "Under review",
    "Screening",
    "Shortlisted",
    "Interview",
    "Offer",
  ]
  return (
    <>
      <Header
        eyebrow="Application tracker"
        title="My applications"
        text="Stay informed at every step of your job search."
      />
      <div className="application-list">
        {jobs.slice(0, 3).map((job, ji) => (
          <Card key={job.title} className="application-card">
            <div className="application-head">
              <span className="company-logo">{["NL", "PF", "CR"][ji]}</span>
              <div>
                <h2>{job.title}</h2>
                <p>
                  {["Nexora Labs", "PhonePe", "CRED"][ji]} · {job.location}
                </p>
              </div>
              <Badge tone={ji === 0 ? "purple" : ji === 1 ? "blue" : "green"}>
                {steps[ji + 3]}
              </Badge>
            </div>
            <div className="application-stepper">
              {steps.map((step, i) => (
                <div className={i <= ji + 3 ? "done" : ""} key={step}>
                  <span>{i < ji + 3 ? <Check /> : i + 1}</span>
                  <small>{step}</small>
                </div>
              ))}
            </div>
            <div className="application-update">
              <Clock3 />
              <span>
                <strong>
                  {ji === 0
                    ? "Interview scheduled for tomorrow at 10:00 AM"
                    : ji === 1
                      ? "Application reviewed by the hiring team"
                      : "Profile shortlisted for the role"}
                </strong>
                <small>
                  Updated {ji + 1} day{ji ? "s" : ""} ago
                </small>
              </span>
              <Button variant="ghost">
                View details <ArrowRight />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}

export function CandidateProfileSelfPage() {
  const [saved, setSaved] = useState(false)
  return (
    <>
      <Header
        eyebrow="Your professional profile"
        title="My profile"
        text="Keep your experience current to improve job recommendations."
        action={<Button onClick={() => setSaved(true)}>Save changes</Button>}
      />
      <div className="self-profile-grid">
        <aside>
          <Card className="profile-nav">
            <Button variant="ghost" className="active">
              <UserRound /> Personal information
            </Button>
            <Button variant="ghost">
              <FileText /> Professional summary
            </Button>
            <Button variant="ghost">
              <BriefcaseBusiness /> Experience
            </Button>
            <Button variant="ghost">
              <Target /> Skills
            </Button>
            <Button variant="ghost">
              <Star /> Certifications
            </Button>
          </Card>
          <Card>
            <strong>Profile strength</strong>
            <div className="big-progress">
              <span>82%</span>
              <Progress value={82} />
            </div>
            <p>Add one project and a certification to reach “Standout”.</p>
          </Card>
        </aside>
        <Card className="profile-form">
          <div className="card-head">
            <div>
              <h2>Personal information</h2>
              <p>Visible to employers based on your privacy settings.</p>
            </div>
            <Badge tone="green">Profile visible</Badge>
          </div>
          <div className="form-grid">
            <label>
              First name
              <Input defaultValue="Priya" />
            </label>
            <label>
              Last name
              <Input defaultValue="Sharma" />
            </label>
            <label>
              Email address
              <Input defaultValue="priya.sharma@email.com" />
            </label>
            <label>
              Phone
              <Input defaultValue="+91 98765 43210" />
            </label>
            <label>
              Current location
              <Input defaultValue="Bengaluru, Karnataka" />
            </label>
            <label>
              Preferred locations
              <Input defaultValue="Bengaluru, Remote" />
            </label>
            <label className="span-2">
              Professional headline
              <Input defaultValue="Senior Product Designer · B2B SaaS · Design Systems" />
            </label>
            <label className="span-2">
              Professional summary
              <textarea
                className="textarea"
                defaultValue="Product designer with 7 years of experience crafting thoughtful B2B SaaS products. I enjoy simplifying complex workflows, building scalable design systems, and partnering closely with product and engineering teams."
              />
            </label>
          </div>
          <div className="form-actions">
            <Button variant="secondary">Discard changes</Button>
            <Button onClick={() => setSaved(true)}>Save changes</Button>
          </div>
        </Card>
      </div>
      <Modal
        open={saved}
        onClose={() => setSaved(false)}
        title="Profile updated"
      >
        <div className="application-preview">
          <CheckCircle2 />
          <div>
            <strong>Your changes are live</strong>
            <p>Recruiters with permission can now see your updated profile.</p>
          </div>
        </div>
      </Modal>
    </>
  )
}

export function GenericCandidatePage({ title }: { title: string }) {
  return <FeatureDemoPage portal="Candidate" title={title} />
}
