import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"

const distDir = path.resolve(process.cwd(), "dist")
const gitExe = fs.existsSync("C:\\Users\\SRI CHARAN\\AppData\\Local\\Programs\\Git\\cmd\\git.exe")
  ? '"C:\\Users\\SRI CHARAN\\AppData\\Local\\Programs\\Git\\cmd\\git.exe"'
  : "git"

console.log("🚀 Deploying dist folder to gh-pages branch...")

try {
  execSync(`${gitExe} init`, { cwd: distDir, stdio: "inherit" })
  execSync(`${gitExe} checkout -B gh-pages`, { cwd: distDir, stdio: "inherit" })
  execSync(`${gitExe} add -A`, { cwd: distDir, stdio: "inherit" })
  execSync(`${gitExe} commit -m "Deploy production build to GitHub Pages"`, { cwd: distDir, stdio: "inherit" })
  execSync(`${gitExe} remote add origin https://github.com/sricharan5865/ai-talent-recruitment-platform.git`, { cwd: distDir, stdio: "ignore" })
  execSync(`${gitExe} push -f origin gh-pages`, { cwd: distDir, stdio: "inherit" })
  
  // Clean up nested git folder
  fs.rmSync(path.join(distDir, ".git"), { recursive: true, force: true })
  console.log("✅ Deployed successfully to gh-pages branch!")
} catch (err) {
  console.error("❌ Deploy failed:", err.message)
  process.exit(1)
}
