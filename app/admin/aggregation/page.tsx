'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AggregationResult {
  platform: string;
  success: boolean;
  count: number;
  error?: string;
  timestamp: Date;
}

interface AggregationLog {
  date: Date;
  results: AggregationResult[];
  totalItems: number;
  successCount: number;
  failureCount: number;
}

interface SchedulerStatus {
  isRunning: boolean;
  lastRun: Date | null;
  nextRun: string;
  totalRuns: number;
  averageItemsPerRun: number;
}

export default function AggregationPage() {
  const [status, setStatus] = useState<SchedulerStatus | null>(null);
  const [logs, setLogs] = useState<AggregationLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRunningAggregation, setIsRunningAggregation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/aggregation?action=status');
      const data = await response.json();
      if (data.success) {
        setStatus(data.data);
      }
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/aggregation?action=logs');
      const data = await response.json();
      if (data.success) {
        setLogs(data.data);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const triggerManualAggregation = async () => {
    setIsRunningAggregation(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('adminToken') || 'mock-jwt-token-for-local-development';
      
      const response = await fetch('/api/aggregation', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Refresh data after successful aggregation
        await Promise.all([fetchStatus(), fetchLogs()]);
      } else {
        setError(data.error || 'Failed to run aggregation');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsRunningAggregation(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchStatus(), fetchLogs()]);
      setIsLoading(false);
    };
    
    loadData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(() => {
      fetchStatus();
      if (!isRunningAggregation) {
        fetchLogs();
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [isRunningAggregation]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Content Aggregation
          </h1>
          <button
            onClick={triggerManualAggregation}
            disabled={isRunningAggregation || status?.isRunning}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            {isRunningAggregation || status?.isRunning ? 'Running...' : 'Run Manual Aggregation'}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Status Cards */}
        {status && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold mb-2">Status</h3>
              <p className={`text-2xl font-bold ${status.isRunning ? 'text-green-400' : 'text-gray-400'}`}>
                {status.isRunning ? 'Running' : 'Idle'}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold mb-2">Total Runs</h3>
              <p className="text-2xl font-bold text-blue-400">{status.totalRuns}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold mb-2">Avg Items/Run</h3>
              <p className="text-2xl font-bold text-purple-400">{status.averageItemsPerRun}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold mb-2">Next Run</h3>
              <p className="text-sm text-gray-300">{status.nextRun}</p>
            </div>
          </div>
        )}

        {/* Last Run Details */}
        {status?.lastRun && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">Last Run</h3>
            <p className="text-gray-300 mb-4">
              {new Date(status.lastRun).toLocaleString()}
            </p>
          </div>
        )}

        {/* Recent Logs */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-semibold mb-4">Recent Aggregation Logs</h3>
          
          {logs.length === 0 ? (
            <p className="text-gray-400">No aggregation logs available</p>
          ) : (
            <div className="space-y-4">
              {logs.slice(-5).reverse().map((log, index) => (
                <div key={index} className="border border-white/10 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-300">
                      {new Date(log.date).toLocaleString()}
                    </span>
                    <div className="flex space-x-4 text-sm">
                      <span className="text-green-400">✓ {log.successCount}</span>
                      <span className="text-red-400">✗ {log.failureCount}</span>
                      <span className="text-blue-400">📊 {log.totalItems} items</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {log.results.map((result, resultIndex) => (
                      <div
                        key={resultIndex}
                        className={`p-3 rounded border ${
                          result.success 
                            ? 'border-green-500/30 bg-green-500/10' 
                            : 'border-red-500/30 bg-red-500/10'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{result.platform}</span>
                          <span className={result.success ? 'text-green-400' : 'text-red-400'}>
                            {result.success ? '✓' : '✗'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">
                          {result.success ? `${result.count} items` : result.error}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Configuration Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-semibold mb-4">Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Daily Targets:</h4>
              <ul className="space-y-1 text-gray-300">
                <li>• 3 YouTube AI videos</li>
                <li>• 3 Instagram posts (planned)</li>
                <li>• 3 TikTok videos (planned)</li>
                <li>• 3 Google News articles</li>
                <li>• 6 RSS news articles</li>
                <li>• 5 Google AI blog posts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Schedule:</h4>
              <ul className="space-y-1 text-gray-300">
                <li>• Daily at 6:00 AM EST</li>
                <li>• Manual trigger available</li>
                <li>• Duplicate detection enabled</li>
                <li>• Quality filtering active</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
