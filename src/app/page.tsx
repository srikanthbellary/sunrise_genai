import CircuitSun from '@/components/CircuitSun'

function RisingMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 24" width="22" height="16" aria-hidden="true">
      <path
        d="M4 20c2.6-7.2 7.2-11 12-11s9.4 3.8 12 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M16 18V5M8.5 17.5 6 8.5M23.5 17.5 26 8.5M11.5 10.5 10 4M20.5 10.5 22 4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a href="#top" className="wordmark">
          Sunrise Gen <span>AI</span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#product">Product</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <CircuitSun />

          <div className="hero-copy">
            <h1>Production systems for operations and messy knowledge.</h1>
            <p>
              We design production systems for operations and messy knowledge.
              We ship the tools we use.
            </p>
            <p className="place">
              <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M8 1.6c-2.7 0-4.8 2.1-4.8 4.7 0 3.5 4.8 8.1 4.8 8.1s4.8-4.6 4.8-8.1C12.8 3.7 10.7 1.6 8 1.6zm0 6.4A1.7 1.7 0 1 1 8 4.6a1.7 1.7 0 0 1 0 3.4z"
                />
              </svg>
              Wellington, Florida
            </p>
          </div>

          <a className="hero-mail" href="mailto:sbellary@sunrisegenai.com">
            sbellary@sunrisegenai.com
          </a>
          <div className="hero-mark">
            <RisingMark />
          </div>
        </section>

        <section className="band band-work" id="work">
          <div className="wrap">
            <p className="kicker">Work</p>
            <h2>Three kinds of production work.</h2>
            <p className="lead">
              Short engagements that turn unclear inputs into systems people can run.
            </p>
            <div className="offers">
              <article className="offer">
                <h3>Operations</h3>
                <p>
                  Production systems for SRE and operations — incident intelligence,
                  recommended actions, and agents on the tools you already run.
                </p>
              </article>
              <article className="offer">
                <h3>Knowledge</h3>
                <p>
                  Grounded retrieval over tickets, docs, and runbooks. Answers that
                  stay honest when the source material is messy.
                </p>
              </article>
              <article className="offer">
                <h3>Data</h3>
                <p>
                  Schema and mapping across multi-source enterprise data. Pipelines
                  that take unclear inputs to useful outputs.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="band band-product" id="product">
          <div className="wrap product">
            <p className="kicker">Product</p>
            <h2>OpenStinger</h2>
            <p className="lead">
              Portable MCP agent memory. Self-hosted, MIT-licensed, and used in the
              work above.
            </p>
            <p className="product-meta">MIT · Self-hosted · Persistent memory for agents</p>
            <div className="product-links">
              <a href="https://github.com/srikanthbellary/openstinger" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://openstinger.com" target="_blank" rel="noopener noreferrer">
                openstinger.com
              </a>
            </div>
          </div>
        </section>

        <section className="band band-films">
          <div className="wrap">
            <p className="kicker">Craft</p>
            <h2>A few films.</h2>
            <ul className="films">
              <li>
                <span>Apocalyptic Roulette</span>
                <em>Extinction events, one line</em>
              </li>
              <li>
                <span>No Planet For Humans</span>
                <em>Sentient AI, dystopia</em>
              </li>
              <li>
                <span>Arcane Legacy</span>
                <em>RunwayML Gen:48</em>
              </li>
            </ul>
          </div>
        </section>

        <section className="band band-contact" id="contact">
          <div className="wrap contact">
            <p className="kicker">Contact</p>
            <h2>Wellington, Florida.</h2>
            <p className="lead">Sunrise Gen AI LLC. Write or call.</p>
            <p className="contact-lines">
              <a href="mailto:sbellary@sunrisegenai.com">sbellary@sunrisegenai.com</a>
              <a href="tel:+14403408383">440-340-8383</a>
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Sunrise Gen AI LLC</span>
        <RisingMark className="footer-mark" />
      </footer>
    </>
  )
}
