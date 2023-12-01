import { createContext, useCallback, useEffect, useState } from "react";
import baseUrl, { postRequest } from "../util/services";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [registerError, setRegisterError] = useState(null);
    const [registerLoading, setRegisterLoading] = useState(false)
    const [registerInfo, setRegisterInfo] = useState({name: "", email:"", password:""});

    const [loginError, setLoginError] = useState(null);
    const [loginLoading, setLoginLoading] = useState(false)
    const [loginInfo, setLoginInfo] = useState({email:"", password:""});

    useEffect(()=>{
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user))
    }, [])

    const updateRegInfo = useCallback((info) => {
        setRegisterInfo(info);
    },[])

    const updateLogInfo = useCallback((info) => {
        setLoginInfo(info);
    },[])

    const registerUser = useCallback(async (e) => {
        e.preventDefault();

        setRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(`${baseUrl}/register`, JSON.stringify(registerInfo));

        setRegisterLoading(false);

        if(response.error) return setRegisterError(response);

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
    }, [registerInfo])

    const loginUser = useCallback(async(e) => {
        e.preventDefault()

        setLoginLoading(true)
        setLoginError(null)

        const response = await postRequest(`${baseUrl}/login`, JSON.stringify(loginInfo))

        setLoginLoading(false);

        if(response.error) return setLoginError(response);

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
    }, [loginInfo])

    const logout = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null)
    }, [])

    return <AuthContext.Provider value={{
        user, 
        registerInfo, 
        updateRegInfo, 
        registerUser, 
        registerError, 
        registerLoading,
        logout,
        loginInfo,
        updateLogInfo,
        loginUser,
        loginError,
        loginLoading
        }}>{children}</AuthContext.Provider>
}

export default AuthContext