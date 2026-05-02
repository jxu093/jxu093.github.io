# Resume Notes — Jerry Xu

Raw context and details behind each resume bullet. Use this to recraft or tailor bullets for specific roles.

---

## Microsoft | Azure SDN Control Plane (Jan 2019 – Present)

### AZ-aware pubsub routing
- Control plane uses a central pubsub service for sending goal state through the stack
- Pubsub has one endpoint per availability zone in a region; publishers typically publish to all endpoints
- Added optimization to determine the "home AZ" of a VM from compute service, so we only publish to the home pubsub endpoint
- Typically 3–4 zones per region → 66–75% reduction in pubsub calls
- Also improves VM resilience: if a non-home AZ's pubsub is down, the VM is unaffected

### Cross-org VM deletion API redesign
- Large cross-org project with Azure Compute team
- Old approach: no signal for deletion completion, only intent — SDN resources could be released prematurely
- This caused real incidents: same resources assigned to new deployments would hit conflict errors when landing on hosts that still had old resources
- New API provides definitive deletion-completion signal so SDN resources are safe to release
- Also migrated from legacy "Tenant" PaaS model to modern IaaS VM model
- The new API later served as the foundation for a joint migration of the full VM lifecycle to IaaS, since the API was already in place

### Proactive error-triage workflow
- Built a workflow to find low-frequency errors that don't meet alerting thresholds
- Errors are bucketized and triaged for potential customer impact before they escalate
- Evolved from manual triage to AI-driven classification
- Discovered real production issues through this process

### India team onboarding
- Onboarded a brand new team of ~6 engineers + manager in India
- Ran weekly meetings plus ad-hoc support over ~2 months
- Team became self-sufficient and has since grown to 15+ engineers
- They've contributed to various projects since onboarding

### SDN provisioning architecture redesign (multi-year, multi-org)
- Major platform initiative started in 2022, still ongoing
- OLD architecture: Customer → CRP → NRP (PaaS tenant model) → RNM (allocates MAC, IP from inventory) → goal state back through NRP → CRP → Service Fabric cluster (TM + NSM) → RDAgent/VnetAgent on host. Some resources (VIP, secondary NIC) sent directly RNM → NSM. RNM also programs NSG/ASG rules to NSM.
- NEW architecture: Fold RNM into NRP, forming a unified controller. Replace direct service-to-service communication with pub/sub. New controller publishes VM, NIC, NSG, ASG goal state consumed by NSM and VnetAgent directly. Minimal tenant response still sent back to CRP/TM/NSM/VnetAgent as a subscribe trigger. Uses protobuf for published data contracts.
- Jerry's team was previously the RNM team — responsible for folding RNM into NRP, adding publishing, making E2E work
- Jerry was NOT the architect — was a key day-1 contributor since inception in 2022
- Also changed deletion pipeline significantly (see VM deletion API bullet — that was a sub-project of this initiative)
- Result: 90% reduction in VM lifecycle latency
- NOTE: The VM deletion API bullet is a sub-project under this same initiative but reads well as a separate bullet

### Distributed metadata management layer
- For logical SDN resources
- Implemented advanced concurrency controls to support millions of concurrent resource states

### API performance optimization
- Reduced 99th percentile response times by 40%
- Through targeted caching and query optimization

---

## Capital One Canada (Aug – Dec 2018)

- Designed real-time event-driven data streams using Apache Kafka for financial ledger updates
- Was a prototype — did not ship to production before leaving
- ~2M Canadian cardholders would have been the target scale
- NOTE: The on-prem to AWS migration bullet was on the original resume but Jerry did not do this work — do not include

---

## IBM (2017 – 2018)

- Backend services in Java/C++
- Enterprise-scale data processing and storage reliability
- Also focused on security: OWASP principles and GDPR compliance
- No specific metrics available
- NOTE: Original resume was AI-modified and may have contained inaccurate details — verify any old bullets before reusing

---

## General notes

- Graduated McMaster University, BSc Computer Science, 2017
- Personal site: jxu093.github.io
- Working on a project that may be added to a Projects section later
