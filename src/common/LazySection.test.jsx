import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import LazySection from './LazySection';

describe('LazySection', () => {
  let originalIntersectionObserver;

  beforeEach(() => {
    originalIntersectionObserver = window.IntersectionObserver;
  });

  afterEach(() => {
    delete document.documentElement.dataset.prerendered;
    window.IntersectionObserver = originalIntersectionObserver;
    vi.useRealTimers();
  });

  it('renders children immediately when IntersectionObserver is unavailable', () => {
    delete window.IntersectionObserver;

    render(
      <LazySection>
        <div>Visible content</div>
      </LazySection>
    );

    expect(screen.getByText('Visible content')).toBeInTheDocument();
  });

  it('renders children immediately on prerendered documents', () => {
    document.documentElement.dataset.prerendered = 'true';

    render(
      <LazySection>
        <div>Prerendered content</div>
      </LazySection>
    );

    expect(screen.getByText('Prerendered content')).toBeInTheDocument();
  });

  describe('animate prop', () => {
    beforeEach(() => {
      delete window.IntersectionObserver; // force isVisible=true immediately
      vi.useFakeTimers();
    });

    it('applies animating class before the 100ms timer fires', () => {
      render(
        <LazySection animate={true}>
          <div>Content</div>
        </LazySection>
      );

      const wrapper = screen.getByText('Content').parentElement;
      expect(wrapper).toHaveClass('lazy-section');
      expect(wrapper).toHaveClass('lazy-section--animating');
    });

    it('removes animating class after 100ms timer completes', () => {
      render(
        <LazySection animate={true}>
          <div>Content</div>
        </LazySection>
      );

      act(() => {
        vi.advanceTimersByTime(100);
      });

      const wrapper = screen.getByText('Content').parentElement;
      expect(wrapper).toHaveClass('lazy-section');
      expect(wrapper).not.toHaveClass('lazy-section--animating');
    });

    it('skips animation classes when animate is false', () => {
      render(
        <LazySection animate={false}>
          <div>Content</div>
        </LazySection>
      );

      const wrapper = screen.getByText('Content').parentElement;
      expect(wrapper).toHaveClass('lazy-section');
      expect(wrapper).not.toHaveClass('lazy-section--animating');
    });
  });
});
