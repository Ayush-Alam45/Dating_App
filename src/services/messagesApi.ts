import { Conversation, ChatMessage } from '../types/message';
import { mockConversations } from '../data/mockMessages';

// Future endpoints:
// GET /api/messages/conversations
// GET /api/messages/:conversationId
// POST /api/messages

export const messagesApi = {
  async getConversations(): Promise<Conversation[]> {
    await new Promise((res) => setTimeout(res, 200));
    return [...mockConversations];
  },

  async sendMessage(conversationId: string, text: string): Promise<ChatMessage> {
    await new Promise((res) => setTimeout(res, 150));
    return {
      id: `msg_${Date.now()}`,
      senderId: 'me',
      recipientId: conversationId,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered'
    };
  }
};

