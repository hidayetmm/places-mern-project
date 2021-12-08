import { FC, useState, useEffect } from "react";
import { MantineProvider, ColorScheme } from "@mantine/core";
import { ThemeContext } from "./context/ThemeContext";

const ThemeProvider: FC = ({ children }) => {
  const d = new Date();
  const currentHour = d.getHours();

  const [dark, setDark] = useState<Boolean>(
    currentHour >= 18 || currentHour <= 6 ? true : false
  );
  return (
    <ThemeContext.Provider
      value={{ toggleDark: (value: Boolean) => setDark(value) }}
    >
      <MantineProvider
        theme={{
          fontFamily: "Open Sans",
          colorScheme: dark ? "dark" : "light",
        }}
      >
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
