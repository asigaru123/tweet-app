import axios from "axios";
import { useState } from "react";
import { useCurrentLoginUser } from "./useCurrentLoginUser";
import { useMessage } from "./useMessage";

export const useTweetLike = () => {
    const {showMessage} = useMessage();
    const [tweetLikeState, setTweetLikeState] = useState(false);
    const {loginUser} = useCurrentLoginUser();
    const insertTweetLike = (tweetId?: Number) => {
        setTweetLikeState(true);
        axios.get(`/api/home/insertTweetLike/${loginUser.email}/${tweetId}`, {headers: {Authorization: loginUser.token as string}})
        .then((res) => {
            showMessage({title: res.data as string, status: "success"});
            setTweetLikeState(false);
        })
        .catch((res) => {
            showMessage({title: res.data as string, status: "error"});
            setTweetLikeState(false);
        });
    };
    const deleteTweetLike = (tweetId?: Number) => {
        setTweetLikeState(true);
        axios.delete(`/api/home/deleteTweetLike/${loginUser.email}/${tweetId}`, {headers: {Authorization: loginUser.token as string}})
        .then((res) => {
            showMessage({title: res.data as string, status: "success"});
            setTweetLikeState(false);
        })
        .catch((res) => {
            showMessage({title: res.data as string, status: "error"});
            setTweetLikeState(false);
        });
    };
    

    return {tweetLikeState, insertTweetLike, deleteTweetLike};
};