# Flashcards — SWE Interview Prep

**Format:** Read the problem summary and question. Pause before scrolling to the answer — the dots are your buffer. Spaced-repetition cadence: +1d, +3d, +7d, +14d, +21d, +30d. Mark a card "mature" in your notes when it feels instant and stop including it in fast passes.

**Answer format:** Answer always starts on a new line after `↳ A:` or `↳ Answer:`.

Decks in this file:

0. **⚠️ Flagged Problems — Your Personal Gotchas** ← start here for every warm-up
1. Arrays & Hashing
2. Two Pointers
3. Stack
4. Binary Search
5. Sliding Window
6. Trees
7. Tries
8. Backtracking
9. System Design — DDIA Ch 1 (Reliability, Scalability, Maintainability)
10. System Design — DDIA Ch 2–3 (Data models, storage engines, indexes)
11. System Design — Replication, Partitioning, Consistency, CAP
12. System Design — Common design patterns & primitives

At the bottom: a **deck template** for topics you'll complete (Intervals, Greedy, Advanced Graphs, 2-D DP, Bit Manipulation, Math & Geometry).

---

## 0. ⚠️ Flagged Problems — Your Personal Gotchas

These cards encode the *specific insight you missed*, not a generic pattern description. Each card shows the problem, your original hint, and a question targeting that exact gap.

Card format:
- **Problem + topic**
- *Brief description and your original hint*
- **Question** targeting the gap
- `...` scroll buffer
- **Answer** on its own line

---

**F1 · Top K Frequent Elements** — Arrays & Hashing

*Given an array `nums` and integer `k`, return the k most frequent elements in any order.*
*Your note: "buckets"*

You know the heap solution (O(n log k)). What is the O(n) bucket approach, and walk through why it's bounded by n?

**Example:**
```
Input:  nums = [1,1,1,2,2,3], k = 2
Output: [1, 2]
```

.
.
.
.
↳ **Answer:**
Build a `bucket` list of size `n+1` where index `i` holds all elements with frequency `i`. (Frequency can't exceed n, so the list is always bounded.) Populate using a `Counter`. Scan from index `n` down to `1`, collecting elements into the result until you have `k`. O(n) time — no sort or heap, just a linear scan.

---

**F2 · Encode and Decode Strings** — Arrays & Hashing

*Design an algorithm to encode a list of strings to a single string, then decode it back. The strings may contain any character including the delimiter you choose.*
*Your note: "Chunk delimiter"*

What goes wrong with a naive delimiter (e.g., comma), and what's the robust encoding scheme?

**Example:**
```
Input:  ["hello", "world"]
Encode: "5#hello5#world"
Decode: ["hello", "world"]
```

.
.
.
.
↳ **Answer:**
Any delimiter can appear inside the strings themselves, so a naive split will break. Robust solution: **length-prefix encoding**. Encode as `f"{len(s)}#{s}"` for each string, concatenated. Decode by reading digits until `#`, slicing exactly that many characters starting after `#`, then advancing the pointer. Works for any string content, including strings containing `#`.

---

**F3 · Longest Consecutive Sequence** — Arrays & Hashing

*Given an unsorted array of integers, return the length of the longest consecutive elements sequence. Must run in O(n).*
*Your note: "Use hashset"*

Why not just sort the array? What's the exact O(n) trick, and what's the guard that prevents revisiting starts?

**Example:**
```
Input:  nums = [100,4,200,1,3,2]
Output: 4
```

.
.
.
.
↳ **Answer:**
Sorting is O(n log n) and the constraint says O(n). Put all nums into a set. For each number `n`, **only start counting if `n - 1` is NOT in the set** — this means `n` is the start of a new run. Then walk forward (`n+1`, `n+2`, ...) until the run breaks. Each number is visited at most twice — once as a potential start (skipped quickly if not a start) and once during a valid run. O(n) total.

---

**F4 · 3Sum** — Two Pointers

*Given an integer array `nums`, return all triplets `[nums[i], nums[j], nums[k]]` such that `i ≠ j ≠ k` and `nums[i] + nums[j] + nums[k] == 0`. No duplicate triplets.*
*Your note: "Sort first"*

Why must you sort, and what are the two places you skip duplicates (outer and inner)?

**Example:**
```
Input:  nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
```

.
.
.
.
↳ **Answer:**
Sorting enables a two-pointer inner sweep (sum is monotonic with pointer movement — moving left right increases sum, moving right left decreases it). **Outer duplicate skip:** `if i > 0 and nums[i] == nums[i-1]: continue` — avoids repeating the same outer value. **Inner duplicate skip:** after recording a valid triplet, advance `l` and `r` while they match their previous value (e.g., `while l < r and nums[l] == nums[l-1]: l++`). Both skips are necessary to avoid duplicate triplets in the output.

---

**F5 · Trapping Rain Water** — Two Pointers

*Given an elevation map `height[]`, compute how much water it can trap after raining.*
*Your note: "Track leftmax and rightmax. Beware while loop condition"*

Describe the two-pointer approach: what do the pointers track, when do you move which side, and what's the off-by-one in the while condition?

**Example:**
```
Input:  height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
```

.
.
.
.
↳ **Answer:**
Maintain `leftMax` and `rightMax` — the tallest bar seen so far from each side. Move the pointer on the side with the **smaller max**, because that side is the binding constraint (water at any position = `min(leftMax, rightMax) - height[pos]`). Water added at each step = `min(leftMax, rightMax) - height[ptr]`. **While condition: `l < r` (strict).** Using `<=` causes the bar at `l == r` to be counted from both sides, double-counting zero water but creating an incorrect indexing step.

---

**F6 · Daily Temperatures** — Stack

*Given an array `temperatures`, return an array `answer` where `answer[i]` is the number of days you have to wait after day `i` to get a warmer temperature. If no future warmer day exists, `answer[i] = 0`.*
*Your note: "Stack of previous index, pop and set result when larger temp found. Stack always has smaller value on top because bigger value will clear stack"*

Describe the monotonic stack invariant precisely: what does the stack store, what order are values in from bottom to top, and what happens when you see a larger temperature?

**Example:**
```
Input:  temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
```

.
.
.
.
↳ **Answer:**
The stack stores **indices** of temperatures in strictly increasing order from bottom to top — equivalently, the corresponding temperatures are in **decreasing** order (smaller temps on top). When you encounter `T[i]` larger than `T[stack[-1]]`, pop repeatedly: for each popped index `j`, the answer is `i - j`. Continue popping while the stack is non-empty and the top is smaller. Then push `i`. The invariant holds because any index whose temperature is larger than a later index will "clear" everything below it before being pushed.

---

**F7 · Largest Rectangle in Histogram** — Stack

*Given an array `heights` representing the widths of bars in a histogram, find the area of the largest rectangle.*
*Your note: "Use monotonic stack and pop when lower height is found. Keep track of width by using index in stack or custom class with width"*

What does the stack store (and why does it need more than just the index), and how do you track the correct width when you pop?

**Example:**
```
Input:  heights = [2,1,5,6,2,3]
Output: 10
```

.
.
.
.
↳ **Answer:**
The stack stores `(height, start_index)` pairs — `start_index` is the leftmost x-position this height can still extend back to. When `heights[i] < stack[-1].height`, pop: `area = popped.height * (i - popped.start_index)`. The new bar's `start_index` is set to the last popped `start_index` (it can extend back that far because all taller bars have been cleared). After iterating, pop remaining stack entries using `n` as the right boundary. **Append a sentinel `(0, 0)` or just check at the end** — ensures everything gets flushed. Without `start_index` in the stack, you can't reconstruct the rectangle's left boundary after popping.

---

**F8 · Koko Eating Bananas** — Binary Search

*Koko has `piles` of bananas and `h` hours before guards return. She eats at speed `k` bananas/hour, one pile at a time. Find the minimum integer `k` such that she can eat all piles in `h` hours.*
*Your note: "Don't return early when equals, record the candidate when it's <= h. Watch out for int overflow"*

What is the search space, what is the predicate, and what are the two bugs you flagged?

**Example:**
```
Input:  piles = [3,6,7,11], h = 8
Output: 4
```

.
.
.
.
↳ **Answer:**
Search space: `k ∈ [1, max(piles)]`. Predicate: `sum(ceil(p / k) for p in piles) <= h`. **Bug 1 — don't return early on equality:** when the predicate holds, record `result = mid` as a candidate but continue searching left (`r = mid - 1`) for a smaller valid speed. `return mid` on equality locks in a non-minimal answer. **Bug 2 — ceiling division:** use `math.ceil(p / k)` or `(p + k - 1) // k`. In Python this is fine; in Java/C++ integer division truncates, so `p / k` underestimates, making Koko appear faster than she is.

---

**F9 · Median of Two Sorted Arrays** — Binary Search

*Given two sorted arrays `nums1` and `nums2` of sizes `m` and `n`, return the median of the two sorted arrays in O(log(min(m, n))) time.*
*Your note: "Binary search on smaller array for partition. j = (m+n+1)/2 - i. When left partitions ≤ right partitions, return the answer. Odd → max of left partition. Even → average with min of right partition."*

Walk through the full partition logic: what are you binary-searching on, how is `j` derived, what is the validity condition, and how do you handle out-of-bounds?

**Example:**
```
Input:  nums1 = [1,3], nums2 = [2]
Output: 2.0

Input:  nums1 = [1,2], nums2 = [3,4]
Output: 2.5
```

.
.
.
.
↳ **Answer:**
Binary search on the **partition index `i`** in the shorter array A (length `m`). The partition in B is `j = (m + n + 1) // 2 - i`, derived from the rule that the left half always contains `(m+n+1)//2` elements total (the `+1` handles odd totals by putting the extra element on the left).

**Valid partition condition:** `A[i-1] <= B[j]` AND `B[j-1] <= A[i]` — left side of each partition is ≤ right side of the other.

- If `A[i-1] > B[j]`: partition is too far right in A → `r = i - 1`
- If `B[j-1] > A[i]`: partition is too far left in A → `l = i + 1`

**Result:** Odd total → `max(A[i-1], B[j-1])`. Even total → `(max(A[i-1], B[j-1]) + min(A[i], B[j])) / 2`.

**Out-of-bounds guards:** treat `A[i-1]` as `-∞` when `i == 0` and `A[i]` as `+∞` when `i == m`.

---

**F10 · Longest Repeating Character Replacement** — Sliding Window

*Given a string `s` and integer `k`, you can replace at most `k` characters in the window with any letter. Return the length of the longest substring with all the same letter after replacements.*
*Your note: "Sliding window, keep track of max count and shift window if exceeds max number of swaps. Then record max"*

What is the invariant that determines when the window is invalid, and why is it OK for `maxCount` to be stale-high when shrinking?

**Example:**
```
Input:  s = "AABABBA", k = 1
Output: 4
```

.
.
.
.
↳ **Answer:**
Window is invalid when `window_length - maxCount > k` — we'd need more than `k` replacements. When this happens, shrink left by one (decrement the count of `s[l]`, `l++`). **`maxCount` intentionally stays stale-high when shrinking:** it represents the highest frequency seen in *any* window we've examined. A stale-high `maxCount` only makes the validity check stricter — you'll never accept a window you shouldn't. The result only grows when we genuinely find a better window. This is correct because we only care about maximizing, never accepting a smaller valid window than the current best.

---

**F11 · Sliding Window Maximum** — Sliding Window

*Given an array `nums` and integer `k`, return an array of the maximums of each contiguous subarray of size `k`.*
*Your note: "Use monotonic linkedlist"*

What data structure, what invariant does it maintain, and what are the two pop conditions (back and front)?

**Example:**
```
Input:  nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
```

.
.
.
.
↳ **Answer:**
Use a **monotonic deque** (double-ended queue) of indices. Invariant: indices are in increasing order (left to right), and their corresponding values are in **decreasing** order — so `deque[0]` always holds the index of the window maximum.

**Two pop conditions:**
1. **Pop from the back** (`while deque and nums[deque[-1]] <= nums[i]`): any element smaller than the new element can never be the future maximum — remove them.
2. **Pop from the front** (`while deque and deque[0] < i - k + 1`): the front index has left the window — remove it.

After processing each index, `nums[deque[0]]` is the current window max. Append to result once `i >= k - 1`.

---

**F12 · Remove Nth Node From End of List** — Linked List

*Given the head of a linked list, remove the nth node from the end of the list and return its head.*
*Your note: "Two pointers with n distance"*

Why do you need an `n+1` gap (not n), and where do both pointers start?

**Example:**
```
Input:  head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
```

.
.
.
.
↳ **Answer:**
You need to stop at the **node before** the target so you can rewire `.next`. Use a **dummy head** — both pointers start there. Advance `fast` pointer `n + 1` steps ahead of `slow` (both starting from dummy). Then move both one step at a time until `fast` is `None`. At that point, `slow.next` is the node to delete. Remove with `slow.next = slow.next.next`. The dummy head handles the edge case of deleting the actual head node.

---

**F13 · Find the Duplicate Number** — Linked List

*Given an array `nums` of n+1 integers where each integer is in [1, n], find the duplicate without modifying the array, using O(1) extra space.*
*Your note: "Binary search for candidate value which would have equal count of vals equal or less. OR solve like loop in linked list where 'next' val is using val as index. Must use 0 as starting index when finding loop entrance and return index"*

Describe both approaches. For Floyd's: what is the "linked list", where does the traversal start, and what does the entrance of the cycle represent?

**Example:**
```
Input:  nums = [1,3,4,2,2]
Output: 2
```

.
.
.
.
↳ **Answer:**
**Binary search on value:** For candidate `mid`, count elements `<= mid`. If count `> mid`, duplicate is in `[1, mid]` by pigeonhole; else `[mid+1, n]`. O(n log n), O(1) space.

**Floyd's cycle detection:** Treat the array as an implicit linked list where index `i` points to `nums[i]` as its "next". Index `0` is the guaranteed start (no value points to 0 since values are in `[1, n]`). Phase 1: `slow = nums[slow]`, `fast = nums[nums[fast]]` — repeat until they meet inside the cycle. Phase 2: reset one pointer to index `0`, advance both one step at a time — they meet at the **duplicate value**, which is the cycle entrance (two array positions share the same value, creating two edges into that index). O(n), O(1) space.

---

**F14 · Merge K Sorted Lists** — Heap / Priority Queue

*Given k sorted linked lists, merge them all into one sorted linked list.*
*Your note: "Use heap or recursion (merge in parallel and then merge results). Heap is better for streaming data because it only requires head and not entire lists in memory. Divide and conquer is more space efficient"*

Both approaches are O(N log k). When would you argue for one over the other in an interview, and what's the heap's specific memory advantage?

**Example:**
```
Input:  [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
```

.
.
.
.
↳ **Answer:**
**Heap:** Push `(val, node)` for each list's current head. Pop minimum, push its `.next`, repeat. O(N log k). **Memory advantage:** only the current head of each list lives in the heap at any time — O(k) space. Ideal for streaming or external merge where lists are too large to fully load. **Implementation note:** in Python, add a tie-breaker index to the tuple since `ListNode` isn't comparable: `(val, i, node)`.

**Divide and conquer:** Pair up lists and merge each pair; recurse on results until one list remains. O(N log k) time, O(log k) recursive call stack. Better when lists are fully in memory and you want to avoid heap overhead.

**Interview framing:** if asked "what if these come from live streams?", answer heap. If asked "what if memory is constrained?", answer D&C.

---

**F15 · Task Scheduler** — Heap / Priority Queue

*Given a list of CPU tasks (letters A–Z) and a cooldown `n` meaning the same task must wait `n` intervals before running again. Return the minimum number of intervals to finish all tasks.*
*Your note: "Even though I had the heap solution, the optimal solution is to use a constant math formula"*

Describe both the heap simulation and the O(n) math formula. What does the formula count, and when does each term dominate?

**Example:**
```
Input:  tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
```

.
.
.
.
↳ **Answer:**
**Heap simulation:** Use a max-heap by frequency. Process rounds of size `n+1`: pop up to `n+1` tasks (highest frequency first), decrement counts, re-push non-zero counts. Add `n+1` per round (or `remaining tasks` on the last round). O(N log N).

**Math formula (O(n)):**
```
max_count = max(task_frequencies)
count_of_max = number of tasks with that frequency
answer = max(len(tasks), (max_count - 1) * (n + 1) + count_of_max)
```
**Intuition:** Arrange the most-frequent task at intervals of `n+1`. This creates a "frame" of `(max_count - 1)` full slots plus a final partial slot of `count_of_max`. If other tasks are plentiful enough to fill all idle gaps, there's no idle time and the answer is just `len(tasks)`. The `max()` captures both cases — sparse tasks (formula dominates) and dense tasks (total count dominates).

---

**F16 · Kth Smallest Element in a BST** — Trees

*Given a BST and integer `k`, return the kth smallest value.*
*Your note: "Use stack for inorder traversal but also use pointer. Don't push without checking left first"*

Write out the iterative inorder loop structure, and what's the exact bug caused by pushing without checking left first?

**Example:**
```
Input:  root = [3,1,4,null,2], k = 1
Output: 1
```

.
.
.
.
↳ **Answer:**
```python
stack, node = [], root
while node or stack:
    while node:          # go as far left as possible
        stack.append(node)
        node = node.left
    node = stack.pop()   # visit
    k -= 1
    if k == 0:
        return node.val
    node = node.right    # move to right subtree
```
**The bug:** if you push `node` and immediately also check `node.left` without the inner `while`, you either double-push or miss left children entirely. The key pattern is: use an inner `while` to fully exhaust the left spine before popping. You only push when `node` is non-null; popping gives you the next in-order node.

---

**F17 · Serialize and Deserialize Binary Tree** — Trees

*Design an algorithm to serialize a binary tree to a string and deserialize it back. No constraints on format — just make it work.*
*Your note: "Use queue to BFS and serialize null nodes, or recursive DFS and specify length as prefix for L and R child nodes"*

Describe both approaches. What does each use as a null marker, and which is simpler to implement in an interview?

**Example:**
```
Input:   root = [1,2,3,null,null,4,5]
Serialize:   "1,2,3,N,N,4,5"
Deserialize: [1,2,3,null,null,4,5]
```

.
.
.
.
↳ **Answer:**
**BFS (level-order):** Use a queue. Serialize non-null nodes by value and null nodes as `"N"` (e.g., `"1,2,3,N,N,4,5"`). Deserialize by consuming the queue level-by-level: pop a value, create the node, enqueue its two children (peeked from the serialized list). Clear null markers without creating nodes.

**DFS (pre-order):** Recurse left then right. Serialize each node as its value; null as `"N"`. Use a `deque` as an iterator during deserialization — `popleft()` gives the next token, recurse for left and right children.

**Your hint about "length as prefix"** refers to a variant where instead of a single null sentinel you prefix each non-null node's value with its length (e.g., `"3:abc"`) — useful when values are arbitrary strings rather than integers.

**Interview choice:** DFS recursive is the cleanest to write quickly. BFS is easier to reason about visually but needs a queue scaffolding.

---

**F18 · N-Queens** — Backtracking

*Place n queens on an n×n chessboard so no two queens attack each other. Return all distinct solutions.*
*Your note: "DFS one row at a time. Track diagonals with r+c and r-c+n-1"*

What are the three sets you maintain, what keys do you use, and why does `r+c` and `r-c` capture diagonals?

**Example:**
```
Input:  n = 4
Output: [[".Q..","...Q","Q...","..Q."],
         ["..Q.","Q...","...Q",".Q.."]]
```

.
.
.
.
↳ **Answer:**
Maintain three sets: `cols` (column indices used), `diag` (major-diagonal ids), `anti_diag` (minor-diagonal ids).

- **`cols`:** key is simply `c`.
- **`diag` (`\` diagonals):** key is `r - c`. All squares on the same `\` diagonal have the same `r - c` value. Range: `[-(n-1), n-1]`.
- **`anti_diag` (`/` diagonals):** key is `r + c`. All squares on the same `/` diagonal have the same `r + c` value. Range: `[0, 2n-2]`.

DFS one row at a time (placement in row `r`, trying each column `c`). If none of the three sets contain the corresponding key, place the queen, add all three keys, recurse to row `r+1`, then backtrack. O(1) conflict check instead of scanning the board.

---

**F19 · Course Schedule** — Graphs

*Given `numCourses` and `prerequisites` (pairs [a, b] meaning b must come before a), determine if it's possible to finish all courses (i.e., no cycle in the prerequisite graph).*
*Your note: "Topological sort with Khan's algorithm by keeping track of indegree. In the end all nodes should be visited. Or use DFS and keep track of visited nodes in current trip, if visiting again then there's a cycle"*

For Kahn's: what's the exact termination check? For DFS: what are the three node states and what distinguishes "visiting" from "visited"?

**Example:**
```
Input:  numCourses = 2, prerequisites = [[1,0]]
Output: true

Input:  numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
```

.
.
.
.
↳ **Answer:**
**Kahn's (BFS topological sort):**
1. Compute in-degrees for all nodes.
2. Queue all nodes with in-degree 0.
3. Pop a node, decrement in-degrees of its neighbors; enqueue neighbors that reach 0.
4. Count processed nodes. **Termination:** if `processed == numCourses`, no cycle. If `< numCourses`, a cycle exists (those nodes never reached in-degree 0).

**DFS (3-color):**
- `0` = unvisited
- `1` = currently in the DFS call stack (visiting)
- `2` = fully processed (all descendants explored)

If you reach a node with state `1` during DFS, you've found a back edge → cycle. If state `2`, already clean — skip. Mark `2` on return from recursion. State `1` means "I'm an ancestor in the current path."

---

**F20 · Graph Valid Tree** — Graphs

*Given n nodes (labeled 0 to n-1) and a list of undirected edges, determine if the edges form a valid tree.*
*Your note: "Can prescreen by checking edges.length == n-1. If more edges, there must be a cycle. If less, they must not be connected. If equal, then check if they're connected otherwise there must be a cycle"*

What does the prescreen catch, what can it NOT rule out alone, and what's the follow-up check?

**Example:**
```
Input:  n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
Output: true

Input:  n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
Output: false
```

.
.
.
.
↳ **Answer:**
A tree on n nodes has **exactly n-1 edges** — this is a necessary condition.

**Prescreen (O(1)):** `if len(edges) != n - 1: return False`. If more → must have a cycle. If fewer → must be disconnected. This rules out most invalid inputs instantly.

**What it can't catch:** `n-1` edges doesn't guarantee a connected tree — a **forest** (multiple disconnected trees) also has fewer than n-1 edges... wait, actually n-1 edges for a forest of k components means n-k edges. So n-1 edges with k=1 is a tree; with k>1 you'd have n-k < n-1. So the only case that passes the prescreen but is still invalid is: n-1 edges with a cycle AND a disconnected component simultaneously. This is actually impossible for simple graphs, but it's still worth verifying connectivity since problems may have disconnected components with the right edge count in degenerate cases.

**Follow-up:** BFS/DFS from node 0, count reachable nodes. If `reachable == n`, it's a tree.

---

**F21 · Maximum Product Subarray** — 1-D DP

*Given an integer array `nums`, find the contiguous subarray with the largest product, and return its value.*
*Your note: "Keep track of rolling max and rolling min. Rolling max is max of max×num, min×num, or num"*

Why must you track both a running max AND a running min, and why must you update both simultaneously (not sequentially)?

**Example:**
```
Input:  nums = [2,3,-2,4]
Output: 6

Input:  nums = [-2,3,-4]
Output: 24
```

.
.
.
.
↳ **Answer:**
A negative × negative = a large positive, so the **current minimum** can instantly become the next maximum when multiplied by a negative number. You must track both.

**Update rule (at each `num`):**
```python
new_max = max(cur_max * num, cur_min * num, num)
new_min = min(cur_max * num, cur_min * num, num)
cur_max, cur_min = new_max, new_min
```
**Why simultaneous:** if you write `cur_max = max(cur_max * num, ...)` first, then compute `cur_min` using the already-updated `cur_max`, you get the wrong minimum. Always compute both `new_max` and `new_min` from the old values before assigning. Global answer = max of all `cur_max` values seen.

---

**F22 · Reorder List** — Linked List

*Given the head of a singly linked list L0 → L1 → … → Ln, reorder it in-place to: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …*
*Your note: "find midpoint, reverse second half, merge"*

What are the three distinct phases of the solution, and what algorithm does each phase use?

**Example:**
```
Input:  head = [1,2,3,4]
Output: [1,4,2,3]

Input:  head = [1,2,3,4,5]
Output: [1,5,2,4,3]
```

.
.
.
.
↳ **Answer:**
Three phases:

1. **Find the midpoint** — slow/fast pointer (Floyd's). `slow` ends at the middle node; the second half starts at `slow.next`. Sever the list: `slow.next = None`.

2. **Reverse the second half** — standard iterative reversal (`prev=None`, walk with `curr`, threading `curr.next = prev`).

3. **Merge the two halves** — interleave by alternating nodes: take one from the first half, then one from the reversed second half, repeat until the second half is exhausted.

All three phases are O(n) time, O(1) space.

---

## 1. Arrays & Hashing

**Q1.** When do you reach for a hash map over sorting?

.
.
↳ **A:** When you need O(n) lookup or counting and don't need order. Sorting is O(n log n); hashing trades memory for time. Prefer hashing when order is irrelevant and keys are hashable.

---

**Q2.** What's the canonical pattern for "two sum"-style problems?

.
.
↳ **A:** Single-pass hash map: for each element `x`, check if `target - x` is already in the map; otherwise insert `x` with its index. O(n) time, O(n) space.

---

**Q3.** How do you detect a duplicate in one pass?

.
.
↳ **A:** Walk the array, put each element into a set; if insertion finds it already there, you have a duplicate. O(n)/O(n).

---

**Q4.** How do you group anagrams efficiently?

.
.
↳ **A:** Use a hash map keyed by either the sorted string (O(k log k) per word) or a 26-length character-count tuple (O(k) per word). The tuple key is faster in tight loops.

---

**Q5.** What's the trick for "longest consecutive sequence"? (See also F3)

.
.
↳ **A:** Put all nums in a set. Only start counting when `n-1` is NOT in the set (n is the start of a run). Walk forward until the run breaks. Amortized O(n).

---

**Q6.** Why does "product of array except self" need two passes rather than one?

.
.
↳ **A:** You need each element's left-side product AND right-side product. One pass can carry only one side. Use prefix and suffix passes: first fill output with prefix products; then walk backward multiplying in suffix products using a running variable. O(n)/O(1) extra.

---

**Q7.** How would you encode a list of strings to a single string and decode it back? (See also F2)

.
.
↳ **A:** Prefix each string with its length and a delimiter: `"5#hello3#abc"`. Decode by reading the number up to `#`, then slicing that many chars. Robust to any string content.

---

**Q8.** Why is O(1) for hash lookup only *expected*, not worst-case?

.
.
↳ **A:** Assumes a good hash function distributes uniformly. Adversarial keys or a poor hash can cluster into one bucket, making lookup O(n). Randomized seeds and rehashing mitigate this.

---

**Q9.** What's the O(n) approach for "top k frequent elements"? (See also F1)

.
.
↳ **A:** Bucket sort by frequency. Build `bucket[0..n]` where `bucket[i]` holds elements with frequency `i`. Scan from high to low, collect until k results. O(n), no heap needed.

---

## 2. Two Pointers

**Q1.** When is two pointers the right tool?

.
.
↳ **A:** When the input is sorted (or sortable), or you need pairs/triples with a monotonic relationship (sum grows as left pointer moves right). Converts O(n²) brute force to O(n).

---

**Q2.** How does sorted two-sum work?

.
.
↳ **A:** Left at 0, right at n-1. If sum < target, move `left++`; if > target, move `right--`; if equal, done. Correct because sum changes monotonically with each move.

---

**Q3.** Why does 3Sum start with sorting? (See also F4)

.
.
↳ **A:** Sorting enables the two-pointer inner loop and easy duplicate skipping. Total: O(n²) time, O(1) extra space.

---

**Q4.** What's the "container with most water" invariant?

.
.
↳ **A:** Area = `min(left_height, right_height) * width`. Moving the taller side inward can never increase area (width shrinks, min stays ≤). Always move the shorter side.

---

**Q5.** Two approaches to "trapping rain water" — tradeoffs? (See also F5)

.
.
↳ **A:** (1) Precompute `leftMax[]` and `rightMax[]` arrays; water at `i` = `min(L[i], R[i]) - h[i]`. O(n) time, O(n) space. (2) Two pointers tracking running maxes; same O(n) time, O(1) space. Two-pointer is preferred in interviews.

---

**Q6.** Standard "remove duplicates in place" pattern?

.
.
↳ **A:** Slow pointer marks the write position; fast pointer scans. Write only when a new value is seen. O(n)/O(1).

---

**Q7.** Why prefer two pointers over reversing for palindrome checks?

.
.
↳ **A:** O(1) extra space and early exit on first mismatch. Reversing allocates a new string/array.

---

**Q8.** How is "valid palindrome II" (at most one deletion) handled?

.
.
↳ **A:** On first mismatch, branch: check if the substring skipping `left` OR skipping `right` is still a palindrome. Two inner two-pointer checks, O(n) overall.

---

## 3. Stack

**Q1.** What problem class screams "stack"?

.
.
↳ **A:** Matching/nested structures (parentheses, HTML), or a "nearest previous/next greater/smaller" relationship (monotonic stack).

---

**Q2.** How does a monotonic decreasing stack help with "next greater element"? (See also F6)

.
.
↳ **A:** Maintain indices with decreasing values. When you see a bigger value, pop all smaller ones — for each popped index, the current value IS its next greater element. O(n) amortized.

---

**Q3.** What's the structure of "largest rectangle in histogram"? (See also F7)

.
.
↳ **A:** Monotonic increasing stack of `(height, start_index)` pairs. When a bar breaks the increasing invariant, pop and compute `area = height * (i - start_index)`. The new element inherits the last popped `start_index`.

---

**Q4.** How do you evaluate Reverse Polish Notation with a stack?

.
.
↳ **A:** Push operands. On operator, pop two (note order for non-commutative ops like `-` and `/`), apply, push result. Final stack top is the answer.

---

**Q5.** How to design "min stack" with O(1) getMin?

.
.
↳ **A:** Pair each pushed value with the current min at that point (as tuples in the stack, or a parallel min-stack). Pop takes both. All operations O(1).

---

**Q6.** What's the recursion-to-iteration trick using a stack?

.
.
↳ **A:** Manually push call frames (state tuples). Useful for tree/graph DFS to avoid Python's recursion limit. Also enables early-exit patterns that recursion makes awkward.

---

**Q7.** When parsing "decode string" (e.g., `3[a2[c]]`), what do you push?

.
.
↳ **A:** On `[`: push the current string-being-built and the current multiplier; reset locals. On `]`: pop and combine: `prev_string + multiplier * current_string`.

---

## 4. Binary Search

**Q1.** What four things must you nail in every binary search?

.
.
↳ **A:** (1) Loop condition (`l < r` vs `l <= r`). (2) Mid computation (`l + (r - l) // 2` to avoid overflow). (3) Which half to keep. (4) What `l` (or `r`) points to when the loop exits.

---

**Q2.** How do you binary search on the answer space?

.
.
↳ **A:** When you can check "is X feasible?" in O(n), binary search over possible answer values. Common in "minimize the max" / "maximize the min" problems (Koko, ship packages, split array).

---

**Q3.** Template for finding leftmost index of target?

.
.
↳ **A:** `while l < r: m = (l+r)//2; if a[m] < target: l = m+1 else: r = m`. After loop, `l` is the insertion point.

---

**Q4.** How do you search in a rotated sorted array?

.
.
↳ **A:** At each mid, one half is always sorted. Check which (`a[l] <= a[m]`). If target falls in that sorted half's range, search there; else search the other. O(log n).

---

**Q5.** Finding min of rotated sorted array — why compare mid to *right*?

.
.
↳ **A:** Right is a stable anchor: `a[m] > a[r]` means min is strictly right of m; else min is at m or left of m. Comparing to left breaks on already-sorted inputs.

---

**Q6.** What does "Koko eating bananas" binary search over? (See also F8)

.
.
↳ **A:** Speed `k ∈ [1, max(piles)]`. Predicate: `sum(ceil(p/k)) <= h`. Record candidate when predicate holds; continue searching left for minimum.

---

**Q7.** Median of two sorted arrays in O(log(min(m, n))) — what's being searched? (See also F9)

.
.
↳ **A:** The partition index `i` in the shorter array. `j = (m+n+1)//2 - i`. Valid when `maxLeft1 <= minRight2` AND `maxLeft2 <= minRight1`. Guard with ±∞.

---

## 5. Sliding Window

**Q1.** What distinguishes fixed-size vs. variable-size sliding windows?

.
.
↳ **A:** Fixed: exactly k elements; slide one in, one out each step. Variable: expand right to satisfy/violate a condition, shrink left to restore; track the optimum.

---

**Q2.** Template for "longest substring without repeating characters"?

.
.
↳ **A:** Expand right, add char to a set. While duplicate exists, shrink left, remove char. Track `max(right - left + 1)`. O(n)/O(|alphabet|).

---

**Q3.** Template for "minimum window substring"?

.
.
↳ **A:** Expand right, track char counts vs. required. When all required chars are satisfied, shrink left while still valid, tracking min window. O(n).

---

**Q4.** When is a deque used with sliding windows? (See also F11)

.
.
↳ **A:** Sliding-window max/min in O(n): maintain indices in monotonic order; front is always the max/min of the current window. Pop from back when new element dominates; pop from front when out of window.

---

**Q5.** "Best time to buy and sell stock" — why is this a window problem?

.
.
↳ **A:** Left pointer tracks the lowest price seen so far; right pointer scans. Max profit = `price - min_seen`. One pass, O(n).

---

**Q6.** Longest repeating character replacement — why does `maxCount` not need updating on shrink? (See also F10)

.
.
↳ **A:** `maxCount` tracks the best frequency seen in any window. A stale-high value only makes the check stricter — you'll never accept an invalid window. The result only updates when a genuinely larger valid window is found.

---

**Q7.** For character-count windows, how do you avoid O(26) checks on every step?

.
.
↳ **A:** Maintain a counter of "how many chars currently match the required frequency." Increment when a char's count hits its target; decrement when it drops below. O(1) check per step.

---

## 6. Trees

**Q1.** Three DFS traversal orders and their canonical uses?

.
.
↳ **A:** Pre-order (root, L, R): serialize/clone. In-order (L, root, R): sorted traversal of BSTs. Post-order (L, R, root): aggregate from children (heights, sums).

---

**Q2.** How do you compute the height of a binary tree?

.
.
↳ **A:** `1 + max(height(left), height(right))`; return `-1` (or `0`) for `None` depending on your convention.

---

**Q3.** How to check if a binary tree is balanced?

.
.
↳ **A:** Post-order recursion returning height; if any subtree returns `-1` (sentinel for "unbalanced"), propagate it up. O(n) with early-exit.

---

**Q4.** Diameter of a binary tree — what do you return vs. what do you update?

.
.
↳ **A:** Return height to parent. Update a shared `diameter` with `left_height + right_height` at each node. Diameter need not pass through the root.

---

**Q5.** What's the subtle bug in "validate BST"?

.
.
↳ **A:** Checking only `left < root < right` locally misses constraints from ancestors. Correct: pass `(min_bound, max_bound)` down the recursion, or do in-order traversal and verify strictly increasing.

---

**Q6.** LCA in a general binary tree — algorithm?

.
.
↳ **A:** Recurse into both children. If both return non-null, current node is the LCA. Else return whichever child is non-null. O(n).

---

**Q7.** LCA in a BST — simpler version?

.
.
↳ **A:** Walk from root: if both p,q < node → go left; if both > node → go right; else current node is the LCA. O(h).

---

**Q8.** How to serialize/deserialize a binary tree? (See also F17)

.
.
↳ **A:** Pre-order DFS with null markers (`"N"`), or BFS level-order. Deserialize by consuming tokens and recursively (or iteratively) building. O(n) both ways.

---

**Q9.** Level-order traversal — what structure and why?

.
.
↳ **A:** A queue (BFS). Process one level at a time by recording the queue length at the level's start and popping exactly that many.

---

**Q10.** Build a tree from preorder + inorder?

.
.
↳ **A:** First element of preorder is the root. Find it in inorder — splits left/right subtrees. Use a hash map (value → inorder index) to make splits O(1). Recurse on slices. O(n) total.

---

**Q11.** Kth smallest in BST — iterative inorder pattern? (See also F16)

.
.
↳ **A:** Use a stack and `node` pointer. Inner `while node:` pushes the entire left spine. Pop, decrement k, return if k==0, then go right. Never push without checking left first.

---

**Q12.** Max path sum — two quantities per recursion?

.
.
↳ **A:** **Return to parent:** `node.val + max(0, max(left_gain, right_gain))` (a straight path that can extend upward). **Update global:** `node.val + max(0, left_gain) + max(0, right_gain)` (path that bends at this node).

---

## 7. Tries

**Q1.** What's the core data layout of a trie node?

.
.
↳ **A:** A map (or fixed-size array for known alphabet) from char → child node, plus a boolean `is_end` marking a completed word.

---

**Q2.** Insert / search / startsWith — costs?

.
.
↳ **A:** All O(k) in the length of the word. Space O(total characters stored) worst case.

---

**Q3.** When is a trie preferable to a hash set of strings?

.
.
↳ **A:** When you need prefix queries, autocomplete, or longest-common-prefix, or want to amortize repeated prefixes in memory.

---

**Q4.** How does "Word Search II" use a trie?

.
.
↳ **A:** Build a trie of all query words. DFS from each grid cell, advancing the trie pointer only if the next char is a child. Prune by removing found words from the trie mid-search.

---

**Q5.** How do you handle wildcard (`.`) in trie search?

.
.
↳ **A:** On `.`, recurse into ALL children rather than indexing one. Otherwise behaves like a normal search.

---

**Q6.** Why `is_end` separately rather than just storing words at nodes?

.
.
↳ **A:** A longer word passes through the same nodes as a shorter one (e.g., "app" inside "apple"). `is_end` marks that a word terminates here independently of children.

---

## 8. Backtracking

**Q1.** Backtracking template in one sentence?

.
.
↳ **A:** Recursive DFS: append a choice → recurse → pop the choice; at base case, record the current partial result.

---

**Q2.** Subsets vs. permutations — structural difference?

.
.
↳ **A:** Subsets iterate from `start` to n (avoids duplicate orderings). Permutations use a `used` array, starting from 0 each level (all positions considered).

---

**Q3.** Handling duplicates in "subsets II" / "permutations II"?

.
.
↳ **A:** Sort the input. Skip a value at the same depth if it equals the previous value (and for perms: the previous value was not just used — i.e., `not used[i-1]`).

---

**Q4.** "Combination sum" — why OK to reuse elements?

.
.
↳ **A:** The recursive call passes `i` (not `i+1`) as the next start, allowing the same element again. Skip to `i+1` only when explicitly moving past an element.

---

**Q5.** How to prune in "N-Queens"? (See also F18)

.
.
↳ **A:** Track three sets: columns used, diagonals (`r - c`), anti-diagonals (`r + c`). Reject placements that conflict. O(1) check per candidate placement.

---

**Q6.** Difference between DFS and backtracking?

.
.
↳ **A:** Backtracking *undoes* state changes on the way out of recursion (path, visited markers, partial counts). DFS over an immutable structure doesn't need to.

---

**Q7.** "Word search" (DFS on grid) — standard trick for marking visited?

.
.
↳ **A:** Temporarily overwrite the grid cell with a sentinel (e.g., `'#'`); restore it on backtrack. Avoids a separate visited set.

---

**Q8.** When should you memoize backtracking?

.
.
↳ **A:** Only when subproblems genuinely repeat (the state can be canonicalized). "Word break" memoizes on `start` index. "Permutations" cannot, because the path itself is part of the state.

---

## 9. System Design — DDIA Ch 1

**Q1.** Define reliability, scalability, and maintainability in one sentence each.

.
.
↳ **A:** Reliability: continues to work correctly under faults. Scalability: can cope with increased load. Maintainability: different people can productively work on it over time.

---

**Q2.** Fault vs. failure?

.
.
↳ **A:** Fault is one component deviating from spec. Failure is the system as a whole stopping service. Fault tolerance = preventing faults from cascading into failure.

---

**Q3.** Why measure latency with percentiles rather than averages?

.
.
↳ **A:** Averages hide tail behavior. p95/p99 show what slow users experience. Tail latency amplifies under fan-out.

---

**Q4.** What is tail latency amplification?

.
.
↳ **A:** If a request fans out to many backends and waits for all, overall latency approaches the slowest backend's tail. 100 backends with p99=1s → ~63% of requests hit at least one slow one.

---

**Q5.** Three pillars of maintainability?

.
.
↳ **A:** Operability (ops can keep it running), simplicity (reduce accidental complexity), evolvability (easy to change).

---

**Q6.** Two axes of scaling and the tradeoff?

.
.
↳ **A:** Vertical (bigger machine): simple, limited ceiling. Horizontal (more machines): elastic, demands partitioning and failure handling.

---

## 10. System Design — DDIA Ch 2–3

**Q1.** Document vs. relational vs. graph — when do you pick each?

.
.
↳ **A:** Relational: structured, many-to-many relationships, strong consistency. Document: self-contained records, schema flexibility, tree-shaped data. Graph: pervasive many-to-many with traversals (social, knowledge).

---

**Q2.** Schema-on-read vs. schema-on-write tradeoff?

.
.
↳ **A:** Schema-on-write (relational): enforced at insert — rigid but safe. Schema-on-read (document): interpretation at read time — flexible but pushes validation into application code.

---

**Q3.** LSM-tree vs. B-tree — core difference?

.
.
↳ **A:** LSM: append-only writes into sorted segments, merged in background (high write throughput, better compression, worse tail read latency, write amplification in compaction). B-tree: in-place updates in balanced-tree pages (good read latency, mature, write amplification via page rewrites + WAL).

---

**Q4.** What is write amplification?

.
.
↳ **A:** Bytes written to storage / bytes of application data written. LSM: compaction rewrites. B-tree: full-page writes + WAL entries.

---

**Q5.** Two secondary index strategies in document stores?

.
.
↳ **A:** Local indexes (each partition indexes its own data; queries fan out to all partitions). Global indexes (partitioned separately; fast reads but writes are cross-partition, need async or distributed transactions).

---

**Q6.** Why are covering indexes a big deal?

.
.
↳ **A:** They contain all columns for a query — engine never touches the primary row. Big read-latency win at cost of index size and write overhead.

---

**Q7.** OLTP vs. OLAP — key access pattern differences?

.
.
↳ **A:** OLTP: small row count per query, keyed by PK, latency-sensitive. OLAP: large aggregate scans, analyst-driven. Different engines optimize each (row-oriented vs. column-oriented).

---

## 11. System Design — Replication, Partitioning, Consistency, CAP

**Q1.** Three replication architectures?

.
.
↳ **A:** Single-leader (writes to leader, async/sync to followers). Multi-leader (writes at multiple nodes; conflict resolution needed). Leaderless (quorum reads and writes, e.g., Dynamo).

---

**Q2.** Replication lag — what anomaly does it cause?

.
.
↳ **A:** Time between a write on leader and visibility on followers. Causes violations of read-your-writes, monotonic reads, and consistent-prefix guarantees.

---

**Q3.** What is read-your-writes consistency?

.
.
↳ **A:** After a user writes X, that user always sees X on subsequent reads. Typically achieved by routing that user's reads to the leader for a short window, or tagging the session with a version number.

---

**Q4.** Range vs. hash partitioning — pain points?

.
.
↳ **A:** Range: ordered scans easy; risk of hot ranges (e.g., timestamp keys). Hash: uniform distribution; loses range-scan ability. Consistent hashing mitigates rebalancing pain.

---

**Q5.** Hot partition — what is it, how do you mitigate?

.
.
↳ **A:** One partition gets disproportionate traffic. Mitigations: salt the key with a random prefix (spreads writes; reads need fan-out), application-level sharding of hot keys, or caching in front.

---

**Q6.** CAP in practical engineering terms?

.
.
↳ **A:** During a network partition, choose between Consistency (reject requests that can't see the latest write) and Availability (answer with potentially stale data). Without a partition, you generally get both. Most systems choose per-request or per-operation.

---

**Q7.** Linearizability vs. serializability?

.
.
↳ **A:** Linearizability: single-object, real-time ordering — each op appears to take effect at some instant between its start and end. Serializability: multi-object transactions appear to execute in some serial order (not necessarily real-time).

---

**Q8.** What does quorum (R + W > N) guarantee?

.
.
↳ **A:** At least one node responding to a read overlaps with the last successful write. In practice, still not linearizable without additional mechanisms (read repair, anti-entropy, no concurrent writes).

---

**Q9.** Split-brain and how leader-election prevents it?

.
.
↳ **A:** Two nodes simultaneously believe they're leader. Prevention: fencing tokens (monotonically increasing epoch numbers), distributed consensus (Raft/Paxos) requiring majority to elect.

---

**Q10.** Raft in one paragraph?

.
.
↳ **A:** One leader at a time, elected by majority vote in randomized-timeout elections (term numbers break ties). Leader appends log entries, replicates to followers; entry commits when a majority persists it. On crash, new election runs; candidates with the most up-to-date log win. Safety: committed entries never lost. Liveness: as long as majority up and communicating.

---

**Q11.** What is a saga, and when over distributed transactions?

.
.
↳ **A:** A long-running business transaction decomposed into local transactions with compensating actions on failure. Use when cross-service 2PC is impractical (microservices, external APIs). Tradeoff: availability and scale, at the cost of atomicity.

---

**Q12.** Idempotency keys — why do they matter?

.
.
↳ **A:** Retries can cause duplicate writes. An idempotency key lets the server deduplicate: first request creates a record keyed by the ID; retries observe the existing record and return the original result. Essential for any write API that callers may retry (payments, order creation).

---

## 12. System Design — Common design patterns & primitives

**Q1.** When do you need a CDN?

.
.
↳ **A:** For static assets and cacheable responses: reduces origin load, lowers latency via edge PoPs, helps with DDoS absorption and global audiences.

---

**Q2.** Cache placement — client, CDN, app, database? Tradeoffs?

.
.
↳ **A:** Closer to user = lower latency, harder to invalidate. Client: fastest, least control. CDN: good for shared cacheable content. App-level (Redis/Memcached): flexible, you control TTL/invalidation. DB buffer: automatic, limited to hot pages.

---

**Q3.** Write-through vs. write-back vs. write-around?

.
.
↳ **A:** Write-through: writes go to cache and DB together (consistent, slower). Write-back: write to cache, flush to DB later (fast, risk of loss on crash). Write-around: writes bypass cache, go straight to DB (avoids cache churn for write-heavy but rarely-read data).

---

**Q4.** Message queue vs. pub/sub vs. event log — which for which job?

.
.
↳ **A:** Queue (SQS, RabbitMQ): one consumer processes each message, ordering per queue. Pub/sub: every subscriber gets a copy (fan-out). Event log (Kafka): durable replayable log, consumer groups, per-partition ordering. Choose based on replay, fan-out, ordering, and retention needs.

---

**Q5.** How does a rate limiter typically work?

.
.
↳ **A:** Token bucket (allow bursts up to bucket size, refilled at rate r) or leaky bucket (smooths traffic). Implemented in Redis via INCR + EXPIRE or Lua script for atomicity. Shard by user key for distributed fairness.

---

**Q6.** Consistent hashing — one sentence and why it matters for sharding?

.
.
↳ **A:** Hash keys and nodes onto a ring; a key is owned by the nearest clockwise node. Adding/removing a node only rehomes adjacent keys — not all keys. Virtual nodes smooth out skew.

---

**Q7.** Bloom filter — guarantees and when to use?

.
.
↳ **A:** "Definitely not in set" is reliable; "maybe in set" has a tunable false-positive rate. Use in front of expensive lookups (disk, remote KV) to skip confirmed misses at O(1) cost.

---

**Q8.** Newsfeed: push (fan-out on write) vs. pull (fan-out on read)?

.
.
↳ **A:** Push: write to every follower's timeline at post time — fast reads, huge write amplification for celebrities. Pull: merge from each followee at read time — cheap writes, expensive hot reads. Hybrid (push for most, pull for celebrities) is the standard answer.

---

**Q9.** What is the outbox pattern?

.
.
↳ **A:** Write domain changes AND outgoing events in the same local DB transaction (to an "outbox" table). A separate relay reads the outbox and publishes to the message bus. Solves "update DB and publish event atomically" without distributed transactions.

---

**Q10.** How do you design for graceful degradation?

.
.
↳ **A:** Identify critical vs. non-critical paths. Non-critical paths fail closed (hide feature, serve stale, queue for later). Tools: circuit breakers, bulkheads, timeouts, fallbacks. The product must define "what's good enough."

---

**Q11.** Blue/green vs. canary deploys?

.
.
↳ **A:** Blue/green: two full environments; cut traffic over atomically (fast rollback, doubles infra). Canary: gradually shift traffic % to new version (safer, slower, needs good metrics + automated rollback).

---

**Q12.** SD interview structure — 6 phases in order?

.
.
↳ **A:** (1) Requirements (functional + non-functional). (2) Back-of-envelope estimation (QPS, storage, bandwidth). (3) API design. (4) Data model. (5) High-level diagram. (6) Deep-dive into 1–2 hard components; discuss bottlenecks and tradeoffs.

---

**Q13.** Two questions to always ask upfront?

.
.
↳ **A:** (1) Scale: DAU, read/write ratio, data retention? (2) Consistency expectations: can this tolerate eventual consistency anywhere?

---

## Deck template (copy for each new topic)

```
## N. [Topic Name]

---

**Q1.** [Signal / recognition: when do you pick this pattern?]

.
.
↳ **A:** ...

---

**Q2.** [Template / pseudocode]

.
.
↳ **A:** ...

---

**Q3.** [Edge case / common bug]

.
.
↳ **A:** ...

---

**Q4.** [Complexity reasoning]

.
.
↳ **A:** ...

---

**Q5.** [Variant showing mastery]

.
.
↳ **A:** ...

---

**Q6.** [2-3 NC150 problems that use this pattern]

.
.
↳ **A:** ...
```

Use for: Intervals, Greedy, Advanced Graphs, 2-D DP, Bit Manipulation, Math & Geometry.
