import { Menu, X } from "lucide-react";
import { useState } from "react";
import notifiedLogo from "../../Assets/images/notified_logo-02.png"

const Navigation = ({goHome, goToSignin, goToSignup, goToDocs}) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="relative z-50 py-1 border-b border-border/50 bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div onClick={goHome} className="h-16 flex items-center space-x-3 cursor-pointer">
                        <img
                            src={notifiedLogo}
                            alt="notified"
                            className="h-full aspect-auto object-contain"
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                            Features
                        </a>
                        <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                            Pricing
                        </a>
                        <a onClick={goToDocs} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                            Docs
                        </a>
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button onClick={goToSignin} className="h-12 rounded-lg border border-primary py-2 px-4 justify-center text-sm text-primary">
                            {'Sign In'}
                        </button>
                        <button onClick={goToSignup} className="h-12 rounded-lg bg-primary py-2 px-4 justify-center text-sm text-white">
                            {'Get Started →'}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            className="w-12 h-12 rounded-lg border border-primary px-3 justify-center text-sm text-foreground cursor-pointer"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6 text-primary" />
                            ) : (
                                <Menu className="h-6 w-6 text-primary" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border/50">
                        <div className="space-y-4">
                            <a href="#features" className="block text-muted-foreground hover:text-foreground transition-colors">
                                Features
                            </a>
                            <a href="#pricing" className="block text-muted-foreground hover:text-foreground transition-colors">
                                Pricing
                            </a>
                            <a href="#docs" className="block text-muted-foreground hover:text-foreground transition-colors">
                                Docs
                            </a>
                            <a href="#company" className="block text-muted-foreground hover:text-foreground transition-colors">
                                Company
                            </a>
                            <div className="flex flex-col space-y-2 pt-4">
                                <button className="h-12 rounded-lg border border-primary py-2 px-4 justify-center text-sm mt-14 text-primary data-[hover]:bg-gray-800 cursor-pointer">
                                    {'Sign In'}
                                </button>
                                <button className="h-12 rounded-lg bg-primary py-2 px-4 justify-center text-sm mt-14 text-white data-[hover]:bg-gray-800 cursor-pointer">
                                    {'Get Started →'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;