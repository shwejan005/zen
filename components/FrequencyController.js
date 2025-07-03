"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react"
import { startTone, stopTone, startBinauralBeats } from "@/lib/audioEngine"
import moodFrequencies from "@/lib/moodMap"

export default function FrequencyController({ moodType }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.2)
  const [frequency, setFrequency] = useState(432)
  const [leftFreq, setLeftFreq] = useState(210)
  const [rightFreq, setRightFreq] = useState(200)
  const [isMuted, setIsMuted] = useState(false)

  const moodConfig = moodFrequencies[moodType]
  const isBinaural = moodConfig?.left && moodConfig?.right
  const isCustom = moodType === "custom"

  useEffect(() => {
    if (moodConfig && !isCustom) {
      if (isBinaural) {
        setLeftFreq(moodConfig.left)
        setRightFreq(moodConfig.right)
      } else {
        setFrequency(moodConfig.freq)
      }
    }
  }, [moodType, moodConfig, isBinaural, isCustom])

  useEffect(() => {
    return () => {
      stopTone()
    }
  }, [])

  const handlePlayPause = () => {
    if (isPlaying) {
      stopTone()
      setIsPlaying(false)
    } else {
      if (isBinaural) {
        startBinauralBeats(leftFreq, rightFreq, volume)
      } else {
        startTone(frequency, moodConfig?.waveform || "sine", volume)
      }
      setIsPlaying(true)
    }
  }

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume)
    if (isPlaying) {
      // Restart with new volume
      stopTone()
      setTimeout(() => {
        if (isBinaural) {
          startBinauralBeats(leftFreq, rightFreq, newVolume)
        } else {
          startTone(frequency, moodConfig?.waveform || "sine", newVolume)
        }
      }, 50)
    }
  }

  const handleFrequencyChange = (newFreq) => {
    setFrequency(newFreq)
    if (isPlaying && !isBinaural) {
      stopTone()
      setTimeout(() => {
        startTone(newFreq, moodConfig?.waveform || "sine", volume)
      }, 50)
    }
  }

  const handleBinauralChange = (left, right) => {
    setLeftFreq(left)
    setRightFreq(right)
    if (isPlaying && isBinaural) {
      stopTone()
      setTimeout(() => {
        startBinauralBeats(left, right, volume)
      }, 50)
    }
  }

  const resetToDefault = () => {
    if (moodConfig && !isCustom) {
      if (isBinaural) {
        setLeftFreq(moodConfig.left)
        setRightFreq(moodConfig.right)
      } else {
        setFrequency(moodConfig.freq)
      }
    }
  }

  const getMoodTitle = () => {
    const titles = {
      calm: "Calm & Peaceful",
      focus: "Focus & Concentration",
      sleep: "Deep Sleep",
      happy: "Joy & Happiness",
      anxious: "Release & Healing",
      custom: "Custom Frequency",
    }
    return titles[moodType] || "Frequency Player"
  }

  const getMoodDescription = () => {
    const descriptions = {
      calm: "Let the 432 Hz frequency wash over you, bringing deep relaxation and inner peace.",
      focus: "Binaural beats to enhance concentration and mental clarity.",
      sleep: "Delta wave frequencies to guide you into restful sleep.",
      happy: "The 639 Hz love frequency to elevate your mood and heal emotions.",
      anxious: "The 396 Hz liberation frequency to release fear and negative energy.",
      custom: "Create your own healing frequency experience.",
    }
    return descriptions[moodType] || ""
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">{getMoodTitle()}</h1>
        <p className="text-gray-600">{getMoodDescription()}</p>
      </div>

      {/* Play/Pause Button */}
      <div className="text-center mb-8">
        <motion.button
          onClick={handlePlayPause}
          className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl shadow-lg transition-all duration-200 ${
            isPlaying
              ? "bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-red-200"
              : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-indigo-200"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </motion.button>
      </div>

      {/* Frequency Controls */}
      <div className="space-y-6">
        {isBinaural ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Left Ear: {leftFreq} Hz</label>
              <input
                type="range"
                min="20"
                max="1000"
                value={leftFreq}
                onChange={(e) => handleBinauralChange(Number.parseInt(e.target.value), rightFreq)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                disabled={!isCustom}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Right Ear: {rightFreq} Hz</label>
              <input
                type="range"
                min="20"
                max="1000"
                value={rightFreq}
                onChange={(e) => handleBinauralChange(leftFreq, Number.parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                disabled={!isCustom}
              />
            </div>
            <div className="text-center text-sm text-gray-600">Beat Frequency: {Math.abs(leftFreq - rightFreq)} Hz</div>
          </>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Frequency: {frequency} Hz</label>
            <input
              type="range"
              min="20"
              max="2000"
              value={frequency}
              onChange={(e) => handleFrequencyChange(Number.parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              disabled={!isCustom}
            />
          </div>
        )}

        {/* Volume Control */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              Volume: {Math.round(volume * 100)}%
            </div>
          </label>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={volume}
            onChange={(e) => handleVolumeChange(Number.parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Reset Button */}
        {!isCustom && (
          <div className="text-center">
            <button
              onClick={resetToDefault}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Default
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-xl">
        <p className="text-sm text-blue-800 text-center">
          🎧 For the best experience, use headphones and find a quiet space
        </p>
      </div>
    </div>
  )
}
