export const navItems = [
  {
    name: "home",
    url: "",
    icon: "icon-hs_logo",
    homepage_block_width: 0
  },
  {
    name: "decks",
    url: "decks",
    icon: "icon-deck",
    homepage_block_width: 3,
    submenu: [
      //url has to be in case if blizzard adds demon hunter / death knight classes
      {
        name: "warlock",
        url: "warlock"
      },
      {
        name: "druid",
        url: "druid"
      },
      {
        name: "priest",
        url: "priest"
      },
      {
        name: "rogue",
        url: "rogue"
      },
      {
        name: "hunter",
        url: "hunter"
      },
      {
        name: "mage",
        url: "mage"
      },
      {
        name: "paladin",
        url: "paladin"
      },
      {
        name: "shaman",
        url: "shaman"
      },
      {
        name: "warrior",
        url: "warrior"
      }
    ]
  },
  {
    name: "cards",
    url: "cards",
    icon: "icon-card",
    homepage_block_width: 1
  },
  {
    name: "Arena Picker",
    url: "arena-picker",
    icon: "icon-arena-picker",
    homepage_block_width: 1
  },
  {
    name: "Expansions",
    url: 'expansions',
    icon: "icon-expansions",
    homepage_block_width: 2,
    submenu: [
      {
        name: "Goblins vs Gnomes",
        url: "goblins-vs-gnomes"
      },
      {
        name: "The Grand Tournament",
        url: "the-grand-tournament"
      },
      {
        name: "Whispers of the Old Gods",
        url: "whispers-of-the-old-gods"
      },
      {
        name: "Mean Streets of Gadgetzan",
        url: "mean-streets-of-gadgetzan"
      }
    ]
  },
  {
    name: "adventures",
    url: 'adventures',
    icon: "icon-adventures",
    homepage_block_width: 0,
    submenu: [
      {
        name: "Curse of Naxxramas",
        url: "curse-of-naxxramas"
      },
      {
        name: "Blackrock Mountain",
        url: "blackrock-mountain"
      },
      {
        name: "The Leage of Explorers",
        url: "the-league-of-explorers"
      },
      {
        name: "One Night at Karazhan",
        url: "one-night-at-karazhan",
      }
    ]
  },
  {
    name: "create deck",
    url: "create-deck",
    icon: "icon-create-deck",
    homepage_block_width: 1
  },
  {
    name: "forum",
    url: 'forum',
    icon: "icon-bubbles2",
    homepage_block_width: 1
  },
  {
    name: "Tournaments",
    url: 'tournaments',
    icon: "icon-trophy",
    homepage_block_width: 1
  },
  {
    name: "Streamers",
    url: 'streamers',
    icon: "icon-twitch",
    homepage_block_width: 2
  },
  {
    name: "Login",
    url: "login",
    icon: "icon-login",
    homepage_block_width: 0
  }
];