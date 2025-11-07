import { ArrowDownToLine } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const DOWNLOAD_BASE_URL = "https://github.com/procedural-audio/nodus/releases/download/latest"

type DownloadInstruction = {
  text: string
  code?: string
}

type DownloadArtifact = {
  filename: string
  label: string
  description: string
}

type DownloadTab = {
  slug: string
  label: string
  summary: string
  instructions: DownloadInstruction[]
  artifacts: DownloadArtifact[]
}

const DOWNLOADS: DownloadTab[] = [
  {
    slug: "macos",
    label: "macOS",
    summary: "Universal .dmg with binaries signed for Apple silicon and Intel Macs.",
    instructions: [
      { text: "Download the disk image and open it from Finder." },
      { text: "Drag Procedure into Applications or another preferred folder." },
      { text: "On the first launch, control-click the app and choose Open to approve Gatekeeper." },
    ],
    artifacts: [
      {
        filename: "procedure-macos.dmg",
        label: "Universal DMG",
        description: "Signed bundle for both Apple silicon and Intel machines.",
      },
    ],
  },
  {
    slug: "windows",
    label: "Windows",
    summary: "Portable .zip containing the Procedure.exe runner for Windows 10/11.",
    instructions: [
      { text: "Download the archive and extract it with Extract All." },
      { text: "Keep the extracted folder intact so the resources stay co-located." },
      { text: "Launch Procedure.exe and allow Windows Defender SmartScreen if prompted." },
    ],
    artifacts: [
      {
        filename: "procedure-windows-x64.zip",
        label: "Windows Zip",
        description: "Includes Procedure.exe and all dependent resources.",
      },
    ],
  },
  {
    slug: "linux",
    label: "Linux",
    summary: "Choose the portable zip bundle or the snap package depending on your distro.",
    instructions: [
      { text: "Use the zip bundle for maximum portability on glibc-based distributions." },
      { text: "Prefer the snap if your system runs snapd and you want automatic desktop integration." },
      { text: "Zip build: extract, run", code: "./procedure" },
      { text: "If the binary isn't executable, enable it with", code: "chmod +x procedure" },
      { text: "Snap build: install with", code: "sudo snap install --dangerous procedure-linux-amd64.snap" },
      { text: "Flatpak bundle: install locally with", code: "flatpak install --user ./procedure-linux-flatpak.flatpak" },
    ],
    artifacts: [
      {
        filename: "procedure-linux-x64.zip",
        label: "Bundle (.zip)",
        description: "Extract anywhere, mark executable, and launch ./procedure.",
      },
      {
        filename: "procedure-linux-amd64.snap",
        label: "Snap (.snap)",
        description: "Side-load via snap install --dangerous on snapd-enabled distros.",
      },
      {
        filename: "procedure-linux-flatpak.flatpak",
        label: "Flatpak (.flatpak)",
        description: "Offline Flatpak bundle installable with flatpak install --bundle.",
      },
    ],
  },
] as const

export default function ProcedureStudioPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">Procedure Studio</p>
        <h1 className="text-3xl font-semibold tracking-tight">Design procedural audio systems</h1>
      </header>
      <p className="text-muted-foreground">
        Procedure Studio is the primary authoring environment for building generative patches. Sketch
        node graphs, audition variations in real time, and document your signal flow before handing off
        to the rest of the suite.
      </p>
      <section className="rounded-lg border border-border/60 bg-card/40 p-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">Download the latest build</h2>
          <p className="text-sm text-muted-foreground">
            Desktop artifacts are produced by the nodus GitHub Actions workflow whenever a release tag is
            published. Pick your platform to see install instructions sourced from the static{" "}
            <code>latest</code> release.
          </p>
        </div>
        <Tabs defaultValue={DOWNLOADS[0].slug} className="mt-4 space-y-4">
          <TabsList className="flex flex-wrap gap-2">
            {DOWNLOADS.map((download) => (
              <TabsTrigger key={download.slug} value={download.slug} className="px-4">
                {download.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {DOWNLOADS.map((download) => (
            <TabsContent key={download.slug} value={download.slug} className="mt-2">
              <div className="space-y-4 rounded-md border border-border/60 bg-background/70 p-4">
                <div className="space-y-1">
                  <p className="text-base font-medium">{download.label} instructions</p>
                  <p className="text-sm text-muted-foreground">{download.summary}</p>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {download.instructions.map((step, index) => (
                    <li key={`${download.slug}-step-${index}`} className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary/80"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">
                        {step.text}
                        {step.code ? (
                          <>
                            {" "}
                            <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">
                              {step.code}
                            </code>
                          </>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3">
                  {download.artifacts.map((artifact) => (
                    <div
                      key={artifact.filename}
                      className="flex flex-wrap items-center justify-between gap-3 rounded border border-border/60 bg-background px-3 py-2"
                    >
                      <div>
                        <p className="text-sm font-medium">{artifact.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {artifact.description}{" "}
                          <span className="font-mono text-foreground">{artifact.filename}</span>
                        </p>
                      </div>
                      <a
                        href={`${DOWNLOAD_BASE_URL}/${artifact.filename}`}
                        className="inline-flex items-center gap-2 rounded-md border border-border/50 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                      >
                        <ArrowDownToLine className="h-4 w-4" />
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <p className="text-xs text-muted-foreground">
          Full release notes and checksums are available on{" "}
          <a
            className="underline underline-offset-2 hover:text-foreground"
            href="https://github.com/procedural-audio/nodus/releases/tag/latest"
          >
            the static GitHub release
          </a>
          .
        </p>
      </section>
    </main>
  )
}
