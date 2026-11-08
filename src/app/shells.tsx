import type { ReactNode } from "react"
import { AppShell as Shell } from "../components/layout/AppShell"
import { adminNav, candidateNav, employerNav } from "../components/layout/nav"

export default function AppShell({
  portal,
  children,
}: {
  portal: "employer" | "candidate" | "admin"
  children: ReactNode
}) {
  return (
    <Shell
      portal={
        portal === "employer"
          ? "Employer"
          : portal === "candidate"
            ? "Candidate"
            : "Platform Admin"
      }
      nav={
        portal === "employer"
          ? employerNav
          : portal === "candidate"
            ? candidateNav
            : adminNav
      }
    >
      {children}
    </Shell>
  )
}
