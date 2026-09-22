"use client";
import { useEffect, useRef, useState } from "react";
import Showreel from "./showreel";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  Asterisk,
  Code2,
  Pause,
  Play,
  Copy,
  Check,
} from "lucide-react";
const social = {
  github: "https://github.com/Sandhit06",
  linkedin: "https://www.linkedin.com/in/sandhit-karmakar/",
  email: "sandhitkarmakar@gmail.com",
};
const projects = [
  {
    id: "querylens",
    number: "01",
    title: "QueryLens AI",
    type: "CONVERSATIONAL ANALYTICS",
    description: "Ask your data a better question.",
    detail:
      "A conversational workspace that turns CSV data into answers, charts, and downloadable reports. React meets a FastAPI backend, semantic search, and an LLM reasoning layer.",
    tags: ["React", "Python", "FastAPI", "LangChain"],
    href: "https://querylens.vercel.app/",
    action: "Visit project",
  },
  {
    id: "welth",
    number: "02",
    title: "Welth",
    type: "AI FINANCE PLATFORM",
    description: "A little clarity for your money.",
    detail:
      "A full-stack finance application with intelligent expense categorization, receipt scanning, account management, and automated budgeting workflows.",
    tags: ["Next.js", "React", "Gemini AI", "Tailwind CSS"],
    href: "https://github.com/Sandhit06/AI-Finance-Platform.git",
    action: "Explore source",
  },
];
const skills = [
  {
    number: "01",
    name: "The interface",
    text: "Responsive, accessible experiences with careful attention to the details people feel.",
    tags: "React / Next.js / TypeScript / Flutter",
  },
  {
    number: "02",
    name: "The engine",
    text: "APIs, data pipelines, and reliable services that hold up beyond the happy path.",
    tags: "Java / Spring Boot / Python / Kafka",
  },
  {
    number: "03",
    name: "The intelligence",
    text: "Useful AI features that connect models, real data, and clear product experiences.",
    tags: "LangChain / OpenAI / FastAPI / FAISS",
  },
];
export default function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("home");
  const [motionOff, setMotionOff] = useState(false);
  const [motionReady, setMotionReady] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      let saved = false;
      try {
        saved = localStorage.getItem("sandhit-motion") === "off";
      } catch {}
      setMotionOff(preference.matches || saved);
      setSystemReduced(preference.matches);
      setMotionReady(true);
    };
    update();
    preference.addEventListener("change", update);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-18% 0px -52% 0px" },
    );
    document
      .querySelectorAll<HTMLElement>("[data-nav-section]")
      .forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", update);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);
  useEffect(() => {
    if (
      !root.current ||
      !motionReady ||
      motionOff ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    import("./motion")
      .then(({ setupMotion }) => {
        if (!disposed && root.current) cleanup = setupMotion(root.current);
      })
      .catch(() => {});
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [motionOff, motionReady]);
  function toggleMotion() {
    const next = !motionOff;
    setMotionOff(next);
    try {
      localStorage.setItem("sandhit-motion", next ? "off" : "on");
    } catch {}
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(social.email);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${social.email}`;
    }
  }
  return (
    <div
      ref={root}
      className={motionOff ? "portfolio motion-off" : "portfolio"}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="masthead">
        <a
          className="identity"
          href="#home"
          aria-label="Sandhit Karmakar, home"
        >
          <span className="monogram">
            sk<span>✳</span>
          </span>
          <span>
            Sandhit
            <br />
            Karmakar
          </span>
        </a>
        <div className="header-note">
          <span>Based in India</span>
          <span className="muted">Building for everywhere.</span>
        </div>
        <div className="header-note">
          <span>Currently engineering at</span>
          <span className="company">
            Standard Chartered <ArrowUpRight size={14} />
          </span>
        </div>
        <a className="contact-pill magnetic" href={`mailto:${social.email}`}>
          <span>Let’s talk</span>
          <ArrowUpRight size={18} />
        </a>
      </header>
      <main id="main">
        <div className="hero-scene">
          <section
            id="home"
            className="hero"
            data-nav-section
            aria-labelledby="hero-title"
          >
            <div className="hero-middle">
              <p className="hero-aside intro-item">
                A curious engineer.
                <br />A thoughtful builder.
                <br />
                <span className="muted">Always a work in progress.</span>
              </p>
              <div className="hero-object intro-item">
                <img
                  src="/chrome-asterisk.webp"
                  alt=""
                  width="720"
                  height="480"
                  fetchPriority="high"
                />
                <span className="object-caption">
                  LOGIC, WITH A LITTLE PLAY.
                </span>
              </div>
              <div className="hero-aside hero-right intro-item">
                <span className="eyebrow">MY CORNER OF THE INTERNET</span>
                <p>
                  Full-stack systems.
                  <br />
                  AI-powered products.
                  <br />
                  Interfaces that feel right.
                </p>
                <a className="text-link" href="#work">
                  Explore my work <ArrowDown size={15} />
                </a>
              </div>
            </div>
            <div className="hero-title-wrap">
              <div className="hero-caption">
                <span>THOUGHTFUL BY DESIGN.</span>
                <span>RELIABLE BY ENGINEERING.</span>
                <span>PORTFOLIO — 2026</span>
              </div>
              <h1 id="hero-title" className="hero-title">
                <span className="hero-line">
                  <span>SOFTWARE</span>
                </span>
                <span className="hero-line hero-line-second">
                  <span>
                    ENGINEER<span className="lime-period">.</span>
                  </span>
                  <a
                    href="#work"
                    className="hero-arrow magnetic"
                    aria-label="Explore selected work"
                  >
                    <ArrowDown strokeWidth={1.1} />
                  </a>
                </span>
              </h1>
            </div>
            <div className="hero-foot">
              <span>GOOD THINGS HAPPEN WHEN CURIOSITY MEETS CODE.</span>
              <a href="#about">
                A little more about me <ArrowDown size={14} />
              </a>
            </div>
          </section>
          <Showreel paused={!motionReady || motionOff} />
        </div>
        <section
          id="about"
          className="about section-pad"
          data-nav-section
          aria-labelledby="about-title"
        >
          <div className="section-kicker">
            <span className="section-index">01 / A LITTLE CONTEXT</span>
            <Asterisk size={25} strokeWidth={1.4} />
          </div>
          <div className="about-grid">
            <div className="about-label">
              <span className="mini-tag">HELLO, I’M SANDHIT.</span>
              <p>
                Engineer by training.
                <br />
                Builder by instinct.
              </p>
            </div>
            <div>
              <h2 id="about-title" className="about-statement reveal-words">
                I connect the dots between <em>thoughtful interfaces</em> and
                the systems that make them work.
              </h2>
              <div className="about-details">
                <p>
                  I’m a software engineer at Standard Chartered, working across
                  enterprise banking applications, data workflows, and real-time
                  monitoring. Away from work, I build AI products and explore
                  what makes great software feel simple.
                </p>
                <p>
                  I studied Computer Science with a specialization in AI & ML at
                  VIT Chennai. My favourite part of engineering? Turning a messy
                  problem into something useful, reliable, and a little
                  delightful.
                </p>
              </div>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                More about my journey <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>
        <section
          id="work"
          className="work section-pad"
          data-nav-section
          aria-labelledby="work-title"
        >
          <div className="section-kicker">
            <span className="section-index">02 / SELECTED PROJECTS</span>
            <span className="section-index">IDEA → INTERFACE → IMPACT</span>
          </div>
          <div className="section-heading">
            <h2 id="work-title" className="display-title reveal">
              Made to
              <br />
              <span className="serif-word">make sense.</span>
            </h2>
            <p>
              Personal projects at the intersection
              <br />
              of data, intelligence, and everyday life.
            </p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article
                key={project.id}
                className={`project project-${project.id}`}
              >
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-visual"
                  aria-label={`${project.action}: ${project.title}`}
                >
                  <div className="visual-label">
                    <span>{project.type}</span>
                    <ArrowUpRight size={22} />
                  </div>
                  {project.id === "querylens" ? (
                    <div
                      className="query-preview preview-panel"
                      aria-hidden="true"
                    >
                      <div className="preview-top">
                        <span>
                          <Asterisk size={18} /> querylens
                          <span className="ai-badge">AI</span>
                        </span>
                        <span className="demo-label">INTERFACE CONCEPT</span>
                      </div>
                      <div className="query-body">
                        <span className="preview-eyebrow">
                          YOUR DATA. A NEW PERSPECTIVE.
                        </span>
                        <h3>
                          Less querying.
                          <br />
                          <em>More understanding.</em>
                        </h3>
                        <div className="query-prompt">
                          <span>What’s the story behind my data?</span>
                          <span className="send-icon">
                            <ArrowUp size={15} />
                          </span>
                        </div>
                        <div className="dataset-row">
                          <span className="dataset-icon">CSV</span>
                          <span>Upload a dataset. Start a conversation.</span>
                        </div>
                      </div>
                      <div className="query-answer">
                        <span className="answer-mark">
                          <Asterisk size={20} />
                        </span>
                        <div>
                          <strong>From question to clarity.</strong>
                          <span>
                            Answers, visualizations, and reports in one place.
                          </span>
                        </div>
                        <div className="data-bars">
                          {[28, 44, 35, 62, 53, 79, 68, 92].map((height, i) => (
                            <i key={i} style={{ height: `${height}%` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="finance-preview preview-panel"
                      aria-hidden="true"
                    >
                      <div className="preview-top">
                        <span className="welth-brand">
                          welth<span>✳</span>
                        </span>
                        <span className="demo-label">INTERFACE CONCEPT</span>
                      </div>
                      <div className="finance-body">
                        <span className="preview-eyebrow">
                          A CLEARER PICTURE.
                        </span>
                        <h3>
                          Money made
                          <br />
                          <em>more mindful.</em>
                        </h3>
                        <div className="finance-cards">
                          <div className="balance-card">
                            <span>Your money, in focus</span>
                            <strong>One clear view.</strong>
                            <span>ACCOUNTS + SPENDING + INSIGHTS</span>
                            <div className="balance-line" />
                          </div>
                          <div className="receipt-card">
                            <span className="receipt-icon">↗</span>
                            <strong>
                              Less admin.
                              <br />
                              More living.
                            </strong>
                            <span>AI RECEIPT SCANNING</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <span className="project-hover">
                    {project.action} <ArrowUpRight size={17} />
                  </span>
                </a>
                <div className="project-caption">
                  <div className="project-number">({project.number})</div>
                  <div className="project-copy">
                    <h3>
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.title}
                        <ArrowUpRight size={25} />
                      </a>
                    </h3>
                    <p className="project-one-liner">{project.description}</p>
                    <p className="project-description">{project.detail}</p>
                  </div>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <a
            className="text-link github-link"
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Code2 size={18} /> Find more on GitHub <ArrowUpRight size={18} />
          </a>
        </section>
        <section
          id="experience"
          className="experience section-pad"
          data-nav-section
          aria-labelledby="experience-title"
        >
          <div className="section-kicker">
            <span className="section-index">03 / IN GOOD COMPANY</span>
            <span className="section-index">LEARNING. BUILDING. SHIPPING.</span>
          </div>
          <div className="section-heading">
            <h2 id="experience-title" className="display-title reveal">
              Real work.
              <br />
              <span className="serif-word">Real lessons.</span>
            </h2>
            <p>
              From mobile experiences
              <br />
              to enterprise-scale systems.
            </p>
          </div>
          <div className="experience-list">
            <article className="experience-row reveal">
              <div className="experience-date">2025 — PRESENT</div>
              <div className="experience-main">
                <span className="role-label">SOFTWARE ENGINEER</span>
                <h3>Standard Chartered</h3>
                <p>
                  Building banking applications across Java, Spring Boot, React,
                  and TypeScript. My work spans data quality workflows, API
                  integrations, and real-time ingestion monitoring.
                </p>
                <div className="experience-chips">
                  <span>Enterprise applications</span>
                  <span>Distributed systems</span>
                  <span>Data quality</span>
                </div>
              </div>
              <span className="experience-symbol">↗</span>
            </article>
            <article className="experience-row reveal">
              <div className="experience-date">2023 — 2025</div>
              <div className="experience-main">
                <span className="role-label">SOFTWARE ENGINEER INTERN</span>
                <h3>Canverro</h3>
                <p>
                  Developed Flutter applications, reusable Kotlin components,
                  and secure API integrations. Worked across testing, code
                  reviews, and Agile delivery with a focus on maintainable
                  mobile experiences.
                </p>
                <div className="experience-chips">
                  <span>Mobile development</span>
                  <span>Reusable UI</span>
                  <span>API integration</span>
                </div>
              </div>
              <span className="experience-symbol">↗</span>
            </article>
          </div>
        </section>
        <section
          id="approach"
          className="craft section-pad"
          aria-labelledby="craft-title"
        >
          <div className="section-kicker">
            <span className="section-index">04 / THE WAY I BUILD</span>
            <Asterisk size={25} />
          </div>
          <div className="craft-heading">
            <h2 id="craft-title" className="display-title reveal">
              From the pixels
              <br />
              to the <span className="serif-word">pipelines.</span>
            </h2>
            <p>
              Good software needs both sides
              <br />
              of the screen to work beautifully.
            </p>
          </div>
          <div className="craft-grid">
            {skills.map((skill) => (
              <article className="craft-card reveal" key={skill.number}>
                <div className="craft-card-top">
                  <span>/{skill.number}</span>
                  <Code2 size={23} />
                </div>
                <h3>{skill.name}</h3>
                <p>{skill.text}</p>
                <span className="craft-stack">{skill.tags}</span>
              </article>
            ))}
          </div>
          <div
            className="marquee"
            aria-label="React, TypeScript, Spring Boot, Python, Kafka"
          >
            <div className="marquee-track" aria-hidden="true">
              {[0, 1].map((n) => (
                <span key={n}>
                  REACT <Asterisk /> TYPESCRIPT <Asterisk /> SPRING BOOT{" "}
                  <Asterisk /> PYTHON <Asterisk /> KAFKA <Asterisk />{" "}
                </span>
              ))}
            </div>
          </div>
        </section>
        <footer
          id="contact"
          className="contact section-pad"
          data-nav-section
          aria-labelledby="contact-title"
        >
          <div className="section-kicker">
            <span className="section-index">
              05 / GOOD THINGS START WITH HELLO
            </span>
            <span className="section-index">HAVE SOMETHING IN MIND?</span>
          </div>
          <a className="contact-heading" href={`mailto:${social.email}`}>
            <h2 id="contact-title">
              Let’s build
              <br />
              <span className="serif-word">something good.</span>
            </h2>
            <span className="contact-arrow magnetic">
              <ArrowUpRight strokeWidth={1} />
            </span>
          </a>
          <div className="contact-details">
            <div>
              <p>A role, an idea, or just a conversation.</p>
              <div className="email-row">
                <a href={`mailto:${social.email}`}>{social.email}</a>
                <button
                  onClick={copyEmail}
                  aria-label={copied ? "Email copied" : "Copy email address"}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
                <span className="sr-only" role="status">
                  {copied ? "Email address copied to clipboard" : ""}
                </span>
              </div>
            </div>
            <div className="social-links">
              <a href={social.github} target="_blank" rel="noopener noreferrer">
                <Code2 size={17} /> GitHub <ArrowUpRight size={17} />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowUpRight size={17} /> LinkedIn <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 SANDHIT KARMAKAR</span>
            <span>BUILT WITH INTENT. AND A LITTLE MOTION.</span>
            <a href="#home">
              BACK TO TOP <ArrowUp size={15} />
            </a>
          </div>
        </footer>
      </main>
      <nav className="dock" aria-label="Main navigation">
        <a
          className="dock-brand"
          href="#home"
          aria-label="Sandhit Karmakar, back to top"
        >
          <img src="/memoji.webp" alt="" width="49" height="49" />
        </a>
        <div className="dock-links">
          {[
            { id: "home", label: "Home" },
            { id: "work", label: "Work" },
            { id: "about", label: "About" },
            { id: "contact", label: "Contact" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? "active" : ""}
              aria-current={active === item.id ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
        <button
          className="motion-toggle"
          onClick={toggleMotion}
          disabled={systemReduced}
          aria-label={
            systemReduced
              ? "Animations disabled by device preference"
              : motionOff
                ? "Enable animations and video"
                : "Pause animations and video"
          }
          aria-pressed={motionOff}
          title={
            systemReduced
              ? "Reduced motion is enabled in your device settings"
              : motionOff
                ? "Enable animations and video"
                : "Pause animations and video"
          }
        >
          {motionOff ? <Play size={16} /> : <Pause size={16} />}
        </button>
      </nav>
    </div>
  );
}
