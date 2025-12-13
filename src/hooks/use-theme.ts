import { useThemeStore } from "@/stores/theme.store";
import { useEffect } from "react";

export const useTheme = () => {
  const { theme, setTheme, applyTheme } = useThemeStore();

  // Initialize theme on mount and listen for system theme changes
  useEffect(() => {
    applyTheme(theme);

    // Listen for system theme changes if using system theme
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = () => {
        applyTheme("system");
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, [theme, applyTheme]);

  return {
    theme,
    setTheme,
  };
};
