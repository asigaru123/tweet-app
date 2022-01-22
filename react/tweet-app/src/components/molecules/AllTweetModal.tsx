import { Box, Flex, Spacer, Stack, Text } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Textarea } from "@chakra-ui/textarea";
import { useEffect, useState, VFC } from "react";
import { TweetType } from "../../types/tweetType";
import { FaRegCommentAlt } from "react-icons/fa";
import { ProfileImage } from "../atoms/ProfileImage";
import { useJadge } from "../../hooks/useJadge";
import { LikeButton } from "../atoms/LikeButton";
import { FollowButton } from "../atoms/FollowButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/react";
import { useCurrentLoginUser } from "../../hooks/useCurrentLoginUser";

type Props = {
    tweetId?: Number;
    allTweets: Array<TweetType>;
    onClose: () => void;
    isOpen: boolean;
    insertTweetLike: (tweetId?: Number) => void;
    deleteTweetLike: (tweetId?: Number) => void;
    insertTweetComment: (tweetId?: Number, comment?: string) => void;
    deleteTweetComment: (id?: Number) => void;
    insertFollow: (followemail?: string) => void;
    deleteFollow: (followemail?: string) => void;
    changeFollowState: boolean;
};

interface IFormInput {
    comment: string;
}

export const AllTweetModal: VFC<Props> = (props) => {
    const {tweetId, allTweets, onClose, isOpen, insertTweetLike, deleteTweetLike, insertTweetComment, deleteTweetComment, insertFollow, deleteFollow, changeFollowState} = props;
    const [targetTweet, setTargetTweet] = useState<TweetType>();
    const {isLike, isFollow} = useJadge();
    const {loginUser} = useCurrentLoginUser();

    const onClickLike = () => {
        if(isLike(targetTweet)){
            deleteTweetLike(tweetId);
        }else{
            insertTweetLike(tweetId);
        };
    };

    const onClickFollow = () => {
        if(isFollow(targetTweet?.email)){
            deleteFollow(targetTweet?.email);
        }else{
            insertFollow(targetTweet?.email);
        }
    };

    useEffect(() => {
        const findTweet = allTweets.find((allTweet) => tweetId === allTweet.id);
        setTargetTweet(findTweet);
    }, [allTweets, tweetId, changeFollowState]);

    const {register, reset, formState: { errors }, handleSubmit} = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => {
        insertTweetComment(tweetId, data.comment);
        reset();
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Tweet</ModalHeader>
                    <ModalBody>
                        <Box>
                            <Flex>
                                <Flex>
                                    <Box mr={2}>
                                        <ProfileImage w="100%" size={"60px"} image={targetTweet?.profileImage}/>
                                    </Box>
                                    <Box>
                                        <Text fontSize="lg" fontWeight="bold">{targetTweet?.username}</Text>
                                        <Text fontSize="sm">{targetTweet?.time}</Text>
                                        <Text fontSize="lg" my={3}>{targetTweet?.tweet}</Text>
                                    </Box>
                                </Flex>
                                <Spacer />
                                <FollowButton targetTweetEmail={targetTweet?.email} onClickFollow={onClickFollow}/>
                            </Flex>
                            <Flex ml={4}>
                                <Flex align="center" _hover={{cursor: "pointer"}} onClick={onClickLike}>
                                    <Box>
                                        <LikeButton size={16} tweetLikeList={targetTweet?.tweetLikeList}/>
                                    </Box>
                                    <Text ml={2}>{targetTweet?.tweetLikeCount}</Text>
                                </Flex>
                                <Flex align="center" ml={10}>
                                    <Box>
                                        <FaRegCommentAlt size={16}/>
                                    </Box>
                                    <Text ml={2}>{targetTweet?.tweetCommentCount}</Text>
                                </Flex>
                            </Flex>
                            <Box my={8}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Box>
                                        <Textarea border="2px" borderColor="gray.400" {...register("comment", {required: true, maxLength: 100})}/>
                                        <Text fontSize="sm" fontWeight="bold" color="red">{errors.comment?.type === "required" && "何か入力してください"}</Text>
                                        <Text fontSize="sm" fontWeight="bold" color="red">{errors.comment?.type === "maxLength" && "100文字以内で入力してください"}</Text>
                                    </Box>
                                    <Box w="25%" ml="auto" textAlign="center" mt={4}>
                                        <Input type="submit" fontWeight="bold" backgroundColor="gray.300" _hover={{opacity: 0.7}} value="コメント"/>
                                    </Box>
                                </form>
                            </Box>
                            {targetTweet?.tweetCommentResource?.length === 0 ? (
                                <>
                                </>
                            ) : (
                                <Stack spacing={4} mt={10} mb={2}>
                                {targetTweet?.tweetCommentResource?.map((commentResource) => (
                                    <Flex p={1} key={commentResource.id as number}>
                                        <Box w="12%">
                                            <ProfileImage w={"100%"} size={"40px"} image={targetTweet?.profileImage}/>
                                        </Box>
                                        <Box ml={1} w="70%">
                                            <Text fontSize="md" fontWeight="bold">{commentResource.username}</Text>
                                            <Text fontSize="xs">{commentResource.time}</Text>
                                            <Text fontSize="md">{commentResource.comment}</Text>
                                        </Box>
                                        {loginUser.email === commentResource.email &&
                                            <Box>
                                                <Button backgroundColor="red.300" _hover={{opacity: 0.7}} onClick={() =>deleteTweetComment(commentResource.id)}>削除</Button>
                                            </Box>
                                        }
                                    </Flex>
                                ))}
                                </Stack>
                            )}
                        </Box>
                    </ModalBody>
                    <ModalCloseButton />
                </ModalContent>
            </ModalOverlay>
        </Modal>
    );
};