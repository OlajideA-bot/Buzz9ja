import { Label } from '../ui/Label'

const facts = [
  {
    n: '01',
    title: 'Verified vendors',
    body: 'Every vendor completes NIN-based verification before they list an event.',
  },
  {
    n: '02',
    title: 'Secure ticketing',
    body: 'In-app payments and digital QR access, right on your phone.',
  },
  {
    n: '03',
    title: 'Free to download',
    body: 'Browsing is free. You only pay when you buy a ticket.',
  },
]

export function About() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <Label reveal>About Buzz 9ja</Label>
        <h2 className="display" data-reveal style={{ ['--d' as string]: '80ms' }}>
          Nigeria&apos;s go-to platform for <em>events &amp; experiences</em>
        </h2>
        <div className="about-grid">
          <p className="about-copy" data-reveal>
            <em>Buzz 9ja</em> is Nigeria&apos;s go-to app for discovering events, securing tickets, and
            connecting with trusted vendors, all in one place. Whether you&apos;re looking for what&apos;s
            happening this weekend or planning ahead, Buzz 9ja puts{' '}
            <em>verified events and experiences</em> right at your fingertips.
          </p>
          <ul className="facts">
            {facts.map((fact, index) => (
              <li key={fact.n} data-reveal style={{ ['--d' as string]: `${index * 100}ms` }}>
                <span className="n">{fact.n}</span>
                <h3>{fact.title}</h3>
                <p>{fact.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
