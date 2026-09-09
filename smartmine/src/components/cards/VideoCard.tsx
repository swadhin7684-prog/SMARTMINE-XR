import React from 'react';
import { Play, Clock } from 'lucide-react';
import type { VideoContent } from '../../types';

interface VideoCardProps {
  video: VideoContent;
  onPlay?: (video: VideoContent) => void;
}

export default function VideoCard({ video, onPlay }: VideoCardProps) {
  return (
    <div className="card-base p-0 overflow-hidden group cursor-pointer" onClick={() => onPlay?.(video)}>
      {/* Thumbnail */}
      <div className="relative aspect-video bg-mine-700 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-mine-900/80 to-transparent z-10" />
        <div className="w-14 h-14 rounded-full bg-safety/90 flex items-center justify-center z-20 group-hover:scale-110 group-hover:bg-safety transition-transform duration-300">
          <Play className="w-6 h-6 text-mine-950 ml-0.5" />
        </div>
        <div className="absolute inset-0 bg-mine-700 animate-shimmer" />
        <span className="absolute bottom-3 right-3 z-20 bg-mine-950/80 text-xs text-mine-200 px-2 py-1 rounded-md flex items-center gap-1">
          <Clock className="w-3 h-3" /> {video.duration}
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <span className="text-xs text-safety font-semibold uppercase tracking-wider">{video.category}</span>
        <h3 className="text-base font-bold mt-1.5 mb-2 group-hover:text-safety transition-colors">{video.title}</h3>
        <p className="text-sm text-mine-400 line-clamp-2">{video.description}</p>
      </div>
    </div>
  );
}
