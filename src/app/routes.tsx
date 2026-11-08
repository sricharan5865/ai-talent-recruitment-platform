import { Navigate, Outlet, createBrowserRouter } from "react-router"
import AppShell from "./shells"
import { LoginPage, SimpleAuthPage } from "../pages/AuthPages"
import {
  CandidateProfilePage,
  CandidatesPage,
  CommunicationPage,
  CreateJobPage,
  EmployerDashboard,
  InterviewsPage,
  JobsPage,
  MatchingPage,
  PipelinePage,
} from "../pages/EmployerPages"
import {
  CandidateApplicationsPage,
  CandidateDashboard,
  CandidateProfileSelfPage,
  MarketplacePage,
} from "../pages/CandidatePages"
import { AdminDashboard } from "../pages/AdminPages"
import { OnboardingDemo } from "../pages/DemoPages"
import { ApplicationStudioPage, CompanyIntelligencePage, OpportunityRadarPage } from "../pages/CandidateFeaturePages"
import { UxAnalysisPage } from "../pages/UxAnalysisPage"
import { AdvancedSearchPage } from "../pages/AdvancedSearchPage"
import { AgentControlCenterPage } from "../pages/AgentControlCenterPage"
import { BillingPage } from "../pages/BillingPage"
import { EnterprisePage } from "../pages/EnterprisePage"
import { OutreachCampaignPage } from "../pages/OutreachCampaignPage"
import { PublicHomePage } from "../pages/PublicHomePage"
import { CandidateResumeVaultPage } from "../pages/CandidateResumeVaultPage"
import { CandidateAssistantPage } from "../pages/CandidateAssistantPage"
import { CandidateInterviewCenterPage } from "../pages/CandidateInterviewCenterPage"
import { CandidateSettingsPage } from "../pages/CandidateSettingsPage"
import { EmployerOffersPage } from "../pages/EmployerOffersPage"
import { EmployerAutomationsPage } from "../pages/EmployerAutomationsPage"
import { EmployerSettingsPage } from "../pages/EmployerSettingsPage"
import {
  AdminAuditLogsPage,
  AdminIntegrationsPage,
  AdminSecurityPage,
  AdminUsersPage,
  AnalyticsPage,
} from "../pages/AdminManagementPages"

export const router = createBrowserRouter([
  { path: "/", element: <PublicHomePage /> },
  { path: "/employer/login", element: <LoginPage type="employer" /> },
  { path: "/candidate/login", element: <LoginPage type="candidate" /> },
  {
    path: "/employer/register",
    element: <SimpleAuthPage kind="register" portal="employer" />,
  },
  {
    path: "/candidate/register",
    element: <SimpleAuthPage kind="register" portal="candidate" />,
  },
  {
    path: "/employer/forgot",
    element: <SimpleAuthPage kind="forgot" portal="employer" />,
  },
  {
    path: "/candidate/forgot",
    element: <SimpleAuthPage kind="forgot" portal="candidate" />,
  },
  {
    path: "/employer/onboarding",
    element: <OnboardingDemo portal="employer" />,
  },
  {
    path: "/candidate/onboarding",
    element: <OnboardingDemo portal="candidate" />,
  },
  {
    path: "/enterprise",
    element: (
      <AppShell portal="employer">
        <EnterprisePage />
      </AppShell>
    ),
  },
  {
    path: "/employer",
    element: (
      <AppShell portal="employer">
        <Outlet />
      </AppShell>
    ),
    children: [
      { index: true, element: <EmployerDashboard /> },
      { path: "jobs", element: <JobsPage /> },
      { path: "jobs/new", element: <CreateJobPage /> },
      { path: "candidates", element: <CandidatesPage /> },
      { path: "candidates/:id", element: <CandidateProfilePage /> },
      { path: "search", element: <AdvancedSearchPage /> },
      { path: "matching", element: <MatchingPage /> },
      { path: "pipeline", element: <PipelinePage /> },
      { path: "outreach", element: <OutreachCampaignPage /> },
      { path: "communication", element: <CommunicationPage /> },
      { path: "interviews", element: <InterviewsPage /> },
      { path: "agents", element: <AgentControlCenterPage /> },
      { path: "billing", element: <BillingPage /> },
      { path: "offers", element: <EmployerOffersPage /> },
      { path: "analytics", element: <AnalyticsPage portal="employer" /> },
      {
        path: "automations",
        element: <EmployerAutomationsPage />,
      },
      { path: "ux-analysis", element: <UxAnalysisPage /> },
      { path: "settings", element: <EmployerSettingsPage /> },
    ],
  },
  {
    path: "/candidate",
    element: (
      <AppShell portal="candidate">
        <Outlet />
      </AppShell>
    ),
    children: [
      { index: true, element: <CandidateDashboard /> },
      { path: "jobs", element: <MarketplacePage /> },
      { path: "radar", element: <OpportunityRadarPage /> },
      { path: "companies", element: <CompanyIntelligencePage /> },
      { path: "application-studio", element: <ApplicationStudioPage /> },
      { path: "applications", element: <CandidateApplicationsPage /> },
      { path: "profile", element: <CandidateProfileSelfPage /> },
      { path: "resume", element: <CandidateResumeVaultPage /> },
      { path: "assistant", element: <CandidateAssistantPage /> },
      { path: "interviews", element: <CandidateInterviewCenterPage /> },
      { path: "calendar", element: <CandidateInterviewCenterPage initialTab="calendar" /> },
      { path: "ux-analysis", element: <UxAnalysisPage /> },
      { path: "settings", element: <CandidateSettingsPage /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <AppShell portal="admin">
        <Outlet />
      </AppShell>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "agents", element: <AgentControlCenterPage /> },
      { path: "organizations", element: <EnterprisePage /> },
      { path: "users", element: <AdminUsersPage /> },
      { path: "subscriptions", element: <BillingPage /> },
      { path: "automations", element: <EmployerAutomationsPage /> },
      { path: "integrations", element: <AdminIntegrationsPage /> },
      { path: "analytics", element: <AnalyticsPage portal="admin" /> },
      { path: "security", element: <AdminSecurityPage /> },
      { path: "audit", element: <AdminAuditLogsPage /> },
      { path: "ux-analysis", element: <UxAnalysisPage /> },
      { path: "settings", element: <EmployerSettingsPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
], {
  basename: import.meta.env.BASE_URL,
})
