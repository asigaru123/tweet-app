import { TweetType } from "../types/tweetType";
import { useCurrentLoginUser } from "./useCurrentLoginUser";

export const useJadge = () => {
    const {loginUser} = useCurrentLoginUser();

    const isLike = (tweet?: TweetType) => {
        let isLikeFrag = false;
        if(tweet?.tweetLikeList?.length !== undefined){
            for(let i=0; i < tweet.tweetLikeList.length; ++i){
                if(loginUser.email === tweet.tweetLikeList[i]){
                    isLikeFrag = true;
                    break;
                };
            };
        };
        return isLikeFrag;
    };

    const isFollow = (targetTweetEmail?: string) => {
        let isFollowFrag = false;
        if(loginUser.follow?.length !== undefined){
            for(let i=0; i < loginUser.follow!.length; ++i){
                if(loginUser.follow![i].followemail === targetTweetEmail){
                    isFollowFrag = true;
                    break;
                };
            };
        };
        return isFollowFrag;
    };

    return {isLike, isFollow};
};