import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContextInterface } from "./context/AuthContext";
import { useState } from "react";
import PlacesHome from "./containers/PlacesHome/PlacesHome";
import "./App.css";
import Axios from "axios";
import { AppShell } from "@mantine/core";
import Footer from "./components/Footer/Footer";

function App() {
  Axios.defaults.baseURL = "http://localhost:7070/api/";

  const defaultState = {
    userData: {
      username: "",
      email: "",
      accessToken: "",
      isLoggedIn: false,
    },
    setUserData: (values: any) =>
      setContextData((prevState: AuthContextInterface) => ({
        ...prevState,
        userData: values,
      })),
    userPlaces: [],
  };

  const [contextData, setContextData] =
    useState<AuthContextInterface>(defaultState);

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
          </Routes>
        </div>
        <Footer />
      </AppShell>
    </AuthProvider>
  );
}

export default App;
