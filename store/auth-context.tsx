import { createContext, useReducer, useState } from 'react';

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token: string) => {},
    logout: () => {}
});

const AuthContextProvider = ({children}: any) => {
    const [authToken, setAuthToken] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    const authenticate = (token: string) => {
        setAuthToken(token);
        setIsAuth(true);
    }

    const logout = () => {
        setAuthToken('');
        setIsAuth(false);
    }
   
    const value = {
        token: authToken,
        isAuthenticated: isAuth,
        authenticate: authenticate,
        logout: logout
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;