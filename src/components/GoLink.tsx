import { Center, Loader, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../lib/firebase";

const GoLink = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    let query = db.collection("urls").where("code", "==", code);
    query.onSnapshot((data) => {
      if (data.empty) {
        return navigate("/");
      }
      let finalData = data.docs[0].data();
      window.location.replace(finalData.url);
    });
  }, []);
  return (
    <>
      <Stack align="center" justify="center" sx={{ height: "100vh" }}>
        <Center>
          <Loader color="gray" />
        </Center>
      </Stack>
    </>
  );
};

export default GoLink;
