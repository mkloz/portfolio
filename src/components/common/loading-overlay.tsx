const LOADING_SIGNALS = ['#ff583d', '#ffd400', '#465bff', '#74f0b3', '#6c4eff', '#f4f2ed', '#ff583d', '#ffd400'];

export const LoadingOverlay = ({ initial = false }: { initial?: boolean }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading selected work"
      className={
        initial
          ? 'initial-loading-overlay loading-stage fixed inset-0 z-[190] h-svh w-full overflow-hidden bg-[#080808] px-5 text-[#f4f2ed] md:px-8 lg:px-12'
          : 'loading-stage loading-stage-loop h-svh w-full overflow-hidden bg-[#080808] px-5 text-[#f4f2ed] md:px-8 lg:px-12'
      }>
      <span className="absolute inset-x-0 top-0 flex h-1" aria-hidden="true">
        {LOADING_SIGNALS.slice(0, 4).map((color) => (
          <span key={color} className="w-1/4" style={{ backgroundColor: color }} />
        ))}
      </span>

      <div className="content-shell flex h-full flex-col">
        <div className="flex min-h-16 items-center justify-between gap-6 border-b border-white/25 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/65 md:min-h-20 md:text-xs">
          <span>Portfolio / 2026</span>
          <span>Assembling</span>
        </div>

        <div className="grid flex-1 content-center gap-10 py-10 md:grid-cols-12 md:items-end md:gap-12">
          <div className="md:col-span-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-white/55">Selected</p>
            <p
              className="loading-stage-title mt-3 font-black uppercase leading-[0.78] tracking-[-0.06em]"
              aria-hidden="true">
              Work<span className="text-[#ff583d]">.</span>
            </p>
          </div>

          <div className="md:col-span-4">
            <div className="loading-cell-grid grid grid-cols-4 border-l border-t border-white/25" aria-hidden="true">
              {LOADING_SIGNALS.map((color, index) => (
                <span
                  key={`${color}-${index}`}
                  className="loading-cell relative aspect-square overflow-hidden border-b border-r border-white/25"
                  style={{ animationDelay: `${index * 55}ms` }}>
                  <span className="absolute inset-[18%]" style={{ backgroundColor: color }} />
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between gap-6 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/55 md:text-xs">
              <span>Interface / systems</span>
              <span>06 / 06</span>
            </div>
          </div>
        </div>

        <div className="flex min-h-16 items-center justify-between gap-6 border-t border-white/25 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/55 md:min-h-20 md:text-xs">
          <span>Questions first.</span>
          <span>Tools second.</span>
        </div>
      </div>
    </div>
  );
};
