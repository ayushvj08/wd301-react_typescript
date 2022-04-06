import { useRoutes } from "raviger";
import AppContainer from "../AppContainer";
import { About } from "../components/About";
import { Form } from "../components/Form";
import { Home } from "../components/Home";

const routes = {
    '/': () => <Home />,
    '/about': () => <About />,
    '/forms/:id': ({ id }: { id: string }) => <Form formId={Number(id)} />
}

export default function AppRouter() {
    let routeResult = useRoutes(routes);
    return <AppContainer >{routeResult}</AppContainer>
}