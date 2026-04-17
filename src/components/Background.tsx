export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-grid-pattern opacity-[0.35]"
        style={{
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)"
        }}
      />
      <div className="absolute inset-x-0 top-0 h-[560px] bg-radial-fade" />
      <div className="absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -right-32 top-2/3 h-80 w-80 rounded-full bg-accent-2/10 blur-3xl" />
    </div>
  )
}
