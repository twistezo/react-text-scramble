import type { ScrambleTexts } from '@twistezo/react-text-scramble'

import TextScramble from '@twistezo/react-text-scramble'
import { useState } from 'react'
import { createRoot } from 'react-dom/client'

import '../styles.css'

const texts: ScrambleTexts = [
  'Hello World',
  'React Text Scramble',
  'TypeScript + Bun',
  'Lightweight & Fast',
]

function App() {
  const [paused, setPaused] = useState(false)
  const [speed, setSpeed] = useState<'fast' | 'normal' | 'slow'>('normal')

  const speedConfig = {
    fast: { letterSpeed: 10, nextLetterSpeed: 10, pauseTime: 500 },
    normal: { letterSpeed: 10, nextLetterSpeed: 100, pauseTime: 500 },
    slow: { letterSpeed: 10, nextLetterSpeed: 1000, pauseTime: 500 },
  }

  const config = speedConfig[speed]

  return (
    <div className='container'>
      <h1>React Text Scramble</h1>

      <TextScramble
        className='scramble-effect'
        letterSpeed={config.letterSpeed}
        nextLetterSpeed={config.nextLetterSpeed}
        paused={paused}
        pauseTime={config.pauseTime}
        texts={texts}
      />

      <div className='controls'>
        <button className={paused ? '' : 'active'} onClick={() => setPaused(false)}>
          Play
        </button>
        <button className={paused ? 'active' : ''} onClick={() => setPaused(true)}>
          Pause
        </button>
      </div>

      <div className='controls'>
        <button className={speed === 'slow' ? 'active' : ''} onClick={() => setSpeed('slow')}>
          Slow
        </button>
        <button className={speed === 'normal' ? 'active' : ''} onClick={() => setSpeed('normal')}>
          Normal
        </button>
        <button className={speed === 'fast' ? 'active' : ''} onClick={() => setSpeed('fast')}>
          Fast
        </button>
      </div>
    </div>
  )
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
