import { useState, useRef, useEffect } from 'react'
import type { Page } from '../App'

interface ProjectsPageProps {
  onNavigate: (page: Page) => void
}

// ===== DATA =====

const categories = ["All", "Websites", "Web Apps", "Mobile Apps", "Graphic Design", "Branding", "Videos", "UI/UX"]

const categoryColors: Record<string, string> = {
  "Websites":      "#4ECDC4",
  "Web Apps":      "#6B4EFF",
  "Mobile Apps":   "#FF6B6B",
  "Graphic Design":"#FF6B6B",
  "Branding":      "#FFB347",
  "Videos":        "#9999FF",
  "UI/UX":         "#6B4EFF",
}

const allProjects = [
  {
    id: 1, title: "LuxeStore E-commerce", category: "Websites",
    duration: "6 weeks · 2023",
    tags: ["Figma", "HTML5", "CSS3", "JavaScript"],
    overview: "A premium e-commerce experience for a luxury fashion brand. The brief called for a layout that felt editorial — full-bleed imagery, generous whitespace, and a checkout flow with zero unnecessary steps. Every interaction was designed to feel considered and unhurried.",
    challenge: "The client's existing store had a 72% cart abandonment rate. Research revealed users felt overwhelmed by choice and distrusted the checkout flow. The redesign focused on progressive disclosure, trust signals, and a streamlined 3-step purchase path.",
    outcome: "Post-launch A/B testing showed a 38% reduction in cart abandonment and a 22% increase in average order value within the first 8 weeks.",
    process: ["Discovery", "User Research", "Wireframes", "UI Design", "Prototype", "Dev Handoff"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#4ECDC4",
  },
  {
    id: 2, title: "TechCorp Corporate Website", category: "Websites",
    duration: "4 weeks · 2023",
    tags: ["Figma", "HTML5", "Bootstrap", "JavaScript"],
    overview: "A full corporate website redesign for a B2B technology company. The goal was to reposition the brand from legacy enterprise software vendor to a modern cloud solutions partner — without alienating their existing client base.",
    challenge: "The old site had 8-second load times, zero mobile optimization, and a navigation structure that buried key product pages 4 levels deep. The redesign had to modernize while preserving SEO equity.",
    outcome: "Organic search traffic increased 45% within 3 months. Mobile bounce rate dropped from 81% to 34%. Average time-on-site increased by 2 minutes.",
    process: ["SEO Audit", "IA Redesign", "Wireframes", "UI Design", "Dev"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#6B4EFF",
  },
  {
    id: 3, title: "Restaurant Discovery Portal", category: "Websites",
    duration: "5 weeks · 2023",
    tags: ["Figma", "React", "Tailwind CSS"],
    overview: "A location-aware restaurant discovery platform with rich filtering, dynamic menus, integrated reservations, and a photo-forward layout that puts food imagery front and centre.",
    challenge: "Competing with established players like Zomato meant the design had to deliver genuine utility fast. Users needed to find, evaluate, and book a table in under 60 seconds.",
    outcome: "User testing sessions averaged 42 seconds from landing to reservation confirmation — beating the 60-second target. App store rating of 4.7 at launch.",
    process: ["Research", "User Flows", "Wireframes", "UI Design", "Prototype"],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#FF6B6B",
  },
  {
    id: 4, title: "TravelNest Booking Website", category: "Websites",
    duration: "7 weeks · 2022",
    tags: ["Figma", "HTML5", "CSS3", "JavaScript"],
    overview: "An immersive travel booking platform featuring full-screen destination photography, a smart multi-criteria search, an itinerary builder, and fluid page transitions designed to evoke the excitement of travel planning.",
    challenge: "Users reported that existing booking platforms felt clinical and stressful. The challenge was to make the planning phase feel as pleasurable as the trip itself.",
    outcome: "NPS score of 71 from beta users. Average session length of 7 minutes, 3× higher than industry average for travel booking sites.",
    process: ["Research", "Moodboarding", "Wireframes", "UI Design", "Dev"],
    image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#FFB347",
  },
  {
    id: 5, title: "EduPlatform Learning Site", category: "Websites",
    duration: "5 weeks · 2022",
    tags: ["Figma", "HTML5", "CSS3", "Bootstrap"],
    overview: "An online learning platform with course discovery, instructor profiles, student dashboards, and an interactive learning path visualiser that shows students exactly where they are in their journey.",
    challenge: "Students frequently dropped off after purchasing a course. Research revealed the onboarding was opaque — learners didn't know what to do next. A redesigned progress system and a structured first-session experience were introduced.",
    outcome: "30-day course completion rate improved from 12% to 41% following the redesign.",
    process: ["Research", "IA", "Wireframes", "UI Design", "Dev"],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#A8E6CF",
  },
  {
    id: 6, title: "Healthcare Provider Website", category: "Websites",
    duration: "6 weeks · 2022",
    tags: ["Figma", "HTML5", "CSS3", "JavaScript"],
    overview: "A multi-department hospital website with a doctor directory, online appointment booking, patient portal, and full WCAG 2.1 AA compliance. Accessibility was not an afterthought — it was the design brief.",
    challenge: "A significant proportion of the hospital's patients were elderly or had limited digital literacy. Every interaction had to work with large text, high contrast, and keyboard-only navigation.",
    outcome: "Accessibility audit score: 97/100. Online appointment bookings increased 3× in the first quarter post-launch.",
    process: ["Accessibility Audit", "User Research", "Wireframes", "UI Design", "Dev"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#4ECDC4",
  },
  {
    id: 7, title: "Photographer Portfolio", category: "Websites",
    duration: "2 weeks · 2022",
    tags: ["Figma", "HTML5", "CSS3"],
    overview: "A minimal, image-first portfolio for a professional photographer — masonry gallery, full-screen lightbox, and a contact integration that doesn't distract from the work.",
    challenge: "The photographer wanted a site that felt invisible — where the only thing a visitor noticed was the photography. No trends, no gradients, no animations for animation's sake.",
    outcome: "Client bookings doubled in the month following the new site launch. Portfolio shortlisted for Awwwards Site of the Day.",
    process: ["Brief", "Moodboard", "Design", "Dev"],
    image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1452802447250-470a88ac82bc?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#1A1A2E",
  },
  {
    id: 8, title: "SANDS B2B Analytics Dashboard", category: "Web Apps",
    duration: "12 weeks · 2023",
    tags: ["Figma", "React", "Tailwind CSS", "Chart.js"],
    overview: "An enterprise analytics dashboard built for Signals & Systems India — real-time data visualisation, CRM integration, role-based access control, and custom report generation for B2B operations teams.",
    challenge: "The existing reporting system required users to export CSV files and open Excel to analyse data. Power users were spending 3+ hours per week on manual reporting. The redesign had to bring all insights into a single live interface without overwhelming non-technical users.",
    outcome: "Reporting time per user dropped from 3 hours/week to 20 minutes. User satisfaction score increased from 3.1 to 4.6 out of 5.",
    process: ["Discovery", "Data Architecture", "User Flows", "Wireframes", "Design System", "Prototype", "Dev Handoff"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#6B4EFF",
  },
  {
    id: 9, title: "HealthTrack Patient Portal", category: "Web Apps",
    duration: "10 weeks · 2023",
    tags: ["Figma", "HTML", "CSS", "JavaScript"],
    overview: "A health monitoring SaaS with patient-facing dashboards, appointment scheduling, telemedicine session management, and HIPAA-compliant UX patterns throughout.",
    challenge: "Healthcare UX must balance information density (clinicians need data fast) with clarity (patients are often stressed when using it). Designing for both user types in a single system required a deeply considered role-based architecture.",
    outcome: "Clinician onboarding time reduced by 60%. Patient portal adoption increased from 18% to 67% of registered users.",
    process: ["Research", "User Personas", "User Flows", "Wireframes", "UI Design", "Usability Testing"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#4ECDC4",
  },
  {
    id: 10, title: "HR Management System", category: "Web Apps",
    duration: "8 weeks · 2022",
    tags: ["Figma", "Adobe XD"],
    overview: "A comprehensive HRMS covering employee onboarding, leave management, performance reviews, payroll integration, and org chart visualisation — all in a unified interface that HR teams actually want to use.",
    challenge: "The client had 6 separate HR tools that didn't talk to each other. Employees filed leave requests in one system, tracked performance in another, and accessed payslips via a third. Consolidation meant mapping 6 separate mental models into one coherent IA.",
    outcome: "Reduced HR admin overhead by 40%. Employee self-service adoption: 89% within 60 days of launch.",
    process: ["System Audit", "IA Design", "User Research", "Design System", "Prototype"],
    image: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#FFB347",
  },
  {
    id: 11, title: "CRM Sales Pipeline", category: "Web Apps",
    duration: "6 weeks · 2022",
    tags: ["Figma", "React", "Tailwind CSS"],
    overview: "A visual CRM with Kanban-style pipeline management, contact enrichment from LinkedIn, automated follow-up reminders, email threading, and real-time team collaboration.",
    challenge: "Sales reps described their existing CRM as 'a place where deals go to die'. The tool had high data-entry friction, poor mobile experience, and no visibility into team activity. The redesign prioritised speed of input and at-a-glance pipeline health.",
    outcome: "Daily active usage increased 3× post-launch. Average deal cycle shortened by 18% in the first quarter.",
    process: ["Research", "User Interviews", "User Flows", "UI Design", "Dev Handoff"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#6B4EFF",
  },
  {
    id: 12, title: "Inventory Management Portal", category: "Web Apps",
    duration: "5 weeks · 2022",
    tags: ["Figma", "HTML5", "CSS3", "JavaScript"],
    overview: "A warehouse inventory system with barcode scanning integration, real-time low-stock alerts, vendor management, purchase order workflows, and auto-reorder logic.",
    challenge: "Stock discrepancies were costing the client ₹4L/month. Manual counts were error-prone and slow. The new system needed to integrate with existing barcode hardware while making stock-takes fast enough that staff would actually do them.",
    outcome: "Stock discrepancy rate dropped 94%. Monthly losses from errors reduced to near zero within 90 days.",
    process: ["Discovery", "Hardware Audit", "Wireframes", "UI Design", "Dev"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#A8E6CF",
  },
  {
    id: 13, title: "Mobile Banking App", category: "Mobile Apps",
    duration: "8 weeks · 2023",
    tags: ["Figma", "Adobe XD", "Principle"],
    overview: "An intuitive mobile banking experience with biometric authentication, smart transaction categorisation, budgeting insights, savings goal tracking, and a design optimised for both iOS and Android.",
    challenge: "Research revealed users checked their balance an average of 6× per day — mostly on the go, under 30 seconds per session. The app needed to surface the most critical information in the fewest possible taps.",
    outcome: "Task completion rate of 96% in usability testing. Time to complete a bank transfer reduced from 2 minutes (competitor benchmark) to 34 seconds.",
    process: ["Research", "Competitive Analysis", "User Flows", "Wireframes", "UI Design", "Prototype", "Handoff"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#FF6B6B",
  },
  {
    id: 14, title: "FitLife Fitness Tracker", category: "Mobile Apps",
    duration: "6 weeks · 2022",
    tags: ["Figma", "ProtoPie"],
    overview: "A gamified fitness app with workout logging, interactive progress charts, friend challenges, AI-suggested training plans, and wearable device sync for Apple Watch and Wear OS.",
    challenge: "Most fitness apps lose 80% of users within the first week. The design had to build a habit loop — reward, progress visibility, and social accountability — before users could fall off.",
    outcome: "D7 retention rate of 54% — more than double the category average of 25%.",
    process: ["Research", "Habit Design", "User Flows", "UI Design", "Micro-interactions", "Prototype"],
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#6B4EFF",
  },
  {
    id: 15, title: "FoodDelight Delivery App", category: "Mobile Apps",
    duration: "5 weeks · 2022",
    tags: ["Figma", "Adobe XD"],
    overview: "A food delivery experience with real-time GPS order tracking, smart restaurant recommendations based on order history, dietary preference filters, and a checkout under 3 taps.",
    challenge: "The client's delivery partner had a 4.2-star app competing against 4.8-star incumbents. User reviews cited confusing navigation and a slow, multi-step checkout as primary complaints.",
    outcome: "App store rating improved from 4.2 to 4.8 within 3 months of redesign launch.",
    process: ["Research", "User Interviews", "User Flows", "UI Design", "Prototype"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#FFB347",
  },
  {
    id: 16, title: "EventSync Manager App", category: "Mobile Apps",
    duration: "4 weeks · 2022",
    tags: ["Figma", "Principle"],
    overview: "An all-in-one event management app for attendees and organisers — ticketing, QR check-in, live schedule with session reminders, speaker bios, networking profiles, and a Q&A system.",
    challenge: "Event apps are typically built for a single event and discarded. The challenge was designing a product generic enough to work across event types while feeling bespoke to each one through theming.",
    outcome: "Deployed at 12 events in the first 6 months. Average attendee app usage: 4.1 sessions per event day.",
    process: ["Discovery", "User Personas", "Wireframes", "UI Design", "Prototype"],
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#4ECDC4",
  },
  {
    id: 17, title: "Social Media Campaign", category: "Graphic Design",
    duration: "Ongoing · 2022–2023",
    tags: ["Photoshop", "Illustrator", "After Effects", "Canva"],
    overview: "100+ social media creatives for a lifestyle brand across Instagram, LinkedIn, and Twitter — consistent visual language, seasonal campaigns, product launches, and motion graphic variants for Reels and Stories.",
    challenge: "The brand had no visual guidelines. Every post looked different. The brief was to create a design system for social content that any team member could execute consistently.",
    outcome: "Follower growth of 340% over 8 months. Average post engagement rate of 6.2% — 4× above the lifestyle brand average.",
    process: ["Brand Discovery", "Style Guide", "Template Design", "Content Calendar", "Production"],
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#FF6B6B",
  },
  {
    id: 18, title: "Corporate Brochure Series", category: "Graphic Design",
    duration: "3 weeks · 2022",
    tags: ["Illustrator", "InDesign", "Photoshop"],
    overview: "15 corporate brochures across multiple product lines — tri-fold, bi-fold, and multi-page formats — print-ready with CMYK profiles, bleed marks, and spot colour specifications.",
    challenge: "All 15 documents needed to feel like a cohesive family while each one clearly distinguished its product line. A modular grid system was designed first so all layouts shared the same structural DNA.",
    outcome: "Print batch delivered on time across 3 international markets. Zero reprints required — first time the client had achieved this.",
    process: ["Brief", "Grid System", "Typography", "Layout", "Pre-press"],
    image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#6B4EFF",
  },
  {
    id: 19, title: "NovaBrand Identity System", category: "Branding",
    duration: "5 weeks · 2023",
    tags: ["Illustrator", "Photoshop", "InDesign"],
    overview: "Complete visual identity for a B2B tech startup — logomark, wordmark, colour system, type hierarchy, brand voice guidelines, business cards, email signatures, presentation templates, and a 48-page brand book.",
    challenge: "The founders wanted to appear established and credible to enterprise clients while being genuinely approachable to SMB clients. These are usually opposing positioning stances — the identity had to live in the tension between them.",
    outcome: "Brand launched at a major industry conference. 3 enterprise pilot enquiries received within the first week of launch.",
    process: ["Discovery", "Competitive Positioning", "Concept Development", "Identity Design", "Brand Book"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#FFB347",
  },
  {
    id: 20, title: "Artisan Café Rebrand", category: "Branding",
    duration: "4 weeks · 2022",
    tags: ["Illustrator", "Photoshop"],
    overview: "Full rebrand for a 3-location artisan café chain — new logo system, cup and packaging design, menu redesign, signage specs, takeaway bag design, and a social media template kit.",
    challenge: "The original brand looked indistinguishable from any independent café. The redesign needed to build a recognisable identity that could scale to 15 locations without losing its handcrafted character.",
    outcome: "Brand recognition in customer surveys increased from 23% to 71% within 6 months. Franchise enquiries received for the first time in the company's 7-year history.",
    process: ["Brand Audit", "Concept", "Identity Design", "Packaging", "Signage", "Rollout"],
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#FF6B6B",
  },
  {
    id: 21, title: "Product Launch Video", category: "Videos",
    duration: "2 weeks · 2023",
    tags: ["Premiere Pro", "After Effects", "Photoshop"],
    overview: "A 90-second product launch video with kinetic typography, brand animations, custom motion graphics, colour-graded footage, and a professional sound design pass — delivered in 4K for web and broadcast.",
    challenge: "The client had a 2-week window between product photography delivery and the public launch event. Full post-production in 14 days with 3 rounds of revisions built in.",
    outcome: "Delivered on day 13. Video reached 120K organic views on LinkedIn in the first 48 hours.",
    process: ["Script", "Storyboard", "Motion Design", "Edit", "Sound Design", "Colour Grade"],
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#9999FF",
  },
  {
    id: 22, title: "Corporate Brand Film", category: "Videos",
    duration: "3 weeks · 2022",
    tags: ["Premiere Pro", "After Effects"],
    overview: "A 4-minute corporate identity film — company story, team highlights, product showcase, client testimonials, and custom motion graphics throughout. Delivered in multiple aspect ratios for web, LinkedIn, and conference display.",
    challenge: "Filming was completed before the design brief was finalised, leaving a mix of footage that didn't tell a coherent story. The edit had to construct a narrative from existing assets alone.",
    outcome: "Used as the hero video at the client's annual conference (1,200 attendees) and embedded on their homepage. Website conversions increased 28% in the following month.",
    process: ["Concept", "Rough Cut", "Motion Graphics", "Fine Cut", "Sound Mix", "Delivery"],
    image: "https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#6B4EFF",
  },
  {
    id: 23, title: "Nebula UI Design System", category: "UI/UX",
    duration: "10 weeks · 2023",
    tags: ["Figma", "Storybook", "React"],
    overview: "A comprehensive design system with 80+ components, a full token set (colour, spacing, typography, elevation, motion), accessibility documentation, interactive Storybook, and a Figma plugin for token management.",
    challenge: "The team had 4 designers and 12 developers producing inconsistent UIs across 3 products. Components were being rebuilt from scratch every sprint. A system was needed that would genuinely be adopted — not just documented.",
    outcome: "Component reuse rate reached 92% within 2 sprints of rollout. Designer–developer handoff time reduced by 65%.",
    process: ["Audit", "Token Architecture", "Component Design", "Documentation", "Storybook", "Adoption Training"],
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#6B4EFF",
  },
  {
    id: 24, title: "B2B Onboarding UX Research", category: "UI/UX",
    duration: "4 weeks · 2022",
    tags: ["Figma", "Maze", "Hotjar"],
    overview: "An end-to-end UX research study on B2B SaaS onboarding — 18 user interviews, moderated usability testing with 12 participants, heatmap analysis across 3 months of Hotjar data, and a redesigned onboarding flow.",
    challenge: "The client's SaaS product had a 67% drop-off during the 7-day free trial. The research had to identify whether this was a product, onboarding, or market fit problem — and then solve it.",
    outcome: "Research identified 4 critical drop-off points. Redesigned onboarding reduced trial-to-paid conversion drop-off by 38%. Monthly recurring revenue increased 19% in the quarter following implementation.",
    process: ["Research Plan", "User Interviews", "Usability Testing", "Data Analysis", "Redesign", "A/B Test"],
    image: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#FF6B6B",
  },
]

// ===== MAIN COMPONENT =====

export default function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedId, setSelectedId] = useState(allProjects[0].id)
  const [mobileOpen, setMobileOpen] = useState(false)
  const detailRef = useRef<HTMLDivElement>(null)

  const counts: Record<string, number> = { All: allProjects.length }
  allProjects.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1 })

  const filtered = activeCategory === "All" ? allProjects : allProjects.filter(p => p.category === activeCategory)

  useEffect(() => {
    if (filtered.length > 0 && !filtered.find(p => p.id === selectedId)) {
      setSelectedId(filtered[0].id)
      detailRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [activeCategory, filtered, selectedId])

  const selected = allProjects.find(p => p.id === selectedId) ?? allProjects[0]

  const handleSelect = (id: number) => {
    setSelectedId(id)
    setMobileOpen(false)
    detailRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
  }

  return (
    <div
      className="flex flex-col"
      style={{ height: '100vh', paddingTop: '64px', backgroundColor: '#F9F8F6', overflow: 'hidden' }}
    >
      {/* ── MOBILE: dropdown trigger bar ── */}
      <div
        className="md:hidden shrink-0 flex items-center gap-3 px-4 py-3"
        style={{ background: 'white', borderBottom: '1px solid rgba(107,78,255,0.1)' }}
      >
        {/* current project label */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Viewing
          </p>
          <p className="text-sm font-semibold truncate" style={{ color: '#1A1A2E', fontFamily: "'Outfit', sans-serif" }}>
            {selected.title}
          </p>
        </div>
        {/* open/close button */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
          style={{
            background: mobileOpen ? '#6B4EFF' : 'rgba(107,78,255,0.08)',
            color: mobileOpen ? 'white' : '#6B4EFF',
            fontFamily: "'Outfit', sans-serif",
            border: '1px solid rgba(107,78,255,0.2)',
          }}
        >
          {mobileOpen ? 'Close' : 'Browse'}
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            style={{ transform: mobileOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── MOBILE: dropdown panel ── */}
      <div
        className="md:hidden shrink-0 overflow-y-auto no-scrollbar"
        style={{
          maxHeight: mobileOpen ? '55vh' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
          background: 'white',
          borderBottom: mobileOpen ? '1px solid rgba(107,78,255,0.12)' : 'none',
          zIndex: 20,
        }}
      >
        {/* Category filters inside dropdown */}
        <div
          className="px-4 pt-3 pb-2 flex flex-wrap gap-2"
          style={{ borderBottom: '1px solid rgba(107,78,255,0.08)' }}
        >
          {categories.map(cat => {
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  background: active ? '#6B4EFF' : 'rgba(107,78,255,0.07)',
                  color: active ? 'white' : '#6B4EFF',
                  border: active ? 'none' : '1px solid rgba(107,78,255,0.18)',
                  boxShadow: active ? '0 3px 10px rgba(107,78,255,0.28)' : 'none',
                }}
              >
                {cat}
                <span
                  className="text-[9px] px-1 py-0.5 rounded-full"
                  style={{
                    background: active ? 'rgba(255,255,255,0.25)' : 'rgba(107,78,255,0.12)',
                    color: active ? 'white' : '#6B4EFF',
                  }}
                >
                  {counts[cat] ?? 0}
                </span>
              </button>
            )
          })}
        </div>

        {/* Project list inside dropdown */}
        {filtered.map((project, idx) => {
          const isActive = project.id === selectedId
          const catColor = categoryColors[project.category] ?? '#6B4EFF'
          return (
            <button
              key={project.id}
              onClick={() => handleSelect(project.id)}
              className="w-full text-left flex items-center gap-3 px-4 py-3 relative transition-colors"
              style={{
                background: isActive ? 'rgba(107,78,255,0.06)' : 'transparent',
                borderBottom: '1px solid rgba(107,78,255,0.06)',
              }}
            >
              {isActive && (
                <span className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r" style={{ background: '#6B4EFF' }} />
              )}
              <span
                className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold"
                style={{
                  background: isActive ? '#6B4EFF' : 'rgba(107,78,255,0.08)',
                  color: isActive ? 'white' : '#9CA3AF',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: isActive ? '#1A1A2E' : '#374151', fontFamily: "'Outfit', sans-serif" }}>
                  {project.title}
                </p>
                <span
                  className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mt-0.5"
                  style={{ background: `${catColor}18`, color: catColor, fontFamily: "'Outfit', sans-serif" }}
                >
                  {project.category}
                </span>
              </div>
              {isActive && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="#6B4EFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          )
        })}
      </div>

      {/* ── DESKTOP: 30/70 split ── */}
      <div className="flex flex-1 min-h-0">

        {/* ══ LEFT SIDEBAR (desktop only, 30%) ══ */}
        <aside
          className="hidden md:flex shrink-0 flex-col"
          style={{
            width: '30%',
            minWidth: '220px',
            maxWidth: '320px',
            borderRight: '1px solid rgba(107,78,255,0.1)',
            background: 'white',
          }}
        >
          {/* ── Category filter section ── */}
          <div
            className="shrink-0 px-4 pt-4 pb-3"
            style={{ borderBottom: '1px solid rgba(107,78,255,0.1)' }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-3"
              style={{ color: '#9CA3AF', fontFamily: "'Outfit', sans-serif" }}
            >
              Filter by Category
            </p>
            <div className="space-y-1">
              {categories.map(cat => {
                const active = activeCategory === cat
                const catColor = categoryColors[cat] ?? '#6B4EFF'
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 text-left"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      background: active ? '#6B4EFF' : 'transparent',
                      color: active ? 'white' : '#4B5563',
                    }}
                  >
                    <span className="flex items-center gap-2">
                      {cat !== 'All' && (
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ background: active ? 'rgba(255,255,255,0.6)' : catColor }}
                        />
                      )}
                      {cat}
                    </span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full shrink-0"
                      style={{
                        background: active ? 'rgba(255,255,255,0.22)' : 'rgba(107,78,255,0.09)',
                        color: active ? 'white' : '#6B4EFF',
                      }}
                    >
                      {counts[cat] ?? 0}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Project list ── */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <span className="text-3xl mb-3">🔍</span>
                <p className="text-sm font-semibold" style={{ color: '#1A1A2E', fontFamily: "'Outfit', sans-serif" }}>
                  No projects here yet
                </p>
              </div>
            )}

            {filtered.map((project, idx) => {
              const isActive = project.id === selectedId
              const catColor = categoryColors[project.category] ?? '#6B4EFF'
              return (
                <button
                  key={project.id}
                  onClick={() => handleSelect(project.id)}
                  className="w-full text-left flex items-start gap-3 px-4 py-3.5 transition-all duration-150 relative"
                  style={{
                    background: isActive ? 'rgba(107,78,255,0.06)' : 'transparent',
                    borderBottom: '1px solid rgba(107,78,255,0.07)',
                  }}
                >
                  {isActive && (
                    <span
                      className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
                      style={{ background: '#6B4EFF' }}
                    />
                  )}
                  <span
                    className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold mt-0.5"
                    style={{
                      background: isActive ? '#6B4EFF' : 'rgba(107,78,255,0.08)',
                      color: isActive ? 'white' : '#9CA3AF',
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs font-semibold leading-snug truncate"
                      style={{ color: isActive ? '#1A1A2E' : '#374151', fontFamily: "'Outfit', sans-serif" }}
                    >
                      {project.title}
                    </p>
                    <span
                      className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ background: `${catColor}18`, color: catColor, fontFamily: "'Outfit', sans-serif" }}
                    >
                      {project.category}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </aside>

        {/* ══ RIGHT DETAIL PANEL ══ */}
        <div
          ref={detailRef}
          className="flex-1 overflow-y-auto no-scrollbar"
          style={{ background: '#F9F8F6' }}
          key={selected.id}
        >
          <ProjectDetail project={selected} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  )
}

// ===== DETAIL PANEL =====

function ProjectDetail({
  project,
  onNavigate,
}: {
  project: typeof allProjects[0]
  onNavigate: (p: Page) => void
}) {
  const catColor = categoryColors[project.category] ?? '#6B4EFF'

  // simple fade-in on mount keyed by project id
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(false)
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [project.id])

  return (
    <div
      className="transition-opacity duration-300"
      style={{ opacity: mounted ? 1 : 0, minHeight: '100%' }}
    >
      {/* ── Hero image ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: '280px', background: '#EEE9FF' }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(26,26,46,0.55) 0%, transparent 60%)' }}
        />
        {/* Category chip */}
        <span
          className="absolute top-5 left-6 px-3 py-1 rounded-full text-xs font-bold text-white"
          style={{ background: catColor, fontFamily: "'Outfit', sans-serif", boxShadow: `0 2px 10px ${catColor}60` }}
        >
          {project.category}
        </span>
        {/* Title on image */}
        <div className="absolute bottom-5 left-6 right-6">
          <h1
            className="font-black leading-tight text-white"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
          >
            {project.title}
          </h1>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="px-6 md:px-8 py-7 space-y-8">

        {/* ── Meta row: duration + tags ── */}
        <div className="flex flex-wrap items-center gap-4">
          <div
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
            style={{ background: 'white', border: '1px solid #F0EDFF', boxShadow: '0 2px 8px rgba(107,78,255,0.06)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="2" width="12" height="11" rx="2" stroke="#6B4EFF" strokeWidth="1.2" />
              <line x1="4" y1="1" x2="4" y2="4" stroke="#6B4EFF" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="10" y1="1" x2="10" y2="4" stroke="#6B4EFF" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="1" y1="6" x2="13" y2="6" stroke="#6B4EFF" strokeWidth="1.2" />
            </svg>
            <span className="text-xs font-semibold" style={{ color: '#6B4EFF', fontFamily: "'Outfit', sans-serif" }}>
              {project.duration}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(t => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg text-xs font-medium"
                style={{
                  background: 'rgba(107,78,255,0.07)',
                  color: '#6B4EFF',
                  border: '1px solid rgba(107,78,255,0.16)',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Overview ── */}
        <Section label="Overview" icon="📋" color={catColor}>
          <p className="text-sm leading-relaxed" style={{ color: '#4B5563', fontFamily: "'Inter', sans-serif" }}>
            {project.overview}
          </p>
        </Section>

        {/* ── Design Process ── */}
        <Section label="Design Process" icon="🔄" color={catColor}>
          <div className="flex flex-wrap gap-2 items-center">
            {project.process.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
                  style={{
                    background: `${catColor}12`,
                    border: `1px solid ${catColor}30`,
                  }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0"
                    style={{ background: catColor, fontFamily: "'Outfit', sans-serif" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: catColor, fontFamily: "'Outfit', sans-serif" }}>
                    {step}
                  </span>
                </div>
                {i < project.process.length - 1 && (
                  <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                    <path d="M1 4h12M10 1l3 3-3 3" stroke={catColor} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* ── Design Showcase ── */}
        <Section label="Design Showcase" icon="🖼️" color={catColor}>
          {project.screens.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Main image */}
              <div
                className="overflow-hidden rounded-2xl col-span-full sm:col-span-1"
                style={{ background: '#EEE9FF', aspectRatio: '16/9' }}
              >
                <img
                  src={project.image}
                  alt={`${project.title} — main screen`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              {project.screens.map((src, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl"
                  style={{ background: '#EEE9FF', aspectRatio: '16/9' }}
                >
                  <img
                    src={src}
                    alt={`${project.title} — screen ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className="overflow-hidden rounded-2xl col-span-full"
                style={{ background: '#EEE9FF', aspectRatio: '21/9' }}
              >
                <img
                  src={project.image}
                  alt={`${project.title} — main screen`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          )}
        </Section>

        {/* ── Case Study ── */}
        <Section label="Case Study" icon="📖" color={catColor}>
          <div className="space-y-5">
            <CaseBlock
              title="The Challenge"
              color={catColor}
              icon="⚡"
              body={project.challenge}
            />
            <CaseBlock
              title="Outcome"
              color={catColor}
              icon="🎯"
              body={project.outcome}
              highlight
            />
          </div>
        </Section>

        {/* ── Footer CTA ── */}
        <div
          className="flex items-center justify-between py-6 px-6 rounded-2xl mt-2"
          style={{ background: `${catColor}0E`, border: `1px solid ${catColor}25` }}
        >
          <div>
            <p
              className="font-bold text-sm"
              style={{ color: '#1A1A2E', fontFamily: "'Outfit', sans-serif" }}
            >
              Liked this project?
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#6B7280', fontFamily: "'Inter', sans-serif" }}>
              Let's build something great together.
            </p>
          </div>
          <button
            onClick={() => {
              onNavigate('home')
              setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 200)
            }}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-white shrink-0"
            style={{ background: catColor, fontFamily: "'Outfit', sans-serif", boxShadow: `0 4px 14px ${catColor}50` }}
          >
            Hire Me →
          </button>
        </div>

        {/* bottom breathing room */}
        <div className="h-6" />
      </div>
    </div>
  )
}

// ===== HELPERS =====

function Section({
  label,
  icon,
  color,
  children,
}: {
  label: string
  icon: string
  color: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-4">
        <span className="text-base">{icon}</span>
        <h2
          className="font-bold text-sm"
          style={{ color: '#1A1A2E', fontFamily: "'Outfit', sans-serif", letterSpacing: '0.03em' }}
        >
          {label}
        </h2>
        <div
          className="flex-1 h-px"
          style={{ background: `${color}25` }}
        />
      </div>
      {children}
    </div>
  )
}

function CaseBlock({
  title,
  icon,
  body,
  color,
  highlight = false,
}: {
  title: string
  icon: string
  body: string
  color: string
  highlight?: boolean
}) {
  return (
    <div
      className="p-4 rounded-xl"
      style={{
        background: highlight ? `${color}0D` : 'white',
        border: highlight ? `1px solid ${color}30` : '1px solid #F0EDFF',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm">{icon}</span>
        <h3
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: highlight ? color : '#9CA3AF', fontFamily: "'Outfit', sans-serif" }}
        >
          {title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: '#4B5563', fontFamily: "'Inter', sans-serif" }}>
        {body}
      </p>
    </div>
  )
}
