export const Formats: {[k: string]: ModdedFormatData} = {
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
						const pokeLearnsMove = this.dex.getLearnsetData(pokemon.id).learnset[moveID];
						console.log(pokemon + " knows " + moveID + " with means " + pokeLearnsMove);
						if(pokeLearnsMove === ["8D"]){
							isHidden = true;
						} else if(pokeLearnsMove === undefined){
							console.log("This move is not learned by this stage or form");
							if(pokemon.changesFrom) console.log("Base form is " + pokemon.changesFrom + " and its accessibility to " + moveID + " is " + this.dex.getLearnsetData(this.dex.getSpecies(pokemon.changesFrom).id).learnset[moveID]);
							if(pokemon.changesFrom && pokemon.name !== pokemon.changesFrom && this.dex.getLearnsetData(this.dex.getSpecies(pokemon.changesFrom).id).learnset[moveID] === ["8D"]){ //This move is base forme's Hidden Move
								if(pokemon.exclusiveHidden) //and the Pokemon can't learn it
									problems.push(`${pokemon} can't learn ${moveID} because it is ${pokemon.baseSpecies}'s exclusive Hidden Move.`);
								else {
									isHidden = true;
								}
							}
							if(prevo){
								console.log("Prevo is " + prevo.name + " and its accessibility to " + moveID + " is " + this.dex.getLearnsetData(prevo.id).learnset[moveID]);
								if(this.dex.getLearnsetData(prevo.id).learnset[moveID] === ["8D"]) {//This move is prevo's Hidden Move
									if(pokemon.exclusiveHidden) //and the Pokemon can't learn it
										problems.push(`${pokemon} can't learn ${moveID} because it is ${prevo}'s exclusive Hidden Move.`);
									else {
										learnedHiddenTable.push(pokemon);
										isHidden = true;
									}
								} else if (this.dex.getLearnsetData(prevo.id).learnset[moveID] === undefined){ //The prevo can't learn it either, therefore...
									const first = (prevo.prevo) ? this.dex.getSpecies(prevo.prevo) : undefined; //there must be a first stage
									if(first){
										console.log("First stage is " + first.name + " and its accessibility to " + moveID + " is " + this.dex.getLearnsetData(first.id).learnset[moveID]);
										if(this.dex.getLearnsetData(first.id).learnset[moveID] === ["8D"]) {//This move is first stage's Hidden Move
											if(pokemon.exclusiveHidden) //and the Pokemon can't learn it
												problems.push(`${pokemon} can't learn ${moveID} because it is ${first}'s exclusive Hidden Move.`);
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
						if(prevo){ //Get the base Pokemon in the family
							if(prevo.prevo) pokemon = this.dex.getSpecies(prevo.prevo);
							else pokemon = prevo;
						}
						family.push(pokemon.name);
						console.log("Creating " + pokemon.name + " family");
						if(pokemon.evos || pokemon.otherFormes){
							for(let evo in pokemon.evos){
								console.log("Adding " + evo);
								family.push(evo);
								evoMon = this.dex.getSpecies(evo);
								if(evoMon.evos){
									for(let evoFinal in evoMon.evos){
										console.log("Adding " + evoFinal);
										family.push(evoFinal);
										if(evoFinal.otherFormes){
											for(let evoFinalForme in evoFinal.otherFormes){
												console.log("Adding " + evoFinalForme);
												family.push(evoFinalForme);
											}
										}
									}
								}
								if(evoMon.otherFormes){
									for(let evoForme in evoMon.otherFormes) {
										console.log("Adding " + evoForm);
										family.push(evoForm);
										evoMonForme = this.dex.getSpecies(evoForme);
										if(evoMonForme.evos){
											for(let evoFormeFinal in evoMonForm.evos){
												if(!family.includes(evoFormeFinal)){
													console.log("Adding " + evoFormeFInal);
													family.push(evoFormeFinal);
												}
											}
										}
									}
								}
							}
							for(let forme in pokemon.otherFormes){
								console.log("Adding " + forme);
								family.push(forme);
								formeMon = this.dex.getSpecies(forme);
								if(formeMon.evos){
									for(let formeEvo in formeMon.evos){
										if(!family.includes(formeEvo)){
											console.log("Adding " + formeEvo);
											family.push(formeEvo);
										}
										if(formeEvo.evos){
											for(let formeEvoFinal in formeEvo.evos)
												if(!family.includes(formeEvoFinal)){
													console.log("Adding " + formeEvoFinal);
													family.push(formeEvoFinal);
												}
										}
										if(formeEvo.otherFormes){
											for(let formeEvoForme in formeEvo.otherFormes)
												if(!family.includes(formeEvoForme)){
													console.log("Adding " + formeEvoForme);
													family.push(formeEvoForme);
												}
											//There are currently no cases of a Pokemon only evolving in an alternate form into a Pokemon that itself only evolves in an alternate form. Thank goodness.
										}
									}
								}
							}
						}
						console.log("Full family:");
						console.log(family);
						//Then we make sure none of them are in this team and know a Hidden Move
						for(const poke of learnedHiddenTable){
							if(poke.baseSpecies === pokemon.baseSpecies) //normally useless with Species Clause, but maybe my meta will get popular enough that it will have spinoffs
								problems.push(`No more than one ${pokemon.baseSpecies} can know its Hidden Move.`);
							else if(family.includes(poke.name))
								problems.push(`${poke.name} and {pokemon.name} cannot both know their Hidden Moves because they are in the same family.`);
						}
						learnedHiddenTable.push(pokemon);
					}
				}
			}
			return problems;
		},
	},
};
