import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { UserType } from "../types/userType";

export type LoginUserContextType = {
    loginUser: UserType;
    setLoginUser: Dispatch<SetStateAction<UserType>>;
};

export const LoginUserContext = createContext<LoginUserContextType>({} as LoginUserContextType);

export const LoginUserProvider = (props: {children: ReactNode}) => {
    const {children} = props;
    const [loginUser, setLoginUser] = useState<UserType>({});

    return (
        <LoginUserContext.Provider value={{loginUser, setLoginUser}}>
            {children}
        </LoginUserContext.Provider>
    );
};