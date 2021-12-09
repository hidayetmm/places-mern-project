import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import {
  AuthProvider,
  AuthContextInterface,
  defaultState,
} from "./context/AuthContext";
import { useState } from "react";
import PlacesHome from "./containers/PlacesHome/PlacesHome";
import "./App.css";

function App() {
  const [contextData, setContextData] =
    useState<AuthContextInterface>(defaultState);

  return (
    <AuthProvider value={contextData}>
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<PlacesHome />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
