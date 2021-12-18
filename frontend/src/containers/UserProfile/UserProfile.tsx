import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Grid,
  Group,
  Text,
  Image,
  Avatar,
  useMantineTheme,
} from "@mantine/core";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Place } from "../../context/AuthContext";
import { useNotifications } from "@mantine/notifications";
import { spring } from "react-flip-toolkit";
import classes from "../PlacesHome/PlacesHome.module.scss";

const UserProfile = () => {
  const { username } = useParams<"username">();
  const [userPlaces, setUserPlaces] = useState<Place[]>();
  const notifications = useNotifications();
  const containerRef: any = useRef(null);
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  useEffect(() => {
    getUserPlaces().then(() => {
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
  }, []);

  const getUserPlaces = async () => {
    const url = `places/user/${username}`;

    try {
      const response: AxiosResponse = await axios.get(url);
      const places: Place[] = response.data?.places;
      if (places) {
        setUserPlaces(places);
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (err: AxiosError | any) {
      notifications.showNotification({
        message: err.message,
        color: "red",
      });
    }
  };

  const BadgeAvatar = ({ imgUrl }: { imgUrl: string }) => {
    return (
      <Avatar
        radius="xl"
        alt="Avatar for badge"
        size={17}
        style={{ marginRight: 5 }}
        src={imgUrl}
      />
    );
  };

  return (
    <Container className={classes.container} size="xl">
      <Grid ref={containerRef}>
        {userPlaces?.map((place: Place) => (
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
                <Badge
                  styles={{ root: { padding: "0 4px" } }}
                  color="pink"
                  variant="light"
                  leftSection={<BadgeAvatar imgUrl={place.creator.image} />}
                >
                  {place.creator.name}
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
                View
              </Button>
            </Card>
          </Col>
        ))}
      </Grid>
    </Container>
  );
};

export default UserProfile;
