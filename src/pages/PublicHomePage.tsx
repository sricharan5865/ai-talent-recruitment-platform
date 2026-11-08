import { useState } from "react"
import { useNavigate } from "react-router"
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BarChart3,
  Bookmark,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Cog,
  ExternalLink,
  FileText,
  Filter,
  GraduationCap,
  Home,
  IndianRupee,
  Landmark,
  LineChart,
  Lock,
  LogIn,
  MapPin,
  MessageSquare,
  Search,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  TrendingUp,
  User,
  UserCheck,
  Users,
  X,
  Zap,
} from "lucide-react"

function GoogleIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  )
}
import {
  Badge,
  Button,
  Card,
  Input,
  Modal,
  Select,
} from "../components/ui"

export interface PublicJobItem {
  id: string
  title: string
  company: string
  initials: string
  companyBg: string
  location: string
  locality: string
  rating: number
  reviewsCount: string
  salary: string
  exp: string
  equityNote: string
  postedDays: string
  applicantsCount: number
  department: string
  skills: string[]
  match: number
  badgeLabel: string
  interviewsProcess: string
  verified: boolean
  featured?: boolean
}

export const publicJobsList: PublicJobItem[] = [
  {
    id: "pj-1",
    title: "Staff Distributed Systems Engineer - High Concurrency",
    company: "CRED",
    initials: "CR",
    companyBg: "bg-black text-white",
    location: "Bengaluru",
    locality: "Indiranagar HQ / Hybrid",
    rating: 4.8,
    reviewsCount: "820+ Reviews",
    salary: "₹48,00,000 - ₹65,00,000 PA",
    exp: "8 - 10 Years",
    equityNote: "ESOPs + Sign-on",
    postedDays: "Just now",
    applicantsCount: 12,
    department: "Engineering",
    skills: ["Go / Golang", "Kafka Architecture", "DynamoDB", "High QPS", "Distributed Consensus"],
    match: 96,
    badgeLabel: "VERIFIED MANDATE",
    interviewsProcess: "Interviews process: 2 Technical Rounds + Founder Sync",
    verified: true,
    featured: true,
  },
  {
    id: "pj-2",
    title: "Principal Architect - Foundation Models & Agentic Systems",
    company: "Razorpay",
    initials: "RZ",
    companyBg: "bg-blue-600 text-white",
    location: "Bengaluru",
    locality: "Bengaluru / Remote Optional",
    rating: 4.8,
    reviewsCount: "1,150+ Reviews",
    salary: "₹65,00,000 - ₹75,00,000 PA",
    exp: "9 - 14 Years",
    equityNote: "Full Relocation Support Included",
    postedDays: "1 day ago",
    applicantsCount: 8,
    department: "Engineering",
    skills: ["PyTorch", "vLLM Inference", "LangChain / LlamaIndex", "Vector Databases", "Triton Server"],
    match: 94,
    badgeLabel: "DIRECT FOUNDER",
    interviewsProcess: "Direct Hiring Manager: VP of Engineering",
    verified: true,
    featured: true,
  },
  {
    id: "pj-3",
    title: "Director of Product - Supply Chain Optimization & Dark Stores",
    company: "Swiggy Instamart",
    initials: "SW",
    companyBg: "bg-amber-600 text-white",
    location: "Bengaluru",
    locality: "Koramangala HQ / Hybrid",
    rating: 4.7,
    reviewsCount: "1,400+ Reviews",
    salary: "₹60,00,000 - ₹82,00,000 PA",
    exp: "10 - 13 Years",
    equityNote: "Pre-IPO Stock Tranche",
    postedDays: "2 days ago",
    applicantsCount: 19,
    department: "Product",
    skills: ["Warehouse Apps", "Route Optimization", "Warehouse Tech", "P&L Ownership"],
    match: 92,
    badgeLabel: "FOUNDER INTERVIEW",
    interviewsProcess: "Reports directly to: Chief Business Officer",
    verified: true,
    featured: true,
  },
  {
    id: "pj-4",
    title: "Staff Product Designer - Design Systems & Fintech UX",
    company: "PhonePe",
    initials: "PE",
    companyBg: "bg-indigo-700 text-white",
    location: "Bengaluru",
    locality: "Bellandur Tech Village",
    rating: 4.7,
    reviewsCount: "980+ Reviews",
    salary: "₹38,00,000 - ₹48,00,000 PA",
    exp: "6 - 9 Years",
    equityNote: "Annual Bonus + Wealth Creation Units",
    postedDays: "3 days ago",
    applicantsCount: 14,
    department: "Design & UX",
    skills: ["Figma Tokens", "Design Systems", "Design Leadership", "Mobile Payments"],
    match: 95,
    badgeLabel: "VERIFIED MANDATE",
    interviewsProcess: "Interviews process: Portfolio Review + Leadership Panel",
    verified: true,
  },
]

export const partnerCompanies = [
  {
    id: "cred",
    name: "CRED",
    initials: "CR",
    badgeBg: "bg-black text-white",
    rating: 4.8,
    category: "Fintech & High-Scale",
    roles: "24 active roles · ₹35L - ₹85L",
  },
  {
    id: "swiggy",
    name: "Swiggy",
    initials: "SW",
    badgeBg: "bg-rose-600 text-white",
    rating: 4.7,
    category: "Quick Commerce & Hyperlocal",
    roles: "18 active roles · ₹28L - ₹65L",
  },
  {
    id: "razorpay",
    name: "Razorpay",
    initials: "RZ",
    badgeBg: "bg-blue-600 text-white",
    rating: 4.8,
    category: "Payments & Banking Tech",
    roles: "32 active roles · ₹30L - ₹75L",
  },
  {
    id: "phonepe",
    name: "PhonePe",
    initials: "PE",
    badgeBg: "bg-indigo-800 text-white",
    rating: 4.7,
    category: "Ubiquitous Consumer UPI",
    roles: "20 active roles · ₹32L - ₹80L",
  },
  {
    id: "zepto",
    name: "Zepto",
    initials: "ZP",
    badgeBg: "bg-slate-900 text-white",
    rating: 4.6,
    category: "10-Min Fast-Mile Tech",
    roles: "15 active roles · ₹35L - ₹90L",
  },
  {
    id: "zomato",
    name: "Zomato",
    initials: "ZO",
    badgeBg: "bg-red-600 text-white",
    rating: 4.6,
    category: "Consumer Platform",
    roles: "22 active roles · ₹28L - ₹70L",
  },
]

const jobsMegaMenu = {
  tooltip: "Search Jobs",
  col1: {
    title: "Popular categories",
    items: [
      "IT jobs",
      "Sales jobs",
      "Marketing jobs",
      "Data Science jobs",
      "HR jobs",
      "Engineering jobs",
    ],
  },
  col2: {
    title: "Jobs in demand",
    items: [
      "Fresher jobs",
      "MNC jobs",
      "Remote jobs",
      "Work from home jobs",
      "Walk-in jobs",
      "Part-time jobs",
    ],
  },
  col3: {
    title: "Jobs by location",
    items: [
      "Jobs in Delhi",
      "Jobs in Mumbai",
      "Jobs in Bangalore",
      "Jobs in Hyderabad",
      "Jobs in Chennai",
      "Jobs in Pune",
    ],
  },
}

const companiesMegaMenu = {
  tooltip: "Explore top companies hiring on Talent Network",
  col1: {
    title: "Explore categories",
    items: ["Unicorn", "MNC", "Startup", "Product based", "Internet"],
  },
  col2: {
    title: "Explore collections",
    items: [
      "Top companies",
      "IT companies",
      "Fintech companies",
      "Sponsored companies",
      "Featured companies",
    ],
  },
  col3: {
    title: "Research companies",
    brandTag: "by Talent Intelligence",
    items: [
      { label: "Interview questions", to: "/candidate/interviews" },
      { label: "Company salaries", to: "/candidate/radar" },
      { label: "Company reviews", to: "/candidate/companies" },
      { label: "Salary Calculator", to: "/candidate/radar" },
    ],
  },
}

const servicesMegaMenu = {
  tooltip: "Talent 360 - Career Services",
  col1: {
    title: "AI career tools",
    items: [
      { label: "Neo AI job agent", to: "/candidate" },
      { label: "Resume score checker", to: "/candidate/application-studio" },
      { label: "Interview Q&A", to: "/candidate/interviews" },
      { label: "AI mock interview", to: "/candidate/interviews" },
      { label: "Live AI interview", to: "/candidate/interviews" },
    ],
  },
  col2: {
    title: "Premium services",
    items: [
      { label: "Talent Pro", badge: "Most popular", isPopular: true, to: "/candidate" },
      { label: "AI Bootcamps", badge: "New", isPopular: false, to: "/candidate" },
    ],
  },
  col3: {
    title: "Free resources",
    items: [
      { label: "Resume samples", to: "/candidate/application-studio" },
      { label: "Job letter samples", to: "/candidate/application-studio" },
    ],
    promo: {
      tag: "Promotional Offer",
      text: "PROSALE Flat 25% off on Talent 360 Pro. Limited Period Offer.",
    },
  },
}

const heroCategoryCardsRow1 = [
  { id: "remote", label: "Remote", icon: Home, query: "Remote" },
  { id: "mnc", label: "MNC", icon: Building2, query: "MNC" },
  { id: "datascience", label: "Data Science", icon: BarChart3, query: "Data Science" },
  { id: "fortune500", label: "Fortune 500", icon: Award, query: "Fortune 500" },
  { id: "analytics", label: "Analytics", icon: Search, query: "Analytics" },
  { id: "hr", label: "HR", icon: Users, query: "HR" },
]

const heroCategoryCardsRow2 = [
  { id: "sales", label: "Sales", icon: ShoppingBag, query: "Sales" },
  { id: "banking", label: "Banking & Finance", icon: IndianRupee, query: "Fintech" },
  { id: "internship", label: "Internship", icon: FileText, query: "Internship" },
  { id: "engineering", label: "Engineering", icon: Cog, query: "Engineering" },
  { id: "fresher", label: "Fresher", icon: GraduationCap, query: "Fresher" },
]

export function PublicHomePage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExp, setSelectedExp] = useState("5-8 Years (Lead / Staff)")
  const [selectedLocation, setSelectedLocation] = useState("Bengaluru (All Tech Hubs)")
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null)
  const [savedJobs, setSavedJobs] = useState<Record<string, boolean>>({})
  const [hoveredNav, setHoveredNav] = useState<"jobs" | "companies" | "services" | "employers" | null>(null)

  // Auth Drawer State
  const [authDrawerOpen, setAuthDrawerOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [useOtpLogin, setUseOtpLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [authPersona, setAuthPersona] = useState<"candidate" | "employer">("candidate")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginOtp, setLoginOtp] = useState("")
  const [selectedJobForApply, setSelectedJobForApply] = useState<PublicJobItem | null>(null)
  const [toast, setToast] = useState("")

  const toggleBookmark = (id: string) => {
    setSavedJobs((prev) => {
      const next = !prev[id]
      setToast(next ? "Opportunity saved to your Candidate Vault!" : "Opportunity removed from saved list.")
      return { ...prev, [id]: next }
    })
  }

  const handleApplyClick = (job: PublicJobItem) => {
    setSelectedJobForApply(job)
    setAuthMode("login")
    setAuthDrawerOpen(true)
  }

  const handleOneClickCandidateLogin = () => {
    setAuthDrawerOpen(false)
    setToast(`Signed in as Priya Sharma! Redirecting to application for ${selectedJobForApply?.title || "selected role"}...`)
    setTimeout(() => {
      navigate("/candidate")
    }, 500)
  }

  const handleOneClickEmployerLogin = () => {
    setAuthDrawerOpen(false)
    setToast("Signed in as Talent Acquisition Lead! Redirecting to Recruiter Portal...")
    setTimeout(() => {
      navigate("/employer")
    }, 500)
  }

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthDrawerOpen(false)
    if (authPersona === "candidate") {
      setToast("Signed in successfully! Opening Candidate Application Studio...")
      setTimeout(() => navigate("/candidate"), 500)
    } else {
      setToast("Signed in successfully! Opening Recruiter Workspace...")
      setTimeout(() => navigate("/employer"), 500)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. STICKY TOPBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
              title="Talent Network Home"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                <Sparkles size={17} className="text-white fill-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                Talent<span className="text-blue-600">Network</span>
              </span>
            </div>

            {/* Navigation links with Mega-Dropdowns */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600 h-16">
              {/* 1. JOBS LINK & MEGA-DROPDOWN */}
              <div
                className="relative h-full flex items-center px-3"
                onMouseEnter={() => setHoveredNav("jobs")}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("jobs-section")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className={`flex items-center h-full transition cursor-pointer font-medium ${
                    hoveredNav === "jobs" ? "text-slate-900 font-bold" : "hover:text-slate-900"
                  }`}
                >
                  Jobs
                </button>

                {/* Active red underline */}
                {hoveredNav === "jobs" && (
                  <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-rose-600 rounded-full" />
                )}

                {/* Tooltip */}
                {hoveredNav === "jobs" && (
                  <span className="absolute top-[52px] left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-md z-50 whitespace-nowrap pointer-events-none">
                    {jobsMegaMenu.tooltip}
                  </span>
                )}

                {/* Mega Menu Dropdown */}
                {hoveredNav === "jobs" && (
                  <div className="absolute top-16 left-0 w-[580px] bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-6 z-50 text-left">
                    <div className="grid grid-cols-3 divide-x divide-slate-100">
                      {/* Col 1 */}
                      <div className="pr-4 space-y-3">
                        <span className="text-xs font-bold text-slate-900 block">
                          {jobsMegaMenu.col1.title}
                        </span>
                        <ul className="space-y-2 text-xs text-slate-600 font-normal">
                          {jobsMegaMenu.col1.items.map((item) => (
                            <li key={item}>
                              <button
                                type="button"
                                onClick={() => {
                                  setSearchQuery(item.replace(" jobs", ""))
                                  setHoveredNav(null)
                                  document.getElementById("jobs-section")?.scrollIntoView({ behavior: "smooth" })
                                  setToast(`Searching for: ${item}`)
                                }}
                                className="hover:text-blue-600 transition text-left cursor-pointer"
                              >
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 2 */}
                      <div className="px-4 space-y-3">
                        <span className="text-xs font-bold text-slate-900 block">
                          {jobsMegaMenu.col2.title}
                        </span>
                        <ul className="space-y-2 text-xs text-slate-600 font-normal">
                          {jobsMegaMenu.col2.items.map((item) => (
                            <li key={item}>
                              <button
                                type="button"
                                onClick={() => {
                                  setSearchQuery(item.replace(" jobs", ""))
                                  setHoveredNav(null)
                                  document.getElementById("jobs-section")?.scrollIntoView({ behavior: "smooth" })
                                  setToast(`Searching for: ${item}`)
                                }}
                                className="hover:text-blue-600 transition text-left cursor-pointer"
                              >
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 3 */}
                      <div className="pl-4 space-y-3">
                        <span className="text-xs font-bold text-slate-900 block">
                          {jobsMegaMenu.col3.title}
                        </span>
                        <ul className="space-y-2 text-xs text-slate-600 font-normal">
                          {jobsMegaMenu.col3.items.map((item) => (
                            <li key={item}>
                              <button
                                type="button"
                                onClick={() => {
                                  const city = item.replace("Jobs in ", "")
                                  setSelectedLocation(city === "Bangalore" ? "Bengaluru (All Tech Hubs)" : city)
                                  setHoveredNav(null)
                                  document.getElementById("jobs-section")?.scrollIntoView({ behavior: "smooth" })
                                  setToast(`Location filtered to ${city}`)
                                }}
                                className="hover:text-blue-600 transition text-left cursor-pointer"
                              >
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. COMPANIES LINK & MEGA-DROPDOWN */}
              <div
                className="relative h-full flex items-center px-3"
                onMouseEnter={() => setHoveredNav("companies")}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("companies-section")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className={`flex items-center h-full transition cursor-pointer font-medium ${
                    hoveredNav === "companies" ? "text-slate-900 font-bold" : "hover:text-slate-900"
                  }`}
                >
                  Companies
                </button>

                {hoveredNav === "companies" && (
                  <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-rose-600 rounded-full" />
                )}

                {hoveredNav === "companies" && (
                  <span className="absolute top-[52px] left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-md z-50 whitespace-nowrap pointer-events-none">
                    {companiesMegaMenu.tooltip}
                  </span>
                )}

                {hoveredNav === "companies" && (
                  <div className="absolute top-16 left-0 w-[580px] bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-6 z-50 text-left">
                    <div className="grid grid-cols-3 divide-x divide-slate-100">
                      {/* Col 1 */}
                      <div className="pr-4 space-y-3">
                        <span className="text-xs font-bold text-slate-900 block">
                          {companiesMegaMenu.col1.title}
                        </span>
                        <ul className="space-y-2 text-xs text-slate-600 font-normal">
                          {companiesMegaMenu.col1.items.map((item) => (
                            <li key={item}>
                              <button
                                type="button"
                                onClick={() => {
                                  setSearchQuery(item)
                                  setHoveredNav(null)
                                  document.getElementById("jobs-section")?.scrollIntoView({ behavior: "smooth" })
                                  setToast(`Browsing ${item} companies`)
                                }}
                                className="hover:text-blue-600 transition text-left cursor-pointer"
                              >
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 2 */}
                      <div className="px-4 space-y-3">
                        <span className="text-xs font-bold text-slate-900 block">
                          {companiesMegaMenu.col2.title}
                        </span>
                        <ul className="space-y-2 text-xs text-slate-600 font-normal">
                          {companiesMegaMenu.col2.items.map((item) => (
                            <li key={item}>
                              <button
                                type="button"
                                onClick={() => {
                                  setSearchQuery(item)
                                  setHoveredNav(null)
                                  document.getElementById("companies-section")?.scrollIntoView({ behavior: "smooth" })
                                  setToast(`Browsing ${item}`)
                                }}
                                className="hover:text-blue-600 transition text-left cursor-pointer"
                              >
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 3 */}
                      <div className="pl-4 space-y-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 block">
                            {companiesMegaMenu.col3.title}
                          </span>
                          <span className="text-[10px] text-blue-600 font-semibold">
                            {companiesMegaMenu.col3.brandTag}
                          </span>
                        </div>
                        <ul className="space-y-2 text-xs text-slate-600 font-normal">
                          {companiesMegaMenu.col3.items.map((item) => (
                            <li key={item.label}>
                              <button
                                type="button"
                                onClick={() => {
                                  setHoveredNav(null)
                                  navigate(item.to)
                                }}
                                className="hover:text-blue-600 transition text-left cursor-pointer"
                              >
                                {item.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. SERVICES LINK & MEGA-DROPDOWN */}
              <div
                className="relative h-full flex items-center px-3"
                onMouseEnter={() => setHoveredNav("services")}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <button
                  type="button"
                  onClick={() => navigate("/candidate/radar")}
                  className={`flex items-center gap-1.5 h-full transition cursor-pointer font-medium ${
                    hoveredNav === "services" ? "text-slate-900 font-bold" : "hover:text-slate-900"
                  }`}
                >
                  <span>Services</span>
                  <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                    1
                  </span>
                </button>

                {hoveredNav === "services" && (
                  <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-rose-600 rounded-full" />
                )}

                {hoveredNav === "services" && (
                  <span className="absolute top-[52px] left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-md z-50 whitespace-nowrap pointer-events-none">
                    {servicesMegaMenu.tooltip}
                  </span>
                )}

                {hoveredNav === "services" && (
                  <div className="absolute top-16 left-0 w-[640px] bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-6 z-50 text-left">
                    <div className="grid grid-cols-3 divide-x divide-slate-100">
                      {/* Col 1 */}
                      <div className="pr-4 space-y-3">
                        <span className="text-xs font-bold text-slate-900 block">
                          {servicesMegaMenu.col1.title}
                        </span>
                        <ul className="space-y-2 text-xs text-slate-600 font-normal">
                          {servicesMegaMenu.col1.items.map((item) => (
                            <li key={item.label}>
                              <button
                                type="button"
                                onClick={() => {
                                  setHoveredNav(null)
                                  navigate(item.to)
                                }}
                                className="hover:text-blue-600 transition text-left cursor-pointer"
                              >
                                {item.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 2 */}
                      <div className="px-4 space-y-3">
                        <span className="text-xs font-bold text-slate-900 block">
                          {servicesMegaMenu.col2.title}
                        </span>
                        <ul className="space-y-2.5 text-xs text-slate-600 font-normal">
                          {servicesMegaMenu.col2.items.map((item) => (
                            <li key={item.label}>
                              <button
                                type="button"
                                onClick={() => {
                                  setHoveredNav(null)
                                  navigate(item.to)
                                }}
                                className="flex items-center gap-1.5 hover:text-blue-600 transition text-left cursor-pointer"
                              >
                                <span>{item.label}</span>
                                <span
                                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${
                                    item.isPopular
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                      : "bg-blue-50 text-blue-700 border-blue-200"
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 3 */}
                      <div className="pl-4 space-y-4">
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-900 block">
                            {servicesMegaMenu.col3.title}
                          </span>
                          <ul className="space-y-2 text-xs text-slate-600 font-normal">
                            {servicesMegaMenu.col3.items.map((item) => (
                              <li key={item.label}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setHoveredNav(null)
                                    navigate(item.to)
                                  }}
                                  className="hover:text-blue-600 transition text-left cursor-pointer"
                                >
                                  {item.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Promotional Offer */}
                        <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-100 text-[11px] space-y-1">
                          <div className="flex items-center gap-1 text-rose-700 font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                            <span>{servicesMegaMenu.col3.promo.tag}</span>
                          </div>
                          <p className="text-slate-600 leading-snug">
                            {servicesMegaMenu.col3.promo.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-xs sm:text-sm font-semibold text-blue-600 border border-blue-600/70 hover:bg-blue-50 px-5 py-1.5 rounded-full transition cursor-pointer"
              onClick={() => {
                setSelectedJobForApply(null)
                setAuthMode("login")
                setAuthDrawerOpen(true)
              }}
            >
              Login
            </button>
            <button
              type="button"
              className="text-xs sm:text-sm font-semibold text-white bg-[#B83E28] hover:bg-[#A33520] px-5 py-1.5 rounded-full transition shadow-xs cursor-pointer"
              onClick={() => {
                setSelectedJobForApply(null)
                setAuthMode("register")
                setAuthDrawerOpen(true)
              }}
            >
              Register
            </button>

            {/* For Employers Dropdown */}
            <div
              className="relative hidden sm:block"
              onMouseEnter={() => setHoveredNav("employers")}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <button
                type="button"
                onClick={() => navigate("/employer")}
                className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-1 transition px-2 py-1.5 cursor-pointer"
              >
                <span>For employers</span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {hoveredNav === "employers" && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl border border-slate-200 shadow-xl p-2 z-50 space-y-1 text-left">
                  <button
                    type="button"
                    onClick={() => {
                      setHoveredNav(null)
                      navigate("/employer/jobs/new")
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-50 hover:text-blue-600 transition cursor-pointer"
                  >
                    Post a Hot Vacancy
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHoveredNav(null)
                      navigate("/employer/search")
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-50 hover:text-blue-600 transition cursor-pointer"
                  >
                    Search Resumes (Resdex)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHoveredNav(null)
                      navigate("/employer")
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-50 hover:text-blue-600 transition cursor-pointer"
                  >
                    Employer Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHoveredNav(null)
                      navigate("/enterprise")
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-50 hover:text-blue-600 transition cursor-pointer"
                  >
                    Enterprise Multi-Org
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              className="w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center transition"
              onClick={() => navigate("/candidate")}
              title="Candidate Workspace"
            >
              <User size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-12">
        {/* 2. HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto pt-4 space-y-4">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide">
            <Sparkles size={13} className="text-blue-600" />
            <span>FRONTIER TECH & LEADERSHIP ROLES · CTCs ₹25LPA-₹1.5CR (Top 1% Talent)</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Find your dream tech & leadership job now
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
            70,000+ curated roles for India's top 1% tech, AI & product talent. Zero spam, transparent compensation ranges.
          </p>

          {/* Unified Floating Search Card */}
          <div className="pt-4">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 p-2 sm:p-2.5 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200 text-left">
              {/* Field 1: Role or Keyword */}
              <div className="flex-1 px-4 py-2 sm:py-1">
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Role, Company or Skills
                </label>
                <div className="flex items-center gap-2 mt-0.5">
                  <Search size={16} className="text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Staff Backend, Gen AI, Figma, Tech Lead"
                    className="w-full text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-hidden bg-transparent"
                  />
                </div>
              </div>

              {/* Field 2: Experience */}
              <div className="md:w-56 px-4 py-2 sm:py-1">
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Experience Level
                </label>
                <div className="flex items-center justify-between mt-0.5 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-slate-400 shrink-0" />
                    <select
                      value={selectedExp}
                      onChange={(e) => setSelectedExp(e.target.value)}
                      className="text-xs sm:text-sm font-semibold text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
                    >
                      <option>5-8 Years (Lead / Staff)</option>
                      <option>3-5 Years (Senior)</option>
                      <option>8-12 Years (Principal / Director)</option>
                      <option>12+ Years (VP / CXO)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Field 3: Location */}
              <div className="md:w-60 px-4 py-2 sm:py-1">
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Location
                </label>
                <div className="flex items-center justify-between mt-0.5 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-slate-400 shrink-0" />
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="text-xs sm:text-sm font-semibold text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
                    >
                      <option>Bengaluru (All Tech Hubs)</option>
                      <option>Mumbai & Pune</option>
                      <option>Delhi NCR (Gurugram / Noida)</option>
                      <option>Hyderabad Tech Corridor</option>
                      <option>Remote (India / Global)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="p-1">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("jobs-section")
                    el?.scrollIntoView({ behavior: "smooth" })
                    setToast("Refreshed matching opportunities!")
                  }}
                  className="w-full md:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition shadow-md shadow-blue-600/20 cursor-pointer"
                >
                  <span>Search</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Quick Filter Category Cards Matching Screenshot (Row 1 & Row 2) */}
            <div className="space-y-3 mt-6">
              {/* Row 1 */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                {heroCategoryCardsRow1.map((card) => {
                  const Icon = card.icon
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => {
                        setSearchQuery(card.query)
                        document.getElementById("jobs-section")?.scrollIntoView({ behavior: "smooth" })
                        setToast(`Filtered jobs for: ${card.label}`)
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition text-slate-800 text-xs font-bold cursor-pointer group shadow-2xs"
                    >
                      <Icon size={15} className="text-slate-500 group-hover:text-blue-600 transition" />
                      <span>{card.label}</span>
                      <span className="text-slate-400 group-hover:text-blue-600 font-bold ml-0.5">›</span>
                    </button>
                  )
                })}
              </div>

              {/* Row 2 */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                {heroCategoryCardsRow2.map((card) => {
                  const Icon = card.icon
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => {
                        setSearchQuery(card.query)
                        document.getElementById("jobs-section")?.scrollIntoView({ behavior: "smooth" })
                        setToast(`Filtered jobs for: ${card.label}`)
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition text-slate-800 text-xs font-bold cursor-pointer group shadow-2xs"
                    >
                      <Icon size={15} className="text-slate-500 group-hover:text-blue-600 transition" />
                      <span>{card.label}</span>
                      <span className="text-slate-400 group-hover:text-blue-600 font-bold ml-0.5">›</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 3. TICKER / LIVE STATS BANNER */}
        <section className="bg-white rounded-2xl border border-blue-100 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                  4,810 Candidates Hired this Month
                </span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  LIVE TODAY
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Direct interview schedules initiated via verified Talent Network Candidate Vaults
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-right md:border-l md:border-slate-200 md:pl-6">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Average Hike Recorded
              </span>
              <span className="text-sm font-extrabold text-blue-600 block">
                +42.8% on Base
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate("/candidate/radar")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline cursor-pointer"
            >
              View Trends <ArrowRight size={13} />
            </button>
          </div>
        </section>

        {/* 4. TOP COMPANIES HIRING */}
        <section id="companies-section" className="space-y-4 pt-4">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest block">
                VERIFIED CAPITAL & UNICORN PARTNERS
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Top companies hiring on Talent Network
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/candidate/jobs")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline cursor-pointer"
            >
              View all 400+ companies →
            </button>
          </div>

          {/* 6 Company Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {partnerCompanies.map((c) => (
              <div
                key={c.id}
                onClick={() => navigate(`/employer/search?company=${c.name}`)}
                className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-lg ${c.badgeBg} flex items-center justify-center font-bold text-xs`}>
                    {c.initials}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                    <Star size={11} className="text-amber-500 fill-amber-500" />
                    <span>{c.rating}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 leading-snug">{c.name}</h4>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{c.category}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[10px] font-semibold text-blue-600 truncate">
                  {c.roles}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. FEATURED VERIFIED OPPORTUNITIES */}
        <section id="jobs-section" className="space-y-4 pt-6">
          <div className="flex items-end justify-between">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-7 rounded-full bg-[#B83E28] mt-1 shrink-0" />
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Featured Verified Opportunities
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Transparent CTCs, explicit stock grants, and direct routes to hiring decision-makers.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate("/candidate/jobs")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline cursor-pointer"
            >
              View all jobs (1,200+) →
            </button>
          </div>

          {/* Wide Job Cards List */}
          <div className="space-y-3">
            {publicJobsList.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition p-5 space-y-4"
              >
                {/* Top Row: Title, Company, CTC, Actions */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div className={`w-11 h-11 rounded-xl ${job.companyBg} flex items-center justify-center font-extrabold text-sm shrink-0 shadow-xs`}>
                      {job.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition cursor-pointer">
                          {job.title}
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          {job.badgeLabel}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
                        <span className="font-semibold text-slate-800">{job.company}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-slate-700 font-medium">
                          <Star size={11} className="text-amber-500 fill-amber-500" />
                          {job.rating} ({job.reviewsCount})
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-slate-400" />
                          {job.locality}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTC & Apply button */}
                  <div className="flex items-center md:flex-col md:items-end justify-between gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-right">
                      <span className="text-base sm:text-lg font-extrabold text-slate-900 block tracking-tight">
                        {job.salary}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleBookmark(job.id)}
                        className={`p-2 rounded-xl border transition cursor-pointer ${
                          savedJobs[job.id]
                            ? "bg-rose-50 border-rose-300 text-rose-600"
                            : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900"
                        }`}
                        title="Save Job"
                      >
                        <Bookmark size={15} className={savedJobs[job.id] ? "fill-rose-600" : ""} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyClick(job)}
                        className="px-4 py-2 bg-[#B83E28] hover:bg-[#A33520] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                      >
                        <span>Quick Apply</span>
                        <ExternalLink size={13} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Meta details row: Exp, Equity, Posted, Applicants */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2 px-3 bg-slate-50 rounded-xl text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 truncate">
                    <Briefcase size={13} className="text-slate-400 shrink-0" />
                    <span>Exp: <strong className="text-slate-800">{job.exp}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <TrendingUp size={13} className="text-emerald-500 shrink-0" />
                    <span>Equity: <strong className="text-slate-800">{job.equityNote}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Clock size={13} className="text-slate-400 shrink-0" />
                    <span>Posted: <strong className="text-slate-800">{job.postedDays}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Users size={13} className="text-blue-500 shrink-0" />
                    <span>Applicants: <strong className="text-slate-800">{job.applicantsCount} Candidates</strong></span>
                  </div>
                </div>

                {/* Skills tags and Interview route */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {job.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="text-[11px] font-medium text-slate-400 italic">
                    {job.interviewsProcess}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. DUAL PERSONA VALUE CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {/* Card 1: Talent Network for Talent */}
          <div className="bg-gradient-to-br from-blue-50/60 via-white to-white rounded-3xl border border-blue-100 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100/70 text-blue-700">
                Talent Network for Talent
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Accelerate Your Tech Career with Talent Network Studio
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Get discovered by founders and VPs of Engineering without sending cold emails. Real ATS intelligence and direct WhatsApp introductions.
              </p>

              {/* 4 Feature Points (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <Zap size={15} className="text-amber-500 fill-amber-500" />
                    <span>Instant CTC Check</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Know your true market worth based on real recent offers, equity grants & bonuses.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <MessageSquare size={15} className="text-emerald-500" />
                    <span>Agent Match WhatsApp</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Autonomous AI agents introduce you to curated founders via direct WhatsApp notifications.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <ShieldCheck size={15} className="text-blue-500" />
                    <span>Zero Spam Guarantee</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Your profile is hidden from your current employer with DPDP compliance.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <Award size={15} className="text-purple-500" />
                    <span>Live Salary Benchmark</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Real salary compensation database updated from 40k+ offer letters in India.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => navigate("/candidate")}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#B83E28] hover:bg-[#A33520] text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
              >
                Build Talent Profile (Free)
              </button>
              <p className="text-[11px] text-slate-400">
                Takes &lt; 3 mins · Import via LinkedIn / GitHub
              </p>
            </div>
          </div>

          {/* Card 2: Talent Network for Enterprise */}
          <div className="bg-gradient-to-br from-rose-50/40 via-white to-white rounded-3xl border border-rose-100 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-rose-100/70 text-rose-800">
                Talent Network for Enterprise
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                For Employers, Founders & Executive Hiring Heads
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Access 1.2M+ pre-vetted engineers, engineering managers, and product leads. Cut hiring cycles from 45 days down to 11 days.
              </p>

              {/* 4 Feature Points (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <UserCheck size={15} className="text-blue-600" />
                    <span>12-hr Pre-Vetted Leads</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Senior software engineers, system architects & offline scheduled in 48h.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <FileText size={15} className="text-emerald-600" />
                    <span>100% GST Compliant</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Automated corporate back-end, procurement workflows and enterprise billing.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <Sparkles size={15} className="text-amber-500" />
                    <span>AI Candidate Screening</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Automated GitHub and system design repository evaluation before initial call.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <Clock size={15} className="text-indigo-600" />
                    <span>Guaranteed SLA</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    First pipeline screening interview candidate calendar within 72 business hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/employer")}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
              >
                Post Requisition Mandate
              </button>
              <button
                type="button"
                onClick={() => navigate("/enterprise")}
                className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1 transition"
              >
                Talk to Enterprise Account Executive →
              </button>
            </div>
          </div>
        </section>

        {/* 7. TECH ECOSYSTEM SPOTLIGHT */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Context & Stats */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest block">
                TECH ECOSYSTEM SPOTLIGHT
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Built for High-Growth Engineering Teams in Bengaluru, Hyderabad & Beyond
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                From Series A tech disruptors to Fortune 100 Global Capability Centers (GCCs), our algorithmic talent matching engine bridges the gap between deep technical capability and business ownership.
              </p>

              {/* 3 Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                <div>
                  <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">
                    11 Days
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Average Time-to-Offer
                  </span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">
                    ₹28.4L
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Median Verified Salary
                  </span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">
                    96.8%
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    90-day Retention
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: 2 Visual Spotlight Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="relative rounded-2xl overflow-hidden group h-56 bg-slate-900 border border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80"
                  alt="Team collaboration"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4">
                  <span className="text-[10px] uppercase font-bold text-blue-400 bg-blue-950/80 border border-blue-800 px-2 py-0.5 rounded-full w-max mb-1.5">
                    Case Study
                  </span>
                  <h4 className="text-white font-bold text-sm leading-snug">
                    Bengaluru · Outer Ring Road Corridor
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    Scaling 40+ Staff Engineers for Quick Commerce Hub
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative rounded-2xl overflow-hidden group h-56 bg-slate-900 border border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80"
                  alt="Senior Architect"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded-full w-max mb-1.5">
                    Talent Spotlight
                  </span>
                  <h4 className="text-white font-bold text-sm leading-snug">
                    VP & Principal Architect Cohort
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    AI, Agentic Systems & High-QPS Infrastructure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. INSTITUTIONAL STANDARDS / TRUST BANNER */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 text-center shadow-xs">
          <div className="max-w-xl mx-auto space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">
              INSTITUTIONAL STANDARDS
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              India's Most Trusted Frontier Tech Talent Platform
            </h3>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-2">
                <Users size={16} />
              </div>
              <span className="text-2xl font-extrabold text-slate-900 block">1.2M+</span>
              <p className="text-xs text-slate-500 font-medium">Verified Indian Tech Profiles</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                <Award size={16} />
              </div>
              <span className="text-2xl font-extrabold text-slate-900 block">₹28L+</span>
              <p className="text-xs text-slate-500 font-medium">Average Offered CTC</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2">
                <MessageSquare size={16} />
              </div>
              <span className="text-2xl font-extrabold text-slate-900 block">94.2%</span>
              <p className="text-xs text-slate-500 font-medium">Recruiter First Response Rate</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center mx-auto mb-2">
                <ShieldCheck size={16} />
              </div>
              <span className="text-2xl font-extrabold text-slate-900 block">SOC2 & DPDP</span>
              <p className="text-xs text-slate-500 font-medium">Act 2023 Regulated Privacy</p>
            </div>
          </div>

          {/* Verification check list row */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-bold text-slate-600">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <Check size={13} className="text-emerald-600" />
              100% EXECUTIVE CALL CONFIDENTIALITY
            </span>
            <span className="flex items-center gap-1.5 text-emerald-700">
              <Check size={13} className="text-emerald-600" />
              STRICT NO-SPAM RECRUITER POLICY
            </span>
            <span className="flex items-center gap-1.5 text-emerald-700">
              <Check size={13} className="text-emerald-600" />
              DIRECT WHATSAPP CONVERSATION FLOW
            </span>
            <span className="flex items-center gap-1.5 text-emerald-700">
              <Check size={13} className="text-emerald-600" />
              DEDICATED TALENT PARTNER SUPPORT
            </span>
          </div>
        </section>
      </main>

      {/* 9. COMPREHENSIVE FOOTER */}
      <footer className="bg-white border-t border-slate-200 pt-12 pb-8 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* 5 Column Directory */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div>
              <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
                Tech Jobs
              </h5>
              <ul className="space-y-2">
                <li><a href="#jobs-section" className="hover:text-blue-600 transition">Software Engineers</a></li>
                <li><a href="#jobs-section" className="hover:text-blue-600 transition">Data Platform & AI</a></li>
                <li><a href="#jobs-section" className="hover:text-blue-600 transition">DevOps & Cloud SRE</a></li>
                <li><a href="#jobs-section" className="hover:text-blue-600 transition">Mobile Engineers</a></li>
                <li><a href="#jobs-section" className="hover:text-blue-600 transition">Product Managers</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
                Executive Mandates
              </h5>
              <ul className="space-y-2">
                <li><button onClick={() => navigate("/employer")} className="hover:text-blue-600 transition text-left">VP & Engineering Leads</button></li>
                <li><button onClick={() => navigate("/employer")} className="hover:text-blue-600 transition text-left">Chief Technology Officers</button></li>
                <li><button onClick={() => navigate("/employer")} className="hover:text-blue-600 transition text-left">Chief Product Officers</button></li>
                <li><button onClick={() => navigate("/employer")} className="hover:text-blue-600 transition text-left">General Managers - SaaS</button></li>
                <li><button onClick={() => navigate("/employer")} className="hover:text-blue-600 transition text-left">Enterprise Executives</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
                Top Companies
              </h5>
              <ul className="space-y-2">
                <li><a href="#companies-section" className="hover:text-blue-600 transition">Indian Unicorns & Tech</a></li>
                <li><a href="#companies-section" className="hover:text-blue-600 transition">Global Capability Centers</a></li>
                <li><a href="#companies-section" className="hover:text-blue-600 transition">High-Growth Seed-A</a></li>
                <li><a href="#companies-section" className="hover:text-blue-600 transition">B2B & Fintech Giants</a></li>
                <li><a href="#companies-section" className="hover:text-blue-600 transition">Consulting & Systems</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
                Candidate Services
              </h5>
              <ul className="space-y-2">
                <li><button onClick={() => navigate("/candidate")} className="hover:text-blue-600 transition text-left">ATS Resume Audit Score</button></li>
                <li><button onClick={() => navigate("/candidate")} className="hover:text-blue-600 transition text-left">Verified Assessment Badges</button></li>
                <li><button onClick={() => navigate("/candidate/radar")} className="hover:text-blue-600 transition text-left">Salary Benchmark Insights</button></li>
                <li><button onClick={() => navigate("/candidate")} className="hover:text-blue-600 transition text-left">Priority Talent Spotlight</button></li>
                <li><button onClick={() => navigate("/candidate/interviews")} className="hover:text-blue-600 transition text-left">Interview Preparation Suite</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
                Trust & Compliance
              </h5>
              <ul className="space-y-2">
                <li><button onClick={() => navigate("/admin/security")} className="hover:text-blue-600 transition text-left">DPDP Act 2023 Consent</button></li>
                <li><button onClick={() => navigate("/admin/security")} className="hover:text-blue-600 transition text-left">Applicant Data Retention</button></li>
                <li><button onClick={() => navigate("/admin/security")} className="hover:text-blue-600 transition text-left">Fraudulent Job Protection</button></li>
                <li><button onClick={() => navigate("/admin/security")} className="hover:text-blue-600 transition text-left">Information Security Policy</button></li>
                <li><button onClick={() => navigate("/admin/security")} className="hover:text-blue-600 transition text-left">Grievance Redressal Officer</button></li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-sm bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                <Sparkles size={11} className="text-white fill-white" />
              </div>
              <span className="font-bold text-slate-800">TalentNetwork</span>
              <span>© 2026 Talent Network India Technology Ltd. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-slate-600 transition">Privacy Policy</a>
              <span>·</span>
              <a href="#" className="hover:text-slate-600 transition">Terms of Service</a>
              <span>·</span>
              <a href="#" className="hover:text-slate-600 transition">Trust Center</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 10. RIGHT-SIDE SLIDE-OVER LOGIN / REGISTER DRAWER */}
      {authDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Dark Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setAuthDrawerOpen(false)}
          />

          {/* Slide-over panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col p-6 sm:p-8 relative overflow-y-auto z-10">
              {/* Close Button on top right */}
              <button
                type="button"
                onClick={() => setAuthDrawerOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
                aria-label="Close panel"
              >
                <X size={20} />
              </button>

              {/* Header: Login + Register for free link */}
              <div className="flex items-baseline justify-between mt-2 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {authMode === "login" ? "Login" : "Register"}
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    setAuthMode(authMode === "login" ? "register" : "login")
                  }
                  className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                >
                  {authMode === "login"
                    ? "Register for free"
                    : "Already registered? Login"}
                </button>
              </div>

              {selectedJobForApply && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <strong className="text-blue-900">{selectedJobForApply.company}</strong>
                    <span className="font-bold text-blue-700">{selectedJobForApply.salary}</span>
                  </div>
                  <div className="text-[11px] text-blue-700 truncate">
                    Applying for: {selectedJobForApply.title}
                  </div>
                </div>
              )}

              {/* Login / Register Form */}
              <form onSubmit={handleManualLogin} className="space-y-4">
                {/* Email / Username field */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Email ID / Username
                  </label>
                  <input
                    type="text"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter your active Email ID / Username"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>

                {/* Password / OTP field */}
                {!useOtpLogin ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-3.5 py-2.5 pr-14 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    {authMode === "login" && (
                      <div className="text-right mt-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setToast("Password reset link sent to registered email!")
                          }}
                          className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      One Time Password (OTP)
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={loginOtp}
                      onChange={(e) => setLoginOtp(e.target.value)}
                      placeholder="Enter 4 or 6-digit OTP"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition tracking-widest font-mono"
                    />
                    <div className="text-right mt-1.5">
                      <button
                        type="button"
                        onClick={() => setToast("New OTP sent via SMS & WhatsApp!")}
                        className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                      >
                        Resend OTP
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Button (rounded-full blue button as in screenshot) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition cursor-pointer"
                  >
                    {authMode === "login" ? "Login" : "Create Account"}
                  </button>
                </div>

                {/* Use OTP to Login */}
                {authMode === "login" && (
                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setUseOtpLogin(!useOtpLogin)}
                      className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      {useOtpLogin ? "Use Password to Login" : "Use OTP to Login"}
                    </button>
                  </div>
                )}

                {/* Divider with 'Or' */}
                <div className="relative my-4 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <span className="relative bg-white px-3 text-slate-400 text-xs font-medium">
                    Or
                  </span>
                </div>

                {/* Sign in with Google */}
                <button
                  type="button"
                  onClick={() => {
                    setAuthDrawerOpen(false)
                    setToast("Google Authentication verified! Signing in...")
                    setTimeout(() => navigate(authPersona === "candidate" ? "/candidate" : "/employer"), 500)
                  }}
                  className="w-full py-2.5 rounded-full border border-blue-400/80 hover:bg-blue-50/50 text-blue-600 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition shadow-2xs cursor-pointer"
                >
                  <GoogleIcon />
                  <span>Sign in with Google</span>
                </button>
              </form>

              {/* Quick Persona Demo Switcher for Evaluation */}
              <div className="mt-8 pt-5 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-2">
                  <span>1-Click Test Access:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAuthPersona("candidate")}
                      className={`px-2 py-0.5 rounded-sm transition ${
                        authPersona === "candidate"
                          ? "bg-blue-100 text-blue-700 font-bold"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Candidate
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => setAuthPersona("employer")}
                      className={`px-2 py-0.5 rounded-sm transition ${
                        authPersona === "employer"
                          ? "bg-emerald-100 text-emerald-800 font-bold"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Recruiter
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleOneClickCandidateLogin}
                    className="py-2 px-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-left text-xs transition cursor-pointer"
                  >
                    <div className="font-bold text-slate-800 truncate">Priya Sharma</div>
                    <div className="text-[10px] text-blue-600">Candidate Vault</div>
                  </button>
                  <button
                    type="button"
                    onClick={handleOneClickEmployerLogin}
                    className="py-2 px-2.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-lg text-left text-xs transition cursor-pointer"
                  >
                    <div className="font-bold text-slate-800 truncate">Nexora Labs</div>
                    <div className="text-[10px] text-emerald-600">Recruiter Console</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Toast Notification */}
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
