import { Conversation } from '../types/message';

export const mockConversations: Conversation[] = [
  {
    id: 'conv_aanya',
    participantId: 'cand_aanya',
    participantName: 'Aanya',
    participantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    participantAge: 24,
    verified: true,
    lastMessage: 'Hey! How was your day?',
    lastMessageTime: '2m',
    unreadCount: 1,
    online: true,
    messages: [
      {
        id: 'msg_a1',
        senderId: 'cand_aanya',
        recipientId: 'me',
        text: 'Hi Alex! I noticed you enjoy human-computer interaction and vinyl records. Rare combination!',
        timestamp: '10:14 AM',
        status: 'read'
      },
      {
        id: 'msg_a2',
        senderId: 'me',
        recipientId: 'cand_aanya',
        text: 'Haha, yes! Nothing beats the tactile feeling of analogue sound while coding a clean interface. What are you spinning lately?',
        timestamp: '10:18 AM',
        status: 'read'
      },
      {
        id: 'msg_a3',
        senderId: 'cand_aanya',
        recipientId: 'me',
        text: 'Miles Davis "Kind of Blue" and some ambient electronic tracks. Hey! How was your day?',
        timestamp: '10:24 AM',
        status: 'delivered'
      }
    ]
  },
  {
    id: 'conv_riya',
    participantId: 'cand_riya',
    participantName: 'Riya',
    participantAvatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80',
    participantAge: 22,
    verified: true,
    lastMessage: "That's so cool!",
    lastMessageTime: '12m',
    unreadCount: 0,
    online: false,
    messages: [
      {
        id: 'msg_r1',
        senderId: 'cand_riya',
        recipientId: 'me',
        text: 'I loved the quote in your profile about intentional living.',
        timestamp: 'Yesterday',
        status: 'read'
      },
      {
        id: 'msg_r2',
        senderId: 'me',
        recipientId: 'cand_riya',
        text: 'Thank you! It feels like everyone rushes these days. Glad it resonated with you.',
        timestamp: 'Yesterday',
        status: 'read'
      },
      {
        id: 'msg_r3',
        senderId: 'cand_riya',
        recipientId: 'me',
        text: "That's so cool!",
        timestamp: '9:45 AM',
        status: 'read'
      }
    ]
  },
  {
    id: 'conv_sneha',
    participantId: 'cand_sneha',
    participantName: 'Sneha',
    participantAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    participantAge: 25,
    verified: true,
    lastMessage: 'Sounds good!',
    lastMessageTime: '2h',
    unreadCount: 0,
    online: true,
    messages: [
      {
        id: 'msg_s1',
        senderId: 'me',
        recipientId: 'cand_sneha',
        text: 'Would love to hear more about that design exhibition you went to.',
        timestamp: '8:00 AM',
        status: 'read'
      },
      {
        id: 'msg_s2',
        senderId: 'cand_sneha',
        recipientId: 'me',
        text: 'Sounds good!',
        timestamp: '8:50 AM',
        status: 'read'
      }
    ]
  },
  {
    id: 'conv_diya',
    participantId: 'cand_diya',
    participantName: 'Diya',
    participantAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    participantAge: 26,
    verified: false,
    lastMessage: "Let's catch up?",
    lastMessageTime: '3h',
    unreadCount: 0,
    online: false,
    messages: [
      {
        id: 'msg_d1',
        senderId: 'cand_diya',
        recipientId: 'me',
        text: "Let's catch up?",
        timestamp: '7:40 AM',
        status: 'read'
      }
    ]
  },
  {
    id: 'conv_ankita',
    participantId: 'cand_ankita',
    participantName: 'Ankita',
    participantAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    participantAge: 23,
    verified: true,
    lastMessage: 'I loved your last post!',
    lastMessageTime: '5h',
    unreadCount: 0,
    online: false,
    messages: [
      {
        id: 'msg_an1',
        senderId: 'cand_ankita',
        recipientId: 'me',
        text: 'I loved your last post!',
        timestamp: '5:30 AM',
        status: 'read'
      }
    ]
  },
  {
    id: 'conv_kiara',
    participantId: 'cand_kiara',
    participantName: 'Kiara',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    participantAge: 27,
    verified: true,
    lastMessage: 'Your profile is so interesting...',
    lastMessageTime: '1d',
    unreadCount: 0,
    online: false,
    messages: [
      {
        id: 'msg_k1',
        senderId: 'cand_kiara',
        recipientId: 'me',
        text: 'Your profile is so interesting...',
        timestamp: 'Yesterday',
        status: 'read'
      }
    ]
  }
];

