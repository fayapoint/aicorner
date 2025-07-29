"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings as SettingsIcon, 
  Globe, 
  Mail, 
  Shield, 
  Database,
  Save,
  Upload,
  Trash2,
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [siteSettings, setSiteSettings] = useState({
    siteName: "AI Corner",
    siteDescription: "Your AI Safe Haven - Comprehensive AI solutions for everyone",
    siteUrl: "https://aicorner.com",
    contactEmail: "admin@aicorner.com",
    maintenanceMode: false,
    allowRegistration: true,
    enableComments: true,
    enableNewsletter: true
  });

  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "AInSeconds - AI Solutions in Seconds",
    metaDescription: "Discover comprehensive AI solutions, tools, and resources for beginners to experts. Get AI solutions implemented in seconds.",
    metaKeywords: "AI, artificial intelligence, machine learning, AI tools, AI solutions, AInSeconds",
    googleAnalyticsId: "",
    facebookPixelId: "",
    enableSitemap: true,
    enableRobotsTxt: true
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    fromEmail: "noreply@ainseconds.com",
    fromName: "AInSeconds",
    enableEmailNotifications: true
  });

  const handleSave = async (settingsType: string, settings: any) => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Saving ${settingsType}:`, settings);
      alert(`${settingsType} settings saved successfully!`);
    } catch (error) {
      console.error(`Error saving ${settingsType} settings:`, error);
      alert(`Failed to save ${settingsType} settings`);
    } finally {
      setSaving(false);
    }
  };

  const handleClearCache = async () => {
    try {
      // Simulate cache clearing
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Cache cleared successfully!");
    } catch (error) {
      console.error("Error clearing cache:", error);
      alert("Failed to clear cache");
    }
  };

  const handleBackupDatabase = async () => {
    try {
      // Simulate database backup
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Database backup created successfully!");
    } catch (error) {
      console.error("Error creating backup:", error);
      alert("Failed to create database backup");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-gray-400 mt-2">Manage your site configuration and preferences</p>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-slate-800 border-gray-700">
            <TabsTrigger value="general" className="data-[state=active]:bg-purple-600">
              <Globe className="w-4 h-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-purple-600">
              <SettingsIcon className="w-4 h-4 mr-2" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="email" className="data-[state=active]:bg-purple-600">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-purple-600">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="data-[state=active]:bg-purple-600">
              <Database className="w-4 h-4 mr-2" />
              Maintenance
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-slate-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">General Settings</CardTitle>
                  <CardDescription className="text-gray-400">
                    Basic site configuration and information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="siteName" className="text-white">Site Name</Label>
                      <Input
                        id="siteName"
                        value={siteSettings.siteName}
                        onChange={(e) => setSiteSettings(prev => ({ ...prev, siteName: e.target.value }))}
                        className="bg-slate-700/50 border-gray-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteUrl" className="text-white">Site URL</Label>
                      <Input
                        id="siteUrl"
                        value={siteSettings.siteUrl}
                        onChange={(e) => setSiteSettings(prev => ({ ...prev, siteUrl: e.target.value }))}
                        className="bg-slate-700/50 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="siteDescription" className="text-white">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      value={siteSettings.siteDescription}
                      onChange={(e) => setSiteSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                      className="bg-slate-700/50 border-gray-600 text-white"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="text-white">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={siteSettings.contactEmail}
                      onChange={(e) => setSiteSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                      className="bg-slate-700/50 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Site Features</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Allow User Registration</Label>
                          <p className="text-sm text-gray-400">Enable new users to register accounts</p>
                        </div>
                        <Switch
                          checked={siteSettings.allowRegistration}
                          onCheckedChange={(checked) => setSiteSettings(prev => ({ ...prev, allowRegistration: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Enable Comments</Label>
                          <p className="text-sm text-gray-400">Allow comments on articles and videos</p>
                        </div>
                        <Switch
                          checked={siteSettings.enableComments}
                          onCheckedChange={(checked) => setSiteSettings(prev => ({ ...prev, enableComments: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Enable Newsletter</Label>
                          <p className="text-sm text-gray-400">Allow users to subscribe to newsletter</p>
                        </div>
                        <Switch
                          checked={siteSettings.enableNewsletter}
                          onCheckedChange={(checked) => setSiteSettings(prev => ({ ...prev, enableNewsletter: checked }))}
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleSave("General", siteSettings)}
                    disabled={saving}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save General Settings
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* SEO Settings */}
          <TabsContent value="seo">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-slate-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">SEO Settings</CardTitle>
                  <CardDescription className="text-gray-400">
                    Search engine optimization and analytics configuration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle" className="text-white">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      value={seoSettings.metaTitle}
                      onChange={(e) => setSeoSettings(prev => ({ ...prev, metaTitle: e.target.value }))}
                      className="bg-slate-700/50 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metaDescription" className="text-white">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      value={seoSettings.metaDescription}
                      onChange={(e) => setSeoSettings(prev => ({ ...prev, metaDescription: e.target.value }))}
                      className="bg-slate-700/50 border-gray-600 text-white"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metaKeywords" className="text-white">Meta Keywords</Label>
                    <Input
                      id="metaKeywords"
                      value={seoSettings.metaKeywords}
                      onChange={(e) => setSeoSettings(prev => ({ ...prev, metaKeywords: e.target.value }))}
                      className="bg-slate-700/50 border-gray-600 text-white"
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="googleAnalyticsId" className="text-white">Google Analytics ID</Label>
                      <Input
                        id="googleAnalyticsId"
                        value={seoSettings.googleAnalyticsId}
                        onChange={(e) => setSeoSettings(prev => ({ ...prev, googleAnalyticsId: e.target.value }))}
                        className="bg-slate-700/50 border-gray-600 text-white"
                        placeholder="GA-XXXXXXXXX-X"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facebookPixelId" className="text-white">Facebook Pixel ID</Label>
                      <Input
                        id="facebookPixelId"
                        value={seoSettings.facebookPixelId}
                        onChange={(e) => setSeoSettings(prev => ({ ...prev, facebookPixelId: e.target.value }))}
                        className="bg-slate-700/50 border-gray-600 text-white"
                        placeholder="123456789012345"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">SEO Features</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Enable Sitemap</Label>
                          <p className="text-sm text-gray-400">Generate XML sitemap for search engines</p>
                        </div>
                        <Switch
                          checked={seoSettings.enableSitemap}
                          onCheckedChange={(checked) => setSeoSettings(prev => ({ ...prev, enableSitemap: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Enable Robots.txt</Label>
                          <p className="text-sm text-gray-400">Generate robots.txt file for crawlers</p>
                        </div>
                        <Switch
                          checked={seoSettings.enableRobotsTxt}
                          onCheckedChange={(checked) => setSeoSettings(prev => ({ ...prev, enableRobotsTxt: checked }))}
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleSave("SEO", seoSettings)}
                    disabled={saving}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save SEO Settings
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Maintenance */}
          <TabsContent value="maintenance">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Cache Management</CardTitle>
                    <CardDescription className="text-gray-400">
                      Clear cached data to improve performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={handleClearCache}
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Clear Cache
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Database Backup</CardTitle>
                    <CardDescription className="text-gray-400">
                      Create a backup of your database
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={handleBackupDatabase}
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Database className="w-4 h-4 mr-2" />
                      Create Backup
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
