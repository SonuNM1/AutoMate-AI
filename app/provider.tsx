"use client";

import { UserDetailContext } from "@/context/UserDetailContext";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userDetail, setUserDetail] = useState<any>();

  useEffect(() => {
    createNewUser();
  }, []);

  const createNewUser = async () => {
    try {
      const result = await axios.post("/api/users");

      console.log("User Detail:", result.data);

      setUserDetail(result.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;