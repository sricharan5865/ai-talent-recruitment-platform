import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router"
import {
  Accessibility,
  Bell,
  Bookmark,
  BookmarkCheck,
  Building2,
  Calendar,
  CheckCircle2,
  Download,
  Filter,
  FolderKanban,
  HeartHandshake,
  MapPin,
  Plus,
  RotateCcw,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
  Star,
} from "lucide-react"
import {
  Badge,
  Button,
  Card,
  Input,
  Modal,
  Select,
} from "../components/ui"

export interface SearchCandidate {
  id: string
  name: string
  role: string
  currentCompany: string
  prevCompany: string
  expYears: number
  currentSalary: string
  expectedSalary: string
  location: string
  locality: string
  availability: string
  noticePeriodDays: number
  education: string
  ug: string
  pg?: string
  tier1: boolean
  skills: string[]
  matchScore: number
  verifiedPhone: boolean
  verifiedEmail: boolean
  hasResume: boolean
  activeDays: number
  gender: "Female" | "Male"
  careerBreak: boolean
  differentlyAbled?: string
  defenceBackground?: string
  workPermit: string[]
  category: "General" | "OBC" | "SC" | "ST" | "EWS"
  age: number
  department: string
  industry: string
  jobType: string
  employmentType: string
}

const mockCandidateDatabase: SearchCandidate[] = [
  {
    id: "cand-1",
    name: "Priya Sharma",
    role: "Senior Product Designer",
    currentCompany: "Razorpay",
    prevCompany: "Swiggy",
    expYears: 7,
    currentSalary: "₹24 LPA",
    expectedSalary: "₹34 LPA",
    location: "Bengaluru",
    locality: "Indiranagar",
    availability: "30 days",
    noticePeriodDays: 30,
    education: "B.Des, NID Ahmedabad (2019)",
    ug: "Specific UG qualification",
    pg: "No PG qualification",
    tier1: true,
    skills: ["Figma", "Design Systems", "Fintech UX", "User Research", "Agentic UI"],
    matchScore: 96,
    verifiedPhone: true,
    verifiedEmail: true,
    hasResume: true,
    activeDays: 2,
    gender: "Female",
    careerBreak: false,
    workPermit: ["India", "United States", "Canada"],
    category: "General",
    age: 29,
    department: "Design & UX",
    industry: "BFSI / Fintech",
    jobType: "Full-time",
    employmentType: "Permanent",
  },
  {
    id: "cand-2",
    name: "Arjun Mehta",
    role: "Staff Backend Architect",
    currentCompany: "CRED",
    prevCompany: "Flipkart",
    expYears: 9,
    currentSalary: "₹38 LPA",
    expectedSalary: "₹52 LPA",
    location: "Bengaluru",
    locality: "Bellandur",
    availability: "Immediate",
    noticePeriodDays: 0,
    education: "B.Tech Computer Science, IIT Bombay (2017)",
    ug: "Specific UG qualification",
    pg: "Any PG qualification",
    tier1: true,
    skills: ["Go", "Kubernetes", "Distributed Systems", "Kafka", "PostgreSQL"],
    matchScore: 94,
    verifiedPhone: true,
    verifiedEmail: true,
    hasResume: true,
    activeDays: 1,
    gender: "Male",
    careerBreak: false,
    workPermit: ["India", "Australia", "Singapore"],
    category: "General",
    age: 31,
    department: "Engineering & Technology",
    industry: "Software Product / SaaS",
    jobType: "Full-time",
    employmentType: "Permanent",
  },
  {
    id: "cand-3",
    name: "Dr. Ananya Nair",
    role: "Principal AI / ML Researcher",
    currentCompany: "Microsoft Research India",
    prevCompany: "IISc Bangalore",
    expYears: 8,
    currentSalary: "₹45 LPA",
    expectedSalary: "₹60 LPA",
    location: "Bengaluru",
    locality: "Whitefield",
    availability: "0–15 days",
    noticePeriodDays: 15,
    education: "Ph.D. AI/NLP, IISc Bangalore · B.Tech IIT Madras",
    ug: "Specific UG qualification",
    pg: "Specific PG qualification",
    tier1: true,
    skills: ["PyTorch", "LLM Reasoning", "Vector Embeddings", "Transformers", "CUDA"],
    matchScore: 92,
    verifiedPhone: true,
    verifiedEmail: true,
    hasResume: true,
    activeDays: 3,
    gender: "Female",
    careerBreak: true,
    workPermit: ["India", "United States", "Germany"],
    category: "General",
    age: 34,
    department: "Data Science & AI/ML",
    industry: "Software Product / SaaS",
    jobType: "Full-time",
    employmentType: "Permanent",
  },
  {
    id: "cand-4",
    name: "Rohan Deshmukh",
    role: "Lead Full Stack Engineer",
    currentCompany: "PhonePe",
    prevCompany: "Infosys",
    expYears: 6,
    currentSalary: "₹22 LPA",
    expectedSalary: "₹30 LPA",
    location: "Pune",
    locality: "Hinjawadi",
    availability: "Currently serving notice period",
    noticePeriodDays: 12,
    education: "B.E. Information Technology, COEP Pune (2020)",
    ug: "Specific UG qualification",
    pg: "No PG qualification",
    tier1: false,
    skills: ["React", "TypeScript", "Node.js", "Redis", "Micro-frontends"],
    matchScore: 91,
    verifiedPhone: true,
    verifiedEmail: true,
    hasResume: true,
    activeDays: 4,
    gender: "Male",
    careerBreak: false,
    workPermit: ["India"],
    category: "OBC",
    age: 28,
    department: "Engineering & Technology",
    industry: "BFSI / Fintech",
    jobType: "Full-time",
    employmentType: "Permanent",
  },
  {
    id: "cand-5",
    name: "Sneha Mukherjee",
    role: "Lead Product Manager",
    currentCompany: "Zepto",
    prevCompany: "Dunzo",
    expYears: 5,
    currentSalary: "₹26 LPA",
    expectedSalary: "₹35 LPA",
    location: "Mumbai",
    locality: "Bandra Kurla Complex (BKC)",
    availability: "1 month",
    noticePeriodDays: 30,
    education: "MBA, IIM Bangalore (2021) · B.Tech IIT Madras",
    ug: "Specific UG qualification",
    pg: "Specific PG qualification",
    tier1: true,
    skills: ["Product Strategy", "Growth Hacking", "Quick Commerce", "SQL", "A/B Testing"],
    matchScore: 88,
    verifiedPhone: true,
    verifiedEmail: true,
    hasResume: true,
    activeDays: 5,
    gender: "Female",
    careerBreak: true,
    workPermit: ["India", "United Arab Emirates"],
    category: "General",
    age: 29,
    department: "Product Management",
    industry: "E-commerce / Quick Commerce",
    jobType: "Full-time",
    employmentType: "Permanent",
  },
  {
    id: "cand-6",
    name: "Major Vikram Rathore (Retd.)",
    role: "VP Operations & Logistics Security",
    currentCompany: "Delhivery",
    prevCompany: "Indian Army (Corps of Signals)",
    expYears: 14,
    currentSalary: "₹32 LPA",
    expectedSalary: "₹45 LPA",
    location: "Delhi NCR",
    locality: "Cyber City, Gurugram",
    availability: "Immediate",
    noticePeriodDays: 0,
    education: "B.Tech, National Defence Academy (NDA) / JNU",
    ug: "Specific UG qualification",
    pg: "Any PG qualification",
    tier1: true,
    skills: ["Supply Chain", "Cross-functional Leadership", "Security Infrastructure", "ERP", "Crisis Ops"],
    matchScore: 89,
    verifiedPhone: true,
    verifiedEmail: true,
    hasResume: true,
    activeDays: 1,
    gender: "Male",
    careerBreak: false,
    defenceBackground: "Army",
    workPermit: ["India"],
    category: "General",
    age: 39,
    department: "Operations",
    industry: "Manufacturing & Automotive",
    jobType: "Full-time",
    employmentType: "Permanent",
  },
  {
    id: "cand-7",
    name: "Tanvi Saxena",
    role: "Senior UI/UX Accessibility Specialist",
    currentCompany: "Tata Consultancy Services",
    prevCompany: "Cognizant",
    expYears: 6,
    currentSalary: "₹18 LPA",
    expectedSalary: "₹25 LPA",
    location: "Hyderabad",
    locality: "HITEC City",
    availability: "2 months",
    noticePeriodDays: 60,
    education: "B.Tech IT, Osmania University",
    ug: "Specific UG qualification",
    pg: "No PG qualification",
    tier1: false,
    skills: ["WCAG 2.2", "Figma", "Screen Reader Testing", "Inclusive Design", "CSS3"],
    matchScore: 87,
    verifiedPhone: true,
    verifiedEmail: true,
    hasResume: true,
    activeDays: 7,
    gender: "Female",
    careerBreak: false,
    differentlyAbled: "Low Vision",
    workPermit: ["India", "Canada"],
    category: "General",
    age: 30,
    department: "Design & UX",
    industry: "IT Services & Consulting",
    jobType: "Full-time",
    employmentType: "Permanent",
  },
]

// 21 RPwD Act Categories recognized in India
const rPdwCategories = [
  "Blindness",
  "Low Vision",
  "Leprosy Cured persons",
  "Hearing Impairment (deaf and hard of hearing)",
  "Locomotor Disability",
  "Dwarfism",
  "Intellectual Disability",
  "Mental Illness",
  "Autism Spectrum Disorder",
  "Cerebral Palsy",
  "Muscular Dystrophy",
  "Chronic Neurological conditions",
  "Specific Learning Disabilities",
  "Multiple Sclerosis",
  "Speech and Language disability",
  "Thalassemia",
  "Hemophilia",
  "Sickle Cell disease",
  "Multiple Disabilities including deaf-blindness",
  "Acid Attack victim",
  "Parkinson's disease",
]

export function AdvancedSearchPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isSavedTab = searchParams.get("tab") === "saved"

  const [candidatesList, setCandidatesList] = useState(mockCandidateDatabase)
  const [toast, setToast] = useState("")

  // Active view tab: "Search Resumes" vs "Saved Searches"
  const [activeTab, setActiveTab] = useState<"search" | "saved">(isSavedTab ? "saved" : "search")

  // 1. Keyword search dropdowns & options
  const [searchKeywordIn, setSearchKeywordIn] = useState("Entire resume")
  const [mandatoryKeywords, setMandatoryKeywords] = useState("React, Figma")
  const [optionalKeywords, setOptionalKeywords] = useState("Design Systems, Microservices")
  const [excludedKeywords, setExcludedKeywords] = useState("Intern, Junior")
  const [booleanSyntax, setBooleanSyntax] = useState("(React OR Figma) AND Senior NOT Intern")
  const [isSemantic, setIsSemantic] = useState(true)

  // Search in Company & Designation
  const [searchCompanyScope, setSearchCompanyScope] = useState("Current company")
  const [companyKeyword, setCompanyKeyword] = useState("")
  const [searchDesignationScope, setSearchDesignationScope] = useState("Current designation")
  const [designationKeyword, setDesignationKeyword] = useState("")

  // 2. Notice Period / Availability to Join (Chips)
  const [noticePeriod, setNoticePeriod] = useState<string>("Any")

  // 3. Education dropdowns
  const [ugQualification, setUgQualification] = useState("Any UG qualification")
  const [pgQualification, setPgQualification] = useState("Any PG qualification")
  const [chooseCourse, setChooseCourse] = useState("All Courses")
  const [hasDoctorate, setHasDoctorate] = useState(false)
  const [tier1Only, setTier1Only] = useState(false)

  // 4. Diversity Hiring options
  const [genderFilter, setGenderFilter] = useState<"All candidates" | "Male candidates" | "Female candidates">("All candidates")
  const [womenReturningToWork, setWomenReturningToWork] = useState(false)
  const [differentlyAbledFilter, setDifferentlyAbledFilter] = useState("Any")
  const [defenceFilter, setDefenceFilter] = useState("Any")
  const [rpwdModalOpen, setRpwdModalOpen] = useState(false)
  const [selectedRpwdCategory, setSelectedRpwdCategory] = useState<string>("")

  // 5. Work permit
  const [workPermitCountry, setWorkPermitCountry] = useState("India")

  // 6. Additional Details
  const [candidateCategory, setCandidateCategory] = useState("All")
  const [minAge, setMinAge] = useState(21)
  const [maxAge, setMaxAge] = useState(55)
  const [department, setDepartment] = useState("All Departments")
  const [industry, setIndustry] = useState("All Industries")
  const [jobType, setJobType] = useState("All")
  const [employmentType, setEmploymentType] = useState("All")

  // Professional ranges
  const [minExp, setMinExp] = useState(3)
  const [maxExp, setMaxExp] = useState(15)
  const [minSalary, setMinSalary] = useState(12)
  const [maxSalary, setMaxSalary] = useState(60)
  const [selectedCity, setSelectedCity] = useState("All Cities")
  const [selectedLocality, setSelectedLocality] = useState("All Localities")

  // 7. Display Details
  const [activeInWindow, setActiveInWindow] = useState("30 days")
  const [candidateActivityType, setCandidateActivityType] = useState("All candidates")
  const [verifiedPhoneOnly, setVerifiedPhoneOnly] = useState(true)
  const [verifiedEmailOnly, setVerifiedEmailOnly] = useState(true)
  const [attachedResumeOnly, setAttachedResumeOnly] = useState(true)

  // 8. Search results dropdowns & controls
  const [sortBy, setSortBy] = useState("Relevance")
  const [pageSize, setPageSize] = useState("40")
  const [activeInMonths, setActiveInMonths] = useState("6 months")

  // Action Modals & Drawers
  const [selectedCand, setSelectedCand] = useState<SearchCandidate | null>(null)
  const [nviteModalCand, setNviteModalCand] = useState<SearchCandidate | null>(null)
  const [addToModalCand, setAddToModalCand] = useState<SearchCandidate | null>(null)
  const [addToTarget, setAddToTarget] = useState("Star SDE-3 & Leads")
  const [reminderModalCand, setReminderModalCand] = useState<SearchCandidate | null>(null)
  const [reminderDate, setReminderDate] = useState("Tomorrow (10:00 AM)")
  const [reminderNote, setReminderNote] = useState("Follow up regarding revised CTC expectations")
  const [saveSearchModalOpen, setSaveSearchModalOpen] = useState(false)
  const [savedSearchTitle, setSavedSearchTitle] = useState("Senior Product Designers · Bengaluru (Indiranagar)")

  // Saved Searches state
  const [savedSearches, setSavedSearches] = useState([
    {
      id: "ss-1",
      name: "Staff Backend Architect · Go / Distributed Systems",
      criteria: "Notice <= 30d · ₹35L-55L LPA · IIT/NIT · Bengaluru",
      savedOn: "2 days ago",
      resultsCount: 42,
      alertFrequency: "Daily Alert",
    },
    {
      id: "ss-2",
      name: "Senior Product Designers · Indiranagar / HSR",
      criteria: "Notice: Any · ₹20L-35L LPA · NID/IIT · Active in 7d",
      savedOn: "Last week",
      resultsCount: 28,
      alertFrequency: "Instant Alert",
    },
    {
      id: "ss-3",
      name: "Diversity Hiring · Women Returning to Work (Tech)",
      criteria: "Career Break: Yes · B.Tech · 5+ yrs exp · Pune/Hyd",
      savedOn: "2 weeks ago",
      resultsCount: 19,
      alertFrequency: "Weekly Digest",
    },
  ])

  // Filter execution
  const executeSearch = () => {
    let filtered = mockCandidateDatabase

    if (selectedCity !== "All Cities") {
      filtered = filtered.filter((c) => c.location === selectedCity)
    }

    if (noticePeriod !== "Any") {
      if (noticePeriod === "0–15 days") filtered = filtered.filter((c) => c.noticePeriodDays <= 15)
      else if (noticePeriod === "1 month") filtered = filtered.filter((c) => c.noticePeriodDays <= 30)
      else if (noticePeriod === "2 months") filtered = filtered.filter((c) => c.noticePeriodDays <= 60)
      else if (noticePeriod === "3 months") filtered = filtered.filter((c) => c.noticePeriodDays <= 90)
      else if (noticePeriod === "More than 3 months") filtered = filtered.filter((c) => c.noticePeriodDays > 90)
      else if (noticePeriod === "Currently serving notice period")
        filtered = filtered.filter((c) => c.availability.includes("notice"))
    }

    if (genderFilter === "Female candidates") {
      filtered = filtered.filter((c) => c.gender === "Female")
    } else if (genderFilter === "Male candidates") {
      filtered = filtered.filter((c) => c.gender === "Male")
    }

    if (womenReturningToWork) {
      filtered = filtered.filter((c) => c.careerBreak)
    }

    if (differentlyAbledFilter !== "Any") {
      filtered = filtered.filter((c) => c.differentlyAbled)
    }

    if (defenceFilter !== "Any") {
      filtered = filtered.filter((c) => c.defenceBackground === defenceFilter || c.defenceBackground)
    }

    if (tier1Only) {
      filtered = filtered.filter((c) => c.tier1)
    }

    if (department !== "All Departments") {
      filtered = filtered.filter((c) => c.department === department)
    }

    if (industry !== "All Industries") {
      filtered = filtered.filter((c) => c.industry === industry)
    }

    filtered = filtered.filter((c) => c.expYears >= minExp && c.expYears <= maxExp)

    // Sort order
    if (sortBy === "Salary: High to Low") {
      filtered = [...filtered].sort((a, b) => parseInt(b.expectedSalary.replace(/\D/g, "")) - parseInt(a.expectedSalary.replace(/\D/g, "")))
    } else if (sortBy === "Salary: Low to High") {
      filtered = [...filtered].sort((a, b) => parseInt(a.expectedSalary.replace(/\D/g, "")) - parseInt(b.expectedSalary.replace(/\D/g, "")))
    } else if (sortBy === "Experience: High to Low") {
      filtered = [...filtered].sort((a, b) => b.expYears - a.expYears)
    } else if (sortBy === "Notice Period: Shortest First") {
      filtered = [...filtered].sort((a, b) => a.noticePeriodDays - b.noticePeriodDays)
    }

    setCandidatesList(filtered)
    setToast(`Found ${filtered.length} matching candidates across Indian talent database`)
  }

  const resetAllFilters = () => {
    setSearchKeywordIn("Entire resume")
    setMandatoryKeywords("")
    setOptionalKeywords("")
    setExcludedKeywords("")
    setNoticePeriod("Any")
    setUgQualification("Any UG qualification")
    setPgQualification("Any PG qualification")
    setChooseCourse("All Courses")
    setGenderFilter("All candidates")
    setWomenReturningToWork(false)
    setDifferentlyAbledFilter("Any")
    setDefenceFilter("Any")
    setWorkPermitCountry("India")
    setCandidateCategory("All")
    setSelectedCity("All Cities")
    setDepartment("All Departments")
    setIndustry("All Industries")
    setCandidatesList(mockCandidateDatabase)
    setToast("All Resdex search filters reset to defaults")
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="eyebrow text-blue-700">Resdex Enterprise</span>
            <Badge tone="blue">1.2M+ Active Resumes</Badge>
            <Badge tone="purple">Naukri & Talent Network Database</Badge>
            <Badge tone="green">Verified DPDPA Consent</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
            Candidate Search & Resdex Sourcing
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-3xl">
            Execute precision Boolean and natural language queries across verified resumes with notice period chips, diversity hiring criteria, Indian educational degrees, and CTC in ₹ LPA.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            onClick={() => setSaveSearchModalOpen(true)}
            className="text-xs"
          >
            <BookmarkCheck size={14} /> Save Current Search
          </Button>
          <Button variant="secondary" onClick={resetAllFilters} className="text-xs">
            <RotateCcw size={14} /> Reset Filters
          </Button>
          <Button onClick={executeSearch} className="text-xs bg-blue-600 hover:bg-blue-700 text-white">
            <Search size={14} /> Search Resumes
          </Button>
        </div>
      </div>

      {/* Tabs Row: Search Resumes vs Saved Searches */}
      <div className="flex items-center gap-2 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab("search")}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition flex items-center gap-2 cursor-pointer ${
            activeTab === "search"
              ? "border-blue-600 text-blue-700"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <Search size={15} /> Search Resumes ({candidatesList.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("saved")}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition flex items-center gap-2 cursor-pointer ${
            activeTab === "saved"
              ? "border-blue-600 text-blue-700"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <Bookmark size={15} /> Manage Saved Searches ({savedSearches.length})
        </button>
      </div>

      {activeTab === "saved" ? (
        /* SAVED SEARCHES TAB */
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Your Saved Resdex Searches & Candidate Alerts</h2>
              <p className="text-xs text-gray-500">Automated daily and weekly alerts dispatched when new matching candidates register.</p>
            </div>
            <Button onClick={() => setSaveSearchModalOpen(true)} className="text-xs">
              <Plus size={14} /> New Search Alert
            </Button>
          </div>

          <div className="divide-y divide-gray-100">
            {savedSearches.map((s) => (
              <div key={s.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-sm text-gray-900">{s.name}</strong>
                    <Badge tone="blue">{s.resultsCount} matching profiles</Badge>
                    <Badge tone="purple">{s.alertFrequency}</Badge>
                  </div>
                  <p className="text-xs text-gray-600 font-mono bg-gray-50 p-1.5 rounded inline-block">
                    {s.criteria}
                  </p>
                  <span className="text-[11px] text-gray-400 block">Saved {s.savedOn} · Auto-refresh active</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    className="text-xs h-8"
                    onClick={() => {
                      setActiveTab("search")
                      setToast(`Loaded search: ${s.name}`)
                    }}
                  >
                    Run Search &rarr;
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-xs h-8 text-rose-600"
                    onClick={() => {
                      setSavedSearches(savedSearches.filter((item) => item.id !== s.id))
                      setToast("Saved search removed")
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        /* MAIN SEARCH RESUMES INTERFACE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT FILTER ACCORDION / CONTROLS (4.5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="p-5 space-y-5 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={17} className="text-blue-600" />
                  <h2 className="font-bold text-sm text-gray-900">Resdex Search Filters</h2>
                </div>
                <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline" onClick={resetAllFilters}>
                  Clear All
                </span>
              </div>

              {/* 1. KEYWORD & SEARCH SCOPE */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    1. Search Keywords
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-purple-700 font-semibold">
                    <Sparkles size={12} /> Semantic AI
                  </div>
                </div>

                <label className="text-xs font-semibold text-gray-700 block">
                  Search keyword in
                  <Select
                    value={searchKeywordIn}
                    onChange={(e) => setSearchKeywordIn(e.target.value)}
                    className="mt-1 text-xs h-9 bg-white"
                  >
                    <option value="Entire resume">Entire resume (Naukri Standard)</option>
                    <option value="Key skills only">Key skills only</option>
                    <option value="Resume title">Resume title / Headline</option>
                    <option value="Work summary">Work summary / Executive profile</option>
                  </Select>
                </label>

                <label className="text-xs font-semibold text-gray-700 block">
                  Mandatory Keywords (AND)
                  <Input
                    value={mandatoryKeywords}
                    onChange={(e) => setMandatoryKeywords(e.target.value)}
                    placeholder="e.g. React, Next.js, Figma"
                    className="mt-1 text-xs"
                  />
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <label className="text-xs font-semibold text-gray-700 block">
                    Optional (OR)
                    <Input
                      value={optionalKeywords}
                      onChange={(e) => setOptionalKeywords(e.target.value)}
                      placeholder="e.g. Fintech, AWS"
                      className="mt-1 text-xs"
                    />
                  </label>
                  <label className="text-xs font-semibold text-gray-700 block">
                    Excluded (NOT)
                    <Input
                      value={excludedKeywords}
                      onChange={(e) => setExcludedKeywords(e.target.value)}
                      placeholder="e.g. Intern, Contractor"
                      className="mt-1 text-xs"
                    />
                  </label>
                </div>

                <label className="text-xs font-semibold text-gray-700 block">
                  Boolean Query Syntax
                  <Input
                    value={booleanSyntax}
                    onChange={(e) => setBooleanSyntax(e.target.value)}
                    className="mt-1 text-xs font-mono bg-gray-50"
                  />
                </label>
              </div>

              {/* 2. COMPANY & DESIGNATION SCOPE */}
              <div className="pt-3 border-t border-gray-100 space-y-3">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                  2. Company & Designation
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <label className="text-xs font-semibold text-gray-700 block">
                    Search in Company
                    <Select
                      value={searchCompanyScope}
                      onChange={(e) => setSearchCompanyScope(e.target.value)}
                      className="mt-1 text-xs h-8 bg-white"
                    >
                      <option>Current company</option>
                      <option>Previous company</option>
                      <option>Current/Previous company</option>
                    </Select>
                  </label>
                  <label className="text-xs font-semibold text-gray-700 block">
                    Company Name
                    <Input
                      value={companyKeyword}
                      onChange={(e) => setCompanyKeyword(e.target.value)}
                      placeholder="e.g. Razorpay, CRED"
                      className="mt-1 text-xs h-8"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <label className="text-xs font-semibold text-gray-700 block">
                    Search in Designation
                    <Select
                      value={searchDesignationScope}
                      onChange={(e) => setSearchDesignationScope(e.target.value)}
                      className="mt-1 text-xs h-8 bg-white"
                    >
                      <option>Current designation</option>
                      <option>Previous designation</option>
                      <option>Any designation</option>
                    </Select>
                  </label>
                  <label className="text-xs font-semibold text-gray-700 block">
                    Designation Title
                    <Input
                      value={designationKeyword}
                      onChange={(e) => setDesignationKeyword(e.target.value)}
                      placeholder="e.g. Lead, Architect, VP"
                      className="mt-1 text-xs h-8"
                    />
                  </label>
                </div>
              </div>

              {/* 3. NOTICE PERIOD / AVAILABILITY (SELECTABLE CHIPS) */}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    3. Notice Period / Availability
                  </span>
                  <span className="text-xs text-blue-600 font-semibold">{noticePeriod}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Any",
                    "0–15 days",
                    "1 month",
                    "2 months",
                    "3 months",
                    "More than 3 months",
                    "Currently serving notice period",
                  ].map((np) => (
                    <button
                      key={np}
                      type="button"
                      onClick={() => setNoticePeriod(np)}
                      className={`text-xs px-2.5 py-1 rounded-full border transition cursor-pointer font-medium ${
                        noticePeriod === np
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                      }`}
                    >
                      {np}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. EDUCATION DROPDOWNS */}
              <div className="pt-3 border-t border-gray-100 space-y-2.5">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                  4. Education & Qualifications
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <label className="text-xs font-semibold text-gray-700 block">
                    UG Qualification
                    <Select
                      value={ugQualification}
                      onChange={(e) => setUgQualification(e.target.value)}
                      className="mt-1 text-xs h-8 bg-white"
                    >
                      <option>Any UG qualification</option>
                      <option>Specific UG qualification</option>
                      <option>No UG qualification</option>
                    </Select>
                  </label>

                  <label className="text-xs font-semibold text-gray-700 block">
                    PG Qualification
                    <Select
                      value={pgQualification}
                      onChange={(e) => setPgQualification(e.target.value)}
                      className="mt-1 text-xs h-8 bg-white"
                    >
                      <option>Any PG qualification</option>
                      <option>Specific PG qualification</option>
                      <option>No PG qualification</option>
                    </Select>
                  </label>
                </div>

                <label className="text-xs font-semibold text-gray-700 block">
                  Choose Course
                  <Select
                    value={chooseCourse}
                    onChange={(e) => setChooseCourse(e.target.value)}
                    className="mt-1 text-xs h-8 bg-white"
                  >
                    <option>All Courses</option>
                    <option>Recent Courses</option>
                    <option>Any Engineering</option>
                    <option>Any Computers (Degree/Diploma)</option>
                    <option>Any Management (MBA / PGDM)</option>
                    <option>Any Hotel-Management</option>
                    <option>Any Medical</option>
                  </Select>
                </label>

                <div className="space-y-1.5 pt-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                    <input
                      type="checkbox"
                      checked={hasDoctorate}
                      onChange={(e) => setHasDoctorate(e.target.checked)}
                      className="rounded text-blue-600 accent-blue-600"
                    />
                    <span>Add PPG / Doctorate Qualification (Ph.D / M.Phil)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                    <input
                      type="checkbox"
                      checked={tier1Only}
                      onChange={(e) => setTier1Only(e.target.checked)}
                      className="rounded text-blue-600 accent-blue-600"
                    />
                    <span>Tier-1 Indian Institutes (IIT / NIT / IIM / BITS / NID)</span>
                  </label>
                </div>
              </div>

              {/* 5. DIVERSITY HIRING OPTIONS */}
              <div className="pt-3 border-t border-gray-100 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                    <HeartHandshake size={14} className="text-rose-500" /> 5. Diversity Hiring
                  </span>
                  <Badge tone="purple">Inclusion & DE&I</Badge>
                </div>

                <label className="text-xs font-semibold text-gray-700 block">
                  Gender
                  <Select
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value as typeof genderFilter)}
                    className="mt-1 text-xs h-8 bg-white"
                  >
                    <option>All candidates</option>
                    <option>Female candidates</option>
                    <option>Male candidates</option>
                  </Select>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-800 bg-rose-50/50 p-2 border border-rose-200/60 rounded-lg">
                  <input
                    type="checkbox"
                    checked={womenReturningToWork}
                    onChange={(e) => setWomenReturningToWork(e.target.checked)}
                    className="rounded text-rose-600 accent-rose-600"
                  />
                  <span>
                    <strong>Women returning to work</strong> (Candidates with career break)
                  </span>
                </label>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700">Differently-abled</span>
                    <button
                      type="button"
                      onClick={() => setRpwdModalOpen(true)}
                      className="text-blue-600 text-[11px] font-bold hover:underline cursor-pointer"
                    >
                      +17 RPwD categories &rarr;
                    </button>
                  </div>
                  <Select
                    value={differentlyAbledFilter}
                    onChange={(e) => setDifferentlyAbledFilter(e.target.value)}
                    className="text-xs h-8 bg-white"
                  >
                    <option>Any</option>
                    <option>Blindness</option>
                    <option>Low Vision</option>
                    <option>Hearing Impairment</option>
                    <option>Speech and Language Disability</option>
                    <option>Locomotor Disability</option>
                    {selectedRpwdCategory && <option>{selectedRpwdCategory}</option>}
                  </Select>
                </div>

                <label className="text-xs font-semibold text-gray-700 block">
                  Defence background personnel
                  <Select
                    value={defenceFilter}
                    onChange={(e) => setDefenceFilter(e.target.value)}
                    className="mt-1 text-xs h-8 bg-white"
                  >
                    <option>Any</option>
                    <option>Army</option>
                    <option>Navy</option>
                    <option>Air Force</option>
                    <option>Other Paramilitary Forces (BSF, CRPF, CISF, ITBP)</option>
                  </Select>
                </label>
              </div>

              {/* 6. WORK PERMIT & LOCATION */}
              <div className="pt-3 border-t border-gray-100 space-y-2.5">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                  6. Work Permit & Location
                </span>

                <label className="text-xs font-semibold text-gray-700 block">
                  Work Permit / Country Multi-Select
                  <Select
                    value={workPermitCountry}
                    onChange={(e) => setWorkPermitCountry(e.target.value)}
                    className="mt-1 text-xs h-8 bg-white"
                  >
                    <option>India (Citizen / OCI)</option>
                    <option>United States (H1B / Green Card / Citizen)</option>
                    <option>Australia (PR / TSS 482)</option>
                    <option>Bahrain</option>
                    <option>Bangladesh</option>
                    <option>Belgium</option>
                    <option>Canada (PR / Work Permit)</option>
                    <option>Germany (EU Blue Card)</option>
                    <option>Singapore (EP / S-Pass)</option>
                    <option>United Arab Emirates (Golden Visa)</option>
                    <option>United Kingdom (Skilled Worker)</option>
                    <option>Saudi Arabia</option>
                    <option>Qatar</option>
                    <option>New Zealand</option>
                  </Select>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <label className="text-xs font-semibold text-gray-700 block">
                    City
                    <Select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="mt-1 text-xs h-8 bg-white"
                    >
                      <option>All Cities</option>
                      <option>Bengaluru</option>
                      <option>Mumbai</option>
                      <option>Delhi NCR</option>
                      <option>Hyderabad</option>
                      <option>Pune</option>
                      <option>Chennai</option>
                    </Select>
                  </label>

                  <label className="text-xs font-semibold text-gray-700 block">
                    Locality
                    <Select
                      value={selectedLocality}
                      onChange={(e) => setSelectedLocality(e.target.value)}
                      className="mt-1 text-xs h-8 bg-white"
                    >
                      <option>All Localities</option>
                      <option>Indiranagar</option>
                      <option>HSR Layout</option>
                      <option>Bellandur / ORR</option>
                      <option>Koramangala</option>
                      <option>Whitefield</option>
                    </Select>
                  </label>
                </div>
              </div>

              {/* 7. ADDITIONAL DETAILS (CATEGORY, AGE, JOB TYPE) */}
              <div className="pt-3 border-t border-gray-100 space-y-2.5">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                  7. Additional Details
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <label className="text-xs font-semibold text-gray-700 block">
                    Candidate Category
                    <Select
                      value={candidateCategory}
                      onChange={(e) => setCandidateCategory(e.target.value)}
                      className="mt-1 text-xs h-8 bg-white"
                    >
                      <option>All Categories</option>
                      <option>General</option>
                      <option>OBC (Non-Creamy)</option>
                      <option>SC</option>
                      <option>ST</option>
                      <option>EWS</option>
                    </Select>
                  </label>

                  <div>
                    <span className="text-xs font-semibold text-gray-700 block mb-1">
                      Candidate Age (Yrs)
                    </span>
                    <div className="flex items-center gap-1">
                      <Input
                        type="number"
                        min={18}
                        max={65}
                        value={minAge}
                        onChange={(e) => setMinAge(Number(e.target.value))}
                        className="text-xs h-8"
                        placeholder="Min"
                      />
                      <span className="text-gray-400">-</span>
                      <Input
                        type="number"
                        min={18}
                        max={65}
                        value={maxAge}
                        onChange={(e) => setMaxAge(Number(e.target.value))}
                        className="text-xs h-8"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <label className="text-xs font-semibold text-gray-700 block">
                    Job Type
                    <Select
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      className="mt-1 text-xs h-8 bg-white"
                    >
                      <option>All Types</option>
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                      <option>Freelance</option>
                    </Select>
                  </label>

                  <label className="text-xs font-semibold text-gray-700 block">
                    Employment Type
                    <Select
                      value={employmentType}
                      onChange={(e) => setEmploymentType(e.target.value)}
                      className="mt-1 text-xs h-8 bg-white"
                    >
                      <option>All</option>
                      <option>Permanent</option>
                      <option>Contractual / C2H</option>
                      <option>Third-party Payroll</option>
                    </Select>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <label className="text-xs font-semibold text-gray-700 block">
                    Department
                    <Select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="mt-1 text-xs h-8 bg-white"
                    >
                      <option>All Departments</option>
                      <option>Engineering & Technology</option>
                      <option>Product Management</option>
                      <option>Design & UX</option>
                      <option>Data Science & AI/ML</option>
                      <option>Operations</option>
                    </Select>
                  </label>

                  <label className="text-xs font-semibold text-gray-700 block">
                    Industry
                    <Select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="mt-1 text-xs h-8 bg-white"
                    >
                      <option>All Industries</option>
                      <option>Software Product / SaaS</option>
                      <option>BFSI / Fintech</option>
                      <option>E-commerce / Quick Commerce</option>
                      <option>IT Services & Consulting</option>
                      <option>Manufacturing & Automotive</option>
                    </Select>
                  </label>
                </div>
              </div>

              {/* 8. DISPLAY DETAILS (ACTIVITY & VERIFICATION) */}
              <div className="pt-3 border-t border-gray-100 space-y-2.5">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                  8. Display Details
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <label className="text-xs font-semibold text-gray-700 block">
                    Active in
                    <Select
                      value={activeInWindow}
                      onChange={(e) => setActiveInWindow(e.target.value)}
                      className="mt-1 text-xs h-8 bg-white"
                    >
                      <option>3 days</option>
                      <option>7 days</option>
                      <option>15 days</option>
                      <option>30 days</option>
                      <option>2 months</option>
                      <option>3 months</option>
                      <option>6 months</option>
                    </Select>
                  </label>

                  <label className="text-xs font-semibold text-gray-700 block">
                    Show candidates
                    <Select
                      value={candidateActivityType}
                      onChange={(e) => setCandidateActivityType(e.target.value)}
                      className="mt-1 text-xs h-8 bg-white"
                    >
                      <option>All candidates</option>
                      <option>New registrations</option>
                      <option>Modified candidates</option>
                    </Select>
                  </label>
                </div>

                <div className="space-y-1.5 pt-1 text-xs text-gray-700">
                  <span className="font-bold block text-gray-800">Show only</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={verifiedPhoneOnly}
                      onChange={(e) => setVerifiedPhoneOnly(e.target.checked)}
                      className="rounded text-blue-600 accent-blue-600"
                    />
                    <span>Verified phone number (DPDP Consented)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={verifiedEmailOnly}
                      onChange={(e) => setVerifiedEmailOnly(e.target.checked)}
                      className="rounded text-blue-600 accent-blue-600"
                    />
                    <span>Verified corporate/personal email ID</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={attachedResumeOnly}
                      onChange={(e) => setAttachedResumeOnly(e.target.checked)}
                      className="rounded text-blue-600 accent-blue-600"
                    />
                    <span>Attached resume (PDF / DOCX verified)</span>
                  </label>
                </div>
              </div>

              <Button
                className="w-full text-xs h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold"
                onClick={executeSearch}
              >
                <Search size={15} /> Apply Resdex Filters ({candidatesList.length})
              </Button>
            </Card>
          </div>

          {/* RIGHT RESULTS COLUMN WITH CONTROLS (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* 8. SEARCH RESULTS CONTROLS BAR */}
            <div className="bg-white p-4 border border-gray-200 rounded-xl space-y-3 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-extrabold text-gray-900 text-base flex items-center gap-2">
                    <span>{candidatesList.length} Verified Candidates</span>
                    <Badge tone="green">Resdex Active</Badge>
                  </h3>
                  <p className="text-xs text-gray-500">
                    Showing candidates matching keywords in {searchKeywordIn} · Notice: {noticePeriod}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    className="text-xs h-8"
                    onClick={() => setToast("Exporting shortlisted candidate ledger to CSV")}
                  >
                    <Download size={13} /> Export
                  </Button>
                  <Button
                    variant="secondary"
                    className="text-xs h-8 text-blue-600 border-blue-200"
                    onClick={() => setSaveSearchModalOpen(true)}
                  >
                    <BookmarkCheck size={13} /> Save Search
                  </Button>
                </div>
              </div>

              {/* SEARCH RESULTS CONTROLS ROW */}
              <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <label className="flex items-center gap-1.5 font-medium text-gray-600">
                    <span>Sort by:</span>
                    <Select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value)
                        executeSearch()
                      }}
                      className="h-8 text-xs bg-white w-40"
                    >
                      <option>Relevance</option>
                      <option>Recency (Active Date)</option>
                      <option>Salary: High to Low</option>
                      <option>Salary: Low to High</option>
                      <option>Experience: High to Low</option>
                      <option>Notice Period: Shortest First</option>
                    </Select>
                  </label>

                  <label className="flex items-center gap-1.5 font-medium text-gray-600">
                    <span>Show:</span>
                    <Select
                      value={pageSize}
                      onChange={(e) => setPageSize(e.target.value)}
                      className="h-8 text-xs bg-white w-18"
                    >
                      <option>20</option>
                      <option>40</option>
                      <option>60</option>
                      <option>100</option>
                    </Select>
                  </label>

                  <label className="flex items-center gap-1.5 font-medium text-gray-600">
                    <span>Active in:</span>
                    <Select
                      value={activeInMonths}
                      onChange={(e) => setActiveInMonths(e.target.value)}
                      className="h-8 text-xs bg-white w-28"
                    >
                      <option>6 months</option>
                      <option>3 months</option>
                      <option>1 month</option>
                      <option>15 days</option>
                    </Select>
                  </label>
                </div>

                <div className="text-gray-400 text-[11px]">
                  Showing 1-{candidatesList.length} of {candidatesList.length}
                </div>
              </div>
            </div>

            {/* CANDIDATE CARDS LIST */}
            <div className="space-y-3">
              {candidatesList.map((cand) => (
                <Card
                  key={cand.id}
                  className="p-5 hover:border-blue-400 hover:shadow-md transition cursor-pointer relative"
                  onClick={() => setSelectedCand(cand)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-gray-900 hover:text-blue-600 transition">
                          {cand.name}
                        </h4>
                        {cand.tier1 && <Badge tone="purple">Tier-1 Institute</Badge>}
                        <Badge
                          tone={
                            cand.noticePeriodDays === 0
                              ? "green"
                              : cand.noticePeriodDays <= 30
                              ? "blue"
                              : "neutral"
                          }
                        >
                          Notice: {cand.availability}
                        </Badge>
                        {cand.careerBreak && <Badge tone="amber">Career Break Returnee</Badge>}
                        {cand.differentlyAbled && <Badge tone="purple">{cand.differentlyAbled}</Badge>}
                        {cand.defenceBackground && <Badge tone="neutral">Ex-{cand.defenceBackground}</Badge>}
                        <span className="text-xs text-gray-400">Active {cand.activeDays}d ago</span>
                      </div>

                      <div className="flex items-center gap-2.5 text-xs text-gray-600 flex-wrap">
                        <span className="font-semibold text-gray-900">{cand.role}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Building2 size={13} className="text-gray-400" /> {cand.currentCompany} (ex-{cand.prevCompany})
                        </span>
                        <span>·</span>
                        <span>{cand.expYears} yrs exp</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={13} className="text-gray-400" /> {cand.locality}, {cand.location}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500">
                        🎓 {cand.education}
                      </p>
                    </div>

                    <div className="text-right sm:flex-shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-1">
                      <div className="flex items-center gap-1 text-purple-700 font-extrabold text-base">
                        <Sparkles size={14} /> {cand.matchScore}% Match
                      </div>
                      <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {cand.expectedSalary} Expected
                      </div>
                      <span className="text-[11px] text-gray-400 font-medium">
                        Current: {cand.currentSalary}
                      </span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex flex-wrap gap-1.5">
                      {cand.skills.map((sk) => (
                        <span
                          key={sk}
                          className="text-xs bg-gray-50 border border-gray-200 text-gray-700 px-2 py-0.5 rounded-md font-medium"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>

                    {/* ACTIONS ROW: ADD TO, SET REMINDER, NVITE */}
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="secondary"
                        className="h-8 text-xs px-2.5"
                        onClick={() => setAddToModalCand(cand)}
                      >
                        <FolderKanban size={13} /> Add to...
                      </Button>
                      <Button
                        variant="secondary"
                        className="h-8 text-xs px-2.5"
                        onClick={() => setReminderModalCand(cand)}
                      >
                        <Bell size={13} /> Set Reminder
                      </Button>
                      <Button
                        className="h-8 text-xs px-3 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => setNviteModalCand(cand)}
                      >
                        <Send size={13} /> Send NVite
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: ADD TO FOLDER / TALENT POOL */}
      {addToModalCand && (
        <Modal
          open={Boolean(addToModalCand)}
          onClose={() => setAddToModalCand(null)}
          title={`Add ${addToModalCand.name} to Folder or Talent Pool`}
          footer={
            <>
              <Button variant="secondary" onClick={() => setAddToModalCand(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const cName = addToModalCand.name
                  setAddToModalCand(null)
                  setToast(`Added ${cName} to "${addToTarget}"`)
                }}
              >
                Confirm Add
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-xs text-gray-700">
            <p>Select target folder, talent pool, or active job pipeline:</p>
            <Select
              value={addToTarget}
              onChange={(e) => setAddToTarget(e.target.value)}
              className="text-xs"
            >
              <optgroup label="Candidate Folders">
                <option value="Star SDE-3 & Leads">📁 Folder: Star SDE-3 & Leads</option>
                <option value="Fintech UX Specialists">📁 Folder: Fintech UX Specialists</option>
                <option value="Immediate Joiners (Q4)">📁 Folder: Immediate Joiners (Q4)</option>
              </optgroup>
              <optgroup label="Talent Pools">
                <option value="Top 1% AI Engineers">⭐ Talent Pool: Top 1% AI Engineers</option>
                <option value="Diversity & Returning Women">⭐ Talent Pool: Diversity & Returning Women</option>
              </optgroup>
              <optgroup label="Job Pipelines">
                <option value="Senior Product Designer (Active Requisition)">🎯 Pipeline: Senior Product Designer</option>
                <option value="Staff Backend Architect (Active Requisition)">🎯 Pipeline: Staff Backend Architect</option>
              </optgroup>
            </Select>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="font-semibold text-gray-800">Recruiter Note (Optional):</span>
              <textarea
                placeholder="Add internal hiring team evaluation notes..."
                className="w-full mt-1.5 p-2 bg-white border border-gray-200 rounded text-xs h-16 outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL 2: SET REMINDER */}
      {reminderModalCand && (
        <Modal
          open={Boolean(reminderModalCand)}
          onClose={() => setReminderModalCand(null)}
          title={`Set Recruiter Follow-up Reminder · ${reminderModalCand.name}`}
          footer={
            <>
              <Button variant="secondary" onClick={() => setReminderModalCand(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const cName = reminderModalCand.name
                  setReminderModalCand(null)
                  setToast(`Reminder scheduled for ${cName} on ${reminderDate}`)
                }}
              >
                Set Reminder
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-xs text-gray-700">
            <div>
              <span className="font-bold text-gray-800 block mb-1">Reminder Schedule</span>
              <Select
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
                className="text-xs"
              >
                <option>Tomorrow (10:00 AM)</option>
                <option>In 3 days</option>
                <option>In 1 week</option>
                <option>Post-Interview Follow-up (Friday)</option>
                <option>Custom Date & Time</option>
              </Select>
            </div>
            <div>
              <span className="font-bold text-gray-800 block mb-1">Reminder Note</span>
              <textarea
                value={reminderNote}
                onChange={(e) => setReminderNote(e.target.value)}
                className="w-full p-2 bg-white border border-gray-200 rounded text-xs h-20 outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
              <input type="checkbox" defaultChecked className="rounded text-blue-600 accent-blue-600" />
              <span>Send browser notification & sync with Google Calendar</span>
            </label>
          </div>
        </Modal>
      )}

      {/* MODAL 3: +17 RPWD ACT DIFFERENTLY-ABLED CATEGORIES */}
      {rpwdModalOpen && (
        <Modal
          open={rpwdModalOpen}
          onClose={() => setRpwdModalOpen(false)}
          title="Affirmative Action · 21 RPwD Act Categories"
          footer={
            <Button onClick={() => setRpwdModalOpen(false)}>Done</Button>
          }
        >
          <div className="space-y-3 text-xs text-gray-700 max-h-96 overflow-y-auto pr-1">
            <p className="text-gray-500">
              Select recognized categories under the Rights of Persons with Disabilities (RPwD) Act, 2016 for affirmative inclusion:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {rPdwCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedRpwdCategory(cat)
                    setDifferentlyAbledFilter(cat)
                    setRpwdModalOpen(false)
                    setToast(`Filter set to: ${cat}`)
                  }}
                  className={`text-left p-2 rounded-lg border text-xs cursor-pointer transition ${
                    differentlyAbledFilter === cat
                      ? "bg-purple-50 border-purple-400 font-bold text-purple-900"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL 4: SAVE SEARCH QUERY */}
      {saveSearchModalOpen && (
        <Modal
          open={saveSearchModalOpen}
          onClose={() => setSaveSearchModalOpen(false)}
          title="Save Resdex Search & Setup Automated Alerts"
          footer={
            <>
              <Button variant="secondary" onClick={() => setSaveSearchModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setSavedSearches([
                    {
                      id: `ss-${Date.now()}`,
                      name: savedSearchTitle,
                      criteria: `Keywords: ${mandatoryKeywords || "Any"} · Notice: ${noticePeriod} · Loc: ${selectedCity}`,
                      savedOn: "Just now",
                      resultsCount: candidatesList.length,
                      alertFrequency: "Daily Alert",
                    },
                    ...savedSearches,
                  ])
                  setSaveSearchModalOpen(false)
                  setToast(`Saved search "${savedSearchTitle}" with automated daily alerts!`)
                }}
              >
                Save Search
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-xs text-gray-700">
            <div>
              <span className="font-bold text-gray-800 block mb-1">Search Name / Requisition Label</span>
              <Input
                value={savedSearchTitle}
                onChange={(e) => setSavedSearchTitle(e.target.value)}
                className="text-xs"
              />
            </div>
            <div>
              <span className="font-bold text-gray-800 block mb-1">Candidate Alert Frequency</span>
              <Select defaultValue="Daily Alert" className="text-xs">
                <option>Instant Alert (WhatsApp & Email as soon as candidate registers)</option>
                <option>Daily Digest (Every morning 9:00 AM)</option>
                <option>Weekly Summary</option>
              </Select>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
              <strong className="block text-gray-900 mb-1">Captured Criteria:</strong>
              <div>Keywords: {mandatoryKeywords || "None"}</div>
              <div>Notice: {noticePeriod} | Location: {selectedCity} | Scope: {searchKeywordIn}</div>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL 5: SEND NVITE OUTREACH */}
      {nviteModalCand && (
        <Modal
          open={Boolean(nviteModalCand)}
          onClose={() => setNviteModalCand(null)}
          title={`NVite · Outreach to ${nviteModalCand.name}`}
          footer={
            <>
              <Button variant="secondary" onClick={() => setNviteModalCand(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const name = nviteModalCand.name
                  setNviteModalCand(null)
                  setToast(`NVite invitation dispatched to ${name} via WhatsApp & Email!`)
                }}
              >
                <Send size={14} /> Send NVite Invitation
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-xs text-gray-700">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
              <div>
                <strong className="text-sm font-bold text-blue-900 block">{nviteModalCand.name}</strong>
                <span className="text-gray-600">{nviteModalCand.role} @ {nviteModalCand.currentCompany}</span>
              </div>
              <Badge tone="purple">{nviteModalCand.matchScore}% Match</Badge>
            </div>

            <div>
              <span className="font-bold text-gray-800 block mb-1.5">Communication Channels</span>
              <div className="flex gap-2 flex-wrap">
                <Badge tone="green">WhatsApp Business API</Badge>
                <Badge tone="blue">Executive Email</Badge>
                <Badge tone="purple">Talent Network In-App</Badge>
              </div>
            </div>

            <div>
              <span className="font-bold text-gray-800 block mb-1">Candidate Response Actions</span>
              <div className="flex gap-2">
                <div className="p-2 border border-emerald-300 bg-emerald-50 text-emerald-800 rounded font-semibold text-xs flex-1 text-center">
                  ✅ Yes, I am interested
                </div>
                <div className="p-2 border border-gray-300 bg-gray-50 text-gray-600 rounded font-semibold text-xs flex-1 text-center">
                  ❌ No, I don't require it
                </div>
              </div>
            </div>

            <div>
              <span className="font-bold text-gray-800 block mb-1">Personalized NVite Preview</span>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl font-sans text-xs leading-relaxed space-y-2 text-gray-800">
                <p>
                  "Hi {nviteModalCand.name.split(" ")[0]}, we noticed your strong work in {nviteModalCand.skills.slice(0, 2).join(" & ")} at {nviteModalCand.currentCompany}. Nexora Labs has an open {nviteModalCand.role} in {nviteModalCand.location} with compensation matching your expectations ({nviteModalCand.expectedSalary})."
                </p>
                <p>
                  "Would you be open to an exploratory 15-min chat with our Engineering Leadership?"
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL 6: CANDIDATE DETAIL DRAWER */}
      {selectedCand && (
        <Modal
          open={Boolean(selectedCand)}
          onClose={() => setSelectedCand(null)}
          title={`${selectedCand.name} · Verified Career Passport`}
          footer={
            <>
              <Button variant="secondary" onClick={() => setSelectedCand(null)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  const c = selectedCand
                  setSelectedCand(null)
                  setNviteModalCand(c)
                }}
              >
                <Send size={14} /> Send NVite
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-xs text-gray-700">
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
              <div>
                <strong className="text-sm font-bold text-gray-900 block">{selectedCand.role}</strong>
                <span className="text-gray-600">
                  {selectedCand.currentCompany} · {selectedCand.locality}, {selectedCand.location}
                </span>
              </div>
              <Badge tone="green">{selectedCand.expectedSalary}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 bg-white border border-gray-200 rounded-xl">
              <div>Notice Period: <strong>{selectedCand.availability}</strong></div>
              <div>Total Experience: <strong>{selectedCand.expYears} years</strong></div>
              <div>Current CTC: <strong>{selectedCand.currentSalary}</strong></div>
              <div>Education: <strong>{selectedCand.education}</strong></div>
              <div>Gender: <strong>{selectedCand.gender}</strong></div>
              <div>Category: <strong>{selectedCand.category}</strong></div>
              <div>Work Permits: <strong>{selectedCand.workPermit.join(", ")}</strong></div>
              <div>Verification: <strong className="text-emerald-700">Phone & Email Verified</strong></div>
            </div>

            <div>
              <strong className="block text-gray-900 mb-1.5 font-bold">Verified Skills:</strong>
              <div className="flex flex-wrap gap-1.5">
                {selectedCand.skills.map((sk) => (
                  <Badge key={sk} tone="purple">{sk}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Toast Notification */}
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
