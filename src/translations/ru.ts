import headerLayoutsImage from "../assets/choose-your-fighter-ru.svg"
import headerSchemeImportImage from "../assets/scheme-import-ru.svg"

import suggestions from "../assets/SUGGESTIONS.svg";

const ru = {
  layoutSelection: {
    headerImage: headerLayoutsImage,
    headerText: "Выберите одну из двух планировок расположения окон: расширенную или классическую.",
    bottomText: [
      "Более широкие инструменты настройки уже находятся в разработке! Заглядывай к нам на огонёк в ",
      "Discord",
      ", если хочешь узнать больше!"
    ],
  },
  languageSelection: {
    headerText: ["Внимание!", " Названия палитр будут переведены в соответствии с выбранным языком."],
    bottomText: [
      "Your language is missing? No worries, you can support us by helping to add it! Head over to our ",
      "Discord",
      " so we can cooperate."
    ],
  },
  menu: {
    layoutSwitch: "Интерфейс",
    languageSwitch: "Язык",
    help: "Справка",
    colorPicker: "Пипетка",
    motd: " MOTD",
    hide: "Скрыть",
    show: "Показать",
  },
  palettesModal: {
    modalName: "Palettes",
    description: "Customize your suggestions",
    disableAll: "disable all",
    enableAll: "enable all",
  },
  importModal: {
    modalName: "Scheme Import",
    description: "Insert the code below",
    textArea: [
      "Paste your ",
      "code",
      " or ",
      "scheme screenshot",
      " here..."
    ],
    manualUpload: "MANUAL UPLOAD",
    accept: "accept",
    clear: "clear"
  },
  schemeImport: {
    headerImage: headerSchemeImportImage,
    headerText: "Внимание: новая палитра безвозвратно перезапишет старую. Выберите одну из палитр ниже.",
    currentScheme: "Старая палитра",
    newScheme: "Новая палитра",
    confirm: "Подтвердить",
    bottomText: "Если закрыть эту страницу, то по умолчанию будет выбрана старая палитра."
  },
  colorPicker: {
    targetScheme: {
      targetScheme: "TARGET SCHEME",
      default: "DEFAULT",
      manual: "MANUAL",
      primary: "ОСНОВНОЙ",
      secondary: "ВТОРИЧНЫЙ",
      tertiary: "ТРЕТИЧНЫЙ",
      quaternary: "АКЦЕНТЫ",
      emissive: "ЭФФЕКТЫ 1, 2",
      energy: "ЭНЕРГИЯ 1, 2",
      import: "импорт",
      export: "экспорт",
      copied: "скопировано!"
    },
    suggestions: {
      suggestions,
      scroll: "SCROLL FOR MORE!",
      palettes: "PALETTES",
    },
    selectedColor: {
      selectedColor: "SELECTED COLOR",
    },
    motd: `Join our Discord at: discord.gg/WWBYuY3! This place is not only limited to Warframe, so feel free to hop in
          even if you’re on a break. Our community is still growing, and we’re actively looking for new people. Hope
          to see you around!`,
    howToUse: "HOW TO USE",
  },
  palettes: {
    "Agony": "Агония",
    "Bastille": "Бастилия",
    "Beach": "Пляж",
    "Cherub": "Амурчик",
    "Classic Saturated": "Классический Насыщенный",
    "Classic": "Классический",
    "Conquest": "Завоевание",
    "Corpus": "Корпус",
    "Darkness": "Тьма",
    "Daybreak": "Рассвет",
    "Discord": "Discord",
    "Dojo": "Додзё",
    "Easter": "Пасха",
    "Eminence": "Возвышение",
    "Eximus": "Эксимус",
    "Fear": "Страх",
    "Fire": "Огонь",
    "Grineer": "Гринир",
    "Hallow'S Eve": "Ночь Перед Хэллоуином",
    "Halloween": "Хэллоуин",
    "Hatred": "Ненависть",
    "Ice": "Цвет Льда",
    "Infested": "Заражённый",
    "Ki'Teer": "Ки'Тиир",
    "Lotus": "Лотос",
    "Matisse": "Матисс",
    "Orokin": "Орокин",
    "Pride": "Pride",
    "Red White Blue": "Красный, Белый и Синий",
    "Rollers": "Роллеры",
    "Rot": "Гниль",
    "Shamrock": "Трилистник",
    "Smoke Colors": "Дымчатые Цвета",
    "Spektaka": "Спектака",
    "Storm": "Шторм",
    "Tenno II": "Тэнно II",
    "Tenno": "Тэнно",
    "Transmission": "Передача",
    "Twilight": "Сумерки",
    "Twitch": "Twitch",
    "Undying": "Бессмертный",
    "Valentine": "Цвета Валентина",
  }
}

export default ru
