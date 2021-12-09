import {
  Header,
  Title,
  useMantineTheme,
  Switch,
  UnstyledButton,
  Group,
  Text,
  Avatar,
  Menu,
  Divider,
} from "@mantine/core";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import classes from "./Header.module.scss";

const HeaderComponent = () => {
  const { colorScheme } = useMantineTheme();
  const { toggleDark } = useContext(ThemeContext);
  const DarkModeIcon = () => (
    <span className="material-icons-outlined">dark_mode</span>
  );
  const UserIcon = () => (
    <span className="material-icons-outlined">person</span>
  );
  const MessageIcon = () => (
    <span className="material-icons-outlined">email</span>
  );
  const SettingsIcon = () => (
    <span className="material-icons-outlined">settings</span>
  );
  const SearchIcon = () => (
    <span className="material-icons-outlined">search</span>
  );
  const LogoutIcon = () => (
    <span className="material-icons-outlined">logout</span>
  );

  return (
    <Header fixed className={classes.header} height={60} padding="xl">
      <Title order={3}>Places</Title>
      <Group spacing="xl">
        <Switch
          checked={colorScheme === "dark" ? true : false}
          onChange={() => toggleDark(colorScheme === "light" ? true : false)}
          label={<DarkModeIcon />}
          className={classes.switch}
          color="cyan"
        />

        <Menu
          classNames={{
            itemIcon: classes.userMenu,
          }}
          control={
            <UnstyledButton
              onClick={() => console.log("try focusing button with tab")}
            >
              <Group>
                <div>
                  <Text>Hidayat Mammadov</Text>
                  <Text size="xs" color="gray">
                    hidayetmmdv@gmail.com
                  </Text>
                </div>
                <Avatar
                  src="https://i.pravatar.cc/70?img=67"
                  size={40}
                  color="blue"
                />
              </Group>
            </UnstyledButton>
          }
        >
          <Menu.Label>Application</Menu.Label>
          <Menu.Item
            styles={{ itemIcon: { border: "1px solid yellow" } }}
            icon={<UserIcon />}
          >
            Profile
          </Menu.Item>
          <Menu.Item icon={<MessageIcon />}>Messages</Menu.Item>
          <Menu.Item icon={<SettingsIcon />}>Settings</Menu.Item>
          <Menu.Item
            icon={<SearchIcon />}
            rightSection={
              <Text size="xs" color="dimmed">
                ⌘K
              </Text>
            }
          >
            Search
          </Menu.Item>
          <Divider />
          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item color="red" icon={<LogoutIcon />}>
            Log out
          </Menu.Item>
        </Menu>
      </Group>
    </Header>
  );
};

export default HeaderComponent;
