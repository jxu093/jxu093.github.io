const DECKS = [
  {
    "id": 0,
    "title": "⚠️ Flagged Problems — Your Personal Gotchas",
    "cards": [
      {
        "id": "F1",
        "title": "F1 · Top K Frequent Elements",
        "topic": "Arrays & Hashing",
        "question": "*Given an array `nums` and integer `k`, return the k most frequent elements in any order.*\nYou know the heap solution (O(n log k)). What is the O(n) bucket approach, and walk through why it's bounded by n?",
        "example": "Input:  nums = [1,1,1,2,2,3], k = 2\nOutput: [1, 2]",
        "answer": "Build a `bucket` list of size `n+1` where index `i` holds all elements with frequency `i`. (Frequency can't exceed n, so the list is always bounded.) Populate using a `Counter`. Scan from index `n` down to `1`, collecting elements into the result until you have `k`. O(n) time — no sort or heap, just a linear scan.",
        "hint": "buckets"
      },
      {
        "id": "F2",
        "title": "F2 · Encode and Decode Strings",
        "topic": "Arrays & Hashing",
        "question": "*Design an algorithm to encode a list of strings to a single string, then decode it back. The strings may contain any character including the delimiter you choose.*\nWhat goes wrong with a naive delimiter (e.g., comma), and what's the robust encoding scheme?",
        "example": "Input:  [\"hello\", \"world\"]\nEncode: \"5#hello5#world\"\nDecode: [\"hello\", \"world\"]",
        "answer": "Any delimiter can appear inside the strings themselves, so a naive split will break. Robust solution: **length-prefix encoding**. Encode as `f\"{len(s)}#{s}\"` for each string, concatenated. Decode by reading digits until `#`, slicing exactly that many characters starting after `#`, then advancing the pointer. Works for any string content, including strings containing `#`.",
        "hint": "Chunk delimiter"
      },
      {
        "id": "F3",
        "title": "F3 · Longest Consecutive Sequence",
        "topic": "Arrays & Hashing",
        "question": "*Given an unsorted array of integers, return the length of the longest consecutive elements sequence. Must run in O(n).*\nWhy not just sort the array? What's the exact O(n) trick, and what's the guard that prevents revisiting starts?",
        "example": "Input:  nums = [100,4,200,1,3,2]\nOutput: 4",
        "answer": "Sorting is O(n log n) and the constraint says O(n). Put all nums into a set. For each number `n`, **only start counting if `n - 1` is NOT in the set** — this means `n` is the start of a new run. Then walk forward (`n+1`, `n+2`, ...) until the run breaks. Each number is visited at most twice — once as a potential start (skipped quickly if not a start) and once during a valid run. O(n) total.",
        "hint": "Use hashset"
      },
      {
        "id": "F4",
        "title": "F4 · 3Sum",
        "topic": "Two Pointers",
        "question": "*Given an integer array `nums`, return all triplets `[nums[i], nums[j], nums[k]]` such that `i ≠ j ≠ k` and `nums[i] + nums[j] + nums[k] == 0`. No duplicate triplets.*\nWhy must you sort, and what are the two places you skip duplicates (outer and inner)?",
        "example": "Input:  nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]",
        "answer": "Sorting enables a two-pointer inner sweep (sum is monotonic with pointer movement — moving left right increases sum, moving right left decreases it). **Outer duplicate skip:** `if i > 0 and nums[i] == nums[i-1]: continue` — avoids repeating the same outer value. **Inner duplicate skip:** after recording a valid triplet, advance `l` and `r` while they match their previous value (e.g., `while l < r and nums[l] == nums[l-1]: l++`). Both skips are necessary to avoid duplicate triplets in the output.",
        "hint": "Sort first"
      },
      {
        "id": "F5",
        "title": "F5 · Trapping Rain Water",
        "topic": "Two Pointers",
        "question": "*Given an elevation map `height[]`, compute how much water it can trap after raining.*\nDescribe the two-pointer approach: what do the pointers track, when do you move which side, and what's the off-by-one in the while condition?",
        "example": "Input:  height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6",
        "answer": "Maintain `leftMax` and `rightMax` — the tallest bar seen so far from each side. Move the pointer on the side with the **smaller max**, because that side is the binding constraint (water at any position = `min(leftMax, rightMax) - height[pos]`). Water added at each step = `min(leftMax, rightMax) - height[ptr]`. **While condition: `l < r` (strict).** Using `<=` causes the bar at `l == r` to be counted from both sides, double-counting zero water but creating an incorrect indexing step.",
        "hint": "Two pointers moving inward. Which side is the bottleneck?"
      },
      {
        "id": "F6",
        "title": "F6 · Daily Temperatures",
        "topic": "Stack",
        "question": "*Given an array `temperatures`, return an array `answer` where `answer[i]` is the number of days you have to wait after day `i` to get a warmer temperature. If no future warmer day exists, `answer[i] = 0`.*\nDescribe the monotonic stack invariant precisely: what does the stack store, what order are values in from bottom to top, and what happens when you see a larger temperature?",
        "example": "Input:  temperatures = [73,74,75,71,69,72,76,73]\nOutput: [1,1,4,2,1,1,0,0]",
        "answer": "The stack stores **indices** of temperatures in strictly increasing order from bottom to top — equivalently, the corresponding temperatures are in **decreasing** order (smaller temps on top). When you encounter `T[i]` larger than `T[stack[-1]]`, pop repeatedly: for each popped index `j`, the answer is `i - j`. Continue popping while the stack is non-empty and the top is smaller. Then push `i`. The invariant holds because any index whose temperature is larger than a later index will \"clear\" everything below it before being pushed.",
        "hint": "Monotonic stack — what order should values be in from bottom to top?"
      },
      {
        "id": "F7",
        "title": "F7 · Largest Rectangle in Histogram",
        "topic": "Stack",
        "question": "*Given an array `heights` representing the widths of bars in a histogram, find the area of the largest rectangle.*\nWhat does the stack store (and why does it need more than just the index), and how do you track the correct width when you pop?",
        "example": "Input:  heights = [2,1,5,6,2,3]\nOutput: 10",
        "answer": "The stack stores `(height, start_index)` pairs — `start_index` is the leftmost x-position this height can still extend back to. When `heights[i] < stack[-1].height`, pop: `area = popped.height * (i - popped.start_index)`. The new bar's `start_index` is set to the last popped `start_index` (it can extend back that far because all taller bars have been cleared). After iterating, pop remaining stack entries using `n` as the right boundary. **Append a sentinel `(0, 0)` or just check at the end** — ensures everything gets flushed. Without `start_index` in the stack, you can't reconstruct the rectangle's left boundary after popping.",
        "hint": "Monotonic stack — but what extra info besides height do you need to store?"
      },
      {
        "id": "F8",
        "title": "F8 · Koko Eating Bananas",
        "topic": "Binary Search",
        "question": "*Koko has `piles` of bananas and `h` hours before guards return. She eats at speed `k` bananas/hour, one pile at a time. Find the minimum integer `k` such that she can eat all piles in `h` hours.*\nWhat is the search space, what is the predicate, and what are the two bugs you flagged?",
        "example": "Input:  piles = [3,6,7,11], h = 8\nOutput: 4",
        "answer": "Search space: `k ∈ [1, max(piles)]`. Predicate: `sum(ceil(p / k) for p in piles) <= h`. **Bug 1 — don't return early on equality:** when the predicate holds, record `result = mid` as a candidate but continue searching left (`r = mid - 1`) for a smaller valid speed. `return mid` on equality locks in a non-minimal answer. **Bug 2 — ceiling division:** use `math.ceil(p / k)` or `(p + k - 1) // k`. In Python this is fine; in Java/C++ integer division truncates, so `p / k` underestimates, making Koko appear faster than she is.",
        "hint": "Don't return early when equals, record the candidate when it's <= h. Watch out for int overflow"
      },
      {
        "id": "F9",
        "title": "F9 · Median of Two Sorted Arrays",
        "topic": "Binary Search",
        "question": "*Given two sorted arrays `nums1` and `nums2` of sizes `m` and `n`, return the median of the two sorted arrays in O(log(min(m, n))) time.*\nWalk through the full partition logic: what are you binary-searching on, how is `j` derived, what is the validity condition, and how do you handle out-of-bounds?",
        "example": "Input:  nums1 = [1,3], nums2 = [2]\nOutput: 2.0\n\nInput:  nums1 = [1,2], nums2 = [3,4]\nOutput: 2.5",
        "answer": "Binary search on the **partition index `i`** in the shorter array A (length `m`). The partition in B is `j = (m + n + 1) // 2 - i`, derived from the rule that the left half always contains `(m+n+1)//2` elements total (the `+1` handles odd totals by putting the extra element on the left).\n\n**Valid partition condition:** `A[i-1] <= B[j]` AND `B[j-1] <= A[i]` — left side of each partition is ≤ right side of the other.\n\n- If `A[i-1] > B[j]`: partition is too far right in A → `r = i - 1`\n- If `B[j-1] > A[i]`: partition is too far left in A → `l = i + 1`\n\n**Result:** Odd total → `max(A[i-1], B[j-1])`. Even total → `(max(A[i-1], B[j-1]) + min(A[i], B[j])) / 2`.\n\n**Out-of-bounds guards:** treat `A[i-1]` as `-∞` when `i == 0` and `A[i]` as `+∞` when `i == m`.",
        "hint": "Binary search a partition index in the shorter array. How do you derive the other partition?"
      },
      {
        "id": "F10",
        "title": "F10 · Longest Repeating Character Replacement",
        "topic": "Sliding Window",
        "question": "*Given a string `s` and integer `k`, you can replace at most `k` characters in the window with any letter. Return the length of the longest substring with all the same letter after replacements.*\nWhat is the invariant that determines when the window is invalid, and why is it OK for `maxCount` to be stale-high when shrinking?",
        "example": "Input:  s = \"AABABBA\", k = 1\nOutput: 4",
        "answer": "Window is invalid when `window_length - maxCount > k` — we'd need more than `k` replacements. When this happens, shrink left by one (decrement the count of `s[l]`, `l++`). **`maxCount` intentionally stays stale-high when shrinking:** it represents the highest frequency seen in *any* window we've examined. A stale-high `maxCount` only makes the validity check stricter — you'll never accept a window you shouldn't. The result only grows when we genuinely find a better window. This is correct because we only care about maximizing, never accepting a smaller valid window than the current best.",
        "hint": "Sliding window — what condition makes the window invalid?"
      },
      {
        "id": "F11",
        "title": "F11 · Sliding Window Maximum",
        "topic": "Sliding Window",
        "question": "*Given an array `nums` and integer `k`, return an array of the maximums of each contiguous subarray of size `k`.*\nWhat data structure, what invariant does it maintain, and what are the two pop conditions (back and front)?",
        "example": "Input:  nums = [1,3,-1,-3,5,3,6,7], k = 3\nOutput: [3,3,5,5,6,7]",
        "answer": "Use a **monotonic deque** (double-ended queue) of indices. Invariant: indices are in increasing order (left to right), and their corresponding values are in **decreasing** order — so `deque[0]` always holds the index of the window maximum.\n\n**Two pop conditions:**\n1. **Pop from the back** (`while deque and nums[deque[-1]] <= nums[i]`): any element smaller than the new element can never be the future maximum — remove them.\n2. **Pop from the front** (`while deque and deque[0] < i - k + 1`): the front index has left the window — remove it.\n\nAfter processing each index, `nums[deque[0]]` is the current window max. Append to result once `i >= k - 1`.",
        "hint": "Use monotonic linkedlist"
      },
      {
        "id": "F12",
        "title": "F12 · Remove Nth Node From End of List",
        "topic": "Linked List",
        "question": "*Given the head of a linked list, remove the nth node from the end of the list and return its head.*\nWhy do you need an `n+1` gap (not n), and where do both pointers start?",
        "example": "Input:  head = [1,2,3,4,5], n = 2\nOutput: [1,2,3,5]",
        "answer": "You need to stop at the **node before** the target so you can rewire `.next`. Use a **dummy head** — both pointers start there. Advance `fast` pointer `n + 1` steps ahead of `slow` (both starting from dummy). Then move both one step at a time until `fast` is `None`. At that point, `slow.next` is the node to delete. Remove with `slow.next = slow.next.next`. The dummy head handles the edge case of deleting the actual head node.",
        "hint": "Two pointers with n distance"
      },
      {
        "id": "F13",
        "title": "F13 · Find the Duplicate Number",
        "topic": "Linked List",
        "question": "*Given an array `nums` of n+1 integers where each integer is in [1, n], find the duplicate without modifying the array, using O(1) extra space.*\nDescribe both approaches. For Floyd's: what is the \"linked list\", where does the traversal start, and what does the entrance of the cycle represent?",
        "example": "Input:  nums = [1,3,4,2,2]\nOutput: 2",
        "answer": "**Binary search on value:** For candidate `mid`, count elements `<= mid`. If count `> mid`, duplicate is in `[1, mid]` by pigeonhole; else `[mid+1, n]`. O(n log n), O(1) space.\n\n**Floyd's cycle detection:** Treat the array as an implicit linked list where index `i` points to `nums[i]` as its \"next\". Index `0` is the guaranteed start (no value points to 0 since values are in `[1, n]`). Phase 1: `slow = nums[slow]`, `fast = nums[nums[fast]]` — repeat until they meet inside the cycle. Phase 2: reset one pointer to index `0`, advance both one step at a time — they meet at the **duplicate value**, which is the cycle entrance (two array positions share the same value, creating two edges into that index). O(n), O(1) space.",
        "hint": "Two approaches: one searches over values, the other treats the array as an implicit graph. What does index → value represent?"
      },
      {
        "id": "F14",
        "title": "F14 · Merge K Sorted Lists",
        "topic": "Heap / Priority Queue",
        "question": "*Given k sorted linked lists, merge them all into one sorted linked list.*\nBoth approaches are O(N log k). When would you argue for one over the other in an interview, and what's the heap's specific memory advantage?",
        "example": "Input:  [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]",
        "answer": "**Heap:** Push `(val, node)` for each list's current head. Pop minimum, push its `.next`, repeat. O(N log k). **Memory advantage:** only the current head of each list lives in the heap at any time — O(k) space. Ideal for streaming or external merge where lists are too large to fully load. **Implementation note:** in Python, add a tie-breaker index to the tuple since `ListNode` isn't comparable: `(val, i, node)`.\n\n**Divide and conquer:** Pair up lists and merge each pair; recurse on results until one list remains. O(N log k) time, O(log k) recursive call stack. Better when lists are fully in memory and you want to avoid heap overhead.\n\n**Interview framing:** if asked \"what if these come from live streams?\", answer heap. If asked \"what if memory is constrained?\", answer D&C.",
        "hint": "Two approaches: one uses a shared data structure across all lists, the other pairs them up. When would you prefer each?"
      },
      {
        "id": "F15",
        "title": "F15 · Task Scheduler",
        "topic": "Heap / Priority Queue",
        "question": "*Given a list of CPU tasks (letters A–Z) and a cooldown `n` meaning the same task must wait `n` intervals before running again. Return the minimum number of intervals to finish all tasks.*\nDescribe both the heap simulation and the O(n) math formula. What does the formula count, and when does each term dominate?",
        "example": "Input:  tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2\nOutput: 8",
        "answer": "**Heap simulation:** Use a max-heap by frequency. Process rounds of size `n+1`: pop up to `n+1` tasks (highest frequency first), decrement counts, re-push non-zero counts. Add `n+1` per round (or `remaining tasks` on the last round). O(N log N).\n\n**Math formula (O(n)):**\n```\nmax_count = max(task_frequencies)\ncount_of_max = number of tasks with that frequency\nanswer = max(len(tasks), (max_count - 1) * (n + 1) + count_of_max)\n```\n**Intuition:** Arrange the most-frequent task at intervals of `n+1`. This creates a \"frame\" of `(max_count - 1)` full slots plus a final partial slot of `count_of_max`. If other tasks are plentiful enough to fill all idle gaps, there's no idle time and the answer is just `len(tasks)`. The `max()` captures both cases — sparse tasks (formula dominates) and dense tasks (total count dominates).",
        "hint": "Even though I had the heap solution, the optimal solution is to use a constant math formula"
      },
      {
        "id": "F16",
        "title": "F16 · Kth Smallest Element in a BST",
        "topic": "Trees",
        "question": "*Given a BST and integer `k`, return the kth smallest value.*\nWrite out the iterative inorder loop structure, and what's the exact bug caused by pushing without checking left first?",
        "example": "Input:  root = [3,1,4,null,2], k = 1\nOutput: 1",
        "answer": "```python\nstack, node = [], root\nwhile node or stack:\n    while node:          # go as far left as possible\n        stack.append(node)\n        node = node.left\n    node = stack.pop()   # visit\n    k -= 1\n    if k == 0:\n        return node.val\n    node = node.right    # move to right subtree\n```\n**The bug:** if you push `node` and immediately also check `node.left` without the inner `while`, you either double-push or miss left children entirely. The key pattern is: use an inner `while` to fully exhaust the left spine before popping. You only push when `node` is non-null; popping gives you the next in-order node.",
        "hint": "Iterative inorder — what two things does your loop manage, and what must you exhaust before popping?"
      },
      {
        "id": "F17",
        "title": "F17 · Serialize and Deserialize Binary Tree",
        "topic": "Trees",
        "question": "*Design an algorithm to serialize a binary tree to a string and deserialize it back. No constraints on format — just make it work.*\nDescribe both approaches. What does each use as a null marker, and which is simpler to implement in an interview?",
        "example": "Input:   root = [1,2,3,null,null,4,5]\nSerialize:   \"1,2,3,N,N,4,5\"\nDeserialize: [1,2,3,null,null,4,5]",
        "answer": "**BFS (level-order):** Use a queue. Serialize non-null nodes by value and null nodes as `\"N\"` (e.g., `\"1,2,3,N,N,4,5\"`). Deserialize by consuming the queue level-by-level: pop a value, create the node, enqueue its two children (peeked from the serialized list). Clear null markers without creating nodes.\n\n**DFS (pre-order):** Recurse left then right. Serialize each node as its value; null as `\"N\"`. Use a `deque` as an iterator during deserialization — `popleft()` gives the next token, recurse for left and right children.\n\n**Your hint about \"length as prefix\"** refers to a variant where instead of a single null sentinel you prefix each non-null node's value with its length (e.g., `\"3:abc\"`) — useful when values are arbitrary strings rather than integers.\n\n**Interview choice:** DFS recursive is the cleanest to write quickly. BFS is easier to reason about visually but needs a queue scaffolding.",
        "hint": "How do you represent absent children in the serialized form? BFS vs DFS — which is simpler to code in an interview?"
      },
      {
        "id": "F18",
        "title": "F18 · N-Queens",
        "topic": "Backtracking",
        "question": "*Place n queens on an n×n chessboard so no two queens attack each other. Return all distinct solutions.*\nWhat are the three sets you maintain, what keys do you use, and why does `r+c` and `r-c` capture diagonals?",
        "example": "Input:  n = 4\nOutput: [[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],\n         [\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]",
        "answer": "Maintain three sets: `cols` (column indices used), `diag` (major-diagonal ids), `anti_diag` (minor-diagonal ids).\n\n- **`cols`:** key is simply `c`.\n- **`diag` (`\\` diagonals):** key is `r - c`. All squares on the same `\\` diagonal have the same `r - c` value. Range: `[-(n-1), n-1]`.\n- **`anti_diag` (`/` diagonals):** key is `r + c`. All squares on the same `/` diagonal have the same `r + c` value. Range: `[0, 2n-2]`.\n\nDFS one row at a time (placement in row `r`, trying each column `c`). If none of the three sets contain the corresponding key, place the queen, add all three keys, recurse to row `r+1`, then backtrack. O(1) conflict check instead of scanning the board.",
        "hint": "Place one queen per row. What three conflict dimensions do you need to track, and how do you key each?"
      },
      {
        "id": "F19",
        "title": "F19 · Course Schedule",
        "topic": "Graphs",
        "question": "*Given `numCourses` and `prerequisites` (pairs [a, b] meaning b must come before a), determine if it's possible to finish all courses (i.e., no cycle in the prerequisite graph).*\nFor Kahn's: what's the exact termination check? For DFS: what are the three node states and what distinguishes \"visiting\" from \"visited\"?",
        "example": "Input:  numCourses = 2, prerequisites = [[1,0]]\nOutput: true\n\nInput:  numCourses = 2, prerequisites = [[1,0],[0,1]]\nOutput: false",
        "answer": "**Kahn's (BFS topological sort):**\n1. Compute in-degrees for all nodes.\n2. Queue all nodes with in-degree 0.\n3. Pop a node, decrement in-degrees of its neighbors; enqueue neighbors that reach 0.\n4. Count processed nodes. **Termination:** if `processed == numCourses`, no cycle. If `< numCourses`, a cycle exists (those nodes never reached in-degree 0).\n\n**DFS (3-color):**\n- `0` = unvisited\n- `1` = currently in the DFS call stack (visiting)\n- `2` = fully processed (all descendants explored)\n\nIf you reach a node with state `1` during DFS, you've found a back edge → cycle. If state `2`, already clean — skip. Mark `2` on return from recursion. State `1` means \"I'm an ancestor in the current path.\"",
        "hint": "Cycle detection in a directed graph. Two classic approaches — one BFS-based, one DFS-based. What signals a cycle in each?"
      },
      {
        "id": "F20",
        "title": "F20 · Graph Valid Tree",
        "topic": "Graphs",
        "question": "*Given n nodes (labeled 0 to n-1) and a list of undirected edges, determine if the edges form a valid tree.*\nWhat does the prescreen catch, what can it NOT rule out alone, and what's the follow-up check?",
        "example": "Input:  n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]\nOutput: true\n\nInput:  n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]\nOutput: false",
        "answer": "A tree on n nodes has **exactly n-1 edges** — this is a necessary condition.\n\n**Prescreen (O(1)):** `if len(edges) != n - 1: return False`. If more edges → must have a cycle. If fewer → must be disconnected. This rules out most invalid inputs instantly.\n\n**Why the prescreen alone is sufficient with a connectivity check:** For simple undirected graphs, n-1 edges + connected ⟺ tree. A graph with exactly n-1 edges *cannot* contain a cycle without also being disconnected (a cycle on k nodes uses k edges, leaving only n-1-k edges for the remaining n-k nodes — not enough to connect them). So the prescreen guarantees no cycles; you just need to verify connectivity.\n\n**Follow-up:** BFS/DFS from node 0, count reachable nodes. If `reachable == n`, it's a tree. Both conditions together are necessary and sufficient.",
        "hint": "A tree on n nodes has a specific edge count. What's the O(1) prescreen, and what does it NOT rule out?"
      },
      {
        "id": "F21",
        "title": "F21 · Maximum Product Subarray",
        "topic": "1-D DP",
        "question": "*Given an integer array `nums`, find the contiguous subarray with the largest product, and return its value.*\nWhy must you track both a running max AND a running min, and why must you update both simultaneously (not sequentially)?",
        "example": "Input:  nums = [2,3,-2,4]\nOutput: 6\n\nInput:  nums = [-2,3,-4]\nOutput: 24",
        "answer": "A negative × negative = a large positive, so the **current minimum** can instantly become the next maximum when multiplied by a negative number. You must track both.\n\n**Update rule (at each `num`):**\n```python\nnew_max = max(cur_max * num, cur_min * num, num)\nnew_min = min(cur_max * num, cur_min * num, num)\ncur_max, cur_min = new_max, new_min\n```\n**Why simultaneous:** if you write `cur_max = max(cur_max * num, ...)` first, then compute `cur_min` using the already-updated `cur_max`, you get the wrong minimum. Always compute both `new_max` and `new_min` from the old values before assigning. Global answer = max of all `cur_max` values seen.",
        "hint": "Why can't you just track a running max like Kadane's? What does a negative number do?"
      },
      {
        "id": "F22",
        "title": "F22 · Reorder List",
        "topic": "Linked List",
        "question": "*Given the head of a singly linked list L0 → L1 → … → Ln, reorder it in-place to: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …*\nWhat are the three distinct phases of the solution, and what algorithm does each phase use?",
        "example": "Input:  head = [1,2,3,4]\nOutput: [1,4,2,3]\n\nInput:  head = [1,2,3,4,5]\nOutput: [1,5,2,4,3]",
        "answer": "Three phases:\n\n1. **Find the midpoint** — slow/fast pointer (Floyd's). `slow` ends at the middle node; the second half starts at `slow.next`. Sever the list: `slow.next = None`.\n\n2. **Reverse the second half** — standard iterative reversal (`prev=None`, walk with `curr`, threading `curr.next = prev`).\n\n3. **Merge the two halves** — interleave by alternating nodes: take one from the first half, then one from the reversed second half, repeat until the second half is exhausted.\n\nAll three phases are O(n) time, O(1) space.",
        "hint": "Three phases — all O(1) space. Think about what you'd need to interleave from both ends."
      }
    ]
  },
  {
    "id": 1,
    "title": "Arrays & Hashing",
    "cards": [
      {
        "id": "Q1",
        "question": "When do you reach for a hash map over sorting?",
        "answer": "When you need O(n) lookup or counting and don't need order. Sorting is O(n log n); hashing trades memory for time. Prefer hashing when order is irrelevant and keys are hashable."
      },
      {
        "id": "Q2",
        "question": "What's the canonical pattern for \"two sum\"-style problems?",
        "answer": "Single-pass hash map: for each element `x`, check if `target - x` is already in the map; otherwise insert `x` with its index. O(n) time, O(n) space."
      },
      {
        "id": "Q3",
        "question": "How do you detect a duplicate in one pass?",
        "answer": "Walk the array, put each element into a set; if insertion finds it already there, you have a duplicate. O(n)/O(n)."
      },
      {
        "id": "Q4",
        "question": "How do you group anagrams efficiently?",
        "answer": "Use a hash map keyed by either the sorted string (O(k log k) per word) or a 26-length character-count tuple (O(k) per word). The tuple key is faster in tight loops."
      },
      {
        "id": "Q5",
        "question": "*Given an unsorted integer array, return the length of the longest consecutive elements sequence in O(n) time.* What's the trick for \"longest consecutive sequence\"? (See also F3)",
        "example": "Input:  nums = [100,4,200,1,3,2]\nOutput: 4  (sequence: 1,2,3,4)",
        "answer": "Put all nums in a set. Only start counting when `n-1` is NOT in the set (n is the start of a run). Walk forward until the run breaks. Amortized O(n)."
      },
      {
        "id": "Q6",
        "question": "*Given an integer array `nums`, return an array `answer` where `answer[i]` equals the product of all elements except `nums[i]`, without using division, in O(n) time.* Why does this need two passes rather than one?",
        "example": "Input:  nums = [1,2,3,4]\nOutput: [24,12,8,6]",
        "answer": "You need each element's left-side product AND right-side product. One pass can carry only one side. Use prefix and suffix passes: first fill output with prefix products; then walk backward multiplying in suffix products using a running variable. O(n)/O(1) extra."
      },
      {
        "id": "Q7",
        "question": "How would you encode a list of strings to a single string and decode it back? (See also F2)",
        "answer": "Prefix each string with its length and a delimiter: `\"5#hello3#abc\"`. Decode by reading the number up to `#`, then slicing that many chars. Robust to any string content."
      },
      {
        "id": "Q8",
        "question": "Why is O(1) for hash lookup only *expected*, not worst-case?",
        "answer": "Assumes a good hash function distributes uniformly. Adversarial keys or a poor hash can cluster into one bucket, making lookup O(n). Randomized seeds and rehashing mitigate this."
      },
      {
        "id": "Q9",
        "question": "What's the O(n) approach for \"top k frequent elements\"? (See also F1)",
        "answer": "Bucket sort by frequency. Build `bucket[0..n]` where `bucket[i]` holds elements with frequency `i`. Scan from high to low, collect until k results. O(n), no heap needed."
      },
      {
        "id": "Q10",
        "question": "*Given an integer array `nums` and an integer `k`, return the total number of subarrays whose sum equals `k`.* What's the prefix sum + hash map pattern, and why can't sliding window solve this?",
        "example": "Input:  nums = [1,1,1], k = 2\nOutput: 2  (subarrays [1,1] starting at index 0 and 1)",
        "answer": "Sliding window fails because elements can be negative (shrinking the window doesn't guarantee the sum decreases). Instead: maintain a running `prefix_sum` and a hash map `{prefix_sum: count}` initialized with `{0: 1}`. At each index, check if `prefix_sum - k` exists in the map — if so, add its count to the result (those are subarrays ending here with sum k). Then increment `map[prefix_sum]`. O(n) time, O(n) space. This pattern generalizes: 'subarray with sum divisible by k' uses `prefix_sum % k` as the key."
      }
    ]
  },
  {
    "id": 2,
    "title": "Two Pointers",
    "cards": [
      {
        "id": "Q1",
        "question": "You're looking at a new problem in an interview. What signals tell you that a two-pointer approach will work, and what does it buy you over brute force?",
        "answer": "When the input is sorted (or sortable), or you need pairs/triples with a monotonic relationship (sum grows as left pointer moves right). Converts O(n²) brute force to O(n)."
      },
      {
        "id": "Q2",
        "question": "*Given a sorted array and a target sum, find two numbers that add up to the target.* Walk through the two-pointer approach — why does it work, and why is it O(n)?",
        "example": "Input:  numbers = [2,7,11,15], target = 9\nOutput: [0,1]",
        "answer": "Left at 0, right at n-1. If sum < target, move `left++`; if > target, move `right--`; if equal, done. Correct because sum changes monotonically with each move."
      },
      {
        "id": "Q3",
        "question": "Why does 3Sum start with sorting? (See also F4)",
        "answer": "Sorting enables the two-pointer inner loop and easy duplicate skipping. Total: O(n²) time, O(1) extra space."
      },
      {
        "id": "Q4",
        "question": "*Given `n` vertical lines at positions `[0..n-1]` with heights `height[i]`, find two lines that together with the x-axis form the container holding the most water.*\nWhat's the \"container with most water\" invariant?",
        "example": "Input:  height = [1,8,6,2,5,4,8,3,7]\nOutput: 49",
        "answer": "Area = `min(left_height, right_height) * width`. Moving the taller side inward can never increase area (width shrinks, min stays ≤). Always move the shorter side."
      },
      {
        "id": "Q5",
        "question": "*Given an elevation map `height[]`, compute how much water is trapped after raining.* Compare the two approaches and their space tradeoffs. (See also F5)",
        "answer": "(1) Precompute `leftMax[]` and `rightMax[]` arrays; water at `i` = `min(L[i], R[i]) - h[i]`. O(n) time, O(n) space. (2) Two pointers tracking running maxes; same O(n) time, O(1) space. Two-pointer is preferred in interviews."
      },
      {
        "id": "Q6",
        "question": "*Given a sorted array `nums`, remove the duplicates in-place so each element appears only once. Return the number of unique elements.* What's the two-pointer pattern for this?",
        "example": "Input:  nums = [0,0,1,1,1,2,2,3,3,4]\nOutput: 5  (nums modified to [0,1,2,3,4,...])",
        "answer": "Slow pointer marks the write position; fast pointer scans. Write only when a new value is seen. O(n)/O(1)."
      },
      {
        "id": "Q7",
        "question": "Why prefer two pointers over reversing for palindrome checks?",
        "answer": "O(1) extra space and early exit on first mismatch. Reversing allocates a new string/array."
      },
      {
        "id": "Q8",
        "question": "*Given a string `s`, return `true` if it can be made into a palindrome by deleting at most one character.* How do you solve this without checking every possible deletion?",
        "example": "Input:  s = \"abca\"\nOutput: true  (remove 'b' or 'c')",
        "answer": "On first mismatch, branch: check if the substring skipping `left` OR skipping `right` is still a palindrome. Two inner two-pointer checks, O(n) overall."
      }
    ]
  },
  {
    "id": 3,
    "title": "Stack",
    "cards": [
      {
        "id": "Q1",
        "question": "You're reading a new interview problem. What patterns in the problem statement signal that a stack is the right data structure?",
        "answer": "Matching/nested structures (parentheses, HTML), or a \"nearest previous/next greater/smaller\" relationship (monotonic stack)."
      },
      {
        "id": "Q2",
        "question": "How does a monotonic decreasing stack help with \"next greater element\"? (See also F6)",
        "answer": "Maintain indices with decreasing values. When you see a bigger value, pop all smaller ones — for each popped index, the current value IS its next greater element. O(n) amortized."
      },
      {
        "id": "Q3",
        "question": "What's the structure of \"largest rectangle in histogram\"? (See also F7)",
        "answer": "Monotonic increasing stack of `(height, start_index)` pairs. When a bar breaks the increasing invariant, pop and compute `area = height * (i - start_index)`. The new element inherits the last popped `start_index`."
      },
      {
        "id": "Q4",
        "question": "*Given an array of tokens representing an arithmetic expression in Reverse Polish Notation (e.g., `[\"2\",\"1\",\"+\",\"3\",\"*\"]` = (2+1)*3 = 9), evaluate and return the result.* Walk through the stack-based approach.",
        "example": "Input:  tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]\nOutput: 9",
        "answer": "Push operands. On operator, pop two (note order for non-commutative ops like `-` and `/`), apply, push result. Final stack top is the answer."
      },
      {
        "id": "Q5",
        "question": "*Design a stack that supports push, pop, top, and retrieving the minimum element — all in O(1) time.* What's the data structure trick that makes O(1) getMin possible?",
        "answer": "Pair each pushed value with the current min at that point (as tuples in the stack, or a parallel min-stack). Pop takes both. All operations O(1)."
      },
      {
        "id": "Q6",
        "question": "When you have a recursive solution (e.g., DFS on a tree) and need to convert it to iterative to avoid stack overflow, what's the general technique?",
        "answer": "Manually push call frames (state tuples). Useful for tree/graph DFS to avoid Python's recursion limit. Also enables early-exit patterns that recursion makes awkward."
      },
      {
        "id": "Q7",
        "question": "When parsing \"decode string\" (e.g., `3[a2[c]]`), what do you push?",
        "answer": "On `[`: push the current string-being-built and the current multiplier; reset locals. On `]`: pop and combine: `prev_string + multiplier * current_string`."
      },
      {
        "id": "Q8",
        "question": "*Given a string containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid (every open bracket is closed by the same type in the correct order).* Walk through the stack approach and the three ways it can fail.",
        "example": "Input:  s = \"([{}])\"\nOutput: true\n\nInput:  s = \"([)]\"\nOutput: false",
        "answer": "Push open brackets onto the stack. On a close bracket, pop and check it matches the corresponding open type (use a map: `)→(`, `]→[`, `}→{`). **Three failure modes:** (1) Close bracket but stack is empty (nothing to match). (2) Popped bracket doesn't match the close type (wrong nesting order). (3) After processing all chars, stack is non-empty (unclosed opens remain). O(n) time, O(n) space."
      },
      {
        "id": "Q9",
        "question": "*Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.*\nWhat are the two recursive choices and the constraints that prune invalid branches?",
        "example": "Input:  n = 3\nOutput: [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
        "answer": "At each position, you can add `(` if `open_count < n`, or `)` if `close_count < open_count`. Base case: `len(path) == 2*n` → append to results. The constraint `close < open` is the key pruning rule — it ensures you never close a bracket that wasn't opened. This is backtracking with an implicit stack (open count acts as the stack depth). Total results = Catalan number C(n)."
      }
    ]
  },
  {
    "id": 4,
    "title": "Binary Search",
    "cards": [
      {
        "id": "Q1",
        "question": "What four things must you nail in every binary search?",
        "answer": "(1) Loop condition (`l < r` vs `l <= r`). (2) Mid computation (`l + (r - l) // 2` to avoid overflow). (3) Which half to keep. (4) What `l` (or `r`) points to when the loop exits."
      },
      {
        "id": "Q2",
        "question": "You suspect a problem can be solved by binary searching on the answer value itself (not on an array index). What three things do you need to define, and what does the template look like?",
        "answer": "Define: (1) **search range** `[lo, hi]` over candidate answers (e.g., `[1, max(piles)]` for Koko). (2) **Feasibility predicate** `feasible(mid)` that checks in O(n) whether `mid` is a valid answer. (3) **Direction** — are you minimizing (search left when feasible) or maximizing (search right)?\n\n**Template (minimize):**\n```\nlo, hi = min_possible, max_possible\nwhile lo < hi:\n    mid = (lo + hi) // 2\n    if feasible(mid):\n        hi = mid        # mid works, try smaller\n    else:\n        lo = mid + 1    # mid fails, need bigger\nreturn lo\n```\nCommon in 'minimize the max' / 'maximize the min' problems (Koko, ship packages, split array)."
      },
      {
        "id": "Q3",
        "question": "You need to find the first occurrence of a target in a sorted array (or the insertion point if absent). Write out the binary search template — what's the loop condition and how do you update bounds?",
        "answer": "`while l < r: m = (l+r)//2; if a[m] < target: l = m+1 else: r = m`. After loop, `l` is the insertion point."
      },
      {
        "id": "Q4",
        "question": "*Given a sorted array that was rotated at an unknown pivot (e.g., `[4,5,6,7,0,1,2]`), search for a target value in O(log n).* How do you decide which half to search at each step?",
        "example": "Input:  nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4",
        "answer": "At each mid, one half is always sorted. Check which (`a[l] <= a[m]`). If target falls in that sorted half's range, search there; else search the other. O(log n)."
      },
      {
        "id": "Q5",
        "question": "*Given a sorted array rotated at an unknown pivot (no duplicates), find the minimum element in O(log n).* In your binary search, why must you compare `mid` to the right endpoint rather than the left?",
        "example": "Input:  nums = [3,4,5,1,2]\nOutput: 1",
        "answer": "Right is a stable anchor: `a[m] > a[r]` means min is strictly right of m; else min is at m or left of m. Comparing to left breaks on already-sorted inputs."
      },
      {
        "id": "Q6",
        "question": "What does \"Koko eating bananas\" binary search over? (See also F8)",
        "answer": "Speed `k ∈ [1, max(piles)]`. Predicate: `sum(ceil(p/k)) <= h`. Record candidate when predicate holds; continue searching left for minimum."
      },
      {
        "id": "Q7",
        "question": "Median of two sorted arrays in O(log(min(m, n))) — what's being searched? (See also F9)",
        "answer": "The partition index `i` in the shorter array. `j = (m+n+1)//2 - i`. Valid when `maxLeft1 <= minRight2` AND `maxLeft2 <= minRight1`. Guard with ±∞."
      }
    ]
  },
  {
    "id": 5,
    "title": "Sliding Window",
    "cards": [
      {
        "id": "Q1",
        "question": "In sliding window problems, what's the difference between fixed-size and variable-size windows? When do you use each, and how does the shrink logic differ?",
        "answer": "Fixed: exactly k elements; slide one in, one out each step. Variable: expand right to satisfy/violate a condition, shrink left to restore; track the optimum."
      },
      {
        "id": "Q2",
        "question": "*Given a string `s`, find the length of the longest substring without any repeating characters.* Walk through the sliding window template.",
        "example": "Input:  s = \"abcabcbb\"\nOutput: 3  (\"abc\")",
        "answer": "Expand right, add char to a set. While duplicate exists, shrink left, remove char. Track `max(right - left + 1)`. O(n)/O(|alphabet|)."
      },
      {
        "id": "Q3",
        "question": "*Given strings `s` and `t`, return the shortest substring of `s` that contains every character in `t` (including duplicates). Return `\"\"` if no such substring exists.*\nWhat's the template for \"minimum window substring\"?",
        "example": "Input:  s = \"ADOBECODEBANC\", t = \"ABC\"\nOutput: \"BANC\"",
        "answer": "Expand right, track char counts vs. required. When all required chars are satisfied, shrink left while still valid, tracking min window. O(n)."
      },
      {
        "id": "Q4",
        "question": "Some sliding window problems need a deque (double-ended queue) instead of just two pointers. What type of problem requires this, and what invariant does the deque maintain? (See also F11)",
        "answer": "Sliding-window max/min in O(n): maintain indices in monotonic order; front is always the max/min of the current window. Pop from back when new element dominates; pop from front when out of window."
      },
      {
        "id": "Q5",
        "question": "*Given an array `prices` where `prices[i]` is the stock price on day `i`, find the maximum profit from one buy and one sell (buy before sell). Return 0 if no profit is possible.*\n\"Best time to buy and sell stock\" — why is this a window problem?",
        "example": "Input:  prices = [7,1,5,3,6,4]\nOutput: 5  (buy at 1, sell at 6)",
        "answer": "Left pointer tracks the lowest price seen so far; right pointer scans. Max profit = `price - min_seen`. One pass, O(n)."
      },
      {
        "id": "Q6",
        "question": "*Given a string `s` and integer `k`, you can replace at most `k` characters. Find the length of the longest substring where all characters are the same after replacements.* Why is it safe to leave `maxCount` stale-high when shrinking the window? (See also F10)",
        "answer": "`maxCount` tracks the best frequency seen in any window. A stale-high value only makes the check stricter — you'll never accept an invalid window. The result only updates when a genuinely larger valid window is found."
      },
      {
        "id": "Q7",
        "question": "For character-count windows, how do you avoid O(26) checks on every step?",
        "answer": "Maintain a counter of \"how many chars currently match the required frequency.\" Increment when a char's count hits its target; decrement when it drops below. O(1) check per step."
      }
    ]
  },
  {
    "id": 6,
    "title": "Trees",
    "cards": [
      {
        "id": "Q1",
        "question": "Name the three DFS traversal orders for binary trees, state the node-visit sequence for each, and give a canonical use case where each one is the natural fit.",
        "answer": "Pre-order (root, L, R): serialize/clone. In-order (L, root, R): sorted traversal of BSTs. Post-order (L, R, root): aggregate from children (heights, sums)."
      },
      {
        "id": "Q2",
        "question": "How do you compute the height of a binary tree?",
        "answer": "`1 + max(height(left), height(right))`; return `-1` (or `0`) for `None` depending on your convention."
      },
      {
        "id": "Q3",
        "question": "How to check if a binary tree is balanced?",
        "answer": "Post-order recursion returning height; if any subtree returns `-1` (sentinel for \"unbalanced\"), propagate it up. O(n) with early-exit."
      },
      {
        "id": "Q4",
        "question": "*Given the root of a binary tree, return the length of the diameter — the longest path between any two nodes (measured in edges). The path may or may not pass through the root.*\nDiameter of a binary tree — what do you return vs. what do you update?",
        "example": "Input:  root = [1,2,3,4,5]\nOutput: 3  (path 4→2→1→3 or 5→2→1→3)",
        "answer": "Return height to parent. Update a shared `diameter` with `left_height + right_height` at each node. Diameter need not pass through the root."
      },
      {
        "id": "Q5",
        "question": "*Given the root of a binary tree, determine if it is a valid BST (every node's value is strictly between its ancestors' constraints).* What's the common bug in a naive recursive check, and how do you fix it?",
        "answer": "Checking only `left < root < right` locally misses constraints from ancestors. Correct: pass `(min_bound, max_bound)` down the recursion, or do in-order traversal and verify strictly increasing."
      },
      {
        "id": "Q6",
        "question": "*Given a binary tree and two nodes `p` and `q`, find their lowest common ancestor (the deepest node that has both p and q as descendants).* Describe the recursive algorithm.",
        "answer": "Recurse into both children. If both return non-null, current node is the LCA. Else return whichever child is non-null. O(n)."
      },
      {
        "id": "Q7",
        "question": "*Given a BST and two nodes `p` and `q`, find their lowest common ancestor.* Why is this simpler than the general binary tree case, and what's the algorithm?",
        "answer": "Walk from root: if both p,q < node → go left; if both > node → go right; else current node is the LCA. O(h)."
      },
      {
        "id": "Q8",
        "question": "How to serialize/deserialize a binary tree? (See also F17)",
        "answer": "Pre-order DFS with null markers (`\"N\"`), or BFS level-order. Deserialize by consuming tokens and recursively (or iteratively) building. O(n) both ways."
      },
      {
        "id": "Q9",
        "question": "*Given a binary tree, return its level-order traversal as a list of lists (each inner list = one level, left to right).* What data structure drives this, and how do you know when one level ends and the next begins?",
        "answer": "A queue (BFS). Process one level at a time by recording the queue length at the level's start and popping exactly that many."
      },
      {
        "id": "Q10",
        "question": "*Given two integer arrays `preorder` and `inorder` (both representing traversals of the same binary tree with unique values), construct and return the binary tree.*\nHow do you build a tree from preorder + inorder?",
        "example": "Input:  preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]\nOutput: [3,9,20,null,null,15,7]",
        "answer": "First element of preorder is the root. Find it in inorder — splits left/right subtrees. Use a hash map (value → inorder index) to make splits O(1). Recurse on slices. O(n) total."
      },
      {
        "id": "Q11",
        "question": "*Given a BST and integer `k`, return the kth smallest value (1-indexed).* Walk through the iterative inorder approach using a stack. (See also F16)",
        "answer": "Use a stack and `node` pointer. Inner `while node:` pushes the entire left spine. Pop, decrement k, return if k==0, then go right. Never push without checking left first."
      },
      {
        "id": "Q12",
        "question": "*Given a binary tree where each node has an integer value (can be negative), find the path with the maximum sum. A path is any sequence of connected nodes (doesn't need to pass through the root or be root-to-leaf).*\nMax path sum — what two quantities do you compute per recursion?",
        "example": "Input:  root = [-10,9,20,null,null,15,7]\nOutput: 42  (path 15→20→7)",
        "answer": "**Return to parent:** `node.val + max(0, max(left_gain, right_gain))` (a straight path that can extend upward). **Update global:** `node.val + max(0, left_gain) + max(0, right_gain)` (path that bends at this node)."
      },
      {
        "id": "Q13",
        "question": "*Given the root of a binary tree, invert it (mirror it) and return the root.* This is trivially easy — so what's the real interview value, and what's the one-liner?",
        "example": "Input:  root = [4,2,7,1,3,6,9]\nOutput: [4,7,2,9,6,3,1]",
        "answer": "Recursively swap left and right children: `root.left, root.right = invert(root.right), invert(root.left); return root`. Base case: `if not root: return None`. The interview value isn't the algorithm — it's demonstrating clean recursion, handling the base case, and (if asked) converting to iterative BFS with a queue. Also tests: can you recognize this is just a post-order traversal where the 'visit' step is a swap? O(n) time, O(h) space."
      },
      {
        "id": "Q14",
        "question": "*Given the root of a binary tree, return the values of the nodes you can see from the right side, ordered from top to bottom.* How does this differ from a standard level-order traversal?",
        "example": "Input:  root = [1,2,3,null,5,null,4]\nOutput: [1,3,4]",
        "answer": "It's BFS level-order, but you only record the **last node of each level**. Process one level at a time (record queue length, pop that many); after each level, append the last-popped value. Alternatively, DFS with a `depth` parameter: visit right subtree first; if `depth == len(result)`, this is the first node seen at this depth from the right → append it. The DFS approach is O(n) time, O(h) space."
      }
    ]
  },
  {
    "id": 7,
    "title": "Tries",
    "cards": [
      {
        "id": "Q1",
        "question": "What's the core data layout of a trie node?",
        "answer": "A map (or fixed-size array for known alphabet) from char → child node, plus a boolean `is_end` marking a completed word."
      },
      {
        "id": "Q2",
        "question": "For a trie supporting `insert(word)`, `search(word)`, and `startsWith(prefix)`, what is the time complexity of each operation and what determines it?",
        "answer": "All O(k) in the length of the word. Space O(total characters stored) worst case."
      },
      {
        "id": "Q3",
        "question": "When is a trie preferable to a hash set of strings?",
        "answer": "When you need prefix queries, autocomplete, or longest-common-prefix, or want to amortize repeated prefixes in memory."
      },
      {
        "id": "Q4",
        "question": "*Given an `m × n` board of characters and a list of words, return all words that can be formed by sequentially adjacent cells (horizontal/vertical, no cell reused per word).*\nHow does \"Word Search II\" use a trie?",
        "example": "Input:  board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]], words = [\"oath\",\"pea\",\"eat\",\"rain\"]\nOutput: [\"eat\",\"oath\"]",
        "answer": "Build a trie of all query words. DFS from each grid cell, advancing the trie pointer only if the next char is a child. Prune by removing found words from the trie mid-search."
      },
      {
        "id": "Q5",
        "question": "*Design a data structure that supports `addWord(word)` and `search(word)` where search can contain `.` as a wildcard matching any single character.* How does the wildcard change the trie search logic?",
        "example": "addWord(\"bad\"), addWord(\"dad\")\nsearch(\"b.d\") → true\nsearch(\".ad\") → true\nsearch(\"b..\") → true",
        "answer": "On `.`, recurse into ALL children rather than indexing one. Otherwise behaves like a normal search."
      },
      {
        "id": "Q6",
        "question": "Why `is_end` separately rather than just storing words at nodes?",
        "answer": "A longer word passes through the same nodes as a shorter one (e.g., \"app\" inside \"apple\"). `is_end` marks that a word terminates here independently of children."
      }
    ]
  },
  {
    "id": 8,
    "title": "Backtracking",
    "cards": [
      {
        "id": "Q1",
        "question": "If someone asked you to describe the backtracking template in one sentence — the pattern that subsets, permutations, and N-Queens all share — what would you say?",
        "answer": "Recursive DFS: append a choice → recurse → pop the choice; at base case, record the current partial result."
      },
      {
        "id": "Q2",
        "question": "*Subsets: given `[1,2,3]`, return all subsets. Permutations: given `[1,2,3]`, return all orderings.* What's the key structural difference in the recursive calls?",
        "answer": "Subsets iterate from `start` to n (avoids duplicate orderings). Permutations use a `used` array, starting from 0 each level (all positions considered)."
      },
      {
        "id": "Q3",
        "question": "*When the input array contains duplicates (e.g., `[1,2,2]`), how do you generate subsets or permutations without duplicate results?* What's the sorting + skip trick?",
        "answer": "Sort the input. Skip a value at the same depth if it equals the previous value (and for perms: the previous value was not just used — i.e., `not used[i-1]`)."
      },
      {
        "id": "Q4",
        "question": "*Given an array of distinct integers `candidates` and a target integer, return all unique combinations that sum to target. The same number may be used unlimited times.*\n\"Combination sum\" — why is it OK to reuse elements, and how does the code express that?",
        "example": "Input:  candidates = [2,3,6,7], target = 7\nOutput: [[2,2,3],[7]]",
        "answer": "The recursive call passes `i` (not `i+1`) as the next start, allowing the same element again. Skip to `i+1` only when explicitly moving past an element."
      },
      {
        "id": "Q5",
        "question": "*Place n queens on an n×n board so no two attack each other.* What three things do you track to check conflicts in O(1) per placement, and what keys identify each diagonal? (See also F18)",
        "answer": "Track three sets: columns used, diagonals (`r - c`), anti-diagonals (`r + c`). Reject placements that conflict. O(1) check per candidate placement."
      },
      {
        "id": "Q6",
        "question": "Difference between DFS and backtracking?",
        "answer": "Backtracking *undoes* state changes on the way out of recursion (path, visited markers, partial counts). DFS over an immutable structure doesn't need to."
      },
      {
        "id": "Q7",
        "question": "*Given an m×n grid of characters and a word, determine if the word exists by following adjacent cells (no reuse).* What's the standard in-place trick for tracking visited cells during DFS, and why is it better than a separate set?",
        "answer": "Temporarily overwrite the grid cell with a sentinel (e.g., `'#'`); restore it on backtrack. Avoids a separate visited set."
      },
      {
        "id": "Q8",
        "question": "When should you memoize backtracking?",
        "answer": "Only when subproblems genuinely repeat (the state can be canonicalized). \"Word break\" memoizes on `start` index. \"Permutations\" cannot, because the path itself is part of the state."
      }
    ]
  },
  {
    "id": 9,
    "title": "System Design — DDIA Ch 1",
    "cards": [
      {
        "id": "Q1",
        "question": "You're presenting a design doc for a new service. How would you argue that the design addresses reliability, scalability, and maintainability — what concrete evidence would you point to for each?",
        "answer": "**Reliability** (works correctly under faults): redundancy, failover, retries with backoff, chaos testing, no single points of failure. **Scalability** (handles increased load): load parameters identified (QPS, data volume), horizontal scaling path, stateless tiers, partitioning strategy. **Maintainability** (productive to work on over time): operability (runbooks, monitoring, easy deploys), simplicity (clear abstractions, no accidental complexity), evolvability (modular boundaries, schema migration path). A good design doc addresses all three with specific mechanisms, not just aspirational statements."
      },
      {
        "id": "Q2",
        "question": "In distributed systems, what's the difference between a fault and a failure? Why does this distinction matter for system design?",
        "answer": "Fault is one component deviating from spec. Failure is the system as a whole stopping service. Fault tolerance = preventing faults from cascading into failure."
      },
      {
        "id": "Q3",
        "question": "Why measure latency with percentiles rather than averages?",
        "answer": "Averages hide tail behavior. p95/p99 show what slow users experience. Tail latency amplifies under fan-out."
      },
      {
        "id": "Q4",
        "question": "What is tail latency amplification?",
        "answer": "If a request fans out to many backends and waits for all, overall latency approaches the slowest backend's tail. 100 backends with p99=1s → ~63% of requests hit at least one slow one."
      },
      {
        "id": "Q5",
        "question": "What are the two fundamental approaches to scaling a system, and what does each one trade off against the other?",
        "answer": "Vertical (bigger machine): simple, limited ceiling. Horizontal (more machines): elastic, demands partitioning and failure handling."
      }
    ]
  },
  {
    "id": 10,
    "title": "System Design — DDIA Ch 2–3",
    "cards": [
      {
        "id": "Q1",
        "question": "You're choosing a data model for a new service. When would you pick a document store vs. a relational database vs. a graph database? Give a one-sentence use case for each.",
        "answer": "Relational: structured, many-to-many relationships, strong consistency. Document: self-contained records, schema flexibility, tree-shaped data. Graph: pervasive many-to-many with traversals (social, knowledge)."
      },
      {
        "id": "Q2",
        "question": "Schema-on-read vs. schema-on-write tradeoff?",
        "answer": "Schema-on-write (relational): enforced at insert — rigid but safe. Schema-on-read (document): interpretation at read time — flexible but pushes validation into application code."
      },
      {
        "id": "Q3",
        "question": "Your interviewer asks you to compare LSM-trees and B-trees as storage engine internals. What's the fundamental difference in how each handles writes, what is write amplification, and how does it manifest in each?",
        "answer": "**LSM-tree:** append-only writes into sorted segments (SSTables), merged in background compaction. High write throughput, better compression, worse tail read latency. **B-tree:** in-place updates in fixed-size pages within a balanced tree. Good read latency, mature, but writes rewrite full pages + WAL entries.\n\n**Write amplification** = bytes written to storage / bytes of application data written. In LSM, compaction repeatedly merges and rewrites segments — a single logical write may be rewritten 10–30× across compaction levels. In B-trees, each write rewrites a full page (e.g., 4KB for a small update) plus a WAL entry. LSM typically has higher write amp but better sequential I/O; B-tree has lower write amp but random I/O."
      },
      {
        "id": "Q4",
        "question": "When a partitioned database needs a secondary index, there are two strategies. What are they, and what does each optimize for (reads vs. writes)?",
        "answer": "Local indexes (each partition indexes its own data; queries fan out to all partitions). Global indexes (partitioned separately; fast reads but writes are cross-partition, need async or distributed transactions)."
      },
      {
        "id": "Q5",
        "question": "Why are covering indexes a big deal?",
        "answer": "They contain all columns for a query — engine never touches the primary row. Big read-latency win at cost of index size and write overhead."
      },
      {
        "id": "Q6",
        "question": "You're explaining to a junior engineer why OLTP and OLAP workloads need different storage engines. What are the key differences in their access patterns?",
        "answer": "OLTP: small row count per query, keyed by PK, latency-sensitive. OLAP: large aggregate scans, analyst-driven. Different engines optimize each (row-oriented vs. column-oriented)."
      }
    ]
  },
  {
    "id": 11,
    "title": "System Design — Replication, Partitioning, Consistency, CAP",
    "cards": [
      {
        "id": "Q1",
        "question": "Name the three main replication architectures for distributed databases. For each, state in one sentence how writes flow and what the key tradeoff is.",
        "answer": "Single-leader (writes to leader, async/sync to followers). Multi-leader (writes at multiple nodes; conflict resolution needed). Leaderless (quorum reads and writes, e.g., Dynamo)."
      },
      {
        "id": "Q2",
        "question": "Replication lag — what anomaly does it cause?",
        "answer": "Time between a write on leader and visibility on followers. Causes violations of read-your-writes, monotonic reads, and consistent-prefix guarantees."
      },
      {
        "id": "Q3",
        "question": "A user updates their profile photo but refreshes and still sees the old one. What consistency guarantee was violated, and name two infrastructure-level fixes.",
        "answer": "**Read-your-writes consistency** was violated — after a user writes X, that same user should always see X on subsequent reads. **Fix 1:** Route that user's reads to the leader for a short window after their write (e.g., read from leader for 10s after any profile update). **Fix 2:** Tag the client session with the last write's version/timestamp; replicas only serve reads if they're caught up past that version. Both avoid forcing *all* reads to the leader while guaranteeing the writing user sees their own update."
      },
      {
        "id": "Q4",
        "question": "You're partitioning a database table across nodes. Compare range partitioning vs. hash partitioning — what does each do well, and where does each hurt?",
        "answer": "Range: ordered scans easy; risk of hot ranges (e.g., timestamp keys). Hash: uniform distribution; loses range-scan ability. Consistent hashing mitigates rebalancing pain."
      },
      {
        "id": "Q5",
        "question": "Hot partition — what is it, how do you mitigate?",
        "answer": "One partition gets disproportionate traffic. Mitigations: salt the key with a random prefix (spreads writes; reads need fan-out), application-level sharding of hot keys, or caching in front."
      },
      {
        "id": "Q6",
        "question": "CAP in practical engineering terms?",
        "answer": "During a network partition, choose between Consistency (reject requests that can't see the latest write) and Availability (answer with potentially stale data). Without a partition, you generally get both. Most systems choose per-request or per-operation."
      },
      {
        "id": "Q7",
        "question": "An interviewer asks: 'What's the difference between linearizability and serializability?' These are commonly confused. Distinguish them clearly.",
        "answer": "Linearizability: single-object, real-time ordering — each op appears to take effect at some instant between its start and end. Serializability: multi-object transactions appear to execute in some serial order (not necessarily real-time)."
      },
      {
        "id": "Q8",
        "question": "What does quorum (R + W > N) guarantee?",
        "answer": "At least one node responding to a read overlaps with the last successful write. In practice, still not linearizable without additional mechanisms (read repair, anti-entropy, no concurrent writes)."
      },
      {
        "id": "Q9",
        "question": "What is split-brain in a replicated system, why is it dangerous, and how does a proper leader-election protocol (e.g., Raft) prevent it?",
        "answer": "Two nodes simultaneously believe they're leader. Prevention: fencing tokens (monotonically increasing epoch numbers), distributed consensus (Raft/Paxos) requiring majority to elect."
      },
      {
        "id": "Q10",
        "question": "When would you reach for a consensus protocol like Raft in a system design, what does it give you, and what does it cost?",
        "answer": "**When:** leader election, distributed locks, configuration stores, replicated state machines — anywhere you need a group of nodes to agree on a single value or ordering of events despite crashes. (Think: metadata services, coordination layers like etcd/ZooKeeper, not hot-path user data.)\n\n**What it gives you:** linearizable reads/writes, automatic leader election, guaranteed no split-brain. Committed entries are never lost as long as a majority survives.\n\n**What it costs:** writes require a majority round-trip (latency floor = network RTT to the slowest quorum member). Throughput limited to what a single leader can sequence. Requires an odd number of nodes (3 or 5 typical); 2 of 3 must be up for progress. Not suitable for high-throughput data planes — use it for control planes and coordination."
      },
      {
        "id": "Q11",
        "question": "What is a saga, and when over distributed transactions?",
        "answer": "A long-running business transaction decomposed into local transactions with compensating actions on failure. Use when cross-service 2PC is impractical (microservices, external APIs). Tradeoff: availability and scale, at the cost of atomicity."
      },
      {
        "id": "Q12",
        "question": "Idempotency keys — why do they matter?",
        "answer": "Retries can cause duplicate writes. An idempotency key lets the server deduplicate: first request creates a record keyed by the ID; retries observe the existing record and return the original result. Essential for any write API that callers may retry (payments, order creation)."
      }
    ]
  },
  {
    "id": 12,
    "title": "System Design — Common design patterns & primitives",
    "cards": [
      {
        "id": "Q1",
        "question": "When do you need a CDN?",
        "answer": "For static assets and cacheable responses: reduces origin load, lowers latency via edge PoPs, helps with DDoS absorption and global audiences."
      },
      {
        "id": "Q2",
        "question": "Cache placement — client, CDN, app, database? Tradeoffs?",
        "answer": "Closer to user = lower latency, harder to invalidate. Client: fastest, least control. CDN: good for shared cacheable content. App-level (Redis/Memcached): flexible, you control TTL/invalidation. DB buffer: automatic, limited to hot pages."
      },
      {
        "id": "Q3",
        "question": "Compare the three cache write strategies — write-through, write-back, and write-around. For each, explain how the write flows and when you'd pick it.",
        "answer": "Write-through: writes go to cache and DB together (consistent, slower). Write-back: write to cache, flush to DB later (fast, risk of loss on crash). Write-around: writes bypass cache, go straight to DB (avoids cache churn for write-heavy but rarely-read data)."
      },
      {
        "id": "Q4",
        "question": "Message queue vs. pub/sub vs. event log — which for which job?",
        "answer": "Queue (SQS, RabbitMQ): one consumer processes each message, ordering per queue. Pub/sub: every subscriber gets a copy (fan-out). Event log (Kafka): durable replayable log, consumer groups, per-partition ordering. Choose based on replay, fan-out, ordering, and retention needs."
      },
      {
        "id": "Q5",
        "question": "How does a rate limiter typically work?",
        "answer": "Token bucket (allow bursts up to bucket size, refilled at rate r) or leaky bucket (smooths traffic). Implemented in Redis via INCR + EXPIRE or Lua script for atomicity. Shard by user key for distributed fairness."
      },
      {
        "id": "Q6",
        "question": "Consistent hashing — one sentence and why it matters for sharding?",
        "answer": "Hash keys and nodes onto a ring; a key is owned by the nearest clockwise node. Adding/removing a node only rehomes adjacent keys — not all keys. Virtual nodes smooth out skew."
      },
      {
        "id": "Q7",
        "question": "Bloom filter — guarantees and when to use?",
        "answer": "\"Definitely not in set\" is reliable; \"maybe in set\" has a tunable false-positive rate. Use in front of expensive lookups (disk, remote KV) to skip confirmed misses at O(1) cost."
      },
      {
        "id": "Q8",
        "question": "You're designing a social media newsfeed. Compare the push model (fan-out on write) vs. pull model (fan-out on read) — how does each work, and what breaks at scale? What's the standard hybrid answer?",
        "answer": "Push: write to every follower's timeline at post time — fast reads, huge write amplification for celebrities. Pull: merge from each followee at read time — cheap writes, expensive hot reads. Hybrid (push for most, pull for celebrities) is the standard answer."
      },
      {
        "id": "Q9",
        "question": "What is the outbox pattern?",
        "answer": "Write domain changes AND outgoing events in the same local DB transaction (to an \"outbox\" table). A separate relay reads the outbox and publishes to the message bus. Solves \"update DB and publish event atomically\" without distributed transactions."
      },
      {
        "id": "Q10",
        "question": "How do you design for graceful degradation?",
        "answer": "Identify critical vs. non-critical paths. Non-critical paths fail closed (hide feature, serve stale, queue for later). Tools: circuit breakers, bulkheads, timeouts, fallbacks. The product must define \"what's good enough.\""
      },
      {
        "id": "Q11",
        "question": "Compare blue/green deployments and canary deployments. How does each work, what does each optimize for, and when would you choose one over the other?",
        "answer": "Blue/green: two full environments; cut traffic over atomically (fast rollback, doubles infra). Canary: gradually shift traffic % to new version (safer, slower, needs good metrics + automated rollback)."
      },
      {
        "id": "Q12",
        "question": "Walk through the 6 phases of a system design interview in order. What do you cover in each phase?",
        "answer": "(1) Requirements (functional + non-functional). (2) Back-of-envelope estimation (QPS, storage, bandwidth). (3) API design. (4) Data model. (5) High-level diagram. (6) Deep-dive into 1–2 hard components; discuss bottlenecks and tradeoffs."
      },
      {
        "id": "Q13",
        "question": "At the start of any system design interview, there are two categories of clarifying questions you should always ask before designing anything. What are they?",
        "answer": "(1) Scale: DAU, read/write ratio, data retention? (2) Consistency expectations: can this tolerate eventual consistency anywhere?"
      },
      {
        "id": "Q14",
        "question": "Compare the main load balancing strategies — round-robin, least connections, and consistent hashing. When would you pick each in a system design?",
        "answer": "**Round-robin:** simplest, works when all servers are identical and requests have similar cost. Fails when backends have uneven capacity or requests vary widely in weight. **Least connections:** routes to the server with the fewest active connections — naturally adapts to slow servers and heterogeneous request costs. Good default for stateless services. **Consistent hashing:** routes by request key (e.g., user ID) — ensures the same key hits the same server. Needed for stateful services, sticky sessions, or caching tiers where locality matters. Use with virtual nodes to smooth out skew."
      },
      {
        "id": "Q15",
        "question": "Your interviewer says 'tell me how you'd make this system observable.' What are the three pillars of observability, and what does each one help you diagnose?",
        "answer": "**Metrics** (counters, gauges, histograms): answer 'what is happening right now?' — latency percentiles, error rates, queue depths, saturation. Alert on these. **Logs** (structured, per-event records): answer 'what happened to this specific request?' — debug individual failures, audit trails. Expensive at scale; use sampling or log levels. **Distributed traces** (spans across services): answer 'where did this request spend its time?' — diagnose latency in multi-service call chains, find the bottleneck service. Tools: Prometheus/Grafana for metrics, ELK/Datadog for logs, Jaeger/Zipkin for traces. In a design interview, mention all three and note that metrics are cheapest to query, traces are most useful for debugging fan-out."
      },
      {
        "id": "Q16",
        "question": "What is back-pressure, and why is it better than unbounded queuing?",
        "answer": "**Back-pressure** means a downstream system signals upstream to slow down when it's overwhelmed, rather than accepting work it can't handle. Without it, an overwhelmed service queues unboundedly → memory exhaustion → crash → cascading failure. **Mechanisms:** return HTTP 429/503 with retry-after headers, use bounded queues that reject when full, TCP flow control, reactive streams. **Design principle:** it's better to reject work at the edge (where the caller can retry or degrade gracefully) than to accept it and fail silently deep in the stack. Pairs with circuit breakers: back-pressure is the producer-side control, circuit breakers are the consumer-side control."
      },
      {
        "id": "Q17",
        "question": "When you say 'WebSockets' in a design, what must you define beyond mentioning the upgrade? Give a concrete example for a chat system.",
        "answer": "Define the actual event contract: named events with specific fields. Example: event 'newMessage' with fields chatId, senderId, content, timestamp, attachments. Also define reconnection behavior (client sends last-seen offset, server replays missed messages). Just saying 'use WebSockets' without the contract is incomplete."
      },
      {
        "id": "Q18",
        "question": "In a messaging system, how do you guarantee offline message delivery? What data structure tracks what a user has missed, and what's the reconnect flow?",
        "answer": "Store a last_delivered_message_id (offset) per user per chat. On reconnect: client sends its offset → server fetches all messages after that offset from durable storage → streams them to the client. Push notifications are just hints — they can be dropped. The offset + persistent storage is what guarantees delivery, not the notification."
      },
      {
        "id": "Q19",
        "question": "How should a chat system handle media attachments (images, video)? Walk through the upload and send flow.",
        "answer": "Client requests a pre-signed upload URL from the API server → uploads the file directly to blob storage (S3/GCS) → sends a message containing only the blob key/URL. The message service never touches the binary data. This keeps the DB lean (only stores references) and avoids overloading the message path with large payloads."
      },
      {
        "id": "Q20",
        "question": "You have N WebSocket servers and need to deliver a message to a user connected to one of them. How does the message reach the right server? What problems arise at scale and how do you mitigate them?",
        "answer": "PubSub layer: each WS server subscribes to topics for its connected users. Message is published to the recipient's topic → only the right server receives and forwards it. At scale, subscription churn is the problem. Mitigations: (1) single multiplexed connection per WS server to the broker (not one per user), (2) batch subscribe/unsubscribe ops, (3) grace period before unsubscribing on disconnect so brief reconnects don't re-subscribe."
      },
      {
        "id": "Q21",
        "question": "How does supporting multiple devices per user change a messaging system's design? What needs to be per-device instead of per-user?",
        "answer": "Each device is a separate client session. The User Activity Service stores all active device sessions per user. Fan-out pushes to every connected device. Delivery tracking (offsets) must be per-device, not per-user — one device may be online while another is offline, and each needs independent catchup state on reconnect."
      }
    ]
  },
  {
    "id": 13,
    "title": "Linked List",
    "cards": [
      {
        "id": "Q1",
        "question": "Slow/fast pointer — what 3 problem classes does it solve?",
        "answer": "(1) Cycle detection (Floyd's). (2) Find midpoint. (3) Find Nth from end (start fast n nodes ahead, then walk together until fast hits null). All O(n) time, O(1) space."
      },
      {
        "id": "Q2",
        "question": "Write out the iterative linked list reversal using three pointers. Which pointer do you return at the end, and why is that a common bug source?",
        "answer": "`prev = None; curr = head; while curr: nxt = curr.next; curr.next = prev; prev = curr; curr = nxt; return prev`. The recursive version uses O(n) stack — interviewers want to see the O(1)-extra iterative one."
      },
      {
        "id": "Q3",
        "question": "Floyd's cycle detection — how do you find the cycle entry point? (See also F13.)",
        "answer": "After slow and fast meet inside the cycle, reset one pointer to head. Move both one step at a time; they meet at the cycle entry. Why: distance from head to entry equals distance from the meeting point to entry (algebra on the loop length and tortoise/hare distances)."
      },
      {
        "id": "Q4",
        "question": "Merge two sorted lists — why is a dummy head node the standard trick?",
        "answer": "It eliminates the special case for the first node. `dummy = ListNode(0); tail = dummy; while a and b: ...; tail.next = a or b; return dummy.next`. Without dummy you'd write redundant 'is this the first node?' branches at every comparison."
      },
      {
        "id": "Q5",
        "question": "Find midpoint — does slow land on the left or right middle for an even-length list?",
        "answer": "Depends on the loop. `while fast.next and fast.next.next` → slow stops on the **left** middle (good for splitting *before* reversing the second half — used in Reorder List, F22). `while fast and fast.next` → slow lands on the **right** middle (handy for palindrome checks where you want to start comparing from the right half)."
      },
      {
        "id": "Q6",
        "question": "Remove Nth from end — why an n+1 gap, not n? (See F12.)",
        "answer": "Use a dummy node before head. Advance fast n+1 steps, then move both until fast is null. Slow then sits one node *before* the target — so `slow.next = slow.next.next` removes it. The +1 gap is what places slow correctly to splice; the dummy handles the case where the head itself is removed."
      },
      {
        "id": "Q7",
        "question": "Reorder list — three-step pattern? (See F22.)",
        "answer": "(1) Find midpoint with slow/fast (slow lands on left middle; null-terminate after slow). (2) Reverse the second half. (3) Interleave — walk both halves with two pointers, splicing nodes alternately. Each step O(n); total O(n) time, O(1) space."
      },
      {
        "id": "Q8",
        "question": "You just finished coding a linked list solution. What are the most common bugs to check for before submitting?",
        "answer": "(1) Forgetting to null-terminate the new tail when splitting (creates a cycle). (2) Losing the head reference when reversing — always return `prev`, not `head`. (3) Off-by-one in the n+1-gap problems. (4) Modifying `node.next` before saving the original `next`. (5) Skipping the dummy head and writing duplicated 'first iteration' code."
      }
    ]
  },
  {
    "id": 14,
    "title": "Heap / Priority Queue",
    "cards": [
      {
        "id": "Q1",
        "question": "When do you reach for a heap?",
        "answer": "When you need repeated min/max access on a changing collection: top-K, median-of-stream, K-way merge, scheduling, Dijkstra. Heap gives O(log n) insert/pop and O(1) peek. For a single top-K on static data, sort + slice is simpler."
      },
      {
        "id": "Q2",
        "question": "Top-K largest — min-heap or max-heap, and why?",
        "answer": "**Min-heap of size K.** Push every element; if size > K, pop the smallest. The heap holds the K largest at the end; total O(n log K) — beats O(n log n) sort when K ≪ n. (For top-K smallest, use a max-heap of size K — symmetric.)"
      },
      {
        "id": "Q3",
        "question": "*Design a data structure that supports `addNum(int)` and `findMedian()` on a stream of integers, with O(log n) insert and O(1) median.* Describe the two-heap structure.",
        "answer": "Max-heap holds the lower half, min-heap holds the upper half. Keep sizes equal or off by one. After each insert, rebalance so |sizes| ≤ 1. Median = larger heap's top (odd count) or average of both tops (even). Insert O(log n), query O(1)."
      },
      {
        "id": "Q4",
        "question": "*Given k sorted linked lists, merge them into one sorted list.* In the heap-based approach, what exactly goes into the heap, and why do you need a tiebreaker? (See F14.)",
        "answer": "One node per list initially: `(value, list_idx, node_ref)` — the list_idx is a tiebreaker so heapq doesn't try to compare incomparable nodes when values tie. Pop min, push that node's `next` if any. Total O(N log K) where N = total nodes, K = lists. Divide-and-conquer pairwise merge has the same asymptotic cost but uses O(N) extra space; the heap version uses O(K)."
      },
      {
        "id": "Q5",
        "question": "*Given a list of CPU tasks (letters A–Z) and a cooldown `n`, return the minimum intervals to finish all tasks.* What's the O(1) math formula, and what does each term represent? (See F15.)",
        "answer": "`result = max(len(tasks), (max_count - 1) * (n + 1) + count_of_max)`. The first term covers 'no idling needed' (tasks already spaced enough). The second covers 'must idle' — the most frequent task drives the skeleton, with all max-frequency tasks tacked on at the end. Always `max` of both — formula is exact, no edge cases."
      },
      {
        "id": "Q6",
        "question": "Why is `heapify` O(n) and not O(n log n)?",
        "answer": "Sift-down from the bottom up. Most nodes are near the leaves and sift down very few levels. Sum across levels: ∑ (n/2^h) · h converges to O(n). Building a heap from scratch is strictly faster than n successive inserts (each O(log n))."
      },
      {
        "id": "Q7",
        "question": "Python heap gotcha — max-heap and tie-breaking?",
        "answer": "`heapq` is min-only. For max, push `-x` and negate on pop, or wrap items in a class with reversed `__lt__`. For tuples, prefer `(-priority, tiebreaker, payload)` so equal priorities don't fall through to comparing payloads (which may not be comparable)."
      },
      {
        "id": "Q8",
        "question": "When NOT to use a heap?",
        "answer": "(1) When you need order statistics for arbitrary K once — quickselect is O(n) average. (2) When data is mostly sorted already — a deque or two-pointer sweep is cheaper. (3) When you need O(log n) decrease-key on arbitrary elements — stdlib heap doesn't support it; either use lazy deletion (skip stale entries on pop) or an indexed heap."
      }
    ]
  },
  {
    "id": 15,
    "title": "Graphs",
    "cards": [
      {
        "id": "Q1",
        "question": "BFS vs DFS — when do you pick each?",
        "answer": "**BFS**: shortest path on unweighted graphs, level-order, 'minimum steps'. Uses a queue. **DFS**: path existence, topological order, cycle detection, articulation points, anything needing the call stack to remember context. BFS for distance, DFS for structure."
      },
      {
        "id": "Q2",
        "question": "Visited tracking — mark on enqueue or on dequeue?",
        "answer": "**Mark on enqueue** for BFS and iterative DFS. Marking on dequeue lets the same node be enqueued multiple times before any of them dequeues, blowing up to O(V·E) in dense graphs. Recursive DFS marks at the top of the function — same idea, before exploring neighbors."
      },
      {
        "id": "Q3",
        "question": "Topological sort — Kahn's vs DFS, and how does each detect a cycle? (See F19.)",
        "answer": "**Kahn's**: build in-degree map, enqueue all 0-in-degree nodes, repeatedly pop and decrement neighbors' in-degree. **Cycle if processed count < n.** **DFS 3-color**: white = unseen, gray = on the recursion stack, black = done. **Cycle if you encounter a gray neighbor.** Both O(V+E)."
      },
      {
        "id": "Q4",
        "question": "Detecting a cycle in an undirected graph?",
        "answer": "DFS, passing in the parent. If you visit a neighbor that is already visited *and* not the parent, you've found a back edge → cycle. Or use Union-Find: for each edge, if both endpoints are already in the same set, that edge closes a cycle. (See F20 for the 'valid tree' variant.)"
      },
      {
        "id": "Q5",
        "question": "Shortest path on an unweighted graph?",
        "answer": "BFS from the source. The first time you reach a node is via a shortest path. Track distances with a `dist` map (or count BFS levels for the answer-only case). O(V+E)."
      },
      {
        "id": "Q6",
        "question": "Dijkstra — one-paragraph summary and the lazy-heap gotcha?",
        "answer": "Min-heap of `(dist, node)`. Pop min; for each neighbor, relax: `if dist[u] + w < dist[v]: dist[v] = dist[u] + w; push(dist[v], v)`. **Gotcha**: stdlib heaps don't support decrease-key, so push lazily and skip stale entries on pop with `if d > dist[u]: continue`. Doesn't handle negative edges (use Bellman-Ford). O((V+E) log V)."
      },
      {
        "id": "Q7",
        "question": "Graph valid tree — exact two conditions? (See F20.)",
        "answer": "(1) `edges == n - 1` (necessary: any tree has exactly n-1 edges; fewer disconnects it, more creates a cycle). (2) Graph is fully connected (e.g., BFS reaches all n nodes from any start). Both must hold. Pre-screening edge count is O(1) and short-circuits many failures cheaply."
      },
      {
        "id": "Q8",
        "question": "Connected components — Union-Find vs BFS/DFS?",
        "answer": "Both O(V+E). Union-Find shines when components form *online* (edges arriving over time — 'number of islands II', 'accounts merge'). BFS/DFS is simpler for one-shot static graphs. Union-Find with path compression + union-by-rank is near O(1) amortized per op (inverse Ackermann)."
      },
      {
        "id": "Q9",
        "question": "Bidirectional BFS — when is it worth the complexity?",
        "answer": "When you know both source and target and the graph has high branching factor `b`. Single BFS explores ≈ b^d nodes; bidirectional explores ≈ 2 · b^(d/2) — exponentially fewer at long distances. Standard for word-ladder-style problems on large vocabularies."
      },
      {
        "id": "Q10",
        "question": "Adjacency list vs matrix — what dictates the choice?",
        "answer": "**List** for sparse graphs (E ≪ V²): O(V+E) space, fast neighbor iteration. **Matrix** for dense graphs and when you need O(1) edge-existence checks (e.g., Floyd–Warshall). Most interview graphs are sparse → list."
      },
      {
        "id": "Q11",
        "question": "*Given an m × n 2D grid of `'1'`s (land) and `'0'`s (water), return the number of islands (groups of horizontally/vertically connected `'1'`s).* Walk through the approach and the in-place trick for visited tracking.",
        "example": "Input:  grid = [\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"0\",\"0\",\"1\",\"0\",\"0\"],\n  [\"0\",\"0\",\"0\",\"1\",\"1\"]\n]\nOutput: 3",
        "answer": "Scan the grid; when you hit a `'1'`, increment the island count and BFS/DFS to mark all connected `'1'`s as visited. **In-place trick:** overwrite visited cells with `'0'` (or `'#'`) instead of maintaining a separate visited set — saves O(m·n) space. Each cell is visited at most once → O(m·n) total. This is the canonical 'connected components on a grid' pattern and generalizes to: max area of island, surrounded regions, rotting oranges, shortest path in a grid."
      },
      {
        "id": "Q12",
        "question": "*Given a reference to a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node has a value and a list of neighbors.*\nWhat data structure prevents creating duplicate clones, and what's the DFS vs BFS approach?",
        "answer": "Use a hash map `{original_node: cloned_node}` as both a visited set and a lookup for already-cloned nodes. **DFS:** for each node, create its clone, store in the map, then recurse on each neighbor — if the neighbor is already in the map, just wire the existing clone. **BFS:** same map, but use a queue. Key insight: the map serves double duty — it's your visited set *and* your way to find the clone of any node you've already processed. O(V+E) time and space."
      }
    ]
  },
  {
    "id": 16,
    "title": "1-D DP",
    "cards": [
      {
        "id": "Q1",
        "question": "How do you recognize a DP problem?",
        "answer": "Three signals: (1) 'count ways' / 'min/max over choices' / 'is it possible'. (2) Subproblems overlap (naive recursion repeats work). (3) Optimal substructure (best at i depends on best at smaller indices). If only (3) holds, greedy may suffice."
      },
      {
        "id": "Q2",
        "question": "Top-down (memo) vs bottom-up (tab) — when each?",
        "answer": "**Top-down**: cleaner when state space is sparse (you only compute reachable states) or when the recursion tree mirrors the problem naturally. **Bottom-up**: tighter constants, easier to space-optimize, no recursion-limit risk. Bottom-up is the interview default unless states are sparse or hard to enumerate."
      },
      {
        "id": "Q3",
        "question": "Walk through the standard template for solving a 1-D dynamic programming problem — what do you define, what do you initialize, what do you iterate, and what do you return?",
        "answer": "`dp[i]` = answer for prefix (or suffix) ending at i. Define base case (`dp[0]` or `dp[n]`). Write the transition: `dp[i] = f(dp[i-1], dp[i-2], …, nums[i])`. Iterate in dependency order. Return `dp[n-1]` or `dp[n]` per the framing."
      },
      {
        "id": "Q4",
        "question": "Space optimization — when can you collapse to O(1)?",
        "answer": "When `dp[i]` depends only on `dp[i-1]` (and maybe `dp[i-2]`), keep just those values in two scalars. Collapses O(n) → O(1) extra space. Climbing stairs, house robber, max-subarray (Kadane), and Fibonacci-style DPs all qualify."
      },
      {
        "id": "Q5",
        "question": "*Given an array `nums` representing money in each house along a street, return the maximum amount you can rob without robbing two adjacent houses.*\nHouse Robber — what's the transition and the rolling-array form?",
        "example": "Input:  nums = [2,7,9,3,1]\nOutput: 12  (rob houses 0, 2, 4 → 2+9+1)",
        "answer": "`dp[i] = max(dp[i-1], dp[i-2] + nums[i])` — either skip i (take best up to i-1) or rob i (add to best up to i-2). Rolling: `prev2, prev1 = 0, 0; for x in nums: prev2, prev1 = prev1, max(prev1, prev2 + x); return prev1`."
      },
      {
        "id": "Q6",
        "question": "*Coin Change: given coins and an amount, find the fewest coins needed. Coin Change II: count the number of combinations that make the amount.* Both use a 1-D DP array, but the loop order differs. What changes and why?",
        "example": "Coin Change:  coins = [1,2,5], amount = 11 → 3 (5+5+1)\nCoin Change II: coins = [1,2,5], amount = 5 → 4 combinations",
        "answer": "**Coin Change** (min coins to make amount): outer loop over amounts, inner over coins. Order doesn't matter — you're counting min, not arrangements. **Coin Change II** (count combinations, not permutations): **outer over coins, inner over amounts**. Reversing this counts ordered arrangements (permutations) instead. The loop order encodes the combinatorial meaning."
      },
      {
        "id": "Q7",
        "question": "Maximum Product Subarray — why track BOTH curMax and curMin? (See F21.)",
        "answer": "A negative number flips signs. The new max product can come from `curMax * x` (if x is positive) OR `curMin * x` (if x is negative — two negatives multiply to a large positive). Track both, updating simultaneously: `newMax = max(x, curMax*x, curMin*x)`, symmetric for newMin. O(n) time, O(1) space."
      },
      {
        "id": "Q8",
        "question": "*Given a string `s` and a dictionary of words `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.*\nWord Break — what's the DP state and transition?",
        "example": "Input:  s = \"leetcode\", wordDict = [\"leet\",\"code\"]\nOutput: true",
        "answer": "`dp[i] = True` if `s[:i]` can be segmented. `dp[0] = True`. Transition: `dp[i] = any(dp[j] and s[j:i] in dict for j in 0..i-1)`. Return `dp[n]`. O(n²·k) where k is avg word length (the `in` check). Use a set for the dictionary."
      },
      {
        "id": "Q9",
        "question": "*Given an integer array `nums`, return the length of the longest strictly increasing subsequence (not necessarily contiguous).*\nLongest Increasing Subsequence — naive O(n²) vs O(n log n)?",
        "example": "Input:  nums = [10,9,2,5,3,7,101,18]\nOutput: 4  (e.g. [2,3,7,101])",
        "answer": "Naive: `dp[i] = 1 + max(dp[j] for j<i if nums[j]<nums[i])` — O(n²). **Patience sort trick** (O(n log n)): keep a `tails` array where `tails[k]` is the smallest tail of any increasing subseq of length k+1. For each x, binary-search the leftmost tail ≥ x and replace. Length of tails = LIS length. The tails array is **NOT** a valid LIS — only its length is meaningful."
      },
      {
        "id": "Q10",
        "question": "*Given a string `s`, return the number of palindromic substrings (every single character counts as a palindrome).*\nWhat's the expand-from-center technique, and why do you expand from both odd and even centers?",
        "example": "Input:  s = \"aaa\"\nOutput: 6  (\"a\",\"a\",\"a\",\"aa\",\"aa\",\"aaa\")",
        "answer": "For each index `i`, expand outward while characters match. **Odd-length palindromes:** center at `(i, i)`. **Even-length palindromes:** center at `(i, i+1)`. You need both because a palindrome can be centered on a single character (\"aba\") or between two characters (\"abba\"). For each valid expansion, increment the count. O(n²) time, O(1) space. This same technique solves 'longest palindromic substring' — just track the longest expansion instead of counting."
      },
      {
        "id": "Q11",
        "question": "*Given strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return 0.*\nThis is 2-D DP — what's the state, transition, and how do you read the recurrence?",
        "example": "Input:  text1 = \"abcde\", text2 = \"ace\"\nOutput: 3  (\"ace\")",
        "answer": "`dp[i][j]` = LCS length of `text1[:i]` and `text2[:j]`. **Transition:** if `text1[i-1] == text2[j-1]`: `dp[i][j] = dp[i-1][j-1] + 1` (both chars match, extend the LCS). Else: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])` (skip one char from either string, take the better option). Base case: `dp[0][j] = dp[i][0] = 0`. Fill row by row. O(m·n) time. Space-optimizable to O(min(m,n)) since each row only depends on the previous row."
      },
      {
        "id": "Q12",
        "question": "*Given two strings `word1` and `word2`, return the minimum number of operations (insert, delete, replace) to convert `word1` into `word2` (edit distance).*\nWhat's the DP state and the three transitions?",
        "example": "Input:  word1 = \"horse\", word2 = \"ros\"\nOutput: 3  (horse → rorse → rose → ros)",
        "answer": "`dp[i][j]` = min operations to convert `word1[:i]` to `word2[:j]`. **If chars match** (`word1[i-1] == word2[j-1]`): `dp[i][j] = dp[i-1][j-1]` (no operation needed). **Else** take the min of three operations:\n- `dp[i-1][j-1] + 1` → **replace** `word1[i-1]` with `word2[j-1]`\n- `dp[i-1][j] + 1` → **delete** from `word1`\n- `dp[i][j-1] + 1` → **insert** into `word1`\n\nBase cases: `dp[i][0] = i` (delete all), `dp[0][j] = j` (insert all). O(m·n) time, O(m·n) space (optimizable to O(min(m,n)))."
      }
    ]
  },
  {
    "id": 17,
    "title": "Intervals",
    "cards": [
      {
        "id": "Q1",
        "question": "You're reading a new interview problem. What clues in the problem statement tell you it's an intervals problem, and what's your default first step after recognizing it?",
        "answer": "Inputs are `[start, end]` pairs (meetings, ranges, scheduling, calendar slots). Almost always: sort first by start (or end), then sweep. Most problems reduce to 'merge overlapping' or 'count overlaps at any point in time'."
      },
      {
        "id": "Q2",
        "question": "*Given an array of intervals `[[start, end], ...]`, merge all overlapping intervals and return the non-overlapping result.* Walk through the approach.",
        "example": "Input:  intervals = [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]",
        "answer": "Sort by start. Iterate; if `intervals[i].start <= last.end`, extend `last.end = max(last.end, intervals[i].end)`. Else push intervals[i] as the new last. O(n log n) for the sort, O(n) merge."
      },
      {
        "id": "Q3",
        "question": "*Given a sorted list of non-overlapping intervals and a new interval, insert the new interval and merge if necessary. Return the resulting sorted list of non-overlapping intervals.*\nInsert interval — what's the three-phase pattern?",
        "example": "Input:  intervals = [[1,3],[6,9]], newInterval = [2,5]\nOutput: [[1,5],[6,9]]",
        "answer": "(1) Copy intervals strictly before the new one (`end < new.start`). (2) Merge all overlapping: `while i < n and intervals[i].start <= new.end: new.end = max(new.end, intervals[i].end); i++`. Push the merged interval. (3) Copy the rest. O(n)."
      },
      {
        "id": "Q4",
        "question": "*Given an array of meeting time intervals `[[start, end], ...]`, return the minimum number of conference rooms required so that no two overlapping meetings share a room.*\nMin meeting rooms — how does the sweep-line approach work?",
        "example": "Input:  intervals = [[0,30],[5,10],[15,20]]\nOutput: 2  (meetings [0,30] and [5,10] overlap)",
        "answer": "Build two arrays: starts (sorted) and ends (sorted). Two pointers; whenever `starts[i] < ends[j]` you need a new room (`i++`); else free a room (`j++`). Track running max. O(n log n) for sorts, O(n) sweep. Heap variant: push end times into a min-heap; if next.start ≥ heap.top, pop; always push end. `len(heap)` at any moment = rooms in use."
      },
      {
        "id": "Q5",
        "question": "*Given an array of intervals, return the minimum number of intervals you need to remove to make the remaining intervals non-overlapping.*\nErase overlapping intervals — sort by what, and why?",
        "example": "Input:  intervals = [[1,2],[2,3],[3,4],[1,3]]\nOutput: 1  (remove [1,3])",
        "answer": "Sort by **end** (not start). Greedily keep an interval if its start ≥ the last-kept end; else drop it. Sorting by end maximizes room for future intervals. Number erased = total - kept. (This is 'maximum non-overlapping intervals' in disguise — the classic interval scheduling proof works here.)"
      },
      {
        "id": "Q6",
        "question": "*Given two lists of closed intervals (each sorted and non-overlapping), return their intersection — all intervals that appear in both lists.*\nIntersection of two interval lists — what's the two-pointer pattern?",
        "example": "Input:  A = [[0,2],[5,10],[13,23],[24,25]], B = [[1,5],[8,12],[15,24],[25,26]]\nOutput: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]",
        "answer": "Two pointers over both sorted lists. Compute `lo = max(a.start, b.start)`, `hi = min(a.end, b.end)`. If `lo <= hi`, emit `[lo, hi]`. Then advance the pointer whose interval ends first. O(m + n)."
      },
      {
        "id": "Q7",
        "question": "Two intervals share an endpoint: `[1,2]` and `[2,3]`. Do they overlap? What determines the answer, and why must you clarify this before coding?",
        "answer": "Are `[1,2]` and `[2,3]` overlapping? Depends on whether endpoints are inclusive (closed) or exclusive (half-open). For meetings, `[2,3]` starting at 2 doesn't conflict with one ending at 2 — use `start < end` (strict). For closed real-number ranges, use `start <= end`. **Ask the interviewer** before coding."
      }
    ]
  },
  {
    "id": 18,
    "title": "Greedy",
    "cards": [
      {
        "id": "Q1",
        "question": "When does greedy actually work?",
        "answer": "When the problem admits an **exchange argument**: any optimal solution can be transformed into the greedy choice without making it worse. If you can't articulate the swap, it's probably DP. Greedy candidates also tend to have **matroid** structure or interval-scheduling structure."
      },
      {
        "id": "Q2",
        "question": "*Given an array `nums` where `nums[i]` is the max jump length from position `i`, determine if you can reach the last index starting from index 0.*\nJump Game I — what's the greedy pattern?",
        "example": "Input:  nums = [2,3,1,1,4] → true\n        nums = [3,2,1,0,4] → false (stuck at index 3)",
        "answer": "Track the maximum reachable index as you walk left to right. If `i > maxReach`, return False. Else `maxReach = max(maxReach, i + nums[i])`. Return True if you finish the loop. O(n), O(1)."
      },
      {
        "id": "Q3",
        "question": "*Given an array `nums` where `nums[i]` is the max jump length from position `i`, return the minimum number of jumps to reach the last index. (Guaranteed reachable.)*\nJump Game II — how does the BFS-like greedy work?",
        "example": "Input:  nums = [2,3,1,1,4]\nOutput: 2  (jump 1 step to index 1, then 3 steps to end)",
        "answer": "Track `currentEnd` (farthest reachable with the jumps taken so far) and `farthest` (farthest reachable from any index in the current 'level'). When `i == currentEnd`, take a jump: `jumps++; currentEnd = farthest`. O(n). Conceptually it's BFS without an explicit queue — levels are jump counts."
      },
      {
        "id": "Q4",
        "question": "*There are `n` gas stations in a circle. `gas[i]` is the fuel at station `i`, `cost[i]` is the fuel needed to travel to station `i+1`. Starting with an empty tank, return the starting station index if you can complete the circuit, or -1 if impossible.*\nGas Station — what's the single-pass trick?",
        "example": "Input:  gas = [1,2,3,4,5], cost = [3,4,5,1,2]\nOutput: 3  (start at station 3)",
        "answer": "If `sum(gas) < sum(cost)`, no solution. Otherwise there's exactly one. Walk once tracking `tank`; if `tank < 0`, reset start to `i+1` and tank to 0. The reset is valid because no station before `i+1` could've been a starting point (any prefix-sum dip below zero means you can't reach `i+1` from there either)."
      },
      {
        "id": "Q5",
        "question": "*Given a string `s`, partition it into as many parts as possible so that each letter appears in at most one part. Return a list of the partition lengths.*\nPartition Labels — what's the greedy pattern?",
        "example": "Input:  s = \"ababcbacadefegdehijhklij\"\nOutput: [9,7,8]",
        "answer": "Pre-compute the **last index** of each character: `last = {c: i for i, c in enumerate(s)}`. Walk left to right tracking `end = max(end, last[c])`. When `i == end`, close the current partition (length = end - start + 1) and start a new one. O(n)."
      },
      {
        "id": "Q6",
        "question": "Greedy vs DP — what tells you which to use?",
        "answer": "If the optimal substructure has many overlapping decisions you must remember, → DP. If each step has an obvious locally-best choice that provably composes (exchange argument or no-cost swap), → greedy. Many problems admit both — greedy is faster but harder to prove correct. When unsure, write a small brute force and check on adversarial inputs."
      },
      {
        "id": "Q7",
        "question": "Common trap — when does greedy silently fail?",
        "answer": "Coin change with denominations like {1, 3, 4} and target 6: greedy takes 4+1+1 = 3 coins, optimal is 3+3 = 2 coins. Lesson: greedy works on canonical coin systems (US/EU coins) but not arbitrary ones. Always test a small counterexample before committing."
      },
      {
        "id": "Q8",
        "question": "*Given a set of intervals, find the maximum number of non-overlapping intervals you can keep.* Sketch the exchange argument that proves the greedy (sort-by-end) approach is optimal.",
        "answer": "Sort by end time; greedily take each interval whose start ≥ last-taken end. **Proof**: any optimal schedule's first interval can be swapped with the greedy choice (whose end is ≤ optimal's first end) without conflict; induct on the rest. Same argument backs 'erase overlapping intervals' (Intervals Q5)."
      }
    ]
  }
];
