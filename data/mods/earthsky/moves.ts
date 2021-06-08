/*

List of new/edited flags:
bludg: Short for bludgeoning. Power is multiplied by 1.5 when used by a Pokemon with the Bludgeon ability.
bullet: Definition includes pulse and cannon moves. Power is multiplied by 1.5 when used by a Pokemon with the Mega Launcher Ability.
powder: Has no effect on Pokemon with the Immunity Ability, and Pokemon holding Safety Goggles.
punch: Power is multiplied by 1.3 when used by a Pokemon with the Iron Fist Ability.
sound: Power is multiplied by 1.2 when used by a Pokemon with the Cacophony Ability.

*/

export const Moves: {[moveid: string]: ModdedMoveData} = {
	freezetest: {
		num: 1030,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Freeze Test",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary:{
			chance: 100,
			status: 'frz',
		},
		shortDesc: "Freezes the target. OP,used for testing freeze.",
		target: "normal",
		type: "Ice",
		contestType: "Cute",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icy Wind", target);
		},
	},
	/* New Moves */
	aerate: {
		num: 1000,
		basePower: 50,
		accuracy: 100,
		category: "Special",
		name: "Aerate",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target, source, move){
			const veilAbilities = [
				'aromaveil', 'flowerveil', 'pastelveil', 'slumberveil', 'sweetveil', 'waterveil', 'sandveil', 'snowcloak', 'mistyshroud'
			];
			if(veilAbilities.includes(target.getAbility())) target.addVolatile('gastroacid');
			if (target.side.removeSideCondition('mist')) {
				this.add('-sideend', target.side, this.dex.getEffect('mist').name, '[from] move: Aerate', '[of] ' + source);
			}
			if (target.side.removeSideCondition('auroraveil')) {
				this.add('-sideend', target.side, this.dex.getEffect('auroraveil').name, '[from] move: Aerate', '[of] ' + source);
			}
		},
		shortDesc: "Disables Veil Abilities, Aurora Veil, and Mist.",
		desc: "When this move hits an opponent, if their Ability is Aroma Veil, Flower Veil, Misty Shroud, Pastel Veil, Sand Veil, Slumber Veil, Snow Cloak, Sweet Veil, or Water Veil, it is suppressed until it switches out. The move will also remove Mist and Aurora Veil from their side of the field.",
		secondary: null,
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Cute",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gust", target);
		},
	},
	bugcloud: {
		num: 1001,
		basePower: 30,
		accuracy: 100,
		category: "Special",
		name: "Bug Cloud",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		shortDesc: "No additional effect.",
		target: "normal",
		type: "Bug",
		contestType: "Cute",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Struggle Bug", target);
		},
	},
	daydream: {
		num: 1002,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Daydream",
		pp: 30,
		priority: 0,
		flags: {mirror: 1, snatch: 1},
		boosts:{
			spa: 1,
		},
		secondary: null,
		desc: "Raises the user's Sp. Attack by 1 stage.",
		shortDesc: "Raises user's Sp. Atk by 1.",
		target: "self",
		type: "Fairy",
		contestType: "Cute",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Amnesia", target);
		},
	},
	dustspray: {
		num: 1003,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Dust Spray",
		pp: 25,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			boosts: {
				accuracy: -1,
			},
		},
		desc: "Has a 10% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "10% chance to lower accuracy.",
		target: "allAdjacentFoes",
		type: "Rock",
		contestType: "Clever",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sand Attack", target);
		},
	},
	eminence: {
		num: 1004,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Eminence",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		boosts: {
			atk: 1,
			spa: 1,
			spd: 1,
		},
		secondary: null,
		desc: "Raises the user's Attack, Sp. Attack, and Sp. Defense by 1 stage.",
		shortDesc: "Raises the user's Attack, Sp. Atk, Sp. Def by 1.",
		target: "self",
		type: "Dragon",
		contestType: "Clever",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Calm Mind", target);
		},
	},
	fairyfire: {
		num: 1005,
		basePower: 65,
		accuracy: 90,
		category: "Special",
		name: "Fairy Fire",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		desc: "Has a 30% chance to burn the target.",
		shortDesc: "30% chance to burn.",
		target: "normal",
		type: "Fairy",
		contestType: "Beautiful",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mystical Fire", target);
		},
	},
	fallenarrow: {
		num: 1006,
		basePower: 75,
		accuracy: 100,
		category: "Special",
		name: "Fallen Arrow",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'slp',
		},
		desc: "Has a 30% chance to cause the target to fall asleep.",
		shortDesc: "30% chance to sleep.",
		target: "normal",
		type: "Ghost",
		contestType: "Beautiful",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spirit Shackle", target);
		},
	},
	fellswoop: {
		num: 1007,
		basePower: 100,
		accuracy: 75,
		category: "Physical",
		name: "Fell Swoop",
		pp: 10,
		priority: 0,
		flags: {contact: 1, gravity: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		desc: "Has a 30% chance to make the target flinch.",
		shortDesc: "20% chance to flinch.",
		target: "normal",
		type: "Flying",
		contestType: "Cool",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fly", target);
		},
	},
	fullcollide: {
		num: 1008,
		basePower: 50,
		accuracy: 100,
		category: "Physical",
		name: "Full Collide",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1},
		beforeTurnCallback(pokemon) {
			const execInfo = [ //stores start-of-turn state of anything that could disrupt the move.
				pokemon.status, pokemon.volatiles, pokemon.getMoveData(('fullcollide' as ID)).pp
			];
		},
		onBeforeMovePriority: -100,
		onBeforeMove(pokemon, target, move) {
			if(
				//Sleep or freeze inflicted this turn
				(!(execInfo[0] === 'slp' || execInfo[0] === 'frz') && (pokemon.status === 'slp' || pokemon.status === 'frz')) ||
				//Stops full paralysis, confusion, and attraction
				(execInfo[0] === 'prz' || execInfo[1].includes('confusion') || execInfo[1].includes('attract')) ||
				//Disable/Torment/Encore inflicted this turn
				(!(execInfo[1].includes('flinch') || execInfo[1].includes('disable') || execInfo[1].includes('encore')) &&
					(pokemon.volatiles('flinch') || pokemon.volatiles('disable') || pokemon.volatiles.includes('encore')))
			) return true;
			//Removes obtained choice lock - it re-adds itself later
			if (!(execInfo[1].includes('choicelock')) && pokemon.volatiles['choicelock']) pokemon.removeVolatile('choicelock');
			//If move had PP but doesn't now (because it was drained), give it a temp PP to use this turn.
			if(execInfo[2] > 0 && move.pp === 0) move.pp = 1;
		},
		secondary: null,
		desc: "Once it is selected, its execution cannot be interrupted. The Pokemon will ignore sleep, freeze, flinch, Disable, Torment, Encore, and PP drain to 0 inflicted earlier in the same turn, and bypass the checks for full paralysis, confusion, and attraction. If given a Choice item earlier in the turn, the move locking will be ignored (but the power boost from a Choice Band will not be).",
		shortDesc: "If usable when selected, cannot be interrupted.",
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Skull Bash", target);
		},
	},
	lashout: {
		num: 1009,
		basePower: 80,
		accuracy: 85,
		category: "Physical",
		name: "Lash Out",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		shortDesc: "Hits all adjacent Pokemon.",
		target: "allAdjacent",
		type: "Fighting",
		contestType: "Tough",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Brutal Swing", target);
		},
	},
	midnight: {
		num: 1010,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Midnight",
		pp: 5,
		priority: 0,
		flags: {mirror: 1},
		pseudoWeather: 'midnight',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('cursedjewel')) {
					return 8;
				}
				return 5;
			},
			onStart(battle, source, effect) {
				this.add('-fieldstart', 'move: Midnight');
				//Suppression implemented in scripts.ts as edits to sim/field.ts
			},
			onEnd() {
				this.add('-fieldend', 'move: Midnight');
			},
		},
		secondary: null,
		shortDesc: "Summons darkness that prevents the effects of weather and terrain.",
		desc: "Summons supernatural darkness, a field effect that suppresses the effects of weather and terrain. They will not be removed, but their timers will continue to count down, and new weather/terrain cannot be set. The move Flash and the Ability Illuminate will dispel the darkness, and Illuminate will prevent it from being set.",
		target: "all",
		type: "Dark",
		contestType: "Cool",
		fieldstart: "  The battlefield became very dark!",
		fieldend: "  The darkness disappeared from the field.",
		block: "  Nothing happened through the darkness...",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "", target);
		},
	},
	moltenslag: {
		num: 1011,
		basePower: 100,
		accuracy: 100,
		category: "Special",
		name: "Molten Slag",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		shortDesc: "Dual-typed Steel and Fire move.",
		desc: "This move is both Steel and Fire typed. It uses combined type effectiveness, receives STAB from both types (potentially stacking), and is included in effects that boost/reduce/negate/react to damage from either type.",
		target: "normal",
		type: "Steel",
		twoType: "Fire",
		contestType: "Tough",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Magnet Bomb", target);
		},
	},
	napalm: {
		num: 1012,
		basePower: 100,
		accuracy: 75,
		category: "Physical",
		name: "Napalm",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 50,
			status: 'brn',
		},
		desc: "Has a 50% chance to burn the target.",
		shortDesc: "50% chance to burn.",
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flame Burst", target);
		},
	},
	pelletshot: {
		num: 1013,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Pellet Shot",
		pp: 20,
		priority: 1,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: null,
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
		target: "normal",
		type: "Fire",
		contestType: "Cool",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ember", target);
		},
	},
	playdead: {
		num: 1014,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Play Dead",
		pp: 20,
		priority: 4,
		flags: {},
		stallingMove: true,
		onTryHit(target, source, move) {
			return !!this.queue.willAct() && this.runEvent('StallMove', target);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Play Dead');
			},
			onEnd(target) {
				this.add('-end', target, 'move: Play Dead');
			}
			//Redirection implemented in scripts.ts as a modification to getTarget().
		},
		secondary: null,
		shortDesc: "Pretends to faint, causing moves to redirect.",
		desc: "During this turn, moves that targeted this Pokemon will fail to see it as a valid target; in Doubles or Triples Battles, they will redirect as if the Pokemon had fainted. Moves that hit the Pokemon's position (such as spread moves) are unaffected.",
		target: "self",
		type: "Ghost",
		contestType: "Clever",
		start: "  [POKEMON] fainted!",
		end: "  [POKEMON] was playing dead all along!",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Memento", target);
		},
	},
	pounce: {
		num: 1015,
		basePower: 50,
		accuracy: 90,
		category: "Physical",
		name: "Pounce",
		pp: 30,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		desc: "Has a 10% chance to make the target flinch.",
		shortDesc: "10% chance to flinch.",
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Play Rough", target);
		},
	},
	preheat: {
		num: 1016,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Preheat",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'preheat',
		onHit(pokemon) {
			this.add('-activate', pokemon, 'move: Preheat');
		},
		condition: {
			duration: 2,
			onRestart(pokemon) {
				this.effectData.duration = 2;
			},
			onBasePowerPriority: 9,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
					this.debug('preheat boost');
					return this.chainModify(2);
				}
			},
		},
		boosts: {
			spa: 1,
		},
		secondary: null,
		desc: "Raises the user's Special Attack by 1 stage. If the user uses a Fire-type attack on the next turn, its power will be doubled.",
		shortDesc: "+1 SpA, user's Fire move next turn 2x power.",
		target: "self",
		type: "Fire",
		contestType: "Cool",
		start: "  [POKEMON] began generating heat!",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Focus Energy", target);
		},
	},
	rebound: {
		num: 1017,
		basePower: 0,
		accuracy: true,
		category: "Physical",
		name: "Rebound",
		pp: 10,
		priority: 4,
		flags: {snatch: 1},
		stallingMove: true,
		onTryHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', source);
		},
		onHit(pokemon) {
			this.add("-start", pokemon, 'move: Rebound');
			pokemon.addVolatile('rebound');
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			noCopy: true,
			onRedirectTargetPriority: -1,
			onRedirectTarget(target, source, source2) {
				if (source !== this.effectData.target) return;
				return source.side.foe.active[this.effectData.position];
			},
			onDamagingHitPriority: 2,
			onDamagingHit(target, source, move) {
				this.effectData.position = source.position;
				this.add('-activate', target, 'move: Rebound');
				this.damage(move.damage, source, target);
				target.removeVolatile('rebound');
				return this.NOT_FAIL;
			},
		},
		secondary: null,
		shortDesc: "Reflects damage from an attack this turn.",
		desc: "The first attack to hit this Pokemon this turn has its damage reflected to the attacker. The full calculation is run, and then the damage is applied as fixed damage to the attacker. All other effects of the move are ignored.",
		target: "self",
		type: "Normal",
		contestType: "Clever",
		start: "  [POKEMON] puffed up!",
		activate: "  The attack bounced back!",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bide", target);
		},
	},
	rejuvenate: {
		num: 1018,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Rejuvenate",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		onHit(pokemon) {
			if (['', 'slp', 'frz'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		secondary: null,
		desc: "The user restores 1/2 of its maximum HP, rounded half up. Non-volatile status conditions are cured.",
		shortDesc: "Heals 50% and cures status.",
		target: "self",
		type: "Grass",
		contestType: "Cute",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Synthesis", target);
			this.add('-anim', source, "Refresh", target);
		},
	},
	risingchorus: {
		num: 1019,
		basePower: 75,
		accuracy: 100,
		category: "Special",
		name: "Rising Chorus",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			volatileStatus: 'risingchorus',
		},
		condition: {
			duration: 5,
			onStart(target) {
				if (!target.canFloat()) return false;
				this.add('-start', target, 'move: Rising Chorus');
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 15,
			onEnd(target) {
				this.add('-end', target, 'move: Rising Chorus');
			},
		},
		desc: "After dealing damage, the target is made immune to Ground-type attacks and the effects of Spikes, Toxic Spikes, Sticky Web, and the Arena Trap Ability as long as it remains active. If the target uses Baton Pass, the replacement will gain the effect. Gravity, Smack Down, and an Iron Ball will remove this status if the user is under any of their effects. The effect will not be applied if the user is under the effects of Gravity or Ingrain, or if the user's Ability is Heavy Metal or Suction Cups. While floating in this manner, the moves Dig, Dive, Ingrain, and Roost will fail.",
		shortDesc: "Hits adjacent foes, causes floating status.",
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Beautiful",
		start: "  [POKEMON] was lifted into the air!",
		end: "  [POKEMON] returned to the ground.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Uproar", target);
		},
	},
	slipaway: {
		num: 1020,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Slip Away",
		pp: 5,
		priority: 4,
		flags: {},
		stallingMove: true,
		onPrepareHit(pokemon) {
			if(!pokemon.volatiles['slipaway']){
				return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
			}
		},
		onHit(pokemon, move) {
			if(pokemon.volatiles['slipaway']){
				this.add('-end', pokemon, 'move: Slip Away');
			} else {
				pokemon.addVolatile('stall');
				move.priority = 0;
				move.selfSwitch = true;
				this.queue.insertChoice({choice: 'move', priority: 0, pokemon: pokemon, speed: pokemon.getStat('spe'), move: move}, true);
			}
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Slip Away');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
		},
		secondary: null,
		shortDesc: "Protects from attacks, then switches out.",
		desc: "Applies protection at the beginning of the turn. When it is time for the Pokemon's actual turn, it will switch out.",
		target: "self",
		type: "Poison",
		contestType: "Clever",
		start: "  [POKEMON] coated itself in slime!",
		end: "  [POKEMON] shed its slime and escaped!",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid Armor", target);
		},
	},
	smite: {
		num: 1021,
		basePower: 100,
		accuracy: 100,
		category: "Special",
		name: "Smite",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreAbility: true,
		desc: "This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Ignores the Abilities of other Pokemon.",
		target: "normal",
		type: "Electric",
		contestType: "cool",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thunder", target);
		},
	},
	snowtumble: {
		num: 1022,
		basePower: 120,
		accuracy: 70,
		category: "Physical",
		name: "Snow Tumble",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'frz',
		},
		desc: "Has a 30% chance to freeze the target.",
		shortDesc: "30% chance to freeze.",
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ice Ball", target);
		},
	},
	stasis: {
		num: 1023,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Stasis",
		pp: 5,
		priority: 0,
		flags: {reflectable: 1},
		volatileStatus: 'stasis',
		condition:{
			duration: 3,
			affectedStatuses: ['confuse','disable','electrify','encore','imprison','laserfocus','leechseed','magnetrise','mindreader','minimize','nightmare','lockon','partiallytrapped','perishsong','risingchorus','strongpartialtrap','taunt','telekinesis','throatchop','torment','yawn'], //Volatiles with timers to freeze
			noStart: ['aquaring','attract','charge','curse','destinybond','flashfire','focusenergy','followme','foresight','grudge','ingrain','magiccoat','miracleeye','odorsleuth','powder','powertrick','preheat','rage','ragepowder','snatch','spite','spotlight','substitute','tarshot'], //Volatiles that can't be added, but either have no duration or have to be removable to prevent breaking things
			onStart(target){
				this.add('-start', target, 'move: Stasis');
			},
			onBoost(boost, target, source, effect) {
				boost = {};
				this.add('fail', target, 'move: Stasis');
				return false;
			},
			onSetStatus(status, target, source, effect) {
				this.add('fail', target, 'move: Stasis');
				return false;
			},
			onRemoveStatus(status, target, source, effect) {
				this.add('fail', target, 'move: Stasis');
				return false;
			},
			onTryAddVolatile(volatile, pokemon) {
				if(pokemon.volatiles['stasis'] && (pokemon.volatiles['stasis'].affectedStatuses.includes(volatile) || pokemon.volatiles['stasis'].noStart.includes(volatile))){
					this.add('fail', target, 'move: Stasis');
					return false;
				}
			},
			onTryRemoveVolatile(volatile, pokemon) {
				if(pokemon.volatiles['stasis'] && pokemon.volatiles['stasis'].affectedStatuses.includes(volatile)){
					this.add('fail', target, 'move: Stasis');
					return false;
				}
			},
			//Locks on other timers implemented in scripts.ts as an edit to battle.residualEvent(), and in conditions.ts as edits to sleep and freeze.
			onEnd(target){
				this.add('-end', target, 'move: Stasis');
			}
		},
		secondary: null,
		shortDesc: "Locks in status and stat changes for 3 turns.",
		desc: `For the next three turns, the target's stats cannot be raised or lowered. If the target is frozen or asleep, the duration timers will pause, as will the duration timers of many of its volatile status conditions. Any statuses that can be affected also cannot be added, changed, or removed through any means other than switching. Affected volatile statuses are:
		Confusion, Disable, Electrify, Encore, Imprison, Laser Focus, Leech Seed, Magnet Rise, Mind Reader, Minimize, Nightmare, Lock-On, Partial Trapping, Perish Song, Rising Chorus, Taunt, Telekinesis, Throat Chop, Torment, Yawn
		Additionally, the following volatile statuses cannot be added to the target:
		Aqua Ring, Attraction, Charge, Curse, Destiny Bond, Flash Fire, Focus Energy, Follow Me, Foresight, Grudge, Ingrain, Magic Coat, Miracle Eye, Odor Sleuth, Powder, Power Trick, Preheat, Rage, Rage Powder, Snatch, Spite, Spotlight, Substitute, Tar Shot
		If possible, these statuses will still fade on their own.`,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
		start: "  [POKEMON]'s body has been locked in time!",
		fail: "  [POKEMON]'s condition remained in stasis!",
		end: "  [POKEMON]'s body returned to normal.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Telekinesis", target);
		},
	},
	swing: {
		num: 1024,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			const item = pokemon.getItem();
			if (item && !this.battle.runEvent('UseItem', pokemon, item)) {
				this.debug("Power increase for held item");
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		accuracy: 100,
		category: "Physical",
		name: "Swing",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		desc: "If the user is holding an item that cannot be consumed, this move's power is multiplied by 1.5.",
		shortDesc: "Power x1.5 if holding non-consumable item.",
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Slam", target);
		},
	},
	tidalwave: {
		num: 1025,
		basePower: 120,
		accuracy: 90,
		category: "Physical",
		name: "Tidal Wave",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		shortDesc: "Hits all adjacent Pokemon.",
		target: "allAdjacent",
		type: "Water",
		contestType: "Cool",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Surf", target);
		},
	},
	tussle: {
		num: 1026,
		basePower: 50,
		accuracy: 90,
		category: "Physical",
		name: "Tussle",
		pp: 30,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		desc: "Has a 10% chance to make the target flinch.",
		shortDesc: "10% chance to flinch.",
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tackle", target);
		},
	},
	underflame: {
		num: 1027,
		basePower: 0,
		accuracy: 50,
		category: "Special",
		name: "Under Flame",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		desc: "Deals damage to the target equal to the target's maximum HP. Ignores accuracy and evasiveness modifiers. This attack's accuracy is equal to (user's level - target's level + 30)%, and fails if the target is at a higher level. Fire-type Pokemon and Pokemon with the Sturdy Ability are immune.",
		shortDesc: "OHKOs non-Fire targets. Fails if user's lower level.",
		ohko: 'Fire',
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Will-O-Wisp", target);
		},
	},
	vitaldrain: {
		num: 1028,
		basePower: 80,
		accuracy: 100,
		category: "Physical",
		name: "Vital Drain",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "Heals for 50% damage dealt.",
		target: "normal",
		type: "Bug",
		contestType: "Clever",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Leech Life", target);
		},
	},
	whitewater: {
		num: 1029,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "White Water",
		pp: 25,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		shortDesc: "No additional effects.",
		target: "normal",
		type: "Water",
		contestType: "Cool",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Water Gun", target);
		},
	},
	/* Edited Moved */
	aeroblast: {
		inherit: true,
		accuracy: 100,
	},
	aircutter: {
		inherit: true,
		accuracy: 100,
	},
	airslash: {
		inherit: true,
		accuracy: 100,
	},
	aquatail: {
		inherit: true,
		basePower: 100,
		flags: {bludg: 1, contact: 1, protect: 1, mirror: 1},
	},
	aromaticmist: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (this.field.effectiveTerrain(pokemon) === 'mistyterrain') move.boosts = {spd: 2};
		},
		boosts: {
			spd: 1,
		},
		target: "allies",
		desc: "Raises allies' Special Defense by 1 stage. If the terrain is Misty Terrain, this move will raise allies' Special Defense by 2 stages.",
		shortDesc: "Raises allies' Sp. Def by 1; 2 in Misty Terrain.",
	},
	attackorder: {
		inherit: true,
		basePower: 100,
		critRatio: 1,
		target: "any",
		shortDesc: "No additional effect.",
	},
	aurasphere: {
		inherit: true,
		flags: {bullet: 1, protect: 1, mirror: 1, distance: 1},
	},
	aurorabeam: {
		inherit: true,
		secondary: {
			chance: 30,
			boosts: {
				atk: -1,
			},
		},
		desc: "Has a 30% chance to lower the target's Attack by 1 stage.",
		shortDesc: "30% chance to lower the target's Attack by 1.",
	},
	avalanche: {
		inherit: true,
		flags: {protect: 1, mirror: 1},
	},
	barrage: {
		inherit: true,
		basePower: 30,
		accuracy: 80,
		pp: 10,
	},
	bide: {
		inherit: true,
		condition: {
			duration: 2,
			onLockMove: 'bide',
			onStart(pokemon) {
				this.effectData.totalDamage = 0;
				this.add('-start', pokemon, 'move: Bide');
			},
			onDamagePriority: -101,
			onDamage(damage, target, source, move) {
				if (!move || move.effectType !== 'Move' || !source) return;
				this.effectData.totalDamage += damage;
				this.effectData.lastDamageSource = source;
			},
			onBeforeMove(pokemon, target, move) {
				if (this.effectData.duration === 1) {
					this.add('-end', pokemon, 'move: Bide');
					target = this.effectData.lastDamageSource;
					if (!target || !this.effectData.totalDamage) {
						this.attrLastMove('[still]');
						this.add('-fail', pokemon);
						return false;
					}
					if (!target.isActive) {
						const possibleTarget = this.getRandomTarget(pokemon, this.dex.getMove('pound'));
						if (!possibleTarget) {
							this.add('-miss', pokemon);
							return false;
						}
						target = possibleTarget;
					}
					const moveData: Partial<ActiveMove> = {
						id: 'bide' as ID,
						name: "Bide",
						accuracy: true,
						damage: this.effectData.totalDamage * 2,
						category: "Physical",
						priority: 1,
						flags: {contact: 1, protect: 1},
						effectType: 'Move',
						type: 'Normal',
					};
					this.tryMoveHit(target, pokemon, moveData as ActiveMove);
					return false;
				}
				this.add('-activate', pokemon, 'move: Bide');
			},
			onMoveAborted(pokemon) {
				pokemon.removeVolatile('bide');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Bide', '[silent]');
			},
		},
	},
	bind: {
		inherit: true,
		basePower: 35,
		volatileStatus: 'strongpartialtrap',
		shortDesc: "Traps and damages the foe a lot for 2-3 turns.",
		desc: "Prevents the target from switching for two or three turns (four turns if the user is holding Grip Claw). Causes damage to the target equal to 1/4 of its maximum HP (1/3 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
	},
	blastburn: {
		inherit: true,
		flags: {bullet: 1, recharge: 1, protect: 1, mirror: 1},
	},
	blizzard: {
		inherit: true,
		secondary: {
			chance: 30,
			status: 'frz',
		},
		desc: "Has a 30% chance to freeze the target. If the weather is Hail, this move does not check accuracy.",
		shortDesc: "30% chance to freeze foe(s). Can't miss in hail.",
	},
	block: {
		num: 335,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Block",
		pp: 5,
		priority: 0,
		flags: {reflectable: 1, mirror: 1},
		volatileStatus: 'block',
		condition: {
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			onTryMove(damage, target, source, move) {
				if(!source?.hasItem('shedshell')) delete move.selfSwitch;
			},
			onAfterMoveSecondaryPriority: 3,
			onAfterMoveSecondary(target, source, move) {
				if(target === this.effectData.target && !target?.hasItem('shedshell')){
					target.switchFlag = false;
				}
			},
			onEmergencyExit(target) {
				if(target === this.effectData.target && !target?.hasItem('shedshell')){
					target.switchFlag = false;
					return false;
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cute",
	},
	boltbeak: {
		inherit: true,
		basePower: 60,
	},
	bonerush: {
		inherit: true,
		accuracy: 100,
	},
	bonemerang: {
		inherit: true,
		basePower: 40,
		onEffectiveness(typeMod, target, type, move) {
			if (move.type !== 'Ground') return;
			if (!target) return; // avoid crashing when called from a chat plugin
			// ignore effectiveness if the target is Flying type and immune to Ground
			if (!target.runImmunity('Ground')) {
				return 0;
			}
		},
		shortDesc: "Hits two times in one turn. Can hit floating foe.",
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit. This move ignores immunity to Ground moves, treating the Flying-type as neutrally effective.",
	},
	bounce: {
		inherit: true,
		onTryMove(pokemon, move) {
			if(!pokemon.canFloat()) return false;
			if (pokemon.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			pokemon.addVolatile('twoturnmove', defender);
			return null;
		},
		condition: {
			duration: 2,
			onInvulnerability(target, source, move) {
				if (['twister', 'thunder', 'hurricane', 'smackdown', 'thousandarrows'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceBasePower(basePower, target, source, move) {
				if (['twister', 'thunder', 'hurricane', 'smackdown', 'thousandarrows'].includes(move.id)) {
					return this.chainModify(2);
				}
			},
		},
		desc: "Has a 30% chance to paralyze the target. This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Hurricane, Smack Down, Thousand Arrows, Thunder, and Twister, which have doubled power when used against it. If the user is holding a Power Herb, the move completes in one turn.",
	},
	bugbite: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, bite: 1},
		onHit(target, source) { //change here sets lastItem for Recycle/Pickup
			const item = target.getItem();
			if (source.hp && item.isBerry && target.takeItem(source)) {
				target.lastItem = item;
				this.add('-enditem', target, item.name, '[from] stealeat', '[move] Bug Bite', '[of] ' + source);
				if (this.singleEvent('Eat', item, null, source, null, null)) {
					this.runEvent('EatItem', source, null, null, item);
					if (item.id === 'leppaberry') target.staleness = 'external';
				}
				if (item.onEat) source.ateBerry = true;
			}
		},
		desc: "If this move is successful and the user has not fainted, it steals the target's held Berry if it is holding one and eats it immediately, gaining its effects even if the user's item is being ignored.",
	},
	bulletseed: {
		inherit: true,
		accuracy: 90,
		pp: 10,
	},
	chargebeam: {
		inherit: true,
		basePower: 40,
		secondary: {
			chance: 100,
			boosts: {
				spa: 1,
			},
		},
		desc: "Raises the user's Special Attack by 1 stage.",
		shortDesc: "Raises the user's Sp. Atk by 1.",
	},
	clamp: {
		inherit: true,
		basePower: 35,
		accuracy: 85,
		volatileStatus: 'strongpartialtrap',
		shortDesc: "Traps and damages the foe a lot for 2-3 turns.",
		desc: "Prevents the target from switching for two or three turns (four turns if the user is holding Grip Claw). Causes damage to the target equal to 1/4 of its maximum HP (1/3 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
	},
	cometpunch: {
		inherit: true,
		basePower: 20,
		accuracy: 100,
	},
	constrict: {
		inherit: true,
		basePower: 30,
	},
	crabhammer: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, bludg: 1},
	},
	crushclaw: {
		inherit: true,
		basePower: 80,
		accuracy: 100,
	},
	crushgrip: {
		inherit: true,
		basePowerCallback(pokemon, target) {
			return Math.floor(Math.floor((150 * (100 * Math.floor(target.hp * 4096 / target.maxhp)) + 2048 - 1) / 4096) / 100) + 50;
		},
		desc: "Power is equal to 150 * (target's current HP / target's maximum HP), rounded half down, plus 50.",
	},
	curse: {
		inherit: true,
		onTryHit(target, source, move) {
			if (!source.hasType('Ghost')) {
				delete move.volatileStatus;
				delete move.onHit;
				move.self = {boosts: {spe: -1, atk: 1, def: 1}};
			} else if (move.volatileStatus && target.volatiles['curse']) {
				return false;
			}
		},
		target: "normal",
	},
	cut: {
		inherit: true,
		basePower: 60,
		accuracy: 100,
		willCrit: true,
		desc: "This move is always a critical hit unless the target is under the effect of Lucky Chant or has the Battle Armor or Shell Armor Abilities.",
		shortDesc: "Always results in a critical hit.",
	},
	darkpulse: {
		inherit: true,
		flags: {protect: 1, bullet: 1, mirror: 1, distance: 1},
	},
	darkvoid: {
		inherit: true,
		accuracy: 80,
		onTryMove(pokemon, target, move) { //onAccuracy would be a more appropriate function, but this doubles as overwriting the Darkrai check.
			if(target.side.active.length > 1){ //MODDED: Accuracy drops against multiple targets
				move.accuracy = 50;
			}
		},
		desc: "Causes the target to fall asleep. In Doubles and Triples Battles, this move's accuracy lowers to 50%.",
		shortDesc: "Causes the foe(s) to fall asleep. Less accurate in non-Singles.",
	},
	defendorder: {
		inherit: true,
		target: "adjacentAllyOrSelf",
		shortDesc: "Raises target's Defense and Special Defense by 1 stage.",
		shortDesc: "Raises user's or ally's Def and Sp. Def by 1 stage.",
	},
	defog: {
		inherit: true,
		onHitField(target, source, move) {
			let success = false;
			for (const mon of target.side.active) {
				if (!mon.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			}
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			return success;
		},
		target: "all",
		desc: "Lowers all enemies' evasion by 1 stage, excepting enemies that are hiding behind substitutes. The effects of Reflect, Light Screen, Aurora Veil, Safeguard, Mist, Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for the target's side, and the effects of Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for the user's side.",
		shortDesc: "Enemy -1 evasion, clears screens, all hazards.",
	},
	detect: {
		inherit: true,
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon) && this.runEvent('EvadeStallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('evade');
			pokemon.addVolatile('stall');
			pokemon.addVolatile('evadestall');
		},
		desc: "The user is protected from most attacks made by other Pokemon during this turn. This move has a 1/X chance of being successful, where X starts at 1 and triples each time a protective move is successfully used. X resets to 1 if this move fails, if the user's last move used wasn't a protective move, or if the user's protection was broken. The user also gains Evasiveness during this time. While Evasive, moves that target the user will fail accuracy checks to hit it, unless they ignore the condition. This move has an additional 1/X chance of being successful, where X starts at 1 and triples each time Evasiveness is successfully gained. X resets to 1 if the user was not Evasive last turn.",
		shortDesc: "Protects from and evades attacks this turn.",
	},
	diamondstorm: {
		inherit: true,
		accuracy: 100,
	},
	dig: {
		inherit: true,
		basePower: 90,
		onTryMove(attacker, defender, move) {
			if(!attacker.isGrounded() && !(attacker.hasType('Flying') || attacker.hasAbility('levitate'))) return false;
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'hail') return false;
			},
			onInvulnerability(target, source, move) {
				if (['earthquake', 'magnitude','bulldoze','dig','fissure'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (['earthquake', 'magnitude','bulldoze','dig'].includes(move.id)) {
					return this.chainModify(2);
				}
			},
		},
		desc: "This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Bulldoze, Dig, Earthquake, Fissure, and Magnitude; these moves also have their damage doubled. The user is also unaffected by weather and loses floating status while undergrund. If the user is holding a Power Herb, the move completes in one turn.",
	},
	dive: {
		inherit: true,
		basePower: 90,
		onTryMove(attacker, defender, move) {
			if(!attacker.isGrounded() && !(attacker.hasType('Flying') || attacker.hasAbility('levitate'))) return false;
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			if (attacker.hasAbility('gulpmissile') && attacker.species.name === 'Cramorant' && !attacker.transformed) {
				const forme = attacker.hp <= attacker.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				attacker.formeChange(forme, move);
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'hail') return false;
			},
			onInvulnerability(target, source, move) {
				if (['surf', 'whirlpool', 'dive', 'muddywater', 'tidalwave'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (['surf', 'whirlpool', 'dive', 'muddywater', 'tidalwave'].includes(move.id)) {
					return this.chainModify(2);
				}
			},
		},
		desc: "This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Dive, Muddy Water, Surf, Tidal Wave, and Whirlpool; these moves also deal double damage. The user is also unaffected by weather and loses its floating status while underwater. If the user is holding a Power Herb, the move completes in one turn.",
	},
	doublehit: {
		inherit: true,
		basePower: 40,
		pp: 15,
	},
	doubleironbash: {
		inherit: true,
		basePower: 40,
		pp: 15,
		secondary: {},
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit.",
		shortDesc: "Hits two times in one turn.",
		contestType: "Tough",
	},
	doubleslap: {
		inherit: true,
		accuracy: 100,
		pp: 20,
	},
	doubleteam: {
		num: 104,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Double Team",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit(pokemon) {
			if (pokemon.volatiles['odorsleuth'] || pokemon.volatiles['evade'] || pokemon.volatiles['minimize'] || pokemon.volatiles['doubleteam'] || pokemon.volatiles['tangledfeet']){
				return false;
			}
			return this.runEvent('EvadeStallMove', pokemon);
		},
		onHit(pokemon){
			this.add('-start', pokemon, 'move: Double Team');
		},
		volatileStatus: 'doubleteam',
		condition: {
			duration: 0,
			onStart(pokemon){
				pokemon.addVolatile('evadestall');
			},
			onBeforeMove(pokemon){
				pokemon.volatiles['evadestall'].duration = 2; //Holds evasion counter while effect is active. 
			},
			onAccuracy(accuracy, target, source, move) {
				if(['allAdjacentFoes','allAdjacent','all'].includes(move.target)){
					target.removeVolatile('doubleteam');
					move.spreadHit = true;
					return;
				}
				if(!move.ignoreEvasion && typeof move.accuracy === 'number'){
					target.removeVolatile('doubleteam');
					return false;
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Cool",
		desc: "When used, the user becomes Evasive. While Evasive, moves that target the user will fail accuracy checks to hit it, unless they ignore the condition. This move has a 1/X chance of being successful, where X starts at 1 and triples each time Evasiveness is successfully gained. X resets to 1 if the user was not Evasive last turn. When a move misses the user due to this conditon, Double Team ends. Moves that target multiple positions will end Double Team before hitting the user; however, doing so will cause them to have their damage reduced by 25% as if they had truly hit multiple targets.",
		shortDesc: "Causes the next single-target move to miss.",
		start: "  [POKEMON] made a shadow double!",
		end: "  [POKEMON]'s shadow double vanished!",
	},
	dragonhammer: {
		inherit: true,
		basePower: 100,
		accuracy: 90,
		pp: 10,
		flags: {bludg: 1, contact: 1, protect: 1, mirror: 1},
		self: {
			boosts: {
				spe: -1,
			},
		},
		desc: "Lowers the user's Speed by 1 stage.",
		shortDesc: "Lowers the user's Speed by 1.",
	},
	dragonpulse: {
		inherit: true,
		flags: {protect: 1, bullet: 1, mirror: 1, distance: 1},
	},
	dragontail: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, bludg: 1},
	},
	drillpeck: {
		inherit: true,
		critRatio: 2,
		shortDesc: "High critical hit ratio.",
	},
	drillrun: {
		inherit: true,
		accuracy: 100,
		pp: 20,
	},
	drumbeating: {
		inherit: true,
		accuracy: 100,
		secondary:{
			chance: 50,
			boosts: {
				spe: -1,
			},
		},
		shortDesc: "Has a 50% chance to lower the target's Speed by 1 stage.",
		shortDesc: "50% chance to lower the target's Speed by 1.",
		contestType: "Tough",
	},
	dynamaxcannon: {
		inherit: true,
		flags: {bullet: 1, protect: 1},
		contestType: "Beautiful",
	},
	dynamicpunch: {
		inherit: true,
		basePower: 120,
	},
	echoedvoice: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.volatiles['echoedvoice'] || move.hit === 1) {
				pokemon.addVolatile('echoedvoice');
			}
			return this.clampIntRange(move.basePower * pokemon.volatiles['echoedvoice'].multiplier, 1, 160);
		},
		onTry() {},
		condition: {
			duration: 2,
			onStart() {
				this.effectData.multiplier = 1;
			},
			onRestart() {
				if (this.effectData.multiplier < 4) {
					this.effectData.multiplier <<= 1;
				}
				this.effectData.duration = 2;
			},
		},
		desc: "Power doubles with each successful hit, up to a maximum of 160 power. The power is reset if this move misses or another move is used.",
		shortDesc: "Power doubles with each hit, up to 160.",
	},
	electroweb: {
		inherit: true,
		accuracy: 90,
	},
	embargo: {
		num: 373,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Embargo",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onHit(target, source){
			const item = target.takeItem();
			if (item) {
				this.add('-enditem', target, item.name, '[from] move: Embargo', '[of] ' + source);
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dark",
		contestType: "Clever",
		desc: "Removes the target's item. This move cannot cause Pokemon with the Sticky Hold Ability to lose their held item or cause a Kyogre, a Groudon, a Giratina, an Arceus, a Genesect, a Silvally, a Zacian, or a Zamazenta to lose their Blue Orb, Red Orb, Griseous Orb, Plate, Drive, Memory, Rusted Sword, or Rusted Shield, respectively.",
		shortDesc: "Removes adjacent targets' items.",
	},
	explosion: {
		inherit: true,
		basePower: 300,
	},
	fairylock: {
		inherit: true,
		condition: {
			duration: 2,
			onStart(target) {
				this.add('-fieldactivate', 'move: Fairy Lock');
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			onHit(damage, target, source, move) {
				if(!source?.hasItem('shedshell')) delete move.selfSwitch;
			},
			onAfterMoveSecondaryPriority: 3,
			onAfterMoveSecondary(target, source, move) {
				if(!target?.hasItem('shedshell')){
					target.switchFlag = false;
				}
			},
			onEmergencyExit(target) {
				if(!target?.hasItem('shedshell')){
					target.switchFlag = false;
					return false;
				}
			},
		},
	},
	firefang: {
		inherit: true,
		accuracy: 100,
	},
	firelash: {
		inherit: true,
		secondary:{
			chance: 50,
			boosts: {
				def: -1,
			},
		},
		desc: "Has a 50% chance to lower the target's Defense by 1 stage.",
		shortDesc: "50% chance to lower the target's Defense by 1.",
		contestType: "Beautiful",
	},
	fishiousrend: {
		inherit: true,
		basePower: 60,
		contestType: "Tough",
	},
	flameburst: {
		inherit: true,
		onTryHit(target, source, move){ //MODDED: Flame Burst explodes if move is blocked.
			if(target.getVolatile('evade')) return false; //Detect adds 'protect' volatile, but should dodge instead, so this check makes sure of that.
			let blocked = false;
			for (const effectid of ['bunkerdown', 'kingsshield', 'obstruct', 'protect', 'slipaway', 'spikyshield']) {
				if (target.volatiles[effectid]) blocked = true;
			}
			if(blocked && target.side.active.length > 1){
				for (const ally of target.side.active) {
					if (ally && this.isAdjacent(target, ally)) {
						const damage = this.getDamage(pokemon, ally, 60, 'Fire', 'Special');
						const activeMove = {name: 'burst', effectType: 'Move', type: 'Fire'};
						this.damage(damage, ally, pokemon, activeMove as ActiveMove);
					}
				}
			}
		},
		onHit(target, source, move) {
			if (target.side.active.length === 1) {
				return;
			}
			for (const ally of target.side.active) {
				if (ally && this.isAdjacent(target, ally)) {
					const damage = this.getDamage(pokemon, ally, 60, 'Fire', 'Special');
						const activeMove = {name: 'burst', effectType: 'Move', type: 'Fire'};
						this.damage(damage, ally, pokemon, activeMove as ActiveMove);
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (target.side.active.length === 1) {
				return;
			}
			for (const ally of target.side.active) {
				if (ally && this.isAdjacent(target, ally)) {
					const damage = this.getDamage(pokemon, ally, 60, 'Fire', 'Special');
						const activeMove = {name: 'burst', effectType: 'Move', type: 'Fire'};
						this.damage(damage, ally, pokemon, activeMove as ActiveMove);
				}
			}
		},
		desc: "If this move successfully hits the target (even if it protected itself), the target's adjacent allies are hit by a Fire-type Special move with 60 base power.",
	},
	flash: {
		inherit: true,
		onHit(target, source){
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates){
				success = !!this.boost({accuracy: -1});
				if(target.volatiles['twoturnmove'] && !target.volatiles['skydrop']){
					if (target.removeVolatile('dig') || target.removeVolatile('dive') || 
					target.removeVolatile('fly') || target.removeVolatile('bounce') || 
					target.removeVolatile('phantomforce') || target.removeVolatile('shadowforce')) {
						//Note: The move will miss normally; this is for No Guard, Lock-On, and Mind Reader, since they ignore semi-invulnerability.
						this.queue.cancelMove(target);
					}
					target.removeVolatile('twoturnmove');
					success = true;
					this.add('cant', target, 'move: Flash [of] ' + source);
				}
				if(target.volatiles['focuspunch']){
					target.volatiles['focuspunch'].lostFocus = true;
					success = true;
					this.add('cant', target, 'move: Flash [of] ' + source);
				}
			}
			if('midnight' in this.field.pseudoWeather){
				this.field.removePseudoWeather('midnight');
				success = true;
			}
			return success;
		},
		boosts: {},
		target: "allAdjacentFoes",
		desc: "Lowers the target's accuracy by 1 stage and disrupts the execution of Focus Punch and moves that spend a turn charging, unless it is hiding behind a substitute. Supernatural darkness is lifted from the battlefield.",
		shortDesc: "Lowers foe(s)' accuracy. Interrupts charging, removes Midnight.",
		cant: "  [POKEMON] lost concentration on its move!"
	},
	flashcannon: {
		inherit: true,
		pp: 15,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
		desc: "Has a 20% chance to lower the target's Special Defense by 1.",
		shortDesc: "20% chance to lower the target's Sp. Def by 1.",
	},
	flatter: {
		inherit: true,
		flags: {reflectable: 1, mirror: 1, mystery: 1},
	},
	fleurcannon: {
		inherit: true,
		flags: {bullet: 1, protect: 1},
	},
	floralhealing: {
		inherit: true,
		target: "adjacentAllyOrSelf",
		desc: "The target restores 1/2 of its maximum HP, rounded half up. If the terrain is Grassy Terrain, the target instead restores 2/3 of its maximum HP, rounded half down. IF any other terrain is set, the target instead restores 1/4 of its maximum HP, rounded half down.",
		shortDesc: "Heals user or ally by a terrain-dependent amount.",
		contestType: "Beautiful",
	},
	flowershield: {
		num: 579,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Flower Shield",
		pp: 20,
		priority: 0,
		flags: {distance: 1},
		boosts: {
			def: 1,
		},
		onModifyMove(move, pokemon) {
			if (this.field.effectiveTerrain(pokemon) === 'grassyterrain') move.boosts = {def: 2};
		},
		secondary: null,
		target: "allies",
		type: "Fairy",
		contestType: "Beautiful",
		desc: "Raises allies' Defense by 1 stage. If the terrain is Grassy Terrain, this move will raise allies' Defense by 2 stages.",
		shortDesc: "Raises allies' Defense by 1; 2 in Grassy Terrain.",
	},
	fly: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (!attacker.canFloat()) return false;
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		condition: {
			duration: 2,
			onInvulnerability(target, source, move) {
				if (['twister', 'thunder', 'hurricane', 'smackdown', 'thousandarrows'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (['twister', 'thunder', 'hurricane', 'smackdown', 'thousandarrows'].includes(move.id)) {
					return this.chainModify(2);
				}
			},
		},
		desc: "This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Hurricane, Smack Down, Thousand Arrows, Thunder, and Twister; these moves will have doubled power when used against it. If the user is holding a Power Herb, the move completes in one turn.",
	},
	flyingpress: {
		num: 560,
		accuracy: 90,
		basePower: 80,
		pp: 10,
		category: "Physical",
		priority: 0,
		secondary: null,
		onTryMove(pokemon) {
			if(!pokemon.canFloat()) return false;
		},
		name: "Flying Press",
		target: "any",
		type: "Fighting",
		twoType: "Flying",
		contestType: "Tough",
		shortDesc: "Both Fighting and Flying types.",
		desc: "This move is both Fighting and Flying typed. It uses combined type effectiveness, receives STAB from both types (potentially stacking), and is included in effects that boost/reduce/negate/react to damage from either type.",
	},
	followme: {
		inherit: true,
		flags: {snatch: 1},
	},
	foresight: {
		num: 193,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Foresight",
		pp: 40,
		priority: 0,
		flags: {mirror: 1, snatch: 1},
		volatileStatus: 'foresight',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Foresight');
			},
			onModifyMovePriority: -5,
			onModifyMove(move) {
				move.ignoreEvasion = true;
				if (!move.ignoreImmunity) move.ignoreImmunity = {};
				if (move.ignoreImmunity !== true) {
					move.ignoreImmunity['Fighting'] = true;
					move.ignoreImmunity['Normal'] = true;
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Clever",
		desc: "As long as the user remains active, its moves can't be made to miss due to Evasiveness, and its Normal- and Fighting-type attacks can hit Ghost type Pokemon.",
		shortDesc: "User ignores Ghost immunities and Evasiveness.",
		start: "  [POKEMON] identified its surroundings!",
	},
	forestscurse: {
		inherit: true,
		onHit(target) {
			if ((target.types.length > 1 && target.types[1] === "Grass") || target.types === ["Grass"]) return false;
			if (target.types[0] === "Grass"){ //Due to above line, this is true only if the target is dual-typed
				target.types === ["Grass"];
			} else {
				target.types[1] = 'Grass';
			}
			this.add('-start', target, 'typechange', 'Grass', '[from] move: Forest\'s Curse');
		},
		shortDesc: "Changes the target's secondary type to Grass.",
		desc: "The target's second typing is replaced with the Grass type. If the target's first typing is Grass and it has a second typing, it will become pure Grass. If the target is already a pure Grass-type, the move fails.",
	},
	furyattack: {
		inherit: true,
		basePower: 25,
	},
	furycutter: {
		inherit: true,
		accuracy: 100,
	},
	furyswipes: {
		inherit: true,
		basePower: 20,
		accuracy: 90,
		pp: 20,
	},
	gastroacid: {
		inherit: true,
		
	},
	gearup: {
		inherit: true,
		onHitSide(side, source, move) {
			const targets = [];
			for (const pokemon of side.active) {
				if (pokemon.hasType('Steel')) {
					targets.push(pokemon);
				}
			}
			if (!targets.length) return false;
			let didSomething = false;
			for (const target of targets) {
				didSomething = this.boost({atk: 1, spa: 1}, target, source, move, false, true) || didSomething;
			}
			return didSomething;
		},
		shortDesc: "Raises ally Steel-types' Attack, Sp. Atk by 1.",
	},
	geomancy: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			move.flags['snatch'] = 1;
			return null;
		},
	},
	glaciate: {
		inherit: true,
		basePower: 110,
	},
	grasspledge: {
		inherit: true,
		condition: {
			duration: 4,
			onStart(targetSide) {
				this.add('-sidestart', targetSide, 'Grass Pledge');
			},
			onEnd(targetSide) {
				this.add('-sideend', targetSide, 'Grass Pledge');
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
		},
	},
	grasswhistle: {
		inherit: true,
		accuracy: 70,
	},
	grassyterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				const weakenedMoves = ['earthquake', 'bulldoze', 'magnitude'];
				if (weakenedMoves.includes(move.id)) {
					this.debug('move weakened by grassy terrain');
					return this.chainModify(0.5);
				}
				if ((move.type === 'Grass' || (move.twoType && move.twoType === 'Grass')) && attacker.isGrounded()) {
					this.debug('grassy terrain boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Grassy Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Grassy Terrain');
				}
			},
			onAnyAfterHit(source, target, move){
				if(['firespin', 'firepledge', 'inferno', 'searingshot', 'napalm', 'burnup', 'overheat', 'blastburn'].includes(move.id)){
					this.field.removeTerrain();
					target.side.addSideCondition('firepledge');
				}
				if(['whirlpool', 'waterpledge', 'muddywater', 'surf', 'originpulse', 'tidalwave', 'hydrocannon', 'waterspout'].includes(move.id)){
					this.field.removeTerrain();
					target.side.addSideCondition('grasspledge');
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 3,
			onResidual() {
				if (this.field.isTerrain('grassyterrain')) this.eachEvent('Terrain');
			},
			onTerrain(pokemon) {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.debug('Pokemon is grounded, healing through Grassy Terrain.');
					this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
				}
			},
			onEnd() {
				if (!this.effectData.duration) this.eachEvent('Terrain');
				this.add('-fieldend', 'move: Grassy Terrain');
			},
		},
	},
	gyroball: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1},
	},
	hammerarm: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, bludg: 1},
	},
	healblock: {
		inherit: true,
		flags: {protect: 1, mirror: 1},
		sideCondition: 'healblock',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
			onStart(side) {
				this.add('-start', side, 'move: Heal Block');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.getMove(moveSlot.id).flags['heal']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['heal'] && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Heal Block', move);
					return false;
				}
			},
			onResidualOrder: 17,
			onEnd(side) {
				this.add('-end', side, 'move: Heal Block');
			},
			onTryHeal(damage, target, source, effect) {
				if ((effect?.id === 'zpower') || this.effectData.isZ) return damage;
				return false;
			},
		},
		target: "foeSide",
		shortDesc: "Blocks enemy team from healing effects.",
		start: "  [TEAM] was prevented from healing!",
		end: "  [TEAM]'s Heal Block wore off!",
	},
	healorder: {
		inherit: true,
		target: 'adjacentAllyOrSelf',
	},
	healpulse: {
		inherit: true,
		flags: {protect: 1, bullet: 1, reflectable: 1, distance: 1, heal: 1, mystery: 1},
		target: 'adjacentAllyOrSelf',
	},
	highhorsepower: {
		inherit: true,
		accuracy: 100,
	},
	highjumpkick: {
		inherit: true,
		accuracy: 70,
		onTryMove(pokemon) {
			if(!pokemon.canFloat()) return false;
		},
	},
	hydrocannon: {
		inherit: true,
		flags: {bullet: 1, recharge: 1, protect: 1, mirror: 1},
	},
	iceball: {
		num: 301,
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.volatiles['iceball'] || move.hit === 1) {
				pokemon.addVolatile('iceball');
			}
			return this.clampIntRange(move.basePower * pokemon.volatiles['iceball'].multiplier, 1, 160);
		},
		category: "Physical",
		name: "Ice Ball",
		pp: 20,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		condition: {
			duration: 2,
			onStart() {
				this.effectData.multiplier = 1;
			},
			onRestart() {
				if (this.effectData.multiplier < 4) {
					this.effectData.multiplier <<= 1;
				}
				this.effectData.duration = 2;
			},
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
		shortDesc: "Power doubles on each hit, up to 160.",
	},
	icefang: {
		inherit: true,
		accuracy: 100,
	},
	icehammer: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, bludg: 1},
	},
	iciclespear: {
		inherit: true,
		basePower: 20,
		pp: 15,
	},
	icywind: {
		inherit: true,
		accuracy: 90,
	},
	incinerate: {
		inherit: true,
		basePower: 65,
		onHit(pokemon, source) {
			const item = pokemon.getItem();
			if (item && this.battle.runEvent('UseItem', pokemon, item)) {
				this.add('-enditem', pokemon, item.name, '[from] move: Incinerate');
				pokemon.lastItem = item.id;
			}
		},
		shortDesc: "Destroys foe(s)' consumable items.",
	},
	inferno: {
		inherit: true,
		basePower: 120,
	},
	ingrain: {
		inherit: true,
		onTryMove(pokemon){
			if(!pokemon.isGrounded() && !(pokemon.hasType('Flying') || pokemon.hasAbility('levitate'))) return false;
		},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Ingrain');
			},
			onResidualOrder: 7,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 8);
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			// forced groundedness implemented in battle.engine.js:BattlePokemon#isGrounded & canFloat
			onDragOut(pokemon) {
				this.add('-activate', pokemon, 'move: Ingrain');
				return null;
			},
		},
		shortDesc: "Heals 1/8 max HP per turn. Traps/grounds user.",
	},
	irontail: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, bludg: 1},
	},
	jumpkick: {
		inherit: true,
		accuracy: 90,
		onTryMove(pokemon) {
			if(!pokemon.canFloat()) return false;
		},
	},
	knockoff: {
		inherit: true,
		onBasePower(basePower, source, target, move) {}, //Clears x1.5 boost
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					target.lastItem = item.id;
					this.add('-enditem', target, item.name, '[from] move: Knock Off', '[of] ' + source);
				}
			}
		},
		shortDesc: "Removes item.",
	},
	leechlife: {
		inherit: true,
		basePower: 20,
		pp: 15,
	},
	lockon: {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onTryHit(target, source) {
			if (source.volatiles['lockon']){
				if(source.volatiles['lockon'].source === target) return false;
				source.removeVolatile['lockon']; //delete volatile so it can be re-added with the other source
			}
		},
		onHit(target, source) {
			source.addVolatile('lockon', target);
			this.add('-activate', source, 'move: Lock-On', '[of] ' + target);
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			duration: 0,
			onInvulnerabilityPriority: 1,
			onInvulnerability(target, source, move) {
				if (move && source === this.effectData.target && target === this.effectData.source) return 0;
			},
			onModifyMove(move, source, target) {
				if (move && source === this.effectData.target && target === this.effectData.source){
					move.accuracy = true;
					move.ignoreEvasion = true;
					delete move.flags['protect'];
					return true;
				}
			},
			onAfterHit(target, source, move){
				source.removeVolatile('lockon');
			},
			onSwitchOut(pokemon){
				if(pokemon === this.effectData.source){
					this.effectData.target.removeVolatile['lockon'];
				}
			}
		},
		shortDesc: "User's next attack on target always hits, ignores protection and semi-invulnerability.",
	},
	lovelykiss: {
		inherit: true,
		accuracy: 100,
		flags: {protect: 1, reflectable: 1, mirror: 1, contact: 1},
	},
	lowsweep: {
		inherit: true,
		accuracy: 90,
	},
	lunge: {
		inherit: true,
		secondary: {
			chance: 50,
			boosts: {
				atk: -1,
			},
		},
		desc: "Has a 50% chance to lower the target's Attack by 1 stage.",
		shortDesc: "50% chance to lower the target's Attack by 1.",
	},
	lusterpurge: {
		inherit: true,
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		desc: "Has a 100% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "Lowers the target's Sp. Def by 1.",
	},
	magicpowder: {
		inherit: true,
		onHit(target) {
			if ((target.types.length > 1 && target.types[1] === "Psychic") || target.types === ["Psychic"]) return false;
			if (target.types[0] === "Psychic"){ //Due to above line, this is true only if the target is dual-typed
				target.types === ["Psychic"];
			} else {
				target.types[1] = 'Psychic';
			}
			this.add('-start', target, 'typechange', 'Psychic', '[from] move: Magic Powder');
		},
		desc: "The target's second typing is replaced with the Psychic type. If the target's first typing is Psychic and it has a second typing, it will become pure Psychic. If the target is already a pure Psychic-type, the move fails.",
		shortDesc: "Changes the target's secondary typing to Psychic.",
		contestType: "Cute",
	},
	//Magic Room changes implemented in other moves.
	magnetrise: {
		inherit: true,
		volatileStatus: 'magnetrise',
		condition: {
			duration: 5,
			onStart(target) {
				if (!target.canFloat()) return false;
				this.add('-start', target, 'Magnet Rise');
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 15,
			onEnd(target) {
				this.add('-end', target, 'Magnet Rise');
			},
		},
		desc: "For 5 turns, the user is immune to Ground-type attacks and the effects of Spikes, Toxic Spikes, Sticky Web, and the Arena Trap Ability as long as it remains active. If the user uses Baton Pass, the replacement will gain the effect. The moves Dig, Dive, Ingrain, and Roost fail while under this effect. Gravity, Smack Down, and an Iron Ball remove the effects of this move. Fails if the user is already under this effect or the effects of Gravity, Ingrain, an Iron Ball, or if the user\'s Ability is Heavy Metal or Suction Cups.",
	},
	magneticflux: {
		inherit: true,
		onHitSide(side, source, move) {
			const targets = [];
			for (const pokemon of side.active) {
				if (pokemon.hasAbility(['induction'])) {
					targets.push(pokemon);
				}
			}
			if (!targets.length) return false;
			let didSomething = false;
			for (const target of targets) {
				didSomething = this.boost({atk: 1, def: 1, spa: 1, spd: 1}, target, source, move, false, true) || didSomething;
			}
			return didSomething;
		},
		desc: "Any ally with the Ability Induction has its Attack, Defense, Special Attack, and Special Defense raised by 1 stage.",
		shortDesc: "Raises non-Speed stats of allies with Induction by 1.",
	},
	meditate: {
		inherit: true,
		boosts: {atk: 1, spd: 1},
		desc: "Raises the user's Attack and Special Defense by 1 stage.",
		shortDesc: "Raises the user's Attack and Sp. Def by 1.",
	},
	megakick: {
		inherit: true,
		accuracy: 85,
		pp: 10,
	},
	megapunch: {
		inherit: true,
		twoType: "Fighting",
		desc: "This move is both Normal and Fighting typed. It uses combined type effectiveness, receives STAB from both types (potentially stacking), and is included in effects that boost/reduce/negate/react to damage from either type.",
		shortDesc: "Both Normal and Fighting types.",
	},
	metalclaw: {
		inherit: true,
		accuracy: 100,
	},
	metalsound: {
		inherit: true,
		target: "allAdjacentFoes",
		shortDesc: "Lowers the target(s)' Sp. Def by 2.",
	},
	mindreader: {
		inherit: true,
		flags: {protect: 1, snatch: 1},
		onTryHit(pokemon) {
			if (pokemon.volatiles['mindreader']) return false;
		},
		onHit(pokemon){
			this.add('-start', pokemon, 'move: Mind Reader');
		},
		condition: {
			duration: 0,
			onModifyMove(move, source, target) {
				if(move && source != target && source === this.effectData.target){
					move.accuracy = true;
					move.ignoreEvasion = true;
					delete move.flags['protect'];
				}
			},
			onAfterHit(target, source, move){
				source.removeVolatile('mindreader');
			},
		},
		target: "self",
		desc: "The user's next move will succeed its accuracy check, even if the target is in the middle of a two-turn move. It will also hit through protection moves.",
		shortDesc: "User's next attack always hits, ignores protection.",
		start: "  [POKEMON] is sensing the movements of the battlefield...",
	},
	minimize: {
		inherit: true,
		pp: 5,
		onPrepareHit(pokemon) {
			if (pokemon.volatiles['odorsleuth'] || pokemon.volatiles['evade'] || pokemon.volatiles['minimize'] || pokemon.volatiles['doubleteam'] || pokemon.volatiles['tangledfeet']){
				return false;
			}
			return this.runEvent('EvadeStallMove', pokemon);
		},
		onHit(pokemon){
			pokemon.addVolatile('evadestall');
			pokemon.volatiles['evadestall'].duration = 3; //Needs to last a turn after Minimize ends
			this.add('-start', pokemon, 'Minimize');
		},
		condition: {
			duration: 2, //Should get removed in onBeforeMove, so this is a failsafe
			onBeforeMove(pokemon, move) {
				pokemon.removeVolatile('minimize');
			},
			onSourceModifyDamage(damage, source, target, move) {
				const boostedMoves = [
					'stomp', 'steamroller', 'bodyslam', 'dragonrush', 'bodypress',
				];
				if (boostedMoves.includes(move.id)) {
					return this.chainModify(2);
				}
			},
			onAccuracy(accuracy, target, source, move) {
				const boostedMoves = [
					'stomp', 'steamroller', 'bodyslam', 'dragonrush', 'bodypress',
				];
				if (boostedMoves.includes(move.id)) return true;
				if(!move.ignoreEvasion && typeof move.accuracy === 'number') return false;
			},
		},
		boosts: {},
		desc: "When used, the Pokemon becomes Evasive until it is time for its next attack. While Evasive, moves that target the user will fail accuracy checks made to hit it unless they ignore the condition. This move has a 1/X chance of being successful, where X starts at 1 and triples each time Evasiveness is successfully gained. X resets to 1 if the user was not Evasive last turn. The moves Body Slam, Body Press, Stomp, Steamroller, and Dragon Rush will not check accuracy and have their damage doubled if used against the user while it is Evasive in this manner.",
		shortDesc: "Becomes Evasive until user's next attack.",
		start: "  [POKEMON] shrank!",
	},
	miracleeye: {
		num: 193,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Miracle Eye",
		pp: 40,
		priority: 0,
		flags: {mirror: 1, snatch: 1},
		volatileStatus: 'miracleeye',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Miracle Eye');
			},
			onModifyMovePriority: -5,
			onModifyMove(move) {
				move.ignoreEvasion = true;
				if (!move.ignoreImmunity) move.ignoreImmunity = {};
				if (move.ignoreImmunity !== true) {
					move.ignoreImmunity['Psychic'] = true;
				}
				move.pranksterBoosted = false; //Should work to ignore Prankster immunity, since it's called after priority is boosted but before immunity is checked
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Clever",
		desc: "As long as the user remains active, its moves can't be made to miss due to Evasiveness, and its Psychic-type attacks and Prankster-boosted status moves can hit Dark type Pokemon.",
		shortDesc: "User ignores Dark immunities and Evasiveness.",
		start: "  [POKEMON] gained supernatural sight!",
	},
	mistball: {
		inherit: true,
		secondary: {
			chance: 100,
			boosts: {
				spa: -1,
			},
		},
		desc: "Has a 100% chance to lower the target's Special Attack by 1 stage.",
		shortDesc: "Lowers the target's Sp. Atk by 1.",
	},
	moonblast: {
		inherit: true,
		basePower: 90,
	},
	moonlight: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
				factor = 0.25;
				break;
			}
			if('midnight' in this.field.pseudoWeather) factor = 0.75;
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		desc: "The user restores 1/2 of its maximum HP if Delta Stream or no weather conditions are in effect, 3/4 of its maximum HP if Midnight is in effect, or 1/4 of its maximum HP if the weather is Desolate Land, Sunny Day, Hail, Primordial Sea, Rain Dance, or Sandstorm, all rounded half down.",
	},
	morningsun: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.75;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor: 0.5;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
				factor = 0.25;
				break;
			}
			if('midnight' in this.field.pseudoWeather) factor = 0.25;
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		desc: "The user restores 1/2 of its maximum HP if the weather Desolate Land or Sunny Day, 3/4 of its maximum HP if Delta Stream or no weather conditions are in effect, or 1/4 of its maximum HP if the weather is Hail, Primordial Sea, Rain Dance, or Sandstorm, or if Midnight is in effect, all rounded half down.",
	},
	mudshot: {
		inherit: true,
		accuracy: 100,
		pp: 20,
	},
	mudslap: {
		inherit: true,
		pp: 30,
	},
	mudsport: {
		inherit: true,
		condition: {
			duration: 5,
			onStart(side, source) {
				this.add('-fieldstart', 'move: Mud Sport', '[of] ' + source);
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'par') {
					this.debug('Mud Sport prevents paralysis');
					const effectHolder = this.effectData.target;
					this.add('-block', target, 'move: Mud Sport');
					return null;
				}
			},
			onBasePowerPriority: 1,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric') {
					this.debug('mud sport weaken');
					return this.chainModify([0x548, 0x1000]);
				}
			},
			onResidualOrder: 21,
			onEnd() {
				this.add('-fieldend', 'move: Mud Sport');
			},
		},
	},
	mysticalfire: {
		inherit: true,
		basePower: 70,
	},
	naturalgift: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return false;
			const item = pokemon.getItem();
			if (!item.naturalGift) return false;
			pokemon.setItem('');
			pokemon.lastItem = item.id; //Jank set-up that assumes lastItem can't be changed in-between trying the move and preparing to hit with it.
			pokemon.usedItemThisTurn = true;
			move.type = item.naturalGift.type;
		},
		onPrepareHit(target, pokemon, move) {
			const item = this.dex.getItem(pokemon.lastItem);
			move.basePower = item.naturalGift.basePower;
			this.runEvent('AfterUseItem', pokemon, null, null, item);
		},
		desc: "The type and power of this move depend on the user's held Berry, and the Berry is lost. Fails if the user is not holding a Berry, if the user has the Klutz Ability, or if Magic Room is in effect for the user.",
	},
	naturepower: {
		inherit: true,
		onTryHit(target, pokemon) {
			let move = 'triattack';
			if ('midnight' in this.field.pseudoWeather){
				move = 'nightdaze';
			} else if (this.field.isTerrain('electricterrain')) {
				move = 'thunderbolt';
			} else if (this.field.isTerrain('grassyterrain')) {
				move = 'energyball';
			} else if (this.field.isTerrain('mistyterrain')) {
				move = 'moonblast';
			} else if (this.field.isTerrain('psychicterrain')) {
				move = 'psychic';
			}
			this.useMove(move, pokemon, target);
			return null;
		},
		desc: "This move calls another move for use based on the battle terrain. Tri Attack on the regular Wi-Fi terrain, Thunderbolt during Electric Terrain, Moonblast during Misty Terrain, Energy Ball during Grassy Terrain, and Psychic during Psychic Terrain. Calls Night Daze if Midnight is in effect.",
	},
	nightmare: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon) {
				if (pokemon.status !== 'slp') {
					return false;
				}
				//Sets sleep duration to 3 turns without resetting turns spent.
				pokemon.statusData.time = 4 + pokemon.statusData.time - pokemon.statusData.startTime;
				pokemon.statusData.startTime = 4;
				this.add('-start', pokemon, 'Nightmare');
			},
			onResidualOrder: 9,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
		desc: "Causes the target to lose 1/4 of its maximum HP, rounded down, at the end of each turn as long as it is asleep. This move does not affect the target unless it is asleep. The effect ends when the target wakes up, even if it falls asleep again in the same turn. The target is forced to sleep for three turns.",
		shortDesc: "Sleeping target -25% max HP each turn, sleeps max turns.",
	},
	nightdaze: {
		inherit: true,
		accuracy: 100,
	},
	obstruct: {
		inherit: true,
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
					if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.flags['contact']) {
					this.boost({def: -1}, source, target, this.dex.getActiveMove("Obstruct"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.flags['contact']) {
					this.boost({def: -1}, source, target, this.dex.getActiveMove("Obstruct"));
				}
			},
		},
		desc: "The user is protected from most attacks made by other Pokemon during this turn, and Pokemon trying to make contact with the user have their Defense lowered by 1 stage. Non-damaging moves go through this protection. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Detect, Endure, King's Shield, Max Guard, Obstruct, Protect, Quick Guard, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "Protects from damaging attacks. Contact: -1 Def.",
		contestType: "Tough",
	},
	octazooka: {
		inherit: true,
		basePower: 70,
		accuracy: 100,
		secondary: {
			chance: 100,
			boosts: {
				accuracy: -1,
			},
		},
		desc: "Has a 100% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "Lowers the target's accuracy by 1.",
	},
	octolock: {
		inherit: true,
		flags: {protect: 1, mirror: 1, contact: 1},
		contestType: "Tough",
	},
	odorsleuth: {
		inherit: true,
		volatileStatus: 'odorsleuth',
		onTryHit(target) {},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				if(pokemon.removeVolatile('evade') || pokemon.removeVolatile('doubleteam') || pokemon.removeVolatile('minimize') || pokemon.removeVolatile('tangledfeet')){
					this.debug('Odor Sleuth removed evasiveness');
				}
				this.add('-start', pokemon, 'Odor Sleuth');
			},
			onNegateImmunity(pokemon, type) {
				if (pokemon.hasType('Ghost') && ['Normal', 'Fighting'].includes(type)) return false;
			},
		},
		desc: "As long as the target remains active, it cannot become Evasive, and Normal- and Fighting-type attacks can hit the target if it is a Ghost type. Existing Evasiveness is removed. Fails if the target is already affected.",
		shortDesc: "Ignore Ghost immunities. Evasiveness removed.",
	},
	originpulse: {
		inherit: true,
		flags: {protect: 1, bullet: 1, mirror: 1},
	},
	phantomforce: {
		inherit: true,
		condition: {
			duration: 2,
			onInvulnerability(target, source, move) {
				if (['phantomforce', 'shadowclaw', 'shadowforce', 'shadowpunch', 'shadowsneak'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (['phantomforce', 'shadowclaw', 'shadowforce', 'shadowpunch', 'shadowsneak'].includes(move.id)) {
					return this.chainModify(2);
				}
			},
		},
		desc: "If this move is successful, it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally. This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Shadow Punch, Shadow Sneak, Shadow Claw, Phantom Force, and Shadow Force; these moves also have their damage doubled. If the user is holding a Power Herb, the move completes in one turn.",
	},
	pinmissile: {
		inherit: true,
		power: 20,
		accuracy: 100,
		pp: 15,
	},
	poisontail: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, bludg: 1},
	},
	pollenpuff: {
		inherit: true,
		flags: {bullet: 1, powder: 1, protect: 1, mirror: 1},
	},
	poltergeist: {
		inherit: true,
		basePower: 0,
		onPrepareHit(target, source, move) {
			if (target.ignoringItem()) return false;
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, target, move, item)) return false;
			if (!item.fling) return false;
			move.basePower = 80 + item.fling.basePower;
		},
		desc: "The power of this move is based on the target's held item. Fails if the target has no held item, if the target is under the effect of Magic Room, or if the target has the Klutz Ability.",
		shortDesc: "Target's item attacks it. Power varies.",
		contestType: "Cool",
	},
	present: {
		num: 217,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Present",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryHit(target, source, move) {
			if (source.side === target.side) {
				move.basePower = 0;
				move.infiltrates = true;
			}
		},
		onHit(target, source) {
			if (source.side === target.side) {
				if (!this.heal(Math.floor(target.baseMaxhp * 0.25))) {
					this.add('-immune', target);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cute",
		desc: "If the target is an ally, this move restores 1/4 of its maximum HP, rounded down, instead of dealing damage.",
		shortDesc: "If the target is an ally, heals 25% of its max HP.",
	},
	rage: {
		inherit: true,
		condition: {
			duration: 2, //Should get removed in onBeforeMove, so this is a failsafe
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Rage');
			},
			onHit(target, source, move) {
				if (target !== source && move.category !== 'Status') {
					this.boost({atk: 1, spa: 1, spe: 1});
				}
			},
			onBeforeMovePriority: 100,
			onBeforeMove(pokemon) {
				this.debug('removing Rage before attack');
				pokemon.removeVolatile('rage');
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		desc: "Once this move is successfully used, the user's Attack, Special Attack, and Speed are raised by 1 stage every time it is hit by another Pokemon's attack before its next turn.",
		shortDesc: "If hit before next turn, user Atk, Sp. Atk, Speed +1.",
	},
	ragepowder: {
		inherit: true,
		flags: {snatch: 1, powder: 1},
	},
	rapidspin: {
		inherit: true,
		secondary: {},
		desc: "If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field.",
		shortDesc: "Free user from hazards/bind/Leech Seed.",
	},
	razorleaf: {
		inherit: true,
		basePower: 60,
		accuracy: 100,
	},
	razorshell: {
		inherit: true,
		basePower: 80,
		accuracy: 100,
	},
	razorwind: {
		inherit: true,
		willCrit: true,
		desc: "Always scores a critical hit. This attack charges on the first turn and executes on the second. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Charges, then hits foe(s) turn 2. Always crits.",
	},
	roaroftime: {
		inherit: true,
		basePower: 160,
	},
	rockclimb: {
		inherit: true,
		basePower: 70,
		accuracy: 100,
		onEffectiveness(typeMod, target, type) {
			if (type === 'Rock') return 1;
		},
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		desc: "Has a 10% chance to confuse the target. This move's type effectiveness against Rock is changed to be super effective no matter what this move's type is.",
		shortDesc: "10% chance to confuse. Super effective on Rock.",
	},
	rockslide: {
		inherit: true,
		basePower: 80,
	},
	rocksmash: {
		inherit: true,
		basePower: 50,
		pp: 20,
		secondary:{
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		desc: "Has a 100% chance to lower the target's Defense by 1 stage.",
		shortDesc: "Lowers the target's Defense by 1.",
	},
	rockthrow: {
		inherit: true,
		accuracy: 100,
	},
	rocktomb: {
		inherit: true,
		basePower: 70,
		accuracy: 90,
	},
	roost: {
		inherit: true,
		onTryMove(pokemon){
			if(!pokemon.isGrounded() && !(pokemon.hasType('Flying') || pokemon.hasAbility('levitate'))) return false;
		},
		//Grounding mechanic change implemented in script.ts as a change to sim/pokemon.ts.
		desc: "The user restores 1/2 of its maximum HP, rounded half up. Until the end of the turn, Flying-type users lose their Flying type. Does nothing if the user's HP is full. Fails if the user is floating but is not a Flying type and doesn't have the Ability Levitate.",
		shortDesc: "Heals 50% HP. Grounded until turns ends.",
	},
	rototiller: {
		inherit: true,
		onHitField(target, source) {
			let success = false;
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
				if (target.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', target.side, this.dex.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
		desc: "The effects of Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for both sides of the field. If there is a terrain active, it will be cleared.",
		shortDesc: "Clears hazards and terrain.",
	},
	sacredfire: {
		inherit: true,
		accuracy: 100,
	},
	safeguard: {
		inherit: true,
		condition: {duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.id === 'yawn') return;
				if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
				if (target !== source) {
					this.debug('interrupting setStatus');
					if (effect.id === 'synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Safeguard');
					}
					return null;
				}
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
				if (['confusion', 'curse', 'leechseed', 'nightmare', 'yawn'].includes(status.id) && target !== source) {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Safeguard');
					return null;
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'Safeguard');
			},
			onImmunity(type, pokemon) {
				if (['sandstorm', 'hail', 'firepledge'].includes(type)) return false;
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd(side) {
				this.add('-sideend', side, 'Safeguard');
			},
		},
		desc: "For 5 turns, the user and its party members cannot have non-volatile status conditions, confusion, Leech Seed, or a Curse or Nightmare inflicted on them by other Pokemon. Pokemon on the user's side cannot become affected by Yawn but can fall asleep from its effect. Residual damage from Spikes, Stealth Rock, sandstorm, hail, and a burning field is blocked for the user and its team. It is removed from the user's side if the user or an ally is successfully hit by Defog. Fails if the effect is already active on the user's side.",
		shortDesc: "For 5 turns, protects user's party from status and residual field damage.",
	},
	scald: {
		inherit: true,
		basePower: 70,
	},
	secretpower: {
		inherit: true,
		onModifyMove(move, pokemon) {
			move.secondaries = [];
			if ('midnight' in this.field.pseudoWeather){
				move.secondaries.push({
					chance: 30,
					status: 'slp',
				});
			} else if (this.field.isTerrain('electricterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'par',
				});
			} else if (this.field.isTerrain('grassyterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'slp',
				});
			} else if (this.field.isTerrain('mistyterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spa: -1,
					},
				});
			} else if (this.field.isTerrain('psychicterrain')) {
				move.secondaries.push({
					chance: 30,
					volatileStatus: 'confusion',
				});
			}
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		desc: "Has a 30% chance to cause a secondary effect on the target based on the battle terrain. Causes paralysis on the regular Wi-Fi terrain, causes paralysis during Electric Terrain, lowers Special Attack by 1 stage during Misty Terrain, causes sleep during Grassy Terrain, and confuses during Psychic Terrain. During Midnight, it causes sleep.",
	},
	shadowforce: {
		inherit: true,
		condition: {
			duration: 2,
			onInvulnerability(target, source, move) {
				if (['phantomforce', 'shadowclaw', 'shadowforce', 'shadowpunch', 'shadowsneak'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (['phantomforce', 'shadowclaw', 'shadowforce', 'shadowpunch', 'shadowsneak'].includes(move.id)) {
					return this.chainModify(2);
				}
			},
		},
		desc: "If this move is successful, it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally. This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Shadow Punch, Shadow Sneak, Shadow Claw, Phantom Force, and Shadow Force; these moves also have their damage doubled. If the user is holding a Power Herb, the move completes in one turn.",
	},
	sharpen: {
		inherit: true,
		pp: 20,
		boosts: {
			atk: 1,
			spe: 1
		},
		desc: "Raises the user's Attack and Speed by 1 stage.",
		shortDesc: "Raises the user's Attack and Speed by 1.",
	},
	shoreup: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
			case 'raindance':
			case 'primordialsea':
			case 'hail':
				factor = 0.25;
				break;
			case 'sandstorm':
				factor: .75;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		desc: "The user restores 1/2 of its maximum HP if Delta Stream or no weather conditions are in effect, 3/4 of its maximum HP if Sandstorm is in effect, or 1/4 of its maximum HP if the weather is Desolate Land, Sunny Day, Hail, Primordial Sea, or Rain Dance, or if Midnight is in effect, all rounded half down.",
		shortDesc: "Heals user by weather-dependent amount.",
		contestType: "Clever",
	},
	sing: {
		inherit: true,
		accuracy: 70,
	},
	skydrop: {
		inherit: true,
		//Not removing gravity flag because that appears to be where the glitch is patched
		onTryHit(target, source, move) {
			if (target.fainted || !target.canFloat()) return false;
			if (source.removeVolatile(move.id)) {
				if (target !== source.volatiles['twoturnmove'].source) return false;

				if (target.hasType('Flying')) {
					this.add('-immune', target);
					return null;
				}
			} else {
				if (target.volatiles['substitute'] || target.side === source.side) {
					return false;
				}
				if (target.getWeight() >= 2000) {
					this.add('-fail', target, 'move: Sky Drop', '[heavy]');
					return null;
				}

				this.add('-prepare', source, move.name, target);
				source.addVolatile('twoturnmove', target);
				return null;
			}
		},
		condition: {
			duration: 2,
			onAnyDragOut(pokemon) {
				if (pokemon === this.effectData.target || pokemon === this.effectData.source) return false;
			},
			onFoeTrapPokemonPriority: -15,
			onFoeTrapPokemon(defender) {
				if (defender !== this.effectData.source) return;
				defender.trapped = true;
			},
			onFoeBeforeMovePriority: 12,
			onFoeBeforeMove(attacker, defender, move) {
				if (attacker === this.effectData.source) {
					attacker.activeMoveActions--;
					this.debug('Sky drop nullifying.');
					return null;
				}
			},
			onRedirectTargetPriority: 99,
			onRedirectTarget(target, source, source2) {
				if (source !== this.effectData.target) return;
				if (this.effectData.source.fainted) return;
				return this.effectData.source;
			},
			onAnyInvulnerability(target, source, move) {
				if (target !== this.effectData.target && target !== this.effectData.source) {
					return;
				}
				if (source === this.effectData.target && target === this.effectData.source) {
					return;
				}
				if (['twister', 'thunder', 'hurricane', 'smackdown', 'thousandarrows'].includes(move.id)) {
					return;
				}
				return false;
			},
			onAnyBasePower(basePower, target, source, move) {
				if (target !== this.effectData.target && target !== this.effectData.source) {
					return;
				}
				if (source === this.effectData.target && target === this.effectData.source) {
					return;
				}
				if (['twister', 'thunder', 'hurricane', 'smackdown', 'thousandarrows'].includes(move.id)) {
					return this.chainModify(2);
				}
			},
			onFaint(target) {
				if (target.volatiles['skydrop'] && target.volatiles['twoturnmove'].source) {
					this.add('-end', target.volatiles['twoturnmove'].source, 'Sky Drop', '[interrupt]');
				}
			},
		},
		desc: "This attack takes the target into the air with the user on the first turn and executes on the second. Pokemon weighing 200 kg or more or who are unable to obtain floating status cannot be lifted. On the first turn, the user and the target avoid all attacks other than Hurricane, Smack Down, Thousand Arrows, Thunder, and Twister, which have their damage doubled. The user and the target cannot make a move between turns, but the target can select a move to use. This move cannot damage Flying-type Pokemon. Fails on the first turn if the target is an ally, if the target has a substitute, or if the target is using Bounce, Dig, Dive, Fly, Phantom Force, Shadow Force, or Sky Drop.",
	},
	skyuppercut: {
		inherit: true,
		onEffectiveness(typeMod, target, type) {
			if (type === 'Flying') return 1;
		},
		desc: "This move's type effectiveness against Flying is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Flying.",
	},
	slam: {
		inherit: true,
		basePower: 90,
		accuracy: 85,
		flags: {contact: 1, protect: 1, mirror: 1, bludg: 1},
	},
	smackdown: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon) {
				let applies = !(pokemon.isGrounded());
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					applies = true;
					this.queue.cancelMove(pokemon);
					pokemon.removeVolatile('twoturnmove');
				}
				if (pokemon.volatiles['magnetrise']) {
					applies = true;
					delete pokemon.volatiles['magnetrise'];
				}
				if (!applies) return false;
				this.add('-start', pokemon, 'Smack Down');
			},
			onRestart(pokemon) {
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					this.queue.cancelMove(pokemon);
					this.add('-start', pokemon, 'Smack Down');
				}
				if (pokemon.volatiles['magnetrise']) {
					delete pokemon.volatiles['magnetrise'];
					this.add('-start', pokemon, 'Smack Down');
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
		},
		desc: "This move can hit a target using Bounce, Fly, or Sky Drop, or is under the effect of Sky Drop. If this move hits a target under the effect of Bounce, Fly, or Magnet Rise, the effect ends. If the target is a Flying type that has not used Roost this turn or a Pokemon with the Levitate Ability, it loses its immunity to Ground-type attacks and the Arena Trap Ability as long as it remains active. Using Magnet Rise or being targeted by Telekinesis will regain these immunities, but only while those effects are active.",
		shortDesc: "Grounds the target.",
	},
	smartstrike: {
		inherit: true,
		basePower: 80,
		priority: -1,
		shortDesc: "This move does not check accuracy. Goes last.",
		contestType: "Clever",
	},
	smog: {
		inherit: true,
		secondary: {
			chance: 40,
			status: 'tox',
		},
		desc: "Has a 40% chance to badly poison the target.",
		shortDesc: "40% chance to badly poison.",
	},
	snaptrap: {
		inherit: true,
		volatileStatus: 'strongpartialtrap',
		desc: "Prevents the target from switching for two or three turns (four turns if the user is holding Grip Claw). Causes damage to the target equal to 1/4 of its maximum HP (1/3 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the foe a lot for 2-3 turns.",
		contestType: "Clever",
	},
	snarl: {
		inherit: true,
		accuracy: 100,
	},
	snore: {
		inherit: true,
		basePower: 80,
	},
	soak: {
		inherit: true,
		onHit(target) {
			if ((target.types.length > 1 && target.types[1] === "Water") || target.types === ["Water"]) return false;
			if (target.types[0] === "Water"){ //Due to above line, this is true only if the target is dual-typed
				target.types = ["Water"];
			} else {
				target.types[1] = 'Water';
			}
			this.add('-start', target, 'typechange', 'Water', '[from] move: Soak');
		},
		shortDesc: "Changes the target's secondary typing to Water.",
		desc: "The target's second typing is replaced with the Water type. If the target's first typing is Water and it has a second typing, it will become pure Water. If the target is already a pure Water-type, the move fails.",
	},
	spacialrend: {
		inherit: true,
		accuracy: 100,
	},
	spiderweb: {
		num: 169,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Spider Web",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		secondary: null,
		volatileStatus: 'spiderweb',
		condition: {
			duration: 4,
			onStart(target) {
				this.add('-activate', target, 'trapped');
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
		},
		target: 'allAdjacentFoes',
		type: "Bug",
		contestType: "Clever",
		desc: "Prevents the target from switching out for three turns. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, Teleport, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped.",
		shortDesc: "Traps foe(s) for three turns.",
	},
	spikes: {
		inherit: true,
		flags: {reflectable: 1, nonsky: 1, snatch: 1},
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectData.layers = 1;
			},
			onRestart(side) {
				if (this.effectData.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.side.sideConditions['safeguard'] || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('limber')) return;
				const damageAmounts = [0, 15, 20, 24]; // 1/8, 1/6, 1/5
				this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 120);
			},
		},
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate or Limber Abilities. Can be used up to three times before failing. Opponents lose 1/8 of their maximum HP with one layer, 1/6 of their maximum HP with two layers, and 1/5 of their maximum HP with three layers, all rounded down. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin successfully, or if any Pokemon uses Defog or Rototiller successfully.",
	},
	spitup: {
		inherit: true,
		onTry(pokemon, move) {
			if (!pokemon.volatiles['stockpile']) {
				return false;
			}
			if (pokemon.volatiles['stockpile'].layers === 3){
				move.target = 'allAdjacentFoes';
			}
		},
		desc: "Power is equal to 100 times the user's Stockpile count. If the user's Stockpile count is 3, the move will target all adjacent foes. Fails if the Stockpile count is 0. Whether or not this move is successful, the user's Defense and Special Defense decrease by as many stages as Stockpile had increased them, and the user's Stockpile count resets to 0.",
		shortDesc: "Damage based on Stockpile charges; spread w/ max.",
	},
	splash: {
		inherit: true,
		onTryMove(pokemon, move){
			if(!pokemon.canFloat()) return false;
		},
	},
	spore: {
		inherit: true,
		pp: 10,
	},
	stealthrock: {
		inherit: true,
		flags: {reflectable: 1, nonsky: 1, snatch: 1},
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasType('Rock') || pokemon.side.sideConditions['safeguard'] || 
					pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('limber')) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in, unless it is a Rock-type Pokemon or has the Limber Ability. Fails if the effect is already active on the opposing side. Foes lose 1/32, 1/16, 1/8, 1/4, or 1/2 of their maximum HP, rounded down, based on their weakness to the Rock type; 0.25x, 0.5x, neutral, 2x, or 4x, respectively. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin successfully, or if any Pokemon uses Defog or Rototiller.",
		shortDesc: "Hurts non-Rock foes on switch-in w/ Rock matchup.",
	},
	steameruption: {
		inherit: true,
		accuracy: 90,
	},
	steelbeam: {
		inherit: true,
		accuracy: 100,
		onAfterMove(pokemon, target, move) {
			if (pokemon.moveThisTurnResult != null && move.mindBlownRecoil && !move.multihit) {
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.getEffect('Steel Beam'), true);
			}
		},
		contestType: "Cool", 
	},
	stickyweb: {
		inherit: true,
		flags: {reflectable: 1, snatch: 1},
		condition: {
			onStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('limber')) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, this.effectData.source, this.dex.getActiveMove('stickyweb'));
			},
		},
		desc: "Sets up a hazard on the opposing side of the field, lowering the Speed by 1 stage of each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate or Limber Abilities. Fails if the effect is already active on the opposing side. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin successfully, or if any Pokemon uses Defog or Rototiller.",
	},
	strangesmoke: {
		num: 790,
		accuracy: 90,
		basePower: 95,
		category: "Special",
		name: "Strange Smoke",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
	},
	stringshot: {
		inherit: true,
		accuracy: 100,
	},
	stuffcheeks: {
		inherit: true,
		onTry(source) {
			const item = source.getItem();
			if (!(item.isBerry && source.eatItem())) {
				return false;
			}
		},
		desc: "This move cannot be selected unless the user is holding a Berry. The user eats its Berry, activating its effects immediately. Fails if the user is not holding a Berry.",
		shortDesc: "User eats berry; most hold Berry to use.",
		contestType: "Cute",
	},
	submission: {
		inherit: true,
		basePower: 90,
		accuracy: 100,
	},
	superfang: {
		inherit: true,
		damageCallback(pokemon, target) {
			if(pokemon.hasAbility('strongjaw')){
				return this.clampIntRange(target.getUndynamaxedHP() * .75, 1);
			} else {
				return this.clampIntRange(target.getUndynamaxedHP() / 2, 1);
			}
		},
		desc: "Deals damage to the target equal to half of its current HP, rounded down. If the user has the Strong Jaw Ability, the damage is instead equal to 3/4 of its current HP, rounded down. The damage cannot be less than 1.",
	},
	swagger: {
		inherit: true,
		flags: {reflectable: 1, mirror: 1, mystery: 1},
	},
	swallow: {
		inherit: true,
		onHit(pokemon) {
			const healAmount = [0.5, 1, 1];
			const healedBy = this.heal(this.modify(pokemon.maxhp, healAmount[(pokemon.volatiles['stockpile'].layers - 1)]));
			if (pokemon.volatiles['stockpile'].layers === 3){
				pokemon.cureStatus();
			}
			pokemon.removeVolatile('stockpile');
			return !!healedBy;
		},
		desc: "The user restores its HP based on its Stockpile count. Restores 1/2 of its maximum HP if it's 1, rounded half down, and all of its HP if it's 2 or 3. If it has 3 Stockpile charges, it is also cured of non-volatile status conditions. Fails if the user's Stockpile count is 0. The user's Defense and Special Defense decrease by as many stages as Stockpile had increased them, and the user's Stockpile count resets to 0.",
		shortDesc: "Heals based on Stockpile charges, +status w/ max.",
	},
	sweetkiss: {
		inherit: true,
		accuracy: 100,
		flags: {protect: 1, reflectable: 1, mirror: 1, contact: 1},
	},
	synchronoise: {
		num: 485,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Synchronoise",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		onBasePowerPriority: 6,
		onBasePower(basePower, user, target, move){
			if(target.hasType(user.getTypes())){
				this.debug('Synchronoise power boost');
				return basePower * 2;
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Psychic",
		contestType: "Clever",
		desc: "Power doubles if the target shares at least one type with the user.",
		shortDesc: "Power doubles if foe shares type with user.",
	},
	synthesis: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.75;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
	},
	tailslap: {
		inherit: true,
		accuracy: 100,
		flags: {contact: 1, protect: 1, mirror: 1, bludg: 1},
	},
	takedown: {
		inherit: true,
		accuracy: 100,
	},
	teatime: {
		inherit: true,
		name: "Tea Time",
		onHitField(target, source, move) {
			let result = false;
			for (const active of this.getAllActive()) {
				if (this.runEvent('Invulnerability', active, source, move) === false) {
					this.add('-miss', source, active);
					result = true;
				} else {
					const item = active.getItem();
					if (active.hp && this.battle.runEvent('UseItem', active, item)) {
						
					}
				}
			}
			return result;
		},
		desc: "All active Pokemon consume their items, if possible. This effect is not prevented by substitutes. Fails if no active Pokemon is holding a consumable item.",
		shortDesc: "All active Pokemon use consumable items.",
		contestType: "Cute",
	},
	technoblast: {
		inherit: true,
		flags: {bullet: 1},
	},
	telekinesis: {
		inherit: true,
		condition: {
			duration: 3,
			onStart(target) {
				if (!target.canFloat()) return false;
				this.add('-start', target, 'Telekinesis');
			},
			onAccuracyPriority: -1,
			onAccuracy(accuracy, target, source, move) {
				if (move && !move.ohko) return true;
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 16,
			onEnd(target) {
				this.add('-end', target, 'Telekinesis');
			},
		},
		desc: "For 3 turns, the target cannot avoid any attacks made against it, other than OHKO moves, as long as it remains active. During the effect, the target is immune to Ground-type attacks and the effects of Spikes, Toxic Spikes, Sticky Web, and the Arena Trap Ability as long as it remains active. If the target uses Baton Pass, the replacement will gain the effect. The moves Dig, Dive, Ingrain, and Roost will fail if used by the target while the effect is active. This move will fail if the target is unable to gain the floating status.",
	},
	teleport: {
		inherit: true,
		priority: 0,
		flags: {snatch: 1},
	},
	thousandarrows: {
		inherit: true,
		volatileStatus: '',
		desc: "This move can hit airborne Pokemon, which includes Flying-type Pokemon, Pokemon with the Levitate Ability, Pokemon holding an Air Balloon, and Pokemon under the effect of Magnet Rise, Telekinesis, or Rising Chorus. This move can hit a target using Bounce, Fly, or Sky Drop.",
		shortDesc: "Hits adjacent foes. Can hit floating foes.",
	},
	thunderfang: {
		inherit: true,
		accuracy: 100,
	},
	toxic: {
		inherit: true,
		accuracy: 100,
		desc: "Badly poisons the target.",
		shortDesc: "Badly poisons the target.",
	},
	toxicspikes: {
		inherit: true,
		flags: {reflectable: 1, nonsky: 1, snatch: 1},
		condition: {
			// this is a side condition
			onStart(side, source) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				if(source.hasAbility('potency')){
					this.debug("Potency double-setting Toxic Spikes");
					this.effectData.layers = 2;
				} else {
					this.effectData.layers = 1;
				}
			},
			onRestart(side) {
				if (this.effectData.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('limber')) {
					return;
				} else if (this.effectData.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
		desc: "Sets up a hazard on the opposing side of the field, poisoning each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate or Limber Abilities. Can be used up to two times before failing. Opposing Pokemon become poisoned with one layer and badly poisoned with two layers. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin successfully, if any Pokemon uses Defog or Rapid Spin, or a grounded Poison-type Pokemon switches in. Safeguard prevents the opposing party from being poisoned on switch-in, but a substitute does not.",
	},
	triattack: {
		inherit: true,
		secondary: {
			chance: 30,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('brn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('frz', source);
				}
			},
		},
		desc: "Has a 30% chance to either burn, freeze, or paralyze the target, with an equal chance for each one.",
		shortDesc: "30% chance to paralyze or burn or freeze target.",
	},
	trickortreat: {
		inherit: true,
		onHit(target) {
			if ((target.types.length > 1 && target.types[1] === "Ghost") || target.types === ["Ghost"]) return false;
			if (target.types[0] === "Ghost"){ //Due to above line, this is true only if the target is dual-typed
				target.types === ["Ghost"];
			} else {
				target.types[1] = 'Ghost';
			}
			this.add('-start', target, 'typechange', 'Ghost', '[from] move: Trick-or-Treat');
		},
		shortDesc: "Changes the target's secondary typing to Ghost.",
		desc: "The target's second typing is replaced with the Ghost type. If the target's first typing is Ghost and it has a second typing, it will become pure Ghost. If the target is already a pure Ghost-type, the move fails.",
	},
	triplekick: {
		inherit: true,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 10 * move.hit + 10;
		},
		desc: "Hits three times. Power increases to 30 for the second hit and 40 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit three times.",
	},
	tropkick: {
		inherit: true,
		pp: 10,
	},
	trumpcard: {
		inherit: true,
		basePowerCallback(source, target, move) {
			const callerMoveId = move.sourceEffect || move.id;
			const moveSlot = callerMoveId === 'instruct' ? source.getMoveData(move.id) : source.getMoveData(callerMoveId);
			if (!moveSlot) return 40;
			else return 40 * (5 - Math.min(4, moveSlot.pp));
		},
		flags: {protect: 1, mirror: 1},
		desc: "This move's power is equal to 40 * (5 - Trump Card's remaining PP after it would execute). The multiplier can't be less than 1 if Trump Card's maximum PP is raised above 5.",
	},
	twister: {
		inherit: true,
		twoType: "Flying",
		secondary: {},
		shortDesc: "Both Dragon and Flying types.",
		desc: "This move is both Dragon and Flying typed. It uses combined type effectiveness, receives STAB from both types (potentially stacking), and is included in effects that boost/reduce/negate/react to damage from either type.",
	},
	vcreate: {
		inherit: true,
		accuracy: 100,
	},
	vitalthrow: {
		inherit: true,
		basePower: 80,
	},
	watersport: {
		inherit: true,
		condition: {
			duration: 5,
			onStart(side, source) {
				this.add('-fieldstart', 'move: Water Sport', '[of] ' + source);
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'brn') {
					this.debug('Water Sport prevents burns');
					const effectHolder = this.effectData.target;
					this.add('-block', target, 'move: Water Sport');
					return null;
				}
			},
			onBasePowerPriority: 1,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('water sport weaken');
					return this.chainModify([0x548, 0x1000]);
				}
			},
			onResidualOrder: 21,
			onEnd() {
				this.add('-fieldend', 'move: Water Sport');
			},
		},
	},
	weatherball: {
		inherit: true,
		onModifyType(move, pokemon) {
			if ('midnight' in this.battle.field.pseudoWeather){
				move.type = 'Dark';
			} //no 'else' because effectiveWeather will return blank with Midnight active
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Water';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'hail':
				move.type = 'Ice';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			if ('midnight' in this.battle.field.pseudoWeather){
				move.basePower *= 2;
			} //no 'else' because effectiveWeather will return blank with Midnight active
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.basePower *= 2;
				break;
			case 'raindance':
			case 'primordialsea':
				move.basePower *= 2;
				break;
			case 'sandstorm':
				move.basePower *= 2;
				break;
			case 'hail':
				move.basePower *= 2;
				break;
			}
		},
		desc: "Power doubles if a weather condition is active, and this move's type changes to match. Ice type during Hail, Water type during Primordial Sea or Rain Dance, Rock type during Sandstorm, Fire type during Desolate Land or Sunny Day, and Flying type during Delta Stream. If Midnight is active, it doubles in power and becomes a Dark type move. If the user is holding Utility Umbrella and uses Weather Ball during Primordial Sea, Rain Dance, Desolate Land, or Sunny Day, the move is still Normal-type and does not have a base power boost.",
	},
	woodhammer: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, bludg: 1},
	},
	wrap: {
		inherit: true,
		basePower: 20,
	},
	xscissor: {
		inherit: true,
		critRatio: 2,
		shortDesc: "High critical hit ratio.",
	},
	zenheadbutt: {
		inherit: true,
		accuracy: 100,
	},
	/* Moves changed as edits to other elements */
	attract: {
		inherit: true,
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				if (!(pokemon.hasAbility("Irresistable") && !(pokemon.gender === 'M' && source.gender === 'F') && !(pokemon.gender === 'F' && source.gender === 'M'))) {
					this.debug('incompatible gender');
					return false;
				}
				if (!this.runEvent('Attract', pokemon, source)) {
					this.debug('Attract event failed');
					return false;
				}

				if (effect.id === 'cutecharm') {
					this.add('-start', pokemon, 'Attract', '[from] ability: Cute Charm', '[of] ' + source);
				} else if (effect.id === 'destinyknot') {
					this.add('-start', pokemon, 'Attract', '[from] item: Destiny Knot', '[of] ' + source);
				} else {
					this.add('-start', pokemon, 'Attract');
				}
			},
			onUpdate(pokemon) {
				if (this.effectData.source && !this.effectData.source.isActive && pokemon.volatiles['attract']) {
					this.debug('Removing Attract volatile on ' + pokemon);
					pokemon.removeVolatile('attract');
				}
			},
			onBeforeMovePriority: 2,
			onBeforeMove(pokemon, target, move) {
				this.add('-activate', pokemon, 'move: Attract', '[of] ' + this.effectData.source);
				if (this.randomChance(1, 2)) {
					this.add('cant', pokemon, 'Attract');
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Attract', '[silent]');
			},
		},
	},
	captivate: {
		inherit: true,
		onTryImmunity(pokemon, source) {
			return (pokemon.hasAbility("Irresistable")) || (pokemon.gender === 'M' && source.gender === 'F') || (pokemon.gender === 'F' && source.gender === 'M');
		},
	},
	charge: {
		inherit: true,
		condition: {
			duration: 2,
			onRestart(pokemon) {
				this.effectData.duration = 2;
			},
			onBasePowerPriority: 9,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric' || (move.twoType && move.twoType === 'Electric')) {
					this.debug('charge boost');
					return this.chainModify(2);
				}
			},
		},
	},
	electricterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'slp' && target.isGrounded() && !target.isSemiInvulnerable()) {
					if (effect.id === 'yawn' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Electric Terrain');
					}
					return false;
				}
			},
			onTryAddVolatile(status, target) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'yawn') {
					this.add('-activate', target, 'move: Electric Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if ((move.type === 'Electric' || (move.twoType && move.twoType === 'Electric')) && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('electric terrain boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Electric Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Electric Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd() {
				this.add('-fieldend', 'move: Electric Terrain');
			},
		},
	},
	entrainment: {
		inherit: true,
		onTryHit(target, source) {
			if (target === source || target.volatiles['dynamax']) return false;

			const additionalBannedSourceAbilities = [
				// Zen Mode included here for compatability with Gen 5-6
				'alchemy', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas', 'receiver', 'trace', 'zenmode',
			];
			if (
				target.ability === source.ability ||
				target.getAbility().isPermanent || target.ability === 'truant' ||
				source.getAbility().isPermanent || additionalBannedSourceAbilities.includes(source.ability)
			) {
				return false;
			}
		},
		desc: "Causes the target's Ability to become the same as the user's. Fails if the target's Ability is Alchemy, Disguise, Gulp Missile, Ice Face, Multitype, Power Construct, Rage Mode, RKS System, Schooling, Shields Down, Stance Change, Truant, or Zen Mode, or the same Ability as the user, or if the user's Ability is Alchemy, Disguise, Flower Gift, Forecast, Gulp Missile, Hunger Switch, Ice Face, Illusion, Imposter, Multitype, Neutralizing Gas, Power Construct, Rage Mode, Receiver, RKS System, Schooling, Shields Down, Stance Change, Trace, Wonder Guard, or Zen Mode.",
	},
	fellstinger: {
		num: 565,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Fell Stinger",
		pp: 25,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onSourceAfterFaint(target, source, effect) {
			if (effect && effect === 'fellstinger' && source === this.effectData.target) {
				this.boost({atk: 3}, source);
			}
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},
	mirrormove: {
		inherit: true,
		onTryHit(target, pokemon) {
			if(target.hasAbility('owntempo')){
				this.add('-immune', pokemon, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its moves');
				return false;
			}
			const move = target.lastMove;
			if (!move || !move.flags['mirror'] || move.isZ || move.isMax) {
				return false;
			}
			this.useMove(move.id, pokemon, target);
			return null;
		},
		desc: "The user uses the last move used by the target. The copied move is used against that target, if possible. Fails if the target has not made a move, if it has the Ability Own Tempo, or if the last move used cannot be copied by this move.",
	},
	mistyterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (effect && ((effect as Move).status || effect.id === 'yawn')) {
					this.add('-activate', target, 'move: Misty Terrain');
				}
				return false;
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'confusion') {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Misty Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if ((move.type === 'Dragon' || (move.twoType && move.twoType === 'Dragon')) && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('misty terrain weaken');
					return this.chainModify(0.5);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Misty Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Misty Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd(side) {
				this.add('-fieldend', 'Misty Terrain');
			},
		},
	},
	pluck: {
		inherit: true,
		onHit(target, source) {
			const item = target.getItem();
			if (source.hp && item.isBerry && target.takeItem(source)) {
				target.lastItem = item;
				this.add('-enditem', target, item.name, '[from] stealeat', '[move] Pluck', '[of] ' + source);
				if (this.singleEvent('Eat', item, null, source, null, null)) {
					this.runEvent('EatItem', source, null, null, item);
					if (item.id === 'leppaberry') target.staleness = 'external';
				}
				if (item.onEat) source.ateBerry = true;
			}
		},
		desc: "If this move is successful and the user has not fainted, it steals the target's held Berry if it is holding one and eats it immediately, gaining its effects even if the user's item is being ignored.",
	},
	psychicterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onTryHitPriority: 4,
			onTryHit(target, source, effect) {
				if (effect && (effect.priority <= 0.1 || effect.target === 'self')) {
					return;
				}
				if (target.isSemiInvulnerable() || target.side === source.side) return;
				if (!target.isGrounded()) {
					const baseMove = this.dex.getMove(effect.id);
					if (baseMove.priority > 0) {
						this.hint("Psychic Terrain doesn't affect Pokémon immune to Ground.");
					}
					return;
				}
				this.add('-activate', target, 'move: Psychic Terrain');
				return null;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if ((move.type === 'Psychic' || (move.twoType && move.twoType === 'Psychic')) && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('psychic terrain boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Psychic Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Psychic Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd() {
				this.add('-fieldend', 'move: Psychic Terrain');
			},
		},
	},
	psychup: {
		inherit: true,
		onTryHit(target, pokemon) {
			if(target.hasAbility('owntempo')){
				this.add('-immune', target, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its attributes');
				return false;
			}
		},
		desc: "The user copies all of the target's current stat stage changes. This move fails if the target has the Ability Own Tempo.",
	},
	reflecttype: {
		inherit: true,
		onTryHit(target, pokemon) {
			if(target.hasAbility('owntempo')){
				this.add('-immune', target, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its attributes');
				return false;
			}
		},
		onHit(target, source) {
			if (source.species && (source.species.num === 493 || source.species.num === 773)) return false;
			let newBaseTypes = target.getTypes(true).filter(type => type !== '???');
			this.add('-start', source, 'typechange', '[from] move: Reflect Type', '[of] ' + target);
			source.setType(newBaseTypes);
			source.knownType = target.side === source.side && target.knownType;
		},
		desc: "Causes the user's types to become the same as the current types of the target. If the target's current types include typeless and another type, typeless is ignored. Fails if the user is an Arceus or a Silvally, if the target's current type is typeless alone, or if the target has the Ability Own Tempo.",
	},
	roleplay: {
		inherit: true,
		onTryHit(target, source) {
			if (target.ability === source.ability) return false;
			if(target.hasAbility('owntempo')){
				this.add('-immune', target, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its attributes');
				return false;
			}

			const additionalBannedTargetAbilities = [
				// Zen Mode included here for compatability with Gen 5-6
				'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'wonderguard', 'zenmode',
			];

			if (target.getAbility().isPermanent || additionalBannedTargetAbilities.includes(target.ability) ||
				source.getAbility().isPermanent) {
				return false;
			}
		},
		desc: "The user's Ability changes to match the target's Ability. Fails if the user's Ability is Disguise, Gulp Missile, Ice Face, Multitype, Power Construct, Rage Mode, RKS System, Schooling, Shields Down, Stance Change, Zen Mode, or already matches the target, or if the target's Ability is Alchemy, Own Tempo, Disguise, Flower Gift, Forecast, Gulp Missile, Hunger Switch, Ice Face, Illusion, Imposter, Multitype, Neutralizing Gas, Power Construct, Rage Mode, Receiver, RKS System, Schooling, Shields Down, Stance Change, Trace, Wonder Guard, or Zen Mode.",
	},
	sketch: {
		inherit: true,
		onTryHit(target, pokemon) {
			if(target.hasAbility('owntempo')){
				this.add('-immune', target, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its moves');
				return false;
			}
		},
		desc: "This move is permanently replaced by the last move used by the target. The copied move has the maximum PP for that move. Fails if the target has not made a move, if the target has the Ability Own Tempo, if the user has Transformed, or if the move is Sketch, Struggle, or any move the user knows.",
	},
	snatch: {
		inherit: true,
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'Snatch');
			},
			onAnyTryMove(source, target, move) {
				const snatchUser = this.effectData.source;
				if (snatchUser.isSkyDropped()) return;
				if (!move || move.isZ || move.isMax || !move.flags['snatch'] || move.sourceEffect === 'snatch') {
					return;
				}
				if(source.hasAbility('owntempo')){
					this.add('-immune', source, '[from] ability: Own Tempo');
					this.hint('Own Tempo blocks effects that steal or copy its moves');
					return false;
				}
				snatchUser.removeVolatile('snatch');
				this.add('-activate', snatchUser, 'move: Snatch', '[of] ' + source);
				this.useMove(move.id, snatchUser);
				return null;
			},
		},
	},
	spectralthief: {
		inherit: true,
		//Spectral Thief getting blocked by Own Tempo implemented in scripts.ts because that's where stat-stealing is implemented
		desc: "The target's stat stages greater than 0 are stolen from it and applied to the user before dealing damage. The theft does not occur if the target has the Ability Own Tempo.",
		contestType: "Clever",
	},
	transform: {
		inherit: true,
		onTryHit(target, pokemon) {
			if(target.hasAbility('owntempo')){
				this.add('-immune', pokemon, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its attributes');
				return false;
			}
		},
	},
	
	/* Renamed moves */
	//For the record, the only reason editing anything other than the field name is necessary is because of Lash Out being used by a new move. If I'm doing one, might as well do them all for consistency.
	bunkerdown: {
		num: 661,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Bunker Down",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'bunkerdown',
		onTryHit(target, source, move) {
			return !!this.queue.willAct() && this.runEvent('StallMove', target);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.flags['contact']) {
					source.trySetStatus('psn', target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.flags['contact']) {
					source.trySetStatus('psn', target);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Poison",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	banefulbunker: {
		name: "Baneful Bunker",
	},
	warriorssoul: {
		num: 775,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Warrior's Soul",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, sound: 1, dance: 1},
		onTryHit(pokemon, target, move) {
			if (pokemon.hp <= (pokemon.maxhp * 33 / 100) || pokemon.maxhp === 1) {
				return false;
			}
			if (!this.boost(move.boosts as SparseBoostsTable)) return null;
			delete move.boosts;
		},
		onHit(pokemon) {
			this.directDamage(pokemon.maxhp * 33 / 100);
		},
		boosts: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Dragon",
		contestType: "Cool",
	},
	clangoroussoul: {
		name: "Clangorous Soul",
	},
	lunarray: {
		num: 714,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Lunar Ray",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreAbility: true,
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Beautiful",
	},
	moongeistbeam: {
		name: "Moongeist Beam",
	},
	compensation: {
		num: 808,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Compensation",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, source) {
			if (source.statsLoweredThisTurn) {
				this.debug('compensation buff');
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	psychicfang: {
		num: 706,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Psychic Fang",
		pp: 10,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			if (pokemon.runImmunity('Psychic')) {
				pokemon.side.removeSideCondition('reflect');
				pokemon.side.removeSideCondition('lightscreen');
				pokemon.side.removeSideCondition('auroraveil');
			}
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cute",
	},
	psychicfangs: {
		name: "Psychic Fangs",
	},
	tantrum: {
		num: 707,
		accuracy: 100,
		basePower: 75,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.moveLastTurnResult === false) return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
		name: "Tantrum",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	stompingtantrum: {
		name: "Stomping Tantrum",
	},
	strangesteam: {
		name: "Strange Steam",
	},
	solarimpact: {
		num: 713,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Solar Impact",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		ignoreAbility: true,
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
	sunsteelstrike: {
		name: "Sunsteel Strike",
	},
	
	/* Move-calling move exception updates */
	assist: {
		inherit: true,
		onHit(target) {
			const noAssist = [
				'assist', 'beakblast', 'behemothbash', 'behemothblade', 'belch', 'bestow', 'bounce', 'bunkerdown', 'circlethrow', 'copycat', 'counter', 'covet', 'destinybond', 'detect', 'dig', 'dive', 'dragontail', 'endure', 'eternabeam', 'feint', 'fly', 'focuspunch', 'followme', 'fullcollide', 'helpinghand', 'kingsshield', 'matblock', 'mefirst', 'metronome', 'mimic', 'mirrorcoat', 'mirrormove', 'naturepower', 'obstruct', 'phantomforce', 'playdead', 'protect', 'ragepowder', 'rebound', 'roar', 'shadowforce', 'shelltrap', 'sketch', 'skydrop', 'sleeptalk', 'slipaway', 'snatch', 'spikyshield', 'spotlight', 'struggle', 'switcheroo', 'thief', 'transform', 'trick', 'whirlwind',
			];
			
			const moves = [];
			for (const pokemon of target.side.pokemon) {
				if (pokemon === target) continue;
				for (const moveSlot of pokemon.moveSlots) {
					const moveid = moveSlot.id;
					if (noAssist.includes(moveid)) continue;
					const move = this.dex.getMove(moveid);
					if (move.isZ || move.isMax) {
						continue;
					}
					moves.push(moveid);
				}
			}
			let randomMove = '';
			if (moves.length) randomMove = this.sample(moves);
			if (!randomMove) {
				return false;
			}
			this.useMove(randomMove, target);
		},
		desc: "A random move among those known by the user's party members is selected for use. Does not select Assist, Beak Blast, Belch, Bestow, Bounce, Bunker Down, Circle Throw, Copycat, Counter, Covet, Destiny Bond, Detect, Dig, Dive, Dragon Tail, Endure, Feint, Fly, Focus Punch, Follow Me, Full Collide, Helping Hand, King's Shield, Mat Block, Me First, Metronome, Mimic, Mirror Coat, Mirror Move, Nature Power, Phantom Force, Play Dead, Protect, Rage Powder, Rebound, Roar, Shadow Force, Shell Trap, Sketch, Sky Drop, Sleep Talk, Slip Away, Snatch, Spiky Shield, Spotlight, Struggle, Switcheroo, Thief, Transform, Trick, or Whirlwind.",
	},
	copycat: { //TODO: Make this fail on Own Tempo
		inherit: true,
		onHit(pokemon) {
			const noCopycat = [
				'assist', 'beakblast', 'behemothbash', 'behemothblade', 'belch', 'bestow', 'bunkerdown', 'circlethrow', 'copycat', 'counter', 'covet', 'craftyshield', 'destinybond', 'detect', 'dragontail', 'endure', 'eternabeam', 'feint', 'focuspunch', 'followme', 'fullcollide', 'helpinghand', 'kingsshield', 'matblock', 'mefirst', 'metronome', 'mimic', 'mirrorcoat', 'mirrormove', 'naturepower', 'obstruct', 'playdead', 'protect', 'ragepowder', 'rebound', 'roar', 'shelltrap', 'sketch', 'sleeptalk', 'slipaway', 'snatch', 'spikyshield', 'spotlight', 'struggle', 'switcheroo', 'thief', 'transform', 'trick', 'whirlwind',
			];
			let move: Move | ActiveMove | null = this.lastMove;
			if (!move) return;

			if (move.isMax && move.baseMove) move = this.dex.getMove(move.baseMove);
			if (noCopycat.includes(move.id) || move.isZ || move.isMax) {
				return false;
			}
			this.useMove(move.id, pokemon);
		},
		desc: "The user uses the last move used by any Pokemon, including itself. Fails if no move has been used, if the last move was used by a Pokemon with Own Tempo, or if the last move used was Assist, Beak Blast, Belch, Bestow, Bunker Down, Circle Throw, Copycat, Counter, Covet, Crafty Shield, Destiny Bond, Detect, Dragon Tail, Dynamax Cannon, Endure, Feint, Focus Punch, Follow Me, Full Collide, Helping Hand, King's Shield, Mat Block, Me First, Metronome, Mimic, Mirror Coat, Mirror Move, Nature Power, Obstruct, Play Dead, Protect, Rage Powder, Rebound, Roar, Shell Trap, Sketch, Sleep Talk, Slip Away, Snatch, Spiky Shield, Spotlight, Struggle, Switcheroo, Thief, Transform, Trick, or Whirlwind.",
	},
	mefirst: {
		inherit: true,
		onTryHit(target, pokemon) {
			const action = this.queue.willMove(target);
			if (!action) return false;

			if(target.hasAbility('owntempo')){
				this.add('-immune', pokemon, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its moves');
				return false;
			}
			const noMeFirst = [
				'beakblast', 'chatter', 'counter', 'covet', 'focuspunch', 'mefirst', 'metalburst', 'mirrorcoat', 'rebound', 'shelltrap', 'struggle', 'thief',
			];
			const move = this.dex.getActiveMove(action.move.id);
			if (action.zmove || move.isZ || move.isMax) return false;
			if (move.category === 'Status' || noMeFirst.includes(move.id)) return false;

			pokemon.addVolatile('mefirst');
			this.useMove(move, pokemon, target);
			return null;
		},
		desc: "The user uses the move the target chose for use this turn against it, if possible, with its power multiplied by 1.5. The move must be a damaging move other than Beak Blast, Chatter, Counter, Covet, Focus Punch, Me First, Metal Burst, Mirror Coat, Rebound, Shell Trap, Struggle, or Thief. Fails if the target moves before the user, or if the target has the Ability Own Tempo. Ignores the target's substitute for the purpose of copying the move.",
	},
	metronome: {
		inherit: true,
		noMetronome: [
			"After You", "Assist", "Aura Wheel", "Beak Blast", "Behemoth Bash", "Behemoth Blade", "Belch", "Bestow", "Body Press", "Bunker Down", "Copycat", "Counter", "Covet", "Crafty Shield", "Destiny Bond", "Detect", "Endure", "Feint", "Focus Punch", "Follow Me", "Full Collide", "Helping Hand", "Hyperspace Fury", "Instruct", "King's Shield", "Light of Ruin", "Mat Block", "Me First", "Metronome", "Mimic", "Mirror Coat", "Mirror Move", "Nature Power", "Obstruct", "Play Dead", "Protect", "Quash", "Quick Guard", "Rage Powder", "Rebound", "Shell Trap", "Sketch", "Sleep Talk", "Slip Away", "Snap Trap", "Snatch", "Snore", "Spiky Shield", "Spotlight", "Struggle", "Switcheroo", "Thief", "Transform", "Trick", "Wide Guard"
		],
		desc: "A random move is selected for use, other than After You, Assist, Aura Wheel, Beak Blast, Behemoth Bash, Behemoth Blade, Belch, Bestow, Body Press, Bunker Down, Copycat, Counter, Covet, Crafty Shield, Destiny Bond, Detect, Endure, Feint, Focus Punch, Follow Me, Full Collide, Helping Hand, Hyperspace Fury, Instruct, King's Shield, Light of Ruin, Mat Block, Me First, Metronome, Mimic, Mirror Coat, Mirror Move, Nature Power, Obstruct, Play Dead, Protect, Quash, Quick Guard, Rage Powder, Rebound, Shell Trap, Sketch, Sleep Talk, Slip Away, Snap Trap, Snatch, Snore, Spiky Shield, Spotlight, Struggle, Switcheroo, Thief, Transform, Trick, or Wide Guard.",
	},
	mimic: {
		inherit: true,
		onHit(target, source) {
			const disallowedMoves = ['mimic', 'sketch', 'struggle', 'transform'];
			if(target.hasAbility('owntempo')){
				this.add('-immune', pokemon, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its moves');
				return false;
			}
			const move = target.lastMove;
			if (source.transformed || !move || disallowedMoves.includes(move.id) || source.moves.includes(move.id)) {
				return false;
			}
			if (move.isZ || move.isMax) return false;
			const mimicIndex = source.moves.indexOf('mimic');
			if (mimicIndex < 0) return false;

			source.moveSlots[mimicIndex] = {
				move: move.name,
				id: move.id,
				pp: move.pp,
				maxpp: move.pp,
				target: move.target,
				disabled: false,
				used: false,
				virtual: true,
			};
			this.add('-start', source, 'Mimic', move.name);
		},
		desc: "While the user remains active, this move is replaced by the last move used by the target. The copied move has the maximum PP for that move. Fails if the target has not made a move, if it has the Ability Own Tempo, if the user has Transformed, if the user already knows the move, or if the move is Mimic, Sketch, Struggle, or Transform.",
	},
	sleeptalk: {
		inherit: true,
		onHit(pokemon) {
			const noSleepTalk = [
				'assist', 'beakblast', 'belch', 'bide', 'chatter', 'copycat', 'focuspunch', 'fullcollide', 'mefirst', 'metronome', 'mimic', 'mirrormove', 'naturepower', 'shelltrap', 'sketch', 'sleeptalk', 'slipaway', 'uproar',
			];
			const moves = [];
			for (const moveSlot of pokemon.moveSlots) {
				const moveid = moveSlot.id;
				if (!moveid) continue;
				const move = this.dex.getMove(moveid);
				if (noSleepTalk.includes(moveid) || move.flags['charge'] || (move.isZ && move.basePower !== 1)) {
					continue;
				}
				moves.push(moveid);
			}
			let randomMove = '';
			if (moves.length) randomMove = this.sample(moves);
			if (!randomMove) {
				return false;
			}
			this.useMove(randomMove, pokemon);
		},
		desc: "One of the user's known moves, besides this move, is selected for use at random. Fails if the user is not asleep. The selected move does not have PP deducted from it, and can currently have 0 PP. This move cannot select Assist, Beak Blast, Belch, Bide, Copycat, Dynamax Cannon, Focus Punch, Full Collide, Me First, Metronome, Mimic, Mirror Move, Nature Power, Shell Trap, Sketch, Sleep Talk, Slip Away, Struggle, Uproar, or any two-turn move.",
	},
	/* Contest categories lol */
	accelerock: {
		inherit: true,
		contestType: "Tough",
	},
	aurawheel: {
		inherit: true,
		contestType: "Cool",
	},
	beakblast: {
		inherit: true,
		contestType: "Cool",
	},
	behemothbash: {
		inherit: true,
		contestType: "Tough",
	},
	behemothblade: {
		inherit: true,
		contestType: "Cool",
	},
	bodypress: {
		inherit: true,
		contestType: "Tough",
	},
	breakingswipe: {
		inherit: true,
		contestType: "Cute",
	},
	clangingscales: {
		inherit: true,
		contestType: "Beautiful",
	},
	coreenforcer: {
		inherit: true,
		contestType: "Cool",
	},
	courtchange: {
		inherit: true,
		contestType: "Tough",
	},
	darkestlariat: {
		inherit: true,
		contestType: "Tough",
	},
	dragondarts: {
		inherit: true,
		contestType: "Cute",
	},
	eternabeam: {
		inherit: true,
		contestType: "Beautiful",
	},
	laserfocus: {
		inherit: true,
		contestType: "Clever",
	},
	lifedew: {
		inherit: true,
		contestType: "Beautiful",
	},
	liquidation: {
		inherit: true,
		contestType: "Tough",
	},
	meteorassault: {
		inherit: true,
		contestType: "Cool",
	},
	meteorbeam: {
		inherit: true,
		contestType: "Beautiful",
	},
	naturesmadness: {
		inherit: true,
		contestType: "Cool",
	},
	noretreat: {
		inherit: true,
		contestType: "Clever",
	},
	nobleroar: {
		inherit: true,
		contestType: "Cool",
	},
	overdrive: {
		inherit: true,
		contestType: "Cool",
	},
	photongeyser: {
		inherit: true,
		contestType: "Beautiful",
	},
	prismaticlaser: {
		inherit: true,
		contestType: "Beautiful",
	},
	pyroball: {
		inherit: true,
		contestType: "Cool",
	},
	shadowbone: {
		inherit: true,
		contestType: "Beautiful",
	},
	shelltrap: {
		inherit: true,
		contestType: "Cool",
	},
	snipeshot: {
		inherit: true,
		contestType: "Clever",
	},
	sparklingaria: {
		inherit: true,
		contestType: "Beautiful",
	},
	spiritbreak: {
		inherit: true,
		contestType: "Tough",
	},
	spiritshackle: {
		inherit: true,
		contestType: "Cool",
	},
	strengthsap: {
		inherit: true,
		contestType: "Clever",
	},
	toxicthread: {
		inherit: true,
		contestType: "Clever",
	},
	zingzap: {
		inherit: true,
		contestType: "Cute",
	},
};
