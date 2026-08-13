export const LoadingOverlay = () => {
  return (
    <div className="flex h-svh w-full items-center justify-center bg-background px-5 text-foreground">
      <div role="status" className="w-full max-w-sm border-y border-current/25 py-5">
        <div className="flex items-center justify-between gap-6 font-mono text-xs font-semibold uppercase tracking-[0.12em]">
          <span>Loading portfolio</span>
          <span className="text-muted-foreground">Preparing the work</span>
        </div>
        <span className="mt-4 flex h-1 overflow-hidden" aria-hidden="true">
          <span className="loading-signal-segment w-1/4 bg-[#ff583d]" />
          <span className="loading-signal-segment w-1/4 bg-[#ffd400]" />
          <span className="loading-signal-segment w-1/4 bg-[#465bff]" />
          <span className="loading-signal-segment w-1/4 bg-[#74f0b3]" />
        </span>
      </div>
    </div>
  );
};
