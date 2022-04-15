import { useRoutes } from "raviger";
import AppContainer from "../AppContainer";
import { About } from "../components/About";
import { Form } from "../components/Form";
import { Home } from "../components/Home";
import PreviewForm from "../components/PreviewForm";

const routes = {
    '/': () => <Home />,
    '/about': () => <About />,
    '/forms/:id': ({ id }: { id: string }) => <Form formId={Number(id)} />,
    '/preview/:formId': ({ formId }: { formId: string }) => <PreviewForm formId={Number(formId)} />
}

export default function AppRouter() {
    let routeResult = useRoutes(routes);
    return <AppContainer >{routeResult}</AppContainer>
}