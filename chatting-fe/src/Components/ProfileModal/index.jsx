import { useSelector } from "react-redux";
import styled from "styled-components";

import { authSelector } from "../../Redux/slices/auth";
import { Button } from "../Button";

export const ProfileModal = ({
    onClose = () => {},
    onLogout = () => {}
}) => {
    const userInfo = useSelector(authSelector).userInfo;
    // console.log(userInfo);

    return (
        <Container>
            <div className="overlay"></div>
            <div className="profileMain">
                <p className="username">Username: {userInfo.username}</p>
                <p className="id">ID: {userInfo._id}</p>
                <div className="buttonOK">
                    <Button title="OK" onClick={onClose} />
                </div>
                <div className="buttonLogout">
                    <Button title="Logout" onClick={onLogout} />
                </div>
            </div>
        </Container>
    );
};

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);;
    }

    .profileMain {
        z-index: 1;
        background-color: #381c38;
        width: 400px;
        height: 300px;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding-top: 50px;
        border-radius: 15px;

        .username {
            font-size: 23px;
            padding-bottom: 10px;
        }

        .buttonOK {
            padding-top: 60px;
            width: 200px;
        }

        .buttonLogout {
            width: 200px;
        }
    }
`;