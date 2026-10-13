(function(){
"use strict";
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function solveChoice(q){const ix="ABCD".indexOf(String(q.answer));return ix>=0?q.options?.[ix]:q.answer;}
const number=v=>{const n=Number(String(v||"").replace(/[^0-9-]/g,""));return Number.isFinite(n)&&String(v||"").trim()!==""?n:null;};
const chip=(s)=>'<span class="drawing-chip">'+esc(s)+'</span>';
const row=(xs)=>'<div class="drawing-row">'+xs.join("")+"</div>";
const items=(sym,n)=>row(Array.from({length:Math.max(0,Math.min(25,n||0))},()=>chip(sym)));
const svg=(body)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 125" role="img" aria-label="Simplified math drawing">'+body+'</svg>';
const txt=(x,y,v,size=24)=>'<text x="'+x+'" y="'+y+'" font-family="Arial,sans-serif" font-size="'+size+'" font-weight="700" text-anchor="middle" fill="#315d4b">'+esc(v)+'</text>';
function balance(a,b,c,heavy){let weights={A:2,B:2,C:2,D:2,"○":2,"△":2,"□":2};weights[heavy]=5;let names=a||["A","B","C"];const w=names.map(x=>weights[x]||2);return svg('<path d="M60 48H280 M170 48V95 M140 100H200" stroke="#537b69" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M95 48l-20 32h40zM245 48l-20 32h40z" fill="#ecd09c" stroke="#8a745a" stroke-width="2"/>'+txt(82,37,names[0])+txt(170,36,names[1])+txt(256,37,names[2]))}
function polygon(sides){sides=Math.max(3,Math.min(10,sides||5));const pts=Array.from({length:sides},(_,i)=>{let a=-Math.PI/2+i*2*Math.PI/sides;return [170+53*Math.cos(a),63+49*Math.sin(a)].join(",")}).join(" ");return svg('<polygon points="'+pts+'" fill="#c5e6d4" stroke="#39775c" stroke-width="4" stroke-linejoin="round"/>');}
function pattern(target,seed){const n=number(target);if(n!==null){const step=seed%3+1;return row([n-3*step,n-2*step,n-step,"?"].map(v=>chip(v)));}
if(/^[A-Z]$/.test(String(target))) {const idx=target.charCodeAt(0)-65;return row([3,2,1].map(k=>chip(String.fromCharCode(65+(idx+26-k)%26))).concat(chip("?")));}
return row(["🔵","🟠","🔵","🟠","❓"].map(chip));}
function render(q,i,testId){
const p=String(q.prompt||""),l=p.toLowerCase(),target=solveChoice(q),n=number(target),an=number(q.answer);
let prompt=p.replace(/^\s*\d+\.\s*/,"").trim(),visual="",adapted=false, note="";
const ans=n!==null?n:an;
const counting=/(how many|count|number of|are there|total|altogether|figure below)/.test(l);
const type=/(people|students|children|boys|girls|family)/.test(l)?"🧒":/(pencil|pen)/.test(l)?"✏️":/(fish|tank)/.test(l)?"🐟":/(book|shelf|notebook)/.test(l)?"📚":/(apple|fruit)/.test(l)?"🍎":/(shirt|t-shirt)/.test(l)?"👕":/(balloon)/.test(l)?"🎈":/(candy|candies)/.test(l)?"🍬":/(circle)/.test(l)?"●":/(square)/.test(l)?"■":/(triangle)/.test(l)?"▲":/(cube|block|box)/.test(l)?"🧊":/(star)/.test(l)?"★":null;
if(!prompt){prompt=ans!==null?"Find the missing value shown in the picture.":"Find the missing shape or letter.";adapted=true;}
if(/heaviest|lightest/.test(l)&&/balance|figure|picture/.test(l)){
 const v=String(target||q.answer||"D").match(/\b[A-D]\b/)?.[0]||String(q.answer||"A");
 visual=balance(null,null,null,v);adapted=true;
 prompt=/heaviest/.test(l)?"Which labeled object is the heaviest?":"Which labeled object is the lightest?";
 visual+=row(["A","B","C","D"].map((x,j)=>chip(x+" "+(x===v?(/lightest/.test(l)?"⚖️":"🏋️"):"◻️"))));
}else if(/pattern|come next|next letter|space provided|missing (figure|sticker|shape)/.test(l)){
 visual=pattern(ans!==null?ans:target, i);adapted=true;
 if(!target||target==="A"||target==="B"||target==="C"||target==="D"){
 const symbols=["🍎","🍊","🍇","🍌"];const correctIndex="ABCD".indexOf(String(q.answer));const winning=symbols[(i+3)%4];
 visual=row([symbols[i%4],winning,symbols[i%4],winning,"?"].map(chip));
 if(q.options?.every(v=>/^[A-D]$/.test(v))) { const opts=symbols.slice();opts[correctIndex]=winning;for(let j=0;j<4;j++){if(j!==correctIndex&&opts[j]===winning)opts[j]=symbols[(j+2)%4]};return {html:visual,prompt:"Which fruit comes next in the pattern?",options:opts,adapted:true};}
 }
}else if(/how many sides|number of sides|sides are there/.test(l)&&ans!==null) {
 visual=polygon(ans);adapted=true;prompt="How many sides does this shape have?";
}else if(/triangle|square|circle|cube/.test(l)&&counting&&ans!==null){
 visual=items(type||"▲",ans);adapted=true;prompt="How many "+(/triangle/.test(l)?"triangles":/square/.test(l)?"squares":/circle/.test(l)?"circles":"cubes")+" can you see?";
}else if(counting&&type&&ans!==null&&ans>=0&&ans<=25){
 visual=items(type,ans);adapted=true;prompt="Count the "+({ "🧒":"children","✏️":"pencils","🐟":"fish","📚":"books","🍎":"apples","👕":"shirts","🎈":"balloons","🍬":"candies","●":"circles","■":"squares","▲":"triangles","🧊":"cubes","★":"stars"}[type]||"objects")+". How many are there?";
}else if(/equation|erased|value of (the|a|[a-z] )|calculate|find the value/.test(l)&&ans!==null&&/picture|below|erased|given|symbol|bird|elephant|flower|moon|star|chocolate/.test(l)){
 visual=row([chip("?"),chip("+"),chip("4"),chip("="),chip(ans+4)]);adapted=true;prompt="Find the missing number in this equation.";
}else if(/only numbers (bigger|larger|smaller|less)/.test(l)){
 const comp=/bigger|larger/.test(l);const valid=comp?[6,7,8]:[1,2,3];const v=String(q.answer||"C");
 visual=row(["A","B","C","D"].map((x,j)=>chip(x+": "+(x===v?valid.join(", "):(comp?"1, 2, 6":"2, 7, 8")))));adapted=true;
}else if(/how many .*group|group .*how many|4th group|3rd group/.test(l)&&ans!==null){
 visual=row([1,2,3,4].map((x)=>chip("Group "+x+": "+(x===4?"?":x))));adapted=true;prompt="How many stars belong in group 4?";
}else if(/according|below|following|shown|picture|figure|diagram|balance|arrang|which shape|which figure/.test(l)&&!visual){
 if(ans!==null){visual=row([chip(ans-2),chip(ans-1),chip("?")]);prompt="Find the next number in the pattern.";adapted=true;}
 else if(/^[A-Z]$/.test(String(q.answer||""))&&q.answer.length===1){visual=pattern(q.answer,i);prompt="Which letter comes next?";adapted=true;}
 else if(q.answer&&q.answer!=="Even"&&q.answer!=="Odd"){visual=row([chip("◯"),chip("△"),chip("□"),chip("?")]);note="Visual reasoning practice; refer to the question and choices.";adapted=true;}
}
if(!visual){if(type&&counting)visual=items(type,Math.min(8,ans||5));else if(/clock|time/.test(l))visual=row(["🕒","→","❓"].map(chip));else if(/odd|even/.test(l))visual=row([2,3,4,5,6,7].map(chip));else if(/number|digit/.test(l))visual=row([1,2,3,4,5].map(chip));else if(/shape|figure/.test(l))visual=row(["▲","●","■","★"].map(chip));}
if(!visual)return null;
return {html:visual,prompt,adapted,options:null,note};
}
window.MockIllustrations={render};
})();