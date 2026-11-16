export const divisionStages={
 mitosis:[
 {name:'Chuẩn bị · G₁',text:'Tế bào minh họa có 2n = 4. Mỗi nhiễm sắc thể chưa nhân đôi gồm một chromatid.',cells:1,nst:4,paired:false,replicated:false},
 {name:'Sau pha S · G₂',text:'DNA đã được nhân đôi. Vẫn có 4 nhiễm sắc thể, mỗi chiếc gồm hai chromatid chị em; lượng DNA tăng gấp đôi.',cells:1,nst:4,replicated:true},
 {name:'Kì đầu',text:'Nhiễm sắc thể co xoắn; thoi phân bào hình thành. Trong mô hình, màng nhân được lược giản.',cells:1,nst:4,replicated:true},
 {name:'Kì giữa',text:'Các nhiễm sắc thể kép sắp xếp tại mặt phẳng xích đạo. Nhiễm sắc thể tương đồng không ghép cặp như trong giảm phân I.',cells:1,nst:4,replicated:true,equator:true},
 {name:'Kì sau',text:'Các chromatid chị em tách nhau và trở thành nhiễm sắc thể đơn. Khi chưa phân chia tế bào chất, tế bào này có 8 nhiễm sắc thể đơn, mỗi cực nhận 4.',cells:1,nst:8,replicated:false,separated:true},
 {name:'Kì cuối & phân chia tế bào chất',text:'Hình thành hai tế bào con. Mỗi tế bào trong mô hình có bộ 2n = 4, như tế bào ban đầu trước nhân đôi DNA.',cells:2,nst:4,replicated:false}
 ],
 meiosis:[
 {name:'Chuẩn bị · G₁',text:'Tế bào khởi đầu minh họa có 2n = 4, gồm hai cặp nhiễm sắc thể tương đồng.',cells:1,nst:4,replicated:false},
 {name:'Sau pha S',text:'DNA nhân đôi một lần trước giảm phân I. Mỗi nhiễm sắc thể gồm hai chromatid chị em.',cells:1,nst:4,replicated:true},
 {name:'Kì đầu I',text:'Nhiễm sắc thể tương đồng tiếp hợp. Trao đổi chéo có thể diễn ra giữa các chromatid không chị em; mô hình chỉ minh họa sự ghép cặp.',cells:1,nst:4,replicated:true,paired:true},
 {name:'Kì giữa I',text:'Hai cặp tương đồng sắp xếp trên mặt phẳng xích đạo. Sự định hướng của các cặp góp phần tạo tổ hợp khác nhau.',cells:1,nst:4,replicated:true,paired:true,equator:true},
 {name:'Kì sau I',text:'Các nhiễm sắc thể tương đồng phân li về hai cực; chromatid chị em vẫn gắn với nhau.',cells:1,nst:4,replicated:true,separated:true},
 {name:'Kết thúc giảm phân I',text:'Hai tế bào có n = 2 nhiễm sắc thể kép. Không có một lần nhân đôi DNA mới trước giảm phân II.',cells:2,nst:2,replicated:true},
 {name:'Kì giữa II',text:'Ở mỗi tế bào, các nhiễm sắc thể kép sắp xếp trên mặt phẳng xích đạo.',cells:2,nst:2,replicated:true,equator:true},
 {name:'Kì sau II',text:'Chromatid chị em tách nhau. Mỗi tế bào đang phân chia có 4 nhiễm sắc thể đơn, mỗi cực nhận 2.',cells:2,nst:4,replicated:false,separated:true},
 {name:'Kết thúc giảm phân II',text:'Mô hình tạo bốn tế bào n = 2. Một lần nhân đôi DNA, hai lần phân bào; không đồng nhất số tế bào tạo ra với số giao tử chức năng ở mọi loài.',cells:4,nst:2,replicated:false}
 ]
};
export function divisionState(mode,index){const list=divisionStages[mode]||divisionStages.mitosis;return list[Math.max(0,Math.min(list.length-1,Math.round(index)))]}
export function breathingModel(progress){const phase=((Number(progress)%100)+100)%100,inhale=phase<50,expansion=(1-Math.cos(phase/100*Math.PI*2))/2;return {phase,inhale,expansion,label:inhale?'Hít vào':'Thở ra',text:inhale?'Cơ hoành co, hạ xuống; lồng ngực tăng thể tích, áp suất trong phế nang giảm tương đối, không khí đi vào.':'Trong thở yên tĩnh, các cơ hít vào giãn, mô đàn hồi co hồi; thể tích giảm và không khí đi ra.'}}
