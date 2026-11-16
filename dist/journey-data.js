export const questIds=['pond','corridor','code','web','outbreak'];
export const badgeDefinitions=[
 {id:'first',name:'Mầm tò mò',description:'Hoàn thành một bài học.',test:s=>s.completed.length>0},
 {id:'observer',name:'Mắt nhìn vi mô',description:'Lưu quan sát từ một tiêu bản.',test:s=>s.observedSlides.length>0},
 {id:'experimenter',name:'Nhà thực nghiệm',description:'Ghi kết quả ở hai trạm khác nhau.',test:s=>s.completedLabs.length>=2},
 {id:'writer',name:'Người giữ dấu vết',description:'Lưu ít nhất một ghi chép.',test:s=>s.notes.length>0},
 {id:'quest',name:'Người giải mã',description:'Hoàn thành một nhiệm vụ BioQuest.',test:s=>s.completedQuests.length>0},
 {id:'guardian',name:'Người kết nối sự sống',description:'Hoàn thành năm nhiệm vụ BioQuest.',test:s=>s.completedQuests.length===5},
 {id:'streak',name:'Nhịp học xanh',description:'Có hoạt động học trong ba ngày liên tiếp.',test:s=>longestStreak(s.activityDays)>=3},
 {id:'explorer',name:'Người đọc sinh cảnh',description:'Khám phá ít nhất ba địa điểm BioMap.',test:s=>s.visitedSites.length>=3}
];
export function dayKey(date=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit'}).format(date)}
export function validDay(value){return typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&!Number.isNaN(Date.parse(value+'T00:00:00Z'))&&new Date(value+'T00:00:00Z').toISOString().slice(0,10)===value}
const dayNumber=d=>Date.parse(d+'T00:00:00Z')/86400000;
export function longestStreak(days){const list=[...new Set(days.filter(validDay))].sort();let best=0,n=0,previous=-Infinity;for(const d of list){const value=dayNumber(d);n=value===previous+1?n+1:1;previous=value;best=Math.max(best,n)}return best}
export function currentStreak(days,today=dayKey()){const values=[...new Set(days.filter(validDay))].sort().map(dayNumber),current=dayNumber(today);if(!values.length||values.at(-1)<current-1||values.at(-1)>current)return 0;let n=1;for(let i=values.length-2;i>=0&&values[i]===values[i+1]-1;i--)n++;return n}
export function levelFor(xp){const thresholds=[0,120,300,550,850,1200,1650],names=['Mầm tò mò','Người quan sát','Người đặt câu hỏi','Nhà thực nghiệm','Người kết nối','Nhà khám phá','Người truyền cảm hứng'];let i=0;while(i<thresholds.length-1&&xp>=thresholds[i+1])i++;const next=thresholds[i+1]??thresholds[i]+500;return {level:i+1,name:names[i],start:thresholds[i],next,progress:Math.min(1,(xp-thresholds[i])/(next-thresholds[i]))}}
export function markActivity(s,date=new Date()){const key=dayKey(date);s.activityDays=[...new Set([...(s.activityDays||[]),key])].sort().slice(-400);return key}
export function dueTopics(attempts){const latest=new Map();for(const a of attempts)latest.set(a.lessonId,a);return [...latest.values()].filter(a=>!a.correct).slice(-5).reverse().map(a=>a.lessonId)}
export function cleanJourney(raw){const unique=(value,allowed)=>[...new Set(Array.isArray(value)?value:[])].filter(x=>typeof x==='string'&&(!allowed||allowed.includes(x)));
 const groupRounds=(Array.isArray(raw.groupRounds)?raw.groupRounds:[]).filter(r=>r&&typeof r.id==='string'&&[6,7,8,9,10,11,12].includes(r.grade)&&typeof r.date==='string'&&!Number.isNaN(Date.parse(r.date))&&Array.isArray(r.entries)).slice(0,10).map(r=>({id:r.id.slice(0,80),grade:r.grade,date:r.date,entries:r.entries.filter(e=>e&&typeof e.name==='string'&&Number.isInteger(e.correct)&&Number.isInteger(e.total)&&e.total>0&&e.total<=3&&e.correct>=0&&e.correct<=e.total).slice(0,6).map(e=>({name:e.name.slice(0,30),correct:e.correct,total:e.total}))})).filter(r=>r.entries.length>=2);
 return {groupRounds,activityDays:unique(raw.activityDays).filter(validDay).filter(d=>d<=dayKey()).sort().slice(-400),completedQuests:unique(raw.completedQuests,questIds),observedSlides:unique(raw.observedSlides,['tomato','euglena','paramecium','onion','blood']),visitedSites:unique(raw.visitedSites,['cucphuong','xuanthuy','phongnha','cangio','tramchim','condao','babe','catsien']),earnedBadgeIds:unique(raw.earnedBadgeIds,badgeDefinitions.map(b=>b.id)),quizAttempts:(Array.isArray(raw.quizAttempts)?raw.quizAttempts:[]).filter(a=>a&&typeof a.lessonId==='string'&&typeof a.correct==='boolean'&&typeof a.date==='string'&&!Number.isNaN(Date.parse(a.date))).slice(-200).map(a=>({lessonId:a.lessonId.slice(0,60),correct:a.correct,date:a.date}))};
}
