import { Header, Title, useMantineTheme, Switch } from "@mantine/core";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import classes from "./Header.module.scss";

const HeaderComponent = () => {
  const { colorScheme } = useMantineTheme();
  const { toggleDark } = useContext(ThemeContext);

  return (
    <Header fixed className={classes.header} height={60} padding="lg">
      <Title order={3}>Places</Title>
      <Switch
        checked={colorScheme === "dark" ? true : false}
        onChange={() => toggleDark(colorScheme === "light" ? true : false)}
        label={<span className="material-icons-outlined">dark_mode</span>}
        className={classes.switch}
      />
    </Header>
  );
};

export default HeaderComponent;
