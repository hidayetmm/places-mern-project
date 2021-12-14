import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import {
  AuthProvider,
  AuthContextInterface,
  User,
  Place,
} from "./context/AuthContext";
import { useState, useEffect } from "react";
import PlacesHome from "./containers/PlacesHome/PlacesHome";
import "./App.css";
import Axios from "axios";
import { AppShell, useMantineTheme } from "@mantine/core";
import Footer from "./components/Footer/Footer";
import Profile from "./containers/Profile/Profile";

function App() {
  Axios.defaults.baseURL = "http://localhost:7070/api/";

  const storedUserData = localStorage.getItem("userData");

  const defaultState = {
    userData: storedUserData
      ? JSON.parse(storedUserData)
      : {
          id: "",
          username: "",
          email: "",
          accessToken: "",
          image: "",
          isLoggedIn: false,
        },
    setUserData: (values: User): void =>
      setContextData((prevState: AuthContextInterface) => ({
        ...prevState,
        userData: values,
      })),
    userPlaces: [],
    setUserPlaces: (values: Place[]): void =>
      setContextData((prevState: AuthContextInterface) => ({
        ...prevState,
        userPlaces: values,
      })),
  };

  const [contextData, setContextData] =
    useState<AuthContextInterface>(defaultState);

  const { colorScheme, colors } = useMantineTheme();
  useEffect(() => {
    if (colorScheme === "dark") {
      document.body.style.backgroundColor = colors.dark[8];
    } else if (colorScheme === "light") {
      document.body.style.backgroundColor = colors.gray[0];
    }
  }, [colorScheme, colors]);

  return (
    <AuthProvider value={contextData}>
      <AppShell
        padding={0}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <Header />
        <div className="main">
          <Routes>
            <Route path="/" element={<PlacesHome />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </AppShell>
    </AuthProvider>
  );
}

export default App;
