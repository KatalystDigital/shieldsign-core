export default {
  index: {
    type: 'page',
    title: 'Home',
    display: 'hidden',
    theme: {
      timestamp: false,
    },
  },
  users: {
    type: 'page',
    title: 'Users',
  },
  developers: {
    type: 'page',
    title: 'Developers',
  },
  updates: {
    title: "What's New",
    type: 'menu',
    items: {
      changelog: {
        title: 'Changelog',
        href: 'https://github.com/KatalystDigital/shieldsign-core/blob/main/CHANGELOG.md',
        newWindow: true,
      },
      releases: {
        title: 'Releases',
        href: 'https://github.com/KatalystDigital/shieldsign-core/releases',
        newWindow: true,
      },
    },
  },
};
