// All client-specific content lives here. Duplicate the project,
// edit this file, swap images in /public/wedding/, and publish.

export type Lang = "uz" | "uz-cyrl" | "ru" | "en";

export const wedding = {
  couple: {
    nameA: "Timur",
    nameB: "Safiya",
    monogram: "T & S",
  },
  // ISO date in local time of the venue
  date: {
    iso: "2026-07-25T17:00:00",
    displayDate: "25 July 2026",
    displayTime: "17:00",
    doorsOpenTime: "16:30",
  },
  venue: {
    name: "AFROSIYOB Restaurant",
    addressLine: "Istiqlol Street, 10",
    city: "Fergana",
    mapsGoogle: "https://maps.app.goo.gl/cKjb942EuHE5e1ry8",
    mapsYandex: "https://yandex.uz/maps/-/CPa~6L7k",
    route: "https://yandex.uz/maps/-/CPa~6L7k",
  },
  dressCode: "Formal — light tones preferred",
  format: "Halal · alcohol-free celebration",

  photos: {
    heroBg: "/wedding/hero.jpg",
    fabricBg: "/wedding/fabric.jpg",
    venueExterior: "/wedding/venue-exterior.jpg",
    venueInterior: "/wedding/venue-interior.jpg",
    closingBg: "/wedding/closing.jpg",
    ogImage: "/wedding/hero.jpg",
  },

  music: {
    src: "", // e.g. "/wedding/song.mp3" — leave empty to hide
  },

  share: {
    url: "", // leave empty to use window.location at runtime
  },

  features: {
    music: false,
    countdown: true,
    calendar: true,
    rsvp: true,
    guestList: false,
  },

  language: {
    default: "uz" as Lang,
    available: ["uz", "uz-cyrl", "ru", "en"] as Lang[],
  },
};

// Switcher chip labels.
export const langLabels: Record<Lang, string> = {
  uz: "UZ",
  "uz-cyrl": "УЗ",
  ru: "RU",
  en: "EN",
};

// HTML lang attribute values per locale.
export const htmlLang: Record<Lang, string> = {
  uz: "uz-Latn",
  "uz-cyrl": "uz-Cyrl",
  ru: "ru",
  en: "en",
};

// Calendar localisation: month names + weekday short labels (Mon..Sun).
export const calendarStrings: Record<
  Lang,
  { months: string[]; weekdays: string[] }
> = {
  uz: {
    months: [
      "YANVAR", "FEVRAL", "MART", "APREL", "MAY", "IYUN",
      "IYUL", "AVGUST", "SENTABR", "OKTABR", "NOYABR", "DEKABR",
    ],
    weekdays: ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"],
  },
  "uz-cyrl": {
    months: [
      "ЯНВАРЬ", "ФЕВРАЛЬ", "МАРТ", "АПРЕЛЬ", "МАЙ", "ИЮНЬ",
      "ИЮЛЬ", "АВГУСТ", "СЕНТЯБРЬ", "ОКТЯБРЬ", "НОЯБРЬ", "ДЕКАБРЬ",
    ],
    weekdays: ["Ду", "Се", "Чо", "Па", "Жу", "Ша", "Як"],
  },
  ru: {
    months: [
      "ЯНВАРЬ", "ФЕВРАЛЬ", "МАРТ", "АПРЕЛЬ", "МАЙ", "ИЮНЬ",
      "ИЮЛЬ", "АВГУСТ", "СЕНТЯБРЬ", "ОКТЯБРЬ", "НОЯБРЬ", "ДЕКАБРЬ",
    ],
    weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  },
  en: {
    months: [
      "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
      "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
    ],
    weekdays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  },
};

// UI labels per language. Couple-specific text (names, address, etc.) is shared.
export const i18n: Record<Lang, Record<string, string>> = {
  uz: {
    invitation: "Sizga taklifnoma keldi",
    unlock: "Qulfchani bosib, taklifnomani oching",
    unlockInvitation: "Taklifnomani ochish",
    toggleMusic: "Musiqani yoqish yoki oʻchirish",
    invitationLine: "Toʻyga taklifnoma",
    weAreThankful: "Sizning ishtirokingiz — biz uchun eng qadrli sovgʻa",
    countdownTitle: "Toʻygacha qolgan vaqt",
    days: "kun",
    hours: "soat",
    minutes: "daqiqa",
    seconds: "soniya",
    calendarTitle: "Toʻy kalendari",
    calendarNote: "yurak — toʻy kuni",
    greetingEyebrow: "Hurmatli mehmonlar",
    greetingBody:
      "Biz uchun aziz boʻlgan ushbu kunni siz bilan birga nishonlashni istaymiz. Quvonchimizga sherik boʻlishingizdan mamnun boʻlamiz.",
    detailsTitle: "Tadbir tafsilotlari",
    address: "Manzil",
    time: "Vaqt",
    doorsOpen: "Eshiklar ochiq",
    dressCode: "Kiyinish kodi",
    format: "Format",
    openMap: "Xaritada ochish",
    venueTitle: "Restoran fotosuratlari",
    exterior: "Tashqi koʻrinish",
    interior: "Ichki makon",
    locationTitle: "Bizni toping",
    googleMaps: "Google Maps",
    yandexMaps: "Yandex Maps",
    buildRoute: "Marshrut yaratish",
    rsvpEyebrow: "Ishtirokingizni tasdiqlang",
    rsvpTitle: "Biz bilan boʻling",
    guestName: "Mehmon ismi",
    guestCount: "Mehmonlar soni",
    guestCountRange: "1 — 5 nafar",
    attending: "Toʻyga kelasizmi?",
    yes: "Ha, mamnuniyat bilan",
    no: "Afsuski, kela olmayman",
    comment: "Sharh (ixtiyoriy)",
    submit: "Yuborish",
    required: "* Majburiy maydonlar",
    rsvpThanks: "Rahmat! Javobingiz qabul qilindi.",
    giftsTitle: "Mehmonlarga iltimoslar",
    closingTitle: "Toʻyga xush kelibsiz!",
    closingBody:
      "Bu baxtli kunda biz bilan birga boʻlganingiz uchun samimiy minnatdorchilik bildiramiz.",
    closingSign: "Hurmat bilan,",
    shareTitle: "Doʻstlaringizga yetkazing",
    shareBody:
      "Taklifnomani yaqinlaringizga ham ulashing — ular ham bizning bayramimizga taklif qilingan!",
    shareTelegram: "Telegram",
    shareWhatsApp: "WhatsApp",
    telegramGroup: "Telegram guruh",
    copy: "Nusxa olish",
    copied: "Havola nusxalandi!",
    scrollDown: "Pastga aylantiring",
    notFoundTitle: "Sahifa topilmadi",
    notFoundBody: "Siz qidirayotgan sahifa mavjud emas yoki koʻchirilgan.",
    goHome: "Bosh sahifaga",
    errorTitle: "Sahifa yuklanmadi",
    errorBody: "Texnik xatolik yuz berdi. Yangilab koʻring yoki bosh sahifaga qayting.",
    tryAgain: "Qayta urinish",
  },
  "uz-cyrl": {
    invitation: "Сизга таклифнома келди",
    unlock: "Қулфчани босиб, таклифномани очинг",
    unlockInvitation: "Таклифномани очиш",
    toggleMusic: "Мусиқани ёқиш ёки ўчириш",
    invitationLine: "Тўйга таклифнома",
    weAreThankful: "Сизнинг иштирокингиз — биз учун энг қадрли совға",
    countdownTitle: "Тўйгача қолган вақт",
    days: "кун",
    hours: "соат",
    minutes: "дақиқа",
    seconds: "сония",
    calendarTitle: "Тўй календари",
    calendarNote: "юрак — тўй куни",
    greetingEyebrow: "Ҳурматли меҳмонлар",
    greetingBody:
      "Биз учун азиз бўлган ушбу кунни сиз билан бирга нишонлашни истаймиз. Қувончимизга шерик бўлишингиздан мамнун бўламиз.",
    detailsTitle: "Тадбир тафсилотлари",
    address: "Манзил",
    time: "Вақт",
    doorsOpen: "Эшиклар очиқ",
    dressCode: "Кийиниш коди",
    format: "Формат",
    openMap: "Харитада очиш",
    venueTitle: "Ресторан фотосуратлари",
    exterior: "Ташқи кўриниш",
    interior: "Ички макон",
    locationTitle: "Бизни топинг",
    googleMaps: "Google Maps",
    yandexMaps: "Yandex Maps",
    buildRoute: "Маршрут яратиш",
    rsvpEyebrow: "Иштирокингизни тасдиқланг",
    rsvpTitle: "Биз билан бўлинг",
    guestName: "Меҳмон исми",
    guestCount: "Меҳмонлар сони",
    guestCountRange: "1 — 5 нафар",
    attending: "Тўйга келасизми?",
    yes: "Ҳа, мамнуният билан",
    no: "Афсуски, кела олмайман",
    comment: "Шарҳ (ихтиёрий)",
    submit: "Юбориш",
    required: "* Мажбурий майдонлар",
    rsvpThanks: "Раҳмат! Жавобингиз қабул қилинди.",
    giftsTitle: "Меҳмонларга илтимослар",
    closingTitle: "Тўйга хуш келибсиз!",
    closingBody:
      "Бу бахтли кунда биз билан бирга бўлганингиз учун самимий миннатдорчилик билдирамиз.",
    closingSign: "Ҳурмат билан,",
    shareTitle: "Дўстларингизга етказинг",
    shareBody:
      "Таклифномани яқинларингизга ҳам улашинг — улар ҳам бизнинг байрамимизга таклиф қилинган!",
    shareTelegram: "Telegram",
    shareWhatsApp: "WhatsApp",
    telegramGroup: "Telegram гуруҳ",
    copy: "Нусха олиш",
    copied: "Ҳавола нусхаланди!",
    scrollDown: "Пастга айлантиринг",
    notFoundTitle: "Саҳифа топилмади",
    notFoundBody: "Сиз қидираётган саҳифа мавжуд эмас ёки кўчирилган.",
    goHome: "Бош саҳифага",
    errorTitle: "Саҳифа юкланмади",
    errorBody: "Техник хатолик юз берди. Янгилаб кўринг ёки бош саҳифага қайтинг.",
    tryAgain: "Қайта уриниш",
  },
  ru: {
    invitation: "Вам пришло приглашение",
    unlock: "Нажмите на замок, чтобы открыть приглашение",
    unlockInvitation: "Открыть приглашение",
    toggleMusic: "Включить или выключить музыку",
    invitationLine: "Приглашение на свадьбу",
    weAreThankful: "Ваше присутствие — для нас самый дорогой подарок",
    countdownTitle: "До свадьбы осталось",
    days: "дней",
    hours: "часов",
    minutes: "минут",
    seconds: "секунд",
    calendarTitle: "Календарь свадьбы",
    calendarNote: "сердце — день свадьбы",
    greetingEyebrow: "Уважаемые гости",
    greetingBody:
      "Мы хотим разделить этот дорогой для нас день вместе с вами. Будем рады разделить нашу радость.",
    detailsTitle: "Детали торжества",
    address: "Адрес",
    time: "Время",
    doorsOpen: "Двери открыты с",
    dressCode: "Дресс-код",
    format: "Формат",
    openMap: "Открыть на карте",
    venueTitle: "Фото ресторана",
    exterior: "Снаружи",
    interior: "Внутри",
    locationTitle: "Как нас найти",
    googleMaps: "Google Maps",
    yandexMaps: "Yandex Maps",
    buildRoute: "Построить маршрут",
    rsvpEyebrow: "Подтвердите участие",
    rsvpTitle: "Будьте с нами",
    guestName: "Имя гостя",
    guestCount: "Количество гостей",
    guestCountRange: "1 — 5 человек",
    attending: "Придёте на свадьбу?",
    yes: "Да, с удовольствием",
    no: "К сожалению, не смогу",
    comment: "Комментарий (необязательно)",
    submit: "Отправить",
    required: "* Обязательные поля",
    rsvpThanks: "Спасибо! Ваш ответ принят.",
    giftsTitle: "Просьбы к гостям",
    closingTitle: "Добро пожаловать на свадьбу!",
    closingBody:
      "Сердечно благодарим за то, что вы рядом с нами в этот счастливый день.",
    closingSign: "С уважением,",
    shareTitle: "Поделитесь с близкими",
    shareBody:
      "Передайте приглашение близким — они тоже приглашены на наш праздник!",
    shareTelegram: "Telegram",
    shareWhatsApp: "WhatsApp",
    telegramGroup: "Telegram-группа",
    copy: "Скопировать",
    copied: "Ссылка скопирована!",
    scrollDown: "Прокрутите вниз",
    notFoundTitle: "Страница не найдена",
    notFoundBody: "Запрошенная страница не существует или была перемещена.",
    goHome: "На главную",
    errorTitle: "Страница не загрузилась",
    errorBody: "Что-то пошло не так. Попробуйте обновить или вернуться на главную.",
    tryAgain: "Повторить",
  },
  en: {
    invitation: "You have an invitation",
    unlock: "Tap the lock to open your invitation",
    unlockInvitation: "Unlock invitation",
    toggleMusic: "Toggle music",
    invitationLine: "Wedding invitation",
    weAreThankful: "Your presence is the dearest gift to us",
    countdownTitle: "Time until the wedding",
    days: "days",
    hours: "hours",
    minutes: "minutes",
    seconds: "seconds",
    calendarTitle: "Wedding calendar",
    calendarNote: "heart — the wedding day",
    greetingEyebrow: "Dear guests",
    greetingBody:
      "We would love to celebrate this precious day together with you. It would mean the world to share our joy with you.",
    detailsTitle: "Event details",
    address: "Address",
    time: "Time",
    doorsOpen: "Doors open at",
    dressCode: "Dress code",
    format: "Format",
    openMap: "Open in map",
    venueTitle: "Venue photos",
    exterior: "Exterior",
    interior: "Interior",
    locationTitle: "Find us",
    googleMaps: "Google Maps",
    yandexMaps: "Yandex Maps",
    buildRoute: "Get directions",
    rsvpEyebrow: "Confirm your attendance",
    rsvpTitle: "Be with us",
    guestName: "Guest name",
    guestCount: "Number of guests",
    guestCountRange: "1 — 5 guests",
    attending: "Will you attend?",
    yes: "Yes, with pleasure",
    no: "Sadly, I can't make it",
    comment: "Comment (optional)",
    submit: "Submit",
    required: "* Required fields",
    rsvpThanks: "Thank you! Your response was received.",
    giftsTitle: "A note to our guests",
    closingTitle: "Welcome to our wedding!",
    closingBody:
      "Thank you sincerely for being with us on this happy day.",
    closingSign: "With love,",
    shareTitle: "Share with loved ones",
    shareBody:
      "Forward this invitation — your loved ones are invited to our celebration too!",
    shareTelegram: "Telegram",
    shareWhatsApp: "WhatsApp",
    telegramGroup: "Telegram group",
    copy: "Copy link",
    copied: "Link copied!",
    scrollDown: "Scroll down",
    notFoundTitle: "Page not found",
    notFoundBody: "The page you're looking for doesn't exist or has been moved.",
    goHome: "Go home",
    errorTitle: "This page didn't load",
    errorBody: "Something went wrong on our end. You can try refreshing or head back home.",
    tryAgain: "Try again",
  },
};

// Per-client greeting / closing / gifts text, translated per locale.
// Leave a locale blank ("") to fall back to the default language.
type LocalisedText = Record<Lang, string>;

export const messages = {
  greeting: {
    uz: "Biz uchun aziz boʻlgan ushbu kunni siz bilan birga nishonlashni istaymiz. Quvonchimizga sherik boʻlishingizdan mamnun boʻlamiz.",
    "uz-cyrl":
      "Биз учун азиз бўлган ушбу кунни сиз билан бирга нишонлашни истаймиз. Қувончимизга шерик бўлишингиздан мамнун бўламиз.",
    ru: "Мы хотим разделить этот дорогой для нас день вместе с вами. Будем рады разделить нашу радость.",
    en: "We would love to celebrate this precious day together with you. It would mean the world to share our joy with you.",
  } satisfies LocalisedText,
  gifts: {
    intro: {
      uz: "Biz uchun eng muhimi — sizning toʻy oqshomida yonimizda boʻlishingiz. Eʼtiboringiz va ishtirokingizni chin qalbdan qadrlaymiz.",
      "uz-cyrl":
        "Биз учун энг муҳими — сизнинг тўй оқшомида ёнимизда бўлишингиз. Эътиборингиз ва иштирокингизни чин қалбдан қадрлаймиз.",
      ru: "Для нас самое главное — ваше присутствие рядом в свадебный вечер. Мы от всего сердца ценим ваше внимание и участие.",
      en: "What matters most to us is having you by our side on the wedding evening. We deeply appreciate your attention and presence.",
    } satisfies LocalisedText,
    envelope: {
      uz: "Agar bizni yanada xursand qilmoqchi boʻlsangiz, yosh oilamizga eʼtiboringizni konvert shaklida bildirsangiz, mamnun boʻlamiz.",
      "uz-cyrl":
        "Агар бизни янада хурсанд қилмоқчи бўлсангиз, ёш оиламизга эътиборингизни конверт шаклида билдирсангиз, мамнун бўламиз.",
      ru: "Если вы захотите порадовать нас ещё больше, мы будем благодарны, если выразите внимание нашей молодой семье в форме конверта.",
      en: "If you'd like to make us even happier, we would be grateful to receive your attention to our young family in the form of an envelope.",
    } satisfies LocalisedText,
    danceNote: {
      uz: "Raqs vaqtida pul qistirmasligingizni iltimos qilamiz. Sizning samimiy tabassumingiz biz uchun eng qimmatli hadyadir.",
      "uz-cyrl":
        "Рақс вақтида пул қистирмаслигингизни илтимос қиламиз. Сизнинг самимий табассумингиз биз учун энг қимматли ҳадядир.",
      ru: "Просим вас не вкладывать деньги во время танца. Ваша искренняя улыбка — самый ценный подарок для нас.",
      en: "Please refrain from tucking money during the dance. Your sincere smile is the most precious gift to us.",
    } satisfies LocalisedText,
    telegramGroupUrl: "",
  },
  closing: {
    uz: "Bu baxtli kunda biz bilan birga boʻlganingiz uchun samimiy minnatdorchilik bildiramiz.",
    "uz-cyrl":
      "Бу бахтли кунда биз билан бирга бўлганингиз учун самимий миннатдорчилик билдирамиз.",
    ru: "Сердечно благодарим за то, что вы рядом с нами в этот счастливый день.",
    en: "Thank you sincerely for being with us on this happy day.",
  } satisfies LocalisedText,
};

// Pick a localised string with safe fallback to the default language, then "".
export function pickText(text: LocalisedText, lang: Lang): string {
  return text[lang] || text[wedding.language.default] || text.en || "";
}

// Translation lookup with fallback to the default language.
export function t(lang: Lang, key: string): string {
  return (
    i18n[lang]?.[key] ||
    i18n[wedding.language.default]?.[key] ||
    i18n.en[key] ||
    key
  );
}
