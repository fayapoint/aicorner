"use client";

import { DocsLayout } from "@/components/docs-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, 
  CheckCircle, 
  ArrowRight, 
  Zap, 
  Key, 
  Code, 
  Terminal,
  ExternalLink,
  AlertCircle,
  Lightbulb
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function QuickStartPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    curl: `curl -X POST "https://api.ainseconds.com/v1/chat/completions" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4",
    "messages": [
      {
        "role": "user",
        "content": "Hello, AInSeconds!"
      }
    ],
    "max_tokens": 100
  }'`,
    
    python: `import requests

# Set up your API key
api_key = "YOUR_API_KEY"
headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

# Make your first API call
response = requests.post(
    "https://api.ainseconds.com/v1/chat/completions",
    headers=headers,
    json={
        "model": "gpt-4",
        "messages": [
            {"role": "user", "content": "Hello, AInSeconds!"}
        ],
        "max_tokens": 100
    }
)

result = response.json()
print(result["choices"][0]["message"]["content"])`,

    javascript: `const apiKey = 'YOUR_API_KEY';

const response = await fetch('https://api.ainseconds.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [
      { role: 'user', content: 'Hello, AInSeconds!' }
    ],
    max_tokens: 100
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);`
  };

  return (
    <DocsLayout
      currentPath="/docs/quick-start"
      title="Quick Start Guide"
      description="Get up and running with AInSeconds API in under 5 minutes"
      difficulty="Beginner"
      readTime="5 min"
      lastUpdated="2024-01-15"
    >
      <div className="prose prose-invert max-w-none">
        {/* Introduction */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-bold text-white m-0">Welcome to AInSeconds!</h2>
            </div>
            <p className="text-gray-300 m-0">
              This guide will help you make your first API call in just a few minutes.
              By the end, you'll have successfully generated AI-powered content using our platform.
            </p>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            Prerequisites
          </h2>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                An AInSeconds account (sign up for free at <Link href="/trial" className="text-purple-400 hover:text-purple-300">ainseconds.com</Link>)
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                Basic knowledge of HTTP requests or programming
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                A terminal, code editor, or API testing tool
              </li>
            </ul>
          </div>
        </div>

        {/* Step 1: Get API Key */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Key className="w-6 h-6 text-blue-400" />
            Step 1: Get Your API Key
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">
              First, you'll need to obtain your API key from the AInSeconds dashboard:
            </p>
            
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <ol className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                  <span>Log in to your <Link href="/login" className="text-purple-400 hover:text-purple-300">AI Corner dashboard</Link></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                  <span>Navigate to the "API Keys" section in your account settings</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                  <span>Click "Create New API Key" and give it a descriptive name</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                  <span>Copy your API key and store it securely</span>
                </li>
              </ol>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold text-yellow-300">Important Security Note</span>
              </div>
              <p className="text-yellow-200 text-sm">
                Keep your API key secret! Never share it publicly or commit it to version control. 
                Use environment variables to store it securely in your applications.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Make Your First API Call */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Code className="w-6 h-6 text-purple-400" />
            Step 2: Make Your First API Call
          </h2>
          
          <p className="text-gray-300 mb-6">
            Now let's make your first API call! Choose your preferred method below:
          </p>

          {/* cURL Example */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Using cURL (Command Line)
            </h3>
            <div className="relative">
              <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{codeExamples.curl}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-3 right-3 border-slate-600 text-gray-300 hover:bg-slate-700"
                onClick={() => copyToClipboard(codeExamples.curl, 'curl')}
              >
                {copiedCode === 'curl' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Python Example */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-3">Python</h3>
            <div className="relative">
              <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{codeExamples.python}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-3 right-3 border-slate-600 text-gray-300 hover:bg-slate-700"
                onClick={() => copyToClipboard(codeExamples.python, 'python')}
              >
                {copiedCode === 'python' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* JavaScript Example */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-3">JavaScript</h3>
            <div className="relative">
              <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{codeExamples.javascript}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-3 right-3 border-slate-600 text-gray-300 hover:bg-slate-700"
                onClick={() => copyToClipboard(codeExamples.javascript, 'javascript')}
              >
                {copiedCode === 'javascript' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Expected Response */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Expected Response</h2>
          <p className="text-gray-300 mb-4">
            If your request is successful, you should receive a response like this:
          </p>
          
          <div className="relative">
            <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "gpt-4",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! I'm AInSeconds, your AI assistant. How can I help you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 16,
    "total_tokens": 28
  }
}`}</code>
            </pre>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            Next Steps
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-400" />
                  Explore the API
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Learn about all available endpoints and parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  View API Reference
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-green-400" />
                  Try SDKs
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Use our official libraries for easier integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  Browse SDKs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-3">Need Help?</h3>
          <p className="text-gray-300 mb-4">
            If you're having trouble with your first API call, we're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-500/10">
              Contact Support
            </Button>
            <Button variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-500/10">
              Join Community
            </Button>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
