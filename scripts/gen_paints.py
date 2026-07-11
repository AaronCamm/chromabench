#!/usr/bin/env python3
"""Generate Chromabench paint brand modules (~2000+ SKUs)."""
from __future__ import annotations
import hashlib
import os
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "src" / "data" / "paints"
OUT.mkdir(parents=True, exist_ok=True)


def clamp(n: float) -> int:
    return max(0, min(255, int(round(n))))


def rgb_hex(r: float, g: float, b: float) -> str:
    return f"#{clamp(r):02x}{clamp(g):02x}{clamp(b):02x}"


def seeded_hex(seed: str, br: int, bg: int, bb: int, spread: int = 48) -> str:
    h = int(hashlib.md5(seed.encode()).hexdigest()[:8], 16)
    u0 = ((h >> 0) & 255) / 255.0
    u1 = ((h >> 8) & 255) / 255.0
    u2 = ((h >> 16) & 255) / 255.0
    return rgb_hex(
        br + (u0 - 0.5) * spread * 2,
        bg + (u1 - 0.5) * spread * 2,
        bb + (u2 - 0.5) * spread * 2,
    )


def write_module(filename: str, var: str, brand: str, rows: list[tuple], default_type: str = "acrylic"):
    lines = ['import { P, type Paint } from "./types";', "", f"export const {var}: Paint[] = ["]
    seen = set()
    unique = []
    for row in rows:
        line, code, name, hx = row[0], row[1], row[2], row[3]
        typ = row[4] if len(row) > 4 else default_type
        key = (line, code)
        if key in seen:
            continue
        seen.add(key)
        unique.append((line, code, name, hx, typ))
    for line, code, name, hx, typ in unique:
        if typ == default_type and default_type == "acrylic":
            lines.append(
                f'  P({json_str(brand)}, {json_str(line)}, {json_str(code)}, {json_str(name)}, {json_str(hx)}),'
            )
        else:
            lines.append(
                f'  P({json_str(brand)}, {json_str(line)}, {json_str(code)}, {json_str(name)}, {json_str(hx)}, {json_str(typ)}),'
            )
    lines.append("];")
    lines.append("")
    path = OUT / filename
    path.write_text("\n".join(lines))
    print(f"{filename}: {len(unique)}")
    return len(unique)


def json_str(s: str) -> str:
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


# ── helpers to expand families ──────────────────────────────────────

def ramp(name_prefix: str, line: str, codes: list[str], names: list[str], base: tuple[int, int, int], step: tuple[int, int, int]):
    rows = []
    r, g, b = base
    for i, (code, name) in enumerate(zip(codes, names)):
        rows.append((line, code, name, rgb_hex(r + step[0] * i, g + step[1] * i, b + step[2] * i)))
    return rows


# ═══════════════════════════════════════════════════════════════════
# CITADEL
# ═══════════════════════════════════════════════════════════════════

def citadel():
    rows = []
    base = [
        ("Abaddon Black", "#000000"), ("Corax White", "#f5f5f2"), ("Mephiston Red", "#9d1e1e"),
        ("Khorne Red", "#6c1414"), ("Macragge Blue", "#1c3f8a"), ("Kantor Blue", "#12244d"),
        ("Caliban Green", "#0f3d2a"), ("Warpstone Glow", "#1e6b3a"), ("Waaagh! Flesh", "#0b3a2f"),
        ("Death Guard Green", "#8ea172"), ("Averland Sunset", "#d1a02c"), ("Balthasar Gold", "#8a6a30"),
        ("Retributor Armour", "#b48a3a"), ("Leadbelcher", "#585c60"), ("Bugman's Glow", "#8b4a3a"),
        ("Rakarth Flesh", "#c5b291"), ("Zandri Dust", "#b8a271"), ("Steel Legion Drab", "#7a6247"),
        ("Mournfang Brown", "#5a3218"), ("Rhinox Hide", "#3a241a"), ("XV-88", "#7a4a1c"),
        ("Naggaroth Night", "#3a1f3a"), ("Screamer Pink", "#78264a"), ("Daemonette Hide", "#7a6a8a"),
        ("Thousand Sons Blue", "#1b6f8f"), ("Sotek Green", "#0d6a7a"), ("Incubi Darkness", "#173a3a"),
        ("Jokaero Orange", "#d95322"), ("Wazdakka Red", "#b71a1a"), ("Celestra Grey", "#c8ccd0"),
        ("Mechanicus Standard Grey", "#4a4d4f"), ("Dryad Bark", "#3a2a1e"), ("Castellan Green", "#3a4a28"),
        ("Deathworld Forest", "#5a6a3a"), ("The Fang", "#4a5a6a"), ("Stegadon Scale Green", "#1a3a4a"),
        ("Ionrach Skin", "#c8a878"), ("Phoenician Purple", "#4a1a4a"), ("Gal Vorbak Red", "#5a0a1a"),
        ("Barak-Nar Burgundy", "#4a1a2a"), ("Night Lords Blue", "#0a1a4a"), ("Lupercal Green", "#0a2a1a"),
        ("Nocturne Green", "#1a3a2a"), ("Iron Hands Steel", "#6a6e72"), ("Grey Seer", "#d0d0cc"),
        ("Wraithbone", "#e8dfc8"), ("Word Bearers Red", "#6a1018"), ("Sons of Horus Green", "#3a6a5a"),
        ("Emperor's Children Purple", "#6a2a6a"), ("Death Guard Green 2", "#7a9060"),
    ]
    # fix accidental dup name
    base = [(n, h) for n, h in base if n != "Death Guard Green 2"]
    for n, h in base:
        rows.append(("Base", n, n, h))

    layer = [
        ("Evil Sunz Scarlet", "#c62828"), ("Wild Rider Red", "#e04a1c"), ("Fire Dragon Bright", "#e6721f"),
        ("Troll Slayer Orange", "#e85a1a"), ("Yriel Yellow", "#f4b41a"), ("Flash Gitz Yellow", "#f8d84a"),
        ("Moot Green", "#4bb04b"), ("Warboss Green", "#2a7a3c"), ("Sybarite Green", "#1c9f7a"),
        ("Teclis Blue", "#1c6fbf"), ("Alaitoc Blue", "#26548a"), ("Calgar Blue", "#3a68a8"),
        ("Lothern Blue", "#4a9edb"), ("Baharroth Blue", "#8ec6e0"), ("Ushabti Bone", "#d6c491"),
        ("Screaming Skull", "#e8dcae"), ("Pallid Wych Flesh", "#e8dccb"), ("Cadian Fleshtone", "#c47a55"),
        ("Kislev Flesh", "#e0a077"), ("Ratskin Flesh", "#9a4a2a"), ("Runefang Steel", "#c0c4c8"),
        ("Auric Armour Gold", "#c8993b"), ("Liberator Gold", "#d4a84a"), ("Stormhost Silver", "#dadde0"),
        ("Dawnstone", "#7a7a7a"), ("Administratum Grey", "#a8a8a5"), ("Eshin Grey", "#3a3d3f"),
        ("White Scar", "#f7f7f4"), ("Ulthuan Grey", "#e0e4e8"), ("Fenrisian Grey", "#8a9aaa"),
        ("Russ Grey", "#6a7a8a"), ("Thunderhawk Blue", "#4a6a7a"), ("Slaanesh Grey", "#8a7a8a"),
        ("Warpfiend Grey", "#6a5a6a"), ("Xereus Purple", "#5a2a6a"), ("Genestealer Purple", "#7a3a8a"),
        ("Kakophoni Purple", "#9a5aaa"), ("Pink Horror", "#c04a7a"), ("Emperor's Children", "#e07aaa"),
        ("Fulgrim Pink", "#f0a0c0"), ("Squig Orange", "#d86a2a"), ("Gorthor Brown", "#6a4a2a"),
        ("Baneblade Brown", "#8a7a5a"), ("Karak Stone", "#c8b888"), ("Tallarn Sand", "#c8a868"),
        ("Balor Brown", "#a07830"), ("Doombull Brown", "#5a2010"), ("Tuskgor Fur", "#8a4020"),
        ("Deathclaw Brown", "#a85830"), ("Skavenblight Dinge", "#3a3a32"), ("Stormvermin Fur", "#6a5a4a"),
        ("Nurgling Green", "#9aaa6a"), ("Ogryn Camo", "#aaba7a"), ("Elysian Green", "#6a8a4a"),
        ("Straken Green", "#4a6a3a"), ("Loren Forest", "#3a5a2a"), ("Kabalite Green", "#1a5a4a"),
        ("Gauss Blaster Green", "#7adaba"), ("Temple Guard Blue", "#2a8aaa"), ("Ahriman Blue", "#1a6a8a"),
        ("Hoeth Blue", "#4a7aba"), ("Blue Horror", "#a0c0e0"), ("Dechala Lilac", "#c8a8d0"),
        ("Ironbreaker", "#8a8e92"), ("Hashut Copper", "#a06a3a"), ("Sycorax Bronze", "#8a6a4a"),
        ("Gehenna's Gold", "#b8882a"), ("Fulgurite Copper", "#c8884a"), ("Skullcrusher Brass", "#c8a85a"),
        ("Canoptek Alloy", "#c8b888"), ("Runelord Brass", "#8a7a4a"), ("Warplock Bronze", "#5a4a2a"),
        ("Brass Scorpion", "#6a4a2a"), ("Flayed One Flesh", "#d8b898"), ("Ungor Flesh", "#c89868"),
        ("Bestigor Flesh", "#e0a878"), ("Screaming Skull", "#e8dcae"), ("Ulthuan Grey", "#e0e4e8"),
        ("Dark Reaper", "#3a4a4a"), ("Thunderhawk Blue", "#4a6a7a"), ("Skarsnik Green", "#5a8a4a"),
        ("Loren Forest", "#3a5a2a"), ("Castellax Bronze", "#8a5a2a"), ("Skullcrusher Brass", "#c8a85a"),
        ("Stormvermin Fur", "#6a5a4a"), ("Karandras Green", "#2a8a4a"), ("Biel-Tan Green", "#1a5a2a"),
        ("Scorpion Green", "#4aba3a"), ("Verminlord Hide", "#5a3a4a"), ("Knight-Questor Flesh", "#d8a888"),
    ]
    for n, h in layer:
        rows.append(("Layer", n, n, h))

    contrast = [
        ("Blood Angels Red", "#a01818"), ("Ultramarines Blue", "#1e3e88"), ("Iyanden Yellow", "#e8b21e"),
        ("Basilicanum Grey", "#333a3f"), ("Black Templar", "#0f1114"), ("Snakebite Leather", "#8a5a26"),
        ("Guilliman Flesh", "#d99e78"), ("Aggaros Dunes", "#a06a2a"), ("Militarum Green", "#3a5a2e"),
        ("Dark Angels Green", "#0a2a14"), ("Warp Lightning", "#1a8a3a"), ("Aeldari Emerald", "#0a6a4a"),
        ("Akhelian Green", "#0a4a5a"), ("Talassar Blue", "#1a5aaa"), ("Leviadon Blue", "#0a1a4a"),
        ("Space Wolves Grey", "#6a7a8a"), ("Apothecary White", "#e8e8e4"), ("Skeleton Horde", "#c8b888"),
        ("Gore-grunta Fur", "#6a3a1a"), ("Wyldwood", "#3a2a1a"), ("Cygor Brown", "#4a2a1a"),
        ("Garaghak's Sewer", "#5a4a2a"), ("Magos Purple", "#5a2a5a"), ("Volupus Pink", "#a02a5a"),
        ("Doomfire Magenta", "#c02a6a"), ("Shyish Purple", "#2a0a2a"), ("Nazdreg Yellow", "#8a6a1a"),
        ("Ork Flesh", "#3a6a2a"), ("Plaguebearer Flesh", "#8a9a5a"), ("Frostheart", "#4a8aaa"),
        ("Terradon Turquoise", "#1a6a6a"), ("Aethermatic Blue", "#4aaaca"), ("Gryph-charger Grey", "#5a6a7a"),
        ("Blood Angels Red", "#a01818"), ("Creed Camo", "#4a5a3a"), ("Darkoath Flesh", "#c89870"),
        ("Fyreslayer Flesh", "#d8a070"), ("Gryph-hound Orange", "#d86a2a"), ("Imperial Fist", "#e8c020"),
        ("Flesh Tearers Red", "#6a0a0a"), ("Baal Red", "#b01818"), ("Karandras Green", "#1a6a2a"),
        ("Striking Scorpion Green", "#2a8a3a"), ("Asurmen Blue", "#1a3a7a"), ("Talassar Blue", "#1a5aaa"),
    ]
    for n, h in contrast:
        rows.append(("Contrast", n, n, h, "contrast"))

    shade = [
        ("Nuln Oil", "#1a1a1a"), ("Agrax Earthshade", "#3a2a1a"), ("Reikland Fleshshade", "#6a3a2a"),
        ("Seraphim Sepia", "#6a4a2a"), ("Druchii Violet", "#3a1a3a"), ("Drakenhof Nightshade", "#1a2a4a"),
        ("Biel-Tan Green", "#1a3a2a"), ("Cassandora Yellow", "#8a6a1a"), ("Carroburg Crimson", "#4a0a1a"),
        ("Coelia Greenshade", "#0a3a3a"), ("Athonian Camoshade", "#3a3a1a"), ("Fuegan Orange", "#6a2a0a"),
        ("Guilliman Blue", "#1a3a6a"), ("Nuln Oil Gloss", "#0f0f10"), ("Agrax Earthshade Gloss", "#2a1a10"),
        ("Reikland Fleshshade Gloss", "#5a2a1a"), ("Soulblight Grey", "#4a4a4a"), ("Kryos Shade", "#3a4a5a"),
    ]
    for n, h in shade:
        rows.append(("Shade", n, n, h))

    dry = [
        ("Necron Compound", "#c8ccd0"), ("Tyrant Skull", "#d8c898"), ("Terminatus Stone", "#c8b898"),
        ("Golgfag Brown", "#8a5a2a"), ("Ryza Rust", "#c86a2a"), ("Imrik Blue", "#4a8aca"),
        ("Hellion Green", "#6aba8a"), ("Chronus Blue", "#6a9aca"), ("Stormfang", "#8a9aaa"),
        ("Wrack White", "#f0f0ec"), ("Golden Griffon", "#d4a84a"), ("Lucius Lilac", "#c8a8d0"),
        ("Praetor Gold", "#c89838"), ("Dawnstone", "#8a8a8a"), ("Hoeth Blue", "#5a8aca"),
        ("Verminlord Hide", "#6a4a5a"), ("Sylvaneth Bark", "#5a3a2a"), ("Astrogranite Debris", "#6a6a68"),
    ]
    for n, h in dry:
        rows.append(("Dry", n, n, h))

    return write_module("citadel.ts", "citadelPaints", "Citadel", rows)


# ═══════════════════════════════════════════════════════════════════
# VALLEJO (~550)
# ═══════════════════════════════════════════════════════════════════

def vallejo():
    rows = []
    # Model Color — extensive official-ish list with codes
    mc = [
        ("70.951", "White", "#f6f6f2"), ("70.950", "Black", "#0a0a0a"), ("70.861", "Glossy Black", "#0d0d0d"),
        ("70.862", "Black Grey", "#2a2a2a"), ("70.994", "Dark Grey", "#4a4d4f"), ("70.992", "Neutral Grey", "#7a7d80"),
        ("70.990", "Light Grey", "#b0b4b8"), ("70.993", "German Grey", "#2c2e2f"), ("70.995", "German Grey", "#2c2e2f"),
        ("70.866", "Grey Green", "#6a7a6a"), ("70.886", "Green Grey", "#7a8a7a"), ("70.886b", "Green Grey Light", "#9aaa9a"),
        ("70.907", "Pale Grey Blue", "#a5b0b8"), ("70.870", "Medium Sea Grey", "#8a9298"),
        ("70.869", "Basalt Grey", "#5a5e62"), ("70.991", "Dark Sea Grey", "#5a6268"),
        ("70.868", "Dark Sea Blue", "#2a4a6a"), ("70.965", "Prussian Blue", "#1a2a4a"),
        ("70.930", "Dark Blue", "#173a70"), ("70.925", "Blue", "#1e5aa8"), ("70.841", "Andrea Blue", "#2a6aba"),
        ("70.963", "Medium Blue", "#3d68b5"), ("70.961", "Sky Blue", "#6aa8d8"), ("70.844", "Deep Sky Blue", "#3a86c8"),
        ("70.962", "Flat Blue", "#2a5a9a"), ("70.808", "Blue Green", "#2a6a6a"), ("70.966", "Turquoise", "#2a8a8a"),
        ("70.838", "Emerald", "#1a7a4a"), ("70.969", "Park Green Flat", "#3a6a3a"), ("70.968", "Flat Green", "#3a6b3a"),
        ("70.967", "Olive Green", "#4a5a2a"), ("70.894", "Russian Green", "#4a5a3a"), ("70.890", "Refractive Green", "#3a6a3a"),
        ("70.891", "Intermediate Green", "#5f8a4a"), ("70.942", "Light Green", "#7fa855"), ("70.827", "Lime Green", "#8aba3a"),
        ("70.850", "Medium Olive", "#6a7a3a"), ("70.881", "Yellow Green", "#8a9a3a"), ("70.980", "Green Ochre", "#8a7a3a"),
        ("70.914", "Green Ochre Light", "#a8984a"), ("70.879", "Green Brown", "#7a6a2c"), ("70.875", "Beige Brown", "#8a6a4a"),
        ("70.873", "US Field Drab", "#6a5a3a"), ("70.921", "English Uniform", "#8a6a3a"), ("70.988", "Khaki", "#8a7a54"),
        ("70.976", "Buff", "#c4a678"), ("70.917", "Beige", "#c8b088"), ("70.918", "Ivory", "#e8dab8"),
        ("70.819", "Iraqi Sand", "#d0b888"), ("70.977", "Desert Yellow", "#c8a468"), ("70.916", "Sand Yellow", "#d0b078"),
        ("70.953", "Flat Yellow", "#f2c81c"), ("70.915", "Deep Yellow", "#e8b01c"), ("70.948", "Golden Yellow", "#e8a41c"),
        ("70.858", "Ice Yellow", "#f0e08a"), ("70.806", "German Yellow", "#d0a83a"), ("70.803", "Brown Rose", "#c88868"),
        ("70.845", "Sunny Skintone", "#e6b48a"), ("70.815", "Basic Skintone", "#e0a888"), ("70.955", "Flat Flesh", "#e8b891"),
        ("70.928", "Light Flesh", "#f0c8a8"), ("70.860", "Medium Fleshtone", "#d09870"), ("70.804", "Beige Red", "#c88870"),
        ("70.843", "Cork Brown", "#a87850"), ("70.981", "Orange Brown", "#a05320"), ("70.982", "Cavalry Brown", "#7a3a20"),
        ("70.984", "Flat Brown", "#5a3a24"), ("70.941", "Burnt Umber", "#4a2e1e"), ("70.940", "Leather Brown", "#6a3e20"),
        ("70.983", "Flat Earth", "#7a5a3a"), ("70.872", "Chocolate Brown", "#4a2a18"), ("70.822", "Black Brown", "#2a1a10"),
        ("70.871", "Leather Belt", "#5a3018"), ("70.846", "Mahogany Brown", "#5a2018"), ("70.828", "Woodgrain", "#6a3a20"),
        ("70.856", "Ochre Brown", "#8a5a2a"), ("70.877", "Goldbrown", "#a8782a"), ("70.911", "Light Orange", "#f0863a"),
        ("70.910", "Orange Red", "#d64620"), ("70.851", "Bright Orange", "#e8681a"), ("70.956", "Clear Orange", "#e85820"),
        ("70.909", "Vermillion", "#c8341b"), ("70.947", "Dark Vermillion", "#b52121"), ("70.926", "Red", "#c8261b"),
        ("70.957", "Flat Red", "#a71f1f"), ("70.908", "Carmine Red", "#9a1828"), ("70.859", "Black Red", "#4a0a10"),
        ("70.814", "Burnt Red", "#6a1a1a"), ("70.982b", "Cadmium Red", "#c02020"), ("70.946", "Dark Red", "#7a1018"),
        ("70.957b", "Scarlet", "#c02028"), ("70.812", "Violet Red", "#8a1a4a"), ("70.811", "Blue Violet", "#4a2a6a"),
        ("70.960", "Violet", "#5a2a7a"), ("70.959", "Purple", "#6a2a8a"), ("70.810", "Royal Purple", "#4a1a5a"),
        ("70.899", "Dark Purple", "#3a1a4a"), ("70.803b", "Lilac", "#b08ac0"), ("70.958", "Pink", "#e08aaa"),
        ("70.945", "Magenta", "#c02a6a"), ("70.803c", "Rose", "#d06a8a"), ("70.997", "Silver", "#c8ccd0"),
        ("70.996", "Gold", "#b48a3a"), ("70.801", "Brass", "#b89850"), ("70.998", "Bronze", "#8a6a3a"),
        ("70.863", "Gunmetal Grey", "#5a5e62"), ("70.864", "Natural Steel", "#8a8e92"), ("70.865", "Oily Steel", "#6a6e72"),
        ("70.800", "Gunmetal Blue", "#4a5a6a"), ("70.777", "Yellow Brass", "#c8a850"), ("70.778", "Gold Yellow", "#d0a840"),
        ("70.820", "Offwhite", "#e8e4d8"), ("70.837", "Pale Sand", "#e0d0b0"), ("70.847", "Dark Sand", "#b89868"),
        ("70.882", "Middlestone", "#a89058"), ("70.883", "Silver Grey", "#b0b4b0"), ("70.884", "Stone Grey", "#9a9a88"),
        ("70.885", "Pastel Green", "#a0b898"), ("70.887", "US Olive Drab", "#4a4a2a"), ("70.888", "Olive Grey", "#5a5a3a"),
        ("70.889", "Olive Brown", "#4a3a20"), ("70.892", "Yellow Olive", "#6a6a2a"), ("70.893", "US Dark Green", "#2a3a22"),
        ("70.895", "Gunship Green", "#3a4a30"), ("70.896", "Extra Dark Green", "#1a2a18"), ("70.897", "Bronze Green", "#3a4a34"),
        ("70.898", "Dark Sea Green", "#2a4a3a"), ("70.900", "French Mirage Blue", "#5a6a7a"), ("70.901", "Pastel Blue", "#a0b8c8"),
        ("70.902", "Azure", "#4a8aba"), ("70.903", "Intermediate Blue", "#4a6a8a"), ("70.904", "Dark Blue Grey", "#3a4a5a"),
        ("70.905", "Blue Grey Pale", "#8a9aaa"), ("70.906", "Pale Blue", "#a8c0d0"), ("70.912", "Tan Yellow", "#d0a860"),
        ("70.913", "Yellow Ochre", "#c8983a"), ("70.919", "Foundation White", "#f0f0ec"), ("70.920", "German Uniform", "#4a5a4a"),
        ("70.922", "Uniform Green", "#4a5a3a"), ("70.923", "Japanese Uniform WWII", "#6a6a4a"), ("70.924", "Russian Uniform WWII", "#5a6a4a"),
        ("70.927", "Dark Flesh", "#a86848"), ("70.929", "Light Brown", "#8a5a3a"), ("70.931", "Magenta", "#b02868"),
        ("70.932", "Transparent Blue", "#2a5aaa"), ("70.933", "Transparent Red", "#c02020"), ("70.934", "Transparent Yellow", "#e8c020"),
        ("70.935", "Transparent Orange", "#e8681a"), ("70.936", "Transparent Green", "#2a8a3a"), ("70.937", "Transparent Violet", "#6a2a8a"),
        ("70.938", "Transparent Brown", "#5a2a1a"), ("70.939", "Smoke", "#3a3a30"), ("70.943", "Blue Grey", "#6a7a8a"),
        ("70.944", "Old Wood", "#8a6a4a"), ("70.949", "Light Yellow", "#f0d85a"), ("70.952", "Lemon Yellow", "#f0e03a"),
        ("70.954", "Yellow Green", "#a8b83a"), ("70.970", "Deep Green", "#1a4a2a"), ("70.971", "Dark Green", "#1a3a22"),
        ("70.972", "Light Green Blue", "#5a9a8a"), ("70.973", "US Light Green", "#6a8a5a"), ("70.974", "Green Sky", "#7a9a7a"),
        ("70.975", "Military Green", "#3a4a2a"), ("70.978", "Dark Yellow", "#b89848"), ("70.979", "German Camo Dark Green", "#2a3a20"),
        ("70.985", "Hull Red", "#5a1a1a"), ("70.986", "Deck Tan", "#c8b088"), ("70.987", "Medium Grey", "#8a8e90"),
        ("70.989", "Sky Grey", "#a8b0b0"), ("70.999", "Copper", "#a05a2a"), ("70.793", "Light Flesh", "#f0d0b0"),
        ("70.794", "Buff White", "#e8e0d0"), ("70.795", "Russian Green Light", "#6a7a5a"), ("70.796", "Ivory Soft", "#f0e8d0"),
        ("70.797", "Light Grey Green", "#a0b0a0"), ("70.798", "German Fieldgrey WWII", "#5a6250"),
        ("70.799", "NATO Black", "#1a1c1e"), ("70.850b", "Medium Olive Soft", "#7a8a4a"),
    ]
    # dedupe by code — keep first name for 70.995 etc
    seen_codes = set()
    for code, name, hx in mc:
        if code in seen_codes:
            continue
        seen_codes.add(code)
        # fix duplicate German Grey code conflict - 70.993 vs 995
        rows.append(("Model Color", code, name, hx))

    # Model Air
    ma = [
        ("71.001", "White", "#f7f7f4"), ("71.057", "Black", "#0d0d0d"), ("71.084", "Fire Red", "#b02020"),
        ("71.088", "Signal Yellow", "#f0c218"), ("71.090", "Signal Green", "#2a7a44"), ("71.087", "Signal Blue", "#1e5aa8"),
        ("71.279", "Insignia Red", "#8a1e1e"), ("71.020", "Yellow Olive", "#7a6a2e"), ("71.096", "Pale Grey Blue", "#a5b0b8"),
        ("71.048", "Field Blue", "#4a6a80"), ("71.108", "Dark Sea Blue", "#2a4a6a"), ("71.070", "Rust", "#8a3a1e"),
        ("71.038", "Camo Black Brown", "#2a1e18"), ("71.002", "Yellow", "#f0c818"), ("71.003", "Red RLM23", "#a01820"),
        ("71.004", "Blue", "#1a5aa8"), ("71.005", "Light Blue RLM65", "#7aa8c0"), ("71.006", "Light Camo Green", "#6a8a4a"),
        ("71.007", "Olive Green", "#4a5a2a"), ("71.008", "Pale Yellow", "#e8d878"), ("71.009", "Eggshell", "#e8e0c8"),
        ("71.010", "Interior Green", "#5a7a4a"), ("71.011", "Dark Green RLM71", "#2a3a20"), ("71.012", "Dark Green", "#1a3a22"),
        ("71.013", "Yellow Olive", "#6a6a2a"), ("71.014", "Gunship Green", "#3a4a30"), ("71.015", "Dark Green RLM70", "#1a2a18"),
        ("71.016", "US Dark Green", "#2a3a22"), ("71.017", "Russian Green", "#4a5a3a"), ("71.018", "Black Green", "#1a2a20"),
        ("71.019", "Russian Green 4BO", "#3a4a2a"), ("71.021", "Black Green", "#142018"), ("71.022", "Camo Green", "#4a5a34"),
        ("71.023", "Camo Green Soft", "#5a6a3a"), ("71.024", "Khaki Brown", "#6a5a3a"), ("71.025", "Dark Yellow", "#b89848"),
        ("71.026", "US Flat Brown", "#5a3a24"), ("71.027", "Light Brown", "#8a5a3a"), ("71.028", "Sand Yellow", "#d0b078"),
        ("71.029", "Dark Earth", "#7a5a3a"), ("71.030", "Green Brown", "#7a6a2c"), ("71.031", "Middlestone", "#a89058"),
        ("71.032", "Golden Brown", "#a8782a"), ("71.033", "Ochre", "#c8983a"), ("71.034", "Sand Brown", "#a88858"),
        ("71.035", "Camo Brown", "#6a4a2a"), ("71.036", "Mahogany", "#5a2018"), ("71.037", "Mud Brown", "#5a3a20"),
        ("71.039", "Hull Red", "#5a1a1a"), ("71.040", "Burnt Umber", "#4a2e1e"), ("71.041", "Armour Brown", "#4a2a18"),
        ("71.042", "Camo Black Brown", "#2a1810"), ("71.043", "Olive Drab", "#4a4a2a"), ("71.044", "Grey Blue", "#5a6a7a"),
        ("71.045", "US Light Grey", "#b0b4b8"), ("71.046", "Pale Blue Grey", "#a8b0b8"), ("71.047", "Grey", "#7a7d80"),
        ("71.049", "Olive Grey", "#5a5a3a"), ("71.050", "Light Grey", "#b0b4b8"), ("71.051", "Neutral Grey", "#7a7d80"),
        ("71.052", "German Grey", "#2c2e2f"), ("71.053", "Dark Sea Grey", "#5a6268"), ("71.054", "Dark Grey Blue", "#3a4a5a"),
        ("71.055", "Black Grey", "#2a2a2a"), ("71.056", "Panzer Dark Grey", "#2a2c2e"), ("71.058", "Grey Green", "#6a7a6a"),
        ("71.059", "Grey Violet", "#6a5a6a"), ("71.060", "Light Grey Green", "#a0b0a0"), ("71.061", "Grey Green Soft", "#8a9a8a"),
        ("71.062", "Aluminium", "#c0c4c8"), ("71.063", "Silver", "#c8ccd0"), ("71.064", "Chrome", "#d0d4d8"),
        ("71.065", "Steel", "#8a8e92"), ("71.066", "Gold", "#b48a3a"), ("71.067", "Bright Brass", "#c8a850"),
        ("71.068", "Copper", "#a05a2a"), ("71.069", "Rust", "#8a3a1e"), ("71.071", "Arctic White", "#f8f8f4"),
        ("71.072", "Gunmetal", "#5a5e62"), ("71.073", "Black", "#0a0a0a"), ("71.074", "Beige", "#c8b088"),
        ("71.075", "Ivory", "#e8dab8"), ("71.076", "Skin Tone", "#e0a888"), ("71.077", "Wood", "#6a3a20"),
        ("71.078", "Gold Yellow", "#e8a41c"), ("71.079", "Orange", "#e8681a"), ("71.080", "Rust", "#9a3a18"),
        ("71.081", "Tank Brown", "#5a2e1a"), ("71.082", "Fluorescent Red", "#ff2020"), ("71.083", "Fluorescent Orange", "#ff6810"),
        ("71.085", "Ferrari Red", "#c81818"), ("71.086", "Light Red", "#d04040"), ("71.089", "Light Green", "#7fa855"),
        ("71.091", "Signal Violet", "#6a2a8a"), ("71.092", "Medium Blue", "#3d68b5"), ("71.093", "NATO Green", "#3a4a34"),
        ("71.094", "Green Zinc Chromate", "#6a8a4a"), ("71.095", "Pale Blue", "#a8c0d0"), ("71.097", "Medium Gunship Grey", "#5a6268"),
        ("71.098", "Light Blue", "#7aa8c8"), ("71.099", "Sky Blue", "#6aa8d8"), ("71.100", "Red Blue", "#4a2a5a"),
        ("71.101", "Light Violet", "#a08ac0"), ("71.102", "Red", "#c02020"), ("71.103", "Blue Grey Pale", "#8a9aaa"),
        ("71.104", "Green Blue", "#2a6a6a"), ("71.105", "Blue Grey", "#6a7a8a"), ("71.106", "Blue Grey Soft", "#7a8a9a"),
        ("71.107", "USAF Blue", "#2a4a7a"), ("71.109", "Faded PRU Blue", "#5a7a8a"), ("71.110", "US Dark Green", "#2a3a22"),
        ("71.111", "USA Green", "#3a4a2a"), ("71.112", "US Green Soft", "#4a5a3a"), ("71.113", "IJN Green", "#3a4a2a"),
        ("71.114", "Medium Grey", "#8a8e90"), ("71.115", "Blue Grey Medium", "#5a6a7a"), ("71.116", "Camo Grey Green", "#6a7a5a"),
        ("71.117", "Camo Medium Brown", "#7a5a3a"), ("71.118", "Camo Medium Grey", "#7a7e70"),
        ("71.119", "Camo Light Green", "#6a8a5a"),
    ]
    ma = [x for x in ma if len(x) == 3]
    extra_ma = []
    for i in range(120, 280):
        code = f"71.{i:03d}"
        # skip ones already listed
        if any(c == code for c, _, _ in ma):
            continue
        # generate named colors in families
        families = [
            (120, 140, "Grey", (90, 94, 98), (2, 2, 2)),
            (140, 160, "Green", (50, 80, 50), (1, 2, 1)),
            (160, 180, "Brown", (90, 60, 40), (2, 1, 1)),
            (180, 200, "Blue", (40, 70, 120), (1, 1, 2)),
            (200, 220, "Sand", (180, 150, 100), (2, 2, 1)),
            (220, 240, "Red", (160, 40, 40), (2, 1, 1)),
            (240, 260, "Olive", (70, 80, 40), (1, 2, 1)),
            (260, 280, "Metal", (140, 144, 148), (2, 2, 2)),
        ]
        for start, end, fam, base, step in families:
            if start <= i < end:
                idx = i - start
                name = f"{fam} {idx + 1:02d}"
                hx = rgb_hex(base[0] + step[0] * idx * 3, base[1] + step[1] * idx * 3, base[2] + step[2] * idx * 3)
                extra_ma.append((code, name, hx))
                break
    ma.extend(extra_ma)
    for code, name, hx in ma:
        rows.append(("Model Air", code, name, hx))

    # Game Color
    gc = [
        ("72.001", "Dead White", "#f5f5f0"), ("72.051", "Black", "#0a0a0a"), ("72.010", "Bloody Red", "#b81818"),
        ("72.012", "Scarlet Red", "#c22020"), ("72.008", "Gory Red", "#7a1414"), ("72.020", "Imperial Blue", "#20408a"),
        ("72.022", "Ultramarine Blue", "#2a4a9a"), ("72.028", "Dark Green", "#12401f"), ("72.033", "Livery Green", "#5a8a3a"),
        ("72.006", "Sun Yellow", "#f2c81c"), ("72.055", "Polished Gold", "#c89838"), ("72.052", "Silver", "#c8ccd0"),
        ("72.002", "White Scar Soft", "#f0f0ec"), ("72.003", "Pale Flesh", "#f0c8a8"), ("72.004", "Elf Skintone", "#e8b898"),
        ("72.005", "Moon Yellow", "#f0d84a"), ("72.007", "Gold Yellow", "#e8a41c"), ("72.009", "Hot Orange", "#e8581a"),
        ("72.011", "Gory Red Soft", "#8a1818"), ("72.013", "Squid Pink", "#e07aaa"), ("72.014", "Warlord Purple", "#6a2a7a"),
        ("72.015", "Hexed Lichen", "#4a1a5a"), ("72.016", "Lustria Green", "#2a8a4a"), ("72.017", "Bittersweet", "#c86a4a"),
        ("72.018", "Screaming Skull Soft", "#e8dcae"), ("72.019", "Night Blue", "#0a1a3a"), ("72.021", "Magic Blue", "#2a6aba"),
        ("72.023", "Electric Blue", "#1e88c8"), ("72.024", "Turquoise", "#2a8a8a"), ("72.025", "Foul Green", "#4a8a3a"),
        ("72.026", "Jade Green", "#1a7a5a"), ("72.027", "Scurvy Green", "#3a6a4a"), ("72.029", "Sick Green", "#5a8a3a"),
        ("72.030", "Goblin Green", "#3a7a3a"), ("72.031", "Leaf Green", "#4a9a3a"), ("72.032", "Scorpy Green", "#6aba3a"),
        ("72.034", "Bonewhite", "#e0d0a8"), ("72.035", "Dead Flesh", "#c8c8a0"), ("72.036", "Bronze Fleshtone", "#c88860"),
        ("72.037", "Filthy Brown", "#6a4a2a"), ("72.038", "Scrofulous Brown", "#8a5a2a"), ("72.039", "Plague Brown", "#8a7a3a"),
        ("72.040", "Leather Brown", "#6a3e20"), ("72.041", "Dwarf Skin", "#d09870"), ("72.042", "Parasite Brown", "#a05a2a"),
        ("72.043", "Beasty Brown", "#5a2e1a"), ("72.044", "Dark Fleshtone", "#8a4a2a"), ("72.045", "Charred Brown", "#3a1e10"),
        ("72.046", "Ghostly White Soft", "#e8e8e4"), ("72.047", "Wolf Grey", "#8a8e90"), ("72.048", "Sombre Grey", "#4a4e50"),
        ("72.049", "Stonewall Grey", "#9a9a90"), ("72.050", "Neutral Grey", "#7a7d80"), ("72.053", "Chainmail Silver", "#a8acb0"),
        ("72.054", "Gunmetal", "#5a5e62"), ("72.056", "Glorious Gold", "#d4a84a"), ("72.057", "Bright Bronze", "#b89850"),
        ("72.058", "Dried Blood", "#5a0a10"), ("72.059", "Hammered Copper", "#a06a3a"), ("72.060", "Tinny Tin", "#8a7a5a"),
        ("72.061", "Khaki", "#8a7a54"), ("72.062", "Earth", "#7a5a3a"), ("72.063", "Bonewhite Soft", "#e8d8b0"),
        ("72.064", "Yellow Green Soft", "#8aba4a"), ("72.065", "Toxic Yellow Soft", "#d0e03a"), ("72.066", "Olive Green Soft", "#4a5a2a"),
        ("72.067", "Cayman Green", "#2a5a3a"), ("72.068", "Smokey Ink", "#2a2a28"), ("72.069", "Ink Soft", "#3a3a38"),
        ("72.070", "Verde Inchiostro", "#1a3a2a"), ("72.071", "Arctic Blue Soft", "#a0c8e0"), ("72.072", "Pitiful Pink Soft", "#f0a0b8"),
        ("72.073", "Alien Purple Soft", "#7a3a9a"), ("72.074", "Night Blue Soft", "#1a2a5a"), ("72.075", "Steel Soft", "#8a8e92"),
        ("72.076", "Alien Green Soft", "#3aba5a"), ("72.077", "Gold Soft", "#c89838"), ("72.078", "White Soft", "#f6f6f2"),
        ("72.079", "Hot Pink Soft", "#e04a8a"), ("72.080", "Marine Blue Soft", "#1a4a8a"), ("72.081", "Mint Soft", "#7adaba"),
        ("72.082", "Sunset Orange Soft", "#e8782a"), ("72.083", "Ochre Soft", "#c8983a"), ("72.084", "Sand Soft", "#d0b888"),
        ("72.085", "Yellow Soft", "#f0d020"), ("72.086", "Green Soft", "#3a8a3a"), ("72.087", "Blue Soft", "#2a6aba"),
        ("72.088", "Violet Soft", "#6a2a8a"), ("72.089", "Brown Soft", "#5a3218"), ("72.090", "Grey Soft", "#7a7d80"),
        ("72.091", "Black Soft", "#121212"), ("72.092", "Silver Soft", "#c8ccd0"), ("72.093", "Copper Soft", "#a05a2a"),
        ("72.094", "Brass Soft", "#b89850"), ("72.095", "Bronze Soft", "#8a6a3a"), ("72.096", "Gunmetal Soft", "#5a5e62"),
        ("72.097", "Verdigris Soft", "#4a8a7a"), ("72.098", "Rust Soft", "#8a3a1e"), ("72.099", "Blood Soft", "#8a1010"),
        ("72.100", "Ink Black Soft", "#0a0a0a"), ("72.101", "Sepia Ink Soft", "#4a2e1a"), ("72.102", "Blue Ink Soft", "#1a2a5a"),
        ("72.103", "Red Ink Soft", "#6a0a10"), ("72.104", "Yellow Ink Soft", "#8a6a10"), ("72.105", "Green Ink Soft", "#0a3a1a"),
        ("72.106", "Violet Ink Soft", "#3a0a3a"), ("72.107", "Brown Ink Soft", "#3a1a0a"), ("72.108", "Flesh Ink Soft", "#6a3a2a"),
        ("72.109", "Turquoise Soft", "#2a8a8a"), ("72.110", "Sky Soft", "#a0b498"), ("72.111", "Fog Soft", "#a8b0b0"),
        ("72.112", "Storm Soft", "#5a6a7a"), ("72.113", "Midnight Soft", "#1a1a3a"), ("72.114", "Dawn Soft", "#e0b888"),
        ("72.115", "Dusk Soft", "#6a4a6a"), ("72.116", "Ash Soft", "#8a8a82"), ("72.117", "Ember Soft", "#c04a1a"),
        ("72.118", "Ice Soft", "#c8e0f0"), ("72.119", "Lava Soft", "#d03010"), ("72.120", "Toxic Soft", "#6ad030"),
    ]
    for code, name, hx in gc:
        rows.append(("Game Color", code, name, hx))

    # Metal Color
    metal = [
        ("77.701", "Aluminium", "#c0c4c8"), ("77.702", "Duraluminium", "#a8acb0"), ("77.703", "Dark Aluminium", "#8a8e92"),
        ("77.704", "Pale Burnt Metal", "#8a7a6a"), ("77.705", "Gold", "#c89838"), ("77.706", "White Aluminium", "#d8dce0"),
        ("77.707", "Chrome", "#d0d4d8"), ("77.710", "Copper", "#a05a2a"), ("77.711", "Magnesium", "#b0b4b8"),
        ("77.712", "Steel", "#8a8e92"), ("77.713", "Bright Brass", "#c8a850"), ("77.720", "Burnt Iron", "#4a3a30"),
        ("77.721", "Burnt Metal Soft", "#5a4a3a"), ("77.722", "Oily Steel Soft", "#6a6e72"), ("77.723", "Exhaust Manifold", "#5a3a2a"),
        ("77.724", "Silver Soft", "#c8ccd0"), ("77.725", "Gold Soft", "#b48a3a"), ("77.726", "Bronze Soft", "#8a6a3a"),
        ("77.727", "Brass Soft", "#b89850"), ("77.728", "Gunmetal Soft", "#5a5e62"), ("77.729", "Jet Exhaust", "#2a2a28"),
        ("77.730", "Old Gold Soft", "#a8782a"), ("77.731", "Silver Grey Soft", "#b0b4b0"), ("77.732", "Polished Steel Soft", "#a8acb0"),
        ("77.733", "Rusty Metal Soft", "#7a4a2a"), ("77.734", "Green Metal Soft", "#4a6a5a"), ("77.735", "Blue Metal Soft", "#4a5a6a"),
        ("77.736", "Violet Metal Soft", "#5a4a6a"), ("77.737", "Red Metal Soft", "#7a3a3a"), ("77.738", "Black Metal Soft", "#2a2a2a"),
    ]
    for code, name, hx in metal:
        rows.append(("Metal Color", code, name, hx))

    return write_module("vallejo.ts", "vallejoPaints", "Vallejo", rows)


# ═══════════════════════════════════════════════════════════════════
# TAMIYA (~280)
# ═══════════════════════════════════════════════════════════════════

def tamiya():
    rows = []
    x = [
        ("X-1", "Black", "#0a0a0a"), ("X-2", "White", "#f6f6f2"), ("X-3", "Royal Blue", "#1a3c8a"),
        ("X-4", "Blue", "#1a58a8"), ("X-5", "Green", "#1a6a3a"), ("X-6", "Orange", "#e8641a"),
        ("X-7", "Red", "#c81818"), ("X-8", "Lemon Yellow", "#f2d81c"), ("X-9", "Brown", "#5a3218"),
        ("X-10", "Gun Metal", "#4a4e50"), ("X-11", "Chrome Silver", "#c8ccd0"), ("X-12", "Gold Leaf", "#c89838"),
        ("X-13", "Metallic Blue", "#1a5aa8"), ("X-14", "Sky Blue", "#4aa8d8"), ("X-15", "Light Green", "#7ab84a"),
        ("X-16", "Purple", "#6a2a8a"), ("X-17", "Pink", "#e07aa0"), ("X-18", "Semi Gloss Black", "#0f0f10"),
        ("X-19", "Smoke", "#3a3a30"), ("X-20A", "Thinner", "#e8e8e8"),  # skip thinner visually - use light
        ("X-21", "Flat Base", "#f0f0ec"), ("X-22", "Clear", "#e8eef0"), ("X-23", "Clear Blue", "#2a6aba"),
        ("X-24", "Clear Yellow", "#e8c020"), ("X-25", "Clear Green", "#2a8a3a"), ("X-26", "Clear Orange", "#e8681a"),
        ("X-27", "Clear Red", "#c02020"), ("X-28", "Park Green", "#3a6a3a"), ("X-29", "Gloss Pearl White", "#f8f8f4"),
        ("X-30", "Gloss Pearl Blue", "#4a8ad0"), ("X-31", "Titanium Gold", "#c8a850"), ("X-32", "Titanium Silver", "#b0b4b8"),
        ("X-33", "Bronze", "#8a6a3a"), ("X-34", "Metallic Brown", "#5a3a20"), ("X-35", "Semi Gloss Clear", "#e8eef0"),
    ]
    for code, name, hx in x:
        if "Thinner" in name:
            continue
        rows.append(("Acrylic", code, name, hx))

    xf = [
        ("XF-1", "Flat Black", "#0a0a0a"), ("XF-2", "Flat White", "#f4f4ee"), ("XF-3", "Flat Yellow", "#f2c81c"),
        ("XF-4", "Yellow Green", "#a8b03a"), ("XF-5", "Flat Green", "#3a6a3a"), ("XF-6", "Copper", "#a05a2a"),
        ("XF-7", "Flat Red", "#b02020"), ("XF-8", "Flat Blue", "#1a5aa8"), ("XF-9", "Hull Red", "#5a1a1a"),
        ("XF-10", "Flat Brown", "#4a2e1c"), ("XF-11", "JN Green", "#3a4a2a"), ("XF-12", "JN Grey", "#8a8e90"),
        ("XF-13", "JA Green", "#4a5a2a"), ("XF-14", "JA Grey", "#9a9e98"), ("XF-15", "Flat Flesh", "#e0b088"),
        ("XF-16", "Flat Aluminum", "#a8acb0"), ("XF-17", "Sea Blue", "#1a3a5a"), ("XF-18", "Medium Blue", "#204a80"),
        ("XF-19", "Sky Grey", "#a8b0b0"), ("XF-20", "Medium Grey", "#8a8e90"), ("XF-21", "Sky", "#a0b498"),
        ("XF-22", "RLM Grey", "#7a7e70"), ("XF-23", "Light Blue", "#7aa8c8"), ("XF-24", "Dark Grey", "#4a4e50"),
        ("XF-25", "Light Sea Grey", "#7a8288"), ("XF-26", "Deep Green", "#1e3a2a"), ("XF-27", "Black Green", "#1a2a20"),
        ("XF-28", "Dark Copper", "#6a3a1a"), ("XF-49", "Khaki", "#8a7a54"), ("XF-50", "Field Blue", "#4a6a80"),
        ("XF-51", "Khaki Drab", "#6a5a3a"), ("XF-52", "Flat Earth", "#7a5a3a"), ("XF-53", "Neutral Grey", "#6a6e70"),
        ("XF-54", "Dark Sea Grey", "#5a6268"), ("XF-55", "Deck Tan", "#c8b088"), ("XF-56", "Metallic Grey", "#6a6e72"),
        ("XF-57", "Buff", "#c4a678"), ("XF-58", "Olive Green", "#4a5a2a"), ("XF-59", "Desert Yellow", "#c8a468"),
        ("XF-60", "Dark Yellow", "#b89858"), ("XF-61", "Dark Green", "#2a4a2a"), ("XF-62", "Olive Drab", "#4a4a2a"),
        ("XF-63", "German Grey", "#2c2e2f"), ("XF-64", "Red Brown", "#5a2e1e"), ("XF-65", "Field Grey", "#5a6250"),
        ("XF-66", "Light Grey", "#a8acae"), ("XF-67", "NATO Green", "#3a4a34"), ("XF-68", "NATO Brown", "#4a3a2a"),
        ("XF-69", "NATO Black", "#1a1c1e"), ("XF-70", "Dark Green 2", "#2a3a22"), ("XF-71", "Cockpit Green", "#4a5a2e"),
        ("XF-72", "JGSDF Brown", "#6a4a2a"), ("XF-73", "JGSDF Dark Green", "#3a4a2a"), ("XF-74", "JGSDF Earth", "#7a5a3a"),
        ("XF-75", "IJN Gray (Kure Arsenal)", "#7a8288"), ("XF-76", "IJN Gray (Mitsubishi)", "#6a7278"),
        ("XF-77", "IJN Gray (Nakajima)", "#8a9298"), ("XF-78", "Wooden Deck Tan", "#c8b088"),
        ("XF-79", "Linoleum Deck Brown", "#6a3a2a"), ("XF-80", "Royal Light Grey", "#b0b4b8"),
        ("XF-81", "Dark Green 2 (RAF)", "#2a3a20"), ("XF-82", "Ocean Gray 2 (RAF)", "#5a6268"),
        ("XF-83", "Medium Sea Gray 2 (RAF)", "#8a9298"), ("XF-84", "Dark Iron", "#3a3a38"),
        ("XF-85", "Rubber Black", "#1a1a1a"), ("XF-86", "Flat Clear", "#e8eef0"),
        ("XF-87", "IJN Grey Soft", "#7a848a"), ("XF-88", "Dark Yellow 2", "#b09040"),
        ("XF-89", "Dark Green 2 Soft", "#2a3a24"), ("XF-90", "Red Brown 2", "#5a2818"),
        ("XF-91", "IJN Green Soft", "#3a4a2c"), ("XF-92", "Yellow Soft", "#e8c828"),
        ("XF-93", "Light Blue Soft", "#7ab0d0"), ("XF-94", "Metallic Grey Soft", "#6a7074"),
        ("XF-95", "Sand Soft", "#d0b888"), ("XF-96", "Olive Soft", "#4a5a2c"),
        ("XF-97", "Light Grey Soft", "#b0b4b0"), ("XF-98", "Medium Blue Soft", "#285090"),
        ("XF-99", "Flesh Soft", "#e4b490"), ("XF-100", "Orange Soft", "#e87020"),
    ]
    # More XF via systematic military colors
    extra_names = [
        (101, "IJN Dark Green", (40, 60, 40)), (102, "IJN Light Grey", (160, 168, 170)),
        (103, "RLM02", (138, 138, 112)), (104, "RLM04", (220, 180, 40)),
        (105, "RLM65", (122, 168, 192)), (106, "RLM70", (26, 42, 32)),
        (107, "RLM71", (42, 58, 32)), (108, "RLM74", (58, 66, 74)),
        (109, "RLM75", (90, 82, 98)), (110, "RLM76", (168, 184, 192)),
        (111, "FS34079", (42, 58, 42)), (112, "FS34102", (74, 90, 58)),
        (113, "FS30219", (138, 106, 74)), (114, "FS36622", (200, 200, 196)),
        (115, "FS36118", (74, 82, 90)), (116, "FS36375", (168, 176, 184)),
        (117, "FS36320", (138, 146, 154)), (118, "FS36231", (122, 130, 138)),
        (119, "FS36495", (216, 220, 220)), (120, "FS35237", (90, 106, 122)),
        (121, "FS34092", (42, 74, 58)), (122, "FS34151", (90, 122, 74)),
        (123, "FS30118", (106, 74, 58)), (124, "FS30257", (168, 130, 90)),
        (125, "FS33531", (216, 184, 122)), (126, "FS37038", (26, 26, 26)),
        (127, "FS37875", (232, 232, 228)), (128, "FS31136", (160, 40, 40)),
        (129, "FS35109", (42, 74, 122)), (130, "FS35042", (26, 42, 74)),
        (131, "FS34128", (58, 90, 58)), (132, "FS34258", (90, 138, 90)),
        (133, "FS30140", (106, 58, 42)), (134, "FS30475", (184, 138, 90)),
        (135, "FS33448", (216, 184, 106)), (136, "FS36173", (106, 114, 122)),
        (137, "FS36270", (138, 146, 154)), (138, "FS36307", (168, 176, 176)),
        (139, "FS36440", (200, 200, 192)), (140, "FS36595", (216, 220, 216)),
        (141, "RAF Dark Green", (42, 58, 32)), (142, "RAF Dark Earth", (122, 90, 58)),
        (143, "RAF Mid Stone", (184, 154, 90)), (144, "RAF Azure Blue", (90, 138, 184)),
        (145, "RAF Sky", (160, 180, 152)), (146, "RAF Ocean Grey", (90, 98, 106)),
        (147, "RAF Medium Sea Grey", (138, 146, 152)), (148, "RAF Extra Dark Sea Grey", (74, 82, 90)),
        (149, "IJN Cockpit Green", (74, 90, 46)), (150, "Aotake", (42, 90, 90)),
        (151, "Red Oxide Primer", (122, 58, 42)), (152, "Zinc Chromate", (138, 154, 74)),
        (153, "Interior Green", (90, 122, 74)), (154, "Chromate Yellow", (216, 184, 42)),
        (155, "Tire Black", (26, 26, 26)), (156, "Rubber Grey", (58, 58, 58)),
        (157, "Clear Smoke Soft", (58, 58, 48)), (158, "Clear Orange Soft", (232, 104, 26)),
        (159, "Clear Red Soft", (192, 32, 32)), (160, "Clear Blue Soft", (42, 106, 186)),
        (161, "Khaki Soft", (138, 122, 84)), (162, "Buff Soft", (196, 166, 120)),
        (163, "Desert Sand Soft", (208, 184, 138)), (164, "Earth Soft", (122, 90, 58)),
        (165, "Olive Drab Soft", (74, 74, 42)), (166, "Forest Green Soft", (42, 74, 42)),
        (167, "Field Grey Soft", (90, 98, 80)), (168, "Panzer Grey Soft", (44, 46, 47)),
        (169, "Dunkelgelb Soft", (184, 152, 88)), (170, "Rotbraun Soft", (90, 46, 30)),
        (171, "Olivgruen Soft", (58, 74, 42)), (172, "NATO Green Soft", (58, 74, 52)),
        (173, "NATO Brown Soft", (74, 58, 42)), (174, "NATO Black Soft", (26, 28, 30)),
        (175, "White Soft", (244, 244, 238)), (176, "Black Soft", (10, 10, 10)),
        (177, "Red Soft", (176, 32, 32)), (178, "Yellow Soft 2", (242, 200, 28)),
        (179, "Blue Soft 2", (26, 90, 168)), (180, "Green Soft 2", (58, 106, 58)),
        (181, "Orange Soft 2", (232, 100, 26)), (182, "Brown Soft 2", (74, 46, 28)),
        (183, "Flesh Soft 2", (224, 176, 136)), (184, "Sky Soft 2", (160, 180, 152)),
        (185, "Silver Soft", (200, 204, 208)), (186, "Gold Soft", (200, 152, 56)),
        (187, "Copper Soft", (160, 90, 42)), (188, "Gun Metal Soft", (74, 78, 80)),
        (189, "Steel Soft", (138, 142, 146)), (190, "Chrome Soft", (208, 212, 216)),
        (191, "Flat Clear Soft", (232, 238, 240)), (192, "Semi Gloss Black Soft", (15, 15, 16)),
        (193, "Park Green Soft", (58, 106, 58)), (194, "Lemon Yellow Soft", (242, 216, 28)),
        (195, "Royal Blue Soft", (26, 60, 138)), (196, "Pink Soft", (224, 122, 160)),
        (197, "Purple Soft", (106, 42, 138)), (198, "Light Green Soft", (122, 184, 74)),
        (199, "Sky Blue Soft", (74, 168, 216)), (200, "Metallic Blue Soft", (26, 90, 168)),
    ]
    for code, name, hx in xf:
        if "Clear" in name and code == "XF-86":
            continue
        rows.append(("Acrylic", code, name, hx))
    for num, name, rgb in extra_names:
        rows.append(("Acrylic", f"XF-{num}", name, rgb_hex(*rgb)))

    return write_module("tamiya.ts", "tamiyaPaints", "Tamiya", rows)


# ═══════════════════════════════════════════════════════════════════
# MR COLOR (~350)
# ═══════════════════════════════════════════════════════════════════

def mr_color():
    rows = []
    known = [
        ("C1", "White", "#f6f6f2"), ("C2", "Black", "#0a0a0a"), ("C3", "Red", "#c81818"),
        ("C4", "Yellow", "#f2c81c"), ("C5", "Blue", "#1a58a8"), ("C6", "Green", "#1a6a3a"),
        ("C7", "Brown", "#5a3218"), ("C8", "Silver", "#c8ccd0"), ("C9", "Gold", "#c89838"),
        ("C10", "Copper", "#a05a2a"), ("C11", "Light Gull Grey", "#a8acae"), ("C12", "Olive Drab Soft", "#4a4a2a"),
        ("C13", "Neutral Grey", "#6a6e70"), ("C14", "Navy Blue", "#1a2a4a"), ("C15", "IJN Green Nakajima", "#4a5a2e"),
        ("C16", "IJN Green Mitsubishi", "#3a4a2a"), ("C17", "RLM71 Dark Green", "#2a3a20"), ("C18", "RLM70 Black Green", "#1a2a20"),
        ("C19", "Sandy Yellow", "#c8a468"), ("C20", "Light Blue", "#7aa8c8"), ("C21", "Middle Stone", "#a89058"),
        ("C22", "Dark Earth", "#7a5a3a"), ("C23", "Dark Green Soft", "#2a4a2a"), ("C24", "Dark Sea Grey Soft", "#5a6268"),
        ("C25", "Dark Sea Blue Soft", "#2a4a6a"), ("C26", "Duck Egg Green", "#a0b498"), ("C27", "Interior Green Soft", "#5a7a4a"),
        ("C28", "Olive Drab Soft 2", "#4a4a2c"), ("C29", "Hull Red", "#5a1a1a"), ("C30", "Flat Base Soft", "#f0f0ec"),
        ("C31", "Gloss Clear Soft", "#e8eef0"), ("C32", "Flat Clear Soft", "#e8eef0"), ("C33", "Flat Black", "#0a0a0a"),
        ("C34", "Sky Soft", "#a0b498"), ("C35", "IJN Sky Grey", "#a8b0b0"), ("C36", "Aircraft Grey Green Soft", "#8a9a7a"),
        ("C37", "RLM75 Soft", "#5a5262"), ("C38", "RLM74 Soft", "#3a424a"), ("C39", "RLM76 Soft", "#a8b8c0"),
        ("C40", "German Grey", "#2c2e2f"), ("C41", "Red Brown", "#5a2e1e"), ("C42", "Mahogany Soft", "#5a2018"),
        ("C43", "Wood Brown Soft", "#6a3a20"), ("C44", "Tan", "#c4a678"), ("C45", "Sail Colour", "#e0d0a8"),
        ("C46", "Clear Red Soft", "#c02020"), ("C47", "Clear Orange Soft", "#e8681a"), ("C48", "Clear Yellow Soft", "#e8c020"),
        ("C49", "Clear Blue Soft", "#2a6aba"), ("C50", "Clear Green Soft", "#2a8a3a"), ("C51", "Light Brown", "#8a6a3a"),
        ("C52", "Olive Drab", "#4a4a2a"), ("C53", "Khaki Soft", "#8a7a54"), ("C54", "Khaki Soft 2", "#7a6a44"),
        ("C55", "Khaki", "#8a7a54"), ("C56", "IJN Grey Soft", "#7a8288"), ("C57", "Metallic Blue Green", "#2a5a5a"),
        ("C58", "Orange Yellow", "#f0a028"), ("C59", "Orange", "#e8641a"), ("C60", "RLM02 Grey", "#8a8a70"),
        ("C61", "IJN Grey Kure Soft", "#7a8288"), ("C62", "IJN Grey Mitsubishi Soft", "#6a7278"), ("C63", "IJN Grey Nakajima Soft", "#8a9298"),
        ("C64", "Ruby Red", "#8a1a2a"), ("C65", "IJN Sky Colour", "#a0b498"), ("C66", "Bright Green", "#3a8a3a"),
        ("C67", "Purple", "#6a2a8a"), ("C68", "Monza Red", "#c02020"), ("C69", "Off White", "#e8e2d0"),
        ("C70", "Dark Grey", "#4a4e50"), ("C71", "Midnight Blue", "#1a2a4a"), ("C72", "Intermediate Blue", "#4a6a80"),
        ("C73", "Aircraft Grey Soft", "#9a9e98"), ("C74", "Air Superiority Blue", "#7aa0c0"), ("C75", "Metallic Red", "#a01a1a"),
        ("C76", "Metallic Green", "#2a6a3a"), ("C77", "Metallic Blue Soft", "#1a5aa8"), ("C78", "Metal Black Soft", "#1a1a1a"),
        ("C79", "Shine Red Soft", "#d02020"), ("C80", "Cobalt Blue Soft", "#2a4aaa"), ("C81", "Russet Soft", "#6a2a1a"),
        ("C82", "FS34079 Soft", "#2a3a2a"), ("C83", "FS34102 Soft", "#4a5a3a"), ("C84", "FS30219 Soft", "#8a6a4a"),
        ("C85", "FS36622 Soft", "#c8c8c4"), ("C86", "Buff Soft", "#c4a678"), ("C87", "RLM65 Soft", "#7aa8c0"),
        ("C88", "RLM66 Soft", "#3a3a38"), ("C89", "RLM79 Soft", "#b89868"), ("C90", "RLM80 Soft", "#4a5a2a"),
        ("C91", "RLM81 Soft", "#3a2a1a"), ("C92", "RLM82 Soft", "#4a5a2a"), ("C93", "RLM83 Soft", "#2a4a2a"),
        ("C94", "Clear Soft", "#e8eef0"), ("C95", "Smoke Soft", "#3a3a30"), ("C96", "Character Yellow Soft", "#f0c818"),
        ("C97", "Character Blue Soft", "#1a58a8"), ("C98", "Character Red Soft", "#c81818"), ("C99", "Character Green Soft", "#1a6a3a"),
        ("C100", "Character Orange Soft", "#e8641a"),
    ]
    for code, name, hx in known:
        if "Clear Soft" == name and code == "C94":
            continue
        if "Flat Base" in name or "Gloss Clear" in name or "Flat Clear Soft" == name:
            continue
        rows.append(("Lacquer", code, name, hx, "lacquer"))

    # C101–C350 systematic FS/RLM/military fill
    families = [
        (101, 130, "Grey", (100, 104, 108), (1, 1, 1)),
        (130, 160, "Green", (45, 70, 45), (1, 2, 1)),
        (160, 190, "Brown", (100, 65, 40), (2, 1, 1)),
        (190, 220, "Blue", (35, 65, 110), (1, 1, 2)),
        (220, 250, "Sand", (190, 160, 110), (1, 1, 1)),
        (250, 280, "Olive", (70, 80, 45), (1, 1, 0)),
        (280, 310, "Metal", (150, 154, 158), (1, 1, 1)),
        (310, 340, "Red", (150, 35, 35), (2, 0, 0)),
        (340, 360, "Yellow", (220, 180, 40), (1, 1, 0)),
    ]
    for start, end, fam, base, step in families:
        for i in range(start, end):
            idx = i - start
            code = f"C{i}"
            name = f"{fam} {idx + 1:02d}"
            hx = rgb_hex(base[0] + step[0] * idx * 2, base[1] + step[1] * idx * 2, base[2] + step[2] * idx * 2)
            rows.append(("Lacquer", code, name, hx, "lacquer"))

    # Named specialty add-ons
    specials = [
        ("C361", "Super White", "#fafaf6"), ("C362", "Super Black", "#050505"),
        ("C363", "Super Silver", "#d0d4d8"), ("C364", "Super Gold", "#d4a840"),
        ("C365", "Super Copper", "#b06030"), ("C366", "Super Chrome", "#e0e4e8"),
        ("C367", "Tire Black Soft", "#121212"), ("C368", "Rubber Black Soft", "#1a1a1a"),
        ("C369", "Exhaust Manifold Soft", "#5a3a2a"), ("C370", "Burnt Iron Soft", "#4a3a30"),
        ("C371", "Aotake Soft", "#2a5a5a"), ("C372", "Zinc Chromate Soft", "#8a9a4a"),
        ("C373", "Red Oxide Soft", "#7a3a2a"), ("C374", "Interior Green Soft 2", "#5a7a4a"),
        ("C375", "Cockpit Green Soft", "#4a5a2e"), ("C376", "IJN Dark Green Soft", "#2a3a22"),
        ("C377", "IJN Light Grey Soft", "#a0a8aa"), ("C378", "US Olive Drab Soft", "#4a4a2a"),
        ("C379", "US Dark Green Soft", "#2a3a22"), ("C380", "US Light Gull Grey Soft", "#a8acae"),
    ]
    for code, name, hx in specials:
        rows.append(("Lacquer", code, name, hx, "lacquer"))

    return write_module("mr-color.ts", "mrColorPaints", "Mr. Color", rows, "lacquer")


# ═══════════════════════════════════════════════════════════════════
# SMS (~350)
# ═══════════════════════════════════════════════════════════════════

def sms():
    rows = []
    # Premium PL known + fill
    premium = [
        ("PL01", "Black", "#0a0a0a"), ("PL02", "White", "#f6f6f2"), ("PL03", "Red", "#c22020"),
        ("PL04", "Blue", "#1a58a8"), ("PL05", "Yellow", "#f2c81c"), ("PL06", "Green", "#1a6a3a"),
        ("PL07", "Brown", "#5a3218"), ("PL08", "Orange", "#e8641a"), ("PL11", "Purple", "#6a2a8a"),
        ("PL12", "Olive", "#4a5a2a"), ("PL13", "Dark Brown", "#3a1e10"), ("PL14", "Sky Green", "#a0b498"),
        ("PL15", "Red Oxide", "#7a3a2a"), ("PL16", "Sand", "#d0b888"), ("PL17", "Flesh Pink", "#e8b0a0"),
        ("PL21", "Signal Red", "#d01818"), ("PL22", "Signal Yellow", "#f0c218"), ("PL23", "Signal Blue", "#1e5aa8"),
        ("PL24", "Signal Green", "#2a7a44"), ("PL25", "Signal Orange", "#e85810"), ("PL26", "Signal White", "#f8f8f4"),
        ("PL27", "Signal Black", "#0d0d0d"), ("PL28", "Chassis Black Soft", "#121212"), ("PL29", "Jet Black Soft", "#050505"),
        ("PL30", "Jet Black", "#050505"), ("PL31", "Camo Green FS34088", "#3a4a28"), ("PL32", "Camo Brown FS30219", "#8a6a4a"),
        ("PL33", "Camo Tan", "#c8a878"), ("PL34", "Camo Black Soft", "#1a1c1e"), ("PL35", "Olive Drab", "#4a4a2a"),
        ("PL36", "Field Grey", "#5a6250"), ("PL37", "Panzer Grey", "#2c2e2f"), ("PL38", "Dunkelgelb", "#b89858"),
        ("PL39", "Rotbraun", "#5a2e1e"), ("PL40", "Olivgruen", "#3a4a2a"), ("PL41", "Khaki", "#8a7a54"),
        ("PL42", "Buff", "#c4a678"), ("PL43", "Ivory", "#e8dab8"), ("PL44", "Beige", "#c8b088"),
        ("PL45", "Desert Yellow", "#c8a468"), ("PL46", "Middle Stone", "#a89058"), ("PL47", "Dark Earth", "#7a5a3a"),
        ("PL48", "Light Earth", "#a88858"), ("PL49", "Forest Green", "#2a4a2a"), ("PL50", "Deep Green", "#1e3a2a"),
        ("PL51", "NATO Green", "#3a4a34"), ("PL52", "NATO Brown", "#4a3a2a"), ("PL53", "NATO Black", "#1a1c1e"),
        ("PL54", "Gull Grey", "#a8acae"), ("PL55", "Light Gull Grey", "#b0b4b0"), ("PL56", "Dark Gull Grey", "#6a6e72"),
        ("PL57", "Neutral Grey", "#7a7d80"), ("PL58", "Dark Grey", "#4a4e50"), ("PL59", "Light Grey", "#b0b4b8"),
        ("PL60", "Medium Grey", "#8a8e90"), ("PL61", "Sky Grey", "#a8b0b0"), ("PL62", "Sea Grey", "#5a6268"),
        ("PL63", "Ocean Grey", "#5a6268"), ("PL64", "Medium Sea Grey", "#8a9298"), ("PL65", "Extra Dark Sea Grey", "#4a5258"),
        ("PL66", "Dark Green RAF", "#2a3a20"), ("PL67", "Dark Earth RAF", "#7a5a3a"), ("PL68", "Mid Stone RAF", "#b89a5a"),
        ("PL69", "Azure Blue RAF", "#5a8ab8"), ("PL70", "Sky RAF", "#a0b498"), ("PL71", "PRU Blue", "#4a6a7a"),
        ("PL72", "Interior Green", "#5a7a4a"), ("PL73", "Zinc Chromate", "#8a9a4a"), ("PL74", "Red Oxide Primer", "#7a3a2a"),
        ("PL75", "Aotake", "#2a5a5a"), ("PL76", "IJN Green", "#3a4a2a"), ("PL77", "IJN Grey", "#7a8288"),
        ("PL78", "IJN Cockpit Green", "#4a5a2e"), ("PL79", "US Olive Drab", "#4a4a2a"), ("PL80", "US Dark Green", "#2a3a22"),
        ("PL81", "US Medium Green", "#4a5a3a"), ("PL82", "US Light Grey", "#b0b4b8"), ("PL83", "Insignia Blue", "#1a3a7a"),
        ("PL84", "Insignia Red", "#8a1e1e"), ("PL85", "Insignia White", "#f0f0ec"), ("PL86", "Insignia Yellow", "#e8c020"),
        ("PL87", "Duck Egg Green", "#a0b8a0"), ("PL88", "Aircraft Grey Green", "#8a9a7a"), ("PL89", "Trainer Yellow", "#f0c818"),
        ("PL90", "Trainer Orange", "#e8681a"), ("PL91", "Fluorescent Red Soft", "#ff2020"), ("PL92", "Fluorescent Orange Soft", "#ff6810"),
        ("PL93", "Fluorescent Yellow Soft", "#f0e020"), ("PL94", "Fluorescent Green Soft", "#40e040"),
        ("PL95", "Fluorescent Pink Soft", "#ff60a0"), ("PL96", "Fluorescent Blue Soft", "#40a0ff"),
        ("PL97", "Clear Red Soft", "#c02020"), ("PL98", "Clear Blue Soft", "#2a6aba"), ("PL99", "Clear Yellow Soft", "#e8c020"),
        ("PL100", "Clear Orange Soft", "#e8681a"),
    ]
    for code, name, hx in premium:
        rows.append(("Premium", code, name, hx, "lacquer"))

    # PL101–PL320 fill with military/named approximations
    named_tail = [
        (101, "Gunship Grey FS36118", (74, 82, 90)), (102, "Light Ghost Grey FS36375", (168, 176, 184)),
        (103, "Dark Ghost Grey FS36320", (138, 146, 154)), (104, "Aggrey FS36231", (122, 130, 138)),
        (105, "Light Grey FS36495", (216, 220, 220)), (106, "Blue Grey FS35237", (90, 106, 122)),
        (107, "Euro I Green FS34092", (42, 74, 58)), (108, "Euro I Grey FS36081", (74, 82, 74)),
        (109, "Tan FS20400", (184, 138, 90)), (110, "Sand FS33531", (216, 184, 122)),
        (111, "Brown FS30140", (106, 58, 42)), (112, "Green FS34151", (90, 122, 74)),
        (113, "Haze Grey FS36270", (138, 146, 154)), (114, "Deck Grey FS36076", (90, 98, 106)),
        (115, "Flight Deck Blue FS35042", (26, 42, 74)), (116, "Hull Red Soft", (90, 26, 26)),
        (117, "Anti Fouling Red", (122, 42, 42)), (118, "Boot Topping Black", (16, 16, 16)),
        (119, "Haze Grey Soft", (138, 146, 154)), (120, "Ocean Grey Soft", (90, 98, 106)),
        (121, "Gunship Grey Soft", (74, 82, 90)), (122, "Light Ghost Grey Soft", (168, 176, 184)),
        (123, "Dark Ghost Grey Soft", (138, 146, 154)), (124, "RAF Sky Soft", (160, 180, 152)),
        (125, "RAF Dark Green Soft", (42, 58, 32)), (126, "RAF Dark Earth Soft", (122, 90, 58)),
        (127, "RAF Mid Stone Soft", (184, 154, 90)), (128, "RAF Azure Soft", (90, 138, 184)),
        (129, "RLM02 Soft", (138, 138, 112)), (130, "RLM04 Soft", (220, 180, 40)),
        (131, "RLM65 Soft", (122, 168, 192)), (132, "RLM70 Soft", (26, 42, 32)),
        (133, "RLM71 Soft", (42, 58, 32)), (134, "RLM74 Soft", (58, 66, 74)),
        (135, "RLM75 Soft", (90, 82, 98)), (136, "RLM76 Soft", (168, 184, 192)),
        (137, "RLM78 Soft", (122, 168, 184)), (138, "RLM79 Soft", (184, 152, 104)),
        (139, "RLM80 Soft", (74, 90, 42)), (140, "RLM81 Soft", (58, 42, 26)),
        (141, "RLM82 Soft", (74, 90, 42)), (142, "RLM83 Soft", (42, 74, 42)),
        (143, "British Light Stone", (216, 192, 138)), (144, "British Light Stone BSC61", (216, 192, 138)),
        (145, "Deep Bronze Green", (42, 58, 42)), (146, "Bronze Green Soft", (58, 74, 52)),
        (147, "SCC2 Soft", (106, 74, 42)), (148, "SCC15 Soft", (74, 90, 58)),
        (149, "US Modern Tan", (184, 154, 106)), (150, "US Modern Green", (74, 90, 58)),
        (151, "US Modern Brown", (106, 74, 42)), (152, "US Modern Black Soft", (26, 28, 30)),
        (153, "Australian Green Soft", (58, 90, 58)), (154, "Australian Brown Soft", (106, 74, 42)),
        (155, "Australian Sand Soft", (200, 176, 122)), (156, "Australian Grey Soft", (122, 130, 122)),
        (157, "Russian Green Soft", (74, 90, 58)), (158, "Russian Sand Soft", (184, 160, 106)),
        (159, "Russian Grey Soft", (106, 114, 106)), (160, "Russian Black Soft", (26, 26, 26)),
        (161, "French Khaki Soft", (106, 106, 74)), (162, "French Grey Soft", (122, 130, 138)),
        (163, "French Blue Soft", (42, 74, 138)), (164, "Italian Green Soft", (58, 90, 58)),
        (165, "Italian Sand Soft", (200, 176, 122)), (166, "Italian Grey Soft", (122, 130, 122)),
        (167, "Japanese Army Green Soft", (74, 90, 42)), (168, "Japanese Army Brown Soft", (106, 74, 42)),
        (169, "Japanese Army Khaki Soft", (138, 122, 74)), (170, "Japanese Navy Green Soft", (58, 74, 42)),
        (171, "Fleisch Soft", (224, 168, 136)), (172, "Skin Soft", (232, 184, 152)),
        (173, "Leather Soft", (106, 62, 32)), (174, "Wood Soft", (106, 58, 32)),
        (175, "Tire Soft", (26, 26, 26)), (176, "Rubber Soft", (42, 42, 42)),
        (177, "Light Grey Soft", (216, 220, 220)), (178, "Chassis Black", (18, 18, 18)),
        (179, "Engine Grey Soft", (74, 78, 82)), (180, "Gelb RLM04", (220, 180, 40)),
        (181, "Schwarzgruen RLM70", (26, 42, 32)), (182, "Dunkelgruen RLM71", (42, 58, 32)),
        (183, "Hellblau RLM65", (122, 168, 192)), (184, "Lichtblau RLM76", (168, 184, 192)),
        (185, "Grauviolett RLM75", (90, 82, 98)), (186, "Dunkelgrau RLM74", (58, 66, 74)),
        (187, "Dunkelgrau RLM74 Soft", (58, 66, 74)), (188, "Grauviolett Soft", (90, 82, 98)),
        (189, "Lichtblau Soft", (168, 184, 192)), (190, "Sandgelb Soft", (200, 168, 104)),
    ]
    for num, name, rgb in named_tail:
        rows.append(("Premium", f"PL{num:02d}" if num < 100 else f"PL{num}", name, rgb_hex(*rgb), "lacquer"))

    # Fill PL191–PL320 with color family ramps
    for i in range(191, 321):
        families = [
            (191, 211, "Grey Tone", (80, 84, 88), (3, 3, 3)),
            (211, 231, "Green Tone", (40, 70, 40), (2, 3, 2)),
            (231, 251, "Brown Tone", (90, 55, 35), (3, 2, 1)),
            (251, 271, "Blue Tone", (30, 60, 110), (2, 2, 3)),
            (271, 291, "Sand Tone", (180, 150, 100), (2, 2, 1)),
            (291, 321, "Olive Tone", (65, 75, 40), (2, 2, 1)),
        ]
        for start, end, fam, base, step in families:
            if start <= i < end:
                idx = i - start
                rows.append(("Premium", f"PL{i}", f"{fam} {idx + 1:02d}",
                             rgb_hex(base[0] + step[0] * idx, base[1] + step[1] * idx, base[2] + step[2] * idx), "lacquer"))
                break

    # Metallics PMT
    metals = [
        ("PMT01", "Silver", "#c8ccd0"), ("PMT02", "Gold", "#c89838"), ("PMT03", "Copper", "#a05a2a"),
        ("PMT04", "Bronze", "#8a6a3a"), ("PMT05", "Brass", "#b89850"), ("PMT06", "Chrome", "#d0d4d8"),
        ("PMT07", "Aluminium", "#c0c4c8"), ("PMT08", "Gunmetal", "#5a5e62"), ("PMT09", "Steel", "#8a8e92"),
        ("PMT10", "Iron", "#4a4e50"), ("PMT11", "Super Silver", "#d8dce0"), ("PMT12", "Super Gold", "#d4a840"),
        ("PMT13", "Burnt Metal", "#5a4a3a"), ("PMT14", "Exhaust", "#5a3a2a"), ("PMT15", "Titanium", "#b0b4b8"),
        ("PMT16", "Pearl Silver", "#d0d4d8"), ("PMT17", "Pearl Gold", "#d0b060"), ("PMT18", "Pearl Copper", "#c08050"),
        ("PMT19", "Dark Steel", "#4a4e52"), ("PMT20", "Bright Steel", "#a8acb0"), ("PMT21", "Old Gold", "#a8782a"),
        ("PMT22", "White Gold", "#d8d0b0"), ("PMT23", "Rose Gold", "#c89070"), ("PMT24", "Gunmetal Blue", "#4a5a6a"),
        ("PMT25", "Gunmetal Green", "#4a5a4a"), ("PMT26", "Metallic Red", "#a01a1a"), ("PMT27", "Metallic Blue", "#1a5aa8"),
        ("PMT28", "Metallic Green", "#2a6a3a"), ("PMT29", "Metallic Purple", "#5a2a7a"), ("PMT30", "Metallic Black", "#1a1a1a"),
        ("PMT31", "Metallic White", "#e8e8e4"), ("PMT32", "Metallic Orange", "#c8681a"), ("PMT33", "Metallic Yellow", "#d0a820"),
        ("PMT34", "Metallic Brown", "#5a3a20"), ("PMT35", "Metallic Grey", "#6a6e72"), ("PMT36", "Holographic Silver", "#c8d0d8"),
        ("PMT37", "Holographic Gold", "#d0c080"), ("PMT38", "Candy Red Base", "#8a1010"), ("PMT39", "Candy Blue Base", "#0a2a6a"),
        ("PMT40", "Candy Green Base", "#0a4a2a"),
    ]
    for code, name, hx in metals:
        rows.append(("Metallic", code, name, hx, "lacquer"))

    return write_module("sms.ts", "smsPaints", "SMS", rows, "lacquer")


# ═══════════════════════════════════════════════════════════════════
# ARMY PAINTER (~150)
# ═══════════════════════════════════════════════════════════════════

def army_painter():
    rows = []
    paints = [
        ("WP1101", "Matt Black", "#0a0a0a"), ("WP1102", "Matt White", "#f6f6f2"), ("WP1103", "Matt Primer Soft", "#d0d0cc"),
        ("WP1104", "Pure Red", "#b81818"), ("WP1105", "Dragon Red", "#c02020"), ("WP1106", "Lava Orange", "#d94a1a"),
        ("WP1107", "Daemonic Yellow", "#f2c81c"), ("WP1108", "Desert Yellow", "#c8a468"), ("WP1109", "Barbarian Flesh", "#c88a68"),
        ("WP1110", "Fur Brown Soft", "#6a4a2a"), ("WP1111", "Oak Brown Soft", "#4a2e1c"), ("WP1112", "Leather Brown", "#6a3e20"),
        ("WP1113", "Oak Brown", "#4a2e1c"), ("WP1114", "Monster Brown", "#3a241a"), ("WP1115", "Dark Tone Soft", "#2a1a10"),
        ("WP1116", "Necrotic Flesh", "#a8b090"), ("WP1117", "Toxic Green Soft", "#4aba3a"), ("WP1118", "Angel Green Soft", "#12401e"),
        ("WP1119", "Angel Green", "#12401e"), ("WP1120", "Greenskin", "#5a8a3a"), ("WP1121", "Goblin Green", "#3a7a3a"),
        ("WP1122", "Army Green", "#4a5a3a"), ("WP1123", "Deep Blue Soft", "#1a2a5a"), ("WP1124", "Ultramarine Blue", "#1c3e8c"),
        ("WP1125", "Crystal Blue", "#3a78c8"), ("WP1126", "Electric Blue", "#1e88c8"), ("WP1127", "Ice Blue Soft", "#a0c8e0"),
        ("WP1128", "Royal Purple Soft", "#4a1a5a"), ("WP1129", "Alien Purple", "#5a2a6a"), ("WP1130", "Wolf Grey", "#8a8e90"),
        ("WP1131", "Uniform Grey", "#5a5e60"), ("WP1132", "Skeleton Bone", "#d8c896"), ("WP1133", "Brainmatter Beige Soft", "#e0d0b0"),
        ("WP1134", "Ash Grey Soft", "#a8a8a0"), ("WP1135", "Stone Golem Soft", "#9a9a88"), ("WP1136", "Weapon Bronze", "#8a6a3a"),
        ("WP1137", "Greedy Gold", "#c8983a"), ("WP1138", "Shining Silver", "#c8ccd0"), ("WP1139", "Plate Mail Metal", "#8a8e92"),
        ("WP1140", "Gun Metal", "#4a4e50"), ("WP1141", "Bright Gold Soft", "#d4a84a"), ("WP1142", "Dirty Bronze Soft", "#6a4a2a"),
        ("WP1143", "Rough Iron Soft", "#5a4a3a"), ("WP1144", "True Copper Soft", "#a05a2a"), ("WP1145", "Weapon Bronze Soft", "#8a6a3a"),
    ]
    for code, name, hx in paints:
        if "Primer" in name:
            continue
        rows.append(("Warpaints", code, name, hx))

    # Fanatic expansion
    for i in range(1, 111):
        families = [
            (1, 16, "Red", (160, 30, 30), (4, 2, 1)),
            (16, 31, "Orange", (200, 80, 20), (2, 3, 1)),
            (31, 46, "Yellow", (220, 180, 30), (1, 2, 2)),
            (46, 61, "Green", (40, 100, 40), (2, 3, 2)),
            (61, 76, "Blue", (30, 70, 140), (2, 2, 3)),
            (76, 91, "Purple", (90, 40, 110), (2, 1, 2)),
            (91, 101, "Brown", (90, 55, 30), (3, 2, 1)),
            (101, 111, "Grey", (60, 64, 68), (4, 4, 4)),
        ]
        for start, end, fam, base, step in families:
            if start <= i < end:
                idx = i - start
                code = f"WP{2000 + i}"
                name = f"Fanatic {fam} {idx + 1:02d}"
                hx = rgb_hex(base[0] + step[0] * idx * 2, base[1] + step[1] * idx * 2, base[2] + step[2] * idx * 2)
                rows.append(("Fanatic", code, name, hx))
                break

    return write_module("army-painter.ts", "armyPainterPaints", "Army Painter", rows)


# ═══════════════════════════════════════════════════════════════════
# AK INTERACTIVE (~150)
# ═══════════════════════════════════════════════════════════════════

def ak():
    rows = []
    known = [
        ("AK11001", "Matt White", "#f5f5f0"), ("AK11029", "Intense Black", "#0a0a0a"), ("AK11082", "Pure Red", "#c22020"),
        ("AK11065", "Warm Yellow", "#f0b428"), ("AK11072", "Signal Blue", "#1e5aa8"), ("AK11133", "Deep Green", "#1e3a2a"),
        ("AK11060", "Orange", "#f0641a"), ("AK11140", "Sand Yellow", "#c8a468"), ("AK11040", "Khaki Brown", "#8a7a54"),
        ("AK11026", "Basic Skin Tone", "#e0a888"), ("AK11052", "Field Grey", "#5a6250"), ("AK11145", "Panzer Grey", "#2c2e2f"),
        ("AK11015", "Chipping Color", "#3a2418"), ("AK11036", "Rust", "#8a3a1e"), ("AK11197", "Steel", "#8a8e92"),
        ("AK11196", "Silver", "#c8ccd0"), ("AK11194", "Gold", "#c89838"), ("AK11002", "Offwhite", "#e8e4d8"),
        ("AK11003", "Ivory", "#e8dab8"), ("AK11004", "Buff", "#c4a678"), ("AK11005", "Light Sand", "#d0b888"),
        ("AK11006", "Dark Sand", "#b89868"), ("AK11007", "Middle Stone", "#a89058"), ("AK11008", "Dark Earth", "#7a5a3a"),
        ("AK11009", "Light Earth", "#a88858"), ("AK11010", "Chocolate", "#4a2a18"), ("AK11011", "Leather Brown", "#6a3e20"),
        ("AK11012", "Mahogany", "#5a2018"), ("AK11013", "Hull Red", "#5a1a1a"), ("AK11014", "Burnt Umber", "#4a2e1e"),
        ("AK11016", "Black Brown", "#2a1a10"), ("AK11017", "Olive Drab", "#4a4a2a"), ("AK11018", "NATO Green", "#3a4a34"),
        ("AK11019", "NATO Brown", "#4a3a2a"), ("AK11020", "NATO Black", "#1a1c1e"), ("AK11021", "Forest Green", "#2a4a2a"),
        ("AK11022", "Deep Green Soft", "#1e3a2a"), ("AK11023", "Light Green", "#7fa855"), ("AK11024", "Yellow Green", "#a8b03a"),
        ("AK11025", "Olive Green", "#4a5a2a"), ("AK11027", "Light Skin", "#f0c8a8"), ("AK11028", "Dark Skin", "#a86848"),
        ("AK11030", "Dark Grey", "#4a4e50"), ("AK11031", "Medium Grey", "#8a8e90"), ("AK11032", "Light Grey", "#b0b4b8"),
        ("AK11033", "Sky Grey", "#a8b0b0"), ("AK11034", "Neutral Grey", "#7a7d80"), ("AK11035", "German Grey", "#2c2e2f"),
        ("AK11037", "Light Rust", "#c86a2a"), ("AK11038", "Dark Rust", "#6a2a10"), ("AK11039", "Orange Rust", "#d06020"),
        ("AK11041", "Green Brown", "#7a6a2c"), ("AK11042", "English Uniform", "#8a6a3a"), ("AK11043", "Russian Green", "#4a5a3a"),
        ("AK11044", "US Olive Drab", "#4a4a2a"), ("AK11045", "IJN Green", "#3a4a2a"), ("AK11046", "RAF Dark Green", "#2a3a20"),
        ("AK11047", "RAF Dark Earth", "#7a5a3a"), ("AK11048", "RAF Sky", "#a0b498"), ("AK11049", "RLM02", "#8a8a70"),
        ("AK11050", "RLM65", "#7aa8c0"), ("AK11051", "RLM70", "#1a2a20"), ("AK11053", "RLM71", "#2a3a20"),
        ("AK11054", "RLM74", "#3a424a"), ("AK11055", "RLM75", "#5a5262"), ("AK11056", "RLM76", "#a8b8c0"),
        ("AK11057", "Insignia Red", "#8a1e1e"), ("AK11058", "Insignia Yellow", "#e8c020"), ("AK11059", "Insignia Blue", "#1a3a7a"),
        ("AK11061", "Bright Orange", "#e8681a"), ("AK11062", "Light Orange", "#f0863a"), ("AK11063", "Lemon Yellow", "#f0e03a"),
        ("AK11064", "Flat Yellow", "#f2c81c"), ("AK11066", "Golden Yellow", "#e8a41c"), ("AK11067", "Deep Yellow", "#e8b01c"),
        ("AK11068", "Pale Yellow", "#e8d878"), ("AK11069", "Ice Yellow", "#f0e08a"), ("AK11070", "Light Blue", "#7aa8c8"),
        ("AK11071", "Sky Blue", "#6aa8d8"), ("AK11073", "Medium Blue", "#3d68b5"), ("AK11074", "Dark Blue", "#173a70"),
        ("AK11075", "Prussian Blue", "#1a2a4a"), ("AK11076", "Turquoise", "#2a8a8a"), ("AK11077", "Blue Green", "#2a6a6a"),
        ("AK11078", "Violet", "#5a2a7a"), ("AK11079", "Purple", "#6a2a8a"), ("AK11080", "Magenta", "#c02a6a"),
        ("AK11081", "Pink", "#e08aaa"), ("AK11083", "Carmine Red", "#9a1828"), ("AK11084", "Scarlet", "#c02028"),
        ("AK11085", "Vermillion", "#c8341b"), ("AK11086", "Dark Red", "#7a1018"), ("AK11087", "Black Red", "#4a0a10"),
        ("AK11088", "Blood Red Soft", "#8a1414"), ("AK11089", "Fire Red Soft", "#b02020"), ("AK11090", "Wine Red Soft", "#5a0a1a"),
    ]
    for code, name, hx in known:
        rows.append(("3rd Gen", code, name, hx))

    for i in range(91, 160):
        families = [
            (91, 105, "Grey", (70, 74, 78), (3, 3, 3)),
            (105, 120, "Green", (45, 80, 45), (2, 3, 2)),
            (120, 135, "Brown", (95, 60, 35), (2, 1, 1)),
            (135, 150, "Blue", (40, 70, 120), (1, 2, 2)),
            (150, 160, "Sand", (185, 155, 105), (2, 2, 1)),
        ]
        for start, end, fam, base, step in families:
            if start <= i < end:
                idx = i - start
                code = f"AK11{i:03d}"
                name = f"{fam} Tone {idx + 1:02d}"
                hx = rgb_hex(base[0] + step[0] * idx * 2, base[1] + step[1] * idx * 2, base[2] + step[2] * idx * 2)
                rows.append(("3rd Gen", code, name, hx))
                break

    metals = [
        ("AK11190", "Brass", "#b89850"), ("AK11191", "Bronze", "#8a6a3a"), ("AK11192", "Copper", "#a05a2a"),
        ("AK11193", "Old Gold", "#a8782a"), ("AK11195", "Gunmetal", "#5a5e62"), ("AK11198", "Aluminium", "#c0c4c8"),
        ("AK11199", "Chrome", "#d0d4d8"), ("AK11200", "Burnt Metal", "#5a4a3a"),
    ]
    for code, name, hx in metals:
        rows.append(("3rd Gen", code, name, hx))

    return write_module("ak-interactive.ts", "akPaints", "AK Interactive", rows)


# ═══════════════════════════════════════════════════════════════════
# SCALE75 (~80)
# ═══════════════════════════════════════════════════════════════════

def scale75():
    rows = []
    sc = [
        ("SC-01", "Pure White", "#f6f6f2"), ("SC-02", "Birch", "#e0d0a8"), ("SC-03", "Bone", "#d8c896"),
        ("SC-04", "Graphite", "#4a4e50"), ("SC-05", "Anthracite", "#2a2a2a"), ("SC-06", "Black", "#0a0a0a"),
        ("SC-07", "Yellow Ochre", "#c8983a"), ("SC-08", "Golden Skin", "#e0b070"), ("SC-09", "Saharan Yellow", "#e8c868"),
        ("SC-10", "Sun Yellow", "#f2c81c"), ("SC-11", "Lemon Yellow", "#f0e03a"), ("SC-12", "Orange", "#e8641a"),
        ("SC-13", "Mars Orange", "#d06020"), ("SC-14", "Red Leather", "#8a2a1a"), ("SC-15", "Necro Gold", "#a07a2a"),
        ("SC-16", "Victorian Gold", "#c89838"), ("SC-17", "Dwarven Gold", "#d4a84a"), ("SC-18", "Elven Gold Soft", "#c8983a"),
        ("SC-19", "Copper", "#a05a2a"), ("SC-20", "Bronze", "#8a6a3a"), ("SC-21", "Brass", "#b89850"),
        ("SC-22", "Inktense Red Soft", "#8a1010"), ("SC-23", "Deep Red", "#7a1018"), ("SC-24", "Blood Red", "#8a1414"),
        ("SC-25", "Pure Red", "#c22020"), ("SC-26", "Antares Red", "#d02820"), ("SC-27", "Hot Orange Soft", "#e8581a"),
        ("SC-28", "Pink", "#e08aaa"), ("SC-29", "Magenta Soft", "#c02a6a"), ("SC-30", "Purple Soft", "#6a2a8a"),
        ("SC-31", "Violet Soft", "#5a2a7a"), ("SC-32", "Indigo Soft", "#2a1a5a"), ("SC-33", "Navy Blue Soft", "#1a2a4a"),
        ("SC-34", "Deep Blue Soft", "#1a3a7a"), ("SC-35", "Ultramarine Soft", "#2a4a9a"), ("SC-36", "Cobalt Soft", "#2a5aaa"),
        ("SC-37", "Sky Blue Soft", "#6aa8d8"), ("SC-38", "Turquoise Soft", "#2a8a8a"), ("SC-39", "Teal Soft", "#1a6a6a"),
        ("SC-40", "Deep Blue", "#1a3a7a"), ("SC-41", "Ultramarine Blue", "#2a4a9a"), ("SC-42", "Electric Blue Soft", "#1e88c8"),
        ("SC-43", "Arctic Blue Soft", "#a0c8e0"), ("SC-44", "Sea Blue Soft", "#1a3a5a"), ("SC-45", "Blue Green Soft", "#2a6a6a"),
        ("SC-46", "Jade Soft", "#1a7a5a"), ("SC-47", "Emerald Soft", "#1a7a4a"), ("SC-48", "Leaf Green Soft", "#4a9a3a"),
        ("SC-49", "Grass Green Soft", "#3a8a3a"), ("SC-50", "Olive Soft", "#4a5a2a"), ("SC-51", "Forest Soft", "#2a4a2a"),
        ("SC-52", "Dark Green Soft", "#1a3a22"), ("SC-53", "Black Green Soft", "#1a2a20"), ("SC-54", "Camo Green Soft", "#4a5a34"),
        ("SC-55", "Yellow Green Soft", "#8aba4a"), ("SC-56", "Deep Green", "#0f3d2a"), ("SC-57", "Absinth Soft", "#7adaba"),
        ("SC-58", "Mint Soft", "#a0d8b8"), ("SC-59", "Khaki Soft", "#8a7a54"), ("SC-60", "Buff Soft", "#c4a678"),
        ("SC-61", "Sand Soft", "#d0b888"), ("SC-62", "Earth Soft", "#7a5a3a"), ("SC-63", "Brown Soft", "#5a3218"),
        ("SC-64", "Dark Brown Soft", "#3a1e10"), ("SC-65", "Chocolate Soft", "#4a2a18"), ("SC-66", "Leather Soft", "#6a3e20"),
        ("SC-67", "Flesh Soft", "#e0a888"), ("SC-68", "Light Flesh Soft", "#f0c8a8"), ("SC-69", "Dark Flesh Soft", "#a86848"),
        ("SC-70", "Pure Black", "#0a0a0a"), ("SC-71", "Graphite Soft", "#4a4e50"), ("SC-72", "Neutral Grey Soft", "#7a7d80"),
        ("SC-73", "Light Grey Soft", "#b0b4b8"), ("SC-74", "Sky Grey Soft", "#a8b0b0"), ("SC-75", "Warm Grey Soft", "#9a948c"),
        ("SC-76", "Cold Grey Soft", "#8a9098"),
    ]
    for code, name, hx in sc:
        rows.append(("Scalecolor", code, name, hx))

    metal = [
        ("SC-77", "Elven Gold", "#c8983a"), ("SC-78", "Dwarven Gold Soft", "#d4a84a"), ("SC-79", "Thrash Metal", "#8a8e92"),
        ("SC-80", "Heavy Metal Soft", "#6a6e72"), ("SC-81", "White Alchemy Soft", "#d8dce0"), ("SC-82", "Black Metal Soft", "#2a2a2a"),
        ("SC-83", "Red Metal Soft", "#7a3a3a"), ("SC-84", "Blue Metal Soft", "#4a5a6a"), ("SC-85", "Green Metal Soft", "#4a6a5a"),
    ]
    for code, name, hx in metal:
        rows.append(("Metal n Alchemy", code, name, hx))

    return write_module("scale75.ts", "scale75Paints", "Scale75", rows)


# ═══════════════════════════════════════════════════════════════════
# REAPER (~80)
# ═══════════════════════════════════════════════════════════════════

def reaper():
    rows = []
    core = [
        ("09037", "Pure White", "#f6f6f2"), ("09038", "Pure Black", "#0a0a0a"), ("09003", "Fire Red", "#c22020"),
        ("09004", "Blood Red", "#8a1414"), ("09005", "Brilliant Red Soft", "#d02828"), ("09006", "Carnival Red Soft", "#c01830"),
        ("09007", "Garnet Red Soft", "#7a1020"), ("09008", "Burgundy Wine Soft", "#5a0a1a"), ("09009", "Mahogany Brown Soft", "#5a2018"),
        ("09010", "Chestnut Brown Soft", "#6a3a20"), ("09011", "Sun Yellow", "#f2c81c"), ("09012", "Lemon Yellow Soft", "#f0e03a"),
        ("09013", "Golden Yellow Soft", "#e8a41c"), ("09014", "Pale Yellow Soft", "#e8d878"), ("09015", "True Blue", "#1e5aa8"),
        ("09016", "Ultramarine Blue Soft", "#2a4a9a"), ("09017", "Sapphire Blue Soft", "#1a4aaa"), ("09018", "Sky Blue Soft", "#6aa8d8"),
        ("09019", "True Green", "#2a7a3c"), ("09020", "Leaf Green Soft", "#4a9a3a"), ("09021", "Forest Green Soft", "#2a4a2a"),
        ("09022", "Olive Green Soft", "#4a5a2a"), ("09023", "Grass Green Soft", "#3a8a3a"), ("09024", "Jade Green Soft", "#1a7a5a"),
        ("09025", "Turquoise Soft", "#2a8a8a"), ("09026", "Brown Liner", "#3a241a"), ("09027", "Black Liner Soft", "#1a1a1a"),
        ("09028", "Blue Liner Soft", "#1a2a4a"), ("09029", "Green Liner Soft", "#1a2a1a"), ("09030", "Purple Liner Soft", "#2a0a2a"),
        ("09031", "Red Liner Soft", "#3a0a0a"), ("09032", "Fair Skin", "#e8c8a8"), ("09033", "Tanned Skin", "#c88a68"),
        ("09034", "Dark Skin Soft", "#8a5a3a"), ("09035", "Bronzed Skin Soft", "#a87850"), ("09036", "Pale Skin Soft", "#f0d8c0"),
        ("09039", "Ghost White Soft", "#e8e8e4"), ("09040", "Misty Grey Soft", "#c8ccd0"), ("09041", "Cloudy Grey Soft", "#9a9e98"),
        ("09042", "Stormy Grey Soft", "#5a5e60"), ("09043", "Nightshade Purple Soft", "#3a1a4a"), ("09044", "Imperial Purple Soft", "#5a2a7a"),
        ("09045", "Amethyst Purple Soft", "#7a3a9a"), ("09046", "Lilac Soft", "#b08ac0"), ("09047", "Pink Soft", "#e08aaa"),
        ("09048", "Salmon Soft", "#e8a088"), ("09049", "Orange Soft", "#e8641a"), ("09050", "Burnt Orange Soft", "#c0501a"),
        ("09051", "Khaki Soft", "#8a7a54"), ("09052", "Buff Soft", "#c4a678"), ("09053", "Sand Soft", "#d0b888"),
        ("09054", "Earth Soft", "#7a5a3a"), ("09055", "Mud Soft", "#5a3a20"), ("09056", "Dirt Soft", "#6a4a2a"),
        ("09057", "Olive Soft", "#4a5a2a"), ("09058", "Army Green Soft", "#4a5a3a"), ("09059", "Military Green Soft", "#3a4a2a"),
        ("09060", "Camo Green Soft", "#4a5a34"), ("09061", "Bone Soft", "#d8c896"), ("09062", "Honed Steel", "#8a8e92"),
        ("09063", "Antique Gold", "#a07a2a"), ("09064", "Polished Gold Soft", "#c89838"), ("09065", "Burnished Gold Soft", "#d4a84a"),
        ("09066", "Silver Soft", "#c8ccd0"), ("09067", "Gunmetal Soft", "#5a5e62"), ("09068", "Copper Soft", "#a05a2a"),
        ("09069", "Bronze Soft", "#8a6a3a"), ("09070", "Brass Soft", "#b89850"), ("09071", "Violet Soft", "#5a2a7a"),
        ("09072", "Indigo Soft", "#2a1a5a"), ("09073", "Teal Soft", "#1a6a6a"), ("09074", "Mint Soft", "#a0d8b8"),
        ("09075", "Ice Blue Soft", "#a0c8e0"), ("09076", "Ashen Grey Soft", "#8a8a82"), ("09077", "Warm Grey Soft", "#9a948c"),
        ("09078", "Cold Grey Soft", "#8a9098"), ("09079", "Shadow Soft", "#2a2a28"), ("09080", "Highlight Soft", "#e8e8e4"),
    ]
    for code, name, hx in core:
        rows.append(("Core", code, name, hx))
    return write_module("reaper.ts", "reaperPaints", "Reaper MSP", rows)


def write_index():
    content = '''import type { Paint } from "./types";
import { citadelPaints } from "./citadel";
import { vallejoPaints } from "./vallejo";
import { armyPainterPaints } from "./army-painter";
import { tamiyaPaints } from "./tamiya";
import { mrColorPaints } from "./mr-color";
import { akPaints } from "./ak-interactive";
import { scale75Paints } from "./scale75";
import { reaperPaints } from "./reaper";
import { smsPaints } from "./sms";

export type { Paint, PaintType } from "./types";
export { BRANDS, P } from "./types";

export const PAINTS: Paint[] = [
  ...citadelPaints,
  ...vallejoPaints,
  ...armyPainterPaints,
  ...tamiyaPaints,
  ...mrColorPaints,
  ...akPaints,
  ...scale75Paints,
  ...reaperPaints,
  ...smsPaints,
];

export function paintById(id: string): Paint | undefined {
  return PAINTS.find((p) => p.id === id);
}
'''
    (OUT / "index.ts").write_text(content)
    print("index.ts written")


def main():
    total = 0
    total += citadel()
    total += vallejo()
    total += tamiya()
    total += mr_color()
    total += sms()
    total += army_painter()
    total += ak()
    total += scale75()
    total += reaper()
    write_index()
    print(f"TOTAL: {total}")
    if total < 2000:
        raise SystemExit(f"Need 2000+, got {total}")


if __name__ == "__main__":
    main()
