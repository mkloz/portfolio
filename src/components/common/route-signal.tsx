import { useLocation } from 'react-router-dom';

const SIGNALS = ['#ff583d', '#ffd400', '#465bff', '#74f0b3'] as const;

export const RouteSignal = () => {
  const location = useLocation();

  return (
    <div className="route-signal pointer-events-none fixed inset-x-0 top-0 z-[180] h-1" aria-hidden="true">
      <span key={`${location.pathname}${location.search}`} className="flex h-full">
        {SIGNALS.map((color, index) => (
          <span
            key={color}
            className="route-signal-channel h-full w-1/4 origin-left"
            style={{ backgroundColor: color, animationDelay: `${index * 45}ms` }}
          />
        ))}
      </span>
    </div>
  );
};
