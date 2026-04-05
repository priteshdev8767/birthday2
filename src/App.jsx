import { useState, useEffect, useRef, useCallback } from 'react'
import './index.css'

const PHOTOS = [
  { src: '/images/Screenshot 2026-04-05 182918.png', label: 'Gorgeous ✨' },
  { src: '/images/photo.jpg', label: 'Queen 👑' },
  { src: '/images/Screenshot 2026-04-05 182829.png', label: 'Stunning 🌸' },
  { src: '/images/Screenshot 2026-04-05 182843.png', label: 'Elegant 🌺' },
  { src: '/images/Screenshot 2026-04-05 182902.png', label: 'Beautiful 💫' },
]
const WISHES = [
  ['🌟','May all your dreams come true this year'],
  ['💖','Stay as beautiful and kind as you are'],
  ['🎯','May success follow you everywhere'],
  ['😊','Keep that gorgeous smile always'],
  ['🌈','May your life be filled with colors of joy'],
  ['🦋','Fly high and achieve everything you desire'],
  ['🎁','You deserve all the good things in life'],
]

function StarCanvas(){
  const ref=useRef(null)
  useEffect(()=>{
    const c=ref.current,cx=c.getContext('2d')
    const stars=Array.from({length:130},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,s:Math.random()*2+.5,sp:Math.random()*.3+.05,o:Math.random(),d:Math.random()>.5?1:-1,c:`hsl(${340+Math.random()*30},${60+Math.random()*30}%,${70+Math.random()*20}%)`}))
    const resize=()=>{c.width=innerWidth;c.height=innerHeight};resize();window.addEventListener('resize',resize)
    let raf
    const draw=()=>{cx.clearRect(0,0,c.width,c.height);stars.forEach(s=>{s.o+=s.d*.008;if(s.o>=1)s.d=-1;if(s.o<=.1)s.d=1;cx.beginPath();cx.arc(s.x,s.y,s.s,0,Math.PI*2);cx.fillStyle=s.c;cx.globalAlpha=s.o*.6;cx.fill();cx.beginPath();cx.arc(s.x,s.y,s.s*3,0,Math.PI*2);cx.globalAlpha=s.o*.08;cx.fill();s.y-=s.sp;if(s.y<-5){s.y=c.height+5;s.x=Math.random()*c.width}});cx.globalAlpha=1;raf=requestAnimationFrame(draw)};draw()
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize)}
  },[])
  return <canvas id="starsCanvas" ref={ref}/>
}

function SparkleTrail(){
  useEffect(()=>{
    const sp=['✨','💖','🌸','⭐','💕'];let last=0
    const h=e=>{if(Date.now()-last<80)return;last=Date.now();const d=document.createElement('div');d.className='sparkle';d.textContent=sp[~~(Math.random()*sp.length)];d.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;font-size:${Math.random()*12+10}px`;document.body.appendChild(d);setTimeout(()=>d.remove(),1000)}
    document.addEventListener('mousemove',h);return()=>document.removeEventListener('mousemove',h)
  },[]);return null
}

function launchConfetti(){
  const cl=['#e8a0b4','#d4789a','#f7d1dc','#fce4ec','#c96b8a','#FFD700','#FF69B4','#DDA0DD']
  const co=document.getElementById('confetti-root');if(!co)return
  for(let i=0;i<150;i++)setTimeout(()=>{const p=document.createElement('div');p.className='confetti-piece';p.style.cssText=`left:${Math.random()*100}%;width:${Math.random()*10+6}px;height:${Math.random()*8+4}px;background:${cl[~~(Math.random()*cl.length)]};border-radius:${Math.random()>.4?'50%':'2px'};animation-duration:${Math.random()*2.5+2}s`;co.appendChild(p);setTimeout(()=>p.remove(),5000)},i*25)
}
function createHearts(){
  const h=['💕','💖','🌸','✨','💗','🎀','🌺','💝']
  for(let i=0;i<20;i++){const d=document.createElement('div');d.className='float-heart';d.textContent=h[~~(Math.random()*h.length)];d.style.cssText=`left:${Math.random()*100}%;font-size:${Math.random()*16+14}px;animation-duration:${Math.random()*10+8}s;animation-delay:${Math.random()*15}s`;document.body.appendChild(d)}
}

function useReveal(){
  const ref=useRef(null)
  useEffect(()=>{const el=ref.current;if(!el)return;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)el.classList.add('visible')},{threshold:.12});obs.observe(el);return()=>obs.disconnect()},[])
  return ref
}
function Reveal({children,className=''}){const ref=useReveal();return <div ref={ref} className={`reveal ${className}`}>{children}</div>}

function Envelope({onOpen}){
  const [hidden,setHidden]=useState(false)
  return(
    <div className={`envelope-overlay${hidden?' hidden':''}`} onClick={()=>{setHidden(true);setTimeout(onOpen,200)}}>
      <div className="envelope-wrapper"><div className="envelope"><div className="envelope-flap"/><div className="envelope-seal">💖</div><div className="envelope-body"><div className="envelope-letter">You have a<br/>special surprise<br/>waiting inside! 🎁</div></div></div></div>
      <div className="envelope-text">A Special Surprise for You!</div>
      <div className="envelope-subtext">✦ tap to open ✦</div>
    </div>
  )
}

function Hero(){
  useEffect(()=>{
    const h=()=>{const el=document.querySelector('.hero-content');if(el&&scrollY<innerHeight){el.style.transform=`translateY(${scrollY*.3}px)`;el.style.opacity=1-scrollY/innerHeight*.6}}
    window.addEventListener('scroll',h);return()=>window.removeEventListener('scroll',h)
  },[])
  return(
    <section className="hero"><div className="hero-content">
      <div className="hero-photo-wrapper"><div className="hero-photo-ring"/><div className="hero-photo-ring-2"/><img src="/images/Screenshot 2026-04-05 182918.png" alt="Samruddhi" className="hero-photo"/></div>
      <div className="hero-stars">✨ 🌟 ✨</div>
      <div className="hero-subtitle">~ Wishing a very ~</div>
      <div className="hero-title">Happy Birthday</div>
      <div className="hero-name">Samruddhi !</div>
      <div className="hero-date">✦ 6th April ✦</div>
    </div><div className="scroll-indicator"><span/></div></section>
  )
}

function Message(){
  return(
    <section><div className="section-divider"/><Reveal>
      <div className="message-card"><div className="message-title">Dear Samruddhi 💕</div>
      <div className="message-text">On your special day, I just want you to know how truly <span className="hl">amazing</span> you are! Your smile lights up every room, and your kindness touches every heart around you. 🌸<br/><br/>May this birthday bring you all the <span className="hl">happiness</span>, <span className="hl">love</span>, and <span className="hl">success</span> that you truly deserve. Keep shining bright like the beautiful star you are! ⭐<br/><br/>Here&apos;s to another year of beautiful memories, endless laughter, and dreams coming true! 🎀<span className="message-emoji">🎂 🎉 🥳</span></div></div>
    </Reveal></section>
  )
}

// ===== IMPROVED CAKE =====
function Candle({lit,onBlow}){
  const [showSmoke,setShowSmoke]=useState(false)
  const [blown,setBlown]=useState(false)
  const handleBlow=e=>{
    e.stopPropagation()
    if(!lit||blown)return
    setBlown(true)
    setShowSmoke(true)
    onBlow()
    setTimeout(()=>setShowSmoke(false),2000)
  }
  const sprinkleColors=['#FFD700','#FF69B4','#87CEEB','#98FB98','#DDA0DD']
  return(
    <div className="candle-wrap" onClick={handleBlow}>
      <div className="candle-stick"><div className="candle-stripe"/><div className="wick"/></div>
      {lit&&!blown&&<div className="flame-wrap"><div className="flame-glow"/><div className="flame-outer"/><div className="flame-inner"/></div>}
      {blown&&<div className={`flame-wrap blown`}><div className="flame-inner"/></div>}
      {showSmoke&&<div className="smoke">{[0,1,2].map(i=><div key={i} className="smoke-puff" style={{animationDelay:`${i*.3}s`,left:`${(i-1)*5}px`}}/>)}</div>}
    </div>
  )
}

function CakeParticles({show}){
  if(!show)return null
  const particles=Array.from({length:30},(_,i)=>({
    id:i,left:50+Math.random()*200-100,top:50+Math.random()*150,
    tx:(Math.random()-0.5)*200,ty:-(Math.random()*150+50),
    size:Math.random()*8+4,
    color:['#e8a0b4','#FFD700','#FF69B4','#f7d1dc','#DDA0DD'][~~(Math.random()*5)],
    delay:Math.random()*.5
  }))
  return(
    <div className="cake-celebration">
      {particles.map(p=><div key={p.id} className="cake-particle" style={{left:p.left,top:p.top,width:p.size,height:p.size,background:p.color,'--tx':p.tx+'px','--ty':p.ty+'px',animationDelay:p.delay+'s'}}/>)}
    </div>
  )
}

function CakeSection(){
  const [flames,setFlames]=useState([true,true,true,true,true])
  const [phase,setPhase]=useState('candles')
  const [knifeClass,setKnifeClass]=useState('')
  const [cutFlash,setCutFlash]=useState(false)
  const [particles,setParticles]=useState(false)
  const allOut=flames.every(f=>!f)

  useEffect(()=>{if(allOut&&phase==='candles')setPhase('cut')},[allOut,phase])

  const blowCandle=i=>{if(phase!=='candles')return;const n=[...flames];n[i]=false;setFlames(n)}
  const cutCake=()=>{
    if(phase!=='cut')return
    setKnifeClass('swing')
    setTimeout(()=>{setKnifeClass('cut');setCutFlash(true)},800)
    setTimeout(()=>{setParticles(true);setPhase('done');launchConfetti()},1600)
  }

  const txt=phase==='candles'?'🕯️ Blow out the candles!':phase==='cut'?'🔪 Now cut the cake!':'🥳 Enjoy your cake!'
  const inst=phase==='candles'?'👆 Click each candle to blow it out':phase==='cut'?'👆 Click on the cake to cut it!':null

  const sprinkles=Array.from({length:15},(_,i)=>({id:i,left:20+Math.random()*260,top:5+Math.random()*60,color:['#FFD700','#FF69B4','#87CEEB','#98FB98','#fff'][~~(Math.random()*5)],rot:Math.random()*180}))

  return(
    <section className="cake-section">
      <Reveal><div className="section-title">🎂 Cut Your Birthday Cake! 🎂</div></Reveal>
      <Reveal>
        <div className="cake-stage" onClick={cutCake}>
          <CakeParticles show={particles}/>
          <div className={`knife-anim ${knifeClass}`}>🔪</div>
          <div className={`cut-flash${cutFlash?' active':''}`}/>
          <div className="cake-body">
            <div className="candle-row">
              {flames.map((lit,i)=><Candle key={i} lit={lit} onBlow={()=>blowCandle(i)}/>)}
            </div>
            <div className="tier tier-top" style={{position:'relative'}}>
              {sprinkles.slice(0,5).map(s=><div key={s.id} className="sprinkle" style={{left:s.left%140,top:s.top%50,background:s.color,transform:`rotate(${s.rot}deg)`}}/>)}
            </div>
            <div className="tier tier-middle" style={{position:'relative'}}>
              <div className="drip" style={{left:'20%'}}/>
              <div className="drip" style={{left:'50%',animationDelay:'.5s'}}/>
              <div className="drip" style={{left:'80%',animationDelay:'1s'}}/>
              {sprinkles.slice(5,10).map(s=><div key={s.id} className="sprinkle" style={{left:s.left%200,top:s.top%65,background:s.color,transform:`rotate(${s.rot}deg)`}}/>)}
            </div>
            <div className="tier tier-bottom" style={{position:'relative'}}>
              <div className="drip" style={{left:'15%'}}/>
              <div className="drip" style={{left:'40%',animationDelay:'.7s'}}/>
              <div className="drip" style={{left:'65%',animationDelay:'.3s'}}/>
              <div className="drip" style={{left:'85%',animationDelay:'1.2s'}}/>
              {sprinkles.slice(10).map(s=><div key={s.id} className="sprinkle" style={{left:s.left,top:s.top%80,background:s.color,transform:`rotate(${s.rot}deg)`}}/>)}
            </div>
          </div>
          <div className="cake-platform"/>
          <div className={`cake-text${phase==='done'?' celebrate':''}`}>{txt}</div>
          {inst&&<div className="cake-instruction">{inst}</div>}
          {phase==='done'&&<div className="cake-msg">🎉 Happy Birthday Samruddhi! 🎉<br/>🥳 Make a wish & enjoy! 🥳</div>}
        </div>
      </Reveal>
    </section>
  )
}

function Gallery({onPhotoClick}){
  return(
    <section><Reveal><div className="section-title">Beautiful Moments ✨</div></Reveal>
    <div className="gallery-grid">
      {PHOTOS.map((p,i)=><Reveal key={i}><div className="gallery-item" onClick={()=>onPhotoClick(p.src)}
        onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();const rx=(e.clientY-r.top-r.height/2)/20;const ry=(r.width/2-(e.clientX-r.left))/20;e.currentTarget.style.transform=`translateY(-12px) scale(1.03) perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`}}
        onMouseLeave={e=>{e.currentTarget.style.transform=''}}>
        <img src={p.src} alt="Samruddhi" loading="lazy"/><div className="photo-label">{p.label}</div>
      </div></Reveal>)}
    </div></section>
  )
}

function WishesSection(){
  return(
    <section className="wishes-section">
      <Reveal><span className="cake-emoji-big">🎂</span><div className="section-title">Birthday Wishes For You</div></Reveal>
      <Reveal><ul className="wishes-list">{WISHES.map(([e,t],i)=><li key={i}><span>{e}</span> {t}</li>)}</ul></Reveal>
    </section>
  )
}

function Lightbox({src,onClose}){
  useEffect(()=>{const h=e=>e.key==='Escape'&&onClose();document.addEventListener('keydown',h);return()=>document.removeEventListener('keydown',h)},[onClose])
  if(!src)return null
  return <div className="lightbox active" onClick={onClose}><button className="lightbox-close">&times;</button><img src={src} alt="Photo"/></div>
}

export default function App(){
  const [opened,setOpened]=useState(false)
  const [lightbox,setLightbox]=useState(null)
  const audioRef=useRef(null)
  const [playing,setPlaying]=useState(false)

  const startMusic=useCallback(()=>{
    const a=audioRef.current;if(!a)return;a.volume=0.5
    a.play().then(()=>setPlaying(true)).catch(()=>{})
  },[])

  const handleOpen=()=>{setOpened(true);launchConfetti();createHearts();startMusic()}
  const toggleMusic=()=>{const a=audioRef.current;if(!a)return;if(a.paused){a.volume=0.5;a.play();setPlaying(true)}else{a.pause();setPlaying(false)}}

  useEffect(()=>{
    if(!opened)return
    const h=()=>{if(!audioRef.current?.paused)return;startMusic()}
    document.addEventListener('click',h,{once:true})
    return()=>document.removeEventListener('click',h)
  },[opened,startMusic])

  return(
    <>
      <StarCanvas/><SparkleTrail/>
      <div id="confetti-root" className="confetti-container"/>
      {!opened&&<Envelope onOpen={handleOpen}/>}
      <Hero/><Message/><CakeSection/><Gallery onPhotoClick={setLightbox}/><WishesSection/>
      <footer className="footer">
        <Reveal><div className="footer-hearts">💕💖💕</div></Reveal>
        <Reveal><div className="footer-text">Happy Birthday Once Again, Samruddhi!</div></Reveal>
        <Reveal><div className="footer-sub">made with love ❤️</div></Reveal>
      </footer>
      <Lightbox src={lightbox} onClose={()=>setLightbox(null)}/>
      <button className={`music-btn${playing?' playing':''}`} onClick={toggleMusic} title="Play/Pause">{playing?'🔊':'🎵'}</button>
      <audio ref={audioRef} loop preload="auto"><source src="/the_mountain-happy-birthday-508020.mp3" type="audio/mpeg"/></audio>
    </>
  )
}
