import { IconButton } from "@chakra-ui/button";
import { HamburgerIcon } from "@chakra-ui/icons";
import { VFC } from "react";

type Props = {
    onOpen: () => void;
}

export const MenuIconButton: VFC<Props> = (props) => {
    const {onOpen} = props;

    return (
        <IconButton aria-label="menuButton" icon={<HamburgerIcon/>} variant="none" size="lg" onClick={onOpen}/>
    );
};