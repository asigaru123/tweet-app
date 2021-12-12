import { useToast } from "@chakra-ui/toast";

type Props = {
    title: string;
    status: "success" | "warning" |"error";
}

export const useMessage = () => {
    const toast = useToast();
    const showMessage = (props: Props) => {
        const {title, status} = props;
        toast({
            title,
            status,
            position: "top",
            duration: 2000,
            isClosable: true
        });
    };

    return {showMessage};
};