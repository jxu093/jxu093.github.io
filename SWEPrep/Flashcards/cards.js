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
        "hint": "Track leftmax and rightmax. Beware while loop condition"
      },
      {
        "id": "F6",
        "title": "F6 · Daily Temperatures",
        "topic": "Stack",
        "question": "*Given an array `temperatures`, return an array `answer` where `answer[i]` is the number of days you have to wait after day `i` to get a warmer temperature. If no future warmer day exists, `answer[i] = 0`.*\nDescribe the monotonic stack invariant precisely: what does the stack store, what order are values in from bottom to top, and what happens when you see a larger temperature?",
        "example": "Input:  temperatures = [73,74,75,71,69,72,76,73]\nOutput: [1,1,4,2,1,1,0,0]",
        "answer": "The stack stores **indices** of temperatures in strictly increasing order from bottom to top — equivalently, the corresponding temperatures are in **decreasing** order (smaller temps on top). When you encounter `T[i]` larger than `T[stack[-1]]`, pop repeatedly: for each popped index `j`, the answer is `i - j`. Continue popping while the stack is non-empty and the top is smaller. Then push `i`. The invariant holds because any index whose temperature is larger than a later index will \"clear\" everything below it before being pushed.",
        "hint": "Stack of previous index, pop and set result when larger temp found. Stack always has smaller value on top because bigger value will clear stack"
      },
      {
        "id": "F7",
        "title": "F7 · Largest Rectangle in Histogram",
        "topic": "Stack",
        "question": "*Given an array `heights` representing the widths of bars in a histogram, find the area of the largest rectangle.*\nWhat does the stack store (and why does it need more than just the index), and how do you track the correct width when you pop?",
        "example": "Input:  heights = [2,1,5,6,2,3]\nOutput: 10",
        "answer": "The stack stores `(height, start_index)` pairs — `start_index` is the leftmost x-position this height can still extend back to. When `heights[i] < stack[-1].height`, pop: `area = popped.height * (i - popped.start_index)`. The new bar's `start_index` is set to the last popped `start_index` (it can extend back that far because all taller bars have been cleared). After iterating, pop remaining stack entries using `n` as the right boundary. **Append a sentinel `(0, 0)` or just check at the end** — ensures everything gets flushed. Without `start_index` in the stack, you can't reconstruct the rectangle's left boundary after popping.",
        "hint": "Use monotonic stack and pop when lower height is found. Keep track of width by using index in stack or custom class with width"
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
        "hint": "Binary search on smaller array for partition. j = (m+n+1)/2 - i. When left partitions ≤ right partitions, return the answer. Odd → max of left partition. Even → average with min of right partition."
      },
      {
        "id": "F10",
        "title": "F10 · Longest Repeating Character Replacement",
        "topic": "Sliding Window",
        "question": "*Given a string `s` and integer `k`, you can replace at most `k` characters in the window with any letter. Return the length of the longest substring with all the same letter after replacements.*\nWhat is the invariant that determines when the window is invalid, and why is it OK for `maxCount` to be stale-high when shrinking?",
        "example": "Input:  s = \"AABABBA\", k = 1\nOutput: 4",
        "answer": "Window is invalid when `window_length - maxCount > k` — we'd need more than `k` replacements. When this happens, shrink left by one (decrement the count of `s[l]`, `l++`). **`maxCount` intentionally stays stale-high when shrinking:** it represents the highest frequency seen in *any* window we've examined. A stale-high `maxCount` only makes the validity check stricter — you'll never accept a window you shouldn't. The result only grows when we genuinely find a better window. This is correct because we only care about maximizing, never accepting a smaller valid window than the current best.",
        "hint": "Sliding window, keep track of max count and shift window if exceeds max number of swaps. Then record max"
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
        "hint": "Binary search for candidate value which would have equal count of vals equal or less. OR solve like loop in linked list where 'next' val is using val as index. Must use 0 as starting index when finding loop entrance and return index"
      },
      {
        "id": "F14",
        "title": "F14 · Merge K Sorted Lists",
        "topic": "Heap / Priority Queue",
        "question": "*Given k sorted linked lists, merge them all into one sorted linked list.*\nBoth approaches are O(N log k). When would you argue for one over the other in an interview, and what's the heap's specific memory advantage?",
        "example": "Input:  [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]",
        "answer": "**Heap:** Push `(val, node)` for each list's current head. Pop minimum, push its `.next`, repeat. O(N log k). **Memory advantage:** only the current head of each list lives in the heap at any time — O(k) space. Ideal for streaming or external merge where lists are too large to fully load. **Implementation note:** in Python, add a tie-breaker index to the tuple since `ListNode` isn't comparable: `(val, i, node)`.\n\n**Divide and conquer:** Pair up lists and merge each pair; recurse on results until one list remains. O(N log k) time, O(log k) recursive call stack. Better when lists are fully in memory and you want to avoid heap overhead.\n\n**Interview framing:** if asked \"what if these come from live streams?\", answer heap. If asked \"what if memory is constrained?\", answer D&C.",
        "hint": "Use heap or recursion (merge in parallel and then merge results). Heap is better for streaming data because it only requires head and not entire lists in memory. Divide and conquer is more space efficient"
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
        "hint": "Use stack for inorder traversal but also use pointer. Don't push without checking left first"
      },
      {
        "id": "F17",
        "title": "F17 · Serialize and Deserialize Binary Tree",
        "topic": "Trees",
        "question": "*Design an algorithm to serialize a binary tree to a string and deserialize it back. No constraints on format — just make it work.*\nDescribe both approaches. What does each use as a null marker, and which is simpler to implement in an interview?",
        "example": "Input:   root = [1,2,3,null,null,4,5]\nSerialize:   \"1,2,3,N,N,4,5\"\nDeserialize: [1,2,3,null,null,4,5]",
        "answer": "**BFS (level-order):** Use a queue. Serialize non-null nodes by value and null nodes as `\"N\"` (e.g., `\"1,2,3,N,N,4,5\"`). Deserialize by consuming the queue level-by-level: pop a value, create the node, enqueue its two children (peeked from the serialized list). Clear null markers without creating nodes.\n\n**DFS (pre-order):** Recurse left then right. Serialize each node as its value; null as `\"N\"`. Use a `deque` as an iterator during deserialization — `popleft()` gives the next token, recurse for left and right children.\n\n**Your hint about \"length as prefix\"** refers to a variant where instead of a single null sentinel you prefix each non-null node's value with its length (e.g., `\"3:abc\"`) — useful when values are arbitrary strings rather than integers.\n\n**Interview choice:** DFS recursive is the cleanest to write quickly. BFS is easier to reason about visually but needs a queue scaffolding.",
        "hint": "Use queue to BFS and serialize null nodes, or recursive DFS and specify length as prefix for L and R child nodes"
      },
      {
        "id": "F18",
        "title": "F18 · N-Queens",
        "topic": "Backtracking",
        "question": "*Place n queens on an n×n chessboard so no two queens attack each other. Return all distinct solutions.*\nWhat are the three sets you maintain, what keys do you use, and why does `r+c` and `r-c` capture diagonals?",
        "example": "Input:  n = 4\nOutput: [[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],\n         [\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]",
        "answer": "Maintain three sets: `cols` (column indices used), `diag` (major-diagonal ids), `anti_diag` (minor-diagonal ids).\n\n- **`cols`:** key is simply `c`.\n- **`diag` (`\\` diagonals):** key is `r - c`. All squares on the same `\\` diagonal have the same `r - c` value. Range: `[-(n-1), n-1]`.\n- **`anti_diag` (`/` diagonals):** key is `r + c`. All squares on the same `/` diagonal have the same `r + c` value. Range: `[0, 2n-2]`.\n\nDFS one row at a time (placement in row `r`, trying each column `c`). If none of the three sets contain the corresponding key, place the queen, add all three keys, recurse to row `r+1`, then backtrack. O(1) conflict check instead of scanning the board.",
        "hint": "DFS one row at a time. Track diagonals with r+c and r-c+n-1"
      },
      {
        "id": "F19",
        "title": "F19 · Course Schedule",
        "topic": "Graphs",
        "question": "*Given `numCourses` and `prerequisites` (pairs [a, b] meaning b must come before a), determine if it's possible to finish all courses (i.e., no cycle in the prerequisite graph).*\nFor Kahn's: what's the exact termination check? For DFS: what are the three node states and what distinguishes \"visiting\" from \"visited\"?",
        "example": "Input:  numCourses = 2, prerequisites = [[1,0]]\nOutput: true\n\nInput:  numCourses = 2, prerequisites = [[1,0],[0,1]]\nOutput: false",
        "answer": "**Kahn's (BFS topological sort):**\n1. Compute in-degrees for all nodes.\n2. Queue all nodes with in-degree 0.\n3. Pop a node, decrement in-degrees of its neighbors; enqueue neighbors that reach 0.\n4. Count processed nodes. **Termination:** if `processed == numCourses`, no cycle. If `< numCourses`, a cycle exists (those nodes never reached in-degree 0).\n\n**DFS (3-color):**\n- `0` = unvisited\n- `1` = currently in the DFS call stack (visiting)\n- `2` = fully processed (all descendants explored)\n\nIf you reach a node with state `1` during DFS, you've found a back edge → cycle. If state `2`, already clean — skip. Mark `2` on return from recursion. State `1` means \"I'm an ancestor in the current path.\"",
        "hint": "Topological sort with Khan's algorithm by keeping track of indegree. In the end all nodes should be visited. Or use DFS and keep track of visited nodes in current trip, if visiting again then there's a cycle"
      },
      {
        "id": "F20",
        "title": "F20 · Graph Valid Tree",
        "topic": "Graphs",
        "question": "*Given n nodes (labeled 0 to n-1) and a list of undirected edges, determine if the edges form a valid tree.*\nWhat does the prescreen catch, what can it NOT rule out alone, and what's the follow-up check?",
        "example": "Input:  n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]\nOutput: true\n\nInput:  n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]\nOutput: false",
        "answer": "A tree on n nodes has **exactly n-1 edges** — this is a necessary condition.\n\n**Prescreen (O(1)):** `if len(edges) != n - 1: return False`. If more → must have a cycle. If fewer → must be disconnected. This rules out most invalid inputs instantly.\n\n**What it can't catch:** `n-1` edges doesn't guarantee a connected tree — a **forest** (multiple disconnected trees) also has fewer than n-1 edges... wait, actually n-1 edges for a forest of k components means n-k edges. So n-1 edges with k=1 is a tree; with k>1 you'd have n-k < n-1. So the only case that passes the prescreen but is still invalid is: n-1 edges with a cycle AND a disconnected component simultaneously. This is actually impossible for simple graphs, but it's still worth verifying connectivity since problems may have disconnected components with the right edge count in degenerate cases.\n\n**Follow-up:** BFS/DFS from node 0, count reachable nodes. If `reachable == n`, it's a tree.",
        "hint": "Can prescreen by checking edges.length == n-1. If more edges, there must be a cycle. If less, they must not be connected. If equal, then check if they're connected otherwise there must be a cycle"
      },
      {
        "id": "F21",
        "title": "F21 · Maximum Product Subarray",
        "topic": "1-D DP",
        "question": "*Given an integer array `nums`, find the contiguous subarray with the largest product, and return its value.*\nWhy must you track both a running max AND a running min, and why must you update both simultaneously (not sequentially)?",
        "example": "Input:  nums = [2,3,-2,4]\nOutput: 6\n\nInput:  nums = [-2,3,-4]\nOutput: 24",
        "answer": "A negative × negative = a large positive, so the **current minimum** can instantly become the next maximum when multiplied by a negative number. You must track both.\n\n**Update rule (at each `num`):**\n```python\nnew_max = max(cur_max * num, cur_min * num, num)\nnew_min = min(cur_max * num, cur_min * num, num)\ncur_max, cur_min = new_max, new_min\n```\n**Why simultaneous:** if you write `cur_max = max(cur_max * num, ...)` first, then compute `cur_min` using the already-updated `cur_max`, you get the wrong minimum. Always compute both `new_max` and `new_min` from the old values before assigning. Global answer = max of all `cur_max` values seen.",
        "hint": "Keep track of rolling max and rolling min. Rolling max is max of max×num, min×num, or num"
      },
      {
        "id": "F22",
        "title": "F22 · Reorder List",
        "topic": "Linked List",
        "question": "*Given the head of a singly linked list L0 → L1 → … → Ln, reorder it in-place to: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …*\nWhat are the three distinct phases of the solution, and what algorithm does each phase use?",
        "example": "Input:  head = [1,2,3,4]\nOutput: [1,4,2,3]\n\nInput:  head = [1,2,3,4,5]\nOutput: [1,5,2,4,3]",
        "answer": "Three phases:\n\n1. **Find the midpoint** — slow/fast pointer (Floyd's). `slow` ends at the middle node; the second half starts at `slow.next`. Sever the list: `slow.next = None`.\n\n2. **Reverse the second half** — standard iterative reversal (`prev=None`, walk with `curr`, threading `curr.next = prev`).\n\n3. **Merge the two halves** — interleave by alternating nodes: take one from the first half, then one from the reversed second half, repeat until the second half is exhausted.\n\nAll three phases are O(n) time, O(1) space.",
        "hint": "Find mid, reverse second half, merge"
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
        "question": "What's the trick for \"longest consecutive sequence\"? (See also F3)",
        "answer": "Put all nums in a set. Only start counting when `n-1` is NOT in the set (n is the start of a run). Walk forward until the run breaks. Amortized O(n)."
      },
      {
        "id": "Q6",
        "question": "Why does \"product of array except self\" need two passes rather than one?",
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
      }
    ]
  },
  {
    "id": 2,
    "title": "Two Pointers",
    "cards": [
      {
        "id": "Q1",
        "question": "When is two pointers the right tool?",
        "answer": "When the input is sorted (or sortable), or you need pairs/triples with a monotonic relationship (sum grows as left pointer moves right). Converts O(n²) brute force to O(n)."
      },
      {
        "id": "Q2",
        "question": "How does sorted two-sum work?",
        "answer": "Left at 0, right at n-1. If sum < target, move `left++`; if > target, move `right--`; if equal, done. Correct because sum changes monotonically with each move."
      },
      {
        "id": "Q3",
        "question": "Why does 3Sum start with sorting? (See also F4)",
        "answer": "Sorting enables the two-pointer inner loop and easy duplicate skipping. Total: O(n²) time, O(1) extra space."
      },
      {
        "id": "Q4",
        "question": "What's the \"container with most water\" invariant?",
        "answer": "Area = `min(left_height, right_height) * width`. Moving the taller side inward can never increase area (width shrinks, min stays ≤). Always move the shorter side."
      },
      {
        "id": "Q5",
        "question": "Two approaches to \"trapping rain water\" — tradeoffs? (See also F5)",
        "answer": "(1) Precompute `leftMax[]` and `rightMax[]` arrays; water at `i` = `min(L[i], R[i]) - h[i]`. O(n) time, O(n) space. (2) Two pointers tracking running maxes; same O(n) time, O(1) space. Two-pointer is preferred in interviews."
      },
      {
        "id": "Q6",
        "question": "Standard \"remove duplicates in place\" pattern?",
        "answer": "Slow pointer marks the write position; fast pointer scans. Write only when a new value is seen. O(n)/O(1)."
      },
      {
        "id": "Q7",
        "question": "Why prefer two pointers over reversing for palindrome checks?",
        "answer": "O(1) extra space and early exit on first mismatch. Reversing allocates a new string/array."
      },
      {
        "id": "Q8",
        "question": "How is \"valid palindrome II\" (at most one deletion) handled?",
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
        "question": "What problem class screams \"stack\"?",
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
        "question": "How do you evaluate Reverse Polish Notation with a stack?",
        "answer": "Push operands. On operator, pop two (note order for non-commutative ops like `-` and `/`), apply, push result. Final stack top is the answer."
      },
      {
        "id": "Q5",
        "question": "How to design \"min stack\" with O(1) getMin?",
        "answer": "Pair each pushed value with the current min at that point (as tuples in the stack, or a parallel min-stack). Pop takes both. All operations O(1)."
      },
      {
        "id": "Q6",
        "question": "What's the recursion-to-iteration trick using a stack?",
        "answer": "Manually push call frames (state tuples). Useful for tree/graph DFS to avoid Python's recursion limit. Also enables early-exit patterns that recursion makes awkward."
      },
      {
        "id": "Q7",
        "question": "When parsing \"decode string\" (e.g., `3[a2[c]]`), what do you push?",
        "answer": "On `[`: push the current string-being-built and the current multiplier; reset locals. On `]`: pop and combine: `prev_string + multiplier * current_string`."
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
        "question": "How do you binary search on the answer space?",
        "answer": "When you can check \"is X feasible?\" in O(n), binary search over possible answer values. Common in \"minimize the max\" / \"maximize the min\" problems (Koko, ship packages, split array)."
      },
      {
        "id": "Q3",
        "question": "Template for finding leftmost index of target?",
        "answer": "`while l < r: m = (l+r)//2; if a[m] < target: l = m+1 else: r = m`. After loop, `l` is the insertion point."
      },
      {
        "id": "Q4",
        "question": "How do you search in a rotated sorted array?",
        "answer": "At each mid, one half is always sorted. Check which (`a[l] <= a[m]`). If target falls in that sorted half's range, search there; else search the other. O(log n)."
      },
      {
        "id": "Q5",
        "question": "Finding min of rotated sorted array — why compare mid to *right*?",
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
        "question": "What distinguishes fixed-size vs. variable-size sliding windows?",
        "answer": "Fixed: exactly k elements; slide one in, one out each step. Variable: expand right to satisfy/violate a condition, shrink left to restore; track the optimum."
      },
      {
        "id": "Q2",
        "question": "Template for \"longest substring without repeating characters\"?",
        "answer": "Expand right, add char to a set. While duplicate exists, shrink left, remove char. Track `max(right - left + 1)`. O(n)/O(|alphabet|)."
      },
      {
        "id": "Q3",
        "question": "Template for \"minimum window substring\"?",
        "answer": "Expand right, track char counts vs. required. When all required chars are satisfied, shrink left while still valid, tracking min window. O(n)."
      },
      {
        "id": "Q4",
        "question": "When is a deque used with sliding windows? (See also F11)",
        "answer": "Sliding-window max/min in O(n): maintain indices in monotonic order; front is always the max/min of the current window. Pop from back when new element dominates; pop from front when out of window."
      },
      {
        "id": "Q5",
        "question": "\"Best time to buy and sell stock\" — why is this a window problem?",
        "answer": "Left pointer tracks the lowest price seen so far; right pointer scans. Max profit = `price - min_seen`. One pass, O(n)."
      },
      {
        "id": "Q6",
        "question": "Longest repeating character replacement — why does `maxCount` not need updating on shrink? (See also F10)",
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
        "question": "Three DFS traversal orders and their canonical uses?",
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
        "question": "Diameter of a binary tree — what do you return vs. what do you update?",
        "answer": "Return height to parent. Update a shared `diameter` with `left_height + right_height` at each node. Diameter need not pass through the root."
      },
      {
        "id": "Q5",
        "question": "What's the subtle bug in \"validate BST\"?",
        "answer": "Checking only `left < root < right` locally misses constraints from ancestors. Correct: pass `(min_bound, max_bound)` down the recursion, or do in-order traversal and verify strictly increasing."
      },
      {
        "id": "Q6",
        "question": "LCA in a general binary tree — algorithm?",
        "answer": "Recurse into both children. If both return non-null, current node is the LCA. Else return whichever child is non-null. O(n)."
      },
      {
        "id": "Q7",
        "question": "LCA in a BST — simpler version?",
        "answer": "Walk from root: if both p,q < node → go left; if both > node → go right; else current node is the LCA. O(h)."
      },
      {
        "id": "Q8",
        "question": "How to serialize/deserialize a binary tree? (See also F17)",
        "answer": "Pre-order DFS with null markers (`\"N\"`), or BFS level-order. Deserialize by consuming tokens and recursively (or iteratively) building. O(n) both ways."
      },
      {
        "id": "Q9",
        "question": "Level-order traversal — what structure and why?",
        "answer": "A queue (BFS). Process one level at a time by recording the queue length at the level's start and popping exactly that many."
      },
      {
        "id": "Q10",
        "question": "Build a tree from preorder + inorder?",
        "answer": "First element of preorder is the root. Find it in inorder — splits left/right subtrees. Use a hash map (value → inorder index) to make splits O(1). Recurse on slices. O(n) total."
      },
      {
        "id": "Q11",
        "question": "Kth smallest in BST — iterative inorder pattern? (See also F16)",
        "answer": "Use a stack and `node` pointer. Inner `while node:` pushes the entire left spine. Pop, decrement k, return if k==0, then go right. Never push without checking left first."
      },
      {
        "id": "Q12",
        "question": "Max path sum — two quantities per recursion?",
        "answer": "**Return to parent:** `node.val + max(0, max(left_gain, right_gain))` (a straight path that can extend upward). **Update global:** `node.val + max(0, left_gain) + max(0, right_gain)` (path that bends at this node)."
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
        "question": "Insert / search / startsWith — costs?",
        "answer": "All O(k) in the length of the word. Space O(total characters stored) worst case."
      },
      {
        "id": "Q3",
        "question": "When is a trie preferable to a hash set of strings?",
        "answer": "When you need prefix queries, autocomplete, or longest-common-prefix, or want to amortize repeated prefixes in memory."
      },
      {
        "id": "Q4",
        "question": "How does \"Word Search II\" use a trie?",
        "answer": "Build a trie of all query words. DFS from each grid cell, advancing the trie pointer only if the next char is a child. Prune by removing found words from the trie mid-search."
      },
      {
        "id": "Q5",
        "question": "How do you handle wildcard (`.`) in trie search?",
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
        "question": "Backtracking template in one sentence?",
        "answer": "Recursive DFS: append a choice → recurse → pop the choice; at base case, record the current partial result."
      },
      {
        "id": "Q2",
        "question": "Subsets vs. permutations — structural difference?",
        "answer": "Subsets iterate from `start` to n (avoids duplicate orderings). Permutations use a `used` array, starting from 0 each level (all positions considered)."
      },
      {
        "id": "Q3",
        "question": "Handling duplicates in \"subsets II\" / \"permutations II\"?",
        "answer": "Sort the input. Skip a value at the same depth if it equals the previous value (and for perms: the previous value was not just used — i.e., `not used[i-1]`)."
      },
      {
        "id": "Q4",
        "question": "\"Combination sum\" — why OK to reuse elements?",
        "answer": "The recursive call passes `i` (not `i+1`) as the next start, allowing the same element again. Skip to `i+1` only when explicitly moving past an element."
      },
      {
        "id": "Q5",
        "question": "How to prune in \"N-Queens\"? (See also F18)",
        "answer": "Track three sets: columns used, diagonals (`r - c`), anti-diagonals (`r + c`). Reject placements that conflict. O(1) check per candidate placement."
      },
      {
        "id": "Q6",
        "question": "Difference between DFS and backtracking?",
        "answer": "Backtracking *undoes* state changes on the way out of recursion (path, visited markers, partial counts). DFS over an immutable structure doesn't need to."
      },
      {
        "id": "Q7",
        "question": "\"Word search\" (DFS on grid) — standard trick for marking visited?",
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
        "question": "Define reliability, scalability, and maintainability in one sentence each.",
        "answer": "Reliability: continues to work correctly under faults. Scalability: can cope with increased load. Maintainability: different people can productively work on it over time."
      },
      {
        "id": "Q2",
        "question": "Fault vs. failure?",
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
        "question": "Three pillars of maintainability?",
        "answer": "Operability (ops can keep it running), simplicity (reduce accidental complexity), evolvability (easy to change)."
      },
      {
        "id": "Q6",
        "question": "Two axes of scaling and the tradeoff?",
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
        "question": "Document vs. relational vs. graph — when do you pick each?",
        "answer": "Relational: structured, many-to-many relationships, strong consistency. Document: self-contained records, schema flexibility, tree-shaped data. Graph: pervasive many-to-many with traversals (social, knowledge)."
      },
      {
        "id": "Q2",
        "question": "Schema-on-read vs. schema-on-write tradeoff?",
        "answer": "Schema-on-write (relational): enforced at insert — rigid but safe. Schema-on-read (document): interpretation at read time — flexible but pushes validation into application code."
      },
      {
        "id": "Q3",
        "question": "LSM-tree vs. B-tree — core difference?",
        "answer": "LSM: append-only writes into sorted segments, merged in background (high write throughput, better compression, worse tail read latency, write amplification in compaction). B-tree: in-place updates in balanced-tree pages (good read latency, mature, write amplification via page rewrites + WAL)."
      },
      {
        "id": "Q4",
        "question": "What is write amplification?",
        "answer": "Bytes written to storage / bytes of application data written. LSM: compaction rewrites. B-tree: full-page writes + WAL entries."
      },
      {
        "id": "Q5",
        "question": "Two secondary index strategies in document stores?",
        "answer": "Local indexes (each partition indexes its own data; queries fan out to all partitions). Global indexes (partitioned separately; fast reads but writes are cross-partition, need async or distributed transactions)."
      },
      {
        "id": "Q6",
        "question": "Why are covering indexes a big deal?",
        "answer": "They contain all columns for a query — engine never touches the primary row. Big read-latency win at cost of index size and write overhead."
      },
      {
        "id": "Q7",
        "question": "OLTP vs. OLAP — key access pattern differences?",
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
        "question": "Three replication architectures?",
        "answer": "Single-leader (writes to leader, async/sync to followers). Multi-leader (writes at multiple nodes; conflict resolution needed). Leaderless (quorum reads and writes, e.g., Dynamo)."
      },
      {
        "id": "Q2",
        "question": "Replication lag — what anomaly does it cause?",
        "answer": "Time between a write on leader and visibility on followers. Causes violations of read-your-writes, monotonic reads, and consistent-prefix guarantees."
      },
      {
        "id": "Q3",
        "question": "What is read-your-writes consistency?",
        "answer": "After a user writes X, that user always sees X on subsequent reads. Typically achieved by routing that user's reads to the leader for a short window, or tagging the session with a version number."
      },
      {
        "id": "Q4",
        "question": "Range vs. hash partitioning — pain points?",
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
        "question": "Linearizability vs. serializability?",
        "answer": "Linearizability: single-object, real-time ordering — each op appears to take effect at some instant between its start and end. Serializability: multi-object transactions appear to execute in some serial order (not necessarily real-time)."
      },
      {
        "id": "Q8",
        "question": "What does quorum (R + W > N) guarantee?",
        "answer": "At least one node responding to a read overlaps with the last successful write. In practice, still not linearizable without additional mechanisms (read repair, anti-entropy, no concurrent writes)."
      },
      {
        "id": "Q9",
        "question": "Split-brain and how leader-election prevents it?",
        "answer": "Two nodes simultaneously believe they're leader. Prevention: fencing tokens (monotonically increasing epoch numbers), distributed consensus (Raft/Paxos) requiring majority to elect."
      },
      {
        "id": "Q10",
        "question": "Raft in one paragraph?",
        "answer": "One leader at a time, elected by majority vote in randomized-timeout elections (term numbers break ties). Leader appends log entries, replicates to followers; entry commits when a majority persists it. On crash, new election runs; candidates with the most up-to-date log win. Safety: committed entries never lost. Liveness: as long as majority up and communicating."
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
        "question": "Write-through vs. write-back vs. write-around?",
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
        "question": "Newsfeed: push (fan-out on write) vs. pull (fan-out on read)?",
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
        "question": "Blue/green vs. canary deploys?",
        "answer": "Blue/green: two full environments; cut traffic over atomically (fast rollback, doubles infra). Canary: gradually shift traffic % to new version (safer, slower, needs good metrics + automated rollback)."
      },
      {
        "id": "Q12",
        "question": "SD interview structure — 6 phases in order?",
        "answer": "(1) Requirements (functional + non-functional). (2) Back-of-envelope estimation (QPS, storage, bandwidth). (3) API design. (4) Data model. (5) High-level diagram. (6) Deep-dive into 1–2 hard components; discuss bottlenecks and tradeoffs."
      },
      {
        "id": "Q13",
        "question": "Two questions to always ask upfront?",
        "answer": "(1) Scale: DAU, read/write ratio, data retention? (2) Consistency expectations: can this tolerate eventual consistency anywhere?"
      },
      {
        "id": "Q1",
        "question": "[Signal / recognition: when do you pick this pattern?]",
        "answer": "..."
      },
      {
        "id": "Q2",
        "question": "[Template / pseudocode]",
        "answer": "..."
      },
      {
        "id": "Q3",
        "question": "[Edge case / common bug]",
        "answer": "..."
      },
      {
        "id": "Q4",
        "question": "[Complexity reasoning]",
        "answer": "..."
      },
      {
        "id": "Q5",
        "question": "[Variant showing mastery]",
        "answer": "..."
      },
      {
        "id": "Q6",
        "question": "[2-3 NC150 problems that use this pattern]",
        "answer": "...\n```\n\nUse for: Intervals, Greedy, Advanced Graphs, 2-D DP, Bit Manipulation, Math & Geometry."
      }
    ]
  }
];
