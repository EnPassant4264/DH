export const Formats: {[k: string]: ModdedFormatData} = {
	earthsky: {
		effectType: 'ValidatorRule',
		name: 'Earth & Sky',
		desc: 'The standard ruleset for all Earth & Sky tiers',
		ruleset: [ 'Hidden Move Limit', 'Obtainable', 'Gen 8 Sketch', /*'Species Clause'*/, 'Sleep Clause Mod', 'Endless Battle Clause', 'Baton Pass Clause', /*'OHKO Clause', */'Z-Move Clause', 'Dynamax Clause',
			'Team Preview', 'Cancel Mod', 'Data Mod', 'Mega Data Mod',],
	},
	egelaspokedex: {
		effectType: 'ValidatorRule',
		name: 'Egelas Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Egelas Region (Earth/Sky)",
		onValidateSet(set, format) {
			const egelasDex = [
				"caeleaf,sprop,graecust,iguava,chucklava,helmuana,newtiny,ruggeft,claymander,palrat,spectrat,shinx,luxio,luxray,stunky,skuntank,fanfowl,plumifowl,pealated,hoothootegelas,noctowlegelas,toybot,aibot,utilitron,utilitronboat,utilitroncoptor,trubbish,garbodor,faerunee,caterpie,metapod,butterfree,budew,roselia,roserade,sothodil,sosphodel,gulpin,swalot,montura,twintura,silvurah,burrorm,burryrm,scarabouch,deerling,sawsbuck,azurill,marill,azumarill,ballooffalo,slowpoke,slowbro,slowking,magikarp,gyarados,tigrissle,beedive,basculin,basculinbluestriped,pikeral,pikeralbluestriped,feebas,milotic,slakoth,vigoroth,slaking,bounsweet,steenee,tsareena,lithoshroom,litholich,geodude,graveler,golem,sableye,mawile,rugblin,runogre,growlithe,arcanine,houndour,houndoom,absol,joroo,jaquol,thylone,blitzle,zebstrika,falinks,fletchling,fletchinder,talonflame,cufant,copperajah,phanpy,donphan,teddiursa,ursaring,trigenee,hexyon,hektillion,termill,terrazor,heracross,pinsir,rockruff,lycanroc,lycanrocmidnight,lycanroctwilight,elpine,freezelk,moorfrost,snover,abomasnow,swinub,piloswine,mamoswine,vanillite,vanillish,vanilluxe,smoochum,jynx,zubat,golbat,crobat,noibat,noivern,dunsparce,drampa,minior,prominoid,cryogonal,riolu,lucario,zorua,zoroark,igglybuff,jigglypuff,wigglytuff,delibirdegelas,tynamo,eelektrikegelas,eelektrossegelas,elekid,electabuzz,electivire,milcery,alcremie,joltik,galvantula,inkay,malamar,croagunk,toxicroak,farfetchd,kendono,deino,zweilous,hydreigon,lemurod,heatmoregelas,durantegelas,axew,fraxure,haxorus,sandygast,palossand,crabrawler,crabominable,exeggcute,exeggutoralola,tropius,wingull,pelipper,antarctross,shellder,cloyster,finneon,lumineon,gobellos,dragobellos,plecuum,vorplec,pyukumuku,pincurchin,lioxin,frillish,jellicent,scrunge,dhelmise,cuttlelass,dreadnautilus,kravokalypse,cuboneegelas,marowakalola,duskull,dusclops,dusknoir,ralts,kirlia,gardevoir,gallade,elgyem,beheeyem,unown,sigilyph,roggenrola,boldore,gigalith,carbink,stegrowth,stegrove,angkol,macedon,mienfoo,mienshao,ascelyte,paraiagon,obelith,pyramyth,silicobra,sandaconda,helioptile,heliolisk,taurosegelas,miltankegelas,ponytaegelas,rapidashegelas,magby,magmar,magmortar,torkoal,turtonator,moroth,keelmora,yamask,cofagrigus,bronzor,bronzong,honedge,doublade,aegislash,druddigon,deceuceus,fervintill,selervis,helyrion,daedestus,apherove,poleboar,pallatinel,jurotera,oceides,hatar,zuros,norphaval"
			];
			const species = this.dex.getSpecies(set.species || set.name);
			if (!egelasDex.includes(species.baseSpecies)) {
				return [species.baseSpecies + " is not in the Egelan Pok&eacute;dex."];
			}
		},
	},
	hiddenmovelimit: {
		effectType: 'ValidatorRule',
		name: 'Hidden Move Limit',
		desc: "Ensures that no more than one Hidden Move is known per Pok&eacute;mon family and that forme/evolution-exclusive Hidden Moves are respected.",
		onValidateTeam(team) {
			const learnedHiddenTable: Pokemon[] = []; //List of Pokemon on the team with Hidden Moves
			const problems: string[] = [];
			for (const set of team) {
				if (set.moves) {
					const pokemon = this.dex.getSpecies(set.species || set.name);
					const prevo = (pokemon.prevo) ? this.dex.getSpecies(pokemon.prevo) : undefined;
					let isHidden = false;
					for (const moveID of set.moves) {
						const pokeLearnset = this.dex.getLearnsetData(pokemon.id);
						if(!pokeLearnset) pokeLearnset = this.dex.getLearnsetData(this.dex.getSpecies(pokemon.baseSpecies).id);
						const pokeLearnsMove = pokeLearnset.learnset[moveID];
						//console.log(pokemon + " knows " + moveID + " with means " + pokeLearnsMove);
						if(pokeLearnsMove == "8D"){
							isHidden = true;
						} else if(pokeLearnsMove === undefined){
							//console.log("This move is not learned by this stage or form");
							//if(pokemon.changesFrom) console.log("Base form is " + pokemon.changesFrom + " and its accessibility to " + moveID + " is " + this.dex.getLearnsetData(this.dex.getSpecies(pokemon.changesFrom).id).learnset[moveID]);
							if(pokemon.changesFrom && pokemon.name !== pokemon.changesFrom && this.dex.getLearnsetData(this.dex.getSpecies(pokemon.changesFrom).id).learnset[moveID] == "8D"){ //This move is base forme's Hidden Move
								if(pokemon.exclusiveHidden) //and the Pokemon can't learn it
									problems.push(`${pokemon} can't learn ${this.dex.getMove(moveID)} because it is ${pokemon.baseSpecies}'s exclusive Hidden Move.`);
								else {
									isHidden = true;
								}
							}
							if(prevo){
								//console.log("Prevo is " + prevo.name + " and its accessibility to " + moveID + " is " + this.dex.getLearnsetData(prevo.id).learnset[moveID]);
								if(this.dex.getLearnsetData(prevo.id).learnset[moveID] == "8D") {//This move is prevo's Hidden Move
									if(pokemon.exclusiveHidden) //and the Pokemon can't learn it
										problems.push(`${pokemon} can't learn ${this.dex.getMove(moveID)} because it is ${prevo}'s exclusive Hidden Move.`);
									else {
										isHidden = true;
									}
								} else if (this.dex.getLearnsetData(prevo.id).learnset[moveID] === undefined){ //The prevo can't learn it either, therefore...
									const first = (prevo.prevo) ? this.dex.getSpecies(prevo.prevo) : undefined; //there must be a first stage
									if(first){
										//console.log("First stage is " + first.name + " and its accessibility to " + moveID + " is " + this.dex.getLearnsetData(first.id).learnset[moveID]);
										if(this.dex.getLearnsetData(first.id).learnset[moveID] == "8D") {//This move is first stage's Hidden Move
											if(pokemon.exclusiveHidden) //and the Pokemon can't learn it
												problems.push(`${pokemon} can't learn ${this.dex.getMove(moveID)} because it is ${first}'s exclusive Hidden Move.`);
											else {
												isHidden = true;
											}
										}
									}
								}
							}
						}
					}
					if(isHidden){ //Pokemon knows a Hidden Move, therefore we must ensure no one else in its family knows one
						//We start by constructing a family tree
						const family: Species[] = [];
						let base = pokemon; //Get the base Pokemon in the family
						if(prevo){
							if(prevo.prevo) base = this.dex.getSpecies(prevo.prevo);
							else base = prevo;
						}
						if(base.name !== base.baseSpecies) base = this.dex.getSpecies(base.baseSpecies);
						family.push(base.name);
						//console.log("Creating " + base.name + " family");
						if(base.evos){
							for(let evo of base.evos){
								if(!family.includes(evo)){
									//console.log("Adding " + evo);
									family.push(evo);
									const evoMon = this.dex.getSpecies(evo);
									if(evoMon.evos){
										for(let evoFinal of evoMon.evos){
											//console.log("Adding " + evoFinal);
											family.push(evoFinal);
											const evoFinalMon = this.dex.getSpecies(evoFinal);
											if(evoFinalMon.otherFormes){
												for(let evoFinalForme of evoFinalMon.otherFormes){
													//console.log("Adding " + evoFinalForme);
													family.push(evoFinalForme);
												}
											}
										}
									}
									if(evoMon.otherFormes){
										for(let evoForme of evoMon.otherFormes) {
											if(!family.includes(evoForme)){
												//console.log("Adding " + evoForme);
												family.push(evoForme);
												const evoMonForme = this.dex.getSpecies(evoForme);
												if(evoMonForme.evos){
													for(let evoFormeFinal of evoMonForme.evos){
														if(!family.includes(evoFormeFinal)){
															//console.log("Adding " + evoFormeFinal);
															family.push(evoFormeFinal);
														}
													}
												}
											}
										}
									}
								}
							}
						} if (base.otherFormes){
							for(let forme of base.otherFormes){
								//console.log("Adding " + forme);
								family.push(forme);
								const formeMon = this.dex.getSpecies(forme);
								if(formeMon.evos){
									for(let formeEvo of formeMon.evos){
										if(!family.includes(formeEvo)){
											//console.log("Adding " + formeEvo);
											family.push(formeEvo);
											const formeEvoMon = this.dex.getSpecies(formeEvo);
											if(formeEvoMon.evos){
												for(let formeEvoFinal of formeEvoMon.evos)
													if(!family.includes(formeEvoFinal)){
														//console.log("Adding " + formeEvoFinal);
														family.push(formeEvoFinal);
													}
											}
											if(formeEvoMon.otherFormes){
												for(let formeEvoForme of formeEvoMon.otherFormes)
													if(!family.includes(formeEvoForme)){
														//console.log("Adding " + formeEvoForme);
														family.push(formeEvoForme);
													}
												//There are currently no cases of a Pokemon only evolving in an alternate form into a Pokemon that itself only evolves in an alternate form. Thank goodness.
											}
										}
									}
								}
							}
						}
						//console.log("Full family:");
						//console.log(family);
						//Then we make sure none of them are in this team and know a Hidden Move
						for(const poke of learnedHiddenTable){
							if(poke.baseSpecies === pokemon.baseSpecies) //normally useless with Species Clause, but maybe my meta will get popular enough that it will have spinoffs
								problems.push(`No more than one ${pokemon.baseSpecies} can know its Hidden Move.`);
							else if(family.includes(poke.name))
								problems.push(`${poke.name} and ${pokemon.name} cannot both know their Hidden Moves because they are in the same family.`);
						}
						learnedHiddenTable.push(pokemon);
					}
				}
			}
			return problems;
		},
	},
};
