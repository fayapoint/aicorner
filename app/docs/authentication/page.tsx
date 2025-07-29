"use client";

import { DocsLayout } from "@/components/docs-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, 
  CheckCircle, 
  ArrowRight, 
  Key, 
  Shield, 
  AlertTriangle,
  Eye,
  EyeOff,
  RefreshCw,
  Trash2,
  Plus,
  Settings
} from "lucide-react";
import { useState } from "react";

export default function AuthenticationPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    headers: `Authorization: Bearer sk-aicorner-1234567890abcdef...`,
    
    curl: `curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     https://api.aicorner.com/v1/models`,
    
    python: `import os
import requests

# Load API key from environment variable
api_key = os.getenv('AICORNER_API_KEY')

headers = {
    'Authorization': f'Bearer {api_key}',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.aicorner.com/v1/models',
    headers=headers
)`,

    javascript: `// Using environment variables
const apiKey = process.env.AICORNER_API_KEY;

const headers = {
  'Authorization': \`Bearer \${apiKey}\`,
  'Content-Type': 'application/json'
};

const response = await fetch('https://api.aicorner.com/v1/models', {
  headers: headers
});`,

    env: `# .env file
AICORNER_API_KEY=sk-aicorner-1234567890abcdef...

# Never commit this file to version control!
# Add .env to your .gitignore file`
  };

  return (
    <DocsLayout
      currentPath="/docs/authentication"
      title="Authentication Setup"
      description="Learn how to securely authenticate with the AI Corner API"
      difficulty="Beginner"
      readTime="3 min"
      lastUpdated="2024-01-15"
    >
      <div className="prose prose-invert max-w-none">
        {/* Introduction */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white m-0">Secure API Authentication</h2>
            </div>
            <p className="text-gray-300 m-0">
              AI Corner uses API keys for authentication. This guide covers everything you need to know 
              about creating, managing, and using API keys securely.
            </p>
          </div>
        </div>

        {/* API Key Format */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Key className="w-6 h-6 text-purple-400" />
            API Key Format
          </h2>
          
          <p className="text-gray-300 mb-4">
            AI Corner API keys follow this format:
          </p>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <code className="text-purple-300 font-mono">
                {showApiKey ? 'sk-aicorner-1234567890abcdef...' : 'sk-aicorner-••••••••••••••••••••'}
              </code>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowApiKey(!showApiKey)}
                className="text-gray-400 hover:text-white"
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><strong>sk-aicorner-</strong> - Prefix identifying AI Corner secret keys</li>
              <li><strong>64 characters</strong> - Random alphanumeric string</li>
              <li><strong>Case sensitive</strong> - Must be used exactly as provided</li>
            </ul>
          </div>
        </div>

        {/* Creating API Keys */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Creating API Keys</h2>
          
          <div className="space-y-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-green-400" />
                Step-by-Step Guide
              </h3>
              
              <ol className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                  <div>
                    <strong>Access Your Dashboard</strong>
                    <p className="text-sm text-gray-400 mt-1">
                      Log in to your AI Corner account and navigate to the API Keys section
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                  <div>
                    <strong>Create New Key</strong>
                    <p className="text-sm text-gray-400 mt-1">
                      Click "Create New API Key" and provide a descriptive name
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                  <div>
                    <strong>Set Permissions</strong>
                    <p className="text-sm text-gray-400 mt-1">
                      Choose the appropriate permissions for your use case
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                  <div>
                    <strong>Copy and Store</strong>
                    <p className="text-sm text-gray-400 mt-1">
                      Copy your API key immediately - you won't be able to see it again!
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="font-semibold text-red-300">Important</span>
              </div>
              <p className="text-red-200 text-sm">
                API keys are only shown once during creation. Make sure to copy and store them securely 
                before closing the creation dialog.
              </p>
            </div>
          </div>
        </div>

        {/* Using API Keys */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Using API Keys</h2>
          
          <p className="text-gray-300 mb-6">
            Include your API key in the Authorization header of every request:
          </p>

          {/* Header Format */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Header Format</h3>
            <div className="relative">
              <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{codeExamples.headers}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-3 right-3 border-slate-600 text-gray-300 hover:bg-slate-700"
                onClick={() => copyToClipboard(codeExamples.headers, 'headers')}
              >
                {copiedCode === 'headers' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* cURL Example */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">cURL Example</h3>
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
            <h3 className="text-lg font-semibold text-white mb-3">Python Example</h3>
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
            <h3 className="text-lg font-semibold text-white mb-3">JavaScript Example</h3>
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

        {/* Security Best Practices */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Shield className="w-6 h-6 text-green-400" />
            Security Best Practices
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">✅ Do</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Store keys in environment variables</li>
                  <li>• Use different keys for different environments</li>
                  <li>• Rotate keys regularly</li>
                  <li>• Monitor key usage</li>
                  <li>• Delete unused keys</li>
                  <li>• Use least-privilege permissions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">❌ Don't</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Commit keys to version control</li>
                  <li>• Share keys in chat or email</li>
                  <li>• Hardcode keys in your application</li>
                  <li>• Use production keys for testing</li>
                  <li>• Leave keys in browser storage</li>
                  <li>• Use overly broad permissions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Environment Variables */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Environment Variables</h2>
          
          <p className="text-gray-300 mb-4">
            The recommended way to store API keys is using environment variables:
          </p>
          
          <div className="relative mb-4">
            <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{codeExamples.env}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-3 right-3 border-slate-600 text-gray-300 hover:bg-slate-700"
              onClick={() => copyToClipboard(codeExamples.env, 'env')}
            >
              {copiedCode === 'env' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-blue-200 text-sm">
              <strong>Pro Tip:</strong> Most deployment platforms (Vercel, Netlify, Heroku) 
              provide secure ways to set environment variables in production.
            </p>
          </div>
        </div>

        {/* Key Management */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Settings className="w-6 h-6 text-blue-400" />
            Key Management
          </h2>
          
          <div className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-green-400" />
                  Rotating Keys
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Regularly rotate your API keys for enhanced security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-gray-300 text-sm">
                  <li>1. Create a new API key</li>
                  <li>2. Update your applications with the new key</li>
                  <li>3. Test that everything works correctly</li>
                  <li>4. Delete the old key</li>
                </ol>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Trash2 className="w-5 h-5 text-red-400" />
                  Revoking Keys
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Immediately revoke compromised or unused keys
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-3">
                  If you suspect a key has been compromised, revoke it immediately from your dashboard. 
                  This will instantly prevent any further use of that key.
                </p>
                <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
                  <p className="text-red-200 text-xs">
                    ⚠️ Revoking a key will immediately break any applications using it
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-3">Next Steps</h3>
          <p className="text-gray-300 mb-4">
            Now that you understand authentication, you're ready to make your first API call!
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Make Your First API Call
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-500/10">
              View API Reference
            </Button>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
