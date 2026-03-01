import { Github, Linkedin, Mail, Heart } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/khanmashab1", label: "GitHub" },
  { icon: Linkedin, href: "https://pk.linkedin.com/in/mashab-jadoon-895098369", label: "LinkedIn" },
  { icon: Mail, href: "mailto:khanmashab1@gmail.com", label: "Email" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border bg-card/50">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <span className="font-display text-xl font-bold glow-text">MJ 🚀</span>
            <p className="text-sm text-muted-foreground mt-2">
              Full Stack Developer building scalable web applications and smart digital solutions.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-3">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-3">Connect</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target={label !== "Email" ? "_blank" : undefined} rel={label !== "Email" ? "noopener noreferrer" : undefined} aria-label={label} className="p-2.5 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-secondary transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            © {currentYear} Mashab Jadoon. Built with ☕ & <Heart size={14} className="text-primary fill-primary" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
