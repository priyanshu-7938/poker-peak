import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

export const useGetUser = () => {
  const [user, setUser] = useState();
  const address = useAddress();

  console.log("address : ", address);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("address", address);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    fetch("http://localhost:2024/userData", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result : ", JSON.parse(result));
        setUser(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  }, [address]);

  return user;
};
