import axios from 'axios';

const API_URL = 'http://localhost:3000';

const getToken = () => {
    return localStorage.getItem('token');
};

export const getUserData = async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/auth/me`, {
            headers: {
                'x-access-token': token
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to send a message
export const sendMessage = async (messageData) => {
    try {
        const token = getToken();
        const response = await axios.post(`${API_URL}/chat/send`, messageData, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get all conversations (admin only)
export const getAllConversations = async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/chat/conversations`, {
            headers: {
                'x-access-token': token
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get conversation by ID (admin only)
export const getConversationById = async (id) => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/chat/conversations/${id}`, {
            headers: {
                'x-access-token': token
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to delete conversation by ID (admin only)
export const deleteConversationById = async (id) => {
    try {
        const token = getToken();
        const response = await axios.delete(`${API_URL}/chat/conversations/${id}`, {
            headers: {
                'x-access-token': token
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get conversations by user ID
export const getConversationsByUser = async (userId) => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/chat/conversations/user/${userId}`, {
            headers: {
                'x-access-token': token
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to create a conversation
export const createConversation = async (recipientId) => {
    try {
        const token = getToken();
        const response = await axios.post(`${API_URL}/chat/conversations/create`, { recipientId }, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get conversation detail by user ID and conversation ID
export const getConversationDetailByUser = async (userId, conversationId) => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/chat/conversations/user/${userId}/${conversationId}`, {
            headers: {
                'x-access-token': token
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};