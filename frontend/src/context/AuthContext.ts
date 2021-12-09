import React from "react";

type Place = {
  title: String;
  description: String;
  image: String;
  address: String;
  location: { lat: String; lng: String };
  creator: String;
};

interface AuthContextInterface {
  userData: {
    username: String;
    email: String;
    accessToken: String;
  };
  setUserData: (value: Object) => void;
  userPlaces: Place[];
}

const defaultState = {
  userData: {
    username: "",
    email: "",
    accessToken: "",
  },
  setUserData: () => {},
  userPlaces: [],
};

export const AuthContext =
  React.createContext<AuthContextInterface>(defaultState);

//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   image: { type: String, required: true },
//   address: { type: String, required: true },
//   location: {
//     lat: { type: String, required: true },
//     lng: { type: String, required: true },
//   },
//   creator: { type: Types.ObjectId, required: true, ref: "User" },
