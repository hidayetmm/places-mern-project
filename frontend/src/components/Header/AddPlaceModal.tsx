import { FC, useState, SetStateAction, Dispatch } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { TextInput, Group, Text, Checkbox, Button } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/hooks";
import { UserImageIcon } from "./Icons";

const AddPlaceModal: FC<{
  setIsAddPlaceModalOpened: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsAddPlaceModalOpened }) => {
  const [placeImage, setPlaceImage] = useState<File[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const notifications = useNotifications();

  const placeForm = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      // termsOfService: false,
    },
    validationRules: {
      email: (value) => /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value),
    },
  });

  const addPlaceHandler = (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);
    if (placeImage) {
      formData.append("image", placeImage[0]);
    }
    const body = {
      name: values.username,
      email: values.email,
      password: values.password,
    };

    const url = "/users/signup";
    axios
      .post(url, formData)
      .then((res: AxiosResponse) => {
        setLoading(false);
        console.log(res.data.user);
        if (res.data.user) {
          setIsAddPlaceModalOpened(false);

          const newUserData = {
            id: res.data.user.id,
            username: res.data.user.name,
            email: res.data.user.email,
            accessToken: "DUMMYACCESSTOKEN",
            image: res.data.user.image,
            isLoggedIn: true,
          };
          //   setUserData(newUserData);
          localStorage.setItem("userData", JSON.stringify(newUserData));

          notifications.showNotification({
            message: `Welcome @${res.data.user.name}!`,
          });
        }
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        console.log(err);
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
      });
  };

  return (
    <div>
      <form onSubmit={placeForm.onSubmit(addPlaceHandler)}>
        <TextInput
          id="0"
          required
          label="Username"
          placeholder="Your username"
          {...placeForm.getInputProps("username")}
        />
        <TextInput
          id="1"
          required
          label="Email"
          placeholder="your@email.com"
          {...placeForm.getInputProps("email")}
        />
        <TextInput
          id="2"
          required
          label="Password"
          {...placeForm.getInputProps("password")}
        />
        <Group>
          <Dropzone
            multiple={false}
            styles={{
              root: {
                maxWidth: 60,
                maxHeight: 60,
              },
            }}
            onDrop={(files) => setPlaceImage(files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
          >
            {(status) => (
              <UserImageIcon
              // status={status}
              // style={{
              //   width: 80,
              //   height: 80,
              //   color: getIconColor(status, theme),
              // }}
              />
            )}
          </Dropzone>
          <Text size="sm" color="dimmed">
            Upload your profile image, just drop
          </Text>
        </Group>
        <Checkbox
          mt="md"
          label="Save the password"
          // {...placeForm.getInputProps("termsOfService", {
          //   type: "checkbox",
          // })}
        />
        <Button loading={loading} style={{ float: "right" }} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddPlaceModal;
