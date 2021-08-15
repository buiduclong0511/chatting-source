import styled from "styled-components";

export const SearchResultItem = ({
    data = {},
    onclick = () => {}
}) => {
    return (
        <Container onClick={onclick}>
            <div className="username">{data.username}</div>
            <p className="userId">ID: {data._id}</p>
            <p className="userId">Email: {data.email}</p>
        </Container>
    );
};

const Container = styled.div`
    padding: 10px;
    border-bottom: 1px solid #3f3d3d;
    cursor: pointer;

    .username {
        padding: 5px 0;
        font-weight: 700;
    }

    .userId {
        font-size: 13px;
    }
`;