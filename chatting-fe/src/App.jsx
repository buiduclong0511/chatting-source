import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";

import { AppScreen, LoginScreen } from "./Containers";
import { authSelector } from "./Redux/slices/auth";

export const App = () => {
    const userInfo = useSelector(authSelector).userInfo;
    return (
        <Container className="App">
            {!userInfo ? (
                <LoginScreen />
            ) : (
                <AppScreen />
            )}

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
            />
        </Container>
    );
};

const Container = styled.div`
    min-height: 100vh;
    background-color: ${p => p.theme.colors.main};
`;