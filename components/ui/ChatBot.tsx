'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { ChatbotService, ChatMessage } from '@/lib/api'

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI Learning Mentor. I'm here to guide you through your learning journey. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  // Handle wheel event to prevent propagation when scrolling inside messages
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = messagesContainerRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container
    const isScrollingDown = e.deltaY > 0
    const isScrollingUp = e.deltaY < 0

    // Prevent propagation if we're not at the boundaries
    const isAtTop = scrollTop === 0
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1

    if ((isScrollingDown && !isAtBottom) || (isScrollingUp && !isAtTop)) {
      e.stopPropagation()
    }
  }

  const buildContext = (): ChatMessage[] => {
    // Build context from last 5 messages (excluding the initial greeting)
    return messages
      .slice(1)
      .slice(-5)
      .map(msg => ({
        role: msg.isBot ? 'assistant' as const : 'user' as const,
        content: msg.text,
      }))
  }

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setMessage('')
    setIsLoading(true)

    try {
      const context = buildContext()
      console.log('Sending message with context:', context)
      const reply = await ChatbotService.sendMessage(message, context)

      const botResponse: Message = {
        id: messages.length + 2,
        text: reply,
        isBot: true,
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Error in handleSendMessage:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      
      const errorResponse: Message = {
        id: messages.length + 2,
        text: `I apologize, but I'm experiencing technical difficulties: ${errorMessage}. Please try again in a moment.`,
        isBot: true,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-primary rounded-full shadow-glow-lg
                   flex items-center justify-center z-50 hover:scale-110 transition-transform duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(0, 191, 255, 0.3)',
            '0 0 40px rgba(0, 191, 255, 0.6)',
            '0 0 20px rgba(0, 191, 255, 0.3)',
          ],
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onWheel={handleWheel}
            className="fixed bottom-24 right-6 w-80 h-96 bg-dark-card border border-dark-border
                       rounded-2xl shadow-glow z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-primary p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Learning Mentor</h3>
                  <p className="text-white/80 text-xs">Ready to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={messagesContainerRef}
              onWheel={handleWheel}
              className="flex-1 p-4 overflow-y-auto space-y-3"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${
                      msg.isBot
                        ? 'bg-dark-secondary text-text-primary'
                        : 'bg-gradient-primary text-white'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-dark-secondary text-text-primary p-3 rounded-xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-dark-border">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                  placeholder={isLoading ? "Your mentor is thinking..." : "Ask your mentor anything..."}
                  disabled={isLoading}
                  className="flex-1 bg-dark-secondary border border-dark-border rounded-xl px-3 py-2
                           text-text-primary placeholder-text-muted text-sm
                           focus:border-accent-blue focus:outline-none transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !message.trim()}
                  className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center
                           hover:scale-105 transition-transform duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot