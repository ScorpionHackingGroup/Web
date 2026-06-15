---
layout: default
title: "Top 10 Burp Suite Extensions I Actually Use"
date: 2026-06-10 14:00:00 +0530
categories: [tools, burp-suite, tutorial]
description: "After hundreds of hours in Burp Suite, here are the extensions that genuinely save me time and find real bugs."
author: "ScorpionYug"
---

Burp Suite is **the** tool for web app testing. But out of the box, it's not enough. Here are the extensions I keep enabled on every engagement.

## 1. Logger++

**What:** Better logging than Burp's built-in
**Why:** Filter, search, and tag requests/responses
**Must-have:** Find that one specific request you made 30 minutes ago

```
Install: BApp Store → Logger++
```

## 2. Autorize

**What:** Automatic authorization testing
**Why:** Test if endpoints properly check user permissions

Use it for IDOR hunting on every authenticated session.

## 3. Logger++ Enhanced

**What:** Granular control over logging
**Why:** Only log what you need (saves disk)

## 4. Param Miner

**What:** Discover hidden parameters
**Why:** Finds parameters that don't show in normal crawling

```
Configure: Min requests = 100, max params = 1000
```

## 5. JWT Editor

**What:** Decode, edit, attack JWT tokens
**Why:** Test JWT implementations for:
- alg=none bypass
- Weak secrets
- Token confusion

## 6. Hackvertor

**What:** Smart encoding/decoding
**Why:** Auto-detect encoding for XSS payloads

## 7. Turbo Intruder

**What:** Fast custom attacks
**Why:** Race conditions, brute force, custom fuzzing

```python
def queueRequests(target, wordlists):
    engine = RequestEngine(endpoint=target.endpoint,
                           concurrentConnections=5,
                           requestsPerConnection=100,
                           pipeline=False)
    for i in range(5):
        engine.queue(target.req, i)
        engine.openGate(i)
```

## 8. Collaborator Everywhere

**What:** Out-of-band detection
**Why:** Find blind XSS, SSRF, XXE that callback to your server

## 9. InQL Scanner

**What:** GraphQL testing
**Why:** Modern apps use GraphQL — find introspection, batching attacks

## 10. DOM Invader

**What:** DOM XSS testing
**Why:** Built into Burp, catches DOM-based vulns others miss

## Bonus: Auto-highlight

**What:** Color-code interesting stuff
**Why:** Spot API keys, tokens, error messages instantly

---

## My Burp workflow

```
1. Set scope to target.*
2. Browse the app normally (Burp logs)
3. Run Logger++ analysis
4. Autorize for IDORs
5. Param Miner for hidden params
6. Turbo Intruder for rate-limited testing
7. Hackvertor + DOM Invader for XSS
8. JWT Editor for token attacks
```

**Setup time:** ~10 minutes for fresh engagements.

## Where to find extensions

- **BApp Store** (built-in) — most reliable
- **GitHub** — some community gems
- **Burp App Store** (new) — better discovery

---

**What's your favorite extension?** Let me know on [Twitter]({{ site.social.links[1] }}) — always looking for new tools to add to my arsenal.

— ScorpionYug
