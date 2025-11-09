export default function PatchCompiler() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">Patch Compiler</p>
        <h1 className="text-3xl font-semibold tracking-tight">From prototype to plug-in</h1>
      </header>
      <p className="text-muted-foreground">
        The compiler turns Lab patches into portable binaries. Target desktop plug-ins, command-line
        tools, or headless services with a single configuration so you can deliver sound systems
        wherever they need to run.
      </p>
    </main>
  )
}
