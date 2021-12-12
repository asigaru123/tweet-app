import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Box, Stack, Input, Text } from "@chakra-ui/react";
import { VFC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateUser } from "../../hooks/useCreateUser";

type Props = {
    onClose: () => void;
    isOpen: boolean;
};
interface IFormInput {
    email: string;
    password: string;
    username: string;
}

export const SignupModal: VFC<Props> = (props) => {
    const {onClose, isOpen} = props;
    const {createUser} = useCreateUser();
    const {register, reset, formState: { errors }, handleSubmit} = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        createUser(data.email, data.password, data.username);
        onClose();
        reset();
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>ユーザー登録</ModalHeader>
                    <ModalBody>
                        <Box mb={2} px={6} pb={6}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Stack spacing={2} mb={6}>
                                    <Box>
                                        <Text p={2} fontWeight="bold">E-Mail</Text>
                                        <Input
                                            border="2px"
                                            borderColor="gray.300"
                                            placeholder="E-Mail"
                                            {...register("email", {required: true, pattern: {value: /\S+@\S+\.\S+/, message: "メールアドレスの形式が違います" }})}/>
                                        <Text fontSize="xs" fontWeight="bold" color="red">{errors.email?.type === "required" && "メールアドレスを入力してください"}</Text>
                                        <Text fontSize="xs" fontWeight="bold" color="red">{errors.email?.message && "メールアドレスの形式が違います"}</Text>
                                    </Box>
                                    <Box>
                                        <Text p={2} fontWeight="bold">Password</Text>
                                        <Input type="password" border="2px" borderColor="gray.300" placeholder="Password" {...register("password", {required: true, maxLength: 20})}/>
                                        <Text fontSize="xs" fontWeight="bold" color="red">{errors.password?.type === "required" && "パスワードを入力してください"}</Text>
                                        <Text fontSize="xs" fontWeight="bold" color="red">{errors.password?.type === "maxLength" && "20文字以内で入力してください"}</Text>
                                    </Box>
                                    <Box>
                                        <Text p={2} fontWeight="bold">ユーザー名</Text>
                                        <Input border="2px" borderColor="gray.300" placeholder="Username" {...register("username", {required: true, maxLength: 20})}/>
                                        <Text fontSize="xs" fontWeight="bold" color="red">{errors.username?.type === "required" && "ユーザー名を入力してください"}</Text>
                                        <Text fontSize="xs" fontWeight="bold" color="red">{errors.username?.type === "maxLength" && "20文字以内で入力してください"}</Text>
                                    </Box>
                                </Stack>
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
                    </ModalBody>
                    <ModalCloseButton />
                </ModalContent>
            </ModalOverlay>
        </Modal>
    );
};