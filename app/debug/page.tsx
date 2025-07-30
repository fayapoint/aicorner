"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function DebugPage() {
  const [results, setResults] = useState<any[]>([]);

  const testEndpoint = async (url: string, method: string = 'GET') => {
    try {
      const response = await fetch(url, { method });
      const data = await response.json();
      setResults(prev => [...prev, {
        url,
        method,
        status: response.status,
        data,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      setResults(prev => [...prev, {
        url,
        method,
        status: 'ERROR',
        data: { error: error.message },
        timestamp: new Date().toISOString()
      }]);
    }
  };

  const clearResults = () => setResults([]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Debug Page</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Button onClick={() => testEndpoint('/api/test-db')} className="bg-blue-600">
            Test DB Connection
          </Button>
          <Button onClick={() => testEndpoint('/api/videos?limit=2')} className="bg-green-600">
            Test Videos API
          </Button>
          <Button onClick={() => testEndpoint('/api/news?limit=2')} className="bg-purple-600">
            Test News API
          </Button>
          <Button onClick={() => testEndpoint('/api/health')} className="bg-yellow-600">
            Test Health
          </Button>
          <Button onClick={clearResults} variant="outline">
            Clear Results
          </Button>
        </div>

        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="bg-slate-800 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-sm">{result.method} {result.url}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  result.status === 200 ? 'bg-green-600' : 
                  result.status === 'ERROR' ? 'bg-red-600' : 'bg-yellow-600'
                }`}>
                  {result.status}
                </span>
              </div>
              <pre className="text-xs overflow-auto bg-slate-900 p-2 rounded">
                {JSON.stringify(result.data, null, 2)}
              </pre>
              <div className="text-xs text-gray-400 mt-2">
                {result.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
