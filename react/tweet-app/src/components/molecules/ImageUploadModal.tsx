import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { ChangeEvent, useState, VFC } from "react";
import Resizer from "react-image-file-resizer";
import { useProfileImage } from "../../hooks/useProfileImage";

type Props = {
    onClose: () => void;
    isOpen: boolean;
};

export const ImageUploadModal: VFC<Props> = (props) => {
    const {onClose, isOpen} = props;
    const [profileImage, setProfileImage] = useState<string>();
    const {changeImage} = useProfileImage();

    const onChangeInputImage = (event: ChangeEvent<HTMLInputElement>) => {
        Resizer.imageFileResizer(
            event.target.files![0],
            300,
            300,
            "JPEG",
            10,
            0,
            (image) => {
                setProfileImage(image as string);
            },
            "base64"
        );
    }

    const onClickChangeProfileImage = () => {
        changeImage(profileImage);
        setProfileImage("");
        onClose();
    };

    const onClickImageReset = () => {
        setProfileImage("");
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>画像を変更する</ModalHeader>
                    <ModalBody>
                        <Input type="file" accept="image/*" border="none" onChange={onChangeInputImage}/>
                        <Box w="100%" p={4}>
                            <Image src={profileImage}/>
                        </Box>
                        <Box mb={4}>
                            <Button border="1px" borderColor="gray.600" backgroundColor="gray.50" size="sm" borderRadius="3" ml={4} onClick={onClickChangeProfileImage}>変更</Button>
                            <Button border="1px" borderColor="gray.600" backgroundColor="gray.50" size="sm" borderRadius="3" ml={4} onClick={onClickImageReset}>リセット</Button>
                        </Box>
                    </ModalBody>
                    <ModalCloseButton />
                </ModalContent>
            </ModalOverlay>
        </Modal>
    );
};