#!/usr/bin/env python3
"""Crawl Cybermodeler color profiles and emit src/data/models/catalog.ts."""
from __future__ import annotations

import hashlib
import json
import re
import ssl
import time
import urllib.error
import urllib.request
from html import unescape
from pathlib import Path
from typing import Any
from urllib.parse import urljoin

try:
    import yaml
except ImportError:
    yaml = None  # type: ignore

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src" / "data" / "models" / "catalog.ts"
MANIFEST = Path(__file__).resolve().parent / "schemes" / "sources.yaml"
BASE = "https://www.cybermodeler.com/"

DISCOVERY_PAGES = [
    "resource8.shtml",  # aircraft profiles
    "resource9.shtml",  # armor profiles
]

USER_AGENT = "ChromabenchSchemeImporter/1.0 (+https://chromabench.com)"
REQUEST_DELAY = 0.35


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")[:80] or "unknown"


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, context=ctx, timeout=30) as resp:
        return resp.read().decode("utf-8", errors="replace")


def strip_tags(html: str) -> str:
    text = re.sub(r"<br\s*/?>", "\n", html, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    return unescape(re.sub(r"\s+", " ", text)).strip()


def discover_profile_urls() -> list[str]:
    urls: set[str] = set()
    for page in DISCOVERY_PAGES:
        try:
            html = fetch(urljoin(BASE, page))
        except urllib.error.URLError as e:
            print(f"WARN: could not fetch {page}: {e}")
            continue
        for href in re.findall(r'href="([^"]*profile[^"]*\.shtml)"', html, re.I):
            if href.startswith("http"):
                urls.add(href)
            else:
                urls.add(urljoin(BASE, href))
        time.sleep(REQUEST_DELAY)
    return sorted(urls)


def parse_title(html: str) -> tuple[str, str]:
    title_tag = re.search(r"<title>([^<]+)</title>", html, re.I)
    title = strip_tags(title_tag.group(1)) if title_tag else "Unknown"
    title = re.sub(r"^Douglas\s+", "", title, flags=re.I)
    title = re.sub(r"\s*Color Profile and Paint Guide\s*$", "", title, flags=re.I).strip()
    return title, title


def extract_subject_and_scheme(full_title: str) -> tuple[str, str, str]:
    """Return (subject_name, scheme_name, category)."""
    category = "vehicle" if any(
        k in full_title.lower()
        for k in ("m113", "m60", "m48", "m1 ", "m41", "m42", "leopard", "t-72", "t72", "patton", "apc", "arv", "merdc")
    ) else "aircraft"

    # Remove leading manufacturer if duplicated
    scheme = full_title
    subject = full_title

    # MERDC / camo suffix patterns
    for sep in (
        r"\s+MERDC\s+",
        r"\s+Adversary\s+",
        r"\s+Southeast Asia\s*\(SEA\)\s*",
        r"\s+Three-Color Camouflage\s*",
        r"\s+Camouflage\s+",
    ):
        parts = re.split(sep, full_title, maxsplit=1, flags=re.I)
        if len(parts) == 2:
            subject = parts[0].strip()
            scheme = parts[1].strip()
            break

    if scheme == subject:
        # Strip leading airframe from scheme when subject already captured
        m = re.match(
            r"^(.+?(?:Skyhawk|Phantom II|Phantom|Fighting Falcon|Falcon|Hornet|Eagle|Viper|"
            r"Patton|APC|Duster|Bulldog|Chaparral|Vulcan|Mutt|Centurion|Abrams|Leopard|"
            r"HUMVEE|HEMTT|Skyhawk|Scooter))\s+(.+)$",
            full_title,
            re.I,
        )
        if m:
            subject = m.group(1).strip()
            scheme = m.group(2).strip()
            scheme = re.sub(r"\s*Color Profile.*$", "", scheme, flags=re.I).strip()

    scheme = re.sub(r"\s*Color Profile.*$", "", scheme, flags=re.I).strip()
    return subject, scheme or full_title, category


def parse_operator_unit(scheme_name: str, full_title: str) -> dict[str, str | None]:
    meta: dict[str, str | None] = {"operator": None, "unit": None, "year": None, "buno": None}
    text = f"{scheme_name} {full_title}"
    unit_m = re.search(r"\b(VF-\d+|VA-\d+|VFA-\d+|VC-\d+|VT-\d+|NFWS|USAF|USN|USMC|RAF|RAAF|IAF|VMFA-\d+)\b", text, re.I)
    if unit_m:
        meta["unit"] = unit_m.group(1).upper()
        meta["operator"] = unit_m.group(1).upper()
    year_m = re.search(r"\b(19\d{2}|20\d{2})\b", text)
    if year_m:
        meta["year"] = year_m.group(1)
    buno_m = re.search(r"\bBuNo\.?\s*(\d+)\b", text, re.I)
    if buno_m:
        meta["buno"] = buno_m.group(1)
    return meta


def first_code(cell: str, patterns: list[str]) -> str | None:
    for pat in patterns:
        m = re.search(pat, cell, re.I)
        if m:
            return m.group(0).replace(" ", "")
    return None


def parse_paint_guide(html: str) -> list[dict[str, Any]]:
    colors: list[dict[str, Any]] = []
    start_m = re.search(r'<div class="color_container_\d+">', html, re.I)
    if not start_m:
        return colors
    start = start_m.start()
    end_m = re.search(r"<!--\s*color_note include\s*-->", html[start:], re.I)
    block = html[start : start + end_m.start()] if end_m else html[start : start + 20000]
    divs = re.findall(r'<div style="[^"]*">(.*?)</div>', block, re.I | re.S)
    # Skip header row (12 brand columns)
    if len(divs) < 13:
        return colors

    data_divs = divs[12:]
    cols = 12
    for i in range(0, len(data_divs) - (len(data_divs) % cols), cols):
        row = [strip_tags(d) for d in data_divs[i : i + cols]]
        label_cell = row[0]
        if not label_cell or label_cell == "\u00a0":
            continue
        fs_m = re.search(r"FS\s*(\d{5})", label_cell, re.I)
        if not fs_m:
            continue
        fs = fs_m.group(1)
        lines = [ln.strip() for ln in label_cell.split("\n") if ln.strip()]
        standard_name = lines[0] if lines else f"FS {fs}"
        notes = " · ".join(ln for ln in lines[2:] if not ln.startswith("FS")) or None

        ammo, av, gsi, hat, lc, mis, mrp, rev, tam, tes, xtra = row[1:12]

        tamiya = first_code(tam, [r"XF-\d+", r"X-\d+", r"AS\d+", r"TS\d+"])
        vallejo = first_code(av, [r"71\.\d+"])
        mr_color = first_code(gsi, [r"C\d+", r"H\d+"])
        sms = None  # rarely in table; FS map handles SMS

        colors.append(
            {
                k: v
                for k, v in {
                    "role": standard_name,
                    "fs": fs,
                    "standardName": standard_name,
                    "tamiya": tamiya,
                    "vallejo": vallejo,
                    "sms": sms,
                    "mrColor": mr_color,
                    "notes": notes,
                }.items()
                if v
            }
        )
    return colors


def parse_profile(url: str) -> dict[str, Any] | None:
    try:
        html = fetch(url)
    except urllib.error.URLError as e:
        print(f"  FAIL {url}: {e}")
        return None

    full_title, _ = parse_title(html)
    colors = parse_paint_guide(html)
    if not colors:
        return None

    subject_name, scheme_name, category = extract_subject_and_scheme(full_title)
    meta = parse_operator_unit(scheme_name, full_title)

    courtesy = None
    cm = re.search(r"Paint guide courtesy of\s+([^<\n]+)", html, re.I)
    if cm:
        courtesy = strip_tags(cm.group(1))

    scheme_id = slugify(f"{subject_name}-{scheme_name}-{url.split('/')[-1]}")
    subject_id = slugify(subject_name)

    return {
        "subjectId": subject_id,
        "subjectName": subject_name,
        "category": category,
        "aliases": list({w for w in re.findall(r"[A-Za-z0-9-]+", subject_name) if len(w) > 2}),
        "scheme": {
            "id": scheme_id,
            "name": scheme_name,
            **{k: v for k, v in meta.items() if v},
            "colors": colors,
            "sources": [
                {"label": "Cybermodeler", "url": url},
                *([{"label": courtesy}] if courtesy else []),
            ],
        },
    }


def load_manifest_extras() -> list[dict[str, Any]]:
    if not MANIFEST.exists() or yaml is None:
        return []
    data = yaml.safe_load(MANIFEST.read_text()) or {}
    return data.get("schemes", [])


def merge_subjects(parsed: list[dict[str, Any]], extras: list[dict[str, Any]]) -> list[dict[str, Any]]:
    subjects: dict[str, dict[str, Any]] = {}

    def add_entry(entry: dict[str, Any]) -> None:
        sid = entry["subjectId"]
        if sid not in subjects:
            subjects[sid] = {
                "id": sid,
                "name": entry["subjectName"],
                "category": entry["category"],
                "aliases": entry.get("aliases", []),
                "schemes": [],
            }
        scheme = entry["scheme"]
        fs_key = "-".join(sorted(c["fs"] for c in scheme["colors"] if c.get("fs")))
        dedupe_key = f"{scheme['name']}|{fs_key}"
        existing_keys = {
            f"{s['name']}|{'-'.join(sorted(c['fs'] for c in s['colors'] if c.get('fs')))}"
            for s in subjects[sid]["schemes"]
        }
        if dedupe_key not in existing_keys:
            subjects[sid]["schemes"].append(scheme)

    for p in parsed:
        if p:
            add_entry(p)
    for ex in extras:
        add_entry(ex)

    result = sorted(subjects.values(), key=lambda s: s["name"].lower())
    for s in result:
        s["schemes"] = sorted(s["schemes"], key=lambda x: x["name"].lower())
    return result


def ts_string(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def emit_catalog(models: list[dict[str, Any]]) -> None:
    lines = [
        'import type { ModelSubject } from "./types";',
        "",
        "/** Generated by scripts/import_schemes.py — run npm run import:schemes to refresh. */",
        "export const MODELS: ModelSubject[] = ",
        json.dumps(models, indent=2, ensure_ascii=False),
        ";",
        "",
    ]
    OUT.write_text("\n".join(lines))
    scheme_count = sum(len(m["schemes"]) for m in models)
    print(f"Wrote {OUT} — {len(models)} subjects, {scheme_count} schemes")


def main() -> None:
    import sys

    sys.stdout.reconfigure(line_buffering=True)
    print("Discovering profile URLs…")
    urls = discover_profile_urls()
    print(f"Found {len(urls)} profile URLs")

    parsed: list[dict[str, Any]] = []
    for i, url in enumerate(urls):
        if i % 25 == 0:
            print(f"  [{i + 1}/{len(urls)}] …")
        result = parse_profile(url)
        if result:
            parsed.append(result)
        time.sleep(REQUEST_DELAY)

    extras = load_manifest_extras()
    models = merge_subjects(parsed, extras)
    emit_catalog(models)


if __name__ == "__main__":
    main()
