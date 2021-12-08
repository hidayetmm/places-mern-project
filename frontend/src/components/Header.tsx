import { Header, Button, useMantineTheme } from "@mantine/core";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const HeaderComponent = () => {
  const { colorScheme } = useMantineTheme();
  const { toggleDark } = useContext(ThemeContext);

  return (
    <Header height={60} padding="xs">
      <Button
        onClick={() => toggleDark(colorScheme === "light" ? true : false)}
      >
        Light/Dark
      </Button>
    </Header>
  );
};

export default HeaderComponent;
