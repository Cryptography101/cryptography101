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
        {text:"Basic Stuff",link:"/basic-terminology"},
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
        },
        {
          text: "Hashing",
          collapsed: true,
          items: [
            { text: "Introduction to Hashing", link: "/hashing/intro" },
            { text: "Hash Functions", link: "/hashing/functions" },
            { 
              text: "Common Hash Algorithms",
              collapsed: true,
              items: [
                { text: "MD5", link: "/hashing/algorithms/md5" },
                { text: "SHA Family", link: "/hashing/algorithms/sha" },
                { text: "BLAKE2", link: "/hashing/algorithms/blake2" },
                { text: "BLAKE3", link: "/hashing/algorithms/blake3" },
                { text: "Keccak", link: "/hashing/algorithms/keccak" },
                { text: "Whirlpool", link: "/hashing/algorithms/whirlpool" }
              ]
            },
            {
              text: "Password Hashing",
              collapsed: true,
              items: [
                { text: "Password Hashing Overview", link: "/hashing/password/overview" },
                { text: "PBKDF2", link: "/hashing/password/pbkdf2" },
                { text: "bcrypt", link: "/hashing/password/bcrypt" },
                { text: "scrypt", link: "/hashing/password/scrypt" },
                { text: "Argon2", link: "/hashing/password/argon2" }
              ]
            },
            {
              text: "Applications",
              collapsed: true,
              items: [
                { text: "Digital Signatures", link: "/hashing/applications/signatures" },
                { text: "Data Integrity", link: "/hashing/applications/integrity" },
                { text: "Blockchain", link: "/hashing/applications/blockchain" },
                { text: "Message Authentication", link: "/hashing/applications/mac" },
                { text: "File Checksums", link: "/hashing/applications/checksums" }
              ]
            },
            {
              text: "Attacks and Security",
              collapsed: true,
              items: [
                { text: "Collision Attacks", link: "/hashing/security/collisions" },
                { text: "Birthday Attacks", link: "/hashing/security/birthday" },
                { text: "Rainbow Tables", link: "/hashing/security/rainbow-tables" },
                { text: "Length Extension", link: "/hashing/security/length-extension" },
                { text: "Chosen Prefix", link: "/hashing/security/chosen-prefix" }
              ]
            },
            {
              text: "Implementation",
              collapsed: true,
              items: [
                { text: "Python Examples", link: "/hashing/implementation/python" },
                { text: "JavaScript Examples", link: "/hashing/implementation/javascript" },
                { text: "Go Examples", link: "/hashing/implementation/go" },
                { text: "Rust Examples", link: "/hashing/implementation/rust" },
                { text: "C/C++ Examples", link: "/hashing/implementation/cpp" }
              ]
            },
            {
              text: "Best Practices",
              collapsed: true,
              items: [
                { text: "Choosing Hash Functions", link: "/hashing/best-practices/selection" },
                { text: "Secure Implementation", link: "/hashing/best-practices/implementation" },
                { text: "Salt and Pepper", link: "/hashing/best-practices/salt-pepper" },
                { text: "Storage Guidelines", link: "/hashing/best-practices/storage" },
                { text: "Upgrade Strategies", link: "/hashing/best-practices/upgrading" }
              ]
            },
            {
              text: "Tools and Libraries",
              collapsed: true,
              items: [
                { text: "Command Line Tools", link: "/hashing/tools/cli" },
                { text: "Programming Libraries", link: "/hashing/tools/libraries" },
                { text: "Online Tools", link: "/hashing/tools/online" },
                { text: "Analysis Tools", link: "/hashing/tools/analysis" }
              ]
            },
            { text: "Practice Problems", link: "/hashing/practice" },
            { text: "CTF Challenges", link: "/hashing/ctf" }
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