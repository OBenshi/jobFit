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
import { useQuery, gql } from '@apollo/client'
import { USER } from '../GraphQL/Queries';

 interface IAuthContext {
        isAuthenticated: boolean,
        user: string,
}

const initAuthContext:IAuthContext = {
        isAuthenticated: false,
        user: "",
} 

export const AuthContext = createContext(initAuthContext);

export const AuthContextProvider: React.FC = ({children}) => {
    const [user, setUser] = useState(initAuthContext.user);
    const [isAuthenticated, setIsAuthenticated] = useState(initAuthContext.isAuthenticated);
    const token = window.localStorage.getItem("token");
    const { error, loading, data } = useQuery(USER);

    useEffect(() => {
      if (token !== null) {
        console.log(token !== null, user);
        /* const config = {
          headers: { Authorization: `Bearer ${token}` },
          }; */
          //where do I place the config??
          console.log(data);
          setUser(data)
          setIsAuthenticated(false);
      } else {
         // isAuthenticated(true);
      }
    }, [data]);


    return (
        <AuthContext.Provider value={{user, isAuthenticated}}> {children}</AuthContext.Provider> 
    )

}