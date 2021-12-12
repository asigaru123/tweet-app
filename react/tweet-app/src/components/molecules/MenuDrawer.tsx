import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay } from "@chakra-ui/modal";
import { DrawerHeader } from "@chakra-ui/react";
import { VFC } from "react";
import { FaWrench, FaHome, FaWeixin } from "react-icons/fa";

type Props = {
    onClose: () => void;
    isOpen: boolean;
    onClickGoHome: () => void;
    onClickGoTweet: () => void;
    onClickGoSetting: () => void;
}

export const MenuDrawer: VFC<Props> = (props) => {
    const {onClose, isOpen, onClickGoHome, onClickGoTweet, onClickGoSetting} = props;

    return (
        <Drawer placement="left" onClose={onClose} isOpen={isOpen} variant="outline">
            <DrawerOverlay>
                <DrawerContent>
                    <Box backgroundColor="teal.600">
                    <DrawerHeader>Menu</DrawerHeader>
                    </Box>
                    <DrawerBody>
                        <Box p={2} fontSize="xl" fontWeight="bold">
                            <Stack>
                                <Flex align="center" onClick={() => {
                                    onClickGoHome();
                                    onClose();
                                }}>
                                    <FaHome size={20} />
                                    <Text ml={2}>Home</Text>
                                </Flex>
                                <Flex align="center" onClick={() => {
                                    onClickGoTweet();
                                    onClose();
                                }}>
                                    <FaWeixin size={20} />
                                    <Text ml={2}>Tweet</Text>
                                </Flex>
                                <Flex align="center" onClick={() => {
                                    onClickGoSetting();
                                    onClose();
                                }}>
                                    <FaWrench size={20}/>
                                    <Text ml={2}>Setting</Text>
                                </Flex>
                            </Stack>
                        </Box>
                    </DrawerBody>
                    <DrawerCloseButton />
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
};