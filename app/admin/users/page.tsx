"use client";

import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus, UserPlus, Shield, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminUsersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">User Management</h1>
            <p className="text-gray-400 mt-2">Manage user accounts and permissions</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-slate-800/50 border-gray-700">
            <CardContent className="p-12 text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-xl w-fit mx-auto mb-6">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">User Management Coming Soon</h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                We're working on a comprehensive user management system that will allow you to:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-700/50 rounded-lg p-6">
                  <UserPlus className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-2">User Registration</h4>
                  <p className="text-gray-400 text-sm">Manage user sign-ups and account creation</p>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-6">
                  <Shield className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-2">Role Management</h4>
                  <p className="text-gray-400 text-sm">Assign roles and permissions to users</p>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-6">
                  <Settings className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-2">Account Settings</h4>
                  <p className="text-gray-400 text-sm">Configure user preferences and settings</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
                <h4 className="text-white font-semibold mb-2">Current Status</h4>
                <p className="text-gray-300 text-sm">
                  The user management system is currently in development. For now, you can manage basic admin access 
                  through the authentication system. Full user management features will be available in the next update.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
