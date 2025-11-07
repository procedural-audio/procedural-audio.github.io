import { ArrowDownToLine } from "lucide-react"

const DOWNLOAD_BASE_URL = "https://github.com/procedural-audio/nodus/releases/download/latest"

const DOWNLOADS = [
  {
    platform: "macOS",
    filename: "procedure-macos.dmg",
    details: "Universal .dmg built each time a release tag lands.",
  },
  {
    platform: "Windows (x64)",
    filename: "procedure-windows-x64.zip",
    details: "Signed Windows build packaged as a portable .zip.",
  },
  {
    platform: "Linux (x64)",
    filename: "procedure-linux-x64.zip",
    details: "Bundle directory ready for AppImage-style launchers.",
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
            published. These links always point to the static <code>latest</code> release.
          </p>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {DOWNLOADS.map((download) => (
            <a
              key={download.filename}
              href={`${DOWNLOAD_BASE_URL}/${download.filename}`}
              className="group flex h-full flex-col gap-2 rounded-md border border-border/60 bg-background/70 px-4 py-3 transition-colors hover:bg-accent"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-base font-medium">{download.platform}</p>
                <ArrowDownToLine className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-y-0.5" />
              </div>
              <p className="text-sm text-muted-foreground">{download.details}</p>
            </a>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
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
