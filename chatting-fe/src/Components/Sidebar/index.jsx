import { useSelector } from "react-redux";
import styled from "styled-components";

import { authSelector } from "../../Redux/slices";
import { Conversation } from "../Conversation";
import { Input } from "../Input";
import { SearchResult } from "../SearchResult";

export const Sidebar = ({
    isShowSearchResult = false,
    keySearch = "",
    searchResult = [],
    onCreateConversation,
    conversations = [],
    isSearching,
    onShowSearchResult = () => {},
    onHiddenSearchResult = () => {},
    onToggleShowProfile = () => {},
    onChangeKeySearch = () => {},
    onClickConversation = () => {}
}) => {
    const userInfo = useSelector(authSelector).userInfo;
    return (
        <Container>
            <div className="searchUser">
                <div className="userInfo" onClick={onToggleShowProfile}>
                    <ion-icon name="person-circle"></ion-icon>
                </div>
                <div className="searchBox">
                    <Input
                        placeholder="Nhập id"
                        onFocus={onShowSearchResult}
                        onBlur={onHiddenSearchResult}
                        value={keySearch}
                        onChange={onChangeKeySearch}
                    >
                        <ion-icon name="search-outline"></ion-icon>
                    </Input>
                    {isShowSearchResult ? (
                        <div className="searchResult">
                            <SearchResult isSearching={isSearching} searchResult={searchResult} onCreateConversation={onCreateConversation} />
                        </div>
                    ) : <></>}
                </div>
            </div>

            <div className="listFriends">
                {conversations.map(conversation => {
                    const username = conversation.members.find(user => user._id !== userInfo._id).username;
                    const onClick = () => onClickConversation(conversation);
                    return (
                        <Conversation 
                            key={conversation._id}
                            username={username}
                            newestMessage="newest message"
                            onClick={onClick}
                        />
                    );
                })}
            </div>
        </Container>
    );
};

const Container = styled.div`
    min-height: 100vh;
    background-color: #201f22;
    display: flex;
    flex-direction: column;

    .searchUser {
        border-bottom: 1px solid #ccc;
        height: 80px;
        padding: 10px;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .userInfo {
            cursor: pointer;

            ion-icon {
                font-size: 30px;
            }
        }

        .searchBox {
            flex: 1;
            margin-left: 10px;

            div {
                margin-top: 0;
            }

            .searchResult {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
            }
        }
    }

    .listFriends {
        overflow-y: scroll;
        height: calc(100vh - 80px);

        /* width */
        &::-webkit-scrollbar {
            width: 5px;
        }
        
        /* Track */
        &::-webkit-scrollbar-track {
            background: #ccc; 
        }
        
        /* Handle */
        &::-webkit-scrollbar-thumb {
            background: #888; 
        }
        
        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover {
            background: #555; 
        }
    }
`;