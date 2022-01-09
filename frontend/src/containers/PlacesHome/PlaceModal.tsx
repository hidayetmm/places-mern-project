import { FC } from "react";
import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Text,
  Modal,
  Avatar,
  useMantineTheme,
} from "@mantine/core";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Leaflet from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import { Place } from "../../context/AuthContext";
import { Link } from "react-router-dom";

let DefaultIcon = Leaflet.icon({
  ...Leaflet.Icon.Default.prototype.options,
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;

const PlaceModal: FC<{
  place: Place;
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
}> = ({ place, isModalVisible, setIsModalVisible }) => {
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];
  const BadgeAvatar = ({ imgUrl }: { imgUrl: string }) => {
    return (
      <Avatar
        radius="xl"
        alt="Avatar for badge"
        size={17}
        style={{ marginRight: 5 }}
        src={process.env.REACT_APP_SERVER_LINK + imgUrl}
      />
    );
  };

  return (
    <Modal
      centered
      opened={isModalVisible}
      onClose={() => setIsModalVisible(false)}
    >
      <Card shadow="sm" padding="lg">
        <Card.Section>
          <Image
            src={process.env.REACT_APP_SERVER_LINK + place!.image}
            height={180}
            alt={place?.title}
            fit="contain"
          />
        </Card.Section>
        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>{place?.title}</Text>
          <Badge
            styles={{ root: { padding: "0 4px", cursor: "pointer" } }}
            color="pink"
            variant="light"
            leftSection={<BadgeAvatar imgUrl={place!.creator.image} />}
            component={Link}
            to={`${place?.creator.name}`}
          >
            {place?.creator.name}
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
          {place?.description}
        </Text>
        <Text
          lineClamp={1}
          size="xs"
          style={{
            color: secondaryColor,
          }}
        >
          {place?.address}
        </Text>
        <div
          style={{
            height: 200,
          }}
        >
          <MapContainer
            center={[Number(place?.location.lat), Number(place?.location.lng)]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: 200 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[
                Number(place?.location.lat),
                Number(place?.location.lng),
              ]}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </Card>
    </Modal>
  );
};

export default PlaceModal;
