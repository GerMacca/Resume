import { useState, useRef, useCallback, useEffect } from 'react'
import './Lab.css'
import noneNina from '../../assets/none_Nina.png'
import leftNina from '../../assets/left_Nina.png'
import rightNina from '../../assets/right_Nina.png'

const PANGRAM = 'Três pratos de trigo para três tigres tristes comendo trigo!'
const CHAR_COLORS = [
  '#46c284', '#ffa94d', '#ffd43b', '#69db7c', '#4dabf7', '#cc5de8',
  '#f783ac', '#a9e34b', '#74c0fc', '#e599f7', '#63e6be', '#3e138f',
  '#ffc078', '#ffe066', '#8ce99a', '#da77f2', '#f9a8d4', '#66d9e8',
]

function NinaInput() {
  const [nina, setNina] = useState(noneNina)
  const [inputValue, setInputValue] = useState('')
  const [hasError, setHasError] = useState(false)
  const [charColorMap, setCharColorMap] = useState<Record<string, string>>({})
  const colorIndexRef = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value

    setInputValue(val)

    const options = [leftNina, rightNina]
    setNina(options[Math.floor(Math.random() * options.length)])
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setNina(noneNina), 600)

    // Find first mismatch
    let errorAt = -1
    for (let i = 0; i < val.length; i++) {
      if (val[i] !== PANGRAM[i]) { errorAt = i; break }
    }

    const error = errorAt !== -1
    setHasError(error)

    // Only assign colors when correct
    if (!error) {
      setCharColorMap(prev => {
        const next = { ...prev }
        for (let i = 0; i < val.length; i++) {
          const ch = PANGRAM[i].toLowerCase()
          if (!next[ch] && ch.trim()) {
            next[ch] = CHAR_COLORS[colorIndexRef.current % CHAR_COLORS.length]
            colorIndexRef.current++
          }
        }
        return next
      })
    }
  }

  return (
    <div className="nina-widget-v2">
      <div className="nina-input-wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p className="nina-pangram">
            {PANGRAM.split('').map((ch, i) => {
              const typed = i < inputValue.length
              if (typed && hasError) return <span key={i} style={{ color: '#ff4d4d' }}>{ch}</span>
              const color = typed ? charColorMap[PANGRAM[i].toLowerCase()] : undefined
              return <span key={i} style={color ? { color } : undefined}>{ch}</span>
            })}
          </p>
          <img src={nina} alt="Nina" className="nina-peek" />
        </div>
        <input
          className={`nina-type-input${hasError ? ' nina-error' : ''}`}
          placeholder="Start typing here..."
          onChange={handleChange}
          value={inputValue}
        />
      </div>
    </div>
  )
}

type Particle = { id: number; x: number; y: number; color: string; permanent: boolean }

const COLORS = ['#ffffff', '#e9e9e9', '#dadada', '#d1d1d1', '#cfcfcf', '#c5c5c5', '#c2c2c2']

function CursorTrail({ onClear }: { onClear: (fn: () => void) => void }) {
  const [particles, setParticles] = useState<Particle[]>([])
  const counterRef = useRef(0)
  const mouseDownRef = useRef(false)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    onClear(() => setParticles(prev => prev.filter(p => !p.permanent)))
  }, [onClear])

  const addParticle = useCallback((clientX: number, clientY: number) => {
    const rect = boxRef.current!.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    const id = counterRef.current++
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    const permanent = mouseDownRef.current

    setParticles(prev => {
      const next = [...prev, { id, x, y, color, permanent }]
      if (permanent) return next
      const tempIds = next.filter(p => !p.permanent).map(p => p.id)
      const toRemove = new Set(tempIds.slice(0, Math.max(0, tempIds.length - 60)))
      return toRemove.size ? next.filter(p => !toRemove.has(p.id)) : next
    })
    if (!permanent) {
      setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 2000)
    }
  }, [])

  useEffect(() => {
    const el = boxRef.current!
    const onTouchStart = (e: TouchEvent) => { e.preventDefault(); mouseDownRef.current = true; addParticle(e.touches[0].clientX, e.touches[0].clientY) }
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); addParticle(e.touches[0].clientX, e.touches[0].clientY) }
    const onTouchEnd = () => { mouseDownRef.current = false }
    el.addEventListener('touchstart', onTouchStart, { passive: false })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [addParticle])

  return (
    <div
      className="trail-box"
      ref={boxRef}
      onMouseMove={e => addParticle(e.clientX, e.clientY)}
      onMouseDown={() => { mouseDownRef.current = true }}
      onMouseUp={() => { mouseDownRef.current = false }}
      onMouseLeave={() => { mouseDownRef.current = false }}
    >
      {particles.map(p => (
        <span
          key={p.id}
          className={`trail-dot ${p.permanent ? 'permanent' : ''}`}
          style={{ left: p.x, top: p.y, background: p.color }}
        />
      ))}
    </div>
  )
}

type Shaving = { id: number; x: number; y: number; vx: number; vy: number; color: string }

function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const isDrawingRef = useRef(false)
  const doneRef = useRef(false)
  const shavingCounterRef = useRef(0)
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)
  const [shavings, setShavings] = useState<Shaving[]>([])

  function drawCover() {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    canvas.width = wrap.clientWidth
    canvas.height = wrap.clientHeight
    const ctx = canvas.getContext('2d')!

    // Gold base
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    grad.addColorStop(0, '#312713')
    grad.addColorStop(0.35, '#332b19')
    grad.addColorStop(0.65, '#362812')
    grad.addColorStop(1, '#302514')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Metallic scratch texture
    ctx.globalAlpha = 0.12
    for (let i = 0; i < 2500; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const len = 2 + Math.random() * 10
      const angle = Math.random() * Math.PI
      ctx.strokeStyle = Math.random() > 0.5 ? '#fff8e0' : '#7a4e10'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len)
      ctx.stroke()
    }
    ctx.globalAlpha = 1

    // Label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
    ctx.font = 'bold 13px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('✦  RASPE AQUI  ✦', canvas.width / 2, canvas.height / 2)
  }

  useEffect(() => {
    drawCover()
    const ro = new ResizeObserver(() => {
      if (!doneRef.current) drawCover()
    })
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [])

  const scratchAt = useCallback((clientX: number, clientY: number) => {
    if (!isDrawingRef.current || doneRef.current) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 16, 0, Math.PI * 2)
    ctx.fill()

    const colors = ['#c8922a', '#e8c060', '#d4963c', '#f0d080', '#b87e28']
    const newShavings: Shaving[] = Array.from({ length: 4 }, () => ({
      id: shavingCounterRef.current++,
      x,
      y,
      vx: (Math.random() - 0.5) * 5,
      vy: -(Math.random() * 4 + 1),
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setShavings(prev => [...prev, ...newShavings])
    newShavings.forEach(s => {
      setTimeout(() => setShavings(prev => prev.filter(p => p.id !== s.id)), 700)
    })

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let transparent = 0
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] < 128) transparent++
    }
    const revealed = Math.round(transparent / (data.length / 16) * 100)
    if (revealed >= 80) { doneRef.current = true; setDone(true); setPct(100) }
    else setPct(revealed)
  }, [])

  useEffect(() => {
    const el = canvasRef.current!
    const onTouchStart = (e: TouchEvent) => { e.preventDefault(); isDrawingRef.current = true; scratchAt(e.touches[0].clientX, e.touches[0].clientY) }
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); scratchAt(e.touches[0].clientX, e.touches[0].clientY) }
    const onTouchEnd = () => { isDrawingRef.current = false }
    el.addEventListener('touchstart', onTouchStart, { passive: false })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [scratchAt])

  const reset = () => {
    doneRef.current = false
    setDone(false)
    setPct(0)
    setShavings([])
    drawCover()
  }

  return (
    <div className="scratch-container">
      <button className="lab-clear-btn" onClick={reset}>Reiniciar</button>
      <div
        className="scratch-wrap"
        ref={wrapRef}
        style={{ backgroundImage: `url(${noneNina})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <canvas
          ref={canvasRef}
          className="scratch-canvas"
          style={{ opacity: done ? 0 : 1, pointerEvents: done ? 'none' : 'auto' }}
          onMouseDown={() => { isDrawingRef.current = true }}
          onMouseUp={() => { isDrawingRef.current = false }}
          onMouseLeave={() => { isDrawingRef.current = false }}
          onMouseMove={e => scratchAt(e.clientX, e.clientY)}
        />
        {shavings.map(s => (
          <span
            key={s.id}
            className="scratch-shaving"
            style={{
              left: s.x,
              top: s.y,
              '--vx': `${s.vx * 14}px`,
              '--vy': `${s.vy * 14}px`,
              background: s.color,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="scratch-footer">
        <span className="scratch-pct">{pct}% revelado</span>
      </div>
    </div>
  )
}

const BALL_R = 14
const GRAVITY = 0.015
const REPEL_RADIUS = BALL_R + 10
const REPEL_FORCE = 0.8

function SpringBall() {
  const boxRef = useRef<HTMLDivElement>(null)
  const ballRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLSpanElement>(null)
  const deadScreenRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const vel = useRef({ x: 0, y: 0 })
  const mouse = useRef({ x: -999, y: -999 })
  const rafRef = useRef<number | null>(null)
  const startedRef = useRef(false)
  const deadRef = useRef(false)
  const timerRef = useRef<HTMLSpanElement>(null)
  const startTimeRef = useRef<number>(0)
  const timerRafRef = useRef<number | null>(null)

  const runLoop = useCallback(() => {
    const box = boxRef.current!

    function tick() {
      if (deadRef.current) return

      vel.current.y += GRAVITY

      const dx = pos.current.x - mouse.current.x
      const dy = pos.current.y - mouse.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < REPEL_RADIUS && dist > 0) {
        const force = (REPEL_RADIUS - dist) / REPEL_RADIUS * REPEL_FORCE
        vel.current.x += (dx / dist) * force
        vel.current.y += (dy / dist) * force
      }

      vel.current.x *= 0.98
      vel.current.y *= 0.99
      vel.current.x = Math.max(-4, Math.min(4, vel.current.x))
      vel.current.y = Math.max(-4, Math.min(4, vel.current.y))

      pos.current.x += vel.current.x
      pos.current.y += vel.current.y

      if (pos.current.x - BALL_R < 0) { pos.current.x = BALL_R; vel.current.x *= -0.85 }
      if (pos.current.x + BALL_R > box.clientWidth) { pos.current.x = box.clientWidth - BALL_R; vel.current.x *= -0.85 }
      if (pos.current.y - BALL_R < 0) { pos.current.y = BALL_R; vel.current.y *= -0.85 }

      if (pos.current.y - BALL_R > box.clientHeight) {
        deadRef.current = true
        if (ballRef.current) ballRef.current.style.display = 'none'
        if (deadScreenRef.current) deadScreenRef.current.style.display = 'flex'
        return
      }

      if (ballRef.current) {
        ballRef.current.style.transform = `translate(${pos.current.x - BALL_R}px, ${pos.current.y - BALL_R}px)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    const box = boxRef.current!
    const x = box.clientWidth / 2
    const y = box.clientHeight / 2
    pos.current = { x, y }
    if (ballRef.current) {
      ballRef.current.style.transform = `translate(${x - BALL_R}px, ${y - BALL_R}px)`
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const startGame = useCallback(() => {
    if (startedRef.current || deadRef.current) return
    startedRef.current = true
    if (hintRef.current) hintRef.current.style.display = 'none'
    if (ballRef.current) ballRef.current.classList.add('started')

    startTimeRef.current = performance.now()
    function tickTimer() {
      if (deadRef.current) return
      const elapsed = (performance.now() - startTimeRef.current) / 1000
      if (timerRef.current) timerRef.current.textContent = elapsed.toFixed(2) + 's'
      timerRafRef.current = requestAnimationFrame(tickTimer)
    }
    timerRafRef.current = requestAnimationFrame(tickTimer)

    runLoop()
  }, [runLoop])

  const reset = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const box = boxRef.current!
    const x = box.clientWidth / 2
    const y = box.clientHeight / 2
    pos.current = { x, y }
    vel.current = { x: 0, y: 0 }
    mouse.current = { x: -999, y: -999 }
    deadRef.current = false
    startedRef.current = false
    if (ballRef.current) {
      ballRef.current.style.display = 'block'
      ballRef.current.classList.remove('started')
      ballRef.current.style.transform = `translate(${x - BALL_R}px, ${y - BALL_R}px)`
    }
    if (hintRef.current) hintRef.current.style.display = 'flex'
    if (deadScreenRef.current) deadScreenRef.current.style.display = 'none'
    if (timerRef.current) timerRef.current.textContent = '0.00s'
    if (timerRafRef.current) cancelAnimationFrame(timerRafRef.current)
  }, [])

  const handlePointer = useCallback((clientX: number, clientY: number) => {
    const rect = boxRef.current!.getBoundingClientRect()
    const mx = clientX - rect.left
    const my = clientY - rect.top
    mouse.current = { x: mx, y: my }
    if (!startedRef.current) {
      const dx = mx - pos.current.x
      const dy = my - pos.current.y
      if (Math.sqrt(dx * dx + dy * dy) < BALL_R + 20) startGame()
    }
  }, [startGame])

  useEffect(() => {
    const el = boxRef.current!
    const onTouchMove = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('button')) return
      e.preventDefault()
      handlePointer(e.touches[0].clientX, e.touches[0].clientY)
    }
    const onTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('button')) return
      e.preventDefault()
      startGame()
      handlePointer(e.touches[0].clientX, e.touches[0].clientY)
    }
    const onTouchEnd = () => { mouse.current = { x: -999, y: -999 } }
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: false })
    el.addEventListener('touchend', onTouchEnd)
    return () => {
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [handlePointer, startGame])

  return (
    <div
      className="spring-box"
      ref={boxRef}
      onMouseMove={e => handlePointer(e.clientX, e.clientY)}
      onMouseLeave={() => { mouse.current = { x: -999, y: -999 } }}
    >
      <span className="trail-hint" ref={hintRef} style={{ display: 'none' }} />
      <div className="spring-ball" ref={ballRef} />
      <div className="spring-dead" ref={deadScreenRef} style={{ display: 'none' }}>
        <span>GAME OVER</span>
        <button className="spring-reset" onClick={reset}>reiniciar</button>
      </div>
      <span className="spring-timer" ref={timerRef}>0.00s</span>
    </div>
  )
}

type Bubble = { id: number; x: number; y: number; r: number; color: string; speed: number; wobble: number; popping: boolean }

const BUBBLE_COLORS = ['#51d2e9', '#43c3da', '#5ed1e6', '#13cff0', '#3eadc0', '#b1e6f0']

function Bubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const bubblesRef = useRef<Bubble[]>([])
  const counterRef = useRef(0)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles(prev => {
        if (prev.filter(b => !b.popping).length >= 60) return prev
        const id = counterRef.current++
        const big = Math.random() < 0.
        const r = big ? 22 + Math.random() * 12 : 18 + Math.random() * 10
        return [...prev, {
          id,
          x: 5 + Math.random() * 90,
          y: 110,
          r,
          color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
          speed: big ? 0.08 + Math.random() * 0.1 : 0.15 + Math.random() * 0.2,
          wobble: Math.random() * Math.PI * 2,
          popping: false,
        }]
      })
    }, 150)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let raf: number
    function tick() {
      setBubbles(prev =>
        prev
          .filter(b => !b.popping || true)
          .map(b => ({ ...b, y: b.y - b.speed, wobble: b.wobble + 0.03 }))
          .filter(b => b.y + b.r > -10)
      )
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const pop = (id: number) => {
    setBubbles(prev => prev.map(b => b.id === id ? { ...b, popping: true } : b))
    setTimeout(() => setBubbles(prev => prev.filter(b => b.id !== id)), 350)
  }

  bubblesRef.current = bubbles

  const checkPop = useCallback((clientX: number, clientY: number) => {
    const rect = boxRef.current!.getBoundingClientRect()
    const mx = clientX - rect.left
    const my = clientY - rect.top
    const w = rect.width
    const h = rect.height
    bubblesRef.current.forEach(b => {
      if (b.popping) return
      const bx = (b.x + Math.sin(b.wobble) * 3) / 100 * w
      const by = b.y / 100 * h
      if (Math.sqrt((mx - bx) ** 2 + (my - by) ** 2) < b.r) pop(b.id)
    })
  }, [])

  useEffect(() => {
    const el = boxRef.current!
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); checkPop(e.touches[0].clientX, e.touches[0].clientY) }
    const onTouchStart = (e: TouchEvent) => { e.preventDefault(); checkPop(e.touches[0].clientX, e.touches[0].clientY) }
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: false })
    return () => {
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchstart', onTouchStart)
    }
  }, [checkPop])

  return (
    <div
      className="bubbles-box"
      ref={boxRef}
      onMouseMove={e => checkPop(e.clientX, e.clientY)}
    >
      <svg width="100%" height="100%">
        {bubbles.map(b => {
          const svgEl = boxRef.current
          const w = svgEl?.clientWidth ?? 300
          const h = svgEl?.clientHeight ?? 260
          const cx = (b.x + Math.sin(b.wobble) * 3) / 100 * w
          const cy = b.y / 100 * h
          return (
            <g key={b.id} style={{ cursor: 'crosshair' }}>
              <defs>
                <radialGradient id={`grad-${b.id}`} cx="38%" cy="35%" r="60%" fx="38%" fy="35%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.35" />
                  <stop offset="50%" stopColor={b.color} stopOpacity="0.2" />
                  <stop offset="100%" stopColor={b.color} stopOpacity="0.5" />
                </radialGradient>
              </defs>
              <circle
                cx={cx}
                cy={cy}
                r={b.popping ? b.r * 1.4 : b.r}
                fill={b.popping ? 'transparent' : `url(#grad-${b.id})`}
                stroke={b.color}
                strokeWidth={b.popping ? 0 : 1.5}
                style={{ transition: b.popping ? 'r 0.2s, opacity 0.3s, stroke-width 0.2s' : undefined, opacity: b.popping ? 0 : 1 }}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default function Lab() {
  const clearTrailRef = useRef<(() => void) | null>(null)

  return (
    <section id="lab" className="lab section">
      <div className="section-header">
        <span className="section-tag">// lab</span>
        <h2>Componentes interativos</h2>
      </div>

      <div className="lab-grid">
        <div className="lab-card lab-nina">
          <span className="lab-card-label">Nina reage</span>
          <NinaInput />
        </div>
        <div className="lab-card lab-trail">
          <div className="lab-card-header">
            <span className="lab-card-label">Cursor trail</span>
            <button className="lab-clear-btn" onClick={() => clearTrailRef.current?.()}>Limpar</button>
          </div>
          <p className="lab-card-hint">Clique para pintar</p>
          <CursorTrail onClear={fn => { clearTrailRef.current = fn }} />
        </div>
        <div className="lab-card lab-mood">
          <span className="lab-card-label">Raspadinha</span>
          <p className="lab-card-hint">Raspe para revelar</p>
          <ScratchCard />
        </div>
        <div className="lab-card lab-ball">
          <span className="lab-card-label">Bolinha</span>
          <p className="lab-card-hint">Passe o mouse na bolinha para iniciar</p>
          <SpringBall />
        </div>
        <div className="lab-card lab-bubbles">
          <span className="lab-card-label">Bolhas</span>
          <p className="lab-card-hint">Passe o mouse nas bolhas para estoura-las</p>
          <Bubbles />
        </div>
      </div>
    </section>
  )
}
