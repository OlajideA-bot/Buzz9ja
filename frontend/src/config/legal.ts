export type LegalListItem = {
  label?: string
  text: string
}

export type LegalDefItem = {
  term: string
  text: string
}

export type LegalBlock =
  | { kind: 'p'; text: string }
  | { kind: 'list'; items: LegalListItem[] }
  | { kind: 'definitions'; items: LegalDefItem[] }

export type LegalSubsection = {
  kind: 'subsection'
  id: string
  number: string
  title: string
  blocks: LegalBlock[]
}

export type LegalSection = {
  kind: 'section'
  id: string
  number: string
  title: string
  blocks: LegalBlock[]
  subsections: LegalSubsection[]
}

export type LegalPartNode = {
  kind: 'part'
  title: string
  blocks: LegalBlock[]
}

export type LegalIntroNode = {
  kind: 'intro'
  title: string
  blocks: LegalBlock[]
}

export type LegalNode = LegalPartNode | LegalIntroNode | LegalSection

export type LegalDocument = {
  name: string
  route: string
  pageTitle: string
  metaLine: string
  nodes: LegalNode[]
  sections: LegalSection[]
  footerLines: string[]
}

function sectionId(number: string): string {
  const match = /^C(\d+)$/i.exec(number)
  return match ? `section-c${match[1]}` : `section-${number}`
}

function subsectionId(number: string): string {
  return `section-${number.replace('.', '-')}`
}

function splitListItem(raw: string): LegalListItem {
  const index = raw.indexOf(':')
  if (index === -1) return { text: raw.trim() }
  const label = raw.slice(0, index).trim()
  const text = raw.slice(index + 1).trim()
  if (!label || !text) return { text: raw.trim() }
  return { label, text }
}

function splitDefItem(raw: string): LegalDefItem {
  const index = raw.indexOf('|')
  const term = raw.slice(0, index).trim()
  const text = raw.slice(index + 1).trim()
  return { term, text }
}

function parseLegalDocument(raw: string): LegalDocument {
  const lines = raw.split('\n')

  let name = ''
  let route = ''
  let pageTitle = ''
  let metaLine = ''
  const nodes: LegalNode[] = []
  const sections: LegalSection[] = []
  const footerLines: string[] = []

  let currentPart: LegalPartNode | null = null
  let currentIntro: LegalIntroNode | null = null
  let currentSection: LegalSection | null = null
  let currentSubsection: LegalSubsection | null = null
  let pendingListItems: LegalListItem[] | null = null
  let pendingDefItems: LegalDefItem[] | null = null

  const flushPending = () => {
    const target = currentSubsection ?? currentSection ?? currentPart ?? currentIntro
    if (!target) {
      pendingListItems = null
      pendingDefItems = null
      return
    }
    if (pendingListItems) {
      target.blocks.push({ kind: 'list', items: pendingListItems })
      pendingListItems = null
    }
    if (pendingDefItems) {
      target.blocks.push({ kind: 'definitions', items: pendingDefItems })
      pendingDefItems = null
    }
  }

  const pushParagraph = (text: string) => {
    flushPending()
    const target = currentSubsection ?? currentSection ?? currentPart ?? currentIntro
    target?.blocks.push({ kind: 'p', text })
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) continue

    if (line.startsWith('DOCUMENT:')) {
      name = line.slice('DOCUMENT:'.length).trim()
      continue
    }
    if (line.startsWith('ROUTE:')) {
      route = line.slice('ROUTE:'.length).trim()
      continue
    }
    if (line.startsWith('PAGE TITLE:')) {
      pageTitle = line.slice('PAGE TITLE:'.length).trim()
      continue
    }
    if (line.startsWith('META:')) {
      metaLine = line.slice('META:'.length).trim()
      continue
    }
    if (line === 'INTRODUCTION') {
      flushPending()
      currentPart = null
      currentSection = null
      currentSubsection = null
      currentIntro = { kind: 'intro', title: 'Introduction', blocks: [] }
      nodes.push(currentIntro)
      continue
    }
    if (line.startsWith('PART:')) {
      flushPending()
      currentIntro = null
      currentSection = null
      currentSubsection = null
      currentPart = { kind: 'part', title: line.slice('PART:'.length).trim(), blocks: [] }
      nodes.push(currentPart)
      continue
    }
    if (line.startsWith('SECTION')) {
      flushPending()
      currentIntro = null
      currentSubsection = null
      const match = /^SECTION\s+(\S+):\s*(.+)$/.exec(line)
      if (!match) continue
      const number = match[1] ?? ''
      const title = match[2] ?? ''
      currentSection = {
        kind: 'section',
        id: sectionId(number),
        number,
        title,
        blocks: [],
        subsections: [],
      }
      const section = currentSection
      nodes.push(section)
      sections.push(section)
      continue
    }
    if (line.startsWith('SUB')) {
      flushPending()
      const match = /^SUB\s+(\S+):\s*(.+)$/.exec(line)
      if (!match || !currentSection) continue
      const number = match[1] ?? ''
      const title = match[2] ?? ''
      const subsection: LegalSubsection = {
        kind: 'subsection',
        id: subsectionId(number),
        number,
        title,
        blocks: [],
      }
      currentSection.subsections.push(subsection)
      currentSubsection = subsection
      continue
    }
    if (line.startsWith('P:')) {
      pushParagraph(line.slice('P:'.length).trim())
      continue
    }
    if (line.startsWith('LI:')) {
      if (pendingDefItems) flushPending()
      if (!pendingListItems) pendingListItems = []
      pendingListItems.push(splitListItem(line.slice('LI:'.length).trim()))
      continue
    }
    if (line.startsWith('DEF:')) {
      if (pendingListItems) flushPending()
      if (!pendingDefItems) pendingDefItems = []
      pendingDefItems.push(splitDefItem(line.slice('DEF:'.length).trim()))
      continue
    }
    if (line.startsWith('FOOTER:')) {
      flushPending()
      footerLines.push(line.slice('FOOTER:'.length).trim())
      continue
    }
  }

  flushPending()

  return { name, route, pageTitle, metaLine, nodes, sections, footerLines }
}

const RAW_TERMS = `
DOCUMENT: Terms
ROUTE: /terms
PAGE TITLE: Terms and Conditions
META: Effective Date: September 2026 | Version 1.0

INTRODUCTION
P: Welcome to Buzz9ja. These Terms and Conditions, together with our Privacy Policy set out below, govern your access to and use of the Buzz9ja mobile and web application ("the App", "our Platform"). Please read them carefully before using the App.
P: Buzz9ja is a digital discovery platform that connects visitors with places of interest across Nigeria and Africa, and provides businesses and vendors with an advertising channel to promote their products, services, and locations to a targeted, engaged audience.
P: By downloading, registering, or using the App in any way, you confirm that you have read, understood, and agreed to be bound by these Terms. If you do not agree, you must not use the App.
P: Buzz9ja App is operated by Buzz9ja ("Buzz9ja", "we", "us", "our"), registered in Nigeria.

PART: PART A: TERMS AND CONDITIONS

SECTION 1: Definitions
P: The following definitions apply throughout these Terms:
DEF: App / Platform | The Buzz9ja mobile application and web platform, including all features, content, and services accessible through it.
DEF: User | Any person who accesses or uses the App, whether as a visitor ("Visitor") or as a registered account holder.
DEF: Visitor | A user who browses the App to discover places of interest, events, and vendor listings.
DEF: Vendor | A business, individual trader, or organisation that subscribes to a paid advertising or listing package on the App.
DEF: Listing | A profile, page, or advertisement published on the App by a Vendor describing their place of interest, product, service, or event.
DEF: Content | All text, images, videos, reviews, ratings, and other material uploaded, submitted, or made available on the App by any party.
DEF: Subscription | A paid plan purchased by a Vendor to access advertising, promoted listing, or premium placement features on the App.

SECTION 2: Eligibility
P: By using the App, you confirm that:
LI: You are at least 18 years of age, or have the consent of a parent or guardian if you are between 13 and 17 years old.
LI: You have the legal capacity to enter into a binding agreement under applicable law.
LI: You are not prohibited from using the App under any applicable law or regulation.
P: Buzz9ja does not knowingly collect data from or market to children under the age of 13. If we become aware that a user under 13 has registered, we will delete the account immediately.

SECTION 3: Account Registration
P: To access certain features of the App, including the ability to save favourites, submit reviews, or create Vendor listings, you must create an account. You agree to:
LI: Provide accurate, current, and complete information during registration.
LI: Keep your login credentials confidential and not share them with any third party.
LI: Notify us immediately at support@buzz-9ja.com if you suspect unauthorised access to your account.
LI: Take responsibility for all activity that occurs under your account.
P: Buzz9ja reserves the right to suspend or terminate any account that we reasonably believe has been compromised, used fraudulently, or operated in breach of these Terms.

SECTION 4: Use of the App: Visitors
P: As a Visitor, you may use the App to:
LI: Browse, search, and discover places of interest, events, and vendor listings across Nigeria and Africa.
LI: Save, share, and rate listings.
LI: Submit reviews and feedback on places you have visited.
LI: Access maps, directions, and related third-party services integrated within the App.
P: You agree that you will not:
LI: Submit false, misleading, or defamatory reviews or content.
LI: Impersonate any person, business, or organisation.
LI: Use automated tools, bots, or scrapers to extract data from the App.
LI: Attempt to interfere with, disrupt, or gain unauthorised access to the App or its underlying systems.
LI: Use the App for any unlawful purpose or in violation of any applicable Nigerian or international law.

SECTION 5: Vendor Terms: Advertising and Paid Listings
SUB 5.1: Vendor Registration and Eligibility
P: To advertise on Buzz9ja, you must register as a Vendor and subscribe to one of our available listing or advertising packages. By registering as a Vendor, you confirm that:
LI: You are a duly registered business, sole trader, or organisation operating lawfully under applicable Nigerian law.
LI: The business, location, product, or service you are advertising genuinely exists and operates as described.
LI: You have the authority to enter into this agreement on behalf of the business you represent.
LI: All information submitted in your listing is accurate, current, and not misleading.
SUB 5.2: Listing Content Standards
P: All Vendor content submitted to the App must comply with the following standards:
LI: Accurate and verifiable: listings must reflect the actual location, product, service, or experience offered.
LI: Legal: content must not promote illegal activities, controlled substances, or services prohibited under Nigerian law.
LI: Respectful: content must not be defamatory, discriminatory, offensive, sexually explicit, or harmful to any individual or group.
LI: Original: you must own or have the right to use all images, text, logos, and media submitted in your listing.
P: Buzz9ja reserves the right to reject, edit, suspend, or remove any listing that we determine, at our sole discretion, violates these standards or is otherwise inappropriate for the platform, without prior notice and without liability to the Vendor.
SUB 5.3: Subscription, Payment, and Fees
P: Vendor advertising and listing packages are offered on a subscription basis. The following terms apply:
LI: All fees are as published on the Buzz9ja website or App at the time of subscription and are payable in Nigerian Naira (₦) unless otherwise agreed.
LI: Payment is due in advance of the subscription period. Subscriptions will not activate until payment is confirmed.
LI: Fees are non-refundable once a listing has been published and the subscription period has commenced, except where Buzz9ja is in material breach of these Terms.
LI: Buzz9ja reserves the right to revise its pricing at any time. We will provide at least 30 days' notice of any price change before it affects active subscriptions.
LI: Failure to pay outstanding fees may result in the suspension or removal of your listing without liability to Buzz9ja.
SUB 5.4: Vendor Responsibility and Liability
P: As a Vendor, you are solely responsible for:
LI: The accuracy and legality of all content published in your listing.
LI: Fulfilling any products, services, or experiences advertised to visitors who rely on your listing.
LI: Complying with all applicable consumer protection, advertising, and trading laws in Nigeria.
LI: Any claims, losses, or complaints arising from your listing or from visitor interactions with your business.
P: Buzz9ja acts as a platform intermediary only. We are not a party to any transaction between Visitors and Vendors and accept no liability for the quality, availability, or legality of any product or service advertised on the App.
SUB 5.5: Suspension and Termination of Vendor Accounts
P: Buzz9ja may suspend or permanently terminate a Vendor account if:
LI: The Vendor submits false or misleading content.
LI: The Vendor's listing generates repeated, credible complaints from Visitors.
LI: The Vendor fails to maintain payment of applicable subscription fees.
LI: The Vendor's business is found to be operating illegally or in violation of applicable regulatory requirements.
LI: The Vendor breaches any provision of these Terms.
P: Upon termination, the Vendor's listing will be removed from the App and no refund will be issued for any unused portion of an active subscription, except where termination is caused by Buzz9ja's own material breach.

SECTION 6: User-Generated Content
P: By submitting reviews, ratings, photos, comments, or any other content to the App, you grant Buzz9ja a non-exclusive, royalty-free, worldwide, perpetual licence to use, reproduce, display, distribute, and adapt your content for the purposes of operating and promoting the App.
P: You confirm that any content you submit is your own original work, does not infringe the intellectual property or privacy rights of any third party, and complies with these Terms.
P: Buzz9ja reserves the right to remove any user-generated content that we determine, at our discretion, violates these Terms or is otherwise unsuitable for the platform.

SECTION 7: Intellectual Property
P: All intellectual property rights in the App (including but not limited to the Buzz9ja name, logo, design, software, data architecture, and original content) are owned by or licensed to Buzz9ja. Nothing in these Terms grants you any right, title, or interest in the App's intellectual property.
P: You may not copy, reproduce, distribute, modify, reverse-engineer, or create derivative works from any part of the App without our prior written consent.

SECTION 8: Third-Party Links and Services
P: The App may contain links to third-party websites, mapping services, social media platforms, and other external services. Buzz9ja does not control and is not responsible for the content, privacy practices, or availability of any third-party service. Your use of any third-party service is at your own risk and subject to the terms of that third party.

SECTION 9: Disclaimers and Limitation of Liability
P: The App and all content on it are provided on an "as is" and "as available" basis. To the fullest extent permitted by applicable law, Buzz9ja:
LI: Makes no warranty as to the accuracy, completeness, or reliability of any listing, review, or content on the App.
LI: Does not guarantee uninterrupted, error-free, or secure access to the App.
LI: Is not liable for any direct, indirect, incidental, special, or consequential loss or damage arising from your use of or inability to use the App.
LI: Is not responsible for any transactions, disputes, or losses arising between Visitors and Vendors.
P: Nothing in these Terms limits or excludes liability for fraud, death, or personal injury caused by our negligence, or any other liability that cannot be excluded under Nigerian law.

SECTION 10: Governing Law and Dispute Resolution
P: These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any dispute arising out of or in connection with these Terms that cannot be resolved by negotiation shall be referred to arbitration under the Arbitration and Conciliation Act (as amended), with the seat of arbitration in Lagos, Nigeria.

SECTION 11: Changes to These Terms
P: Buzz9ja reserves the right to update or amend these Terms at any time. We will notify registered users of material changes via the App or by email at least 14 days before the changes take effect. Your continued use of the App after the effective date of any amendment constitutes your acceptance of the revised Terms.

SECTION 12: Contact Us
P: For questions, complaints, or notices regarding these Terms, please contact:
LI: Email: legal@buzz-9ja.com
LI: Support: support@buzz-9ja.com
LI: Address: 25 Titiloye Street Isolo Lagos, Nigeria

FOOTER: Buzz9ja | Terms & Conditions and Privacy Policy | Version 1.0 | September 2026
FOOTER: Compliant with the Nigeria Data Protection Act 2023 (NDPA) and Nigeria Data Protection Regulation 2019 (NDPR)
`

const RAW_PRIVACY = `
DOCUMENT: Privacy
ROUTE: /privacy
PAGE TITLE: Privacy Policy
META: Effective Date: September 2026 | Version 1.0

PART: PART B: PRIVACY POLICY
P: Buzz9ja is committed to protecting the privacy of everyone who uses our platform. This Privacy Policy explains what personal data we collect, why we collect it, how we use and protect it, and what rights you have over your data. It forms part of our Terms and Conditions above.
P: This Policy is compliant with the Nigeria Data Protection Act 2023 (NDPA) and the Nigeria Data Protection Regulation 2019 (NDPR), as administered by the Nigeria Data Protection Commission (NDPC).

SECTION 13: Data Controller
P: Buzz9ja App, trading as Buzz9ja, is the Data Controller responsible for your personal data. If you have any questions about how we handle your data, please contact our Data Protection Officer at: privacy@buzz-9ja.com.

SECTION 14: Data We Collect
SUB 14.1: Data You Provide to Us
LI: Account registration data: name, email address, phone number, and password.
LI: Profile information: profile photo, bio, and location preferences (optional).
LI: Vendor registration data: business name, business address, business category, contact details, and payment information.
LI: Content you submit: reviews, ratings, photos, comments, and messages.
LI: Communications: messages you send to us via email, in-app support, or social media.
SUB 14.2: Data We Collect Automatically
LI: Device data: device type, operating system, device identifier, and browser type.
LI: Usage data: pages viewed, features used, search queries, time spent on the App, and click interactions.
LI: Location data: with your permission, we collect approximate or precise location data to show you nearby places of interest. You can disable location access in your device settings at any time.
LI: Log data: IP address, access timestamps, and error logs.
LI: Cookies and similar technologies: see Section 20 below.
SUB 14.3: Data We Receive from Third Parties
LI: Social login providers (Google, Apple, Facebook): if you choose to register or log in using a social media account, we receive your name, email address, and profile picture from that provider.
LI: Payment processors: we receive transaction confirmation data (but not full card numbers or bank account details) from our payment processing partners.

SECTION 15: How We Use Your Data
P: We use your personal data for the following purposes:
LI: To create and manage your account and provide you with access to the App.
LI: To display listings, places of interest, and vendor advertisements relevant to your location and preferences.
LI: To process Vendor subscription payments and manage billing.
LI: To send you service-related communications such as account confirmations, receipts, and security alerts.
LI: To send you marketing communications and promotions where you have consented to receive them. You may withdraw consent at any time.
LI: To moderate and improve the quality of content on the App.
LI: To analyse App usage, improve our features, and develop new services.
LI: To detect and prevent fraud, abuse, and security threats.
LI: To comply with our legal and regulatory obligations under Nigerian law.

SECTION 16: Legal Basis for Processing
P: Under the NDPA 2023, we process your personal data on the following legal bases:
DEF: Contract | Processing is necessary to provide you with the App's services and to fulfil our obligations to you.
DEF: Consent | Where you have given us your explicit consent, such as for location access or marketing communications.
DEF: Legitimate interests | To improve the App, prevent fraud, and ensure the security of our platform, where your interests do not override ours.
DEF: Legal obligation | Where we are required by Nigerian law or regulatory authority to process your data.

SECTION 17: How We Share Your Data
P: We do not sell your personal data to third parties. We may share your data with:
DEF: Service providers | Third-party companies that provide services on our behalf, including cloud hosting, payment processing, analytics, and customer support. These providers are contractually obligated to protect your data and use it only for the purposes we specify.
DEF: Other users | Your public profile information, reviews, and ratings are visible to other App users as part of the platform's core functionality.
DEF: Vendors (limited) | If you interact with a Vendor's listing (for example, by clicking a booking link or initiating contact), the Vendor may receive your name and contact information with your knowledge.
DEF: Regulators and law enforcement | We may disclose your data where required to do so by law, court order, or regulatory authority, including the NDPC, FCCPC, or Nigerian law enforcement agencies.
DEF: Business transfers | In the event of a merger, acquisition, or sale of all or part of our business, your data may be transferred to the acquiring entity, subject to equivalent privacy protections.

SECTION 18: Data Retention
P: We retain your personal data for as long as your account is active or as necessary to provide you with the App's services. Where you delete your account, we will delete or anonymise your personal data within 30 days, except where we are required to retain it for longer under applicable Nigerian law (for example, for tax, regulatory, or legal compliance purposes).
P: Vendor billing records are retained for a minimum of 7 years in compliance with Nigerian financial record-keeping obligations.

SECTION 19: Data Security
P: We take the security of your personal data seriously and implement the following measures:
LI: Encryption of data in transit using TLS (Transport Layer Security).
LI: Encryption of sensitive data at rest on our servers.
LI: Role-based access controls limiting staff access to personal data to those with a legitimate need.
LI: Regular security assessments and penetration testing of our platform.
LI: Incident response procedures to detect, respond to, and notify affected users of any data breach within 72 hours as required under the NDPA 2023.
P: No method of electronic transmission or storage is 100% secure. While we do everything reasonably practicable to protect your data, we cannot guarantee absolute security.

SECTION 20: Cookies and Tracking Technologies
P: We use cookies and similar technologies to operate and improve the App. These include:
DEF: Essential cookies | Required for the App to function, including authentication and session management.
DEF: Analytics cookies | Help us understand how users interact with the App so we can improve it (e.g., Google Analytics).
DEF: Preference cookies | Remember your settings and preferences to personalise your experience.
DEF: Advertising cookies | Used to serve relevant Vendor advertisements based on your browsing behaviour within the App.
P: You can manage cookie preferences through your device or browser settings. Disabling certain cookies may affect the functionality of the App.

SECTION 21: Your Data Rights
P: Under the Nigeria Data Protection Act 2023, you have the following rights in relation to your personal data:
DEF: Right of access | You may request a copy of the personal data we hold about you.
DEF: Right to rectification | You may ask us to correct inaccurate or incomplete personal data.
DEF: Right to erasure | You may request that we delete your personal data, subject to our legal retention obligations.
DEF: Right to restrict processing | You may ask us to limit how we use your data in certain circumstances.
DEF: Right to data portability | You may request your personal data in a structured, machine-readable format.
DEF: Right to object | You may object to our processing of your data for direct marketing purposes at any time.
DEF: Right to withdraw consent | Where processing is based on your consent, you may withdraw it at any time without affecting the lawfulness of processing that occurred before withdrawal.
P: To exercise any of these rights, please contact us at privacy@buzz-9ja.com. We will respond to verified requests within 30 days as required under the NDPA 2023.
P: If you are not satisfied with how we handle your data rights request, you may lodge a complaint with the Nigeria Data Protection Commission (NDPC) at www.ndpc.gov.ng.

SECTION 22: International Data Transfers
P: Where your personal data is transferred outside Nigeria (for example, to cloud servers or service providers located in other countries), we will ensure that appropriate safeguards are in place as required under the NDPA 2023, including standard contractual clauses or adequacy decisions recognised by the NDPC.

SECTION 23: Children's Privacy
P: The App is not directed at children under the age of 13. We do not knowingly collect personal data from children under 13. If you are a parent or guardian and believe your child has provided us with personal data without your consent, please contact us at privacy@buzz-9ja.com and we will delete the data promptly.

SECTION 24: Changes to This Privacy Policy
P: We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will notify you of material changes via the App or by email. The revised Policy will be effective from the date stated at the top of this document.

SECTION 25: Contact and Complaints
P: For any privacy-related enquiries, data rights requests, or complaints, please contact:
LI: Data Protection Officer: privacy@buzz-9ja.com
LI: General Support: support@buzz-9ja.com
LI: Address: 25 Titiloye Street Isolo, Lagos
P: We aim to respond to all privacy enquiries within 14 working days.

FOOTER: Buzz9ja | Terms & Conditions and Privacy Policy | Version 1.0 | September 2026
FOOTER: Compliant with the Nigeria Data Protection Act 2023 (NDPA) and Nigeria Data Protection Regulation 2019 (NDPR)
`

const RAW_REFUND = `
DOCUMENT: Refund
ROUTE: /refund-policy
PAGE TITLE: Refund, Payout and Enhanced Data Protection Policy
META: Effective Date: September 2026 | Version 2.0

PART: PART C: REFUND, PAYOUT AND ENHANCED DATA PROTECTION POLICY
P: This Part C supplements the existing Buzz9ja Terms and Conditions and Privacy Policy. Where this Part C contains a more specific rule on refunds, payment reversals, Vendor settlements, Customer payouts, or payment-related personal data, that specific rule applies to the relevant transaction. Nothing in this Part C limits any mandatory right available under Nigerian law.

SECTION C1: Customer Refund and Cancellation Policy
P: Where Buzz9ja facilitates or processes a paid booking, purchase or service, the applicable cancellation and refund terms must be made available to the Customer before payment. Where payment is made directly to a Vendor or third-party provider and Buzz9ja only provides discovery or advertising, the Vendor or provider’s disclosed refund policy applies, subject to applicable law.
LI: Customers may cancel a transaction where the disclosed booking terms permit cancellation or where a statutory right applies.
LI: Any cancellation charge, non-refundable amount, deadline or restriction must be clearly disclosed before payment.
LI: A refund may be available where a Vendor fails to provide the paid product or service, materially fails to provide what was described, a transaction is duplicated or incorrectly charged, or the transaction is reversed or cannot be completed.
LI: Where a Vendor is responsible for the refund, Buzz9ja may facilitate the refund and may deduct the approved amount from amounts otherwise payable to that Vendor where permitted.
LI: Approved refunds will normally be returned through the original payment method where technically and legally possible.
LI: Refund timing may depend on the payment processor, bank, card scheme or other financial institution. Buzz9ja will communicate the status of an approved refund where reasonably practicable.
LI: Nothing in this policy removes a consumer right that cannot lawfully be excluded.
P: Nigerian consumer-protection guidance emphasises clear price and transaction disclosures, accessible complaint mechanisms, and fair cancellation and refund practices.

SECTION C2: Vendor Payout and Settlement Policy
P: Vendor payouts are amounts due to an eligible Vendor after applicable transaction conditions, refunds, reversals, chargebacks, platform fees and other disclosed deductions have been accounted for.
LI: Vendors must provide accurate and verifiable bank or other supported payout details.
LI: Buzz9ja may require identity, business, tax, compliance or other verification before a payout is released.
LI: Payouts will be processed according to the settlement cycle stated in the Vendor agreement, commercial terms or App. If no specific cycle is stated, Buzz9ja will communicate the applicable settlement cycle before or when the Vendor begins receiving transactions.
LI: Payout timing may be affected by weekends, public holidays, banking delays, payment-processor settlement, reconciliation, compliance reviews or other circumstances outside Buzz9ja’s reasonable control.
LI: Buzz9ja may temporarily hold funds where there is a credible fraud, chargeback, refund, payment dispute, regulatory, reconciliation or security concern.
LI: Buzz9ja may deduct or recover amounts properly due from a Vendor, including approved Customer refunds, chargebacks, reversals, processing fees, taxes or amounts resulting from Vendor misconduct, subject to applicable law and the Vendor agreement.
LI: If a payout fails because the Vendor supplied incorrect or inactive account information, Buzz9ja may reprocess it after the details are corrected.

SECTION C3: Customer Payouts and Credits
P: Buzz9ja does not operate a general cash-withdrawal wallet for Customers unless such functionality is expressly introduced in the App. Customer “payouts” may include approved refunds, reimbursements, cashback, credits, rewards or other promotional amounts where a specific programme is offered.
LI: Each Customer payout or reward programme will state its eligibility, value, expiry, withdrawal or redemption conditions before participation where applicable.
LI: Cash refunds for purchases are governed primarily by C1 and are not treated as promotional rewards.
LI: Promotional credits or rewards are not transferable or redeemable for cash unless the relevant programme expressly states otherwise.
LI: Buzz9ja may require a verified payout destination and may perform fraud, identity or compliance checks before releasing a cash payout.
LI: Buzz9ja may reverse or withhold a payout where it reasonably identifies duplicate claims, fraud, account takeover, manipulation, abuse or breach of programme terms, subject to applicable law.

SECTION C4: Chargebacks, Reversals and Payment Disputes
LI: Customers should report duplicate charges, unauthorised transactions, payment errors and service disputes to support@buzz-9ja.com as soon as reasonably possible.
LI: Buzz9ja may investigate disputes and request reasonable evidence from Customers, Vendors or payment partners.
LI: Where a bank, card scheme or payment processor initiates a chargeback or reversal, the affected amount may be placed on hold and adjusted against the responsible account where permitted.
LI: Vendors must cooperate with reasonable requests for transaction records, proof of fulfilment or other evidence required to investigate a dispute.
LI: Nothing in this section prevents a Customer from exercising rights available under applicable law or relevant payment-scheme rules.

SECTION C5: Payment and Payout Data Protection
P: Payment, refund, settlement and payout information is personal or financial information that will be handled with appropriate security and confidentiality. Buzz9ja will process such information in accordance with its Privacy Policy and applicable Nigerian data-protection requirements.
LI: Buzz9ja may process transaction references, payment status, refund status, chargeback information and settlement records.
LI: Vendor and eligible Customer bank or payout details may be processed solely for account administration, payment execution, refunds, settlements, fraud prevention, reconciliation, regulatory compliance and related legitimate purposes.
LI: Where a third-party payment processor handles card or other sensitive payment credentials, Buzz9ja will generally receive transaction confirmation and related information rather than the full payment credentials.
LI: Payment and settlement information may be shared with payment processors, banks, settlement partners, cloud providers, fraud-prevention providers, auditors, regulators or law-enforcement authorities where necessary and lawful.
LI: Access to financial and personal data will be limited according to role and legitimate business need, supported by appropriate technical and organisational safeguards.
LI: Payment and settlement records may be retained for the period required for accounting, tax, dispute, fraud-prevention, regulatory and legal purposes.

SECTION C6: Enhanced Data Protection Commitments
P: Buzz9ja will apply privacy-by-design principles where reasonably practicable and will seek to collect only personal data that is relevant to identified business, legal, security or service purposes.
LI: Purpose limitation: personal data will be used for identified and lawful purposes and not for incompatible purposes without an appropriate lawful basis.
LI: Data minimisation: Buzz9ja will seek to avoid collecting personal data that is not reasonably necessary for the service or identified purpose.
LI: Accuracy: Buzz9ja will provide reasonable mechanisms for users and Vendors to correct inaccurate account information.
LI: Access control: access to personal data will be restricted to authorised personnel and service providers with a legitimate need.
LI: Retention control: personal data will not be retained longer than reasonably necessary, subject to legal, tax, regulatory, fraud-prevention and dispute requirements.
LI: Incident management: Buzz9ja will maintain procedures to identify, contain, investigate and remediate personal-data incidents and make notifications required by applicable law.
LI: Processor management: third-party processors handling personal data on Buzz9ja’s behalf will be subject to appropriate contractual and security requirements.
LI: International transfers: where personal data is transferred outside Nigeria, Buzz9ja will apply safeguards required by applicable data-protection law.

SECTION C7: Complaints and Escalation
P: Customers and Vendors should first submit complaints through support@buzz-9ja.com or the in-App support channel. Complaints relating to payments, refunds and payouts should include the relevant transaction reference, date, amount and supporting evidence where available.
P: Buzz9ja will maintain a process for acknowledging, investigating and resolving complaints. Where a complaint cannot be resolved internally, the complainant may have rights to escalate to a competent regulator or other lawful dispute-resolution forum. Nigerian consumer-protection guidance also provides a route for consumers to submit complaints to the Federal Competition and Consumer Protection Commission.

SECTION C8: Regulatory and Legal Review
P: These provisions are intended as operational terms for the Buzz9ja Platform and should be reviewed by Buzz9ja’s Nigerian legal counsel and data-protection adviser before publication, particularly the final payout cycle, applicable fees, tax treatment, payment-partner responsibilities, retention periods, consumer cancellation rules and regulatory licensing requirements applicable to Buzz9ja’s actual payment flows.

FOOTER: Buzz9ja | Terms & Conditions, Privacy, Refund & Payout Policy | Version 1.0 | September 2026
`

export const termsDocument = parseLegalDocument(RAW_TERMS)
export const privacyDocument = parseLegalDocument(RAW_PRIVACY)
export const refundDocument = parseLegalDocument(RAW_REFUND)

export const legalDocuments: LegalDocument[] = [termsDocument, privacyDocument, refundDocument]

export const legalDocSwitcher = [
  { route: termsDocument.route, label: 'Terms and Conditions' },
  { route: privacyDocument.route, label: 'Privacy Policy' },
  { route: refundDocument.route, label: 'Refund & payout policy' },
]
