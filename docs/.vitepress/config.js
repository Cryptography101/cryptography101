export default {
  title: "Cryptography101",
  description: "A complete guide to cryptography and its role in CTF challenges.",
  themeConfig: {
    search: {
      provider: "local",
    },
   
    nav: [
      { text: "Home", link: "/" },
      //{ text: "Guide", link: "/guide" },
      { text: "Tools of Trade", link: "/tools" },
      //{ text: "Programming", link: "/programming" }
      {text:"Books",link:"/books"}
    ],
    
    sidebar: {
      "/": [
        { text: "Introduction", link: "/" },
        //{ text: "CTF Challenges", link: "/challenges" },
        //{ text: "Tools of Trade", link: "/tools" },
        //{ text: "Hardware Cryptography", link: "/hardware-crypto" },
        {
          text: "History of Cryptography",
          collapsed: true,
          items: [
            {text:"History",link:"/history/intro"},
            { text: "Ancient Cryptography", link: "/history/ancient" },
            { text: "Classical Period", link: "/history/classical" },
            { text: "Medieval Cryptography", link: "/history/medieval" },
            { text: "Renaissance Era", link: "/history/renaissance" },
            { text: "World Wars", link: "/history/world-wars" },
            { text: "Modern Era", link: "/history/modern" },
            { text: "Contemporary Cryptography", link: "/history/contemporary" }
          ]
        },
        {
          text: "Mathematics",
          collapsed: "True",
          items: [
            { text: "Introduction to Math", link: "/mathematics/intro" },
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
            { text: "Introduction", link: "/programming/intro" },
            { text: "Python Cryptography", link: "/programming/python" },
            { text: "Ruby Cryptography", link: "/programming/ruby" },
            { text: "JavaScript Crypto", link: "/programming/javascript" },
            { text: "Go Cryptography", link: "/programming/go" },
            { text: "Rust Cryptography", link: "/programming/rust" },
            { text: "C/C++ Cryptography", link: "/programming/cpp" },
            //{ text: "Libraries & Tools", link: "/programming/tools" }
          ]
        },
        {
          text: "Asymmetric Cryptography",
          collapsed: "True",
          items: [
            { text: "Introduction to Asymmetric Cryptography", link: "/asymmetric/introduction" },
            { text: "RSA Cryptosystem", link: "/asymmetric/rsa" },
            { text: "Digital Signatures", link: "/asymmetric/digital-signatures" },
            { text: "Diffie-Hellman Key Exchange", link: "/asymmetric/diffie-hellman" },
            { text: "ElGamal Encryption", link: "/asymmetric/elgamal" },
            { text: "Elliptic Curve Cryptography", link: "/asymmetric/ecc" },
            { text: "Post-Quantum Cryptography", link: "/asymmetric/post-quantum" },
            { text: "Common Attacks", link: "/asymmetric/attacks" },
            { text: "Best Practices", link: "/asymmetric/best-practices" }
          ]
        }


      ],
    },
    
    socialLinks: [
      { icon: "github", link: "https://github.com/crypt0-wizard/cryptography101.git" },
      { icon: "discord", link: "https://discord.gg/your-discord-invite-link" }
    ],

    lastUpdated: true,
    
  },
};