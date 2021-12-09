import React from "react";

type Place = {
  title: String;
  description: String;
  image: String;
  address: String;
  location: { lat: String; lng: String };
  creator: String;
};

export interface AuthContextInterface {
  userData: {
    username: String;
    email: String;
    accessToken: String;
    isLoggedIn: Boolean;
  };
  setUserData: (value: Object) => void;
  userPlaces: Place[];
}

export const defaultState = {
  userData: {
    username: "",
    email: "",
    accessToken: "",
    isLoggedIn: false,
  },
  setUserData: () => {},
  userPlaces: [],
};

export const AuthContext =
  React.createContext<AuthContextInterface>(defaultState);

export const AuthProvider = AuthContext.Provider;
