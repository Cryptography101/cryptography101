export default {
  title: "Cryptography101",
  description:
    "A complete guide to cryptography and its role in CTF challenges.",
  themeConfig: {
    search: {
      provider: "local",
    }, 
   
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide" },
      { text: "CTF Challenges", link: "/challenges" },
    ],
    sidebar: {
      "/": [
        { text: "Introduction", link: "/" },
        { text: "Getting Started", link: "/guide" },
        { text: "CTF Challenges", link: "/challenges" },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/your-repo" }],
  },
};
