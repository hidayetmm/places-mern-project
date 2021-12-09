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
  Button,
  Modal,
  TextInput,
  Checkbox,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { useForm } from "@mantine/hooks";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import classes from "./Header.module.scss";
import {
  DarkModeIcon,
  UserIcon,
  MessageIcon,
  SettingsIcon,
  SearchIcon,
  LogoutIcon,
} from "./Icons";

const HeaderComponent = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [loginOrLogout, setLoginOrLogout] = useState<string>("");
  const { colorScheme } = useMantineTheme();
  const { toggleDark } = useContext(ThemeContext);
  const { userData, setUserData } = useContext(AuthContext);
  const notifications = useNotifications();

  const signupForm = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      // termsOfService: false,
    },
    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
    },
  });

  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
      // termsOfService: false,
    },
    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
    },
  });

  const LoggedInMenu = () => (
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
  );

  const LoggedOutMenu = () => (
    <>
      <Button
        onClick={() => {
          setIsModalOpened(true);
          setLoginOrLogout("login");
        }}
      >
        Login
      </Button>
      <Button
        onClick={() => {
          setIsModalOpened(true);
          setLoginOrLogout("logout");
        }}
        variant="gradient"
        gradient={{ from: "teal", to: "blue", deg: 60 }}
      >
        Signup
      </Button>
    </>
  );

  const loginHandler = (values: { email: string; password: string }) => {
    console.log(values);

    const url = "http://localhost:7070/api/users/login";
    axios
      .post(url, values)
      .then((res: AxiosResponse) => {
        console.log(res.data.user);
        if (res.status === 200) {
          setIsModalOpened(false);

          const newUserData = {
            username: res.data.user.name,
            email: res.data.user.email,
            accessToken: "DUMMYACCESSTOKEN",
            isLoggedIn: true,
          };
          setUserData(newUserData);

          notifications.showNotification({
            message: `Welcome @${res.data.user.name}!`,
          });
        }
      })
      .catch((err: AxiosError) => {
        console.log(err);
        if (err.response?.status === 401) {
          notifications.showNotification({
            message: err.response?.data.message,
            color: "red",
          });
        }
      });
  };

  return (
    <Header fixed className={classes.header} height={60} padding="xl">
      <Title order={3}>Places</Title>

      <Group spacing="xl">
        <Switch
          checked={colorScheme === "dark" ? true : false}
          onChange={() => toggleDark(colorScheme === "light" ? true : false)}
          label={<DarkModeIcon />}
          className={classes.switch}
        />
        {userData.isLoggedIn ? <LoggedInMenu /> : <LoggedOutMenu />}
      </Group>
      <Modal
        centered
        opened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        title="Login"
      >
        {loginOrLogout === "login" ? (
          <form onSubmit={loginForm.onSubmit(loginHandler)}>
            <TextInput
              id="0"
              required
              label="Email"
              placeholder="your@email.com"
              {...loginForm.getInputProps("email")}
            />
            <TextInput
              id="1"
              required
              label="Password"
              {...loginForm.getInputProps("password")}
            />
            <Checkbox
              mt="md"
              label="Save the password"
              // {...loginForm.getInputProps("termsOfService", { type: "checkbox" })}
            />
            <Button style={{ float: "right" }} type="submit">
              Submit
            </Button>
          </form>
        ) : (
          <form onSubmit={signupForm.onSubmit((values) => console.log(values))}>
            <TextInput
              id="0"
              required
              label="Username"
              placeholder="Your username"
              {...signupForm.getInputProps("username")}
            />
            <TextInput
              id="1"
              required
              label="Email"
              placeholder="your@email.com"
              {...signupForm.getInputProps("email")}
            />
            <TextInput
              id="2"
              required
              label="Password"
              {...signupForm.getInputProps("password")}
            />
            <Checkbox
              mt="md"
              label="Save the password"
              // {...signupForm.getInputProps("termsOfService", {
              //   type: "checkbox",
              // })}
            />
            <Button style={{ float: "right" }} type="submit">
              Submit
            </Button>
          </form>
        )}
      </Modal>
    </Header>
  );
};

export default HeaderComponent;
