export interface Message {
    id: number
    senderId: number
    senderUsername: string
    senderPhotoUrl: string
    recipientId: number
    recipientUsername: string
    recipeientPhotoUrl: string
    content: string
    dateRead?: Date
    messageSent: Date
  }
