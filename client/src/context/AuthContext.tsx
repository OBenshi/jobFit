/* import React, {createContext, useState, useEffect  } from 'react'

export const initAuthContext = createContext<AuthContext>({
    isAuthenticated: true,
    user: "",
})



interface AuthContext {
    isAuthenticated: boolean,
    user: string
}

export const AuthContext = createContext([{}] as any);

export const AuthContextProvider: React.FC = ({children}) => {
    const [user, setUser] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState();

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )

} */

//NOTE need to check if the Context is created correctly. Also we need query on the back for the single user to query it from here. We need it for names by the comments ect.//

import React, { createContext, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { USER } from "../GraphQL/Queries";
<<<<<<< HEAD
=======
import { ObjectId } from "mongodb";
>>>>>>> 71c5b8b809decc23467d3e16788e79d97554e9c6
import { datingTextNs, commentsNs } from "../../../server/src/@types";
import { ObjectId } from "mongoose";
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
  datingTexts: Array<datingTextNs.datingText>;
  comments: Array<commentsNs.comment>;
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

//export const AuthContext = createContext(initAuthContext);
//export const AuthContext = createContext<React.Dispatch<React.SetStateAction<IAuthContext>> | undefined>(undefined);

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
      setUser(data);
      setIsAuthenticated(false);
    } else {
      // isAuthenticated(true);
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
