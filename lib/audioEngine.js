let audioCtx
let oscillator
let gainNode
let leftOscillator
let rightOscillator
let leftGain
let rightGain
let merger

export function startTone(freq = 528, waveform = "sine", volume = 0.2) {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }

  stopTone()

  oscillator = audioCtx.createOscillator()
  gainNode = audioCtx.createGain()

  oscillator.type = waveform
  oscillator.frequency.value = freq

  oscillator.connect(gainNode)
  gainNode.connect(audioCtx.destination)

  gainNode.gain.value = volume
  oscillator.start()
}

export function startBinauralBeats(leftFreq = 210, rightFreq = 200, volume = 0.2) {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }

  stopTone()

  // Create stereo merger
  merger = audioCtx.createChannelMerger(2)

  // Left channel
  leftOscillator = audioCtx.createOscillator()
  leftGain = audioCtx.createGain()
  leftOscillator.type = "sine"
  leftOscillator.frequency.value = leftFreq
  leftOscillator.connect(leftGain)
  leftGain.connect(merger, 0, 0) // Connect to left channel
  leftGain.gain.value = volume

  // Right channel
  rightOscillator = audioCtx.createOscillator()
  rightGain = audioCtx.createGain()
  rightOscillator.type = "sine"
  rightOscillator.frequency.value = rightFreq
  rightOscillator.connect(rightGain)
  rightGain.connect(merger, 0, 1) // Connect to right channel
  rightGain.gain.value = volume

  // Connect merger to destination
  merger.connect(audioCtx.destination)

  // Start both oscillators
  leftOscillator.start()
  rightOscillator.start()
}

export function stopTone() {
  if (oscillator) {
    oscillator.stop()
    oscillator = null
    gainNode = null
  }

  if (leftOscillator) {
    leftOscillator.stop()
    leftOscillator = null
    leftGain = null
  }

  if (rightOscillator) {
    rightOscillator.stop()
    rightOscillator = null
    rightGain = null
  }

  if (merger) {
    merger = null
  }
}

export function updateVolume(volume) {
  if (gainNode) {
    gainNode.gain.value = volume
  }

  if (leftGain && rightGain) {
    leftGain.gain.value = volume
    rightGain.gain.value = volume
  }
}
