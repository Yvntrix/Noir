import {
  ActionIcon,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { useState } from "react";
import { Target } from "tabler-icons-react";
import { uid } from "uid/secure";
import isURL from "validator/lib/isURL";
import { db } from "../lib/firebase";

const Home = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [hidden, sethidden] = useState(true);
  const handleURL = async () => {
    setLoading(true);
    await db.collection("urls").add({
      url: value,
      code: uid(4),
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <Stack align="center" spacing="sm" sx={{ height: "100vh" }}>
        <Title sx={{ fontSize: 58 }} pt="xl">
          Noir
        </Title>
        <Text>Cover your URL with our service</Text>
        <TextInput
          sx={{ width: "80%" }}
          size="md"
          radius="md"
          label="Your URL to cover:"
          placeholder="https://github.com/Yvntrix"
          value={value}
          onKeyDown={
            isURL(value, {
              require_protocol: true,
            })
              ? getHotkeyHandler([["Enter", handleURL]])
              : undefined
          }
          onChange={(event) => {
            setValue(event.currentTarget.value);
            if (event.currentTarget.value == "") {
              sethidden(true);
            } else {
              if (
                isURL(event.currentTarget.value, {
                  require_protocol: true,
                })
              ) {
                sethidden(true);
              } else {
                sethidden(false);
              }
            }
          }}
          rightSection={
            <ActionIcon
              disabled={
                !isURL(value, {
                  require_protocol: true,
                })
              }
              loading={loading}
              size="md"
              onClick={() => handleURL()}
            >
              <Target />
            </ActionIcon>
          }
        />
        <Group sx={{ width: "80%" }} position="left" hidden={hidden}>
          <Text color="red">Please input a valid URL</Text>
        </Group>
      </Stack>
    </>
  );
};

export default Home;
