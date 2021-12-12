import axios from "axios";
import { useState } from "react";
import { useCurrentLoginUser } from "./useCurrentLoginUser";
import { useMessage } from "./useMessage";

export const useProfileImage = () => {
    const [getProfileImageState, setGetProfileImageState] = useState(false);
    const [changeImageState, setChangeImageState] = useState(false);
    const {showMessage} = useMessage();
    const {loginUser, setLoginUser} = useCurrentLoginUser();
    const getProfileImage = (email?: string, token?: string) => {
        setGetProfileImageState(true);
        axios.get(`/api/login/getProfileImage/${email === undefined ? (loginUser.email) : (email)}`,
            {headers: {Authorization: token === undefined ? (loginUser.token as string) : (token)}})
        .then((res) => {
            setLoginUser({...loginUser, profileImage: res.data as string});
            setGetProfileImageState(false);
        })
        .catch(() => setGetProfileImageState(false));
        
    };
    const changeImage = (profileImage?: string) => {
        setChangeImageState(true);
        axios.post(`/api/login/changeProfileImage/${loginUser.email}`, {...loginUser, profileImage: profileImage}, {headers: {Authorization: loginUser.token as string}})
        .then((res) => {
            showMessage({title: res.data as string, status: "success"});
            setChangeImageState(false);
            getProfileImage();
        })
        .catch((res) => {
            showMessage({title: res.data as string, status: "error"});
            setChangeImageState(false);
        });
    };

    return {getProfileImageState, changeImageState, getProfileImage, changeImage};
};