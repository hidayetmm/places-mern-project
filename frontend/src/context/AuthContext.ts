import React from "react";

export type User = {
  id: String;
  username: String;
  email: String;
  accessToken: String;
  image: string;
  isLoggedIn: Boolean;
};

export type Place = {
  title: String;
  description: String;
  image: String;
  address: String;
  location: { lat: String; lng: String };
  creator: String;
};

export interface AuthContextInterface {
  userData: User;
  setUserData: (values: User) => void;
  userPlaces: Place[];
  setUserPlaces: (values: Place[]) => void;
}

export const defaultState = {
  userData: {
    id: "",
    username: "",
    email: "",
    accessToken: "",
    image: "",
    isLoggedIn: false,
  },
  setUserData: () => {},
  userPlaces: [],
  setUserPlaces: () => {},
};

export const AuthContext =
  React.createContext<AuthContextInterface>(defaultState);

export const AuthProvider = AuthContext.Provider;
