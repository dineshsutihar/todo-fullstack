"use client"
import React, { useState } from "react";

import UserContext from "./UserContext";

export const UserContextProvider: any = ({ children }: any) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
