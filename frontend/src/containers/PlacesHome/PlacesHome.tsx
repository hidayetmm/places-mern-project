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
import classes from "./PlacesHome.module.scss";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useEffect, useContext, useRef } from "react";
import { useNotifications } from "@mantine/notifications";
import { AuthContext, Place } from "../../context/AuthContext";
import { spring } from "react-flip-toolkit";

const PlacesHome = () => {
  const { places, setPlaces, fetchPlacesToggle } = useContext(AuthContext);
  const theme = useMantineTheme();
  const notifications = useNotifications();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const containerRef: any = useRef(null);
  useEffect(() => {
    fetchPlaces().then(() => {
      const boxes = [...containerRef.current.querySelectorAll(".boxItem")];
      boxes.forEach((el, i) => {
        spring({
          config: "gentle",
          values: {
            translateY: [-15, 0],
            opacity: [0, 1],
          },
          onUpdate: (props: any) => {
            el.style.opacity = props.opacity;
            el.style.transform = `translateY(${props.translateY}px)`;
          },
          // delay: i * 25,
          delay: i * 100,
          onComplete: () => {
            // add callback logic here if necessary
          },
        });
      });
    });
  }, [fetchPlacesToggle]);

  const fetchPlaces = async () => {
    try {
      const fetchedPlaces: AxiosResponse = await axios.get("/places");

      if (!fetchedPlaces) {
        return notifications.showNotification({
          message: "Couldn't find any place",
          color: "red",
        });
      }

      setPlaces(fetchedPlaces.data?.places.reverse());
    } catch (err: AxiosError | any) {
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
      <Grid ref={containerRef}>
        {places.map((place: Place) => (
          <Col
            key={place.id}
            span={3}
            className={`boxItem ${classes.opacity_0}`}
          >
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
          </Col>
        ))}
      </Grid>
    </Container>
  );
};

export default PlacesHome;
