import { FC, useState, useContext, SetStateAction, Dispatch } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { TextInput, Group, Text, Button, Textarea } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/hooks";
import { PlaceIcon } from "./Icons";
import classes from "./Header.module.scss";
import { AuthContext } from "../../context/AuthContext";

const AddPlaceModal: FC<{
  setIsAddPlaceModalOpened: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsAddPlaceModalOpened }) => {
  const [placeImage, setPlaceImage] = useState<File[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const { userData, setFetchPlacesToggle } = useContext(AuthContext);

  const notifications = useNotifications();

  const placeForm = useForm({
    initialValues: {
      title: "",
      description: "",
      address: "",
    },
    // validationRules: {
    //   email: (value) => /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value),
    // },
  });

  const addPlaceHandler = (values: {
    title: string;
    description: string;
    address: string;
  }) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("address", values.address);
    formData.append("creator", userData.id);
    if (placeImage) {
      formData.append("image", placeImage[0]);
    }

    const url = "places";
    axios
      .post(url, formData)
      .then((res: AxiosResponse) => {
        setLoading(false);
        setFetchPlacesToggle();
        console.log(res);
        if (res.data.place) {
          setIsAddPlaceModalOpened(false);

          notifications.showNotification({
            message: "Place successfully added!",
          });
        }
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        if (err.response?.data.includes("LIMIT_FILE_SIZE")) {
          notifications.showNotification({
            message: "File size exceeded.",
            color: "red",
          });
        } else {
          if (err.response?.data.message) {
            notifications.showNotification({
              message: err.response?.data.message,
              color: "red",
            });
          } else {
            notifications.showNotification({
              message: err.message,
              color: "red",
            });
          }
        }
      });
  };

  return (
    <div>
      <form onSubmit={placeForm.onSubmit(addPlaceHandler)}>
        <Group
          style={{ padding: "20px 0 20px 0" }}
          direction="row"
          noWrap
          grow
          position="center"
          align="stretch"
        >
          <Group className={classes.placeModalInputs} direction="column">
            <TextInput
              className={classes.textInput}
              id="0"
              required
              label="Title"
              {...placeForm.getInputProps("title")}
            />
            <TextInput
              className={classes.textInput}
              id="1"
              required
              label="Address"
              {...placeForm.getInputProps("address")}
            />
            <Textarea
              className={classes.textInput}
              id="2"
              required
              label="Description"
              {...placeForm.getInputProps("description")}
            />
          </Group>
          <Dropzone
            styles={{
              root: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
            multiple={false}
            onDrop={(files) => setPlaceImage(files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
          >
            {(status) => (
              <Group
                position="center"
                spacing="xl"
                style={{ pointerEvents: "none" }}
              >
                <div className={classes.imageIcon}>
                  <PlaceIcon
                  // status={status}
                  // style={{
                  //   width: 80,
                  //   height: 80,
                  //   color: getIconColor(status, theme),
                  // }}
                  />
                </div>
                <div>
                  <Text inline>Drag image here or click to select</Text>
                  {/* <Text size="sm" color="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not
                    exceed 5mb
                  </Text> */}
                </div>
              </Group>
            )}
          </Dropzone>
        </Group>

        <Button loading={loading} style={{ float: "right" }} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddPlaceModal;
