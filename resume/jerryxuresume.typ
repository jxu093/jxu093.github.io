#set page(margin: (top: 0.4in, bottom: 0.4in, left: 0.5in, right: 0.5in), numbering: none)
#set text(font: "Helvetica Neue", size: 9.5pt, fill: rgb("333333"))
#set par(leading: 0.55em, justify: true)
#show heading: set text(font: "Helvetica Neue")

#let accent = rgb("1B2A4A")

// Name and contact
#align(center)[
  #text(size: 22pt, weight: "bold", fill: accent)[Jerry Xu]
  #v(2pt)
  #text(size: 9pt, fill: rgb("555555"))[
    Bellevue, WA #h(6pt) | #h(6pt) jxu000\@gmail.com #h(6pt) | #h(6pt) #link("https://jxu093.github.io")[jxu093.github.io]
  ]
]

#v(8pt)

// Section heading helper
#let section(title) = {
  v(6pt)
  text(size: 9pt, weight: "bold", fill: accent, tracking: 0.08em)[#upper(title)]
  v(-4pt)
  line(length: 100%, stroke: 0.5pt + rgb("cccccc"))
  v(2pt)
}

// Job entry helper
#let job(company, detail, dates) = {
  v(2pt)
  grid(
    columns: (1fr, auto),
    text(weight: "bold", size: 10pt)[#company #text(weight: "regular", size: 9.5pt)[ | #detail]],
    text(size: 9.5pt, fill: rgb("555555"))[#dates],
  )
}

#section("Summary")

Senior Software Engineer with 9+ years building distributed systems and backend services at scale. Currently on Azure's SDN control plane, leading multi-team redesigns that improve provisioning performance and reliability.

#section("Professional Experience")

#job("Microsoft", "Azure SDN Control Plane", "2019 – Present")
#v(1pt)
#text(size: 9pt, fill: rgb("555555"))[Software Engineer → Software Engineer II (2020) → Senior Software Engineer (2022)]
#v(3pt)

#set list(indent: 0.3em, body-indent: 0.5em, spacing: 4pt)

- Led several SDN control-plane workstreams in a multi-year, multi-team rebuild of Azure's VM provisioning, deprecating the legacy regional network management service and moving goal-state delivery to a pub/sub model. Reduced provisioning tail latency by \~90%.
- Drove cross-organizational design of a new VM deletion API with Azure Compute, eliminating recurring resource-conflict incidents and modernizing the contract from legacy PaaS to IaaS.
- Redesigned goal-state distribution to route publish calls to each VM's home availability zone, reducing cross-AZ traffic by 66–75% and improving resilience during zone-level pub/sub outages.
- Built a proactive error-triage workflow to surface low-frequency failures below alerting thresholds, evolving it from manual review to AI-driven classification and uncovering previously undetected production issues.
- Onboarded a new 6-person engineering team in India through structured weekly sessions, code reviews, and mentoring, enabling independent contributions within two months. The team has since grown and taken on overnight on-call coverage.

#job("Capital One Canada", "Software Developer", "2018")
#v(3pt)
- Designed and prototyped real-time, event-driven Apache Kafka data streams for financial ledger updates, architected for zero data loss across \~2M Canadian cardholders.

#job("IBM", "Software Developer", "2017 – 2018")
#v(3pt)
- Built and maintained backend services in Java/C++, focusing on enterprise-scale data processing, storage reliability, and security practices, including OWASP principles and GDPR compliance.

#section("Education")

#v(2pt)
#grid(
  columns: (1fr, auto),
  [#text(weight: "bold")[McMaster University] | Bachelor of Science in Computer Science, Minor in Business],
  text(fill: rgb("555555"))[2017],
)
#v(1pt)
#text(size: 9pt, fill: rgb("555555"))[Dean's Honor List]

#section("Technical Skills")

#v(2pt)
*Languages:* C\#, Java, Python \
*Backend & Distributed Systems:* API design, system design, scalability, microservices, REST APIs, gRPC, pub/sub, Protobuf, Apache Kafka, event-driven architecture, concurrent programming, multithreading \
*Cloud & Infrastructure:* Azure, AWS, Service Fabric, SDN \
*Testing & Quality:* unit testing, integration testing, TDD, code review \
*Engineering Practices:* CI/CD, design documents, on-call, incident response, mentoring, technical leadership, cross-functional collaboration \
*Tools:* Git, GitHub
