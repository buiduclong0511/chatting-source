import styled from "styled-components";

export const Message = ({
    isMe = false,
    username = "",
    message = ""
}) => {
    return (
        <Container isMe={isMe}>
            {isMe ? (
                <>
                    <div className="message">
                        {message}
                    </div>
                </>
            ) : (
                <>
                    <div className="username">
                        {username}
                    </div>
                    <div className="message">
                        {message}
                    </div>
                </>
            )}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: ${p => p.isMe ? "flex-end" : "flex-start"};
    margin: 20px 0;

    .message {
        max-width: 400px;
        background-color: #4e4a4a;
        padding: 10px;
        border-radius: 8px;
        color: #fff;
        margin: 0 5px;
    }

    .username {
        padding: 5px;
    }
`;  