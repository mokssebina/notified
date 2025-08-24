import { Zap, Github, Twitter, Linkedin } from "lucide-react";

//////////////---Navigation imports---////////////////////
import { useNavigate } from 'react-router-dom'

//////////////---Screen imports---////////////////////
import notifiedLogo from "../../Assets/images/notified_logo-02.png"


const Footer = () => {

  const navigate = useNavigate()

  const footerLinks = {
    product: [
      { name: "Features", href: "/#features" },
      { name: "Pricing", href: "/#pricing" },
      { name: "Documentation", href: "/docs" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Blog", href: "#blog" },
      { name: "Press", href: "#press" },
      { name: "Contact", href: "#contact" },
    ],
    resources: [
      { name: "Help Center", href: "#help" },
      { name: "Community", href: "#community" },
      { name: "Tutorials", href: "#tutorials" },
      { name: "Changelog", href: "#changelog" },
      { name: "Roadmap", href: "#roadmap" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Security", href: "#security" },
      { name: "Compliance", href: "#compliance" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#twitter", name: "Twitter" },
    { icon: Github, href: "#github", name: "GitHub" },
    { icon: Linkedin, href: "#linkedin", name: "LinkedIn" },
  ];

  const goToDocs = (value) => {
    navigate(value)
  }

  return (
    <footer className="bg-card/30 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 space-y-12">

          {/* Main footer content */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
            {/* Brand section */}
            <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-2 space-y-4 mb-8 lg:mb-0">
              <div className="flex items-center space-x-2">
                <div className="h-14 flex items-center space-x-3">
                  <img
                    src={notifiedLogo}
                    alt="notified"
                    className="h-full aspect-auto object-contain"
                  />
                </div>
              </div>
              <p className="text-muted-foreground max-w-sm">
                Real-time status communication platform that keeps your users informed
                when things go wrong, so they don't have to wonder.
              </p>

              {/* Social links */}
              {/*
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-2 rounded-lg bg-background/50 hover:bg-primary/10 transition-colors group"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
              */}
            </div>

            {/* Links sections */}
            <div className="space-y-4 col-span-1">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Product
              </h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                      <a
                        onClick={() => goToDocs(link.href)}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        {link.name}
                      </a>
                  </li>
                ))}
              </ul>
            </div>

            {/*
            <div className="space-y-4 col-span-1">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            */}

            {/*
            <div className="space-y-4 col-span-1">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            */}

            {/*
            <div className="space-y-4 col-span-1">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            */}

          </div>
          {/* Bottom section */}
          <div className="pt-8 border-t border-border/30">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground text-center md:text-left">
                © 2025 React Notified. All rights reserved.
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-muted-foreground">
                <span className="text-center">Built with ❤️ for developers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;