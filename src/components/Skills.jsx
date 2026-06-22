const skillCategories = [
  {
    name: 'Languages',
    skills: ['Python', 'Java', 'C#', 'JavaScript', 'SQL'],
  },
  {
    name: 'Frameworks & libraries',
    skills: ['React', 'Next.js', 'Node.js', '.NET / WPF (MVVM)'],
  },
  {
    name: 'Real-time & data',
    skills: ['WebSockets', 'Server-Sent Events', 'Yjs CRDTs', 'Redis', 'PostgreSQL', 'MongoDB'],
  },
  {
    name: 'Infrastructure',
    skills: ['Docker', 'AWS', 'GCP', 'CI/CD', 'GitHub Actions'],
  },
]

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-head reveal">
          <p className="section-head__label">Skills</p>
        </div>

        <dl className="skills-dl reveal">
          {skillCategories.map((cat) => (
            <div className="skills-dl__row" key={cat.name}>
              <dt className="skills-dl__term">{cat.name}</dt>
              <dd className="skills-dl__desc">{cat.skills.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default Skills
