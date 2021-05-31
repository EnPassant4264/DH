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
		desc: "Ensures that no more than one Hidden Move is known per Pok&eacute;mon family",
		onValidateTeam(team) {
			const learnedHiddenTable: Pokemon[] = [];
			const problems: string[] = [];
			for (const set of team) {
				if (set.moves) {
					const pokemon = this.dex.getSpecies(set.species);
					for (const moveId of set.moves) {
						const pokeLearnsMove = this.dex.getLearnsetData(pokemon, this.dex.getMove(moveId));
						if(pokeLearnsMove === ["8D"]){
							for(const poke of learnedHiddenTable){
								if(poke.baseSpecies === pokemon.baseSpecies)
									problems.push(`No more than one ${pokemon.baseSpecies} can know its Hidden Move.`);
								if(poke.nfe && (poke.evos.includes(pokemon.baseSpecies) || (pokemon.prevo && poke.evos.includes(pokemon.prevo.baseSpecies))))
									problems.push(`No more than one Pokemon in ${poke.baseSpecies}'s family can know its Hidden Move.`);
								if(pokemon.nfe && (pokemon.evos.includes(poke.baseSpecies) || (poke.prevo && pokemon.evos.includes(poke.prevo.baseSpecies))))
									problems.push(`No more than one Pokemon in ${pokemon.baseSpecies}'s family can know its Hidden Move.`);
							}
							learnedHiddenTable.push(pokemon);
						}
					}
				}
			}
			return problems;
		},
	},
};
