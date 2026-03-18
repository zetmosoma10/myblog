import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

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

const initialState: ThemeProviderType = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderType>(initialState);

const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "blog-theme",
  ...props
}: Props) => {
  const [theme, setTheme] = useState(
    () => (localStorage.getItem("blog-theme") as Theme) || defaultTheme,
  );

  const value = {
    theme,
    setTheme: (theme: Theme) => (
      localStorage.setItem("blog-theme", theme),
      setTheme(theme)
    ),
  };

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
