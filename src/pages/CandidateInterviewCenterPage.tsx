import { useState } from "react"
import { useNavigate } from "react-router"
import {
  ArrowRight,
  Building2,
  Calendar,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck2,
  HelpCircle,
  MapPin,
  Play,
  Plus,
  RotateCcw,
  Sparkles,
  UserCheck,
  Users,
  Video,
  X,
} from "lucide-react"
import { Badge, Button, Card, Input, Modal, Select } from "../components/ui"

export interface InterviewScheduleItem {
  id: string
  company: string
  role: string
  roundTitle: string
  dateTime: string
  duration: string
  format: string
  meetingLink: string
  panelMembers: string[]
  status: "Scheduled" | "Completed" | "Pending Reschedule"
  scorecardNotes?: string
  guidePoints: string[]
}

export const mockInterviews: InterviewScheduleItem[] = [
  {
    id: "int-1",
    company: "Nexora Labs",
    role: "Senior Product Designer",
    roundTitle: "Portfolio Review & Systems Deep-Dive",
    dateTime: "Tomorrow · 10:00 AM – 11:00 AM IST",
    duration: "60 minutes",
    format: "Google Meet Video Call",
    meetingLink: "https://meet.google.com/tn-nxr-demo",
    panelMembers: ["Neha Kapoor (Talent Lead)", "Kunal Deshmukh (VP Product Design)"],
    status: "Scheduled",
    guidePoints: [
      "Lead with merchant onboarding redesign & 24% activation lift",
      "Demonstrate Figma token variables and Style Dictionary code export",
      "Prepare questions on design system team structure and engineering handoff",
    ],
  },
  {
    id: "int-2",
    company: "PhonePe",
    role: "Lead UI/UX Designer",
    roundTitle: "Technical Architecture & System Design",
    dateTime: "12 Nov 2026 · 03:00 PM – 04:00 PM IST",
    duration: "60 minutes",
    format: "Microsoft Teams Video Call",
    meetingLink: "https://teams.microsoft.com/l/meetup-join/tn-phonepe",
    panelMembers: ["Aditi Sen (Recruiter)", "Rohan Nambiar (Principal Architect)"],
    status: "Scheduled",
    guidePoints: [
      "Review high-frequency transaction user flows",
      "Demonstrate understanding of low-connectivity network states",
      "Highlight cross-platform token consistency across iOS & Android",
    ],
  },
  {
    id: "int-3",
    company: "CRED",
    role: "Staff Product Designer",
    roundTitle: "Executive Cultural & Leadership Alignment",
    dateTime: "02 Nov 2026 (Completed)",
    duration: "45 minutes",
    format: "In-Person · Indiranagar Studio",
    meetingLink: "Cleared · Moved to Offer Stage",
    panelMembers: ["Karan Singhania (Head of Talent)", "Kunal Shah (Founder)"],
    status: "Completed",
    scorecardAvg: "Strong Hire (4.9 / 5.0)",
    guidePoints: ["Completed with praise for clarity of thought and execution speed."],
  },
]

export function CandidateInterviewCenterPage() {
  const navigate = useNavigate()
  const [interviews, setInterviews] = useState(mockInterviews)
  const [prepModalItem, setPrepModalItem] = useState<InterviewScheduleItem | null>(null)
  const [rescheduleModalItem, setRescheduleModalItem] = useState<InterviewScheduleItem | null>(null)
  const [newDate, setNewDate] = useState("2026-11-14")
  const [newTime, setNewTime] = useState("14:00")
  const [rescheduleReason, setRescheduleReason] = useState("Conflict with current company deliverables")
  const [toast, setToast] = useState("")

  const handleRescheduleSubmit = () => {
    if (!rescheduleModalItem) return
    setInterviews(
      interviews.map((item) =>
        item.id === rescheduleModalItem.id
          ? {
              ...item,
              status: "Pending Reschedule",
              dateTime: `${newDate} · ${newTime} IST (Requested)`,
            }
          : item,
      ),
    )
    setRescheduleModalItem(null)
    setToast("Reschedule request submitted to recruiter! You will receive confirmation via WhatsApp.")
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-blue-700">Candidate Preparation Center</span>
            <Badge tone="purple">Autonomous Calendar Coordination</Badge>
            <Badge tone="green">Verified Interview Panel</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
            Interview Center & Preparation Room
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Access meeting rooms, preparation guides, mock questions, and reschedule requests for your scheduled hiring rounds.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="secondary" onClick={() => navigate("/candidate/assistant")}>
            <Sparkles size={15} /> Practice with AI Copilot
          </Button>
          <Button onClick={() => setToast("Calendar synced with Google Calendar and Outlook")}>
            <Calendar size={15} /> Sync Calendar
          </Button>
        </div>
      </div>

      {/* Main Interview Cards */}
      <div className="space-y-4">
        {interviews.map((item) => (
          <Card
            key={item.id}
            className={`p-5 transition flex flex-col justify-between ${
              item.status === "Scheduled" ? "border-2 border-blue-500/80 shadow-xs" : "border-gray-200"
            }`}
          >
            <div>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-gray-900">{item.company}</h3>
                    <Badge tone={item.status === "Scheduled" ? "purple" : item.status === "Completed" ? "green" : "amber"}>
                      {item.status}
                    </Badge>
                    <span className="text-xs text-gray-500 font-semibold">{item.duration}</span>
                  </div>

                  <h4 className="text-sm font-bold text-blue-800 mt-1">{item.roundTitle}</h4>
                  <p className="text-xs text-gray-600 mt-0.5">{item.role}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-600 mt-2 flex-wrap">
                    <span className="flex items-center gap-1 font-semibold text-gray-900">
                      <Clock size={13} className="text-blue-600" /> {item.dateTime}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Video size={13} /> {item.format}
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-gray-500">
                    Panel: <strong className="text-gray-700">{item.panelMembers.join(", ")}</strong>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between gap-2 flex-shrink-0">
                  {item.status === "Scheduled" && (
                    <Button
                      className="text-xs h-9 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                      onClick={() => setToast(`Opening Google Meet room: ${item.meetingLink}`)}
                    >
                      <Video size={14} /> Join Video Room
                    </Button>
                  )}
                  {item.status === "Completed" && (
                    <Badge tone="green">Scorecard: 4.9/5.0 Strong Hire</Badge>
                  )}
                </div>
              </div>

              {/* Guide preview */}
              <div className="mt-3.5 pt-3 border-t border-gray-100 bg-gray-50/70 p-3 rounded-xl border">
                <span className="text-[11px] font-bold text-purple-900 block mb-1">
                  🎯 AI Preparation Recommendations:
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-xs text-gray-600">
                  {item.guidePoints.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Automated reminders dispatched 24h and 1h prior
              </span>
              <div className="flex items-center gap-2">
                {item.status === "Scheduled" && (
                  <Button
                    variant="secondary"
                    className="h-8 text-xs px-3"
                    onClick={() => setRescheduleModalItem(item)}
                  >
                    Request Reschedule
                  </Button>
                )}
                <Button
                  variant="secondary"
                  className="h-8 text-xs px-3"
                  onClick={() => setPrepModalItem(item)}
                >
                  View Full Prep Kit <ArrowRight size={13} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* FULL PREP KIT MODAL */}
      {prepModalItem && (
        <Modal
          open={Boolean(prepModalItem)}
          onClose={() => setPrepModalItem(null)}
          title={`Interview Preparation Kit · ${prepModalItem.company}`}
          footer={
            <div className="w-full flex items-center justify-between text-xs">
              <span className="text-gray-500">Google Meet: {prepModalItem.meetingLink}</span>
              <Button onClick={() => setPrepModalItem(null)}>Done</Button>
            </div>
          }
        >
          <div className="space-y-4 text-xs text-gray-700">
            <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1">
              <strong className="text-sm font-bold text-purple-900 block">{prepModalItem.roundTitle}</strong>
              <p className="text-gray-600">{prepModalItem.dateTime}</p>
            </div>

            <div className="space-y-2">
              <strong className="block text-gray-900 font-bold uppercase text-[11px]">
                Recommended Agenda & Pacing
              </strong>
              <div className="space-y-1.5">
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                  <strong>First 15 min:</strong> Introduction, high-level context of merchant onboarding project at Razorpay.
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                  <strong>Next 30 min:</strong> Deep-dive into design token schema, Figma-to-code pipelines, and measurable outcomes.
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                  <strong>Last 15 min:</strong> Ask the panel about design governance and squad autonomy at Nexora Labs.
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* RESCHEDULE MODAL */}
      {rescheduleModalItem && (
        <Modal
          open={Boolean(rescheduleModalItem)}
          onClose={() => setRescheduleModalItem(null)}
          title={`Request Reschedule · ${rescheduleModalItem.company}`}
          footer={
            <>
              <Button variant="secondary" onClick={() => setRescheduleModalItem(null)}>
                Cancel
              </Button>
              <Button onClick={handleRescheduleSubmit}>
                Submit Reschedule Request
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-xs text-gray-700">
            <p>
              Please propose an alternate date and time. The Recruitment Coordinator Agent will verify interviewer availability and confirm via email and WhatsApp.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <label className="font-bold text-gray-800 block">
                Preferred Alternate Date
                <Input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="mt-1"
                />
              </label>

              <label className="font-bold text-gray-800 block">
                Preferred Time (IST)
                <Input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="mt-1"
                />
              </label>
            </div>

            <label className="font-bold text-gray-800 block">
              Reason for Reschedule Request
              <Select
                value={rescheduleReason}
                onChange={(e) => setRescheduleReason(e.target.value)}
                className="mt-1"
              >
                <option>Conflict with current company deliverables</option>
                <option>Health or medical emergency</option>
                <option>Prior scheduled interview commitment</option>
                <option>Connectivity or power disruption</option>
              </Select>
            </label>
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
