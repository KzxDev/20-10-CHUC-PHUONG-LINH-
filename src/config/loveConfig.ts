// =====================================================================================
// 💌 OUR LITTLE UNIVERSE — LOVE CONFIG
// -------------------------------------------------------------------------------------
// Đây là nơi DUY NHẤT bạn cần chỉnh sửa để thay đổi nội dung của cả website.
// Không cần tìm và sửa trong hàng chục file khác nhau.
//
// HƯỚNG DẪN NHANH:
// 1) Đổi tên người nhận ở `HER_NAME`.
// 2) Đổi ngày bắt đầu yêu nhau ở `ANNIVERSARY_DATE` (định dạng "YYYY-MM-DDTHH:mm:ss").
//    -> Nếu bạn chưa chắc chắn ngày chính xác, CỨ ĐỂ NGUYÊN giá trị `null`.
//       Website sẽ tự động hiển thị "2 YEARS TOGETHER" thay cho bộ đếm chi tiết.
// 3) Thêm ảnh kỷ niệm thật vào thư mục `public/photos/` rồi khai báo trong `GALLERY_PHOTOS`.
// 4) Sửa lời nhắn, thư tay, lời khen, điều ước... ngay bên dưới.
// =====================================================================================

export const HER_NAME = "Phương Linh";
export const HER_NICKNAME = "Phương Linh iu";

// Đặt ngày giờ bắt đầu yêu nhau tại đây. Ví dụ: "2023-10-20T00:00:00"
// Để `null` nếu chưa muốn công bố ngày chính xác — site sẽ hiện "2 YEARS TOGETHER".
export const ANNIVERSARY_DATE: string | null = null;

// Nhãn hiển thị khi ANNIVERSARY_DATE = null
export const ANNIVERSARY_FALLBACK_LABEL = "2 YEARS TOGETHER";

export const SITE_META = {
  title: "Our Little Universe 💌",
  subtitle: "2 Years of Us × Vietnamese Women's Day 20.10",
  tagline: "2 NĂM, VÔ VÀN KỶ NIỆM, MỘT NGƯỜI ĐẶC BIỆT DUY NHẤT — PHƯƠNG LINH .",
};

// ---------------------------------------------------------------------------
// PHẦN 2 — INTRO
// ---------------------------------------------------------------------------
export const INTRO = {
  envelopeLine1: "Có một món quà nhỏ...",
  envelopeLine2: "dành riêng cho Phương Linh iu 💌",
  openButton: " Mở lá thư của chồng Huân iuu✨",
  skipButton: "Đừng bấm vô đây nha →",
  revealTitle: "OUR LITTLE UNIVERSE",
};

// ---------------------------------------------------------------------------
// PHẦN 3 — TWO YEARS TOGETHER
// ---------------------------------------------------------------------------
export const STORY_INTRO = {
  eyebrow: "OUR STORY",
  title: "HAI NĂM \nMỘT TÌNH YÊU ĐẸP.",
  description:
    "2 năm bên nhau — và vẫn còn thật nhiều điều đẹp đẽ đang chờ phía trước.",
  caption: "Mỗi khoảnh khắc nhỏ đều đáng trân trọng.",
};

export type TimelineChapter = {
  id: string;
  number: string;
  title: string;
  text: string;
};

export const TIMELINE_CHAPTERS: TimelineChapter[] = [
  {
    id: "chapter-01",
    number: "CHAPTER 01",
    title: "KHỞI ĐẦU",
    text: "Có những điều đẹp đẽ bắt đầu từ những khoảnh khắc rất bình thường.",
  },
  {
    id: "chapter-02",
    number: "CHAPTER 02",
    title: "KHOẢNH KHẮC NÈ <3",
    text: "Những lần trò chuyện, những nụ cười và những điều nhỏ bé đã dần trở thành một phần đặc biệt của chúng mình.",
  },
  {
    id: "chapter-03",
    number: "CHAPTER 03",
    title: "HAI NĂM CỦA CHÚNG TA",
    text: "Hai năm không chỉ là thời gian. Đó còn là rất nhiều khoảnh khắc mà chúng mình đã cùng nhau đi qua.",
  },
  {
    id: "chapter-04",
    number: "CHAPTER 04",
    title: "VẪN CHỌN ANH",
    text: "Nếu được lưu giữ một điều, anh vẫn muốn lưu giữ những khoảnh khắc có Linh trong đó.",
  },
  {
    id: "chapter-05",
    number: "CHAPTER 05",
    title: "ĐÂY CHỈ LÀ MỘT TRANG ĐẸP",
    text: "Đây không phải đoạn kết của câu chuyện. Chỉ là một trang thật đẹp trong hành trình của chúng mình.",
  },
];

// ---------------------------------------------------------------------------
// PHẦN 4 — MEMORY GALLERY
// ---------------------------------------------------------------------------
export const GALLERY_INTRO = {
  title: "OUR LITTLE COLLECTION OF MEMORIES",
  description:
    "Mỗi bức ảnh là một khoảnh khắc nhỏ, nhưng khi nhìn lại, chúng trở thành một phần thật đẹp của chúng mình.",
  helper:
    "Thêm ảnh thật của hai bạn vào thư mục public/photos/ rồi cập nhật đường dẫn bên dưới để thay thế khung ảnh placeholder này.",
};

export type GalleryPhoto = {
  id: number;
  fileName: string;
  caption: string;
  date?: string;
  src?: string; // để trống -> hiển thị khung placeholder thiết kế sẵn
};

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: 1, fileName: "memory-01.jpg", caption: "Thêm caption kỷ niệm của bạn ở đây", date: "" },
  { id: 2, fileName: "memory-02.jpg", caption: "Một khoảnh khắc nhỏ đáng nhớ", date: "" },
  { id: 3, fileName: "memory-03.jpg", caption: "Nụ cười ấy, anh vẫn còn nhớ", date: "" },
  { id: 4, fileName: "memory-04.jpg", caption: "Một ngày bình thường mà rất đẹp", date: "" },
  { id: 5, fileName: "memory-05.jpg", caption: "Kỷ niệm này để dành cho Linh", date: "" },
  { id: 6, fileName: "memory-06.jpg", caption: "Chúng mình của hai năm trước", date: "" },
  { id: 7, fileName: "memory-07.jpg", caption: "Và chúng mình của bây giờ", date: "" },
  { id: 8, fileName: "memory-08.jpg", caption: "Còn rất nhiều điều phía trước", date: "" },
];

// ---------------------------------------------------------------------------
// PHẦN 5 — MAGICAL GARDEN
// ---------------------------------------------------------------------------
export const GARDEN_INTRO = {
  title: "MỘT KHU VƯỜN NHỎ CỦA CHÚNG MÌNH",
  description: "Một khu vườn nhỏ lớn lên theo từng khoảnh khắc chúng mình bên nhau.",
  flowerMessage: "Linh xứng đáng với những điều dịu dàng nhất. 💗",
};

// ---------------------------------------------------------------------------
// PHẦN 6 — LOVE CONSTELLATION
// ---------------------------------------------------------------------------
export const CONSTELLATION = {
  title: "PHƯƠNG LINH IU",
  subtitle: "CẢM ƠN LINH VÌ ĐÃ Ở BÊN ANH TRONG HAI NĂM QUA. CẢM ƠN EM VÌ ĐÃ CHỌN ANH , CHÚC EM BÉ CỦA ANH 20/10 THẬT HẠNH PHÚC 💗",
};

// ---------------------------------------------------------------------------
// PHẦN 7 — LOVE LETTER
// ---------------------------------------------------------------------------
export const LOVE_LETTER = {
  title: "LÁ THƯ NÀY DÀNH RIÊNG CHO LINH YÊU CỦA ANH ",
  rereadButton: "Đọc lại lá thư",
  hugButton: "Gửi một cái ôm 💗",
  paragraphs: [
    "Gửi Phương Linh iu,",
    "Vậy là chúng mình đã đi cùng nhau được hai năm rồi.",
    "Hai năm có thể không phải là quãng thời gian dài nhất trên thế giới, nhưng với anh, đó là một hành trình có rất nhiều điều đáng trân trọng. Có những khoảnh khắc vui vẻ, những điều giản dị và những kỷ niệm khiến anh nhận ra rằng một người đặc biệt có thể làm cho những ngày bình thường trở nên đáng nhớ đến thế nào.",
    "Nhân ngày Phụ nữ Việt Nam 20/10, anh muốn dành cho Linh một món quà nhỏ do chính mình tạo nên. Có thể nó không phải món quà lớn lao nhất, nhưng anh hy vọng từng chi tiết trong đây sẽ khiến Linh mỉm cười.",
    "Chúc Linh luôn xinh đẹp theo cách riêng của mình, luôn vui vẻ, bình an, được yêu thương và có đủ dũng khí để theo đuổi những điều Linh mong muốn.",
    "Cảm ơn Linh vì đã là một phần đặc biệt trong hành trình hai năm này.",
    "Và mong rằng câu chuyện của chúng mình sẽ còn có thêm thật nhiều trang đẹp ở phía trước.",
    "Chúc Phương Linh iu một ngày 20/10 thật hạnh phúc. 💗",
  ],
  signatureLine1: "Anh Yêu Của Linh,",
  signatureLine2: "HuuHuan",
};

// ---------------------------------------------------------------------------
// PHẦN 8 — GIFT ROOM
// ---------------------------------------------------------------------------
export const GIFT_ROOM = {
  title: "THE GIFT ROOM",
  description: "Một hộp quà nhỏ đang chờ Linh mở ra.",
  openPrompt: "Chạm vào hộp quà để mở ✨",
  gifts: [
    {
      id: "compliment",
      title: "GIFT 01 — A LITTLE COMPLIMENT",
      description: "Một lời khen nho nhỏ dành cho Linh.",
      buttonLabel: "Mở lời khen",
    },
    {
      id: "wish",
      title: "GIFT 02 — A WISH FOR YOU",
      description: "Một điều ước về sức khỏe, niềm vui và sự bình an.",
      buttonLabel: "Mở điều ước",
    },
    {
      id: "album",
      title: "GIFT 03 — TWO YEARS, ONE MEMORY BOOK",
      description: "Mở lại album kỷ niệm hai năm của chúng mình.",
      buttonLabel: "Mở album",
    },
  ],
};

export const COMPLIMENTS: string[] = [
  "Nụ cười của Linh là điều khiến mọi thứ trở nên nhẹ nhõm hơn rất nhiều.",
  "Linh dịu dàng theo cách rất riêng, không cần cố gắng cũng khiến người khác thấy ấm áp.",
  "Sự chân thành của Linh là điều khiến anh luôn thấy an tâm.",
  "Linh mạnh mẽ hơn Linh nghĩ rất nhiều.",
  "Chỉ cần Linh vui, mọi chuyện xung quanh cũng như nhẹ nhàng hơn.",
  "Linh xứng đáng với tất cả những điều tốt đẹp đang và sẽ đến.",
];

export const WISHES_FOR_HER: string[] = [
  "Chúc Linh luôn khỏe mạnh và ngủ ngon mỗi đêm.",
  "Chúc Linh luôn giữ được nụ cười trong trẻo như bây giờ.",
  "Chúc những điều Linh cố gắng đều có kết quả xứng đáng.",
  "Chúc Linh luôn bình an, dù ở bất cứ đâu.",
  "Chúc Linh được yêu thương nhiều như Linh đã yêu thương mọi người.",
];

// ---------------------------------------------------------------------------
// PHẦN 9 — 20/10 CELEBRATION
// ---------------------------------------------------------------------------
export const CELEBRATION = {
  eyebrow: "VIETNAMESE WOMEN'S DAY",
  title: "HAPPY VIETNAMESE WOMEN'S DAY",
  headline: "Chúc Phương Linh iu 20/10 thật hạnh phúc 💗",
  body: "Chúc Linh luôn rạng rỡ, tự tin, vui vẻ và được yêu thương thật nhiều. Mong rằng những điều dịu dàng nhất sẽ tìm đến Linh, hôm nay và cả những ngày bình thường sau này.",
  wishButton: "Make a wish for Linh",
  replayButton: "Xem pháo hoa lần nữa ✨",
};

// ---------------------------------------------------------------------------
// PHẦN 10 — WISH MAKER
// ---------------------------------------------------------------------n------
export const WISH_MAKER = {
  title: "VIẾT ĐIỀU ƯỚC CỦA EM  <3",
  placeholder: "Nhập điều ước của Linh vào đây...",
  sendButton: "Gửi điều ước ✨",
  clearButton: "Xóa & nhập lại",
  emptyWarning: "Linh ơi, hãy viết một điều ước trước khi gửi nhé 💭",
  successMessage: "May your little wish find its way to the stars. ✨",
};

// ---------------------------------------------------------------------------
// PHẦN 11 — EASTER EGGS
// ---------------------------------------------------------------------------
export const EASTER_EGGS = {
  unlockedTitle: "YOU FOUND ALL OUR LITTLE SECRETS 💗",
  unlockedSubtitle: "Cảm ơn Linh đã kiên nhẫn khám phá hết những điều nhỏ bé này.",
  backButton: "Quay lại khu vườn",
  secretMessages: {
    gardenFlowers: "Có ba điều anh chưa từng nói: cảm ơn Linh, nhớ Linh, và thương Linh rất nhiều.",
    moon: "Một cơn mưa sao băng nhỏ, giống như những điều ước anh luôn dành cho Linh.",
    star: "Dù vũ trụ có rộng lớn đến đâu, anh vẫn luôn tìm được đường về phía Linh.",
    envelopeSeal: "Xem lại từ đầu — vì vài câu chuyện đẹp đáng được kể lại nhiều lần.",
    galleryHeart: "Lời nhắn ẩn: cảm ơn vì đã luôn ở đây, cùng anh đi qua hai năm vừa rồi.",
  },
};

// ---------------------------------------------------------------------------
// PHẦN 12 — AUDIO
// ---------------------------------------------------------------------------

export const AUDIO = {
  backgroundMusicSrc:
    "https://orangefreesounds.com/wp-content/uploads/2025/04/Emotional-romantic-piano-music.mp3",
  chimeSrc: "/audio/chime.mp3",
  defaultVolume: 0.2,
  helper:
    "Nhạc nền piano lãng mạn. Hiệu ứng chime cần file public/audio/chime.mp3.",
};

// ---------------------------------------------------------------------------
// PHẦN 13 — NAVIGATION
// ---------------------------------------------------------------------------
export const NAV_ITEMS = [
  { id: "story", label: "Our Story" },
  { id: "memories", label: "Memories" },
  { id: "garden", label: "Garden" },
  { id: "letter", label: "Love Letter" },
  { id: "gift", label: "Gift" },
  { id: "celebration", label: "20/10" },
];

// ---------------------------------------------------------------------------
// ẢNH NỀN CINEMATIC
// ---------------------------------------------------------------------------
export const BACKGROUNDS = {
  nebulaHeart: "/images/bg-nebula-heart.jpg",
  roseGardenMidnight: "/images/bg-rose-garden-midnight.jpg",
  stonePathGate: "/images/bg-stone-path-gate.jpg",
  lakeGardenMoon: "/images/bg-lake-garden-moon.jpg",
  sunsetDreamscape: "/images/bg-sunset-dreamscape.jpg",
  gallerySpace: "/images/bg-gallery-space.jpg",
  endingGateStars: "/images/bg-ending-gate-stars.jpg",
  giftRoom: "/images/bg-gift-room.jpg",
};
