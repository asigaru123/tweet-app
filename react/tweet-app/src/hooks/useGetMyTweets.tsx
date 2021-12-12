import axios from "axios";
import { useState } from "react";
import { TweetType } from "../types/tweetType";
import { useCurrentLoginUser } from "./useCurrentLoginUser";

export const useGetMyTweets = () => {
    const [getMyTweetState, setGetMyTweetState] = useState(false);
    const [myTweets, setMyTweets] = useState<Array<TweetType>>([]);
    const {loginUser} = useCurrentLoginUser();
    const getMyTweets = () => {
        setGetMyTweetState(true);
        axios.get<Array<TweetType>>(`/api/home/mytweet/${loginUser.email}`, {headers: {Authorization: loginUser.token as string}})
        .then((res) => {
            setMyTweets(res.data);
            setGetMyTweetState(false);
        })
        .catch(() => {
            setGetMyTweetState(false);
        });
    };

    return {getMyTweetState, myTweets, getMyTweets};
};