import React from 'react';
import { Play, Clock, Video } from 'lucide-react';
import type { VideoContent } from '../../types';

interface VideoCardProps {
  video: VideoContent;
  onPlay?: (video: VideoContent) => void;
}

export default function VideoCard({ video, onPlay }: VideoCardProps) {
  return (
    <div
      className="card-base p-0 overflow-hidden group cursor-pointer transition-all duration-300 hover:border-safety/50 hover:shadow-[0_0_20px_rgba(240,200,0,0.15)]"
      onClick={() => onPlay?.(video)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPlay?.(video);
        }
      }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-mine-900 flex items-center justify-center overflow-hidden">
        {video.videoUrl ? (
          <video
            src={video.videoUrl}
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
            muted
            playsInline
          />
        ) : (
          <div className="absolute inset-0 bg-mine-800 animate-shimmer" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-mine-950/90 via-mine-950/40 to-transparent z-10" />

        {/* Video Availability Badge */}
        {video.videoUrl ? (
          <span className="absolute top-3 left-3 z-20 bg-safety/90 text-mine-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
            <Video className="w-3 h-3" /> Full Video
          </span>
        ) : null}

        {/* Play Button Icon */}
        <div className="w-14 h-14 rounded-full bg-safety/90 text-mine-950 flex items-center justify-center z-20 shadow-lg group-hover:scale-110 group-hover:bg-safety transition-transform duration-300">
          <Play className="w-6 h-6 ml-0.5 fill-current" />
        </div>

        {/* Duration Badge */}
        <span className="absolute bottom-3 right-3 z-20 bg-mine-950/80 backdrop-blur-sm text-xs text-mine-200 px-2 py-1 rounded-md flex items-center gap-1 border border-mine-700/50">
          <Clock className="w-3 h-3 text-safety" /> {video.duration}
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-safety font-semibold uppercase tracking-wider">{video.category}</span>
          {video.videoUrl && (
            <span className="text-[11px] text-mine-400 font-mono">1080p HD</span>
          )}
        </div>
        <h3 className="text-base font-bold mt-1.5 mb-2 group-hover:text-safety transition-colors line-clamp-1">
          {video.title}
        </h3>
        <p className="text-sm text-mine-400 line-clamp-2">{video.description}</p>
      </div>
    </div>
  );
}
