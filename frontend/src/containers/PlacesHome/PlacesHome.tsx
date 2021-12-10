import { Container } from "@mantine/core";
import { useEffect } from "react";

const PlacesHome = () => {
  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = () => {
    const url = "http://localhost:7070/api/places";
  };

  return <Container size="xl">Places</Container>;
};

export default PlacesHome;
