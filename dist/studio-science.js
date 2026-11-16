// Standard genetic code, NCBI translation table 1. All sequences are teaching fragments.
const bases='TCAG',aas='FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
export const geneticCode=Object.fromEntries([...bases].flatMap((a,i)=>[...bases].flatMap((b,j)=>[...bases].map((c,k)=>[a+b+c,aas[i*16+j*4+k]]))));
export const aminoAcids={A:['Ala','Alanine'],R:['Arg','Arginine'],N:['Asn','Asparagine'],D:['Asp','Aspartate'],C:['Cys','Cysteine'],Q:['Gln','Glutamine'],E:['Glu','Glutamate'],G:['Gly','Glycine'],H:['His','Histidine'],I:['Ile','Isoleucine'],L:['Leu','Leucine'],K:['Lys','Lysine'],M:['Met','Methionine'],F:['Phe','Phenylalanine'],P:['Pro','Proline'],S:['Ser','Serine'],T:['Thr','Threonine'],W:['Trp','Tryptophan'],Y:['Tyr','Tyrosine'],V:['Val','Valine'],'*':['STOP','Kết thúc']};
export const teachingDNA='ATGGAATTTGGCTCGAAGTAA';
export const studioMilestones=['scale','gene-silent','gene-missense','gene-stop','gene-frame','immune-bacteria','immune-virus','mentor-mendel','mentor-darwin','mentor-franklin','mentor-pasteur','field-osmosis','field-germination','field-leaf'];
export function analyzeDNA(input){
 const dna=String(input).toUpperCase().replace(/\s+/g,'');
 if(!dna||dna.length>90||/[^ACGT]/.test(dna))return {valid:false,dna,error:!dna?'Hãy nhập một đoạn DNA.':dna.length>90?'Giới hạn 90 nucleotide cho đoạn minh họa.':'Chỉ dùng A, C, G, T và khoảng trắng. Các ký tự khác chưa được chấp nhận.'};
 const template=[...dna].map(b=>({A:'T',T:'A',C:'G',G:'C'}[b])).join(''),mrna=dna.replaceAll('T','U');
 const codons=Array.from({length:Math.ceil(dna.length/3)},(_,i)=>dna.slice(i*3,i*3+3));let stopped=false,stopIndex=-1;
 const translated=codons.map((codon,index)=>{const afterStop=stopped,aa=codon.length===3?geneticCode[codon]:null;if(!afterStop&&aa==='*'){stopped=true;stopIndex=index}return {codon,rna:codon.replaceAll('T','U'),aa,index,afterStop}});
 const starts=dna.startsWith('ATG'),protein=starts?translated.filter(c=>!c.afterStop&&c.aa&&c.aa!=='*').map(c=>c.aa):[];
 return {valid:true,dna,template,mrna,codons:translated,protein,starts,stopIndex,partial:dna.length%3,terminated:starts&&stopIndex>=0};
}
export function compareDNA(original,input){const a=analyzeDNA(original),b=analyzeDNA(input);if(!a.valid||!b.valid)return {type:'invalid',label:'Chưa thể so sánh',text:b.error||a.error};
 if(a.dna===b.dna)return {type:'same',label:'Đoạn đối chứng',text:'Bạn đang giữ nguyên trình tự. Hãy đổi một base, thêm hoặc bớt nucleotide để thử một giả thuyết.'};
 if(!b.starts)return {type:'start-loss',label:'Mất codon khởi đầu trong mô hình',text:'Ba base đầu không còn là ATG. Mô hình chỉ dịch từ vị trí đầu đã chọn, không tự tìm một khung đọc khác.'};
 if((b.dna.length-a.dna.length)%3!==0)return {type:'frame',label:'Dịch khung đọc',text:'Thêm hoặc mất số nucleotide không chia hết cho 3 làm đổi cách chia các bộ ba phía sau vị trí thay đổi. Không thể suy ra kiểu hình chỉ từ đoạn này.'};
 if(a.protein.join('')===b.protein.join(''))return {type:'silent',label:'Chuỗi amino acid được giữ lại',text:'Trong vùng đã dịch, trình tự amino acid không đổi. Thay đổi có thể là đồng nghĩa hoặc nằm sau điểm dừng; điều này chưa chứng minh mọi chức năng sinh học đều giữ nguyên.'};
 if(b.stopIndex>=0&&(a.stopIndex<0||b.stopIndex<a.stopIndex))return {type:'stop',label:'Xuất hiện điểm dừng sớm',text:'Một bộ ba nay báo kết thúc sớm hơn đối chứng. Chuỗi minh họa ngắn đi; ảnh hưởng thực tế phụ thuộc protein và bối cảnh.'};
 if(a.dna.length!==b.dna.length)return {type:'in-frame',label:'Thêm / mất theo bộ ba',text:'Số nucleotide thay đổi chia hết cho 3. Khung bộ ba không bị dịch, nhưng chuỗi amino acid có thể dài, ngắn hoặc khác đi.'};
 return {type:'missense',label:'Thay đổi amino acid',text:'Ít nhất một amino acid khác đối chứng. Một thay thế không đồng nghĩa với tốt hơn hoặc xấu hơn; cần bằng chứng về cấu trúc và chức năng.'};
}
export const geneChallenges=[
 {id:'silent',name:'Đổi chữ, giữ nghĩa',prompt:'Chỉ thay một base ở bộ ba GAA để giữ Glu và giữ nguyên toàn bộ chuỗi amino acid.',hint:'GAA và GAG cùng mã hóa glutamate trong bảng mã chuẩn.',preset:'ATGGAGTTTGGCTCGAAGTAA'},
 {id:'missense',name:'Một mắt xích khác',prompt:'Chỉ thay một base ở GAA để làm đổi một amino acid, giữ nguyên độ dài và điểm dừng.',hint:'Thử GAA → GCA. Hãy đối chiếu cả chuỗi, không chỉ màu của một base.',preset:'ATGGCATTTGGCTCGAAGTAA'},
 {id:'stop',name:'Khi câu kết thúc sớm',prompt:'Biến TTT thành một codon dừng bằng một hoặc hai thay thế; giữ nguyên số nucleotide.',hint:'Trong mã chuẩn, TAA, TAG và TGA là các bộ ba dừng trên mạch mã hóa DNA.',preset:'ATGGAATAAGGCTCGAAGTAA'},
 {id:'frame',name:'Lệch một nhịp',prompt:'Xóa đúng một nucleotide sau ATG. Quan sát cách các bộ ba phía sau được chia lại.',hint:'Xóa một T ở bộ ba TTT. Việc xóa diễn ra sau codon khởi đầu.',preset:'ATGGAATTGGCTCGAAGTAA'}
];
export function matchesGeneChallenge(id,input){const b=analyzeDNA(input);if(!b.valid)return false;const c=compareDNA(teachingDNA,b.dna);const changes=b.dna.length===teachingDNA.length?[...b.dna].filter((x,i)=>x!==teachingDNA[i]).length:Infinity;
 if(id==='silent')return c.type==='silent'&&changes===1&&b.dna.slice(0,3)===teachingDNA.slice(0,3)&&b.dna.slice(6)===teachingDNA.slice(6);
 if(id==='missense')return c.type==='missense'&&changes===1&&b.protein.length===analyzeDNA(teachingDNA).protein.length&&b.dna.slice(6)===teachingDNA.slice(6);
 if(id==='stop')return c.type==='stop'&&b.dna.length===teachingDNA.length&&b.dna.slice(0,6)===teachingDNA.slice(0,6)&&b.dna.slice(9)===teachingDNA.slice(9);
 return id==='frame'&&c.type==='frame'&&b.dna.length===teachingDNA.length-1&&[...teachingDNA].some((_,i)=>i>=3&&teachingDNA.slice(0,i)+teachingDNA.slice(i+1)===b.dna);
}
export const scaleStops=[
 {id:'forest',name:'Khu rừng',size:20,label:'20 m',tag:'HỆ SINH THÁI',title:'Không một sự sống nào đứng riêng.',text:'Cây, đất, nước và các sinh vật tạo thành mạng lưới tương tác. Mốc 20 m là kích thước cảnh minh họa, không phải kích thước cố định của một hệ sinh thái.',question:'Đổi ánh sáng hoặc nguồn nước, những thành phần nào có thể thay đổi theo?'},
 {id:'leaf',name:'Chiếc lá',size:.05,label:'5 cm',tag:'CƠ QUAN',title:'Một chiếc lá, nhiều công việc.',text:'Lá gồm nhiều mô phối hợp trong quang hợp, trao đổi khí và thoát hơi nước. Lá ở đây rộng khoảng 5 cm để làm mốc so sánh.',question:'Mắt thường nhìn thấy gân lá. Những gì cần kính hiển vi mới thấy?'},
 {id:'tissue',name:'Mô lá',size:.0003,label:'300 µm',tag:'MÔ THỰC VẬT',title:'Một lát cắt mở ra nhiều lớp.',text:'Mô hình lát cắt chọn lọc: biểu bì, mô quang hợp, khoảng gian bào và bó mạch. Các loại lá có cấu trúc khác nhau; sơ đồ không đại diện mọi loài.',question:'Vì sao khoảng gian bào lại giúp quá trình trao đổi khí?'},
 {id:'cell',name:'Tế bào',size:.00005,label:'50 µm',tag:'ĐƠN VỊ SỐNG',title:'Nhỏ bé, nhưng không đơn giản.',text:'Mốc 50 µm đại diện một tế bào mô lá minh họa. Thành tế bào, không bào, nhân và lục lạp có nhiệm vụ khác nhau; tế bào thực vật cũng có ti thể.',question:'Lục lạp và ti thể có cùng nhiệm vụ không?'},
 {id:'nucleus',name:'Nhân',size:.000008,label:'8 µm',tag:'THÔNG TIN DI TRUYỀN',title:'Thông tin được tổ chức.',text:'Trong nhân, DNA liên kết với protein tạo chromatin. Nhiễm sắc thể cô đặc rõ nhất ở một số giai đoạn phân bào; chúng không luôn có dạng chữ X.',question:'Điều gì thay đổi giữa chromatin và nhiễm sắc thể cô đặc?'},
 {id:'dna',name:'DNA',size:2e-9,label:'2 nm',tag:'PHÂN TỬ',title:'Hai mạch. Một nguyên tắc bổ sung.',text:'Đường kính DNA dạng B khoảng 2 nm. A bổ sung T, G bổ sung C. Màu sắc ở sơ đồ là quy ước, không phải màu DNA nhìn thấy bằng mắt.',question:'Hai đoạn DNA có cùng chiều dài có nhất thiết mang cùng thông tin?'},
 {id:'atom',name:'Nguyên tử',size:1.5e-10,label:'≈ 0,15 nm',tag:'GIỚI HẠN CỦA HÌNH MINH HỌA',title:'Từ sự sống đến vật chất.',text:'Một nguyên tử carbon có kích thước cỡ một phần mười nanomet, tùy định nghĩa bán kính. Mây electron là sơ đồ xác suất; electron không chạy trên những vòng tròn cố định như hành tinh.',question:'Vì sao một hình vẽ đẹp vẫn cần lời giải thích về giới hạn của nó?'}
];
const maxLog=Math.log10(scaleStops[0].size),minLog=Math.log10(scaleStops.at(-1).size);
export function scalePosition(index){return (maxLog-Math.log10(scaleStops[index].size))/(maxLog-minLog)*1000}
export function scaleAt(position){const log=maxLog-Math.max(0,Math.min(1000,position))/1000*(maxLog-minLog);let index=0;for(let i=1;i<scaleStops.length;i++)if(Math.abs(Math.log10(scaleStops[i].size)-log)<Math.abs(Math.log10(scaleStops[index].size)-log))index=i;return {index,log,size:10**log}}
