import axios from "axios";
import { useState } from "react";
import { useCurrentLoginUser } from "./useCurrentLoginUser";
import { useMessage } from "./useMessage";

export const useUpdateTweet = () => {
    const {showMessage} = useMessage();
    const [updateTweetState, setUpdateTweetState] = useState(false);
    const {loginUser} = useCurrentLoginUser();
    const updateTweet = (tweetId?: Number, tweet?: String) => {
        setUpdateTweetState(true);
        axios.patch("/api/home/updateTweet", {id: tweetId, email: loginUser.email, tweet: tweet}, {headers: {Authorization: loginUser.token as string}})
        .then((res) => {
            showMessage({title: res.data as string, status: "success"});
            setUpdateTweetState(false);
        })
        .catch((res) => {
            showMessage({title: res.data as string, status: "error"});
            setUpdateTweetState(false);
        });
    };

    return {updateTweetState, updateTweet};
};