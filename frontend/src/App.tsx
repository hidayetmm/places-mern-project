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
    places: [
      {
        id: "0",
        title: "0",
        description: "0",
        image: "0",
        address: "0",
        location: { lat: "0", lng: "0" },
        creator: "0",
      },
      {
        id: "1",
        title: "1",
        description: "1",
        image: "1",
        address: "1",
        location: { lat: "1", lng: "1" },
        creator: "1",
      },
      {
        id: "2",
        title: "2",
        description: "2",
        image: "2",
        address: "2",
        location: { lat: "2", lng: "2" },
        creator: "2",
      },
      {
        id: "3",
        title: "3",
        description: "3",
        image: "3",
        address: "3",
        location: { lat: "3", lng: "3" },
        creator: "3",
      },
      {
        id: "4",
        title: "4",
        description: "4",
        image: "4",
        address: "4",
        location: { lat: "4", lng: "4" },
        creator: "4",
      },
      {
        id: "5",
        title: "5",
        description: "5",
        image: "5",
        address: "5",
        location: { lat: "5", lng: "5" },
        creator: "5",
      },
      {
        id: "6",
        title: "6",
        description: "6",
        image: "6",
        address: "6",
        location: { lat: "6", lng: "6" },
        creator: "6",
      },
      {
        id: "7",
        title: "7",
        description: "7",
        image: "7",
        address: "7",
        location: { lat: "7", lng: "7" },
        creator: "7",
      },
    ],
    setPlaces: (values: Place[]): void =>
      setContextData((prevState: AuthContextInterface) => ({
        ...prevState,
        places: values,
      })),
    fetchPlacesToggle: false,
    setFetchPlacesToggle: () =>
      setContextData((prevState: AuthContextInterface) => ({
        ...prevState,
        fetchPlacesToggle: !prevState.fetchPlacesToggle,
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
