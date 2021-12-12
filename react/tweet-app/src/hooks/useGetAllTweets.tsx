import { useState } from "react";
import { useCurrentLoginUser } from "./useCurrentLoginUser";
import { TweetType } from "../types/tweetType";
import axios from "axios";

export const useGetAllTweets = () => {
    const [getAllTweetsState, setGetAllTweetsState] = useState(false);
    const {loginUser} = useCurrentLoginUser();
    const [allTweets, setAllTweets] = useState<Array<TweetType>>([]);
    const getAllTweets = () => {
        setGetAllTweetsState(true);
        axios.get<Array<TweetType>>("/api/home/allTweets", {headers: {Authorization: loginUser.token as string}})
        .then((res) => {
            setAllTweets(res.data.filter((allTweet) => {
                return allTweet.email !== loginUser.email;
            }));
            setGetAllTweetsState(false);
        })
        .catch(() => {
            setGetAllTweetsState(false);
        });
    };

    return {getAllTweetsState, allTweets, getAllTweets};
};