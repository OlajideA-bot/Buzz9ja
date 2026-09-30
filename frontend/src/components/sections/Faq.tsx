import { useState } from 'react'
import { Icon } from '../ui/Icon'
import { Label } from '../ui/Label'

const items = [
  {
    question: 'What is Buzz 9ja?',
    answer:
      "Buzz 9ja is Nigeria's app for discovering events, booking tickets, and connecting with verified vendors. Whether you're a local looking for weekend plans or a visitor exploring Nigeria, we've got you covered.",
  },
  {
    question: 'Is Buzz 9ja free to download?',
    answer:
      'Yes, downloading and browsing events on Buzz 9ja is completely free. You only pay when you purchase a ticket to an event.',
  },
  {
    question: 'How do I find events near me?',
    answer:
      "Open the app and browse events by location or category, or search for something specific. Our smart discovery feed shows you what's happening around you based on your preferences.",
  },
  {
    question: 'How do vendors get verified on Buzz 9ja?',
    answer:
      'Vendors complete a verification process using their NIN (National Identification Number) before they can list events. This ensures all vendors on the platform are trusted and legitimate.',
  },
  {
    question: "Can I use Buzz 9ja if I'm visiting Nigeria from abroad?",
    answer:
      'Yes, Buzz 9ja is a great way for visitors to discover events and experiences while in Nigeria. Simply download the app and start exploring what’s happening around you.',
  },
  {
    question: 'How do I access the vendor/admin portal?',
    answer: 'Vendors can access the web admin portal via the "Vendor login" link in the navigation bar or in the footer of this page.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="faq" id="faq">
      <div className="wrap faq-grid">
        <div className="faq-side">
          <Label reveal>FAQ</Label>
          <h2 className="display" data-reveal style={{ ['--d' as string]: '80ms' }}>
            Frequently asked <em>questions</em>
          </h2>
          <p data-reveal style={{ ['--d' as string]: '140ms' }}>
            Got questions? We&apos;ve got answers.
          </p>
        </div>

        <div className="faq-list" data-reveal>
          {items.map((item, index) => {
            const isOpen = open === index
            return (
              <div key={item.question} className={`faq-item${isOpen ? ' open' : ''}`}>
                <button
                  className="faq-q"
                  id={`faq-q-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <Icon name="plus" />
                </button>
                <div className="faq-a" id={`faq-a-${index}`} role="region" aria-labelledby={`faq-q-${index}`}>
                  <div>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
