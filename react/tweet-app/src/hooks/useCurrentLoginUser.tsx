import { useContext } from "react";
import { LoginUserContext, LoginUserContextType } from "../provider/LoginUserProvider";

export const useCurrentLoginUser = (): LoginUserContextType => useContext(LoginUserContext);