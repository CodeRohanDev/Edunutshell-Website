export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatbotRequest {
  message: string
  context: ChatMessage[]
}

export interface ChatbotResponse {
  reply: string
}

export class ChatbotService {
  private static readonly CHATBOT_URL = 'https://edunutshell-lms.onrender.com/api/chatbot'

  /**
   * Send a message to the AI Learning Mentor
   */
  static async sendMessage(message: string, context: ChatMessage[] = []): Promise<string> {
    try {
      console.log('Sending message to AI Mentor:', { message, contextLength: context.length })
      
      const response = await fetch(this.CHATBOT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          context,
        } as ChatbotRequest),
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error Response:', errorText)
        throw new Error(`API returned ${response.status}: ${errorText}`)
      }

      const data: ChatbotResponse = await response.json()
      console.log('Received reply from mentor:', data.reply)
      return data.reply
    } catch (error) {
      console.error('AI Mentor error details:', error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Failed to communicate with AI Learning Mentor')
    }
  }
}
