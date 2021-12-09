import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import {
  AuthProvider,
  AuthContextInterface,
  defaultState,
} from "./context/AuthContext";
import { useState } from "react";

function App() {
  const [contextData, setContextData] =
    useState<AuthContextInterface>(defaultState);

  return (
    <AuthProvider value={contextData}>
      <div>
        <Header />
        <Routes></Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
