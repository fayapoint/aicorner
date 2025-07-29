"use client";

import { DocsLayout } from "@/components/docs-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, 
  CheckCircle, 
  MessageSquare, 
  Code, 
  Zap,
  Play,
  ArrowRight,
  Lightbulb,
  Settings,
  Rocket
} from "lucide-react";
import { useState } from "react";

export default function BuildingChatbotPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const htmlStructure = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Corner Chatbot</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .chat-container { max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; }
        .chat-header { background: #007bff; color: white; padding: 15px; border-radius: 10px 10px 0 0; }
        .chat-messages { height: 400px; overflow-y: auto; padding: 20px; }
        .message { margin-bottom: 15px; }
        .user-message { text-align: right; }
        .bot-message { text-align: left; }
        .message-bubble { display: inline-block; padding: 10px 15px; border-radius: 20px; max-width: 70%; }
        .user-bubble { background: #007bff; color: white; }
        .bot-bubble { background: #f1f1f1; color: #333; }
        .chat-input { display: flex; padding: 20px; border-top: 1px solid #ddd; }
        .chat-input input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 20px; }
        .chat-input button { margin-left: 10px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 20px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="chat-header">
            <h3>AI Corner Assistant</h3>
        </div>
        <div class="chat-messages" id="chatMessages">
            <div class="message bot-message">
                <div class="message-bubble bot-bubble">
                    Hello! I'm your AI assistant. How can I help you today?
                </div>
            </div>
        </div>
        <div class="chat-input">
            <input type="text" id="messageInput" placeholder="Type your message..." onkeypress="handleKeyPress(event)">
            <button onclick="sendMessage()">Send</button>
        </div>
    </div>
    <script src="chatbot.js"></script>
</body>
</html>`;

  const javascriptCode = `class AIChatbot {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.messages = [
            {
                role: "system",
                content: "You are a helpful AI assistant. Be friendly, concise, and helpful."
            }
        ];
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
    }

    async sendMessage(userMessage) {
        // Add user message to conversation
        this.addMessage(userMessage, 'user');
        this.messages.push({ role: "user", content: userMessage });

        // Show typing indicator
        this.showTypingIndicator();

        try {
            const response = await fetch('https://api.aicorner.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': \`Bearer \${this.apiKey}\`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: this.messages,
                    max_tokens: 150,
                    temperature: 0.7
                })
            });

            const data = await response.json();
            
            if (data.choices && data.choices[0]) {
                const botMessage = data.choices[0].message.content;
                this.messages.push({ role: "assistant", content: botMessage });
                
                // Remove typing indicator and add bot response
                this.hideTypingIndicator();
                this.addMessage(botMessage, 'bot');
            } else {
                throw new Error('Invalid response from API');
            }
        } catch (error) {
            console.error('Error:', error);
            this.hideTypingIndicator();
            this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
        }
    }

    addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = \`message \${sender}-message\`;
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = \`message-bubble \${sender}-bubble\`;
        bubbleDiv.textContent = message;
        
        messageDiv.appendChild(bubbleDiv);
        this.chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = '<div class="message-bubble bot-bubble">Typing...</div>';
        this.chatMessages.appendChild(typingDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = this.chatMessages.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
}

// Initialize chatbot
const chatbot = new AIChatbot('YOUR_API_KEY_HERE');

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        chatbot.sendMessage(message);
        input.value = '';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}`;

  const pythonFlaskCode = `from flask import Flask, render_template, request, jsonify
import requests
import os

app = Flask(__name__)

class AIChatbot:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.aicorner.com/v1"
        
    def chat_completion(self, messages):
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        data = {
            "model": "gpt-4",
            "messages": messages,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        response = requests.post(
            f"{self.base_url}/chat/completions",
            headers=headers,
            json=data
        )
        
        return response.json()

# Initialize chatbot
chatbot = AIChatbot(os.getenv('AICORNER_API_KEY'))

@app.route('/')
def index():
    return render_template('chat.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    conversation = request.json.get('conversation', [])
    
    # Add system message if this is the first message
    if not conversation:
        conversation.append({
            "role": "system",
            "content": "You are a helpful AI assistant."
        })
    
    # Add user message
    conversation.append({
        "role": "user",
        "content": user_message
    })
    
    try:
        response = chatbot.chat_completion(conversation)
        
        if 'choices' in response and response['choices']:
            bot_message = response['choices'][0]['message']['content']
            conversation.append({
                "role": "assistant",
                "content": bot_message
            })
            
            return jsonify({
                'success': True,
                'message': bot_message,
                'conversation': conversation
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Invalid response from AI service'
            })
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })

if __name__ == '__main__':
    app.run(debug=True)`;

  return (
    <DocsLayout
      currentPath="/docs/tutorials/building-chatbot"
      title="Building a Chatbot"
      description="Learn how to create a conversational AI chatbot using AI Corner's API"
      difficulty="Intermediate"
      readTime="30 min"
      lastUpdated="2024-01-15"
    >
      <div className="prose prose-invert max-w-none">
        {/* Introduction */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-bold text-white m-0">Build Your First AI Chatbot</h2>
            </div>
            <p className="text-gray-300 m-0">
              In this tutorial, you'll learn how to create a fully functional chatbot using AI Corner's 
              Chat Completions API. We'll cover both frontend and backend implementations.
            </p>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            What You'll Learn
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Setting up the chat interface
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Managing conversation history
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Handling API responses
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Error handling and recovery
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Adding typing indicators
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Backend integration patterns
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Prerequisites</h2>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                Basic knowledge of HTML, CSS, and JavaScript
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                An AI Corner API key (get one <a href="/signup" className="text-purple-400 hover:text-purple-300">here</a>)
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                A text editor and web browser
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                Optional: Python/Flask for backend examples
              </li>
            </ul>
          </div>
        </div>

        {/* Step 1: HTML Structure */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Step 1: Create the HTML Structure</h2>
          
          <p className="text-gray-300 mb-4">
            First, let's create the basic HTML structure for our chatbot interface:
          </p>
          
          <div className="relative">
            <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm max-h-96">
              <code className="text-gray-300">{htmlStructure}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-3 right-3 border-slate-600 text-gray-300 hover:bg-slate-700"
              onClick={() => copyToClipboard(htmlStructure, 'html')}
            >
              {copiedCode === 'html' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Step 2: JavaScript Implementation */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Step 2: JavaScript Implementation</h2>
          
          <p className="text-gray-300 mb-4">
            Now let's create the JavaScript code that handles the chat functionality:
          </p>
          
          <div className="relative">
            <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm max-h-96">
              <code className="text-gray-300">{javascriptCode}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-3 right-3 border-slate-600 text-gray-300 hover:bg-slate-700"
              onClick={() => copyToClipboard(javascriptCode, 'javascript')}
            >
              {copiedCode === 'javascript' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Key Features Explained</h2>
          
          <div className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                  Conversation Memory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  The chatbot maintains conversation history by storing all messages in an array. 
                  This allows the AI to understand context and provide relevant responses.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Typing Indicator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  A typing indicator shows users that the AI is processing their message, 
                  improving the user experience during API response delays.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-400" />
                  Error Handling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  Robust error handling ensures the chatbot gracefully handles API failures 
                  and provides helpful feedback to users.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Backend Implementation */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Optional: Backend Implementation (Python/Flask)</h2>
          
          <p className="text-gray-300 mb-4">
            For production applications, you'll want to handle API calls on the backend to keep your API key secure:
          </p>
          
          <div className="relative">
            <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm max-h-96">
              <code className="text-gray-300">{pythonFlaskCode}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-3 right-3 border-slate-600 text-gray-300 hover:bg-slate-700"
              onClick={() => copyToClipboard(pythonFlaskCode, 'python-flask')}
            >
              {copiedCode === 'python-flask' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Testing Your Chatbot */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Testing Your Chatbot</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">1. Replace API Key</h3>
              <p className="text-blue-200 text-sm">
                Replace <code className="bg-slate-800 px-2 py-1 rounded">YOUR_API_KEY_HERE</code> with your actual AI Corner API key.
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-300 mb-2">2. Open in Browser</h3>
              <p className="text-green-200 text-sm">
                Save the HTML file and open it in your web browser. You should see the chat interface.
              </p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">3. Start Chatting</h3>
              <p className="text-purple-200 text-sm">
                Type a message and press Enter or click Send. The AI should respond within a few seconds.
              </p>
            </div>
          </div>
        </div>

        {/* Enhancements */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Possible Enhancements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">UI/UX Improvements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Message timestamps</li>
                  <li>• User avatars</li>
                  <li>• Dark/light theme toggle</li>
                  <li>• Message reactions</li>
                  <li>• File upload support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Advanced Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Conversation persistence</li>
                  <li>• Multiple chat sessions</li>
                  <li>• Custom system prompts</li>
                  <li>• Response streaming</li>
                  <li>• Analytics tracking</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            Next Steps
          </h3>
          <p className="text-gray-300 mb-4">
            Congratulations! You've built a working AI chatbot. Here are some next steps to continue your journey:
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Play className="w-4 h-4 mr-2" />
              Try Advanced Features
            </Button>
            <Button variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-500/10">
              Explore More Tutorials
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
