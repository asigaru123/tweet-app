import { Home } from "../components/pages/Home";
import { Setting } from "../components/pages/Setting";
import { Tweet } from "../components/pages/Tweet";

export const HomeRouter = [
    {
        path: "/",
        exact: true,
        children: <Home />
    },
    {
        path: "/tweet",
        exact: false,
        children: <Tweet />
    },
    {
        path: "/setting",
        exact: false,
        children: <Setting />
    }
]