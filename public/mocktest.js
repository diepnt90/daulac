(function(){
"use strict";
const questions=[
["Logic","How many children are here?","🧒 👧 🧒 👧 🧒 👧",["4","5","6","7"],2],
["Logic","What comes next?","🔴 🔵 🔴 🔵 🔴 ❓",["🔵","🟢","🔴","🟡"],0],
["Logic","Tomorrow is Monday. What day is today?","📅",["Tuesday","Sunday","Friday","Saturday"],1],
["Logic","Find the missing number.","12, 11, 9, 6, ?",["4","3","2","5"],2],
["Logic","Which shape is different?","🔺 🔺 🔺 🟦",["Triangle","Square","Circle","Star"],1],
["Arithmetic","What is 9 + 2?","9 + 2 = ?",["10","11","12","13"],1],
["Arithmetic","What is 10 − 6?","10 − 6 = ?",["2","3","4","5"],2],
["Arithmetic","Calculate.","12 − 3 − 4 = ?",["3","6","5","7"],2],
["Arithmetic","Find the missing number.","? − 4 = 4",["6","7","8","9"],2],
["Arithmetic","Find the missing number.","5 + ⭐ = 11",["5","6","7","8"],1],
["Number Theory","Lily has 4 pencils. Tom has 6 more. How many does Tom have?","✏️ ✏️ ✏️ ✏️  + 6",["10","2","9","11"],0],
["Number Theory","Which equation is true?","Choose one.",["8 − 1 − 5 = 12","8 + 1 − 5 = 12","8 − 1 + 5 = 12","8 + 1 + 5 = 12"],2],
["Number Theory","What is the smallest two-digit even number?","10, 11, 12, ...",["10","11","12","20"],0],
["Number Theory","How many even numbers from 8 to 17?","8 9 10 11 12 13 14 15 16 17",["4","5","6","7"],1],
["Number Theory","How many odd numbers can you find?","4　1　2　9　7",["1","2","3","4"],2],
["Geometry","How many triangles are here?","▲ ▲ ▲ ▲",["2","3","4","5"],2],
["Geometry","How many squares are here?","■ ■ ■",["2","3","4","5"],1],
["Geometry","How many cubes are shown?","🧊 🧊 🧊 🧊 🧊",["4","5","6","7"],1],
["Geometry","How many sides does a pentagon have?","⬟",["4","5","6","7"],1],
["Geometry","Which shape has no corners?","◯   △   □   ⬟",["Circle","Triangle","Square","Pentagon"],0],
["Combinatorics","David has 10 notebooks. John has 4. How many must David give John so both have the same number?","📒 10　→　📒 4",["6","5","4","3"],3],
["Combinatorics","Andy has 8 books and buys 4 more. How many now?","📚 8 + 4",["10","11","12","13"],2],
["Combinatorics","12 candies are shared equally by 3 children. How many each?","🍬 × 12　÷ 3",["3","4","5","6"],1],
["Combinatorics","Which is the second-largest number?","18, 25, 20, 34, 7, 12",["34","20","25","18"],2],
["Combinatorics","Make the smallest 3-digit number using 1, 4, 2 and 6 without repeats.","1　4　2　6",["124","214","111","142"],0]
];
const K="little-math-mocktest-v1";
let stored={};try{stored=JSON.parse(localStorage.getItem(K))||{};}catch(e){}
const answers=Array.isArray(stored.answers)?stored.answers.slice(0,25):[];
const checked=Array.isArray(stored.checked)?stored.checked.slice(0,25):[];
const save=()=>{try{localStorage.setItem(K,JSON.stringify({answers,checked}));}catch(e){}};
const root=document.getElementById("mocktest-section");
const letters=["A","B","C","D"];
function render(){
root.replaceChildren();
const top=document.createElement("div");top.className="mock-header";
const done=checked.filter(Boolean).length,score=checked.reduce((n,c,i)=>n+(c&&answers[i]===questions[i][4]?1:0),0);
top.innerHTML='<div><p class="eyebrow">PRACTICE EXAM · 25 QUESTIONS</p><h2>Mocktest Adventure ★★★★</h2><p>Choose A, B, C or D, then tap <b>Check</b> on each card. Keep trying until you get it right!</p></div><div class="mock-score"><strong>'+score+' / 25</strong><small>Correct answers</small><span>'+done+' checked</span></div>';root.append(top);
const grid=document.createElement("div");grid.className="mock-grid";
questions.forEach((q,i)=>{
const card=document.createElement("article");card.className="mock-card"+(checked[i]&&answers[i]===q[4]?" passed":checked[i]?" failed":"");
const title=document.createElement("div");title.className="mock-card-top";title.innerHTML='<span>QUESTION '+String(i+1).padStart(2,"0")+'</span><small>'+q[0]+'</small>';card.append(title);
const prompt=document.createElement("h3");prompt.textContent=q[1];card.append(prompt);
const visual=document.createElement("div");visual.className="mock-visual";visual.textContent=q[2];card.append(visual);
const choices=document.createElement("div");choices.className="mock-choices";
q[3].forEach((opt,j)=>{const b=document.createElement("button");b.type="button";b.className="mock-option"+(answers[i]===j?" selected":"");b.innerHTML="<b>"+letters[j]+"</b> ";b.append(document.createTextNode(opt));b.disabled=checked[i]&&answers[i]===q[4];b.setAttribute("aria-pressed",String(answers[i]===j));b.onclick=()=>{answers[i]=j;checked[i]=false;save();render();};choices.append(b);});card.append(choices);
const foot=document.createElement("div");foot.className="mock-foot";const status=document.createElement("span");status.textContent=checked[i]?(answers[i]===q[4]?"✓ Great job!":"✕ Try again!"):"Choose an answer";foot.append(status);
const btn=document.createElement("button");btn.type="button";btn.className="mock-check";btn.textContent=checked[i]&&answers[i]===q[4]?"Correct ✓":"Check answer";btn.disabled=answers[i]===undefined||(checked[i]&&answers[i]===q[4]);btn.onclick=()=>{checked[i]=true;save();render();};foot.append(btn);card.append(foot);grid.append(card);
});root.append(grid);
}
window.MathMocktest={render};
})();
