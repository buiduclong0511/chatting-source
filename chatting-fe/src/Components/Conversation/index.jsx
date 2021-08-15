import styled from "styled-components";

export const Conversation = ({
    username = "",
    newestMessage = "Bắt đầu cuộc trò chuyện",
    onClick = () => {}
}) => {
    return (
        <Container onClick={onClick}>
            <p className="username">
                {username}
            </p>
            <p className="newestMessage">
                {newestMessage}
            </p>
        </Container>
    );
};

const Container = styled.div`
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;

    .username {
        padding-top: 10px;
        padding-bottom: 5px;
        font-weight: 700;
        font-size: 20px;
    }

    .newestMessage {
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-bottom: 10px;
        color: #ccc;
        white-space: nowrap;
    }
`;