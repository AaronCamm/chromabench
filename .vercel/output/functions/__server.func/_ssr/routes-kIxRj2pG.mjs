import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAuth } from "./auth-context-CrP7tkun.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Search, c as Heart, i as Shuffle, l as Beaker, n as Trash2, o as Plus, r as Target, s as Lock, t as X, u as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-kIxRj2pG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BRANDS = [
	"Citadel",
	"Vallejo",
	"Army Painter",
	"Tamiya",
	"Mr. Color",
	"AK Interactive",
	"Scale75",
	"Reaper MSP",
	"SMS"
];
var P = (brand, line, code, name, hex, type = "acrylic") => ({
	id: `${brand}-${line}-${code}`.replace(/\s+/g, "_").toLowerCase(),
	brand,
	line,
	code,
	name,
	hex,
	type
});
var citadelPaints = [
	P("Citadel", "Base", "Abaddon Black", "Abaddon Black", "#000000"),
	P("Citadel", "Base", "Corax White", "Corax White", "#f5f5f2"),
	P("Citadel", "Base", "Mephiston Red", "Mephiston Red", "#9d1e1e"),
	P("Citadel", "Base", "Khorne Red", "Khorne Red", "#6c1414"),
	P("Citadel", "Base", "Macragge Blue", "Macragge Blue", "#1c3f8a"),
	P("Citadel", "Base", "Kantor Blue", "Kantor Blue", "#12244d"),
	P("Citadel", "Base", "Caliban Green", "Caliban Green", "#0f3d2a"),
	P("Citadel", "Base", "Warpstone Glow", "Warpstone Glow", "#1e6b3a"),
	P("Citadel", "Base", "Waaagh! Flesh", "Waaagh! Flesh", "#0b3a2f"),
	P("Citadel", "Base", "Death Guard Green", "Death Guard Green", "#8ea172"),
	P("Citadel", "Base", "Averland Sunset", "Averland Sunset", "#d1a02c"),
	P("Citadel", "Base", "Balthasar Gold", "Balthasar Gold", "#8a6a30"),
	P("Citadel", "Base", "Retributor Armour", "Retributor Armour", "#b48a3a"),
	P("Citadel", "Base", "Leadbelcher", "Leadbelcher", "#585c60"),
	P("Citadel", "Base", "Bugman's Glow", "Bugman's Glow", "#8b4a3a"),
	P("Citadel", "Base", "Rakarth Flesh", "Rakarth Flesh", "#c5b291"),
	P("Citadel", "Base", "Zandri Dust", "Zandri Dust", "#b8a271"),
	P("Citadel", "Base", "Steel Legion Drab", "Steel Legion Drab", "#7a6247"),
	P("Citadel", "Base", "Mournfang Brown", "Mournfang Brown", "#5a3218"),
	P("Citadel", "Base", "Rhinox Hide", "Rhinox Hide", "#3a241a"),
	P("Citadel", "Base", "XV-88", "XV-88", "#7a4a1c"),
	P("Citadel", "Base", "Naggaroth Night", "Naggaroth Night", "#3a1f3a"),
	P("Citadel", "Base", "Screamer Pink", "Screamer Pink", "#78264a"),
	P("Citadel", "Base", "Daemonette Hide", "Daemonette Hide", "#7a6a8a"),
	P("Citadel", "Base", "Thousand Sons Blue", "Thousand Sons Blue", "#1b6f8f"),
	P("Citadel", "Base", "Sotek Green", "Sotek Green", "#0d6a7a"),
	P("Citadel", "Base", "Incubi Darkness", "Incubi Darkness", "#173a3a"),
	P("Citadel", "Base", "Jokaero Orange", "Jokaero Orange", "#d95322"),
	P("Citadel", "Base", "Wazdakka Red", "Wazdakka Red", "#b71a1a"),
	P("Citadel", "Base", "Celestra Grey", "Celestra Grey", "#c8ccd0"),
	P("Citadel", "Base", "Mechanicus Standard Grey", "Mechanicus Standard Grey", "#4a4d4f"),
	P("Citadel", "Base", "Dryad Bark", "Dryad Bark", "#3a2a1e"),
	P("Citadel", "Base", "Castellan Green", "Castellan Green", "#3a4a28"),
	P("Citadel", "Base", "Deathworld Forest", "Deathworld Forest", "#5a6a3a"),
	P("Citadel", "Base", "The Fang", "The Fang", "#4a5a6a"),
	P("Citadel", "Base", "Stegadon Scale Green", "Stegadon Scale Green", "#1a3a4a"),
	P("Citadel", "Base", "Ionrach Skin", "Ionrach Skin", "#c8a878"),
	P("Citadel", "Base", "Phoenician Purple", "Phoenician Purple", "#4a1a4a"),
	P("Citadel", "Base", "Gal Vorbak Red", "Gal Vorbak Red", "#5a0a1a"),
	P("Citadel", "Base", "Barak-Nar Burgundy", "Barak-Nar Burgundy", "#4a1a2a"),
	P("Citadel", "Base", "Night Lords Blue", "Night Lords Blue", "#0a1a4a"),
	P("Citadel", "Base", "Lupercal Green", "Lupercal Green", "#0a2a1a"),
	P("Citadel", "Base", "Nocturne Green", "Nocturne Green", "#1a3a2a"),
	P("Citadel", "Base", "Iron Hands Steel", "Iron Hands Steel", "#6a6e72"),
	P("Citadel", "Base", "Grey Seer", "Grey Seer", "#d0d0cc"),
	P("Citadel", "Base", "Wraithbone", "Wraithbone", "#e8dfc8"),
	P("Citadel", "Base", "Word Bearers Red", "Word Bearers Red", "#6a1018"),
	P("Citadel", "Base", "Sons of Horus Green", "Sons of Horus Green", "#3a6a5a"),
	P("Citadel", "Base", "Emperor's Children Purple", "Emperor's Children Purple", "#6a2a6a"),
	P("Citadel", "Layer", "Evil Sunz Scarlet", "Evil Sunz Scarlet", "#c62828"),
	P("Citadel", "Layer", "Wild Rider Red", "Wild Rider Red", "#e04a1c"),
	P("Citadel", "Layer", "Fire Dragon Bright", "Fire Dragon Bright", "#e6721f"),
	P("Citadel", "Layer", "Troll Slayer Orange", "Troll Slayer Orange", "#e85a1a"),
	P("Citadel", "Layer", "Yriel Yellow", "Yriel Yellow", "#f4b41a"),
	P("Citadel", "Layer", "Flash Gitz Yellow", "Flash Gitz Yellow", "#f8d84a"),
	P("Citadel", "Layer", "Moot Green", "Moot Green", "#4bb04b"),
	P("Citadel", "Layer", "Warboss Green", "Warboss Green", "#2a7a3c"),
	P("Citadel", "Layer", "Sybarite Green", "Sybarite Green", "#1c9f7a"),
	P("Citadel", "Layer", "Teclis Blue", "Teclis Blue", "#1c6fbf"),
	P("Citadel", "Layer", "Alaitoc Blue", "Alaitoc Blue", "#26548a"),
	P("Citadel", "Layer", "Calgar Blue", "Calgar Blue", "#3a68a8"),
	P("Citadel", "Layer", "Lothern Blue", "Lothern Blue", "#4a9edb"),
	P("Citadel", "Layer", "Baharroth Blue", "Baharroth Blue", "#8ec6e0"),
	P("Citadel", "Layer", "Ushabti Bone", "Ushabti Bone", "#d6c491"),
	P("Citadel", "Layer", "Screaming Skull", "Screaming Skull", "#e8dcae"),
	P("Citadel", "Layer", "Pallid Wych Flesh", "Pallid Wych Flesh", "#e8dccb"),
	P("Citadel", "Layer", "Cadian Fleshtone", "Cadian Fleshtone", "#c47a55"),
	P("Citadel", "Layer", "Kislev Flesh", "Kislev Flesh", "#e0a077"),
	P("Citadel", "Layer", "Ratskin Flesh", "Ratskin Flesh", "#9a4a2a"),
	P("Citadel", "Layer", "Runefang Steel", "Runefang Steel", "#c0c4c8"),
	P("Citadel", "Layer", "Auric Armour Gold", "Auric Armour Gold", "#c8993b"),
	P("Citadel", "Layer", "Liberator Gold", "Liberator Gold", "#d4a84a"),
	P("Citadel", "Layer", "Stormhost Silver", "Stormhost Silver", "#dadde0"),
	P("Citadel", "Layer", "Dawnstone", "Dawnstone", "#7a7a7a"),
	P("Citadel", "Layer", "Administratum Grey", "Administratum Grey", "#a8a8a5"),
	P("Citadel", "Layer", "Eshin Grey", "Eshin Grey", "#3a3d3f"),
	P("Citadel", "Layer", "White Scar", "White Scar", "#f7f7f4"),
	P("Citadel", "Layer", "Ulthuan Grey", "Ulthuan Grey", "#e0e4e8"),
	P("Citadel", "Layer", "Fenrisian Grey", "Fenrisian Grey", "#8a9aaa"),
	P("Citadel", "Layer", "Russ Grey", "Russ Grey", "#6a7a8a"),
	P("Citadel", "Layer", "Thunderhawk Blue", "Thunderhawk Blue", "#4a6a7a"),
	P("Citadel", "Layer", "Slaanesh Grey", "Slaanesh Grey", "#8a7a8a"),
	P("Citadel", "Layer", "Warpfiend Grey", "Warpfiend Grey", "#6a5a6a"),
	P("Citadel", "Layer", "Xereus Purple", "Xereus Purple", "#5a2a6a"),
	P("Citadel", "Layer", "Genestealer Purple", "Genestealer Purple", "#7a3a8a"),
	P("Citadel", "Layer", "Kakophoni Purple", "Kakophoni Purple", "#9a5aaa"),
	P("Citadel", "Layer", "Pink Horror", "Pink Horror", "#c04a7a"),
	P("Citadel", "Layer", "Emperor's Children", "Emperor's Children", "#e07aaa"),
	P("Citadel", "Layer", "Fulgrim Pink", "Fulgrim Pink", "#f0a0c0"),
	P("Citadel", "Layer", "Squig Orange", "Squig Orange", "#d86a2a"),
	P("Citadel", "Layer", "Gorthor Brown", "Gorthor Brown", "#6a4a2a"),
	P("Citadel", "Layer", "Baneblade Brown", "Baneblade Brown", "#8a7a5a"),
	P("Citadel", "Layer", "Karak Stone", "Karak Stone", "#c8b888"),
	P("Citadel", "Layer", "Tallarn Sand", "Tallarn Sand", "#c8a868"),
	P("Citadel", "Layer", "Balor Brown", "Balor Brown", "#a07830"),
	P("Citadel", "Layer", "Doombull Brown", "Doombull Brown", "#5a2010"),
	P("Citadel", "Layer", "Tuskgor Fur", "Tuskgor Fur", "#8a4020"),
	P("Citadel", "Layer", "Deathclaw Brown", "Deathclaw Brown", "#a85830"),
	P("Citadel", "Layer", "Skavenblight Dinge", "Skavenblight Dinge", "#3a3a32"),
	P("Citadel", "Layer", "Stormvermin Fur", "Stormvermin Fur", "#6a5a4a"),
	P("Citadel", "Layer", "Nurgling Green", "Nurgling Green", "#9aaa6a"),
	P("Citadel", "Layer", "Ogryn Camo", "Ogryn Camo", "#aaba7a"),
	P("Citadel", "Layer", "Elysian Green", "Elysian Green", "#6a8a4a"),
	P("Citadel", "Layer", "Straken Green", "Straken Green", "#4a6a3a"),
	P("Citadel", "Layer", "Loren Forest", "Loren Forest", "#3a5a2a"),
	P("Citadel", "Layer", "Kabalite Green", "Kabalite Green", "#1a5a4a"),
	P("Citadel", "Layer", "Gauss Blaster Green", "Gauss Blaster Green", "#7adaba"),
	P("Citadel", "Layer", "Temple Guard Blue", "Temple Guard Blue", "#2a8aaa"),
	P("Citadel", "Layer", "Ahriman Blue", "Ahriman Blue", "#1a6a8a"),
	P("Citadel", "Layer", "Hoeth Blue", "Hoeth Blue", "#4a7aba"),
	P("Citadel", "Layer", "Blue Horror", "Blue Horror", "#a0c0e0"),
	P("Citadel", "Layer", "Dechala Lilac", "Dechala Lilac", "#c8a8d0"),
	P("Citadel", "Layer", "Ironbreaker", "Ironbreaker", "#8a8e92"),
	P("Citadel", "Layer", "Hashut Copper", "Hashut Copper", "#a06a3a"),
	P("Citadel", "Layer", "Sycorax Bronze", "Sycorax Bronze", "#8a6a4a"),
	P("Citadel", "Layer", "Gehenna's Gold", "Gehenna's Gold", "#b8882a"),
	P("Citadel", "Layer", "Fulgurite Copper", "Fulgurite Copper", "#c8884a"),
	P("Citadel", "Layer", "Skullcrusher Brass", "Skullcrusher Brass", "#c8a85a"),
	P("Citadel", "Layer", "Canoptek Alloy", "Canoptek Alloy", "#c8b888"),
	P("Citadel", "Layer", "Runelord Brass", "Runelord Brass", "#8a7a4a"),
	P("Citadel", "Layer", "Warplock Bronze", "Warplock Bronze", "#5a4a2a"),
	P("Citadel", "Layer", "Brass Scorpion", "Brass Scorpion", "#6a4a2a"),
	P("Citadel", "Layer", "Flayed One Flesh", "Flayed One Flesh", "#d8b898"),
	P("Citadel", "Layer", "Ungor Flesh", "Ungor Flesh", "#c89868"),
	P("Citadel", "Layer", "Bestigor Flesh", "Bestigor Flesh", "#e0a878"),
	P("Citadel", "Layer", "Dark Reaper", "Dark Reaper", "#3a4a4a"),
	P("Citadel", "Layer", "Skarsnik Green", "Skarsnik Green", "#5a8a4a"),
	P("Citadel", "Layer", "Castellax Bronze", "Castellax Bronze", "#8a5a2a"),
	P("Citadel", "Layer", "Karandras Green", "Karandras Green", "#2a8a4a"),
	P("Citadel", "Layer", "Biel-Tan Green", "Biel-Tan Green", "#1a5a2a"),
	P("Citadel", "Layer", "Scorpion Green", "Scorpion Green", "#4aba3a"),
	P("Citadel", "Layer", "Verminlord Hide", "Verminlord Hide", "#5a3a4a"),
	P("Citadel", "Layer", "Knight-Questor Flesh", "Knight-Questor Flesh", "#d8a888"),
	P("Citadel", "Contrast", "Blood Angels Red", "Blood Angels Red", "#a01818", "contrast"),
	P("Citadel", "Contrast", "Ultramarines Blue", "Ultramarines Blue", "#1e3e88", "contrast"),
	P("Citadel", "Contrast", "Iyanden Yellow", "Iyanden Yellow", "#e8b21e", "contrast"),
	P("Citadel", "Contrast", "Basilicanum Grey", "Basilicanum Grey", "#333a3f", "contrast"),
	P("Citadel", "Contrast", "Black Templar", "Black Templar", "#0f1114", "contrast"),
	P("Citadel", "Contrast", "Snakebite Leather", "Snakebite Leather", "#8a5a26", "contrast"),
	P("Citadel", "Contrast", "Guilliman Flesh", "Guilliman Flesh", "#d99e78", "contrast"),
	P("Citadel", "Contrast", "Aggaros Dunes", "Aggaros Dunes", "#a06a2a", "contrast"),
	P("Citadel", "Contrast", "Militarum Green", "Militarum Green", "#3a5a2e", "contrast"),
	P("Citadel", "Contrast", "Dark Angels Green", "Dark Angels Green", "#0a2a14", "contrast"),
	P("Citadel", "Contrast", "Warp Lightning", "Warp Lightning", "#1a8a3a", "contrast"),
	P("Citadel", "Contrast", "Aeldari Emerald", "Aeldari Emerald", "#0a6a4a", "contrast"),
	P("Citadel", "Contrast", "Akhelian Green", "Akhelian Green", "#0a4a5a", "contrast"),
	P("Citadel", "Contrast", "Talassar Blue", "Talassar Blue", "#1a5aaa", "contrast"),
	P("Citadel", "Contrast", "Leviadon Blue", "Leviadon Blue", "#0a1a4a", "contrast"),
	P("Citadel", "Contrast", "Space Wolves Grey", "Space Wolves Grey", "#6a7a8a", "contrast"),
	P("Citadel", "Contrast", "Apothecary White", "Apothecary White", "#e8e8e4", "contrast"),
	P("Citadel", "Contrast", "Skeleton Horde", "Skeleton Horde", "#c8b888", "contrast"),
	P("Citadel", "Contrast", "Gore-grunta Fur", "Gore-grunta Fur", "#6a3a1a", "contrast"),
	P("Citadel", "Contrast", "Wyldwood", "Wyldwood", "#3a2a1a", "contrast"),
	P("Citadel", "Contrast", "Cygor Brown", "Cygor Brown", "#4a2a1a", "contrast"),
	P("Citadel", "Contrast", "Garaghak's Sewer", "Garaghak's Sewer", "#5a4a2a", "contrast"),
	P("Citadel", "Contrast", "Magos Purple", "Magos Purple", "#5a2a5a", "contrast"),
	P("Citadel", "Contrast", "Volupus Pink", "Volupus Pink", "#a02a5a", "contrast"),
	P("Citadel", "Contrast", "Doomfire Magenta", "Doomfire Magenta", "#c02a6a", "contrast"),
	P("Citadel", "Contrast", "Shyish Purple", "Shyish Purple", "#2a0a2a", "contrast"),
	P("Citadel", "Contrast", "Nazdreg Yellow", "Nazdreg Yellow", "#8a6a1a", "contrast"),
	P("Citadel", "Contrast", "Ork Flesh", "Ork Flesh", "#3a6a2a", "contrast"),
	P("Citadel", "Contrast", "Plaguebearer Flesh", "Plaguebearer Flesh", "#8a9a5a", "contrast"),
	P("Citadel", "Contrast", "Frostheart", "Frostheart", "#4a8aaa", "contrast"),
	P("Citadel", "Contrast", "Terradon Turquoise", "Terradon Turquoise", "#1a6a6a", "contrast"),
	P("Citadel", "Contrast", "Aethermatic Blue", "Aethermatic Blue", "#4aaaca", "contrast"),
	P("Citadel", "Contrast", "Gryph-charger Grey", "Gryph-charger Grey", "#5a6a7a", "contrast"),
	P("Citadel", "Contrast", "Creed Camo", "Creed Camo", "#4a5a3a", "contrast"),
	P("Citadel", "Contrast", "Darkoath Flesh", "Darkoath Flesh", "#c89870", "contrast"),
	P("Citadel", "Contrast", "Fyreslayer Flesh", "Fyreslayer Flesh", "#d8a070", "contrast"),
	P("Citadel", "Contrast", "Gryph-hound Orange", "Gryph-hound Orange", "#d86a2a", "contrast"),
	P("Citadel", "Contrast", "Imperial Fist", "Imperial Fist", "#e8c020", "contrast"),
	P("Citadel", "Contrast", "Flesh Tearers Red", "Flesh Tearers Red", "#6a0a0a", "contrast"),
	P("Citadel", "Contrast", "Baal Red", "Baal Red", "#b01818", "contrast"),
	P("Citadel", "Contrast", "Karandras Green", "Karandras Green", "#1a6a2a", "contrast"),
	P("Citadel", "Contrast", "Striking Scorpion Green", "Striking Scorpion Green", "#2a8a3a", "contrast"),
	P("Citadel", "Contrast", "Asurmen Blue", "Asurmen Blue", "#1a3a7a", "contrast"),
	P("Citadel", "Shade", "Nuln Oil", "Nuln Oil", "#1a1a1a"),
	P("Citadel", "Shade", "Agrax Earthshade", "Agrax Earthshade", "#3a2a1a"),
	P("Citadel", "Shade", "Reikland Fleshshade", "Reikland Fleshshade", "#6a3a2a"),
	P("Citadel", "Shade", "Seraphim Sepia", "Seraphim Sepia", "#6a4a2a"),
	P("Citadel", "Shade", "Druchii Violet", "Druchii Violet", "#3a1a3a"),
	P("Citadel", "Shade", "Drakenhof Nightshade", "Drakenhof Nightshade", "#1a2a4a"),
	P("Citadel", "Shade", "Biel-Tan Green", "Biel-Tan Green", "#1a3a2a"),
	P("Citadel", "Shade", "Cassandora Yellow", "Cassandora Yellow", "#8a6a1a"),
	P("Citadel", "Shade", "Carroburg Crimson", "Carroburg Crimson", "#4a0a1a"),
	P("Citadel", "Shade", "Coelia Greenshade", "Coelia Greenshade", "#0a3a3a"),
	P("Citadel", "Shade", "Athonian Camoshade", "Athonian Camoshade", "#3a3a1a"),
	P("Citadel", "Shade", "Fuegan Orange", "Fuegan Orange", "#6a2a0a"),
	P("Citadel", "Shade", "Guilliman Blue", "Guilliman Blue", "#1a3a6a"),
	P("Citadel", "Shade", "Nuln Oil Gloss", "Nuln Oil Gloss", "#0f0f10"),
	P("Citadel", "Shade", "Agrax Earthshade Gloss", "Agrax Earthshade Gloss", "#2a1a10"),
	P("Citadel", "Shade", "Reikland Fleshshade Gloss", "Reikland Fleshshade Gloss", "#5a2a1a"),
	P("Citadel", "Shade", "Soulblight Grey", "Soulblight Grey", "#4a4a4a"),
	P("Citadel", "Shade", "Kryos Shade", "Kryos Shade", "#3a4a5a"),
	P("Citadel", "Dry", "Necron Compound", "Necron Compound", "#c8ccd0"),
	P("Citadel", "Dry", "Tyrant Skull", "Tyrant Skull", "#d8c898"),
	P("Citadel", "Dry", "Terminatus Stone", "Terminatus Stone", "#c8b898"),
	P("Citadel", "Dry", "Golgfag Brown", "Golgfag Brown", "#8a5a2a"),
	P("Citadel", "Dry", "Ryza Rust", "Ryza Rust", "#c86a2a"),
	P("Citadel", "Dry", "Imrik Blue", "Imrik Blue", "#4a8aca"),
	P("Citadel", "Dry", "Hellion Green", "Hellion Green", "#6aba8a"),
	P("Citadel", "Dry", "Chronus Blue", "Chronus Blue", "#6a9aca"),
	P("Citadel", "Dry", "Stormfang", "Stormfang", "#8a9aaa"),
	P("Citadel", "Dry", "Wrack White", "Wrack White", "#f0f0ec"),
	P("Citadel", "Dry", "Golden Griffon", "Golden Griffon", "#d4a84a"),
	P("Citadel", "Dry", "Lucius Lilac", "Lucius Lilac", "#c8a8d0"),
	P("Citadel", "Dry", "Praetor Gold", "Praetor Gold", "#c89838"),
	P("Citadel", "Dry", "Dawnstone", "Dawnstone", "#8a8a8a"),
	P("Citadel", "Dry", "Hoeth Blue", "Hoeth Blue", "#5a8aca"),
	P("Citadel", "Dry", "Verminlord Hide", "Verminlord Hide", "#6a4a5a"),
	P("Citadel", "Dry", "Sylvaneth Bark", "Sylvaneth Bark", "#5a3a2a"),
	P("Citadel", "Dry", "Astrogranite Debris", "Astrogranite Debris", "#6a6a68")
];
var vallejoPaints = [
	P("Vallejo", "Model Color", "70.951", "White", "#f6f6f2"),
	P("Vallejo", "Model Color", "70.950", "Black", "#0a0a0a"),
	P("Vallejo", "Model Color", "70.861", "Glossy Black", "#0d0d0d"),
	P("Vallejo", "Model Color", "70.862", "Black Grey", "#2a2a2a"),
	P("Vallejo", "Model Color", "70.994", "Dark Grey", "#4a4d4f"),
	P("Vallejo", "Model Color", "70.992", "Neutral Grey", "#7a7d80"),
	P("Vallejo", "Model Color", "70.990", "Light Grey", "#b0b4b8"),
	P("Vallejo", "Model Color", "70.993", "German Grey", "#2c2e2f"),
	P("Vallejo", "Model Color", "70.995", "German Grey", "#2c2e2f"),
	P("Vallejo", "Model Color", "70.866", "Grey Green", "#6a7a6a"),
	P("Vallejo", "Model Color", "70.886", "Green Grey", "#7a8a7a"),
	P("Vallejo", "Model Color", "70.886b", "Green Grey Light", "#9aaa9a"),
	P("Vallejo", "Model Color", "70.907", "Pale Grey Blue", "#a5b0b8"),
	P("Vallejo", "Model Color", "70.870", "Medium Sea Grey", "#8a9298"),
	P("Vallejo", "Model Color", "70.869", "Basalt Grey", "#5a5e62"),
	P("Vallejo", "Model Color", "70.991", "Dark Sea Grey", "#5a6268"),
	P("Vallejo", "Model Color", "70.868", "Dark Sea Blue", "#2a4a6a"),
	P("Vallejo", "Model Color", "70.965", "Prussian Blue", "#1a2a4a"),
	P("Vallejo", "Model Color", "70.930", "Dark Blue", "#173a70"),
	P("Vallejo", "Model Color", "70.925", "Blue", "#1e5aa8"),
	P("Vallejo", "Model Color", "70.841", "Andrea Blue", "#2a6aba"),
	P("Vallejo", "Model Color", "70.963", "Medium Blue", "#3d68b5"),
	P("Vallejo", "Model Color", "70.961", "Sky Blue", "#6aa8d8"),
	P("Vallejo", "Model Color", "70.844", "Deep Sky Blue", "#3a86c8"),
	P("Vallejo", "Model Color", "70.962", "Flat Blue", "#2a5a9a"),
	P("Vallejo", "Model Color", "70.808", "Blue Green", "#2a6a6a"),
	P("Vallejo", "Model Color", "70.966", "Turquoise", "#2a8a8a"),
	P("Vallejo", "Model Color", "70.838", "Emerald", "#1a7a4a"),
	P("Vallejo", "Model Color", "70.969", "Park Green Flat", "#3a6a3a"),
	P("Vallejo", "Model Color", "70.968", "Flat Green", "#3a6b3a"),
	P("Vallejo", "Model Color", "70.967", "Olive Green", "#4a5a2a"),
	P("Vallejo", "Model Color", "70.894", "Russian Green", "#4a5a3a"),
	P("Vallejo", "Model Color", "70.890", "Refractive Green", "#3a6a3a"),
	P("Vallejo", "Model Color", "70.891", "Intermediate Green", "#5f8a4a"),
	P("Vallejo", "Model Color", "70.942", "Light Green", "#7fa855"),
	P("Vallejo", "Model Color", "70.827", "Lime Green", "#8aba3a"),
	P("Vallejo", "Model Color", "70.850", "Medium Olive", "#6a7a3a"),
	P("Vallejo", "Model Color", "70.881", "Yellow Green", "#8a9a3a"),
	P("Vallejo", "Model Color", "70.980", "Green Ochre", "#8a7a3a"),
	P("Vallejo", "Model Color", "70.914", "Green Ochre Light", "#a8984a"),
	P("Vallejo", "Model Color", "70.879", "Green Brown", "#7a6a2c"),
	P("Vallejo", "Model Color", "70.875", "Beige Brown", "#8a6a4a"),
	P("Vallejo", "Model Color", "70.873", "US Field Drab", "#6a5a3a"),
	P("Vallejo", "Model Color", "70.921", "English Uniform", "#8a6a3a"),
	P("Vallejo", "Model Color", "70.988", "Khaki", "#8a7a54"),
	P("Vallejo", "Model Color", "70.976", "Buff", "#c4a678"),
	P("Vallejo", "Model Color", "70.917", "Beige", "#c8b088"),
	P("Vallejo", "Model Color", "70.918", "Ivory", "#e8dab8"),
	P("Vallejo", "Model Color", "70.819", "Iraqi Sand", "#d0b888"),
	P("Vallejo", "Model Color", "70.977", "Desert Yellow", "#c8a468"),
	P("Vallejo", "Model Color", "70.916", "Sand Yellow", "#d0b078"),
	P("Vallejo", "Model Color", "70.953", "Flat Yellow", "#f2c81c"),
	P("Vallejo", "Model Color", "70.915", "Deep Yellow", "#e8b01c"),
	P("Vallejo", "Model Color", "70.948", "Golden Yellow", "#e8a41c"),
	P("Vallejo", "Model Color", "70.858", "Ice Yellow", "#f0e08a"),
	P("Vallejo", "Model Color", "70.806", "German Yellow", "#d0a83a"),
	P("Vallejo", "Model Color", "70.803", "Brown Rose", "#c88868"),
	P("Vallejo", "Model Color", "70.845", "Sunny Skintone", "#e6b48a"),
	P("Vallejo", "Model Color", "70.815", "Basic Skintone", "#e0a888"),
	P("Vallejo", "Model Color", "70.955", "Flat Flesh", "#e8b891"),
	P("Vallejo", "Model Color", "70.928", "Light Flesh", "#f0c8a8"),
	P("Vallejo", "Model Color", "70.860", "Medium Fleshtone", "#d09870"),
	P("Vallejo", "Model Color", "70.804", "Beige Red", "#c88870"),
	P("Vallejo", "Model Color", "70.843", "Cork Brown", "#a87850"),
	P("Vallejo", "Model Color", "70.981", "Orange Brown", "#a05320"),
	P("Vallejo", "Model Color", "70.982", "Cavalry Brown", "#7a3a20"),
	P("Vallejo", "Model Color", "70.984", "Flat Brown", "#5a3a24"),
	P("Vallejo", "Model Color", "70.941", "Burnt Umber", "#4a2e1e"),
	P("Vallejo", "Model Color", "70.940", "Leather Brown", "#6a3e20"),
	P("Vallejo", "Model Color", "70.983", "Flat Earth", "#7a5a3a"),
	P("Vallejo", "Model Color", "70.872", "Chocolate Brown", "#4a2a18"),
	P("Vallejo", "Model Color", "70.822", "Black Brown", "#2a1a10"),
	P("Vallejo", "Model Color", "70.871", "Leather Belt", "#5a3018"),
	P("Vallejo", "Model Color", "70.846", "Mahogany Brown", "#5a2018"),
	P("Vallejo", "Model Color", "70.828", "Woodgrain", "#6a3a20"),
	P("Vallejo", "Model Color", "70.856", "Ochre Brown", "#8a5a2a"),
	P("Vallejo", "Model Color", "70.877", "Goldbrown", "#a8782a"),
	P("Vallejo", "Model Color", "70.911", "Light Orange", "#f0863a"),
	P("Vallejo", "Model Color", "70.910", "Orange Red", "#d64620"),
	P("Vallejo", "Model Color", "70.851", "Bright Orange", "#e8681a"),
	P("Vallejo", "Model Color", "70.956", "Clear Orange", "#e85820"),
	P("Vallejo", "Model Color", "70.909", "Vermillion", "#c8341b"),
	P("Vallejo", "Model Color", "70.947", "Dark Vermillion", "#b52121"),
	P("Vallejo", "Model Color", "70.926", "Red", "#c8261b"),
	P("Vallejo", "Model Color", "70.957", "Flat Red", "#a71f1f"),
	P("Vallejo", "Model Color", "70.908", "Carmine Red", "#9a1828"),
	P("Vallejo", "Model Color", "70.859", "Black Red", "#4a0a10"),
	P("Vallejo", "Model Color", "70.814", "Burnt Red", "#6a1a1a"),
	P("Vallejo", "Model Color", "70.982b", "Cadmium Red", "#c02020"),
	P("Vallejo", "Model Color", "70.946", "Dark Red", "#7a1018"),
	P("Vallejo", "Model Color", "70.957b", "Scarlet", "#c02028"),
	P("Vallejo", "Model Color", "70.812", "Violet Red", "#8a1a4a"),
	P("Vallejo", "Model Color", "70.811", "Blue Violet", "#4a2a6a"),
	P("Vallejo", "Model Color", "70.960", "Violet", "#5a2a7a"),
	P("Vallejo", "Model Color", "70.959", "Purple", "#6a2a8a"),
	P("Vallejo", "Model Color", "70.810", "Royal Purple", "#4a1a5a"),
	P("Vallejo", "Model Color", "70.899", "Dark Purple", "#3a1a4a"),
	P("Vallejo", "Model Color", "70.803b", "Lilac", "#b08ac0"),
	P("Vallejo", "Model Color", "70.958", "Pink", "#e08aaa"),
	P("Vallejo", "Model Color", "70.945", "Magenta", "#c02a6a"),
	P("Vallejo", "Model Color", "70.803c", "Rose", "#d06a8a"),
	P("Vallejo", "Model Color", "70.997", "Silver", "#c8ccd0"),
	P("Vallejo", "Model Color", "70.996", "Gold", "#b48a3a"),
	P("Vallejo", "Model Color", "70.801", "Brass", "#b89850"),
	P("Vallejo", "Model Color", "70.998", "Bronze", "#8a6a3a"),
	P("Vallejo", "Model Color", "70.863", "Gunmetal Grey", "#5a5e62"),
	P("Vallejo", "Model Color", "70.864", "Natural Steel", "#8a8e92"),
	P("Vallejo", "Model Color", "70.865", "Oily Steel", "#6a6e72"),
	P("Vallejo", "Model Color", "70.800", "Gunmetal Blue", "#4a5a6a"),
	P("Vallejo", "Model Color", "70.777", "Yellow Brass", "#c8a850"),
	P("Vallejo", "Model Color", "70.778", "Gold Yellow", "#d0a840"),
	P("Vallejo", "Model Color", "70.820", "Offwhite", "#e8e4d8"),
	P("Vallejo", "Model Color", "70.837", "Pale Sand", "#e0d0b0"),
	P("Vallejo", "Model Color", "70.847", "Dark Sand", "#b89868"),
	P("Vallejo", "Model Color", "70.882", "Middlestone", "#a89058"),
	P("Vallejo", "Model Color", "70.883", "Silver Grey", "#b0b4b0"),
	P("Vallejo", "Model Color", "70.884", "Stone Grey", "#9a9a88"),
	P("Vallejo", "Model Color", "70.885", "Pastel Green", "#a0b898"),
	P("Vallejo", "Model Color", "70.887", "US Olive Drab", "#4a4a2a"),
	P("Vallejo", "Model Color", "70.888", "Olive Grey", "#5a5a3a"),
	P("Vallejo", "Model Color", "70.889", "Olive Brown", "#4a3a20"),
	P("Vallejo", "Model Color", "70.892", "Yellow Olive", "#6a6a2a"),
	P("Vallejo", "Model Color", "70.893", "US Dark Green", "#2a3a22"),
	P("Vallejo", "Model Color", "70.895", "Gunship Green", "#3a4a30"),
	P("Vallejo", "Model Color", "70.896", "Extra Dark Green", "#1a2a18"),
	P("Vallejo", "Model Color", "70.897", "Bronze Green", "#3a4a34"),
	P("Vallejo", "Model Color", "70.898", "Dark Sea Green", "#2a4a3a"),
	P("Vallejo", "Model Color", "70.900", "French Mirage Blue", "#5a6a7a"),
	P("Vallejo", "Model Color", "70.901", "Pastel Blue", "#a0b8c8"),
	P("Vallejo", "Model Color", "70.902", "Azure", "#4a8aba"),
	P("Vallejo", "Model Color", "70.903", "Intermediate Blue", "#4a6a8a"),
	P("Vallejo", "Model Color", "70.904", "Dark Blue Grey", "#3a4a5a"),
	P("Vallejo", "Model Color", "70.905", "Blue Grey Pale", "#8a9aaa"),
	P("Vallejo", "Model Color", "70.906", "Pale Blue", "#a8c0d0"),
	P("Vallejo", "Model Color", "70.912", "Tan Yellow", "#d0a860"),
	P("Vallejo", "Model Color", "70.913", "Yellow Ochre", "#c8983a"),
	P("Vallejo", "Model Color", "70.919", "Foundation White", "#f0f0ec"),
	P("Vallejo", "Model Color", "70.920", "German Uniform", "#4a5a4a"),
	P("Vallejo", "Model Color", "70.922", "Uniform Green", "#4a5a3a"),
	P("Vallejo", "Model Color", "70.923", "Japanese Uniform WWII", "#6a6a4a"),
	P("Vallejo", "Model Color", "70.924", "Russian Uniform WWII", "#5a6a4a"),
	P("Vallejo", "Model Color", "70.927", "Dark Flesh", "#a86848"),
	P("Vallejo", "Model Color", "70.929", "Light Brown", "#8a5a3a"),
	P("Vallejo", "Model Color", "70.931", "Magenta", "#b02868"),
	P("Vallejo", "Model Color", "70.932", "Transparent Blue", "#2a5aaa"),
	P("Vallejo", "Model Color", "70.933", "Transparent Red", "#c02020"),
	P("Vallejo", "Model Color", "70.934", "Transparent Yellow", "#e8c020"),
	P("Vallejo", "Model Color", "70.935", "Transparent Orange", "#e8681a"),
	P("Vallejo", "Model Color", "70.936", "Transparent Green", "#2a8a3a"),
	P("Vallejo", "Model Color", "70.937", "Transparent Violet", "#6a2a8a"),
	P("Vallejo", "Model Color", "70.938", "Transparent Brown", "#5a2a1a"),
	P("Vallejo", "Model Color", "70.939", "Smoke", "#3a3a30"),
	P("Vallejo", "Model Color", "70.943", "Blue Grey", "#6a7a8a"),
	P("Vallejo", "Model Color", "70.944", "Old Wood", "#8a6a4a"),
	P("Vallejo", "Model Color", "70.949", "Light Yellow", "#f0d85a"),
	P("Vallejo", "Model Color", "70.952", "Lemon Yellow", "#f0e03a"),
	P("Vallejo", "Model Color", "70.954", "Yellow Green", "#a8b83a"),
	P("Vallejo", "Model Color", "70.970", "Deep Green", "#1a4a2a"),
	P("Vallejo", "Model Color", "70.971", "Dark Green", "#1a3a22"),
	P("Vallejo", "Model Color", "70.972", "Light Green Blue", "#5a9a8a"),
	P("Vallejo", "Model Color", "70.973", "US Light Green", "#6a8a5a"),
	P("Vallejo", "Model Color", "70.974", "Green Sky", "#7a9a7a"),
	P("Vallejo", "Model Color", "70.975", "Military Green", "#3a4a2a"),
	P("Vallejo", "Model Color", "70.978", "Dark Yellow", "#b89848"),
	P("Vallejo", "Model Color", "70.979", "German Camo Dark Green", "#2a3a20"),
	P("Vallejo", "Model Color", "70.985", "Hull Red", "#5a1a1a"),
	P("Vallejo", "Model Color", "70.986", "Deck Tan", "#c8b088"),
	P("Vallejo", "Model Color", "70.987", "Medium Grey", "#8a8e90"),
	P("Vallejo", "Model Color", "70.989", "Sky Grey", "#a8b0b0"),
	P("Vallejo", "Model Color", "70.999", "Copper", "#a05a2a"),
	P("Vallejo", "Model Color", "70.793", "Light Flesh", "#f0d0b0"),
	P("Vallejo", "Model Color", "70.794", "Buff White", "#e8e0d0"),
	P("Vallejo", "Model Color", "70.795", "Russian Green Light", "#6a7a5a"),
	P("Vallejo", "Model Color", "70.796", "Ivory Soft", "#f0e8d0"),
	P("Vallejo", "Model Color", "70.797", "Light Grey Green", "#a0b0a0"),
	P("Vallejo", "Model Color", "70.798", "German Fieldgrey WWII", "#5a6250"),
	P("Vallejo", "Model Color", "70.799", "NATO Black", "#1a1c1e"),
	P("Vallejo", "Model Color", "70.850b", "Medium Olive Soft", "#7a8a4a"),
	P("Vallejo", "Model Air", "71.001", "White", "#f7f7f4"),
	P("Vallejo", "Model Air", "71.057", "Black", "#0d0d0d"),
	P("Vallejo", "Model Air", "71.084", "Fire Red", "#b02020"),
	P("Vallejo", "Model Air", "71.088", "Signal Yellow", "#f0c218"),
	P("Vallejo", "Model Air", "71.090", "Signal Green", "#2a7a44"),
	P("Vallejo", "Model Air", "71.087", "Signal Blue", "#1e5aa8"),
	P("Vallejo", "Model Air", "71.279", "Insignia Red", "#8a1e1e"),
	P("Vallejo", "Model Air", "71.020", "Yellow Olive", "#7a6a2e"),
	P("Vallejo", "Model Air", "71.096", "Pale Grey Blue", "#a5b0b8"),
	P("Vallejo", "Model Air", "71.048", "Field Blue", "#4a6a80"),
	P("Vallejo", "Model Air", "71.108", "Dark Sea Blue", "#2a4a6a"),
	P("Vallejo", "Model Air", "71.070", "Rust", "#8a3a1e"),
	P("Vallejo", "Model Air", "71.038", "Camo Black Brown", "#2a1e18"),
	P("Vallejo", "Model Air", "71.002", "Yellow", "#f0c818"),
	P("Vallejo", "Model Air", "71.003", "Red RLM23", "#a01820"),
	P("Vallejo", "Model Air", "71.004", "Blue", "#1a5aa8"),
	P("Vallejo", "Model Air", "71.005", "Light Blue RLM65", "#7aa8c0"),
	P("Vallejo", "Model Air", "71.006", "Light Camo Green", "#6a8a4a"),
	P("Vallejo", "Model Air", "71.007", "Olive Green", "#4a5a2a"),
	P("Vallejo", "Model Air", "71.008", "Pale Yellow", "#e8d878"),
	P("Vallejo", "Model Air", "71.009", "Eggshell", "#e8e0c8"),
	P("Vallejo", "Model Air", "71.010", "Interior Green", "#5a7a4a"),
	P("Vallejo", "Model Air", "71.011", "Dark Green RLM71", "#2a3a20"),
	P("Vallejo", "Model Air", "71.012", "Dark Green", "#1a3a22"),
	P("Vallejo", "Model Air", "71.013", "Yellow Olive", "#6a6a2a"),
	P("Vallejo", "Model Air", "71.014", "Gunship Green", "#3a4a30"),
	P("Vallejo", "Model Air", "71.015", "Dark Green RLM70", "#1a2a18"),
	P("Vallejo", "Model Air", "71.016", "US Dark Green", "#2a3a22"),
	P("Vallejo", "Model Air", "71.017", "Russian Green", "#4a5a3a"),
	P("Vallejo", "Model Air", "71.018", "Black Green", "#1a2a20"),
	P("Vallejo", "Model Air", "71.019", "Russian Green 4BO", "#3a4a2a"),
	P("Vallejo", "Model Air", "71.021", "Black Green", "#142018"),
	P("Vallejo", "Model Air", "71.022", "Camo Green", "#4a5a34"),
	P("Vallejo", "Model Air", "71.023", "Camo Green Soft", "#5a6a3a"),
	P("Vallejo", "Model Air", "71.024", "Khaki Brown", "#6a5a3a"),
	P("Vallejo", "Model Air", "71.025", "Dark Yellow", "#b89848"),
	P("Vallejo", "Model Air", "71.026", "US Flat Brown", "#5a3a24"),
	P("Vallejo", "Model Air", "71.027", "Light Brown", "#8a5a3a"),
	P("Vallejo", "Model Air", "71.028", "Sand Yellow", "#d0b078"),
	P("Vallejo", "Model Air", "71.029", "Dark Earth", "#7a5a3a"),
	P("Vallejo", "Model Air", "71.030", "Green Brown", "#7a6a2c"),
	P("Vallejo", "Model Air", "71.031", "Middlestone", "#a89058"),
	P("Vallejo", "Model Air", "71.032", "Golden Brown", "#a8782a"),
	P("Vallejo", "Model Air", "71.033", "Ochre", "#c8983a"),
	P("Vallejo", "Model Air", "71.034", "Sand Brown", "#a88858"),
	P("Vallejo", "Model Air", "71.035", "Camo Brown", "#6a4a2a"),
	P("Vallejo", "Model Air", "71.036", "Mahogany", "#5a2018"),
	P("Vallejo", "Model Air", "71.037", "Mud Brown", "#5a3a20"),
	P("Vallejo", "Model Air", "71.039", "Hull Red", "#5a1a1a"),
	P("Vallejo", "Model Air", "71.040", "Burnt Umber", "#4a2e1e"),
	P("Vallejo", "Model Air", "71.041", "Armour Brown", "#4a2a18"),
	P("Vallejo", "Model Air", "71.042", "Camo Black Brown", "#2a1810"),
	P("Vallejo", "Model Air", "71.043", "Olive Drab", "#4a4a2a"),
	P("Vallejo", "Model Air", "71.044", "Grey Blue", "#5a6a7a"),
	P("Vallejo", "Model Air", "71.045", "US Light Grey", "#b0b4b8"),
	P("Vallejo", "Model Air", "71.046", "Pale Blue Grey", "#a8b0b8"),
	P("Vallejo", "Model Air", "71.047", "Grey", "#7a7d80"),
	P("Vallejo", "Model Air", "71.049", "Olive Grey", "#5a5a3a"),
	P("Vallejo", "Model Air", "71.050", "Light Grey", "#b0b4b8"),
	P("Vallejo", "Model Air", "71.051", "Neutral Grey", "#7a7d80"),
	P("Vallejo", "Model Air", "71.052", "German Grey", "#2c2e2f"),
	P("Vallejo", "Model Air", "71.053", "Dark Sea Grey", "#5a6268"),
	P("Vallejo", "Model Air", "71.054", "Dark Grey Blue", "#3a4a5a"),
	P("Vallejo", "Model Air", "71.055", "Black Grey", "#2a2a2a"),
	P("Vallejo", "Model Air", "71.056", "Panzer Dark Grey", "#2a2c2e"),
	P("Vallejo", "Model Air", "71.058", "Grey Green", "#6a7a6a"),
	P("Vallejo", "Model Air", "71.059", "Grey Violet", "#6a5a6a"),
	P("Vallejo", "Model Air", "71.060", "Light Grey Green", "#a0b0a0"),
	P("Vallejo", "Model Air", "71.061", "Grey Green Soft", "#8a9a8a"),
	P("Vallejo", "Model Air", "71.062", "Aluminium", "#c0c4c8"),
	P("Vallejo", "Model Air", "71.063", "Silver", "#c8ccd0"),
	P("Vallejo", "Model Air", "71.064", "Chrome", "#d0d4d8"),
	P("Vallejo", "Model Air", "71.065", "Steel", "#8a8e92"),
	P("Vallejo", "Model Air", "71.066", "Gold", "#b48a3a"),
	P("Vallejo", "Model Air", "71.067", "Bright Brass", "#c8a850"),
	P("Vallejo", "Model Air", "71.068", "Copper", "#a05a2a"),
	P("Vallejo", "Model Air", "71.069", "Rust", "#8a3a1e"),
	P("Vallejo", "Model Air", "71.071", "Arctic White", "#f8f8f4"),
	P("Vallejo", "Model Air", "71.072", "Gunmetal", "#5a5e62"),
	P("Vallejo", "Model Air", "71.073", "Black", "#0a0a0a"),
	P("Vallejo", "Model Air", "71.074", "Beige", "#c8b088"),
	P("Vallejo", "Model Air", "71.075", "Ivory", "#e8dab8"),
	P("Vallejo", "Model Air", "71.076", "Skin Tone", "#e0a888"),
	P("Vallejo", "Model Air", "71.077", "Wood", "#6a3a20"),
	P("Vallejo", "Model Air", "71.078", "Gold Yellow", "#e8a41c"),
	P("Vallejo", "Model Air", "71.079", "Orange", "#e8681a"),
	P("Vallejo", "Model Air", "71.080", "Rust", "#9a3a18"),
	P("Vallejo", "Model Air", "71.081", "Tank Brown", "#5a2e1a"),
	P("Vallejo", "Model Air", "71.082", "Fluorescent Red", "#ff2020"),
	P("Vallejo", "Model Air", "71.083", "Fluorescent Orange", "#ff6810"),
	P("Vallejo", "Model Air", "71.085", "Ferrari Red", "#c81818"),
	P("Vallejo", "Model Air", "71.086", "Light Red", "#d04040"),
	P("Vallejo", "Model Air", "71.089", "Light Green", "#7fa855"),
	P("Vallejo", "Model Air", "71.091", "Signal Violet", "#6a2a8a"),
	P("Vallejo", "Model Air", "71.092", "Medium Blue", "#3d68b5"),
	P("Vallejo", "Model Air", "71.093", "NATO Green", "#3a4a34"),
	P("Vallejo", "Model Air", "71.094", "Green Zinc Chromate", "#6a8a4a"),
	P("Vallejo", "Model Air", "71.095", "Pale Blue", "#a8c0d0"),
	P("Vallejo", "Model Air", "71.097", "Medium Gunship Grey", "#5a6268"),
	P("Vallejo", "Model Air", "71.098", "Light Blue", "#7aa8c8"),
	P("Vallejo", "Model Air", "71.099", "Sky Blue", "#6aa8d8"),
	P("Vallejo", "Model Air", "71.100", "Red Blue", "#4a2a5a"),
	P("Vallejo", "Model Air", "71.101", "Light Violet", "#a08ac0"),
	P("Vallejo", "Model Air", "71.102", "Red", "#c02020"),
	P("Vallejo", "Model Air", "71.103", "Blue Grey Pale", "#8a9aaa"),
	P("Vallejo", "Model Air", "71.104", "Green Blue", "#2a6a6a"),
	P("Vallejo", "Model Air", "71.105", "Blue Grey", "#6a7a8a"),
	P("Vallejo", "Model Air", "71.106", "Blue Grey Soft", "#7a8a9a"),
	P("Vallejo", "Model Air", "71.107", "USAF Blue", "#2a4a7a"),
	P("Vallejo", "Model Air", "71.109", "Faded PRU Blue", "#5a7a8a"),
	P("Vallejo", "Model Air", "71.110", "US Dark Green", "#2a3a22"),
	P("Vallejo", "Model Air", "71.111", "USA Green", "#3a4a2a"),
	P("Vallejo", "Model Air", "71.112", "US Green Soft", "#4a5a3a"),
	P("Vallejo", "Model Air", "71.113", "IJN Green", "#3a4a2a"),
	P("Vallejo", "Model Air", "71.114", "Medium Grey", "#8a8e90"),
	P("Vallejo", "Model Air", "71.115", "Blue Grey Medium", "#5a6a7a"),
	P("Vallejo", "Model Air", "71.116", "Camo Grey Green", "#6a7a5a"),
	P("Vallejo", "Model Air", "71.117", "Camo Medium Brown", "#7a5a3a"),
	P("Vallejo", "Model Air", "71.118", "Camo Medium Grey", "#7a7e70"),
	P("Vallejo", "Model Air", "71.119", "Camo Light Green", "#6a8a5a"),
	P("Vallejo", "Model Air", "71.120", "Grey 01", "#5a5e62"),
	P("Vallejo", "Model Air", "71.121", "Grey 02", "#606468"),
	P("Vallejo", "Model Air", "71.122", "Grey 03", "#666a6e"),
	P("Vallejo", "Model Air", "71.123", "Grey 04", "#6c7074"),
	P("Vallejo", "Model Air", "71.124", "Grey 05", "#72767a"),
	P("Vallejo", "Model Air", "71.125", "Grey 06", "#787c80"),
	P("Vallejo", "Model Air", "71.126", "Grey 07", "#7e8286"),
	P("Vallejo", "Model Air", "71.127", "Grey 08", "#84888c"),
	P("Vallejo", "Model Air", "71.128", "Grey 09", "#8a8e92"),
	P("Vallejo", "Model Air", "71.129", "Grey 10", "#909498"),
	P("Vallejo", "Model Air", "71.130", "Grey 11", "#969a9e"),
	P("Vallejo", "Model Air", "71.131", "Grey 12", "#9ca0a4"),
	P("Vallejo", "Model Air", "71.132", "Grey 13", "#a2a6aa"),
	P("Vallejo", "Model Air", "71.133", "Grey 14", "#a8acb0"),
	P("Vallejo", "Model Air", "71.134", "Grey 15", "#aeb2b6"),
	P("Vallejo", "Model Air", "71.135", "Grey 16", "#b4b8bc"),
	P("Vallejo", "Model Air", "71.136", "Grey 17", "#babec2"),
	P("Vallejo", "Model Air", "71.137", "Grey 18", "#c0c4c8"),
	P("Vallejo", "Model Air", "71.138", "Grey 19", "#c6cace"),
	P("Vallejo", "Model Air", "71.139", "Grey 20", "#ccd0d4"),
	P("Vallejo", "Model Air", "71.140", "Green 01", "#325032"),
	P("Vallejo", "Model Air", "71.141", "Green 02", "#355635"),
	P("Vallejo", "Model Air", "71.142", "Green 03", "#385c38"),
	P("Vallejo", "Model Air", "71.143", "Green 04", "#3b623b"),
	P("Vallejo", "Model Air", "71.144", "Green 05", "#3e683e"),
	P("Vallejo", "Model Air", "71.145", "Green 06", "#416e41"),
	P("Vallejo", "Model Air", "71.146", "Green 07", "#447444"),
	P("Vallejo", "Model Air", "71.147", "Green 08", "#477a47"),
	P("Vallejo", "Model Air", "71.148", "Green 09", "#4a804a"),
	P("Vallejo", "Model Air", "71.149", "Green 10", "#4d864d"),
	P("Vallejo", "Model Air", "71.150", "Green 11", "#508c50"),
	P("Vallejo", "Model Air", "71.151", "Green 12", "#539253"),
	P("Vallejo", "Model Air", "71.152", "Green 13", "#569856"),
	P("Vallejo", "Model Air", "71.153", "Green 14", "#599e59"),
	P("Vallejo", "Model Air", "71.154", "Green 15", "#5ca45c"),
	P("Vallejo", "Model Air", "71.155", "Green 16", "#5faa5f"),
	P("Vallejo", "Model Air", "71.156", "Green 17", "#62b062"),
	P("Vallejo", "Model Air", "71.157", "Green 18", "#65b665"),
	P("Vallejo", "Model Air", "71.158", "Green 19", "#68bc68"),
	P("Vallejo", "Model Air", "71.159", "Green 20", "#6bc26b"),
	P("Vallejo", "Model Air", "71.160", "Brown 01", "#5a3c28"),
	P("Vallejo", "Model Air", "71.161", "Brown 02", "#603f2b"),
	P("Vallejo", "Model Air", "71.162", "Brown 03", "#66422e"),
	P("Vallejo", "Model Air", "71.163", "Brown 04", "#6c4531"),
	P("Vallejo", "Model Air", "71.164", "Brown 05", "#724834"),
	P("Vallejo", "Model Air", "71.165", "Brown 06", "#784b37"),
	P("Vallejo", "Model Air", "71.166", "Brown 07", "#7e4e3a"),
	P("Vallejo", "Model Air", "71.167", "Brown 08", "#84513d"),
	P("Vallejo", "Model Air", "71.168", "Brown 09", "#8a5440"),
	P("Vallejo", "Model Air", "71.169", "Brown 10", "#905743"),
	P("Vallejo", "Model Air", "71.170", "Brown 11", "#965a46"),
	P("Vallejo", "Model Air", "71.171", "Brown 12", "#9c5d49"),
	P("Vallejo", "Model Air", "71.172", "Brown 13", "#a2604c"),
	P("Vallejo", "Model Air", "71.173", "Brown 14", "#a8634f"),
	P("Vallejo", "Model Air", "71.174", "Brown 15", "#ae6652"),
	P("Vallejo", "Model Air", "71.175", "Brown 16", "#b46955"),
	P("Vallejo", "Model Air", "71.176", "Brown 17", "#ba6c58"),
	P("Vallejo", "Model Air", "71.177", "Brown 18", "#c06f5b"),
	P("Vallejo", "Model Air", "71.178", "Brown 19", "#c6725e"),
	P("Vallejo", "Model Air", "71.179", "Brown 20", "#cc7561"),
	P("Vallejo", "Model Air", "71.180", "Blue 01", "#284678"),
	P("Vallejo", "Model Air", "71.181", "Blue 02", "#2b497e"),
	P("Vallejo", "Model Air", "71.182", "Blue 03", "#2e4c84"),
	P("Vallejo", "Model Air", "71.183", "Blue 04", "#314f8a"),
	P("Vallejo", "Model Air", "71.184", "Blue 05", "#345290"),
	P("Vallejo", "Model Air", "71.185", "Blue 06", "#375596"),
	P("Vallejo", "Model Air", "71.186", "Blue 07", "#3a589c"),
	P("Vallejo", "Model Air", "71.187", "Blue 08", "#3d5ba2"),
	P("Vallejo", "Model Air", "71.188", "Blue 09", "#405ea8"),
	P("Vallejo", "Model Air", "71.189", "Blue 10", "#4361ae"),
	P("Vallejo", "Model Air", "71.190", "Blue 11", "#4664b4"),
	P("Vallejo", "Model Air", "71.191", "Blue 12", "#4967ba"),
	P("Vallejo", "Model Air", "71.192", "Blue 13", "#4c6ac0"),
	P("Vallejo", "Model Air", "71.193", "Blue 14", "#4f6dc6"),
	P("Vallejo", "Model Air", "71.194", "Blue 15", "#5270cc"),
	P("Vallejo", "Model Air", "71.195", "Blue 16", "#5573d2"),
	P("Vallejo", "Model Air", "71.196", "Blue 17", "#5876d8"),
	P("Vallejo", "Model Air", "71.197", "Blue 18", "#5b79de"),
	P("Vallejo", "Model Air", "71.198", "Blue 19", "#5e7ce4"),
	P("Vallejo", "Model Air", "71.199", "Blue 20", "#617fea"),
	P("Vallejo", "Model Air", "71.200", "Sand 01", "#b49664"),
	P("Vallejo", "Model Air", "71.201", "Sand 02", "#ba9c67"),
	P("Vallejo", "Model Air", "71.202", "Sand 03", "#c0a26a"),
	P("Vallejo", "Model Air", "71.203", "Sand 04", "#c6a86d"),
	P("Vallejo", "Model Air", "71.204", "Sand 05", "#ccae70"),
	P("Vallejo", "Model Air", "71.205", "Sand 06", "#d2b473"),
	P("Vallejo", "Model Air", "71.206", "Sand 07", "#d8ba76"),
	P("Vallejo", "Model Air", "71.207", "Sand 08", "#dec079"),
	P("Vallejo", "Model Air", "71.208", "Sand 09", "#e4c67c"),
	P("Vallejo", "Model Air", "71.209", "Sand 10", "#eacc7f"),
	P("Vallejo", "Model Air", "71.210", "Sand 11", "#f0d282"),
	P("Vallejo", "Model Air", "71.211", "Sand 12", "#f6d885"),
	P("Vallejo", "Model Air", "71.212", "Sand 13", "#fcde88"),
	P("Vallejo", "Model Air", "71.213", "Sand 14", "#ffe48b"),
	P("Vallejo", "Model Air", "71.214", "Sand 15", "#ffea8e"),
	P("Vallejo", "Model Air", "71.215", "Sand 16", "#fff091"),
	P("Vallejo", "Model Air", "71.216", "Sand 17", "#fff694"),
	P("Vallejo", "Model Air", "71.217", "Sand 18", "#fffc97"),
	P("Vallejo", "Model Air", "71.218", "Sand 19", "#ffff9a"),
	P("Vallejo", "Model Air", "71.219", "Sand 20", "#ffff9d"),
	P("Vallejo", "Model Air", "71.220", "Red 01", "#a02828"),
	P("Vallejo", "Model Air", "71.221", "Red 02", "#a62b2b"),
	P("Vallejo", "Model Air", "71.222", "Red 03", "#ac2e2e"),
	P("Vallejo", "Model Air", "71.223", "Red 04", "#b23131"),
	P("Vallejo", "Model Air", "71.224", "Red 05", "#b83434"),
	P("Vallejo", "Model Air", "71.225", "Red 06", "#be3737"),
	P("Vallejo", "Model Air", "71.226", "Red 07", "#c43a3a"),
	P("Vallejo", "Model Air", "71.227", "Red 08", "#ca3d3d"),
	P("Vallejo", "Model Air", "71.228", "Red 09", "#d04040"),
	P("Vallejo", "Model Air", "71.229", "Red 10", "#d64343"),
	P("Vallejo", "Model Air", "71.230", "Red 11", "#dc4646"),
	P("Vallejo", "Model Air", "71.231", "Red 12", "#e24949"),
	P("Vallejo", "Model Air", "71.232", "Red 13", "#e84c4c"),
	P("Vallejo", "Model Air", "71.233", "Red 14", "#ee4f4f"),
	P("Vallejo", "Model Air", "71.234", "Red 15", "#f45252"),
	P("Vallejo", "Model Air", "71.235", "Red 16", "#fa5555"),
	P("Vallejo", "Model Air", "71.236", "Red 17", "#ff5858"),
	P("Vallejo", "Model Air", "71.237", "Red 18", "#ff5b5b"),
	P("Vallejo", "Model Air", "71.238", "Red 19", "#ff5e5e"),
	P("Vallejo", "Model Air", "71.239", "Red 20", "#ff6161"),
	P("Vallejo", "Model Air", "71.240", "Olive 01", "#465028"),
	P("Vallejo", "Model Air", "71.241", "Olive 02", "#49562b"),
	P("Vallejo", "Model Air", "71.242", "Olive 03", "#4c5c2e"),
	P("Vallejo", "Model Air", "71.243", "Olive 04", "#4f6231"),
	P("Vallejo", "Model Air", "71.244", "Olive 05", "#526834"),
	P("Vallejo", "Model Air", "71.245", "Olive 06", "#556e37"),
	P("Vallejo", "Model Air", "71.246", "Olive 07", "#58743a"),
	P("Vallejo", "Model Air", "71.247", "Olive 08", "#5b7a3d"),
	P("Vallejo", "Model Air", "71.248", "Olive 09", "#5e8040"),
	P("Vallejo", "Model Air", "71.249", "Olive 10", "#618643"),
	P("Vallejo", "Model Air", "71.250", "Olive 11", "#648c46"),
	P("Vallejo", "Model Air", "71.251", "Olive 12", "#679249"),
	P("Vallejo", "Model Air", "71.252", "Olive 13", "#6a984c"),
	P("Vallejo", "Model Air", "71.253", "Olive 14", "#6d9e4f"),
	P("Vallejo", "Model Air", "71.254", "Olive 15", "#70a452"),
	P("Vallejo", "Model Air", "71.255", "Olive 16", "#73aa55"),
	P("Vallejo", "Model Air", "71.256", "Olive 17", "#76b058"),
	P("Vallejo", "Model Air", "71.257", "Olive 18", "#79b65b"),
	P("Vallejo", "Model Air", "71.258", "Olive 19", "#7cbc5e"),
	P("Vallejo", "Model Air", "71.259", "Olive 20", "#7fc261"),
	P("Vallejo", "Model Air", "71.260", "Metal 01", "#8c9094"),
	P("Vallejo", "Model Air", "71.261", "Metal 02", "#92969a"),
	P("Vallejo", "Model Air", "71.262", "Metal 03", "#989ca0"),
	P("Vallejo", "Model Air", "71.263", "Metal 04", "#9ea2a6"),
	P("Vallejo", "Model Air", "71.264", "Metal 05", "#a4a8ac"),
	P("Vallejo", "Model Air", "71.265", "Metal 06", "#aaaeb2"),
	P("Vallejo", "Model Air", "71.266", "Metal 07", "#b0b4b8"),
	P("Vallejo", "Model Air", "71.267", "Metal 08", "#b6babe"),
	P("Vallejo", "Model Air", "71.268", "Metal 09", "#bcc0c4"),
	P("Vallejo", "Model Air", "71.269", "Metal 10", "#c2c6ca"),
	P("Vallejo", "Model Air", "71.270", "Metal 11", "#c8ccd0"),
	P("Vallejo", "Model Air", "71.271", "Metal 12", "#ced2d6"),
	P("Vallejo", "Model Air", "71.272", "Metal 13", "#d4d8dc"),
	P("Vallejo", "Model Air", "71.273", "Metal 14", "#dadee2"),
	P("Vallejo", "Model Air", "71.274", "Metal 15", "#e0e4e8"),
	P("Vallejo", "Model Air", "71.275", "Metal 16", "#e6eaee"),
	P("Vallejo", "Model Air", "71.276", "Metal 17", "#ecf0f4"),
	P("Vallejo", "Model Air", "71.277", "Metal 18", "#f2f6fa"),
	P("Vallejo", "Model Air", "71.278", "Metal 19", "#f8fcff"),
	P("Vallejo", "Game Color", "72.001", "Dead White", "#f5f5f0"),
	P("Vallejo", "Game Color", "72.051", "Black", "#0a0a0a"),
	P("Vallejo", "Game Color", "72.010", "Bloody Red", "#b81818"),
	P("Vallejo", "Game Color", "72.012", "Scarlet Red", "#c22020"),
	P("Vallejo", "Game Color", "72.008", "Gory Red", "#7a1414"),
	P("Vallejo", "Game Color", "72.020", "Imperial Blue", "#20408a"),
	P("Vallejo", "Game Color", "72.022", "Ultramarine Blue", "#2a4a9a"),
	P("Vallejo", "Game Color", "72.028", "Dark Green", "#12401f"),
	P("Vallejo", "Game Color", "72.033", "Livery Green", "#5a8a3a"),
	P("Vallejo", "Game Color", "72.006", "Sun Yellow", "#f2c81c"),
	P("Vallejo", "Game Color", "72.055", "Polished Gold", "#c89838"),
	P("Vallejo", "Game Color", "72.052", "Silver", "#c8ccd0"),
	P("Vallejo", "Game Color", "72.002", "White Scar Soft", "#f0f0ec"),
	P("Vallejo", "Game Color", "72.003", "Pale Flesh", "#f0c8a8"),
	P("Vallejo", "Game Color", "72.004", "Elf Skintone", "#e8b898"),
	P("Vallejo", "Game Color", "72.005", "Moon Yellow", "#f0d84a"),
	P("Vallejo", "Game Color", "72.007", "Gold Yellow", "#e8a41c"),
	P("Vallejo", "Game Color", "72.009", "Hot Orange", "#e8581a"),
	P("Vallejo", "Game Color", "72.011", "Gory Red Soft", "#8a1818"),
	P("Vallejo", "Game Color", "72.013", "Squid Pink", "#e07aaa"),
	P("Vallejo", "Game Color", "72.014", "Warlord Purple", "#6a2a7a"),
	P("Vallejo", "Game Color", "72.015", "Hexed Lichen", "#4a1a5a"),
	P("Vallejo", "Game Color", "72.016", "Lustria Green", "#2a8a4a"),
	P("Vallejo", "Game Color", "72.017", "Bittersweet", "#c86a4a"),
	P("Vallejo", "Game Color", "72.018", "Screaming Skull Soft", "#e8dcae"),
	P("Vallejo", "Game Color", "72.019", "Night Blue", "#0a1a3a"),
	P("Vallejo", "Game Color", "72.021", "Magic Blue", "#2a6aba"),
	P("Vallejo", "Game Color", "72.023", "Electric Blue", "#1e88c8"),
	P("Vallejo", "Game Color", "72.024", "Turquoise", "#2a8a8a"),
	P("Vallejo", "Game Color", "72.025", "Foul Green", "#4a8a3a"),
	P("Vallejo", "Game Color", "72.026", "Jade Green", "#1a7a5a"),
	P("Vallejo", "Game Color", "72.027", "Scurvy Green", "#3a6a4a"),
	P("Vallejo", "Game Color", "72.029", "Sick Green", "#5a8a3a"),
	P("Vallejo", "Game Color", "72.030", "Goblin Green", "#3a7a3a"),
	P("Vallejo", "Game Color", "72.031", "Leaf Green", "#4a9a3a"),
	P("Vallejo", "Game Color", "72.032", "Scorpy Green", "#6aba3a"),
	P("Vallejo", "Game Color", "72.034", "Bonewhite", "#e0d0a8"),
	P("Vallejo", "Game Color", "72.035", "Dead Flesh", "#c8c8a0"),
	P("Vallejo", "Game Color", "72.036", "Bronze Fleshtone", "#c88860"),
	P("Vallejo", "Game Color", "72.037", "Filthy Brown", "#6a4a2a"),
	P("Vallejo", "Game Color", "72.038", "Scrofulous Brown", "#8a5a2a"),
	P("Vallejo", "Game Color", "72.039", "Plague Brown", "#8a7a3a"),
	P("Vallejo", "Game Color", "72.040", "Leather Brown", "#6a3e20"),
	P("Vallejo", "Game Color", "72.041", "Dwarf Skin", "#d09870"),
	P("Vallejo", "Game Color", "72.042", "Parasite Brown", "#a05a2a"),
	P("Vallejo", "Game Color", "72.043", "Beasty Brown", "#5a2e1a"),
	P("Vallejo", "Game Color", "72.044", "Dark Fleshtone", "#8a4a2a"),
	P("Vallejo", "Game Color", "72.045", "Charred Brown", "#3a1e10"),
	P("Vallejo", "Game Color", "72.046", "Ghostly White Soft", "#e8e8e4"),
	P("Vallejo", "Game Color", "72.047", "Wolf Grey", "#8a8e90"),
	P("Vallejo", "Game Color", "72.048", "Sombre Grey", "#4a4e50"),
	P("Vallejo", "Game Color", "72.049", "Stonewall Grey", "#9a9a90"),
	P("Vallejo", "Game Color", "72.050", "Neutral Grey", "#7a7d80"),
	P("Vallejo", "Game Color", "72.053", "Chainmail Silver", "#a8acb0"),
	P("Vallejo", "Game Color", "72.054", "Gunmetal", "#5a5e62"),
	P("Vallejo", "Game Color", "72.056", "Glorious Gold", "#d4a84a"),
	P("Vallejo", "Game Color", "72.057", "Bright Bronze", "#b89850"),
	P("Vallejo", "Game Color", "72.058", "Dried Blood", "#5a0a10"),
	P("Vallejo", "Game Color", "72.059", "Hammered Copper", "#a06a3a"),
	P("Vallejo", "Game Color", "72.060", "Tinny Tin", "#8a7a5a"),
	P("Vallejo", "Game Color", "72.061", "Khaki", "#8a7a54"),
	P("Vallejo", "Game Color", "72.062", "Earth", "#7a5a3a"),
	P("Vallejo", "Game Color", "72.063", "Bonewhite Soft", "#e8d8b0"),
	P("Vallejo", "Game Color", "72.064", "Yellow Green Soft", "#8aba4a"),
	P("Vallejo", "Game Color", "72.065", "Toxic Yellow Soft", "#d0e03a"),
	P("Vallejo", "Game Color", "72.066", "Olive Green Soft", "#4a5a2a"),
	P("Vallejo", "Game Color", "72.067", "Cayman Green", "#2a5a3a"),
	P("Vallejo", "Game Color", "72.068", "Smokey Ink", "#2a2a28"),
	P("Vallejo", "Game Color", "72.069", "Ink Soft", "#3a3a38"),
	P("Vallejo", "Game Color", "72.070", "Verde Inchiostro", "#1a3a2a"),
	P("Vallejo", "Game Color", "72.071", "Arctic Blue Soft", "#a0c8e0"),
	P("Vallejo", "Game Color", "72.072", "Pitiful Pink Soft", "#f0a0b8"),
	P("Vallejo", "Game Color", "72.073", "Alien Purple Soft", "#7a3a9a"),
	P("Vallejo", "Game Color", "72.074", "Night Blue Soft", "#1a2a5a"),
	P("Vallejo", "Game Color", "72.075", "Steel Soft", "#8a8e92"),
	P("Vallejo", "Game Color", "72.076", "Alien Green Soft", "#3aba5a"),
	P("Vallejo", "Game Color", "72.077", "Gold Soft", "#c89838"),
	P("Vallejo", "Game Color", "72.078", "White Soft", "#f6f6f2"),
	P("Vallejo", "Game Color", "72.079", "Hot Pink Soft", "#e04a8a"),
	P("Vallejo", "Game Color", "72.080", "Marine Blue Soft", "#1a4a8a"),
	P("Vallejo", "Game Color", "72.081", "Mint Soft", "#7adaba"),
	P("Vallejo", "Game Color", "72.082", "Sunset Orange Soft", "#e8782a"),
	P("Vallejo", "Game Color", "72.083", "Ochre Soft", "#c8983a"),
	P("Vallejo", "Game Color", "72.084", "Sand Soft", "#d0b888"),
	P("Vallejo", "Game Color", "72.085", "Yellow Soft", "#f0d020"),
	P("Vallejo", "Game Color", "72.086", "Green Soft", "#3a8a3a"),
	P("Vallejo", "Game Color", "72.087", "Blue Soft", "#2a6aba"),
	P("Vallejo", "Game Color", "72.088", "Violet Soft", "#6a2a8a"),
	P("Vallejo", "Game Color", "72.089", "Brown Soft", "#5a3218"),
	P("Vallejo", "Game Color", "72.090", "Grey Soft", "#7a7d80"),
	P("Vallejo", "Game Color", "72.091", "Black Soft", "#121212"),
	P("Vallejo", "Game Color", "72.092", "Silver Soft", "#c8ccd0"),
	P("Vallejo", "Game Color", "72.093", "Copper Soft", "#a05a2a"),
	P("Vallejo", "Game Color", "72.094", "Brass Soft", "#b89850"),
	P("Vallejo", "Game Color", "72.095", "Bronze Soft", "#8a6a3a"),
	P("Vallejo", "Game Color", "72.096", "Gunmetal Soft", "#5a5e62"),
	P("Vallejo", "Game Color", "72.097", "Verdigris Soft", "#4a8a7a"),
	P("Vallejo", "Game Color", "72.098", "Rust Soft", "#8a3a1e"),
	P("Vallejo", "Game Color", "72.099", "Blood Soft", "#8a1010"),
	P("Vallejo", "Game Color", "72.100", "Ink Black Soft", "#0a0a0a"),
	P("Vallejo", "Game Color", "72.101", "Sepia Ink Soft", "#4a2e1a"),
	P("Vallejo", "Game Color", "72.102", "Blue Ink Soft", "#1a2a5a"),
	P("Vallejo", "Game Color", "72.103", "Red Ink Soft", "#6a0a10"),
	P("Vallejo", "Game Color", "72.104", "Yellow Ink Soft", "#8a6a10"),
	P("Vallejo", "Game Color", "72.105", "Green Ink Soft", "#0a3a1a"),
	P("Vallejo", "Game Color", "72.106", "Violet Ink Soft", "#3a0a3a"),
	P("Vallejo", "Game Color", "72.107", "Brown Ink Soft", "#3a1a0a"),
	P("Vallejo", "Game Color", "72.108", "Flesh Ink Soft", "#6a3a2a"),
	P("Vallejo", "Game Color", "72.109", "Turquoise Soft", "#2a8a8a"),
	P("Vallejo", "Game Color", "72.110", "Sky Soft", "#a0b498"),
	P("Vallejo", "Game Color", "72.111", "Fog Soft", "#a8b0b0"),
	P("Vallejo", "Game Color", "72.112", "Storm Soft", "#5a6a7a"),
	P("Vallejo", "Game Color", "72.113", "Midnight Soft", "#1a1a3a"),
	P("Vallejo", "Game Color", "72.114", "Dawn Soft", "#e0b888"),
	P("Vallejo", "Game Color", "72.115", "Dusk Soft", "#6a4a6a"),
	P("Vallejo", "Game Color", "72.116", "Ash Soft", "#8a8a82"),
	P("Vallejo", "Game Color", "72.117", "Ember Soft", "#c04a1a"),
	P("Vallejo", "Game Color", "72.118", "Ice Soft", "#c8e0f0"),
	P("Vallejo", "Game Color", "72.119", "Lava Soft", "#d03010"),
	P("Vallejo", "Game Color", "72.120", "Toxic Soft", "#6ad030"),
	P("Vallejo", "Metal Color", "77.701", "Aluminium", "#c0c4c8"),
	P("Vallejo", "Metal Color", "77.702", "Duraluminium", "#a8acb0"),
	P("Vallejo", "Metal Color", "77.703", "Dark Aluminium", "#8a8e92"),
	P("Vallejo", "Metal Color", "77.704", "Pale Burnt Metal", "#8a7a6a"),
	P("Vallejo", "Metal Color", "77.705", "Gold", "#c89838"),
	P("Vallejo", "Metal Color", "77.706", "White Aluminium", "#d8dce0"),
	P("Vallejo", "Metal Color", "77.707", "Chrome", "#d0d4d8"),
	P("Vallejo", "Metal Color", "77.710", "Copper", "#a05a2a"),
	P("Vallejo", "Metal Color", "77.711", "Magnesium", "#b0b4b8"),
	P("Vallejo", "Metal Color", "77.712", "Steel", "#8a8e92"),
	P("Vallejo", "Metal Color", "77.713", "Bright Brass", "#c8a850"),
	P("Vallejo", "Metal Color", "77.720", "Burnt Iron", "#4a3a30"),
	P("Vallejo", "Metal Color", "77.721", "Burnt Metal Soft", "#5a4a3a"),
	P("Vallejo", "Metal Color", "77.722", "Oily Steel Soft", "#6a6e72"),
	P("Vallejo", "Metal Color", "77.723", "Exhaust Manifold", "#5a3a2a"),
	P("Vallejo", "Metal Color", "77.724", "Silver Soft", "#c8ccd0"),
	P("Vallejo", "Metal Color", "77.725", "Gold Soft", "#b48a3a"),
	P("Vallejo", "Metal Color", "77.726", "Bronze Soft", "#8a6a3a"),
	P("Vallejo", "Metal Color", "77.727", "Brass Soft", "#b89850"),
	P("Vallejo", "Metal Color", "77.728", "Gunmetal Soft", "#5a5e62"),
	P("Vallejo", "Metal Color", "77.729", "Jet Exhaust", "#2a2a28"),
	P("Vallejo", "Metal Color", "77.730", "Old Gold Soft", "#a8782a"),
	P("Vallejo", "Metal Color", "77.731", "Silver Grey Soft", "#b0b4b0"),
	P("Vallejo", "Metal Color", "77.732", "Polished Steel Soft", "#a8acb0"),
	P("Vallejo", "Metal Color", "77.733", "Rusty Metal Soft", "#7a4a2a"),
	P("Vallejo", "Metal Color", "77.734", "Green Metal Soft", "#4a6a5a"),
	P("Vallejo", "Metal Color", "77.735", "Blue Metal Soft", "#4a5a6a"),
	P("Vallejo", "Metal Color", "77.736", "Violet Metal Soft", "#5a4a6a"),
	P("Vallejo", "Metal Color", "77.737", "Red Metal Soft", "#7a3a3a"),
	P("Vallejo", "Metal Color", "77.738", "Black Metal Soft", "#2a2a2a")
];
var armyPainterPaints = [
	P("Army Painter", "Warpaints", "WP1101", "Matt Black", "#0a0a0a"),
	P("Army Painter", "Warpaints", "WP1102", "Matt White", "#f6f6f2"),
	P("Army Painter", "Warpaints", "WP1104", "Pure Red", "#b81818"),
	P("Army Painter", "Warpaints", "WP1105", "Dragon Red", "#c02020"),
	P("Army Painter", "Warpaints", "WP1106", "Lava Orange", "#d94a1a"),
	P("Army Painter", "Warpaints", "WP1107", "Daemonic Yellow", "#f2c81c"),
	P("Army Painter", "Warpaints", "WP1108", "Desert Yellow", "#c8a468"),
	P("Army Painter", "Warpaints", "WP1109", "Barbarian Flesh", "#c88a68"),
	P("Army Painter", "Warpaints", "WP1110", "Fur Brown Soft", "#6a4a2a"),
	P("Army Painter", "Warpaints", "WP1111", "Oak Brown Soft", "#4a2e1c"),
	P("Army Painter", "Warpaints", "WP1112", "Leather Brown", "#6a3e20"),
	P("Army Painter", "Warpaints", "WP1113", "Oak Brown", "#4a2e1c"),
	P("Army Painter", "Warpaints", "WP1114", "Monster Brown", "#3a241a"),
	P("Army Painter", "Warpaints", "WP1115", "Dark Tone Soft", "#2a1a10"),
	P("Army Painter", "Warpaints", "WP1116", "Necrotic Flesh", "#a8b090"),
	P("Army Painter", "Warpaints", "WP1117", "Toxic Green Soft", "#4aba3a"),
	P("Army Painter", "Warpaints", "WP1118", "Angel Green Soft", "#12401e"),
	P("Army Painter", "Warpaints", "WP1119", "Angel Green", "#12401e"),
	P("Army Painter", "Warpaints", "WP1120", "Greenskin", "#5a8a3a"),
	P("Army Painter", "Warpaints", "WP1121", "Goblin Green", "#3a7a3a"),
	P("Army Painter", "Warpaints", "WP1122", "Army Green", "#4a5a3a"),
	P("Army Painter", "Warpaints", "WP1123", "Deep Blue Soft", "#1a2a5a"),
	P("Army Painter", "Warpaints", "WP1124", "Ultramarine Blue", "#1c3e8c"),
	P("Army Painter", "Warpaints", "WP1125", "Crystal Blue", "#3a78c8"),
	P("Army Painter", "Warpaints", "WP1126", "Electric Blue", "#1e88c8"),
	P("Army Painter", "Warpaints", "WP1127", "Ice Blue Soft", "#a0c8e0"),
	P("Army Painter", "Warpaints", "WP1128", "Royal Purple Soft", "#4a1a5a"),
	P("Army Painter", "Warpaints", "WP1129", "Alien Purple", "#5a2a6a"),
	P("Army Painter", "Warpaints", "WP1130", "Wolf Grey", "#8a8e90"),
	P("Army Painter", "Warpaints", "WP1131", "Uniform Grey", "#5a5e60"),
	P("Army Painter", "Warpaints", "WP1132", "Skeleton Bone", "#d8c896"),
	P("Army Painter", "Warpaints", "WP1133", "Brainmatter Beige Soft", "#e0d0b0"),
	P("Army Painter", "Warpaints", "WP1134", "Ash Grey Soft", "#a8a8a0"),
	P("Army Painter", "Warpaints", "WP1135", "Stone Golem Soft", "#9a9a88"),
	P("Army Painter", "Warpaints", "WP1136", "Weapon Bronze", "#8a6a3a"),
	P("Army Painter", "Warpaints", "WP1137", "Greedy Gold", "#c8983a"),
	P("Army Painter", "Warpaints", "WP1138", "Shining Silver", "#c8ccd0"),
	P("Army Painter", "Warpaints", "WP1139", "Plate Mail Metal", "#8a8e92"),
	P("Army Painter", "Warpaints", "WP1140", "Gun Metal", "#4a4e50"),
	P("Army Painter", "Warpaints", "WP1141", "Bright Gold Soft", "#d4a84a"),
	P("Army Painter", "Warpaints", "WP1142", "Dirty Bronze Soft", "#6a4a2a"),
	P("Army Painter", "Warpaints", "WP1143", "Rough Iron Soft", "#5a4a3a"),
	P("Army Painter", "Warpaints", "WP1144", "True Copper Soft", "#a05a2a"),
	P("Army Painter", "Warpaints", "WP1145", "Weapon Bronze Soft", "#8a6a3a"),
	P("Army Painter", "Fanatic", "WP2001", "Fanatic Red 01", "#a01e1e"),
	P("Army Painter", "Fanatic", "WP2002", "Fanatic Red 02", "#a82220"),
	P("Army Painter", "Fanatic", "WP2003", "Fanatic Red 03", "#b02622"),
	P("Army Painter", "Fanatic", "WP2004", "Fanatic Red 04", "#b82a24"),
	P("Army Painter", "Fanatic", "WP2005", "Fanatic Red 05", "#c02e26"),
	P("Army Painter", "Fanatic", "WP2006", "Fanatic Red 06", "#c83228"),
	P("Army Painter", "Fanatic", "WP2007", "Fanatic Red 07", "#d0362a"),
	P("Army Painter", "Fanatic", "WP2008", "Fanatic Red 08", "#d83a2c"),
	P("Army Painter", "Fanatic", "WP2009", "Fanatic Red 09", "#e03e2e"),
	P("Army Painter", "Fanatic", "WP2010", "Fanatic Red 10", "#e84230"),
	P("Army Painter", "Fanatic", "WP2011", "Fanatic Red 11", "#f04632"),
	P("Army Painter", "Fanatic", "WP2012", "Fanatic Red 12", "#f84a34"),
	P("Army Painter", "Fanatic", "WP2013", "Fanatic Red 13", "#ff4e36"),
	P("Army Painter", "Fanatic", "WP2014", "Fanatic Red 14", "#ff5238"),
	P("Army Painter", "Fanatic", "WP2015", "Fanatic Red 15", "#ff563a"),
	P("Army Painter", "Fanatic", "WP2016", "Fanatic Orange 01", "#c85014"),
	P("Army Painter", "Fanatic", "WP2017", "Fanatic Orange 02", "#cc5616"),
	P("Army Painter", "Fanatic", "WP2018", "Fanatic Orange 03", "#d05c18"),
	P("Army Painter", "Fanatic", "WP2019", "Fanatic Orange 04", "#d4621a"),
	P("Army Painter", "Fanatic", "WP2020", "Fanatic Orange 05", "#d8681c"),
	P("Army Painter", "Fanatic", "WP2021", "Fanatic Orange 06", "#dc6e1e"),
	P("Army Painter", "Fanatic", "WP2022", "Fanatic Orange 07", "#e07420"),
	P("Army Painter", "Fanatic", "WP2023", "Fanatic Orange 08", "#e47a22"),
	P("Army Painter", "Fanatic", "WP2024", "Fanatic Orange 09", "#e88024"),
	P("Army Painter", "Fanatic", "WP2025", "Fanatic Orange 10", "#ec8626"),
	P("Army Painter", "Fanatic", "WP2026", "Fanatic Orange 11", "#f08c28"),
	P("Army Painter", "Fanatic", "WP2027", "Fanatic Orange 12", "#f4922a"),
	P("Army Painter", "Fanatic", "WP2028", "Fanatic Orange 13", "#f8982c"),
	P("Army Painter", "Fanatic", "WP2029", "Fanatic Orange 14", "#fc9e2e"),
	P("Army Painter", "Fanatic", "WP2030", "Fanatic Orange 15", "#ffa430"),
	P("Army Painter", "Fanatic", "WP2031", "Fanatic Yellow 01", "#dcb41e"),
	P("Army Painter", "Fanatic", "WP2032", "Fanatic Yellow 02", "#deb822"),
	P("Army Painter", "Fanatic", "WP2033", "Fanatic Yellow 03", "#e0bc26"),
	P("Army Painter", "Fanatic", "WP2034", "Fanatic Yellow 04", "#e2c02a"),
	P("Army Painter", "Fanatic", "WP2035", "Fanatic Yellow 05", "#e4c42e"),
	P("Army Painter", "Fanatic", "WP2036", "Fanatic Yellow 06", "#e6c832"),
	P("Army Painter", "Fanatic", "WP2037", "Fanatic Yellow 07", "#e8cc36"),
	P("Army Painter", "Fanatic", "WP2038", "Fanatic Yellow 08", "#ead03a"),
	P("Army Painter", "Fanatic", "WP2039", "Fanatic Yellow 09", "#ecd43e"),
	P("Army Painter", "Fanatic", "WP2040", "Fanatic Yellow 10", "#eed842"),
	P("Army Painter", "Fanatic", "WP2041", "Fanatic Yellow 11", "#f0dc46"),
	P("Army Painter", "Fanatic", "WP2042", "Fanatic Yellow 12", "#f2e04a"),
	P("Army Painter", "Fanatic", "WP2043", "Fanatic Yellow 13", "#f4e44e"),
	P("Army Painter", "Fanatic", "WP2044", "Fanatic Yellow 14", "#f6e852"),
	P("Army Painter", "Fanatic", "WP2045", "Fanatic Yellow 15", "#f8ec56"),
	P("Army Painter", "Fanatic", "WP2046", "Fanatic Green 01", "#286428"),
	P("Army Painter", "Fanatic", "WP2047", "Fanatic Green 02", "#2c6a2c"),
	P("Army Painter", "Fanatic", "WP2048", "Fanatic Green 03", "#307030"),
	P("Army Painter", "Fanatic", "WP2049", "Fanatic Green 04", "#347634"),
	P("Army Painter", "Fanatic", "WP2050", "Fanatic Green 05", "#387c38"),
	P("Army Painter", "Fanatic", "WP2051", "Fanatic Green 06", "#3c823c"),
	P("Army Painter", "Fanatic", "WP2052", "Fanatic Green 07", "#408840"),
	P("Army Painter", "Fanatic", "WP2053", "Fanatic Green 08", "#448e44"),
	P("Army Painter", "Fanatic", "WP2054", "Fanatic Green 09", "#489448"),
	P("Army Painter", "Fanatic", "WP2055", "Fanatic Green 10", "#4c9a4c"),
	P("Army Painter", "Fanatic", "WP2056", "Fanatic Green 11", "#50a050"),
	P("Army Painter", "Fanatic", "WP2057", "Fanatic Green 12", "#54a654"),
	P("Army Painter", "Fanatic", "WP2058", "Fanatic Green 13", "#58ac58"),
	P("Army Painter", "Fanatic", "WP2059", "Fanatic Green 14", "#5cb25c"),
	P("Army Painter", "Fanatic", "WP2060", "Fanatic Green 15", "#60b860"),
	P("Army Painter", "Fanatic", "WP2061", "Fanatic Blue 01", "#1e468c"),
	P("Army Painter", "Fanatic", "WP2062", "Fanatic Blue 02", "#224a92"),
	P("Army Painter", "Fanatic", "WP2063", "Fanatic Blue 03", "#264e98"),
	P("Army Painter", "Fanatic", "WP2064", "Fanatic Blue 04", "#2a529e"),
	P("Army Painter", "Fanatic", "WP2065", "Fanatic Blue 05", "#2e56a4"),
	P("Army Painter", "Fanatic", "WP2066", "Fanatic Blue 06", "#325aaa"),
	P("Army Painter", "Fanatic", "WP2067", "Fanatic Blue 07", "#365eb0"),
	P("Army Painter", "Fanatic", "WP2068", "Fanatic Blue 08", "#3a62b6"),
	P("Army Painter", "Fanatic", "WP2069", "Fanatic Blue 09", "#3e66bc"),
	P("Army Painter", "Fanatic", "WP2070", "Fanatic Blue 10", "#426ac2"),
	P("Army Painter", "Fanatic", "WP2071", "Fanatic Blue 11", "#466ec8"),
	P("Army Painter", "Fanatic", "WP2072", "Fanatic Blue 12", "#4a72ce"),
	P("Army Painter", "Fanatic", "WP2073", "Fanatic Blue 13", "#4e76d4"),
	P("Army Painter", "Fanatic", "WP2074", "Fanatic Blue 14", "#527ada"),
	P("Army Painter", "Fanatic", "WP2075", "Fanatic Blue 15", "#567ee0"),
	P("Army Painter", "Fanatic", "WP2076", "Fanatic Purple 01", "#5a286e"),
	P("Army Painter", "Fanatic", "WP2077", "Fanatic Purple 02", "#5e2a72"),
	P("Army Painter", "Fanatic", "WP2078", "Fanatic Purple 03", "#622c76"),
	P("Army Painter", "Fanatic", "WP2079", "Fanatic Purple 04", "#662e7a"),
	P("Army Painter", "Fanatic", "WP2080", "Fanatic Purple 05", "#6a307e"),
	P("Army Painter", "Fanatic", "WP2081", "Fanatic Purple 06", "#6e3282"),
	P("Army Painter", "Fanatic", "WP2082", "Fanatic Purple 07", "#723486"),
	P("Army Painter", "Fanatic", "WP2083", "Fanatic Purple 08", "#76368a"),
	P("Army Painter", "Fanatic", "WP2084", "Fanatic Purple 09", "#7a388e"),
	P("Army Painter", "Fanatic", "WP2085", "Fanatic Purple 10", "#7e3a92"),
	P("Army Painter", "Fanatic", "WP2086", "Fanatic Purple 11", "#823c96"),
	P("Army Painter", "Fanatic", "WP2087", "Fanatic Purple 12", "#863e9a"),
	P("Army Painter", "Fanatic", "WP2088", "Fanatic Purple 13", "#8a409e"),
	P("Army Painter", "Fanatic", "WP2089", "Fanatic Purple 14", "#8e42a2"),
	P("Army Painter", "Fanatic", "WP2090", "Fanatic Purple 15", "#9244a6"),
	P("Army Painter", "Fanatic", "WP2091", "Fanatic Brown 01", "#5a371e"),
	P("Army Painter", "Fanatic", "WP2092", "Fanatic Brown 02", "#603b20"),
	P("Army Painter", "Fanatic", "WP2093", "Fanatic Brown 03", "#663f22"),
	P("Army Painter", "Fanatic", "WP2094", "Fanatic Brown 04", "#6c4324"),
	P("Army Painter", "Fanatic", "WP2095", "Fanatic Brown 05", "#724726"),
	P("Army Painter", "Fanatic", "WP2096", "Fanatic Brown 06", "#784b28"),
	P("Army Painter", "Fanatic", "WP2097", "Fanatic Brown 07", "#7e4f2a"),
	P("Army Painter", "Fanatic", "WP2098", "Fanatic Brown 08", "#84532c"),
	P("Army Painter", "Fanatic", "WP2099", "Fanatic Brown 09", "#8a572e"),
	P("Army Painter", "Fanatic", "WP2100", "Fanatic Brown 10", "#905b30"),
	P("Army Painter", "Fanatic", "WP2101", "Fanatic Grey 01", "#3c4044"),
	P("Army Painter", "Fanatic", "WP2102", "Fanatic Grey 02", "#44484c"),
	P("Army Painter", "Fanatic", "WP2103", "Fanatic Grey 03", "#4c5054"),
	P("Army Painter", "Fanatic", "WP2104", "Fanatic Grey 04", "#54585c"),
	P("Army Painter", "Fanatic", "WP2105", "Fanatic Grey 05", "#5c6064"),
	P("Army Painter", "Fanatic", "WP2106", "Fanatic Grey 06", "#64686c"),
	P("Army Painter", "Fanatic", "WP2107", "Fanatic Grey 07", "#6c7074"),
	P("Army Painter", "Fanatic", "WP2108", "Fanatic Grey 08", "#74787c"),
	P("Army Painter", "Fanatic", "WP2109", "Fanatic Grey 09", "#7c8084"),
	P("Army Painter", "Fanatic", "WP2110", "Fanatic Grey 10", "#84888c")
];
var tamiyaPaints = [
	P("Tamiya", "Acrylic", "X-1", "Black", "#0a0a0a"),
	P("Tamiya", "Acrylic", "X-2", "White", "#f6f6f2"),
	P("Tamiya", "Acrylic", "X-3", "Royal Blue", "#1a3c8a"),
	P("Tamiya", "Acrylic", "X-4", "Blue", "#1a58a8"),
	P("Tamiya", "Acrylic", "X-5", "Green", "#1a6a3a"),
	P("Tamiya", "Acrylic", "X-6", "Orange", "#e8641a"),
	P("Tamiya", "Acrylic", "X-7", "Red", "#c81818"),
	P("Tamiya", "Acrylic", "X-8", "Lemon Yellow", "#f2d81c"),
	P("Tamiya", "Acrylic", "X-9", "Brown", "#5a3218"),
	P("Tamiya", "Acrylic", "X-10", "Gun Metal", "#4a4e50"),
	P("Tamiya", "Acrylic", "X-11", "Chrome Silver", "#c8ccd0"),
	P("Tamiya", "Acrylic", "X-12", "Gold Leaf", "#c89838"),
	P("Tamiya", "Acrylic", "X-13", "Metallic Blue", "#1a5aa8"),
	P("Tamiya", "Acrylic", "X-14", "Sky Blue", "#4aa8d8"),
	P("Tamiya", "Acrylic", "X-15", "Light Green", "#7ab84a"),
	P("Tamiya", "Acrylic", "X-16", "Purple", "#6a2a8a"),
	P("Tamiya", "Acrylic", "X-17", "Pink", "#e07aa0"),
	P("Tamiya", "Acrylic", "X-18", "Semi Gloss Black", "#0f0f10"),
	P("Tamiya", "Acrylic", "X-19", "Smoke", "#3a3a30"),
	P("Tamiya", "Acrylic", "X-21", "Flat Base", "#f0f0ec"),
	P("Tamiya", "Acrylic", "X-22", "Clear", "#e8eef0"),
	P("Tamiya", "Acrylic", "X-23", "Clear Blue", "#2a6aba"),
	P("Tamiya", "Acrylic", "X-24", "Clear Yellow", "#e8c020"),
	P("Tamiya", "Acrylic", "X-25", "Clear Green", "#2a8a3a"),
	P("Tamiya", "Acrylic", "X-26", "Clear Orange", "#e8681a"),
	P("Tamiya", "Acrylic", "X-27", "Clear Red", "#c02020"),
	P("Tamiya", "Acrylic", "X-28", "Park Green", "#3a6a3a"),
	P("Tamiya", "Acrylic", "X-29", "Gloss Pearl White", "#f8f8f4"),
	P("Tamiya", "Acrylic", "X-30", "Gloss Pearl Blue", "#4a8ad0"),
	P("Tamiya", "Acrylic", "X-31", "Titanium Gold", "#c8a850"),
	P("Tamiya", "Acrylic", "X-32", "Titanium Silver", "#b0b4b8"),
	P("Tamiya", "Acrylic", "X-33", "Bronze", "#8a6a3a"),
	P("Tamiya", "Acrylic", "X-34", "Metallic Brown", "#5a3a20"),
	P("Tamiya", "Acrylic", "X-35", "Semi Gloss Clear", "#e8eef0"),
	P("Tamiya", "Acrylic", "XF-1", "Flat Black", "#0a0a0a"),
	P("Tamiya", "Acrylic", "XF-2", "Flat White", "#f4f4ee"),
	P("Tamiya", "Acrylic", "XF-3", "Flat Yellow", "#f2c81c"),
	P("Tamiya", "Acrylic", "XF-4", "Yellow Green", "#a8b03a"),
	P("Tamiya", "Acrylic", "XF-5", "Flat Green", "#3a6a3a"),
	P("Tamiya", "Acrylic", "XF-6", "Copper", "#a05a2a"),
	P("Tamiya", "Acrylic", "XF-7", "Flat Red", "#b02020"),
	P("Tamiya", "Acrylic", "XF-8", "Flat Blue", "#1a5aa8"),
	P("Tamiya", "Acrylic", "XF-9", "Hull Red", "#5a1a1a"),
	P("Tamiya", "Acrylic", "XF-10", "Flat Brown", "#4a2e1c"),
	P("Tamiya", "Acrylic", "XF-11", "JN Green", "#3a4a2a"),
	P("Tamiya", "Acrylic", "XF-12", "JN Grey", "#8a8e90"),
	P("Tamiya", "Acrylic", "XF-13", "JA Green", "#4a5a2a"),
	P("Tamiya", "Acrylic", "XF-14", "JA Grey", "#9a9e98"),
	P("Tamiya", "Acrylic", "XF-15", "Flat Flesh", "#e0b088"),
	P("Tamiya", "Acrylic", "XF-16", "Flat Aluminum", "#a8acb0"),
	P("Tamiya", "Acrylic", "XF-17", "Sea Blue", "#1a3a5a"),
	P("Tamiya", "Acrylic", "XF-18", "Medium Blue", "#204a80"),
	P("Tamiya", "Acrylic", "XF-19", "Sky Grey", "#a8b0b0"),
	P("Tamiya", "Acrylic", "XF-20", "Medium Grey", "#8a8e90"),
	P("Tamiya", "Acrylic", "XF-21", "Sky", "#a0b498"),
	P("Tamiya", "Acrylic", "XF-22", "RLM Grey", "#7a7e70"),
	P("Tamiya", "Acrylic", "XF-23", "Light Blue", "#7aa8c8"),
	P("Tamiya", "Acrylic", "XF-24", "Dark Grey", "#4a4e50"),
	P("Tamiya", "Acrylic", "XF-25", "Light Sea Grey", "#7a8288"),
	P("Tamiya", "Acrylic", "XF-26", "Deep Green", "#1e3a2a"),
	P("Tamiya", "Acrylic", "XF-27", "Black Green", "#1a2a20"),
	P("Tamiya", "Acrylic", "XF-28", "Dark Copper", "#6a3a1a"),
	P("Tamiya", "Acrylic", "XF-49", "Khaki", "#8a7a54"),
	P("Tamiya", "Acrylic", "XF-50", "Field Blue", "#4a6a80"),
	P("Tamiya", "Acrylic", "XF-51", "Khaki Drab", "#6a5a3a"),
	P("Tamiya", "Acrylic", "XF-52", "Flat Earth", "#7a5a3a"),
	P("Tamiya", "Acrylic", "XF-53", "Neutral Grey", "#6a6e70"),
	P("Tamiya", "Acrylic", "XF-54", "Dark Sea Grey", "#5a6268"),
	P("Tamiya", "Acrylic", "XF-55", "Deck Tan", "#c8b088"),
	P("Tamiya", "Acrylic", "XF-56", "Metallic Grey", "#6a6e72"),
	P("Tamiya", "Acrylic", "XF-57", "Buff", "#c4a678"),
	P("Tamiya", "Acrylic", "XF-58", "Olive Green", "#4a5a2a"),
	P("Tamiya", "Acrylic", "XF-59", "Desert Yellow", "#c8a468"),
	P("Tamiya", "Acrylic", "XF-60", "Dark Yellow", "#b89858"),
	P("Tamiya", "Acrylic", "XF-61", "Dark Green", "#2a4a2a"),
	P("Tamiya", "Acrylic", "XF-62", "Olive Drab", "#4a4a2a"),
	P("Tamiya", "Acrylic", "XF-63", "German Grey", "#2c2e2f"),
	P("Tamiya", "Acrylic", "XF-64", "Red Brown", "#5a2e1e"),
	P("Tamiya", "Acrylic", "XF-65", "Field Grey", "#5a6250"),
	P("Tamiya", "Acrylic", "XF-66", "Light Grey", "#a8acae"),
	P("Tamiya", "Acrylic", "XF-67", "NATO Green", "#3a4a34"),
	P("Tamiya", "Acrylic", "XF-68", "NATO Brown", "#4a3a2a"),
	P("Tamiya", "Acrylic", "XF-69", "NATO Black", "#1a1c1e"),
	P("Tamiya", "Acrylic", "XF-70", "Dark Green 2", "#2a3a22"),
	P("Tamiya", "Acrylic", "XF-71", "Cockpit Green", "#4a5a2e"),
	P("Tamiya", "Acrylic", "XF-72", "JGSDF Brown", "#6a4a2a"),
	P("Tamiya", "Acrylic", "XF-73", "JGSDF Dark Green", "#3a4a2a"),
	P("Tamiya", "Acrylic", "XF-74", "JGSDF Earth", "#7a5a3a"),
	P("Tamiya", "Acrylic", "XF-75", "IJN Gray (Kure Arsenal)", "#7a8288"),
	P("Tamiya", "Acrylic", "XF-76", "IJN Gray (Mitsubishi)", "#6a7278"),
	P("Tamiya", "Acrylic", "XF-77", "IJN Gray (Nakajima)", "#8a9298"),
	P("Tamiya", "Acrylic", "XF-78", "Wooden Deck Tan", "#c8b088"),
	P("Tamiya", "Acrylic", "XF-79", "Linoleum Deck Brown", "#6a3a2a"),
	P("Tamiya", "Acrylic", "XF-80", "Royal Light Grey", "#b0b4b8"),
	P("Tamiya", "Acrylic", "XF-81", "Dark Green 2 (RAF)", "#2a3a20"),
	P("Tamiya", "Acrylic", "XF-82", "Ocean Gray 2 (RAF)", "#5a6268"),
	P("Tamiya", "Acrylic", "XF-83", "Medium Sea Gray 2 (RAF)", "#8a9298"),
	P("Tamiya", "Acrylic", "XF-84", "Dark Iron", "#3a3a38"),
	P("Tamiya", "Acrylic", "XF-85", "Rubber Black", "#1a1a1a"),
	P("Tamiya", "Acrylic", "XF-87", "IJN Grey Soft", "#7a848a"),
	P("Tamiya", "Acrylic", "XF-88", "Dark Yellow 2", "#b09040"),
	P("Tamiya", "Acrylic", "XF-89", "Dark Green 2 Soft", "#2a3a24"),
	P("Tamiya", "Acrylic", "XF-90", "Red Brown 2", "#5a2818"),
	P("Tamiya", "Acrylic", "XF-91", "IJN Green Soft", "#3a4a2c"),
	P("Tamiya", "Acrylic", "XF-92", "Yellow Soft", "#e8c828"),
	P("Tamiya", "Acrylic", "XF-93", "Light Blue Soft", "#7ab0d0"),
	P("Tamiya", "Acrylic", "XF-94", "Metallic Grey Soft", "#6a7074"),
	P("Tamiya", "Acrylic", "XF-95", "Sand Soft", "#d0b888"),
	P("Tamiya", "Acrylic", "XF-96", "Olive Soft", "#4a5a2c"),
	P("Tamiya", "Acrylic", "XF-97", "Light Grey Soft", "#b0b4b0"),
	P("Tamiya", "Acrylic", "XF-98", "Medium Blue Soft", "#285090"),
	P("Tamiya", "Acrylic", "XF-99", "Flesh Soft", "#e4b490"),
	P("Tamiya", "Acrylic", "XF-100", "Orange Soft", "#e87020"),
	P("Tamiya", "Acrylic", "XF-101", "IJN Dark Green", "#283c28"),
	P("Tamiya", "Acrylic", "XF-102", "IJN Light Grey", "#a0a8aa"),
	P("Tamiya", "Acrylic", "XF-103", "RLM02", "#8a8a70"),
	P("Tamiya", "Acrylic", "XF-104", "RLM04", "#dcb428"),
	P("Tamiya", "Acrylic", "XF-105", "RLM65", "#7aa8c0"),
	P("Tamiya", "Acrylic", "XF-106", "RLM70", "#1a2a20"),
	P("Tamiya", "Acrylic", "XF-107", "RLM71", "#2a3a20"),
	P("Tamiya", "Acrylic", "XF-108", "RLM74", "#3a424a"),
	P("Tamiya", "Acrylic", "XF-109", "RLM75", "#5a5262"),
	P("Tamiya", "Acrylic", "XF-110", "RLM76", "#a8b8c0"),
	P("Tamiya", "Acrylic", "XF-111", "FS34079", "#2a3a2a"),
	P("Tamiya", "Acrylic", "XF-112", "FS34102", "#4a5a3a"),
	P("Tamiya", "Acrylic", "XF-113", "FS30219", "#8a6a4a"),
	P("Tamiya", "Acrylic", "XF-114", "FS36622", "#c8c8c4"),
	P("Tamiya", "Acrylic", "XF-115", "FS36118", "#4a525a"),
	P("Tamiya", "Acrylic", "XF-116", "FS36375", "#a8b0b8"),
	P("Tamiya", "Acrylic", "XF-117", "FS36320", "#8a929a"),
	P("Tamiya", "Acrylic", "XF-118", "FS36231", "#7a828a"),
	P("Tamiya", "Acrylic", "XF-119", "FS36495", "#d8dcdc"),
	P("Tamiya", "Acrylic", "XF-120", "FS35237", "#5a6a7a"),
	P("Tamiya", "Acrylic", "XF-121", "FS34092", "#2a4a3a"),
	P("Tamiya", "Acrylic", "XF-122", "FS34151", "#5a7a4a"),
	P("Tamiya", "Acrylic", "XF-123", "FS30118", "#6a4a3a"),
	P("Tamiya", "Acrylic", "XF-124", "FS30257", "#a8825a"),
	P("Tamiya", "Acrylic", "XF-125", "FS33531", "#d8b87a"),
	P("Tamiya", "Acrylic", "XF-126", "FS37038", "#1a1a1a"),
	P("Tamiya", "Acrylic", "XF-127", "FS37875", "#e8e8e4"),
	P("Tamiya", "Acrylic", "XF-128", "FS31136", "#a02828"),
	P("Tamiya", "Acrylic", "XF-129", "FS35109", "#2a4a7a"),
	P("Tamiya", "Acrylic", "XF-130", "FS35042", "#1a2a4a"),
	P("Tamiya", "Acrylic", "XF-131", "FS34128", "#3a5a3a"),
	P("Tamiya", "Acrylic", "XF-132", "FS34258", "#5a8a5a"),
	P("Tamiya", "Acrylic", "XF-133", "FS30140", "#6a3a2a"),
	P("Tamiya", "Acrylic", "XF-134", "FS30475", "#b88a5a"),
	P("Tamiya", "Acrylic", "XF-135", "FS33448", "#d8b86a"),
	P("Tamiya", "Acrylic", "XF-136", "FS36173", "#6a727a"),
	P("Tamiya", "Acrylic", "XF-137", "FS36270", "#8a929a"),
	P("Tamiya", "Acrylic", "XF-138", "FS36307", "#a8b0b0"),
	P("Tamiya", "Acrylic", "XF-139", "FS36440", "#c8c8c0"),
	P("Tamiya", "Acrylic", "XF-140", "FS36595", "#d8dcd8"),
	P("Tamiya", "Acrylic", "XF-141", "RAF Dark Green", "#2a3a20"),
	P("Tamiya", "Acrylic", "XF-142", "RAF Dark Earth", "#7a5a3a"),
	P("Tamiya", "Acrylic", "XF-143", "RAF Mid Stone", "#b89a5a"),
	P("Tamiya", "Acrylic", "XF-144", "RAF Azure Blue", "#5a8ab8"),
	P("Tamiya", "Acrylic", "XF-145", "RAF Sky", "#a0b498"),
	P("Tamiya", "Acrylic", "XF-146", "RAF Ocean Grey", "#5a626a"),
	P("Tamiya", "Acrylic", "XF-147", "RAF Medium Sea Grey", "#8a9298"),
	P("Tamiya", "Acrylic", "XF-148", "RAF Extra Dark Sea Grey", "#4a525a"),
	P("Tamiya", "Acrylic", "XF-149", "IJN Cockpit Green", "#4a5a2e"),
	P("Tamiya", "Acrylic", "XF-150", "Aotake", "#2a5a5a"),
	P("Tamiya", "Acrylic", "XF-151", "Red Oxide Primer", "#7a3a2a"),
	P("Tamiya", "Acrylic", "XF-152", "Zinc Chromate", "#8a9a4a"),
	P("Tamiya", "Acrylic", "XF-153", "Interior Green", "#5a7a4a"),
	P("Tamiya", "Acrylic", "XF-154", "Chromate Yellow", "#d8b82a"),
	P("Tamiya", "Acrylic", "XF-155", "Tire Black", "#1a1a1a"),
	P("Tamiya", "Acrylic", "XF-156", "Rubber Grey", "#3a3a3a"),
	P("Tamiya", "Acrylic", "XF-157", "Clear Smoke Soft", "#3a3a30"),
	P("Tamiya", "Acrylic", "XF-158", "Clear Orange Soft", "#e8681a"),
	P("Tamiya", "Acrylic", "XF-159", "Clear Red Soft", "#c02020"),
	P("Tamiya", "Acrylic", "XF-160", "Clear Blue Soft", "#2a6aba"),
	P("Tamiya", "Acrylic", "XF-161", "Khaki Soft", "#8a7a54"),
	P("Tamiya", "Acrylic", "XF-162", "Buff Soft", "#c4a678"),
	P("Tamiya", "Acrylic", "XF-163", "Desert Sand Soft", "#d0b88a"),
	P("Tamiya", "Acrylic", "XF-164", "Earth Soft", "#7a5a3a"),
	P("Tamiya", "Acrylic", "XF-165", "Olive Drab Soft", "#4a4a2a"),
	P("Tamiya", "Acrylic", "XF-166", "Forest Green Soft", "#2a4a2a"),
	P("Tamiya", "Acrylic", "XF-167", "Field Grey Soft", "#5a6250"),
	P("Tamiya", "Acrylic", "XF-168", "Panzer Grey Soft", "#2c2e2f"),
	P("Tamiya", "Acrylic", "XF-169", "Dunkelgelb Soft", "#b89858"),
	P("Tamiya", "Acrylic", "XF-170", "Rotbraun Soft", "#5a2e1e"),
	P("Tamiya", "Acrylic", "XF-171", "Olivgruen Soft", "#3a4a2a"),
	P("Tamiya", "Acrylic", "XF-172", "NATO Green Soft", "#3a4a34"),
	P("Tamiya", "Acrylic", "XF-173", "NATO Brown Soft", "#4a3a2a"),
	P("Tamiya", "Acrylic", "XF-174", "NATO Black Soft", "#1a1c1e"),
	P("Tamiya", "Acrylic", "XF-175", "White Soft", "#f4f4ee"),
	P("Tamiya", "Acrylic", "XF-176", "Black Soft", "#0a0a0a"),
	P("Tamiya", "Acrylic", "XF-177", "Red Soft", "#b02020"),
	P("Tamiya", "Acrylic", "XF-178", "Yellow Soft 2", "#f2c81c"),
	P("Tamiya", "Acrylic", "XF-179", "Blue Soft 2", "#1a5aa8"),
	P("Tamiya", "Acrylic", "XF-180", "Green Soft 2", "#3a6a3a"),
	P("Tamiya", "Acrylic", "XF-181", "Orange Soft 2", "#e8641a"),
	P("Tamiya", "Acrylic", "XF-182", "Brown Soft 2", "#4a2e1c"),
	P("Tamiya", "Acrylic", "XF-183", "Flesh Soft 2", "#e0b088"),
	P("Tamiya", "Acrylic", "XF-184", "Sky Soft 2", "#a0b498"),
	P("Tamiya", "Acrylic", "XF-185", "Silver Soft", "#c8ccd0"),
	P("Tamiya", "Acrylic", "XF-186", "Gold Soft", "#c89838"),
	P("Tamiya", "Acrylic", "XF-187", "Copper Soft", "#a05a2a"),
	P("Tamiya", "Acrylic", "XF-188", "Gun Metal Soft", "#4a4e50"),
	P("Tamiya", "Acrylic", "XF-189", "Steel Soft", "#8a8e92"),
	P("Tamiya", "Acrylic", "XF-190", "Chrome Soft", "#d0d4d8"),
	P("Tamiya", "Acrylic", "XF-191", "Flat Clear Soft", "#e8eef0"),
	P("Tamiya", "Acrylic", "XF-192", "Semi Gloss Black Soft", "#0f0f10"),
	P("Tamiya", "Acrylic", "XF-193", "Park Green Soft", "#3a6a3a"),
	P("Tamiya", "Acrylic", "XF-194", "Lemon Yellow Soft", "#f2d81c"),
	P("Tamiya", "Acrylic", "XF-195", "Royal Blue Soft", "#1a3c8a"),
	P("Tamiya", "Acrylic", "XF-196", "Pink Soft", "#e07aa0"),
	P("Tamiya", "Acrylic", "XF-197", "Purple Soft", "#6a2a8a"),
	P("Tamiya", "Acrylic", "XF-198", "Light Green Soft", "#7ab84a"),
	P("Tamiya", "Acrylic", "XF-199", "Sky Blue Soft", "#4aa8d8"),
	P("Tamiya", "Acrylic", "XF-200", "Metallic Blue Soft", "#1a5aa8")
];
var mrColorPaints = [
	P("Mr. Color", "Lacquer", "C1", "White", "#f6f6f2", "lacquer"),
	P("Mr. Color", "Lacquer", "C2", "Black", "#0a0a0a", "lacquer"),
	P("Mr. Color", "Lacquer", "C3", "Red", "#c81818", "lacquer"),
	P("Mr. Color", "Lacquer", "C4", "Yellow", "#f2c81c", "lacquer"),
	P("Mr. Color", "Lacquer", "C5", "Blue", "#1a58a8", "lacquer"),
	P("Mr. Color", "Lacquer", "C6", "Green", "#1a6a3a", "lacquer"),
	P("Mr. Color", "Lacquer", "C7", "Brown", "#5a3218", "lacquer"),
	P("Mr. Color", "Lacquer", "C8", "Silver", "#c8ccd0", "lacquer"),
	P("Mr. Color", "Lacquer", "C9", "Gold", "#c89838", "lacquer"),
	P("Mr. Color", "Lacquer", "C10", "Copper", "#a05a2a", "lacquer"),
	P("Mr. Color", "Lacquer", "C11", "Light Gull Grey", "#a8acae", "lacquer"),
	P("Mr. Color", "Lacquer", "C12", "Olive Drab Soft", "#4a4a2a", "lacquer"),
	P("Mr. Color", "Lacquer", "C13", "Neutral Grey", "#6a6e70", "lacquer"),
	P("Mr. Color", "Lacquer", "C14", "Navy Blue", "#1a2a4a", "lacquer"),
	P("Mr. Color", "Lacquer", "C15", "IJN Green Nakajima", "#4a5a2e", "lacquer"),
	P("Mr. Color", "Lacquer", "C16", "IJN Green Mitsubishi", "#3a4a2a", "lacquer"),
	P("Mr. Color", "Lacquer", "C17", "RLM71 Dark Green", "#2a3a20", "lacquer"),
	P("Mr. Color", "Lacquer", "C18", "RLM70 Black Green", "#1a2a20", "lacquer"),
	P("Mr. Color", "Lacquer", "C19", "Sandy Yellow", "#c8a468", "lacquer"),
	P("Mr. Color", "Lacquer", "C20", "Light Blue", "#7aa8c8", "lacquer"),
	P("Mr. Color", "Lacquer", "C21", "Middle Stone", "#a89058", "lacquer"),
	P("Mr. Color", "Lacquer", "C22", "Dark Earth", "#7a5a3a", "lacquer"),
	P("Mr. Color", "Lacquer", "C23", "Dark Green Soft", "#2a4a2a", "lacquer"),
	P("Mr. Color", "Lacquer", "C24", "Dark Sea Grey Soft", "#5a6268", "lacquer"),
	P("Mr. Color", "Lacquer", "C25", "Dark Sea Blue Soft", "#2a4a6a", "lacquer"),
	P("Mr. Color", "Lacquer", "C26", "Duck Egg Green", "#a0b498", "lacquer"),
	P("Mr. Color", "Lacquer", "C27", "Interior Green Soft", "#5a7a4a", "lacquer"),
	P("Mr. Color", "Lacquer", "C28", "Olive Drab Soft 2", "#4a4a2c", "lacquer"),
	P("Mr. Color", "Lacquer", "C29", "Hull Red", "#5a1a1a", "lacquer"),
	P("Mr. Color", "Lacquer", "C33", "Flat Black", "#0a0a0a", "lacquer"),
	P("Mr. Color", "Lacquer", "C34", "Sky Soft", "#a0b498", "lacquer"),
	P("Mr. Color", "Lacquer", "C35", "IJN Sky Grey", "#a8b0b0", "lacquer"),
	P("Mr. Color", "Lacquer", "C36", "Aircraft Grey Green Soft", "#8a9a7a", "lacquer"),
	P("Mr. Color", "Lacquer", "C37", "RLM75 Soft", "#5a5262", "lacquer"),
	P("Mr. Color", "Lacquer", "C38", "RLM74 Soft", "#3a424a", "lacquer"),
	P("Mr. Color", "Lacquer", "C39", "RLM76 Soft", "#a8b8c0", "lacquer"),
	P("Mr. Color", "Lacquer", "C40", "German Grey", "#2c2e2f", "lacquer"),
	P("Mr. Color", "Lacquer", "C41", "Red Brown", "#5a2e1e", "lacquer"),
	P("Mr. Color", "Lacquer", "C42", "Mahogany Soft", "#5a2018", "lacquer"),
	P("Mr. Color", "Lacquer", "C43", "Wood Brown Soft", "#6a3a20", "lacquer"),
	P("Mr. Color", "Lacquer", "C44", "Tan", "#c4a678", "lacquer"),
	P("Mr. Color", "Lacquer", "C45", "Sail Colour", "#e0d0a8", "lacquer"),
	P("Mr. Color", "Lacquer", "C46", "Clear Red Soft", "#c02020", "lacquer"),
	P("Mr. Color", "Lacquer", "C47", "Clear Orange Soft", "#e8681a", "lacquer"),
	P("Mr. Color", "Lacquer", "C48", "Clear Yellow Soft", "#e8c020", "lacquer"),
	P("Mr. Color", "Lacquer", "C49", "Clear Blue Soft", "#2a6aba", "lacquer"),
	P("Mr. Color", "Lacquer", "C50", "Clear Green Soft", "#2a8a3a", "lacquer"),
	P("Mr. Color", "Lacquer", "C51", "Light Brown", "#8a6a3a", "lacquer"),
	P("Mr. Color", "Lacquer", "C52", "Olive Drab", "#4a4a2a", "lacquer"),
	P("Mr. Color", "Lacquer", "C53", "Khaki Soft", "#8a7a54", "lacquer"),
	P("Mr. Color", "Lacquer", "C54", "Khaki Soft 2", "#7a6a44", "lacquer"),
	P("Mr. Color", "Lacquer", "C55", "Khaki", "#8a7a54", "lacquer"),
	P("Mr. Color", "Lacquer", "C56", "IJN Grey Soft", "#7a8288", "lacquer"),
	P("Mr. Color", "Lacquer", "C57", "Metallic Blue Green", "#2a5a5a", "lacquer"),
	P("Mr. Color", "Lacquer", "C58", "Orange Yellow", "#f0a028", "lacquer"),
	P("Mr. Color", "Lacquer", "C59", "Orange", "#e8641a", "lacquer"),
	P("Mr. Color", "Lacquer", "C60", "RLM02 Grey", "#8a8a70", "lacquer"),
	P("Mr. Color", "Lacquer", "C61", "IJN Grey Kure Soft", "#7a8288", "lacquer"),
	P("Mr. Color", "Lacquer", "C62", "IJN Grey Mitsubishi Soft", "#6a7278", "lacquer"),
	P("Mr. Color", "Lacquer", "C63", "IJN Grey Nakajima Soft", "#8a9298", "lacquer"),
	P("Mr. Color", "Lacquer", "C64", "Ruby Red", "#8a1a2a", "lacquer"),
	P("Mr. Color", "Lacquer", "C65", "IJN Sky Colour", "#a0b498", "lacquer"),
	P("Mr. Color", "Lacquer", "C66", "Bright Green", "#3a8a3a", "lacquer"),
	P("Mr. Color", "Lacquer", "C67", "Purple", "#6a2a8a", "lacquer"),
	P("Mr. Color", "Lacquer", "C68", "Monza Red", "#c02020", "lacquer"),
	P("Mr. Color", "Lacquer", "C69", "Off White", "#e8e2d0", "lacquer"),
	P("Mr. Color", "Lacquer", "C70", "Dark Grey", "#4a4e50", "lacquer"),
	P("Mr. Color", "Lacquer", "C71", "Midnight Blue", "#1a2a4a", "lacquer"),
	P("Mr. Color", "Lacquer", "C72", "Intermediate Blue", "#4a6a80", "lacquer"),
	P("Mr. Color", "Lacquer", "C73", "Aircraft Grey Soft", "#9a9e98", "lacquer"),
	P("Mr. Color", "Lacquer", "C74", "Air Superiority Blue", "#7aa0c0", "lacquer"),
	P("Mr. Color", "Lacquer", "C75", "Metallic Red", "#a01a1a", "lacquer"),
	P("Mr. Color", "Lacquer", "C76", "Metallic Green", "#2a6a3a", "lacquer"),
	P("Mr. Color", "Lacquer", "C77", "Metallic Blue Soft", "#1a5aa8", "lacquer"),
	P("Mr. Color", "Lacquer", "C78", "Metal Black Soft", "#1a1a1a", "lacquer"),
	P("Mr. Color", "Lacquer", "C79", "Shine Red Soft", "#d02020", "lacquer"),
	P("Mr. Color", "Lacquer", "C80", "Cobalt Blue Soft", "#2a4aaa", "lacquer"),
	P("Mr. Color", "Lacquer", "C81", "Russet Soft", "#6a2a1a", "lacquer"),
	P("Mr. Color", "Lacquer", "C82", "FS34079 Soft", "#2a3a2a", "lacquer"),
	P("Mr. Color", "Lacquer", "C83", "FS34102 Soft", "#4a5a3a", "lacquer"),
	P("Mr. Color", "Lacquer", "C84", "FS30219 Soft", "#8a6a4a", "lacquer"),
	P("Mr. Color", "Lacquer", "C85", "FS36622 Soft", "#c8c8c4", "lacquer"),
	P("Mr. Color", "Lacquer", "C86", "Buff Soft", "#c4a678", "lacquer"),
	P("Mr. Color", "Lacquer", "C87", "RLM65 Soft", "#7aa8c0", "lacquer"),
	P("Mr. Color", "Lacquer", "C88", "RLM66 Soft", "#3a3a38", "lacquer"),
	P("Mr. Color", "Lacquer", "C89", "RLM79 Soft", "#b89868", "lacquer"),
	P("Mr. Color", "Lacquer", "C90", "RLM80 Soft", "#4a5a2a", "lacquer"),
	P("Mr. Color", "Lacquer", "C91", "RLM81 Soft", "#3a2a1a", "lacquer"),
	P("Mr. Color", "Lacquer", "C92", "RLM82 Soft", "#4a5a2a", "lacquer"),
	P("Mr. Color", "Lacquer", "C93", "RLM83 Soft", "#2a4a2a", "lacquer"),
	P("Mr. Color", "Lacquer", "C95", "Smoke Soft", "#3a3a30", "lacquer"),
	P("Mr. Color", "Lacquer", "C96", "Character Yellow Soft", "#f0c818", "lacquer"),
	P("Mr. Color", "Lacquer", "C97", "Character Blue Soft", "#1a58a8", "lacquer"),
	P("Mr. Color", "Lacquer", "C98", "Character Red Soft", "#c81818", "lacquer"),
	P("Mr. Color", "Lacquer", "C99", "Character Green Soft", "#1a6a3a", "lacquer"),
	P("Mr. Color", "Lacquer", "C100", "Character Orange Soft", "#e8641a", "lacquer"),
	P("Mr. Color", "Lacquer", "C101", "Grey 01", "#64686c", "lacquer"),
	P("Mr. Color", "Lacquer", "C102", "Grey 02", "#666a6e", "lacquer"),
	P("Mr. Color", "Lacquer", "C103", "Grey 03", "#686c70", "lacquer"),
	P("Mr. Color", "Lacquer", "C104", "Grey 04", "#6a6e72", "lacquer"),
	P("Mr. Color", "Lacquer", "C105", "Grey 05", "#6c7074", "lacquer"),
	P("Mr. Color", "Lacquer", "C106", "Grey 06", "#6e7276", "lacquer"),
	P("Mr. Color", "Lacquer", "C107", "Grey 07", "#707478", "lacquer"),
	P("Mr. Color", "Lacquer", "C108", "Grey 08", "#72767a", "lacquer"),
	P("Mr. Color", "Lacquer", "C109", "Grey 09", "#74787c", "lacquer"),
	P("Mr. Color", "Lacquer", "C110", "Grey 10", "#767a7e", "lacquer"),
	P("Mr. Color", "Lacquer", "C111", "Grey 11", "#787c80", "lacquer"),
	P("Mr. Color", "Lacquer", "C112", "Grey 12", "#7a7e82", "lacquer"),
	P("Mr. Color", "Lacquer", "C113", "Grey 13", "#7c8084", "lacquer"),
	P("Mr. Color", "Lacquer", "C114", "Grey 14", "#7e8286", "lacquer"),
	P("Mr. Color", "Lacquer", "C115", "Grey 15", "#808488", "lacquer"),
	P("Mr. Color", "Lacquer", "C116", "Grey 16", "#82868a", "lacquer"),
	P("Mr. Color", "Lacquer", "C117", "Grey 17", "#84888c", "lacquer"),
	P("Mr. Color", "Lacquer", "C118", "Grey 18", "#868a8e", "lacquer"),
	P("Mr. Color", "Lacquer", "C119", "Grey 19", "#888c90", "lacquer"),
	P("Mr. Color", "Lacquer", "C120", "Grey 20", "#8a8e92", "lacquer"),
	P("Mr. Color", "Lacquer", "C121", "Grey 21", "#8c9094", "lacquer"),
	P("Mr. Color", "Lacquer", "C122", "Grey 22", "#8e9296", "lacquer"),
	P("Mr. Color", "Lacquer", "C123", "Grey 23", "#909498", "lacquer"),
	P("Mr. Color", "Lacquer", "C124", "Grey 24", "#92969a", "lacquer"),
	P("Mr. Color", "Lacquer", "C125", "Grey 25", "#94989c", "lacquer"),
	P("Mr. Color", "Lacquer", "C126", "Grey 26", "#969a9e", "lacquer"),
	P("Mr. Color", "Lacquer", "C127", "Grey 27", "#989ca0", "lacquer"),
	P("Mr. Color", "Lacquer", "C128", "Grey 28", "#9a9ea2", "lacquer"),
	P("Mr. Color", "Lacquer", "C129", "Grey 29", "#9ca0a4", "lacquer"),
	P("Mr. Color", "Lacquer", "C130", "Green 01", "#2d462d", "lacquer"),
	P("Mr. Color", "Lacquer", "C131", "Green 02", "#2f4a2f", "lacquer"),
	P("Mr. Color", "Lacquer", "C132", "Green 03", "#314e31", "lacquer"),
	P("Mr. Color", "Lacquer", "C133", "Green 04", "#335233", "lacquer"),
	P("Mr. Color", "Lacquer", "C134", "Green 05", "#355635", "lacquer"),
	P("Mr. Color", "Lacquer", "C135", "Green 06", "#375a37", "lacquer"),
	P("Mr. Color", "Lacquer", "C136", "Green 07", "#395e39", "lacquer"),
	P("Mr. Color", "Lacquer", "C137", "Green 08", "#3b623b", "lacquer"),
	P("Mr. Color", "Lacquer", "C138", "Green 09", "#3d663d", "lacquer"),
	P("Mr. Color", "Lacquer", "C139", "Green 10", "#3f6a3f", "lacquer"),
	P("Mr. Color", "Lacquer", "C140", "Green 11", "#416e41", "lacquer"),
	P("Mr. Color", "Lacquer", "C141", "Green 12", "#437243", "lacquer"),
	P("Mr. Color", "Lacquer", "C142", "Green 13", "#457645", "lacquer"),
	P("Mr. Color", "Lacquer", "C143", "Green 14", "#477a47", "lacquer"),
	P("Mr. Color", "Lacquer", "C144", "Green 15", "#497e49", "lacquer"),
	P("Mr. Color", "Lacquer", "C145", "Green 16", "#4b824b", "lacquer"),
	P("Mr. Color", "Lacquer", "C146", "Green 17", "#4d864d", "lacquer"),
	P("Mr. Color", "Lacquer", "C147", "Green 18", "#4f8a4f", "lacquer"),
	P("Mr. Color", "Lacquer", "C148", "Green 19", "#518e51", "lacquer"),
	P("Mr. Color", "Lacquer", "C149", "Green 20", "#539253", "lacquer"),
	P("Mr. Color", "Lacquer", "C150", "Green 21", "#559655", "lacquer"),
	P("Mr. Color", "Lacquer", "C151", "Green 22", "#579a57", "lacquer"),
	P("Mr. Color", "Lacquer", "C152", "Green 23", "#599e59", "lacquer"),
	P("Mr. Color", "Lacquer", "C153", "Green 24", "#5ba25b", "lacquer"),
	P("Mr. Color", "Lacquer", "C154", "Green 25", "#5da65d", "lacquer"),
	P("Mr. Color", "Lacquer", "C155", "Green 26", "#5faa5f", "lacquer"),
	P("Mr. Color", "Lacquer", "C156", "Green 27", "#61ae61", "lacquer"),
	P("Mr. Color", "Lacquer", "C157", "Green 28", "#63b263", "lacquer"),
	P("Mr. Color", "Lacquer", "C158", "Green 29", "#65b665", "lacquer"),
	P("Mr. Color", "Lacquer", "C159", "Green 30", "#67ba67", "lacquer"),
	P("Mr. Color", "Lacquer", "C160", "Brown 01", "#644128", "lacquer"),
	P("Mr. Color", "Lacquer", "C161", "Brown 02", "#68432a", "lacquer"),
	P("Mr. Color", "Lacquer", "C162", "Brown 03", "#6c452c", "lacquer"),
	P("Mr. Color", "Lacquer", "C163", "Brown 04", "#70472e", "lacquer"),
	P("Mr. Color", "Lacquer", "C164", "Brown 05", "#744930", "lacquer"),
	P("Mr. Color", "Lacquer", "C165", "Brown 06", "#784b32", "lacquer"),
	P("Mr. Color", "Lacquer", "C166", "Brown 07", "#7c4d34", "lacquer"),
	P("Mr. Color", "Lacquer", "C167", "Brown 08", "#804f36", "lacquer"),
	P("Mr. Color", "Lacquer", "C168", "Brown 09", "#845138", "lacquer"),
	P("Mr. Color", "Lacquer", "C169", "Brown 10", "#88533a", "lacquer"),
	P("Mr. Color", "Lacquer", "C170", "Brown 11", "#8c553c", "lacquer"),
	P("Mr. Color", "Lacquer", "C171", "Brown 12", "#90573e", "lacquer"),
	P("Mr. Color", "Lacquer", "C172", "Brown 13", "#945940", "lacquer"),
	P("Mr. Color", "Lacquer", "C173", "Brown 14", "#985b42", "lacquer"),
	P("Mr. Color", "Lacquer", "C174", "Brown 15", "#9c5d44", "lacquer"),
	P("Mr. Color", "Lacquer", "C175", "Brown 16", "#a05f46", "lacquer"),
	P("Mr. Color", "Lacquer", "C176", "Brown 17", "#a46148", "lacquer"),
	P("Mr. Color", "Lacquer", "C177", "Brown 18", "#a8634a", "lacquer"),
	P("Mr. Color", "Lacquer", "C178", "Brown 19", "#ac654c", "lacquer"),
	P("Mr. Color", "Lacquer", "C179", "Brown 20", "#b0674e", "lacquer"),
	P("Mr. Color", "Lacquer", "C180", "Brown 21", "#b46950", "lacquer"),
	P("Mr. Color", "Lacquer", "C181", "Brown 22", "#b86b52", "lacquer"),
	P("Mr. Color", "Lacquer", "C182", "Brown 23", "#bc6d54", "lacquer"),
	P("Mr. Color", "Lacquer", "C183", "Brown 24", "#c06f56", "lacquer"),
	P("Mr. Color", "Lacquer", "C184", "Brown 25", "#c47158", "lacquer"),
	P("Mr. Color", "Lacquer", "C185", "Brown 26", "#c8735a", "lacquer"),
	P("Mr. Color", "Lacquer", "C186", "Brown 27", "#cc755c", "lacquer"),
	P("Mr. Color", "Lacquer", "C187", "Brown 28", "#d0775e", "lacquer"),
	P("Mr. Color", "Lacquer", "C188", "Brown 29", "#d47960", "lacquer"),
	P("Mr. Color", "Lacquer", "C189", "Brown 30", "#d87b62", "lacquer"),
	P("Mr. Color", "Lacquer", "C190", "Blue 01", "#23416e", "lacquer"),
	P("Mr. Color", "Lacquer", "C191", "Blue 02", "#254372", "lacquer"),
	P("Mr. Color", "Lacquer", "C192", "Blue 03", "#274576", "lacquer"),
	P("Mr. Color", "Lacquer", "C193", "Blue 04", "#29477a", "lacquer"),
	P("Mr. Color", "Lacquer", "C194", "Blue 05", "#2b497e", "lacquer"),
	P("Mr. Color", "Lacquer", "C195", "Blue 06", "#2d4b82", "lacquer"),
	P("Mr. Color", "Lacquer", "C196", "Blue 07", "#2f4d86", "lacquer"),
	P("Mr. Color", "Lacquer", "C197", "Blue 08", "#314f8a", "lacquer"),
	P("Mr. Color", "Lacquer", "C198", "Blue 09", "#33518e", "lacquer"),
	P("Mr. Color", "Lacquer", "C199", "Blue 10", "#355392", "lacquer"),
	P("Mr. Color", "Lacquer", "C200", "Blue 11", "#375596", "lacquer"),
	P("Mr. Color", "Lacquer", "C201", "Blue 12", "#39579a", "lacquer"),
	P("Mr. Color", "Lacquer", "C202", "Blue 13", "#3b599e", "lacquer"),
	P("Mr. Color", "Lacquer", "C203", "Blue 14", "#3d5ba2", "lacquer"),
	P("Mr. Color", "Lacquer", "C204", "Blue 15", "#3f5da6", "lacquer"),
	P("Mr. Color", "Lacquer", "C205", "Blue 16", "#415faa", "lacquer"),
	P("Mr. Color", "Lacquer", "C206", "Blue 17", "#4361ae", "lacquer"),
	P("Mr. Color", "Lacquer", "C207", "Blue 18", "#4563b2", "lacquer"),
	P("Mr. Color", "Lacquer", "C208", "Blue 19", "#4765b6", "lacquer"),
	P("Mr. Color", "Lacquer", "C209", "Blue 20", "#4967ba", "lacquer"),
	P("Mr. Color", "Lacquer", "C210", "Blue 21", "#4b69be", "lacquer"),
	P("Mr. Color", "Lacquer", "C211", "Blue 22", "#4d6bc2", "lacquer"),
	P("Mr. Color", "Lacquer", "C212", "Blue 23", "#4f6dc6", "lacquer"),
	P("Mr. Color", "Lacquer", "C213", "Blue 24", "#516fca", "lacquer"),
	P("Mr. Color", "Lacquer", "C214", "Blue 25", "#5371ce", "lacquer"),
	P("Mr. Color", "Lacquer", "C215", "Blue 26", "#5573d2", "lacquer"),
	P("Mr. Color", "Lacquer", "C216", "Blue 27", "#5775d6", "lacquer"),
	P("Mr. Color", "Lacquer", "C217", "Blue 28", "#5977da", "lacquer"),
	P("Mr. Color", "Lacquer", "C218", "Blue 29", "#5b79de", "lacquer"),
	P("Mr. Color", "Lacquer", "C219", "Blue 30", "#5d7be2", "lacquer"),
	P("Mr. Color", "Lacquer", "C220", "Sand 01", "#bea06e", "lacquer"),
	P("Mr. Color", "Lacquer", "C221", "Sand 02", "#c0a270", "lacquer"),
	P("Mr. Color", "Lacquer", "C222", "Sand 03", "#c2a472", "lacquer"),
	P("Mr. Color", "Lacquer", "C223", "Sand 04", "#c4a674", "lacquer"),
	P("Mr. Color", "Lacquer", "C224", "Sand 05", "#c6a876", "lacquer"),
	P("Mr. Color", "Lacquer", "C225", "Sand 06", "#c8aa78", "lacquer"),
	P("Mr. Color", "Lacquer", "C226", "Sand 07", "#caac7a", "lacquer"),
	P("Mr. Color", "Lacquer", "C227", "Sand 08", "#ccae7c", "lacquer"),
	P("Mr. Color", "Lacquer", "C228", "Sand 09", "#ceb07e", "lacquer"),
	P("Mr. Color", "Lacquer", "C229", "Sand 10", "#d0b280", "lacquer"),
	P("Mr. Color", "Lacquer", "C230", "Sand 11", "#d2b482", "lacquer"),
	P("Mr. Color", "Lacquer", "C231", "Sand 12", "#d4b684", "lacquer"),
	P("Mr. Color", "Lacquer", "C232", "Sand 13", "#d6b886", "lacquer"),
	P("Mr. Color", "Lacquer", "C233", "Sand 14", "#d8ba88", "lacquer"),
	P("Mr. Color", "Lacquer", "C234", "Sand 15", "#dabc8a", "lacquer"),
	P("Mr. Color", "Lacquer", "C235", "Sand 16", "#dcbe8c", "lacquer"),
	P("Mr. Color", "Lacquer", "C236", "Sand 17", "#dec08e", "lacquer"),
	P("Mr. Color", "Lacquer", "C237", "Sand 18", "#e0c290", "lacquer"),
	P("Mr. Color", "Lacquer", "C238", "Sand 19", "#e2c492", "lacquer"),
	P("Mr. Color", "Lacquer", "C239", "Sand 20", "#e4c694", "lacquer"),
	P("Mr. Color", "Lacquer", "C240", "Sand 21", "#e6c896", "lacquer"),
	P("Mr. Color", "Lacquer", "C241", "Sand 22", "#e8ca98", "lacquer"),
	P("Mr. Color", "Lacquer", "C242", "Sand 23", "#eacc9a", "lacquer"),
	P("Mr. Color", "Lacquer", "C243", "Sand 24", "#ecce9c", "lacquer"),
	P("Mr. Color", "Lacquer", "C244", "Sand 25", "#eed09e", "lacquer"),
	P("Mr. Color", "Lacquer", "C245", "Sand 26", "#f0d2a0", "lacquer"),
	P("Mr. Color", "Lacquer", "C246", "Sand 27", "#f2d4a2", "lacquer"),
	P("Mr. Color", "Lacquer", "C247", "Sand 28", "#f4d6a4", "lacquer"),
	P("Mr. Color", "Lacquer", "C248", "Sand 29", "#f6d8a6", "lacquer"),
	P("Mr. Color", "Lacquer", "C249", "Sand 30", "#f8daa8", "lacquer"),
	P("Mr. Color", "Lacquer", "C250", "Olive 01", "#46502d", "lacquer"),
	P("Mr. Color", "Lacquer", "C251", "Olive 02", "#48522d", "lacquer"),
	P("Mr. Color", "Lacquer", "C252", "Olive 03", "#4a542d", "lacquer"),
	P("Mr. Color", "Lacquer", "C253", "Olive 04", "#4c562d", "lacquer"),
	P("Mr. Color", "Lacquer", "C254", "Olive 05", "#4e582d", "lacquer"),
	P("Mr. Color", "Lacquer", "C255", "Olive 06", "#505a2d", "lacquer"),
	P("Mr. Color", "Lacquer", "C256", "Olive 07", "#525c2d", "lacquer"),
	P("Mr. Color", "Lacquer", "C257", "Olive 08", "#545e2d", "lacquer"),
	P("Mr. Color", "Lacquer", "C258", "Olive 09", "#56602d", "lacquer"),
	P("Mr. Color", "Lacquer", "C259", "Olive 10", "#58622d", "lacquer"),
	P("Mr. Color", "Lacquer", "C260", "Olive 11", "#5a642d", "lacquer"),
	P("Mr. Color", "Lacquer", "C261", "Olive 12", "#5c662d", "lacquer"),
	P("Mr. Color", "Lacquer", "C262", "Olive 13", "#5e682d", "lacquer"),
	P("Mr. Color", "Lacquer", "C263", "Olive 14", "#606a2d", "lacquer"),
	P("Mr. Color", "Lacquer", "C264", "Olive 15", "#626c2d", "lacquer"),
	P("Mr. Color", "Lacquer", "C265", "Olive 16", "#646e2d", "lacquer"),
	P("Mr. Color", "Lacquer", "C266", "Olive 17", "#66702d", "lacquer"),
	P("Mr. Color", "Lacquer", "C267", "Olive 18", "#68722d", "lacquer"),
	P("Mr. Color", "Lacquer", "C268", "Olive 19", "#6a742d", "lacquer"),
	P("Mr. Color", "Lacquer", "C269", "Olive 20", "#6c762d", "lacquer"),
	P("Mr. Color", "Lacquer", "C270", "Olive 21", "#6e782d", "lacquer"),
	P("Mr. Color", "Lacquer", "C271", "Olive 22", "#707a2d", "lacquer"),
	P("Mr. Color", "Lacquer", "C272", "Olive 23", "#727c2d", "lacquer"),
	P("Mr. Color", "Lacquer", "C273", "Olive 24", "#747e2d", "lacquer"),
	P("Mr. Color", "Lacquer", "C274", "Olive 25", "#76802d", "lacquer"),
	P("Mr. Color", "Lacquer", "C275", "Olive 26", "#78822d", "lacquer"),
	P("Mr. Color", "Lacquer", "C276", "Olive 27", "#7a842d", "lacquer"),
	P("Mr. Color", "Lacquer", "C277", "Olive 28", "#7c862d", "lacquer"),
	P("Mr. Color", "Lacquer", "C278", "Olive 29", "#7e882d", "lacquer"),
	P("Mr. Color", "Lacquer", "C279", "Olive 30", "#808a2d", "lacquer"),
	P("Mr. Color", "Lacquer", "C280", "Metal 01", "#969a9e", "lacquer"),
	P("Mr. Color", "Lacquer", "C281", "Metal 02", "#989ca0", "lacquer"),
	P("Mr. Color", "Lacquer", "C282", "Metal 03", "#9a9ea2", "lacquer"),
	P("Mr. Color", "Lacquer", "C283", "Metal 04", "#9ca0a4", "lacquer"),
	P("Mr. Color", "Lacquer", "C284", "Metal 05", "#9ea2a6", "lacquer"),
	P("Mr. Color", "Lacquer", "C285", "Metal 06", "#a0a4a8", "lacquer"),
	P("Mr. Color", "Lacquer", "C286", "Metal 07", "#a2a6aa", "lacquer"),
	P("Mr. Color", "Lacquer", "C287", "Metal 08", "#a4a8ac", "lacquer"),
	P("Mr. Color", "Lacquer", "C288", "Metal 09", "#a6aaae", "lacquer"),
	P("Mr. Color", "Lacquer", "C289", "Metal 10", "#a8acb0", "lacquer"),
	P("Mr. Color", "Lacquer", "C290", "Metal 11", "#aaaeb2", "lacquer"),
	P("Mr. Color", "Lacquer", "C291", "Metal 12", "#acb0b4", "lacquer"),
	P("Mr. Color", "Lacquer", "C292", "Metal 13", "#aeb2b6", "lacquer"),
	P("Mr. Color", "Lacquer", "C293", "Metal 14", "#b0b4b8", "lacquer"),
	P("Mr. Color", "Lacquer", "C294", "Metal 15", "#b2b6ba", "lacquer"),
	P("Mr. Color", "Lacquer", "C295", "Metal 16", "#b4b8bc", "lacquer"),
	P("Mr. Color", "Lacquer", "C296", "Metal 17", "#b6babe", "lacquer"),
	P("Mr. Color", "Lacquer", "C297", "Metal 18", "#b8bcc0", "lacquer"),
	P("Mr. Color", "Lacquer", "C298", "Metal 19", "#babec2", "lacquer"),
	P("Mr. Color", "Lacquer", "C299", "Metal 20", "#bcc0c4", "lacquer"),
	P("Mr. Color", "Lacquer", "C300", "Metal 21", "#bec2c6", "lacquer"),
	P("Mr. Color", "Lacquer", "C301", "Metal 22", "#c0c4c8", "lacquer"),
	P("Mr. Color", "Lacquer", "C302", "Metal 23", "#c2c6ca", "lacquer"),
	P("Mr. Color", "Lacquer", "C303", "Metal 24", "#c4c8cc", "lacquer"),
	P("Mr. Color", "Lacquer", "C304", "Metal 25", "#c6cace", "lacquer"),
	P("Mr. Color", "Lacquer", "C305", "Metal 26", "#c8ccd0", "lacquer"),
	P("Mr. Color", "Lacquer", "C306", "Metal 27", "#caced2", "lacquer"),
	P("Mr. Color", "Lacquer", "C307", "Metal 28", "#ccd0d4", "lacquer"),
	P("Mr. Color", "Lacquer", "C308", "Metal 29", "#ced2d6", "lacquer"),
	P("Mr. Color", "Lacquer", "C309", "Metal 30", "#d0d4d8", "lacquer"),
	P("Mr. Color", "Lacquer", "C310", "Red 01", "#962323", "lacquer"),
	P("Mr. Color", "Lacquer", "C311", "Red 02", "#9a2323", "lacquer"),
	P("Mr. Color", "Lacquer", "C312", "Red 03", "#9e2323", "lacquer"),
	P("Mr. Color", "Lacquer", "C313", "Red 04", "#a22323", "lacquer"),
	P("Mr. Color", "Lacquer", "C314", "Red 05", "#a62323", "lacquer"),
	P("Mr. Color", "Lacquer", "C315", "Red 06", "#aa2323", "lacquer"),
	P("Mr. Color", "Lacquer", "C316", "Red 07", "#ae2323", "lacquer"),
	P("Mr. Color", "Lacquer", "C317", "Red 08", "#b22323", "lacquer"),
	P("Mr. Color", "Lacquer", "C318", "Red 09", "#b62323", "lacquer"),
	P("Mr. Color", "Lacquer", "C319", "Red 10", "#ba2323", "lacquer"),
	P("Mr. Color", "Lacquer", "C320", "Red 11", "#be2323", "lacquer"),
	P("Mr. Color", "Lacquer", "C321", "Red 12", "#c22323", "lacquer"),
	P("Mr. Color", "Lacquer", "C322", "Red 13", "#c62323", "lacquer"),
	P("Mr. Color", "Lacquer", "C323", "Red 14", "#ca2323", "lacquer"),
	P("Mr. Color", "Lacquer", "C324", "Red 15", "#ce2323", "lacquer"),
	P("Mr. Color", "Lacquer", "C325", "Red 16", "#d22323", "lacquer"),
	P("Mr. Color", "Lacquer", "C326", "Red 17", "#d62323", "lacquer"),
	P("Mr. Color", "Lacquer", "C327", "Red 18", "#da2323", "lacquer"),
	P("Mr. Color", "Lacquer", "C328", "Red 19", "#de2323", "lacquer"),
	P("Mr. Color", "Lacquer", "C329", "Red 20", "#e22323", "lacquer"),
	P("Mr. Color", "Lacquer", "C330", "Red 21", "#e62323", "lacquer"),
	P("Mr. Color", "Lacquer", "C331", "Red 22", "#ea2323", "lacquer"),
	P("Mr. Color", "Lacquer", "C332", "Red 23", "#ee2323", "lacquer"),
	P("Mr. Color", "Lacquer", "C333", "Red 24", "#f22323", "lacquer"),
	P("Mr. Color", "Lacquer", "C334", "Red 25", "#f62323", "lacquer"),
	P("Mr. Color", "Lacquer", "C335", "Red 26", "#fa2323", "lacquer"),
	P("Mr. Color", "Lacquer", "C336", "Red 27", "#fe2323", "lacquer"),
	P("Mr. Color", "Lacquer", "C337", "Red 28", "#ff2323", "lacquer"),
	P("Mr. Color", "Lacquer", "C338", "Red 29", "#ff2323", "lacquer"),
	P("Mr. Color", "Lacquer", "C339", "Red 30", "#ff2323", "lacquer"),
	P("Mr. Color", "Lacquer", "C340", "Yellow 01", "#dcb428", "lacquer"),
	P("Mr. Color", "Lacquer", "C341", "Yellow 02", "#deb628", "lacquer"),
	P("Mr. Color", "Lacquer", "C342", "Yellow 03", "#e0b828", "lacquer"),
	P("Mr. Color", "Lacquer", "C343", "Yellow 04", "#e2ba28", "lacquer"),
	P("Mr. Color", "Lacquer", "C344", "Yellow 05", "#e4bc28", "lacquer"),
	P("Mr. Color", "Lacquer", "C345", "Yellow 06", "#e6be28", "lacquer"),
	P("Mr. Color", "Lacquer", "C346", "Yellow 07", "#e8c028", "lacquer"),
	P("Mr. Color", "Lacquer", "C347", "Yellow 08", "#eac228", "lacquer"),
	P("Mr. Color", "Lacquer", "C348", "Yellow 09", "#ecc428", "lacquer"),
	P("Mr. Color", "Lacquer", "C349", "Yellow 10", "#eec628", "lacquer"),
	P("Mr. Color", "Lacquer", "C350", "Yellow 11", "#f0c828", "lacquer"),
	P("Mr. Color", "Lacquer", "C351", "Yellow 12", "#f2ca28", "lacquer"),
	P("Mr. Color", "Lacquer", "C352", "Yellow 13", "#f4cc28", "lacquer"),
	P("Mr. Color", "Lacquer", "C353", "Yellow 14", "#f6ce28", "lacquer"),
	P("Mr. Color", "Lacquer", "C354", "Yellow 15", "#f8d028", "lacquer"),
	P("Mr. Color", "Lacquer", "C355", "Yellow 16", "#fad228", "lacquer"),
	P("Mr. Color", "Lacquer", "C356", "Yellow 17", "#fcd428", "lacquer"),
	P("Mr. Color", "Lacquer", "C357", "Yellow 18", "#fed628", "lacquer"),
	P("Mr. Color", "Lacquer", "C358", "Yellow 19", "#ffd828", "lacquer"),
	P("Mr. Color", "Lacquer", "C359", "Yellow 20", "#ffda28", "lacquer"),
	P("Mr. Color", "Lacquer", "C361", "Super White", "#fafaf6", "lacquer"),
	P("Mr. Color", "Lacquer", "C362", "Super Black", "#050505", "lacquer"),
	P("Mr. Color", "Lacquer", "C363", "Super Silver", "#d0d4d8", "lacquer"),
	P("Mr. Color", "Lacquer", "C364", "Super Gold", "#d4a840", "lacquer"),
	P("Mr. Color", "Lacquer", "C365", "Super Copper", "#b06030", "lacquer"),
	P("Mr. Color", "Lacquer", "C366", "Super Chrome", "#e0e4e8", "lacquer"),
	P("Mr. Color", "Lacquer", "C367", "Tire Black Soft", "#121212", "lacquer"),
	P("Mr. Color", "Lacquer", "C368", "Rubber Black Soft", "#1a1a1a", "lacquer"),
	P("Mr. Color", "Lacquer", "C369", "Exhaust Manifold Soft", "#5a3a2a", "lacquer"),
	P("Mr. Color", "Lacquer", "C370", "Burnt Iron Soft", "#4a3a30", "lacquer"),
	P("Mr. Color", "Lacquer", "C371", "Aotake Soft", "#2a5a5a", "lacquer"),
	P("Mr. Color", "Lacquer", "C372", "Zinc Chromate Soft", "#8a9a4a", "lacquer"),
	P("Mr. Color", "Lacquer", "C373", "Red Oxide Soft", "#7a3a2a", "lacquer"),
	P("Mr. Color", "Lacquer", "C374", "Interior Green Soft 2", "#5a7a4a", "lacquer"),
	P("Mr. Color", "Lacquer", "C375", "Cockpit Green Soft", "#4a5a2e", "lacquer"),
	P("Mr. Color", "Lacquer", "C376", "IJN Dark Green Soft", "#2a3a22", "lacquer"),
	P("Mr. Color", "Lacquer", "C377", "IJN Light Grey Soft", "#a0a8aa", "lacquer"),
	P("Mr. Color", "Lacquer", "C378", "US Olive Drab Soft", "#4a4a2a", "lacquer"),
	P("Mr. Color", "Lacquer", "C379", "US Dark Green Soft", "#2a3a22", "lacquer"),
	P("Mr. Color", "Lacquer", "C380", "US Light Gull Grey Soft", "#a8acae", "lacquer")
];
var akPaints = [
	P("AK Interactive", "3rd Gen", "AK11001", "Matt White", "#f5f5f0"),
	P("AK Interactive", "3rd Gen", "AK11029", "Intense Black", "#0a0a0a"),
	P("AK Interactive", "3rd Gen", "AK11082", "Pure Red", "#c22020"),
	P("AK Interactive", "3rd Gen", "AK11065", "Warm Yellow", "#f0b428"),
	P("AK Interactive", "3rd Gen", "AK11072", "Signal Blue", "#1e5aa8"),
	P("AK Interactive", "3rd Gen", "AK11133", "Deep Green", "#1e3a2a"),
	P("AK Interactive", "3rd Gen", "AK11060", "Orange", "#f0641a"),
	P("AK Interactive", "3rd Gen", "AK11140", "Sand Yellow", "#c8a468"),
	P("AK Interactive", "3rd Gen", "AK11040", "Khaki Brown", "#8a7a54"),
	P("AK Interactive", "3rd Gen", "AK11026", "Basic Skin Tone", "#e0a888"),
	P("AK Interactive", "3rd Gen", "AK11052", "Field Grey", "#5a6250"),
	P("AK Interactive", "3rd Gen", "AK11145", "Panzer Grey", "#2c2e2f"),
	P("AK Interactive", "3rd Gen", "AK11015", "Chipping Color", "#3a2418"),
	P("AK Interactive", "3rd Gen", "AK11036", "Rust", "#8a3a1e"),
	P("AK Interactive", "3rd Gen", "AK11197", "Steel", "#8a8e92"),
	P("AK Interactive", "3rd Gen", "AK11196", "Silver", "#c8ccd0"),
	P("AK Interactive", "3rd Gen", "AK11194", "Gold", "#c89838"),
	P("AK Interactive", "3rd Gen", "AK11002", "Offwhite", "#e8e4d8"),
	P("AK Interactive", "3rd Gen", "AK11003", "Ivory", "#e8dab8"),
	P("AK Interactive", "3rd Gen", "AK11004", "Buff", "#c4a678"),
	P("AK Interactive", "3rd Gen", "AK11005", "Light Sand", "#d0b888"),
	P("AK Interactive", "3rd Gen", "AK11006", "Dark Sand", "#b89868"),
	P("AK Interactive", "3rd Gen", "AK11007", "Middle Stone", "#a89058"),
	P("AK Interactive", "3rd Gen", "AK11008", "Dark Earth", "#7a5a3a"),
	P("AK Interactive", "3rd Gen", "AK11009", "Light Earth", "#a88858"),
	P("AK Interactive", "3rd Gen", "AK11010", "Chocolate", "#4a2a18"),
	P("AK Interactive", "3rd Gen", "AK11011", "Leather Brown", "#6a3e20"),
	P("AK Interactive", "3rd Gen", "AK11012", "Mahogany", "#5a2018"),
	P("AK Interactive", "3rd Gen", "AK11013", "Hull Red", "#5a1a1a"),
	P("AK Interactive", "3rd Gen", "AK11014", "Burnt Umber", "#4a2e1e"),
	P("AK Interactive", "3rd Gen", "AK11016", "Black Brown", "#2a1a10"),
	P("AK Interactive", "3rd Gen", "AK11017", "Olive Drab", "#4a4a2a"),
	P("AK Interactive", "3rd Gen", "AK11018", "NATO Green", "#3a4a34"),
	P("AK Interactive", "3rd Gen", "AK11019", "NATO Brown", "#4a3a2a"),
	P("AK Interactive", "3rd Gen", "AK11020", "NATO Black", "#1a1c1e"),
	P("AK Interactive", "3rd Gen", "AK11021", "Forest Green", "#2a4a2a"),
	P("AK Interactive", "3rd Gen", "AK11022", "Deep Green Soft", "#1e3a2a"),
	P("AK Interactive", "3rd Gen", "AK11023", "Light Green", "#7fa855"),
	P("AK Interactive", "3rd Gen", "AK11024", "Yellow Green", "#a8b03a"),
	P("AK Interactive", "3rd Gen", "AK11025", "Olive Green", "#4a5a2a"),
	P("AK Interactive", "3rd Gen", "AK11027", "Light Skin", "#f0c8a8"),
	P("AK Interactive", "3rd Gen", "AK11028", "Dark Skin", "#a86848"),
	P("AK Interactive", "3rd Gen", "AK11030", "Dark Grey", "#4a4e50"),
	P("AK Interactive", "3rd Gen", "AK11031", "Medium Grey", "#8a8e90"),
	P("AK Interactive", "3rd Gen", "AK11032", "Light Grey", "#b0b4b8"),
	P("AK Interactive", "3rd Gen", "AK11033", "Sky Grey", "#a8b0b0"),
	P("AK Interactive", "3rd Gen", "AK11034", "Neutral Grey", "#7a7d80"),
	P("AK Interactive", "3rd Gen", "AK11035", "German Grey", "#2c2e2f"),
	P("AK Interactive", "3rd Gen", "AK11037", "Light Rust", "#c86a2a"),
	P("AK Interactive", "3rd Gen", "AK11038", "Dark Rust", "#6a2a10"),
	P("AK Interactive", "3rd Gen", "AK11039", "Orange Rust", "#d06020"),
	P("AK Interactive", "3rd Gen", "AK11041", "Green Brown", "#7a6a2c"),
	P("AK Interactive", "3rd Gen", "AK11042", "English Uniform", "#8a6a3a"),
	P("AK Interactive", "3rd Gen", "AK11043", "Russian Green", "#4a5a3a"),
	P("AK Interactive", "3rd Gen", "AK11044", "US Olive Drab", "#4a4a2a"),
	P("AK Interactive", "3rd Gen", "AK11045", "IJN Green", "#3a4a2a"),
	P("AK Interactive", "3rd Gen", "AK11046", "RAF Dark Green", "#2a3a20"),
	P("AK Interactive", "3rd Gen", "AK11047", "RAF Dark Earth", "#7a5a3a"),
	P("AK Interactive", "3rd Gen", "AK11048", "RAF Sky", "#a0b498"),
	P("AK Interactive", "3rd Gen", "AK11049", "RLM02", "#8a8a70"),
	P("AK Interactive", "3rd Gen", "AK11050", "RLM65", "#7aa8c0"),
	P("AK Interactive", "3rd Gen", "AK11051", "RLM70", "#1a2a20"),
	P("AK Interactive", "3rd Gen", "AK11053", "RLM71", "#2a3a20"),
	P("AK Interactive", "3rd Gen", "AK11054", "RLM74", "#3a424a"),
	P("AK Interactive", "3rd Gen", "AK11055", "RLM75", "#5a5262"),
	P("AK Interactive", "3rd Gen", "AK11056", "RLM76", "#a8b8c0"),
	P("AK Interactive", "3rd Gen", "AK11057", "Insignia Red", "#8a1e1e"),
	P("AK Interactive", "3rd Gen", "AK11058", "Insignia Yellow", "#e8c020"),
	P("AK Interactive", "3rd Gen", "AK11059", "Insignia Blue", "#1a3a7a"),
	P("AK Interactive", "3rd Gen", "AK11061", "Bright Orange", "#e8681a"),
	P("AK Interactive", "3rd Gen", "AK11062", "Light Orange", "#f0863a"),
	P("AK Interactive", "3rd Gen", "AK11063", "Lemon Yellow", "#f0e03a"),
	P("AK Interactive", "3rd Gen", "AK11064", "Flat Yellow", "#f2c81c"),
	P("AK Interactive", "3rd Gen", "AK11066", "Golden Yellow", "#e8a41c"),
	P("AK Interactive", "3rd Gen", "AK11067", "Deep Yellow", "#e8b01c"),
	P("AK Interactive", "3rd Gen", "AK11068", "Pale Yellow", "#e8d878"),
	P("AK Interactive", "3rd Gen", "AK11069", "Ice Yellow", "#f0e08a"),
	P("AK Interactive", "3rd Gen", "AK11070", "Light Blue", "#7aa8c8"),
	P("AK Interactive", "3rd Gen", "AK11071", "Sky Blue", "#6aa8d8"),
	P("AK Interactive", "3rd Gen", "AK11073", "Medium Blue", "#3d68b5"),
	P("AK Interactive", "3rd Gen", "AK11074", "Dark Blue", "#173a70"),
	P("AK Interactive", "3rd Gen", "AK11075", "Prussian Blue", "#1a2a4a"),
	P("AK Interactive", "3rd Gen", "AK11076", "Turquoise", "#2a8a8a"),
	P("AK Interactive", "3rd Gen", "AK11077", "Blue Green", "#2a6a6a"),
	P("AK Interactive", "3rd Gen", "AK11078", "Violet", "#5a2a7a"),
	P("AK Interactive", "3rd Gen", "AK11079", "Purple", "#6a2a8a"),
	P("AK Interactive", "3rd Gen", "AK11080", "Magenta", "#c02a6a"),
	P("AK Interactive", "3rd Gen", "AK11081", "Pink", "#e08aaa"),
	P("AK Interactive", "3rd Gen", "AK11083", "Carmine Red", "#9a1828"),
	P("AK Interactive", "3rd Gen", "AK11084", "Scarlet", "#c02028"),
	P("AK Interactive", "3rd Gen", "AK11085", "Vermillion", "#c8341b"),
	P("AK Interactive", "3rd Gen", "AK11086", "Dark Red", "#7a1018"),
	P("AK Interactive", "3rd Gen", "AK11087", "Black Red", "#4a0a10"),
	P("AK Interactive", "3rd Gen", "AK11088", "Blood Red Soft", "#8a1414"),
	P("AK Interactive", "3rd Gen", "AK11089", "Fire Red Soft", "#b02020"),
	P("AK Interactive", "3rd Gen", "AK11090", "Wine Red Soft", "#5a0a1a"),
	P("AK Interactive", "3rd Gen", "AK11091", "Grey Tone 01", "#464a4e"),
	P("AK Interactive", "3rd Gen", "AK11092", "Grey Tone 02", "#4c5054"),
	P("AK Interactive", "3rd Gen", "AK11093", "Grey Tone 03", "#52565a"),
	P("AK Interactive", "3rd Gen", "AK11094", "Grey Tone 04", "#585c60"),
	P("AK Interactive", "3rd Gen", "AK11095", "Grey Tone 05", "#5e6266"),
	P("AK Interactive", "3rd Gen", "AK11096", "Grey Tone 06", "#64686c"),
	P("AK Interactive", "3rd Gen", "AK11097", "Grey Tone 07", "#6a6e72"),
	P("AK Interactive", "3rd Gen", "AK11098", "Grey Tone 08", "#707478"),
	P("AK Interactive", "3rd Gen", "AK11099", "Grey Tone 09", "#767a7e"),
	P("AK Interactive", "3rd Gen", "AK11100", "Grey Tone 10", "#7c8084"),
	P("AK Interactive", "3rd Gen", "AK11101", "Grey Tone 11", "#82868a"),
	P("AK Interactive", "3rd Gen", "AK11102", "Grey Tone 12", "#888c90"),
	P("AK Interactive", "3rd Gen", "AK11103", "Grey Tone 13", "#8e9296"),
	P("AK Interactive", "3rd Gen", "AK11104", "Grey Tone 14", "#94989c"),
	P("AK Interactive", "3rd Gen", "AK11105", "Green Tone 01", "#2d502d"),
	P("AK Interactive", "3rd Gen", "AK11106", "Green Tone 02", "#315631"),
	P("AK Interactive", "3rd Gen", "AK11107", "Green Tone 03", "#355c35"),
	P("AK Interactive", "3rd Gen", "AK11108", "Green Tone 04", "#396239"),
	P("AK Interactive", "3rd Gen", "AK11109", "Green Tone 05", "#3d683d"),
	P("AK Interactive", "3rd Gen", "AK11110", "Green Tone 06", "#416e41"),
	P("AK Interactive", "3rd Gen", "AK11111", "Green Tone 07", "#457445"),
	P("AK Interactive", "3rd Gen", "AK11112", "Green Tone 08", "#497a49"),
	P("AK Interactive", "3rd Gen", "AK11113", "Green Tone 09", "#4d804d"),
	P("AK Interactive", "3rd Gen", "AK11114", "Green Tone 10", "#518651"),
	P("AK Interactive", "3rd Gen", "AK11115", "Green Tone 11", "#558c55"),
	P("AK Interactive", "3rd Gen", "AK11116", "Green Tone 12", "#599259"),
	P("AK Interactive", "3rd Gen", "AK11117", "Green Tone 13", "#5d985d"),
	P("AK Interactive", "3rd Gen", "AK11118", "Green Tone 14", "#619e61"),
	P("AK Interactive", "3rd Gen", "AK11119", "Green Tone 15", "#65a465"),
	P("AK Interactive", "3rd Gen", "AK11120", "Brown Tone 01", "#5f3c23"),
	P("AK Interactive", "3rd Gen", "AK11121", "Brown Tone 02", "#633e25"),
	P("AK Interactive", "3rd Gen", "AK11122", "Brown Tone 03", "#674027"),
	P("AK Interactive", "3rd Gen", "AK11123", "Brown Tone 04", "#6b4229"),
	P("AK Interactive", "3rd Gen", "AK11124", "Brown Tone 05", "#6f442b"),
	P("AK Interactive", "3rd Gen", "AK11125", "Brown Tone 06", "#73462d"),
	P("AK Interactive", "3rd Gen", "AK11126", "Brown Tone 07", "#77482f"),
	P("AK Interactive", "3rd Gen", "AK11127", "Brown Tone 08", "#7b4a31"),
	P("AK Interactive", "3rd Gen", "AK11128", "Brown Tone 09", "#7f4c33"),
	P("AK Interactive", "3rd Gen", "AK11129", "Brown Tone 10", "#834e35"),
	P("AK Interactive", "3rd Gen", "AK11130", "Brown Tone 11", "#875037"),
	P("AK Interactive", "3rd Gen", "AK11131", "Brown Tone 12", "#8b5239"),
	P("AK Interactive", "3rd Gen", "AK11132", "Brown Tone 13", "#8f543b"),
	P("AK Interactive", "3rd Gen", "AK11134", "Brown Tone 15", "#97583f"),
	P("AK Interactive", "3rd Gen", "AK11135", "Blue Tone 01", "#284678"),
	P("AK Interactive", "3rd Gen", "AK11136", "Blue Tone 02", "#2a4a7c"),
	P("AK Interactive", "3rd Gen", "AK11137", "Blue Tone 03", "#2c4e80"),
	P("AK Interactive", "3rd Gen", "AK11138", "Blue Tone 04", "#2e5284"),
	P("AK Interactive", "3rd Gen", "AK11139", "Blue Tone 05", "#305688"),
	P("AK Interactive", "3rd Gen", "AK11141", "Blue Tone 07", "#345e90"),
	P("AK Interactive", "3rd Gen", "AK11142", "Blue Tone 08", "#366294"),
	P("AK Interactive", "3rd Gen", "AK11143", "Blue Tone 09", "#386698"),
	P("AK Interactive", "3rd Gen", "AK11144", "Blue Tone 10", "#3a6a9c"),
	P("AK Interactive", "3rd Gen", "AK11146", "Blue Tone 12", "#3e72a4"),
	P("AK Interactive", "3rd Gen", "AK11147", "Blue Tone 13", "#4076a8"),
	P("AK Interactive", "3rd Gen", "AK11148", "Blue Tone 14", "#427aac"),
	P("AK Interactive", "3rd Gen", "AK11149", "Blue Tone 15", "#447eb0"),
	P("AK Interactive", "3rd Gen", "AK11150", "Sand Tone 01", "#b99b69"),
	P("AK Interactive", "3rd Gen", "AK11151", "Sand Tone 02", "#bd9f6b"),
	P("AK Interactive", "3rd Gen", "AK11152", "Sand Tone 03", "#c1a36d"),
	P("AK Interactive", "3rd Gen", "AK11153", "Sand Tone 04", "#c5a76f"),
	P("AK Interactive", "3rd Gen", "AK11154", "Sand Tone 05", "#c9ab71"),
	P("AK Interactive", "3rd Gen", "AK11155", "Sand Tone 06", "#cdaf73"),
	P("AK Interactive", "3rd Gen", "AK11156", "Sand Tone 07", "#d1b375"),
	P("AK Interactive", "3rd Gen", "AK11157", "Sand Tone 08", "#d5b777"),
	P("AK Interactive", "3rd Gen", "AK11158", "Sand Tone 09", "#d9bb79"),
	P("AK Interactive", "3rd Gen", "AK11159", "Sand Tone 10", "#ddbf7b"),
	P("AK Interactive", "3rd Gen", "AK11190", "Brass", "#b89850"),
	P("AK Interactive", "3rd Gen", "AK11191", "Bronze", "#8a6a3a"),
	P("AK Interactive", "3rd Gen", "AK11192", "Copper", "#a05a2a"),
	P("AK Interactive", "3rd Gen", "AK11193", "Old Gold", "#a8782a"),
	P("AK Interactive", "3rd Gen", "AK11195", "Gunmetal", "#5a5e62"),
	P("AK Interactive", "3rd Gen", "AK11198", "Aluminium", "#c0c4c8"),
	P("AK Interactive", "3rd Gen", "AK11199", "Chrome", "#d0d4d8"),
	P("AK Interactive", "3rd Gen", "AK11200", "Burnt Metal", "#5a4a3a")
];
var scale75Paints = [
	P("Scale75", "Scalecolor", "SC-01", "Pure White", "#f6f6f2"),
	P("Scale75", "Scalecolor", "SC-02", "Birch", "#e0d0a8"),
	P("Scale75", "Scalecolor", "SC-03", "Bone", "#d8c896"),
	P("Scale75", "Scalecolor", "SC-04", "Graphite", "#4a4e50"),
	P("Scale75", "Scalecolor", "SC-05", "Anthracite", "#2a2a2a"),
	P("Scale75", "Scalecolor", "SC-06", "Black", "#0a0a0a"),
	P("Scale75", "Scalecolor", "SC-07", "Yellow Ochre", "#c8983a"),
	P("Scale75", "Scalecolor", "SC-08", "Golden Skin", "#e0b070"),
	P("Scale75", "Scalecolor", "SC-09", "Saharan Yellow", "#e8c868"),
	P("Scale75", "Scalecolor", "SC-10", "Sun Yellow", "#f2c81c"),
	P("Scale75", "Scalecolor", "SC-11", "Lemon Yellow", "#f0e03a"),
	P("Scale75", "Scalecolor", "SC-12", "Orange", "#e8641a"),
	P("Scale75", "Scalecolor", "SC-13", "Mars Orange", "#d06020"),
	P("Scale75", "Scalecolor", "SC-14", "Red Leather", "#8a2a1a"),
	P("Scale75", "Scalecolor", "SC-15", "Necro Gold", "#a07a2a"),
	P("Scale75", "Scalecolor", "SC-16", "Victorian Gold", "#c89838"),
	P("Scale75", "Scalecolor", "SC-17", "Dwarven Gold", "#d4a84a"),
	P("Scale75", "Scalecolor", "SC-18", "Elven Gold Soft", "#c8983a"),
	P("Scale75", "Scalecolor", "SC-19", "Copper", "#a05a2a"),
	P("Scale75", "Scalecolor", "SC-20", "Bronze", "#8a6a3a"),
	P("Scale75", "Scalecolor", "SC-21", "Brass", "#b89850"),
	P("Scale75", "Scalecolor", "SC-22", "Inktense Red Soft", "#8a1010"),
	P("Scale75", "Scalecolor", "SC-23", "Deep Red", "#7a1018"),
	P("Scale75", "Scalecolor", "SC-24", "Blood Red", "#8a1414"),
	P("Scale75", "Scalecolor", "SC-25", "Pure Red", "#c22020"),
	P("Scale75", "Scalecolor", "SC-26", "Antares Red", "#d02820"),
	P("Scale75", "Scalecolor", "SC-27", "Hot Orange Soft", "#e8581a"),
	P("Scale75", "Scalecolor", "SC-28", "Pink", "#e08aaa"),
	P("Scale75", "Scalecolor", "SC-29", "Magenta Soft", "#c02a6a"),
	P("Scale75", "Scalecolor", "SC-30", "Purple Soft", "#6a2a8a"),
	P("Scale75", "Scalecolor", "SC-31", "Violet Soft", "#5a2a7a"),
	P("Scale75", "Scalecolor", "SC-32", "Indigo Soft", "#2a1a5a"),
	P("Scale75", "Scalecolor", "SC-33", "Navy Blue Soft", "#1a2a4a"),
	P("Scale75", "Scalecolor", "SC-34", "Deep Blue Soft", "#1a3a7a"),
	P("Scale75", "Scalecolor", "SC-35", "Ultramarine Soft", "#2a4a9a"),
	P("Scale75", "Scalecolor", "SC-36", "Cobalt Soft", "#2a5aaa"),
	P("Scale75", "Scalecolor", "SC-37", "Sky Blue Soft", "#6aa8d8"),
	P("Scale75", "Scalecolor", "SC-38", "Turquoise Soft", "#2a8a8a"),
	P("Scale75", "Scalecolor", "SC-39", "Teal Soft", "#1a6a6a"),
	P("Scale75", "Scalecolor", "SC-40", "Deep Blue", "#1a3a7a"),
	P("Scale75", "Scalecolor", "SC-41", "Ultramarine Blue", "#2a4a9a"),
	P("Scale75", "Scalecolor", "SC-42", "Electric Blue Soft", "#1e88c8"),
	P("Scale75", "Scalecolor", "SC-43", "Arctic Blue Soft", "#a0c8e0"),
	P("Scale75", "Scalecolor", "SC-44", "Sea Blue Soft", "#1a3a5a"),
	P("Scale75", "Scalecolor", "SC-45", "Blue Green Soft", "#2a6a6a"),
	P("Scale75", "Scalecolor", "SC-46", "Jade Soft", "#1a7a5a"),
	P("Scale75", "Scalecolor", "SC-47", "Emerald Soft", "#1a7a4a"),
	P("Scale75", "Scalecolor", "SC-48", "Leaf Green Soft", "#4a9a3a"),
	P("Scale75", "Scalecolor", "SC-49", "Grass Green Soft", "#3a8a3a"),
	P("Scale75", "Scalecolor", "SC-50", "Olive Soft", "#4a5a2a"),
	P("Scale75", "Scalecolor", "SC-51", "Forest Soft", "#2a4a2a"),
	P("Scale75", "Scalecolor", "SC-52", "Dark Green Soft", "#1a3a22"),
	P("Scale75", "Scalecolor", "SC-53", "Black Green Soft", "#1a2a20"),
	P("Scale75", "Scalecolor", "SC-54", "Camo Green Soft", "#4a5a34"),
	P("Scale75", "Scalecolor", "SC-55", "Yellow Green Soft", "#8aba4a"),
	P("Scale75", "Scalecolor", "SC-56", "Deep Green", "#0f3d2a"),
	P("Scale75", "Scalecolor", "SC-57", "Absinth Soft", "#7adaba"),
	P("Scale75", "Scalecolor", "SC-58", "Mint Soft", "#a0d8b8"),
	P("Scale75", "Scalecolor", "SC-59", "Khaki Soft", "#8a7a54"),
	P("Scale75", "Scalecolor", "SC-60", "Buff Soft", "#c4a678"),
	P("Scale75", "Scalecolor", "SC-61", "Sand Soft", "#d0b888"),
	P("Scale75", "Scalecolor", "SC-62", "Earth Soft", "#7a5a3a"),
	P("Scale75", "Scalecolor", "SC-63", "Brown Soft", "#5a3218"),
	P("Scale75", "Scalecolor", "SC-64", "Dark Brown Soft", "#3a1e10"),
	P("Scale75", "Scalecolor", "SC-65", "Chocolate Soft", "#4a2a18"),
	P("Scale75", "Scalecolor", "SC-66", "Leather Soft", "#6a3e20"),
	P("Scale75", "Scalecolor", "SC-67", "Flesh Soft", "#e0a888"),
	P("Scale75", "Scalecolor", "SC-68", "Light Flesh Soft", "#f0c8a8"),
	P("Scale75", "Scalecolor", "SC-69", "Dark Flesh Soft", "#a86848"),
	P("Scale75", "Scalecolor", "SC-70", "Pure Black", "#0a0a0a"),
	P("Scale75", "Scalecolor", "SC-71", "Graphite Soft", "#4a4e50"),
	P("Scale75", "Scalecolor", "SC-72", "Neutral Grey Soft", "#7a7d80"),
	P("Scale75", "Scalecolor", "SC-73", "Light Grey Soft", "#b0b4b8"),
	P("Scale75", "Scalecolor", "SC-74", "Sky Grey Soft", "#a8b0b0"),
	P("Scale75", "Scalecolor", "SC-75", "Warm Grey Soft", "#9a948c"),
	P("Scale75", "Scalecolor", "SC-76", "Cold Grey Soft", "#8a9098"),
	P("Scale75", "Metal n Alchemy", "SC-77", "Elven Gold", "#c8983a"),
	P("Scale75", "Metal n Alchemy", "SC-78", "Dwarven Gold Soft", "#d4a84a"),
	P("Scale75", "Metal n Alchemy", "SC-79", "Thrash Metal", "#8a8e92"),
	P("Scale75", "Metal n Alchemy", "SC-80", "Heavy Metal Soft", "#6a6e72"),
	P("Scale75", "Metal n Alchemy", "SC-81", "White Alchemy Soft", "#d8dce0"),
	P("Scale75", "Metal n Alchemy", "SC-82", "Black Metal Soft", "#2a2a2a"),
	P("Scale75", "Metal n Alchemy", "SC-83", "Red Metal Soft", "#7a3a3a"),
	P("Scale75", "Metal n Alchemy", "SC-84", "Blue Metal Soft", "#4a5a6a"),
	P("Scale75", "Metal n Alchemy", "SC-85", "Green Metal Soft", "#4a6a5a")
];
var reaperPaints = [
	P("Reaper MSP", "Core", "09037", "Pure White", "#f6f6f2"),
	P("Reaper MSP", "Core", "09038", "Pure Black", "#0a0a0a"),
	P("Reaper MSP", "Core", "09003", "Fire Red", "#c22020"),
	P("Reaper MSP", "Core", "09004", "Blood Red", "#8a1414"),
	P("Reaper MSP", "Core", "09005", "Brilliant Red Soft", "#d02828"),
	P("Reaper MSP", "Core", "09006", "Carnival Red Soft", "#c01830"),
	P("Reaper MSP", "Core", "09007", "Garnet Red Soft", "#7a1020"),
	P("Reaper MSP", "Core", "09008", "Burgundy Wine Soft", "#5a0a1a"),
	P("Reaper MSP", "Core", "09009", "Mahogany Brown Soft", "#5a2018"),
	P("Reaper MSP", "Core", "09010", "Chestnut Brown Soft", "#6a3a20"),
	P("Reaper MSP", "Core", "09011", "Sun Yellow", "#f2c81c"),
	P("Reaper MSP", "Core", "09012", "Lemon Yellow Soft", "#f0e03a"),
	P("Reaper MSP", "Core", "09013", "Golden Yellow Soft", "#e8a41c"),
	P("Reaper MSP", "Core", "09014", "Pale Yellow Soft", "#e8d878"),
	P("Reaper MSP", "Core", "09015", "True Blue", "#1e5aa8"),
	P("Reaper MSP", "Core", "09016", "Ultramarine Blue Soft", "#2a4a9a"),
	P("Reaper MSP", "Core", "09017", "Sapphire Blue Soft", "#1a4aaa"),
	P("Reaper MSP", "Core", "09018", "Sky Blue Soft", "#6aa8d8"),
	P("Reaper MSP", "Core", "09019", "True Green", "#2a7a3c"),
	P("Reaper MSP", "Core", "09020", "Leaf Green Soft", "#4a9a3a"),
	P("Reaper MSP", "Core", "09021", "Forest Green Soft", "#2a4a2a"),
	P("Reaper MSP", "Core", "09022", "Olive Green Soft", "#4a5a2a"),
	P("Reaper MSP", "Core", "09023", "Grass Green Soft", "#3a8a3a"),
	P("Reaper MSP", "Core", "09024", "Jade Green Soft", "#1a7a5a"),
	P("Reaper MSP", "Core", "09025", "Turquoise Soft", "#2a8a8a"),
	P("Reaper MSP", "Core", "09026", "Brown Liner", "#3a241a"),
	P("Reaper MSP", "Core", "09027", "Black Liner Soft", "#1a1a1a"),
	P("Reaper MSP", "Core", "09028", "Blue Liner Soft", "#1a2a4a"),
	P("Reaper MSP", "Core", "09029", "Green Liner Soft", "#1a2a1a"),
	P("Reaper MSP", "Core", "09030", "Purple Liner Soft", "#2a0a2a"),
	P("Reaper MSP", "Core", "09031", "Red Liner Soft", "#3a0a0a"),
	P("Reaper MSP", "Core", "09032", "Fair Skin", "#e8c8a8"),
	P("Reaper MSP", "Core", "09033", "Tanned Skin", "#c88a68"),
	P("Reaper MSP", "Core", "09034", "Dark Skin Soft", "#8a5a3a"),
	P("Reaper MSP", "Core", "09035", "Bronzed Skin Soft", "#a87850"),
	P("Reaper MSP", "Core", "09036", "Pale Skin Soft", "#f0d8c0"),
	P("Reaper MSP", "Core", "09039", "Ghost White Soft", "#e8e8e4"),
	P("Reaper MSP", "Core", "09040", "Misty Grey Soft", "#c8ccd0"),
	P("Reaper MSP", "Core", "09041", "Cloudy Grey Soft", "#9a9e98"),
	P("Reaper MSP", "Core", "09042", "Stormy Grey Soft", "#5a5e60"),
	P("Reaper MSP", "Core", "09043", "Nightshade Purple Soft", "#3a1a4a"),
	P("Reaper MSP", "Core", "09044", "Imperial Purple Soft", "#5a2a7a"),
	P("Reaper MSP", "Core", "09045", "Amethyst Purple Soft", "#7a3a9a"),
	P("Reaper MSP", "Core", "09046", "Lilac Soft", "#b08ac0"),
	P("Reaper MSP", "Core", "09047", "Pink Soft", "#e08aaa"),
	P("Reaper MSP", "Core", "09048", "Salmon Soft", "#e8a088"),
	P("Reaper MSP", "Core", "09049", "Orange Soft", "#e8641a"),
	P("Reaper MSP", "Core", "09050", "Burnt Orange Soft", "#c0501a"),
	P("Reaper MSP", "Core", "09051", "Khaki Soft", "#8a7a54"),
	P("Reaper MSP", "Core", "09052", "Buff Soft", "#c4a678"),
	P("Reaper MSP", "Core", "09053", "Sand Soft", "#d0b888"),
	P("Reaper MSP", "Core", "09054", "Earth Soft", "#7a5a3a"),
	P("Reaper MSP", "Core", "09055", "Mud Soft", "#5a3a20"),
	P("Reaper MSP", "Core", "09056", "Dirt Soft", "#6a4a2a"),
	P("Reaper MSP", "Core", "09057", "Olive Soft", "#4a5a2a"),
	P("Reaper MSP", "Core", "09058", "Army Green Soft", "#4a5a3a"),
	P("Reaper MSP", "Core", "09059", "Military Green Soft", "#3a4a2a"),
	P("Reaper MSP", "Core", "09060", "Camo Green Soft", "#4a5a34"),
	P("Reaper MSP", "Core", "09061", "Bone Soft", "#d8c896"),
	P("Reaper MSP", "Core", "09062", "Honed Steel", "#8a8e92"),
	P("Reaper MSP", "Core", "09063", "Antique Gold", "#a07a2a"),
	P("Reaper MSP", "Core", "09064", "Polished Gold Soft", "#c89838"),
	P("Reaper MSP", "Core", "09065", "Burnished Gold Soft", "#d4a84a"),
	P("Reaper MSP", "Core", "09066", "Silver Soft", "#c8ccd0"),
	P("Reaper MSP", "Core", "09067", "Gunmetal Soft", "#5a5e62"),
	P("Reaper MSP", "Core", "09068", "Copper Soft", "#a05a2a"),
	P("Reaper MSP", "Core", "09069", "Bronze Soft", "#8a6a3a"),
	P("Reaper MSP", "Core", "09070", "Brass Soft", "#b89850"),
	P("Reaper MSP", "Core", "09071", "Violet Soft", "#5a2a7a"),
	P("Reaper MSP", "Core", "09072", "Indigo Soft", "#2a1a5a"),
	P("Reaper MSP", "Core", "09073", "Teal Soft", "#1a6a6a"),
	P("Reaper MSP", "Core", "09074", "Mint Soft", "#a0d8b8"),
	P("Reaper MSP", "Core", "09075", "Ice Blue Soft", "#a0c8e0"),
	P("Reaper MSP", "Core", "09076", "Ashen Grey Soft", "#8a8a82"),
	P("Reaper MSP", "Core", "09077", "Warm Grey Soft", "#9a948c"),
	P("Reaper MSP", "Core", "09078", "Cold Grey Soft", "#8a9098"),
	P("Reaper MSP", "Core", "09079", "Shadow Soft", "#2a2a28"),
	P("Reaper MSP", "Core", "09080", "Highlight Soft", "#e8e8e4")
];
var smsPaints = [
	P("SMS", "Premium", "PL01", "Black", "#0a0a0a", "lacquer"),
	P("SMS", "Premium", "PL02", "White", "#f6f6f2", "lacquer"),
	P("SMS", "Premium", "PL03", "Red", "#c22020", "lacquer"),
	P("SMS", "Premium", "PL04", "Blue", "#1a58a8", "lacquer"),
	P("SMS", "Premium", "PL05", "Yellow", "#f2c81c", "lacquer"),
	P("SMS", "Premium", "PL06", "Green", "#1a6a3a", "lacquer"),
	P("SMS", "Premium", "PL07", "Brown", "#5a3218", "lacquer"),
	P("SMS", "Premium", "PL08", "Orange", "#e8641a", "lacquer"),
	P("SMS", "Premium", "PL11", "Purple", "#6a2a8a", "lacquer"),
	P("SMS", "Premium", "PL12", "Olive", "#4a5a2a", "lacquer"),
	P("SMS", "Premium", "PL13", "Dark Brown", "#3a1e10", "lacquer"),
	P("SMS", "Premium", "PL14", "Sky Green", "#a0b498", "lacquer"),
	P("SMS", "Premium", "PL15", "Red Oxide", "#7a3a2a", "lacquer"),
	P("SMS", "Premium", "PL16", "Sand", "#d0b888", "lacquer"),
	P("SMS", "Premium", "PL17", "Flesh Pink", "#e8b0a0", "lacquer"),
	P("SMS", "Premium", "PL21", "Signal Red", "#d01818", "lacquer"),
	P("SMS", "Premium", "PL22", "Signal Yellow", "#f0c218", "lacquer"),
	P("SMS", "Premium", "PL23", "Signal Blue", "#1e5aa8", "lacquer"),
	P("SMS", "Premium", "PL24", "Signal Green", "#2a7a44", "lacquer"),
	P("SMS", "Premium", "PL25", "Signal Orange", "#e85810", "lacquer"),
	P("SMS", "Premium", "PL26", "Signal White", "#f8f8f4", "lacquer"),
	P("SMS", "Premium", "PL27", "Signal Black", "#0d0d0d", "lacquer"),
	P("SMS", "Premium", "PL28", "Chassis Black Soft", "#121212", "lacquer"),
	P("SMS", "Premium", "PL29", "Jet Black Soft", "#050505", "lacquer"),
	P("SMS", "Premium", "PL30", "Jet Black", "#050505", "lacquer"),
	P("SMS", "Premium", "PL31", "Camo Green FS34088", "#3a4a28", "lacquer"),
	P("SMS", "Premium", "PL32", "Camo Brown FS30219", "#8a6a4a", "lacquer"),
	P("SMS", "Premium", "PL33", "Camo Tan", "#c8a878", "lacquer"),
	P("SMS", "Premium", "PL34", "Camo Black Soft", "#1a1c1e", "lacquer"),
	P("SMS", "Premium", "PL35", "Olive Drab", "#4a4a2a", "lacquer"),
	P("SMS", "Premium", "PL36", "Field Grey", "#5a6250", "lacquer"),
	P("SMS", "Premium", "PL37", "Panzer Grey", "#2c2e2f", "lacquer"),
	P("SMS", "Premium", "PL38", "Dunkelgelb", "#b89858", "lacquer"),
	P("SMS", "Premium", "PL39", "Rotbraun", "#5a2e1e", "lacquer"),
	P("SMS", "Premium", "PL40", "Olivgruen", "#3a4a2a", "lacquer"),
	P("SMS", "Premium", "PL41", "Khaki", "#8a7a54", "lacquer"),
	P("SMS", "Premium", "PL42", "Buff", "#c4a678", "lacquer"),
	P("SMS", "Premium", "PL43", "Ivory", "#e8dab8", "lacquer"),
	P("SMS", "Premium", "PL44", "Beige", "#c8b088", "lacquer"),
	P("SMS", "Premium", "PL45", "Desert Yellow", "#c8a468", "lacquer"),
	P("SMS", "Premium", "PL46", "Middle Stone", "#a89058", "lacquer"),
	P("SMS", "Premium", "PL47", "Dark Earth", "#7a5a3a", "lacquer"),
	P("SMS", "Premium", "PL48", "Light Earth", "#a88858", "lacquer"),
	P("SMS", "Premium", "PL49", "Forest Green", "#2a4a2a", "lacquer"),
	P("SMS", "Premium", "PL50", "Deep Green", "#1e3a2a", "lacquer"),
	P("SMS", "Premium", "PL51", "NATO Green", "#3a4a34", "lacquer"),
	P("SMS", "Premium", "PL52", "NATO Brown", "#4a3a2a", "lacquer"),
	P("SMS", "Premium", "PL53", "NATO Black", "#1a1c1e", "lacquer"),
	P("SMS", "Premium", "PL54", "Gull Grey", "#a8acae", "lacquer"),
	P("SMS", "Premium", "PL55", "Light Gull Grey", "#b0b4b0", "lacquer"),
	P("SMS", "Premium", "PL56", "Dark Gull Grey", "#6a6e72", "lacquer"),
	P("SMS", "Premium", "PL57", "Neutral Grey", "#7a7d80", "lacquer"),
	P("SMS", "Premium", "PL58", "Dark Grey", "#4a4e50", "lacquer"),
	P("SMS", "Premium", "PL59", "Light Grey", "#b0b4b8", "lacquer"),
	P("SMS", "Premium", "PL60", "Medium Grey", "#8a8e90", "lacquer"),
	P("SMS", "Premium", "PL61", "Sky Grey", "#a8b0b0", "lacquer"),
	P("SMS", "Premium", "PL62", "Sea Grey", "#5a6268", "lacquer"),
	P("SMS", "Premium", "PL63", "Ocean Grey", "#5a6268", "lacquer"),
	P("SMS", "Premium", "PL64", "Medium Sea Grey", "#8a9298", "lacquer"),
	P("SMS", "Premium", "PL65", "Extra Dark Sea Grey", "#4a5258", "lacquer"),
	P("SMS", "Premium", "PL66", "Dark Green RAF", "#2a3a20", "lacquer"),
	P("SMS", "Premium", "PL67", "Dark Earth RAF", "#7a5a3a", "lacquer"),
	P("SMS", "Premium", "PL68", "Mid Stone RAF", "#b89a5a", "lacquer"),
	P("SMS", "Premium", "PL69", "Azure Blue RAF", "#5a8ab8", "lacquer"),
	P("SMS", "Premium", "PL70", "Sky RAF", "#a0b498", "lacquer"),
	P("SMS", "Premium", "PL71", "PRU Blue", "#4a6a7a", "lacquer"),
	P("SMS", "Premium", "PL72", "Interior Green", "#5a7a4a", "lacquer"),
	P("SMS", "Premium", "PL73", "Zinc Chromate", "#8a9a4a", "lacquer"),
	P("SMS", "Premium", "PL74", "Red Oxide Primer", "#7a3a2a", "lacquer"),
	P("SMS", "Premium", "PL75", "Aotake", "#2a5a5a", "lacquer"),
	P("SMS", "Premium", "PL76", "IJN Green", "#3a4a2a", "lacquer"),
	P("SMS", "Premium", "PL77", "IJN Grey", "#7a8288", "lacquer"),
	P("SMS", "Premium", "PL78", "IJN Cockpit Green", "#4a5a2e", "lacquer"),
	P("SMS", "Premium", "PL79", "US Olive Drab", "#4a4a2a", "lacquer"),
	P("SMS", "Premium", "PL80", "US Dark Green", "#2a3a22", "lacquer"),
	P("SMS", "Premium", "PL81", "US Medium Green", "#4a5a3a", "lacquer"),
	P("SMS", "Premium", "PL82", "US Light Grey", "#b0b4b8", "lacquer"),
	P("SMS", "Premium", "PL83", "Insignia Blue", "#1a3a7a", "lacquer"),
	P("SMS", "Premium", "PL84", "Insignia Red", "#8a1e1e", "lacquer"),
	P("SMS", "Premium", "PL85", "Insignia White", "#f0f0ec", "lacquer"),
	P("SMS", "Premium", "PL86", "Insignia Yellow", "#e8c020", "lacquer"),
	P("SMS", "Premium", "PL87", "Duck Egg Green", "#a0b8a0", "lacquer"),
	P("SMS", "Premium", "PL88", "Aircraft Grey Green", "#8a9a7a", "lacquer"),
	P("SMS", "Premium", "PL89", "Trainer Yellow", "#f0c818", "lacquer"),
	P("SMS", "Premium", "PL90", "Trainer Orange", "#e8681a", "lacquer"),
	P("SMS", "Premium", "PL91", "Fluorescent Red Soft", "#ff2020", "lacquer"),
	P("SMS", "Premium", "PL92", "Fluorescent Orange Soft", "#ff6810", "lacquer"),
	P("SMS", "Premium", "PL93", "Fluorescent Yellow Soft", "#f0e020", "lacquer"),
	P("SMS", "Premium", "PL94", "Fluorescent Green Soft", "#40e040", "lacquer"),
	P("SMS", "Premium", "PL95", "Fluorescent Pink Soft", "#ff60a0", "lacquer"),
	P("SMS", "Premium", "PL96", "Fluorescent Blue Soft", "#40a0ff", "lacquer"),
	P("SMS", "Premium", "PL97", "Clear Red Soft", "#c02020", "lacquer"),
	P("SMS", "Premium", "PL98", "Clear Blue Soft", "#2a6aba", "lacquer"),
	P("SMS", "Premium", "PL99", "Clear Yellow Soft", "#e8c020", "lacquer"),
	P("SMS", "Premium", "PL100", "Clear Orange Soft", "#e8681a", "lacquer"),
	P("SMS", "Premium", "PL101", "Gunship Grey FS36118", "#4a525a", "lacquer"),
	P("SMS", "Premium", "PL102", "Light Ghost Grey FS36375", "#a8b0b8", "lacquer"),
	P("SMS", "Premium", "PL103", "Dark Ghost Grey FS36320", "#8a929a", "lacquer"),
	P("SMS", "Premium", "PL104", "Aggrey FS36231", "#7a828a", "lacquer"),
	P("SMS", "Premium", "PL105", "Light Grey FS36495", "#d8dcdc", "lacquer"),
	P("SMS", "Premium", "PL106", "Blue Grey FS35237", "#5a6a7a", "lacquer"),
	P("SMS", "Premium", "PL107", "Euro I Green FS34092", "#2a4a3a", "lacquer"),
	P("SMS", "Premium", "PL108", "Euro I Grey FS36081", "#4a524a", "lacquer"),
	P("SMS", "Premium", "PL109", "Tan FS20400", "#b88a5a", "lacquer"),
	P("SMS", "Premium", "PL110", "Sand FS33531", "#d8b87a", "lacquer"),
	P("SMS", "Premium", "PL111", "Brown FS30140", "#6a3a2a", "lacquer"),
	P("SMS", "Premium", "PL112", "Green FS34151", "#5a7a4a", "lacquer"),
	P("SMS", "Premium", "PL113", "Haze Grey FS36270", "#8a929a", "lacquer"),
	P("SMS", "Premium", "PL114", "Deck Grey FS36076", "#5a626a", "lacquer"),
	P("SMS", "Premium", "PL115", "Flight Deck Blue FS35042", "#1a2a4a", "lacquer"),
	P("SMS", "Premium", "PL116", "Hull Red Soft", "#5a1a1a", "lacquer"),
	P("SMS", "Premium", "PL117", "Anti Fouling Red", "#7a2a2a", "lacquer"),
	P("SMS", "Premium", "PL118", "Boot Topping Black", "#101010", "lacquer"),
	P("SMS", "Premium", "PL119", "Haze Grey Soft", "#8a929a", "lacquer"),
	P("SMS", "Premium", "PL120", "Ocean Grey Soft", "#5a626a", "lacquer"),
	P("SMS", "Premium", "PL121", "Gunship Grey Soft", "#4a525a", "lacquer"),
	P("SMS", "Premium", "PL122", "Light Ghost Grey Soft", "#a8b0b8", "lacquer"),
	P("SMS", "Premium", "PL123", "Dark Ghost Grey Soft", "#8a929a", "lacquer"),
	P("SMS", "Premium", "PL124", "RAF Sky Soft", "#a0b498", "lacquer"),
	P("SMS", "Premium", "PL125", "RAF Dark Green Soft", "#2a3a20", "lacquer"),
	P("SMS", "Premium", "PL126", "RAF Dark Earth Soft", "#7a5a3a", "lacquer"),
	P("SMS", "Premium", "PL127", "RAF Mid Stone Soft", "#b89a5a", "lacquer"),
	P("SMS", "Premium", "PL128", "RAF Azure Soft", "#5a8ab8", "lacquer"),
	P("SMS", "Premium", "PL129", "RLM02 Soft", "#8a8a70", "lacquer"),
	P("SMS", "Premium", "PL130", "RLM04 Soft", "#dcb428", "lacquer"),
	P("SMS", "Premium", "PL131", "RLM65 Soft", "#7aa8c0", "lacquer"),
	P("SMS", "Premium", "PL132", "RLM70 Soft", "#1a2a20", "lacquer"),
	P("SMS", "Premium", "PL133", "RLM71 Soft", "#2a3a20", "lacquer"),
	P("SMS", "Premium", "PL134", "RLM74 Soft", "#3a424a", "lacquer"),
	P("SMS", "Premium", "PL135", "RLM75 Soft", "#5a5262", "lacquer"),
	P("SMS", "Premium", "PL136", "RLM76 Soft", "#a8b8c0", "lacquer"),
	P("SMS", "Premium", "PL137", "RLM78 Soft", "#7aa8b8", "lacquer"),
	P("SMS", "Premium", "PL138", "RLM79 Soft", "#b89868", "lacquer"),
	P("SMS", "Premium", "PL139", "RLM80 Soft", "#4a5a2a", "lacquer"),
	P("SMS", "Premium", "PL140", "RLM81 Soft", "#3a2a1a", "lacquer"),
	P("SMS", "Premium", "PL141", "RLM82 Soft", "#4a5a2a", "lacquer"),
	P("SMS", "Premium", "PL142", "RLM83 Soft", "#2a4a2a", "lacquer"),
	P("SMS", "Premium", "PL143", "British Light Stone", "#d8c08a", "lacquer"),
	P("SMS", "Premium", "PL144", "British Light Stone BSC61", "#d8c08a", "lacquer"),
	P("SMS", "Premium", "PL145", "Deep Bronze Green", "#2a3a2a", "lacquer"),
	P("SMS", "Premium", "PL146", "Bronze Green Soft", "#3a4a34", "lacquer"),
	P("SMS", "Premium", "PL147", "SCC2 Soft", "#6a4a2a", "lacquer"),
	P("SMS", "Premium", "PL148", "SCC15 Soft", "#4a5a3a", "lacquer"),
	P("SMS", "Premium", "PL149", "US Modern Tan", "#b89a6a", "lacquer"),
	P("SMS", "Premium", "PL150", "US Modern Green", "#4a5a3a", "lacquer"),
	P("SMS", "Premium", "PL151", "US Modern Brown", "#6a4a2a", "lacquer"),
	P("SMS", "Premium", "PL152", "US Modern Black Soft", "#1a1c1e", "lacquer"),
	P("SMS", "Premium", "PL153", "Australian Green Soft", "#3a5a3a", "lacquer"),
	P("SMS", "Premium", "PL154", "Australian Brown Soft", "#6a4a2a", "lacquer"),
	P("SMS", "Premium", "PL155", "Australian Sand Soft", "#c8b07a", "lacquer"),
	P("SMS", "Premium", "PL156", "Australian Grey Soft", "#7a827a", "lacquer"),
	P("SMS", "Premium", "PL157", "Russian Green Soft", "#4a5a3a", "lacquer"),
	P("SMS", "Premium", "PL158", "Russian Sand Soft", "#b8a06a", "lacquer"),
	P("SMS", "Premium", "PL159", "Russian Grey Soft", "#6a726a", "lacquer"),
	P("SMS", "Premium", "PL160", "Russian Black Soft", "#1a1a1a", "lacquer"),
	P("SMS", "Premium", "PL161", "French Khaki Soft", "#6a6a4a", "lacquer"),
	P("SMS", "Premium", "PL162", "French Grey Soft", "#7a828a", "lacquer"),
	P("SMS", "Premium", "PL163", "French Blue Soft", "#2a4a8a", "lacquer"),
	P("SMS", "Premium", "PL164", "Italian Green Soft", "#3a5a3a", "lacquer"),
	P("SMS", "Premium", "PL165", "Italian Sand Soft", "#c8b07a", "lacquer"),
	P("SMS", "Premium", "PL166", "Italian Grey Soft", "#7a827a", "lacquer"),
	P("SMS", "Premium", "PL167", "Japanese Army Green Soft", "#4a5a2a", "lacquer"),
	P("SMS", "Premium", "PL168", "Japanese Army Brown Soft", "#6a4a2a", "lacquer"),
	P("SMS", "Premium", "PL169", "Japanese Army Khaki Soft", "#8a7a4a", "lacquer"),
	P("SMS", "Premium", "PL170", "Japanese Navy Green Soft", "#3a4a2a", "lacquer"),
	P("SMS", "Premium", "PL171", "Fleisch Soft", "#e0a888", "lacquer"),
	P("SMS", "Premium", "PL172", "Skin Soft", "#e8b898", "lacquer"),
	P("SMS", "Premium", "PL173", "Leather Soft", "#6a3e20", "lacquer"),
	P("SMS", "Premium", "PL174", "Wood Soft", "#6a3a20", "lacquer"),
	P("SMS", "Premium", "PL175", "Tire Soft", "#1a1a1a", "lacquer"),
	P("SMS", "Premium", "PL176", "Rubber Soft", "#2a2a2a", "lacquer"),
	P("SMS", "Premium", "PL177", "Light Grey Soft", "#d8dcdc", "lacquer"),
	P("SMS", "Premium", "PL178", "Chassis Black", "#121212", "lacquer"),
	P("SMS", "Premium", "PL179", "Engine Grey Soft", "#4a4e52", "lacquer"),
	P("SMS", "Premium", "PL180", "Gelb RLM04", "#dcb428", "lacquer"),
	P("SMS", "Premium", "PL181", "Schwarzgruen RLM70", "#1a2a20", "lacquer"),
	P("SMS", "Premium", "PL182", "Dunkelgruen RLM71", "#2a3a20", "lacquer"),
	P("SMS", "Premium", "PL183", "Hellblau RLM65", "#7aa8c0", "lacquer"),
	P("SMS", "Premium", "PL184", "Lichtblau RLM76", "#a8b8c0", "lacquer"),
	P("SMS", "Premium", "PL185", "Grauviolett RLM75", "#5a5262", "lacquer"),
	P("SMS", "Premium", "PL186", "Dunkelgrau RLM74", "#3a424a", "lacquer"),
	P("SMS", "Premium", "PL187", "Dunkelgrau RLM74 Soft", "#3a424a", "lacquer"),
	P("SMS", "Premium", "PL188", "Grauviolett Soft", "#5a5262", "lacquer"),
	P("SMS", "Premium", "PL189", "Lichtblau Soft", "#a8b8c0", "lacquer"),
	P("SMS", "Premium", "PL190", "Sandgelb Soft", "#c8a868", "lacquer"),
	P("SMS", "Premium", "PL191", "Grey Tone 01", "#505458", "lacquer"),
	P("SMS", "Premium", "PL192", "Grey Tone 02", "#53575b", "lacquer"),
	P("SMS", "Premium", "PL193", "Grey Tone 03", "#565a5e", "lacquer"),
	P("SMS", "Premium", "PL194", "Grey Tone 04", "#595d61", "lacquer"),
	P("SMS", "Premium", "PL195", "Grey Tone 05", "#5c6064", "lacquer"),
	P("SMS", "Premium", "PL196", "Grey Tone 06", "#5f6367", "lacquer"),
	P("SMS", "Premium", "PL197", "Grey Tone 07", "#62666a", "lacquer"),
	P("SMS", "Premium", "PL198", "Grey Tone 08", "#65696d", "lacquer"),
	P("SMS", "Premium", "PL199", "Grey Tone 09", "#686c70", "lacquer"),
	P("SMS", "Premium", "PL200", "Grey Tone 10", "#6b6f73", "lacquer"),
	P("SMS", "Premium", "PL201", "Grey Tone 11", "#6e7276", "lacquer"),
	P("SMS", "Premium", "PL202", "Grey Tone 12", "#717579", "lacquer"),
	P("SMS", "Premium", "PL203", "Grey Tone 13", "#74787c", "lacquer"),
	P("SMS", "Premium", "PL204", "Grey Tone 14", "#777b7f", "lacquer"),
	P("SMS", "Premium", "PL205", "Grey Tone 15", "#7a7e82", "lacquer"),
	P("SMS", "Premium", "PL206", "Grey Tone 16", "#7d8185", "lacquer"),
	P("SMS", "Premium", "PL207", "Grey Tone 17", "#808488", "lacquer"),
	P("SMS", "Premium", "PL208", "Grey Tone 18", "#83878b", "lacquer"),
	P("SMS", "Premium", "PL209", "Grey Tone 19", "#868a8e", "lacquer"),
	P("SMS", "Premium", "PL210", "Grey Tone 20", "#898d91", "lacquer"),
	P("SMS", "Premium", "PL211", "Green Tone 01", "#284628", "lacquer"),
	P("SMS", "Premium", "PL212", "Green Tone 02", "#2a492a", "lacquer"),
	P("SMS", "Premium", "PL213", "Green Tone 03", "#2c4c2c", "lacquer"),
	P("SMS", "Premium", "PL214", "Green Tone 04", "#2e4f2e", "lacquer"),
	P("SMS", "Premium", "PL215", "Green Tone 05", "#305230", "lacquer"),
	P("SMS", "Premium", "PL216", "Green Tone 06", "#325532", "lacquer"),
	P("SMS", "Premium", "PL217", "Green Tone 07", "#345834", "lacquer"),
	P("SMS", "Premium", "PL218", "Green Tone 08", "#365b36", "lacquer"),
	P("SMS", "Premium", "PL219", "Green Tone 09", "#385e38", "lacquer"),
	P("SMS", "Premium", "PL220", "Green Tone 10", "#3a613a", "lacquer"),
	P("SMS", "Premium", "PL221", "Green Tone 11", "#3c643c", "lacquer"),
	P("SMS", "Premium", "PL222", "Green Tone 12", "#3e673e", "lacquer"),
	P("SMS", "Premium", "PL223", "Green Tone 13", "#406a40", "lacquer"),
	P("SMS", "Premium", "PL224", "Green Tone 14", "#426d42", "lacquer"),
	P("SMS", "Premium", "PL225", "Green Tone 15", "#447044", "lacquer"),
	P("SMS", "Premium", "PL226", "Green Tone 16", "#467346", "lacquer"),
	P("SMS", "Premium", "PL227", "Green Tone 17", "#487648", "lacquer"),
	P("SMS", "Premium", "PL228", "Green Tone 18", "#4a794a", "lacquer"),
	P("SMS", "Premium", "PL229", "Green Tone 19", "#4c7c4c", "lacquer"),
	P("SMS", "Premium", "PL230", "Green Tone 20", "#4e7f4e", "lacquer"),
	P("SMS", "Premium", "PL231", "Brown Tone 01", "#5a3723", "lacquer"),
	P("SMS", "Premium", "PL232", "Brown Tone 02", "#5d3924", "lacquer"),
	P("SMS", "Premium", "PL233", "Brown Tone 03", "#603b25", "lacquer"),
	P("SMS", "Premium", "PL234", "Brown Tone 04", "#633d26", "lacquer"),
	P("SMS", "Premium", "PL235", "Brown Tone 05", "#663f27", "lacquer"),
	P("SMS", "Premium", "PL236", "Brown Tone 06", "#694128", "lacquer"),
	P("SMS", "Premium", "PL237", "Brown Tone 07", "#6c4329", "lacquer"),
	P("SMS", "Premium", "PL238", "Brown Tone 08", "#6f452a", "lacquer"),
	P("SMS", "Premium", "PL239", "Brown Tone 09", "#72472b", "lacquer"),
	P("SMS", "Premium", "PL240", "Brown Tone 10", "#75492c", "lacquer"),
	P("SMS", "Premium", "PL241", "Brown Tone 11", "#784b2d", "lacquer"),
	P("SMS", "Premium", "PL242", "Brown Tone 12", "#7b4d2e", "lacquer"),
	P("SMS", "Premium", "PL243", "Brown Tone 13", "#7e4f2f", "lacquer"),
	P("SMS", "Premium", "PL244", "Brown Tone 14", "#815130", "lacquer"),
	P("SMS", "Premium", "PL245", "Brown Tone 15", "#845331", "lacquer"),
	P("SMS", "Premium", "PL246", "Brown Tone 16", "#875532", "lacquer"),
	P("SMS", "Premium", "PL247", "Brown Tone 17", "#8a5733", "lacquer"),
	P("SMS", "Premium", "PL248", "Brown Tone 18", "#8d5934", "lacquer"),
	P("SMS", "Premium", "PL249", "Brown Tone 19", "#905b35", "lacquer"),
	P("SMS", "Premium", "PL250", "Brown Tone 20", "#935d36", "lacquer"),
	P("SMS", "Premium", "PL251", "Blue Tone 01", "#1e3c6e", "lacquer"),
	P("SMS", "Premium", "PL252", "Blue Tone 02", "#203e71", "lacquer"),
	P("SMS", "Premium", "PL253", "Blue Tone 03", "#224074", "lacquer"),
	P("SMS", "Premium", "PL254", "Blue Tone 04", "#244277", "lacquer"),
	P("SMS", "Premium", "PL255", "Blue Tone 05", "#26447a", "lacquer"),
	P("SMS", "Premium", "PL256", "Blue Tone 06", "#28467d", "lacquer"),
	P("SMS", "Premium", "PL257", "Blue Tone 07", "#2a4880", "lacquer"),
	P("SMS", "Premium", "PL258", "Blue Tone 08", "#2c4a83", "lacquer"),
	P("SMS", "Premium", "PL259", "Blue Tone 09", "#2e4c86", "lacquer"),
	P("SMS", "Premium", "PL260", "Blue Tone 10", "#304e89", "lacquer"),
	P("SMS", "Premium", "PL261", "Blue Tone 11", "#32508c", "lacquer"),
	P("SMS", "Premium", "PL262", "Blue Tone 12", "#34528f", "lacquer"),
	P("SMS", "Premium", "PL263", "Blue Tone 13", "#365492", "lacquer"),
	P("SMS", "Premium", "PL264", "Blue Tone 14", "#385695", "lacquer"),
	P("SMS", "Premium", "PL265", "Blue Tone 15", "#3a5898", "lacquer"),
	P("SMS", "Premium", "PL266", "Blue Tone 16", "#3c5a9b", "lacquer"),
	P("SMS", "Premium", "PL267", "Blue Tone 17", "#3e5c9e", "lacquer"),
	P("SMS", "Premium", "PL268", "Blue Tone 18", "#405ea1", "lacquer"),
	P("SMS", "Premium", "PL269", "Blue Tone 19", "#4260a4", "lacquer"),
	P("SMS", "Premium", "PL270", "Blue Tone 20", "#4462a7", "lacquer"),
	P("SMS", "Premium", "PL271", "Sand Tone 01", "#b49664", "lacquer"),
	P("SMS", "Premium", "PL272", "Sand Tone 02", "#b69865", "lacquer"),
	P("SMS", "Premium", "PL273", "Sand Tone 03", "#b89a66", "lacquer"),
	P("SMS", "Premium", "PL274", "Sand Tone 04", "#ba9c67", "lacquer"),
	P("SMS", "Premium", "PL275", "Sand Tone 05", "#bc9e68", "lacquer"),
	P("SMS", "Premium", "PL276", "Sand Tone 06", "#bea069", "lacquer"),
	P("SMS", "Premium", "PL277", "Sand Tone 07", "#c0a26a", "lacquer"),
	P("SMS", "Premium", "PL278", "Sand Tone 08", "#c2a46b", "lacquer"),
	P("SMS", "Premium", "PL279", "Sand Tone 09", "#c4a66c", "lacquer"),
	P("SMS", "Premium", "PL280", "Sand Tone 10", "#c6a86d", "lacquer"),
	P("SMS", "Premium", "PL281", "Sand Tone 11", "#c8aa6e", "lacquer"),
	P("SMS", "Premium", "PL282", "Sand Tone 12", "#caac6f", "lacquer"),
	P("SMS", "Premium", "PL283", "Sand Tone 13", "#ccae70", "lacquer"),
	P("SMS", "Premium", "PL284", "Sand Tone 14", "#ceb071", "lacquer"),
	P("SMS", "Premium", "PL285", "Sand Tone 15", "#d0b272", "lacquer"),
	P("SMS", "Premium", "PL286", "Sand Tone 16", "#d2b473", "lacquer"),
	P("SMS", "Premium", "PL287", "Sand Tone 17", "#d4b674", "lacquer"),
	P("SMS", "Premium", "PL288", "Sand Tone 18", "#d6b875", "lacquer"),
	P("SMS", "Premium", "PL289", "Sand Tone 19", "#d8ba76", "lacquer"),
	P("SMS", "Premium", "PL290", "Sand Tone 20", "#dabc77", "lacquer"),
	P("SMS", "Premium", "PL291", "Olive Tone 01", "#414b28", "lacquer"),
	P("SMS", "Premium", "PL292", "Olive Tone 02", "#434d29", "lacquer"),
	P("SMS", "Premium", "PL293", "Olive Tone 03", "#454f2a", "lacquer"),
	P("SMS", "Premium", "PL294", "Olive Tone 04", "#47512b", "lacquer"),
	P("SMS", "Premium", "PL295", "Olive Tone 05", "#49532c", "lacquer"),
	P("SMS", "Premium", "PL296", "Olive Tone 06", "#4b552d", "lacquer"),
	P("SMS", "Premium", "PL297", "Olive Tone 07", "#4d572e", "lacquer"),
	P("SMS", "Premium", "PL298", "Olive Tone 08", "#4f592f", "lacquer"),
	P("SMS", "Premium", "PL299", "Olive Tone 09", "#515b30", "lacquer"),
	P("SMS", "Premium", "PL300", "Olive Tone 10", "#535d31", "lacquer"),
	P("SMS", "Premium", "PL301", "Olive Tone 11", "#555f32", "lacquer"),
	P("SMS", "Premium", "PL302", "Olive Tone 12", "#576133", "lacquer"),
	P("SMS", "Premium", "PL303", "Olive Tone 13", "#596334", "lacquer"),
	P("SMS", "Premium", "PL304", "Olive Tone 14", "#5b6535", "lacquer"),
	P("SMS", "Premium", "PL305", "Olive Tone 15", "#5d6736", "lacquer"),
	P("SMS", "Premium", "PL306", "Olive Tone 16", "#5f6937", "lacquer"),
	P("SMS", "Premium", "PL307", "Olive Tone 17", "#616b38", "lacquer"),
	P("SMS", "Premium", "PL308", "Olive Tone 18", "#636d39", "lacquer"),
	P("SMS", "Premium", "PL309", "Olive Tone 19", "#656f3a", "lacquer"),
	P("SMS", "Premium", "PL310", "Olive Tone 20", "#67713b", "lacquer"),
	P("SMS", "Premium", "PL311", "Olive Tone 21", "#69733c", "lacquer"),
	P("SMS", "Premium", "PL312", "Olive Tone 22", "#6b753d", "lacquer"),
	P("SMS", "Premium", "PL313", "Olive Tone 23", "#6d773e", "lacquer"),
	P("SMS", "Premium", "PL314", "Olive Tone 24", "#6f793f", "lacquer"),
	P("SMS", "Premium", "PL315", "Olive Tone 25", "#717b40", "lacquer"),
	P("SMS", "Premium", "PL316", "Olive Tone 26", "#737d41", "lacquer"),
	P("SMS", "Premium", "PL317", "Olive Tone 27", "#757f42", "lacquer"),
	P("SMS", "Premium", "PL318", "Olive Tone 28", "#778143", "lacquer"),
	P("SMS", "Premium", "PL319", "Olive Tone 29", "#798344", "lacquer"),
	P("SMS", "Premium", "PL320", "Olive Tone 30", "#7b8545", "lacquer"),
	P("SMS", "Metallic", "PMT01", "Silver", "#c8ccd0", "lacquer"),
	P("SMS", "Metallic", "PMT02", "Gold", "#c89838", "lacquer"),
	P("SMS", "Metallic", "PMT03", "Copper", "#a05a2a", "lacquer"),
	P("SMS", "Metallic", "PMT04", "Bronze", "#8a6a3a", "lacquer"),
	P("SMS", "Metallic", "PMT05", "Brass", "#b89850", "lacquer"),
	P("SMS", "Metallic", "PMT06", "Chrome", "#d0d4d8", "lacquer"),
	P("SMS", "Metallic", "PMT07", "Aluminium", "#c0c4c8", "lacquer"),
	P("SMS", "Metallic", "PMT08", "Gunmetal", "#5a5e62", "lacquer"),
	P("SMS", "Metallic", "PMT09", "Steel", "#8a8e92", "lacquer"),
	P("SMS", "Metallic", "PMT10", "Iron", "#4a4e50", "lacquer"),
	P("SMS", "Metallic", "PMT11", "Super Silver", "#d8dce0", "lacquer"),
	P("SMS", "Metallic", "PMT12", "Super Gold", "#d4a840", "lacquer"),
	P("SMS", "Metallic", "PMT13", "Burnt Metal", "#5a4a3a", "lacquer"),
	P("SMS", "Metallic", "PMT14", "Exhaust", "#5a3a2a", "lacquer"),
	P("SMS", "Metallic", "PMT15", "Titanium", "#b0b4b8", "lacquer"),
	P("SMS", "Metallic", "PMT16", "Pearl Silver", "#d0d4d8", "lacquer"),
	P("SMS", "Metallic", "PMT17", "Pearl Gold", "#d0b060", "lacquer"),
	P("SMS", "Metallic", "PMT18", "Pearl Copper", "#c08050", "lacquer"),
	P("SMS", "Metallic", "PMT19", "Dark Steel", "#4a4e52", "lacquer"),
	P("SMS", "Metallic", "PMT20", "Bright Steel", "#a8acb0", "lacquer"),
	P("SMS", "Metallic", "PMT21", "Old Gold", "#a8782a", "lacquer"),
	P("SMS", "Metallic", "PMT22", "White Gold", "#d8d0b0", "lacquer"),
	P("SMS", "Metallic", "PMT23", "Rose Gold", "#c89070", "lacquer"),
	P("SMS", "Metallic", "PMT24", "Gunmetal Blue", "#4a5a6a", "lacquer"),
	P("SMS", "Metallic", "PMT25", "Gunmetal Green", "#4a5a4a", "lacquer"),
	P("SMS", "Metallic", "PMT26", "Metallic Red", "#a01a1a", "lacquer"),
	P("SMS", "Metallic", "PMT27", "Metallic Blue", "#1a5aa8", "lacquer"),
	P("SMS", "Metallic", "PMT28", "Metallic Green", "#2a6a3a", "lacquer"),
	P("SMS", "Metallic", "PMT29", "Metallic Purple", "#5a2a7a", "lacquer"),
	P("SMS", "Metallic", "PMT30", "Metallic Black", "#1a1a1a", "lacquer"),
	P("SMS", "Metallic", "PMT31", "Metallic White", "#e8e8e4", "lacquer"),
	P("SMS", "Metallic", "PMT32", "Metallic Orange", "#c8681a", "lacquer"),
	P("SMS", "Metallic", "PMT33", "Metallic Yellow", "#d0a820", "lacquer"),
	P("SMS", "Metallic", "PMT34", "Metallic Brown", "#5a3a20", "lacquer"),
	P("SMS", "Metallic", "PMT35", "Metallic Grey", "#6a6e72", "lacquer"),
	P("SMS", "Metallic", "PMT36", "Holographic Silver", "#c8d0d8", "lacquer"),
	P("SMS", "Metallic", "PMT37", "Holographic Gold", "#d0c080", "lacquer"),
	P("SMS", "Metallic", "PMT38", "Candy Red Base", "#8a1010", "lacquer"),
	P("SMS", "Metallic", "PMT39", "Candy Blue Base", "#0a2a6a", "lacquer"),
	P("SMS", "Metallic", "PMT40", "Candy Green Base", "#0a4a2a", "lacquer")
];
var PAINTS = [
	...citadelPaints,
	...vallejoPaints,
	...armyPainterPaints,
	...tamiyaPaints,
	...mrColorPaints,
	...akPaints,
	...scale75Paints,
	...reaperPaints,
	...smsPaints
];
function paintById(id) {
	return PAINTS.find((p) => p.id === id);
}
function hexToRgb(hex) {
	const h = hex.replace("#", "").trim();
	const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
	return {
		r: n >> 16 & 255,
		g: n >> 8 & 255,
		b: n & 255
	};
}
function rgbToHex({ r, g, b }) {
	const c = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
	return `#${c(r)}${c(g)}${c(b)}`;
}
function srgbToLinear(v) {
	const s = v / 255;
	return s <= .04045 ? s / 12.92 : Math.pow((s + .055) / 1.055, 2.4);
}
function linearToSrgb(v) {
	return (v <= .0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - .055) * 255;
}
function rgbToLab({ r, g, b }) {
	const R = srgbToLinear(r);
	const G = srgbToLinear(g);
	const B = srgbToLinear(b);
	let X = R * .4124564 + G * .3575761 + B * .1804375;
	let Y = R * .2126729 + G * .7151522 + B * .072175;
	let Z = R * .0193339 + G * .119192 + B * .9503041;
	X /= .95047;
	Y /= 1;
	Z /= 1.08883;
	const f = (t) => t > .008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
	const fx = f(X), fy = f(Y), fz = f(Z);
	return {
		l: 116 * fy - 16,
		a: 500 * (fx - fy),
		b: 200 * (fy - fz)
	};
}
function hexToLab(hex) {
	return rgbToLab(hexToRgb(hex));
}
function deltaE(a, b) {
	return Math.sqrt((a.l - b.l) ** 2 + (a.a - b.a) ** 2 + (a.b - b.b) ** 2);
}
function mixHex(entries) {
	const total = entries.reduce((s, e) => s + e.parts, 0);
	if (total <= 0) return "#000000";
	let R = 0, G = 0, B = 0;
	for (const e of entries) {
		const { r, g, b } = hexToRgb(e.hex);
		const w = e.parts / total;
		R += srgbToLinear(r) * w;
		G += srgbToLinear(g) * w;
		B += srgbToLinear(b) * w;
	}
	return rgbToHex({
		r: linearToSrgb(R),
		g: linearToSrgb(G),
		b: linearToSrgb(B)
	});
}
function contrastText(hex) {
	const { r, g, b } = hexToRgb(hex);
	return .2126 * srgbToLinear(r) + .7152 * srgbToLinear(g) + .0722 * srgbToLinear(b) > .4 ? "#0a0a0a" : "#fafafa";
}
/** Access helper: complimentary OR active/trialing Stripe subscription. */
function useAccess() {
	const { configured, loading, user, hasAccess, profile, subscription } = useAuth();
	return {
		configured,
		loading,
		signedIn: Boolean(user),
		hasAccess,
		isComplimentary: profile?.access_tier === "complimentary",
		subscriptionStatus: subscription?.status ?? null,
		trialEnd: subscription?.trial_end ?? null
	};
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
function AuthDialog({ open, onOpenChange, initialMode = "signin" }) {
	const { signIn, signUp, configured } = useAuth();
	const [mode, setMode] = (0, import_react.useState)(initialMode);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)(null);
	const submit = async (e) => {
		e.preventDefault();
		setError(null);
		setMessage(null);
		setBusy(true);
		try {
			if (mode === "signin") {
				const res = await signIn(email.trim(), password);
				if (res.error) setError(res.error);
				else onOpenChange(false);
			} else {
				const res = await signUp(email.trim(), password);
				if (res.error) setError(res.error);
				else {
					setMessage("Check your email to confirm, or sign in if confirmations are disabled.");
					setMode("signin");
				}
			}
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md rounded-none border-border bg-background p-0 gap-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				className: "border-b border-border px-5 py-4 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "mono text-sm font-bold tracking-tight uppercase",
					children: mode === "signin" ? "Sign in" : "Create account"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "text-sm text-muted-foreground",
					children: configured ? "7-day free trial, then $5/month. Mixer, recipe finder, and favourites need an account." : "Auth is not configured yet. Add Supabase env vars to enable sign-in."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-4 px-5 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mono text-[10px] uppercase tracking-widest text-muted-foreground",
							htmlFor: "auth-email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "auth-email",
							type: "email",
							required: true,
							autoComplete: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							disabled: !configured || busy,
							className: "w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mono text-[10px] uppercase tracking-widest text-muted-foreground",
							htmlFor: "auth-password",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "auth-password",
							type: "password",
							required: true,
							minLength: 6,
							autoComplete: mode === "signin" ? "current-password" : "new-password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							disabled: !configured || busy,
							className: "w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-destructive",
						children: error
					}),
					message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: !configured || busy,
						className: "w-full bg-foreground text-background mono text-[11px] uppercase tracking-widest px-3 py-3 hover:bg-accent disabled:opacity-50",
						children: busy ? "Working…" : mode === "signin" ? "Sign in" : "Sign up"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "w-full mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground",
						onClick: () => {
							setMode(mode === "signin" ? "signup" : "signin");
							setError(null);
							setMessage(null);
						},
						children: mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"
					})
				]
			})]
		})
	});
}
function AccessGate({ children, feature = "This feature" }) {
	const { loading, signedIn, hasAccess, configured } = useAccess();
	const { startCheckout, openBillingPortal, subscription } = useAuth();
	const [authOpen, setAuthOpen] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none opacity-40",
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 flex items-center justify-center bg-background/70 p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mono text-[11px] uppercase tracking-widest text-muted-foreground",
				children: "Loading…"
			})
		})]
	});
	if (!configured || hasAccess) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	const onCheckout = async () => {
		setError(null);
		setBusy(true);
		try {
			await startCheckout();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Checkout failed");
			setBusy(false);
		}
	};
	const onPortal = async () => {
		setError(null);
		setBusy(true);
		try {
			await openBillingPortal();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Portal failed");
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none select-none opacity-30 blur-[1px]",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-10 flex items-center justify-center bg-background/80 p-5 backdrop-blur-[2px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-md w-full border border-border bg-card p-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-sm font-semibold tracking-tight",
								children: [feature, " requires access"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground leading-relaxed",
							children: signedIn ? "Start a 7-day free trial, then $5/month. Cancel anytime from the billing portal." : "Sign in to start a 7-day free trial ($5/month after). Equivalents stay free."
						}),
						subscription?.status && subscription.status !== "trialing" && subscription.status !== "active" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mono text-[10px] uppercase tracking-widest text-muted-foreground",
							children: ["Subscription status: ", subscription.status]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-destructive",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: !signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setAuthOpen(true),
								className: "mono text-[11px] uppercase tracking-widest bg-foreground text-background px-4 py-2.5 hover:bg-accent",
								children: "Sign in / Sign up"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: busy,
								onClick: onCheckout,
								className: "mono text-[11px] uppercase tracking-widest bg-foreground text-background px-4 py-2.5 hover:bg-accent disabled:opacity-50",
								children: busy ? "Redirecting…" : "Start 7-day trial"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: busy,
								onClick: onPortal,
								className: "mono text-[11px] uppercase tracking-widest border border-border px-4 py-2.5 hover:bg-surface disabled:opacity-50",
								children: "Manage billing"
							})] })
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthDialog, {
				open: authOpen,
				onOpenChange: setAuthOpen,
				initialMode: "signup"
			})
		]
	});
}
function FavouritesPanel({ onLoadMixer }) {
	const { favourites, deleteFavourite, hasAccess, configured } = useAuth();
	if (!hasAccess) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-5 md:p-8 text-sm text-muted-foreground",
		children: configured ? "Sign in and start a trial to save and reopen mix recipes." : "Configure Supabase to enable favourites."
	});
	if (favourites.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-5 md:p-8 text-sm text-muted-foreground",
		children: "No favourites yet. Heart a mixer recipe or recipe-finder result to save it here."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-5 md:p-8 grid gap-3 md:grid-cols-2",
		children: favourites.map((fav) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavouriteCard, {
			fav,
			onLoad: () => {
				const entries = fav.payload.paints.map((p) => {
					const paint = paintById(p.id);
					if (!paint) return null;
					return {
						paint,
						parts: p.parts
					};
				}).filter(Boolean);
				if (entries.length) onLoadMixer(entries);
			},
			onDelete: () => deleteFavourite(fav.id)
		}, fav.id))
	});
}
function FavouriteCard({ fav, onLoad, onDelete }) {
	const paints = (0, import_react.useMemo)(() => fav.payload.paints.map((p) => ({
		paint: paintById(p.id),
		parts: p.parts
	})).filter((x) => Boolean(x.paint)), [fav.payload.paints]);
	const hex = fav.payload.hex ?? paints[0]?.paint.hex ?? "#888888";
	const title = fav.title ?? paints.map((p) => `${p.parts}× ${p.paint.code}`).join(" + ") ?? "Saved recipe";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between p-3",
				style: {
					backgroundColor: hex,
					color: contrastText(hex)
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mono text-[10px] uppercase tracking-widest opacity-70",
					children: [fav.kind, fav.payload.dE != null ? ` · ΔE ${fav.payload.dE.toFixed(1)}` : ""]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mono text-xs font-semibold uppercase",
					children: hex
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3 py-2 text-sm font-medium truncate",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border border-t border-border",
				children: paints.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 px-3 py-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-3.5 w-3.5 border border-border",
							style: { backgroundColor: p.paint.hex }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mono text-xs font-semibold w-6",
							children: [p.parts, "×"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs truncate",
							children: [
								p.paint.brand,
								" ",
								p.paint.code,
								" · ",
								p.paint.name
							]
						})
					]
				}, p.paint.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex border-t border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onLoad,
					className: "flex-1 mono text-[10px] uppercase tracking-widest px-3 py-2 hover:bg-surface",
					children: "Load in mixer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onDelete,
					className: "border-l border-border px-3 py-2 hover:bg-surface text-muted-foreground",
					"aria-label": "Delete favourite",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
				})]
			})
		]
	});
}
function FavouriteButton({ disabled, onSave }) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		disabled: disabled || busy,
		onClick: async () => {
			setBusy(true);
			try {
				await onSave();
				setSaved(true);
				setTimeout(() => setSaved(false), 1500);
			} finally {
				setBusy(false);
			}
		},
		className: "inline-flex items-center gap-1.5 border border-border px-2.5 py-1.5 mono text-[10px] uppercase tracking-widest hover:bg-surface disabled:opacity-40",
		title: "Save favourite",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-3.5 w-3.5 ${saved ? "fill-foreground" : ""}` }), saved ? "Saved" : busy ? "Saving…" : "Favourite"]
	});
}
function PaintConverter() {
	const [tab, setTab] = (0, import_react.useState)("equivalents");
	const [mixerSeed, setMixerSeed] = (0, import_react.useState)(null);
	const [mixerKey, setMixerKey] = (0, import_react.useState)(0);
	const loadMixer = (entries) => {
		setMixerSeed(entries);
		setMixerKey((k) => k + 1);
		setTab("mixer");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-0 border border-border bg-card overflow-x-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, {
					active: tab === "equivalents",
					onClick: () => setTab("equivalents"),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { className: "h-3.5 w-3.5" }),
					label: "Equivalents",
					hint: "01"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, {
					active: tab === "mixer",
					onClick: () => setTab("mixer"),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Beaker, { className: "h-3.5 w-3.5" }),
					label: "Mixer",
					hint: "02"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, {
					active: tab === "recipe",
					onClick: () => setTab("recipe"),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-3.5 w-3.5" }),
					label: "Recipe finder",
					hint: "03"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, {
					active: tab === "favourites",
					onClick: () => setTab("favourites"),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3.5 w-3.5" }),
					label: "Favourites",
					hint: "04"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border border-t-0 border-border bg-card",
			children: [
				tab === "equivalents" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquivalentsPanel, {}),
				tab === "mixer" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessGate, {
					feature: "Mixer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MixerPanel, { initialEntries: mixerSeed ?? void 0 }, mixerKey)
				}),
				tab === "recipe" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessGate, {
					feature: "Recipe finder",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecipePanel, { onLoadMixer: loadMixer })
				}),
				tab === "favourites" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessGate, {
					feature: "Favourites",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavouritesPanel, { onLoadMixer: loadMixer })
				})
			]
		})]
	});
}
function TabBtn({ active, onClick, icon, label, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: `group flex-1 min-w-[7.5rem] flex items-center justify-between gap-3 px-5 py-4 text-left border-r border-border last:border-r-0 transition-colors ${active ? "bg-foreground text-background" : "hover:bg-surface"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-2",
			children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-semibold tracking-tight whitespace-nowrap",
				children: label
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `mono text-[10px] ${active ? "opacity-60" : "text-muted-foreground"}`,
			children: hint
		})]
	});
}
function PaintPicker({ value, onChange, placeholder = "Search paint by name, code, or brand…" }) {
	const [q, setQ] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const results = (0, import_react.useMemo)(() => {
		const s = q.trim().toLowerCase();
		if (!s) return PAINTS.slice(0, 40);
		return PAINTS.filter((p) => (p.name + " " + p.code + " " + p.brand + " " + p.line).toLowerCase().includes(s)).slice(0, 60);
	}, [q]);
	if (value) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-stretch border border-border bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-14 shrink-0",
				style: { backgroundColor: value.hex }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 px-3 py-2 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mono text-[10px] text-muted-foreground uppercase tracking-widest truncate",
					children: [
						value.brand,
						" · ",
						value.line,
						" · ",
						value.code
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold truncate",
					children: value.name
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onChange(null),
				className: "px-3 border-l border-border hover:bg-surface",
				"aria-label": "Clear paint",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center border border-border bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 ml-3 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => {
					setQ(e.target.value);
					setOpen(true);
				},
				onFocus: () => setOpen(true),
				onBlur: () => setTimeout(() => setOpen(false), 150),
				placeholder,
				className: "flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
			})]
		}), open && results.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute z-20 mt-1 max-h-80 w-full overflow-auto border border-border bg-popover shadow-lg",
			children: results.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onMouseDown: (e) => e.preventDefault(),
				onClick: () => {
					onChange(p);
					setQ("");
					setOpen(false);
				},
				className: "flex w-full items-center gap-3 border-b border-border px-3 py-2 text-left last:border-b-0 hover:bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "h-6 w-6 shrink-0 border border-border",
					style: { backgroundColor: p.hex }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm font-medium truncate",
						children: p.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mono block text-[10px] text-muted-foreground uppercase tracking-widest truncate",
						children: [
							p.brand,
							" · ",
							p.line,
							" · ",
							p.code
						]
					})]
				})]
			}, p.id))
		})]
	});
}
function EquivalentsPanel() {
	const [source, setSource] = (0, import_react.useState)(PAINTS.find((p) => p.name === "Mephiston Red") ?? null);
	const grouped = (0, import_react.useMemo)(() => {
		if (!source) return [];
		const srcLab = hexToLab(source.hex);
		const others = PAINTS.filter((p) => p.brand !== source.brand);
		const byBrand = /* @__PURE__ */ new Map();
		for (const p of others) {
			const dE = deltaE(srcLab, hexToLab(p.hex));
			const arr = byBrand.get(p.brand) ?? [];
			arr.push({
				paint: p,
				dE
			});
			byBrand.set(p.brand, arr);
		}
		return BRANDS.filter((b) => byBrand.has(b)).map((brand) => ({
			brand,
			matches: byBrand.get(brand).sort((a, b) => a.dE - b.dE).slice(0, 10)
		}));
	}, [source]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-5 md:p-8 space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						num: "A",
						text: "Source paint"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaintPicker, {
						value: source,
						onChange: setSource
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden md:flex items-center justify-center pb-3 text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						num: "B",
						text: "Closest cross-brand matches"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border border-dashed border-border px-3 py-2.5 text-sm text-muted-foreground",
						children: "Top 10 per brand, ranked by ΔE (CIE76). Lower is closer. Free to use."
					})]
				})
			]
		}), source && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
			children: grouped.map(({ brand, matches }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border bg-surface px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mono text-[10px] uppercase tracking-widest",
						children: brand
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mono text-[10px] text-muted-foreground",
						children: [
							matches.length,
							" match",
							matches.length === 1 ? "" : "es"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: matches.map(({ paint, dE }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-stretch border-b border-border last:border-b-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-10 shrink-0",
							style: { backgroundColor: paint.hex }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0 px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium truncate",
								children: paint.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mono text-[10px] text-muted-foreground truncate",
								children: [
									paint.line,
									" · ",
									paint.code
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-end justify-center pr-3 pl-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono text-[10px] text-muted-foreground",
								children: "ΔE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `mono text-sm font-semibold ${dE < 3 ? "text-foreground" : dE < 7 ? "text-foreground/80" : "text-muted-foreground"}`,
								children: dE.toFixed(1)
							})]
						})
					]
				}, paint.id)) })]
			}, brand))
		})]
	});
}
function MixerPanel({ initialEntries }) {
	const { saveFavourite, hasAccess, configured } = useAuth();
	const [entries, setEntries] = (0, import_react.useState)(initialEntries ?? [{
		paint: PAINTS.find((p) => p.brand === "Tamiya" && p.code === "X-7"),
		parts: 2
	}, {
		paint: PAINTS.find((p) => p.brand === "Tamiya" && p.code === "X-2"),
		parts: 1
	}].filter((e) => e.paint));
	const mixed = (0, import_react.useMemo)(() => {
		if (entries.length === 0) return null;
		return mixHex(entries.map((e) => ({
			hex: e.paint.hex,
			parts: e.parts
		})));
	}, [entries]);
	const closest = (0, import_react.useMemo)(() => {
		if (!mixed) return [];
		const lab = hexToLab(mixed);
		return PAINTS.map((p) => ({
			p,
			dE: deltaE(lab, hexToLab(p.hex))
		})).sort((a, b) => a.dE - b.dE).slice(0, 10);
	}, [mixed]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-5 md:p-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						num: "A",
						text: "Recipe"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavouriteButton, {
						disabled: !configured || !hasAccess || entries.length === 0 || !mixed,
						onSave: async () => {
							const res = await saveFavourite({
								kind: "mixer",
								title: entries.map((e) => `${e.parts}× ${e.paint.code}`).join(" + "),
								payload: {
									paints: entries.map((e) => ({
										id: e.paint.id,
										parts: e.parts
									})),
									hex: mixed ?? void 0
								}
							});
							if (res.error) toast.error(res.error);
							else toast.success("Recipe saved to favourites");
						}
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [entries.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-stretch gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 min-w-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaintPicker, {
									value: e.paint,
									onChange: (p) => {
										if (!p) setEntries(entries.filter((_, j) => j !== i));
										else setEntries(entries.map((x, j) => j === i ? {
											...x,
											paint: p
										} : x));
									}
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-stretch border border-border bg-background",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "px-2 hover:bg-surface",
										onClick: () => setEntries(entries.map((x, j) => j === i ? {
											...x,
											parts: Math.max(1, x.parts - 1)
										} : x)),
										children: "−"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-10 flex items-center justify-center mono text-sm font-semibold border-x border-border",
										children: e.parts
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "px-2 hover:bg-surface",
										onClick: () => setEntries(entries.map((x, j) => j === i ? {
											...x,
											parts: x.parts + 1
										} : x)),
										children: "+"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setEntries(entries.filter((_, j) => j !== i)),
								className: "border border-border px-2 hover:bg-surface",
								"aria-label": "Remove",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})
						]
					}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddPaintRow, { onAdd: (p) => setEntries([...entries, {
						paint: p,
						parts: 1
					}]) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mono text-[10px] text-muted-foreground",
					children: "Parts are volumetric. Colors blend in linear sRGB — a physical approximation, not perfect pigment chemistry."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				num: "B",
				text: "Result"
			}), mixed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "aspect-[16/9] flex items-end justify-between p-4",
					style: {
						backgroundColor: mixed,
						color: contrastText(mixed)
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mono text-[10px] uppercase tracking-widest opacity-70",
						children: "Mixed"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mono text-sm font-semibold uppercase",
						children: mixed
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecipeSummary, { entries })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mono text-[10px] uppercase tracking-widest text-muted-foreground",
					children: "Closest single-paint equivalents"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "border border-border",
					children: closest.map(({ p, dE }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-stretch border-b border-border last:border-b-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-8 shrink-0",
								style: { backgroundColor: p.hex }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0 px-3 py-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-medium truncate",
									children: p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mono text-[10px] text-muted-foreground truncate",
									children: [
										p.brand,
										" · ",
										p.code
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center pr-3 mono text-xs font-semibold",
								children: dE.toFixed(1)
							})
						]
					}, p.id))
				})]
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border border-dashed border-border p-6 text-sm text-muted-foreground",
				children: "Add at least one paint to see the mix."
			})]
		})]
	});
}
function RecipeSummary({ entries }) {
	const total = entries.reduce((s, e) => s + e.parts, 0) || 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y divide-border",
		children: entries.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center gap-3 px-3 py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "h-4 w-4 shrink-0 border border-border",
					style: { backgroundColor: e.paint.hex }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mono text-[10px] text-muted-foreground w-10",
					children: [Math.round(e.parts / total * 100), "%"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mono text-xs font-semibold w-6",
					children: [e.parts, "×"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs truncate flex-1",
					children: [
						e.paint.brand,
						" ",
						e.paint.code,
						" · ",
						e.paint.name
					]
				})
			]
		}, i))
	});
}
function AddPaintRow({ onAdd }) {
	const [adding, setAdding] = (0, import_react.useState)(false);
	if (!adding) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setAdding(true),
		className: "flex w-full items-center gap-2 border border-dashed border-border px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface hover:text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add paint"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaintPicker, {
		value: null,
		onChange: (p) => {
			if (p) onAdd(p);
			setAdding(false);
		}
	});
}
function RecipePanel({ onLoadMixer }) {
	const { saveFavourite, hasAccess, configured } = useAuth();
	const [target, setTarget] = (0, import_react.useState)(PAINTS.find((p) => p.name === "Mephiston Red") ?? null);
	const [brand, setBrand] = (0, import_react.useState)("Tamiya");
	const results = (0, import_react.useMemo)(() => {
		if (!target) return [];
		const targetLab = hexToLab(target.hex);
		const pool = PAINTS.filter((p) => p.brand === brand);
		const labs = pool.map((p) => hexToLab(p.hex));
		const ratios = [
			[1, 1],
			[2, 1],
			[1, 2],
			[3, 1],
			[1, 3],
			[3, 2],
			[2, 3]
		];
		const TOP = 10;
		const best = [];
		const consider = (row) => {
			if (best.length < TOP) {
				best.push(row);
				best.sort((x, y) => x.dE - y.dE);
				return;
			}
			if (row.dE >= best[TOP - 1].dE) return;
			best[TOP - 1] = row;
			best.sort((x, y) => x.dE - y.dE);
		};
		for (let i = 0; i < pool.length; i++) {
			const a = pool[i];
			consider({
				a,
				b: a,
				ra: 1,
				rb: 0,
				hex: a.hex,
				dE: deltaE(targetLab, labs[i])
			});
			for (let j = i + 1; j < pool.length; j++) {
				const b = pool[j];
				for (const [ra, rb] of ratios) {
					const hex = mixHex([{
						hex: a.hex,
						parts: ra
					}, {
						hex: b.hex,
						parts: rb
					}]);
					consider({
						a,
						b,
						ra,
						rb,
						hex,
						dE: deltaE(targetLab, hexToLab(hex))
					});
				}
			}
		}
		return best;
	}, [target, brand]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-5 md:p-8 space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-[1fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					num: "A",
					text: "Target color"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaintPicker, {
					value: target,
					onChange: setTarget
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					num: "B",
					text: "Mix using brand"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1 border border-border p-1 bg-background",
					children: BRANDS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setBrand(b),
						className: `mono text-[11px] uppercase tracking-wider px-2.5 py-1.5 ${brand === b ? "bg-foreground text-background" : "hover:bg-surface"}`,
						children: b
					}, b))
				})]
			})]
		}), target && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: results.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-20 flex items-center justify-center mono text-[10px]",
							style: {
								backgroundColor: target.hex,
								color: contrastText(target.hex)
							},
							children: "target"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 flex items-end justify-between p-3",
							style: {
								backgroundColor: r.hex,
								color: contrastText(r.hex)
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono text-[10px] uppercase tracking-widest opacity-70",
								children: "mix"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mono text-xs font-semibold",
								children: ["ΔE ", r.dE.toFixed(1)]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "divide-y divide-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 px-3 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-4 w-4 shrink-0 border border-border",
									style: { backgroundColor: r.a.hex }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mono text-xs font-semibold w-8",
									children: [r.ra, "×"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs truncate",
									children: [
										r.a.code,
										" · ",
										r.a.name
									]
								})
							]
						}), r.rb > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 px-3 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-4 w-4 shrink-0 border border-border",
									style: { backgroundColor: r.b.hex }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mono text-xs font-semibold w-8",
									children: [r.rb, "×"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs truncate",
									children: [
										r.b.code,
										" · ",
										r.b.name
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex border-t border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								const entries = [{
									paint: r.a,
									parts: r.ra
								}];
								if (r.rb > 0) entries.push({
									paint: r.b,
									parts: r.rb
								});
								onLoadMixer(entries);
							},
							className: "flex-1 mono text-[10px] uppercase tracking-widest px-3 py-2 hover:bg-surface",
							children: "Open in mixer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavouriteButton, {
							disabled: !configured || !hasAccess,
							onSave: async () => {
								const paints = [{
									id: r.a.id,
									parts: r.ra
								}];
								if (r.rb > 0) paints.push({
									id: r.b.id,
									parts: r.rb
								});
								const res = await saveFavourite({
									kind: "finder",
									title: `${r.ra}× ${r.a.code}${r.rb > 0 ? ` + ${r.rb}× ${r.b.code}` : ""}`,
									payload: {
										paints,
										hex: r.hex,
										dE: r.dE,
										brand,
										targetPaintId: target.id
									}
								});
								if (res.error) toast.error(res.error);
								else toast.success("Recipe saved to favourites");
							}
						})]
					})
				]
			}, i))
		})]
	});
}
function Label({ num, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-1.5 py-0.5",
			children: num
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mono text-[10px] uppercase tracking-widest text-muted-foreground",
			children: text
		})]
	});
}
function AuthHeaderControls() {
	const { configured, loading, user, hasAccess, profile, subscription, signOut, startCheckout, openBillingPortal } = useAuth();
	const [authOpen, setAuthOpen] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const isComplimentary = profile?.access_tier === "complimentary";
	(0, import_react.useEffect)(() => {
		const params = new URLSearchParams(window.location.search);
		const checkout = params.get("checkout");
		if (checkout === "success") {
			toast.success("Trial started — welcome to Chromabench");
			params.delete("checkout");
			const next = `${window.location.pathname}${params.toString() ? `?${params}` : ""}${window.location.hash || "#tool"}`;
			window.history.replaceState({}, "", next);
		} else if (checkout === "cancel") {
			toast.message("Checkout canceled");
			params.delete("checkout");
			const next = `${window.location.pathname}${params.toString() ? `?${params}` : ""}${window.location.hash || "#tool"}`;
			window.history.replaceState({}, "", next);
		}
	}, []);
	if (!configured) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "mono text-[10px] uppercase tracking-widest text-muted-foreground px-2 hidden lg:inline",
		children: "Auth unset"
	});
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "mono text-[11px] uppercase tracking-widest px-3 py-2 text-muted-foreground",
		children: "…"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => setAuthOpen(true),
		className: "mono text-[11px] uppercase tracking-widest px-3 py-2 hover:bg-surface",
		children: "Sign in"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthDialog, {
		open: authOpen,
		onOpenChange: setAuthOpen
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mono text-[10px] uppercase tracking-widest text-muted-foreground px-2 hidden md:inline",
				children: isComplimentary ? "Complimentary" : hasAccess ? subscription?.status === "trialing" ? "Trial" : "Subscribed" : "No plan"
			}),
			!hasAccess && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: busy,
				onClick: async () => {
					setBusy(true);
					try {
						await startCheckout();
					} catch (err) {
						toast.error(err instanceof Error ? err.message : "Checkout failed");
						setBusy(false);
					}
				},
				className: "mono text-[11px] uppercase tracking-widest ml-1 bg-foreground text-background px-3 py-2 hover:bg-accent disabled:opacity-50",
				children: "Start trial"
			}),
			hasAccess && !isComplimentary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: busy,
				onClick: async () => {
					setBusy(true);
					try {
						await openBillingPortal();
					} catch (err) {
						toast.error(err instanceof Error ? err.message : "Portal failed");
						setBusy(false);
					}
				},
				className: "mono text-[11px] uppercase tracking-widest px-3 py-2 hover:bg-surface disabled:opacity-50",
				children: "Billing"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => signOut(),
				className: "mono text-[11px] uppercase tracking-widest px-3 py-2 hover:bg-surface",
				children: "Sign out"
			})
		]
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolSection, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandsSection, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MethodSection, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Header() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "/",
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-5 w-5 bg-accent",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mono text-sm font-bold tracking-tight",
						children: "CHROMABENCH"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mono text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:inline",
						children: "v0.1"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex items-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#tool",
						className: "mono text-[11px] uppercase tracking-widest px-3 py-2 hover:bg-surface hidden sm:inline",
						children: "Tool"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#brands",
						className: "mono text-[11px] uppercase tracking-widest px-3 py-2 hover:bg-surface hidden md:inline",
						children: "Brands"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#method",
						className: "mono text-[11px] uppercase tracking-widest px-3 py-2 hover:bg-surface hidden md:inline",
						children: "Method"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthHeaderControls, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#tool",
						className: "mono text-[11px] uppercase tracking-widest ml-1 bg-foreground text-background px-3 py-2 hover:bg-accent hidden sm:inline",
						children: "Open bench →"
					})
				]
			})]
		})
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative border-b border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 grid-bg opacity-60",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "border border-border bg-background px-2 py-1",
						children: "01 / Reference"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2",
						children: "Hobby paint converter & mix bench"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl",
					children: [
						"Match any paint.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Mix across any brand."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-2xl text-base text-muted-foreground md:text-lg",
					children: "Pick a paint from Citadel, Vallejo, Tamiya, Mr. Color, SMS, Army Painter, AK Interactive, Scale75, or Reaper. Chromabench finds the closest cross-brand equivalents and builds multi-brand mix recipes so you can keep working with what's on your bench."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Brands",
							value: String(BRANDS.length)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Paints indexed",
							value: String(PAINTS.length)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Perceptual model",
							value: "CIE LAB"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Mix space",
							value: "Linear sRGB"
						})
					]
				})
			]
		})]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background px-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mono text-[10px] uppercase tracking-widest text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 mono text-2xl font-bold",
			children: value
		})]
	});
}
function ToolSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "tool",
		className: "border-b border-border bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				num: "02",
				title: "The bench",
				caption: "Search, match, mix."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaintConverter, {})
			})]
		})
	});
}
function BrandsSection() {
	const groups = BRANDS.map((b) => {
		const list = PAINTS.filter((p) => p.brand === b);
		return {
			brand: b,
			count: list.length,
			samples: list.slice(0, 12)
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "brands",
		className: "border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				num: "03",
				title: "Indexed brands",
				caption: "Curated, growing."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-px bg-border border border-border md:grid-cols-2 lg:grid-cols-4",
				children: groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-background p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold tracking-tight",
							children: g.brand
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mono text-[10px] uppercase tracking-widest text-muted-foreground",
							children: [g.count, " sku"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-6 gap-1",
						children: g.samples.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-square border border-border",
							style: { backgroundColor: p.hex },
							title: p.name
						}, p.id))
					})]
				}, g.brand))
			})]
		})
	});
}
function MethodSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "method",
		className: "border-b border-border bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					num: "04",
					title: "Method",
					caption: "How the bench thinks."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-px bg-border border border-border md:grid-cols-3",
					children: [
						{
							n: "A",
							t: "Perceptual matching",
							d: "Every hex is converted to CIE LAB. Match quality is reported as ΔE — the perceptual distance a trained eye actually sees. Under 2 is a very close match, under 5 is a good working substitute."
						},
						{
							n: "B",
							t: "Multi-brand mixing",
							d: "Add paints from any brand with volumetric parts. Chromabench averages the recipe in linear sRGB — a physically-motivated approximation of how thin acrylics blend on a wet palette."
						},
						{
							n: "C",
							t: "Recipe search",
							d: "Pick a target color and a brand you own. The bench searches every pair of paints in that brand across seven ratios and keeps the top 10 closest mixes by ΔE, so you can hit a Citadel colour from a Tamiya or SMS rack."
						}
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-background p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border inline-block px-1.5 py-0.5",
								children: i.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-xl font-semibold tracking-tight",
								children: i.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground leading-relaxed",
								children: i.d
							})
						]
					}, i.n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 mono text-[11px] uppercase tracking-widest text-muted-foreground",
					children: "Note — hex values are best-effort approximations of published swatches. Always test on a spare miniature before committing."
				})
			]
		})
	});
}
function SectionHeader({ num, title, caption }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-end justify-between gap-6 border-b border-border pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground",
			children: [num, " — Section"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-2 text-3xl font-semibold tracking-tight md:text-4xl",
			children: title
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mono text-[11px] uppercase tracking-widest text-muted-foreground",
			children: caption
		})]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1400px] flex-col gap-3 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-4 w-4 bg-accent",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mono text-xs font-bold tracking-tight",
						children: "CHROMABENCH"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mono text-[10px] text-muted-foreground uppercase tracking-widest",
						children: "Independent · not affiliated with any manufacturer"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mono text-[10px] uppercase tracking-widest text-muted-foreground",
				children: "Built for hobbyists. Corrections welcome."
			})]
		})
	});
}
//#endregion
export { Index as component };
