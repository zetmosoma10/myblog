import { createClientOnlyFn } from "@tanstack/react-start";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// * Types
type Props = {
  children: ReactNode;
  defaultTheme?: string;
  storageKey?: string;
};

type Theme = "dark" | "light" | "system";

type ThemeProviderType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// * Context
const initialState: ThemeProviderType = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderType>(initialState);

// * Client Only Code
const getThemeFromLoacalStorage = createClientOnlyFn(
  () => localStorage.getItem("blog-theme") as Theme,
);

const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "blog-theme",
  ...props
}: Props) => {
  const [theme, setTheme] = useState(defaultTheme as Theme);

  const value = {
    theme,
    setTheme: (theme: Theme) => (
      localStorage.setItem("blog-theme", theme),
      setTheme(theme)
    ),
  };

  // * Read localStorage only on client after mount
  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export default ThemeProvider;
