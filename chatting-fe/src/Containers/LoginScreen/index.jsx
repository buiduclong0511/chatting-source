import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

import { Button, Input } from "../../Components";
import { login, register } from "../../Redux/slices/auth";
import { validateEmail } from "../../Util";

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const [registerValue, setRegisterValue] = useState({
        email: "",
        username: "",
        password: ""
    });

    const [loginValue, setLoginValue] = useState({
        email: "",
        password: ""
    });

    const handleChangeEmailRegister = (event) => {
        setRegisterValue({
            ...registerValue,
            email: event.target.value
        });
    };

    const handleChangeUsernameRegister = (event) => {
        setRegisterValue({
            ...registerValue,
            username: event.target.value
        });
    };

    
    const handleChangePasswordRegister = (event) => {
        setRegisterValue({
            ...registerValue,
            password: event.target.value
        });
    };

    
    const handleChangeEmailLogin = (event) => {
        setLoginValue({
            email: event.target.value
        });
    };

    const handleChangePasswordLogin = (event) => {
        setLoginValue({
            ...loginValue,
            password: event.target.value
        });
    };

    const validateLogin = (value) => {
        if (value.password && validateEmail(value.email) && value.password.trim()) {
            return true;
        }
        if (!validateEmail(value.email))  {
            toast.error("Email không hợp lệ!");
            return false;
        }
        if (!value.password || !value.password.trim()) {
            toast.error("Bạn chưa nhập password!");
            return false;
        }
    };

    const validateRegister = (value) => {
        if (value.username && value.password && validateEmail(value.email) && value.password.trim() && value.username.trim()) {
            return true;
        }
        if (!validateEmail(value.email))  {
            toast.error("Email không hợp lệ!");
            return false;
        }
        if (!value.password || !value.password.trim()) {
            toast.error("Bạn chưa nhập password!");
            return false;
        }
        if (!value.username || !value.username.trim()) {
            toast.error("Bạn chưa nhập username!");
            return false;
        }
    };
    
    const handleLogin = () => {
        if (validateLogin(loginValue)) {
            dispatch(login(loginValue));
            toast.info("Processing...");
        }
    };

    const handleRegister = () => {
        if (validateRegister(registerValue)) {
            dispatch(register(registerValue));
            toast.info("Processing...");
        }
    };

    return (
        <Container>
            <div className="form">
                <h2 className="heading">Đăng ký</h2>
                <div className="inputGroup">
                    <Input
                        id="emailRegister"
                        value={registerValue.email}
                        placeholder="Nhập địa chỉ email"
                        onChange={handleChangeEmailRegister}
                    >
                        <ion-icon name="mail-outline"></ion-icon>
                    </Input>
                    <Input
                        id="usernameRegister"
                        value={registerValue.username}
                        placeholder="Nhập username"
                        onChange={handleChangeUsernameRegister}
                    >
                        <ion-icon name="person-outline"></ion-icon>
                    </Input>
                    <Input
                        id="passwordRegister"
                        value={registerValue.password}
                        placeholder="Nhập password"
                        onChange={handleChangePasswordRegister}
                        type="password"
                    >
                        <ion-icon name="lock-closed-outline"></ion-icon>
                    </Input>
                </div>
                <Button title="Đăng ký" onClick={handleRegister} />
            </div>
            <div className="form">
                <h2 className="heading">Đăng nhập</h2>
                <div className="inputGroup">
                    <Input
                        id="emailLogin"
                        value={loginValue.email}
                        placeholder="Nhập địa chỉ email"
                        onChange={handleChangeEmailLogin}
                    >
                        <ion-icon name="mail-outline"></ion-icon>
                    </Input>
                    <Input
                        id="passwordLogin"
                        value={loginValue.password}
                        placeholder="Nhập password"
                        onChange={handleChangePasswordLogin}
                        type="password"
                    >
                        <ion-icon name="lock-closed-outline"></ion-icon>
                    </Input>
                </div>
                <Button title="Đăng nhập" onClick={handleLogin} />
            </div>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    
    .form {
        border: 1px solid #fff;
        padding: 20px 10px 30px 10px;
        margin: 20px;
        min-height: 300px;
        display: flex;
        flex-direction: column;

        .heading {
            margin-bottom: 10px;
        }

        .inputGroup {
            flex: 1;
        }
    }
`;