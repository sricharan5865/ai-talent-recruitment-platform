import { useState } from "react"
import { useNavigate } from "react-router"
import {
  ArrowRight,
  Bookmark,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Download,
  ExternalLink,
  Eye,
  Filter,
  GraduationCap,
  IndianRupee,
  Layers,
  MapPin,
  RotateCcw,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  UserCheck,
  Users,
  X,
  Zap,
} from "lucide-react"
import { Badge, Button, Card, Input, Modal, Select } from "../components/ui"

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
  education: string
  tier1: boolean
  skills: string[]
  matchScore: number
  verifiedPhone: boolean
  verifiedEmail: boolean
  hasResume: boolean
  activeDays: number
  noticePeriodDays: number
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
    education: "B.Des, NID Ahmedabad (2019)",
    tier1: true,
    skills: ["Figma", "Design Systems", "Fintech UX", "User Research", "Agentic UI"],
    matchScore: 96,
    verifiedPhone: true,
    verifiedEmail: true,
    hasResume: true,
    activeDays: 2,
    noticePeriodDays: 30,
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
    education: "B.Tech Computer Science, IIT Bombay (2017)",
    tier1: true,
    skills: ["Go", "Kubernetes", "Distributed Systems", "Kafka", "PostgreSQL"],
    matchScore: 94,
    verifiedPhone: true,
    verifiedEmail: true,
    hasResume: true,
    activeDays: 1,
    noticePeriodDays: 0,
  },
  {
    id: "cand-3",
    name: "Sneha Iyer",
    role: "Lead Full-Stack Engineer",
    currentCompany: "PhonePe",
    prevCompany: "InMobi",
    expYears: 6,
    currentSalary: "₹28 LPA",
    expectedSalary: "₹38 LPA",
    location: "Bengaluru",
    locality: "HSR Layout",
    availability: "15 days",
    education: "B.E. Computer Engineering, BITS Pilani (2020)",
    tier1: true,
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    matchScore: 91,
    verifiedPhone: true,
    verifiedEmail: true,
    hasResume: true,
    activeDays: 3,
    noticePeriodDays: 15,
  },
  {
    id: "cand-4",
    name: "Rohan Kulkarni",
    role: "Principal AI/ML Engineer",
    currentCompany: "Ola Electric",
    prevCompany: "Samsung Research",
    expYears: 8,
    currentSalary: "₹36 LPA",
    expectedSalary: "₹50 LPA",
    location: "Bengaluru",
    locality: "Whitefield",
    availability: "Currently serving notice (15d remaining)",
    education: "M.Tech AI, IIT Delhi (2018)",
    tier1: true,
    skills: ["PyTorch", "LLM Fine-tuning", "RAG Architecture", "Python", "Vector Databases"],
    matchScore: 89,
    verifiedPhone: true,
    verifiedEmail: true,
    hasResume: true,
    activeDays: 1,
    noticePeriodDays: 15,
  },
  {
    id: "cand-5",
    name: "Kavya Nair",
    role: "Lead Product Manager",
    currentCompany: "Zepto",
    prevCompany: "Dunzo",
    expYears: 5,
    currentSalary: "₹26 LPA",
    expectedSalary: "₹35 LPA",
    location: "Mumbai",
    locality: "Bandra Kurla Complex (BKC)",
    availability: "30 days",
    education: "MBA, IIM Bangalore (2021) · B.Tech IIT Madras",
    tier1: true,
    skills: ["Product Strategy", "Growth Hacking", "Quick Commerce", "SQL", "A/B Testing"],
    matchScore: 88,
    verifiedPhone: true,
    verifiedEmail: true,
    hasResume: true,
    activeDays: 5,
    noticePeriodDays: 30,
  },
  {
    id: "cand-6",
    name: "Aditya Verma",
    role: "Senior DevOps & Cloud Architect",
    currentCompany: "Zomato",
    prevCompany: "Paytm",
    expYears: 7,
    currentSalary: "₹30 LPA",
    expectedSalary: "₹42 LPA",
    location: "Delhi NCR",
    locality: "Cyber City, Gurugram",
    availability: "60 days",
    education: "B.Tech IT, NIT Kurukshetra (2019)",
    tier1: true,
    skills: ["Terraform", "Docker", "GCP", "CI/CD Pipelines", "Site Reliability"],
    matchScore: 85,
    verifiedPhone: true,
    verifiedEmail: true,
    hasResume: true,
    activeDays: 6,
    noticePeriodDays: 60,
  },
]

export function AdvancedSearchPage() {
  const navigate = useNavigate()
  const [candidatesList, setCandidatesList] = useState(mockCandidateDatabase)
  const [toast, setToast] = useState("")

  // Search filter criteria
  const [mandatoryKeywords, setMandatoryKeywords] = useState("React, TypeScript")
  const [optionalKeywords, setOptionalKeywords] = useState("Design Systems, Next.js")
  const [excludedKeywords, setExcludedKeywords] = useState("Junior, Intern")
  const [booleanQuery, setBooleanQuery] = useState("(React OR Figma) AND Senior NOT Intern")
  const [searchScope, setSearchScope] = useState<"entire_resume" | "key_skills">("entire_resume")
  const [isSemanticSearch, setIsSemanticSearch] = useState(true)

  // Professional filters
  const [minExp, setMinExp] = useState(4)
  const [maxExp, setMaxExp] = useState(12)
  const [designation, setDesignation] = useState("")
  const [currentCompany, setCurrentCompany] = useState("")
  const [industry, setIndustry] = useState("All")

  // Compensation filters
  const [minSalary, setMinSalary] = useState(15)
  const [maxSalary, setMaxSalary] = useState(55)

  // Location & availability
  const [selectedCity, setSelectedCity] = useState("Bengaluru")
  const [selectedLocality, setSelectedLocality] = useState("All Localities")
  const [selectedAvailability, setSelectedAvailability] = useState("All Notice Periods")
  const [tier1Only, setTier1Only] = useState(false)
  const [activeWindow, setActiveWindow] = useState("Active in 7 days")

  // Selected candidate modal for details / NVite
  const [selectedCand, setSelectedCand] = useState<SearchCandidate | null>(null)
  const [nviteModalOpen, setNviteModalOpen] = useState<SearchCandidate | null>(null)
  const [inviteChannel, setInviteChannel] = useState<"whatsapp" | "email" | "both">("both")

  const handleSearch = () => {
    let results = mockCandidateDatabase
    if (selectedCity !== "All Cities") {
      results = results.filter(c => c.location === selectedCity)
    }
    if (tier1Only) {
      results = results.filter(c => c.tier1)
    }
    if (selectedAvailability === "Immediate") {
      results = results.filter(c => c.noticePeriodDays === 0)
    } else if (selectedAvailability === "<= 30 days") {
      results = results.filter(c => c.noticePeriodDays <= 30)
    }
    results = results.filter(c => c.expYears >= minExp && c.expYears <= maxExp)
    setCandidatesList(results)
    setToast(`Filtered ${results.length} qualified candidates based on Indian market criteria`)
  }

  const resetFilters = () => {
    setMandatoryKeywords("")
    setOptionalKeywords("")
    setMinExp(0)
    setMaxExp(20)
    setSelectedCity("Bengaluru")
    setTier1Only(false)
    setSelectedAvailability("All Notice Periods")
    setCandidatesList(mockCandidateDatabase)
    setToast("Search filters reset")
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-blue-700">Talent Discovery 3.0</span>
            <Badge tone="blue">India Sourcing Engine</Badge>
            <Badge tone="purple">Semantic & Boolean Parser</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
            Advanced Candidate Search
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Sift through 1.2M+ verified profiles with deep Indian recruitment parameters: notice period, current vs. expected CTC in ₹ LPA, and Tier-1 Indian institutes.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="secondary" onClick={resetFilters}>
            <RotateCcw size={15} /> Reset
          </Button>
          <Button onClick={handleSearch}>
            <Search size={15} /> Run Semantic Search
          </Button>
        </div>
      </div>

      {/* Main 2-Column Search Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Filter Column (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-blue-600" />
                <h3 className="font-bold text-sm text-gray-900">Search Parameters</h3>
              </div>
              <span className="text-xs text-gray-400 font-medium">Auto-synced</span>
            </div>

            {/* Keyword block */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-gray-800 block">
                Mandatory Keywords (Must Have)
                <Input
                  value={mandatoryKeywords}
                  onChange={(e) => setMandatoryKeywords(e.target.value)}
                  placeholder="e.g. React, Next.js, Design Systems"
                  className="mt-1 text-xs"
                />
              </label>

              <label className="text-xs font-bold text-gray-800 block">
                Optional Keywords (Good to Have)
                <Input
                  value={optionalKeywords}
                  onChange={(e) => setOptionalKeywords(e.target.value)}
                  placeholder="e.g. Fintech, Microservices, Figma"
                  className="mt-1 text-xs"
                />
              </label>

              <label className="text-xs font-bold text-gray-800 block">
                Excluded Keywords (NOT)
                <Input
                  value={excludedKeywords}
                  onChange={(e) => setExcludedKeywords(e.target.value)}
                  placeholder="e.g. Intern, Contractor, Junior"
                  className="mt-1 text-xs"
                />
              </label>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-700">Semantic AI Embedding:</span>
                <button
                  type="button"
                  onClick={() => setIsSemanticSearch(!isSemanticSearch)}
                  className={`px-2 py-1 rounded text-xs font-bold cursor-pointer transition ${
                    isSemanticSearch ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {isSemanticSearch ? "✨ Semantic Active" : "Exact Text Only"}
                </button>
              </div>
            </div>

            {/* Experience Slider */}
            <div className="pt-3 border-t border-gray-100 space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-gray-800">
                <span>Experience Range</span>
                <span className="text-blue-600">{minExp} – {maxExp} years</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  min={0}
                  max={25}
                  value={minExp}
                  onChange={(e) => setMinExp(Number(e.target.value))}
                  placeholder="Min Yrs"
                  className="text-xs h-8"
                />
                <Input
                  type="number"
                  min={0}
                  max={25}
                  value={maxExp}
                  onChange={(e) => setMaxExp(Number(e.target.value))}
                  placeholder="Max Yrs"
                  className="text-xs h-8"
                />
              </div>
            </div>

            {/* Compensation Range in INR LPA */}
            <div className="pt-3 border-t border-gray-100 space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-gray-800">
                <span>Expected Salary Range (₹ LPA)</span>
                <span className="text-emerald-700 font-semibold">₹{minSalary}L – ₹{maxSalary}L</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  value={minSalary}
                  onChange={(e) => setMinSalary(Number(e.target.value))}
                  placeholder="Min LPA"
                  className="text-xs h-8"
                />
                <Input
                  type="number"
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(Number(e.target.value))}
                  placeholder="Max LPA"
                  className="text-xs h-8"
                />
              </div>
            </div>

            {/* Location & Localities */}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <label className="text-xs font-bold text-gray-800 block">
                Primary India Location
                <Select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="mt-1 text-xs h-9"
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

              {selectedCity === "Bengaluru" && (
                <label className="text-xs font-semibold text-gray-600 block">
                  Tech Corridor / Locality
                  <Select
                    value={selectedLocality}
                    onChange={(e) => setSelectedLocality(e.target.value)}
                    className="mt-1 text-xs h-8"
                  >
                    <option>All Localities</option>
                    <option>Indiranagar</option>
                    <option>HSR Layout</option>
                    <option>Bellandur / ORR</option>
                    <option>Koramangala</option>
                    <option>Whitefield</option>
                    <option>Electronic City</option>
                  </Select>
                </label>
              )}
            </div>

            {/* Availability / Notice Period */}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <label className="text-xs font-bold text-gray-800 block">
                Candidate Availability
                <Select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="mt-1 text-xs h-9"
                >
                  <option>All Notice Periods</option>
                  <option>Immediate</option>
                  <option>&lt;= 15 days</option>
                  <option>&lt;= 30 days</option>
                  <option>&lt;= 60 days</option>
                  <option>Currently Serving Notice</option>
                </Select>
              </label>
            </div>

            {/* Quality & Pedigree Checkboxes */}
            <div className="pt-3 border-t border-gray-100 space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={tier1Only}
                  onChange={(e) => setTier1Only(e.target.checked)}
                  className="rounded text-blue-600 accent-blue-600"
                />
                <span>Tier-1 Indian Institutes (IIT / NIT / BITS / IIM)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-blue-600 accent-blue-600"
                />
                <span>Verified Phone & Email (100% Consent)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-blue-600 accent-blue-600"
                />
                <span>Active in last 7 days</span>
              </label>
            </div>

            <Button className="w-full mt-4 text-xs h-9" onClick={handleSearch}>
              <Filter size={14} /> Apply 14 Indian Market Filters
            </Button>
          </Card>
        </div>

        {/* Right Search Results Column (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Results Summary Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white p-3.5 border border-gray-200 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-gray-900 text-sm">
                {candidatesList.length} Verified Candidates
              </span>
              <span className="text-xs text-gray-500">matching criteria in {selectedCity}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 font-medium">Sort by:</span>
              <Badge tone="purple">AI Match Score ↓</Badge>
              <Button
                variant="secondary"
                className="h-7 text-xs px-2"
                onClick={() => setToast("Exporting shortlisted candidate ledger (CSV)")}
              >
                <Download size={13} /> Export
              </Button>
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-3">
            {candidatesList.map((cand) => (
              <Card
                key={cand.id}
                className="p-5 hover:border-blue-400 hover:shadow-md transition cursor-pointer"
                onClick={() => setSelectedCand(cand)}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-gray-900 hover:text-blue-600 transition">
                        {cand.name}
                      </h4>
                      {cand.tier1 && <Badge tone="purple">Tier-1 Institute</Badge>}
                      <Badge tone={cand.noticePeriodDays === 0 ? "green" : cand.noticePeriodDays <= 30 ? "blue" : "neutral"}>
                        {cand.availability}
                      </Badge>
                      <span className="text-xs text-gray-400">Active {cand.activeDays}d ago</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-600 mt-1 flex-wrap">
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

                    <p className="text-xs text-gray-500 mt-1">
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
                    <span className="text-[11px] text-gray-400 font-medium">Current: {cand.currentSalary}</span>
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

                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      className="h-8 text-xs px-2.5"
                      onClick={(e) => {
                        e.stopPropagation()
                        setToast(`Saved ${cand.name} to Talent CRM Pool`)
                      }}
                    >
                      <Bookmark size={13} /> Save
                    </Button>
                    <Button
                      className="h-8 text-xs px-3 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        setNviteModalOpen(cand)
                      }}
                    >
                      <Send size={13} /> NVite Candidate
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* NVITE CANDIDATE OUTREACH MODAL */}
      {nviteModalOpen && (
        <Modal
          open={Boolean(nviteModalOpen)}
          onClose={() => setNviteModalOpen(null)}
          title={`NVite · Personalized Outreach to ${nviteModalOpen.name}`}
          footer={
            <>
              <Button variant="secondary" onClick={() => setNviteModalOpen(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const name = nviteModalOpen.name
                  setNviteModalOpen(null)
                  setToast(`Personalized NVite campaign dispatched to ${name} via ${inviteChannel.toUpperCase()}!`)
                }}
              >
                <Send size={14} /> Dispatch NVite Campaign
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-xs text-gray-700">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
              <div>
                <strong className="text-sm font-bold text-blue-900 block">{nviteModalOpen.name}</strong>
                <span className="text-gray-600">{nviteModalOpen.role} @ {nviteModalOpen.currentCompany}</span>
              </div>
              <Badge tone="purple">{nviteModalOpen.matchScore}% Target Match</Badge>
            </div>

            <div>
              <span className="font-bold text-gray-800 block mb-1.5">Outreach Channel (DPDP Consented)</span>
              <div className="flex gap-2">
                {[
                  { id: "both", label: "WhatsApp + Email (Recommended)" },
                  { id: "whatsapp", label: "WhatsApp Direct Only" },
                  { id: "email", label: "Executive Email Only" },
                ].map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                      inviteChannel === ch.id
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                    onClick={() => setInviteChannel(ch.id as typeof inviteChannel)}
                  >
                    {ch.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="font-bold text-gray-800 block mb-1">AI Personalized Invitation Preview</span>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl font-sans text-xs leading-relaxed space-y-2 text-gray-800">
                <p>
                  "Hi {nviteModalOpen.name.split(" ")[0]}, we came across your work leading {nviteModalOpen.skills.slice(0, 2).join(" & ")} at {nviteModalOpen.currentCompany}. Nexora Labs is looking for a {nviteModalOpen.role} in {nviteModalOpen.location} ({nviteModalOpen.locality}) with compensation aligned with your expected bracket ({nviteModalOpen.expectedSalary})."
                </p>
                <p>
                  "Would you be open to an exploratory 15-min chat with our VP of Engineering this week? No obligations."
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* CANDIDATE DETAILS MODAL */}
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
                  setSelectedCand(null)
                  setNviteModalOpen(selectedCand)
                }}
              >
                <Send size={14} /> NVite Candidate
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-xs text-gray-700">
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
              <div>
                <strong className="text-sm font-bold text-gray-900 block">{selectedCand.role}</strong>
                <span className="text-gray-600">{selectedCand.currentCompany} · {selectedCand.locality}, {selectedCand.location}</span>
              </div>
              <Badge tone="green">{selectedCand.expectedSalary}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 bg-white border border-gray-200 rounded-xl">
              <div>Notice Period: <strong>{selectedCand.availability}</strong></div>
              <div>Experience: <strong>{selectedCand.expYears} years</strong></div>
              <div>Current CTC: <strong>{selectedCand.currentSalary}</strong></div>
              <div>Education: <strong>{selectedCand.education}</strong></div>
              <div>Verification: <strong className="text-emerald-700">Phone & Email Verified</strong></div>
              <div>DPDP Consent: <strong className="text-blue-700">Active & Logged</strong></div>
            </div>

            <div>
              <strong className="block text-gray-900 mb-1.5 font-bold">Verified Skill Taxonomy:</strong>
              <div className="flex flex-wrap gap-1.5">
                {selectedCand.skills.map((sk) => (
                  <Badge key={sk} tone="purple">{sk}</Badge>
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
