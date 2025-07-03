import Link from "next/link"
import { Play, Headphones, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-indigo-600" />
          <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ZEN
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Healing frequencies and binaural beats for meditation, focus, and relaxation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <Headphones className="w-8 h-8 text-indigo-600 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Binaural Beats</h3>
            <p className="text-gray-600 text-sm">
              Experience focus and relaxation through carefully crafted frequency differences
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <Play className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Healing Tones</h3>
            <p className="text-gray-600 text-sm">Pure sine waves at therapeutic frequencies for deep meditation</p>
          </div>
        </div>

        <Link
          href="/mood"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <Play className="w-5 h-5" />
          Start Your Journey
        </Link>

        <p className="text-sm text-gray-500 mt-6">🎧 Best experienced with headphones</p>
      </div>
    </div>
  )
}
