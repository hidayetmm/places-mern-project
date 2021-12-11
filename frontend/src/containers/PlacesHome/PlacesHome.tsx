import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  Image,
  Text,
  Grid,
  Col,
  useMantineTheme,
} from "@mantine/core";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useEffect, useState } from "react";

const PlacesHome = () => {
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  type PlaceType = {
    id: string;
    title: string;
    description: string;
    image: string;
    address: string;
    location: {};
    creator: string;
  };
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const fetchedPlaces: AxiosResponse = await axios.get("/places");
      if (!places) {
        return alert("Couldn't find any place.");
      }
      setPlaces(fetchedPlaces.data?.places);
    } catch (err) {}
  };

  return (
    <Container style={{ paddingTop: 100 }} size="xl">
      <Grid>
        {places.map((place: PlaceType) => (
          <Col key={place.id} span={3}>
            <Card shadow="sm" padding="lg">
              <Card.Section>
                <Image src={place.image} height={160} alt="Norway" />
              </Card.Section>
              <Group
                position="apart"
                style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
              >
                <Text weight={500}>{place.title}</Text>
                <Badge color="pink" variant="light">
                  On Sale
                </Badge>
              </Group>
              <Text
                lineClamp={3}
                size="sm"
                style={{
                  color: secondaryColor,
                  lineHeight: 1.5,
                  minHeight: 65,
                  maxHeight: 65,
                }}
              >
                {place.description}
                With Fjord Tours you can explore more of the magical fjord
                landscapes with tours and activities on and around the fjords of
                Norway
              </Text>
              <Button
                variant="light"
                color="blue"
                fullWidth
                style={{ marginTop: 14 }}
              >
                Book classic tour now
              </Button>
            </Card>
          </Col>
        ))}
      </Grid>
    </Container>
  );
};

export default PlacesHome;
