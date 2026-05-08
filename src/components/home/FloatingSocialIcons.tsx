import { useEffect, useState } from "react";
import { Music2, Phone } from "lucide-react";


// You can replace these with your real profile links
const SOCIAL = {
    instagram: "https://www.instagram.com/",
    whatsapp: "https://wa.me/+9779851101782",
    tiktok: "https://www.tiktok.com/",
    facebook: "https://www.facebook.com/",
} as const;

type SocialKey = keyof typeof SOCIAL;

const getIcon = (_key: SocialKey) => {
    // Using available lucide icons as visual placeholders
    // (this repo's lucide-react version does not export brand icons).
    switch (_key) {
        case "instagram":
            return Music2;
        case "whatsapp":
            return Phone;
        case "tiktok":
            return Music2;
        case "facebook":
            return Phone;
    }
};

const FloatingSocialIcons = () => {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // keep it simple: on mobile we show all icons by default
    useEffect(() => {
        if (isMobile) setOpen(true);
    }, [isMobile]);

    const items: Array<{ key: SocialKey; label: string; href: string }> = [
        { key: "instagram", label: "Instagram", href: SOCIAL.instagram },
        { key: "whatsapp", label: "WhatsApp", href: SOCIAL.whatsapp },
        { key: "tiktok", label: "TikTok", href: SOCIAL.tiktok },
        { key: "facebook", label: "Facebook", href: SOCIAL.facebook },
    ];

    return (
        <div className="fixed right-4 bottom-6 z-50">
            <div className="relative">
                {/* Icons */}
                <div
                    className={
                        open
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 translate-y-2 pointer-events-none"
                    }
                    style={{ transition: "all 180ms ease" }}
                >
                    <div className="flex flex-col gap-2 items-end">
                        {items.map((item) => {
                            const Icon = getIcon(item.key);
                            return (
                                <a
                                    key={item.key}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={item.label}
                                    className="h-11 w-11 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Toggle */}
                {!isMobile && (
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? "Close social icons" : "Open social icons"}
                        className="mt-0 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
                    >
                        {/* simple plus */}
                        <span className="text-lg font-bold leading-none">{open ? "×" : "+"}</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default FloatingSocialIcons;

