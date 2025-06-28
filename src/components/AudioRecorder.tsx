import React, { useState } from 'react';
import { Mic, Square, Play, Pause, Save, RotateCcw } from 'lucide-react';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { EmotionType } from '../types';

interface AudioRecorderProps {
  onSave: (audioBlob: Blob, emotion: EmotionType, theme: string, duration: number) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onSave }) => {
  const {
    isRecording,
    audioUrl,
    duration,
    startRecording,
    stopRecording,
    playRecording,
    pauseRecording,
    isPlaying,
    audioBlob,
  } = useAudioRecorder();

  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>('calm');
  const [theme, setTheme] = useState('');

  const emotions: { value: EmotionType; label: string; color: string }[] = [
    { value: 'calm', label: 'Calm', color: 'bg-lavender-300' },
    { value: 'happy', label: 'Happy', color: 'bg-peach-300' },
    { value: 'sad', label: 'Sad', color: 'bg-blue-300' },
    { value: 'angry', label: 'Angry', color: 'bg-rose-300' },
    { value: 'excited', label: 'Excited', color: 'bg-yellow-300' },
    { value: 'peaceful', label: 'Peaceful', color: 'bg-mint-300' },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSave = () => {
    if (audioBlob && theme.trim()) {
      onSave(audioBlob, selectedEmotion, theme.trim(), duration);
      // Reset form
      setTheme('');
      setSelectedEmotion('calm');
    }
  };

  const handleReset = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setTheme('');
    setSelectedEmotion('calm');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Record Your Echo
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Capture a moment, create a memory
        </p>
      </div>

      {/* Recording Controls */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="w-20 h-20 bg-gradient-to-r from-lavender-400 to-lavender-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              disabled={audioUrl !== null}
            >
              <Mic className="w-8 h-8 text-white" />
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="w-20 h-20 bg-gradient-to-r from-rose-400 to-rose-600 rounded-full flex items-center justify-center shadow-lg animate-pulse"
            >
              <Square className="w-8 h-8 text-white" />
            </button>
          )}
          
          {isRecording && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </div>
      </div>

      {/* Duration Display */}
      {(isRecording || audioUrl) && (
        <div className="text-center mb-6">
          <div className="text-3xl font-mono text-gray-800 dark:text-white">
            {formatTime(duration)}
          </div>
        </div>
      )}

      {/* Playback Controls */}
      {audioUrl && (
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={isPlaying ? pauseRecording : playRecording}
            className="flex items-center gap-2 px-4 py-2 bg-mint-400 hover:bg-mint-500 text-white rounded-lg transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      )}

      {/* Emotion Selection */}
      {audioUrl && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            How are you feeling?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {emotions.map((emotion) => (
              <button
                key={emotion.value}
                onClick={() => setSelectedEmotion(emotion.value)}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  selectedEmotion === emotion.value
                    ? `${emotion.color} text-gray-800 scale-105 shadow-md`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {emotion.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Theme Input */}
      {audioUrl && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            What's this about?
          </label>
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="Love, work, dreams, family..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lavender-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      )}

      {/* Save Button */}
      {audioUrl && (
        <button
          onClick={handleSave}
          disabled={!theme.trim()}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-lavender-500 to-mint-500 text-white rounded-lg font-medium hover:from-lavender-600 hover:to-mint-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Save className="w-5 h-5" />
          Save Memory
        </button>
      )}
    </div>
  );
};

export default AudioRecorder;