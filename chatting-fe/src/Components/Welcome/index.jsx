import styled from "styled-components";

export const Welcome = ({
    username = "",
    id = ""
}) => {
    return (
        <Container>
            <div className="content">
                <p className="welcomeHeading">Welcome!</p>
                <p className="username">{username}</p>
                <p className="username">ID của bạn là: {id}</p>
                <p className="username">Chia sẻ ID của bạn cho bạn bè :v</p>
            </div>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;

    .welcomeHeading {
        margin-top: 100px;
        font-size: 50px;
    }

    .username {
        font-size: 25px;
        font-weight: 700;
    }
`;