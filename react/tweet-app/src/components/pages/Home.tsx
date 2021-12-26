import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { useEffect, useState, VFC } from "react";
import { useGetMyTweets } from "../../hooks/useGetMyTweets";
import { FaThumbsUp, FaRegCommentAlt } from "react-icons/fa";
import { useInsertTweet } from "../../hooks/useInsertTweet";
import { MyTweetModal } from "../molecules/MyTweetModal";
import { useDeleteTweet } from "../../hooks/useDeleteTweet";
import { useUpdateTweet } from "../../hooks/useUpdateTweet";
import { useFollow } from "../../hooks/useFollow";
import { useCurrentLoginUser } from "../../hooks/useCurrentLoginUser";
import { useHistory } from "react-router";
import { ProfileImage } from "../atoms/ProfileImage";
import { useProfileImage } from "../../hooks/useProfileImage";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
    tweet: string;
}

export const Home: VFC = () => {
    const {onOpen, onClose, isOpen} = useDisclosure();
    const history = useHistory();
    const {myTweets, getMyTweets} = useGetMyTweets();
    const [tweetId, setTweetId] = useState<Number>();
    const {loginUser} = useCurrentLoginUser();
    const {insertTweetState, insertTweet} = useInsertTweet();
    const {updateTweetState, updateTweet} = useUpdateTweet();
    const {deleteTweetState, deleteTweet} = useDeleteTweet();
    const {getMyFollow} = useFollow();
    const {getProfileImage} = useProfileImage();
    const {register, reset, formState: { errors }, handleSubmit} = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        insertTweet(data.tweet);
        reset();
    };

    const onClickSendCount = (count?: Number) => {
        setTweetId(count);
        onOpen();
    };

    useEffect(() => {
        if(loginUser.token === undefined){
            history.push("/");
        };
        getMyTweets();
        getMyFollow();
        getProfileImage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [insertTweetState, updateTweetState, deleteTweetState]);

    return (
        <>
            <Box backgroundColor="teal.600" display={{base: "none", sm: "block"}} position="fixed" w="100%">
                <Box ml={2}>
                    <Heading fontSize="3xl" p={2} color="whiteAlpha.800">Home</Heading>
                </Box>
            </Box>
            <Box ml={{sm: "56"}} mt={{base: "6", lg: "24"}}>
                <Box w={{base: "80%", md: "55%", lg: "40%"}} mt={{base: "12", sm: "24"}} ml={{base: "8", sm: "6"}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box>
                            <Text fontSize="xs" fontWeight="bold" color="red">{errors.tweet?.type === "required" && "何か入力してください"}</Text>
                            <Text fontSize="xs" fontWeight="bold" color="red">{errors.tweet?.type === "maxLength" && "100文字以内で入力してください"}</Text>
                            <Input borderColor="gray.400" border="2px" {...register("tweet", {required: true, maxLength: 100})}/>
                        </Box>
                        <Box mt={1} ml="auto" w={{base: "40%", sm: "35%", md: "27%"}}>
                            <Input type="submit" borderRadius="full" backgroundColor="teal.400" color="whiteAlpha.800" fontWeight="bold" fontSize="md" value="Tweet"/>
                        </Box>
                    </form>
                </Box>
                <Box display="block" ml={10} mt={14}>
                    <Stack spacing={6}>
                        {myTweets.map((myTweet) => (
                            <Flex key={myTweet.id as number} _hover={{cursor: "pointer"}} onClick={() => onClickSendCount(myTweet.id)}>
                                <Box>
                                    <ProfileImage size={"50px"} image={loginUser.profileImage}/>
                                </Box>
                                <Box p={2} w={{base: "80%", sm: "75%", md: "70%", lg: "50%"}}>
                                    <Text fontWeight="bold">{myTweet.username}</Text>
                                    <Text>{myTweet.time}</Text>
                                    <Text mt={2} mb={4}>{myTweet.tweet}</Text>
                                    <Flex>
                                        <Flex align="center">
                                            <FaThumbsUp size={18}/>
                                            <Text ml={2}>{myTweet.tweetLikeCount}</Text>
                                        </Flex>
                                        <Flex align="center" ml={8}>
                                            <FaRegCommentAlt size={18}/>
                                            <Text ml={2}>{myTweet.tweetCommentCount}</Text>
                                        </Flex>
                                    </Flex>
                                </Box>
                            </Flex>
                        ))}
                    </Stack>
                </Box>
            </Box>

            <MyTweetModal tweetId={tweetId} myTweets={myTweets} onClose={onClose} isOpen={isOpen} updateTweet={updateTweet} deleteTweet={deleteTweet}/>
        </>
    );
};