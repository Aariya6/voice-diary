import React, { useState } from 'react';
import { Key, Volume2, Download, AlertCircle, ExternalLink } from 'lucide-react';
import { AppSettings } from '../types';

interface SettingsProps {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onSettingsChange }) => {
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);

  const handleSaveSettings = () => {
    onSettingsChange(tempSettings);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Settings
        </h2>

        {/* General Settings */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              General
            </h3>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  Auto-generate Poetry
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatically create poetic reflections for new entries
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={tempSettings.autoGeneratePoetry}
                  onChange={(e) =>
                    setTempSettings({
                      ...tempSettings,
                      autoGeneratePoetry: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lavender-300 dark:peer-focus:ring-lavender-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-lavender-500"></div>
              </label>
            </div>
          </div>

          {/* API Configuration */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              AI Integration
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      To enable AI-generated poetry and voice synthesis, you'll need API keys from OpenAI and ElevenLabs.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowApiKeys(!showApiKeys)}
                className="flex items-center gap-2 px-4 py-2 bg-lavender-500 text-white rounded-lg hover:bg-lavender-600 transition-colors"
              >
                <Key className="w-4 h-4" />
                {showApiKeys ? 'Hide' : 'Configure'} API Keys
              </button>

              {showApiKeys && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      OpenAI API Key
                      <a
                        href="https://platform.openai.com/api-keys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex items-center gap-1 text-lavender-600 hover:text-lavender-700"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Get Key
                      </a>
                    </label>
                    <input
                      type="password"
                      placeholder="sk-..."
                      value={tempSettings.openaiApiKey || ''}
                      onChange={(e) =>
                        setTempSettings({
                          ...tempSettings,
                          openaiApiKey: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lavender-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ElevenLabs API Key
                      <a
                        href="https://elevenlabs.io/app/settings/api-keys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex items-center gap-1 text-lavender-600 hover:text-lavender-700"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Get Key
                      </a>
                    </label>
                    <input
                      type="password"
                      placeholder="11labs-..."
                      value={tempSettings.elevenlabsApiKey || ''}
                      onChange={(e) =>
                        setTempSettings({
                          ...tempSettings,
                          elevenlabsApiKey: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lavender-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Export Options */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Export & Backup
            </h3>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 transition-colors">
              <Download className="w-4 h-4" />
              Export All Memories
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Download your memories as a ZIP file with audio and Memory Blooms
            </p>
          </div>

          {/* Save Button */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSaveSettings}
              className="w-full px-6 py-3 bg-gradient-to-r from-lavender-500 to-mint-500 text-white rounded-lg font-medium hover:from-lavender-600 hover:to-mint-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;