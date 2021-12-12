import { Route, Switch } from "react-router"
import { Login } from "../components/pages/Login"
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { LoginUserProvider } from "../provider/LoginUserProvider";
import { HomeRouter } from "./HomeRouter"

export const Router = () => {
    return (
        <Switch>
            <LoginUserProvider>
                <Route exact path="/">
                    <Login />
                </Route>

                <Route path="/home" render={({match: {url}}) => (
                    <Switch>
                        {HomeRouter.map((route) => (
                            <Route key={route.path} exact={route.exact} path={`${url}${route.path}`}>
                                <HeaderLayout>
                                    {route.children}
                                </HeaderLayout>
                            </Route>
                        ))}
                    </Switch>
                )}
                />
            </LoginUserProvider>
        </Switch>
    );
};