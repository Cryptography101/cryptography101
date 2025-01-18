export default {
  title: "Cryptography101",
  description: "A complete guide to cryptography and its role in CTF challenges.",
  themeConfig: {
    search: {
      provider: "local",
    },
   
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide" },
      { text: "Mathematics", link: "/mathematics" },
      { text: "Programming", link: "/programming" }
    ],
    
    sidebar: {
      "/": [
        { text: "Introduction", link: "/" },
        { text: "Getting Started", link: "/guide" },
        { text: "CTF Challenges", link: "/challenges" },
        { text: "Tools of Trade", link: "/tools" },
        {
          text: "Mathematics",
          collapsed: "True",
          items: [
            { text: "Introduction to Math", link: "/mathematics" },
            { text: "Number Theory", link: "/mathematics/number-theory" },
            { text: "Modular Arithmetic", link: "/mathematics/modular-arithmetic" },
            { text: "Prime Numbers", link: "/mathematics/prime-numbers" },
            { text: "GCD and LCM", link: "/mathematics/gcd-lcm" },
            { text: "Groups and Fields", link: "/mathematics/groups-fields" },
            { text: "Elliptic Curves", link: "/mathematics/elliptic-curves" },
            { text: "Lattices", link: "/mathematics/lattices" },
            { text: "Practice Problems", link: "/mathematics/practice" }
          ]
        },
        {
          text: "Programming Languages",
          collapsed: "True",
          items: [
            { text: "Introduction", link: "/programming" },
            { text: "Python for Cryptography", link: "/programming/python" },
            { text: "Ruby for Cryptography", link: "/programming/ruby" },
            { text: "JavaScript Crypto", link: "/programming/javascript" },
            { text: "Go Cryptography", link: "/programming/go" },
            { text: "Rust Cryptography", link: "/programming/rust" },
            { text: "C/C++ Cryptography", link: "/programming/cpp" },
            { text: "Libraries & Tools", link: "/programming/tools" }
          ]
        }
      ],
    },
    
    socialLinks: [
      { icon: "github", link: "https://github.com/crypt0-wizard/cryptography101.git" },
      { icon: "discord", link: "https://discord.gg/your-discord-invite-link" }
    ],
  },
};