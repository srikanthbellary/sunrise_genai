import type { Metadata } from 'next'
import Link from 'next/link'
import BlogShell from '@/components/BlogShell'
import { CONTACT } from '@/lib/content'
import { HEADER_LINE, PRIVACY_DESCRIPTION, PRIVACY_TITLE, socialCard } from '@/lib/site'

export const metadata: Metadata = {
  title: PRIVACY_TITLE,
  description: PRIVACY_DESCRIPTION,
  alternates: { canonical: '/privacy/' },
  ...socialCard({
    title: PRIVACY_TITLE,
    description: PRIVACY_DESCRIPTION,
    url: '/privacy/',
  }),
}

export default function PrivacyPage() {
  return (
    <BlogShell>
      <main className="blog-page">
        <article className="blog-article">
          <div className="section-tag">
            <i />
            <span className="mono">Privacy</span>
          </div>
          <h1 className="blog-title blog-title--post">Privacy</h1>
          <p className="lede blog-lede">{HEADER_LINE}</p>

          <div className="blog-prose">
            <p>
              This page describes how Sunrise Gen AI LLC handles information sent through the contact form and the
              optional chat on this site. The studio is in Florida, United States. To reach us, write to{' '}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or use the{' '}
              <Link href="/#contact-form">site contact form</Link>. We do not publish a street address or a phone
              number.
            </p>

            <h2>Chat with an agent</h2>
            <p>
              When the chat is connected, a question you type — and the short turn history still in that panel — goes to
              a hosted function so a language model can draft a reply about what Sunrise Gen AI builds. Questions you
              send are used to write a reply. This site does not keep a chat archive. We do not sell what you send. The
              function uses your network address only to pace traffic.
            </p>

            <h2>What the form collects</h2>
            <p>When you submit an inquiry, the form sends:</p>
            <ul>
              <li>First name and last name</li>
              <li>Job title / role</li>
              <li>Company</li>
              <li>Phone</li>
              <li>Comment or question</li>
            </ul>
            <p>
              We use that information only to understand the request and reply. Do not send secrets, credentials,
              passwords, or regulated records through the form.
            </p>

            <h2>How it is delivered</h2>
            <p>
              Submissions are forwarded to us by a form-delivery service. That service sees the fields you entered so
              the message can reach the studio. We do not sell the information. We do not use it for advertising.
            </p>

            <h2>How long we keep it</h2>
            <p>
              We keep an inquiry as long as we need it to reply and to hold a minimal record of the conversation. When
              it is no longer needed for that purpose, we delete it.
            </p>

            <h2>Cookies</h2>
            <p>
              This site does not set non-essential cookies and does not run an analytics script. The form does not
              require an account.
            </p>

            <h2>Contact</h2>
            <p>
              Write to <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>, or use the{' '}
              <Link href="/#contact-form">contact form</Link> on this site. Sunrise Gen AI LLC · Florida, United
              States.
            </p>
          </div>
        </article>
      </main>
    </BlogShell>
  )
}
