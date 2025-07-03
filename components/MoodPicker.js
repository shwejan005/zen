"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Moon, Shield, Settings, Waves, Focus, Smile } from "lucide-react"

const moods = [
  {
    id: "calm",
    name: "Calm",
    description: "432 Hz - Deep relaxation and peace",
    icon: Waves,
    color: "from-blue-400 to-cyan-400",
    bgColor: "bg-blue-50 hover:bg-blue-100",
  },
  {
    id: "focus",
    name: "Focus",
    description: "Binaural beats for concentration",
    icon: Focus,
    color: "from-green-400 to-emerald-400",
    bgColor: "bg-green-50 hover:bg-green-100",
  },
  {
    id: "sleep",
    name: "Sleep",
    description: "Delta waves for deep rest",
    icon: Moon,
    color: "from-indigo-400 to-purple-400",
    bgColor: "bg-indigo-50 hover:bg-indigo-100",
  },
  {
    id: "happy",
    name: "Happy",
    description: "639 Hz - Joy and emotional healing",
    icon: Smile,
    color: "from-yellow-400 to-orange-400",
    bgColor: "bg-yellow-50 hover:bg-yellow-100",
  },
  {
    id: "anxious",
    name: "Release",
    description: "396 Hz - Release fear and anxiety",
    icon: Shield,
    color: "from-purple-400 to-pink-400",
    bgColor: "bg-purple-50 hover:bg-purple-100",
  },
  {
    id: "custom",
    name: "Custom",
    description: "Create your own frequency experience",
    icon: Settings,
    color: "from-gray-400 to-slate-400",
    bgColor: "bg-gray-50 hover:bg-gray-100",
  },
]

export default function MoodPicker() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {moods.map((mood, index) => {
        const IconComponent = mood.icon

        return (
          <motion.div
            key={mood.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/mood/${mood.id}`}>
              <div
                className={`${mood.bgColor} rounded-2xl p-6 border border-white/20 backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer`}
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${mood.color} flex items-center justify-center mb-4`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">{mood.name}</h3>

                <p className="text-gray-600 text-sm">{mood.description}</p>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
