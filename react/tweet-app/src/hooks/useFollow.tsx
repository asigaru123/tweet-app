import axios from "axios";
import { useState } from "react";
import { useCurrentLoginUser } from "./useCurrentLoginUser";
import { useMessage } from "./useMessage";
import { FollowListType } from "../types/followListType";

export const useFollow = () => {
    const {showMessage} = useMessage();
    const [followState, setFollowState] = useState(false);
    const [changeFollowState, setChangeFollowState] = useState(false);
    const {loginUser} = useCurrentLoginUser();
    const getMyFollow = (email?: string, token?: string) => {
        setFollowState(true);
        axios.get<FollowListType>(`/api/login/getMyFollow/${email === undefined ? (loginUser.email) : (email)}`,
            {headers: {Authorization: token === undefined ? (loginUser.token as string) : (token)}})
        .then((res) => {
            Object.assign(loginUser, {follow: res.data.followResource, follower: res.data.followerResource});
            setFollowState(false);
        })
    };
    const insertFollow = (followemail?: string) => {
        setChangeFollowState(true);
        axios.post("/api/home/insertFollow", {email: loginUser.email, followemail: followemail}, {headers: {Authorization: loginUser.token as string}})
        .then((res) => {
            showMessage({title: res.data as string, status: "success"});
            setChangeFollowState(false);
        })
        .catch((res) => {
            showMessage({title: res.data as string, status: "error"});
            setChangeFollowState(false);
        });
    };
    const deleteFollow = (followemail?: string) => {
        setChangeFollowState(true);
        axios.delete(`/api/home/deleteFollow/${loginUser.email}/${followemail}`, {headers: {Authorization: loginUser.token as string}})
        .then((res) => {
            showMessage({title: res.data as string, status: "success"});
            setChangeFollowState(false);
        })
        .catch((res) => {
            showMessage({title: res.data as string, status: "error"});
            setChangeFollowState(false);
        });
    };

    return {followState, changeFollowState, getMyFollow, insertFollow, deleteFollow};
};