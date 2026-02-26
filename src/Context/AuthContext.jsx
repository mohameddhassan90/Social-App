import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthContextprovider({ children }) {


  const [userData, setUser] = useState(null);
  const [isLogin, setLogin] = useState(localStorage.getItem("token"));

  async function getUserData(token) {
    try {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/users/profile-data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(data?.data?.user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    getUserData(token);
  }, [isLogin]);

  return (
    <authContext.Provider value={{ isLogin, setLogin ,userData }}>
      {children}
    </authContext.Provider>
  );
}
