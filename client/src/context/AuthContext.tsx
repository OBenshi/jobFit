
import React, { createContext, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { USER } from "../GraphQL/Queries";
import { ObjectId } from "mongodb";
import { datingTextNs, commentsNs } from "../../../server/src/@types";
interface userProfile {
  _id: ObjectId;
  username: string;
  firstName: string;
  lastName: string;
  birthday: string;
  email: string;
  password: string;
  rank: number;
  avatar?: string;
  loggedIn: boolean;
  datingTexts: Array<DatingText>;
  comments: Array<Comment>;
}

interface IAuthContext {
  isAuthenticated: boolean;
  user: userProfile | null;
  setUser: React.Dispatch<React.SetStateAction<userProfile | null>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const initAuthContext: IAuthContext = {
  isAuthenticated: false,
  user: null,
  setUser: () => {},
  setIsAuthenticated: () => {},
};

export const AuthContext = createContext<IAuthContext>(initAuthContext);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(initAuthContext.user);
  const [isAuthenticated, setIsAuthenticated] = useState(
    initAuthContext.isAuthenticated
  );
  const token = window.localStorage.getItem("token");
  const { error, loading, data } = useQuery(USER);

  useEffect(() => {
    if (token !== null) {
      console.log(token !== null, user);
      console.log(data);
      data && setUser(data.user);
      setIsAuthenticated(true);
    }
    //console.log(user!==null && user.username);
  }, [data]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, setIsAuthenticated, isAuthenticated }}
    >
      {" "}
      {children}
    </AuthContext.Provider>
  );
};
