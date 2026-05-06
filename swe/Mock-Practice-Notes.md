# Mock & Practice Session Notes

**Purpose:** Track learnings, gaps, and action items from every SD mock and practice session. Review this file before each new mock to avoid repeating mistakes.

**How to use:** After each mock or timed practice, add an entry below with the date, topic, format, and categorized takeaways. Tag each takeaway with a theme so patterns across mocks become visible over time.

---

## Themes Index

Quick reference for recurring gap areas. Updated as new mocks surface patterns.

| Theme | Description | Mocks where it appeared |
|---|---|---|
| **NFR precision** | Be concrete on latency targets, availability numbers; separate NFRs from functional reqs cleanly | WhatsApp (Apr 30), Rate Limiter (May 2), Payment System (May 5) ⚠️⚠️ |
| **API completeness** | Define response shapes, status codes, headers; know the exact standard names and units | WhatsApp (Apr 30), Rate Limiter (May 2), Payment System (May 5) ⚠️⚠️ |
| **Speak early phases aloud** | No answer recorded for Requirements, Core Entities, and System Interface — even if you know it, say it | Rate Limiter (May 2) |
| **Offline/reconnect** | Per-user offsets, durable storage before notification, catchup on reconnect | WhatsApp (Apr 30) |
| **Media handling** | Pre-signed URLs, blob storage, keep DB lean with references only | WhatsApp (Apr 30) |
| **Fan-out & PubSub** | Show delivery path to recipients, not just inbound; PubSub for cross-server routing at scale | WhatsApp (Apr 30) |
| **Multi-device** | Per-device sessions and delivery tracking, not just per-user | WhatsApp (Apr 30) |
| **Algorithm precision** | Know the exact mechanism of the algorithm you name; don't conflate it with adjacent concepts | Rate Limiter (May 2) |
| **Atomic hot-path ops** | On latency-critical paths, combine read+write into one atomic operation (INCR, Lua script) to avoid round trips and races | Rate Limiter (May 2) |
| **Payment lifecycle** | Separate PaymentIntent from PaymentAttempt; model multi-stage statuses (created→authorized→pending→settled→failed) | Payment System (May 5) |
| **Security & auditability** | HSM for private keys, CDC for tamper-proof audit trails, encryption beyond just SSL | Payment System (May 5) |
| **Partition key design** | Choose keys that guarantee event ordering per entity; don't mix unrelated IDs into composite keys | Payment System (May 5) |

---

## Mock #1: Design WhatsApp / Chat System

**Date:** Thu Apr 30, 2026 (Week 3)
**Format:** Timed solo, 45 min
**Prep reading:** Xu Vol 2 — Distributed Message Queue chapter

### Requirements Phase

- **Fault tolerance ≠ 100% uptime.** It means the system keeps working when individual components fail — data replication, redundant routing, graceful degradation. Don't claim zero downtime; articulate what happens when a server dies (messages reroute, no data loss).
- **Guaranteed deliverability** is a core NFR for any messaging system. Messages must eventually reach the recipient even if they're offline. Achieved via a persistent message queue that holds undelivered messages until reconnect.
- **Latency target: 500ms** for online message delivery. This is the standard number interviewers expect for real-time chat. Users perceive delays above this as lag.
- **NFRs vs. functional requirements — keep them separate.** Latency, availability, fault tolerance = NFRs (how well). Message ordering = functional (what the system does). Mixing these makes the discussion muddy.

### Core Entities

- **Four entities: Users, Chats/Groups, Messages, Media.** Media stored in blob storage (S3/GCS), Messages table holds only a reference URL to the blob. This keeps the DB lean and fast.
- **Blob storage** (S3, GCS) is the standard for unstructured binary data. Don't store raw media in relational or NoSQL databases — size and performance won't work.

### API Design

- **WebSocket event contracts matter.** Don't just say "use WebSockets" — define the actual events. Example: `newMessage` event with fields `chatId`, `senderId`, `content`, `attachments`. This covers both real-time push and reconnection scenarios.
- **Every endpoint needs a defined response.** For a POST creating a message or uploading a file, return the created resource ID + status code at minimum. Interviewers check for this.
- **Cursor-based pagination on history endpoints.** Any endpoint returning a growing list (chat message history) needs a `before`/`after` timestamp cursor. This directly supports offline retrieval without unbounded responses.

### High-Level Design

- **Per-user offset for offline delivery.** Store a `last_delivered_message_id` per user per chat. Without this, the system can't know what a reconnecting user missed. On reconnect, client fetches everything after the offset.
- **Notification ≠ delivery.** Notifications are hints that can be dropped (device off, app uninstalled). Correct pattern: persist message durably first → push notification as hint → on reconnect, client reads from storage using its offset for actual catchup.
- **Pre-signed upload URLs for media.** Client requests a pre-signed URL from blob storage and uploads directly. Keeps large binaries out of the message service entirely. Message record stores only a blob key/URL.
- **Don't forget the fan-out step in WebSocket diagrams.** After a message arrives at the WebSocket server, it must push to all other connected chat participants. Show the delivery path back to recipients, not just the inbound path from sender.

### Deep Dives

- **PubSub for cross-server WebSocket routing.** At scale with many WS servers, messages must reach the specific server holding the recipient's connection. Each WS server subscribes to topics for its current users. Message published → only the right server gets it and forwards. Without this, horizontal scaling doesn't help delivery.
- **Managing PubSub subscription churn.** Millions of subscriptions per WS server = huge churn. Mitigations: single multiplexed connection from each WS server to the PubSub broker (not one per user), batch subscribe/unsubscribe ops, grace period before unsubscribing on disconnect (so brief reconnects don't trigger full re-subscribe).
- **Multi-device = per-device sessions.** Each device is a separate client session. User Activity Service stores all active device sessions. Fan-out goes to every connected device. Delivery tracking is per-device (not per-user), because one device may be online while another is offline — each needs independent catchup state.

### Action Items from This Mock

- [x] Add flashcards for: WebSocket event contract pattern, per-user delivery offset, pre-signed upload URL pattern, PubSub fan-out at scale (→ Deck 12 Q17–Q21)
- [ ] In next SD mock, explicitly define API response shapes (not just request bodies)
- [ ] In next SD mock, always draw the fan-out / delivery path back to recipients
- [ ] Practice articulating fault tolerance concretely (what happens on failure) rather than vaguely ("high availability")
- [ ] Review: notification vs. delivery distinction — make this part of the standard messaging system template

---

## Mock #2: Design a Rate Limiter

**Date:** Sat May 2, 2026 (Week 3)
**Format:** Virtual mock
**Prep reading:** Deck 12 Q5 (rate limiter basics)

### What went well

- **API gateway placement** — correctly identified placing the rate limiter in the API gateway to avoid an extra hop, articulated the tradeoff (complexity in gateway vs. simplicity of dedicated service), and noted the statefulness concern.
- **Consistent hashing for counter sharding** — correctly identified sharding Redis counters by client key using consistent hashing.
- **Fail-open strategy** — good answer on letting traffic through when rate limiter fails, with Redis redundancy, automatic failover, and metrics/heartbeats for detection. Correctly noted that API gateway failure is a different (worse) problem than cache failure.
- **Rules architecture** — solid on rules service + DB + cache layering, with cache-miss fallback to rule service.

### Requirements Phase

- ⚠️ **No answer recorded.** You need to say NFRs out loud even if you think them. The key one here: **< 5ms per check**, not the general 200ms web latency. The rate limiter is in the critical path of every request — even 50ms overhead is unacceptable at scale.
- **Eventual consistency is acceptable.** During a partition, briefly allowing a few extra requests through is fine. Strict consistency would add latency for negligible benefit. This is a good NFR to state proactively.

### Core Entities

- ⚠️ **No answer recorded.** Three entities: **Rules** (define limits), **Clients** (identified by IP/user ID/token), **Requests** (the individual calls being counted). Articulating these early frames the rest of the design.

### System Interface

- ⚠️ **No answer recorded.** Key point from feedback: rate limiting rules are **not passed as inputs per request**. They're stored internally (DB/config store) and looked up by API name or endpoint. The interface is: client ID in → allow/deny + remaining quota out.

### High-Level Design

- **Token bucket confusion.** You said "accept requests from the queue at a fixed interval" — that's traffic shaping (queuing/delaying), not token bucket. Token bucket is simpler: bucket has capacity, tokens refill at steady rate, each request consumes one token, empty bucket = deny. It handles **bursts** naturally (up to bucket capacity) while enforcing a sustained rate. Don't conflate these in an interview.
- **HTTP 429 details wrong.** You didn't name the status code (429 Too Many Requests). You said Retry-After value is in **milliseconds** — it's **seconds**. And it's `Retry-After` (standard), not `x-retry-after`. Also worth mentioning: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` — these help clients self-throttle and reduce retry noise.

### Deep Dives

- **Missed: atomic operations on the hot path.** The single biggest latency optimization is combining the counter read + increment into **one atomic Redis operation** (INCR or a Lua script). This avoids two round trips and prevents race conditions. You talked about caching rejected users instead, which is creative but not the standard answer.
- **Missed: co-locate gateways and Redis.** Keep them in the same region/AZ to minimize network latency on every check.
- **Missed: rule propagation strategies.** Two approaches: polling with short TTL (simple, some delay) vs. push notifications (faster, needed for emergency throttling). Know the tradeoff — you only covered the caching layer, not how updates propagate to gateway instances.
- **Good: two separate storage concerns.** The feedback emphasizes rules (cacheable, slow refresh) vs. counters (distributed, low-latency, sharded) as distinct problems. Your answer covered both but could have been more explicit about the separation.

### Action Items from This Mock

- [ ] **Fix the silent early phases.** Practice saying Requirements, Core Entities, and Interface out loud even in solo mocks — record yourself. If the interviewer hears nothing, it's a zero.
- [ ] Memorize: HTTP **429**, `Retry-After` in **seconds**, plus the three `X-RateLimit-*` headers
- [ ] Memorize: token bucket = tokens + refill + deny when empty. It is NOT a queue. Traffic shaping (leaky bucket with queue) is a different concept.
- [x] Add flashcards for: token bucket (Q22), atomic Redis ops on hot path (Q23), rule propagation polling vs. push (Q24)
- [ ] In next mock, when discussing latency optimization, lead with "reduce round trips on the hot path" before anything else

---

## Mock #3: Design a Payment System (Stripe)

**Date:** Mon May 5, 2026 (Week 4)
**Format:** Guided practice
**Prep reading:** None noted

### What went well

- **High-level payment flow** — correctly described the merchant→transaction service→card processor→update flow with appropriate separation of concerns.
- **Security fundamentals** — identified auth service with token-based access, SSL for transit encryption, and isolated card processor with private key decryption.
- **Scaling approach** — good instincts on stateless services, partitioned databases, async processing via message queues with worker pools, and rate limiting.
- **Idempotency awareness** — mentioned idempotency keys and timestamps for transaction safety, plus saga pattern for cross-service coordination.

### Requirements Phase

- **Missed domain-specific NFRs.** The critical NFRs for payment systems: **security** (PCI-DSS compliance, encryption, strong auth) and **auditability** (tamper-proof trail for every financial event). These aren't optional — they're regulatory requirements. Also: eventual consistency is NOT acceptable for payments — you need strong consistency for financial integrity.

### Core Entities

- **System boundary thinking.** Three entities: **Merchant** (who receives money), **Payment** (the method/instrument), **Transaction** (the record of money movement — charges, refunds, payouts). NOT Product — that belongs to an e-commerce system. Articulating what your system does and doesn't own shows strong design thinking.

### API Design

- Key gaps from feedback:
  - **POST not PUT** for payment actions. PUT = replace entire resource. POST = perform action / create. Submitting a payment is an action.
  - **Card details required in request body** — card number, expiry, CVC. Without these, the system can't charge.
  - **Response body required** — at minimum: transaction status (pending/success/failed) + confirmation ID.
  - **Don't duplicate amount** across transaction creation and payment endpoints. Amount is set at creation; payment just references the transactionId.

### High-Level Design

- **PaymentIntent pattern missed.** A PaymentIntent is a record of what a customer *intends* to pay — created when merchant initiates, holds amount/currency/description, status = "created". No card processor call happens yet (no card details provided). This is fundamental to how Stripe works.
- **Multi-stage status model incomplete.** Your answer had "pending, completed, failed" but the real lifecycle is: **created → authorized → pending → settled → failed**. "Authorized" = funds reserved but not moved. "Settled" = bank completed transfer. This granularity matters for payment UX and reconciliation.
- **Missed: PaymentIntent vs. PaymentAttempt separation.** The intent persists across retries. Each attempt is a separate card charge with its own processor result, status, and timestamp. This lets you retry without losing context.

### Deep Dives

- **HSM for private keys.** You said "encrypted using a private key" but didn't mention WHERE the private key lives. Answer: Hardware Security Module (HSM) — tamper-resistant hardware where the key never exists in plaintext outside of it. Without this, server compromise = all card data exposed.
- **Audit trail approach was weak.** You described replication + blob storage, which is data durability, not auditability. The correct pattern: **Change Data Capture (CDC)** — database-level capture emitting every change to an immutable event stream. App-managed audit logs can go out of sync; CDC can't be skipped by application code.
- **Partition key wrong.** You said "merchant and transaction ID" composite. Correct answer: **transaction ID alone**. All events for a single payment must land on the same partition for ordering guarantees. Merchant ID for load spreading belongs at a higher routing level, not in the partition key.
- **Timeout handling incomplete.** You mentioned idempotency and saga, but missed the key insight: treat timeouts as **pending/uncertain**, not failed. The processor may still complete the charge. Use idempotency keys + optimistic locking to prevent conflicting updates when retries and callbacks race.

### Action Items from This Mock

- [ ] **Memorize domain-specific NFRs for payment systems.** Security (PCI-DSS, HSM, encryption) + auditability (CDC, immutable event stream) + strong consistency. These are non-negotiable for financial systems.
- [ ] Memorize: PaymentIntent lifecycle (created → authorized → pending → settled → failed) and why intent vs. attempt separation matters
- [ ] Memorize: POST for actions, PUT for full resource replacement. Payment submission = POST.
- [ ] Memorize: HSM = where private keys live. CDC = how you get tamper-proof audit trails. These are the standard answers.
- [ ] Memorize: partition key = transaction ID alone for event ordering. Don't mix in merchant ID.
- [x] Add flashcards for: payment lifecycle (Q25), HSM + CDC (Q26), partition key design (Q27), timeout + idempotency (Q28)

---

<!-- TEMPLATE FOR FUTURE MOCKS — copy and fill in

## Mock #N: Design [System]

**Date:** [Day, Date] (Week N)
**Format:** [Solo timed / Peer mock / Paid mock]
**Prep reading:** [What you read beforehand]

### Requirements Phase
- [takeaway]

### Core Entities
- [takeaway]

### API Design
- [takeaway]

### High-Level Design
- [takeaway]

### Deep Dives
- [takeaway]

### Action Items from This Mock
- [ ] [action]

-->
