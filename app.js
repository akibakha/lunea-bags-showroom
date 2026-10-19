(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const RUB_RATE = 100;
  const MAX_QTY = 9;
  const productNamesRu = {
    "Линия": "Линия",
    "Мягкий контур": "Мягкий контур",
    "Вера": "Вера",
    "Ночной штрих": "Ночной штрих",
    "Городской объём": "Городской объём",
    "Плетёный свет": "Плетёный свет",
    "Терракота": "Терракота",
    "Складка": "Складка",
    "Полумесяц": "Полумесяц",
    "Деловой штрих": "Деловой штрих",
    "Амулет": "Амулет",
    "Свободный клапан": "Свободный клапан"
  };
  const categoryNamesRu = {
    EastWest: "Сумки восток–запад",
    TopHandle: "Сумки с верхней ручкой",
    Shoulder: "Сумки на плечо",
    Crossbody: "Кросс-боди",
    Tote: "Тоуты",
    Bucket: "Сумки-мешки",
    Clutch: "Клатчи",
    "The edit": "Выбор редакции"
  };
  const productSearchTerms = {
    "Линия": "гладкая кожа коньячный вытянутая восток запад",
    "Мягкий контур": "замша мокко мягкая хобо мешок",
    "Вера": "зернистая кожа каштановый верхняя ручка структурная",
    "Ночной штрих": "гладкая кожа чёрный верхняя ручка вечерняя",
    "Городской объём": "экокожа терракота большой тоут",
    "Плетёный свет": "рафия хлопок песочный плетёный тоут",
    "Терракота": "зернистая кожа тёплый коричневый на плечо",
    "Складка": "мягкая кожа карамельный клатч вечерняя",
    "Полумесяц": "мягкая кожа пудровый на плечо",
    "Деловой штрих": "крокодиловая фактура тёмный шоколад тоут деловая",
    "Амулет": "гладкая кожа вишнёвый кросс боди мини",
    "Свободный клапан": "матовая кожа чёрный кросс боди"
  };
  const colourNamesRu = {
    "Коньячный": "Коньячный",
    "Мокко": "Мокко",
    "Каштановый": "Каштановый",
    "Чёрный": "Чёрный",
    "Терракотовый": "Терракотовый",
    "Песочный": "Песочный",
    "Тёплый коричневый": "Тёплый коричневый",
    "Карамельный": "Карамельный",
    "Шоколадный": "Шоколадный",
    "Тёмный шоколад": "Тёмный шоколад",
    "Вишнёвый": "Вишнёвый"
  };
  const translations = new Map(Object.entries({
    "CURATING YOUR EDIT": "СОБИРАЕМ ВАШУ ПОДБОРКУ",
    "VIEW": "СМОТРЕТЬ",
    "Home": "Главная",
    "Shop": "Каталог",
    "New arrivals": "Новинки",
    "Sale": "Распродажа",
    "EN / US": "RU / ₽",
    "Shop by category": "Категории",
    "Clothing": "Одежда",
    "Shoes": "Обувь",
    "Accessories": "Аксессуары",
    "Best sellers": "Бестселлеры",
    "THE NEW EDIT": "НОВАЯ ПОДБОРКА",
    "Explore now ↗": "Смотреть ↗",
    "SELECTED SALE": "ИЗБРАННОЕ СО СКИДКОЙ",
    "Up to 40% off ↗": "Скидки до 40% ↗",
    "MENU": "МЕНЮ",
    "Journal": "Журнал",
    "New York · 09:41": "Москва · 09:41",
    "New collection · 2026": "Новая коллекция · 2026",
    "Elevate": "Создай",
    "Your": "Свой",
    "Style": "Стиль",
    "Timeless pieces, hand-picked for modern life. Quiet confidence in every detail.": "Вневременные вещи, отобранные для современной жизни. Спокойная уверенность в каждой детали.",
    "Shop now": "Смотреть коллекцию",
    "Sound off": "Атмосфера выкл.",
    "✦ Free shipping over $150": "✦ Бесплатная доставка от 15 000 ₽",
    "↩ 30-day easy returns": "↩ Возврат в течение 30 дней",
    "◇ Secure payment": "◇ Безопасная оплата",
    "✦ Premium quality": "✦ Премиальное качество",
    "What we curate": "Наш выбор",
    "Three quiet": "Три главных",
    "obsessions.": "принципа.",
    "Fewer pieces, chosen better. We search for character, craft and the kind of quality that gets more personal with time.": "Меньше вещей — точнее выбор. Мы ищем характер, мастерство и качество, которое со временем становится только лучше.",
    "CURATED": "ОТОБРАНО",
    "MODERN": "СОВРЕМЕННО",
    "CONSIDERED": "ПРОДУМАНО",
    "Enduring icons": "Вневременные силуэты",
    "Natural texture": "Натуральные фактуры",
    "Useful beauty": "Красота в деталях",
    "Silhouettes that outlive the season.": "Силуэты, которые переживут не один сезон.",
    "Honest materials, beautifully tactile.": "Честные материалы, приятные на ощупь.",
    "Details with a reason to be there.": "Каждая деталь на своём месте.",
    "THE SPRING EDIT · 2026": "ВЕСЕННЯЯ ПОДБОРКА · 2026",
    "THE ICON": "ИКОНА",
    "The spring": "Весенняя",
    "edit.": "подборка.",
    "Layer lighter. Move easier. A precise wardrobe built around rich earth tones and effortless proportions.": "Лёгкие слои и свобода движения. Точный гардероб в природных оттенках и свободных пропорциях.",
    "View the collection": "Смотреть коллекцию",
    "Leather Biker": "Кожаная косуха",
    "Corduroy Cap": "Вельветовая кепка",
    "Browse the edit": "Выберите категорию",
    "Shop by category": "Категории",
    "T-Shirts": "Футболки",
    "Hoodies": "Худи",
    "Outerwear": "Верхняя одежда",
    "Trousers": "Брюки",
    "Shirts": "Рубашки",
    "Hats": "Головные уборы",
    "Just in": "Только поступили",
    "Newly dropped": "Новые поступления",
    "Shop all": "Смотреть всё",
    "NEW": "НОВИНКА",
    "LIMITED": "ЛИМИТИРОВАНО",
    "Quick add": "В корзину",
    "PRIVATE OFFER · THIS WEEK": "ЗАКРЫТОЕ ПРЕДЛОЖЕНИЕ · ЭТА НЕДЕЛЯ",
    "Selected essentials": "Избранные вещи",
    "Up to": "До",
    "off": "скидки",
    "Explore the sale": "Смотреть распродажу",
    "USE CODE": "ПРОМОКОД",
    "Most wanted": "Самые желанные",
    "All": "Все",
    "Tops": "Верх",
    "A wardrobe in six acts": "Гардероб в шести образах",
    "Shop the collection": "Смотреть коллекцию",
    "Hover or tap to explore": "Наведите или нажмите",
    "01 / COMFORT": "01 / КОМФОРТ",
    "02 / SHELTER": "02 / ЗАЩИТА",
    "03 / UTILITY": "03 / ФУНКЦИЯ",
    "04 / LAYERS": "04 / СЛОИ",
    "05 / CRAFT": "05 / МАСТЕРСТВО",
    "06 / DETAIL": "06 / ДЕТАЛЬ",
    "Soft structure": "Мягкая форма",
    "Urban armour": "Городская защита",
    "Purpose built": "Создано для дела",
    "Weekend ritual": "Ритуал выходного дня",
    "Quiet polish": "Сдержанный лоск",
    "Final accent": "Финальный акцент",
    "KNITWEAR": "ТРИКОТАЖ",
    "OUTERWEAR": "ВЕРХНЯЯ ОДЕЖДА",
    "TROUSERS": "БРЮКИ",
    "SHIRTS": "РУБАШКИ",
    "FOOTWEAR": "ОБУВЬ",
    "ACCESSORIES": "АКСЕССУАРЫ",
    "In focus": "В фокусе",
    "A closer": "Рассмотрим",
    "look.": "поближе.",
    "Two tonal stories. One uncompromising point of view.": "Две тональные истории. Один бескомпромиссный взгляд.",
    "Washed": "Выцветшее,",
    "and worn in.": "будто любимое.",
    "Soft blues,": "Мягкий голубой,",
    "easy layers.": "лёгкие слои.",
    "Shop the look ↗": "Смотреть образ ↗",
    "01 / EARTH": "01 / ЗЕМЛЯ",
    "02 / WATER": "02 / ВОДА",
    "COMPLETE THE EDIT": "ДОПОЛНИТЕ ОБРАЗ",
    "SHOP THE EDIT": "СМОТРЕТЬ ПОДБОРКУ",
    "Worn & loved": "Носят и любят",
    "What they say": "Отзывы покупателей",
    "Verified buyer · London": "Проверенный покупатель · Лондон",
    "Verified buyer · Berlin": "Проверенный покупатель · Берлин",
    "Verified buyer · New York": "Проверенный покупатель · Нью-Йорк",
    "JACKET / 03": "КУРТКА / 03",
    "SHIRT / 05": "РУБАШКА / 05",
    "SHOES / 06": "ОБУВЬ / 06",
    "THE OUTERWEAR EDIT": "ПОДБОРКА ВЕРХНЕЙ ОДЕЖДЫ",
    "Made for": "Создано для",
    "the elements.": "любой погоды.",
    "Architectural layers. Natural warmth. A better way to meet the weather.": "Выверенные слои. Естественное тепло. Новый способ встретить любую погоду.",
    "Discover outerwear": "Смотреть верхнюю одежду",
    "The private list": "Закрытая рассылка",
    "Good things,": "Только хорошее,",
    "occasionally.": "иногда.",
    "Email address": "Электронная почта",
    "Product stories, early access and no noise.": "Истории вещей, ранний доступ и ничего лишнего.",
    "A quietly confident edit of modern menswear, selected for the long run.": "Спокойная и уверенная подборка современной мужской одежды — надолго.",
    "Help": "Помощь",
    "Shipping": "Доставка",
    "Returns": "Возврат",
    "Size guide": "Таблица размеров",
    "Contact": "Контакты",
    "About": "О нас",
    "Our edit": "Наш выбор",
    "Materials": "Материалы",
    "Stores": "Магазины",
    "Categories": "Категории",
    "PRIVACY · TERMS": "КОНФИДЕНЦИАЛЬНОСТЬ · УСЛОВИЯ",
    "BACK TO TOP ↑": "НАВЕРХ ↑",
    "SEARCH THE STORE": "ПОИСК ПО КАТАЛОГУ",
    "Popular searches": "Популярные запросы",
    "Leather jacket": "Кожаная куртка",
    "Oxford shirt": "Оксфордская рубашка",
    "Sneakers": "Кеды",
    "THE EDIT": "ВЫБОР РЕДАКЦИИ",
    "Selected piece": "Выбранная модель",
    "4.9 · 128 reviews": "4,9 · 128 отзывов",
    "A considered everyday piece with a refined silhouette, tactile finish and lasting construction.": "Продуманная вещь на каждый день: точный силуэт, приятная фактура и долговечная конструкция.",
    "COLOUR": "ЦВЕТ",
    "Burnt sienna": "Терракотовый",
    "Deep teal": "Глубокий бирюзовый",
    "Sand": "Песочный",
    "Black": "Чёрный",
    "SELECT SIZE": "ВЫБЕРИТЕ РАЗМЕР",
    "Size guide ↗": "Таблица размеров ↗",
    "Add to bag": "Добавить в корзину",
    "Try on virtually": "Виртуальная примерка",
    "Cut & details": "Крой и детали",
    "Relaxed through the body, clean at the shoulder and finished with understated hardware.": "Свободная посадка, аккуратная линия плеч и сдержанная фурнитура.",
    "Materials & care": "Материалы и уход",
    "Premium construction. Gentle care recommended to preserve the finish.": "Премиальное исполнение. Рекомендуем бережный уход, чтобы сохранить внешний вид.",
    "Delivery & returns": "Доставка и возврат",
    "Complimentary delivery over $150 and easy returns within 30 days.": "Бесплатная доставка от 15 000 ₽ и простой возврат в течение 30 дней.",
    "SECURE CHECKOUT": "БЕЗОПАСНОЕ ОФОРМЛЕНИЕ",
    "Finish the look.": "Завершите образ.",
    "Contact": "Контакты",
    "Delivery": "Доставка",
    "First name": "Имя",
    "Last name": "Фамилия",
    "Street address": "Адрес",
    "City": "Город",
    "ZIP / postcode": "Индекс",
    "Standard delivery": "Стандартная доставка",
    "3–5 business days": "3–5 рабочих дней",
    "Free": "Бесплатно",
    "Express delivery": "Экспресс-доставка",
    "1–2 business days": "1–2 рабочих дня",
    "Payment": "Оплата",
    "Card": "Картой",
    "Cash on delivery": "При получении",
    "Card number": "Номер карты",
    "Expiry": "Срок действия",
    "Security code": "Код безопасности",
    "Pay when your order reaches the door. No card details needed.": "Оплатите заказ при получении — данные карты не понадобятся.",
    "Place demo order": "Оформить демо-заказ",
    "This is an interactive storefront demo. No payment is processed.": "Это интерактивная демонстрация магазина. Оплата не списывается.",
    "YOUR ORDER": "ВАШ ЗАКАЗ",
    "Promo code": "Промокод",
    "Apply": "Применить",
    "Subtotal": "Сумма",
    "Total": "Итого",
    "ORDER 0026": "ЗАКАЗ 0026",
    "It’s officially yours.": "Теперь это ваше.",
    "Your demo order is confirmed. In a live store, delivery updates would arrive by email.": "Демо-заказ подтверждён. В настоящем магазине уведомления о доставке приходили бы на почту.",
    "Continue exploring": "Продолжить покупки",
    "YOUR BAG": "ВАША КОРЗИНА",
    "Your bag is quiet.": "В корзине пока пусто.",
    "Let’s find something worth keeping.": "Давайте найдём вещь, которую захочется оставить.",
    "Explore new arrivals": "Смотреть новинки",
    "Shipping and taxes calculated at checkout.": "Доставка и налоги рассчитываются при оформлении.",
    "Checkout": "Оформить заказ",
    "Try it on": "Примерить",
    "VIRTUAL STUDIO": "ВИРТУАЛЬНАЯ СТУДИЯ",
    "Fitting room": "Примерочная",
    "Tap": "Нажмите",
    "on a product to bring it into the room.": "на карточке товара, чтобы перенести его в примерочную.",
    "TRY ON": "ПРИМЕРИТЬ",
    "READY TO STYLE": "ГОТОВО К ПРИМЕРКЕ",
    "No piece selected": "Модель не выбрана",
    "Choose from the edit": "Выберите модель из каталога",
    "View 360°": "Вид 360°",
    "Start over": "Сбросить",
    "View soft structure": "Открыть образ «Мягкая форма»",
    "View urban armour": "Открыть образ «Городская защита»",
    "View purpose built": "Открыть образ «Создано для дела»",
    "View weekend ritual": "Открыть образ «Ритуал выходного дня»",
    "View quiet polish": "Открыть образ «Сдержанный лоск»",
    "View final accent": "Открыть образ «Финальный акцент»",
    "Added to your bag": "Добавлено в корзину",
    "Open menu": "Открыть меню",
    "Primary navigation": "Основная навигация",
    "STORE home": "Главная STORE",
    "Change locale": "Выбрать регион",
    "Switch theme": "Сменить тему",
    "Search": "Поиск",
    "Account": "Аккаунт",
    "Open cart": "Открыть корзину",
    "Close menu": "Закрыть меню",
    "Toggle ambient sound": "Переключить атмосферный режим",
    "Store benefits": "Преимущества магазина",
    "Previous categories": "Предыдущие категории",
    "Next categories": "Следующие категории",
    "Filter products": "Фильтр товаров",
    "Previous review": "Предыдущий отзыв",
    "Next review": "Следующий отзыв",
    "Subscribe": "Подписаться",
    "Close search": "Закрыть поиск",
    "What are you looking for?": "Что вы ищете?",
    "Close product details": "Закрыть карточку товара",
    "Product gallery": "Галерея товара",
    "Choose product view": "Выбор ракурса товара",
    "Front view": "Вид спереди",
    "Detail view": "Детали",
    "Back view": "Вид сзади",
    "Colour": "Цвет",
    "Size": "Размер",
    "Quantity": "Количество",
    "Decrease quantity": "Уменьшить количество",
    "Increase quantity": "Увеличить количество",
    "Close checkout": "Закрыть оформление",
    "Close cart": "Закрыть корзину",
    "Close fitting room": "Закрыть примерочную",
    "Virtual fitting model": "Виртуальная модель",
    "Selected product": "Выбранная модель",
    "Add to wishlist": "Добавить в избранное",
    "Remove from wishlist": "Убрать из избранного",
    "Spring edit": "Весенняя подборка",
    "Editorial menswear selection": "Редакционная подборка мужской одежды",
    "Sale selection": "Подборка со скидкой",
    "Man wearing a refined neutral menswear look": "Мужской образ в нейтральных оттенках",
    "Man in a premium coat": "Мужчина в премиальном пальто",
    "Neutral menswear editorial": "Редакционный мужской образ",
    "Beige Linen Shirt": "Бежевая льняная рубашка",
    "Camel Wool Trench Coat": "Шерстяной тренч песочного цвета",
    "Tan Leather Chelsea Boots": "Кожаные ботинки челси",
    "Vintage olive washed T-shirt": "Оливковая футболка с эффектом варки",
    "Washed blue hoodie": "Голубая худи с эффектом варки",
    "Charcoal trousers": "Графитовые брюки",
    "Navy henley": "Тёмно-синий лонгслив хенли",
    "Teal cap": "Бирюзовая кепка",
    "you@example.com": "example@mail.ru",
    "MM / YY": "ММ / ГГ",
    "EST.": "ОСН.",
    "NYC": "МСК",
    "Jackets": "Куртки",
    "T-shirts": "Футболки",
    "Loopback cotton": "Петельчатый хлопок",
    "Selvedge denim": "Селвидж-деним",
    "Oxford cotton": "Оксфордский хлопок",
    "Italian leather": "Итальянская кожа",
    "Pure wool": "Чистая шерсть",
    "Suede": "Замша",
    "Corduroy": "Вельвет",
    "Twill": "Твил",
    "Canvas": "Канвас",
    "“The cut, the weight, the tiny details — everything feels considered. My jacket somehow works with every single thing I own.”": "«Крой, плотность, мелкие детали — всё продумано. Куртка удивительно подходит буквально ко всему моему гардеробу».",
    "“Finally, basics that don't feel basic. Beautiful packaging, quick delivery and the quality is obvious the second you touch it.”": "«Наконец-то база, которая не выглядит обычной. Красивая упаковка, быстрая доставка, а качество ощущается с первого прикосновения».",
    "“The kind of store where the edit is already done for you. I wear the sneakers almost daily and they keep getting better.”": "«Магазин, где отбор уже сделали за тебя. Ношу кеды почти каждый день, и со временем они становятся только лучше»."
  }));

  function pluralModels(value) {
    const number = Number(value);
    const lastTwo = number % 100;
    const last = number % 10;
    if (lastTwo >= 11 && lastTwo <= 14) return `${number} моделей`;
    if (last === 1) return `${number} модель`;
    if (last >= 2 && last <= 4) return `${number} модели`;
    return `${number} моделей`;
  }

  function translatePhrase(value) {
    const clean = value.trim();
    if (!clean) return value;
    let translated = translations.get(clean) || productNamesRu[clean] || categoryNamesRu[clean];
    if (!translated) {
      translated = clean
      .replace(/(\d+) pieces/g, (_, count) => pluralModels(count))
      .replace(/TRY ON/g, "ПРИМЕРИТЬ")
      .replace(/^Try on /, "Примерить: ")
        .replace(/Accessories · Wool/g, "Аксессуары · Шерсть")
        .replace(/Shirts · Cotton/g, "Рубашки · Хлопок")
        .replace(/Outerwear · Denim/g, "Верхняя одежда · Деним")
        .replace(/Shoes · Canvas/g, "Обувь · Канвас")
        .replace(/Knitwear · Cotton/g, "Трикотаж · Хлопок")
        .replace(/Trousers · Twill/g, "Брюки · Твил")
        .replace(/Heavyweight cotton/g, "Плотный хлопок")
        .replace(/Organic cotton/g, "Органический хлопок")
        .replace(/Full-grain leather/g, "Натуральная кожа")
        .replace(/Raw denim/g, "Необработанный деним")
        .replace(/Merino wool/g, "Шерсть мериноса")
        .replace(/Selected piece/g, "Выбранная модель");
      Object.entries(productNamesRu).forEach(([english, russian]) => {
        translated = translated.split(english).join(russian);
      });
    }
    return value.replace(clean, translated || clean);
  }

  function localizeDocument() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) node.nodeValue = translatePhrase(node.nodeValue);
    ["aria-label", "title", "placeholder", "alt"].forEach((attribute) => {
      $("[" + attribute + "]") && $$("[" + attribute + "]").forEach((element) => {
        element.setAttribute(attribute, translatePhrase(element.getAttribute(attribute) || ""));
      });
    });
  }
  localizeDocument();

  const storage = {
    get(key, fallback) {
      try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
      } catch (_) {
        return fallback;
      }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) { /* private mode */ }
    }
  };

  const productNamesEn = new Map(Object.entries(productNamesRu).map(([english, russian]) => [russian, english]));
  const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
  function safeImageUrl(value = "") {
    try {
      const url = new URL(String(value), location.href);
      return ["http:", "https:"].includes(url.protocol) ? url.href : "";
    } catch (_) {
      return "";
    }
  }
  function normaliseProduct(value) {
    if (!value || typeof value !== "object") return null;
    const rawName = String(value.sourceName || value.name || "").trim().slice(0, 160);
    const sourceName = productNamesEn.get(rawName) || rawName;
    const price = Number(value.price);
    if (!sourceName || !Number.isFinite(price) || price <= 0) return null;
    const categoryKey = String(value.categoryKey || value.category || "The edit").slice(0, 80);
    return {
      sourceName,
      name: productNamesRu[sourceName] || String(value.name || sourceName).slice(0, 160),
      price,
      image: safeImageUrl(value.image),
      categoryKey,
      category: categoryNamesRu[categoryKey] || String(value.category || categoryKey).slice(0, 80),
      ...(value.colour ? { colour: colourNamesRu[value.colour] || String(value.colour).slice(0, 60) } : {}),
      ...(value.size ? { size: String(value.size).slice(0, 20) } : {})
    };
  }
  function trapFocus(event, container) {
    if (event.key !== "Tab" || !container) return;
    const focusable = $$(focusableSelector, container).filter((item) => !item.hidden && item.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  let toastTimer;
  function showToast(message, mark = "✓") {
    const toast = $(".toast");
    if (!toast) return;
    $("span", toast).textContent = mark;
    $("p", toast).textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function money(value) {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0
    }).format(Number(value || 0) * RUB_RATE);
  }

  function productFromElement(element) {
    const host = element.closest("[data-name]");
    if (!host) return null;
    const sourceName = host.dataset.name;
    const categoryKey = host.dataset.category || "The edit";
    return normaliseProduct({
      sourceName,
      name: sourceName,
      price: Number(host.dataset.price || 0),
      image: host.dataset.image || $("img", host)?.src || "",
      categoryKey,
      category: categoryKey
    });
  }

  const catalogueMap = new Map();
  $$('[data-name]').forEach((element) => {
    const product = productFromElement(element);
    if (product && !catalogueMap.has(product.sourceName)) catalogueMap.set(product.sourceName, product);
  });
  const catalogue = [...catalogueMap.values()];

  // Prices and product copy are generated from one source of truth.
  $$(".product-card").forEach((card) => {
    const product = productFromElement(card);
    const media = $(".product-media", card);
    if (media && !$(".try-product", media)) {
      const fittingButton = document.createElement("button");
      fittingButton.type = "button";
      fittingButton.className = "try-product";
      fittingButton.setAttribute("aria-label", `Посмотреть ${product.name} на модели`);
      fittingButton.textContent = "♙ НА МОДЕЛИ";
      const quickAdd = $(".quick-add", media);
      media.insertBefore(fittingButton, quickAdd || null);
    }
    const title = $("h3", card);
    const price = $(".product-info > strong", card);
    const productInfo = $(".product-info", card);
    if (title) title.textContent = product.name;
    if (price) price.textContent = money(product.price);
    if (!productInfo) return;
    productInfo.tabIndex = 0;
    productInfo.setAttribute("role", "button");
    productInfo.setAttribute("aria-label", `Открыть товар «${product.name}»`);
    productInfo.addEventListener("keydown", (event) => {
      if (!["Enter", " "].includes(event.key)) return;
      event.preventDefault();
      openProduct(product, productInfo);
    });
  });
  $$(".mini-card").forEach((card) => {
    const product = productFromElement(card);
    const title = $("b", card);
    const price = $("small", card);
    if (title) title.textContent = product.name;
    if (price) {
      price.textContent = money(product.price);
      const compare = Number(card.dataset.comparePrice || 0);
      if (compare) {
        const oldPrice = document.createElement("s");
        oldPrice.textContent = money(compare);
        price.append(" ", oldPrice);
      }
    }
  });
  $$(".collection-panel").forEach((card) => {
    const product = productFromElement(card);
    const copy = $(".collection-caption p", card);
    if (copy) copy.textContent = product.name + " · " + money(product.price);
  });
  $$(".look-card").forEach((card) => {
    const product = productFromElement(card);
    const copy = $(".look-overlay p", card);
    if (copy) copy.textContent = product.name + " · " + money(product.price);
  });
  const expressPrice = $(".shipping-choice input[value='express']")?.closest(".shipping-choice")?.querySelector("strong");
  if (expressPrice) expressPrice.textContent = money(18);

  // Opening sequence and resilient image handling.
  let pageReleased = false;
  function releasePage() {
    if (pageReleased) return;
    pageReleased = true;
    document.body.classList.add("loaded");
    setTimeout(() => $(".loader")?.setAttribute("aria-hidden", "true"), 1100);
  }
  addEventListener("load", () => setTimeout(releasePage, reducedMotion ? 0 : 150), { once: true });
  setTimeout(releasePage, 900);
  $$('img').forEach((image, index) => {
    image.decoding = "async";
    if (!image.closest(".hero-media") && index > 5) image.loading = "lazy";
    if (image.closest(".hero-media")) image.fetchPriority = "high";
    image.addEventListener("error", () => image.classList.add("image-error"));
  });

  // Scroll reveals, header compression, parallax and section-aware motion.
  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const siblings = $$(".reveal", entry.target.parentElement || document);
        const delay = Math.min(Math.max(siblings.indexOf(entry.target), 0) * 70, 280);
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -7%", threshold: 0.08 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const header = $(".site-header");
  const parallax = $("[data-parallax]");
  let scrollTicking = false;
  function paintScroll() {
    const y = scrollY;
    header?.classList.toggle("compact", y > 40);
    if (parallax && !reducedMotion && y < innerHeight * 1.2) {
      parallax.style.transform = `translate3d(0, ${Math.min(y * 0.16, 95)}px, 0) scale(1.035)`;
    }
    scrollTicking = false;
  }
  addEventListener("scroll", () => {
    if (!scrollTicking) {
      requestAnimationFrame(paintScroll);
      scrollTicking = true;
    }
  }, { passive: true });
  paintScroll();

  // Desktop mega-menu and full-screen mobile navigation.
  const navShop = $(".nav-shop");
  const megaMenu = $(".mega-menu");
  function setMega(open) {
    if (!navShop || !megaMenu) return;
    navShop.setAttribute("aria-expanded", String(open));
    megaMenu.setAttribute("aria-hidden", String(!open));
    megaMenu.classList.toggle("open", open);
    header?.classList.toggle("menu-open", open);
  }
  navShop?.addEventListener("click", (event) => {
    event.stopPropagation();
    setMega(!megaMenu.classList.contains("open"));
  });
  navShop?.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    setMega(true);
    focusFirst(megaMenu);
  });
  megaMenu?.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    setMega(false);
    navShop?.focus();
  });
  $$('a', megaMenu || document.createElement('div')).forEach((link) => link.addEventListener("click", () => setMega(false)));
  header?.addEventListener("mouseleave", () => setMega(false));
  header?.addEventListener("focusout", (event) => {
    if (!header.contains(event.relatedTarget)) setMega(false);
  });

  const menu = $(".mobile-menu");
  const menuTrigger = $(".menu-trigger");
  const focusableSelector = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";
  let returnFocus = null;
  function focusFirst(container) {
    requestAnimationFrame(() => $(focusableSelector, container || document)?.focus());
  }
  function syncPageLock() {
    const blocked = menu?.classList.contains("open") || $(".cart-drawer.open") || $(".fitting-room.open");
    document.body.classList.toggle("no-scroll", Boolean(blocked));
  }
  function setMobileMenu(open) {
    const wasOpen = Boolean(menu?.classList.contains("open"));
    if (open && !wasOpen) returnFocus = document.activeElement;
    menu?.classList.toggle("open", open);
    menu?.setAttribute("aria-hidden", String(!open));
    menuTrigger?.setAttribute("aria-expanded", String(open));
    syncPageLock();
    if (open) focusFirst(menu);
    else if (wasOpen && returnFocus instanceof HTMLElement) {
      returnFocus.focus();
      returnFocus = null;
    }
  }
  menuTrigger?.addEventListener("click", () => setMobileMenu(true));
  $(".mobile-close")?.addEventListener("click", () => setMobileMenu(false));
  $$("a", menu || document.createElement("div")).forEach((link) => link.addEventListener("click", () => setMobileMenu(false)));

  // Theme switcher with a matching transparent hero product.
  const root = document.documentElement;
  const themeButton = $(".theme-toggle");
  const themeIcon = $(".theme-icon");
  const heroImage = $(".hero-media img");
  const heroImages = {
    dark: "./assets/bags/linea.png",
    light: "./assets/bags/fold.png"
  };
  function applyTheme(theme, remember = true) {
    root.dataset.theme = theme;
    if (themeIcon) themeIcon.textContent = theme === "dark" ? "◐" : "◑";
    themeButton?.setAttribute("aria-label", theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему");
    const src = heroImages[theme];
    if (src && heroImage) heroImage.src = src;
    $("meta[name='theme-color']")?.setAttribute("content", theme === "dark" ? "#050505" : "#f4f1ea");
    if (remember) storage.set("lunea-theme", theme);
  }
  const savedTheme = storage.get("lunea-theme", null);
  const initialTheme = ["light", "dark"].includes(savedTheme) ? savedTheme : "dark";
  applyTheme(initialTheme, false);
  themeButton?.addEventListener("click", () => applyTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  // Search overlay and instant catalogue matching.
  const searchDialog = $(".search-dialog");
  const searchInput = $(".search-input");
  const searchResults = $(".search-results");
  const productDialog = $(".product-dialog");
  const checkoutDialog = $(".checkout-dialog");
  let activeProduct = null;
  let searchReturnFocus = null;
  let productReturnFocus = null;
  let checkoutReturnFocus = null;
  let pdpQuantity = 1;
  let pdpColour = "Коньячный";
  let pdpSize = "СРЕДНИЙ";
  function renderSearch(query = "") {
    if (!searchResults) return;
    const term = query.trim().toLowerCase();
    const matches = catalogue.filter((item) => !term || `${item.name} ${item.sourceName} ${item.category} ${item.categoryKey} ${productSearchTerms[item.sourceName] || ""}`.toLowerCase().includes(term)).slice(0, 8);
    searchResults.innerHTML = matches.length ? matches.map((item) => `
      <button class="search-result" type="button" data-result="${encodeURIComponent(item.sourceName)}">
        <img src="${escapeHtml(item.image)}" alt="" />
        <span><b>${escapeHtml(item.name)}</b><small>${escapeHtml(item.category)}</small></span>
        <strong>${money(item.price)}</strong>
      </button>`).join("") : `<p class="search-message">Ничего не найдено. Попробуйте изменить запрос.</p>`;
  }
  function openSearch(query = "") {
    if (!searchDialog?.open) searchReturnFocus = document.activeElement;
    closeDrawers(false);
    if (!searchDialog?.open) searchDialog?.showModal();
    if (searchInput) searchInput.value = query;
    renderSearch(query);
    requestAnimationFrame(() => searchInput?.focus());
  }
  $(".search-trigger")?.addEventListener("click", () => openSearch());
  $(".search-close")?.addEventListener("click", () => searchDialog?.close());
  searchDialog?.addEventListener("click", (event) => {
    if (event.target === searchDialog) searchDialog.close();
  });
  searchDialog?.addEventListener("close", () => {
    if (searchReturnFocus instanceof HTMLElement) searchReturnFocus.focus();
    searchReturnFocus = null;
  });
  searchInput?.addEventListener("input", () => renderSearch(searchInput.value));
  $$(".search-suggestions button").forEach((button) => button.addEventListener("click", () => {
    const query = /новин|new arrivals/i.test(button.textContent) ? "" : button.textContent;
    searchInput.value = query;
    renderSearch(query);
    searchInput.focus();
  }));
  searchResults?.addEventListener("click", (event) => {
    const result = event.target.closest("[data-result]");
    if (!result) return;
    const product = catalogueMap.get(decodeURIComponent(result.dataset.result));
    const returnTarget = searchReturnFocus;
    searchDialog.close();
    if (product) openProduct(product, returnTarget);
  });
  addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
    }
    if (event.key === "Tab") {
      if (menu?.classList.contains("open")) trapFocus(event, menu);
      else if (cartDrawer?.classList.contains("open")) trapFocus(event, cartDrawer);
      else if (fittingRoom?.classList.contains("open")) trapFocus(event, fittingRoom);
    }
    if (event.key === "Escape") {
      setMega(false);
      if (menu?.classList.contains("open")) setMobileMenu(false);
      if (cartDrawer?.classList.contains("open") || fittingRoom?.classList.contains("open")) closeDrawers();
    }
  });

  // Persistent cart, quantity controls, shipping progress and drawer transitions.
  let cart = storage.get("lunea-cart-v1", []);
  if (!Array.isArray(cart)) cart = [];
  cart = cart.map((item) => {
    const product = normaliseProduct(item);
    if (!product) return null;
    return { ...product, quantity: Math.max(1, Math.min(MAX_QTY, Math.floor(Number(item.quantity) || 1))) };
  }).filter(Boolean);
  const backdrop = $(".drawer-backdrop");
  const cartDrawer = $(".cart-drawer");
  const fittingRoom = $(".fitting-room");
  let drawerReturnFocus = null;
  let fittingTimer = null;
  function drawerBackdrop(open) {
    if (!backdrop) return;
    if (open) {
      backdrop.hidden = false;
      requestAnimationFrame(() => backdrop.classList.add("visible"));
      document.body.classList.add("no-scroll");
    } else {
      backdrop.classList.remove("visible");
      syncPageLock();
      setTimeout(() => {
        if (!cartDrawer?.classList.contains("open") && !fittingRoom?.classList.contains("open")) backdrop.hidden = true;
      }, 360);
    }
  }
  function closeDrawers(restoreFocus = true) {
    const hadOpen = Boolean(cartDrawer?.classList.contains("open") || fittingRoom?.classList.contains("open"));
    cartDrawer?.classList.remove("open");
    fittingRoom?.classList.remove("open");
    cartDrawer?.setAttribute("aria-hidden", "true");
    fittingRoom?.setAttribute("aria-hidden", "true");
    $(".fitting-trigger")?.setAttribute("aria-expanded", "false");
    clearTimeout(fittingTimer);
    fittingTimer = null;
    $(".fitting-stage")?.classList.remove("is-changing");
    $(".fitting-stage")?.setAttribute("aria-busy", "false");
    drawerBackdrop(false);
    if (hadOpen && restoreFocus && drawerReturnFocus instanceof HTMLElement) {
      requestAnimationFrame(() => drawerReturnFocus?.focus());
    }
    if (hadOpen) drawerReturnFocus = null;
  }
  function openDrawer(drawer) {
    if (!drawer) return;
    if (!cartDrawer?.classList.contains("open") && !fittingRoom?.classList.contains("open")) drawerReturnFocus = document.activeElement;
    if (searchDialog?.open) searchDialog.close();
    [cartDrawer, fittingRoom].forEach((item) => {
      if (item !== drawer) {
        item?.classList.remove("open");
        item?.setAttribute("aria-hidden", "true");
      }
    });
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    $(".fitting-trigger")?.setAttribute("aria-expanded", String(drawer === fittingRoom));
    drawerBackdrop(true);
    focusFirst(drawer);
  }
  function cartCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }
  function renderCart() {
    const count = cartCount();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    $$(".cart-count").forEach((node) => { node.textContent = count; });
    const drawerCount = $(".drawer-count");
    if (drawerCount) {
      const form = count % 10 === 1 && count % 100 !== 11 ? "товар" : ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100) ? "товара" : "товаров");
      drawerCount.textContent = `${count} ${form}`;
    }
    const items = $(".cart-items");
    if (items) items.innerHTML = cart.map((item, index) => `
      <article class="cart-item">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" />
        <div class="cart-item-main">
          <h4>${escapeHtml(item.name)}</h4><span>${money(item.price)}</span>
          ${item.colour || item.size ? `<small>${[item.colour, item.size].filter(Boolean).map(escapeHtml).join(" · ")}</small>` : ""}
          <div class="qty-controls" aria-label="Количество">
            <button type="button" data-cart="minus" data-index="${index}" aria-label="Уменьшить количество">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-cart="plus" data-index="${index}" aria-label="Увеличить количество" ${item.quantity >= MAX_QTY ? "disabled" : ""}>+</button>
          </div>
        </div>
        <button class="cart-remove" type="button" data-cart="remove" data-index="${index}" aria-label="Удалить ${escapeHtml(item.name)}">×</button>
      </article>`).join("");
    $(".cart-empty")?.toggleAttribute("hidden", count > 0);
    $(".cart-footer")?.toggleAttribute("hidden", count === 0);
    if ($(".cart-total")) $(".cart-total").textContent = money(total);
    const threshold = 15000 / RUB_RATE;
    const remaining = Math.max(threshold - total, 0);
    const progressCopy = $(".cart-progress p span");
    if (progressCopy) progressCopy.textContent = remaining ? `Добавьте ещё ${money(remaining)} для бесплатной доставки` : "Бесплатная доставка доступна";
    if ($(".cart-progress p b")) $(".cart-progress p b").textContent = `${money(Math.min(total, threshold))} / ${money(threshold)}`;
    const progressBar = $(".cart-progress > i b");
    if (progressBar) progressBar.style.width = `${Math.min(total / threshold * 100, 100)}%`;
    storage.set("lunea-cart-v1", cart);
  }
  function addToCart(product, open = true, quantity = 1) {
    product = normaliseProduct(product);
    if (!product) return;
    const amount = Math.max(1, Math.min(MAX_QTY, Math.floor(Number(quantity) || 1)));
    const existing = cart.find((item) => item.sourceName === product.sourceName && (item.colour || "") === (product.colour || "") && (item.size || "") === (product.size || ""));
    if (existing) existing.quantity = Math.min(MAX_QTY, existing.quantity + amount);
    else cart.push({ ...product, quantity: amount });
    renderCart();
    showToast(`${amount > 1 ? `${amount} × ` : ""}${product.name} — добавлено в корзину`);
    if (open) setTimeout(() => openDrawer(cartDrawer), 180);
  }

  function paintProductView(view = "front") {
    $$(".pdp-thumbs button", productDialog || document).forEach((button) => {
      const selected = button.dataset.view === view;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    const wrap = $(".pdp-image-wrap", productDialog || document);
    if (wrap) wrap.dataset.view = view;
    const viewNumber = { front: "01 / 03", detail: "02 / 03", back: "03 / 03" }[view] || "01 / 03";
    const index = $(".pdp-image-index", productDialog || document);
    if (index) index.textContent = viewNumber;
  }

  const productVariants = {
    EastWest: { colours: [["Коньячный", "#955f3f"], ["Тёмный шоколад", "#3d2926"], ["Вишнёвый", "#6d1f35"]], sizes: ["МИНИ", "СРЕДНИЙ", "МАКСИ"] },
    TopHandle: { colours: [["Каштановый", "#76503d"], ["Чёрный", "#202023"], ["Молочный", "#e4d8ca"]], sizes: ["МИНИ", "СРЕДНИЙ", "МАКСИ"] },
    Shoulder: { colours: [["Тёплый коричневый", "#8d5a40"], ["Шоколадный", "#4b312b"], ["Пудровый", "#c79496"]], sizes: ["МИНИ", "СРЕДНИЙ", "МАКСИ"] },
    Crossbody: { colours: [["Вишнёвый", "#741d38"], ["Чёрный", "#202023"], ["Коньячный", "#955f3f"]], sizes: ["МИНИ", "СРЕДНИЙ", "МАКСИ"] },
    Tote: { colours: [["Терракотовый", "#a45f43"], ["Песочный", "#c7ad89"], ["Тёмный шоколад", "#3d2926"]], sizes: ["СРЕДНИЙ", "МАКСИ"] },
    Bucket: { colours: [["Мокко", "#8b6a57"], ["Карамельный", "#b77b53"], ["Чёрный", "#202023"]], sizes: ["МИНИ", "СРЕДНИЙ", "МАКСИ"] },
    Clutch: { colours: [["Карамельный", "#b77b53"], ["Вишнёвый", "#741d38"], ["Чёрный", "#202023"]], sizes: ["КОМПАКТНЫЙ", "СРЕДНИЙ"] }
  };

  function renderProductVariants(product) {
    const variants = productVariants[product.categoryKey] || productVariants.EastWest;
    pdpColour = variants.colours[0][0];
    pdpSize = variants.sizes.includes("СРЕДНИЙ") ? "СРЕДНИЙ" : variants.sizes[0];
    const swatches = $(".pdp-swatches", productDialog);
    if (swatches) swatches.innerHTML = variants.colours.map(([name, colour], index) => `<button class="${index === 0 ? "active" : ""}" type="button" style="--swatch:${colour}" aria-label="${escapeHtml(name)}" aria-pressed="${index === 0}" data-colour="${escapeHtml(name)}"></button>`).join("");
    const sizes = $(".pdp-sizes", productDialog);
    if (sizes) sizes.innerHTML = variants.sizes.map((size) => `<button class="${size === pdpSize ? "active" : ""}" type="button" aria-pressed="${size === pdpSize}">${escapeHtml(size)}</button>`).join("");
  }

  function openProduct(product, returnTarget = document.activeElement) {
    if (!product || !productDialog) return;
    activeProduct = normaliseProduct(product);
    if (!activeProduct) return;
    productReturnFocus = returnTarget instanceof HTMLElement ? returnTarget : null;
    pdpQuantity = 1;
    if (searchDialog?.open) { searchReturnFocus = null; searchDialog.close(); }
    if (checkoutDialog?.open) { checkoutReturnFocus = null; checkoutDialog.close(); }
    closeDrawers(false);
    $(".pdp-name", productDialog).textContent = activeProduct.name;
    $(".pdp-category", productDialog).textContent = (activeProduct.category || "Выбор редакции").toUpperCase();
    $(".pdp-price", productDialog).textContent = money(activeProduct.price);
    const mainImage = $(".pdp-main-image", productDialog);
    mainImage.src = safeImageUrl(activeProduct.image);
    mainImage.alt = activeProduct.name;
    mainImage.hidden = false;
    $$(".pdp-thumbs img", productDialog).forEach((image, index) => {
      image.src = safeImageUrl(activeProduct.image);
      image.alt = `${activeProduct.name}: ${["основной вид", "деталь", "на фигуре"][index]}`;
      image.hidden = false;
    });
    renderProductVariants(activeProduct);
    $(".pdp-colour-name", productDialog).textContent = pdpColour;
    $(".pdp-qty span", productDialog).textContent = String(pdpQuantity);
    $(".pdp-add span", productDialog).textContent = `— ${money(activeProduct.price)}`;
    paintProductView();
    productDialog.showModal();
    focusFirst(productDialog);
  }

  productDialog?.addEventListener("click", (event) => {
    if (event.target === productDialog) productDialog.close();
    const thumb = event.target.closest(".pdp-thumbs button");
    if (thumb) paintProductView(thumb.dataset.view);
    const swatch = event.target.closest(".pdp-swatches button");
    if (swatch) {
      $$(".pdp-swatches button", productDialog).forEach((button) => {
        const selected = button === swatch;
        button.classList.toggle("active", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
      pdpColour = swatch.dataset.colour;
      $(".pdp-colour-name", productDialog).textContent = pdpColour;
    }
    const size = event.target.closest(".pdp-sizes button");
    if (size) {
      $$(".pdp-sizes button", productDialog).forEach((button) => {
        const selected = button === size;
        button.classList.toggle("active", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
      pdpSize = size.textContent;
    }
    const quantityControl = event.target.closest("[data-pdp-qty]");
    if (quantityControl) {
      pdpQuantity = Math.max(1, Math.min(9, pdpQuantity + (quantityControl.dataset.pdpQty === "plus" ? 1 : -1)));
      $(".pdp-qty span", productDialog).textContent = String(pdpQuantity);
      $(".pdp-add span", productDialog).textContent = `— ${money((activeProduct?.price || 0) * pdpQuantity)}`;
    }
  });
  $(".pdp-close")?.addEventListener("click", () => productDialog?.close());
  productDialog?.addEventListener("close", () => {
    if (productReturnFocus instanceof HTMLElement) requestAnimationFrame(() => productReturnFocus?.focus());
    productReturnFocus = null;
  });
  $(".pdp-add")?.addEventListener("click", () => {
    if (!activeProduct) return;
    productDialog?.close();
    addToCart({ ...activeProduct, colour: pdpColour, size: pdpSize }, true, pdpQuantity);
  });
  $(".pdp-try")?.addEventListener("click", () => {
    if (!activeProduct) return;
    productDialog?.close();
    selectForFitting(activeProduct);
  });
  $(".size-guide")?.addEventListener("click", () => showToast("Мини — до 22 см · средний — до 32 см · макси — от 33 см", "↔"));

  document.addEventListener("click", (event) => {
    const target = event.target.closest(".product-media > img, .product-info");
    if (!target || event.target.closest("button, a")) return;
    const product = productFromElement(target);
    if (product) openProduct(product);
  });
  document.addEventListener("click", (event) => {
    const addButton = event.target.closest(".quick-add");
    const viewButton = event.target.closest(".product-action, .look-card .button, .circle-link");
    if (!addButton && !viewButton) return;
    event.preventDefault();
    const trigger = addButton || viewButton;
    const product = productFromElement(trigger);
    if (!product) return;
    if (viewButton) openProduct(product, trigger);
    else addToCart(product);
  });
  $(".cart-trigger")?.addEventListener("click", () => openDrawer(cartDrawer));
  $(".cart-close")?.addEventListener("click", closeDrawers);
  backdrop?.addEventListener("click", closeDrawers);
  $(".cart-shop")?.addEventListener("click", () => {
    closeDrawers();
    $("#new")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  });
  $(".cart-items")?.addEventListener("click", (event) => {
    const control = event.target.closest("[data-cart]");
    if (!control) return;
    const index = Number(control.dataset.index);
    if (!cart[index]) return;
    if (control.dataset.cart === "plus") cart[index].quantity = Math.min(MAX_QTY, cart[index].quantity + 1);
    if (control.dataset.cart === "minus") cart[index].quantity -= 1;
    if (control.dataset.cart === "remove" || cart[index].quantity < 1) cart.splice(index, 1);
    renderCart();
  });
  let checkoutDiscountRate = 0;
  let checkoutShipping = 0;

  function checkoutSubtotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function renderCheckout() {
    if (!checkoutDialog) return;
    const subtotal = checkoutSubtotal();
    const discount = subtotal * checkoutDiscountRate;
    const total = Math.max(0, subtotal + checkoutShipping - discount);
    const summary = $(".checkout-summary-items", checkoutDialog);
    if (summary) summary.innerHTML = cart.map((item) => `
      <article class="checkout-summary-item">
        <img src="${escapeHtml(safeImageUrl(item.image))}" alt="${escapeHtml(item.name)}" />
        <div><b>${escapeHtml(item.name)}</b><small>${item.quantity} × ${[item.colour, item.size].filter(Boolean).map(escapeHtml).join(" · ") || "Выбранный вариант"}</small></div>
        <strong>${money(item.price * item.quantity)}</strong>
      </article>`).join("");
    $(".checkout-subtotal", checkoutDialog).textContent = money(subtotal);
    $(".checkout-shipping", checkoutDialog).textContent = checkoutShipping ? money(checkoutShipping) : "Бесплатно";
    $(".checkout-discount", checkoutDialog).textContent = `−${money(discount)}`;
    $(".checkout-discount-row", checkoutDialog).hidden = !checkoutDiscountRate;
    $(".checkout-total", checkoutDialog).textContent = money(total);
  }

  function selectPayment(mode) {
    if (!checkoutDialog) return;
    $$("[data-payment]", checkoutDialog).forEach((button) => {
      const selected = button.dataset.payment === mode;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    const cardFields = $(".card-fields", checkoutDialog);
    const codNote = $(".cod-note", checkoutDialog);
    if (cardFields) cardFields.hidden = mode !== "card";
    if (codNote) codNote.hidden = mode === "card";
    $$(".card-fields input", checkoutDialog).forEach((input) => { input.required = mode === "card"; });
  }

  function resetCheckoutView() {
    if (!checkoutDialog) return;
    const head = $(".checkout-head", checkoutDialog);
    const layout = $(".checkout-layout", checkoutDialog);
    const success = $(".checkout-success", checkoutDialog);
    if (head) head.style.display = "";
    if (layout) layout.style.display = "";
    if (success) success.hidden = true;
  }

  function openCheckout() {
    if (!cart.length || !checkoutDialog) {
      showToast("В корзине пока нет товаров", "○");
      return;
    }
    checkoutReturnFocus = document.activeElement;
    closeDrawers(false);
    checkoutDiscountRate = 0;
    checkoutShipping = 0;
    resetCheckoutView();
    $(".checkout-form", checkoutDialog)?.reset();
    const promoInput = $(".promo-input", checkoutDialog);
    if (promoInput) promoInput.value = "";
    selectPayment("card");
    renderCheckout();
    checkoutDialog.showModal();
    focusFirst(checkoutDialog);
  }

  $(".checkout")?.addEventListener("click", openCheckout);
  $(".checkout-close")?.addEventListener("click", () => checkoutDialog?.close());
  checkoutDialog?.addEventListener("click", (event) => {
    if (event.target === checkoutDialog) checkoutDialog.close();
    const payment = event.target.closest("[data-payment]");
    if (payment) selectPayment(payment.dataset.payment);
  });
  checkoutDialog?.addEventListener("close", () => {
    if (checkoutReturnFocus instanceof HTMLElement) requestAnimationFrame(() => checkoutReturnFocus?.focus());
    checkoutReturnFocus = null;
  });
  $(".checkout-form")?.addEventListener("change", (event) => {
    if (event.target.name !== "shipping") return;
    checkoutShipping = event.target.value === "express" ? 18 : 0;
    renderCheckout();
  });
  $(".checkout-form")?.addEventListener("input", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    const digits = input.value.replace(/\D/g, "");
    if (input.name === "cardNumber") input.value = digits.slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
    if (input.name === "expiry") {
      const value = digits.slice(0, 4);
      input.value = value.length > 2 ? `${value.slice(0, 2)} / ${value.slice(2)}` : value;
    }
    if (input.name === "cvc") input.value = digits.slice(0, 3);
  });
  $(".promo-apply")?.addEventListener("click", () => {
    const promoInput = $(".promo-input");
    const valid = promoInput?.value.trim().toUpperCase() === "LUNEA20";
    checkoutDiscountRate = valid ? .2 : 0;
    renderCheckout();
    showToast(valid ? "Промокод LUNEA20 применён — скидка 20%" : "Проверьте промокод. Подсказка: LUNEA20", valid ? "%" : "?");
  });
  $(".checkout-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const head = $(".checkout-head", checkoutDialog);
    const layout = $(".checkout-layout", checkoutDialog);
    const success = $(".checkout-success", checkoutDialog);
    if (head) head.style.display = "none";
    if (layout) layout.style.display = "none";
    if (success) success.hidden = false;
    cart = [];
    renderCart();
  });
  $(".checkout-continue")?.addEventListener("click", () => {
    checkoutDialog?.close();
    resetCheckoutView();
    $("#new")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  });
  renderCart();

  // Wishlist feedback is kept between visits.
  let wishlist = storage.get("lunea-wishlist-v1", []);
  if (!Array.isArray(wishlist)) wishlist = [];
  wishlist = [...new Set(wishlist.map((name) => productNamesEn.get(String(name)) || String(name)).filter((name) => catalogueMap.has(name)))];
  function paintWishlist() {
    $$(".wish").forEach((button) => {
      const product = productFromElement(button);
      const selected = product && wishlist.includes(product.sourceName);
      button.classList.toggle("active", selected);
      button.textContent = selected ? "♥" : "♡";
      button.setAttribute("aria-pressed", String(Boolean(selected)));
      button.setAttribute("aria-label", `${selected ? "Удалить из избранного" : "Добавить в избранное"}: ${product?.name || "товар"}`);
    });
  }
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".wish");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    const product = productFromElement(button);
    if (!product) return;
    const index = wishlist.indexOf(product.sourceName);
    if (index >= 0) {
      wishlist.splice(index, 1);
      showToast(`${product.name} — удалено из избранного`, "♡");
    } else {
      wishlist.push(product.sourceName);
      showToast(`${product.name} — сохранено в избранном`, "♥");
    }
    storage.set("lunea-wishlist-v1", wishlist);
    paintWishlist();
  });
  paintWishlist();

  // Virtual fitting: an immediate editorial preview plus three server-generated poses.
  const fitStage = $(".fitting-stage");
  const fitLook = $(".fit-look-image");
  const fitBackdrop = $(".fit-look-backdrop");
  const fitPicker = $(".fit-picker");
  const fitStatus = $(".fit-status");
  const fitSelection = $(".fitting-selection b");
  const fitCamera = $(".fit-camera");
  const fitAdd = $(".fit-add");
  const fitGenerate = $(".fit-generate");
  const fitGenerationState = $(".fit-generation-state");
  const fitPoseNav = $(".fit-pose-nav");
  const fitPoseCount = $(".fit-pose-count");
  const fitPoseDots = $(".fit-pose-dots");
  const fitPoseLabel = $(".fit-pose-label");
  const fitAiState = $(".fit-ai-state");
  const fitAssetVersion = "20260920-4";
  const fitAsset = (path) => `${path}?v=${fitAssetVersion}`;
  const baseFitLook = fitAsset("./assets/tryon/model-base.jpg");
  const fitPreviewLooks = new Map([
    ["Линия", fitAsset("./assets/tryon/looks/linea.jpg")],
    ["Мягкий контур", fitAsset("./assets/tryon/looks/soft-contour.jpg")],
    ["Вера", fitAsset("./assets/tryon/looks/vera.jpg")],
    ["Ночной штрих", fitAsset("./assets/tryon/looks/night-stroke.jpg")],
    ["Городской объём", fitAsset("./assets/tryon/looks/city-volume.jpg")],
    ["Плетёный свет", fitAsset("./assets/tryon/looks/woven-light.jpg")],
    ["Терракота", fitAsset("./assets/tryon/looks/terracotta.jpg")],
    ["Складка", fitAsset("./assets/tryon/looks/fold.jpg")],
    ["Полумесяц", fitAsset("./assets/tryon/looks/crescent.jpg")],
    ["Деловой штрих", fitAsset("./assets/tryon/looks/business-stroke.jpg")],
    ["Амулет", fitAsset("./assets/tryon/looks/amulet.jpg")],
    ["Свободный клапан", fitAsset("./assets/tryon/looks/free-flap.jpg")]
  ]);
  const fitProductIds = new Map([
    ["Линия", "linea"],
    ["Мягкий контур", "soft-contour"],
    ["Вера", "vera"],
    ["Ночной штрих", "night-stroke"],
    ["Городской объём", "city-volume"],
    ["Плетёный свет", "woven-light"],
    ["Терракота", "terracotta"],
    ["Складка", "fold"],
    ["Полумесяц", "crescent"],
    ["Деловой штрих", "business-stroke"],
    ["Амулет", "amulet"],
    ["Свободный клапан", "free-flap"]
  ]);
  const fitPoses = [
    { id: "front", label: "Фронтально" },
    { id: "three-quarter", label: "Три четверти" },
    { id: "walking", label: "В движении" }
  ];
  const fitLookLoads = new Map();
  const fitPoseImages = new Map();
  let currentFitProduct = null;
  let fitPoseIndex = 0;
  let fitRequest = 0;
  let fitGenerationRun = 0;
  let fitAbortController = null;
  let fitRevealTimer = null;

  function requestFitLook(src, attempt = 0) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => resolve(src);
      image.onerror = () => {
        if (attempt < 2) {
          const retrySrc = `${src}&retry=${attempt + 1}-${Date.now()}`;
          window.setTimeout(() => {
            requestFitLook(retrySrc, attempt + 1).then(resolve, reject);
          }, 320 * (attempt + 1));
          return;
        }
        reject(new Error(`Не удалось загрузить образ: ${src}`));
      };
      image.src = src;
    });
  }

  function loadFitLook(src) {
    if (!fitLookLoads.has(src)) {
      fitLookLoads.set(src, requestFitLook(src).catch((error) => {
        fitLookLoads.delete(src);
        throw error;
      }));
    }
    return fitLookLoads.get(src);
  }

  function fitImagesFor(product) {
    if (!product) return [null, null, null];
    if (!fitPoseImages.has(product.sourceName)) {
      fitPoseImages.set(product.sourceName, [fitPreviewLooks.get(product.sourceName) || null, null, null]);
    }
    return fitPoseImages.get(product.sourceName);
  }

  function setFitAiState(message, mode = "") {
    if (!fitAiState) return;
    fitAiState.classList.remove("is-ready", "is-working", "is-warning");
    if (mode) fitAiState.classList.add(`is-${mode}`);
    const label = $("span", fitAiState);
    if (label) label.textContent = message;
  }

  function updatePoseControls() {
    const images = fitImagesFor(currentFitProduct);
    if (fitPoseCount) fitPoseCount.textContent = `${fitPoseIndex + 1} / ${fitPoses.length}`;
    if (fitPoseLabel) fitPoseLabel.textContent = fitPoses[fitPoseIndex].label;
    $$('[data-fit-pose]', fitPoseDots || document.createElement("div")).forEach((button, index) => {
      const active = index === fitPoseIndex;
      button.classList.toggle("active", active);
      button.classList.toggle("ready", Boolean(images[index]));
      button.setAttribute("aria-selected", String(active));
      button.setAttribute("aria-label", `${fitPoses[index].label}${images[index] ? ", кадр готов" : ", ожидает генерацию"}`);
    });
  }

  function renderPoseDots() {
    if (!fitPoseDots) return;
    fitPoseDots.innerHTML = fitPoses.map((pose, index) => `
      <button type="button" role="tab" data-fit-pose="${index}" aria-selected="${index === 0}" aria-label="${pose.label}"></button>
    `).join("");
  }

  function syncFitPicker() {
    $$("[data-fit-name]", fitPicker || document.createElement("div")).forEach((button) => {
      const selected = currentFitProduct?.sourceName === decodeURIComponent(button.dataset.fitName);
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  function renderFitPicker() {
    if (!fitPicker) return;
    fitPicker.innerHTML = catalogue.map((product) => `
      <button class="fit-option" type="button" aria-label="Показать сумку «${escapeHtml(product.name)}» на модели" aria-pressed="false" data-fit-name="${encodeURIComponent(product.sourceName)}">
        <span><img src="${escapeHtml(product.image)}" alt="" /></span>
        <b>${escapeHtml(product.name)}</b>
      </button>
    `).join("");
  }

  function revealFitLook(src, product, request, poseIndex) {
    loadFitLook(src).then((loadedSrc) => {
      if (request !== fitRequest || !fitLook || !fitBackdrop || !fitStage) return;
      clearTimeout(fitRevealTimer);
      fitRevealTimer = setTimeout(() => {
        if (request !== fitRequest) return;
        fitLook.src = loadedSrc;
        fitLook.alt = `Модель с сумкой «${product.name}», ракурс «${fitPoses[poseIndex].label}»`;
        fitBackdrop.src = loadedSrc;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          if (request !== fitRequest) return;
          fitStage.classList.remove("is-changing");
          fitStage.setAttribute("aria-busy", "false");
          const isPreview = poseIndex === 0 && loadedSrc === fitPreviewLooks.get(product.sourceName);
          if (fitStatus) fitStatus.textContent = isPreview
            ? "РЕДАКЦИОННЫЙ ПРЕДПРОСМОТР · 1 / 3"
            : `AI-КАДР ${poseIndex + 1} / ${fitPoses.length}`;
        }));
        fitRevealTimer = null;
      }, reducedMotion ? 0 : 170);
    }).catch(() => {
      if (request !== fitRequest || !fitStage) return;
      fitStage.classList.remove("is-changing");
      fitStage.setAttribute("aria-busy", "false");
      if (fitStatus) fitStatus.textContent = "ОБРАЗ НЕДОСТУПЕН";
      showToast(`Не удалось загрузить образ «${product.name}»`, "!");
    });
  }

  function showFitPose(index, animate = true) {
    if (!currentFitProduct || !fitLook || !fitBackdrop || !fitStage) return;
    fitPoseIndex = (index + fitPoses.length) % fitPoses.length;
    const source = fitImagesFor(currentFitProduct)[fitPoseIndex];
    updatePoseControls();
    fitStage.classList.remove("detail-view");
    if (fitCamera) fitCamera.textContent = "Приблизить образ";
    clearTimeout(fitRevealTimer);

    if (!source) {
      fitRequest += 1;
      fitLook.src = baseFitLook;
      fitLook.alt = `Исходная модель — ракурс «${fitPoses[fitPoseIndex].label}» ожидает генерацию`;
      fitBackdrop.src = baseFitLook;
      fitStage.classList.remove("is-changing");
      fitStage.setAttribute("aria-busy", "false");
      if (fitStatus) fitStatus.textContent = `РАКУРС ${fitPoseIndex + 1} · ОЖИДАЕТ ГЕНЕРАЦИЮ`;
      return;
    }

    if (animate) fitStage.classList.add("is-changing");
    fitStage.setAttribute("aria-busy", "true");
    if (fitStatus) fitStatus.textContent = "ПРОЯВЛЯЕМ КАДР";
    revealFitLook(source, currentFitProduct, ++fitRequest, fitPoseIndex);
  }

  function sourceImageRect(sourceElement) {
    const image = sourceElement?.matches?.("img") ? sourceElement : sourceElement?.querySelector?.("img");
    const fallback = sourceElement?.closest?.(".product-card")?.querySelector?.("img");
    const node = image || fallback;
    return node?.getBoundingClientRect?.() || null;
  }

  function animateProductFlight(product, startRect) {
    if (reducedMotion || !fitStage || !startRect || startRect.width < 2 || startRect.height < 2) return;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const target = fitStage.getBoundingClientRect();
      if (!target.width || !target.height) return;
      const ghost = document.createElement("img");
      ghost.className = "fit-flying-product";
      ghost.src = product.image;
      ghost.alt = "";
      ghost.setAttribute("aria-hidden", "true");
      Object.assign(ghost.style, {
        left: `${startRect.left}px`,
        top: `${startRect.top}px`,
        width: `${startRect.width}px`,
        height: `${startRect.height}px`
      });
      document.body.appendChild(ghost);
      const endWidth = Math.min(target.width * .32, 260);
      const scale = endWidth / Math.max(startRect.width, 1);
      const startCenterX = startRect.left + startRect.width / 2;
      const startCenterY = startRect.top + startRect.height / 2;
      const endCenterX = target.left + target.width * .5;
      const endCenterY = target.top + target.height * .64;
      const animation = ghost.animate([
        { transform: "translate3d(0,0,0) scale(1) rotate(0deg)", opacity: .94, filter: "blur(0)" },
        { transform: `translate3d(${(endCenterX - startCenterX) * .55}px, ${(endCenterY - startCenterY) * .28 - 40}px, 0) scale(${Math.max(scale, .72) * 1.08}) rotate(-4deg)`, opacity: 1, offset: .58 },
        { transform: `translate3d(${endCenterX - startCenterX}px, ${endCenterY - startCenterY}px, 0) scale(${scale}) rotate(0deg)`, opacity: 0, filter: "blur(2px)" }
      ], { duration: 920, easing: "cubic-bezier(.22,.8,.2,1)", fill: "forwards" });
      animation.finished.catch(() => {}).finally(() => ghost.remove());
    }));
  }

  function selectForFitting(product, shouldOpen = true, sourceElement = null) {
    if (!product || !fitPreviewLooks.has(product.sourceName) || !fitLook || !fitBackdrop || !fitStage) return;
    fitGenerationRun += 1;
    fitAbortController?.abort();
    fitAbortController = null;
    if (fitGenerationState) fitGenerationState.hidden = true;
    fitStage.setAttribute("aria-busy", "false");
    const startRect = sourceImageRect(sourceElement);
    currentFitProduct = product;
    if (shouldOpen) openDrawer(fittingRoom);
    fitPoseIndex = 0;
    if (fitSelection) fitSelection.textContent = product.name;
    if (fitPoseNav) fitPoseNav.hidden = false;
    if (fitGenerate) {
      fitGenerate.disabled = false;
      fitGenerate.textContent = "Создать 3 AI-образа";
    }
    if (fitCamera) {
      fitCamera.disabled = false;
      fitCamera.textContent = "Приблизить образ";
    }
    if (fitAdd) fitAdd.disabled = false;
    setFitAiState("Редакционный кадр готов. Запустите генерацию трёх уникальных ракурсов.", "ready");
    syncFitPicker();
    showFitPose(0);
    animateProductFlight(product, startRect);
  }

  function requestId() {
    return window.crypto?.randomUUID?.() || `lunea-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function generatedImageUrl(payload) {
    if (!payload || typeof payload !== "object") return null;
    if (payload.imageUrl) return payload.imageUrl;
    if (payload.resultUrl) return payload.resultUrl;
    if (payload.output?.imageUrl) return payload.output.imageUrl;
    if (payload.output?.url) return payload.output.url;
    if (payload.data?.[0]?.url) return payload.data[0].url;
    const encoded = payload.b64Json || payload.output?.b64Json || payload.data?.[0]?.b64_json;
    return encoded ? `data:image/png;base64,${encoded}` : null;
  }

  async function readTryOnResponse(response) {
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) throw new Error("try-on-api-unavailable");
    const payload = await response.json();
    if (!response.ok) throw new Error(payload?.message || payload?.error || "try-on-api-error");
    return payload;
  }

  async function pollTryOnJob(jobId, signal) {
    for (let attempt = 0; attempt < 45; attempt += 1) {
      if (signal.aborted) throw new DOMException("Aborted", "AbortError");
      if (attempt) await new Promise((resolve) => setTimeout(resolve, 1200));
      const response = await fetch(`/api/try-on/jobs/${encodeURIComponent(jobId)}`, {
        headers: { Accept: "application/json" },
        signal
      });
      const payload = await readTryOnResponse(response);
      const imageUrl = generatedImageUrl(payload);
      if (imageUrl) return imageUrl;
      if (["failed", "error", "cancelled"].includes(payload.status)) {
        throw new Error(payload.message || "try-on-generation-failed");
      }
    }
    throw new Error("try-on-generation-timeout");
  }

  async function generateFitPose(product, pose, signal) {
    const response = await fetch("/api/try-on/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        requestId: requestId(),
        productId: fitProductIds.get(product.sourceName),
        pose: pose.id
      }),
      signal
    });
    const payload = await readTryOnResponse(response);
    const immediate = generatedImageUrl(payload);
    if (immediate) return immediate;
    if (!payload.jobId) throw new Error("try-on-job-missing");
    return pollTryOnJob(payload.jobId, signal);
  }

  async function generateFitSet() {
    if (!currentFitProduct || !fitGenerate || !fitStage) return;
    fitAbortController?.abort();
    const controller = new AbortController();
    fitAbortController = controller;
    const run = ++fitGenerationRun;
    const product = currentFitProduct;
    const images = fitImagesFor(product);
    let completed = 0;

    fitGenerate.disabled = true;
    fitGenerate.textContent = "Создаём 0 / 3";
    fitStage.setAttribute("aria-busy", "true");
    if (fitGenerationState) fitGenerationState.hidden = false;
    setFitAiState("Генерируем три согласованных кадра одной модели…", "working");

    const results = await Promise.allSettled(fitPoses.map(async (pose, index) => {
      const imageUrl = await generateFitPose(product, pose, controller.signal);
      if (run !== fitGenerationRun || currentFitProduct?.sourceName !== product.sourceName) return null;
      images[index] = imageUrl;
      completed += 1;
      fitGenerate.textContent = `Создаём ${completed} / 3`;
      updatePoseControls();
      if (index === fitPoseIndex) showFitPose(index, false);
      return imageUrl;
    }));

    if (run !== fitGenerationRun || currentFitProduct?.sourceName !== product.sourceName) return;
    if (fitGenerationState) fitGenerationState.hidden = true;
    fitStage.setAttribute("aria-busy", "false");
    const succeeded = results.filter((result) => result.status === "fulfilled" && result.value).length;
    fitGenerate.disabled = false;
    fitGenerate.textContent = succeeded === fitPoses.length ? "Обновить 3 AI-образа" : "Повторить генерацию";

    if (succeeded === fitPoses.length) {
      setFitAiState("Три AI-кадра готовы — переключайте ракурсы стрелками.", "ready");
      showFitPose(0);
      showToast(`Три образа «${product.name}» готовы`, "✓");
    } else if (succeeded > 0) {
      setFitAiState(`Готово ${succeeded} из 3 кадров. Можно повторить генерацию.`, "warning");
      const firstReady = images.findIndex(Boolean);
      if (firstReady >= 0) showFitPose(firstReady);
      showToast(`Создано ${succeeded} из 3 кадров`, "!");
    } else {
      setFitAiState("Живая AI-генерация ждёт защищённого серверного подключения. Первый редакционный кадр уже доступен.", "warning");
      showFitPose(0);
      showToast("AI-генератор пока не подключён", "!");
    }
  }

  renderFitPicker();
  renderPoseDots();
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".try-product");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    selectForFitting(productFromElement(button), true, button.closest(".product-card") || button);
  });
  fitPicker?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-fit-name]");
    if (!button) return;
    const product = catalogueMap.get(decodeURIComponent(button.dataset.fitName));
    selectForFitting(product, false, button);
  });
  $(".fitting-trigger")?.addEventListener("click", () => {
    openDrawer(fittingRoom);
  });
  $(".fitting-close")?.addEventListener("click", closeDrawers);
  fitPoseDots?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-fit-pose]");
    if (button) showFitPose(Number(button.dataset.fitPose));
  });
  $(".fit-pose-prev")?.addEventListener("click", () => showFitPose(fitPoseIndex - 1));
  $(".fit-pose-next")?.addEventListener("click", () => showFitPose(fitPoseIndex + 1));
  fitGenerate?.addEventListener("click", generateFitSet);
  $(".fit-camera")?.addEventListener("click", () => {
    if (!currentFitProduct) return;
    fitStage?.classList.toggle("detail-view");
    if (fitCamera) fitCamera.textContent = fitStage?.classList.contains("detail-view") ? "Показать целиком" : "Приблизить образ";
  });
  $(".fit-add")?.addEventListener("click", () => {
    if (!currentFitProduct) return;
    addToCart(currentFitProduct);
  });
  $(".fit-reset")?.addEventListener("click", () => {
    fitRequest += 1;
    fitGenerationRun += 1;
    fitAbortController?.abort();
    fitAbortController = null;
    clearTimeout(fitRevealTimer);
    fitRevealTimer = null;
    currentFitProduct = null;
    fitPoseIndex = 0;
    if (fitLook) {
      fitLook.src = baseFitLook;
      fitLook.alt = "Модель в чёрном платье — исходный образ";
    }
    if (fitBackdrop) fitBackdrop.src = baseFitLook;
    fitStage?.classList.remove("detail-view", "is-changing");
    fitStage?.setAttribute("aria-busy", "false");
    if (fitSelection) fitSelection.textContent = "Сумка не выбрана";
    if (fitStatus) fitStatus.textContent = "ВЫБЕРИТЕ СУМКУ";
    if (fitPoseNav) fitPoseNav.hidden = true;
    if (fitGenerationState) fitGenerationState.hidden = true;
    if (fitGenerate) {
      fitGenerate.disabled = true;
      fitGenerate.textContent = "Создать 3 AI-образа";
    }
    if (fitCamera) {
      fitCamera.disabled = true;
      fitCamera.textContent = "Приблизить образ";
    }
    if (fitAdd) fitAdd.disabled = true;
    setFitAiState("Выберите сумку — первый кадр появится сразу");
    updatePoseControls();
    syncFitPicker();
  });
  document.addEventListener("keydown", (event) => {
    if (fittingRoom?.getAttribute("aria-hidden") !== "false" || !currentFitProduct) return;
    if (event.key === "ArrowLeft") showFitPose(fitPoseIndex - 1);
    if (event.key === "ArrowRight") showFitPose(fitPoseIndex + 1);
  });

  // Horizontal drag rail and arrow navigation.
  const categoryRail = $(".category-rail");
  $(".rail-next")?.addEventListener("click", () => categoryRail?.scrollBy({ left: Math.min(categoryRail.clientWidth * 0.82, 520), behavior: "smooth" }));
  $(".rail-prev")?.addEventListener("click", () => categoryRail?.scrollBy({ left: -Math.min(categoryRail.clientWidth * 0.82, 520), behavior: "smooth" }));
  if (categoryRail) {
    let drag = null;
    categoryRail.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch") return;
      drag = { x: event.clientX, left: categoryRail.scrollLeft };
      categoryRail.classList.add("dragging");
      categoryRail.setPointerCapture(event.pointerId);
    });
    categoryRail.addEventListener("pointermove", (event) => {
      if (drag) categoryRail.scrollLeft = drag.left - (event.clientX - drag.x) * 1.25;
    });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach((type) => categoryRail.addEventListener(type, () => {
      drag = null;
      categoryRail.classList.remove("dragging");
    }));
  }

  // Product filtering, accordion choreography and automatic editorial movement.
  const filterButtons = $$(".filter-pills [data-filter]");
  function applyProductFilter(filter = "all") {
    filterButtons.forEach((item) => {
      const selected = item.dataset.filter === filter;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    $$(".bestseller-grid .product-card").forEach((card, index) => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) {
        card.animate([
          { opacity: 0, transform: "translateY(18px) scale(.98)" },
          { opacity: 1, transform: "none" }
        ], { duration: 430, delay: index * 45, easing: "cubic-bezier(.22,1,.36,1)" });
      }
    });
  }
  filterButtons.forEach((button) => button.addEventListener("click", () => applyProductFilter(button.dataset.filter)));
  $$('[data-category-filter]').forEach((link) => link.addEventListener("click", () => {
    applyProductFilter(link.dataset.categoryFilter || "all");
  }));
  applyProductFilter(filterButtons.find((button) => button.classList.contains("active"))?.dataset.filter || "all");

  const collectionPanels = $$(".collection-panel");
  let collectionIndex = 0;
  let collectionTimer;
  function activateCollection(index) {
    collectionIndex = (index + collectionPanels.length) % collectionPanels.length;
    collectionPanels.forEach((panel, panelIndex) => {
      const active = panelIndex === collectionIndex;
      panel.classList.toggle("active", active);
      panel.setAttribute("aria-current", active ? "true" : "false");
    });
  }
  collectionPanels.forEach((panel, index) => {
    ["mouseenter", "focusin", "click"].forEach((type) => panel.addEventListener(type, () => activateCollection(index)));
    panel.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === "Home" ? 0 : event.key === "End" ? collectionPanels.length - 1 : index + (event.key === "ArrowRight" ? 1 : -1);
      activateCollection(next);
      collectionPanels[collectionIndex]?.focus();
    });
  });
  const collection = $(".collection-accordion");
  function startCollectionCycle() {
    if (reducedMotion || collectionTimer || !collectionPanels.length) return;
    collectionTimer = setInterval(() => activateCollection(collectionIndex + 1), 3600);
  }
  function stopCollectionCycle() {
    clearInterval(collectionTimer);
    collectionTimer = null;
  }
  collection?.addEventListener("mouseenter", stopCollectionCycle);
  collection?.addEventListener("mouseleave", startCollectionCycle);
  collection?.addEventListener("focusin", stopCollectionCycle);
  collection?.addEventListener("focusout", (event) => {
    if (!collection.contains(event.relatedTarget)) startCollectionCycle();
  });
  if (collection && "IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => entry.isIntersecting ? startCollectionCycle() : stopCollectionCycle(), { threshold: 0.25 }).observe(collection);
  }

  // The lookbook cycles through pieces while visible, echoing the reference's swap effect.
  const lookSets = [
    [
      { image: "./assets/bags/linea.png", label: "01 / ГОРОД", title: "Графично.<br>И по делу.", sourceName: "Линия", price: 69.9, category: "EastWest" },
      { image: "./assets/bags/business-stroke.png", label: "03 / РИТМ", title: "Вместительно.<br>И собранно.", sourceName: "Деловой штрих", price: 87.9, category: "Tote" },
      { image: "./assets/bags/amulet.png", label: "05 / АКЦЕНТ", title: "Маленькая.<br>Но заметная.", sourceName: "Амулет", price: 49.9, category: "Crossbody" }
    ],
    [
      { image: "./assets/bags/soft-contour.png", label: "02 / ТАКТИЛЬНОСТЬ", title: "Мягко.<br>И свободно.", sourceName: "Мягкий контур", price: 89.9, category: "Bucket" },
      { image: "./assets/bags/crescent.png", label: "04 / ЛИНИЯ", title: "Плавный силуэт.<br>Точный образ.", sourceName: "Полумесяц", price: 74.9, category: "Shoulder" },
      { image: "./assets/bags/woven-light.png", label: "06 / ЛЕТО", title: "Лёгкая фактура.<br>Тёплый свет.", sourceName: "Плетёный свет", price: 54.9, category: "Tote" }
    ]
  ];
  let lookIndex = 0;
  let lookTimer;
  const lookCards = $$(".look-card");
  function changeLooks() {
    lookIndex = (lookIndex + 1) % 3;
    lookCards.forEach((card, index) => {
      const look = lookSets[index][lookIndex];
      const product = normaliseProduct({ name: look.sourceName, sourceName: look.sourceName, price: look.price, image: look.image, category: look.category });
      card.classList.add("switching");
      setTimeout(() => {
        const image = $("img", card);
        image.src = safeImageUrl(look.image);
        image.alt = `${product.name} — женская сумка`;
        $(".look-overlay > span", card).textContent = look.label;
        $(".look-overlay h3", card).innerHTML = look.title;
        $(".look-overlay p", card).textContent = `${product.name} · ${money(product.price)}`;
        card.dataset.name = look.sourceName;
        card.dataset.price = String(look.price);
        card.dataset.category = look.category;
        card.dataset.image = look.image;
        card.classList.remove("switching");
      }, 360);
    });
  }
  const lookGrid = $(".look-grid");
  function startLookCycle() {
    if (reducedMotion || lookTimer) return;
    lookTimer = setInterval(changeLooks, 4200);
  }
  function stopLookCycle() {
    clearInterval(lookTimer);
    lookTimer = null;
  }
  lookGrid?.addEventListener("mouseenter", stopLookCycle);
  lookGrid?.addEventListener("mouseleave", startLookCycle);
  lookGrid?.addEventListener("focusin", stopLookCycle);
  lookGrid?.addEventListener("focusout", (event) => {
    if (!lookGrid.contains(event.relatedTarget)) startLookCycle();
  });
  lookCards.forEach((card) => {
    const openLook = () => {
      const product = productFromElement(card);
      if (product) openProduct(product, card);
    };
    card.addEventListener("click", (event) => {
      if (event.target.closest("button, a")) return;
      openLook();
    });
    card.addEventListener("keydown", (event) => {
      if (!["Enter", " "].includes(event.key) || event.target.closest("button, a")) return;
      event.preventDefault();
      openLook();
    });
  });
  if (lookGrid && "IntersectionObserver" in window && !reducedMotion) {
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) startLookCycle();
      else stopLookCycle();
    }, { threshold: 0.2 }).observe(lookGrid);
  }

  // Review controls are scroll-aware on mobile and focus the active story on desktop.
  const reviewTrack = $(".review-track");
  const reviews = $$(".review-card");
  let reviewIndex = 0;
  function showReview(index, shouldScroll = true) {
    reviewIndex = (index + reviews.length) % reviews.length;
    reviews.forEach((review, itemIndex) => {
      const active = itemIndex === reviewIndex;
      review.classList.toggle("active", active);
      review.setAttribute("aria-current", active ? "true" : "false");
    });
    const counter = $(".review-controls span b");
    if (counter) counter.textContent = String(reviewIndex + 1).padStart(2, "0");
    if (shouldScroll) {
      reviews[reviewIndex]?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest", inline: "center" });
    }
  }
  $(".review-next")?.addEventListener("click", () => showReview(reviewIndex + 1));
  $(".review-prev")?.addEventListener("click", () => showReview(reviewIndex - 1));
  let reviewScrollTimer;
  reviewTrack?.addEventListener("scroll", () => {
    clearTimeout(reviewScrollTimer);
    reviewScrollTimer = setTimeout(() => {
      const trackCenter = reviewTrack.scrollLeft + reviewTrack.clientWidth / 2;
      let nearest = 0;
      let distance = Infinity;
      reviews.forEach((review, index) => {
        const currentDistance = Math.abs(review.offsetLeft + review.offsetWidth / 2 - trackCenter);
        if (currentDistance < distance) {
          distance = currentDistance;
          nearest = index;
        }
      });
      if (nearest !== reviewIndex) showReview(nearest, false);
    }, 90);
  }, { passive: true });
  showReview(0, false);

  // Lightweight ambient sound is generated locally and never starts without a click.
  let soundOn = false;
  let ambientAudio = null;
  function stopAmbientSound() {
    if (!ambientAudio) return;
    const { context, gain, oscillators } = ambientAudio;
    gain.gain.cancelScheduledValues(context.currentTime);
    gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.22);
    setTimeout(() => {
      oscillators.forEach((oscillator) => {
        try { oscillator.stop(); } catch (_) { /* already stopped */ }
      });
      context.close().catch(() => {});
    }, 250);
    ambientAudio = null;
  }
  async function startAmbientSound() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) throw new Error("AudioContext is unavailable");
    const context = new AudioContextClass();
    await context.resume();
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.018, context.currentTime + 0.35);
    gain.connect(context.destination);
    const oscillators = [82.41, 123.47].map((frequency, index) => {
      const oscillator = context.createOscillator();
      const level = context.createGain();
      oscillator.type = index ? "sine" : "triangle";
      oscillator.frequency.value = frequency;
      level.gain.value = index ? 0.18 : 0.52;
      oscillator.connect(level).connect(gain);
      oscillator.start();
      return oscillator;
    });
    ambientAudio = { context, gain, oscillators };
  }
  $(".sound-toggle")?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    if (soundOn) {
      stopAmbientSound();
      soundOn = false;
    } else {
      try {
        await startAmbientSound();
        soundOn = true;
      } catch (_) {
        showToast("Браузер не разрешил воспроизведение звука", "∕");
      }
    }
    const label = $(".sound-label", button);
    if (label) label.textContent = soundOn ? "Звук включён" : "Звук выключен";
    button.classList.toggle("on", soundOn);
    button.setAttribute("aria-pressed", String(soundOn));
    button.setAttribute("aria-label", soundOn ? "Выключить атмосферный звук" : "Включить атмосферный звук");
    if (soundOn) showToast("Атмосферный звук включён", "♫");
  });

  // Service information stays inside the site instead of leading to empty links.
  const infoDialog = $(".info-dialog");
  const infoPages = {
    account: ["Личный кабинет", "<p>Демо-кабинет LUNEA показывает возможности будущего магазина.</p><ul><li>История и статус заказов</li><li>Избранные сумки</li><li>Сохранённые адреса</li></ul>"],
    locale: ["Регион и валюта", "<p>Выбран регион: <strong>Россия</strong>.</p><p>Язык интерфейса — русский, цены указаны в рублях.</p>"],
    social: ["LUNEA в соцсетях", "<p>Следите за новыми силуэтами, материалами и съёмками коллекции.</p><p><strong>@lunea.bags</strong> · социальные ссылки будут подключены при запуске бренда.</p>"],
    looks: ["Идеи образов", "<p>Сочетайте выразительную сумку с чистыми линиями, спокойной палитрой и одним точным акцентом.</p><p>Откройте раздел «На модели», чтобы увидеть каждую сумку в готовом fashion-образе.</p>"],
    delivery: ["Доставка", "<p>Бесплатно для заказов от 15 000 ₽. Обычная доставка занимает 3–5 рабочих дней, экспресс — 1–2 дня.</p>"],
    returns: ["Возврат", "<p>Вернуть товар можно в течение 30 дней после получения, если сохранены внешний вид, упаковка и комплектность.</p>"],
    sizes: ["Размеры сумок", "<p>Точные размеры и вместимость указаны в карточке каждой модели. Сравните масштаб в интерактивной примерке.</p>"],
    contact: ["Связаться с нами", "<p>Клиентская служба: <strong>hello@lunea-bags.ru</strong></p><p>Ежедневно с 10:00 до 20:00 по московскому времени.</p>"],
    journal: ["Журнал LUNEA", "<p>Истории о форме, ремесле и личном стиле. Первый выпуск появится вместе с новой коллекцией.</p>"],
    materials: ["Материалы", "<p>Мы выбираем натуральную кожу, замшу, рафию и долговечную фурнитуру, сохраняя выразительную фактуру материала.</p>"],
    care: ["Уход", "<p>Храните сумку в чехле, вдали от влаги и прямого солнца. Для кожи используйте мягкую сухую салфетку и подходящий защитный состав.</p>"],
    legal: ["Конфиденциальность и условия", "<p>Это демонстрационная витрина: платёж не проводится, а введённые данные карты не отправляются и не сохраняются.</p><p>При запуске магазина здесь будут размещены публичная оферта и политика обработки данных.</p>"]
  };
  let infoReturnFocus = null;
  function openInfo(key, returnTarget = document.activeElement) {
    if (!infoDialog || !infoPages[key]) return;
    infoReturnFocus = returnTarget;
    const [title, body] = infoPages[key];
    const heading = $("#infoTitle", infoDialog);
    const content = $(".info-body", infoDialog);
    if (heading) heading.textContent = title;
    if (content) content.innerHTML = body;
    infoDialog.showModal();
    focusFirst(infoDialog);
  }
  $(".account-trigger")?.addEventListener("click", (event) => openInfo("account", event.currentTarget));
  [$(".locale"), $(".mobile-locale")].filter(Boolean).forEach((button) => button.addEventListener("click", (event) => openInfo("locale", event.currentTarget)));
  $$("[data-info]").forEach((button) => button.addEventListener("click", (event) => openInfo(button.dataset.info, event.currentTarget)));
  $(".info-close")?.addEventListener("click", () => infoDialog?.close());
  $(".info-action")?.addEventListener("click", () => infoDialog?.close());
  infoDialog?.addEventListener("click", (event) => {
    if (event.target === infoDialog) infoDialog.close();
  });
  infoDialog?.addEventListener("close", () => {
    infoReturnFocus?.focus();
    infoReturnFocus = null;
  });

  $(".newsletter-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const input = $("input", form);
    const status = $(".newsletter-status", form);
    const email = input?.value.trim();
    if (email) storage.set("lunea-newsletter-email", email);
    if (status) {
      status.textContent = "Готово — вы в закрытом списке LUNEA.";
      status.classList.add("success");
    }
    showToast("Подписка оформлена", "✓");
    form.reset();
  });
  $(".back-top")?.addEventListener("click", () => scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }));

  // Magnetic controls and custom pointer, kept off touch devices.
  if (matchMedia("(pointer: fine)").matches && !reducedMotion) {
    const dot = $(".cursor-dot");
    const ring = $(".cursor-ring");
    let mouseX = innerWidth / 2, mouseY = innerHeight / 2, ringX = mouseX, ringY = mouseY;
    addEventListener("pointermove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (dot) dot.style.transform = `translate3d(${mouseX}px,${mouseY}px,0) translate(-50%,-50%)`;
    }, { passive: true });
    (function animateCursor() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (ring) ring.style.transform = `translate3d(${ringX}px,${ringY}px,0) translate(-50%,-50%)`;
      requestAnimationFrame(animateCursor);
    })();
    $$(".hover-media").forEach((media) => {
      media.addEventListener("mouseenter", () => ring?.classList.add("media"));
      media.addEventListener("mouseleave", () => ring?.classList.remove("media"));
    });
    $$(".magnetic").forEach((item) => {
      item.addEventListener("pointermove", (event) => {
        const rect = item.getBoundingClientRect();
        item.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.12}px, ${(event.clientY - rect.top - rect.height / 2) * 0.12}px)`;
      });
      item.addEventListener("pointerleave", () => { item.style.transform = ""; });
    });
  }

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-shop, .mega-menu")) setMega(false);
  });
})();
