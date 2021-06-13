import headerLayoutsImage from "../assets/choose-your-fighter.svg"
import suggestions from "../assets/SUGGESTIONS.svg"
import headerSchemeImportImage from "../assets/scheme-import-en.svg";

const en = {
  layoutSelection: {
    headerImage: headerLayoutsImage,
    headerText: "Select whether you want to use an expanded layout, or the original, classic one.",
    bottomText: [
      "More customization options are on the way! Hop onto our ",
      "Discord",
      " if you have any suggestions, or if you just want to get a sneak peek on the upcoming changes!"
    ],
  },
  languageSelection: {
    headerText: ["Attention!", " Color Palette names will be changed according to the chosen language."],
    bottomText: [
      "Your language is missing? No worries, you can support us by helping to add it! Head over to our ",
      "Discord",
      " so we can cooperate."
    ],
  },
  menu: {
    layoutSwitch: "Layout Switch",
    languageSwitch: "Language",
    help: "Help & Info",
    colorPicker: "Color Picker",
    motd: " MOTD",
    hide: "Hide",
    show: "Show",
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
    accept: "accept"
  },
  schemeImport: {
    headerImage: headerSchemeImportImage,
    headerText: "Warning: this will override your current scheme. Choose whether you want to keep the current scheme, or import a new one from the link.",
    currentScheme: "Current scheme",
    newScheme: "New scheme",
    confirm: "Confirm",
    bottomText: "Don’t worry: leaving this screen will keep your current scheme."
  },
  colorPicker: {
    targetScheme: {
      targetScheme: "TARGET SCHEME",
      default: "DEFAULT",
      manual: "MANUAL",
      primary: "PRIMARY",
      secondary: "SECONDARY",
      tertiary: "TERTIARY",
      quaternary: "QUATERNARY",
      emissive: "EMISSIVE 1, 2",
      energy: "ENERGY 1, 2",
      import: "import",
      export: "export",
      copied: "copied!"
    },
    suggestions: {
      suggestions,
      scroll: "SCROLL FOR MORE!",
      palettes: "PALETTES",
    },
    selectedColor: {
      selectedColor: "SELECTED COLOR",
    }
  },
  palettes: {
    "Agony": "Agony",
    "Bastille": "Bastille",
    "Beach": "Beach",
    "Cherub": "Cherub",
    "Classic Saturated": "Classic Saturated",
    "Classic": "Classic",
    "Conquest": "Conquest",
    "Corpus": "Corpus",
    "Darkness": "Darkness",
    "Daybreak": "Daybreak",
    "Discord": "Discord",
    "Dojo": "Dojo",
    "Easter": "Easter",
    "Eminence": "Eminence",
    "Eximus": "Eximus",
    "Fear": "Fear",
    "Fire": "Fire",
    "Grineer": "Grineer",
    "Hallow'S Eve": "Hallow'S Eve",
    "Halloween": "Halloween",
    "Hatred": "Hatred",
    "Ice": "Ice",
    "Infested": "Infested",
    "Ki'Teer": "Ki'Teer",
    "Lotus": "Lotus",
    "Matisse": "Matisse",
    "Orokin": "Orokin",
    "Pride": "Pride",
    "Red White Blue": "Red/White/Blue",
    "Rollers": "Rollers",
    "Rot": "Rot",
    "Shamrock": "Shamrock",
    "Smoke Colors": "Smoke Colors",
    "Spektaka": "Spektaka",
    "Storm": "Storm",
    "Tenno II": "Tenno II",
    "Tenno": "Tenno",
    "Transmission": "Transmission",
    "Twilight": "Twilight",
    "Twitch": "Twitch",
    "Undying": "Undying",
    "Valentine": "Valentine",
  }
}

export default en
