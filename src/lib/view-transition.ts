type PortfolioViewTransition = {
  finished: Promise<void>;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => PortfolioViewTransition;
};

type TransitionOptions = {
  kind: 'route' | 'theme';
  x?: number;
  y?: number;
};

export const runViewTransition = (update: () => void | Promise<void>, options: TransitionOptions) => {
  const root = document.documentElement;
  const viewTransitionDocument = document as ViewTransitionDocument;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !viewTransitionDocument.startViewTransition) {
    return Promise.resolve(update()).then(() => undefined);
  }

  root.dataset.viewTransition = options.kind;
  if (options.x !== undefined) root.style.setProperty('--transition-x', `${options.x}px`);
  if (options.y !== undefined) root.style.setProperty('--transition-y', `${options.y}px`);

  const transition = viewTransitionDocument.startViewTransition(update);
  return transition.finished.finally(() => {
    delete root.dataset.viewTransition;
    root.style.removeProperty('--transition-x');
    root.style.removeProperty('--transition-y');
  });
};
