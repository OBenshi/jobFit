import React, {createContext, useState, useEffect  } from 'react'

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

}
//NOTE need to check if the Context is created correctly. Also we need query on the back for the single user to query it from here. We need it for names by the comments ect.//
