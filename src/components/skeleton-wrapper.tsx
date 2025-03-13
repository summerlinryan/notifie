"use client";

import { useTheme } from "next-themes";
import { SkeletonTheme } from "react-loading-skeleton";

export default function SkeletonWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <SkeletonTheme
      baseColor={isDark ? "#2a2a2a" : "#ebebeb"}
      highlightColor={isDark ? "#3a3a3a" : "#f5f5f5"}
    >
      {children}
    </SkeletonTheme>
  );
}
