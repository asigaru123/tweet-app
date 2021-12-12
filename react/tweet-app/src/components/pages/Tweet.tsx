import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { useEffect, useState, VFC } from "react";
import { useCurrentLoginUser } from "../../hooks/useCurrentLoginUser";
import { useGetAllTweets } from "../../hooks/useGetAllTweets";
import { FaRegCommentAlt } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/hooks";
import { AllTweetModal } from "../molecules/AllTweetModal";
import { useTweetLike } from "../../hooks/useTweetLike";
import { useTweetComment } from "../../hooks/useTweetComment";
import { useFollow } from "../../hooks/useFollow";
import { useHistory } from "react-router";
import { ProfileImage } from "../atoms/ProfileImage";
import { LikeButton } from "../atoms/LikeButton";
import { useProfileImage } from "../../hooks/useProfileImage";

export const Tweet: VFC = () => {
    const {onOpen, onClose, isOpen} = useDisclosure();
    const history = useHistory();
    const {allTweets, getAllTweets} = useGetAllTweets();
    const {loginUser} = useCurrentLoginUser();
    const {tweetLikeState, insertTweetLike, deleteTweetLike} = useTweetLike();
    const {tweetCommentState, insertTweetComment} = useTweetComment();
    const {changeFollowState, getMyFollow, insertFollow, deleteFollow} = useFollow();
    const [tweetId, setTweetId] = useState<Number>();
    const {getProfileImage} = useProfileImage();

    const onClickSendCount = (tweetId?: Number) => {
        setTweetId(tweetId);
        onOpen();
    };

    useEffect(() => {
        if(loginUser.token === undefined){
            history.push("/");
        };
        getAllTweets();
        getMyFollow();
        getProfileImage();
    }, [tweetLikeState, tweetCommentState, changeFollowState, history, loginUser.token]);//followState, getAllTweets, getMyFollow

    return (
        <>
            <Box backgroundColor="teal.600" display={{base: "none", sm: "block"}} position="fixed" w="100%">
                <Box ml={2}>
                    <Heading fontSize="3xl" color="whiteAlpha.800" p={2}>Tweet</Heading>
                </Box>
            </Box>
            <Box ml={{sm :"56"}}>
                <Box ml={10} mt={{base: "10", sm: "24"}}>
                    <Stack spacing={6}>
                        {allTweets.map((allTweet) => (
                            <Flex key={allTweet.id as number} _hover={{cursor: "pointer"}} onClick={() => onClickSendCount(allTweet.id)}>
                                <Box>
                                    <ProfileImage size={"50px"} image={allTweet.profileImage}/>
                                </Box>
                                <Box p={2} w={{base: "80%", sm: "75%", md: "70%", lg: "50%"}}>
                                    <Text fontWeight="bold">{allTweet.username}</Text>
                                    <Text>{allTweet.time}</Text>
                                    <Text mt={2} mb={4}>{allTweet.tweet}</Text>
                                    <Flex>
                                        <Flex align="center">
                                            <Box>
                                                <LikeButton size={18} tweetLikeList={allTweet.tweetLikeList}/>
                                            </Box>
                                            <Text ml={2}>{allTweet.tweetLikeCount}</Text>
                                        </Flex>
                                        <Flex  align="center" ml={8}>
                                            <FaRegCommentAlt size={18}/>
                                            <Text ml={2}>{allTweet.tweetCommentCount}</Text>
                                        </Flex>
                                    </Flex>
                                </Box>
                            </Flex>
                        ))}
                    </Stack>
                </Box>
            </Box>

            <AllTweetModal
                tweetId={tweetId}
                allTweets={allTweets}
                onClose={onClose}
                isOpen={isOpen}
                insertTweetLike={insertTweetLike}
                deleteTweetLike={deleteTweetLike}
                insertTweetComment={insertTweetComment}
                insertFollow={insertFollow}
                deleteFollow={deleteFollow}
                changeFollowState={changeFollowState}
            />
        </>
    );
};