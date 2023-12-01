import { createContext, useEffect, useState } from "react";
import  baseUrl, { getRequest, postRequest } from "../util/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({children, user}) => {
    const [userChats, setUserChats] = useState(null);
    const [chatsLoading, setChatsLoading] = useState(false);
    const [chatsError, setChatsError] = useState(null);

    useEffect(() => {
        const getChats = async() => {
            if(user?._id){
                setChatsLoading(true);
                setChatsError(null);

                const response = await getRequest(`${baseUrl}/chat/${user._id}`);

                setChatsLoading(false);

                if(response.error) return setChatsError(response);

                setUserChats(response);
            };
        };

        getChats()
    },[user])

    return<ChatContextProvider value={{
        userChats,
        chatsLoading,
        chatsError
    }}>{children}</ChatContextProvider>;
};