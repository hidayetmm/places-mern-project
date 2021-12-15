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
  Skeleton,
} from "@mantine/core";
import classes from "./PlacesHome.module.scss";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useEffect, useContext, useState } from "react";
import { useNotifications } from "@mantine/notifications";
import { AuthContext, Place } from "../../context/AuthContext";

const PlacesHome = () => {
  const [loading, setLoading] = useState(false);
  const { places, setPlaces, fetchPlacesToggle } = useContext(AuthContext);
  const theme = useMantineTheme();
  const notifications = useNotifications();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlacesToggle]);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const fetchedPlaces: AxiosResponse = await axios.get("/places");
      setLoading(false);

      if (!places) {
        return notifications.showNotification({
          message: "Couldn't find any place",
          color: "red",
        });
      }

      setPlaces(fetchedPlaces.data?.places.reverse());
    } catch (err: AxiosError | any) {
      setLoading(false);

      if (axios.isAxiosError(err)) {
        console.log(err?.response);
        notifications.showNotification({
          message: err.response?.data.message,
          color: "red",
        });
      } else {
        notifications.showNotification({
          message: err?.message,
          color: "red",
        });
      }
    }
  };

  return (
    <Container className={classes.container} size="xl">
      <Grid>
        {places.map((place: Place) => (
          <Col key={place.id} span={3}>
            <Skeleton visible={loading}>
              <Card shadow="sm" padding="lg">
                <Card.Section>
                  <Image
                    src={place.image}
                    height={180}
                    alt={place.title}
                    fit="contain"
                  />
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
                </Text>
                <Text
                  lineClamp={1}
                  size="xs"
                  style={{
                    color: secondaryColor,
                  }}
                >
                  {place.address}
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
            </Skeleton>
          </Col>
        ))}
      </Grid>
    </Container>
  );
};

export default PlacesHome;
