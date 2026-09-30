import{world}from "@minecraft/server";
const KEY="villagers_plus:village_xp";
const LEVELS=[{level:1,name:"Acampamento",xp:0},{level:2,name:"Povoado",xp:100},{level:3,name:"Vila",xp:300},{level:4,name:"Vila Desenvolvida",xp:700},{level:5,name:"Grande Vila",xp:1500},{level:6,name:"Cidade",xp:3000}];
function score(player){return Number(player.getDynamicProperty(KEY)??0)}
function level(player){let l=LEVELS[0],s=score(player);for(const x of LEVELS)if(s>=x.xp)l=x;return l}
export function addVillageXp(player,amount){const s=Math.min(10000,score(player)+amount);player.setDynamicProperty(KEY,s);return level(player)}
export function getVillageInfo(player){const l=level(player);return{xp:score(player),...l,next:LEVELS.find(x=>x.xp>score(player))??null}}
export function countWorkers(player){return player.dimension.getEntities({tags:["villagers_plus"],location:player.location,maxDistance:64}).filter(v=>String(v.getDynamicProperty("villagers_plus:owner")??"")===player.id).length}
export const villageLevels=LEVELS;