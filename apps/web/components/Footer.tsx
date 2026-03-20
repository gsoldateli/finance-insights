import Link from "next/link";
import { TrendingUp, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t bg-white dark:bg-slate-950">
            <div className="container px-4 py-12 md:py-16 layout-container">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">

                    {/* Brand Section */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[#144bb8]">
                            <TrendingUp className="h-6 w-6" />
                            <span>Finance Insights</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Empowering financial analysis with reliable data and modern technology.
                        </p>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Linkedin className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Github className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Navigation - Product */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400">Produto</h3>
                        <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <Link href="#" className="hover:text-[#144bb8] transition-colors">Dashboard</Link>
                            <Link href="#" className="hover:text-[#144bb8] transition-colors">Marketplace</Link>
                            <Link href="#" className="hover:text-[#144bb8] transition-colors">Preços</Link>
                            <Link href="#" className="hover:text-[#144bb8] transition-colors">Documentação API</Link>
                        </nav>
                    </div>

                    {/* Navigation - Company */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400">Empresa</h3>
                        <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <Link href="#" className="hover:text-[#144bb8] transition-colors">Sobre Nós</Link>
                            <Link href="#" className="hover:text-[#144bb8] transition-colors">Carreiras</Link>
                            <Link href="#" className="hover:text-[#144bb8] transition-colors">Blog</Link>
                            <Link href="#" className="hover:text-[#144bb8] transition-colors">Impacto Social</Link>
                        </nav>
                    </div>

                    {/* Newsletter / Contact */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400">Suporte</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground group cursor-pointer">
                            <Mail className="h-4 w-4 group-hover:text-[#144bb8]" />
                            <span className="group-hover:text-[#144bb8]">contato@financeinsights.com</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            Subscribe to our newsletter for exclusive daily reports.
                        </p>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>© {currentYear} Finance Insights.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:underline">Privacidade</Link>
                        <Link href="#" className="hover:underline">Termos de Uso</Link>
                        <Link href="#" className="hover:underline">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}