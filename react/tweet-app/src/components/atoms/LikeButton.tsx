import { memo, VFC } from "react";
import { useCurrentLoginUser } from "../../hooks/useCurrentLoginUser";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

type Props = {
    size: number;
    tweetLikeList?: Array<string>;
};

export const LikeButton: VFC<Props> = memo((props) => {
    const {size, tweetLikeList} = props;
    const {loginUser} = useCurrentLoginUser();

    let isLikeFrag = false;
    if(tweetLikeList?.length !== undefined){
        for(let i=0; i < tweetLikeList.length; ++i){
            if(loginUser.email === tweetLikeList[i]){
                isLikeFrag = true;
                break;
            };
        };
    };

    return (
        <>
            {isLikeFrag ? (
                <FaThumbsUp size={size}/>
            ) : (
                <FaRegThumbsUp size={size} />
            )}
        </>
    );
});