import { Flex, Stack } from "@chakra-ui/react";
import { Box, Heading, Spacer, Text } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import { VFC } from "react";
import { MenuIconButton } from "../atoms/MenuIconButton";
import { MenuDrawer } from "../molecules/MenuDrawer";
import { useHistory } from "react-router";
import { ImExit } from "react-icons/im";
import { FaWrench, FaHome, FaWeixin } from "react-icons/fa";
import { useCurrentLoginUser } from "../../hooks/useCurrentLoginUser";

export const Header: VFC = () => {
    const history = useHistory();
    const {onOpen, onClose, isOpen} = useDisclosure();
    const {setLoginUser} = useCurrentLoginUser();

    const onClickGoHome = () => history.push("/home");
    const onClickGoTweet = () => history.push("/home/tweet");
    const onClickGoSetting = () => history.push("/home/setting");
    const onClickGoLogout = () => {
        setLoginUser({});
        history.push("/");
    }

    return (
        <>
            <Flex align="center" p={2} backgroundColor="teal.600" display={{base: "flex", sm: "none"}}>
                    <MenuIconButton onOpen={onOpen}/>
                    <Box ml={4}>
                        <Heading></Heading>
                    </Box>
                <Spacer />
                <Box onClick={onClickGoLogout}>
                    <ImExit size={30} />
                </Box>
            </Flex>
            <MenuDrawer
                onClose={onClose}
                isOpen={isOpen}
                onClickGoHome={onClickGoHome}
                onClickGoTweet={onClickGoTweet}
                onClickGoSetting={onClickGoSetting}
            />

            <Flex display={{base: "none", sm: "flex"}} mr={6}>
                <Box mt={4} p={4} px={2} backgroundColor="teal.600" height="100vh">
                    <Box mx={6}>
                    <Stack spacing={4} mt={14} pl={4} fontSize="xl" fontWeight="bold" color="whiteAlpha.800">
                        <Flex align="center" _hover={{cursor: "pointer"}} onClick={onClickGoHome}>
                            <FaHome size={20} />
                            <Text ml={1}> Home</Text>
                        </Flex>
                        <Flex align="center" _hover={{cursor: "pointer"}} onClick={onClickGoTweet}>
                            <FaWeixin size={20} />
                            <Text ml={1}>Tweet</Text>
                        </Flex>
                        <Flex align="center" _hover={{cursor: "pointer"}} onClick={onClickGoSetting}>
                            <FaWrench size={20}/> 
                            <Text ml={1}>Setting</Text>
                        </Flex>
                        <Flex align="center" _hover={{cursor: "pointer"}} onClick={onClickGoLogout}>
                            <ImExit size={20}/> 
                            <Text ml={1}>Logout</Text>
                        </Flex>
                    </Stack>
                    </Box>
                </Box>
            </Flex>
        </>
    );
};