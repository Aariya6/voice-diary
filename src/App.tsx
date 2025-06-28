import React, { useState, useRef } from 'react';
import Navigation from './components/Navigation';
import AudioRecorder from './components/AudioRecorder';
import Timeline from './components/Timeline';
import Settings from './components/Settings';
import { VoiceEntry, EmotionType, AppSettings } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDarkMode } from './hooks/useDarkMode';
import { generateBloomPattern } from './utils/bloomGenerator';
import { generatePoeticReflection } from './utils/aiService';

function App() {
  const [activeView, setActiveView] = useState<'record' | 'timeline' | 'settings'>('record');
  const [entries, setEntries] = useLocalStorage<VoiceEntry[]>('voiceEntries', []);
  const [settings, setSettings] = useLocalStorage<AppSettings>('appSettings', {
    darkMode: false,
    autoGeneratePoetry: true,
  });
  const [darkMode, setDarkMode] = useDarkMode();
  const [playingEntryId, setPlayingEntryId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSaveEntry = async (
    audioBlob: Blob,
    emotion: EmotionType,
    theme: string,
    duration: number
  ) => {
    const id = Date.now().toString();
    const audioUrl = URL.createObjectURL(audioBlob);
    const bloomPattern = generateBloomPattern(emotion, duration);

    let poeticReflection = '';
    if (settings.autoGeneratePoetry && settings.openaiApiKey) {
      try {
        poeticReflection = await generatePoeticReflection(emotion, theme, settings.openaiApiKey);
      } catch (error) {
        console.error('Failed to generate poetry:', error);
      }
    }

    const newEntry: VoiceEntry = {
      id,
      audioBlob,
      audioUrl,
      emotion,
      theme,
      timestamp: new Date(),
      duration,
      poeticReflection,
      bloomPattern,
    };

    setEntries(prev => [...prev, newEntry]);
    setActiveView('timeline');
  };

  const handlePlayEntry = (entry: VoiceEntry) => {
    if (playingEntryId === entry.id) {
      // Pause current audio
      if (audioRef.current) {
        audioRef.current.pause();
        setPlayingEntryId(null);
      }
    } else {
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
      }

      // Play new audio
      audioRef.current = new Audio(entry.audioUrl);
      audioRef.current.onended = () => setPlayingEntryId(null);
      audioRef.current.play();
      setPlayingEntryId(entry.id);
    }
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    setSettings(prev => ({ ...prev, darkMode: !darkMode }));
  };

  const handleSettingsChange = (newSettings: AppSettings) => {
    setSettings(newSettings);
    if (newSettings.darkMode !== darkMode) {
      setDarkMode(newSettings.darkMode);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-mint-50 to-peach-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Navigation
        activeView={activeView}
        onViewChange={setActiveView}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      <main className="container mx-auto px-4 py-8">
        {activeView === 'record' && (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-lavender-600 to-mint-600 bg-clip-text text-transparent mb-4">
                Welcome to Your Voice Journal
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Capture your thoughts, feelings, and memories. Watch them bloom into beautiful visualizations
                with AI-generated poetry that reflects your emotional journey.
              </p>
            </div>
            <AudioRecorder onSave={handleSaveEntry} />
          </div>
        )}

        {activeView === 'timeline' && (
          <Timeline
            entries={entries}
            onPlayEntry={handlePlayEntry}
            playingEntryId={playingEntryId}
          />
        )}

        {activeView === 'settings' && (
          <Settings
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-lavender-500 to-mint-500 rounded-md"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Built with ❤️ using{' '}
                <a
                  href="https://bolt.new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lavender-600 hover:text-lavender-700 font-medium"
                >
                  Bolt.new
                </a>
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Your memories are stored locally and never leave your device
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;