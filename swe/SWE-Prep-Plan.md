# Senior SWE Interview Prep Plan — 6 Weeks

**Dates:** Tue Apr 14, 2026 → Sun May 24, 2026
**Target:** Start applying the week of May 25, 2026
**Weekly budget:** ~13.5 hrs (1.5 hr × 5 weekdays + 3 hr × 2 weekend days)
**Split:** ~50% DSA / ~50% System Design, with spaced-repetition review woven into every day.

---

## About this plan

**Who:** Senior SWE, 9 years total experience (7 at Microsoft on Azure Software-Defined Networking Control Plane). Targeting Senior SWE roles at top-tier tech companies, Seattle area.

**Why 50/50 DSA/SD:** SDN control plane background means system design concepts (consistency, replication, distributed coordination) are familiar in practice but need to be articulated at the whiteboard level. DSA is not a weakness but needs sharpening on specific patterns. The split reflects equal risk on both axes.

**Reference materials used in this plan:**
- **NeetCode 150** — a curated list of 150 LeetCode problems organized by pattern (arrays, two pointers, trees, graphs, DP, etc.), widely used for FAANG-level prep. See [neetcode.io](https://neetcode.io).
- **DDIA** — *Designing Data-Intensive Applications* by Martin Kleppmann. The primary SD reading material. Covers reliability, replication, partitioning, transactions, CAP, and consensus.
- **SDI Vol 2** — *System Design Interview – An Insider's Guide: Volume 2* by Alex Xu. End-to-end design walkthroughs (distributed message queue, payment system, proximity service, metrics monitoring, etc.) structured like real interviews: requirements → estimation → API → data model → HLD → deep dive → tradeoffs. Use as mock prep reading — read the relevant chapter the day before or morning of a mock.
- **Hello Interview / Interviewing.io** — platforms for booking paid or peer SD mock interviews with real engineers. Use for Saturday mocks; self-graded solo mocks are a fallback, not a substitute.

**Companion files (all in the `SWE Interview/` folder):**
- `SWE-Prep-Plan.md` — this file
- `Flashcards/SWE-Flashcards.md` — full flashcard deck in markdown (source of truth)
- `Flashcards/SWE-Flashcards.html` — interactive flashcard web app (open in browser); deep-link to a specific card via `SWE-Flashcards.html#F14`
- `Flashcards/cards.js` — card data file loaded by the HTML app
- `Prep-Plan-Viewer.html` — visual HTML calendar view of this plan with LC links and card deep-links

---

## How to use the flashcards

**Flashcard system:** The flashcard file contains 13 decks. Deck 0 is the personal "flagged problems" deck (22 cards, F1–F22) — problems that caused trouble and need extra repetition. Decks 1–8 are DSA pattern decks. Decks 9–12 are System Design / DDIA decks.

**Daily warm-up routine (15–30 min):**
1. Open the specified deck(s) for that day
2. Read the question — *attempt the answer in your head or scratch paper* before scrolling/flipping
3. Reveal the answer and compare honestly
4. Mark "got it" or "missed it" — missed cards come back sooner

**Timing calibration:** The 15-min warm-up assumes 2–4 specific cards called out by name (e.g., "F6+F7"). Every day after the first pass does this. A full first-pass through all 22 Deck 0 cards with no time pressure per card takes ~45 min — budget accordingly the first time you run a new full deck.

**Flagged re-solve workflow (for ⚠️ sessions, ~30 min per problem):**
1. **Flashcard first (5 min):** Pull the Deck 0 card, recall the key insight from memory before reading the answer
2. **Blank-page on LeetCode (20 min):** Solve it fresh with no hints. The goal is clean execution on the specific detail that tripped you up — not just getting AC
3. **Post-mortem (5 min):** If you got stuck again, note *exactly where* and update your flashcard hint

**Spaced repetition intervals:** +1d, +3d, +7d, +14d, +21d, +30d after first completion of a deck.

---

## Guiding principles

1. **Retrieval > re-reading.** Every session starts with a short flashcard warm-up. Re-reading DDIA without active recall is low-yield.
2. **One deep thing per day.** Weekdays have a single focused block (one LC problem OR one SD deep-dive). Don't try to do both on a weekday.
3. **Spaced repetition cadence.** Each completed topic is reviewed at Day 1, 3, 7, 14, 21, 30 after first completion. Miss a day → don't try to catch up on everything, just resume.
4. **Mocks are non-negotiable.** Book real SD mocks weekly (Interviewing.io, Hello Interview, peer). Self-graded mocks count but are weaker signal.
5. **Behavioral prep is cheap.** 30 min/week on STAR stories is enough given your 9 YoE.

---

## Baseline snapshot (Apr 14)

From your NeetCode tree:

- **Completed (DSA ready for review-only):** Arrays & Hashing, Two Pointers, Stack, Binary Search, Sliding Window, Trees, Tries, Backtracking, Linked List, Heap / Priority Queue, Graphs, 1-D DP
- **Not started:** Intervals, Greedy, Advanced Graphs, 2-D DP, Bit Manipulation, Math & Geometry
- **System Design:** Reading DDIA, doing walkthroughs, early mocks show gaps.

**⚠️ Flagged problems (gave you trouble — see Deck 0 in Flashcards):**

| Problem | Topic | Key insight flagged |
|---|---|---|
| Top K Frequent Elements | Arrays & Hashing | Bucket sort O(n) — not just heap |
| Encode and Decode | Arrays & Hashing | Length-prefixed chunks, not delimiter |
| Longest Consecutive Sequence | Arrays & Hashing | Hashset, only start count when n-1 absent |
| 3Sum | Two Pointers | Sort first; duplicate-skip logic |
| Trapping Rain Water | Two Pointers | leftMax/rightMax; `l < r` not `l <= r` |
| Daily Temperatures | Stack | Monotonic stack of indices; larger clears smaller |
| Largest Rectangle in Histogram | Stack | Store `(height, start_index)` in stack for width tracking |
| Koko Eating Bananas | Binary Search | Don't return early on equality; ceiling division |
| Median of Two Sorted Arrays | Binary Search | Partition j = (m+n+1)//2 - i; ±inf guards |
| Longest Repeating Char Replacement | Sliding Window | maxCount stays stale-high intentionally |
| Sliding Window Maximum | Sliding Window | Monotonic deque; pop back when smaller; pop front when out-of-window |
| Remove Nth Node from End | Linked List | n+1 gap so slow lands *before* target |
| Find the Duplicate Number | Linked List | Floyd's: start=index 0, not value 0; return entrance not meeting point |
| Merge K Sorted Lists | Heap | Heap=streaming; D&C=space; both O(N log k) |
| **Task Scheduler** | **Heap / Priority Queue** | **Math formula: `max(len(tasks), (max_count-1)*(n+1) + count_of_max)` — not just heap simulation** |
| Kth Smallest in BST | Trees | Iterative inorder: push only when node non-null, don't pre-push |
| Serialize/Deserialize Binary Tree | Trees | BFS with null markers OR DFS with length prefix |
| N-Queens | Backtracking | Track cols, diag (r-c), anti_diag (r+c) |
| Course Schedule | Graphs | Kahn's: count processed==n; DFS: 3-color |
| Graph Valid Tree | Graphs | Prescreen edges==n-1 THEN check connectivity |
| Maximum Product Subarray | 1-D DP | Track curMax and curMin; update both simultaneously |
| Reorder List | Linked List | Find midpoint (slow/fast pointers) → reverse second half → merge the two halves |

Strategy:
- **Weeks 1–2:** All 12 core topics are complete — use this time to burn down flagged problem re-solves and start new DSA (Intervals, Greedy). SD focus on fundamentals (reliability/scalability/consistency) since mocks are weak.
- **Weeks 3–4:** New DSA topics (continue Greedy, 2-D DP, Advanced Graphs intro). SD focus on common designs (rate limiter, chat, Instagram, job scheduler) with Xu Vol 2 chapters as mock prep reading.
- **Weeks 5–6:** Finish long-tail DSA (Bit Manip, Math & Geometry). SD shifts to intensive mocks + weak-spot drilling. Mixed-topic LC sets simulating real interviews.

---

## Weekly rhythm (template)

| Day  | Time  | Block 1 (warm-up)          | Block 2 (main work)                                 |
|------|-------|----------------------------|-----------------------------------------------------|
| Mon  | 1.5 h | 15 min flashcards (DSA)    | 75 min: 1 medium LC (new topic or review)           |
| Tue  | 1.5 h | 15 min flashcards (SD)     | 75 min: SD reading + write 1-pager on a concept     |
| Wed  | 1.5 h | 15 min flashcards (DSA)    | 75 min: 1 medium LC                                 |
| Thu  | 1.5 h | 15 min flashcards (SD)     | 75 min: SD problem outline (solo, timed 45 min) + review |
| Fri  | 1.5 h | 15 min flashcards (mixed)  | 75 min: Review week's LCs — re-solve without hints  |
| Sat  | 3 h   | 30 min flashcards          | 90 min SD mock (or recorded solo mock) + 60 min hard LC |
| Sun  | 3 h   | 30 min flashcards          | 90 min: 2 LC problems timed + 60 min SD review/DDIA chapter |

**Total:** ~13.5 h/week. Drop one weekday block if life happens; never drop Saturday mock.

---

## Spaced repetition queue (auto-scheduling rule)

When you complete a topic or a flashcard deck for the first time, add review sessions at:

- **+1 day** (quick recall)
- **+3 days** (short deck)
- **+7 days** (full deck)
- **+14 days** (full deck)
- **+21 days** (full deck)
- **+30 days** (full deck, final)

The flashcard file (`SWE-Flashcards.md`) is pre-populated with decks for the 8 completed DSA topics and a DDIA/SD deck. Add new decks as you finish topics (template at the bottom of that file).

---

# Week 1: Apr 14 – Apr 19

**DSA focus:** Flagged problem re-solves (Linked List, Heap, Stack groups) + start Intervals
**SD focus:** Reliability, Scalability, Maintainability (DDIA Ch 1); back-of-envelope estimation

### Tue Apr 14 — 1.5 h
- 15 min: Flashcards — Deck 0 (flagged) + Arrays & Hashing (first pass of each)
- 75 min: LC — Re-implement **Reorder List** from scratch (find midpoint → reverse second half → merge). Then re-implement **Remove Nth Node from End** — pay attention to the n+1 gap.

> ⚠️ *Flagged re-solves:* Reorder List (F22), Remove Nth Node from End (F12)

### Wed Apr 15 — 1.5 h
- 15 min: Flashcards — Two Pointers deck
- 75 min: DDIA Ch 1 re-read + write a 1-page summary in your own words on *"What makes a system reliable vs. available vs. maintainable?"* Do not copy sentences.

### Thu Apr 16 — 1.5 h
- 15 min: Flashcards — Stack deck (Deck 0 cards F6+F7 specifically)
- 75 min: LC — **Merge K Sorted Lists**: implement both the heap solution AND the divide-and-conquer solution. After each, write one sentence on when you'd use each in a real system. Then re-implement **Daily Temperatures** from scratch using the monotonic stack (not the bucket-sort variant — that one is already internalized).

> ⚠️ *Flagged re-solves:* Merge K Sorted Lists, Daily Temperatures

### Fri Apr 17 — 1.5 h *(adjusted)*
- 45 min: Finish remaining Deck 0 cards — resume from where you left off, no time pressure per card
- 45 min: LC — **Reorder List** (F22) clean solve on LeetCode, then **Remove Nth Node from End** (F12). No hints. Both should be fluent by end of session.

> ⚠️ *Flagged re-solves:* Reorder List (F22), Remove Nth Node from End (F12)

> *Note: Binary Search deck (F8+F9) and back-of-envelope estimation drill moved — see Sat and Week 2 Thu respectively.*

### Sat Apr 18 — 3 h *(adjusted warm-up)*
- 30 min: Flashcards — Binary Search deck (Deck 0 cards F8+F9) *(moved from Fri)* + Sliding Window deck (F10+F11) + System Design (DDIA Ch 1) deck
- 90 min: **SD Mock #1** — Design a URL shortener (solo, timed, record yourself or write it all up). Score yourself against the Hello Interview rubric after.
- 60 min: LC — Re-implement **Task Scheduler** both ways: heap simulation AND the math formula (F15). Then re-implement **Sliding Window Maximum** with a deque from scratch — no peeking.

> ⚠️ *Flagged re-solves:* Task Scheduler (both approaches), Sliding Window Maximum

### Sun Apr 19 — 3 h
- 30 min: Flashcards — Trees deck (Deck 0 cards F16+F17) + Tries deck
- 90 min: Timed session — re-implement **Serialize/Deserialize Binary Tree** (BFS version, then DFS version) + **Kth Smallest in BST** iterative. Both are flagged.
- 60 min: DDIA Ch 2 (Data Models) start — read + note-take, no more than 40 pages.

> ⚠️ *Flagged re-solves:* Serialize/Deserialize Binary Tree, Kth Smallest in BST

**End of Week 1 check:** Linked List and Heap should be fully green. You should have 1 SD mock on record and 5 DSA flashcard decks cycled once.

---

# Week 2: Apr 20 – Apr 26

**DSA focus:** Intervals (complete), start Greedy; flagged re-solves for Graphs/DP group
**SD focus:** Data models, storage engines, indexes (DDIA Ch 2–3)

### Mon Apr 20 — 1.5 h
- 15 min: Flashcards — Backtracking deck (Deck 0 card F18) + Arrays & Hashing (+7d review — Deck 0 cards F1+F2+F3)
- 75 min: LC — Intervals kickoff: Insert Interval + Merge Intervals. Then re-solve **N-Queens** — without peeking, write the three tracking sets from memory.

> ⚠️ *Flagged re-solve:* N-Queens

### Tue Apr 21 — 1.5 h
- 15 min: Flashcards — System Design (DDIA Ch 1) deck
- 75 min: DDIA Ch 3 — storage engines (LSM vs B-tree). Afterward, without notes, explain write/read amplification for each. Write 1 paragraph per engine.

### Wed Apr 22 — 1.5 h
- 15 min: Flashcards — Two Pointers (+7d review — Deck 0 cards F4+F5)
- 75 min: LC — Non-overlapping Intervals + **Course Schedule** re-solve (both Kahn's and DFS 3-color — write both). You know these patterns; the goal is to state the termination condition for each without hesitation.

> ⚠️ *Flagged re-solve:* Course Schedule (both approaches)

### Thu Apr 23 — 1.5 h *(adjusted)*
- 15 min: Flashcards — new System Design deck (DDIA Ch 2–3)
- 20 min: Back-of-envelope estimation drill *(moved from Fri Apr 17)* — estimate QPS for Twitter reads, storage for YouTube uploads/year, bandwidth for Netflix peak. Write assumptions explicitly.
- 55 min: SD problem — Design a key-value store (timed, then compare to a reference).

### Fri Apr 24 — 1.5 h
- 15 min: Flashcards — Stack (+7d review — Deck 0 cards F6+F7) + Heap (new deck, first pass)
- 75 min: LC review — re-solve **Graph Valid Tree** (prescreen first, then connectivity check) + re-solve **Find the Duplicate Number** using Floyd's cycle detection. Both flagged.

> ⚠️ *Flagged re-solves:* Graph Valid Tree, Find the Duplicate Number

### Sat Apr 25 — 3 h
- 30 min: Flashcards — mixed (Intervals deck new + SD)
- 90 min: **SD Mock #2** — Design Twitter/X feed (solo or peer). Focus specifically on write vs. read fan-out tradeoffs.
- 60 min: LC — Meeting Rooms II (finish Intervals) + Greedy kickoff: Jump Game + Gas Station.

### Sun Apr 26 — 3 h
- 30 min: Flashcards — Binary Search + Sliding Window (+7d review)
- 90 min: 2 mediums timed (pick one graph, one interval).
- 60 min: DDIA Ch 4 (Encoding & Evolution) — read + 5 bullet takeaways.

**End of Week 2:** Graphs green, Intervals ~70% done, 2 SD mocks recorded, DDIA Ch 1–4 summarized.

---

# Week 3: Apr 27 – May 3

**DSA focus:** Finish Intervals, start Greedy, continue 1-D DP
**SD focus:** Replication, Partitioning (DDIA Ch 5–6); Xu Vol 2: Distributed Message Queue

### Mon Apr 27 — 1.5 h
- 15 min: Flashcards — Trees (+14d) + Tries (+14d)
- 75 min: LC — Meeting Rooms II + Min Interval to Include Each Query.

### Tue Apr 28 — 1.5 h
- 15 min: Flashcards — DDIA Ch 2–3 deck
- 40 min: DDIA Ch 5 (Replication) — skim key concepts. Draw single-leader vs. multi-leader vs. leaderless from memory at the end.
- 35 min: Xu Vol 2 — "Distributed Message Queue" chapter (mock prep for Thu's WhatsApp design — message ordering, delivery guarantees, consumer groups).

### Wed Apr 29 — 1.5 h
- 15 min: Flashcards — Backtracking (+14d)
- 75 min: LC — Jump Game + Gas Station + Hand of Straights (greedy). State the greedy invariant in plain English for each.

### Thu Apr 30 — 1.5 h
- 15 min: Flashcards — new SD deck (Replication)
- 75 min: SD problem — Design WhatsApp/chat (timed 45 min). Focus on message ordering, delivery semantics, presence.

### Fri May 1 — 1.5 h
- 15 min: Flashcards — Arrays & Hashing (+14d — Deck 0 cards F1+F2+F3)
- 75 min: LC — 1-D DP push: Climbing Stairs, House Robber I & II, **Maximum Product Subarray** (flagged — implement tracking both curMax and curMin, update simultaneously). Then Longest Palindromic Substring.

> ⚠️ *Flagged re-solve:* Maximum Product Subarray

### Sat May 2 — 3 h
- 30 min: Flashcards — mixed
- 90 min: **SD Mock #3** — Design a rate limiter (prefer a real peer mock this week if possible).
- 60 min: LC — Longest Common Subsequence + Word Break (1-D DP).

### Sun May 3 — 3 h
- 30 min: Flashcards — review everything ≥14d old
- 90 min: 2 mediums timed, mixed.
- 60 min: DDIA Ch 6 (Partitioning) — read + write the consistent hashing argument in your own words.

**End of Week 3:** Intervals green, Greedy ~80%, 1-D DP ~70%, Replication + Partitioning internalized.

---

# Week 4: May 4 – May 10

**DSA focus:** Finish Greedy + 1-D DP, start 2-D DP
**SD focus:** Transactions, Consistency, CAP, Consensus (DDIA Ch 7–9); Xu Vol 2: Payment System

### Mon May 4 — 1.5 h
- 15 min: Flashcards — Two Pointers (+21d) + Stack (+21d)
- 75 min: LC — Coin Change + Partition Equal Subset Sum.

### Tue May 5 — 1.5 h
- 15 min: Flashcards — Replication deck
- 40 min: DDIA Ch 7 (Transactions) — focus on isolation levels. Must be able to draw the matrix (read committed, snapshot, serializable) from memory.
- 35 min: Xu Vol 2 — "Payment System" chapter (concrete application of idempotency, exactly-once semantics, and transaction consistency).

### Wed May 6 — 1.5 h
- 15 min: Flashcards — Binary Search (+21d)
- 75 min: LC — Unique Paths + Longest Increasing Subsequence (2-D DP intro).

### Thu May 7 — 1.5 h
- 15 min: Flashcards — new Consistency/CAP deck
- 75 min: SD problem — Design Instagram/photo upload+feed (timed 45 min).

### Fri May 8 — 1.5 h
- 15 min: Flashcards — Sliding Window (+21d)
- 75 min: LC review — re-solve this week's 2-D DPs from scratch. Explain the state + transition out loud.

### Sat May 9 — 3 h
- 30 min: Flashcards — mixed
- 90 min: **SD Mock #4** — Design a distributed job scheduler. Peer mock if possible.
- 60 min: LC — Edit Distance + Interleaving String (2-D DP).

### Sun May 10 — 3 h
- 30 min: Flashcards — review everything ≥14d old
- 90 min: 2 mediums timed, mixed.
- 60 min: DDIA Ch 8–9 (Distributed troubles, Consistency) — skim + flashcard add.

**End of Week 4:** Greedy green, 1-D DP green, 2-D DP ~60%. CAP/transactions internalized.

---

# Week 5: May 11 – May 17

**DSA focus:** Finish 2-D DP, Bit Manipulation, Math & Geometry, dip into Advanced Graphs
**SD focus:** Intensive mocks + weak-spot drilling; Xu Vol 2: targeted chapter for weakest area
This week shifts toward synthesis. Fewer new concepts, more end-to-end practice.

### Mon May 11 — 1.5 h
- 15 min: Flashcards — Trees (+30d) + Tries (+30d)
- 75 min: LC — Single Number + Counting Bits + Reverse Bits (bit manipulation speed drill).

### Tue May 12 — 1.5 h
- 15 min: Flashcards — Consistency/CAP deck
- 35 min: Xu Vol 2 — read the chapter closest to your weakest mock topic (Proximity Service if geo patterns are weak, Metrics Monitoring for time-series/aggregation, or Hotel Reservation for booking/concurrency).
- 40 min: Re-attempt your weakest SD topic from mocks 1–4 fully, applying what you just read. Compare to v1.

### Wed May 13 — 1.5 h
- 15 min: Flashcards — Backtracking (+30d)
- 75 min: LC — Rotate Image + Spiral Matrix + Happy Number (math & geometry).

### Thu May 14 — 1.5 h
- 15 min: Flashcards — all SD decks, fast pass
- 75 min: SD problem — Design a search autocomplete / typeahead (timed 45 min).

### Fri May 15 — 1.5 h
- 15 min: Flashcards — Arrays & Hashing (+30d, final)
- 75 min: LC — Advanced Graphs sampler: Network Delay Time (Dijkstra) + Reconstruct Itinerary (Hierholzer). Know Dijkstra cold.

### Sat May 16 — 3 h
- 30 min: Flashcards — mixed
- 120 min: **SD Mock #5** — full 60-min peer mock (book this by Tue May 12). 60 min of self-review afterward.
- 30 min: LC — 1 hard problem from a topic you're confident in (confidence build).

### Sun May 17 — 3 h
- 30 min: Flashcards
- 90 min: 2 mediums timed, mixed topics, pick at random.
- 60 min: Behavioral prep — write 4–6 STAR stories from your Azure SDN work. Cover: conflict, ambiguity, driving change, scope creep, failure, mentoring.

**End of Week 5:** All NeetCode 150 topics touched. 5 SD mocks done. STAR bank started.

---

# Week 6: May 18 – May 24

**DSA focus:** Mixed-topic interview simulations, weak-spot drilling
**SD focus:** 2 more mocks + polish
**Behavioral:** STAR rehearsal
**Goal:** Walk into week 7 application-ready.

### Mon May 18 — 1.5 h
- 15 min: Flashcards — Intervals deck (new, from your own notes) + Greedy deck (new)
- 75 min: **Full LC interview sim** — 1 medium in 20 min + 1 hard in 40 min. Strict timing. No hints.

### Tue May 19 — 1.5 h
- 15 min: Flashcards — all SD decks fast pass
- 75 min: SD problem — Design YouTube/video streaming (timed 45 min).

### Wed May 20 — 1.5 h
- 15 min: Flashcards — Heap (+30d) + DP decks (new)
- 75 min: LC — pick 2 weakest topics from the last 5 weeks. Do one medium from each.

### Thu May 21 — 1.5 h
- 15 min: Flashcards — Behavioral STAR recall (speak each story out loud in < 2 min)
- 75 min: SD problem — Design a notification system (timed 45 min).

### Fri May 22 — 1.5 h
- 15 min: Flashcards
- 75 min: LC — 1 hard from a weak topic. Full write-up.

### Sat May 23 — 3 h
- 30 min: Flashcards
- 90 min: **SD Mock #6** — peer mock, pretend it's on-site.
- 60 min: LC — 1 medium + 1 hard, timed.

### Sun May 24 — 3 h
- 30 min: Flashcards — final sweep
- 90 min: **SD Mock #7** — solo timed, pick a design you haven't done yet (e.g., Dropbox, Uber).
- 60 min: Final behavioral rehearsal + resume/LinkedIn polish.

**End of Week 6:** Ready to apply starting Mon May 25.

---

## Metrics to track (keep a running log)

- LC problems solved, by topic, by difficulty
- LC "first-try correct" rate (target > 60% on mediums in completed topics by end of Week 4)
- SD mocks done + 1-line takeaway for each
- Flashcard deck completion (first pass + review count)
- DDIA chapters fully absorbed (able to explain without notes)
- STAR stories polished (target: 6 by Week 6)

## If you fall behind

Triage in this order:
1. **Keep the Saturday mock.** Always.
2. **Keep the daily 15-min flashcard warm-up.** It's the compounding asset.
3. **Drop a weekday main block over dropping review.** Review > new content.
4. **Skip weekend #2 (Sunday) before skipping #1 (Saturday).**

## Apply criteria (gate before Week 7)

Before sending applications, you should be able to:
- Solve any NeetCode 150 medium in ≤ 25 min with ≥ 60% first-pass success.
- Complete a 45-min SD mock covering requirements → estimation → API → data model → HLD → deep-dive → tradeoffs, with your peer-rated score ≥ "hire" on ≥ 2 of your last 3 mocks.
- Recite 6 STAR stories in under 2 min each, without notes.
- Explain CAP, replication lag, LSM vs B-tree, consistent hashing, and Raft basics without opening DDIA.

---

See the **About this plan** section at the top for a full list of companion files. `SWE-Flashcards.md` has the initial decks — add new decks as you complete each new topic.

---

## Appendix: Flagged Problem Re-solve Schedule

Every problem you flagged appears at least twice in the calendar above (once in the relevant topic week, once in a later review), plus in Deck 0 of the flashcards at every warm-up. This table gives you the full queue at a glance so you can find them without scrolling.

| Problem | Topic | First re-solve | Second re-solve | Deck 0 card |
|---|---|---|---|---|
| Top K Frequent Elements | Arrays & Hashing | **Week 1 Sun** (timed) | Week 3 Fri (mixed review) | F1 |
| Encode and Decode | Arrays & Hashing | **Week 1 Sun** (timed) | Week 3 Fri | F2 |
| Longest Consecutive Sequence | Arrays & Hashing | **Week 1 Sun** (timed) | Week 3 Fri | F3 |
| 3Sum | Two Pointers | **Week 2 Wed** (timed) | Week 4 Fri | F4 |
| Trapping Rain Water | Two Pointers | **Week 2 Wed** (timed) | Week 4 Fri | F5 |
| Daily Temperatures | Stack | **Week 1 Thu** | Week 3 Fri | F6 |
| Largest Rectangle in Histogram | Stack | **Week 1 Sun** (timed) | Week 3 Mon | F7 |
| Koko Eating Bananas | Binary Search | **Week 2 Mon** (timed) | Week 4 Wed | F8 |
| Median of Two Sorted Arrays | Binary Search | **Week 2 Mon** (timed) | Week 5 Mon | F9 |
| Longest Repeating Char Replacement | Sliding Window | **Week 2 Sun** (timed) | Week 4 Fri | F10 |
| Sliding Window Maximum | Sliding Window | **Week 1 Sat** | Week 4 Sun | F11 |
| Remove Nth Node from End | Linked List | **Week 1 Tue** | Week 3 Wed | F12 |
| Find the Duplicate Number | Linked List | **Week 2 Fri** | Week 4 Wed | F13 |
| Merge K Sorted Lists | Heap | **Week 1 Thu** | Week 3 Sat | F14 |
| Task Scheduler | Heap / Priority Queue | **Week 1 Sat** (both approaches) | Week 3 Thu | F15 |
| Kth Smallest in BST | Trees | **Week 1 Sun** | Week 3 Mon | F16 |
| Serialize/Deserialize Binary Tree | Trees | **Week 1 Sun** | Week 4 Mon | F17 |
| N-Queens | Backtracking | **Week 2 Mon** | Week 4 Mon | F18 |
| Course Schedule | Graphs | **Week 2 Wed** | Week 4 Mon | F19 |
| Graph Valid Tree | Graphs | **Week 2 Fri** | Week 4 Thu | F20 |
| Maximum Product Subarray | 1-D DP | **Week 3 Fri** | Week 5 Wed | F21 |
| Reorder List | Linked List | **Week 1 Tue** | Week 3 Wed | F22 |

**Bold** = earliest scheduled re-solve (Week 1 or 2). All are incorporated into later review days organically. If you want to accelerate any of these, substitute one of the "pick from completed list" timed sessions with a flagged problem.
