import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../lib/firebase";

const GoLink = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  useEffect(() => {
    let query = db.collection("urls").where("code", "==", code);
    query.onSnapshot((data) => {
      if (data.empty) {
        return navigate("/");
      }
      let finalData = data.docs[0].data();
    });
  }, []);
  return <div>{code}</div>;
};

export default GoLink;
