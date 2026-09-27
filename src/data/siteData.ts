export interface SiteDimension {
  streetName: string;
  frontageLength: string;
  note: string;
}

export interface SiteInfo {
  title: string;
  area: string;
  address: string;
  intersection: string;
  frontages: SiteDimension[];
  rearBoundary: string;
  significance: string;
}

export interface ItineraryStop {
  time: string;
  title: string;
  activity: string;
  location: string;
  iconTag: string;
}

export const ITINERARY_1DAY: ItineraryStop[] = [
  {
    time: '04:30 - 06:30',
    title: 'Bình minh Chợ cá Thọ Quang',
    activity: 'Xem hàng trăm tàu thuyền cập bến, trải nghiệm phiên chợ thủy sản sôi động nhất miền Trung và đón mặt trời mọc trên vịnh.',
    location: 'Cảng cá Thọ Quang (cách 150m)',
    iconTag: 'Bình minh & Bến cảng',
  },
  {
    time: '07:00 - 08:30',
    title: 'Cà phê sáng bên bờ vịnh Vũng Thùng',
    activity: 'Nghỉ chân rợp bóng cây xanh bên bờ vịnh lộng gió, thưởng thức ly cà phê sáng, lắng nghe tiếng sóng nước vỗ bờ và ngắm nhìn tàu thuyền ra vào bến.',
    location: 'Bờ vịnh Vũng Thùng (Giao lộ Ngô Thì Trí × Lý Nhật Quang)',
    iconTag: 'Thưởng trà & Đón gió vịnh',
  },
  {
    time: '09:00 - 10:30',
    title: 'Chiêm bái Lăng Ông Nam Thọ & Làng nghề thúng',
    activity: 'Khám phá ngôi miếu cổ linh thiêng của ngư dân Sơn Trà, tìm hiểu tục thờ cá Ông và chứng kiến các nghệ nhân đan thúng chai nan tre.',
    location: 'Lăng Ông Nam Thọ (cách 400m)',
    iconTag: 'Di sản & Tâm linh',
  },
  {
    time: '11:30 - 13:30',
    title: 'Thưởng thức hải sản làng chài',
    activity: 'Thưởng thức mực cơm hấp gừng, tôm biển nướng mọi, chíp chíp hấp sả tươi ngon tại các quán ẩm thực quanh Vũng Thùng.',
    location: 'Phố ẩm thực Vũng Thùng 4',
    iconTag: 'Ẩm thực tươi rói',
  },
  {
    time: '17:00 - 18:30',
    title: 'Hoàng hôn cửa sông Hàn & Cầu Thuận Phước',
    activity: 'Tản bộ dọc bờ kè đón gió mát, ngắm ánh hoàng hôn rực rỡ buông xuống cửa biển và chiêm ngưỡng cầu dây võng Thuận Phước lên đèn.',
    location: 'Cửa sông Hàn (cách 650m)',
    iconTag: 'Ngắm cảnh hoàng hôn',
  },
];

export interface NeighborhoodPOI {
  id: string;
  title: string;
  category: 'Kinh tế biển' | 'Tâm linh & Di sản' | 'Cảnh quan & Du lịch' | 'Ẩm thực bản địa' | 'Lịch sử & Ký ức' | 'Đổi mới sáng tạo';
  distance: string;
  walkingTime: string;
  highlight: string;
  description: string;
  experienceTag: string;
  accentColor: string;
  quote?: string;
  historicalFact?: string;
  coordinates?: string;
}

export const NEIGHBORHOOD_POIS: NeighborhoodPOI[] = [
  {
    id: 'poi-au-thuyen',
    title: 'Âu Thuyền & Cảng Cá Thọ Quang',
    category: 'Kinh tế biển',
    distance: '~150 m',
    walkingTime: '2 phút đi bộ',
    highlight: 'Trung tâm nghề cá lớn nhất miền Trung với 58 ha mặt nước',
    description:
      'Nơi neo đậu tránh trú bão của hàng ngàn tàu thuyền đánh bắt xa bờ. Rạng sáng từ 1h - 5h là chợ đầu mối thủy sản sôi động nhất Đà Nẵng với hàng trăm tấn cá tôm tươi rói vừa cập bến.',
    experienceTag: 'Khám phá chợ cá đêm & Bình minh cảng tàu',
    accentColor: '#0077B6',
    quote: 'Mỗi ngọn đèn tàu về bến là một niềm vui đoàn tụ của mẹ, của con.',
    historicalFact: 'Vũng neo đậu tự nhiên lớn nhất miền Trung, quy hoạch hiện đại hóa từ những năm 2000.',
    coordinates: '16.0984° N, 108.2432° E',
  },
  {
    id: 'poi-lang-ong',
    title: 'Lăng Ông Nam Thọ & Lễ Hội Cầu Ngư',
    category: 'Tâm linh & Di sản',
    distance: '~400 m',
    walkingTime: '5 phút đi bộ',
    highlight: 'Di tích tín ngưỡng ngàn đời thờ Thần Nam Hải (Cá Ông)',
    description:
      'Ngôi lăng cổ tôn nghiêm lưu giữ ngọc cốt Cá Ông của ngư dân vạn chài Nam Thọ. Hàng năm vào dịp đầu xuân, nơi đây diễn ra Lễ hội Cầu ngư (Di sản văn hóa phi vật thể quốc gia) với lễ tế rước thần và hát bả trạo.',
    experienceTag: 'Chiêm bái di sản & Văn hóa tâm linh biển',
    accentColor: '#D97706',
    quote: 'Ơn trời biển rộng bao dung, sóng êm gió lặng buồm căng trở về.',
    historicalFact: 'Lập từ thế kỷ 18, được phong sắc chỉ triều Nguyễn công nhận là biểu tượng tâm linh hộ quốc tí dân.',
    coordinates: '16.0945° N, 108.2468° E',
  },
  {
    id: 'poi-thuan-phuoc',
    title: 'Cửa Sông Hàn & Chân Cầu Thuận Phước',
    category: 'Cảnh quan & Du lịch',
    distance: '~650 m',
    walkingTime: '8 phút đi bộ',
    highlight: 'Điểm giao thoa sông - vịnh & Tọa độ ngắm hoàng hôn đẹp nhất',
    description:
      'Nơi dòng sông Hàn thơ mộng đổ ra Vịnh Đà Nẵng dưới bóng cầu treo dây võng dài nhất Việt Nam. Cung đường Lê Văn Duyệt ven bờ là điểm dạo mát, ngắm nhìn toàn cảnh bán đảo Sơn Trà và vịnh biển.',
    experienceTag: 'Ngắm hoàng hôn vịnh biển & Cầu Thuận Phước',
    accentColor: '#059669',
    quote: 'Chiều buông cửa vịnh, dải lụa Thuận Phước nối nhịp đôi bờ.',
    historicalFact: 'Cầu Thuận Phước khánh thành năm 2009, biểu tượng nối liền trung tâm thành phố với bán đảo Sơn Trà.',
    coordinates: '16.0910° N, 108.2260° E',
  },
  {
    id: 'poi-am-thuc',
    title: 'Phố Hải Sản & Ẩm Thực Làng Cá Vũng Thùng',
    category: 'Ẩm thực bản địa',
    distance: 'Ngay tại chỗ',
    walkingTime: '1 phút đi bộ',
    highlight: 'Hải sản tươi sống chế biến theo phong vị ngư dân xứ Quảng',
    description:
      'Dọc các trục đường Vũng Thùng và Lý Nhật Quang là chuỗi quán hải sản địa phương phục vụ ghẹ, mực cơm, cá mú, tôm tít tươi rói vừa gỡ lưới với giá cả bình dân và hương vị đậm đà nguyên bản.',
    experienceTag: 'Thưởng thức hải sản tươi & Ẩm thực đêm',
    accentColor: '#DC2626',
    quote: 'Mực nháy cơm xôi vừa hấp chín, chấm muối ớt xanh thơm lừng vị biển.',
    historicalFact: 'Các quán ăn của chính gia đình ngư dân địa phương gìn giữ cách nấu hấp nướng mộc mạc truyền đời.',
    coordinates: '16.0965° N, 108.2410° E',
  },
  {
    id: 'poi-phong-tuyen-1858',
    title: 'Phòng Tuyến Đầu Sóng Sơn Trà (1858)',
    category: 'Lịch sử & Ký ức',
    distance: '~1.2 km',
    walkingTime: '15 phút đi bộ / 3 phút xe',
    highlight: 'Di tích tiền đồn kháng chiến chống thực dân Pháp nổ súng 1858',
    description:
      'Nơi diễn ra phát súng đầu tiên của liên quân Pháp - Tây Ban Nha vào bán đảo Sơn Trà ngày 01/09/1858. Danh tướng Nguyễn Tri Phương cùng quân dân Đà Nẵng đã lập phòng tuyến kiên cường bẻ gãy chiến lược "đánh nhanh thắng nhanh".',
    experienceTag: 'Ký ức giữ nước hào hùng & Tấc đất tấc vàng',
    accentColor: '#B91C1C',
    quote: 'Mỗi hòn đá Sơn Trà đều thấm đượm khí phách kiên trung giữ biển.',
    historicalFact: 'Trận chiến phòng thủ Sơn Trà 1858 - 1860 khiến liên quân thực dân sa lầy suốt 18 tháng.',
    coordinates: '16.1050° N, 108.2380° E',
  },
  {
    id: 'poi-lang-nghe',
    title: 'Làng Nghề Thúng Chai & Nước Mắm Nam Thọ',
    category: 'Tâm linh & Di sản',
    distance: '~800 m',
    walkingTime: '10 phút đi bộ',
    highlight: 'Nghệ thuật đan nan tre trét dầu rái & Ủ chượp cá cơm than',
    description:
      'Những nghệ nhân già giữ lửa nghề đan thúng chai tròn trét dầu rái chống mặn và các cơ sở làm mắm gia truyền với giọt mắm cá cơm thơm lừng màu cánh gián nức tiếng Đà thành.',
    experienceTag: 'Trải nghiệm làng nghề & Mua đặc sản địa phương',
    accentColor: '#7C3AED',
    quote: 'Tay chuốt từng sợi nan tre, trét lớp dầu rái cho thúng cưỡi đầu ngọn sóng.',
    historicalFact: 'Nghề đan thúng chai truyền đời hơn 2 thế kỷ, vật dụng bất ly thân của ngư dân đánh cá ven bờ.',
    coordinates: '16.0930° N, 108.2490° E',
  },
  {
    id: 'poi-siz-innovation',
    title: 'Khu Vực Đổi Mới Sáng Tạo Sơn Trà (SIZ)',
    category: 'Đổi mới sáng tạo',
    distance: '~500 m',
    walkingTime: '6 phút đi bộ',
    highlight: 'Hành lang công nghệ số & Kinh tế đêm tương lai Đà Nẵng',
    description:
      'Trục không gian đường Lê Văn Duyệt và khu vực ven sông đang được quy hoạch thành trung tâm số hóa, nơi hội tụ giải pháp công nghệ, bảo tồn di sản bằng dữ liệu số và trải nghiệm thông minh cho du khách.',
    experienceTag: 'Cầu nối số & Đô thị thông minh',
    accentColor: '#2563EB',
    quote: 'Đưa di sản ngàn đời lên không gian số để thế hệ trẻ mãi nhớ về cội nguồn.',
    historicalFact: 'Định hướng phát triển Đà Nẵng trở thành trung tâm chuyển đổi số và công nghệ cao miền Trung.',
    coordinates: '16.0925° N, 108.2320° E',
  },
];
