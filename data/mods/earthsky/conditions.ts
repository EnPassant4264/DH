export const Conditions: {[k: string]: ModdedConditionData} = {
	/* Existing statuses */
	frz: {
		name: 'frz',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
			this.effectData.time = 0;
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['defrost']) return;
			if (this.randomChance(pokemon.statusData.time, 5)) {
				pokemon.cureStatus();
				return;
			} else if(!pokemon.volatiles['stasis']){
				pokemon.statusData.time++;
			}
			this.add('cant', pokemon, 'frz');
			return false;
		},
		onModifyMove(move, pokemon) {
			if (!pokemon.volatiles['stasis'] && move.flags['defrost']) {
				this.add('-curestatus', pokemon, 'frz', '[from] move: ' + move);
				pokemon.setStatus('');
			}
		},
		onHit(target, source, move) {
			if (move.thawsTarget || (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) && move.category !== 'Status') {
				target.cureStatus();
			}
		},
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
	},
	flinch: {
		name: 'flinch',
		duration: 1,
		onBeforeMovePriority: 8,
		onBeforeMove(pokemon) {
			this.add('cant', pokemon, 'flinch');
			this.runEvent('Flinch', pokemon);
			return false;
		},
	},
	partiallytrapped: {
		inherit: true,
		onStart(pokemon, source) {
			if(pokemon.volatiles['strongpartialtrap']) return false;
			this.add('-activate', pokemon, 'move: ' + this.effectData.sourceEffect, '[of] ' + source);
			this.effectData.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
		},
	},
	/* New statuses */
	evade: {
		duration: 1,
		name: 'evade',
		onStart(pokemon) {
			if(pokemon.volatiles['odorsleuth']) return false;
		},
		onAccuracy(accuracy, target, source, move) {
			if(!move.ignoreEvasion && typeof move.accuracy === 'number') return false;
		},
	},
	evadestall: { //Evasion move counter
		name: 'evadestall',
		duration: 2,
		counterMax: 729,
		onStart(pokemon) {
			if(pokemon.volatiles['odorsleuth']) return false;
			this.effectData.counter = 3;
		},
		onEvadeStallMove(pokemon) {
			// this.effectData.counter should never be undefined here.
			// However, just in case, use 1 if it is undefined.
			const counter = this.effectData.counter || 1;
			this.debug("Success chance: " + Math.round(100 / counter) + "%");
			const success = this.randomChance(1, counter);
			if (!success) delete pokemon.volatiles['evadestall'];
			return success;
		},
		onRestart() {
			if (this.effectData.counter < (this.effect as Condition).counterMax!) {
				this.effectData.counter *= 3;
			}
			this.effectData.duration = 2;
		},
	},
	strongpartialtrap: {
		name: 'strongpartialtrap',
		duration: 3,
		durationCallback(target, source) {
			if (source?.hasItem('gripclaw')) return 5;
			return this.random(3, 4);
		},
		onStart(pokemon, source) {
			if(pokemon.volatiles['partiallytrapped']) return false;
			this.add('-activate', pokemon, 'move: ' + this.effectData.sourceEffect, '[of] ' + source);
			this.effectData.boundDivisor = source.hasItem('bindingband') ? 3 : 4;
		},
		onResidualOrder: 11,
		onResidual(pokemon) {
			const source = this.effectData.source;
			if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
				delete pokemon.volatiles['strongpartialtrap'];
				this.add('-end', pokemon, this.effectData.sourceEffect, '[strongpartialtrap]', '[silent]');
				return;
			}
			this.damage(pokemon.baseMaxhp / this.effectData.boundDivisor);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectData.sourceEffect, '[strongpartialtrap]');
		},
	},
	/* Status changes due to other elements */
	slp: {
		inherit: true,
		onBeforeMove(pokemon, target, move) {
			if(!pokemon.volatiles['stasis']){
				if (pokemon.hasAbility('earlybird')) {
					pokemon.statusData.time--;
				}
				pokemon.statusData.time--;
				if (pokemon.statusData.time <= 0) {
					pokemon.cureStatus();
					return;
				}
			}
			this.add('cant', pokemon, 'slp');
			if (move.sleepUsable) {
				return;
			}
			return false;
		},
	},
	raindance: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water' || (move.twoType && move.twoType === 'Water')) {
				this.debug('rain water boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				this.debug('rain fire suppress');
				return this.chainModify(0.5);
			}
		},
	},
	primordialsea: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if ((move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) && move.category !== 'Status') {
				this.debug('Primordial Sea fire suppress');
				this.add('-fail', attacker, move, '[from] Primordial Sea');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water' || (move.twoType && move.twoType === 'Water')) {
				this.debug('Rain water boost');
				return this.chainModify(1.5);
			}
		},
		weatherName: "Torrential Rain",
		start: "  A torrential rain began to fall!",
		end: "  The torrential rain has lifted!",
		block: "  There is no relief from this torrential rain!",
		blockMove: "  The Fire-type attack fizzled out in the torrential rain!",
	},
	sunnyday: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Water' || (move.twoType && move.twoType === 'Water')) {
				this.debug('Sunny Day water suppress');
				return this.chainModify(0.5);
			}
		},
	},
	desolateland: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if ((move.type === 'Water' || (move.twoType && move.twoType === 'Water')) && move.category !== 'Status') {
				this.debug('Desolate Land water suppress');
				this.add('-fail', attacker, move, '[from] Desolate Land');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
		},
		weatherName: "Intense Sun",
		start: "  The sunlight turned scorchingly hot!",
		end: "  The scorching sunlight faded.",
		block: "  The scorching sunlight was not lessened at all!",
		blockMove: "  The Water-type attack evaporated in the intense sunlight!",
	},
};
