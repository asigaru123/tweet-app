import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { useCurrentLoginUser } from "./useCurrentLoginUser";
import { useFollow } from "./useFollow";
import { useMessage } from "./useMessage";
import { useProfileImage } from "./useProfileImage";

export const useLoginUser = () => {
    const history = useHistory();
    const [loginState, setLoginState] = useState(false);
    const {showMessage} = useMessage();
    const {loginUser, setLoginUser} = useCurrentLoginUser();
    const {getMyFollow} = useFollow();
    const {getProfileImage} = useProfileImage();
    const decodeJwt = (headerToken: string) => {
        const token = headerToken.substr(7);
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/-/g, "/");
        return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
    };
    const login = (email: string, password: string) => {
        setLoginState(true);
        axios.post("/api/login", {email: email, password: password})
        .then((res) => {
            const JwtCredential = decodeJwt(res.headers.authorization);
            setLoginUser({
                ...loginUser,
                token: res.headers.authorization,
                sub: JwtCredential.sub,
                email: JwtCredential.email,
                username: JwtCredential.username,
                role: JwtCredential.role
            });
            getMyFollow(JwtCredential.email, res.headers.authorization);
            getProfileImage(JwtCredential.email, res.headers.authorization);
            setLoginState(false);
            showMessage({title: "ログインしました", status: "success"});
            history.push("/home");
        })
        .catch((res) => {
            setLoginState(false);
            showMessage({title: "ログインに失敗しました", status: "error"});
        })
    }

    return {login, loginState};
};