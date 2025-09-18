export const portfolioData = {
  name: "Alex Chen",
  role: "Computer Science Student",
  university: "University of Technology",
  specialization: "Cybersecurity & Information Security",
  location: "San Francisco, CA",
  
  about: `👋 Hey there! I'm Alex, a passionate Computer Science student with a deep fascination for cybersecurity.

🎓 Currently pursuing my Bachelor's in Computer Science with a specialization in Cybersecurity and Information Security. I love the challenge of understanding how systems work and how to protect them from various threats.

🔒 My journey in cybersecurity started with curiosity about how hackers operate, which led me to learn ethical hacking, penetration testing, and security analysis. I believe that to protect systems effectively, you need to think like an attacker.

💻 When I'm not diving deep into security research or working on projects, you can find me:
   • Participating in CTF competitions
   • Contributing to open-source security tools  
   • Learning about the latest vulnerabilities and exploits
   • Building secure applications and systems

🌟 My goal is to become a cybersecurity professional who helps organizations stay one step ahead of threats while making the digital world a safer place for everyone.`,

  projects: [
    {
      name: "Vulnerability Scanner",
      description: "A Python-based network vulnerability scanner that identifies common security weaknesses in web applications and network services.",
      tech: ["Python", "Nmap", "SQLAlchemy", "Flask", "Docker"],
      status: "Active Development",
      github: "https://github.com/alexchen/vuln-scanner",
      demo: "https://vulnscanner-demo.herokuapp.com"
    },
    {
      name: "Secure Chat Application",
      description: "End-to-end encrypted messaging app with perfect forward secrecy, built with modern cryptographic protocols.",
      tech: ["React", "Node.js", "WebRTC", "Signal Protocol", "PostgreSQL"],
      status: "Completed",
      github: "https://github.com/alexchen/secure-chat",
      demo: "https://securechat-demo.netlify.app"
    },
    {
      name: "Honeypot Network",
      description: "Distributed honeypot system to detect and analyze malicious activities across different network protocols.",
      tech: ["Go", "Docker", "ELK Stack", "Redis", "Grafana"],
      status: "In Progress",
      github: "https://github.com/alexchen/honeypot-network"
    },
    {
      name: "Crypto CTF Platform",
      description: "Educational platform for cryptography challenges, featuring various cipher types and modern cryptographic puzzles.",
      tech: ["Django", "PostgreSQL", "Redis", "Celery", "Bootstrap"],
      status: "Completed",
      github: "https://github.com/alexchen/crypto-ctf",
      demo: "https://crypto-ctf.herokuapp.com"
    }
  ],

  skills: {
    "Security & Penetration Testing": [
      "Ethical Hacking",
      "Penetration Testing",
      "Vulnerability Assessment",
      "Web Application Security",
      "Network Security",
      "Malware Analysis",
      "Digital Forensics",
      "Social Engineering"
    ],
    "Programming Languages": [
      "Python",
      "JavaScript/TypeScript",
      "Go",
      "C/C++",
      "Java",
      "Bash/Shell Scripting",
      "PowerShell",
      "SQL"
    ],
    "Security Tools": [
      "Burp Suite",
      "Metasploit",
      "Nmap",
      "Wireshark",
      "OWASP ZAP",
      "Kali Linux",
      "Nessus",
      "John the Ripper",
      "Hashcat",
      "Aircrack-ng"
    ],
    "Web Technologies": [
      "React/Next.js",
      "Node.js",
      "Express.js",
      "Django",
      "Flask",
      "REST APIs",
      "GraphQL",
      "WebSockets"
    ],
    "Cloud & DevOps": [
      "AWS (EC2, S3, Lambda)",
      "Docker",
      "Kubernetes",
      "Git/GitHub",
      "CI/CD Pipelines",
      "Linux Administration",
      "Nginx/Apache"
    ],
    "Databases": [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "SQLite"
    ]
  },

  contact: {
    email: "alex.chen@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA"
  },

  socials: {
    github: "https://github.com/alexchen",
    linkedin: "https://linkedin.com/in/alexchen-cybersec",
    twitter: "https://twitter.com/alexchen_sec",
    blog: "https://alexchen.dev",
    discord: "alexchen#1337"
  }
};