"use client";

import { type PropsWithChildren } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

export function SkeletonThemeProvider({ children }: PropsWithChildren) {
  return (
    <SkeletonTheme
      baseColor="var(--skeleton-base-color)"
      highlightColor="var(--skeleton-highlight-color)"
      direction="ltr"
      duration={1.5}
    >
      {children}
    </SkeletonTheme>
  );
}
