import{world}from "@minecraft/server";
const KEY="villagers_plus:village_xp",BUILT="villagers_plus:built_level",VX="villagers_plus:village_x",VY="villagers_plus:village_y",VZ="villagers_plus:village_z";
const LEVELS=[
{level:1,name:"Acampamento",xp:0,unlock:"Casas simples"},
{level:2,name:"Povoado",xp:100,unlock:"Fazenda e celeiro"},
{level:3,name:"Vila",xp:300,unlock:"Mercado e biblioteca"},
{level:4,name:"Vila Desenvolvida",xp:700,unlock:"Oficina e forja"},
{level:5,name:"Grande Vila",xp:1500,unlock:"Muralhas e santuário"},
{level:6,name:"Cidade",xp:3000,unlock:"Prefeitura e mina"}
];
function score(p){return Number(p.getDynamicProperty(KEY)??0)}
function level(p){let l=LEVELS[0],s=score(p);for(const x of LEVELS)if(s>=x.xp)l=x;return l}
export function getVillageInfo(p){const l=level(p);return{xp:score(p),...l,next:LEVELS.find(x=>x.xp>score(p))??null,built:Number(p.getDynamicProperty(BUILT)??0)}}
export function countWorkers(p){return p.dimension.getEntities({tags:["villagers_plus"],location:p.location,maxDistance:96}).filter(v=>String(v.getDynamicProperty("villagers_plus:owner")??"")===p.id).length}
export function ensureVillageOrigin(p){if(p.getDynamicProperty(VX)===undefined){p.setDynamicProperty(VX,Math.floor(p.location.x));p.setDynamicProperty(VY,Math.floor(p.location.y));p.setDynamicProperty(VZ,Math.floor(p.location.z));}return{x:Number(p.getDynamicProperty(VX)),y:Number(p.getDynamicProperty(VY)),z:Number(p.getDynamicProperty(VZ))}}
export function getVillageOrigin(p){return ensureVillageOrigin(p)}
export function getBuiltLevel(p){return Number(p.getDynamicProperty(BUILT)??0)}
export function setBuiltLevel(p,l){p.setDynamicProperty(BUILT,l)}
export function addVillageXp(p,amount){const old=level(p).level;const s=Math.min(10000,score(p)+amount);p.setDynamicProperty(KEY,s);const now=level(p);if(now.level>old)p.sendMessage("§6🏘️ Sua vila evoluiu para §e"+now.name+"§6! Desbloqueio: §f"+now.unlock);return now}
export const villageLevels=LEVELS;
export function buildVillage(p,targetLevel=level(p).level){
 const d=p.dimension,o=ensureVillageOrigin(p),y=o.y,placed=(x,yy,z,b)=>{try{d.setBlockType({x:o.x+x,y:y+yy,z:o.z+z},b)}catch{}};
 const fill=(x1,yy1,z1,x2,yy2,z2,b)=>{for(let x=x1;x<=x2;x++)for(let yy=yy1;yy<=yy2;yy++)for(let z=z1;z<=z2;z++)placed(x,yy,z,b)};
 const floor=(x1,z1,x2,z2,b)=>fill(x1,0,z1,x2,0,z2,b);
 const house=(cx,cz)=>{floor(cx-3,cz-3,cx+3,cz+3,"minecraft:cobblestone");fill(cx-3,1,cz-3,cx+3,3,cz-3,"minecraft:oak_planks");fill(cx-3,1,cz+3,cx+3,3,cz+3,"minecraft:oak_planks");fill(cx-3,1,cz-2,cx-3,3,cz+2,"minecraft:oak_planks");fill(cx+3,1,cz-2,cx+3,3,cz+2,"minecraft:oak_planks");fill(cx-2,4,cz-2,cx+2,4,cz+2,"minecraft:oak_planks");placed(cx,1,cz-3,"minecraft:oak_door");placed(cx-2,2,cz-3,"minecraft:glass");placed(cx+2,2,cz-3,"minecraft:glass");placed(cx,1,cz+3,"minecraft:bed");};
 if(targetLevel>=1){floor(-6,-6,6,6,"minecraft:grass_block");house(-10,0);house(10,0);}
 if(targetLevel>=2){floor(-22,-6,-12,6,"minecraft:farmland");for(let x=-21;x<=-13;x+=2)placed(x,1,0,"minecraft:wheat");for(let x=-21;x<=-13;x+=2)placed(x,1,4,"minecraft:carrot");fill(-24,0,-8,-10,2,8,"minecraft:hay_block");placed(-17,1,-2,"minecraft:water");}
 if(targetLevel>=3){floor(-6,-22,6,-12,"minecraft:stone_bricks");fill(-5,1,-21,5,3,-21,"minecraft:oak_planks");fill(-5,1,-13,5,3,-13,"minecraft:oak_planks");fill(-5,1,-20,-5,3,-14,"minecraft:oak_planks");fill(5,1,-20,5,3,-14,"minecraft:oak_planks");placed(0,1,-21,"minecraft:chest");placed(-3,1,-21,"minecraft:barrel");placed(3,1,-21,"minecraft:barrel");house(0,-17);}
 if(targetLevel>=4){floor(12,-7,22,7,"minecraft:stone");fill(13,1,-6,21,4,-6,"minecraft:stone_bricks");fill(13,1,6,21,4,6,"minecraft:stone_bricks");fill(13,1,-5,13,4,5,"minecraft:stone_bricks");fill(21,1,-5,21,4,5,"minecraft:stone_bricks");placed(17,1,-6,"minecraft:blast_furnace");placed(19,1,-6,"minecraft:smithing_table");placed(15,1,-6,"minecraft:crafting_table");}
 if(targetLevel>=5){for(let x=-28;x<=28;x++)for(const z of [-28,28])placed(x,0,z,"minecraft:stone_bricks");for(let z=-27;z<=27;z++)for(const x of [-28,28])placed(x,0,z,"minecraft:stone_bricks");for(const [x,z] of [[-28,-28],[-28,28],[28,-28],[28,28]])fill(x-1,0,z-1,x+1,5,z+1,"minecraft:stone_bricks");floor(-6,12,6,22,"minecraft:stone_bricks");placed(0,1,17,"minecraft:enchanting_table");}
 if(targetLevel>=6){floor(-6,10,6,22,"minecraft:polished_deepslate");fill(-5,1,12,5,5,20,"minecraft:stone_bricks");fill(-4,6,13,4,6,19,"minecraft:stone_bricks");placed(0,1,16,"minecraft:chest");placed(0,1,20,"minecraft:bell");fill(12,10,20,22,12,30,"minecraft:stone");placed(17,13,25,"minecraft:ladder");}
 p.setDynamicProperty(BUILT,targetLevel);
 p.sendMessage("§a🏗️ Construção da vila concluída até o nível §e"+targetLevel+"§a.");
}
export function getWorkLocation(p,jobId){const o=ensureVillageOrigin(p),map={farmer:{x:-17,z:2},fisherman:{x:10,z:10},shepherd:{x:-10,z:0},butcher:{x:10,z:0},leatherworker:{x:10,z:0},librarian:{x:0,z:-17},fletcher:{x:0,z:-17},cartographer:{x:0,z:-17},mason:{x:17,z:0},toolsmith:{x:17,z:0},armorer:{x:17,z:0},weaponsmith:{x:17,z:0},cleric:{x:0,z:17},bee_keeper:{x:0,z:17},miner:{x:17,z:25}};const q=map[jobId]??{x:0,z:0};return{x:o.x+q.x,y:o.y+1,z:o.z+q.z};}
