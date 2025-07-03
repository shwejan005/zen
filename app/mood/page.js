import MoodPicker from "@/components/MoodPicker"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MoodPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Mood</h1>
            <p className="text-gray-600 text-lg">Select a frequency experience tailored to your current state</p>
          </div>
        </div>

        <MoodPicker />
      </div>
    </div>
  )
}
