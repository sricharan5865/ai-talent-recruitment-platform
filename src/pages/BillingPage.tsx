import { useState } from "react"
import {
  Check,
  CheckCircle2,
  Download,
  Zap,
} from "lucide-react"
import {
  Badge,
  Button,
  Card,
  Modal,
  Progress,
} from "../components/ui"

export interface BillingPlan {
  id: "free" | "starter" | "professional" | "enterprise"
  name: string
  monthlyPriceINR: number
  annualPriceINR: number
  description: string
  jobLimit: string
  resumeSearchCredits: string
  agentAccess: string
  outreachChannels: string
  features: string[]
  recommended?: boolean
  current?: boolean
}

export const subscriptionPlans: BillingPlan[] = [
  {
    id: "free",
    name: "Free Trial",
    monthlyPriceINR: 0,
    annualPriceINR: 0,
    description: "Explore AI recruitment intelligence with sandbox data.",
    jobLimit: "1 Active Requisition",
    resumeSearchCredits: "50 Candidate Views",
    agentAccess: "2 Core Agents (Job & Resume)",
    outreachChannels: "Email Only",
    features: [
      "1 Active job post",
      "50 Resume parse credits",
      "Basic keyword search",
      "Standard email support",
    ],
  },
  {
    id: "starter",
    name: "Starter Growth",
    monthlyPriceINR: 24999,
    annualPriceINR: 19999,
    description: "For fast-scaling Indian startups hiring technical talent.",
    jobLimit: "5 Active Requisitions",
    resumeSearchCredits: "500 Verified Views / mo",
    agentAccess: "5 Autonomous AI Agents",
    outreachChannels: "Email + In-app",
    features: [
      "5 Active jobs with AI optimizer",
      "500 Resume unlocks / month",
      "Autonomous Candidate Sourcing Agent",
      "AI Matching score with explainability",
      "Basic ATS Kanban pipeline",
      "GST tax invoice (18% input credit)",
    ],
  },
  {
    id: "professional",
    name: "Professional Scale",
    monthlyPriceINR: 69999,
    annualPriceINR: 54999,
    description: "Full agentic recruitment operating system for modern talent teams.",
    jobLimit: "20 Active Requisitions",
    resumeSearchCredits: "2,500 Verified Views / mo",
    agentAccess: "All 10 Specialized AI Agents",
    outreachChannels: "WhatsApp Business API + Email",
    features: [
      "20 Active requisitions",
      "2,500 Resume unlocks / month",
      "All 10 Autonomous AI Agents active",
      "WhatsApp Business API outreach integration",
      "14-Stage configurable pipeline",
      "AI Interview question kits & scorecards",
      "Human-in-the-loop approval workflows",
      "Priority Indian business hours support",
    ],
    recommended: true,
    current: true,
  },
  {
    id: "enterprise",
    name: "Enterprise Sovereignty",
    monthlyPriceINR: 189999,
    annualPriceINR: 149999,
    description: "Custom enterprise multi-company tenancy, dedicated fine-tuned models & SSO.",
    jobLimit: "Unlimited Requisitions",
    resumeSearchCredits: "Unlimited + Custom Data Feeds",
    agentAccess: "Custom Fine-tuned Multi-Agent Swarm",
    outreachChannels: "Multi-channel + Custom HRMS Sync",
    features: [
      "Unlimited active job requisitions",
      "Unlimited candidate discovery & resume unlocks",
      "Dedicated multi-entity corporate structures",
      "SAML 2.0 / Okta Enterprise SSO",
      "Darwinbox, Workday & SAP SuccessFactors sync",
      "Custom DPDP compliance & localized data residency",
      "Dedicated Technical Account Manager",
      "Custom SLA: 99.9% uptime guarantee",
    ],
  },
]

export function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual")
  const [plans] = useState(subscriptionPlans)
  const [topUpModalOpen, setTopUpModalOpen] = useState(false)
  const [upgradePlanModal, setUpgradePlanModal] = useState<BillingPlan | null>(null)
  const [toast, setToast] = useState("")

  // Usage telemetry
  const usage = {
    jobsUsed: 12,
    jobsMax: 20,
    resumesUnlocked: 1840,
    resumesMax: 2500,
    outreachSent: 340,
    outreachMax: 500,
    agentHours: 42.5,
    agentMax: 100,
  }

  const invoices = [
    {
      id: "INV-2026-004",
      date: "01 Nov 2026",
      amountINR: "₹64,898.82",
      gstINR: "₹11,681.78",
      totalINR: "₹76,580.60",
      status: "Paid",
      hsn: "998311 (IT Software SaaS)",
      period: "Nov 2026 – Nov 2027",
    },
    {
      id: "INV-2025-012",
      date: "01 Nov 2025",
      amountINR: "₹59,999.00",
      gstINR: "₹10,799.82",
      totalINR: "₹70,798.82",
      status: "Paid",
      hsn: "998311",
      period: "Nov 2025 – Nov 2026",
    },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-blue-700">SaaS Monetization & Licensing</span>
            <Badge tone="green">Active: Professional Scale</Badge>
            <Badge tone="blue">GST Verified: 29AABCN8291M1Z4</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
            Subscription, Usage & Invoicing
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Manage your corporate tier, Indian payment methods (UPI / Net Banking / Cards), 18% GST tax invoices, and real-time AI quota meters.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="secondary" onClick={() => setTopUpModalOpen(true)}>
            <Zap size={15} /> Purchase Add-on Credits
          </Button>
          <Button onClick={() => setToast("Latest GST invoice downloaded as PDF")}>
            <Download size={15} /> Download Tax Invoice
          </Button>
        </div>
      </div>

      {/* Real-time Usage Telemetry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <Card className="p-4 border-l-4 border-l-blue-600">
          <div className="flex justify-between items-center text-xs text-gray-500 font-semibold uppercase">
            <span>Job Requisitions</span>
            <span className="text-blue-700 font-bold">{usage.jobsUsed}/{usage.jobsMax}</span>
          </div>
          <strong className="text-2xl font-extrabold text-gray-900 mt-1.5 block">
            {usage.jobsMax - usage.jobsUsed} Available
          </strong>
          <Progress value={(usage.jobsUsed / usage.jobsMax) * 100} tone="blue" />
          <small className="text-xs text-gray-500 mt-1 block">60% quota utilized this month</small>
        </Card>

        <Card className="p-4 border-l-4 border-l-purple-600">
          <div className="flex justify-between items-center text-xs text-gray-500 font-semibold uppercase">
            <span>Resume Unlocks</span>
            <span className="text-purple-700 font-bold">{usage.resumesUnlocked}/{usage.resumesMax}</span>
          </div>
          <strong className="text-2xl font-extrabold text-gray-900 mt-1.5 block">
            {usage.resumesMax - usage.resumesUnlocked} Remaining
          </strong>
          <Progress value={(usage.resumesUnlocked / usage.resumesMax) * 100} tone="purple" />
          <small className="text-xs text-gray-500 mt-1 block">Refreshes in 18 days</small>
        </Card>

        <Card className="p-4 border-l-4 border-l-emerald-600">
          <div className="flex justify-between items-center text-xs text-gray-500 font-semibold uppercase">
            <span>WhatsApp NVite Outreach</span>
            <span className="text-emerald-700 font-bold">{usage.outreachSent}/{usage.outreachMax}</span>
          </div>
          <strong className="text-2xl font-extrabold text-gray-900 mt-1.5 block">
            {usage.outreachMax - usage.outreachSent} Credits
          </strong>
          <Progress value={(usage.outreachSent / usage.outreachMax) * 100} tone="green" />
          <small className="text-xs text-gray-500 mt-1 block">68% response rate recorded</small>
        </Card>

        <Card className="p-4 border-l-4 border-l-amber-500">
          <div className="flex justify-between items-center text-xs text-gray-500 font-semibold uppercase">
            <span>AI Autonomous Engine</span>
            <span className="text-amber-700 font-bold">{usage.agentHours}h / 100h</span>
          </div>
          <strong className="text-2xl font-extrabold text-gray-900 mt-1.5 block">
            57.5 hrs left
          </strong>
          <Progress value={(usage.agentHours / usage.agentMax) * 100} tone="blue" />
          <small className="text-xs text-gray-500 mt-1 block">All 10 agents enabled</small>
        </Card>
      </div>

      {/* Plan Selection Section */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Configured Subscription Tiers</h3>
            <p className="text-xs text-gray-500">Upgrade or adjust quotas seamlessly. GST input tax credit available for Indian registered businesses.</p>
          </div>

          {/* Billing Cycle Switcher */}
          <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl w-fit">
            <button
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                billingCycle === "monthly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                billingCycle === "annual" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600"
              }`}
              onClick={() => setBillingCycle("annual")}
            >
              Annual Billing <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.2 rounded-full font-extrabold">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((p) => {
            const price = billingCycle === "annual" ? p.annualPriceINR : p.monthlyPriceINR
            return (
              <Card
                key={p.id}
                className={`p-5 flex flex-col justify-between transition ${
                  p.recommended ? "border-2 border-blue-600 shadow-lg relative bg-blue-50/20" : "hover:border-gray-300"
                }`}
              >
                {p.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-sm">
                    Most Popular in India
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-base text-gray-900">{p.name}</h4>
                    {p.current && <Badge tone="green">Current Plan</Badge>}
                  </div>

                  <p className="text-xs text-gray-500 mt-1 min-h-[32px]">{p.description}</p>

                  <div className="mt-4 mb-4">
                    <span className="text-3xl font-extrabold text-gray-900 font-mono">
                      {price === 0 ? "Free" : `₹${price.toLocaleString()}`}
                    </span>
                    {price > 0 && <span className="text-xs text-gray-500 ml-1">/ month + 18% GST</span>}
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-700 bg-white p-3 rounded-xl border border-gray-100 mb-4">
                    <div>📌 {p.jobLimit}</div>
                    <div>🔍 {p.resumeSearchCredits}</div>
                    <div>🤖 {p.agentAccess}</div>
                    <div>💬 {p.outreachChannels}</div>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-600">
                    <span className="font-bold text-gray-800 text-[11px] uppercase tracking-wider block mb-1">
                      Included Capabilities:
                    </span>
                    {p.features.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <Check size={13} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100">
                  {p.current ? (
                    <Button variant="secondary" className="w-full text-xs h-9 cursor-default bg-emerald-50 text-emerald-800 border-emerald-200">
                      <CheckCircle2 size={14} /> Currently Active
                    </Button>
                  ) : (
                    <Button
                      variant={p.recommended ? "primary" : "secondary"}
                      className="w-full text-xs h-9"
                      onClick={() => setUpgradePlanModal(p)}
                    >
                      {p.id === "free" ? "Downgrade to Free" : "Upgrade to " + p.name}
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* GST Invoicing Ledger */}
      <Card className="p-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">GST-Compliant Tax Invoices</h3>
            <p className="text-xs text-gray-500">Tax invoices registered with Indian GST e-invoicing portal (18% IGST/CGST/SGST).</p>
          </div>
          <Badge tone="green">GSTIN Verified</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-gray-800 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-2.5 px-3">Invoice ID</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Billing Period</th>
                <th className="py-2.5 px-3">Base Amount</th>
                <th className="py-2.5 px-3">18% GST</th>
                <th className="py-2.5 px-3">Total Paid</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50/60 transition">
                  <td className="py-3 px-3 font-mono font-bold text-gray-900">{inv.id}</td>
                  <td className="py-3 px-3">{inv.date}</td>
                  <td className="py-3 px-3">{inv.period}</td>
                  <td className="py-3 px-3 font-mono">{inv.amountINR}</td>
                  <td className="py-3 px-3 font-mono text-gray-500">{inv.gstINR}</td>
                  <td className="py-3 px-3 font-mono font-bold text-gray-900">{inv.totalINR}</td>
                  <td className="py-3 px-3">
                    <Badge tone="green">{inv.status}</Badge>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Button
                      variant="ghost"
                      className="h-7 text-xs text-blue-600 hover:text-blue-800"
                      onClick={() => setToast(`Downloaded tax invoice ${inv.id} with GST breakdown`)}
                    >
                      <Download size={13} /> PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* TOP-UP CREDITS MODAL */}
      {topUpModalOpen && (
        <Modal
          open={topUpModalOpen}
          onClose={() => setTopUpModalOpen(false)}
          title="Instant Add-On Credit Top-Up"
          footer={
            <>
              <Button variant="secondary" onClick={() => setTopUpModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setTopUpModalOpen(false)
                  setToast("Payment successful via UPI! 1,000 credits added to your workspace.")
                }}
              >
                Pay ₹4,999 + GST via UPI
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-xs text-gray-700">
            <p>Select credit booster pack to immediately increase monthly search or autonomous messaging quotas:</p>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-blue-50/70 border-2 border-blue-600 rounded-xl cursor-pointer">
                <Badge tone="blue">Popular</Badge>
                <strong className="block text-sm font-bold text-blue-900 mt-1">1,000 Resume Unlocks</strong>
                <span className="text-xs text-blue-700 font-semibold block mt-0.5">₹4,999 (+18% GST)</span>
                <small className="text-[10px] text-gray-500 mt-1 block">Valid for 90 days</small>
              </div>

              <div className="p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-400 cursor-pointer">
                <Badge tone="purple">WhatsApp Pack</Badge>
                <strong className="block text-sm font-bold text-gray-900 mt-1">2,500 WhatsApp NVites</strong>
                <span className="text-xs text-gray-700 font-semibold block mt-0.5">₹7,499 (+18% GST)</span>
                <small className="text-[10px] text-gray-500 mt-1 block">Includes delivery receipts</small>
              </div>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
              <span className="font-semibold text-gray-800">Preferred Indian Gateway:</span>
              <div className="flex gap-2">
                <span className="bg-white border px-2 py-0.5 rounded font-bold text-gray-700">UPI / QR</span>
                <span className="bg-white border px-2 py-0.5 rounded text-gray-500">Corporate Card</span>
                <span className="bg-white border px-2 py-0.5 rounded text-gray-500">Net Banking</span>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* UPGRADE PLAN MODAL */}
      {upgradePlanModal && (
        <Modal
          open={Boolean(upgradePlanModal)}
          onClose={() => setUpgradePlanModal(null)}
          title={`Confirm Tier Upgrade · ${upgradePlanModal.name}`}
          footer={
            <>
              <Button variant="secondary" onClick={() => setUpgradePlanModal(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const pName = upgradePlanModal.name
                  setUpgradePlanModal(null)
                  setToast(`Upgraded subscription to ${pName}! GST invoice dispatched to billing contact.`)
                }}
              >
                Confirm & Pay with Razorpay
              </Button>
            </>
          }
        >
          <div className="space-y-3 text-xs text-gray-700">
            <p>
              Upgrading from <strong>Professional Scale</strong> to <strong>{upgradePlanModal.name}</strong> will pro-rate the balance of your current billing period.
            </p>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
              <div className="flex justify-between">
                <span>New Tier:</span>
                <strong className="text-gray-900">{upgradePlanModal.name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Billing Frequency:</span>
                <strong className="text-gray-900 capitalize">{billingCycle}</strong>
              </div>
              <div className="flex justify-between text-blue-700 font-bold pt-1 border-t border-gray-200">
                <span>Estimated Payable:</span>
                <span>₹{(billingCycle === "annual" ? upgradePlanModal.annualPriceINR : upgradePlanModal.monthlyPriceINR).toLocaleString()} + 18% GST</span>
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
