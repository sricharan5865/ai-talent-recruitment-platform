import { useState } from "react"
import { useNavigate } from "react-router"
import {
  CheckCircle2,
  Copy,
  Download,
  Eye,
  FilePlus,
  FileText,
  FileUp,
  Plus,
  Sparkles,
  Star,
  Target,
  Trash2,
  WandSparkles,
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

export interface ResumeVersion {
  id: string
  title: string
  fileName: string
  targetRole: string
  targetDomain: string
  atsScore: number
  isDefault: boolean
  lastUpdated: string
  fileSize: string
  downloadsCount: number
  primarySkills: string[]
  summary: string
  tailoredCompany?: string
}

export const initialResumeVersions: ResumeVersion[] = [
  {
    id: "cv-ver-1",
    title: "Fintech & Design Systems Lead (Primary)",
    fileName: "Priya_Sharma_Product_Design_Lead_2026.pdf",
    targetRole: "Senior / Staff Product Designer",
    targetDomain: "Fintech, Payment Infrastructure & SaaS",
    atsScore: 96,
    isDefault: true,
    lastUpdated: "Yesterday",
    fileSize: "1.4 MB",
    downloadsCount: 14,
    primarySkills: ["Figma Variables", "Design Tokens", "Fintech Compliance", "Cross-Squad Handoff", "User Research"],
    summary: "Senior Product Designer with 7+ years of experience leading cross-functional token architecture and merchant checkout flows at Razorpay and Swiggy. Drove 24% onboarding activation lift.",
  },
  {
    id: "cv-ver-2",
    title: "AI Interaction & Agentic UX Architect",
    fileName: "Priya_Sharma_Agentic_AI_UX_Architect.pdf",
    targetRole: "Staff AI Product Designer",
    targetDomain: "Generative AI, AI Agents & Next-Gen Developer Platforms",
    atsScore: 92,
    isDefault: false,
    lastUpdated: "3 days ago",
    fileSize: "1.6 MB",
    downloadsCount: 8,
    primarySkills: ["Agentic UX", "Multi-modal Interfaces", "AI Explainability", "Human-in-the-loop", "Prompt Prototyping"],
    summary: "Specialized in designing transparent AI agent interactions, multi-step conversational reasoning transparency cards, and ergonomic human-in-the-loop fallback controls.",
  },
  {
    id: "cv-ver-3",
    title: "Founding Designer & High-Equity B2B",
    fileName: "Priya_Sharma_Enterprise_SaaS_Founding_Designer.pdf",
    targetRole: "Founding Product Designer / Head of Design",
    targetDomain: "Early-Stage B2B Startups & Zero-to-One Growth",
    atsScore: 89,
    isDefault: false,
    lastUpdated: "1 week ago",
    fileSize: "1.2 MB",
    downloadsCount: 5,
    primarySkills: ["Zero-to-One Design", "Brand Systems", "Growth Hacking", "Design Systems Governance", "HTML/CSS/Tailwind"],
    summary: "Proven track record taking complex transactional enterprise products from zero to product-market fit. Hands-on with frontend styling and rapid iterative prototype testing.",
  },
]

export function CandidateResumeVaultPage() {
  const navigate = useNavigate()
  const [versions, setVersions] = useState<ResumeVersion[]>(initialResumeVersions)
  const [selectedPreviewCv, setSelectedPreviewCv] = useState<ResumeVersion | null>(null)
  const [tailorModalCv, setTailorModalCv] = useState<ResumeVersion | null>(null)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [newCvTitle, setNewCvTitle] = useState("")
  const [newCvTarget, setNewCvTarget] = useState("")
  const [tailorTargetRole, setTailorTargetRole] = useState("Staff Product Designer at CRED")
  const [toast, setToast] = useState("")

  const setDefaultVersion = (id: string) => {
    setVersions(versions.map((v) => ({ ...v, isDefault: v.id === id })))
    const target = versions.find((v) => v.id === id)
    setToast(`Set "${target?.title}" as your primary default CV for 1-click applications!`)
  }

  const duplicateVersion = (cv: ResumeVersion) => {
    const newVersion: ResumeVersion = {
      ...cv,
      id: `cv-ver-${Date.now()}`,
      title: `${cv.title} (Copy)`,
      fileName: cv.fileName.replace(".pdf", "_copy.pdf"),
      isDefault: false,
      lastUpdated: "Just now",
      downloadsCount: 0,
    }
    setVersions([...versions, newVersion])
    setToast(`Duplicated CV version into "${newVersion.title}"`)
  }

  const deleteVersion = (id: string) => {
    if (versions.length <= 1) {
      setToast("Cannot delete the only resume in your vault. Keep at least 1 verified version.")
      return
    }
    const target = versions.find((v) => v.id === id)
    setVersions(versions.filter((v) => v.id !== id))
    setToast(`Deleted CV version "${target?.title}"`)
  }

  const handleUploadNew = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCvTitle.trim()) return
    const newVer: ResumeVersion = {
      id: `cv-ver-${Date.now()}`,
      title: newCvTitle.trim(),
      fileName: `Priya_Sharma_${newCvTitle.replace(/\s+/g, "_")}.pdf`,
      targetRole: newCvTarget || "Product Designer",
      targetDomain: "General Technology & Design",
      atsScore: 90,
      isDefault: false,
      lastUpdated: "Just now",
      fileSize: "1.3 MB",
      downloadsCount: 0,
      primarySkills: ["Figma", "Design Systems", "Prototyping", "User Research"],
      summary: "Newly generated CV draft optimized for specific company target requirements.",
    }
    setVersions([...versions, newVer])
    setNewCvTitle("")
    setNewCvTarget("")
    setUploadModalOpen(false)
    setToast(`Successfully added "${newVer.title}" to your CV Vault!`)
  }

  const handleTailorSubmit = () => {
    if (!tailorModalCv) return
    const updated = versions.map((v) =>
      v.id === tailorModalCv.id
        ? {
            ...v,
            atsScore: 98,
            tailoredCompany: tailorTargetRole,
            lastUpdated: "Just now (AI Tailored)",
          }
        : v,
    )
    setVersions(updated)
    setTailorModalCv(null)
    setToast(`AI dynamically tailored CV keywords for ${tailorTargetRole}! ATS Score lifted to 98%.`)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-blue-700">Candidate Career Assets</span>
            <Badge tone="purple">Multi-Version CV Vault</Badge>
            <Badge tone="green">ATS Parser Verified</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
            Resume & CV Version Manager
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Maintain specialized resume variations tailored to different roles (e.g. Fintech UX vs. AI Agent Design). Select the optimal version when applying to maximize ATS recruiter match scores.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="secondary" onClick={() => navigate("/candidate/application-studio")}>
            <WandSparkles size={15} /> Application Studio
          </Button>
          <Button onClick={() => setUploadModalOpen(true)}>
            <Plus size={15} /> Upload / Add CV Version
          </Button>
        </div>
      </div>

      {/* Vault Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <Card className="p-4 border-l-4 border-l-blue-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Stored Versions
          </span>
          <strong className="text-2xl font-extrabold text-gray-900 mt-1 block">
            {versions.length} of 5
          </strong>
          <small className="text-xs text-blue-600 font-bold mt-1 block">3 Active Tailored Profiles</small>
        </Card>

        <Card className="p-4 border-l-4 border-l-emerald-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Default Application CV
          </span>
          <strong className="text-sm font-bold text-gray-900 mt-1.5 block truncate">
            {versions.find((v) => v.isDefault)?.title}
          </strong>
          <small className="text-xs text-emerald-700 font-bold mt-1 block">Applied to 1-Click jobs</small>
        </Card>

        <Card className="p-4 border-l-4 border-l-purple-600">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Highest ATS Match Score
          </span>
          <strong className="text-2xl font-extrabold text-purple-700 mt-1 block">
            {Math.max(...versions.map((v) => v.atsScore))}%
          </strong>
          <small className="text-xs text-purple-600 font-medium mt-1 block">Top 2% candidate tier</small>
        </Card>

        <Card className="p-4 border-l-4 border-l-amber-500">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Recruiter PDF Downloads
          </span>
          <strong className="text-2xl font-extrabold text-amber-700 mt-1 block">
            {versions.reduce((acc, v) => acc + v.downloadsCount, 0)} Downloads
          </strong>
          <small className="text-xs text-gray-500 mt-1 block">Swiggy, Zepto & CRED verified</small>
        </Card>
      </div>

      {/* CV Versions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            Showing <strong className="text-gray-900 font-bold">{versions.length} active resume drafts</strong>
          </span>
          <span className="text-purple-700 font-semibold">
            ✨ Tip: Match your resume domain with the job domain for higher shortlist rates.
          </span>
        </div>

        <div className="space-y-4">
          {versions.map((cv) => (
            <Card
              key={cv.id}
              className={`p-5 transition flex flex-col justify-between ${
                cv.isDefault ? "border-2 border-blue-600 shadow-sm bg-blue-50/15" : "hover:border-gray-300"
              }`}
            >
              <div>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-100/70 text-blue-700 grid place-items-center flex-shrink-0">
                      <FileText size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-gray-900">{cv.title}</h3>
                        {cv.isDefault && (
                          <Badge tone="green">Default for 1-Click Apply</Badge>
                        )}
                        {cv.tailoredCompany && (
                          <Badge tone="purple">Tailored: {cv.tailoredCompany}</Badge>
                        )}
                        <span className="text-xs text-gray-400">Updated {cv.lastUpdated}</span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-600 mt-1 flex-wrap">
                        <span className="font-semibold text-gray-900">{cv.fileName}</span>
                        <span>·</span>
                        <span className="text-gray-500">Target: {cv.targetRole}</span>
                        <span>·</span>
                        <span className="text-gray-500">{cv.fileSize}</span>
                        <span>·</span>
                        <span className="text-gray-500">{cv.downloadsCount} Recruiter Views</span>
                      </div>

                      <p className="text-xs text-gray-600 mt-2 leading-relaxed max-w-4xl">
                        {cv.summary}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0 flex md:flex-col items-center md:items-end justify-between gap-1">
                    <div className="flex items-center gap-1.5 text-purple-700 font-extrabold text-sm">
                      <Sparkles size={15} /> {cv.atsScore}% ATS Match
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium">Domain: {cv.targetDomain}</span>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="mt-3.5 pt-3 border-t border-gray-100 flex flex-wrap gap-1.5">
                  <span className="text-xs font-bold text-gray-600 mr-1 self-center">Key Tokens:</span>
                  {cv.primarySkills.map((sk) => (
                    <span
                      key={sk}
                      className="text-xs bg-gray-50 border border-gray-200 text-gray-700 px-2 py-0.5 rounded-md font-medium"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="mt-4 pt-3.5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {!cv.isDefault && (
                    <Button
                      variant="secondary"
                      className="h-8 text-xs px-2.5 font-semibold text-blue-700"
                      onClick={() => setDefaultVersion(cv.id)}
                    >
                      <Star size={13} /> Set as Default
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    className="h-8 text-xs px-2.5"
                    onClick={() => setTailorModalCv(cv)}
                  >
                    <WandSparkles size={13} /> AI Tailor for Job
                  </Button>
                  <Button
                    variant="secondary"
                    className="h-8 text-xs px-2.5"
                    onClick={() => duplicateVersion(cv)}
                  >
                    <Copy size={13} /> Duplicate
                  </Button>
                  {!cv.isDefault && (
                    <Button
                      variant="ghost"
                      className="h-8 text-xs px-2 text-red-600 hover:text-red-800"
                      onClick={() => deleteVersion(cv.id)}
                      aria-label="Delete resume version"
                    >
                      <Trash2 size={13} />
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    className="h-8 text-xs px-3"
                    onClick={() => setToast(`Downloaded ${cv.fileName} to your device.`)}
                  >
                    <Download size={13} /> Download PDF
                  </Button>
                  <Button
                    className="h-8 text-xs px-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold"
                    onClick={() => setSelectedPreviewCv(cv)}
                  >
                    <Eye size={13} /> Preview CV
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* PREVIEW CV MODAL */}
      {selectedPreviewCv && (
        <Modal
          open={Boolean(selectedPreviewCv)}
          onClose={() => setSelectedPreviewCv(null)}
          title={`Document Preview · ${selectedPreviewCv.fileName}`}
          footer={
            <div className="w-full flex items-center justify-between text-xs">
              <span className="text-gray-500">{selectedPreviewCv.fileSize} · PDF Version 1.7</span>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setSelectedPreviewCv(null)}>
                  Close
                </Button>
                <Button onClick={() => setToast(`Downloaded ${selectedPreviewCv.fileName}`)}>
                  <Download size={14} /> Download PDF
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-4 text-xs text-gray-700 bg-white p-5 border border-gray-200 rounded-xl shadow-xs">
            <div className="border-b border-gray-200 pb-3">
              <h2 className="text-lg font-extrabold text-gray-900">Priya Sharma</h2>
              <p className="text-gray-600 font-semibold">{selectedPreviewCv.targetRole}</p>
              <p className="text-gray-400 mt-0.5">Bengaluru, India · priya.sharma@gmail.com · +91 98765 43210</p>
            </div>

            <div>
              <strong className="text-gray-900 block font-bold mb-1 uppercase tracking-wider text-[11px]">
                Professional Summary
              </strong>
              <p className="text-gray-600 leading-relaxed">{selectedPreviewCv.summary}</p>
            </div>

            <div>
              <strong className="text-gray-900 block font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                Core Competencies & Design System Tokens
              </strong>
              <div className="flex flex-wrap gap-1.5">
                {selectedPreviewCv.primarySkills.map((sk) => (
                  <Badge key={sk} tone="purple">{sk}</Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <strong className="text-gray-900 block font-bold uppercase tracking-wider text-[11px]">
                Experience Highlights
              </strong>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between font-bold text-gray-800">
                  <span>Razorpay · Senior Product Designer</span>
                  <span>2022 – Present</span>
                </div>
                <p className="text-gray-600 mt-1">
                  • Led merchant onboarding revamp resulting in 24% activation lift across 120,000+ business accounts.
                </p>
                <p className="text-gray-600 mt-0.5">
                  • Architected multi-brand design token library synced directly with React and Tailwind CSS codebase.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* AI TAILOR MODAL */}
      {tailorModalCv && (
        <Modal
          open={Boolean(tailorModalCv)}
          onClose={() => setTailorModalCv(null)}
          title={`AI Resume Tailoring Studio · ${tailorModalCv.title}`}
          footer={
            <>
              <Button variant="secondary" onClick={() => setTailorModalCv(null)}>
                Cancel
              </Button>
              <Button onClick={handleTailorSubmit}>
                <Sparkles size={14} /> Run AI Keyword Alignment
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-xs text-gray-700">
            <p>
              The AI Resume Tailoring Agent will analyze the target job requisition requirements and automatically optimize your bullet points and technical keywords to score 95%+ in recruiter ATS parsers.
            </p>

            <label className="font-bold text-gray-800 block">
              Target Job Requisition
              <Select
                value={tailorTargetRole}
                onChange={(e) => setTailorTargetRole(e.target.value)}
                className="mt-1"
              >
                <option>Staff Product Designer at CRED (Indiranagar)</option>
                <option>Senior Product Designer at Nexora Labs (Bengaluru)</option>
                <option>Principal Design Architect at Swiggy (Koramangala)</option>
                <option>Founding Designer at Zepto (Mumbai)</option>
              </Select>
            </label>

            <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-purple-900">
                <Sparkles size={13} className="text-purple-600" />
                <span>Simulated Match Lift:</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Current ATS Match: <strong>{tailorModalCv.atsScore}%</strong></span>
                <span className="text-emerald-700 font-bold">Predicted Lift: <strong>98% (+6%)</strong></span>
              </div>
              <Progress value={98} tone="purple" />
            </div>
          </div>
        </Modal>
      )}

      {/* UPLOAD / ADD NEW VERSION MODAL */}
      {uploadModalOpen && (
        <Modal
          open={uploadModalOpen}
          onClose={() => setUploadModalOpen(false)}
          title="Add New Resume / CV Version"
          footer={
            <>
              <Button variant="secondary" onClick={() => setUploadModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUploadNew}>
                <FilePlus size={14} /> Create CV Version
              </Button>
            </>
          }
        >
          <form onSubmit={handleUploadNew} className="space-y-4 text-xs text-gray-700">
            <label className="font-bold text-gray-800 block">
              Version Label / Purpose
              <Input
                placeholder="e.g. AI Systems & Agentic Prototyping CV"
                value={newCvTitle}
                onChange={(e) => setNewCvTitle(e.target.value)}
                className="mt-1"
                required
              />
            </label>

            <label className="font-bold text-gray-800 block">
              Target Role Category
              <Input
                placeholder="e.g. Staff AI Designer / Design Technologist"
                value={newCvTarget}
                onChange={(e) => setNewCvTarget(e.target.value)}
                className="mt-1"
              />
            </label>

            <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl text-center bg-gray-50/60 hover:bg-gray-50 cursor-pointer">
              <FileUp size={28} className="text-blue-600 mx-auto mb-2" />
              <strong className="block text-gray-800">Upload PDF or DOCX Document</strong>
              <small className="text-gray-500">Max file size 5MB · Structured ATS compliant</small>
            </div>
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
