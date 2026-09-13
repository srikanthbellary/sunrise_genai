import { CONTACT } from '@/lib/content'

export default function SiteFooter() {
  return (
    <footer className="footer">
      <span className="mono">
        © {new Date().getFullYear()} {CONTACT.company} · {CONTACT.principal}
      </span>
      <span className="mono">Grounding the Autonomous Era</span>
      <span className="mono">
        <a href="/blog/">Blog</a>
        {' · '}
        <a href="/privacy/">Privacy</a>
        {' · '}
        <a href="https://github.com/srikanthbellary/openstinger" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        {' · '}
        <a href="https://openstinger.com" target="_blank" rel="noopener noreferrer">
          openstinger.com
        </a>
        {' · '}
        <a href="https://ingre.ai" target="_blank" rel="noopener noreferrer">
          ingre.ai
        </a>
      </span>
    </footer>
  )
}
