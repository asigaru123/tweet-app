import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useEffect, VFC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useCurrentLoginUser } from "../../hooks/useCurrentLoginUser";
import { useEditUserAccount } from "../../hooks/useEditUserAccount";
import { useFollow } from "../../hooks/useFollow";
import { useMessage } from "../../hooks/useMessage";
import { ProfileImage } from "../atoms/ProfileImage";
import { ImageUploadModal } from "../molecules/ImageUploadModal";

interface IFormInput {
    password: string;
    username: string;
};

export const Setting: VFC = () => {
    const {onOpen, onClose, isOpen} = useDisclosure();
    const history = useHistory();
    const {loginUser} = useCurrentLoginUser();
    const {editUserAccount} = useEditUserAccount();
    const {getMyFollow} = useFollow();
    const {showMessage} = useMessage();
    const {register, reset, formState: { errors }, handleSubmit} = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        if(data.password === "" && data.username === ""){
            showMessage({title: "パスワードまたはユーザー名を入力してください", status: "error"});
        }else{
            editUserAccount(data.password, data.username);
            reset();
        };
    };

    useEffect(() => {
        if(loginUser.token === undefined){
            history.push("/");
        };
        getMyFollow();
    }, [history, loginUser.token]);

    return (
        <>
            <Box backgroundColor="teal.600" display={{base: "none", sm: "block"}} position="fixed" w="100%">
                <Box ml={2}>
                    <Heading fontSize="3xl" color="whiteAlpha.800" p={2}>Setting</Heading>
                </Box>
            </Box>
            <Box ml={{base: "4", sm: "60"}} mt={{base: "6", sm: "24"}} w={{base: "90%", md: "50%"}}>
                <Flex display={{base: "block", sm: "flex"}}>
                    <Box mt={4} textAlign="center">
                        <Box>
                            <Box display="inline-block" mx="auto">
                                <ProfileImage size={"150px"} image={loginUser.profileImage}/>
                            </Box>
                        </Box>
                        <Button backgroundColor="whiteAlpha.900" mt={6} _hover={{opacity: "0.8"}} onClick={onOpen}>変更</Button>
                    </Box>
                    <Box ml={{sm: "20"}}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={1}>
                                <Box>
                                    <Text fontWeight="bold">E-Mail</Text>
                                    <Input readOnly value={loginUser.email}/>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Password</Text>
                                    <Input type="password" placeholder="Password" {...register("password", {maxLength: 20})}/>
                                    <Text fontSize="sm" fontWeight="bold" color="red">{errors.password?.type === "maxLength" && "20文字以内で入力してください"}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Username</Text>
                                    <Input placeholder="Username" {...register("username", {maxLength: 20})}/>
                                    <Text fontSize="sm" fontWeight="bold" color="red">{errors.username?.type === "maxLength" && "20文字以内で入力してください"}</Text>
                                </Box>
                            </Stack>
                            <Box mt={4}>
                                <Input type="submit" backgroundColor="gray.400" fontWeight="bold" _hover={{opacity: "0.7"}} value="変更"/>
                            </Box>
                        </form>
                    </Box>
                </Flex>
                <Box mt={12}>
                    <Tabs>
                        <TabList>
                            <Tab>フォロー</Tab>
                            <Tab>フォロワー</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Stack spacing={4}>
                                    {loginUser.follow?.map((follow) => (
                                        <Flex key={follow.id as number}>
                                            <ProfileImage size={"40px"} image={follow.profileImage}/>
                                            <Text fontWeight="bold" ml={2}>{follow.followusername}</Text>
                                        </Flex>
                                    ))}
                                </Stack>
                            </TabPanel>
                            <TabPanel>
                                <Stack spacing={4}>
                                    {loginUser.follower?.map((follower) => (
                                        <Flex key={follower.id as number}>
                                            <ProfileImage size={"40px"} image={follower.profileImage}/>
                                            <Text fontWeight="bold" ml={2}>{follower.followerusername}</Text>
                                        </Flex>
                                    ))}
                                </Stack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>
            <ImageUploadModal onClose={onClose} isOpen={isOpen}/>
        </>
    );
};