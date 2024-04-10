import { PropsWithChildren, useEffect, useState } from "react";

type ConfigData = {
  [key: string]: unknown;
};

const mockAddThemeObject = (
  data: ConfigData
): ConfigData & { theme: { [key: string]: string } } => {
  return {
    ...data,
    theme: {
      "--button-bg": "blue",
      "--button-text": "grey",
    },
  };
};

const writeTheme = (theme: { [key: string]: string }) => {
  const entries = Object.entries(theme);
  for (const [property, value] of entries) {
    document.documentElement.style.setProperty(property, value);
  }
};

function sleep(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// mock request to get app configuration
export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [showUI, setShowUI] = useState(false);
  useEffect(() => {
    const fetchAppConfiguration = async () => {
      try {
        await sleep(2000);
        const response = await fetch(import.meta.env.VITE_CONFIG_URL);
        const rawData = (await response.json()) as ConfigData;
        const dataWithTheme = mockAddThemeObject(rawData);
        writeTheme(dataWithTheme.theme);
      } catch (err) {
        alert("Error loading styles, revert to default");
      } finally {
        setShowUI(true);
      }
    };

    fetchAppConfiguration();
  }, []);
  if (!showUI) return <p>loading....</p>;
  return <>{children}</>;
};
