import {
  ActionIcon,
  Group,
  Space,
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
import Noired from "./Noired";

const Home = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [hidden, sethidden] = useState(true);
  const [link, setLink] = useState("");
  const handleURL = async () => {
    let code = uid(4);
    setLoading(true);
    await db
      .collection("urls")
      .add({
        url: value,
        code: code,
      })
      .finally(() => {
        setLink(code);
        setValue("");
        setTimeout(() => {
          setLoading(false);
        }, 200);
      });
  };

  return (
    <>
      <Stack align="center" spacing="sm" sx={{ height: "100vh" }}>
        <Title sx={{ fontSize: 58 }} pt="xl">
          Noir
        </Title>
        <Text>Cover your URL with our service</Text>
        <TextInput
          sx={{ minWidth: "80%", maxWidth: "100%" }}
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
        <Space />
        {link == "" ? "" : <Noired path={window.location.href + link} />}
      </Stack>
    </>
  );
};

export default Home;
