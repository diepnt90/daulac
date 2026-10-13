(function(){
"use strict";
const KEY="little-math-language-v1";
let language="en";try{language=localStorage.getItem(KEY)==="vi"?"vi":"en";}catch(e){}
const dict={
"Little Math Garden":"Vườn Toán Nhỏ",
"A little progress every day":"Mỗi ngày tiến bộ một chút",
"Let's Do Math!":"Cùng làm toán nào!",
"Learn and Have Fun!":"Học mà chơi!",
"Pick a card, enter your answer, and see how you did!":"Chọn một thẻ, điền đáp án và xem kết quả nhé!",
"Your challenges":"Bài tập của em",
"Tap a card to begin":"Chạm vào thẻ để bắt đầu",
"DAILY CHALLENGE":"THỬ THÁCH MỖI NGÀY",
"Keep your streak going!":"Cùng học đều mỗi ngày!",
"Finish and check 20 problems each day.":"Làm và kiểm tra 20 bài mỗi ngày nhé!",
"Day streak":"Ngày liên tiếp",
"Correct answers":"Câu đúng",
"checked":"đã kiểm tra",
"days practiced":"ngày đã học",
"day practiced":"ngày đã học",
"Check Answers →":"Kiểm tra kết quả →",
"Check Again →":"Kiểm tra lại →",
"↻ New set":"↻ Bộ đề mới",
"Answer all 20 problems to unlock Check Answers.":"Làm đủ 20 bài để mở nút kiểm tra nhé.",
"You answered all 20! Ready to check?":"Đã làm đủ 20 bài! Cùng kiểm tra nào!",
"All problems have been checked.":"Đã kiểm tra tất cả bài.",
"Correct the pink cards, then check again.":"Sửa các thẻ màu hồng rồi kiểm tra lại.",
"○ Not started":"○ Chưa làm",
"● Answered":"● Đã làm",
"✓ Correct":"✓ Đúng",
"✕ Try again":"✕ Thử lại nhé",
"Close problem":"Đóng bài toán",
"Tap the number keys to enter your answer":"Bấm các phím số để điền đáp án",
"Save & Next →":"Lưu & Tiếp →",
"← Previous":"← Bài trước",
"Next →":"Bài sau →",
"Enter your answer first.":"Hãy điền đáp án trước nhé.",
"Try another answer!":"Thử đáp án khác nhé!",
"You got this one right!":"Em đã làm đúng!",
"✓ Correct! Great job!":"✓ Chính xác! Giỏi lắm!",
"SUPER STAR!":"SIÊU SAO!",
"Great effort!":"Em đã rất cố gắng!",
"Hooray! ⭐":"Hoan hô! ⭐",
"Let's try again 💪":"Cùng thử lại nhé 💪",
"20 out of 20! You're a math champion!":"20 trên 20! Em là nhà vô địch toán học!",
"Happy learning · Made for iPad, phone, and desktop":"Học vui mỗi ngày · Dành cho iPad, điện thoại và máy tính",
"Mocktest Adventure ★★★★":"Thử sức cùng đề thi ★★★★",
"MATH MOCKTEST · 25 QUESTIONS":"ĐỀ LUYỆN THI · 25 CÂU",
"Choose a test to practice!":"Hãy chọn một bộ đề để luyện tập!",
"Check each card as you go. Choose a test to practice!":"Kiểm tra ngay từng câu. Chọn một bộ đề để luyện tập nhé!",
"Choose an answer":"Chọn đáp án",
"Check answer":"Kiểm tra",
"Correct ✓":"Đúng ✓",
"✓ Great job!":"✓ Giỏi lắm!",
"✕ Try again!":"✕ Thử lại nhé!",
"Answer needs verification":"Đáp án cần xác minh",
"Type your answer":"Nhập đáp án",
"Practice illustration · adapted from the source question":"Hình luyện tập · minh họa tương tự câu hỏi gốc",
"Clear Answers":"Xóa đáp án",
"Clear answers for this test? All 25 responses and checked results will be deleted.":"Xóa toàn bộ đáp án của bộ đề này? Cả 25 câu và kết quả kiểm tra sẽ bị xóa.",
"Answers cleared.":"Đã xóa đáp án.",
"Logical Thinking":"Tư duy logic",
"Logic":"Tư duy logic",
"Arithmetic":"Số học",
"Number Theory":"Lý thuyết số",
"Geometry":"Hình học",
"Combinatorics":"Tổ hợp",
"Addition within 10":"Cộng trong phạm vi 10",
"Addition under 20":"Cộng có tổng nhỏ hơn 20",
"Addition within 20":"Cộng trong phạm vi 20",
"Subtraction within 10":"Trừ trong phạm vi 10",
"Subtraction within 20":"Trừ trong phạm vi 20",
"Addition across 10":"Cộng qua 10",
"Subtraction across 10":"Trừ qua 10",
"Mixed + and − within 20":"Cộng trừ hỗn hợp trong phạm vi 20",
"Doubles & near doubles":"Cộng số giống nhau và gần giống",
"Find the missing number · 10":"Tìm số còn thiếu · 10",
"Missing number · Addition 20":"Điền số còn thiếu · Cộng 20",
"Missing number · Subtraction 10":"Điền số còn thiếu · Trừ 10",
"Missing number · Subtraction 20":"Điền số còn thiếu · Trừ 20",
"Mixed missing numbers · 20":"Điền số còn thiếu · Hỗn hợp 20",
"Add numbers up to 10":"Cộng hai số nhỏ hơn 10",
"Mocktest · 25 Questions":"Đề thi thử · 25 câu",
"Practice Mocktest · 2025":"Đề luyện tập · 2025",
"Preliminary Round":"Vòng loại",
"Heat Round":"Vòng quốc gia",
"Test":"Đề",
"How many children are here?":"Có bao nhiêu bạn nhỏ?",
"What comes next?":"Hình tiếp theo là gì?",
"Tomorrow is Monday. What day is today?":"Ngày mai là thứ Hai. Hôm nay là thứ mấy?",
"Find the missing number.":"Tìm số còn thiếu.",
"Which shape is different?":"Hình nào khác các hình còn lại?",
"Calculate.":"Tính kết quả.",
"Which equation is true?":"Phép tính nào đúng?",
"Choose one.":"Chọn một đáp án.",
"What is the smallest two-digit even number?":"Số chẵn có hai chữ số nhỏ nhất là số nào?",
"How many even numbers from 8 to 17?":"Có bao nhiêu số chẵn từ 8 đến 17?",
"How many odd numbers can you find?":"Có bao nhiêu số lẻ?",
"How many triangles are here?":"Có bao nhiêu hình tam giác?",
"How many squares are here?":"Có bao nhiêu hình vuông?",
"How many cubes are shown?":"Có bao nhiêu khối lập phương?",
"How many sides does a pentagon have?":"Hình ngũ giác có bao nhiêu cạnh?",
"Which shape has no corners?":"Hình nào không có góc?",
"How many sides does this shape have?":"Hình này có bao nhiêu cạnh?",
"Which labeled object is the heaviest?":"Vật nào nặng nhất?",
"Which labeled object is the lightest?":"Vật nào nhẹ nhất?",
"Which fruit comes next in the pattern?":"Quả nào tiếp theo trong dãy?",
"What letter comes next?":"Chữ cái tiếp theo là gì?",
"Find the missing number in this equation.":"Điền số còn thiếu trong phép tính.",
"How many objects are there in this practice picture?":"Có bao nhiêu đồ vật trong hình?",
"Which number comes next?":"Số tiếp theo là số nào?",
"Which labeled shape has the star?":"Hình nào có ngôi sao?",
"Look at the figure and answer.":"Nhìn hình và trả lời.",
"Triangle":"Tam giác","Square":"Hình vuông","Circle":"Hình tròn","Star":"Ngôi sao",
"Monday":"Thứ Hai","Tuesday":"Thứ Ba","Wednesday":"Thứ Tư","Thursday":"Thứ Năm","Friday":"Thứ Sáu","Saturday":"Thứ Bảy","Sunday":"Chủ Nhật",
"Even":"Chẵn","Odd":"Lẻ"
};
function translate(s){
if(language!=="vi")return s;
if(dict[s])return dict[s];
let x=s;
const patterns=[
[/^Completed (\d+) \/ 20$/,(_,n)=>"Đã làm "+n+" / 20"],
[/^Correct (\d+) \/ 20$/,(_,n)=>"Đúng "+n+" / 20"],
[/^(\d+) to retry$/,(_,n)=>n+" bài cần làm lại"],
[/^(\d+) (?:days|day) practiced$/,(_,n)=>n+" ngày đã học"],
[/^Problem (\d+) \/ 20$/,(_,n)=>"Bài "+n+" / 20"],
[/^NO\. (\d+)$/,(_,n)=>"BÀI "+n],
[/^QUESTION (\d+)$/,(_,n)=>"CÂU "+n],
[/^(\d+) checked$/,(_,n)=>n+" câu đã kiểm tra"],
[/^Find the value of (.+)\.$/,(_,expr)=>"Tính: "+expr+"."],
[/^What is the value of (.+)\?$/,(_,expr)=>"Giá trị của "+expr+" là bao nhiêu?"],
[/^How many (.+) are there (?:in|on) (.+)\?$/i,(_,what,where)=>"Có bao nhiêu "+what+" ở "+where+"?"],
[/^Count the (.+)\. How many (.+) are there\?$/i,(_,a)=>"Đếm số "+a+" trong hình."],
[/^Which (.+) is (?:the )?smallest\?$/i,(_,a)=>a+" nào nhỏ nhất?"],
[/^According to the pattern (.+)$/i,()=>"Quan sát quy luật và chọn đáp án đúng."],
[/^What is (\d+) ([+−-]) (\d+)\?$/,(_,a,op,b)=>"Tính "+a+" "+op+" "+b+"."],
[/^Preliminary Round · Test (\d+)$/,(_,n)=>"Vòng loại · Đề "+n],
[/^Heat Round · Test (\d+)$/,(_,n)=>"Vòng quốc gia · Đề "+n]
];
for(const [re,cb] of patterns)if(re.test(s))return s.replace(re,cb);
return x;
}
const origins=new WeakMap();
function apply(root=document.body){
document.documentElement.lang=language;
document.querySelectorAll("#language-toggle").forEach(btn=>{btn.textContent=language==="vi"?"🇻🇳 Tiếng Việt ▾":"🇬🇧 English ▾";btn.setAttribute("aria-label",language==="vi"?"Chuyển sang tiếng Anh":"Switch to Vietnamese");});
const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){return n.parentElement&&["SCRIPT","STYLE","OPTION"].indexOf(n.parentElement.tagName)<0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
let n;while(n=walker.nextNode()){
if(!origins.has(n))origins.set(n,n.nodeValue);
const source=origins.get(n);const match=source.match(/^(\s*)([\s\S]*?)(\s*)$/);
if(match&&match[2])n.nodeValue=match[1]+translate(match[2])+match[3];
}
root.querySelectorAll("input[placeholder]").forEach(el=>{if(!el.dataset.enPlaceholder)el.dataset.enPlaceholder=el.placeholder;el.placeholder=translate(el.dataset.enPlaceholder);});
root.querySelectorAll("select option").forEach(opt=>{if(!opt.dataset.enText)opt.dataset.enText=opt.textContent;opt.textContent=translate(opt.dataset.enText);});
}
function setLanguage(v){language=v==="vi"?"vi":"en";try{localStorage.setItem(KEY,language);}catch(e){}document.dispatchEvent(new Event("language-changed"));apply();}
window.SiteI18n={apply,translate,setLanguage,get language(){return language;}};
document.addEventListener("DOMContentLoaded",()=>{document.querySelector("#language-toggle")?.addEventListener("click",()=>setLanguage(language==="en"?"vi":"en"));apply();});
})();