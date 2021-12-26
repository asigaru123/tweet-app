import axios from "axios";
import { useState } from "react";
import { UserType } from "../types/userType";
import { useCurrentLoginUser } from "./useCurrentLoginUser";
import { useMessage } from "./useMessage";

export const useEditUserAccount = () => {
    const {showMessage} = useMessage();
    const [editUserAccountState, setEditUserAccount] = useState(false);
    const {loginUser, setLoginUser} = useCurrentLoginUser();
    const editUserAccount = (password: string, username: string) => {
        setEditUserAccount(true);
        axios.post("/api/login/editUserAccount", {email: loginUser.email, password: password, username: username}, {headers: {Authorization: loginUser.token as string}})
        .then((res) => {
            showMessage({title: res.data as string, status: "success"});
            setEditUserAccount(false);
            findUserAccount();
        })
        .catch((res) => {
            showMessage({title: res.data as string, status: "success"});
            setEditUserAccount(false)
        });
    };
    const findUserAccount = () => {
        axios.get<UserType>(`/api/login/findUserAccount/${loginUser.email}`, {headers: {Authorization: loginUser.token as string}})
        .then((res) => {
            setLoginUser({...loginUser, username: res.data.username});
        })
    };

    return {editUserAccountState, editUserAccount};
};