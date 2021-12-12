import axios from "axios";
import { useState } from "react";
import { useCurrentLoginUser } from "./useCurrentLoginUser";
import { useMessage } from "./useMessage";

export const useDeleteTweet = () => {
    const [deleteTweetState, setDeleteTweetState] = useState(false);
    const {showMessage} = useMessage();
    const {loginUser} = useCurrentLoginUser();
    const deleteTweet = (tweetId?: Number) => {
        setDeleteTweetState(true);
        axios.delete(`/api/home/deleteTweet/${loginUser.email}/${tweetId}`, {headers: {Authorization: loginUser.token as string}})
        .then(() => {
            showMessage({title: "削除しました", status: "success"});
            setDeleteTweetState(false);
        })
        .catch(() => {
            showMessage({title: "削除に失敗しました", status: "error"});
            setDeleteTweetState(false);
        });
    };

    return {deleteTweetState, deleteTweet};
};