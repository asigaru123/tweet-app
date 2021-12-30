import axios from "axios";
import { useHistory } from "react-router";
import { useCurrentLoginUser } from "./useCurrentLoginUser";
import { useMessage } from "./useMessage";

export const useDeleteUserAccount = () => {
    const history = useHistory();
    const {loginUser, setLoginUser} = useCurrentLoginUser();
    const {showMessage} = useMessage();
    const deleteUserAccount = () => {
        axios.delete(`/api/login/deleteUserAccount/${loginUser.email}`, {headers: {Authorization: loginUser.token as string}})
        .then((res) => {
            showMessage({title: "ユーザーを削除しました", status: "success"});
            setLoginUser({});
            history.push("/");
        })
        .catch((res) => showMessage({title: "ユーザーの削除に失敗しました", status: "error"}));
    };

    return {deleteUserAccount};
};