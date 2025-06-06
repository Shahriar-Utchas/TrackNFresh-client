import { Mail, Phone, MapPin, Instagram, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white relative overflow-hidden">

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6 lg:col-span-2">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-lg opacity-50"></div>
                                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                                    <img src="/img/logo.png" alt="logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                                </div>
                            </div>
                            <span className="text-2xl font-bold gradient-text font-space-grotesk">FreshNTrack</span>
                        </div>
                        <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                            Revolutionizing food management with intelligent tracking,
                            predictive analytics, and sustainable living practices.
                            Join the movement towards zero waste kitchens.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.instagram.com/_utchas_"
                                target="_blank"
                                aria-label="Instagram"
                                className="p-3 rounded-2xl bg-slate-800 hover:bg-gradient-to-r hover:from-success hover:to-accent transition-all duration-300 group"
                            >
                                <Instagram className="h-5 w-5 text-slate-400 group-hover:text-white" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/shahriar-utchas"
                                target='_blank'
                                aria-label="Twitter"
                                className="p-3 rounded-2xl bg-slate-800 hover:bg-gradient-to-r hover:from-success hover:to-accent transition-all duration-300 group"
                            >
                                <Linkedin className="h-5 w-5 text-slate-400 group-hover:text-white" />
                            </a>
                            <a
                                href="https://github.com/Shahriar-Utchas" target='_blank'
                                aria-label="GitHub"
                                className="p-3 rounded-2xl bg-slate-800 hover:bg-gradient-to-r hover:from-success hover:to-accent transition-all duration-300 group"
                            >
                                <Github className="h-5 w-5 text-slate-400 group-hover:text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Navigation */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold font-space-grotesk">Navigation</h3>
                        <div className="flex flex-col space-y-3">
                            {[
                                { path: '/', label: 'Home' },
                                { path: '/fridge', label: 'Your Vault' },
                                { path: '/add-food', label: 'Add Items' },
                                { path: '/my-items', label: 'My Collection' }
                            ].map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                                >
                                    <span className="w-1 h-1 bg-success rounded-full group-hover:w-2 transition-all duration-300"></span>
                                    <span>{link.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold font-space-grotesk">Connect</h3>
                        <div className="flex flex-col space-y-4 text-slate-300">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 rounded-xl bg-slate-800">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <span>shutchas6@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="p-2 rounded-xl bg-slate-800">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <span>+8801924482246</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="p-2 rounded-xl bg-slate-800">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <span>Dhaka, Bangladesh</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-slate-700 mt-8 pt-8">
                    <div className="flex justify-center items-center text-slate-400 text-sm">
                        <span>
                            © 2025 FreshNTrack. Developed By{' '}
                            <a
                                href="https://shahriar-utchas.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-accent font-medium underline underline-offset-4 decoration-transparent hover:decoration-accent transition-all duration-300"
                            >
                                Shahriar Utchas
                            </a>
                        </span>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
