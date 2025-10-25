export default function PlaybackEngine() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">Playback Engine</p>
        <h1 className="text-3xl font-semibold tracking-tight">Runtime audio for interactive media</h1>
      </header>
      <p className="text-muted-foreground">
        The playback engine embeds Procedure patches inside games, installations, or native apps.
        Streamlined memory usage and deterministic scheduling make it a good fit for real-time
        experiences where timing matters.
      </p>
    </main>
  )
}
