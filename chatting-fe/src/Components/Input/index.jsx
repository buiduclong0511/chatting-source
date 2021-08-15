// import { Children } from "react";
import styled from "styled-components";

export const Input = ({
    children = null,
    id = "",
    value = "",
    placeholder = "",
    type = "text",
    onFocus = () => {},
    onBlur = () => {},
    onChange = () => {},
}) => {
    return (
        <Container>
            <label htmlFor={id} className="inputLabel">
                {children}
            </label>
            <input 
                value={value} 
                type={type} 
                id={id} 
                className="input" 
                placeholder={placeholder} 
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top: 10px;

    .inputLabel {
        position: absolute;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
    }

    .input {
        background-color: transparent;
        color: #fff;
        border: 1px solid #fff;
        outline: none;
        padding: 10px 10px 10px 25px;

        &::placeholder {
            color: #ffffffbc;
        }
    }
`;