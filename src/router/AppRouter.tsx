import { useRoutes } from "raviger";
import App from "../App";
import AppContainer from "../AppContainer";
import { About } from "../components/About";

const routes = {
    '/': () => <App />,
    '/about': () => <About />

}

export default function AppRouter() {
    let routeResult = useRoutes(routes);
    return <AppContainer >{routeResult}</AppContainer>
}