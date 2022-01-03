import axios from "axios";
import { useState } from "react";
import { useMessage } from "./useMessage";

export const useCreateUser = () => {
    const [createUserState, setCreateUserState] = useState(false);
    const {showMessage} = useMessage();
    const createUser = (email: string, password: string, username: string, onClose: () => void) => {
        setCreateUserState(true);
        axios.post("/api/login/signup", {email: email, password: password, username: username})
        .then((res) => {
            showMessage({title: res.data as string, status: "success"});
            setCreateUserState(false);
            onClose();
        })
        .catch((res) => {
            showMessage({title: res.response.data === undefined ? ("ユーザー登録に失敗しました") : (res.response.data), status: "error"});
            setCreateUserState(true);
        });
    };

    return {createUser, createUserState};
};