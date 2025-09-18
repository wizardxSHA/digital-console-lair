import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TerminalLine } from './TerminalLine';
import { useTerminalHistory } from '../hooks/useTerminalHistory';
import { portfolioData } from '../data/portfolioData';

interface TerminalProps {
  className?: string;
}

export const Terminal: React.FC<TerminalProps> = ({ className }) => {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<Array<{ type: 'input' | 'output' | 'error'; content: string; prompt?: string }>>([]);
  const [isTyping, setIsTyping] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { history, addToHistory, navigateHistory, resetNavigation } = useTerminalHistory();
  const [historyIndex, setHistoryIndex] = useState(-1);

  const commands = {
    help: () => `Available commands:
┌─────────────┬─────────────────────────────────────┐
│ Command     │ Description                         │
├─────────────┼─────────────────────────────────────┤
│ help        │ Show this help message              │
│ about       │ Learn about me                      │
│ whoami      │ Display user information            │
│ projects    │ View my projects                    │
│ skills      │ List my technical skills            │
│ contact     │ Get my contact information          │
│ socials     │ View my social media links          │
│ resume      │ Download my resume                  │
│ clear       │ Clear terminal screen               │
│ exit        │ Close terminal                      │
└─────────────┴─────────────────────────────────────┘`,

    about: () => portfolioData.about,
    
    whoami: () => `${portfolioData.name}
Role: ${portfolioData.role}
University: ${portfolioData.university}
Specialization: ${portfolioData.specialization}
Location: ${portfolioData.location}`,

    projects: () => {
      let output = `🔐 CYBERSECURITY PROJECTS:\n\n`;
      portfolioData.projects.forEach((project, index) => {
        output += `${index + 1}. ${project.name}\n`;
        output += `   ${project.description}\n`;
        output += `   Tech: ${project.tech.join(', ')}\n`;
        output += `   Status: ${project.status}\n`;
        if (project.github) output += `   GitHub: ${project.github}\n`;
        if (project.demo) output += `   Demo: ${project.demo}\n`;
        output += '\n';
      });
      return output;
    },

    skills: () => {
      let output = `🛡️ TECHNICAL SKILLS:\n\n`;
      Object.entries(portfolioData.skills).forEach(([category, skillList]) => {
        output += `${category.toUpperCase()}:\n`;
        skillList.forEach(skill => output += `  • ${skill}\n`);
        output += '\n';
      });
      return output;
    },

    contact: () => `📫 CONTACT INFORMATION:
${portfolioData.contact.email ? `Email: ${portfolioData.contact.email}` : ''}
${portfolioData.contact.phone ? `Phone: ${portfolioData.contact.phone}` : ''}
${portfolioData.contact.location ? `Location: ${portfolioData.contact.location}` : ''}

Feel free to reach out for collaborations or opportunities!`,

    socials: () => {
      let output = `🌐 SOCIAL LINKS:\n\n`;
      Object.entries(portfolioData.socials).forEach(([platform, url]) => {
        if (url) output += `${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${url}\n`;
      });
      return output;
    },

    resume: () => `📄 Resume download will be available soon!
Meanwhile, check out my projects and contact me directly.`,

    clear: () => {
      setLines([]);
      return '';
    },

    exit: () => `Thanks for visiting! 👋
To restart the terminal, refresh the page.`,
  };

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === '') return '';
    
    if (commands[trimmedCmd as keyof typeof commands]) {
      return commands[trimmedCmd as keyof typeof commands]();
    } else {
      return `Command not found: ${trimmedCmd}. Type 'help' for available commands.`;
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const trimmedInput = input.trim();
    addToHistory(trimmedInput);
    resetNavigation();
    setHistoryIndex(-1);

    // Add input line
    setLines(prev => [...prev, { type: 'input', content: trimmedInput, prompt: 'visitor@cybersec-portfolio:~$' }]);

    // Execute command and add output
    const output = executeCommand(trimmedInput);
    if (output) {
      setLines(prev => [...prev, { type: 'output', content: output }]);
    }

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      if (newIndex >= 0) {
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      if (newIndex === -1) {
        setInput('');
      } else {
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Scroll to bottom when new lines are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Initial welcome message
  useEffect(() => {
    const welcomeMessage = `
╔══════════════════════════════════════════════════════════════╗
║                    WELCOME TO MY PORTFOLIO                   ║
║                                                              ║
║  ██████╗██╗   ██╗██████╗ ███████╗██████╗ ███████╗███████╗  ║
║ ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝  ║
║ ██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝███████╗█████╗    ║
║ ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗╚════██║██╔══╝    ║
║ ╚██████╗   ██║   ██████╔╝███████╗██║  ██║███████║███████╗  ║
║  ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝  ║
║                                                              ║
║                  Computer Science Student                    ║
║                 Cybersecurity Enthusiast                     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

Type 'help' to see available commands or 'about' to learn more about me.
`;

    const timer = setTimeout(() => {
      setLines([{ type: 'output', content: welcomeMessage }]);
      setIsTyping(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="matrix-bg" />
      <div 
        className={`min-h-screen flex items-center justify-center p-4 ${className || ''}`}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="terminal-container w-full max-w-4xl mx-auto">
          {/* Terminal Header */}
          <div className="terminal-header">
            <div className="terminal-title">
              {portfolioData.name} - Cybersecurity Portfolio Terminal
            </div>
            <div className="terminal-dots">
              <div className="terminal-dot terminal-dot-red"></div>
              <div className="terminal-dot terminal-dot-yellow"></div>
              <div className="terminal-dot terminal-dot-green"></div>
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="terminal-content scrollbar-hidden"
          >
            {isTyping && (
              <div className="terminal-welcome">
                <div className="typing-animation">
                  Initializing secure connection...
                </div>
              </div>
            )}

            {lines.map((line, index) => (
              <TerminalLine key={index} {...line} />
            ))}
            
            {!isTyping && (
              <form onSubmit={handleSubmit} className="terminal-line">
                <span className="terminal-prompt">visitor@cybersec-portfolio:~$ </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="terminal-input"
                  spellCheck={false}
                  autoComplete="off"
                />
                <span className="terminal-cursor"></span>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};