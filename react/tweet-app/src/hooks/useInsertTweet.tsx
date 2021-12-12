import axios from "axios";
import { useState } from "react";
import { TweetType } from "../types/tweetType";
import { useCurrentLoginUser } from "./useCurrentLoginUser";
import { useMessage } from "./useMessage";

export const useInsertTweet = () => {
    const [insertTweetState, setInsertTweetState] = useState(false);
    const {showMessage} = useMessage();
    const {loginUser} = useCurrentLoginUser();
    const insertTweet = (tweet: string) => {
        setInsertTweetState(true);
        axios.post<TweetType>("/api/home/insertTweet", {email: loginUser.email, username: loginUser.username, tweet: tweet}, {headers: {Authorization: loginUser.token as string}})
        .then((res) => {
            showMessage({title: res.data as string, status: "success"});
            setInsertTweetState(false);
        })
        .catch((res) => {
            showMessage({title: res.data as string, status: "error"});
            setInsertTweetState(false);
        });
    };

    return {insertTweetState, insertTweet};
};