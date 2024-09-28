import { useState, useEffect } from 'react';
import { PaperAirplaneIcon, PaperclipIcon } from '@primer/octicons-react';
import { getConversationById, sendMessage, getUserData, getConversationDetailByUser } from '../service/chatService';
import { uploadAttachment } from '../utils/handler';
import '../styles/ChatDashboard.css';
import { useParams } from 'react-router-dom';

const ChatDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');
    const [isSending, setIsSending] = useState(false); // New state for loader
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getUserData();
                setUserData(user);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                let data;
                if (userData?.role === 'admin') {
                    data = await getConversationById(id);
                } else {
                    data = await getConversationDetailByUser(userData.id, id);
                }
                const formattedMessages = data.map(item => ({
                    text: item.message,
                    file: item.attachment_url,
                    fileName: item.attachment_name,
                    sender: item.sender_name,
                    senderId: item.sender_id,
                }));
                setMessages(formattedMessages)
            } catch (error) {
                console.error('Error fetching conversation:', error);
            }
        };

        if (id && userData) {
            fetchConversation();
        }
    }, [id, userData]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setUploadStatus(`Selected file: ${selectedFile.name}`);
    };

    const handleSendMessage = async () => {
        if ((input.trim() || file) && userData) {
            setIsSending(true); // Start loader
            let attachmentUrl = null;
            if (file) {
                try {
                    attachmentUrl = await uploadAttachment(file);
                    setUploadStatus(`File uploaded successfully: ${file.name}`);
                } catch (error) {
                    console.error('Error uploading attachment:', error);
                    setUploadStatus('Error uploading file');
                    setIsSending(false); // Stop loader
                    return;
                }
            }

            const messageData = {
                message: input,
                attachment: attachmentUrl,
                attachment_name: fileName,
                conversationId: id,
            };

            try {
                await sendMessage(messageData);
                const newMessage = {
                    text: input,
                    file: attachmentUrl,
                    fileName: fileName,
                    sender: userData.username,
                    role: userData.role,
                    senderId: userData.id,
                    conversationId: id
                };
                setMessages([...messages, newMessage]);
                setInput('');
                setFile(null);
                setFileName('');
                setUploadStatus('');
            } catch (error) {
                console.error('Error sending message:', error);
            } finally {
                setIsSending(false); // Stop loader
            }
        }
    };

    return (
        <div className="container mt-5 py-4">
            <h1 className="text-center mb-4">Chat</h1>
            <div className="card rounded-4">
                <div className="card-body chat-window rounded-top-4" style={{ height: '400px', overflowY: 'auto', scrollbarWidth: '1px' }}>
                    <ul className="list-unstyled">
                        {messages.map((message, index) => (
                            <li key={index} className={`d-flex align-items-center mb-3 ${message.sender === userData?.username ? 'justify-content-end' : 'justify-content-start'}`}>
                                <div className="d-flex align-items-center">
                                    <div className={`rounded-circle ${message.senderId === '10' || message.senderId === '20' ? 'bg-light text-dark' : 'bg-dark text-white'} d-flex align-items-center justify-content-center`} style={{ width: '40px', height: '40px', marginRight: '10px' }}>
                                        {message.sender.charAt(0).toUpperCase()}
                                    </div>
                                    <div className={`p-2 rounded ${message.senderId === '10' || message.senderId === '20' ? 'bg-light text-dark' : 'bg-dark text-white'}`}>
                                        <div>
                                            {message.text}
                                            <div>
                                                <a href={message.file} download className="text-success">{message.fileName}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="card-footer">
                    <div className="input-group d-flex gap-2 py-2">
                        <input
                            type="text"
                            className="form-control rounded-3"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Type your message..."
                        />
                        <input
                            type="file"
                            className="d-none"
                            id="fileInput"
                            onChange={handleFileChange}
                        />
                        <button
                            className="btn btn-secondary rounded-2"
                            onClick={() => document.getElementById('fileInput').click()}
                        >
                            <PaperclipIcon />
                        </button>
                        <div className="input-group-append">
                            <button className="btn btn-primary" onClick={handleSendMessage} disabled={isSending}>
                                {isSending ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                    <PaperAirplaneIcon />
                                )}
                            </button>
                        </div>
                    </div>
                    {uploadStatus && <div className="mt-2 text-success">{uploadStatus}</div>}
                </div>
            </div>
        </div >
    );
};

export default ChatDashboard;