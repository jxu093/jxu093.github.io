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
    Redmond, WA #h(6pt) | #h(6pt) jxu000\@gmail.com #h(6pt) | #h(6pt) #link("https://jxu093.github.io")[jxu093.github.io]
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

#section("Professional Summary")

Senior Software Engineer specializing in large-scale distributed systems and control plane architecture. Leads high-impact infrastructure initiatives on Azure's SDN platform, improving reliability, scalability, and performance across millions of resources. Proven ability to drive cross-organizational designs and deliver production-critical systems at global scale.

#section("Professional Experience")

#job("Microsoft", "Azure SDN Control Plane", "2019 – Present")
#v(1pt)
#text(size: 9pt, fill: rgb("555555"))[Software Engineer → Software Engineer II (2020) → Senior Software Engineer (2022)]
#v(3pt)

#set list(indent: 0.3em, body-indent: 0.5em, spacing: 4pt)

- Drove the integration of regional network management into Azure's new SDN control plane, implementing pub/sub-based goal-state publishing for VM, NIC, and network policy resources via Protobuf contracts. Part of a multi-org effort that reduced VM lifecycle latency by 90%.
- Led cross-organizational design with Azure Compute to redesign the VM deletion API, eliminating resource-conflict incidents caused by premature SDN release and enabling migration of the VM lifecycle to a modern IaaS architecture.
- Redesigned goal-state distribution to route publish calls to VM home availability zones, reducing cross-AZ traffic by 66–75% and improving resilience during zone-level pubsub outages.
- Built a proactive error-triage workflow to surface low-frequency failures below alerting thresholds, evolving it from manual review to AI-driven classification and uncovering previously undetected production issues.
- Onboarded a new 6-person engineering team in India through structured weekly sessions, code review, and mentoring, enabling independent contributions within two months. The team has since grown to 15+ engineers.

#job("Capital One Canada", "Software Developer", "2018")
#v(3pt)
- Designed and prototyped real-time event-driven data streams using Apache Kafka for financial ledger updates, architected for zero data loss across \~2M Canadian cardholders.

#job("IBM", "Software Developer", "2017 – 2018")
#v(3pt)
- Built and maintained robust backend services in Java/C++, focusing on enterprise-scale data processing, storage reliability, and security practices including OWASP principles and GDPR compliance.

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
*Backend & Distributed Systems:* API design, system design, scalability, microservices, REST APIs, gRPC, Pub/Sub, Protobuf, Apache Kafka, event-driven architecture, concurrent programming, multithreading \
*Cloud & Infrastructure:* Azure, AWS, Service Fabric, SDN \
*Testing & Quality:* unit testing, integration testing, TDD, code review \
*Engineering Practices:* CI/CD, design documents, on-call, incident response, mentoring, technical leadership, cross-functional collaboration \
*Tools:* Git, GitHub
