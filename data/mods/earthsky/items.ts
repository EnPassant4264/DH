export const Items: {[itemid: string]: ModdedItemData} = {
	//New Items
	cursedjewel: {
		name: "Cursed Jewel",
		fling: {
			basePower: 40,
		},
		desc: "Holder's use of Midnight lasts 8 turns instead of 5.",
		num: 1001,
	},
	koknuberry: {
		name: "Koknu Berry",
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Steel",
		},
		//onBeforeMovePriority: 10,
		onOverrideAction(pokemon) { //only event that happens before BeforeMove, which flinch has to be stopped before.
			if (pokemon.volatiles['flinch'] && pokemon.eatItem()) {
				pokemon.removeVolatile('flinch');
			}
		},
		onEat(pokemon) {
		},
		desc: "Cures flinching. Single use.",
		num: 1002,
	},
	meteorite: {
		name: "Meteorite",
		megaStone: "Rayquaza-Mega",
		megaEvolves: "Rayquaza",
		itemUser: ["Rayquaza"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "Evolves Minior into Prominoid if it is at least level 50. If held by a Rayquaza, this item allows it to Mega Evolve in battle, if it also knows the move Dragon Ascent.",
		shortDesc: "Evolves Minior. Must be held for Rayquaza to Mega Evolve in battle.",
		num: 1013,
	},
	butterfreenite: {
		name: "Butterfreenite",
		megaStone: "Butterfree-Mega",
		megaEvolves: "Butterfree",
		itemUser: ["Butterfree"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Butterfree, this item allows it to Mega Evolve in battle.",
		num: 1003,
	},
	slowkinginite: {
		name: "Slowkinginite",
		megaStone: "Slowking-Mega",
		megaEvolves: "Slowking",
		itemUser: ["Slowking"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Slowking, this item allows it to Mega Evolve in battle.",
		num: 1004,
	},
	torkoalite: {
		name: "Torkoalite",
		megaStone: "Torkoal-Mega",
		megaEvolves: "Torkoal",
		itemUser: ["Torkoal"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Torkoal, this item allows it to Mega Evolve in battle.",
		num: 1005,
	},
	milotite: {
		name: "Milotite",
		megaStone: "Milotic-Mega",
		megaEvolves: "Milotic",
		itemUser: ["Milotic"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Milotic, this item allows it to Mega Evolve in battle.",
		num: 1006,
	},
	electivirite: {
		name: "Electivirite",
		megaStone: "Electivire-Mega",
		megaEvolves: "Electivire",
		itemUser: ["Electivire"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by an Electivire, this item allows it to Mega Evolve in battle.",
		num: 1007,
	},
	magmortarite: {
		name: "Magmortarite",
		megaStone: "Magmortar-Mega",
		megaEvolves: "Magmortar",
		itemUser: ["Magmortar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Magmortar, this item allows it to Mega Evolve in battle.",
		num: 1008,
	},
	garbodorite: {
		name: "Garbodorite",
		megaStone: "Garbodor-Mega",
		megaEvolves: "Garbodor",
		itemUser: ["Garbodor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Garbodor, this item allows it to Mega Evolve in battle.",
		num: 1009,
	},
	beheeyemite: {
		name: "Beheeyemite",
		megaStone: "Beheeyem-Mega",
		megaEvolves: "Beheeyem",
		itemUser: ["Beheeyem"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Beheeyem, this item allows it to Mega Evolve in battle.",
		num: 1010,
	},
	sandacondite: {
		name: "Sandacondite",
		megaStone: "Sandaconda-Mega",
		megaEvolves: "Sandaconda",
		itemUser: ["Sandaconda"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Sandaconda, this item allows it to Mega Evolve in battle.",
		num: 1011,
	},
	alcremite: {
		name: "Alcremite",
		megaStone: "Alcremie-Mega",
		megaEvolves: "Alcremie",
		itemUser: ["Alcremie"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by an Alcremie, this item allows it to Mega Evolve in battle.",
		num: 1012,
	},
	//Edited items
	adamantorb: {
		inherit: true,
		fling: {
			basePower: 60,
			flags: {bullet: 1},
		},
		desc: "If held by a Dialga, its Steel- and Dragon-type attacks have 1.2x power. When Flung, counts as a projectile move.",
		shortDesc: "If held by a Dialga, its Steel- and Dragon-type attacks have 1.2x power.",
	},
	brightpowder: {
		name: "Bright Powder",
		spritenum: 51,
		fling: {
			basePower: 0,
			boosts: {accuracy: -2},
			flags: {powder: 1},
		},
		onFoeTryMove(source, target, move) {
			if (move.target === 'foeSide' || (move.target === 'all' && move.id !== 'perishsong')) {
				return;
			}
			if (move.priority > 0.1 && target.useItem())
			{
				this.add('activate', target, 'item: BrightPowder');
				if(!this.dex.getImmunity('powder', source)) return;
				this.attrLastMove('[still]');
				this.add('cant', source, 'item: BrightPowder', move);
				return false;
			}
		},
		num: 213,
		gen: 2,
		desc: "Causes a priority move that targets the holder to fail, which consumes the item. The effect fails if the attacker is immune to powder moves, but the item is still consumed. When Flung, the target's accuracy is lowered 2 stages.",
		shortDesc: "Protects from a priority move. When Flung, -2 accuracy.",
		block: '#damp',
	},
	flameorb: {
		inherit: true,
		fling: {
			basePower: 30,
			status: 'brn',
			flags: {bullet: 1},
		},
		desc: "At the end of every turn, this item attempts to burn the holder. When Flung, burns the target and counts as a projectile move.",
		shortDesc: "At the end of every turn, this item attempts to burn the holder.",
	},
	fullincense: {
		name: "Full Incense",
		spritenum: 155,
		fling: {
			basePower: 20,
		},
		onAllyModifySpe(spe) {
			return this.chainModify(0.75);
		},
		num: 316,
		gen: 4,
		desc: "Halves all allies' speed.",
	},
	griseousorb: {
		inherit: true,
		fling: {
			basePower: 60,
			flags: {bullet: 1},
		},
		desc: "If held by a Giratina, its Ghost- and Dragon-type attacks have 1.2x power, and it becomes its Origin Forme. When Flung, counts as a projectile move.",
		shortDesc: "If held by a Giratina, its Ghost- and Dragon-type attacks have 1.2x power.",
	},
	ironball: {
		inherit: true,
		onStart(pokemon){
			pokemon.removeVolatile('magnetrise');
			pokemon.removeVolatile('telekinesis');
			pokemon.removeVolatile('risingchorus');
		},
		fling: {
			basePower: 130,
			volatileStatus: 'smackdown',
			flags: {bullet: 1},
		},
		desc: "The holder is grounded and cannot be made to float. The holder's Speed is halved. When Flung, grounds the target and counts as a projectile move.",
		shortDesc: "Holder is grounded, Speed halved. If Flying type, takes neutral Ground damage.",
	},
	laxincense: {
		name: "Lax Incense",
		spritenum: 240,
		fling: {
			basePower: 20,
		},
		num: 255,
		gen: 3,
		desc: "No competitive use.",
	},
	lifeorb: {
		inherit: true,
		fling: {
			basePower: 30,
			flags: {bullet: 1},
		},
		desc: "Holder's attacks have their power boosted by 1.3x, but it loses 10% its max HP after each attack. When Flung, counts as a projectile move.",
		shortDesc: "Holder's attacks do 1.3x damage, and it loses 1/10 its max HP after the attack.",
	},
	lightball: {
		inherit: true,
		fling: {
			basePower: 30,
			status: 'par',
			flags: {bullet: 1},
		},
		desc: "If held by a Pikachu, its Attack and Sp. Attack stats are doubled. When Flung, paralyzes the target and counts as a projectile move.",
		shortDesc: "If held by a Pikachu, its Attack and Sp. Atk are doubled.",
	},
	lustrousorb: {
		inherit: true,
		fling: {
			basePower: 60,
			flags: {bullet: 1},
		},
		desc: "If held by a Palkia, its Water- and Dragon-type attacks have 1.2x power. When Flung, counts as a projectile move.",
		shortDesc: "If held by a Palkia, its Water- and Dragon-type attacks have 1.2x power.",
	},
	metalpowder: {
		name: "Metal Powder",
		fling: {
			basePower: 0,
			boosts: {def: 1, spd: 1},
			flags: {powder: 1},
		},
		spritenum: 287,
		num: 257,
		gen: 2,
		desc: "When Flung, increases the target's Defense and Sp. Def stats by 1 stage. Fails if target is immune to powder.",
	},
	oddincense: {
		name: "Odd Incense",
		spritenum: 312,
		fling: {
			basePower: 20,
		},
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Psychic' || (move.twoType && move.twoType === 'Psychic')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		num: 314,
		gen: 4,
		desc: "Allies' Psychic-type moves have 1.1x power.",
	},
	quickpowder: {
		name: "Quick Powder",
		spritenum: 374,
		fling: {
			basePower: 0,
			boosts: {speed: 1},
			flags: {powder: 1},
		},
		num: 274,
		gen: 4,
		desc: "When Flung, increases the target's Speed by 1 stage. Fails if target is immune to powder.",
	},
	rockincense: {
		name: "Rock Incense",
		spritenum: 416,
		fling: {
			basePower: 20,
		},
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Rock' || (move.twoType && move.twoType === 'Rock')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		num: 315,
		gen: 4,
		desc: "Allies' Rock-type moves have 1.1x power.",
	},
	roseincense: {
		name: "Rose Incense",
		spritenum: 419,
		fling: {
			basePower: 20,
		},
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Grass' || (move.twoType && move.twoType === 'Grass')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		num: 318,
		gen: 4,
		desc: "Allies' Grass-type moves have 1.1x power.",
	},
	seaincense: {
		name: "Sea Incense",
		spritenum: 430,
		fling: {
			basePower: 20,
		},
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Water' || (move.twoType && move.twoType === 'Water')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		num: 254,
		gen: 3,
		desc: "Allies' Water-type moves have 1.1x power.",
	},
	silverpowder: {
		inherit: true,
		fling: {
			basePower: 0,
			flags: {powder: 1},
			volatileStatus: 'powder',
		},
		desc: "When Flung, applies Powder to the target. Fails if target is immune to powder.",
	},
	starfberry: {
		inherit: true,
		onEat(pokemon) {
			let statName = 'atk';
			let worstStat = 3000; //The highest possible stat number (with boosts) is 2,676
			let s: StatNameExceptHP;
			for (s in pokemon.storedStats) {
				if (pokemon.storedStats[s] < worstStat) {
					statName = s;
					worstStat = pokemon.storedStats[s];
				}
			}
			this.boost({[statName]: 2}, pokemon);
		},
	},
	toxicorb: {
		inherit: true,
		fling: {
			basePower: 30,
			status: 'tox',
			flags: {bullet: 1},
		},
		desc: "At the end of every turn, this item attempts to badly poison the holder. When Flung, badly poisons the target and counts as a projectile move.",
		shortDesc: "At the end of every turn, this item attempts to badly poison the holder.",
	},
	ultranecroziumz: {
		name: "Ultranecrozium Z",
		spritenum: 687,
		onTakeItem(item, source) {
			if (item.itemUser === source.baseSpecies) return false;
			return true;
		},
		itemUser: ["Necrozma-Dusk-Mane", "Necrozma-Dawn-Wings", "Necrozma-Ultra"],
		num: 923,
		gen: 7,
		desc: "If held by Dusk Mane or Dawn Wings Necrozma, this item allows it to Ultra Burst in battle.",
	},
	waveincense: {
		inherit: true,
		onAllySetStatus(status, target, source, effect) {
			if (status.id === 'brn') {
				this.debug('Wave Incense prevents burns');
				const effectHolder = this.effectData.target;
				this.add('-block', target, 'item: Wave Incense', '[of] ' + effectHolder);
				return null;
			}
		},
		fling: {
			basePower: 20,
		},
		desc: "Prevents allies from receiving burns.",
	},
	aguavberry: {
		inherit: true,
		naturalGift: {
			basePower: 70,
			type: "Dragon",
		},
		onEat(pokemon) {
			if (pokemon.getNature().minus === 'spd') {
				this.heal(pokemon.baseMaxhp * 0.5);
				pokemon.addVolatile('confusion');
			} else {
				this.heal(pokemon.baseMaxhp * 0.125);
			}
		},
		desc: "Restores 12.5% max HP at 1/4 max HP or less. If -SpD Nature, restores 50% instead, but confuses. Single use.",
	},
	figyberry: {
		inherit: true,
		naturalGift: {
			basePower: 70,
			type: "Bug",
		},
		onEat(pokemon) {
			if (pokemon.getNature().minus === 'atk') {
				this.heal(pokemon.baseMaxhp * 0.5);
				pokemon.addVolatile('confusion');
			} else {
				this.heal(pokemon.baseMaxhp * 0.125);
			}
		},
		desc: "Restores 12.5% max HP at 1/4 max HP or less. If -Atk Nature, restores 50% instead, but confuses. Single use.",
	},
	iapapaberry: {
		inherit: true,
		naturalGift: {
			basePower: 70,
			type: "Dark",
		},
		onEat(pokemon) {
			if (pokemon.getNature().minus === 'spa') {
				this.heal(pokemon.baseMaxhp * 0.5);
				pokemon.addVolatile('confusion');
			} else {
				this.heal(pokemon.baseMaxhp * 0.125);
			}
		},
		desc: "Restores 12.5% max HP at 1/4 max HP or less. If -SpA Nature, restores 50% instead, but confuses. Single use.",
	},
	magoberry: {
		inherit: true,
		naturalGift: {
			basePower: 70,
			type: "Ghost",
		},
		onEat(pokemon) {
			if (pokemon.getNature().minus === 'spe') {
				this.heal(pokemon.baseMaxhp * 0.5);
				pokemon.addVolatile('confusion');
			} else {
				this.heal(pokemon.baseMaxhp * 0.125);
			}
		},
		desc: "Restores 12.5% max HP at 1/4 max HP or less. If -Spe Nature, restores 50% instead, but confuses. Single use.",
	},
	wikiberry: {
		inherit: true,
		naturalGift: {
			basePower: 70,
			type: "Rock",
		},
		onEat(pokemon) {
			if (pokemon.getNature().minus === 'def') {
				this.heal(pokemon.baseMaxhp * 0.5);
				pokemon.addVolatile('confusion');
			} else {
				this.heal(pokemon.baseMaxhp * 0.125);
			}
		},
		desc: "Restores 12.5% max HP at 1/4 max HP or less. If -Def Nature, restores 50% instead, but confuses. Single use.",
	},
	/* Items edited as part of other elements */
	absorbbulb: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water' || (move.twoType && move.twoType === 'Water')) {
				target.useItem();
			}
		},
	},
	blueorb: {
		inherit: true,
		fling: {
			basePower: 60,
			flags: {bullet: 1},
		},
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Kyogre' && !('magicroom' in this.field.pseudoWeather)) {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
	},
	cellbattery: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Electric' || (move.twoType && move.twoType === 'Electric')) {
				target.useItem();
			}
		},
	},
	luminousmoss: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water' || (move.twoType && move.twoType === 'Water')) {
				target.useItem();
			}
		},
	},
	redorb: {
		inherit: true,
		fling: {
			basePower: 60,
			flags: {bullet: 1},
		},
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Groudon' && !('magicroom' in this.field.pseudoWeather)) {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
	},
	shedshell: {
		inherit: true,
		onTrapPokemon(pokemon) {
			if(!pokemon.volatiles['meanlooked']){
				pokemon.trapped = pokemon.maybeTrapped = false;
			}
		},
	},
	snowball: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Ice' || (move.twoType && move.twoType === 'Ice')) {
				target.useItem();
			}
		},
	},
	/* Misc. changes related to other elements */
	airballoon: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			this.add('-enditem', target, 'Air Balloon');
			target.lastItem = target.item;
			target.item = '';
			target.itemData = {id: '', target};
			this.runEvent('AfterUseItem', target, null, null, this.dex.getItem('airballoon'));
		},
		onAfterSubDamage(damage, target, source, effect) {
			this.debug('effect: ' + effect.id);
			if (effect.effectType === 'Move') {
				this.add('-enditem', target, 'Air Balloon');
				target.lastItem = target.item;
				target.item = '';
				target.itemData = {id: '', target};
				this.runEvent('AfterUseItem', target, null, null, this.dex.getItem('airballoon'));
			}
		},
		num: 541,
		gen: 5,
	},
	leek: {
		inherit: true,
		onModifyCritRatio(critRatio, user) {
			if (["farfetchd", "sirfetchd", "kendono"].includes(this.toID(user.baseSpecies.baseSpecies))) {
				return critRatio + 2;
			}
		},
		itemUser: ["Farfetch\u2019d", "Sirfetch\u2019d", "Kendo\u2019no"],
	},
	machobrace: {
		inherit: true,
		ignoreKlutz: false,
	},
	poweranklet: {
		inherit: true,
		ignoreKlutz: false,
	},
	powerband: {
		inherit: true,
		ignoreKlutz: false,
	},
	powerbelt: {
		inherit: true,
		ignoreKlutz: false,
	},
	powerbracer: {
		inherit: true,
		ignoreKlutz: false,
	},
	powerlens: {
		inherit: true,
		ignoreKlutz: false,
	},
	powerweight: {
		inherit: true,
		ignoreKlutz: false,
	},
	/* Natural Gift adjustments (also type-reduction edits for dual-type moves) */
	cheriberry: {
		inherit: true,
		naturalGift: {
			basePower: 70,
			type: "Fire",
		},
	},
	chestoberry: {
		inherit: true,
		naturalGift: {
			basePower: 70,
			type: "Water",
		},
	},
	pechaberry: {
		inherit: true,
		naturalGift: {
			basePower: 70,
			type: "Electric",
		},
	},
	rawstberry: {
		inherit: true,
		naturalGift: {
			basePower: 70,
			type: "Grass",
		},
	},
	aspearberry: {
		inherit: true,
		naturalGift: {
			basePower: 70,
			type: "Ice",
		},
	},
	leppaberry: {
		inherit: true,
		naturalGift: {
			basePower: 70,
			type: "Fighting",
		},
	},
	oranberry: {
		inherit: true,
		naturalGift: {
			basePower: 70,
			type: "Poison",
		},
	},
	persimberry: {
		inherit: true,
		naturalGift: {
			basePower: 70,
			type: "Ground",
		},
	},
	lumberry: {
		inherit: true,
		naturalGift: {
			basePower: 70,
			type: "Flying",
		},
	},
	sitrusberry: {
		inherit: true,
		naturalGift: {
			basePower: 70,
			type: "Psychic",
		},
	},
	razzberry: {
		inherit: true,
		naturalGift: {
			basePower: 70,
			type: "Steel",
		},
	},
	blukberry: {
		inherit: true,
		naturalGift: {
			basePower: 80,
			type: "Fire",
		},
	},
	nanabberry: {
		inherit: true,
		naturalGift: {
			basePower: 80,
			type: "Water",
		},
	},
	wepearberry: {
		inherit: true,
		naturalGift: {
			basePower: 80,
			type: "Electric",
		},
	},
	pinapberry: {
		inherit: true,
		naturalGift: {
			basePower: 80,
			type: "Grass",
		},
	},
	pomegberry: {
		inherit: true,
		naturalGift: {
			basePower: 80,
			type: "Ice",
		},
	},
	kelpsyberry: {
		inherit: true,
		naturalGift: {
			basePower: 80,
			type: "Fighting",
		},
	},
	qualotberry: {
		inherit: true,
		naturalGift: {
			basePower: 80,
			type: "Poison",
		},
	},
	hondewberry: {
		inherit: true,
		naturalGift: {
			basePower: 80,
			type: "Ground",
		},
	},
	grepaberry: {
		inherit: true,
		naturalGift: {
			basePower: 80,
			type: "Flying",
		},
	},
	tamatoberry: {
		inherit: true,
		naturalGift: {
			basePower: 80,
			type: "Psychic",
		},
	},
	cornnberry: {
		inherit: true,
		naturalGift: {
			basePower: 80,
			type: "Bug",
		},
	},
	magostberry: {
		inherit: true,
		naturalGift: {
			basePower: 80,
			type: "Rock",
		},
	},
	rabutaberry: {
		inherit: true,
		naturalGift: {
			basePower: 80,
			type: "Ghost",
		},
	},
	nomelberry: {
		inherit: true,
		naturalGift: {
			basePower: 80,
			type: "Dragon",
		},
	},
	spelonberry: {
		inherit: true,
		naturalGift: {
			basePower: 80,
			type: "Dark",
		},
	},
	pamtreberry: {
		inherit: true,
		naturalGift: {
			basePower: 80,
			type: "Steel",
		},
	},
	chilanberry: {
		inherit: true,
		naturalGift: {
			basePower: 90,
			type: "Normal",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (
				(move.type === 'Normal' || (move.twoType && move.twoType === 'Normal')) &&
				(!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))
			) {
				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	occaberry: {
		inherit: true,
		naturalGift: {
			basePower: 90,
			type: "Fire",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Dragon' || (move.twoType && move.twoType === 'Dragon')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	passhoberry: {
		inherit: true,
		naturalGift: {
			basePower: 90,
			type: "Water",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Water' || (move.twoType && move.twoType === 'Water')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	wacanberry: {
		inherit: true,
		naturalGift: {
			basePower: 90,
			type: "Electric",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Electric' || (move.twoType && move.twoType === 'Electric')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	rindoberry: {
		inherit: true,
		naturalGift: {
			basePower: 90,
			type: "Grass",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Grass' || (move.twoType && move.twoType === 'Grass')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	yacheberry: {
		inherit: true,
		naturalGift: {
			basePower: 90,
			type: "Ice",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Ice' || (move.twoType && move.twoType === 'Ice')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	chopleberry: {
		inherit: true,
		naturalGift: {
			basePower: 90,
			type: "Fighting",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Fighting' || (move.twoType && move.twoType === 'Fighting')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	kebiaberry: {
		inherit: true,
		naturalGift: {
			basePower: 90,
			type: "Poison",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Poison' || (move.twoType && move.twoType === 'Poison')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	shucaberry: {
		inherit: true,
		naturalGift: {
			basePower: 90,
			type: "Ground",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Ground' || (move.twoType && move.twoType === 'Ground')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	cobaberry: {
		inherit: true,
		naturalGift: {
			basePower: 90,
			type: "Flying",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Flying' || (move.twoType && move.twoType === 'Flying')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	payapaberry: {
		inherit: true,
		naturalGift: {
			basePower: 90,
			type: "Psychic",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Psychic' || (move.twoType && move.twoType === 'Psychic')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	tangaberry: {
		inherit: true,
		naturalGift: {
			basePower: 90,
			type: "Bug",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Bug' || (move.twoType && move.twoType === 'Bug')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	chartiberry: {
		inherit: true,
		naturalGift: {
			basePower: 90,
			type: "Rock",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Rock' || (move.twoType && move.twoType === 'Rock')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	kasibberry: {
		inherit: true,
		naturalGift: {
			basePower: 90,
			type: "Ghost",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Ghost' || (move.twoType && move.twoType === 'Ghost')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	habanberry: {
		inherit: true,
		naturalGift: {
			basePower: 90,
			type: "Dragon",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Dragon' || (move.twoType && move.twoType === 'Dragon')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	colburberry: {
		inherit: true,
		naturalGift: {
			basePower: 90,
			type: "Dark",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Dark' || (move.twoType && move.twoType === 'Dark')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	babiriberry: {
		inherit: true,
		naturalGift: {
			basePower: 90,
			type: "Steel",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Steel' || (move.twoType && move.twoType === 'Steel')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	roseliberry: {
		inherit: true,
		naturalGift: {
			basePower: 90,
			type: "Fairy",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Fairy' || (move.twoType && move.twoType === 'Fairy')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	marangaberry: {
		inherit: true,
		naturalGift: {
			basePower: 100,
			type: "Normal",
		},
	},
	/* Fling adjustments */
	blunderpolicy: {
		inherit: true,
		fling: {
			basePower: 30,
		},
	},
	laggingtail: {
		inherit: true,
		fling: {
			basePower: 70,
		},
	},
	relicstatue: {
		num: 590,
		name: "Relic Statue",
		desc: "An item valuable to collectors.",
		fling: {
			basePower: 100,
		},
		spritenum: 590,
	},
	sachet: {
		inherit: true,
		fling: {
			basePower: 20,
		},
	},
	smoothrock: {
		inherit: true,
		fling: {
			basePower: 40,
		},
	},
	weaknesspolicy: {
		inherit: true,
		fling: {
			basePower: 30,
		},
	},
};
