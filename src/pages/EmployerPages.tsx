import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Calendar,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock3,
  FileText,
  Filter,
  GripVertical,
  IndianRupee,
  ListFilter,
  Mail,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
  Star,
  Upload,
  UserCheck,
  Users,
  WandSparkles,
  X,
} from "lucide-react"
import { candidates, jobs, performance } from "../data/mockData"
import {
  Avatar,
  Badge,
  Button,
  Card,
  Input,
  Modal,
  Progress,
  Select,
} from "../components/ui"
import { FeatureDemoPage } from "./DemoPages"

function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: string
  description: string
  actions?: React.ReactNode
}) {
  return (
    <div className="page-header">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actions && <div className="header-actions">{actions}</div>}
    </div>
  )
}

const employerHomeImage =
  "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"

export function EmployerDashboard() {
  const navigate = useNavigate()
  const topMatches = candidates.slice(0, 3)
  const quickLinks: [string, string, typeof BriefcaseBusiness, string][] = [
    ["Open jobs", "24", BriefcaseBusiness, "/employer/jobs"],
    ["Candidates", "1,248", Users, "/employer/candidates"],
    ["Applications", "128", UserCheck, "/employer/pipeline"],
    ["Interviews", "32", CalendarDays, "/employer/interviews"],
  ]
  const activity = [
    "was shortlisted for",
    "completed an interview for",
    "applied to",
    "moved to assessment for",
  ]

  return (
    <div className="home-simple">
      <aside className="home-left">
        <Card className="home-profile">
          <div className="home-avatar-ring" style={{ "--p": 86 } as React.CSSProperties}>
            <span>NL</span>
          </div>
          <small className="home-ring-label">Workspace 86% set up</small>
          <h2>Nexora Labs</h2>
          <p>Neha Kapoor · Talent lead</p>
          <p className="home-muted">Bengaluru · 201–500 employees</p>
          <Button
            className="home-pill-btn"
            onClick={() => navigate("/employer/jobs/new")}
          >
            <Plus size={16} /> Post a job
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
      </aside>

      <section className="home-center">
        <button
          type="button"
          className="home-hero"
          onClick={() => navigate("/employer/pipeline")}
        >
          <h2>
            Good morning, <span>Neha</span>
          </h2>
          <p>Here is your hiring at a glance this month.</p>
          <div className="home-hero-chips">
            {[
              ["1,248", "applicants"],
              ["86", "shortlisted"],
              ["32", "interviews"],
              ["31", "hires"],
            ].map(([value, label]) => (
              <span key={label}>
                <strong>{value}</strong>
                <small>{label}</small>
              </span>
            ))}
          </div>
        </button>

        <Card className="home-feature">
          <span className="home-tag">AI picks</span>
          <div className="home-feature-copy">
            <h3>{topMatches.length} strong matches are ready for review</h3>
            <ul>
              {topMatches.map((c) => (
                <li key={c.id}>
                  <Avatar name={c.name} size="sm" />
                  {c.name} · {c.role}
                  <Badge tone="green">{c.match}%</Badge>
                </li>
              ))}
            </ul>
            <Button
              className="home-pill-btn lg"
              onClick={() => navigate("/employer/matching")}
            >
              Review matches
            </Button>
          </div>
          <img src={employerHomeImage} alt="Hiring team discussing candidates" />
        </Card>

        <Card className="home-section">
          <div className="home-section-head">
            <div>
              <h3>Hiring performance</h3>
              <p>Applicants per month, last 6 months</p>
            </div>
            <button
              type="button"
              className="home-link"
              onClick={() => navigate("/employer/analytics")}
            >
              View analytics
            </button>
          </div>
          <div className="chart-wrap home-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performance}>
                <defs>
                  <linearGradient id="applicants" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} width={36} />
                <Tooltip />
                <Area
                  dataKey="applicants"
                  stroke="var(--primary)"
                  fill="url(#applicants)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <aside className="home-right">
        <Card className="home-side-card">
          <div className="home-section-head">
            <h3>Recent activity</h3>
            <button
              type="button"
              className="home-link"
              onClick={() => navigate("/employer/candidates")}
            >
              All
            </button>
          </div>
          {candidates.slice(0, 4).map((c, i) => (
            <button
              type="button"
              className="home-activity-row"
              key={c.id}
              onClick={() => navigate(`/employer/candidates/${c.id}`)}
            >
              <Avatar name={c.name} size="sm" />
              <span>
                <strong>{c.name}</strong> {activity[i]} Senior Product Designer
                <small>{i + 1}h ago</small>
              </span>
            </button>
          ))}
        </Card>
        <Card className="home-side-card">
          <span className="eyebrow">Suggestion</span>
          <h3>3 roles have been open for 30+ days</h3>
          <p>
            Widening the location to Remote India could add about 47 qualified
            candidates.
          </p>
          <button
            type="button"
            className="home-link"
            onClick={() => navigate("/employer/jobs")}
          >
            Review roles
          </button>
        </Card>
      </aside>
    </div>
  )
}

export function JobsPage() {
  const [query, setQuery] = useState("")
  const [toast, setToast] = useState("")
  const navigate = useNavigate()
  const shown = jobs.filter((job) =>
    job.title.toLowerCase().includes(query.toLowerCase()),
  )
  return (
    <>
      <PageHeader
        eyebrow="Recruitment"
        title="Jobs"
        description="Create, publish, and track every open role."
        actions={
          <Button onClick={() => navigate("/employer/jobs/new")}>
            <Plus size={16} /> Create job
          </Button>
        }
      />
      <Card className="table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs…"
            />
          </div>
          <div>
            <Button variant="secondary">
              <Filter size={16} /> Filters
            </Button>
            <Button variant="secondary">
              All statuses <ChevronRight size={15} />
            </Button>
          </div>
        </div>
        <div className="tabs-row">
          <Button variant="ghost" className="tab-active">
            All jobs <Badge>28</Badge>
          </Button>
          <Button variant="ghost">
            Active <Badge tone="green">24</Badge>
          </Button>
          <Button variant="ghost">
            Drafts <Badge>3</Badge>
          </Button>
          <Button variant="ghost">
            Closed <Badge>48</Badge>
          </Button>
        </div>
        <div className="data-table jobs-table">
          <div className="table-row table-head-row">
            <span>Role</span>
            <span>Candidates</span>
            <span>Pipeline</span>
            <span>Status</span>
            <span>Published</span>
            <span />
          </div>
          {shown.map((job) => (
            <div
              className="table-row"
              key={job.title}
              onClick={() => setToast(`Opened ${job.title}`)}
            >
              <div className="job-title-cell">
                <span className="job-icon">
                  <BriefcaseBusiness />
                </span>
                <span>
                  <strong>{job.title}</strong>
                  <small>
                    {job.department} · {job.location}
                  </small>
                </span>
              </div>
              <span>
                <strong>{job.applicants}</strong> applicants
              </span>
              <span>{job.shortlisted} shortlisted</span>
              <span>
                <Badge tone={job.status === "Active" ? "green" : "neutral"}>
                  {job.status}
                </Badge>
              </span>
              <span>{job.age} ago</span>
              <Button variant="ghost">
                <MoreHorizontal />
              </Button>
            </div>
          ))}
        </div>
        <div className="table-footer">
          <span>Showing {shown.length} of 28 jobs</span>
          <div>
            <Button variant="secondary">
              <ChevronLeft size={15} />
            </Button>
            <Button variant="secondary">1</Button>
            <Button variant="secondary">2</Button>
            <Button variant="secondary">
              <ChevronRight size={15} />
            </Button>
          </div>
        </div>
      </Card>
      {toast && (
        <div className="toast">
          <CheckCircle2 /> {toast}
          <Button variant="ghost" onClick={() => setToast("")}>
            <X />
          </Button>
        </div>
      )}
    </>
  )
}

export function CreateJobPage() {
  const [step, setStep] = useState(1)
  const [assistant, setAssistant] = useState(false)
  const [saved, setSaved] = useState(false)
  const navigate = useNavigate()
  return (
    <>
      <div className="back-row">
        <Button variant="ghost" onClick={() => navigate("/employer/jobs")}>
          <ArrowLeft size={16} /> Back to jobs
        </Button>
        <span>Draft saved just now</span>
      </div>
      <PageHeader
        eyebrow="New requisition"
        title="Create a new job"
        description="Define the role, requirements, and hiring workflow."
        actions={
          <Button variant="secondary" onClick={() => setSaved(true)}>
            Save draft
          </Button>
        }
      />
      <div className="stepper">
        {["Job details", "Requirements", "Screening", "Workflow", "Review"].map(
          (label, i) => (
            <div className={step >= i + 1 ? "step active" : "step"} key={label}>
              <span>{step > i + 1 ? <Check size={14} /> : i + 1}</span>
              <strong>{label}</strong>
            </div>
          ),
        )}
      </div>
      <div className="form-layout">
        <Card className="job-form-card">
          <div className="section-title">
            <span>01</span>
            <div>
              <h2>Role details</h2>
              <p>Start with the basics candidates need to understand.</p>
            </div>
          </div>
          <div className="form-grid">
            <label className="span-2">
              Job title
              <Input defaultValue="Senior Product Designer" />
            </label>
            <label>
              Department
              <Select defaultValue="design">
                <option value="design">Product & Design</option>
                <option>Engineering</option>
              </Select>
            </label>
            <label>
              Employment type
              <Select>
                <option>Full-time</option>
                <option>Contract</option>
              </Select>
            </label>
            <label>
              Workplace type
              <Select>
                <option>Hybrid</option>
                <option>Remote</option>
                <option>On-site</option>
              </Select>
            </label>
            <label>
              Primary location
              <Input defaultValue="Bengaluru, Karnataka" />
            </label>
            <label>
              Minimum salary
              <Input defaultValue="₹28,00,000" />
            </label>
            <label>
              Maximum salary
              <Input defaultValue="₹36,00,000" />
            </label>
            <label className="span-2">
              Job description
              <div className="editor-toolbar">
                <Button variant="ghost">
                  <b>B</b>
                </Button>
                <Button variant="ghost">
                  <i>I</i>
                </Button>
                <Button variant="ghost">
                  <ListFilter />
                </Button>
                <Button variant="ghost" onClick={() => setAssistant(true)}>
                  <WandSparkles /> Improve with AI
                </Button>
              </div>
              <textarea
                className="textarea"
                defaultValue={
                  "As a Senior Product Designer, you will shape end-to-end experiences for our enterprise platform. You will partner closely with product and engineering to turn complex hiring workflows into clear, intuitive products.\\n\\nWhat you’ll do\\n• Lead discovery and design for high-impact product areas\\n• Evolve our design system and raise product quality\\n• Mentor designers and champion customer insight"
                }
              />
            </label>
          </div>
          <div className="form-actions">
            <Button
              variant="secondary"
              onClick={() => navigate("/employer/jobs")}
            >
              Cancel
            </Button>
            <Button onClick={() => setStep(Math.min(step + 1, 5))}>
              Continue to requirements <ArrowRight size={16} />
            </Button>
          </div>
        </Card>
        <aside className="form-aside">
          <Card className="quality-card">
            <div className="quality-score">
              <span>86</span>
              <div>
                <strong>Strong job brief</strong>
                <small>Quality score</small>
              </div>
            </div>
            <Progress value={86} tone="green" />
            <ul>
              <li>
                <Check /> Clear role outcomes
              </li>
              <li>
                <Check /> Inclusive language
              </li>
              <li>
                <CircleAlert /> Add success measures
              </li>
            </ul>
          </Card>
          <Card>
            <h3>Hiring team</h3>
            <div className="mini-person">
              <Avatar name="Neha Kapoor" size="sm" />
              <span>
                <strong>Neha Kapoor</strong>
                <small>Recruiter</small>
              </span>
            </div>
            <Button variant="ghost">
              <Plus size={15} /> Add hiring manager
            </Button>
          </Card>
        </aside>
      </div>
      <Modal
        open={assistant}
        onClose={() => setAssistant(false)}
        title="AI job description assistant"
        footer={
          <>
            <Button variant="secondary" onClick={() => setAssistant(false)}>
              Keep original
            </Button>
            <Button onClick={() => setAssistant(false)}>
              <Sparkles size={15} /> Apply suggestions
            </Button>
          </>
        }
      >
        <div className="ai-callout">
          <Sparkles />
          <div>
            <strong>3 suggestions ready</strong>
            <p>
              These suggestions improve clarity and inclusivity. You remain in
              control of every change.
            </p>
          </div>
        </div>
        <div className="suggestion-list">
          <div>
            <Badge tone="purple">Clarity</Badge>
            <p>Add measurable 90-day outcomes for the role.</p>
          </div>
          <div>
            <Badge tone="blue">Inclusivity</Badge>
            <p>
              Replace “rockstar” language with specific collaboration
              expectations.
            </p>
          </div>
          <div>
            <Badge tone="green">Market insight</Badge>
            <p>The salary range is competitive for Bengaluru at this level.</p>
          </div>
        </div>
      </Modal>
      <Modal open={saved} onClose={() => setSaved(false)} title="Draft saved">
        <p>
          Your job draft is safe. You can return and continue editing anytime.
        </p>
      </Modal>
    </>
  )
}

export function CandidatesPage() {
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState(false)
  const navigate = useNavigate()
  const shown = candidates.filter((c) =>
    `${c.name} ${c.role} ${c.skills.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  )
  return (
    <>
      <PageHeader
        eyebrow="Talent CRM"
        title="Candidates"
        description="Search, review, and nurture your entire talent network."
        actions={
          <>
            <Button variant="secondary">
              <Upload size={16} /> Bulk upload
            </Button>
            <Button>
              <Plus size={16} /> Add candidate
            </Button>
          </>
        }
      />
      <Card className="table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, title, skill…"
            />
          </div>
          <div>
            <Button
              variant={filters ? "primary" : "secondary"}
              onClick={() => setFilters(!filters)}
            >
              <SlidersHorizontal size={16} /> Advanced filters
            </Button>
            <Button variant="secondary">Sort: Best match</Button>
          </div>
        </div>
        {filters && (
          <div className="filter-strip">
            <Select>
              <option>All locations</option>
              <option>Bengaluru</option>
              <option>Mumbai</option>
            </Select>
            <Select>
              <option>Any experience</option>
              <option>5–8 years</option>
            </Select>
            <Select>
              <option>All stages</option>
              <option>Shortlisted</option>
            </Select>
            <Button variant="ghost">Clear all</Button>
          </div>
        )}
        <div className="candidate-table">
          {shown.map((c) => (
            <div
              className="candidate-row"
              key={c.id}
              onClick={() => navigate(`/employer/candidates/${c.id}`)}
            >
              <Input
                aria-label={`Select ${c.name}`}
                type="checkbox"
                onClick={(e) => e.stopPropagation()}
              />
              <Avatar name={c.name} />
              <div className="candidate-main">
                <strong>{c.name}</strong>
                <span>{c.role}</span>
                <small>
                  <MapPin /> {c.city} · {c.exp}
                </small>
              </div>
              <div className="skill-cell">
                {c.skills.slice(0, 2).map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
                <Badge>+{c.skills.length - 2}</Badge>
              </div>
              <div>
                <span className="match-score">{c.match}%</span>
                <small>role match</small>
              </div>
              <Badge
                tone={
                  c.stage === "Interview"
                    ? "purple"
                    : c.stage === "Shortlisted"
                      ? "green"
                      : "blue"
                }
              >
                {c.stage}
              </Badge>
              <Button variant="ghost">
                <MoreHorizontal />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}

export function CandidateProfilePage() {
  const { id } = useParams()
  const c = candidates.find((item) => item.id === id) || candidates[0]
  const navigate = useNavigate()
  return (
    <>
      <div className="back-row">
        <Button
          variant="ghost"
          onClick={() => navigate("/employer/candidates")}
        >
          <ArrowLeft /> Back to candidates
        </Button>
        <span>Profile updated 2 hours ago</span>
      </div>
      <Card className="profile-hero">
        <Avatar name={c.name} size="lg" />
        <div className="profile-info">
          <div>
            <h1>{c.name}</h1>
            <Badge tone="green">Open to opportunities</Badge>
          </div>
          <p>
            {c.role} · {c.exp}
          </p>
          <span>
            <MapPin /> {c.city}
            <Mail /> priya.sharma@email.com
          </span>
        </div>
        <div className="profile-actions">
          <Button variant="secondary">
            <MessageCircle /> Message
          </Button>
          <Button>
            <UserCheck /> Shortlist
          </Button>
          <Button variant="ghost">
            <MoreHorizontal />
          </Button>
        </div>
      </Card>
      <div className="profile-grid">
        <div className="profile-content">
          <Card>
            <div className="card-head">
              <h2>Professional overview</h2>
              <Button variant="ghost">Edit</Button>
            </div>
            <p>
              Product designer with 7 years of experience crafting B2B SaaS
              products. Strong track record simplifying complex enterprise
              workflows and scaling design systems across product teams.
            </p>
            <h3>Core skills</h3>
            <div className="skill-cloud">
              {[
                ...c.skills,
                "Product Strategy",
                "Prototyping",
                "Facilitation",
                "B2B SaaS",
              ].map((s) => (
                <Badge key={s} tone="blue">
                  {s}
                </Badge>
              ))}
            </div>
          </Card>
          <Card>
            <h2>Experience</h2>
            <div className="timeline">
              <div>
                <i />
                <span>
                  <strong>Lead Product Designer</strong>
                  <b>Razorpay · Bengaluru</b>
                  <small>Apr 2022 – Present · 3 yrs 2 mos</small>
                  <p>
                    Led design for merchant onboarding, improving activation by
                    24%. Built and governed a multi-product design system.
                  </p>
                </span>
              </div>
              <div>
                <i />
                <span>
                  <strong>Senior UX Designer</strong>
                  <b>Freshworks · Chennai</b>
                  <small>Jul 2019 – Mar 2022 · 2 yrs 9 mos</small>
                </span>
              </div>
            </div>
          </Card>
          <Card>
            <h2>Activity timeline</h2>
            <div className="plain-timeline">
              <p>
                <CheckCircle2 /> Shortlisted for Senior Product Designer{" "}
                <small>Today, 10:42 AM</small>
              </p>
              <p>
                <FileText /> Resume information extracted{" "}
                <small>Yesterday, 4:18 PM</small>
              </p>
              <p>
                <MessageCircle /> Replied to outreach message{" "}
                <small>10 June, 2:20 PM</small>
              </p>
            </div>
          </Card>
        </div>
        <aside className="profile-side">
          <Card className="match-summary">
            <span className="eyebrow">AI-assisted match</span>
            <div className="big-score">
              {c.match}
              <small>%</small>
            </div>
            <strong>Strong potential fit</strong>
            <p>
              Based on role requirements and profile evidence. Review context
              before deciding.
            </p>
            <Button
              variant="secondary"
              onClick={() => navigate("/employer/matching")}
            >
              View match explanation
            </Button>
          </Card>
          <Card>
            <h3>Candidate details</h3>
            <dl>
              <div>
                <dt>Notice period</dt>
                <dd>{c.notice}</dd>
              </div>
              <div>
                <dt>Current CTC</dt>
                <dd>₹24L</dd>
              </div>
              <div>
                <dt>Expected CTC</dt>
                <dd>₹32L</dd>
              </div>
              <div>
                <dt>Source</dt>
                <dd>{c.source}</dd>
              </div>
            </dl>
          </Card>
          <Card className="resume-card">
            <div>
              <FileText />
              <span>
                <strong>Priya_Sharma_Resume.pdf</strong>
                <small>PDF · 1.8 MB</small>
              </span>
            </div>
            <Button variant="secondary">Preview resume</Button>
          </Card>
        </aside>
      </div>
    </>
  )
}

export function MatchingPage() {
  const [selected, setSelected] = useState(candidates[0])
  return (
    <>
      <PageHeader
        eyebrow="Talent intelligence"
        title="AI candidate matching"
        description="Review explainable recommendations for Senior Product Designer."
        actions={
          <Button variant="secondary">
            <SlidersHorizontal /> Matching preferences
          </Button>
        }
      />
      <div className="responsible-note">
        <Sparkles />
        <div>
          <strong>AI assists, your team decides</strong>
          <p>
            Recommendations surface relevant evidence and should not replace
            structured human review.
          </p>
        </div>
        <Button variant="ghost">Learn about responsible AI</Button>
      </div>
      <div className="matching-layout">
        <Card className="recommendations">
          <div className="card-head">
            <div>
              <h2>Recommended candidates</h2>
              <p>38 profiles evaluated · Updated 12 min ago</p>
            </div>
            <Select>
              <option>Best match</option>
              <option>Recently active</option>
            </Select>
          </div>
          {candidates.map((c, i) => (
            <button
              className={`recommendation-item ${
                selected.id === c.id ? "selected" : ""
              }`}
              onClick={() => setSelected(c)}
              key={c.id}
            >
              <span className="rank">#{i + 1}</span>
              <Avatar name={c.name} />
              <span>
                <strong>{c.name}</strong>
                <small>
                  {c.role} · {c.city}
                </small>
                <span>
                  {c.skills.slice(0, 2).map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </span>
              </span>
              <b>{c.match}%</b>
              <ChevronRight />
            </button>
          ))}
        </Card>
        <Card className="match-detail">
          <div className="match-person">
            <Avatar name={selected.name} size="lg" />
            <div>
              <span className="eyebrow">Recommendation details</span>
              <h2>{selected.name}</h2>
              <p>
                {selected.role} · {selected.exp} · {selected.city}
              </p>
            </div>
            <div className="score-ring">
              <strong>{selected.match}%</strong>
              <small>overall match</small>
            </div>
          </div>
          <div className="compat-grid">
            {[
              ["Skills", 96, "green"],
              ["Experience", 90, "blue"],
              ["Education", 82, "purple"],
              ["Location", 100, "green"],
            ].map(([l, v, t]) => (
              <div key={String(l)}>
                <span>
                  <strong>{l}</strong>
                  <b>{v}%</b>
                </span>
                <Progress
                  value={Number(v)}
                  tone={t as "green" | "blue" | "purple"}
                />
              </div>
            ))}
          </div>
          <div className="explanation">
            <h3>Why this candidate stands out</h3>
            <p>
              Priya has led end-to-end design for complex B2B SaaS products and
              has direct evidence of scaling a design system—both high-priority
              outcomes for this role.
            </p>
            <div className="evidence-grid">
              <div>
                <Badge tone="green">
                  <Check /> Strong evidence
                </Badge>
                <strong>Enterprise design systems</strong>
                <p>
                  “Built and governed a multi-product design system used by 12
                  squads.”
                </p>
                <small>Razorpay · Work experience</small>
              </div>
              <div>
                <Badge tone="green">
                  <Check /> Strong evidence
                </Badge>
                <strong>Product strategy</strong>
                <p>
                  Led discovery and design for merchant onboarding, improving
                  activation by 24%.
                </p>
                <small>Razorpay · Work experience</small>
              </div>
              <div>
                <Badge tone="amber">
                  <CircleAlert /> Partial evidence
                </Badge>
                <strong>People leadership</strong>
                <p>
                  Mentoring experience found; direct team management is not
                  explicit.
                </p>
                <small>Resume · Professional summary</small>
              </div>
              <div>
                <Badge tone="red">
                  <X /> Missing skill
                </Badge>
                <strong>Fintech compliance</strong>
                <p>
                  No explicit evidence of regulatory or compliance design work.
                </p>
                <small>Needs human verification</small>
              </div>
            </div>
          </div>
          <div className="review-actions">
            <Button variant="secondary">Not a fit</Button>
            <Button variant="secondary">Save for later</Button>
            <Button>
              <UserCheck /> Move to shortlist
            </Button>
          </div>
        </Card>
      </div>
    </>
  )
}

export interface PipelineCandidateItem {
  id: string
  name: string
  role: string
  city: string
  exp: string
  match: number
  skills: string[]
  notice: string
  stage: string
  daysInStage: number
  slaRisk?: boolean
  scorecardAvg?: string
}

const initial14StageColumns: { name: string; stageId: string; tone: "blue" | "purple" | "green" | "amber" | "neutral" | "red"; items: PipelineCandidateItem[] }[] = [
  {
    name: "1. Applied",
    stageId: "applied",
    tone: "blue",
    items: [
      { id: "c-101", name: "Vikram Malhotra", role: "Senior Product Designer", city: "Bengaluru", exp: "6 yrs", match: 91, skills: ["Figma", "Design Systems"], notice: "30 days", stage: "Applied", daysInStage: 1 },
      { id: "c-102", name: "Ananya Sen", role: "UX Designer", city: "Kolkata", exp: "5 yrs", match: 86, skills: ["Research", "Prototyping"], notice: "15 days", stage: "Applied", daysInStage: 2 },
    ],
  },
  {
    name: "2. AI Screening",
    stageId: "ai_screening",
    tone: "purple",
    items: [
      { id: "c-103", name: "Rahul Verma", role: "Senior Product Designer", city: "Mumbai", exp: "7 yrs", match: 93, skills: ["Fintech UX", "Figma"], notice: "Immediate", stage: "AI Screening", daysInStage: 1 },
    ],
  },
  {
    name: "3. Recruiter Screening",
    stageId: "recruiter_screening",
    tone: "blue",
    items: [
      { id: "sneha", name: "Sneha Iyer", role: "UX Designer", city: "Chennai", exp: "6 years", match: 86, skills: ["Research", "Interaction"], notice: "45 days", stage: "Recruiter Screening", daysInStage: 3 },
    ],
  },
  {
    name: "4. Shortlisted",
    stageId: "shortlisted",
    tone: "purple",
    items: [
      { id: "priya", name: "Priya Sharma", role: "Senior Product Designer", city: "Bengaluru", exp: "7 years", match: 96, skills: ["Figma", "Design Systems"], notice: "30 days", stage: "Shortlisted", daysInStage: 2 },
    ],
  },
  {
    name: "5. Assessment",
    stageId: "assessment",
    tone: "amber",
    items: [
      { id: "rohan", name: "Rohan Kapoor", role: "Design Lead", city: "Gurugram", exp: "9 years", match: 88, skills: ["Leadership", "SaaS"], notice: "60 days", stage: "Assessment", daysInStage: 5, slaRisk: true },
    ],
  },
  {
    name: "6. Interview Scheduled",
    stageId: "interview_scheduled",
    tone: "blue",
    items: [
      { id: "arjun", name: "Arjun Mehta", role: "Product Designer", city: "Mumbai", exp: "5 years", match: 89, skills: ["Figma", "UX Strategy"], notice: "Immediate", stage: "Interview Scheduled", daysInStage: 1 },
    ],
  },
  {
    name: "7. Interview Completed",
    stageId: "interview_completed",
    tone: "purple",
    items: [
      { id: "c-107", name: "Siddharth Rao", role: "Staff Product Designer", city: "Bengaluru", exp: "8 yrs", match: 94, skills: ["Design Tokens", "React"], notice: "30 days", stage: "Interview Completed", daysInStage: 2, scorecardAvg: "4.8 / 5.0" },
    ],
  },
  {
    name: "8. Selected",
    stageId: "selected",
    tone: "green",
    items: [
      { id: "c-108", name: "Meera Krishnan", role: "Senior UX Architect", city: "Bengaluru", exp: "7 yrs", match: 95, skills: ["Information Architecture"], notice: "15 days", stage: "Selected", daysInStage: 1 },
    ],
  },
  {
    name: "9. Offer Released",
    stageId: "offer_released",
    tone: "green",
    items: [
      { id: "c-109", name: "Tanvi Desai", role: "Senior Product Designer", city: "Pune", exp: "6 yrs", match: 92, skills: ["Micro-interactions"], notice: "30 days", stage: "Offer Released", daysInStage: 3 },
    ],
  },
  {
    name: "10. Offer Accepted",
    stageId: "offer_accepted",
    tone: "green",
    items: [
      { id: "c-110", name: "Aditya Joshi", role: "Lead Product Designer", city: "Bengaluru", exp: "8 yrs", match: 96, skills: ["Systems Design"], notice: "Joining Nov 18", stage: "Offer Accepted", daysInStage: 2 },
    ],
  },
  {
    name: "11. Joined",
    stageId: "joined",
    tone: "green",
    items: [
      { id: "c-111", name: "Neha Agarwal", role: "Product Designer II", city: "Bengaluru", exp: "4 yrs", match: 90, skills: ["Figma", "Prototyping"], notice: "Joined Oct 28", stage: "Joined", daysInStage: 10 },
    ],
  },
  {
    name: "12. Rejected",
    stageId: "rejected",
    tone: "red",
    items: [
      { id: "c-112", name: "Kunal Shah", role: "UI Designer", city: "Ahmedabad", exp: "3 yrs", match: 72, skills: ["Visuals"], notice: "30 days", stage: "Rejected", daysInStage: 4 },
    ],
  },
  {
    name: "13. Withdrawn",
    stageId: "withdrawn",
    tone: "neutral",
    items: [
      { id: "c-113", name: "Ritu Singhal", role: "Senior Designer", city: "Delhi", exp: "6 yrs", match: 84, skills: ["Figma"], notice: "Withdrew for startup offer", stage: "Withdrawn", daysInStage: 6 },
    ],
  },
  {
    name: "14. On Hold",
    stageId: "on_hold",
    tone: "neutral",
    items: [
      { id: "kavya", name: "Kavya Nair", role: "Product Designer II", city: "Hyderabad", exp: "4 years", match: 79, skills: ["Visual Design"], notice: "30 days", stage: "On Hold", daysInStage: 8 },
    ],
  },
]

export function PipelinePage() {
  const [columns, setColumns] = useState(initial14StageColumns)
  const [drawer, setDrawer] = useState<PipelineCandidateItem | null>(null)
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban")
  const [selectedJob, setSelectedJob] = useState("Senior Product Designer")
  const [searchQuery, setSearchQuery] = useState("")

  const move = (candidate: PipelineCandidateItem, from: number, to: number) => {
    if (from === to) return
    setColumns((cols) =>
      cols.map((col, i) =>
        i === from
          ? { ...col, items: col.items.filter((x) => x.id !== candidate.id) }
          : i === to
            ? { ...col, items: [...col.items, { ...candidate, stage: col.name }] }
            : col,
      ),
    )
  }

  const advanceCandidate = (candidate: PipelineCandidateItem, currentColumnIndex: number) => {
    if (currentColumnIndex < columns.length - 1) {
      move(candidate, currentColumnIndex, currentColumnIndex + 1)
    }
  }

  const allCandidatesCount = columns.reduce((acc, col) => acc + col.items.length, 0)

  return (
    <>
      <PageHeader
        eyebrow="Configurable Recruitment Operations"
        title="14-Stage Applicant Tracking Pipeline"
        description="End-to-end stage progression from Applied to Joined with automated SLA monitoring."
        actions={
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
              <button
                type="button"
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition cursor-pointer ${
                  viewMode === "kanban" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                }`}
                onClick={() => setViewMode("kanban")}
              >
                Kanban View
              </button>
              <button
                type="button"
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition cursor-pointer ${
                  viewMode === "table" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                }`}
                onClick={() => setViewMode("table")}
              >
                Table List View
              </button>
            </div>
            <Button>
              <Plus size={15} /> Add Candidate
            </Button>
          </div>
        }
      />

      {/* Requisition Selector & Pipeline Health */}
      <div className="pipeline-top flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Select
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            className="h-9 text-xs font-bold w-64 bg-white"
          >
            <option>Senior Product Designer (Bengaluru · 128 Apps)</option>
            <option>Staff Backend Engineer (Indiranagar · 94 Apps)</option>
            <option>Enterprise Account Executive (Mumbai · 67 Apps)</option>
          </Select>
          <span className="text-xs text-gray-500 font-medium">
            Total in Requisition: <strong>{allCandidatesCount} Active Candidates</strong>
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span>
            <span className="color-dot green" /> Pipeline Velocity: <strong>14.2 days avg</strong>
          </span>
          <span className="text-amber-700 font-medium">
            ⚠️ 1 Candidate at SLA Risk (&gt;5 days in stage)
          </span>
        </div>
      </div>

      {/* 14-Stage Stage Progress Funnel Bar */}
      <div className="bg-white p-3 border border-gray-200 rounded-xl mb-4 overflow-x-auto">
        <div className="flex items-center gap-1 min-w-[900px] text-[11px]">
          {columns.slice(0, 11).map((col, idx) => (
            <div key={col.stageId} className="flex-1 flex flex-col items-center">
              <div className="w-full h-1.5 bg-blue-100 rounded-full overflow-hidden mb-1">
                <div
                  className="h-full bg-blue-600"
                  style={{ width: `${Math.min(100, (col.items.length / 3) * 100)}%` }}
                />
              </div>
              <span className="text-gray-500 truncate max-w-[80px] font-medium">{col.name.split(". ")[1]}</span>
              <strong className="text-gray-900 text-xs">{col.items.length}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* VIEW 1: KANBAN BOARD (14 COLUMNS HORIZONTAL SCROLL) */}
      {viewMode === "kanban" && (
        <div className="kanban">
          {columns.map((col, ci) => (
            <section
              className="kanban-column"
              key={col.name}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const data = e.dataTransfer.getData("text/plain")
                if (!data) return
                const [id, from] = data.split("|")
                const fromCol = columns[Number(from)]
                const cand = fromCol?.items.find((x) => x.id === id)
                if (cand) move(cand, Number(from), ci)
              }}
            >
              <div className="kanban-head">
                <span>
                  <i className={`stage-dot s${ci % 8}`} />
                  <strong className="text-xs">{col.name}</strong>
                  <b>{col.items.length}</b>
                </span>
                <Button variant="ghost">
                  <MoreHorizontal size={14} />
                </Button>
              </div>

              <div className="kanban-stack">
                {col.items.map((c) => (
                  <article
                    className={`kanban-card ${c.slaRisk ? "border-amber-300 bg-amber-50/20" : ""}`}
                    draggable
                    onDragStart={(e) =>
                      e.dataTransfer.setData("text/plain", `${c.id}|${ci}`)
                    }
                    onClick={() => setDrawer(c)}
                    key={c.id}
                  >
                    <div className="drag-row">
                      <GripVertical size={14} />
                      <Badge tone={c.match > 90 ? "green" : "blue"}>
                        {c.match}% match
                      </Badge>
                      {c.slaRisk && (
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                          SLA Alert
                        </span>
                      )}
                    </div>
                    <div className="candidate-mini">
                      <Avatar name={c.name} />
                      <span>
                        <strong>{c.name}</strong>
                        <small>{c.role}</small>
                      </span>
                    </div>
                    <div className="card-tags">
                      {c.skills.slice(0, 2).map((s) => (
                        <Badge key={s}>{s}</Badge>
                      ))}
                    </div>
                    <div className="kanban-foot">
                      <span>
                        <Clock3 size={12} /> {c.notice}
                      </span>
                      <span>
                        {c.daysInStage}d in stage
                      </span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
                      <button
                        type="button"
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          advanceCandidate(c, ci)
                        }}
                      >
                        Advance →
                      </button>
                      <button
                        type="button"
                        className="text-[11px] text-gray-400 hover:text-gray-700 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          setDrawer(c)
                        }}
                      >
                        View profile
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* VIEW 2: TABLE LIST VIEW */}
      {viewMode === "table" && (
        <Card className="p-0 overflow-hidden">
          <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
            <Input
              placeholder="Search candidate by name, skill or stage..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md h-8 text-xs"
            />
            <span className="text-xs text-gray-500 font-medium">
              Showing {allCandidatesCount} candidates across 14 recruitment stages
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-800 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-2.5 px-3">Candidate</th>
                  <th className="py-2.5 px-3">Current Stage</th>
                  <th className="py-2.5 px-3">Match</th>
                  <th className="py-2.5 px-3">Location</th>
                  <th className="py-2.5 px-3">Experience</th>
                  <th className="py-2.5 px-3">Notice</th>
                  <th className="py-2.5 px-3">Time in Stage</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {columns.flatMap((col, ci) =>
                  col.items.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-gray-50/70 transition cursor-pointer"
                      onClick={() => setDrawer(c)}
                    >
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <Avatar name={c.name} size="sm" />
                          <div>
                            <strong className="text-gray-900 block">{c.name}</strong>
                            <span className="text-gray-400 text-[11px]">{c.role}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <Badge tone={col.tone}>{col.name}</Badge>
                      </td>
                      <td className="py-3 px-3 font-bold text-purple-700">{c.match}%</td>
                      <td className="py-3 px-3">{c.city}</td>
                      <td className="py-3 px-3">{c.exp}</td>
                      <td className="py-3 px-3">{c.notice}</td>
                      <td className="py-3 px-3 font-medium">
                        <span className={c.slaRisk ? "text-amber-700 font-bold" : "text-gray-600"}>
                          {c.daysInStage} days {c.slaRisk && "⚠️ SLA"}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Button
                          variant="secondary"
                          className="h-7 text-xs px-2.5"
                          onClick={(e) => {
                            e.stopPropagation()
                            advanceCandidate(c, ci)
                          }}
                        >
                          Advance Next Stage
                        </Button>
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* DRAWER / DETAILS MODAL */}
      {drawer && (
        <div className="drawer-backdrop" onClick={() => setDrawer(null)}>
          <aside className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <h2>Candidate Application Profile</h2>
              <Button variant="ghost" onClick={() => setDrawer(null)}>
                <X />
              </Button>
            </div>
            <div className="drawer-profile">
              <Avatar name={drawer.name} size="lg" />
              <h2>{drawer.name}</h2>
              <p>
                {drawer.role} · {drawer.city}
              </p>
              <Badge tone="green">{drawer.match}% AI match</Badge>
            </div>
            <div className="drawer-section">
              <h3>Application Snapshot</h3>
              <dl>
                <div>
                  <dt>Experience</dt>
                  <dd>{drawer.exp}</dd>
                </div>
                <div>
                  <dt>Notice period</dt>
                  <dd>{drawer.notice}</dd>
                </div>
                <div>
                  <dt>Current Stage</dt>
                  <dd>
                    <Badge tone="purple">{drawer.stage}</Badge>
                  </dd>
                </div>
                <div>
                  <dt>Time in Stage</dt>
                  <dd>{drawer.daysInStage} days</dd>
                </div>
              </dl>
            </div>
            <div className="drawer-section">
              <h3>Internal Hiring Note</h3>
              <textarea
                className="textarea"
                placeholder="Add private evaluation notes for recruiter squad…"
              />
              <Button onClick={() => setDrawer(null)}>Save evaluation note</Button>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}


const chats = [
  ["Priya Sharma", "Thanks, Neha. Tuesday at 11 works for me.", "2m", "PS"],
  ["Arjun Mehta", "I’ve completed the assessment.", "1h", "AM"],
  ["Sneha Iyer", "Could we move the call to Thursday?", "3h", "SI"],
  ["Rohan Kapoor", "Looking forward to speaking with the team.", "1d", "RK"],
]
export function CommunicationPage() {
  const [active, setActive] = useState(0)
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState<string[]>([])
  return (
    <>
      <PageHeader
        eyebrow="Candidate engagement"
        title="Communication center"
        description="Manage consented WhatsApp and email conversations in one place."
      />
      <Card className="chat-shell">
        <aside className="chat-list">
          <div className="chat-search">
            <Search />
            <Input placeholder="Search conversations…" />
          </div>
          <div className="chat-tabs">
            <Button variant="ghost" className="tab-active">
              All
            </Button>
            <Button variant="ghost">Unread</Button>
            <Button variant="ghost">Automated</Button>
          </div>
          {chats.map((c, i) => (
            <button
              className={`chat-item ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
              key={c[0]}
            >
              <Avatar name={c[0]} />
              <span>
                <strong>
                  {c[0]}
                  <small>{c[2]}</small>
                </strong>
                <b>Senior Product Designer</b>
                <p>{c[1]}</p>
              </span>
              {i === 0 && <i />}
            </button>
          ))}
        </aside>
        <section className="conversation">
          <header>
            <Avatar name={chats[active][0]} />
            <div>
              <strong>{chats[active][0]}</strong>
              <span>
                <span className="color-dot green" /> Online ·{" "}
                <Badge tone="green">WhatsApp consented</Badge>
              </span>
            </div>
            <div>
              <Button variant="secondary">
                <UserCheck /> View candidate
              </Button>
              <Button variant="ghost">
                <MoreHorizontal />
              </Button>
            </div>
          </header>
          <div className="messages">
            <span className="date-pill">Today</span>
            <div className="message outbound">
              <p>
                Hi {chats[active][0].split(" ")[0]}, your profile looks relevant
                for our Senior Product Designer role at Nexora Labs. Would you
                be open to a short conversation?
              </p>
              <small>10:24 AM · Delivered</small>
            </div>
            <div className="message inbound">
              <p>
                Hi Neha, thank you for reaching out. Yes, I’d be happy to learn
                more about the role.
              </p>
              <small>10:31 AM</small>
            </div>
            <div className="message outbound">
              <p>
                Great. I have Tuesday at 11:00 AM or Wednesday at 3:30 PM
                available. Which works better?
              </p>
              <small>10:34 AM · Read</small>
            </div>
            <div className="message inbound">
              <p>{chats[active][1]}</p>
              <small>10:36 AM</small>
            </div>
            {sent.map((m, i) => (
              <div className="message outbound" key={i}>
                <p>{m}</p>
                <small>Just now · Sent</small>
              </div>
            ))}
          </div>
          <footer>
            <div>
              <Button variant="ghost">
                <Plus />
              </Button>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && message) {
                    setSent([...sent, message])
                    setMessage("")
                  }
                }}
                placeholder="Write a message…"
              />
              <Button
                onClick={() => {
                  if (message) {
                    setSent([...sent, message])
                    setMessage("")
                  }
                }}
              >
                <Send />
              </Button>
            </div>
            <small>
              Messages are sent only through consented channels.{" "}
              <Button variant="ghost">Use template</Button>
            </small>
          </footer>
        </section>
        <aside className="chat-context">
          <h3>Conversation details</h3>
          <div className="channel-card">
            <MessageCircle />
            <span>
              <strong>WhatsApp</strong>
              <small>Preferred channel</small>
            </span>
            <Badge tone="green">Consented</Badge>
          </div>
          <h3>Automation</h3>
          <div className="automation-card">
            <span>
              <Sparkles /> Interview scheduling
            </span>
            <p>Human takeover is active. Automated replies are paused.</p>
            <Button variant="secondary">Resume automation</Button>
          </div>
          <h3>Candidate context</h3>
          <dl>
            <div>
              <dt>Role</dt>
              <dd>Senior Product Designer</dd>
            </div>
            <div>
              <dt>Stage</dt>
              <dd>Shortlisted</dd>
            </div>
            <div>
              <dt>Owner</dt>
              <dd>Neha Kapoor</dd>
            </div>
          </dl>
        </aside>
      </Card>
    </>
  )
}

const days = Array.from({ length: 30 }, (_, i) => i + 1)
export function InterviewsPage() {
  const [month, setMonth] = useState(0)
  const [schedule, setSchedule] = useState(false)
  return (
    <>
      <PageHeader
        eyebrow="Interview operations"
        title="Interview calendar"
        description="Coordinate interviews, panels, and feedback."
        actions={
          <Button onClick={() => setSchedule(true)}>
            <Plus /> Schedule interview
          </Button>
        }
      />
      <div className="calendar-layout">
        <Card className="calendar-card">
          <div className="calendar-toolbar">
            <div>
              <Button variant="secondary" onClick={() => setMonth(month - 1)}>
                <ChevronLeft />
              </Button>
              <h2>
                {month === 0
                  ? "June 2025"
                  : month > 0
                    ? "July 2025"
                    : "May 2025"}
              </h2>
              <Button variant="secondary" onClick={() => setMonth(month + 1)}>
                <ChevronRight />
              </Button>
              <Button variant="ghost" onClick={() => setMonth(0)}>
                Today
              </Button>
            </div>
            <div>
              <Button variant="ghost" className="tab-active">
                Month
              </Button>
              <Button variant="ghost">Week</Button>
              <Button variant="ghost">Day</Button>
            </div>
          </div>
          <div className="calendar-grid">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <strong className="day-name" key={d}>
                {d}
              </strong>
            ))}
            {days.map((day) => (
              <div
                className={`calendar-day ${day === 12 ? "today" : ""}`}
                key={day}
              >
                <span>{day}</span>
                {day === 12 && (
                  <>
                    <button className="event blue">10:00 · Priya Sharma</button>
                    <button className="event purple">
                      14:30 · Arjun Mehta
                    </button>
                  </>
                )}
                {day === 16 && (
                  <button className="event green">11:00 · Sneha Iyer</button>
                )}
                {day === 19 && (
                  <button className="event amber">
                    15:00 · Panel interview
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>
        <aside className="interview-aside">
          <Card>
            <div className="card-head">
              <div>
                <h2>Today</h2>
                <p>Thursday, 12 June</p>
              </div>
              <Badge tone="blue">2 interviews</Badge>
            </div>
            <div className="agenda-item">
              <span>10:00</span>
              <i />
              <div>
                <strong>Priya Sharma</strong>
                <p>Portfolio review · 60 min</p>
                <small>
                  <Avatar name="Neha Kapoor" size="sm" /> Neha + 2 interviewers
                </small>
              </div>
            </div>
            <div className="agenda-item">
              <span>14:30</span>
              <i className="purple" />
              <div>
                <strong>Arjun Mehta</strong>
                <p>Hiring manager round · 45 min</p>
                <small>
                  <Avatar name="Vikram S" size="sm" /> Vikram Singh
                </small>
              </div>
            </div>
          </Card>
          <Card className="feedback-card">
            <CircleAlert />
            <div>
              <strong>3 feedback forms overdue</strong>
              <p>Pending scorecards can slow hiring decisions.</p>
              <Button variant="ghost">
                Review scorecards <ArrowRight />
              </Button>
            </div>
          </Card>
        </aside>
      </div>
      <Modal
        open={schedule}
        onClose={() => setSchedule(false)}
        title="Schedule interview"
        footer={
          <>
            <Button variant="secondary" onClick={() => setSchedule(false)}>
              Cancel
            </Button>
            <Button onClick={() => setSchedule(false)}>Send invitation</Button>
          </>
        }
      >
        <div className="form-grid">
          <label>
            Candidate
            <Select>
              <option>Priya Sharma</option>
              <option>Arjun Mehta</option>
            </Select>
          </label>
          <label>
            Interview type
            <Select>
              <option>Portfolio review</option>
              <option>Hiring manager round</option>
            </Select>
          </label>
          <label>
            Date
            <Input type="date" defaultValue="2025-06-16" />
          </label>
          <label>
            Time
            <Input type="time" defaultValue="11:00" />
          </label>
          <label className="span-2">
            Interviewers
            <Input defaultValue="Neha Kapoor, Vikram Singh" />
          </label>
        </div>
      </Modal>
    </>
  )
}

export function GenericEmployerPage({ title }: { title: string }) {
  return <FeatureDemoPage portal="Employer" title={title} />
}
