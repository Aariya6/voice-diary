import React, { useState } from 'react';
import { Play, Pause, Calendar, Heart, Sparkles } from 'lucide-react';
import { VoiceEntry } from '../types';
import MemoryBloom from './MemoryBloom';

interface TimelineProps {
  entries: VoiceEntry[];
  onPlayEntry: (entry: VoiceEntry) => void;
  playingEntryId: string | null;
}

const Timeline: React.FC<TimelineProps> = ({ entries, onPlayEntry, playingEntryId }) => {
  const [selectedEmotion, setSelectedEmotion] = useState<string>('all');

  const emotions = ['all', 'calm', 'happy', 'sad', 'angry', 'excited', 'peaceful'];

  const filteredEntries = selectedEmotion === 'all' 
    ? entries 
    : entries.filter(entry => entry.emotion === selectedEmotion);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <Sparkles className="w-6 h-6 text-lavender-500" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Your Memory Garden
          </h2>
        </div>

        {/* Emotion Filter */}
        <div className="flex gap-2 flex-wrap">
          {emotions.map((emotion) => (
            <button
              key={emotion}
              onClick={() => setSelectedEmotion(emotion)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                selectedEmotion === emotion
                  ? 'bg-lavender-500 text-white shadow-md'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">
            No memories yet
          </h3>
          <p className="text-gray-500 dark:text-gray-500">
            Start recording to create your first Memory Bloom
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredEntries
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .map((entry) => (
              <div
                key={entry.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  {/* Memory Bloom */}
                  <div className="flex-shrink-0">
                    <MemoryBloom
                      emotion={entry.emotion}
                      intensity={entry.bloomPattern.intensity}
                      size={100}
                      animate={playingEntryId === entry.id}
                    />
                  </div>

                  {/* Entry Details */}
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
                          {entry.emotion} • {entry.theme}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(new Date(entry.timestamp))}
                          <span>•</span>
                          <span>{formatDuration(entry.duration)}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onPlayEntry(entry)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-lavender-400 to-mint-400 text-white rounded-lg hover:from-lavender-500 hover:to-mint-500 transition-all transform hover:scale-105 shadow-md"
                      >
                        {playingEntryId === entry.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                        {playingEntryId === entry.id ? 'Pause' : 'Play'}
                      </button>
                    </div>

                    {/* Poetic Reflection */}
                    {entry.poeticReflection && (
                      <div className="bg-gradient-to-r from-lavender-50 to-mint-50 dark:from-gray-700 dark:to-gray-700 rounded-lg p-4">
                        <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                          "{entry.poeticReflection}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Timeline;