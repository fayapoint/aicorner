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
  AlertCircle,
  Info,
  Play
} from "lucide-react";
import { useState } from "react";

export default function ChatCompletionsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const requestExample = `POST https://api.aicorner.com/v1/chat/completions

{
  "model": "gpt-4",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant."
    },
    {
      "role": "user", 
      "content": "What is artificial intelligence?"
    }
  ],
  "max_tokens": 150,
  "temperature": 0.7,
  "top_p": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0,
  "stream": false
}`;

  const responseExample = `{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "gpt-4",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Artificial intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. It encompasses various technologies including machine learning, natural language processing, and computer vision."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 20,
    "completion_tokens": 45,
    "total_tokens": 65
  }
}`;

  const curlExample = `curl -X POST "https://api.aicorner.com/v1/chat/completions" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4",
    "messages": [
      {
        "role": "user",
        "content": "Hello, how are you?"
      }
    ],
    "max_tokens": 100
  }'`;

  const pythonExample = `import requests

headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

data = {
    "model": "gpt-4",
    "messages": [
        {"role": "user", "content": "Hello, how are you?"}
    ],
    "max_tokens": 100
}

response = requests.post(
    "https://api.aicorner.com/v1/chat/completions",
    headers=headers,
    json=data
)

result = response.json()
print(result["choices"][0]["message"]["content"])`;

  const parameters = [
    {
      name: "model",
      type: "string",
      required: true,
      description: "ID of the model to use. See available models in the models endpoint.",
      example: '"gpt-4"'
    },
    {
      name: "messages",
      type: "array",
      required: true,
      description: "A list of messages comprising the conversation so far.",
      example: '[{"role": "user", "content": "Hello!"}]'
    },
    {
      name: "max_tokens",
      type: "integer",
      required: false,
      description: "The maximum number of tokens to generate in the chat completion.",
      example: "150"
    },
    {
      name: "temperature",
      type: "number",
      required: false,
      description: "Controls randomness. Higher values make output more random (0-2).",
      example: "0.7"
    },
    {
      name: "top_p",
      type: "number",
      required: false,
      description: "Controls diversity via nucleus sampling (0-1).",
      example: "1"
    },
    {
      name: "stream",
      type: "boolean",
      required: false,
      description: "If set, partial message deltas will be sent as server-sent events.",
      example: "false"
    },
    {
      name: "frequency_penalty",
      type: "number",
      required: false,
      description: "Penalizes new tokens based on their frequency in the text so far (-2 to 2).",
      example: "0"
    },
    {
      name: "presence_penalty",
      type: "number",
      required: false,
      description: "Penalizes new tokens based on whether they appear in the text so far (-2 to 2).",
      example: "0"
    }
  ];

  return (
    <DocsLayout
      currentPath="/docs/api/chat-completions"
      title="Chat Completions"
      description="Create conversational AI experiences with the chat completions endpoint"
      difficulty="Intermediate"
      readTime="15 min"
      lastUpdated="2024-01-15"
    >
      <div className="prose prose-invert max-w-none">
        {/* Introduction */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white m-0">Chat Completions API</h2>
            </div>
            <p className="text-gray-300 m-0">
              The chat completions endpoint is the most versatile way to interact with AI Corner's language models. 
              It supports both single-turn and multi-turn conversations with system prompts, user messages, and assistant responses.
            </p>
          </div>
        </div>

        {/* Endpoint */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Endpoint</h2>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">POST</Badge>
              <code className="text-purple-300 font-mono text-lg">
                https://api.aicorner.com/v1/chat/completions
              </code>
            </div>
          </div>
        </div>

        {/* Request Parameters */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Request Parameters</h2>
          
          <div className="space-y-4">
            {parameters.map((param, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <code className="text-purple-300 font-mono font-semibold">
                        {param.name}
                      </code>
                      <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                        {param.type}
                      </Badge>
                      {param.required && (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                          required
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{param.description}</p>
                  <div className="bg-slate-900 border border-slate-700 rounded p-2">
                    <code className="text-green-300 text-xs">Example: {param.example}</code>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Message Roles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Message Roles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  system
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  Sets the behavior and context for the assistant. Usually the first message.
                </p>
                <div className="bg-slate-900 border border-slate-700 rounded p-2 mt-3">
                  <code className="text-blue-300 text-xs">
                    "You are a helpful assistant."
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  user
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  Messages from the user or human in the conversation.
                </p>
                <div className="bg-slate-900 border border-slate-700 rounded p-2 mt-3">
                  <code className="text-green-300 text-xs">
                    "What is machine learning?"
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  Previous responses from the AI assistant in the conversation.
                </p>
                <div className="bg-slate-900 border border-slate-700 rounded p-2 mt-3">
                  <code className="text-purple-300 text-xs">
                    "Machine learning is..."
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Request Example */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Request Example</h2>
          
          <div className="relative">
            <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{requestExample}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-3 right-3 border-slate-600 text-gray-300 hover:bg-slate-700"
              onClick={() => copyToClipboard(requestExample, 'request')}
            >
              {copiedCode === 'request' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Response Example */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Response Example</h2>
          
          <div className="relative">
            <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{responseExample}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-3 right-3 border-slate-600 text-gray-300 hover:bg-slate-700"
              onClick={() => copyToClipboard(responseExample, 'response')}
            >
              {copiedCode === 'response' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Code className="w-6 h-6 text-green-400" />
            Code Examples
          </h2>
          
          {/* cURL */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">cURL</h3>
            <div className="relative">
              <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{curlExample}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-3 right-3 border-slate-600 text-gray-300 hover:bg-slate-700"
                onClick={() => copyToClipboard(curlExample, 'curl')}
              >
                {copiedCode === 'curl' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Python */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Python</h3>
            <div className="relative">
              <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{pythonExample}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-3 right-3 border-slate-600 text-gray-300 hover:bg-slate-700"
                onClick={() => copyToClipboard(pythonExample, 'python')}
              >
                {copiedCode === 'python' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Best Practices</h2>
          
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-semibold text-green-300">System Messages</span>
              </div>
              <p className="text-green-200 text-sm">
                Use system messages to set the assistant's behavior, personality, and context. 
                This helps ensure consistent responses throughout the conversation.
              </p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Info className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-blue-300">Token Management</span>
              </div>
              <p className="text-blue-200 text-sm">
                Monitor your token usage with the max_tokens parameter. Each model has different 
                context limits, so plan your conversations accordingly.
              </p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold text-yellow-300">Temperature Control</span>
              </div>
              <p className="text-yellow-200 text-sm">
                Use lower temperatures (0.1-0.3) for factual, consistent responses. 
                Use higher temperatures (0.7-1.0) for creative, varied outputs.
              </p>
            </div>
          </div>
        </div>

        {/* Error Handling */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Common Errors</h2>
          
          <div className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">400</Badge>
                  Bad Request
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-2">
                  Invalid request format or missing required parameters.
                </p>
                <div className="bg-slate-900 border border-slate-700 rounded p-2">
                  <code className="text-red-300 text-xs">
                    {"{"}"error": {"{"}"message": "Missing required parameter: messages"{"}"}{"}"}
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">401</Badge>
                  Unauthorized
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-2">
                  Invalid or missing API key in the Authorization header.
                </p>
                <div className="bg-slate-900 border border-slate-700 rounded p-2">
                  <code className="text-red-300 text-xs">
                    {"{"}"error": {"{"}"message": "Invalid API key provided"{"}"}{"}"}
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">429</Badge>
                  Rate Limited
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-2">
                  Too many requests sent in a given amount of time.
                </p>
                <div className="bg-slate-900 border border-slate-700 rounded p-2">
                  <code className="text-red-300 text-xs">
                    {"{"}"error": {"{"}"message": "Rate limit exceeded"{"}"}{"}"}
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Try It Out */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Play className="w-5 h-5" />
            Try It Out
          </h3>
          <p className="text-gray-300 mb-4">
            Ready to test the chat completions endpoint? Use our interactive API explorer 
            to experiment with different parameters and see real responses.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Play className="w-4 h-4 mr-2" />
              Open API Explorer
            </Button>
            <Button variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-500/10">
              View More Examples
            </Button>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
