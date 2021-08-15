import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { io } from "socket.io-client";

import { conversationApi, messageApi, userApi } from "../../Api";
import { Message, ProfileModal, Sidebar, Welcome } from "../../Components";
import { ENTER_KEY } from "../../Constants";
import { useDebounce } from "../../Hooks";
import { authSelector, logout } from "../../Redux/slices/auth";
// import { socket } from "../../socket";
import { sleep } from "../../Util";

export const AppScreen = () => {
    const [firstTimeAccess, setFirstTimeAccess] = useState(true);
    const [isShowSearchResult, setIsShowSearchResult] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [isShowProfile, setIsShowProfile] = useState(false);
    const [keySearch, setKeySearch] = useState("");
    const [conversations, setConversations] = useState([]);
    const [currentChatInfo, setCurrentChatInfo] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState("");
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [listUserOnline, setListUserOnline] = useState([]);
    const listMessagesRef = useRef(null);
    const [isScrollTop, setIsScrollTop] = useState(false);
    const [isHaveNewMessage, setIsHaveNewMessage] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const socket = useRef(null);

    // console.log(messages);

    const dispatch = useDispatch();
    const userInfo = useSelector(authSelector).userInfo;


    // effect functions
    const fetchConversations = async () => {
        try {
            const res = await conversationApi.getConversationsBySenderId(userInfo._id);
            setConversations(res.data.conversations);
        } catch (err) {
            console.log(err);
        }
    };
    
    const fetchMessages = async () => {
        try {
            if (currentChatInfo) {
                const res = await messageApi.getMessagesByConversationId(currentChatInfo._id);
                setMessages(res.data.messages);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const registerSocket = () => {
        socket.current.emit("register", {
            userId: userInfo._id
        });
    };

    const receiveMessageFromServer = () => {
        socket.current.on("serverSendMessage", data => {
            setReceivedMessage({
                sender: data.sender,
                text: data.text
            });
            setIsHaveNewMessage(true);
        });
    };

    const concatMessages = () => {
        const friendId = currentChatInfo.members.find(user => user._id !== userInfo._id)._id;
        if (receivedMessage.sender._id === friendId) {
            setMessages([...messages, receivedMessage]);
        }
    };

    const updateUserOnline = () => {
        socket.current.on("updateUserOnline", data => {
            setListUserOnline(data);
        });
    };
    // effect functions

    // console.log(receivedMessage);

    // effect
    useEffect(() => {
        socket.current = io("https://chatting-socket.herokuapp.com");
        fetchConversations();
        registerSocket();
        receiveMessageFromServer();
        updateUserOnline();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isHaveNewMessage) {
            fetchConversations();
            setIsHaveNewMessage(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHaveNewMessage]);

    useEffect(() => {
        fetchMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentChatInfo]);

    useEffect(() => {
        if (receivedMessage && currentChatInfo) {
            concatMessages();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receivedMessage]);

    useEffect(() => {
        if (listMessagesRef.current && !isScrollTop) {
            listMessagesRef.current.scrollTop = listMessagesRef.current.scrollHeight;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    useEffect(() => {
        const toggleIsScrollTop = (event) => {
            // console.log([event.target.scrollTop, event.target.scrollHeight - event.target.offsetHeight - 50]);
            if (event.target.scrollTop >= event.target.scrollHeight - event.target.offsetHeight - 50) {
                setIsScrollTop(false);
            } else {
                setIsScrollTop(true);
            }
        };
        if (listMessagesRef.current) {
            listMessagesRef.current.addEventListener("scroll", toggleIsScrollTop);
        }

        return () => {
            if (listMessagesRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                listMessagesRef.current.removeEventListener("scroll", toggleIsScrollTop);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listMessagesRef.current]);
    // effect


    
    // debounce
    useDebounce(() => {
        if (keySearch.trim()) {
            setIsSearching(true);
            userApi.search(keySearch)
                .then(res => {
                    console.log(res.data);
                    const users = res.data.users.filter(user => user._id !== userInfo._id);
                    setSearchResult(users);
                })
                .catch(err => {
                    console.log(err);
                    setSearchResult([]);
                })
                .finally(() => {
                    setIsSearching(false);
                });
        }
    }, 800, [keySearch]);
    //debounce



    // handle functions
    const handleShowSearchResult = () => {
        setIsShowSearchResult(true);
    };
    
    const handleHiddenSearchResult = async () => {
        await sleep(200);
        setIsShowSearchResult(false);
    };

    const handleToggleShowProfile = () => {
        setIsShowProfile(!isShowProfile);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleChangeKeySearch = (event) => {
        setKeySearch(event.target.value);
    };

    const handleCreateConversation = (receiverId) => {
        conversationApi.createNewConversation({
            senderId: userInfo._id,
            receiverId
        })
        .then(res => {
            // console.log(res.data.conversation);
            if (res.data.conversation) {
                fetchConversations();
                setCurrentChatInfo(res.data.conversation[0]);
                setFirstTimeAccess(false);
            }
        });
    };

    const handleClickConversation = (conversation) => {
        setFirstTimeAccess(false);
        setCurrentChatInfo(conversation);
    };

    const handleChangeMessageContent = (event) => {
        setMessageContent(event.target.value);
    };

    const handleSendMessage = async () => {
        try {
            if (messageContent.trim()) {
                const _messageContent = messageContent;
                setMessageContent("");
                const body = {
                    conversationId: currentChatInfo._id,
                    senderId: userInfo._id,
                    text: messageContent
                }
                await messageApi.sendMessage(body);
                const receiver = currentChatInfo.members.find(user => user._id !== userInfo._id);
                socket.current.emit("clientSendMessage", {
                    sender: userInfo,
                    receiver,
                    text: _messageContent
                });
                setMessages([...messages, {
                    sender: {
                        _id: userInfo._id
                    },
                    text: _messageContent
                }]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleKeyUp = (event) => {
        if (event.keyCode === ENTER_KEY) {
            handleSendMessage();
        }
    };
    // handle functions

    // console.log(listUserOnline);

    return (
        <Container>
            {isShowProfile && <ProfileModal onClose={handleToggleShowProfile} onLogout={handleLogout} />}
            <div className="sidebar">
                <Sidebar 
                    onShowSearchResult={handleShowSearchResult}
                    onHiddenSearchResult={handleHiddenSearchResult}
                    isShowSearchResult={isShowSearchResult}
                    onToggleShowProfile={handleToggleShowProfile}
                    keySearch={keySearch}
                    onChangeKeySearch={handleChangeKeySearch}
                    searchResult={searchResult}
                    onCreateConversation={handleCreateConversation}
                    conversations={conversations}
                    onClickConversation={handleClickConversation}
                    isSearching={isSearching}
                />
            </div>
            <div className="main">
                {firstTimeAccess ? (
                    <Welcome username={userInfo.username} id={userInfo._id} />
                ) : (
                    <>
                        <div className="header">
                            {currentChatInfo.members.find(member => member._id !== userInfo._id).username}
                        </div>
                        <div className="listMessage" ref={listMessagesRef}>
                            {messages.map((message, index) => {
                                // console.log(message);
                                const isMe = userInfo._id === message.sender._id;
                                return (
                                    <Message
                                        key={message._id || index}
                                        isMe={isMe}
                                        username={message.sender.username}
                                        message={message.text}
                                    />
                                );
                            })}
                        </div>
                        <div className="inputMessage">
                            <div className="input">
                                <input type="text" value={messageContent} onChange={handleChangeMessageContent} onKeyUp={handleKeyUp} />
                            </div>
                            <div className="btn">
                                <button className="sendBtn" onClick={handleSendMessage}>
                                    <ion-icon name="send-outline"></ion-icon>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    min-height: 100vh;

    .sidebar {
        flex: 1;
    }

    .main {
        flex: 4;
        height: 100vh;
        display: flex;
        flex-direction: column;

        .header {
            padding: 20px;
            border-bottom: 1px solid #000;
            box-shadow: 0 0 5px #000;
        }

        .listMessage {
            flex: 1;
            overflow-y: scroll;
            padding-right: 10px;

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

        .inputMessage {
            display: flex;
            background-color: #3b383d;
            border-top: 1px solid #ccc;

            .input {
                flex: 1;

                input {
                    background-color: transparent;
                    width: 100%;
                    border: none;
                    outline: none;
                    padding: 20px;
                    color: #fff;
                    font-size: 18px;
                }
            }

            .btn {
                width: 80px;

                button {
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                    background-color: transparent;
                    border: none;
                    border-left: 1px solid #ccc;

                    ion-icon {
                        font-size: 25px;
                        color: #fff;
                    }
                }
            }
        }
    }
`;