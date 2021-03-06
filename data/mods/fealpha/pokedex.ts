export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	/*
	ink here with comments! in order for this to be functional they need weights (at least i think).
	ive included placeholders that are halfway between the base species weights? till im told what else to edit it to.
	
	name: {
		fusion: ['P1', 'P2'],
		num: x.5,
		name: "Name",
		types: [""],
		baseStats: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
		abilities: {0: ""},
		weightkg: ,
	},

		*/
	// 1 -----------------
	uranus: {
		fusion: ['Quagsire', 'Hippowdon'],
		num: 1,
		name: "Uranus",
		types: ["Water", "Ground"],
		baseStats: {hp: 110, atk: 100, def: 110, spa: 80, spd: 70, spe: 45},
		abilities: {0: "Unamused"},
		weightkg: 187.5, 
	},
	saturn: {
		fusion: ['Eternatus', 'Hattrem'],
		num: 2,
		name: "Saturn",
		types: ["Dragon", "Psychic"],
		baseStats: {hp: 114, atk: 65, def: 80, spa: 115, spd: 104, spe: 90},
		abilities: {0: "Pressure Bounce"},
		weightkg: 477.4,
	},
	// 2 -----------------
	doot: {
		fusion: ['Toxapex', 'Golisopod'],
		num: 3,
		name: "Doot",
		types: ["Water", "Poison"],
		baseStats: {hp: 82, atk: 94, def: 146, spa: 56, spd: 136, spe: 37},
		abilities: {0: "Au Revoir"},
		weightkg: 61.25, 
	},
	mrgross: {
		fusion: ['Mr. Rime', 'Metagross'],
		num: 4,
		name: "Mr. Gross",
		types: ["Steel", "Psychic"],
		baseStats: {hp: 100, atk: 110, def: 110, spa: 109, spd: 110, spe: 70},
		abilities: {0: "Clear Cleaner"},
		weightkg: 304.1,
	},
	pluto: {
		fusion: ['Rotom-Frost', 'Blacephalon'],
		num: 5,
		name: "Pluto",
		types: ["Ice", "Ghost"],
		baseStats: {hp: 59, atk: 107, def: 83, spa: 131, spd: 97, spe: 107},
		abilities: {0: "Terraform"},
		weightkg: 6.65,
		prevo: 'Rotom',
	},
	zeus: {
		fusion: ['Zeraora', 'Tauros'],
		num: 6,
		name: "Zeus",
		types: ["Electric", "Normal"],
		baseStats: {hp: 101, atk: 126, def: 85, spa: 71, spd: 75, spe: 126},
		abilities: {0: "Thunderclap"},
		weightkg: 66.45,
	},
	// 3 -----------------
	picante: {
		fusion: ['Flapple', 'Victini'],
		num: 7,
		name: "Picante",
		types: ["Grass", "Fire"],
		baseStats: {hp: 95, atk: 115, def: 100, spa: 107, spd: 80, spe: 85},
		abilities: {0: "Passion Star"},
		weightkg: 2.5,
	},
	mrvolcano: {
		fusion: ['Mr. Mime', 'Volcanion'],
		num: 8,
		name: "Mr. Volcano",
		types: ["Fire", "Fairy"],
		baseStats: {hp: 60, atk: 77, def: 102, spa: 120, spd: 110, spe: 100},
		abilities: {0: "Volcanicity"},
		weightkg: 124.75,
	},
	vespithorn: {
		fusion: ['Vespiquen', 'Ferrothorn'],
		num: 9,
		name: "Vespithorn",
		types: ["Bug", "Steel"],
		baseStats: {hp: 82, atk: 87, def: 136, spa: 67, spd: 119, spe: 30},
		abilities: {0: "Iron Stinger"},
		weightkg: 74.25,
	},
	ishtar: {
		fusion: ['Rotom-Heat', 'Togekiss'],
		num: 10,
		name: "Ishtar",
		types: ["Electric", "Fairy"],
		baseStats: {hp: 80, atk: 60, def: 105, spa: 115, spd: 125, spe: 85},
		abilities: {0: "Spell Master"},
		weightkg: 19.15,
		prevo: 'Rotom',
	},
	// 4 -----------------
	ananke: {
		fusion: ['Lycanroc', 'Terrakion'],
		num: 11,
		name: "Ananke",
		types: ["Rock", "Fighting"],
		baseStats: {hp: 88, atk: 137, def: 82, spa: 63, spd: 82, spe: 120},
		abilities: {0: "Compulsive"},
		weightkg: 142.5,
	},
	darkrose: {
		fusion: ['Darkrai', 'Roserade'],
		num: 12,
		name: "Dark Rose",
		types: ["Dark", "Poison"],
		baseStats: {hp: 69, atk: 100, def: 90, spa: 130, spd: 100, spe: 107},
		abilities: {0: "Bad Program"},
		weightkg: 32.5,
	},
	kratos: {
		fusion: ['Krookodile', 'Staraptor'],
		num: 13,
		name: "Kratos",
		types: ["Ground", "Flying"],
		baseStats: {hp: 95, atk: 133, def: 90, spa: 62, spd: 80, spe: 111},
		abilities: {0: "Intimidate"},
		weightkg: 60.6,
	},
	whiterider: {
		fusion: ['Kyurem-White', 'Ledian'],
		num: 14,
		name: "White Rider",
		types: ["Dragon", "Flying"],
		baseStats: {hp: 90, atk: 80, def: 84, spa: 115, spd: 125, spe: 90},
		abilities: {0: "Foul Breath"},
		weightkg: 180.3,
	},
	// 5 -----------------
	curchyspeed: {
		fusion: ['Pincurchin', 'Deoxys'],
		num: 15,
		name: "Curchys-Peed",
		types: ["Electric", "Psychic"],
		baseStats: {hp: 49, atk: 118, def: 92, spa: 93, spd: 87, spe: 117},
		abilities: {0: "Galvaforce"},
		weightkg: 30.9,
	},
	corvilord: {
		fusion: ['Corviknight', 'Wailord'],
		num: 16,
		name: "Corvilord",
		types: ["Steel", "Water"],
		baseStats: {hp: 139, atk: 98, def: 95, spa: 76, spd: 90, spe: 68},
		abilities: {0: "Pressure"},
		weightkg: 236.5,
	},
	kord: {
		fusion: ['Guzzlord', 'Dusknoir'],
		num: 17,
		name: "Kord",
		types: ["Dark", "Ghost"],
		baseStats: {hp: 134, atk: 100, def: 114, spa: 81, spd: 114, spe: 44},
		abilities: {0: "Pressure Boost"},
		weightkg: 497.3,
	},
	sirpassd: {
		fusion: ['Passimian', "Sirfetch'd"],
		num: 18,
		name: "Sir Pass'd",
		types: ["Fighting"],
		baseStats: {hp: 101, atk: 127, def: 92, spa: 54, spd: 71, spe: 92},
		abilities: {0: "Chivalry"},
		weightkg: 99.9,
	},
	// 6 ----------------- (park, under this is where youre editing, dont get lost!!!)
	teepee: { //done
		fusion: ['Polteageist', 'Indeedee-F'],
		num: 19,
		name: "Teepee",
		types: ["Ghost", "Normal"],
		baseStats: {hp: 70, atk: 65, def: 65, spa: 124, spd: 129, spe: 77},
		abilities: {0: "Armor Surge"},
		weightkg: 14.2,
	},
	composite: { //done
		fusion: ['Kommo-o', 'Sceptile'],
		num: 20,
		name: "Composite",
		types: ["Fighting", "Grass"],
		baseStats: {hp: 83, atk: 100, def: 95, spa: 120, spd: 95, spe: 110},
		abilities: {0: "Unbullet"},
		weightkg: 65.2,
	},
	alilat: { //done
		fusion: ['Appletun', 'Virizion'],
		num: 21,
		name: "Alilat",
		types: ["Grass"],
		baseStats: {hp: 105, atk: 95, def: 95, spa: 95, spd: 105, spe: 76},
		abilities: {0: "Diamond Dust"},
		weightkg: 106.5,
	},
	umbrisse: { //done
		fusion: ['Umbreon', 'Aromatisse'],
		num: 22,
		name: "Umbrisse",
		types: ["Dark", "Fairy"],
		baseStats: {hp: 103, atk: 68, def: 111, spa: 84, spd: 119, spe: 47},
		abilities: {0: "Integrity"},
		weightkg: 21.25,
	},
	// 7 -----------------
	blackrider: { //done
		fusion: ['Kyurem-Black', 'Pawniard'],
		num: 23,
		name: "Black Rider",
		types: ["Dragon", "Dark"],
		baseStats: {hp: 85, atk: 130, def: 85, spa: 85, spd: 85, spe: 89},
		abilities: {0: "Ambient Aid"},
		weightkg: 167.6,
	},
	frother: { //done
		fusion: ['Froslass', 'Scyther'],
		num: 24,
		name: "Frother",
		types: ["Ice", "Flying"],
		baseStats: {hp: 75, atk: 105, def: 80, spa: 67, spd: 80, spe: 122},
		abilities: {0: "Technical Curse"},
		weightkg: 41.3,
		prevo: 'Snorunt',
	},
	beezone: { //done
		fusion: ['Magnezone', 'Beheeyem'],
		num: 25,
		name: "Beezone",
		types: ["Steel", "Psychic"],
		baseStats: {hp: 80, atk: 77, def: 110, spa: 131, spd: 110, spe: 65},
		abilities: {0: "Analytic"},
		weightkg: 107.25,
	},
	toxiking: { //done
		fusion: ['Toxtricity', 'Nidoking'],
		num: 26,
		name: "Toxiking",
		types: ["Electric", "Ground"],
		baseStats: {hp: 80, atk: 100, def: 75, spa: 119, spd: 85, spe: 83},
		abilities: {0: "Plus Ultra"},
		weightkg: 51,
	},
	// 8 -----------------
	norn: { //done
		fusion: ['Porygon2', 'Dragalge'],
		num: 27,
		name: "Norn",
		types: ["Normal", "Poison"],
		baseStats: {hp: 90, atk: 90, def: 90, spa: 110, spd: 110, spe: 54},
		abilities: {0: "Nocturnal Flash"},
		weightkg: 57,
	},
	oni: { //done
		fusion: ['Incineroar', 'Crabominable'],
		num: 28,
		name: "Oni",
		types: ["Fire", "Ice"],
		baseStats: {hp: 111, atk: 125, def: 85, spa: 85, spd: 85, spe: 51},
		abilities: {0: "Fatal End"},
		weightkg: 131.5,
	},
	ares: { //done
		fusion: ['Zapdos', 'Pelipper'],
		num: 29,
		name: "Ares",
		types: ["Flying", "Electric"],
		baseStats: {hp: 95, atk: 70, def: 92, spa: 110, spd: 90, spe: 92},
		abilities: {0: "Thunderstorm"},
		weightkg: 40.3,
	},
	armalion: { //done
		fusion: ['Armaldo', 'Cobalion'],
		num: 30,
		name: "Armalion",
		types: ["Steel", "Bug"],
		baseStats: {hp: 83, atk: 127, def: 114, spa: 80, spd: 76, spe: 96},
		abilities: {0: "Water Warrior"},
		weightkg: 159.1,
	},
	// 9 -----------------
	nug: { //done
		fusion: ['Runerigus', 'Decidueye'],
		num: 31,
		name: "Nug",
		types: ["Ground", "Ghost"],
		baseStats: {hp: 80, atk: 118, def: 121, spa: 75, spd: 102, spe: 50},
		abilities: {0: "Faustian Pact"},
		weightkg: 51.6,
	},
	tyragor: { //done
		fusion: ['Tyranitar', 'Accelgor'],
		num: 32,
		name: "Tyragor",
		types: ["Rock", "Bug"],
		baseStats: {hp: 90, atk: 102, def: 75, spa: 102, spd: 95, spe: 123},
		abilities: {0: "Sand Filling"},
		weightkg: 113.65,
	},
	palerider: { //done
		fusion: ['Infernape', 'Chandelure'],
		num: 33,
		name: "Pale Rider",
		types: ["Fire", "Ghost"],
		baseStats: {hp: 80, atk: 86, def: 80, spa: 125, spd: 80, spe: 114},
		abilities: {0: "Abysmal Surge"},
		weightkg: 44.65,
	},
	laurorusorus: { //done
		fusion: ['Landorus', 'Aurorus'],
		num: 34,
		name: "Laurorusorus",
		types: ["Ground", "Rock"],
		baseStats: {hp: 106, atk: 101, def: 81, spa: 127, spd: 86, spe: 99},
		abilities: {0: "Crystalize"},
		weightkg: 146.5,
	},
	hypnihil: { //done
		fusion: ['Hypno', 'Nihilego'],
		num: 35,
		name: "Hypnihil",
		types: ["Psychic", "Rock"],
		baseStats: {hp: 101, atk: 67, def: 61, spa: 113, spd: 127, spe: 97},
		abilities: {0: "Parasomnia"},
		weightkg: 65.55,
	},
	// 10 --------------------------
};
