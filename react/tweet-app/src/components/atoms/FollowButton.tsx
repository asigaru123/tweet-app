import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { memo, VFC } from "react";
import { useCurrentLoginUser } from "../../hooks/useCurrentLoginUser";

type Props = {
    targetTweetEmail?: string;
    onClickFollow: () => void;
};

export const FollowButton: VFC<Props> = memo((props) => {
    const {targetTweetEmail ,onClickFollow} = props;
    const {loginUser} = useCurrentLoginUser();

    let isFollowFrag = false;
        if(loginUser.follow?.length !== undefined){
            for(let i=0; i < loginUser.follow!.length; ++i){
                if(loginUser.follow![i].followemail === targetTweetEmail){
                    isFollowFrag = true;
                    break;
                };
            };
        };

    return (
        <>
            {isFollowFrag ? (
                <Box>
                    <Button size="sm" fontSize="xs" backgroundColor="gray.400" borderRadius="full" _hover={{opacity: "0.7"}} onClick={onClickFollow}>
                        フォロー中
                    </Button>
                </Box>
            ) : (
                <Box>
                    <Button size="sm" fontSize="xs" backgroundColor="blue.300" borderRadius="full" _hover={{opacity: "0.7"}} onClick={onClickFollow}>
                        フォロー
                    </Button>
                </Box>
            )}
        </>
    );
});