// Curated learning dossiers. Coordinates locate an indicative point, never a boundary.
// Older source counts, historical province labels and unverified current Red List categories
// are intentionally not presented as current measurements.
export const natureSites=[
 {
  id:'cucphuong',name:'Cúc Phương',region:'Bắc Bộ · miền núi đá vôi',habitat:'Rừng trên núi đá vôi',kind:'forest',lat:20.3167,lon:105.6167,
  coordinateNote:'Điểm trung tâm hồ sơ KBA Cúc Phương; không phải cổng vườn hoặc ranh giới hành chính.',
  summary:'Một khu rừng trên núi đá vôi lưu giữ nhiều sinh cảnh khác nhau. Câu chuyện bảo tồn ở đây nối việc giữ rừng với cứu hộ, chăm sóc và phục hồi động vật hoang dã.',
  species:[{name:'Voọc mông trắng',text:'Một loài linh trưởng tiêu biểu trong các hoạt động bảo tồn và cứu hộ tại Cúc Phương.'},{name:'Các loài linh trưởng được cứu hộ',text:'Chăm sóc và chuẩn bị tái thả cần chuyên môn; không phải mọi cá thể đều có thể thả ngay vào rừng.'}],
  pressures:'Bảo tồn cần giải quyết áp lực săn bắt và khai thác sinh cảnh. Hồ sơ KBA nêu những tác động này; đây không phải số liệu tuần tra thời gian thực.',
  conservation:'Bảo vệ rừng, cứu hộ theo quy trình chuyên môn và giáo dục bảo tồn cần được thực hiện cùng nhau.',
  question:'Cứu hộ một cá thể có thay thế được việc bảo vệ nơi sống của cả quần thể không?',
  source:['Vườn quốc gia Cúc Phương · Trạm cứu hộ thú linh trưởng','https://cucphuongtourism.com/index.php/vi/conservation/animal-rescue-center.html'],
  extraSources:[['KBA · Hồ sơ và tọa độ Cúc Phương','https://www.keybiodiversityareas.org/en/site/factsheet/12038']],
  actionOptions:['Cho động vật hoang dã thức ăn để chúng tập trung quanh khách tham quan.','Bảo vệ sinh cảnh và phối hợp cứu hộ theo hướng dẫn chuyên môn.','Chỉ giữ động vật trong chuồng là đủ để bảo tồn toàn bộ hệ sinh thái.'],correctAction:1,
  actionFeedback:'Cứu hộ hỗ trợ từng cá thể, còn sinh cảnh cung cấp thức ăn, nơi ở và các mối quan hệ của quần thể. Hai hướng bảo tồn bổ sung cho nhau.'
 },
 {
  id:'xuanthuy',name:'Xuân Thủy',region:'Ven biển Bắc Bộ · cửa sông Hồng',habitat:'Rừng ngập mặn và bãi triều',kind:'wetland',lat:20.2167,lon:106.55,
  coordinateNote:'Điểm trung tâm KBA Xuân Thủy; khác tọa độ đại diện cho toàn Khu dự trữ sinh quyển Đồng bằng sông Hồng.',
  summary:'Ở nơi sông gặp biển, rừng ngập mặn, bãi bùn và thủy triều tạo nên những vùng kiếm ăn và nghỉ chân của chim nước di cư.',
  species:[{name:'Cò thìa mặt đen',text:'Loài chim được nguồn UNESCO ghi nhận trong hệ đất ngập nước Đồng bằng sông Hồng, với Xuân Thủy là vùng lõi quan trọng.'},{name:'Cây rừng ngập mặn',text:'Hệ rễ góp phần giữ phù sa; sinh cảnh còn liên hệ với nơi ương dưỡng cá, tôm và các loài thân mềm.'}],
  pressures:'Theo dõi chất lượng nước, độ che phủ rừng và thay đổi sinh cảnh giúp nhận biết sức ép lên hệ đất ngập nước. Không thể kết luận xu hướng quần thể chỉ từ một lần đếm chim.',
  conservation:'Bảo vệ bãi kiếm ăn, giám sát chim và sinh cảnh; phối hợp quản lý cộng đồng để sử dụng tài nguyên theo quy định.',
  question:'Nếu giữ được cây ngập mặn nhưng bãi kiếm ăn của chim bị xáo trộn, việc bảo tồn đã đủ chưa?',
  source:['UNESCO MAB · Đồng bằng sông Hồng và Xuân Thủy','https://www.unesco.org/en/mab/red-river-delta'],
  extraSources:[['Cục Bảo tồn thiên nhiên và Đa dạng sinh học · Xuân Thủy','https://nbca.gov.vn/khu-ramsar-xuan-thuy-tinh-nam-dinh-1988/'],['KBA · Tọa độ Xuân Thủy','https://www.keybiodiversityareas.org/en/site/factsheet/12020']],
  actionOptions:['Giữ khoảng cách quan sát, bảo vệ bãi kiếm ăn và theo dõi sinh cảnh.','Đuổi chim bay lên liên tục để chụp ảnh và dễ đếm hơn.','San bãi bùn tự nhiên rồi thay bằng một hồ cảnh nhỏ.'],correctAction:0,
  actionFeedback:'Chim cần cả nơi kiếm ăn lẫn nghỉ chân. Quan sát ít xáo trộn và bảo vệ các sinh cảnh liên kết giúp hoạt động học tập phù hợp với mục tiêu bảo tồn.'
 },
 {
  id:'phongnha',name:'Phong Nha–Kẻ Bàng',region:'Bắc Trung Bộ · dãy Trường Sơn',habitat:'Rừng núi đá vôi và hang động',kind:'forest',lat:17.5372,lon:106.1513,
  coordinateNote:'Điểm định hướng theo tọa độ trang UNESCO. Không biểu thị toàn bộ ranh giới di sản xuyên biên giới.',
  summary:'Vách đá, rừng, hang và sông ngầm tạo nhiều ổ sinh thái. Từ năm 2025, hồ sơ UNESCO của di sản bao gồm cả phần mở rộng Hin Nam No ở Lào.',
  species:[{name:'Các loài lan',text:'UNESCO ghi nhận những nhóm thực vật chuyên hóa và đặc hữu trong hệ rừng núi đá vôi của toàn di sản.'},{name:'Thu hải đường',text:'Một nhóm thực vật được nêu trong mô tả các sinh cảnh trên mặt đất; không phải loài nào cũng sống trong hang tối.'}],
  pressures:'UNESCO nêu áp lực săn bắt trái phép, khai thác tài nguyên thiếu bền vững, loài ngoại lai, hạ tầng và hoạt động du lịch.',
  conservation:'Bảo vệ các sinh cảnh trên và dưới mặt đất; đánh giá, giới hạn và theo dõi tác động của các dự án phát triển, du lịch.',
  question:'Một thay đổi nhỏ ở cửa hang có thể tác động đến môi trường tối và các sinh vật bên trong như thế nào?',
  source:['UNESCO · Phong Nha–Kẻ Bàng và Hin Nam No','https://whc.unesco.org/en/list/951/'],extraSources:[],
  actionOptions:['Tăng ánh sáng và mở đường ở mọi hang để có thêm điểm tham quan.','Thu sinh vật hang về làm bộ sưu tập cá nhân.','Đánh giá tác động, đi đúng tuyến được phép và bảo vệ sinh cảnh hang–rừng.'],correctAction:2,
  actionFeedback:'Sinh cảnh hang và rừng có thể nhạy cảm với ánh sáng, xáo trộn và khai thác. Hoạt động cần dựa trên đánh giá tác động và hướng dẫn quản lý, thay vì mở rộng ở mọi nơi.'
 },
 {
  id:'cangio',name:'Cần Giờ',region:'Ven biển phía Nam · vùng cửa sông',habitat:'Rừng ngập mặn nước lợ',kind:'wetland',lat:10.52,lon:106.89,
  coordinateNote:'Tọa độ đại diện do UNESCO MAB công bố; không phải ranh giới khu dự trữ sinh quyển.',
  summary:'Mạng sông và phù sa góp phần tạo nền đất cho rừng ngập mặn. Sinh cảnh liên kết từ rừng, bãi bùn tới các thủy vực nước lợ.',
  species:[{name:'Đước (Rhizophora apiculata)',text:'Loài cây ngập mặn được UNESCO nêu trong hồ sơ sinh thái Cần Giờ.'},{name:'Ô rô (Acanthus ebracteatus)',text:'Một loài thực vật được ghi nhận trong hệ thực vật rừng ngập mặn của khu vực.'}],
  pressures:'Câu hỏi quản lý đặt ra là làm sao duy trì sinh cảnh và chất lượng môi trường trong mối liên hệ với các hoạt động sinh kế ven biển; thẻ này không cung cấp số đo ô nhiễm tại chỗ.',
  conservation:'Bảo vệ hệ rừng và môi trường nước, quan sát sự liên kết giữa đa dạng sinh học và sinh kế sử dụng tài nguyên hợp lý.',
  question:'Nếu một vùng nước lợ thay đổi độ mặn, vì sao không phải mọi loài ở đó đều phản ứng giống nhau?',
  source:['UNESCO MAB · Rừng ngập mặn Cần Giờ','https://www.unesco.org/en/mab/can-gio-mangrove'],extraSources:[],
  actionOptions:['Giữ sinh cảnh liên kết và ghi lại điều kiện nước khi quan sát sinh vật.','Cho rằng chỉ cần trồng cây bất kỳ ở đâu cũng tạo được rừng ngập mặn.','Tách rừng ngập mặn hoàn toàn khỏi mạng sông để không còn chịu thủy triều.'],correctAction:0,
  actionFeedback:'Rừng ngập mặn gắn với nền đất, nước lợ, phù sa và mạng sông. Hiểu và bảo vệ các điều kiện sinh thái quan trọng hơn việc chỉ đếm số cây được trồng.'
 },
 {
  id:'tramchim',name:'Tràm Chim',region:'Đồng Tháp Mười · đồng bằng phía Nam',habitat:'Đồng cỏ ngập nước và rừng tràm',kind:'wetland',lat:10.7167,lon:105.5,
  coordinateNote:'Vị trí định hướng gần đúng của khu vực Tràm Chim; không dùng cho dẫn đường hoặc xác định ranh giới.',
  summary:'Đồng cỏ và rừng tràm thuộc hệ đất ngập nước Đồng Tháp Mười là sinh cảnh của nhiều loài chim nước và thực vật đặc trưng.',
  species:[{name:'Sếu đầu đỏ',text:'Loài chim tiêu biểu được Cục Bảo tồn thiên nhiên và Đa dạng sinh học giới thiệu trong hồ sơ Tràm Chim.'},{name:'Lúa gié hoang',text:'Một nguồn gen thực vật được nêu trong hồ sơ về giá trị bảo tồn của khu đất ngập nước.'}],
  pressures:'Nguồn của Cục nêu tình trạng cháy trong mùa khô và nhu cầu chú trọng công tác bảo vệ sinh cảnh, nâng cao nhận thức cộng đồng.',
  conservation:'Giám sát sinh cảnh, phòng cháy phù hợp với kế hoạch quản lý và bảo vệ các vùng kiếm ăn của chim nước.',
  question:'Nếu chỉ ghi nhận số chim tại một thời điểm, bạn còn cần biết điều gì về mùa và điều kiện sinh cảnh?',
  source:['Cục Bảo tồn thiên nhiên và Đa dạng sinh học · Tràm Chim','https://nbca.gov.vn/4154-2/'],extraSources:[],
  actionOptions:['Kết luận loài đã biến mất chỉ vì hôm nay không quan sát thấy.','Giám sát theo mùa, bảo vệ sinh cảnh và phối hợp phòng cháy đúng hướng dẫn.','Thay toàn bộ đồng cỏ tự nhiên bằng sân cỏ cảnh quan.'],correctAction:1,
  actionFeedback:'Sự hiện diện của chim liên hệ với mùa, nguồn thức ăn và điều kiện sinh cảnh. Cần theo dõi có phương pháp và bảo vệ nơi sống, không kết luận từ một lần quan sát.'
 },
 {
  id:'condao',name:'Côn Đảo',region:'Biển đảo phía Nam',habitat:'Bãi biển, rạn san hô và thảm cỏ biển',kind:'marine',lat:8.7,lon:106.64,
  coordinateNote:'Điểm định hướng gần đúng trong khoảng tọa độ VQG do IUCN Green List nêu; không phải ranh giới bảo tồn biển.',
  summary:'Bãi làm tổ trên cạn và môi trường sống dưới biển cùng góp phần vào vòng đời của sinh vật biển. Côn Đảo có các chương trình bảo vệ rùa và phục hồi san hô.',
  species:[{name:'Rùa xanh (Chelonia mydas)',text:'Côn Đảo có các bãi làm tổ quan trọng và hoạt động bảo vệ sinh sản của rùa xanh.'},{name:'San hô',text:'Các rạn san hô là một phần của hệ sinh thái biển được giám sát, bảo vệ và phục hồi.'}],
  pressures:'Vườn ghi nhận rác biển, ngư cụ bị bỏ lại, hoạt động đánh bắt trái phép và các tác động đến bãi đẻ có thể gây hại cho rùa.',
  conservation:'Bảo vệ bãi làm tổ, hạn chế xáo trộn, xử lý rác và phối hợp giám sát, bảo vệ tài nguyên biển theo hướng dẫn của vườn.',
  question:'Vì sao bảo vệ rùa biển cần quan tâm cả bãi cát, vùng kiếm ăn và những vật trôi trong biển?',
  source:['Vườn quốc gia Côn Đảo · Những mối đe dọa đối với rùa biển','https://condaopark.com.vn/vn/cac-moi-de-doa-doi-voi-rua-bien-con-dao.html'],
  extraSources:[['IUCN Green List · Côn Đảo','https://iucngreenlist.org/sites/con-dao-national-park-2/']],
  actionOptions:['Tự đào tổ rùa để xem phôi rồi lấp lại.','Dùng đèn và vây sát rùa mẹ để có ảnh rõ.','Quan sát theo hướng dẫn của vườn, giữ khoảng cách và giảm rác/ngư cụ gây hại.'],correctAction:2,
  actionFeedback:'Bãi làm tổ và môi trường biển đều quan trọng. Can thiệp vào tổ hoặc làm xáo trộn rùa không phải hoạt động quan sát phù hợp; hãy theo hướng dẫn bảo tồn của vườn.'
 },
 {
  id:'babe',name:'Ba Bể',region:'Đông Bắc · miền núi phía Bắc',habitat:'Hồ nước ngọt và rừng núi đá vôi',kind:'wetland',lat:22.4053,lon:105.6153,
  coordinateNote:'Điểm định hướng gần đúng; không biểu thị toàn bộ hồ, vườn quốc gia hoặc ranh giới địa phương.',
  summary:'Hệ hồ liên hệ với các dòng nước và rừng xung quanh. Những vách đá ven hồ cũng tạo môi trường sống cho thực vật đặc trưng.',
  species:[{name:'Trúc dây',text:'Thực vật đặc trưng được nguồn của Cục ghi nhận ở các vách đá ven hồ.'},{name:'Cá nước ngọt và chim',text:'Các nhóm sinh vật được ghi nhận trong hệ hồ–rừng; không coi danh sách trên thẻ là toàn bộ thành phần loài.'}],
  pressures:'Việc bảo vệ hồ cần xét cả môi trường nước, dòng chảy và sinh cảnh xung quanh. Đây là trọng tâm đặt câu hỏi học tập, không phải báo cáo quan trắc ô nhiễm hiện tại.',
  conservation:'Quan sát có phương pháp và bảo vệ sự liên kết giữa rừng, hồ và nguồn nước; giữ khoảng cách với động vật, không hái thực vật.',
  question:'Muốn hiểu chất lượng môi trường của một hồ, chỉ nhìn mặt nước có đủ không?',
  source:['Cục Bảo tồn thiên nhiên và Đa dạng sinh học · Hồ Ba Bể','https://nbca.gov.vn/khu-ramsar-ho-ba-be-tinh-bac-kan-2011/'],
  extraSources:[['ASEAN Centre for Biodiversity · Ba Bể','https://www.aseanbiodiversity.org/asean-heritage-parks/ba-be-national-park/']],
  actionOptions:['Tìm hiểu cả nguồn nước chảy vào, rừng xung quanh và dữ liệu quan sát hồ.','Kết luận nước hoàn toàn sạch chỉ vì bề mặt trong và đẹp.','Thu cây đặc trưng trên vách đá để làm kỷ niệm.'],correctAction:0,
  actionFeedback:'Một hệ hồ kết nối với lưu vực và các sinh cảnh lân cận. Hình ảnh bề mặt là một quan sát, chưa thay thế được dữ liệu môi trường và sự hiểu biết về các dòng nước.'
 },
 {
  id:'catsien',name:'Bàu Sấu – Cát Tiên',region:'Đông Nam Bộ · hệ sông Đồng Nai',habitat:'Đất ngập nước nội địa tiếp giáp rừng',kind:'wetland',lat:11.4667,lon:107.3833,
  coordinateNote:'Điểm định hướng gần đúng cho khu Bàu Sấu; không phải tọa độ cổng VQG Cát Tiên hoặc đường ranh Ramsar.',
  summary:'Hồ nội địa tiếp giáp rừng tự nhiên tạo nên vùng liên kết giữa môi trường nước và trên cạn, có giá trị về đa dạng sinh học, nghiên cứu và giáo dục.',
  species:[{name:'Cá sấu nước ngọt',text:'Được nguồn Cục Môi trường nêu trong hồ sơ về khu đất ngập nước Bàu Sấu.'},{name:'Thực vật và sinh vật thủy sinh',text:'Các nhóm trong hệ đất ngập nước có thể chịu ảnh hưởng khi sinh cảnh bị thu hẹp hoặc chất lượng nước thay đổi.'}],
  pressures:'Cục Môi trường nêu khai thác trái phép, đánh bắt và bẫy động vật, loài thực vật ngoại lai xâm nhập và ô nhiễm nước là các thách thức bảo tồn.',
  conservation:'Bảo vệ tài nguyên, giám sát sinh cảnh và xử lý các tác động theo chuyên môn, đồng thời khuyến khích cộng đồng cùng tham gia.',
  question:'Vì sao dọn một phần cây ngoại lai chưa chắc giải quyết được mọi áp lực lên vùng đất ngập nước?',
  source:['Cục Môi trường · Thách thức bảo tồn tại Bàu Sấu','https://vea.mae.gov.vn/tin-tuc-su-kien/5744/nhieu-thach-thuc-doi-voi-cong-tac-bao-ve-da-dang-sinh-hoc-tai-vung-dat-ngap-nuoc-bau-sau'],extraSources:[],
  actionOptions:['Chỉ cải tạo cảnh quan cho đẹp mà không xét chất lượng nước.','Kết hợp bảo vệ sinh cảnh, theo dõi nước và kiểm soát tác động theo hướng dẫn chuyên môn.','Tự mang một loài mới đến thả để tăng số lượng loài.'],correctAction:1,
  actionFeedback:'Áp lực có thể đến từ nhiều nguồn cùng lúc. Kết hợp theo dõi môi trường và bảo vệ tài nguyên có cơ sở hơn giải pháp chỉ làm đẹp cảnh quan hoặc tự ý đưa loài mới vào.'
 }
];

// General career descriptions, not admissions promises or licensing guidance.
export const careers=[
 {id:'conservation',name:'Nhà sinh học bảo tồn',tag:'SINH THÁI & THỰC ĐỊA',work:'Quan sát động vật và sinh cảnh, thu thập và phân tích dữ liệu, theo dõi quần thể để hỗ trợ quản lý và bảo tồn.',subjects:['Sinh thái học','Đa dạng sinh học','Tiến hóa','Toán và thống kê'],skills:['Ghi chép thực địa','Phân tích dữ liệu','Viết báo cáo và làm việc nhóm'],trial:{label:'Đọc một hồ sơ sinh thái trên BioMap',route:'world',tab:'map'},source:['BLS · Zoologists and Wildlife Biologists','https://www.bls.gov/ooh/life-physical-and-social-science/zoologists-and-wildlife-biologists.htm'],vietnamSource:['Khoa Sinh học · Trường ĐH Khoa học Tự nhiên, ĐHQGHN','https://hus.vnu.edu.vn/gioi-thieu/co-cau-to-chuc/khoa-truc-thuoc/khoa-sinh-hoc']},
 {id:'biotech',name:'Nghiên cứu công nghệ sinh học',tag:'TẾ BÀO & PHÂN TỬ',work:'Đặt câu hỏi về các quá trình sống, thiết kế thí nghiệm và phân tích phân tử, tế bào để phát triển hiểu biết hoặc ứng dụng phù hợp.',subjects:['Sinh học tế bào','Di truyền học','Hóa sinh','Hóa học và tin học'],skills:['Thiết kế đối chứng','Thao tác theo quy trình','Phân tích và trình bày bằng chứng'],trial:{label:'Thử một thay đổi trình tự trong GeneCraft',route:'studio',tab:'gene'},source:['BLS · Biochemists and Biophysicists','https://www.bls.gov/ooh/life-physical-and-social-science/biochemists-and-biophysicists.htm'],vietnamSource:['Chương trình Công nghệ sinh học · ĐH KHTN, ĐHQGHN','https://tuyensinh.hus.vnu.edu.vn/dai-hoc/nganh-hoc/sinh-hoc-va-cong-nghe/cong-nghe-sinh-hoc']},
 {id:'clinical',name:'Kỹ thuật viên xét nghiệm y học',tag:'QUAN SÁT & CHẤT LƯỢNG',work:'Thực hiện xét nghiệm theo quy trình và chỉ định, vận hành thiết bị, kiểm soát chất lượng và ghi nhận kết quả để hỗ trợ chăm sóc sức khỏe.',subjects:['Sinh học tế bào','Vi sinh vật','Sinh lý học','Hóa học và toán'],skills:['Thao tác chính xác','Quản lý mẫu và kết quả','Tuân thủ quy trình an toàn'],trial:{label:'Mô tả cấu trúc trong một tiêu bản cố định',route:'lab',tab:'microscope'},source:['BLS · Clinical Laboratory Technologists and Technicians','https://www.bls.gov/ooh/healthcare/clinical-laboratory-technologists-and-technicians.htm'],vietnamSource:['Kỹ thuật xét nghiệm y học · Trường ĐH Y tế công cộng','https://tuyensinh.huph.edu.vn/public/post/ky-thuat-xet-nghiem-y-hoc-nganh-hoc-co-tinh-ung-dung-cao-2']},
 {id:'crops',name:'Nhà khoa học cây trồng',tag:'THỰC VẬT & NÔNG NGHIỆP',work:'Nghiên cứu sinh trưởng, giống và chất lượng cây trồng; tìm cách sử dụng đất, nước và các nguồn lực phù hợp hơn.',subjects:['Sinh lý thực vật','Di truyền học','Sinh thái học','Hóa học và thống kê'],skills:['Thí nghiệm có đối chứng','Đo đạc và ghi chép','So sánh kết quả với giả thuyết'],trial:{label:'Thử điều kiện sinh trưởng trong Plant Lab',route:'lab'},source:['BLS · Agricultural and Food Scientists','https://www.bls.gov/ooh/life-physical-and-social-science/agricultural-and-food-scientists.htm'],vietnamSource:['Khoa Nông học · Học viện Nông nghiệp Việt Nam, danh mục chương trình 2021','https://file.vnua.edu.vn/data/26/documents/2022/05/31/btvnonghoc/danh-muc-dao-tao-2021.pdf']},
 {id:'marine',name:'Nhà sinh học biển',tag:'ĐẠI DƯƠNG & BẢO TỒN',work:'Nghiên cứu sinh vật và hệ sinh thái biển bằng quan sát, dữ liệu và mô hình; đóng góp thông tin cho bảo tồn và quản lý tài nguyên.',subjects:['Sinh học','Sinh thái học','Khoa học môi trường','Toán và thống kê'],skills:['Thu thập dữ liệu có phương pháp','Phân tích và xây dựng mô hình','Giao tiếp và phối hợp nhóm'],trial:{label:'Tìm hiểu bảo vệ sinh cảnh biển trên BioMap',route:'world',tab:'map'},source:['NOAA · Science Careers','https://www.fisheries.noaa.gov/national/careers-more/science-careers']}
];
