export const LoadingOverlay = () => {
  return (
    <div className="flex h-svh w-full items-center justify-center">
      <p role="status" className="font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground">
        Loading
      </p>
    </div>
  );
};
