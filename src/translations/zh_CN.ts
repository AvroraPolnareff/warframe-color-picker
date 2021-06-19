import headerLayoutsImage from "../assets/choose-your-fighter.svg"
import suggestions from "../assets/SUGGESTIONS.svg"
import headerSchemeImportImage from "../assets/scheme-import-en.svg";

const zh_CN = {
  layoutSelection: {
    headerImage: headerLayoutsImage,
    headerText: "选择是要使用扩展布局还是原始的经典布局。",
    bottomText: [
      "更多定制选项即将推出！如果您有好点子，或者想提前体验新功能，请加入我们的 ",
      "Discord",
      " !"
    ],
  },
  languageSelection: {
    headerText: ["注意!", " 调色板名称将根据所选语言进行更改。"],
    bottomText: [
      "缺少您所使用的语言？不用担心，您可以帮忙添加您的语言的翻译！前往我们的 ",
      "Discord",
      " 以便与我们合作。"
    ],
  },
  menu: {
    layoutSwitch: "切换布局",
    languageSwitch: "语言",
    help: "帮助 & 关于",
    colorPicker: "取色器",
    motd: " 每日消息",
    hide: "隐藏",
    show: "显示",
  },
  palettesModal: {
    modalName: "色板",
    description: "自定义您的建议",
    disableAll: "禁用全部",
    enableAll: "启用全部",
  },
  importModal: {
    modalName: "导入配色方案",
    description: "在下面输入代码",
    textArea: [
      "在这里粘贴你的",
      "颜色代码",
      "或",
      "游戏内配色截图",
      "..."
    ],
    manualUpload: "手动上传截图",// upload screenshot manually
    accept: "确定",
    clear: "清空"
  },
  schemeImport: {
    headerImage: headerSchemeImportImage,
    headerText: "警告: 这将覆盖您当前的配色方案。选择是要保留当前配色方案，还是从链接中导入新配色方案。",
    currentScheme: "当前方案",
    newScheme: "新方案",
    confirm: "确定",
    bottomText: "请放心，直接离开此页面不会丢失你当前已有的配色方案。"
  },
  colorPicker: {
    targetScheme: {
      targetScheme: "当前配色方案",// current scheme
      default: "标准", // standard
      manual: "多色板", // multiple palettes
      primary: "主要颜色",
      secondary: "次要颜色",
      tertiary: "军械库第三色彩",
      quaternary: "军械库高亮颜色",
      emissive: "放射颜色",
      energy: "能量颜色",
      import: "导入",
      export: "导出",
      copied: "已复制"
    },
    suggestions: {
      suggestions: suggestions,
      scroll: "滚动查看更多！",
      palettes: "色板",
    },
    selectedColor: {
      selectedColor: "当前选中颜色",// current selected color
    },
    howToUse: "使用方法",
    motd: `加入我们的Discord：discord.gg/WWBYuY3！这里不光聊Warframe，所以请随意加入！我们的社区仍在扩大，并且正在寻找新成员，希望可以在这里见到你！`,
  },
  palettes: {
    "Agony": "Agony",
    "Bastille": "Bastille",
    "Beach": "海滩",
    "Cherub": "小天使",
    "Classic Saturated": "鲜艳经典",
    "Classic": "经典",
    "Conquest": "Conquest",
    "Corpus": "Corpus",
    "Darkness": "Darkness",
    "Daybreak": "破晓",
    "Discord": "Discord",
    "Dojo": "道场",
    "Easter": "复活节",
    "Eminence": "显赫",
    "Eximus": "卓越者",
    "Fear": "Fear",
    "Fire": "烈火",
    "Grineer": "Grineer",
    "Hallow'S Eve": "万圣节前夕",
    "Halloween": "万圣节",
    "Hatred": "Hatred",
    "Ice": "寒冰色",
    "Infested": "Infested",
    "Ki'Teer": "Ki'Teer",
    "Lotus": "Lotus",
    "Matisse": "马蒂斯",
    "Orokin": "Orokin",
    "Pride": "骄傲月",
    "Red White Blue": "红/白/蓝",
    "Rollers": "滚球",
    "Rot": "Rot",
    "Shamrock": "幸运草",
    "Smoke Colors": "烟灰色",
    "Spektaka": "华丽演出",
    "Storm": "暴雨",
    "Tenno II": "Tenno II",
    "Tenno": "Tenno",
    "Transmission": "传播",
    "Twilight": "暮光",
    "Twitch": "Twitch",
    "Undying": "Undying",
    "Valentine": "情人节",
  }
}

export default zh_CN
