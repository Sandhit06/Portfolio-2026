const technologies = [
  { name: "React", icon: "react", category: "Interfaces" },
  { name: "Next.js", icon: "nextdotjs", category: "Full-stack applications" },
  { name: "TypeScript", icon: "typescript", category: "Type-safe development" },
  { name: "Java", icon: "openjdk", category: "Backend" },
  { name: "Spring Boot", icon: "springboot", category: "Services" },
  { name: "Python", icon: "python", category: "AI & data" },
  { name: "Kafka", icon: "apachekafka", category: "Event streaming" },
  { name: "PostgreSQL", icon: "postgresql", category: "Databases" },
  { name: "Docker", icon: "docker", category: "Containers" },
  { name: "GSAP", icon: "gsap", category: "Motion" },
];

export default function TechStack() {
  return (
    <section
      id="tech-stack"
      className="tech-stack section-pad"
      aria-labelledby="stack-title"
    >
      <div className="section-kicker">
        <span className="section-index">05 / TOOLS OF THE TRADE</span>
        <span className="section-index">FROM INTERFACE TO INFRASTRUCTURE</span>
      </div>
      <div className="stack-heading-stage">
        <h2 id="stack-title" className="stack-title">
          <span className="sr-only">Modern tech stack</span>
          {["MODERN", "TECH STACK"].map((line) => (
            <span className="stack-line" aria-hidden="true" key={line}>
              {[...line].map((letter, index) =>
                letter === " " ? (
                  <span className="stack-word-space" key={index} />
                ) : (
                  <span
                    className="stack-letter"
                    key={index}
                    data-stack-letter={letter}
                  >
                    <span>{letter}</span>
                    <span className="stack-letter-copy">{letter}</span>
                  </span>
                ),
              )}
            </span>
          ))}
        </h2>
      </div>
      <p className="stack-label">TOOLS I WORK WITH</p>
      <ul className="stack-grid">
        {technologies.map((technology, index) => (
          <li
            className={`stack-tool${index < 3 ? " stack-tool-featured" : ""}`}
            key={technology.icon}
          >
            <span className="stack-tool-category">{technology.category}</span>
            <img
              src={`/icons/${technology.icon}.svg`}
              alt=""
              width="72"
              height="72"
              loading="lazy"
            />
            <h3>{technology.name}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
}
