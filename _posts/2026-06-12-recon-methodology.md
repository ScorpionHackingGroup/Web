---
layout: default
title: "Recon Methodology: My Complete Pipeline"
date: 2026-06-12 10:30:00 +0530
categories: [bug-bounty, recon, tutorial]
description: "A complete recon methodology I've developed over months of bug bounty hunting — from subdomain enumeration to finding hidden endpoints."
author: "ScorpionYug"
image: /assets/images/posts/recon.jpg
---

Recon is the **most important phase** of bug bounty hunting. Spend 80% of your time here, and the rest of the testing becomes 10x easier.

Here's the complete pipeline I use for every target.

## Phase 1: Subdomain enumeration

**Goal:** Find ALL attack surface.

```bash
# Passive (no direct contact with target)
subfinder -d target.com -o subfinder.txt
assetfinder --subs-only target.com > assetfinder.txt
amass enum -passive -d target.com -o amass.txt

# Active (sends DNS queries)
amass enum -active -d target.com

# Certificate transparency
curl -s "https://crt.sh/?q=%25.target.com&output=json" | jq -r '.[].name_value'

# Merge & dedupe
cat *.txt | sort -u > all_subs.txt
```

**Tools:** subfinder, amass, assetfinder, crt.sh

## Phase 2: Live host probing

```bash
# Check which subdomains are alive
cat all_subs.txt | httpx -tech-detect -status-code -title \
  -o live_hosts.txt

# Extract just URLs
cat live_hosts.txt | awk '{print $1}' > live_urls.txt
```

## Phase 3: URL enumeration

**Wayback Machine, Common Crawl, and crawling:**

```bash
# Historical URLs
cat live_urls.txt | waybackurls > wayback.txt
cat live_urls.txt | gau > gau.txt

# Crawl current site
katana -list live_urls.txt -depth 3 -o crawled.txt

# Merge
cat wayback.txt gau.txt crawled.txt | sort -u > all_urls.txt
```

## Phase 4: Hidden parameters

```bash
# Arjun — parameter discovery
arjun -u https://target.com -o params.json

# Manual testing
ffuf -u https://target.com/FUZZ -w /usr/share/wordlists/params.txt \
  -mc 200,301,302 -X POST -d "FUZZ=test"
```

## Phase 5: Vulnerability scanning

```bash
# Nuclei — template-based
nuclei -l live_urls.txt -t cves/ -severity critical,high -o vulns.txt
nuclei -l live_urls.txt -t vulnerabilities/ -o vuln2.txt
nuclei -l live_urls.txt -t misconfiguration/ -o misconfig.txt
nuclei -l live_urls.txt -t exposures/ -o exposures.txt

# SQLi — manual + sqlmap
sqlmap -u "https://target.com/page?id=1" --batch --dbs

# XSS — dalfox
cat all_urls.txt | grep "=" | dalfox pipe
```

## Phase 6: Reporting

After finding something, document EVERYTHING:

1. **Steps to reproduce** (clear, copy-pasteable)
2. **Impact** (what can attacker do?)
3. **Remediation** (how to fix?)
4. **Screenshots / video** (proof)
5. **CVSS score** (severity rating)

## My time distribution

| Phase | Time |
|---|---|
| Recon | 60% |
| Testing | 25% |
| Reporting | 15% |

## Tools cheatsheet

| Phase | Tools |
|---|---|
| Subdomain | subfinder, amass, assetfinder, crt.sh |
| Live probing | httpx, naabu |
| URL enum | waybackurls, gau, katana |
| Parameters | arjun, paramspider |
| Fuzzing | ffuf, dirsearch |
| Vuln scan | nuclei, sqlmap, dalfox |
| Analysis | Burp Suite, mitmproxy |

## Pro tips

1. **Save everything** — screenshots, commands, output
2. **Automate repetitive tasks** — write a script
3. **Try variations** — parameter, path, header-based
4. **Look for logic flaws** — not just known patterns
5. **Read source code** — JS files leak API endpoints

---

**Happy hunting!** 🎯 Found something cool? Tag me on [Twitter]({{ site.social.links[1] }}) — I love seeing creative finds.

— ScorpionYug
