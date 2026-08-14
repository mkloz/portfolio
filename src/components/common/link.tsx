'use client';

import type React from 'react';
import type { ElementType } from 'react';
import { flushSync } from 'react-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { preloadPortfolioRoute } from '@/lib/route-preload';
import { runViewTransition } from '@/lib/view-transition';

import { cn } from '../../lib/utils';
import { buttonVariants } from '../ui/button';

interface ConditionalLinkProps extends Omit<React.ComponentProps<typeof HashLink>, 'to'> {
  to?: string;
  as?: ElementType;
}

export const ConditionalLink: React.FC<ConditionalLinkProps> = ({ to, as = 'div', ...rest }) => {
  const Wrapper = to ? Link : as;

  return <Wrapper {...rest} to={to} />;
};

interface LinkProps extends Omit<React.ComponentProps<typeof HashLink>, 'to'> {
  to: string;
  withArrowRight?: boolean;
  withArrowLeft?: boolean;
  unstyled?: boolean;
}

const isWebLink = (url: string): boolean => url.startsWith('http://') || url.startsWith('https://');
const isNativeProtocol = (url: string): boolean => url.startsWith('mailto:') || url.startsWith('tel:');

export const Link = ({ onClick, withArrowRight, withArrowLeft, unstyled = false, to, ...props }: LinkProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle external links
  if (isWebLink(to) || isNativeProtocol(to)) {
    const opensNewTab = isWebLink(to);
    return (
      <a
        {...props}
        href={to}
        target={opensNewTab ? '_blank' : props.target}
        rel={opensNewTab ? 'noopener noreferrer' : props.rel}
        onClick={(e) => {
          onClick?.(e);
        }}
        className={cn(
          !unstyled && buttonVariants({ variant: 'link' }),
          'min-h-fit',
          (withArrowRight || withArrowLeft) && 'flex items-center group gap-1',
          props.className
        )}>
        {withArrowLeft && (
          <FiArrowLeft className="h-full aspect-square transform group-hover:-translate-x-1 transition-transform duration-300 stroke-3" />
        )}
        {props.children}
        {withArrowRight && (
          <FiArrowRight className="h-full aspect-square transform group-hover:translate-x-1 transition-transform duration-300 stroke-3" />
        )}
      </a>
    );
  }

  // Handle internal links
  const preloadRoute = () => void preloadPortfolioRoute(to);

  return (
    <HashLink
      {...props}
      to={to}
      onFocus={(event) => {
        props.onFocus?.(event);
        preloadRoute();
      }}
      onPointerEnter={(event) => {
        props.onPointerEnter?.(event);
        preloadRoute();
      }}
      onClick={(e) => {
        onClick?.(e);
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          props.target === '_blank'
        ) {
          return;
        }

        const destination = new URL(to, window.location.href);
        if (destination.pathname === location.pathname) return;

        e.preventDefault();
        const navigateToDestination = () => {
          flushSync(() => navigate(to));
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        };
        const transition = runViewTransition(navigateToDestination, { kind: 'route' });

        void transition.catch(() => navigateToDestination());

        if (destination.hash) {
          void transition.then(() => {
            window.requestAnimationFrame(() =>
              document.getElementById(destination.hash.slice(1))?.scrollIntoView({ block: 'start', behavior: 'auto' })
            );
          });
        }
      }}
      className={cn(
        !unstyled && buttonVariants({ variant: 'link' }),
        'min-h-fit',
        (withArrowRight || withArrowLeft) && 'flex items-center group gap-1',
        props.className
      )}>
      {withArrowLeft && (
        <FiArrowLeft className="h-full aspect-square transform group-hover:-translate-x-1 transition-transform duration-300 stroke-3" />
      )}
      {props.children}
      {withArrowRight && (
        <FiArrowRight className="h-full aspect-square transform group-hover:translate-x-1 transition-transform duration-300 stroke-3" />
      )}
    </HashLink>
  );
};
