import { SEND_MESSAGE } from "contants/common";
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const ChatPage = () => {
    const [mess, setMess] = useState([]);
    const [message, setMessage] = useState('');
    const [id, setId] = useState();

    const socketRef = useRef();
    const messagesEnd = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient.connect(process.env.BE_API_URL)

        socketRef.current.on('getId', data => {
            setId(data)
        })

        socketRef.current.on(SEND_MESSAGE, dataGot => {
            setMess(oldMsgs => [...oldMsgs, dataGot.data])
            scrollToBottom()
        })

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (message !== null) {
            const msg = {
                content: message,
                id: id
            }
            socketRef.current.emit(SEND_MESSAGE, msg)
            setMessage('')
        }
    }

    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }


    const renderMess = mess.map((m, index) =>
        <div key={index} className={`${m.id === id ? 'your-message' : 'other-people'} chat-item`}>
            {m.content}
        </div>
    )

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            sendMessage()
        }
    }

    return (
        <div className="box-chat">
            <div className="box-chat_message">
                {renderMess}
                <div style={{ float: "left", clear: "both" }}
                    ref={messagesEnd}>
                </div>
            </div>

            <div className="send-box">
                <textarea
                    value={message}
                    onKeyDown={onEnterPress}
                    onChange={handleChange}
                    placeholder="Nhập tin nhắn ..."
                />
                <button onClick={sendMessage}>
                    Send
                </button>
            </div>

        </div>
    );
};

export default ChatPage;