import { Box, Flex, Spacer, Stack, Text } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Textarea } from "@chakra-ui/textarea";
import { useEffect, useState, VFC } from "react";
import { TweetType } from "../../types/tweetType";
import { FaThumbsUp, FaRegCommentAlt } from "react-icons/fa";
import { Button } from "@chakra-ui/button";
import { ProfileImage } from "../atoms/ProfileImage";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@chakra-ui/input";

type Props = {
    tweetId?: Number;
    myTweets: Array<TweetType>;
    onClose: () => void;
    isOpen: boolean;
    updateTweet: (tweetId?: Number, tweet?: string) => void;
    deleteTweet: (tweetId?: Number) => void;
};

interface IFormInput {
    tweet: string;
}

export const MyTweetModal: VFC<Props> = (props) => {
    const {tweetId, myTweets, onClose, isOpen, updateTweet, deleteTweet} = props;
    const [targetTweet, setTargetTweet] = useState<TweetType>();
    const {register, reset, formState: { errors }, handleSubmit} = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        updateTweet(tweetId, data.tweet);
        reset();
        onClose();
    };

    const onClickDeleteTweet = () => {
        deleteTweet(tweetId);
        onClose();
    };

    useEffect(() => {
        const findTweet = myTweets.find((myTweet) => tweetId === myTweet.id);
        setTargetTweet(findTweet);
    }, [tweetId, myTweets, isOpen]);

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Tweet</ModalHeader>
                    <ModalBody>
                        <Box>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Box>
                                    <Textarea {...register("tweet" , {required: true, maxLength: 100})}/>
                                    <Text fontSize="xs" fontWeight="bold" color="red">{errors.tweet?.type === "required" && "何か入力してください"}</Text>
                                    <Text fontSize="xs" fontWeight="bold" color="red">{errors.tweet?.type === "maxLength" && "100文字以内で入力してください"}</Text>
                                </Box>
                                <Flex p={2}>
                                    <Flex align="center">
                                        <FaThumbsUp size={16}/>
                                        <Text ml={2}>{targetTweet?.tweetLikeCount}</Text>
                                    </Flex>
                                    <Flex align="center" ml={8}>
                                        <FaRegCommentAlt size={16}/>
                                        <Text ml={2}>{targetTweet?.tweetCommentCount}</Text>
                                    </Flex>
                                    <Spacer />
                                    <Input type="submit" w="20%" backgroundColor="blue.300" fontWeight="bold" _hover={{opacity: "0.8"}} value="更新"/>
                                    <Button w="20%" backgroundColor="red.300" ml={1} _hover={{opacity: "0.8"}} onClick={onClickDeleteTweet}>削除</Button>
                                </Flex>
                            </form>
                        </Box>
                        {targetTweet?.tweetCommentResource?.length === 0 ? (
                            <>
                            </>
                        ) : (
                            <Stack spacing={6} mt={14} mb={4}>
                                {targetTweet?.tweetCommentResource?.map((commentResource) => (
                                    <Flex key={commentResource.id as number}>
                                        <Box mr={2}>
                                            <ProfileImage size={"40px"} image={commentResource.profileImage}/>
                                        </Box>
                                        <Box>
                                            <Text fontSize="md" fontWeight="bold">{commentResource.username}</Text>
                                            <Text fontSize="sm">{commentResource.time}</Text>
                                            <Text fontSize="sm">{commentResource.comment}</Text>
                                        </Box>
                                    </Flex>
                                ))}
                            </Stack>
                        )}
                    </ModalBody>
                    <ModalCloseButton />
                </ModalContent>
            </ModalOverlay>
        </Modal>
    );
};