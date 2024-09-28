import { useState, useEffect } from 'react';
import { getAllConversations, getUserData, createConversation, getConversationsByUser } from '../service/chatService';
import { useNavigate } from 'react-router-dom';

const ChatList = () => {
    const [conversations, setConversations] = useState([]);
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserData();
                setRole(userData.role);
                setUserId(userData.id);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                let data;
                if (role === 'admin') {
                    data = await getAllConversations();
                } else {
                    data = await getConversationsByUser(userId);
                }
                setConversations(data);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };

        if (role && userId) {
            fetchConversations();
        }
    }, [role, userId]);

    const handleClick = (conversation_id) => {
        navigate(`/dashboard/chat/${conversation_id}`);
    };

    const handleCreateConversation = async () => {
        try {
            const response = await createConversation(userId);
            const { conversationId, conversationName } = response;
            const newConversation = {
                conversation_id: conversationId,
                conversation_name: conversationName
            };
            setConversations([...conversations, newConversation]);
            navigate(`/dashboard/chat/${conversationId}`);
        } catch (error) {
            console.error('Error creating conversation:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">
                {role === 'admin' ? 'Chat' : 'Chat'}
            </h1>
            <ul className="list-group">
                {conversations.length > 0 ? (
                    conversations.map((conversation, index) => (
                        <li key={index} className="list-group-item w-50 mx-auto">
                            <button onClick={() => handleClick(conversation.conversation_id)} className='btn'>
                                {conversation.conversation_name}
                            </button>
                        </li>
                    ))
                ) : (
                    <div className="text-center">
                        <p>No conversations found.</p>
                        <button onClick={handleCreateConversation} className="btn btn-primary">
                            Create Conversation
                        </button>
                    </div>
                )}
            </ul>
        </div>
    );
};

export default ChatList;