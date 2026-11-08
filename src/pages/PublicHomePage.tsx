import { useState } from "react"
import { useNavigate } from "react-router"
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Compass,
  FileCheck2,
  Filter,
  Flame,
  Globe,
  IndianRupee,
  Layers,
  Lock,
  LogIn,
  MapPin,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  TrendingUp,
  UserCheck,
  Users,
  X,
  Zap,
} from "lucide-react"
import { Badge, Button, Card, Input, Modal, Select } from "../components/ui"
import { jobs as initialJobs } from "../data/mockData"

export interface PublicJobItem {
  id: string
  title: string
  company: string
  initials: string
  location: string
  locality: string
  salary: string
  exp: string
  department: string
  skills: string[]
  match: number
  postedDays: string
  verified: boolean
  featured?: boolean
}

export const publicJobsList: PublicJobItem[] = [
  {
    id: "pj-1",
    title: "Senior Product Designer",
    company: "Nexora Labs",
    initials: "NL",
    location: "Bengaluru",
    locality: "Indiranagar",
    salary: "₹28L – ₹36L",
    exp: "5–8 yrs",
    department: "Design & UX",
    skills: ["Figma", "Design Systems", "Fintech UX", "User Research"],
    match: 96,
    postedDays: "2d ago",
    verified: true,
    featured: true,
  },
  {
    id: "pj-2",
    title: "Staff Backend Engineer",
    company: "PhonePe",
    initials: "PP",
    location: "Bengaluru",
    locality: "Bellandur",
    salary: "₹38L – ₹48L",
    exp: "7–10 yrs",
    department: "Engineering",
    skills: ["Go", "Distributed Systems", "Kafka", "PostgreSQL"],
    match: 94,
    postedDays: "1d ago",
    verified: true,
    featured: true,
  },
  {
    id: "pj-3",
    title: "Lead AI Product Designer",
    company: "CRED",
    initials: "CR",
    location: "Bengaluru",
    locality: "Indiranagar",
    salary: "₹34L – ₹44L",
    exp: "6–9 yrs",
    department: "Design & UX",
    skills: ["Agentic UX", "Figma", "Design Tokens", "Prototyping"],
    match: 92,
    postedDays: "3d ago",
    verified: true,
    featured: true,
  },
  {
    id: "pj-4",
    title: "Enterprise Account Executive",
    company: "Razorpay",
    initials: "RZ",
    location: "Mumbai",
    locality: "Bandra Kurla Complex (BKC)",
    salary: "₹22L – ₹30L + Incentives",
    exp: "4–7 yrs",
    department: "Sales & Growth",
    skills: ["B2B SaaS Sales", "Fintech API", "Enterprise Negotiation"],
    match: 89,
    postedDays: "Just now",
    verified: true,
  },
  {
    id: "pj-5",
    title: "Principal Machine Learning Engineer",
    company: "Swiggy",
    initials: "SW",
    location: "Bengaluru",
    locality: "Koramangala",
    salary: "₹45L – ₹60L",
    exp: "8–12 yrs",
    department: "Engineering",
    skills: ["LLMs", "PyTorch", "Recommendation Systems", "RAG"],
    match: 95,
    postedDays: "4d ago",
    verified: true,
    featured: true,
  },
  {
    id: "pj-6",
    title: "Staff Product Manager (Quick Commerce)",
    company: "Zepto",
    initials: "ZP",
    location: "Mumbai",
    locality: "Powai",
    salary: "₹36L – ₹48L + ESOPs",
    exp: "6–9 yrs",
    department: "Product",
    skills: ["Supply Chain", "Growth Product", "SQL", "A/B Testing"],
    match: 90,
    postedDays: "2d ago",
    verified: true,
  },
  {
    id: "pj-7",
    title: "Senior Full-Stack Developer",
    company: "Zomato",
    initials: "ZM",
    location: "Delhi NCR",
    locality: "Cyber City Gurugram",
    salary: "₹28L – ₹38L",
    exp: "5–8 yrs",
    department: "Engineering",
    skills: ["React", "Node.js", "TypeScript", "AWS", "Redis"],
    match: 88,
    postedDays: "5d ago",
    verified: true,
  },
  {
    id: "pj-8",
    title: "Design Systems & Token Specialist",
    company: "Urban Company",
    initials: "UC",
    location: "Remote India",
    locality: "Anywhere",
    salary: "₹30L – ₹40L",
    exp: "5–8 yrs",
    department: "Design & UX",
    skills: ["Design Tokens", "Style Dictionary", "Tailwind CSS", "Figma"],
    match: 93,
    postedDays: "1d ago",
    verified: true,
  },
]

export function PublicHomePage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("All Cities")
  const [selectedDept, setSelectedDept] = useState("All Domains")
  const [salaryFilter, setSalaryFilter] = useState("All")
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [selectedJobForApply, setSelectedJobForApply] = useState<PublicJobItem | null>(null)
  const [authPersona, setAuthPersona] = useState<"candidate" | "employer">("candidate")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [toast, setToast] = useState("")

  const filteredJobs = publicJobsList.filter((job) => {
    const matchesQuery =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    if (!matchesQuery) return false

    if (selectedCity !== "All Cities" && job.location !== selectedCity) return false
    if (selectedDept !== "All Domains" && job.department !== selectedDept) return false
    if (salaryFilter === "30L" && !job.salary.includes("3") && !job.salary.includes("4") && !job.salary.includes("5")) return false
    if (salaryFilter === "40L" && !job.salary.includes("4") && !job.salary.includes("5") && !job.salary.includes("6")) return false

    return true
  })

  const handleApplyClick = (job: PublicJobItem) => {
    setSelectedJobForApply(job)
    setAuthModalOpen(true)
  }

  const handleOneClickCandidateLogin = () => {
    setAuthModalOpen(false)
    setToast(`Signed in as Priya Sharma! Redirecting to application for ${selectedJobForApply?.title || "selected role"}...`)
    setTimeout(() => {
      navigate("/candidate")
    }, 700)
  }

  const handleOneClickEmployerLogin = () => {
    setAuthModalOpen(false)
    setToast("Signed in as Nexora Labs Talent Team! Redirecting to Recruiter Portal...")
    setTimeout(() => {
      navigate("/employer")
    }, 700)
  }

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthModalOpen(false)
    if (authPersona === "candidate") {
      setToast("Signed in successfully! Opening Candidate Application Studio...")
      setTimeout(() => navigate("/candidate"), 600)
    } else {
      setToast("Signed in successfully! Opening Recruiter Workspace...")
      setTimeout(() => navigate("/employer"), 600)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Public Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white grid place-items-center font-extrabold text-lg shadow-sm">
                TN
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
                  Talent Network
                </span>
                <span className="text-[10px] text-blue-600 font-bold tracking-widest uppercase block">
                  Agentic AI Recruiting
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
              <a href="#jobs-section" className="hover:text-blue-600 transition">
                Browse Jobs
              </a>
              <button
                type="button"
                className="hover:text-blue-600 transition cursor-pointer"
                onClick={() => navigate("/employer")}
              >
                For Employers
              </button>
              <button
                type="button"
                className="hover:text-blue-600 transition cursor-pointer"
                onClick={() => navigate("/candidate")}
              >
                For Candidates
              </button>
              <button
                type="button"
                className="hover:text-blue-600 transition cursor-pointer"
                onClick={() => navigate("/enterprise")}
              >
                Enterprise
              </button>
              <button
                type="button"
                className="hover:text-blue-600 transition cursor-pointer"
                onClick={() => navigate("/employer/billing")}
              >
                Pricing & GST
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-xs h-9 font-semibold text-slate-700 hover:text-slate-900"
              onClick={() => {
                setSelectedJobForApply(null)
                setAuthModalOpen(true)
              }}
            >
              <LogIn size={15} /> Sign In
            </Button>
            <Button
              className="text-xs h-9 px-4 font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              onClick={() => navigate("/employer/jobs/new")}
            >
              Post a Job
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-white via-blue-50/30 to-slate-50 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <Sparkles size={14} className="text-blue-600" />
            <span>India's 100% Agentic AI Recruitment SaaS Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Connect With The Right Opportunity Through{" "}
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
              Autonomous AI Matching
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
            Skip outdated job boards. Explore verified tech, design, product, and leadership requisitions across India's top startups and enterprises with zero demographic bias and real-time compensation clarity.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-3xl mx-auto text-left">
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 block uppercase">Active Tech Roles</span>
              <strong className="text-xl font-extrabold text-slate-900 mt-0.5 block">2,480+</strong>
              <small className="text-[10px] text-emerald-600 font-bold">100% Verified Employers</small>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 block uppercase">Median Compensation</span>
              <strong className="text-xl font-extrabold text-blue-700 mt-0.5 block">₹31.5 LPA</strong>
              <small className="text-[10px] text-slate-500">Bengaluru / Mumbai Tech Hubs</small>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 block uppercase">Interview Response SLA</span>
              <strong className="text-xl font-extrabold text-purple-700 mt-0.5 block">&lt; 48 Hours</strong>
              <small className="text-[10px] text-purple-600 font-bold">Autonomous Scheduling</small>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 block uppercase">Regulatory Trust</span>
              <strong className="text-xl font-extrabold text-emerald-700 mt-0.5 block">DPDPA 2023</strong>
              <small className="text-[10px] text-slate-500">Full Consent Control</small>
            </div>
          </div>
        </div>
      </section>

      {/* Main Jobs Discovery Section */}
      <main id="jobs-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        {/* Search & Filter Header Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search by job title, core skills (e.g. React, Figma, Go), or company name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 text-sm bg-slate-50/70 border-slate-200"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="h-11 text-xs font-semibold w-40 bg-slate-50 border-slate-200"
              >
                <option>All Cities</option>
                <option>Bengaluru</option>
                <option>Mumbai</option>
                <option>Delhi NCR</option>
                <option>Remote India</option>
              </Select>
              <Select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="h-11 text-xs font-semibold w-44 bg-slate-50 border-slate-200"
              >
                <option>All Domains</option>
                <option>Engineering</option>
                <option>Design & UX</option>
                <option>Product</option>
                <option>Sales & Growth</option>
              </Select>
            </div>
          </div>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-500 mr-1">Tech Hubs:</span>
              {["All Cities", "Bengaluru", "Mumbai", "Delhi NCR", "Remote India"].map((city) => (
                <button
                  key={city}
                  type="button"
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                    selectedCity === city
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  onClick={() => setSelectedCity(city)}
                >
                  {city}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">Min Salary:</span>
              <button
                type="button"
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                  salaryFilter === "All" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
                }`}
                onClick={() => setSalaryFilter("All")}
              >
                All
              </button>
              <button
                type="button"
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                  salaryFilter === "30L" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
                }`}
                onClick={() => setSalaryFilter("30L")}
              >
                &gt; ₹30 LPA
              </button>
              <button
                type="button"
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                  salaryFilter === "40L" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
                }`}
                onClick={() => setSalaryFilter("40L")}
              >
                &gt; ₹40 LPA
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-900 font-bold">{filteredJobs.length} open roles</strong> across Indian tech hubs
          </span>
          <span className="text-blue-600 font-semibold flex items-center gap-1">
            <Sparkles size={13} /> Updated real-time with verified recruiter listings
          </span>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
            <Card
              key={job.id}
              className="p-5 hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between bg-white border-slate-200"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 grid place-items-center font-bold text-base shadow-2xs">
                      {job.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="text-base font-bold text-slate-900 hover:text-blue-600 transition">
                          {job.title}
                        </h3>
                        {job.featured && <Badge tone="purple">Featured</Badge>}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                        <span className="font-semibold text-slate-900 flex items-center gap-1">
                          {job.company}
                          {job.verified && (
                            <BadgeCheck size={14} className="text-blue-600 inline-block" />
                          )}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <MapPin size={13} /> {job.locality}, {job.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 flex items-center gap-3 text-xs flex-wrap">
                  <div className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/60 font-mono">
                    {job.salary}
                  </div>
                  <div className="text-slate-500 font-medium">
                    Exp: <strong className="text-slate-800">{job.exp}</strong>
                  </div>
                  <div className="text-slate-500 font-medium">
                    Posted: <strong className="text-slate-800">{job.postedDays}</strong>
                  </div>
                  <div className="ml-auto text-purple-700 font-bold flex items-center gap-1">
                    <Sparkles size={13} /> {job.match}% Match
                  </div>
                </div>

                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {job.skills.map((sk) => (
                    <span
                      key={sk}
                      className="text-[11px] bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Direct recruiter review · No external agency
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    className="h-8 text-xs px-3"
                    onClick={() => handleApplyClick(job)}
                  >
                    Save
                  </Button>
                  <Button
                    className="h-8 text-xs px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold"
                    onClick={() => handleApplyClick(job)}
                  >
                    Apply Now <ArrowRight size={13} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* SEAMLESS LOGIN & AUTH POPUP MODAL (When Unauthenticated User Clicks Apply) */}
      {authModalOpen && (
        <Modal
          open={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          title={
            selectedJobForApply
              ? `Sign in to Apply · ${selectedJobForApply.title}`
              : "Sign in to Talent Network"
          }
          footer={
            <div className="w-full flex items-center justify-between text-xs text-slate-500">
              <span>DPDPA 2023 Compliant</span>
              <Button variant="ghost" onClick={() => setAuthModalOpen(false)}>
                Cancel
              </Button>
            </div>
          }
        >
          <div className="space-y-4 text-xs text-slate-700">
            {selectedJobForApply && (
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between">
                <div>
                  <strong className="text-sm font-bold text-blue-900 block">
                    {selectedJobForApply.title}
                  </strong>
                  <span className="text-slate-600">
                    {selectedJobForApply.company} · {selectedJobForApply.location} ({selectedJobForApply.salary})
                  </span>
                </div>
                <Badge tone="green">{selectedJobForApply.match}% Match</Badge>
              </div>
            )}

            {/* Quick 1-Click Demo Logins for Pair Programming Review */}
            <div className="p-3.5 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-purple-900 font-bold">
                <Zap size={14} className="text-purple-600" />
                <span>1-Click Instant Demo Access (Evaluation Mode):</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Click below to instantly sign in with pre-loaded mock profiles without typing credentials:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition"
                  onClick={handleOneClickCandidateLogin}
                >
                  <UserCheck size={14} /> Continue as Candidate (Priya Sharma)
                </button>
                <button
                  type="button"
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition"
                  onClick={handleOneClickEmployerLogin}
                >
                  <Building2 size={14} /> Continue as Recruiter (Nexora Labs)
                </button>
              </div>
            </div>

            <div className="relative my-3 text-center">
              <span className="bg-white px-2 text-slate-400 font-semibold text-[11px]">
                Or sign in with email credentials
              </span>
              <div className="absolute inset-0 -z-10 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
            </div>

            {/* Persona Switcher Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                  authPersona === "candidate" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
                }`}
                onClick={() => setAuthPersona("candidate")}
              >
                Candidate Portal
              </button>
              <button
                type="button"
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                  authPersona === "employer" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
                }`}
                onClick={() => setAuthPersona("employer")}
              >
                Recruiter / Employer
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleManualLogin} className="space-y-3">
              <label className="block text-slate-800 font-bold">
                Work or Personal Email
                <Input
                  type="email"
                  placeholder={authPersona === "candidate" ? "priya.sharma@gmail.com" : "neha@nexoralabs.com"}
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="mt-1"
                />
              </label>

              <label className="block text-slate-800 font-bold">
                Password or OTP
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="mt-1"
                />
              </label>

              <Button type="submit" className="w-full text-xs h-9 font-bold bg-blue-600 text-white">
                Sign In & Continue Application
              </Button>
            </form>
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
