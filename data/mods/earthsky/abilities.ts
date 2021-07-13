export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	//New Abilities
	bludgeon: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bludg']) {
				this.debug('Bludgeon boost');
				return this.chainModify(1.5);
			}
		},
		name: "Bludgeon",
		desc: "This Pokemon's tail and hammer attacks have their power multiplied by 1.5.",
		shortDesc: "This Pokemon's tail and hammer attacks have 1.5x power.",
		rating: 2.5,
		num: 1001,
	},
	cacophony: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Cacophony boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		name: "Cacophony",
		desc: "This Pokemon's sound-based attacks have their power multiplied by 1.2.",
		shortDesc: "This Pokemon's sound-based attacks have 1.2x power.",
		rating: 3,
		num: 1002,
	},
	deepterror: {
		onFoeEmergencyExitPriority: 2,
		onFoeEmergencyExit(target, source) {
			if (!(source === this.effectData.target) || !this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.forceSwitchFlag = false;
				}
			}
			target.forceSwitchFlag = true;
			this.add('-activate', source, 'ability: Deep Terror');
			this.add('-switchOut', target, 'ability: Deep Terror', '[of] ' + source);
		},
		name: "Deep Terror",
		desc: "When a Pokemon has more than 1/2 its maximum HP and damage from this Pokemon's attack brings it to 1/2 or less of its maximum HP, it is forced to switch out and be replaced with a random unfainted ally, assuming such an ally exists. This effect applies after all hits from a multi-hit move; This effect applies to both direct and indirect damage, except Curse and Substitute on use, Belly Drum, Pain Split, and confusion damage.",
		shortDesc: "If this Pokemon brings a foe under 50% HP, it scares them out.",
		rating: 2,
		num: 1003,
		switchOut: "  [POKEMON] was scared off of the battlefield!"
	},
	icebreaker: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('hail')) {
				this.debug('Ice Breaker boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		name: "Ice Breaker",
		desc: "If Hail is active, this Pokemon's attacks have their power multiplied by 1.3. This Pokemon takes no damage from Hail.",
		shortDesc: "This Pokemon's attacks have 1.3x power in hail; immunity to it.",
		rating: 2.5,
		num: 1004,
	},
	irresistable: {
		// Implemented in moves.ts as edits to the moves themselves
		name: "Irresistable",
		desc: "When used by this Pokemon, the moves Attract and Captivate will succeed even if the target is the same gender or is genderless. Pokemon with the Ability Oblivious are still immune to these moves.",
		shortDesc: "Attract/Captivate work regardless of gender. Oblivious is unaffected.",
		rating: 1.5,
		num: 1005,
	},
	mistyshroud: {
		onStart(pokemon){
			if (pokemon.volatiles['odorsleuth'] || pokemon.volatiles['evade'] || pokemon.volatiles['minimize'] || pokemon.volatiles['doubleteam'] || pokemon.volatiles['tangledfeet']){
				return false;
			}
			if(this.field.effectiveTerrain() === 'mistyterrain'){
				pokemon.addVolatile('evade', 'mistyterrain');
				pokemon.addVolatile('evadestall');
				this.add('-singleturn', pokemon, 'ability: Misty Shroud');
			}
		},
		onAnySetTerrain(target, source, terrain) {
			console.log(terrain);
			const pokemon = this.effectData.target;
			if (pokemon.volatiles['odorsleuth'] || pokemon.volatiles['evade'] || pokemon.volatiles['minimize'] || pokemon.volatiles['doubleteam'] || pokemon.volatiles['tangledfeet']){
				return;
			}
			if(terrain == "Misty Terrain" && !('midnight' in this.field.pseudoWeather)){
				pokemon.addVolatile('evade', 'mistyterrain');
				pokemon.addVolatile('evadestall');
				this.add('-singleturn', pokemon, 'ability: Misty Shroud');
			} else if (this.effectData.source === 'mistyterrain'){
				pokemon.removeVolatile('evade');
				this.add('-end', pokemon, 'ability: Misty Terrain');
			}
		},
		name: "Misty Shroud",
		desc: "If this Pokemon is sent out during Misty Terrain, or if Misty Terrain is set while it is on the field, it becomes Evasive for the rest of the turn. While Evasive, all moves used on this Pokemon will fail accuracy checks, unless they ignore the condition.",
		shortDesc: "This Pokemon becomes Evasive on the turn it encounters Misty Terrain.",
		start: "  [POKEMON] disappeared into the mist!",
		end: "  [POKEMON] became visible again.",
		rating: 1.5,
		num: 1006,
	},
	nightwalker: {
		onModifySpe(spe, pokemon) {
			if ('midnight' in this.field.pseudoWeather) {
				return this.chainModify(2);
			}
		},
		name: "Night Walker",
		shortDesc: "If Midnight is active, this Pokemon's Speed is doubled.",
		rating: 2.5,
		num: 1007,
	},
	potency: {
		onModifyMove(move, source, target) {
			if (move.status === 'psn'){
				this.debug("Potency upgrading poison to bad poison");
				move.status = 'tox';
			} else if(move.secondaries){
				for (const secondary of move.secondaries){
					if(secondary.status === 'psn'){
						this.debug("Potency upgrading poison to bad poison");
						secondary.status = 'tox';
					}
				}
			}
		},
		name: "Potency",
		desc: "When this Pokemon poisons another, the poison is automatically upgraded to bad poison. If this Pokemon uses Toxic Spikes, it will set two layers so as to badly poison Pokemon affected.",
		shortDesc: "All poison inflicted by this Pokemon is turned into bad poison.",
		rating: 1,
		num: 1008,
	},
	ragemode: {
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (!['Darmanitan-Galar', 'Darmanitan-Rage'].includes(pokemon.species.name) || pokemon.transformed) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp / 2 && !['Rage'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('ragemode');
			} else if (pokemon.hp > pokemon.maxhp / 2 && ['Rage'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('ragemode'); // in case of base Darmanitan-Rage
				pokemon.removeVolatile('ragemode');
			}
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['ragemode'] || !pokemon.hp) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['ragemode'];
			if (pokemon.species.baseSpecies === 'Darmanitan-Galar' && pokemon.species.battleOnly) {
				pokemon.formeChange(pokemon.species.battleOnly as string, this.effect, false, '[silent]');
			}
		},
		condition: {
			onStart(pokemon) {
				if (pokemon.species.id !== 'darmanitanrage') pokemon.formeChange('Darmanitan-Rage');
			},
			onEnd(pokemon) {
				if (['Rage'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
		isPermanent: true,
		name: "Rage Mode",
		desc: "If this Pokemon is a Darmanitan-Galar, it changes to Rage Mode if it has 1/2 or less of its maximum HP at the end of a turn. If Darmanitan's HP is above 1/2 of its maximum HP at the end of a turn, it changes back to Standard Mode. This Ability cannot be removed or suppressed.",
		shortDesc: "If Darmanitan-Galar, at end of turn changes Mode to Standard if > 1/2 max HP, else Rage.",
		rating: 0,
		num: 1009,
	},
	slumberveil: {
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('slp', target);
				}
			}
		},
		name: "Slumber Veil",
		shortDesc: "30% chance a Pokemon making contact with this Pokemon will fall asleep.",
		rating: 2.5,
		num: 1010,
	},
	souldrain: {
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.category !== 'Status') {
				this.heal(pokemon.lastDamage / 8, pokemon);
			}
		},
		name: "Soul Drain",
		desc: "The user recovers 1/8 of the damage, rounded half up, dealt by each of its attacks. The healing occurs even if an attack hits a substitute. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "This Pokemon's attacks heal it for 1/8 of their damage.",
		heal: "  [POKEMON] restored a little HP with Soul Drain!",
		rating: 2,
		num: 1011,
	},
	supermassive: {
		onStart(source) {
			this.add('-activate', source, 'Supermassive');
			this.field.addPseudoWeather('gravity');
		},
		name: "Supermassive",
		shortDesc: "On switch-in, this Pokemon summons Gravity.",
		rating: 3.5,
		num: 1012,
	},
	tactician: {
		onStart(pokemon){
			for(const ally of pokemon.side.active){
				ally.tacticianBoosted = true;
			}
		},
		//Actual effects implemented in scripts.ts as edits to pokemon.getMoves(), actions.runMove(), the various battle.targetting functions, and battle.modifyDamage()
		onAllySwitchIn(pokemon){
			pokemon.tacticianBoosted = true;
		},
		onAllySwitchOut(pokemon){
			delete pokemon.tacticianBoosted;
		},
		onEnd(pokemon){
			for(const ally of pokemon.side.active){
				delete ally.tacticianBoosted;
			}
		},
		name: "Tactician",
		desc: "All single-target moves used by this Pokemon and its allies can target non-adjacent Pokemon. When this Pokemon or its ally uses a move that hits multiple targets, the move does not have the 25% damage reduction.",
		shortDesc: "This Pokemon and its allies ignore spread damage drops and can target anyone.",
		rating: 2,
		num: 1013,
	},
	tireless: {
		onChargeMove(pokemon, target, move) {
			this.debug('tireless - remove charge turn for ' + move.id);
			this.add('-activate', pokemon, 'ability: Tireless');
			this.attrLastMove('[still]');
			this.addMove('-anim', pokemon, move.name, target);
			return false; // skip charge turn
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles['mustrecharge']) {
				pokemon.removeVolatile('mustrecharge');
				this.debug('tireless - remove recharge');
				this.add('-activate', pokemon, 'ability: Tireless');
			}
		},
		onBeforeMovePriority: 11,
		onBeforeMove(pokemon) {
			if (pokemon.volatiles['mustrecharge']) {
				pokemon.removeVolatile('mustrecharge');
				this.debug('tireless - failsafe remove recharge');
			}
		},
		name: "Tireless",
		desc: "When this Pokemon uses a move that must spend a turn charging, it executes on the first turn, after any effects are applied from the charge. When it uses a move that must spend a turn recharging, it does not need to recharge.",
		shortDesc: "This Pokemon's attacks skip charging and recharging turns.",
		activate: "  [POKEMON] became energized immediately!",
		rating: 2,
		num: 1014,
	},
	tradewinds: {
		onStart(source) {
			this.add('-ability', source, 'Trade Winds');
			source.side.addSideCondition('tailwind');
		},
		name: "Trade Winds",
		shortDesc: "On switch-in, this Pokemon summons Tailwind.",
		rating: 4,
		num: 1015,
	},
	warmonger: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'ability: Warmonger');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					target.addVolatile('taunt');
				}
			}
		},
		name: "Warmonger",
		shortDesc: "On switch-in, this Pokemon Taunts adjacent foes.",
		activate: "  [POKEMON] is belligerent!",
		rating: 3.5,
		num: 1016,
	},
	glyphicspell: {
		onSwitchIn(pokemon) {
			if(pokemon.species.baseSpecies === 'Unown'){
				if(!pokemon.abilityData.formeDecided){//Determines forme if it hasn't already.
					pokemon.abilityData.unownType = this.dex.getSpecies(pokemon).forme;
					while(pokemon.abilityData.unownType === "Unown-?"){ //?????: Randomly picks another form each time.
						pokemon.abilityData.unownType = this.sample(pokemon.formeOrder).name;
					}
					if(pokemon.abilityData.unownType === this.dex.getSpecies(pokemon).forme){ //Non-? formes only need to determine once.
						pokemon.abilityData.formeDecided = true;
					}
				}
				if(pokemon.abilityData.unownType === "Unown-C") pokemon.abilityData.switchingIn = true;
				console.log("Assigning Unown type " + pokemon.abilityData.unownType);
			}
		},
		onPreStart(pokemon) {
			if(pokemon.species.baseSpecies === 'Unown' && pokemon.abilityData.unownType === 'Unown-N'){ //Negate: Neutralizing Gas
				//Main implementation is in scripts.ts as an edit to ignoringAbility()
				this.add('-n', pokemon, 'ability: Glyphic Spell');
				pokemon.abilityData.ending = false;
				for (const target of this.getAllActive()) {
					if (target.illusion) {
						this.singleEvent('End', this.dex.getAbility('Illusion'), target.abilityData, target, pokemon, 'neutralizinggas');
					}
				}
			}
		},
		onStart(pokemon){
			//Opposite's not needed for most of them but the code considers it being defined in one case to apply to all cases, might as well put it here
			if(pokemon.species.baseSpecies === 'Unown'){
				console.log("Running start-up for " + pokemon.abilityData.unownType);
				const oppositeFoe = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
				console.log("Direct opponent: " + oppositeFoe.name);
				switch(pokemon.abilityData.unownType){
					case 'Unown': //Adapt: Conversion
						const type = this.dex.getMove(pokemon.moveSlots[0].id).type;
						pokemon.setType(type);
						this.add('-start', pokemon, 'typechange', type);
						break;
					case 'Unown-B': //Block: Ally protection
						for (const ally of pokemon.allies()) {
							ally.addVolatile('protect');
							ally.addVolatile('stall');
						}
						this.add('-b', pokemon.side, 'ability: Glyphic Spell');
						break;
					case 'Unown-C': //Copy: Imposter
						if (!pokemon.abilityData.switchingIn) return;
						if (oppositeFoe) {
							if(oppositeFoe.hasAbility('owntempo')){
								this.add('-immune', oppositeFoe, '[from] ability: Own Tempo');
								this.hint('Own Tempo blocks effects that steal or copy its attributes');
								return;
							}
							pokemon.transformInto(oppositeFoe, this.dex.getAbility('imposter'));
						}
						break;
					case 'Unown-D': //Dry: Desolate Land
						this.field.setWeather('desolateland');
						break;
					case 'Unown-F': //Fear: Attack/Sp. Attack/Sp. Defense -1 on foes
						for (const target of pokemon.side.foe.active) {
							if (!target) continue;
							if (!activated) {
								activated = true;
							}
							if (target.volatiles['substitute']) {
								this.add('-immune', target);
							} else {
								this.boost({atk: -1, spa: -1, spe: -1}, target, pokemon, null, true);
							}
						}
						break;
					case 'Unown-G': //Grow: All stats +1
						this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, pokemon);
						break;
					case 'Unown-H': //Heal: Full heal + status cure
						this.add('-h', pokemon, 'ability: Glyphic Spell');
						pokemon.heal(pokemon.baseMaxhp);
						pokemon.setStatus('');
						break;
					case 'Unown-I': //Ignore: Haze
						for (const foe of pokemon.side.foe.active) {
							foe.clearBoosts();
							this.add('-clearboost', foe);
						}
						break;
					case 'Unown-J': //Join: Split all stats
						const newatk = Math.floor((oppositeFoe.storedStats.atk + pokemon.storedStats.atk) / 2);
						oppositeFoe.storedStats.atk = newatk;
						pokemon.storedStats.atk = newatk;
						const newdef = Math.floor((oppositeFoe.storedStats.def + pokemon.storedStats.def) / 2);
						oppositeFoe.storedStats.def = newdef;
						pokemon.storedStats.def = newdef;
						const newspa = Math.floor((oppositeFoe.storedStats.spa + pokemon.storedStats.spa) / 2);
						oppositeFoe.storedStats.spa = newspa;
						pokemon.storedStats.spa = newspa;
						const newspd = Math.floor((oppositeFoe.storedStats.spd + pokemon.storedStats.spd) / 2);
						oppositeFoe.storedStats.spd = newspd;
						pokemon.storedStats.spd = newspd;
						const newspe = Math.floor((oppositeFoe.storedStats.spe + pokemon.storedStats.spe) / 2);
						oppositeFoe.storedStats.spe = newspe;
						pokemon.storedStats.spe = newspe;
						this.add('-j', pokemon, 'ability: Glyphic Spell', oppositeFoe);
						break;
					case 'Unown-K': //Klepto: Embargo (new)
						for (const foe of pokemon.side.foe.active) {
							if (!target || !this.isAdjacent(target, pokemon)) continue;
							const item = foe.takeItem();
							if (item) {
								this.add('-enditem', foe, item.name, '[from] ability: Glyphic Spell', '[of] ' + source);
							}
						}
						break;
					case 'Unown-L': //Loop: Encores foes
						for (const target of pokemon.side.foe.active) {
							if (!target) continue;
							target.addVolatile('encore');
						}
						break;
					case 'Unown-O': //Observe: Frisk, Forewarn
						pokemon.addVolatile('forewarn', "Glyphic Spell");
						for (const target of pokemon.side.foe.active) {
							if (!target || target.fainted) continue;
							if (target.item) {
								this.add('-fitem', target, target.getItem().name, '[from] Glyphic Spell', '[of] ' + pokemon, '[identify]');
							}
						}
						break;
					case 'Unown-P': //Power: Sp. Attack to +6
						this.boost({spa: 12}, pokemon);
						break;
					case 'Unown-Q': //Quick: Speed to +6
						this.boost({spe: 12}, pokemon);
						break;
					case 'Unown-R': //Reverse: Trick Room
						this.field.addPseudoWeather('trickroom');
						break;
					case 'Unown-S': //Storm: Primordial Sea
						this.field.setWeather('primordialsea');
						break;
					case 'Unown-T': //Turnabout: Rebound
						this.add('-t', pokemon, 'ability: Glyphic Spell');
						pokemon.addVolatile('rebound');
						break;
					case 'Unown-U': //Undo: Clears hazards, screens, weather, and terrain
						const removeEffects = [
							'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb',
						];
						for (const condition of removeEffects) {
							if (pokemon.side.removeSideCondition(condition)) {
								this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name);
							}
							if (pokemon.side.foe.removeSideCondition(condition)) {
								this.add('-sideend', pokemon.side.foe, this.dex.getEffect(condition).name);
							}
						}
						this.field.clearWeather();
						this.field.clearTerrain();
						break;
					case 'Unown-V': //Vanish: Forces out opposite foe
						oppositeFoe.forceSwitchFlag = true;
						break;
					case 'Unown-W': //Weird; Psychic Surge
						this.field.setTerrain('psychicterrain');
						break;
					case 'Unown-X': //X-Out: Destiny Bond
						pokemon.addVolatile('destinybond');
						break;
					case 'Unown-Y': //Yield: Quashes foes
						if (pokemon.side.active.length < 2) return false; // fails in singles
						for (const target of pokemon.side.foe.active) {
							const action = this.queue.willMove(target);
							if (!action) return false;
							action.order = 201;
							this.add('-activate', target, 'Quash');
						}
						break;
					case 'Unown-Z': //Zero-G: Floating status on everyone
						for (const target of pokemon.side.active) {
							if (!target || target.fainted) continue;
							pokemon.addVolatile('risingchorus');
						}
						for (const target of pokemon.side.foe.active) {
							if (!target || target.fainted) continue;
							pokemon.addVolatile('risingchorus');
						}
						break;
					case 'Unown-!': //!!!!! Primes itself for Explosion
						this.add('-ex', pokemon, 'ability: Glyphic Spell');
						break;
				}
			}
		},
		onFoeSwitchIn(pokemon) {
			const target = this.effectData.target;
			if(target.species.baseSpecies === 'unown' && target.abilityData.unownType === 'Unown-O'){ //Observe: Forewarn
				target.addVolatile('forewarn', "Glyphic Spell");
			}
		},
		onTryHit(target, source, move) {
			if(target.species.baseSpecies === 'unown' && target.abilityData.unownType === 'Unown-M'){ //Mirror: Magic Bounce
				if (target === source || move.hasBounced || !move.flags['reflectable']) {
					return;
				}
				const newMove = this.dex.getActiveMove(move.id);
				newMove.hasBounced = true;
				newMove.pranksterBoosted = false;
				this.useMove(newMove, target, source);
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if(target.species.baseSpecies === 'unown' && target.abilityData.unownType === 'Unown-M'){ //Mirror: Magic Bounce
				if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
					return;
				}
				const newMove = this.dex.getActiveMove(move.id);
				newMove.hasBounced = true;
				newMove.pranksterBoosted = false;
				this.useMove(newMove, target, source);
				return null;
			}
		},
		onModifyPriority(priority, source, target, move) {
			if(source.species.baseSpecies === 'unown' && source.abilityData.unownType === 'Unown-E'){ //Engage: +4 priority to first move
				if(source.activeMoveActions === 1 && move.priority < 4){
					return 4;
				}
			}
		},
		onModifyMove(move, source, target) {
			if(source.species.baseSpecies === 'unown'){
				if(source.abilityData.unownType === 'Unown'){ //Adapt: Adaptability
					move.stab = 2;
				}
				if(source.abilityData.unownType === 'Unown-E'){ //Engage: Lots of boosts to first move
					if(source.activeMoveActions === 1){
						this.debug('Glyphic Spell: Engage boosts');
						move.accuracy = true;
						move.willCrit = true;
						move.infiltrates = true;
					}
				}
			}
		},
		onModifyDamage(damage, source, target, move) {
			if(source.species.baseSpecies === 'unown' && source.abilityData.unownType === 'Unown'){ //Adapt: Tinted Lens
				if (target.getMoveHitData(move).typeMod < 0) {
					this.debug('Glyphic Spell: Tinted Lens boost');
					return this.chainModify(2);
				}
			}
		},
		onAnyModifyBoost(boosts, pokemon) {
			if(pokemon.species.baseSpecies === 'Unown' && pokemon.abilityData.unownType === 'Unown-I'){ //Ignore: Unaware
				const unawareUser = pokemon.abilityData.target;
				if (unawareUser === pokemon) return;
				if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
					boosts['def'] = 0;
					boosts['spd'] = 0;
					boosts['evasion'] = 0;
				}
				if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
					boosts['atk'] = 0;
					boosts['def'] = 0;
					boosts['spa'] = 0;
					boosts['accuracy'] = 0;
				}
			}
		},
		onAnySetWeather(target, source, weather) {
			const pokemon = this.effectData.target;
			if(pokemon.species.baseSpecies === 'Unown'){
				if(pokemon.abilityData.unownType === 'Unown-D'){
					const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
					if (this.field.getWeather().id === 'desolateland' && !strongWeathers.includes(weather.id)) return false;
				}
				if(pokemon.abilityData.unownType === 'Unown-S'){
					const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
					if (this.field.getWeather().id === 'primordialsea' && !strongWeathers.includes(weather.id)) return false;
				}
			}
		},
		onHit(pokemon, source, move) {
			if(pokemon.species.baseSpecies === 'Unown' && pokemon.abilityData.unownType === 'Unown-!' && move.category !== "Status"){ //!!!!!: Blows up if it gets hit
				const kaboom = this.dex.getMove('explosion');
				kaboom.willCrit = true;
				kaboom.ignoreImmunities['Normal'] = true;
				this.useMove(kaboom, pokemon);
			}
		},
		onSourceAfterFaint(length, target, source, effect) {
			if(source.species.baseSpecies === 'unown' && source.abilityData.unownType === 'Unown-G') //Grow: Stats up on KO
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length, def: length, spa: length, spd: length, spe: length}, source);
			}
		},
		onResidual(pokemon){
			if(pokemon.species.baseSpecies === 'Unown' && pokemon.abilityData.unownType === 'Unown-!'){ //!!!!!: Blows up at the end of the turn
				const kaboom = this.dex.getMove('explosion');
				kaboom.willCrit = true;
				kaboom.ignoreImmunities['Normal'] = true;
				this.useMove(kaboom, pokemon);
			}
			pokemon.abilityData.warnMoves = [];
		},
		onEnd(pokemon) {
			if(pokemon.species.baseSpecies === 'Unown' && pokemon.abilityData.unownType === 'Unown-D'){
				if (this.field.weatherData.source !== pokemon) return;
				for (const target of this.getAllActive()) {
					if (target === pokemon) continue;
					if (target.hasAbility('desolateland') || (pokemon.species.baseSpecies === 'Unown' && pokemon.abilityData.unownType === 'Unown-D' && pokemon.hasAbility('glyphicspell'))) {
						this.field.weatherData.source = target;
						return;
					}
				}
				this.field.clearWeather();
			}
			if(pokemon.species.baseSpecies === 'Unown' && pokemon.abilityData.unownType === 'Unown-S'){
				if (this.field.weatherData.source !== pokemon) return;
				for (const target of this.getAllActive()) {
					if (target === pokemon) continue;
					if (target.hasAbility('primordialsea') || (pokemon.species.baseSpecies === 'Unown' && pokemon.abilityData.unownType === 'Unown-S' && pokemon.hasAbility('glyphicspell'))) {
						this.field.weatherData.source = target;
						return;
					}
				}
				this.field.clearWeather();
			}
		},
		isPermanent: true,
		name: "Glyphic Spell",
		desc: `This Ability functions differently based on Unown's forme. Each letter is given a designated word (similar to the TCG) starting with that letter that grants effects while Unown is on the field. They are as follows:
		A - Adapt:		Changes Unown's type to that of its Hidden Power, boosts the STAB bonus to 2x, and doubles its power when the move is not very effective.
		B - Block:		Protects itself and allies from attacks this turn. Doesn't check the counter of consecutively-used protective moves to have a chance to fail, but it does increment it.
		C - Copy:		Immediately transforms into its direct opponent.
		D - Dry:		Summons scorching sunlight for as long as Unown is in battle.
		E - Engage:		Unown's first attack gains +4 priority, always scores a critical hit, ignores enemy screens and substitutes, and skips its accuracy check.
		F - Fear:		Lowers the Attack, Sp. Attack, and Speed of all foes by one stage.
		G - Grow:		Unown's Attack, Defense, Sp. Attack, Sp. Defense, and Speed are raised one stage. Every time Unown scores a KO, all of them raise again.
		H - Heal:		Fully restores Unown's HP and cures its status conditions.
		I - Ignore:		All foes' stat changes are reset to 0, and further stat changes are ignored in damage calculations involving Unown.
		J - Join:		The stats of Unown and its direct opponent are added up and then split evenly between them.
		K - Klepto:		Removes all adjacent opponents' items.
		L - Loop:		All adjacent foes are inflicted with an Encore.
		M - Mirror:		Grants Unown the effects of Magic Bounce.
		N - Negate:		Grants Unown the effects of Neutralizing Gas.
		O - Observe:	Reveals all foes' held items and each of their strongest moves. If the Pokemon uses its identified move on Unown, it will miss as if Unown was Evasive.
		P - Power:		Raises Unown's Sp. Attack to +6.
		Q - Quicken:	Raises Unown's Speed to +6.
		R - Reverse:	Summons Trick Room for five turns.
		S - Storm:		Summons torrential rain for as long as Unown is in battle.
		T - Turnabout:	The first attack to hit Unown this turn has its damage Rebound, using the same calculation as the move.
		U - Undo:		Clears all weather effects, terrains, entry hazards, and screens.
		V - Vanish:		Forces Unown's direct opponent to switch out, ignoring substitutes.
		W - Weird:		Summons Psychic Terrain for five turns.
		X - X-Out:		If Unown faints from an attack this turn, the attacker also faints.
		Y - Yield:		All opponents are forced to move after everyone else this turn.
		Z - Zero-G:		Applies floating status to all Pokémon for five turns.
		? - ?????:		Randomly uses one of the other (non-!) letters' effects each time.
		! - !!!!!:		Unown primes itself. If it takes damage, or at the end of the turn if it doesn't, it uses Explosion with a 100% chance to score a critical hit.
		Glyphic Spell cannot be copied, swapped, suppressed, or overridden, and will not have any effect if hacked onto another Pokemon.`,
		shortDesc: "Has a special effect depending on Unown's letter.",
		b: "  [POKEMON] and its allies are protected!",
		fitem: "  [POKEMON] observed [TARGET]'s [ITEM]!",
		fmove: "  [TARGET]'s [MOVE] was observed!",
		h: "  [POKEMON] was healed!",
		n: "  [POKEMON] is suppressing abilities!",
		j: "  [POKEMON] and [TARGET] had their stats shared!",
		t: "  [POKEMON] is preparing a counterattack!",
		ex: "  [POKEMON] radiates a lot of power...",
		miss: "  [POKEMON] foresaw the attack and evaded!",
		rating: 3,
		num: 1019,
	},
	//Changed Abilities
	airlock: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'ability: Air Lock');
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (!strongWeathers.includes(this.field.weather)){
				this.field.clearWeather();
			}
			this.effectData.switchingIn = false;
		},
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (!strongWeathers.includes(weather.id)){
				this.add('-activate', this.effectData.target, 'ability: Air Lock');
				return false;
			}
		},
		suppressWeather: true,
		name: "Air Lock",
		shortDesc: "When this Pokemon is active, weather disappears.",
		rating: 2,
		num: 76,
		start: "  The skies cleared above the battlefield.",
		block: "  The air remained calm!",
	},
	alchemy: {
		onSwitchIn(pokemon){
			this.effectData.switchingIn = true;
		},
		onStart(pokemon){
			const replaced = pokemon.side.faintedThisTurn;
			if (!this.effectData.switchingIn || !replaced) return;
			const ability = replaced.getAbility();
			const additionalBannedAbilities = [
				'noability', 'alchemy', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'receiver', 'trace', 'wonderguard',
			];
			if (ability.isPermanent || additionalBannedAbilities.includes(ability)) return;
			this.add('-ability', this.effectData.target, ability, '[from] ability: Alchemy', '[of] ' + replaced);
			this.effectData.target.setAbility(ability);
			this.effectData.switchingIn = false;
			
		},
		name: "Alchemy",
		rating: 1,
		num: 223,
		desc: "This Pokemon copies the Ability of an ally that fainted this turn. Abilities that cannot be copied are \"No Ability\", Alchemy, Comatose, Disguise, Flower Gift, Forecast, Glyphic Spell, Gulp Missile, Hunger Switch, Ice Face, Illusion, Imposter, Multitype, Neutralizing Gas, Power Construct, Rage Mode, Receiver, RKS System, Schooling, Shields Down, Stance Change, Trace, Wonder Guard, and Zen Mode.",
		shortDesc: "This Pokemon copies the Ability of an ally that fainted.",
	},
	anticipation: {
		inherit: true,
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					if (move.category === 'Status') continue;
					if (move.twoType){
						if (this.dex.getImmunity(move, pokemon) && this.dex.getEffectiveness(move, pokemon) >= 2) {
							this.add('-ability', pokemon, 'ability: Anticipation');
							return;
						}
					}
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) >= 2) {
						this.add('-ability', pokemon, 'ability: Anticipation');
						return;
					}
				}
			}
		},
		onFoeSwitchIn(target) {
			const pokemon = this.effectData.target;
			for (const moveSlot of target.moveSlots) {
				const move = this.dex.getMove(moveSlot.move);
				if (move.category === 'Status') continue;
				if (move.twoType){
					if (this.dex.getImmunity(move, pokemon) && this.dex.getEffectiveness(move, pokemon) >= 2) {
						this.add('-ability', pokemon, 'ability: Anticipation');
						return;
					}
				}
				const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
				if (this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) >= 2) {
					this.add('-ability', pokemon, 'ability: Anticipation');
					return;
				}
			}
		},
		onAccuracy(accuracy, target, source, move) {
			if (target !== this.effectData.target || typeof(accuracy) !== 'number' || move.ignoreEvasion) return;
			if (move.twoType){
				if (this.dex.getImmunity(move, target) && this.dex.getEffectiveness(move, target) >= 2) {
					this.add('-miss', source, 'ability: Anticipation', '[of] ' + target);
					return false;
				}
			}
			const moveType = move.id === 'hiddenpower' ? source.hpType : move.type;
			if (this.dex.getImmunity(moveType, target) && this.dex.getEffectiveness(moveType, target) >= 2) {
				this.add('-miss', target, 'ability: Anticipation', '[of] ' + source);
				return false;
			}
		},
		rating: 3,
		desc: "On switch-in, this Pokemon is alerted if any opposing Pokemon has an attack that is doubly super effective on this Pokemon. If any such moves are used on this Pokemon, it will dodge them using the rules of Evasiveness. Counter, Metal Burst, and Mirror Coat count as attacking moves of their respective types, Hidden Power counts as its determined type, and Judgment, Multi-Attack, Natural Gift, Revelation Dance, Techno Blast, and Weather Ball are considered Normal-type moves.",
		shortDesc: "Shudders to detect x4 effective moves and becomes Evasive to them.",
		miss: "  [POKEMON] anticipated the attack and evaded!"
	},
	berserk: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 1, spa: 1, spe: 1});
			}
		},
		desc: "When this Pokemon has more than 1/2 its maximum HP and takes damage from an attack bringing it to 1/2 or less of its maximum HP, its Attack, Special Attack, and Speed are raised by 1 stage. This effect applies after all hits from a multi-hit move.",
		shortDesc: "This Pokemon's Atk, Sp. Atk, Speed +1 at <1/2 max HP from an attack.",
	},
	cloudnine: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'ability: Cloud Nine');
		},
		onAnySetWeather(target, source, weather) {
			this.add('-activate', this.effectData.target, 'ability: Cloud Nine');
			return false;
		},
		onEnd(pokemon) {
			let returningWeather = '';
			for (const target of this.speedSort(this.getAllActive(), (a, b) => b.speed - a.speed)) {
				if (target.hasAbility('desolateland')) {
					returningWeather = 'desolateland';
				} else if (target.hasAbility('primordialsea')) {
					returningWeather = 'primordialsea';
				} else if (target.hasAbility('deltastream')) {
					returningWeather = 'deltastream';
				}
			}
			if(returningWeather) this.field.setWeather(returningWeather);
		},
		suppressWeather: true,
		name: "Cloud Nine",
		rating: 2,
		num: 13,
	},
	//Corrosion self-poison prevention implemented in scripts.ts as an edit to setStatus in pokemon.ts.
	damp: {
		inherit: true,
		onAnyTryMove(target, source, effect) {
			if (['eggbomb', 'explosion', 'mindblown', 'napalm', 'searingshot', 'selfdestruct', 'shelltrap'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.target, 'ability: Damp', effect, '[of] ' + target);
				return false;
			}
		},
		desc: "While this Pokemon is active, Egg Bomb, Explosion, Mind Blown, Napalm, Searing Shot, Self-Destruct, Shell Trap, and the Aftermath Ability are prevented from having an effect.",
		shortDesc: "Prevents explosion-based moves and Abilities while this Pokemon is active.",
	},
	defeatist: {
		inherit: true,
		onModifyAtk(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				return this.chainModify(0.667);
			}
		},
		onModifySpA(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				return this.chainModify(0.667);
			}
		},
		desc: "While this Pokemon has 1/2 or less of its maximum HP, its Attack and Special Attack are reduced by 1/3.",
		shortDesc: "When this Pokemon has 1/2 or less of its max HP, its Attack and Sp. Atk are reduced by 1/3.",
	},
	flareboost: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.status === 'brn' && move.category === 'Special') {
				return this.chainModify(2);
			}
		},
		desc: "While this Pokemon is burned, the power of its special attacks is multiplied by 2.",
		shortDesc: "While this Pokemon is burned, its special attacks have x2 power.",
	},
	forewarn: {
		inherit: true,
		onStart(pokemon){
			pokemon.addVolatile('forewarn', "Forewarn");
		},
		onFoeSwitchIn(pokemon){
			this.effectData.target.addVolatile('forewarn', "Forewarn");
		},
		condition: {
			onStart(pokemon) {
				let warnPokeMove = undefined;
				this.effectData.warnMoves = [];
				for (let i = 0; i < pokemon.side.foe.active.length; i++) {
					const target = pokemon.side.foe.active[i];
					if (target.fainted || (pokemon.activeMoveActions > 1 && target.activeMoveActions > 1)) continue;
					let warnBp = 1;
					for (const moveSlot of target.moveSlots) {
						const move = this.dex.getMove(moveSlot.move);
						if(!move) continue;
						let bp = move.basePower;
						//STAB
						bp *= target.hasType(move.type) ? 1.5 : 1;
						//bp *= (move.twoType) ? (target.hasType(move.twoType) ? 1.5 : 1) : 1;
						//Type effectiveness
						bp *= Math.pow(2, this.dex.getEffectiveness(move.type, pokemon));
						//bp *= (move.twoType) ? Math.pow(2, this.dex.getEffectiveness(move.twoType, pokemon)) : 1;
						//Non-BP
						if (move.ohko) bp = 150;
						else if (['counter', 'metalburst', 'mirrorcoat', 'rebound'].includes(move.id)) bp = 120;
						else if (move.multihit){
							if(Array.isArray(move.multihit)){ //Move has variable hits
								bp *= move.multihit[1]; //Assumes maximum value
							} else {
								bp *= move.multihit;
							}
						}
						if (!bp && move.category !== 'Status'){
							switch(move.id){
							//Fixed-damage moves: Twice the percentage of max HP the move deals
							case('dragonrage'):
							case('sonicboom'):
								bp = move.damage / pokemon.maxhp * 200;
								break;
							case('endeavor'):
								bp = (target.hp - pokemon.hp) / pokemon.maxhp * 200;
								break;
							case('finalgambit'):
								bp = target.hp / pokemon.maxhp * 200;
								break;
							case('natureswrath'):
							case('superfang'):
								bp = pokemon.hp / 2 / pokemon.maxhp * 200;
								break;
							case('nightshade'):
							case('psywave'): //Damage variance is ignored
							case('seismictoss'):
								bp = target.level / pokemon.maxhp * 200;
								break;
							//Variable-power moves
							case('beatup'): //The number of unfainted/unstatused Pokemon is known, but their Attack might not be so it assumes 10 (the old BP) for simplicity
								bp = 10 * target.side.pokemon.filter(ally => ally === pokemon || !ally.fainted && !ally.status).length;
								break;
							case('poltergeist'):
								const item = pokemon.getItem();
								bp = (item.fling) ? 80 + item.fling.basePower : 0;
								break;
							//All these move use basePowerCallback, so use that to get an accurate number
							case('crushgrip'):
							case('flail'):
							case('grassknot'):
							case('heatcrash'):
							case('heavyslam'):
							case('lowkick'):
							case('reversal'):
							case('powertrip'):
							case('punishment'):
							case('storedpower'):
							case('wringout'):
								bp = move.basePowerCallback(target, pokemon);
							//VP moves which return default values because they require information the player can't see
							case('fling'): //Held item; potentially known if announced, but assumes it isn't
								bp = 20;
								break;
							case('frustration'): //Happiness
							case('return'):
								bp = 102;
								break;
							case('naturalgift'): //Held item; potentially known if announced, but assumes it isn't
								bp = 70;
								break;
							case('trumpcarp'): //Move's PP
								bp = 40;
								break;
							default: //Electro Ball, Gyro Ball
								bp = 80;
								break;
							}
						}
						if(!this.dex.getImmunity(move.type, pokemon) || (move.twoType && !this.dex.getImmunity(move.twoType, pokemon))) bp = 0;
						if (bp >= warnBp) {
							if(!warnPokeMove) {
								warnPokeMove = [[move, target]];
							} else {
								warnPokeMove.push = [move, target];
							}
							warnBp = bp;
						}
					}
					if(!warnPokeMove) continue;
					this.effectData.warnMoves.push(this.sample(warnPokeMove));
					this.add('-activate', pokemon, `ability: $(this.effectData.source)`, warnPokeMove[2], '[of] ' + warnPokeMove[1]); //used because Glyphic Spell also adds this volatile
					console.log("Forewarn found " + warnPokeMove[2] + "'s " + warnPokeMove[1]);
				}
				if (!this.effectData.warnMoves.length) return;
			},
			onAccuracy(accuracy, target, source, move) {
				if (target === source || !this.effectData.warnMoves.length || typeof(accuracy) !== 'number' || move.ignoreEvasion) return;
				if ([source, move] in this.effectData.warnMoves){
					this.add('-miss', source, `ability: $(this.effectData.source)`, '[of] ' + target); //see above
					return false;
				}
			},
		},
		rating: 2.5,
		desc: "On switch-in, this Pokemon is alerted to each opposing Pokemon's move with the highest power. When an opposing Pokemon uses its identified attack on this Pokemon, it will dodge it using the rules of Evasiveness.",
		shortDesc: "This Pokemon is alerted to each foe's strongest attack and becomes Evasive to them.",
		miss: "  [POKEMON] foresaw the attack and evaded!"
	},
	galewings: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			if (move && (move.type === 'Flying' || (move.twoType && move.twoType === 'Flying')) && pokemon.hp > pokemon.maxhp / 2) return priority + 1;
		},
		rating: 4,
		shortDesc: "This Pokemon's Flying-type attacks have +1 Priority when above 1/2 of its max HP.",
	},
	grasspelt: {
		inherit: true,
		onModifyDef(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return this.chainModify(2);
		},
		shortDesc: "If Grassy Terrain is active, this Pokemon's Defense is multiplied by 2.",
	},
	//Harvest change implemented in the item-removing effects.
	heatproof: {
		inherit: true,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				return this.chainModify(0.5);
			}
		},
		onDamage(damage, target, source, effect) {},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Heatproof');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Heatproof');
			}
			return false;
		},
		desc: "The power of Fire-type attacks against this Pokemon is halved, and it is immune to burns.",
		shortDesc: "The power of Fire-type attacks against this Pokemon is halved; burns are prevented.",
	},
	heavymetal: {
		inherit: true,
		onStart(pokemon){
			pokemon.removeVolatile('magnetrise');
			pokemon.removeVolatile('telekinesis');
			pokemon.removeVolatile('risingchorus');
		},
		//Rest of floating block implemented in scripts.ts as part of pokemon.canFloat()
		shortDesc: "This Pokemon's weight is doubled. It is unable to float in the air.",
		block: "  [POKEMON] is weighed down with heavy metal!"
	},
	illuminate: {
		name: "Illuminate",
		onStart(pokemon){
			if ('midnight' in this.field.pseudoWeather) {
				this.field.removePseudoWeather('midnight');
			}
		},
		onAnyTryMove(target, source, effect) {
			if (effect.id === 'midnight') {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.source, 'ability: Illuminate', effect, '[of] ' + this.effectData.target);
				return false;
			}
		},
		rating: 0.5,
		num: 35,
		shortDesc: "While this Pokemon is active, Midnight disappears and cannot be activated.",
	},
	immunity: {
		inherit: true,
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (move.flags['powder'] && target !== source && this.dex.getImmunity('powder', target)) {
				this.add('-immune', target, '[from] ability: Immunity');
				return null;
			}
		},
		shortDesc: "This Pokemon cannot be poisoned and is immune to powder moves.",
	},
	innerfocus: {
		inherit: true,
		//Implemented in the move-based redirections themselves
		shortDesc: "This Pokemon cannot flinch and ignores move-based redirection. Immune to Intimidate.",
	},
	insomnia: {
		inherit: true,
		onSourceModifyAccuracyPriority: 9,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number' || !('midnight' in this.field.pseudoWeather)) return;
			this.debug('insomnia - enhancing accuracy');
			return accuracy * 1.3;
		},
	},
	ironfist: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Iron Fist boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
	},
	//Klutz preventing Speed drops from training items implementd in items.ts on the items themselves.
	lightmetal: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			return this.chainModify(1.2);
		},
		shortDesc: "This Pokemon's weight is halved and its Speed is boosted by 20%.",
	},
	limber: {
		inherit: true,
		//Hazard immunity implemented in moves.ts in the hazards themselves.
		shortDesc: "This Pokemon cannot be paralyzed. When switching in, it is unaffected by hazards.",
	},
	magicguard: {
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move' && effect.name !== 'Recoil' && 
				![this.dex.getItem('lifeorb'), this.dex.getEffect('High Jump Kick'), this.dex.getEffect('Jump Kick'), this.dex.getEffect('Steel Beam'), this.dex.getEffect('Mind Blown')].includes(effect)
			) {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		name: "Magic Guard",
		desc: "This Pokemon can only be damaged by direct attacks. Curse and Substitute on use, Belly Drum, Pain Split, recoil, and confusion damage are considered direct damage.",
		shortDesc: "This Pokemon can only be damaged by direct attacks or recoil.",
		rating: 4,
		num: 98,
	},
	magmaarmor: {
		inherit: true,
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(0.5);
			}
		},
		desc: "The power of Ice-type attacks against this Pokemon is halved, and it is immune to being frozen.",
		shortDesc: "The power of Ice-type moves against this Pokemon is halved; freeze is prevented.",
	},
	megalauncher: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
				return this.chainModify(1.5);
			}
		},
		desc: "This Pokemon's ball, bomb, cannon, and pulse moves have their power multiplied by 1.5. Heal Pulse restores 3/4 of a target's maximum HP, rounded half down.",
		shortDesc: "This Pokemon's ballistic moves (Shadow Ball, Sludge Bomb, Flash Cannon, etc) have 1.5x power.",
	},
	moody: {
		onSourceHit(target, source, move) {
			if(move.category === "Physical"){
				this.effectData.boost = {spa: 2, atk: -1};
			}
			if(move.category === "Special"){
				this.effectData.boost = {atk: 2, spa: -1};
			}
		},
		onDamagingHit(damage, target, source, move){
			if(move.category === "Physical"){
				this.effectData.boost = {def: 2, spd: -1};
			}
			if(move.category === "Special"){
				this.effectData.boost = {spd: 2, def: -1};
			}
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.effectData.boost = {def: length, spd: length, spe: -length};
			}
		},
		onTryHeal(damage, target, source, effect) {
			if(damage >= this.effectData.target.maxhp / 5){
				this.effectData.boost = {atk: 1, spa: 1, spe: 1, def: -1, spd: -1};
			}
		},
		onResidualOrder: 1,
		onResidual(pokemon) {
			if(this.effectData.boost !== null) this.boost(this.effectData.boost);
			this.effectData.boost = null;
		},
		name: "Moody",
		desc: `At the end of each turn, this Pokemon has stats raised and lowered based on what it has done during that turn:
		-Using an attacking move lowers the attacking stat used and sharply raises the other one.
		-Getting hit by an attack sharply raises the defensive stat used and lowers the other one.
		-Causing another Pokemon to faint raises both defenses but lowers Speed.
		-Receiving a healing effect of 20% or more of its max HP raises both attacking stats and Speed, but lowers both defenses.
		If multiple conditions are met in one turn, only the latest-occuring one will determine the stat change.`,
		shortDesc: "Raises and lowers stats each turn depending on what happens in battle.",
		rating: 3,
		num: 141,
	},
	noguard: {
		inherit: true,
		onModifyMove(move) {
			move.ignoreEvasion = true;
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && (source === this.effectData.target || target === this.effectData.target)) {
				return true;
			}
			return accuracy;
		},
	},
	owntempo: {
		inherit: true,
		//Attribute copy/theft immunity implemented in moves.ts in the moves themselves.
		desc: `This Pokemon cannot be confused. Its moves and attributes also cannot be copied or stolen:
		-Copycat, Mimic, Mirror Move, and Sketch will fail to copy a move it used; Snatch will fail to steal such a move, and Me First will fail to use it.
		-Trace and Role Play will fail to copy its Ability.
		-Reflect Type will fail to copy its type(s).
		-Psych Up will fail to copy its stat changes, and Spectral Thief will fail to steal them.
		-Transform and Imposter (and Glyphic Spell Copy) will fail to transform into it.`,
		shortDesc: "This Pokemon cannot be confused. Attempts to copy or steal its moves and attributes fail.",
		immune: "  [POKEMON]'s mannerisms couldn't be acquired!"
	},
	pastelveil: {
		onUpdate(pokemon) {
			if (['psn', 'tox'].includes(pokemon.status)) {
				this.add('-activate', pokemon, 'ability: Pastel Veil');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (!['psn', 'tox'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Pastel Veil');
			}
			return false;
		},
		onAllySetStatus(status, target, source, effect) {
			if (!['psn', 'tox'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				const effectHolder = this.effectData.target;
				this.add('-block', target, 'ability: Pastel Veil', '[of] ' + effectHolder);
			}
			return false;
		},
		name: "Pastel Veil",
		rating: 2,
		num: 257,
		shortDesc: "This Pokemon and its allies cannot be poisoned.",
	},
	pickpocket: {
		inherit: true,
		onTakeItem(item, pokemon){
			this.effectData.takenThisTurn = true;
		},
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && move?.flags['contact']) {
				if (target.item || target.switchFlag || target.forceSwitchFlag || source.switchFlag === true) {
					return;
				}
				if(['bugbite','knockoff','pluck'].includes(move.id) && this.effectData.takenThisTurn){
					this.debug("Pickpocket not recovering item after getting Knocked Off or eaten");
					delete this.effectData.takenThisTurn;
					return;
				}
				const yourItem = source.takeItem(target);
				if (!yourItem) {
					return;
				}
				if (!target.setItem(yourItem)) {
					source.item = yourItem.id;
					return;
				}
				this.add('-enditem', source, yourItem, '[silent]', '[from] ability: Pickpocket', '[of] ' + source);
				this.add('-item', target, yourItem, '[from] ability: Pickpocket', '[of] ' + source);
			}
		},
		desc: "If this Pokemon has no item and is hit by a contact move, it steals the attacker's item. If the contact move removed the Pokemon's item, it will not steal the attacker's item at that time. This effect applies after all hits from a multi-hit move.",
	},
	poweraura: {
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectData.target) {
				if (!move.auraBooster) move.auraBooster = this.effectData.target;
				if (move.auraBooster !== this.effectData.target) return;
				return this.chainModify([move.hasAuraBreak ? 0x0C4F : 0x14CD, 0x1000]);
			}
		},
		name: "Power Aura",
		rating: 1,
		num: 249,
		start: "  [POKEMON] is radiating a power aura!",
	},
	receiver: {
		onSwitchIn(pokemon){
			this.effectData.switchingIn = true;
		},
		onStart(pokemon){
			const replaced = pokemon.side.faintedThisTurn;
			if (!this.effectData.switchingIn || !replaced) return;
			const ability = replaced.getAbility();
			const additionalBannedAbilities = [
				'noability', 'alchemy', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'receiver', 'trace', 'wonderguard',
			];
			if (ability.isPermanent || additionalBannedAbilities.includes(ability)) return;
			this.add('-ability', this.effectData.target, ability, '[from] ability: Receiver', '[of] ' + replaced);
			this.effectData.target.setAbility(ability);
			this.effectData.switchingIn = false;
		},
		name: "Receiver",
		rating: 1,
		num: 223,
		desc: "This Pokemon copies the Ability of an ally that fainted this turn. Abilities that cannot be copied are \"No Ability\", Alchemy, Comatose, Disguise, Flower Gift, Forecast, Glyphic Spell, Gulp Missile, Hunger Switch, Ice Face, Illusion, Imposter, Multitype, Neutralizing Gas, Power Construct, Rage Mode, Receiver, RKS System, Schooling, Shields Down, Stance Change, Trace, Wonder Guard, and Zen Mode.",
		shortDesc: "This Pokemon copies the Ability of an ally that fainted.",
	},
	runaway: {
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			if(!pokemon.volatiles['meanlooked']){
				pokemon.trapped = pokemon.maybeTrapped = false;
			}
		},
		name: "Run Away",
		desc: "Holder may switch out even when trapped by another Pokemon.",
		rating: 1,
		num: 50,
	},
	sandveil: {
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onStart(pokemon){
			if (pokemon.volatiles['odorsleuth'] || pokemon.volatiles['evade'] || pokemon.volatiles['minimize'] || pokemon.volatiles['doubleteam'] || pokemon.volatiles['tangledfeet']){
				return false;
			}
			if(this.field.effectiveWeather() === 'sandstorm'){
				pokemon.addVolatile('evade', 'sandstorm');
				pokemon.addVolatile('evadestall');
				this.add('-singleturn', pokemon, 'ability: Sand Veil');
			}
		},
		onAnySetWeather(target, source, weather) {
			const pokemon = this.effectData.target;
			if (weather == "Sandstorm" && !('midnight' in this.field.pseudoWeather)){ //AnySetWeather happens before the weather is active, so it will fail with isWeather
				if (pokemon.volatiles['odorsleuth'] || pokemon.volatiles['evade'] || pokemon.volatiles['minimize'] || pokemon.volatiles['doubleteam'] || pokemon.volatiles['tangledfeet']){
					return;
				}
				pokemon.addVolatile('evade', 'sandstorm');
				pokemon.addVolatile('evadestall');
				this.add('-singleturn', pokemon, 'ability: Sand Veil');
			} else if (pokemon.volatiles['evade'] && pokemon.volatiles['evade'].source === 'sandstorm'){
				pokemon.removeVolatile('evade');
				this.add('-end', pokemon, 'ability: Sand Veil');
			}
		},
		name: "Sand Veil",
		rating: 1.5,
		num: 8,
		desc: "If this Pokemon is sent out during a Sandstorm, or if a Sandstorm is active while it is on the field, it becomes Evasive for the rest of the turn. While Evasive, all moves used on this Pokemon will fail accuracy checks, unless they ignore the condition. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "This Pokemon becomes Evasive when it encounters a Sandstorm; immunity to it.",
		start: "  [POKEMON] disappeared into the sandstorm!",
		end: "  [POKEMON] became visible again."
	},
	schooling: {
		onStart(pokemon) {
			if (!['Wishiwashi', 'Tynamo'].includes(pokemon.baseSpecies.baseSpecies) || pokemon.level < 20 || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
				} else if (pokemon.species.id === 'tynamo') {
					pokemon.formeChange('Tynamo-School');
				}
			} else {
				if (pokemon.species.id === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				} else if (pokemon.species.id === 'tynamoschool') {
					pokemon.formeChange('Tynamo');
				}
			}
		},
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (
				!['Wishiwashi', 'Tynamo'].includes(pokemon.baseSpecies.baseSpecies) || pokemon.level < 20 ||
				pokemon.transformed || !pokemon.hp
			) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
				} else if (pokemon.species.id === 'tynamo') {
					pokemon.formeChange('Tynamo-School');
				}
			} else {
				if (pokemon.species.id === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				} else if (pokemon.species.id === 'tynamoschool') {
					pokemon.formeChange('Tynamo');
				}
			}
		},
		isPermanent: true,
		name: "Schooling",
		rating: 3,
		num: 208,
		desc: "On switch-in, if this Pokemon is a Wishiwashi or Tynamo that is level 20 or above and has more than 1/4 of its maximum HP left, it changes to School Form. If it is in School Form and its HP drops to 1/4 of its maximum HP or less, it changes to Solo Form at the end of the turn. If it is in Solo Form and its HP is greater than 1/4 its maximum HP at the end of the turn, it changes to School Form.",
		shortDesc: "If user is Wishiwashi/Tynamo, changes to School Form if it has > 1/4 max HP, else Solo Form.",
	},
	slowstart: {
		onStart(pokemon) {
			if(!this.effectData.time){
				this.effectData.time = 5;
				this.add('-start', pokemon, 'ability: Slow Start');
			}
			console.log("Slow Start count: " + this.effectData.time);
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if(this.effectData.time > 0) return this.chainModify(0.5);
		},
		onModifySpe(spe, pokemon) {
			if(this.effectData.time > 0) return this.chainModify(0.5);
		},
		onResidualOrder: 1,
		onResidual(pokemon) {
			if(pokemon.activeTurns && this.effectData.time > 0) this.effectData.time--;
			if(this.effectData.time === 0){
				this.effectData.time = -1; //-1 is truthy, so it doesn't get re-applied in onStart, but won't decrement or re-trigger the ending here either
				this.add('-end', pokemon, 'Slow Start');
			}
		},
		name: "Slow Start",
		rating: -1,
		num: 112,
		desc: "This Pokemon's Attack and Speed are halved for the first 5 turns it is on the field in battle.",
		shortDesc: "This Pokemon's Attack and Speed are halved for its first 5 turns."
	},
	snowcloak: {
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onStart(pokemon){
			if (pokemon.volatiles['odorsleuth'] || pokemon.volatiles['evade'] || pokemon.volatiles['minimize'] || pokemon.volatiles['doubleteam'] || pokemon.volatiles['tangledfeet']){
				return false;
			}
			if(this.field.effectiveWeather() === 'hail'){
				pokemon.addVolatile('evade', 'hail');
				pokemon.addVolatile('evadestall');
				this.add('-singleturn', pokemon, 'ability: Snow Cloak');
			}
		},
		onAnySetWeather(target, source, weather) {
			const pokemon = this.effectData.target;
			if(weather == "Hail" && !('midnight' in this.field.pseudoWeather)){ //AnySetWeather happens before the weather is active, so it will fail with isWeather
				if (pokemon.volatiles['odorsleuth'] || pokemon.volatiles['evade'] || pokemon.volatiles['minimize'] || pokemon.volatiles['doubleteam'] || pokemon.volatiles['tangledfeet']){
					return;
				}
				pokemon.addVolatile('evade', 'hail');
				pokemon.addVolatile('evadestall');
				this.add('-singleturn', pokemon, 'ability: Snow Cloak');
			} else if (pokemon.volatiles['evade'] && pokemon.volatiles['evade'].source === 'hail'){
				pokemon.removeVolatile('evade');
				this.add('-end', pokemon, 'ability: Snow Cloak');
			}
		},
		name: "Snow Cloak",
		rating: 1.5,
		num: 81,
		desc: "If this Pokemon is sent out during Hail, or if Hail is active while it is on the field, it becomes Evasive for the rest of the turn. While Evasive, all moves used on this Pokemon will fail accuracy checks, unless they ignore the condition. This Pokemon takes no damage from Hail.",
		shortDesc: "This Pokemon becomes Evasive when it encounters Hail; immunity to it.",
		start: "  [POKEMON] disappeared into the snow!",
		end: "  [POKEMON] became visible again.",
	},
	snowplow: {
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('hail')) {
				return this.chainModify(2);
			}
		},
		name: "Snow Plow",
		rating: 3,
		num: 202,
		shortDesc: "If Hail is active, this Pokemon's Speed is doubled.",
	},
	suctioncups: {
		inherit: true,
		onStart(pokemon){
			pokemon.removeVolatile('magnetrise');
			pokemon.removeVolatile('telekinesis');
			pokemon.removeVolatile('risingchorus');
		},
		//Suction Cups floating block implemented in scripts.ts as part of pokemon.canFloat()
		shortDesc: "This Pokemon cannot be forced out by another Pokemon's attack/item. Also prevents floating.",
	},
	sweetveil: {
		inherit: true,
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Sweet Veil');
				pokemon.cureStatus();
			}
		},
	},
	tangledfeet: {
		onDamage(damage, target, source, effect) {
			if (effect.id === this.toID('confused') && !pokemon.volatiles['odorsleuth']) {
				target.addVolatile('tangledfeet');
			}
		},
		condition: {
			duration: 2, //Should get removed in onBeforeMove, so this is a failsafe
			onStart(pokemon, source) {
				this.add('-activate', pokemon, 'ability: Tangled Feet');
			},
			onBeforeMove(pokemon, move) {
				pokemon.removeVolatile('tangledfeet');
			},
			onAccuracy(accuracy, target, source, move) {
				if (!move.ignoreEvasion && typeof(move.accuracy) === 'number') return false;
			},
			onEnd(pokemon){
				this.add('-end', pokemon, 'ability: Tangled Feet', '[silent]');
			}
		},
		name: "Tangled Feet",
		activate: "  [POKEMON] became hard to hit!",
		rating: 1,
		num: 77,
		desc: "If the Pokemon is confused and hits itself in confusion, it becomes Evasive until its next turn. While Evasive, all moves used on this Pokemon will fail accuracy checks, unless they ignore the condition.",
		shortDesc: "Becomes Evasive after hitting itself in confusion.",
	},
	tangling: {
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				source.addVolatile('tangling');
			}
		},
		condition: {
			duration: 2,
			onStart(pokemon, source) {
				this.add('-activate', pokemon, 'tangling');
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'tangling');
			},
		},
		name: "Tangling",
		rating: 2,
		num: 221,
		activate: "  [TARGET] became tangled! It can't escape!",
		end: "  [POKEMON] freed itself from tangling.",
		desc: "Pokemon making contact with this Pokemon become trapped on the following turn.",
		shortDesc: "Pokemon making contact with this Pokemon become trapped for a turn.",
	},
	telepathy: {
		inherit: true,
		onTryHit(target, source, move) {
			if (['any', 'normal', 'allAdjacent'].includes(move.target) && target !== source && target.side === source.side) {
				this.add('-activate', target, 'ability: Telepathy');
				return null;
			}
		},
		onAllyTryHit(target, source, move) {
			if (['any', 'normal', 'allAdjacent'].includes(move.target) && target !== source && target.side === source.side) {
				this.add('-activate', this.effectData.target, 'ability: Telepathy');
				return null;
			}
		},
		rating: 1,
		shortDesc: "The Pokemon and its allies cannot hit each other with attacks."
	},
	teravolt: {
		inherit: true,
		//Ignoring unbreakable Abilities implemented in scripts.ts as an edit to runEvent().
		desc: "This Pokemon's moves and their effects completely ignore Abilities that could potentially interfere with them. Abilities which are usually immune to ignoring are still affected.",
	},
	toughclaws: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		shortDesc: "This Pokemon's contact moves have their power multiplied by 1.2.",
	},
	toxicboost: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if ((attacker.status === 'psn' || attacker.status === 'tox') && move.category === 'Physical') {
				return this.chainModify(2);
			}
		},
		desc: "While this Pokemon is poisoned, the power of its physical attacks is multiplied by 2.",
		shortDesc: "While this Pokemon is poisoned, its physical attacks have 2x power.",
	},
	turboblaze: {
		inherit: true,
		//Ignoring unbreakable Abilities implemented in scripts.ts as an edit to runEvent().
		desc: "This Pokemon's moves and their effects completely ignore Abilities that could potentially interfere with them. Abilities which are usually immune to ignoring are still affected.",
	},
	vitalspirit: {
		inherit: true,
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.spe && boost.spe < 0) {
				delete boost.spe;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Speed", "[from] ability: Vital Spirit", "[of] " + target);
				}
			}
		},
		shortDesc: "This Pokemon cannot fall asleep or have its Speed lowered.",
	},
	waterbubble: {
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				return this.chainModify(0.5);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Water Bubble');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Water Bubble');
			}
			return false;
		},
		name: "Water Bubble",
		rating: 2,
		num: 199,
		desc: "The power of Fire-type attacks against this Pokemon is halved, and it is immune to burns.",
		shortDesc: "The power of Fire-type attacks against this Pokemon is halved; burns are prevented.",
	},
	waterveil: {
		name: "Water Veil",
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Water Veil');
				pokemon.cureStatus();
			}
		},
		onAllySetStatus(status, target, source, effect) {
			if (status.id === 'brn') {
				this.debug('Water Veil prevents burns');
				const effectHolder = this.effectData.target;
				this.add('-block', target, 'ability: Water Veil', '[of] ' + effectHolder);
				return null;
			}
		},
		rating: 2,
		num: 175,
		shortDesc: "This Pokemon and its allies cannot be burned.",
		block: "  [POKEMON] can't be burned due to a watery veil!",
	},
	/* Abilities edited as changes to other elements */
	clearbody: {
		inherit: true,
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries) {
				this.add("-fail", target, "unboost", "[from] ability: Clear Body", "[of] " + target);
			}
		},
	},
	fullmetalbody: {
		inherit: true,
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries) {
				this.add("-fail", target, "unboost", "[from] ability: Full Metal Body", "[of] " + target);
			}
		},
	},
	imposter: {
		onSwitchIn(pokemon) {
			this.effectData.switchingIn = true;
		},
		onStart(pokemon) {
			// Imposter does not activate when Skill Swapped or when Neutralizing Gas leaves the field
			if (!this.effectData.switchingIn) return;
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (target) {
				if(target.hasAbility('owntempo')){
					this.add('-immune', target, '[from] ability: Own Tempo');
					this.hint('Own Tempo blocks effects that steal or copy its attributes');
					return;
				}
				pokemon.transformInto(target, this.dex.getAbility('imposter'));
			}
			this.effectData.switchingIn = false;
		},
		name: "Imposter",
		rating: 5,
		num: 150,
	},
	strongjaw: {
		inherit: true,
		desc: "This Pokemon's bite-based attacks have their power multiplied by 1.5. Super Fang will do damage equal to 75% of the target's current HP.",
		shortDesc: "This Pokemon's bite-based attacks have 1.5x power.",
	},
	trace: {
		inherit: true,
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectData.gaveUp) return;
			const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
			while (possibleTargets.length) {
				let rand = 0;
				if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
				const target = possibleTargets[rand];
				if(target.ability === 'owntempo'){ //Own Tempo isn't exempt from copying, it causes it to fail
					this.add('-activate', pokemon, 'ability: Trace');
					this.add('-immune', target, '[from] ability: Own Tempo');
					this.hint('Own Tempo blocks effects that steal or copy its attributes');
					this.effectData.gaveUp = true;
					return;
				}
				const ability = target.getAbility();
				const additionalBannedAbilities = [
					// Zen Mode included here for compatability with Gen 5-6
					'noability', 'alchemy', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas', 'receiver', 'trace', 'zenmode',
				];
				if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability)) {
					possibleTargets.splice(rand, 1);
					continue;
				}
				this.add('-ability', pokemon, ability, '[from] ability: Trace', '[of] ' + target);
				pokemon.setAbility(ability);
				return;
			}
		},
		onEnd(pokemon){
			if(this.effectData.gaveUp) delete this.effectData.gaveUp;
		},
	},
	whitesmoke: {
		inherit: true,
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries) {
				this.add("-fail", target, "unboost", "[from] ability: White Smoke", "[of] " + target);
			}
		},
	},
	/* Abilities edited as part of the dual-type update*/
	aerilate: {
		inherit: true,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if ((move.type === 'Normal' || (move.twoType && move.twoType === 'Normal')) && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Flying';
				delete move.twoType;
				move.aerilateBoosted = true;
			}
		},
	},
	blaze: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if ((move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if ((move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
	},
	darkaura: {
		inherit: true,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || (move.type !== 'Dark' && (!move.twoType || move.twoType !== 'Dark'))) return;
			if (!move.auraBooster) move.auraBooster = this.effectData.target;
			if (move.auraBooster !== this.effectData.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
	},
	disguise: {
		inherit: true,
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['mimikyu', 'mimikyutotem'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type) || !(move.twoType && target.runImmunity(move.twoType))) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (!['mimikyu', 'mimikyutotem'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type) || !(move.twoType && target.runImmunity(move.twoType))) return;
			return 0;
		},
	},
	dryskin: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Water' || (move.twoType && move.twoType === 'Water'))) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Dry Skin');
				}
				return null;
			}
		},
		onFoeBasePowerPriority: 17,
		onFoeBasePower(basePower, attacker, defender, move) {
			if (this.effectData.target !== defender) return;
			if ((move.type === 'Fire' || (move.twoType && move.twoType === 'Fire'))) {
				return this.chainModify(1.25);
			}
		},
	},
	fairyaura: {
		inherit: true,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || (move.type !== 'Fairy' && (!move.twoType || move.twoType !== 'Fairy'))) return;
			if (!move.auraBooster) move.auraBooster = this.effectData.target;
			if (move.auraBooster !== this.effectData.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
	},
	flashfire: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire'))) {
				move.accuracy = true;
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[from] ability: Flash Fire');
				}
				return null;
			}
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Flash Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if ((move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) && attacker.hasAbility('flashfire')) {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if ((move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) && attacker.hasAbility('flashfire')) {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Flash Fire', '[silent]');
			},
		},
	},
	fluffy: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if ((move.type === 'Fire' || (move.twoType && move.twoType === 'Fire'))) mod *= 2;
			if (move.flags['contact']) mod /= 2;
			return this.chainModify(mod);
		},
	},
	galvanize: {
		inherit: true,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if ((move.type === 'Normal' || (move.twoType && move.twoType === 'Normal')) && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Electric';
				delete move.twoType;
				move.galvanizeBoosted = true;
			}
		},
	},
	iceface: {
		inherit: true,
		onCriticalHit(target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' || target.species.id !== 'eiscue' || target.transformed) return;
			if (target.volatiles['substitute'] && !(move.flags['authentic'] || move.infiltrates)) return;
			if (!target.runImmunity(move.type) || !(move.twoType && target.runImmunity(move.twoType))) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' || target.species.id !== 'eiscue' || target.transformed) return;
			if (target.volatiles['substitute'] && !(move.flags['authentic'] || move.infiltrates)) return;
			if (!target.runImmunity(move.type) || !(move.twoType && target.runImmunity(move.twoType))) return;
			return 0;
		},
	},
	justified: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if ((move.type === 'Dark' || (move.twoType && move.twoType === 'Dark'))) {
				this.boost({atk: 1});
			}
		},
	},
	lightningrod: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Electric' || (move.twoType && move.twoType === 'Electric'))) {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Lightning Rod');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if ((move.type !== 'Electric' && (!move.twoType || move.twoType !== 'Electric')) || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectData.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectData.target !== target) {
					this.add('-activate', this.effectData.target, 'ability: Lightning Rod');
				}
				return this.effectData.target;
			}
		},
	},
	liquidvoice: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (move.flags['sound'] && !pokemon.volatiles['dynamax']) { // hardcode
				move.type = 'Water';
				delete move.twoType;
			}
		},
	},
	motordrive: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Electric' || (move.twoType && move.twoType === 'Electric'))) {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Motor Drive');
				}
				return null;
			}
		},
	},
	normalize: {
		inherit: true,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (!(move.isZ && move.category !== 'Status') && !noModifyType.includes(move.id)) {
				move.type = 'Normal';
				delete move.twoType;
				move.normalizeBoosted = true;
			}
		},
	},
	overgrow: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if ((move.type === 'Grass' || (move.twoType && move.twoType === 'Grass')) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if ((move.type === 'Grass' || (move.twoType && move.twoType === 'Grass')) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
	},
	pixilate: {
		inherit: true,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if ((move.type === 'Normal' || (move.twoType && move.twoType === 'Normal')) && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Fairy';
				delete move.twoType;
				move.pixilateBoosted = true;
			}
		},
	},
	rattled: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (['Dark', 'Bug', 'Ghost'].includes(move.type) || (move.twoType && ['Dark', 'Bug', 'Ghost'].includes(move.twoType))) {
				this.boost({spe: 1});
			}
		},
	},
	refrigerate: {
		inherit: true,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if ((move.type === 'Normal' || (move.twoType && move.twoType === 'Normal')) && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Ice';
				delete move.twoType;
				move.refrigerateBoosted = true;
			}
		},
	},
	sandforce: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('sandstorm')) {
				if (['Rock', 'Ground', 'Steel'].includes(move.type) || (move.twoType && ['Rock', 'Ground', 'Steel'].includes(move.twoType))) {
					this.debug('Sand Force boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
	},
	sapsipper: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Grass' || (move.twoType && move.twoType === 'Grass'))) {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Sap Sipper');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.type === 'Grass' || (move.twoType && move.twoType === 'Grass')) {
				this.boost({atk: 1}, this.effectData.target);
			}
		},
	},
	steamengine: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (['Water', 'Fire'].includes(move.type) || (move.twoType && ['Water', 'Fire'].includes(move.twoType))) {
				this.boost({spe: 6});
			}
		},
	},
	steelworker: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Steel' || (move.twoType && move.twoType === 'Steel')) {
				this.debug('Steelworker boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Steel' || (move.twoType && move.twoType === 'Steel')) {
				this.debug('Steelworker boost');
				return this.chainModify(1.5);
			}
		},
	},
	stormdrain: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Water' || (move.twoType && move.twoType === 'Water'))) {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Storm Drain');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if ((move.type !== 'Water' && (!move.twoType || move.twoType !== 'Water')) || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectData.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectData.target !== target) {
					this.add('-activate', this.effectData.target, 'ability: Storm Drain');
				}
				return this.effectData.target;
			}
		},
	},
	swarm: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if ((move.type === 'Bug' || (move.twoType && move.twoType === 'Bug')) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if ((move.type === 'Bug' || (move.twoType && move.twoType === 'Bug')) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
	},
	thickfat: {
		inherit: true,
		onSourceModifyAtk(atk, attacker, defender, move) {
			let moveTypes = 0;
			if (move.type === 'Ice' || (move.twoType && move.twoType === 'Ice')) {
				this.debug('Thick Fat weaken');
				moveTypes++;
			}
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				this.debug('Thick Fat weaken');
				moveTypes++;
			}
			if(moveTypes) return this.chainModify(Math.pow(0.5,moveTypes)); //.5 for 1 match, .25 for 2 matches; works for 0 matches but doesn't need to return
		},
		onSourceModifySpA(atk, attacker, defender, move) {
			let moveTypes = 0;
			if (move.type === 'Ice' || (move.twoType && move.twoType === 'Ice')) {
				this.debug('Thick Fat weaken');
				moveTypes++;
			}
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				this.debug('Thick Fat weaken');
				moveTypes++;
			}
			if(moveTypes) return this.chainModify(Math.pow(0.5,moveTypes)); //.5 for 1 match, .25 for 2 matches; works for 0 matches but doesn't need to return
		},
	},
	torrent: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if ((move.type === 'Water' || (move.twoType && move.twoType === 'Water')) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if ((move.type === 'Water' || (move.twoType && move.twoType === 'Water')) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
	},
	voltabsorb: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Electric' || (move.twoType && move.twoType === 'Electric'))) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Volt Absorb');
				}
				return null;
			}
		},
	},
	waterabsorb: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Water' || (move.twoType && move.twoType === 'Water'))) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Water Absorb');
				}
				return null;
			}
		},
	},
	watercompaction: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water' || (move.twoType && move.twoType === 'Water')) {
				this.boost({def: 2});
			}
		},
	},
	/* Abiltiies edited as part of another element's edit */
	dazzling: {
		onFoeTryMove(source, target, move) {
			if (move.target === 'foeSide' || (move.target === 'all' &&  move.id !== 'perishsong')) {
				return;
			}

			const dazzlingHolder = this.effectData.target;
			if ((target.side === dazzlingHolder.side || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Dazzling', move, '[of] ' + source);
				return false;
			}
		},
		name: "Dazzling",
		rating: 2.5,
		num: 219,
	},
	/* Ability renames */
	escapeplan: {
		onEmergencyExit(target) {
			if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.switchFlag = false;
				}
			}
			target.switchFlag = true;
			this.add('-activate', target, 'ability: Escape Plan');
		},
		name: "Escape Plan",
		rating: 1,
		num: 1017,
	},
	wimpout: {
		name: "Wimp Out",
		isNonstandard: "Past",
		rating: 1,
		num: 193,
	},
	emergencyexit: {
		name: "Emergency Exit",
		rating: 1,
		num: 194,
	},
	induction: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.side.active.length === 1) {
				return;
			}
			for (const allyActive of pokemon.side.active) {
				if (
					allyActive && allyActive.position !== pokemon.position &&
					!allyActive.fainted && allyActive.hasAbility('induction')
				) {
					return this.chainModify(1.5);
				}
			}
		},
		name: "Induction",
		rating: 0,
		num: 1018,
	},
	plus: {
		name: "Plus",
		isNonstandard: "Past",
		rating: 0,
		num: 57,
	},
	minus: {
		name: "Minus",
		isNonstandard: "Past",
		rating: 0,
		num: 58,
	},
	powerofalchemy: {
		name: "Power of Alchemy",
		isNonstandard: "Past",
	},
	powerspot: {
		name: "Power Spot",
		isNonstandard: "Past",
	},
	majesty: {
		onFoeTryMove(source, target, move) {
			if (move.target === 'foeSide' || (move.target === 'all' &&  move.id !== 'perishsong')) {
				return;
			}

			const dazzlingHolder = this.effectData.target;
			if ((target.side === dazzlingHolder.side || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Majesty', move, '[of] ' + source);
				return false;
			}
		},
		name: "Majesty",
		rating: 2.5,
		num: 214,
	},
	queenlymajesty: {
		name: "Queenly Majesty",
		isNonstandard: "Past",
	},
	slushrush: {
		name: "Slush Rush",
		isNonstandard: "Past",
	},
	tanglinghair: {
		name: "Tangling Hair",
		isNonstandard: "Past",
	},
	/* CAP */
	emergence: {
		isNonstandard: "CAP",
		name: "Emergence",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (this.effectData.target.activeTurns) return;

			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (this.effectData.target.activeTurns) return;

			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		condition: {
			duration: 1,
		},
		rating: 3,
		num: -3,
	},
	rebound: {
		name: "Rebound",
		isNonstandard: "Past",
	},
};
