"use client";

import { DocsLayout } from "@/components/docs-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, 
  CheckCircle, 
  Terminal, 
  Code, 
  Download,
  ExternalLink,
  Zap,
  Settings,
  AlertCircle
} from "lucide-react";
import { useState } from "react";

export default function PythonSDKPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const installationCode = `pip install aicorner`;

  const quickStartCode = `from aicorner import AICorner

# Initialize the client
client = AICorner(api_key="your-api-key-here")

# Create a chat completion
response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "user", "content": "Hello, AI Corner!"}
    ]
)

print(response.choices[0].message.content)`;

  const asyncCode = `import asyncio
from aicorner import AsyncAICorner

async def main():
    client = AsyncAICorner(api_key="your-api-key-here")
    
    response = await client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "user", "content": "Hello, async world!"}
        ]
    )
    
    print(response.choices[0].message.content)
    await client.close()

asyncio.run(main())`;

  const streamingCode = `from aicorner import AICorner

client = AICorner(api_key="your-api-key-here")

# Stream the response
stream = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "user", "content": "Tell me a story"}
    ],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end="")`;

  const errorHandlingCode = `from aicorner import AICorner
from aicorner.exceptions import (
    APIError,
    RateLimitError,
    AuthenticationError,
    InvalidRequestError
)

client = AICorner(api_key="your-api-key-here")

try:
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "user", "content": "Hello!"}
        ]
    )
    print(response.choices[0].message.content)
    
except AuthenticationError:
    print("Invalid API key")
except RateLimitError:
    print("Rate limit exceeded")
except InvalidRequestError as e:
    print(f"Invalid request: {e}")
except APIError as e:
    print(f"API error: {e}")`;

  const configurationCode = `from aicorner import AICorner

# Method 1: Pass API key directly
client = AICorner(api_key="your-api-key-here")

# Method 2: Use environment variable
# Set AICORNER_API_KEY in your environment
client = AICorner()

# Method 3: Custom configuration
client = AICorner(
    api_key="your-api-key-here",
    base_url="https://api.aicorner.com/v1",
    timeout=30.0,
    max_retries=3
)`;

  return (
    <DocsLayout
      currentPath="/docs/sdks/python"
      title="Python SDK"
      description="Official Python library for the AI Corner API"
      difficulty="Intermediate"
      readTime="20 min"
      lastUpdated="2024-01-15"
    >
      <div className="prose prose-invert max-w-none">
        {/* Introduction */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Terminal className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white m-0">AI Corner Python SDK</h2>
            </div>
            <p className="text-gray-300 m-0">
              The official Python library for the AI Corner API provides a convenient way to access 
              our AI models from your Python applications with full type safety and async support.
            </p>
          </div>
        </div>

        {/* Installation */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Download className="w-6 h-6 text-green-400" />
            Installation
          </h2>
          
          <p className="text-gray-300 mb-4">
            Install the AI Corner Python SDK using pip:
          </p>
          
          <div className="relative">
            <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{installationCode}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-3 right-3 border-slate-600 text-gray-300 hover:bg-slate-700"
              onClick={() => copyToClipboard(installationCode, 'install')}
            >
              {copiedCode === 'install' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-4">
            <p className="text-blue-200 text-sm">
              <strong>Requirements:</strong> Python 3.7+ is required. The SDK is compatible with 
              Python 3.7, 3.8, 3.9, 3.10, and 3.11.
            </p>
          </div>
        </div>

        {/* Quick Start */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Zap className="w-6 h-6 text-yellow-400" />
            Quick Start
          </h2>
          
          <p className="text-gray-300 mb-4">
            Here's a simple example to get you started:
          </p>
          
          <div className="relative">
            <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{quickStartCode}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-3 right-3 border-slate-600 text-gray-300 hover:bg-slate-700"
              onClick={() => copyToClipboard(quickStartCode, 'quickstart')}
            >
              {copiedCode === 'quickstart' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Configuration */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Settings className="w-6 h-6 text-purple-400" />
            Configuration
          </h2>
          
          <p className="text-gray-300 mb-4">
            The SDK can be configured in several ways:
          </p>
          
          <div className="relative">
            <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{configurationCode}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-3 right-3 border-slate-600 text-gray-300 hover:bg-slate-700"
              onClick={() => copyToClipboard(configurationCode, 'config')}
            >
              {copiedCode === 'config' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold text-yellow-300">Environment Variables</span>
            </div>
            <p className="text-yellow-200 text-sm">
              For security, it's recommended to set your API key as an environment variable 
              <code className="bg-slate-800 px-2 py-1 rounded mx-1">AICORNER_API_KEY</code> 
              rather than hardcoding it in your source code.
            </p>
          </div>
        </div>

        {/* Async Support */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Async Support</h2>
          
          <p className="text-gray-300 mb-4">
            The SDK provides full async/await support for non-blocking operations:
          </p>
          
          <div className="relative">
            <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{asyncCode}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-3 right-3 border-slate-600 text-gray-300 hover:bg-slate-700"
              onClick={() => copyToClipboard(asyncCode, 'async')}
            >
              {copiedCode === 'async' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Streaming */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Streaming Responses</h2>
          
          <p className="text-gray-300 mb-4">
            Stream responses in real-time for better user experience:
          </p>
          
          <div className="relative">
            <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{streamingCode}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-3 right-3 border-slate-600 text-gray-300 hover:bg-slate-700"
              onClick={() => copyToClipboard(streamingCode, 'streaming')}
            >
              {copiedCode === 'streaming' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Error Handling */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Error Handling</h2>
          
          <p className="text-gray-300 mb-4">
            The SDK provides specific exception types for different error conditions:
          </p>
          
          <div className="relative">
            <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{errorHandlingCode}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-3 right-3 border-slate-600 text-gray-300 hover:bg-slate-700"
              onClick={() => copyToClipboard(errorHandlingCode, 'errors')}
            >
              {copiedCode === 'errors' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Available Methods */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Available Methods</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Chat Completions</CardTitle>
                <CardDescription className="text-gray-300">
                  Create conversational AI responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <code className="text-purple-300 text-sm">
                  client.chat.completions.create()
                </code>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Text Generation</CardTitle>
                <CardDescription className="text-gray-300">
                  Generate text completions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <code className="text-purple-300 text-sm">
                  client.completions.create()
                </code>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Image Generation</CardTitle>
                <CardDescription className="text-gray-300">
                  Create images from text prompts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <code className="text-purple-300 text-sm">
                  client.images.generate()
                </code>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Models</CardTitle>
                <CardDescription className="text-gray-300">
                  List available models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <code className="text-purple-300 text-sm">
                  client.models.list()
                </code>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Type Safety */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Type Safety</h2>
          
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold text-green-300 m-0">Full Type Annotations</h3>
            </div>
            <p className="text-green-200 text-sm mb-4">
              The SDK includes comprehensive type annotations for better IDE support and fewer runtime errors.
            </p>
            <ul className="space-y-1 text-green-200 text-sm">
              <li>• IntelliSense and autocomplete support</li>
              <li>• Type checking with mypy</li>
              <li>• Runtime type validation</li>
              <li>• Comprehensive docstrings</li>
            </ul>
          </div>
        </div>

        {/* Resources */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Additional Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-400" />
                  GitHub
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-3">
                  View source code, report issues, and contribute
                </p>
                <Button variant="outline" size="sm" className="border-slate-600 text-gray-300 hover:bg-slate-700">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on GitHub
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-green-400" />
                  PyPI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-3">
                  Package information and version history
                </p>
                <Button variant="outline" size="sm" className="border-slate-600 text-gray-300 hover:bg-slate-700">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on PyPI
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-400" />
                  Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-3">
                  Complete code examples and tutorials
                </p>
                <Button variant="outline" size="sm" className="border-slate-600 text-gray-300 hover:bg-slate-700">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Examples
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-3">Next Steps</h3>
          <p className="text-gray-300 mb-4">
            Now that you have the Python SDK installed, explore our tutorials and examples to build amazing AI applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Code className="w-4 h-4 mr-2" />
              View API Reference
            </Button>
            <Button variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-500/10">
              Browse Tutorials
            </Button>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
