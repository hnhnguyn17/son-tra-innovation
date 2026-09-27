export interface NavItem {
  id: string;
  label: string;
  href: string;
  chapterNumber?: number;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { id: 'tri-thuc-so', label: 'Tri thức số', href: '#tri-thuc-so', chapterNumber: 2 },
  { id: 'chuyen-nguoi-bien', label: 'Chuyện người biển', href: '#chuyen-nguoi-bien', chapterNumber: 3 },
  { id: 'au-thuyen', label: 'Âu thuyền', href: '#au-thuyen', chapterNumber: 4 },
  { id: 'di-san', label: 'Di sản', href: '#di-san', chapterNumber: 5 },
  { id: 'khong-gian-trai-nghiem', label: 'Trải nghiệm', href: '#khong-gian-trai-nghiem', chapterNumber: 6 },
];

export const MOBILE_DRAWER_ITEMS: NavItem[] = [
  { id: 'vung-thung', label: 'Cửa biển Sơn Trà', href: '#vung-thung', chapterNumber: 1 },
  { id: 'tri-thuc-so', label: 'Kho tri thức số', href: '#tri-thuc-so', chapterNumber: 2 },
  { id: 'chuyen-nguoi-bien', label: 'Chuyện người biển', href: '#chuyen-nguoi-bien', chapterNumber: 3 },
  { id: 'au-thuyen', label: 'Âu thuyền Thọ Quang', href: '#au-thuyen', chapterNumber: 4 },
  { id: 'di-san', label: 'Di sản & Làng chài', href: '#di-san', chapterNumber: 5 },
  { id: 'khong-gian-trai-nghiem', label: 'Trải nghiệm bờ vịnh', href: '#khong-gian-trai-nghiem', chapterNumber: 6 },
];

export interface TimelineMilestone {
  period: string;
  title: string;
  context: string;
  description: string;
  significance: string;
  citationLabel: string;
  citationUrl: string;
}

export const LAND_TIMELINE: TimelineMilestone[] = [
  {
    period: 'Địa thế ngàn năm',
    title: 'Bức bình phong ôm trọn vịnh Đà Nẵng',
    context: 'Cấu trúc địa hình tự nhiên',
    description:
      'Được hình thành từ ba ngọn núi hùng vĩ vươn dài ra biển (núi Nghê, núi Mỏ Diều, núi Cổ Ngựa), bán đảo Sơn Trà tựa như cánh tay khổng lồ che chở toàn bộ vùng vịnh Đà Nẵng trước những đợt sóng dữ và bão lớn từ Biển Đông.',
    significance: 'Vành đai sinh thái và lá chắn sóng gió tự nhiên cho cư dân bán đảo và đất liền.',
    citationLabel: 'Địa chí Đà Nẵng & Cổng TTĐT TP Đà Nẵng',
    citationUrl: 'https://danang.gov.vn',
  },
  {
    period: 'Ngày 01/09/1858',
    title: 'Tiền đồn đầu sóng ngọn gió',
    context: 'Bối cảnh lịch sử bảo vệ Tổ quốc',
    description:
      'Hạm đội liên quân Pháp - Tây Ban Nha nổ phát súng đầu tiên vào bán đảo Sơn Trà và cửa biển Đà Nẵng, mở đầu cuộc xâm lăng của chủ nghĩa thực dân. Ngay tại nơi đầu sóng này, quân dân Đà Nẵng dưới sự chỉ huy của danh tướng Nguyễn Tri Phương đã kiên cường lập phòng tuyến chặn bước quân thù.',
    significance: 'Khắc sâu ký ức kiên trung, biểu tượng tinh thần giữ nước bất khuất gắn liền với từng tấc đá, ngọn sóng Sơn Trà.',
    citationLabel: 'Bảo tàng Lịch sử Quốc gia (Tư liệu 1858)',
    citationUrl: 'https://baotanglichsu.vn/vi/Articles/3097/12567/ngay-1-9-1858-lien-quan-phap-tay-ban-nha-no-sung-vao-thanh-dja-nang.html',
  },
  {
    period: 'Bao đời tiếp nối',
    title: 'Xóm chài chân sóng & Làng biển cổ',
    context: 'Tiến trình định cư ven biển',
    description:
      'Dưới chân núi Sơn Trà, những cộng đồng ngư dân Mân Thái, Thọ Quang, Nam Thọ đã gắn đời mình với mạn thuyền nan và tấm lưới rùng. Nhịp biển nuôi nấng xóm làng, hình thành nên phong tục thờ thần Nam Hải và tinh thần cộng cư chở che nhau qua bao mùa giông bão.',
    significance: 'Cội nguồn văn hóa bản địa, nơi con người học cách nương tựa vào biển để sinh tồn và gìn giữ phong tục.',
    citationLabel: 'Hồ sơ Di sản văn hóa phi vật thể Lễ hội Cầu ngư Sơn Trà',
    citationUrl: 'https://baodanang.vn',
  },
];

export interface BreakwaterInsight {
  metric: string;
  label: string;
  subtext: string;
}

export const BREAKWATER_INSIGHTS: BreakwaterInsight[] = [
  {
    metric: '58 ha',
    label: 'Diện tích mặt nước âu thuyền',
    subtext: 'Một trong 5 trung tâm dịch vụ hậu cần nghề cá lớn nhất toàn quốc.',
  },
  {
    metric: 'Hàng ngàn',
    label: 'Tàu thuyền cập bến an toàn',
    subtext: 'Nơi trú bão của ngư dân Đà Nẵng, Quảng Nam, Quảng Ngãi và miền Trung.',
  },
  {
    metric: 'Vòng cung',
    label: 'Cánh tay đê kè che chở',
    subtext: 'Kết cấu che chắn sóng dữ, tạo nên vùng nước phẳng lặng giữa tâm bão.',
  },
];

export interface LivingHeritageItem {
  id: string;
  title: string;
  tag: string;
  summary: string;
  details: string;
  quote: string;
  statusBadge: string;
}

export const LIVING_HERITAGE_LIST: LivingHeritageItem[] = [
  {
    id: 'cau-ngu',
    title: 'Lễ hội Cầu ngư & Tín ngưỡng thờ Cá Ông',
    tag: 'Di sản phi vật thể quốc gia',
    summary:
      'Nghi lễ linh thiêng nhất trong năm của ngư dân Sơn Trà, tri ân vị thần hộ mệnh của biển cả (thần Nam Hải) và ước vọng mưa thuận gió hòa, khoang thuyền đầy cá.',
    details:
      'Hàng năm vào dịp đầu xuân (khoảng ngày 14 – 16 tháng Giêng âm lịch), tiếng trống chiêng vang dậy khắp làng biển Thọ Quang, Mân Thái. Lễ nghinh Ông ra khơi với thuyền rồng lộng lẫy, nghi thức tế lễ tôn kính và các trò chơi dân gian như lắc thúng, kéo co, hát bả trạo đậm đà phong vị biển.',
    quote: '“Biển giả là nhà, thần Nam Hải là điểm tựa tâm linh chở che mỗi chuyến vươn khơi.”',
    statusBadge: 'Tư liệu di sản quốc gia đã kiểm chứng',
  },
  {
    id: 'thung-chai',
    title: 'Hồn cốt Thúng Chai & Nghề đan nan tre',
    tag: 'Tri thức bản địa',
    summary:
      'Chiếc thúng tròn chao nghiêng giữa sóng gió bạc đầu là hiện thân của trí tuệ thích nghi tài tình của người dân xứ biển miền Trung.',
    details:
      'Được đan từ nan tre già dẻo dai, nêm chặt và trét bằng dầu rái (nhựa cây rái) để chống thấm nước, thúng chai vừa là phương tiện trung chuyển tôm cá, vừa là "phao cứu sinh" kiên cường vượt qua những ngọn sóng lừng ven bờ.',
    quote: '“Chiếc thúng tròn không góc cạnh để sóng không đánh gãy, tựa như lòng người mềm dẻo trước giông tố.”',
    statusBadge: 'Nghề truyền thống địa phương',
  },
  {
    id: 'keo-luoi-rung',
    title: 'Nhịp lưới rùng đón ánh bình minh',
    tag: 'Sinh hoạt cộng đồng',
    summary:
      'Hình ảnh những đôi chân trần bấm sâu vào cát mịn, hàng chục người cùng nhau kéo sợi dây thừng dài đón mẻ cá tươi rói lúc rạng đông.',
    details:
      'Kéo lưới rùng là hình thức đánh bắt gần bờ mang tính gắn kết xóm giềng sâu sắc. Cả đàn ông, phụ nữ và người già cùng chung sức ghìm dây lưới; tiếng hò dô hòa nhịp sóng biển tạo nên bức tranh lao động tràn đầy sức sống nguyên sơ.',
    quote: '“Một người kéo thì lưới chìm, cả làng cùng kéo thì tôm cá vào bờ.”',
    statusBadge: 'Nếp sống cộng đồng ven biển',
  },
];

export interface SoulKeeperSlot {
  id: string;
  characterName: string;
  age: string;
  role: string;
  location: string;
  characterTitle: string;
  subtitle: string;
  researchFocus: string;
  narrativeExcerpt: string;
  statusLabel: string;
}

export const SOUL_KEEPERS: SoulKeeperSlot[] = [
  {
    id: 'keeper-1',
    characterName: 'Bác Hai Lực',
    age: '62 tuổi',
    role: 'Lão ngư thuyền đánh bắt xa bờ',
    location: 'Làng chài Vũng Thùng, Thọ Quang',
    characterTitle: 'Bốn mươi năm rẽ sóng Hoàng Sa',
    subtitle: 'Ký ức về những luồng cá và hải trình giữ biển của người Sơn Trà',
    researchFocus: 'Kinh nghiệm nhìn trời trông nước, định vị bằng chòm sao và những đêm giông bão vượt cồn cát.',
    narrativeExcerpt:
      '“Biển Sơn Trà lạ lắm, có những ngày êm ả như mặt gương nhưng chỉ vài giờ sau gió chướng nổi lên. Người đi biển già nhìn sắc mây chân trời là biết khi nào cần cho thuyền quay mũi về âu bão Thọ Quang. Mũi thuyền mình ra khơi không chỉ vì miếng cơm manh áo, mà là giữ lấy ngư trường tổ tiên để lại.”',
    statusLabel: 'Lời kể lão ngư bản địa',
  },
  {
    id: 'keeper-2',
    characterName: 'Cô Mười Bé',
    age: '54 tuổi',
    role: 'Người gánh cá rạng sáng',
    location: 'Cầu cảng cá Thọ Quang',
    characterTitle: 'Ba mươi năm thức cùng chợ cá đêm',
    subtitle: 'Nhịp gánh tảo tần nuôi con khôn lớn từ mạn thuyền cập bến',
    researchFocus: 'Nhịp sống phiên chợ cá từ 1h - 5h sáng, sự gắn kết của những người phụ nữ hậu phương làng biển.',
    narrativeExcerpt:
      '“Từ một, hai giờ sáng khi phố xá còn ngủ say, nghe tiếng máy tàu rền vang ngoài âu là chị em tui đã có mặt trên cầu cảng. Đôi quang gánh trĩu nặng từng sọt mực cơm, cá nục tươi rói. Đời tui mặn mùi muối biển, nhưng đổi lại là con cái ăn học đàng hoàng, đứa nào cũng thương mẹ bãi chài.”',
    statusLabel: 'Chuyện người phụ nữ xóm biển',
  },
  {
    id: 'keeper-3',
    characterName: 'Chú Ba Thảo',
    age: '58 tuổi',
    role: 'Nghệ nhân đan thúng chai',
    location: 'Xóm nghề chân núi Sơn Trà',
    characterTitle: 'Bàn tay chắp vành thúng chai gia truyền',
    subtitle: 'Người giữ lửa nghề đan lát và trét dầu rái ven chân bán đảo',
    researchFocus: 'Kỹ nghệ chọn tre già trên núi, uốn vành mây và công thức nấu dầu rái chống chọi độ mặn của biển.',
    narrativeExcerpt:
      '“Từng nan tre phải phơi đủ nắng, vót thật đều. Trét lớp dầu rái thứ nhất phải chờ khô thấu mới quét lớp thứ hai. Chiếc thúng tròn trịa làm kỹ thì cưỡi sóng cả chục năm vẫn nhẹ tênh. Với ngư dân miền Trung, chiếc thúng như cái phao cứu sinh, che chở tính mạng bao người lúc sóng gió ngặt nghèo.”',
    statusLabel: 'Nghệ nhân dân gian',
  },
  {
    id: 'keeper-4',
    characterName: 'Cụ Tư Tôn',
    age: '76 tuổi',
    role: 'Trưởng ban khánh tiết Lăng Ông Nam Thọ',
    location: 'Lăng Ông Nam Thọ, Hoàng Sa',
    characterTitle: 'Người gìn giữ ngọc cốt Cá Ông & Lễ Cầu ngư',
    subtitle: 'Điểm tựa tâm linh và đạo lý uống nước nhớ nguồn của vạn chài',
    researchFocus: 'Phong tục thờ thần Nam Hải, nghi thức tế lễ Cầu ngư và ký ức bảo bọc của cá voi đối với ngư dân.',
    narrativeExcerpt:
      '“Ngư dân Sơn Trà coi Cá Ông như cha mẹ, như vị thần hộ mệnh linh thiêng. Ra khơi gặp giông gió mịt mù, thấy lưng Ông áp vào mạn thuyền dìu vào lạch là sống sót. Ngôi lăng cổ này lưu giữ ngọc cốt của Người, cũng là nơi dân làng gom góp lòng thành kính, cầu mong một năm trời yên biển lặng, bạn thuyền bình an trở về.”',
    statusLabel: 'Ký ức tâm linh tiền nhân',
  },
  {
    id: 'keeper-5',
    characterName: 'Chị Lan',
    age: '42 tuổi',
    role: 'Người giữ nghề ủ mắm cá cơm than',
    location: 'Xóm mắm Nam Thọ, Nại Hiên Đông',
    characterTitle: 'Hương biển đượm nồng trong từng chum mắm',
    subtitle: 'Nghệ thuật ủ chượp truyền thống dưới nắng gió bán đảo',
    researchFocus: 'Quy tắc chọn cá cơm than béo mẫm bến Thọ Quang rạng sáng, hạt muối Sa Huỳnh và nắng gắt Sơn Trà.',
    narrativeExcerpt:
      '“Mắm ngon nhờ cá tươi rói vừa gỡ khỏi lưới và cái nắng chang chang của bán đảo Sơn Trà. Mở nắp chum sành ra, hương mắm thơm nồng sực nức, màu cánh gián sóng sánh. Đó không chỉ là món ăn, mà là mồ hôi, là tinh túy của biển cả chắt chiu qua mấy thế hệ phụ nữ xứ này.”',
    statusLabel: 'Nghề truyền thống làng biển',
  },
];

export interface ParkConceptDesign {
  id: string;
  orderNumber: string;
  conceptTitle: string;
  poeticSubtitle: string;
  architecturalForm: string;
  heritageEcho: string;
  communityExperience: string;
  badge: string;
}

export const PARK_CONCEPT_DESIGNS: ParkConceptDesign[] = [
  {
    id: 'concept-1',
    orderNumber: '01',
    conceptTitle: 'Đường dạo Chở Che (The Sheltering Promenade)',
    poeticSubtitle: 'Cảm hứng từ cánh cung đê chắn bão',
    architecturalForm:
      'Hệ thống cầu dạo bộ trên cao uốn lượn mềm mại theo đường cong tự nhiên của âu thuyền, sử dụng vật liệu đá địa phương kết hợp khung kết cấu nhẹ mở rộng tầm nhìn về vịnh biển.',
    heritageEcho:
      'Mô phỏng bàn tay chở che của đê chắn sóng Thọ Quang, nơi từng con thuyền được bao bọc an yên giữa biển trời lộng gió.',
    communityExperience:
      'Không gian ngắm hoàng hôn, tản bộ tĩnh lặng giữa sương mỏng bình minh và kết nối người dân với mặt nước.',
    badge: 'Đề xuất thiết kế đồ án',
  },
  {
    id: 'concept-2',
    orderNumber: '02',
    conceptTitle: 'Quảng trường Hội Ngộ Biển (The Coastal Hearth)',
    poeticSubtitle: 'Tái hiện nhịp đập chợ cá ban mai',
    architecturalForm:
      'Không gian công cộng đa năng ngoài trời với các mái che xếp lớp hình cánh buồm no gió, sàn lát sa thạch chống trơn trượt đan xen cây xanh bản địa.',
    heritageEcho:
      'Lấy cảm hứng từ không khí rộn rã lúc tàu cập bến rạng đông, nơi cư dân gặp gỡ, sẻ chia tôm cá và kết nối tình làng nghĩa xóm.',
    communityExperience:
      'Địa điểm tổ chức các hoạt động nghệ thuật ngoài trời, hội chợ sản vật làng chài và tái hiện một phần không gian Lễ hội Cầu ngư.',
    badge: 'Đề xuất thiết kế đồ án',
  },
  {
    id: 'concept-3',
    orderNumber: '03',
    conceptTitle: 'Cấu Trúc Biểu Tượng & Giàn Mắt Lưới Ký Ức (Symbolic Net Installation)',
    poeticSubtitle: 'Bóng đổ mắt lưới & Ký ức lao động bên mặt nước',
    architecturalForm:
      'Cấu trúc sắp đặt biểu tượng kết hợp hệ thống giàn không gian và vật liệu đan thả lấy cảm hứng từ cấu trúc đan nan thuyền thúng và mắt lưới rùng. Ánh nắng rọi qua tạo hiệu ứng bóng đổ chuyển động tự nhiên trên bậc thềm hồ trũng, vừa che nắng vừa tạo điểm nhấn cảnh quan mà không cần cơ cấu máy móc phức tạp.',
    heritageEcho:
      'Lưu giữ linh hồn làng chài Thọ Quang qua hình tượng công cụ lao động quen thuộc; giữ gìn tính tôn nghiêm của tín ngưỡng biển mà không tầm thường hóa hình tượng tâm linh thành mô hình giải trí.',
    communityExperience:
      'Không gian nghỉ chân râm mát, chòi trú nắng và điểm dừng chân chiêm nghiệm cho người dân, kết nối hài hòa giữa khán đài bậc thang hồ trũng và quảng trường trung tâm.',
    badge: 'Đề xuất thiết kế đồ án',
  },
];

export interface CitationItem {
  id: string;
  title: string;
  publisher: string;
  url: string;
  dateOrCode?: string;
  contentNote: string;
  category: 'Lịch sử' | 'Hàng hải & Cảng cá' | 'Văn hóa & Tín ngưỡng';
}

export const CITATION_REGISTRY: CitationItem[] = [
  {
    id: 'cite-danang-port',
    title: 'Ngắm toàn cảnh Âu thuyền Thọ Quang, nơi đang được xây dựng thành 1 trong 5 trung tâm nghề cá lớn của cả nước',
    publisher: 'Báo Đà Nẵng điện tử',
    url: 'https://baodanang.vn/ngam-toan-canh-au-thuyen-tho-quang-noi-dang-duoc-xay-dung-thanh-1-trong-5-trung-tam-nghe-ca-lon-cua-ca-nuoc-3287472.html',
    contentNote: 'Tư liệu về quy mô 58 ha mặt nước, năng lực neo đậu tránh bão và vai trò trung tâm nghề cá miền Trung.',
    category: 'Hàng hải & Cảng cá',
  },
  {
    id: 'cite-rescue-pccc',
    title: 'Đà Nẵng bảo đảm an toàn cho tàu thuyền tránh trú bão tại Âu thuyền Thọ Quang',
    publisher: 'Cục Cảnh sát PCCC và CNCH (Bộ Công an)',
    url: 'https://canhsatpccc.gov.vn/vi/news/trang-dia-phuong/da-nang-bao-dam-bao-an-toan-cho-tau-thuyen-tranh-tru-bao-kajiki-tai-au-thuyen-tho-quang-4876',
    contentNote: 'Ghi nhận thực tế công tác điều tiết, bảo đảm an toàn cho ngư dân và phương tiện cập âu khi giông bão.',
    category: 'Hàng hải & Cảng cá',
  },
  {
    id: 'cite-history-1858',
    title: 'Ngày 1-9-1858: Liên quân Pháp - Tây Ban Nha nổ súng vào thành Đà Nẵng',
    publisher: 'Bảo tàng Lịch sử Quốc gia',
    url: 'https://baotanglichsu.vn/vi/Articles/3097/12567/ngay-1-9-1858-lien-quan-phap-tay-ban-nha-no-sung-vao-thanh-dja-nang.html',
    contentNote: 'Tư liệu chính thức về bối cảnh tiền tiêu Sơn Trà và mốc thời gian lịch sử bảo vệ chủ quyền non sông.',
    category: 'Lịch sử',
  },
  {
    id: 'cite-cau-ngu-heritage',
    title: 'Hồ sơ Di sản văn hóa phi vật thể quốc gia Lễ hội Cầu ngư Đà Nẵng',
    publisher: 'Cổng thông tin Di sản Văn hóa Việt Nam & TP Đà Nẵng',
    url: 'https://baodanang.vn',
    contentNote: 'Nghi thức tế lễ thần Nam Hải, diễn xướng bả trạo và sinh hoạt văn hóa tín ngưỡng của ngư dân ven biển Sơn Trà.',
    category: 'Văn hóa & Tín ngưỡng',
  },
];
