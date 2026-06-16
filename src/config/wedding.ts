// All client-specific content lives here. Duplicate the project,
// edit this file, swap images in /public/wedding/, and publish.

export type Lang = "uz" | "ru" | "en";

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
    available: ["uz", "ru", "en"] as Lang[],
  },
};

// UI labels per language. Couple-specific text (names, address, etc.) is shared.
export const i18n: Record<Lang, Record<string, string>> = {
  uz: {
    invitation: "Sizga taklifnoma keldi",
    unlock: "Qulfchani bosib, taklifnomani oching",
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
    copy: "Nusxa olish",
    copied: "Havola nusxalandi!",
    scrollDown: "Pastga aylantiring",
  },
  ru: {
    invitation: "Вам пришло приглашение",
    unlock: "Нажмите на замок, чтобы открыть приглашение",
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
    copy: "Скопировать",
    copied: "Ссылка скопирована!",
    scrollDown: "Прокрутите вниз",
  },
  en: {
    invitation: "You have an invitation",
    unlock: "Tap the lock to open your invitation",
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
    copy: "Copy link",
    copied: "Link copied!",
    scrollDown: "Scroll down",
  },
};

// Per-client greeting / closing / gifts text. Kept outside i18n so each
// couple can write it in their own voice. Use whichever language(s) you like.
export const messages = {
  greeting:
    "Biz uchun aziz boʻlgan ushbu kunni siz bilan birga nishonlashni istaymiz. Quvonchimizga sherik boʻlishingizdan mamnun boʻlamiz.",
  gifts: {
    intro:
      "Biz uchun eng muhimi — sizning toʻy oqshomida yonimizda boʻlishingiz. Eʼtiboringiz va ishtirokingizni chin qalbdan qadrlaymiz.",
    envelope:
      "Agar bizni yanada xursand qilmoqchi boʻlsangiz, yosh oilamizga eʼtiboringizni konvert shaklida bildirsangiz, mamnun boʻlamiz.",
    danceNote:
      "Raqs vaqtida pul qistirmasligingizni iltimos qilamiz. Sizning samimiy tabassumingiz biz uchun eng qimmatli hadyadir.",
    telegramGroupUrl: "",
  },
  closing:
    "Bu baxtli kunda biz bilan birga boʻlganingiz uchun samimiy minnatdorchilik bildiramiz.",
};
