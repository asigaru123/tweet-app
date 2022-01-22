import axios from "axios";
import { useState } from "react";
import { useCurrentLoginUser } from "./useCurrentLoginUser";
import { useMessage } from "./useMessage";

export const useTweetComment = () => {
    const {showMessage} = useMessage();
    const [tweetCommentState, setTweetCommentState] = useState(false);
    const {loginUser} = useCurrentLoginUser();
    const insertTweetComment = (tweetId?: Number, comment?: string) => {
        setTweetCommentState(true);
        axios.post("/api/home/insertTweetComment", {email: loginUser.email, tweetid: tweetId, comment: comment}, {headers: {Authorization: loginUser.token as string}})
        .then((res) => {
            showMessage({title: res.data as string, status: "success"});
            setTweetCommentState(false);
        })
        .catch((res) => {
            showMessage({title: res.data as string, status: "error"});
            setTweetCommentState(false);
        });
    };
    const deleteTweetComment = (id?: Number) => {
        setTweetCommentState(true);
        axios.delete(`/api/home/deleteTweetComment/${loginUser.email}/${id}`, {headers: {Authorization: loginUser.token as string}})
        .then((res) => {
            showMessage({title: res.data as string, status: "success"});
            setTweetCommentState(false);
        })
        .catch((res) => {
            showMessage({title: res.data as string, status: "error"});
            setTweetCommentState(false);
        });
    };

    return {tweetCommentState, insertTweetComment, deleteTweetComment};
};