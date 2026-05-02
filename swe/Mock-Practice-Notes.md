# Mock & Practice Session Notes

**Purpose:** Track learnings, gaps, and action items from every SD mock and practice session. Review this file before each new mock to avoid repeating mistakes.

**How to use:** After each mock or timed practice, add an entry below with the date, topic, format, and categorized takeaways. Tag each takeaway with a theme so patterns across mocks become visible over time.

---

## Themes Index

Quick reference for recurring gap areas. Updated as new mocks surface patterns.

| Theme | Description | Mocks where it appeared |
|---|---|---|
| **NFR precision** | Be concrete on latency targets, availability numbers; separate NFRs from functional reqs cleanly | WhatsApp (Apr 30) |
| **API completeness** | Define response shapes, not just request bodies; add pagination; specify WebSocket event contracts | WhatsApp (Apr 30) |
| **Offline/reconnect** | Per-user offsets, durable storage before notification, catchup on reconnect | WhatsApp (Apr 30) |
| **Media handling** | Pre-signed URLs, blob storage, keep DB lean with references only | WhatsApp (Apr 30) |
| **Fan-out & PubSub** | Show delivery path to recipients, not just inbound; PubSub for cross-server routing at scale | WhatsApp (Apr 30) |
| **Multi-device** | Per-device sessions and delivery tracking, not just per-user | WhatsApp (Apr 30) |

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
