import { Flex, Box } from "@chakra-ui/react";
import { ReactNode, VFC } from "react";
import { Header } from "../organisms/Header";

type Props = {
    children: ReactNode;
};

export const HeaderLayout: VFC<Props> = (props) => {
    const {children} = props;

    return (
        <>
            <Flex display={{base: "block", sm: "flex"}} w="100%" height="100vh">
                <Box position={{sm: "fixed"}}>
                    <Header />
                </Box>
                <Box w="100%">
                    {children}
                </Box>
            </Flex>
        </>
    );
};