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

const K="little-math-mocktest-v2";
const sourceTests=Array.isArray(window.TimoBookTests)?window.TimoBookTests:[];
const examList=[{id:"practice",title:"Practice Mocktest · 2025",type:"choice",questions:questions.map(q=>({topic:q[0],prompt:q[1],visual:q[2],options:q[3],answer:["A","B","C","D"][q[4]],visualRequired:false}))},...sourceTests];
const root=document.getElementById("mocktest-section");
let saved={};try{saved=JSON.parse(localStorage.getItem(K))||{};}catch(e){}
let selected=examList.some(x=>x.id===saved.selected)?saved.selected:"practice";
const histories=saved.histories&&typeof saved.histories==="object"?saved.histories:{};
const letters=["A","B","C","D"];
const save=()=>{try{localStorage.setItem(K,JSON.stringify({selected,histories}));}catch(e){}};
function activeExam(){return examList.find(x=>x.id===selected)||examList[0];}
function history(){return histories[selected]||(histories[selected]={answers:{},checked:{}});}
function normalize(v){return String(v??"").trim().replace(/\s+/g," ").toLowerCase();}
function isCorrect(q,a){return q.answer!==null&&q.answer!==undefined&&normalize(a)===normalize(q.answer);}
function render(){
root.replaceChildren();
const exam=activeExam(),state=history(),done=exam.questions.filter((q,i)=>state.checked[i]).length,score=exam.questions.filter((q,i)=>state.checked[i]&&isCorrect(q,state.answers[i])).length;
const header=document.createElement("div");header.className="mock-header";
const desc=document.createElement("div");desc.innerHTML='<p class="eyebrow">MATH MOCKTEST · 25 QUESTIONS</p><h2>Mocktest Adventure ★★★★</h2><p>Check each card as you go. Choose a test to practice!</p>';
header.append(desc);
const side=document.createElement("div");side.className="mock-header-side";
const board=document.createElement("div");board.className="mock-score";board.innerHTML="<strong>"+score+" / 25</strong><small>Correct answers</small><span>"+done+" checked</span>";side.append(board);
const selector=document.createElement("select");selector.id="mocktest-picker";selector.className="mock-picker";selector.setAttribute("aria-label","Choose a mocktest");
examList.forEach(t=>{const o=document.createElement("option");o.value=t.id;o.textContent=t.title;selector.append(o);});selector.value=selected;selector.onchange=()=>{selected=selector.value;save();render();};side.append(selector);header.append(side);root.append(header);
const grid=document.createElement("div");grid.className="mock-grid";
exam.questions.forEach((q,i)=>{
const response=state.answers[i],graded=!!state.checked[i],correct=graded&&isCorrect(q,response);
const card=document.createElement("article");card.className="mock-card"+(graded?(correct?" passed":" failed"):"");
const title=document.createElement("div");title.className="mock-card-top";title.innerHTML="<span>QUESTION "+String(i+1).padStart(2,"0")+"</span><small>"+q.topic+"</small>";card.append(title);
const drawing=(selected==="practice"||!window.MockIllustrations)?null:window.MockIllustrations.render(q,i,selected);
const prompt=document.createElement("h3");prompt.textContent=drawing?.prompt||q.prompt||"Look at the figure and answer.";card.append(prompt);
if(q.visual){const visual=document.createElement("div");visual.className="mock-visual";visual.textContent=q.visual;card.append(visual);}
if(drawing?.html){const picture=document.createElement("div");picture.className="mock-drawing";picture.innerHTML=drawing.html;card.append(picture);if(drawing.adapted){const note=document.createElement("p");note.className="mock-adapted-note";note.textContent="Practice illustration · adapted from the source question";card.append(note);}}
else if(q.visualRequired){const note=document.createElement("p");note.className="mock-source-note";note.textContent="This question needs a clearer diagram · source PDF page "+q.page;card.append(note);}
if(exam.type==="choice"){
const choices=document.createElement("div");choices.className="mock-choices";
(drawing?.options||q.options||["A","B","C","D"]).forEach((opt,j)=>{const b=document.createElement("button");b.type="button";b.className="mock-option"+(response===letters[j]?" selected":"");const key=document.createElement("b");key.textContent=letters[j]+" ";b.append(key,document.createTextNode(opt||"See figure"));b.disabled=correct;b.setAttribute("aria-pressed",String(response===letters[j]));b.onclick=()=>{state.answers[i]=letters[j];state.checked[i]=false;save();render();};choices.append(b);});card.append(choices);
}else{
const input=document.createElement("input");input.className="mock-input";input.type="text";input.autocomplete="off";input.placeholder="Type your answer";input.value=response||"";input.disabled=correct;input.setAttribute("aria-label","Answer for question "+(i+1));input.oninput=()=>{state.answers[i]=input.value;state.checked[i]=false;save();};card.append(input);
}
const foot=document.createElement("div");foot.className="mock-foot";const status=document.createElement("span");status.textContent=graded?(correct?"✓ Great job!":q.answer==null?"Answer needs verification":"✕ Try again!"):"Choose an answer";foot.append(status);
const btn=document.createElement("button");btn.type="button";btn.className="mock-check";btn.textContent=correct?"Correct ✓":"Check answer";btn.disabled=correct||q.answer==null||(exam.type==="choice"?response===undefined:!response);btn.onclick=()=>{state.checked[i]=true;save();render();};foot.append(btn);card.append(foot);grid.append(card);
});root.append(grid);save();
}
window.MathMocktest={render};
})();
