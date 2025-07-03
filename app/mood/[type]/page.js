import FrequencyController from "@/components/FrequencyController"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MoodPlayerPage({ params }) {
  const { type } = params

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link
            href="/mood"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Moods
          </Link>
        </div>

        <FrequencyController moodType={type} />
      </div>
    </div>
  )
}
