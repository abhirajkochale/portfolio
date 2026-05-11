import { useState, useRef, useEffect } from 'react'
import './Chatbot.css'

/* ── Knowledge base ──────────────────────────────────────────── */
const KB: { patterns: RegExp[]; answer: string }[] = [
  {
    patterns: [/who is/i, /about abhiraj/i, /tell me about/i, /introduce/i, /yourself/i],
    answer: `I'm Abhiraj Kochale — a 2nd-year Computer Engineering student at **KJ Somaiya College of Engineering, Mumbai** (CGPA: 8.70). I love building things, from full-stack web apps to AI-powered tools. I ship real products used by real people! 🚀`,
  },
  {
    patterns: [/project/i, /built/i, /work/i, /portfolio/i, /shipped/i],
    answer: `Abhiraj has built some awesome stuff:\n\n**🤖 Expenzo** — AI financial assistant using Google Gemini API to analyse bank statements in natural language.\n\n**🏫 Parent Portal** — Multi-role preschool management system, live with 150+ active users.\n\n**🌐 Awesome Kids Website** — Official preschool website, database-backed with Supabase.\n\n**📄 Resume Screening Tool** — ML pipeline using TF-IDF + Logistic Regression for resume ranking.`,
  },
  {
    patterns: [/skill/i, /tech/i, /stack/i, /language/i, /tool/i, /know/i],
    answer: `Abhiraj's tech stack includes:\n\n⚛️ **Frontend:** React, TypeScript, CSS\n🟢 **Backend:** Node.js, Express, Python\n🗄️ **Databases:** PostgreSQL, Supabase\n🤖 **AI/ML:** Gemini API, Scikit-learn, OpenCV, NLP\n🔧 **Tools:** Git, Docker, Firebase, REST APIs`,
  },
  {
    patterns: [/contact/i, /reach/i, /email/i, /hire/i, /intern/i, /connect/i],
    answer: `You can reach Abhiraj here:\n\n📧 **Email:** kochaleabhiraj@gmail.com\n💼 **LinkedIn:** linkedin.com/in/abhiraj-kochale-543284309\n🐙 **GitHub:** github.com/abhirajkochale\n\nHe's actively looking for internship opportunities! 🎯`,
  },
  {
    patterns: [/experience/i, /job/i, /intern/i, /work.*at/i, /role/i],
    answer: `Abhiraj's experience so far:\n\n🧠 **ML Intern @ Wayspire Ed-Tech** (June–Aug 2025) — Built text classification & CV models using OpenCV.\n\n📱 **Social Media Manager @ Awesome Kids** (2024–Present) — Grew Instagram engagement by 30%+.\n\n🎯 **Marketing @ SMLRA** (Oct 2024–Present) — Sponsorship outreach for ML workshops.`,
  },
  {
    patterns: [/education/i, /college/i, /university/i, /somaiya/i, /cgpa/i, /study/i, /degree/i],
    answer: `Abhiraj is pursuing a **B.E. in Computer Engineering** at **KJ Somaiya College of Engineering, Mumbai** — currently in his 2nd year with a CGPA of **8.70/10**. 📚`,
  },
  {
    patterns: [/expenzo/i, /finance/i, /gemini/i, /ai.*app/i],
    answer: `**Expenzo** is Abhiraj's flagship AI project — a personal finance assistant that lets you upload bank statements and ask questions in plain English. It uses **Google Gemini API** for NLP, **Supabase/PostgreSQL** for data, and is built with **React + TypeScript**. Super cool! 💰🤖`,
  },
  {
    patterns: [/parent portal/i, /preschool.*system/i, /school.*app/i, /150/i],
    answer: `The **Parent Portal** is a production-grade multi-role school management system with dashboards for parents, admins, and teachers. It's live with **150+ active users** and has processed **80+ admissions**. Built with React, TypeScript, Supabase, PostgreSQL, and RBAC. 🏫`,
  },
  {
    patterns: [/resume.*screen/i, /ml.*pipeline/i, /scikit/i, /tfidf/i, /nlp/i],
    answer: `The **Resume Screening Tool** is an ML pipeline that automatically ranks resumes using **TF-IDF vectorisation** and **Logistic Regression**, with NLP preprocessing steps like stemming and stop-word removal. Built in Python with Scikit-learn. 📄🤖`,
  },
  {
    patterns: [/hi\b|hello|hey|sup|howdy|hiya/i],
    answer: `Hey there! 👋 Great to meet you! I'm Abhiraj's AI assistant. You can ask me anything about his projects, skills, experience, or how to get in touch with him. What would you like to know?`,
  },
  {
    patterns: [/thank/i, /cool|awesome|great|nice|impressive/i],
    answer: `Thanks, that means a lot! 😊 Abhiraj puts a lot of effort into his work. Is there anything else you'd like to know about him?`,
  },
]

const QUICK_REPLIES = [
  'Who is Abhiraj?',
  'What projects has he built?',
  'What are his skills?',
  'How to contact him?',
]

const GREETING = `Hey! I'm Abhiraj's AI assistant. Ask me about his projects, skills, or experience — or just say hi! 👋`

function getBotReply(input: string): string {
  const trimmed = input.trim()
  for (const entry of KB) {
    if (entry.patterns.some(p => p.test(trimmed))) return entry.answer
  }
  return `Hmm, I'm not sure about that one! 🤔 Try asking about Abhiraj's **projects**, **skills**, **experience**, or **contact info** — I know those well!`
}

/* ── Render message with basic markdown ──────────────────────── */
function MessageText({ text }: { text: string }) {
  // Bold: **text** → <strong>
  // Newlines → <br>
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <span>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={i}>{part.slice(2, -2)}</strong>
          : part.split('\n').map((line, j, arr) => (
              <span key={`${i}-${j}`}>
                {line}
                {j < arr.length - 1 && <br />}
              </span>
            ))
      )}
    </span>
  )
}

/* ── Types ───────────────────────────────────────────────────── */
interface Message { id: number; role: 'bot' | 'user'; text: string }

/* ── Component ───────────────────────────────────────────────── */
export default function Chatbot() {
  const [open, setOpen]               = useState(false)
  const [messages, setMessages]       = useState<Message[]>([
    { id: 0, role: 'bot', text: GREETING },
  ])
  const [input, setInput]             = useState('')
  const [typing, setTyping]           = useState(false)
  const [quickVisible, setQuickVisible] = useState(true)
  const [unread, setUnread]           = useState(0)
  const bottomRef                     = useRef<HTMLDivElement>(null)
  const inputRef                      = useRef<HTMLInputElement>(null)

  /* Scroll to bottom on new message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  /* Focus input when opened */
  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { id: Date.now(), role: 'user', text: text.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setQuickVisible(false)
    setTyping(true)

    setTimeout(() => {
      const reply = getBotReply(text)
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: reply }])
      setTyping(false)
      if (!open) setUnread(n => n + 1)
    }, 700 + Math.random() * 400)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* ── Chat window ──────────────────────────────── */}
      <div className={`chat-window ${open ? 'chat-window--open' : ''}`} role="dialog" aria-label="AI Chat Assistant" aria-hidden={!open}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header__avatar">AK</div>
          <div className="chat-header__info">
            <p className="chat-header__name">Abhiraj's Assistant</p>
            <p className="chat-header__status">
              <span className="chat-header__dot" />Online
            </p>
          </div>
          <button
            className="chat-header__close"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-body">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-bubble chat-bubble--${msg.role}`}>
              {msg.role === 'bot' && (
                <div className="chat-bubble__avatar" aria-hidden="true">AK</div>
              )}
              <div className="chat-bubble__text">
                <MessageText text={msg.text} />
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="chat-bubble chat-bubble--bot">
              <div className="chat-bubble__avatar" aria-hidden="true">AK</div>
              <div className="chat-bubble__text chat-bubble__typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          {/* Quick replies */}
          {quickVisible && !typing && (
            <div className="chat-quick-replies">
              {QUICK_REPLIES.map(q => (
                <button key={q} className="chat-chip" onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form className="chat-input-row" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="chat-input"
            type="text"
            placeholder="Ask me anything…"
            value={input}
            onChange={e => setInput(e.target.value)}
            aria-label="Type a message"
            disabled={typing}
          />
          <button
            type="submit"
            className="chat-send-btn"
            disabled={!input.trim() || typing}
            aria-label="Send message"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </form>
      </div>

      {/* ── Floating trigger button ───────────────────── */}
      <button
        className={`chat-fab ${open ? 'chat-fab--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Open chat with Abhiraj\'s assistant'}
        aria-expanded={open}
      >
        {/* Unread badge */}
        {!open && unread > 0 && (
          <span className="chat-fab__badge">{unread}</span>
        )}

        {/* Icon: chat ↔ close */}
        <span className="chat-fab__icon chat-fab__icon--chat" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        </span>
        <span className="chat-fab__icon chat-fab__icon--close" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </span>
      </button>
    </>
  )
}
