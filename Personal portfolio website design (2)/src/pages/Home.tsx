import { useState, useEffect, useRef } from 'react'
import type { Page } from '../App'
import heroBg from '@/imports/Frame_2__1_.png'
import avatarImg from '@/imports/yr6yr6yr6ys_1.png'

interface HomeProps {
  onNavigate: (page: Page) => void
}

// ===== REVEAL HOOK =====

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}


// ===== DATA =====

const featuredProjects = [
  {
    id: 1,
    title: "SANDS B2B Analytics Dashboard",
    category: "Web App",
    desc: "Enterprise analytics dashboard with real-time data visualization, CRM integration, and role-based access for B2B operations at Signals & Systems India.",
    tools: ["Figma", "React", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=400&fit=crop&auto=format",
    accent: "#6B4EFF",
  },
  {
    id: 2,
    title: "Mobile Banking App UI",
    category: "Mobile App",
    desc: "Clean, intuitive mobile banking interface with biometric auth, smart transaction insights, and an accessible design for iOS and Android platforms.",
    tools: ["Figma", "Adobe XD", "Principle"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=640&h=400&fit=crop&auto=format",
    accent: "#FF6B6B",
  },
  {
    id: 3,
    title: "NovaBrand Identity System",
    category: "Branding",
    desc: "Complete visual identity for a tech startup — logo, color system, typography, brand guidelines, and digital stationery assets.",
    tools: ["Illustrator", "Photoshop", "InDesign"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=640&h=400&fit=crop&auto=format",
    accent: "#FFB347",
  },
  {
    id: 4,
    title: "HealthTrack Web App",
    category: "Web App",
    desc: "Health monitoring SaaS with patient dashboards, appointment scheduling, and telemedicine integration — built with HIPAA-compliant UX principles.",
    tools: ["Figma", "HTML", "CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=640&h=400&fit=crop&auto=format",
    accent: "#4ECDC4",
  },
  {
    id: 5,
    title: "LuxeStore E-commerce Website",
    category: "Website",
    desc: "Premium e-commerce experience for a luxury fashion brand — responsive design, micro-interactions, product showcase, and a frictionless checkout flow.",
    tools: ["Figma", "HTML5", "CSS3", "JavaScript"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=640&h=400&fit=crop&auto=format",
    accent: "#A8E6CF",
  },
  {
    id: 6,
    title: "Social Media Design Campaign",
    category: "Graphic Design",
    desc: "100+ social media creatives for a lifestyle brand — consistent visual language across Instagram, LinkedIn, and Twitter with motion graphic variants.",
    tools: ["Photoshop", "Illustrator", "After Effects"],
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=640&h=400&fit=crop&auto=format",
    accent: "#FFE66D",
  },
]

const toolsList = [
  { name: "Figma", emoji: "🎨", color: "#F24E1E", bg: "#FFF0EC" },
  { name: "Adobe XD", emoji: "✏️", color: "#FF61F6", bg: "#FFF0FE" },
  { name: "Photoshop", emoji: "🖼️", color: "#31A8FF", bg: "#EBF6FF" },
  { name: "Illustrator", emoji: "🦊", color: "#FF9A00", bg: "#FFF5E6" },
  { name: "Premiere Pro", emoji: "🎬", color: "#9999FF", bg: "#F0F0FF" },
  { name: "After Effects", emoji: "✨", color: "#9999FF", bg: "#F0F0FF" },
  { name: "HTML5", emoji: "🌐", color: "#E44D26", bg: "#FFF1EE" },
  { name: "CSS3", emoji: "💅", color: "#264DE4", bg: "#EEF0FF" },
  { name: "JavaScript", emoji: "⚡", color: "#F7DF1E", bg: "#FFFCE6" },
  { name: "Bootstrap", emoji: "🅱️", color: "#7952B3", bg: "#F3EEFF" },
  { name: "Tailwind CSS", emoji: "🌊", color: "#06B6D4", bg: "#E6FAFB" },
  { name: "VS Code", emoji: "💻", color: "#007ACC", bg: "#E6F4FF" },
  { name: "Git & GitHub", emoji: "🐙", color: "#F05032", bg: "#FFF0EE" },
  { name: "ChatGPT / AI", emoji: "🤖", color: "#10A37F", bg: "#EDFAF6" },
  { name: "Canva", emoji: "🎭", color: "#00C4CC", bg: "#E6FAFA" },
  { name: "Blender", emoji: "🔵", color: "#E87D0D", bg: "#FFF4E8" },
]

// ===== HERO SECTION =====

function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateHeroEffect = () => {
      const hero = document.getElementById('hero-section')
      if (!hero) return

      setScrollProgress(Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight)))
    }

    updateHeroEffect()
    window.addEventListener('scroll', updateHeroEffect, { passive: true })
    window.addEventListener('resize', updateHeroEffect)
    return () => {
      window.removeEventListener('scroll', updateHeroEffect)
      window.removeEventListener('resize', updateHeroEffect)
    }
  }, [])

  return (
    <section
      id="hero-section"
      className="relative w-full"
      style={{ paddingTop: '64px', aspectRatio: '1920 / 979' }}
    >
      <img
        src={heroBg}
        alt="UI/UX Designer, Graphic Design, Video Editing and 3D Modeling — portfolio overview"
        className="fixed left-0 w-full h-auto block will-change-transform"
        style={{
          top: '64px',
          filter: `blur(${scrollProgress * 7}px)`,
          opacity: 1 - scrollProgress,
          transform: `scale(${1 - scrollProgress * 0.1})`,
          transformOrigin: 'center top',
        }}
      />
    </section>
  )
}

// ===== ABOUT SECTION =====

function AboutSection() {
  const { ref, visible } = useReveal()

  const skills = [
    "UI/UX Design", "Wireframing", "Prototyping", "Design Systems",
    "Front-End Dev", "HTML / CSS / JS", "React", "Tailwind CSS",
    "Adobe Photoshop", "Illustrator", "After Effects", "Premiere Pro",
    "Motion Graphics", "Video Editing", "Branding", "AI-assisted Design",
  ]

  const experience = [
    { year: "2022 – Present", role: "UI/UX Designer", org: "Signals & Systems India Pvt. Ltd. (SANDS)", type: "Full-time" },
    { year: "2021 – 2022", role: "Graphic Designer & Front-End Dev", org: "Freelance", type: "Freelance" },
  ]

  return (
    <section id="about" className="py-20 md:py-28" style={{ backgroundColor: '#F9F8F6' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-start transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* RIGHT — info */}
          <div className="lg:col-start-2">
            <div
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
              style={{
                background: 'rgba(107,78,255,0.08)',
                color: '#6B4EFF',
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              About Me
            </div>

            <h2
              className="font-black mb-5 leading-tight"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                color: '#1A1A2E',
              }}
            >
              Designing Experiences
              <br />
              <span style={{ color: '#6B4EFF' }}>That Actually Work</span>
            </h2>

            <p className="text-base leading-relaxed mb-4" style={{ color: '#4B5563' }}>
              I'm a <strong style={{ color: '#1A1A2E' }}>UI/UX Designer at Signals & Systems India Pvt. Ltd. (SANDS)</strong>,
              where I design B2B websites, web applications, dashboards, CRM systems, and mobile
              interfaces. My process bridges research and aesthetics — I obsess over user flows as
              much as pixel precision.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#4B5563' }}>
              Beyond UX, I bring cross-disciplinary depth: Graphic Design, Front-End Development
              (HTML, CSS, JavaScript), Video Editing, Motion Graphics, Branding, and AI-assisted
              design workflows. I believe great digital products are built at the intersection of
              empathy, craft, and code.
            </p>

            {/* Personal statement */}
            <blockquote
              className="border-l-4 pl-4 py-2 mb-6 italic"
              style={{ borderColor: '#6B4EFF', color: '#6B4EFF', fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem' }}
            >
              "Creating intuitive, user-centered digital experiences is not just my job — it's how I
              think about the world."
            </blockquote>

            {/* Skills chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              {skills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: 'rgba(107,78,255,0.08)',
                    color: '#6B4EFF',
                    border: '1px solid rgba(107,78,255,0.2)',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Experience timeline */}
            <div className="space-y-4 mb-6">
              <h3
                className="text-sm font-bold uppercase tracking-widest mb-3"
                style={{ color: '#9CA3AF', fontFamily: "'Outfit', sans-serif" }}
              >
                Experience
              </h3>
              {experience.map(e => (
                <div
                  key={e.role}
                  className="flex gap-4 items-start p-4 rounded-xl"
                  style={{ background: 'white', border: '1px solid #F0EDFF' }}
                >
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{ background: '#6B4EFF' }}
                  />
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: '#1A1A2E', fontFamily: "'Outfit', sans-serif" }}
                    >
                      {e.role}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
                      {e.org} · {e.year}
                    </p>
                  </div>
                  <span
                    className="ml-auto text-xs px-2 py-1 rounded-full shrink-0"
                    style={{ background: '#EEE9FF', color: '#6B4EFF', fontFamily: "'Outfit', sans-serif" }}
                  >
                    {e.type}
                  </span>
                </div>
              ))}
            </div>

            {/* Education */}
            <div
              className="p-4 rounded-xl"
              style={{ background: 'white', border: '1px solid #F0EDFF' }}
            >
              <h3
                className="text-sm font-bold uppercase tracking-widest mb-2"
                style={{ color: '#9CA3AF', fontFamily: "'Outfit', sans-serif" }}
              >
                Education
              </h3>
              <p
                className="font-semibold text-sm"
                style={{ color: '#1A1A2E', fontFamily: "'Outfit', sans-serif" }}
              >
                Bachelor of Design (B.Des)
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
                Specialization in UI/UX & Communication Design · 2019 – 2023
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== RECENT PROJECTS SECTION =====

function RecentProjectsSection({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const { ref, visible } = useReveal()

  return (
    <section
      id="projects-preview"
      className="py-20 md:py-28"
      style={{ background: 'linear-gradient(180deg, #F0EDFF 0%, #F9F8F6 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
            style={{
              background: 'rgba(107,78,255,0.1)',
              color: '#6B4EFF',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Recent Work
          </div>
          <h2
            className="font-black leading-tight"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              color: '#1A1A2E',
            }}
          >
            Featured{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #6B4EFF, #FF6B6B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Projects
            </span>
          </h2>
          <p
            className="mt-3 max-w-md mx-auto text-sm"
            style={{ color: '#6B7280', fontFamily: "'Inter', sans-serif" }}
          >
            A selection of my best work across UI/UX, web, mobile, and graphic design.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 100} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('projects')}
            className="px-8 py-3.5 rounded-full text-sm btn-primary inline-flex items-center gap-2"
          >
            View All Projects
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, delay = 0 }: { project: typeof featuredProjects[0]; delay?: number }) {
  const { ref, visible } = useReveal()

  const categoryColors: Record<string, string> = {
    "Web App": "#6B4EFF",
    "Mobile App": "#FF6B6B",
    "Branding": "#FFB347",
    "Website": "#4ECDC4",
    "Graphic Design": "#F7DF1E",
  }

  const catColor = categoryColors[project.category] || '#6B4EFF'

  return (
    <div
      ref={ref}
      className={`project-card bg-white rounded-2xl overflow-hidden transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        boxShadow: '0 4px 20px rgba(107,78,255,0.08)',
        border: '1px solid #F0EDFF',
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Image */}
      <div className="overflow-hidden h-48 relative" style={{ background: '#EEE9FF' }}>
        <img
          src={project.image}
          alt={project.title}
          className="card-img w-full h-full object-cover"
        />
        {/* Category badge */}
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
          style={{
            background: catColor,
            fontFamily: "'Outfit', sans-serif",
            boxShadow: `0 2px 8px ${catColor}60`,
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="font-bold text-base mb-2"
          style={{ color: '#1A1A2E', fontFamily: "'Outfit', sans-serif" }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: '#6B7280', fontFamily: "'Inter', sans-serif" }}
        >
          {project.desc}
        </p>

        {/* Tools */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tools.map(t => (
            <span
              key={t}
              className="px-2 py-0.5 rounded text-xs"
              style={{
                background: 'rgba(107,78,255,0.07)',
                color: '#6B4EFF',
                fontFamily: "'Inter', sans-serif",
                border: '1px solid rgba(107,78,255,0.15)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
          style={{ color: catColor, fontFamily: "'Outfit', sans-serif" }}
        >
          View Case Study
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// ===== TOOLS SECTION =====

function ToolsSection() {
  const { ref, visible } = useReveal()

  const categories = [
    { label: "Design Tools", tools: toolsList.slice(0, 4) },
    { label: "Motion & Video", tools: toolsList.slice(4, 6) },
    { label: "Development", tools: toolsList.slice(6, 11) },
    { label: "Productivity & AI", tools: toolsList.slice(11) },
  ]

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: '#F9F8F6' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section header */}
          <div className="text-center mb-14">
            <div
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
              style={{ background: 'rgba(107,78,255,0.1)', color: '#6B4EFF', fontFamily: "'Outfit', sans-serif" }}
            >
              Toolkit
            </div>
            <h2
              className="font-black"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#1A1A2E' }}
            >
              Tools & Technologies
            </h2>
            <p
              className="mt-3 max-w-sm mx-auto text-sm"
              style={{ color: '#6B7280', fontFamily: "'Inter', sans-serif" }}
            >
              The full stack of tools I use to design, prototype, build, and ship digital products.
            </p>
          </div>

          {/* Tool categories */}
          <div className="space-y-10">
            {categories.map(cat => (
              <div key={cat.label}>
                <h3
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: '#9CA3AF', fontFamily: "'Outfit', sans-serif" }}
                >
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {cat.tools.map((tool, i) => (
                    <ToolBadge key={tool.name} tool={tool} delay={i * 60} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sketch decoration */}
          <div className="flex justify-center mt-12 opacity-30">
            <svg viewBox="0 0 300 40" fill="none" className="w-64 h-10">
              <path
                d="M10,20 Q40,5 80,20 Q120,35 160,20 Q200,5 240,20 Q265,28 290,18"
                stroke="#6B4EFF"
                strokeWidth="2"
                strokeDasharray="350"
                strokeDashoffset="350"
                strokeLinecap="round"
                className="anim-draw"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

function ToolBadge({ tool, delay = 0 }: { tool: typeof toolsList[0]; delay?: number }) {
  return (
    <div
      className="tool-badge flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-default"
      style={{
        background: tool.bg,
        border: `1px solid ${tool.color}20`,
        animationDelay: `${delay}ms`,
      }}
    >
      <span className="text-lg leading-none">{tool.emoji}</span>
      <span
        className="text-sm font-semibold whitespace-nowrap"
        style={{ color: tool.color, fontFamily: "'Outfit', sans-serif" }}
      >
        {tool.name}
      </span>
    </div>
  )
}

// ===== CONTACT SECTION =====

function ContactSection() {
  const { ref, visible } = useReveal()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const socials = [
    { label: "LinkedIn", icon: "in", url: "#", color: "#0A66C2", bg: "#E8F0FB" },
    { label: "Behance", icon: "Bē", url: "#", color: "#1769FF", bg: "#E8F0FF" },
    { label: "GitHub", icon: "GH", url: "#", color: "#24292E", bg: "#F0F0F0" },
    { label: "Instagram", icon: "IG", url: "#", color: "#E1306C", bg: "#FCE8F0" },
  ]

  return (
    <section
      id="contact"
      className="py-20 md:py-28"
      style={{ background: 'linear-gradient(180deg, #F9F8F6 0%, #EEE9FF 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section header */}
          <div className="text-center mb-14">
            <div
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
              style={{ background: 'rgba(107,78,255,0.1)', color: '#6B4EFF', fontFamily: "'Outfit', sans-serif" }}
            >
              Get In Touch
            </div>
            <h2
              className="font-black"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#1A1A2E' }}
            >
              Let's Work{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #6B4EFF, #FF6B6B)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Together
              </span>
            </h2>
            <p
              className="mt-3 max-w-md mx-auto text-sm"
              style={{ color: '#6B7280', fontFamily: "'Inter', sans-serif" }}
            >
              Have a project in mind? I'd love to hear about it. Let's create something amazing.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            {/* LEFT — contact info */}
            <div>
              <h3
                className="text-lg font-bold mb-6"
                style={{ color: '#1A1A2E', fontFamily: "'Outfit', sans-serif" }}
              >
                Contact Information
              </h3>

              <div className="space-y-4 mb-8">
                {[
                  { icon: "✉️", label: "Email", value: "arjunmehta.design@gmail.com" },
                  { icon: "📱", label: "Phone", value: "+91 98765 43210" },
                  { icon: "📍", label: "Location", value: "India (Open to Remote)" },
                ].map(item => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ background: 'white', border: '1px solid #F0EDFF' }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p
                        className="text-xs text-gray-400 mb-0.5"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="text-sm font-medium"
                        style={{ color: '#1A1A2E', fontFamily: "'Inter', sans-serif" }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <h3
                className="text-sm font-bold mb-4"
                style={{ color: '#1A1A2E', fontFamily: "'Outfit', sans-serif" }}
              >
                Find Me Online
              </h3>
              <div className="flex flex-wrap gap-3">
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.url}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-transform hover:-translate-y-1"
                    style={{
                      background: s.bg,
                      color: s.color,
                      border: `1px solid ${s.color}20`,
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    <span className="font-bold text-xs">{s.icon}</span>
                    {s.label}
                  </a>
                ))}
              </div>

              {/* Availability sticky note */}
              <div
                className="mt-8 p-4 rounded-xl anim-wiggle"
                style={{ background: '#FFF3A3', transform: 'rotate(-1.5deg)', boxShadow: '3px 3px 10px rgba(0,0,0,0.1)' }}
              >
                <p
                  className="text-sm font-semibold"
                  style={{ color: '#92400E', fontFamily: "'Outfit', sans-serif" }}
                >
                  📅 Currently Available
                </p>
                <p className="text-xs mt-1" style={{ color: '#78350F' }}>
                  Open to full-time roles & freelance projects
                </p>
              </div>
            </div>

            {/* RIGHT — contact form */}
            <div
              className="p-6 md:p-8 rounded-2xl"
              style={{ background: 'white', boxShadow: '0 8px 40px rgba(107,78,255,0.1)', border: '1px solid #F0EDFF' }}
            >
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: '#1A1A2E', fontFamily: "'Outfit', sans-serif" }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-sm text-gray-500">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-xs font-semibold mb-1.5"
                        style={{ color: '#374151', fontFamily: "'Outfit', sans-serif" }}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="form-input w-full px-4 py-2.5 text-sm"
                        style={{ color: '#1A1A2E' }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-semibold mb-1.5"
                        style={{ color: '#374151', fontFamily: "'Outfit', sans-serif" }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="john@company.com"
                        className="form-input w-full px-4 py-2.5 text-sm"
                        style={{ color: '#1A1A2E' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: '#374151', fontFamily: "'Outfit', sans-serif" }}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      placeholder="Project Inquiry / Collaboration"
                      className="form-input w-full px-4 py-2.5 text-sm"
                      style={{ color: '#1A1A2E' }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: '#374151', fontFamily: "'Outfit', sans-serif" }}
                    >
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project..."
                      className="form-input w-full px-4 py-2.5 text-sm resize-none"
                      style={{ color: '#1A1A2E' }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full text-sm btn-primary"
                  >
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== FOOTER =====

function Footer({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <footer
      className="py-10"
      style={{ background: '#1A1A2E', color: 'white' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6B4EFF, #FF6B6B)' }}
            >
              <span className="text-white font-bold text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>KD</span>
            </div>
            <span
              className="font-bold text-white"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Kiran<span style={{ color: '#6B4EFF' }}>.</span>Dev
            </span>
          </button>

          {/* Nav links */}
          <div className="flex items-center gap-6 text-sm" style={{ color: '#9CA3AF', fontFamily: "'Outfit', sans-serif" }}>
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => onNavigate('projects')} className="hover:text-white transition-colors">Projects</button>
            <button
              onClick={() => {
                onNavigate('home')
                setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100)
              }}
              className="hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => {
                onNavigate('home')
                setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100)
              }}
              className="hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Copyright */}
          <p className="text-xs" style={{ color: '#6B7280', fontFamily: "'Inter', sans-serif" }}>
            © 2024 Arjun Mehta. Crafted with 💜
          </p>
        </div>
      </div>
    </footer>
  )
}

// ===== HOME PAGE =====

export default function Home({ onNavigate }: HomeProps) {
  const avatarRef = useRef<HTMLImageElement>(null)

  // avatar scroll state: leftPx=null → CSS centred, number → px from left
  const [avatar, setAvatar] = useState<{
    leftPx: number | null
    position: 'fixed' | 'absolute'
    topPx: number | null
    scale: number
  }>({ leftPx: null, position: 'fixed', topPx: null, scale: 1 })

  useEffect(() => {
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - Math.min(1, t), 3)

    const update = () => {
      const heroEl  = document.getElementById('hero-section')
      const aboutEl = document.getElementById('about')
      const imgEl   = avatarRef.current
      if (!heroEl || !imgEl) return

      const scrollY = window.scrollY
      const heroH = heroEl.offsetHeight
      const avatarW = imgEl.offsetWidth
      const viewportWidth = window.innerWidth

      const centeredLeft = (viewportWidth - avatarW) / 2
      const aboutLeft = Math.max(24, viewportWidth * 0.25 - avatarW / 2)
      const aboutScale = viewportWidth >= 1600 ? 1.10 : 1.2

      const aboutBottom = aboutEl ? aboutEl.offsetTop + aboutEl.offsetHeight : heroH
      const progress = easeOutCubic(scrollY / heroH)
      const inHero = scrollY > 0 && scrollY < heroH

      setAvatar({
        leftPx: scrollY <= 0 ? null : inHero
          ? centeredLeft + (aboutLeft - centeredLeft) * progress
          : aboutLeft,
        position: inHero || scrollY <= 0 ? 'fixed' : 'absolute',
        topPx: inHero || scrollY <= 0 ? null : aboutBottom - imgEl.offsetHeight * aboutScale,
        scale: 1 + progress * (aboutScale - 1),
      })
      // ── Phase 1: slide left while scrolling through hero ──

      // ── Phase 2: stay fixed on the left through most of About ──

      // ── Phase 3: travel out with the final part of About ──
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize',  update)
    // re-run once the avatar image has loaded so offsetWidth is available
    const t = setTimeout(update, 120)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize',  update)
      clearTimeout(t)
    }
  }, [])

  return (
    <main style={{ position: 'relative' }}>
      <HeroSection />
      <AboutSection />
      <RecentProjectsSection onNavigate={onNavigate} />
      <ToolsSection />
      <ContactSection />
      <Footer onNavigate={onNavigate} />

      {/* ── Scroll-driven avatar overlay ── */}
      <img
        ref={avatarRef}
          src={avatarImg}
          alt="Anime-style portrait of the designer"
          style={{
            position: avatar.position,
            bottom: avatar.position === 'fixed' ? 0 : undefined,
            top: avatar.position === 'absolute' ? `${avatar.topPx}px` : 'auto',
            left:      avatar.leftPx !== null ? `${avatar.leftPx}px` : '50%',
            transform: avatar.leftPx !== null
              ? `scale(${avatar.scale})`
              : `translateX(-50%) scale(${avatar.scale})`,
            transformOrigin: 'bottom center',
            width:     'auto',
            pointerEvents: 'none',
            zIndex: 40,
            // only transition opacity — left/transform are driven frame-by-frame
          }}
          className="hero-avatar"
      />
    </main>
  )
}
