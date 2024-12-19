// src/components/WeatherWhiz/Header.js

import React from 'react';
import { CONSTANTS } from './types';

/**
 * @param {Object} props
 * @param {number} props.currentLevel
 * @param {number} props.score
 */
const Header = ({ currentLevel, score }) => {
  const ProgressDots = () => {
    return (
      <div className="flex gap-2 items-center">
        {[...Array(CONSTANTS.MAX_LEVEL)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < currentLevel ? 'bg-[#FF6B6B]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">☔️ Weather Whiz</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm">Level {currentLevel}</span>
            <ProgressDots />
          </div>
          <div className="h-1 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-[#FF6B6B] rounded-full transition-all duration-300"
              style={{ width: `${(score / CONSTANTS.MAX_SCORE_PER_LEVEL) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;