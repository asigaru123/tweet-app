import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import { VFC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginUser } from "../../hooks/useLoginUser";
import { SignupModal } from "../molecules/SignupModal";

interface IFormInput {
    email: string;
    password: string;
}

export const Login: VFC = () => {
    const {onOpen, isOpen, onClose} = useDisclosure();
    const {login} = useLoginUser();
    const {register, reset, formState: { errors }, handleSubmit} = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        login(data.email, data.password);
        reset();
    };

    return (
        <>
            <Flex align="center" justify="center" h="100vh">
                <Box backgroundColor="gray.100" borderRadius="10px" boxShadow="md" textAlign="center" p={4}>
                    <Heading>Login</Heading>
                    <Box mt={6} p={4}>
                        <Stack spacing={4}>
                            <Box w="100%" mx="auto">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Box mb={4}>
                                    <Input
                                        border="1px"
                                        borderColor="gray.300"
                                        placeholder="E-Mail"
                                        {...register("email", {required: true, pattern: {value: /\S+@\S+\.\S+/, message: "メールアドレスの形式が違います" }})}/>
                                    <Text fontSize="xs" fontWeight="bold" color="red">{errors.email?.type === "required" && "メールアドレスを入力してください"}</Text>
                                    <Text fontSize="xs" fontWeight="bold" color="red">{errors.email?.message && "メールアドレスの形式が違います"}</Text>
                                </Box>
                                <Box mb={4}>
                                    <Input type="password" border="1px" borderColor="gray.300" placeholder="Password" {...register("password", {required: true, maxLength: 20})}/>
                                    <Text fontSize="xs" fontWeight="bold" color="red">{errors.password?.type === "required" && "パスワードを入力してください"}</Text>
                                    <Text fontSize="xs" fontWeight="bold" color="red">{errors.password?.type === "maxLength" && "20文字以内で入力してください"}</Text>
                                </Box>
                                    <Input
                                        type="submit"
                                        backgroundColor="teal.400"
                                        w="100%"
                                        fontWeight="bold"
                                        _hover={{opacity: "0.7"}}
                                        value="ログイン"
                                    />
                            </form>
                            </Box>
                        </Stack>
                        <Box mt={4}>
                            <Link fontWeight="bold" color="gray.500" onClick={onOpen}>ユーザー登録</Link>
                        </Box>
                    </Box>
                </Box>
            </Flex>
            <SignupModal onClose={onClose} isOpen={isOpen}/>
        </>
    );
};