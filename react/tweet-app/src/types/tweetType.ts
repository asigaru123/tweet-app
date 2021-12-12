import { TweetCommentType } from "./tweetCommentType";

export type TweetType = {
    id?: Number,
    email?: string,
    username?: string,
    time?: string,
    tweet?: string,
    tweetLikeCount?: Number,
    tweetLikeList?: Array<string>,
    tweetCommentCount?: Number,
    tweetCommentResource?: Array<TweetCommentType>,
    profileImage?: string
}