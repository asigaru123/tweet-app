import { Image } from "@chakra-ui/image";
import { memo, VFC } from "react";

type Props = {
    w?: string;
    size: string;
    image?: string;
};

export const ProfileImage: VFC<Props> = memo((props) => {
    const {w, size, image} = props;
    let profileImage;
    if(image === null){
        profileImage = `${process.env.PUBLIC_URL}/user_icon.png`
    }else if(image === undefined){
        profileImage = `${process.env.PUBLIC_URL}/user_icon.png`
    }else if(image === ""){
        profileImage = `${process.env.PUBLIC_URL}/user_icon.png`
    }else{
        profileImage = image;
    };

    return (
        <Image w={w} boxSize={size} borderRadius="full" src={profileImage as string} alt="" />
    );
});