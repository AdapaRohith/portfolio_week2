"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
    {
        tempId: 0,
        testimonial: "Our automation workflows run 5x faster since switching to AvlokAI. They truly understand production-grade systems.",
        by: "Alex, CEO at TechCorp"
    },
    {
        tempId: 1,
        testimonial: "I'm confident my data is safe with AvlokAI. Their approach to security is unlike anything else in the market.",
        by: "Dan, CTO at SecureNet"
    },
    {
        tempId: 2,
        testimonial: "We were drowning in manual processes before we found AvlokAI. Can't thank them enough for the transformation!",
        by: "Stephanie, COO at InnovateCo"
    },
    {
        tempId: 3,
        testimonial: "AvlokAI's solutions make planning for the future seamless. Highly recommended for any scaling business!",
        by: "Marie, CFO at FuturePlanning"
    },
    {
        tempId: 4,
        testimonial: "If I could give 11 stars, I'd give 12. The level of engineering is exceptional.",
        by: "Andre, Head of Design at CreativeSolutions"
    },
    {
        tempId: 5,
        testimonial: "SO HAPPY WE FOUND AVLOKAI! I'd bet they've saved us 100+ hours of manual work so far.",
        by: "Jeremy, Product Manager at TimeWise"
    },
    {
        tempId: 6,
        testimonial: "Took some convincing, but now that we're on AvlokAI, we're never going back to manual workflows.",
        by: "Pam, Marketing Director at BrandBuilders"
    },
    {
        tempId: 7,
        testimonial: "I would be lost without AvlokAI's in-depth analytics. The ROI is EASILY 100X for us.",
        by: "Daniel, Data Scientist at AnalyticsPro"
    },
    {
        tempId: 8,
        testimonial: "It's just the best automation partner. Period.",
        by: "Fernando, UX Designer at UserFirst"
    },
    {
        tempId: 9,
        testimonial: "We switched to AvlokAI 2 years ago and never looked back. Absolute game-changer.",
        by: "Andy, DevOps Engineer at CloudMasters"
    },
    {
        tempId: 10,
        testimonial: "I've been searching for a solution like AvlokAI for YEARS. So glad I finally found them!",
        by: "Pete, Sales Director at RevenueRockets"
    },
    {
        tempId: 11,
        testimonial: "It's so simple and intuitive, we got the entire team up to speed in 10 minutes.",
        by: "Marina, HR Manager at TalentForge"
    },
    {
        tempId: 12,
        testimonial: "AvlokAI's support is unparalleled. They're always there when we need them.",
        by: "Olivia, Customer Success Manager at ClientCare"
    },
    {
        tempId: 13,
        testimonial: "The efficiency gains we've seen since implementing AvlokAI are off the charts!",
        by: "Raj, Operations Manager at StreamlineSolutions"
    },
    {
        tempId: 14,
        testimonial: "AvlokAI has revolutionized how we handle our workflow. Truly production-grade!",
        by: "Lila, Workflow Specialist at ProcessPro"
    },
    {
        tempId: 15,
        testimonial: "The scalability of their solutions is impressive. It grows with our business seamlessly.",
        by: "Trevor, Scaling Officer at GrowthGurus"
    },
    {
        tempId: 16,
        testimonial: "I appreciate how AvlokAI continually innovates. They're always one step ahead.",
        by: "Naomi, Innovation Lead at FutureTech"
    },
    {
        tempId: 17,
        testimonial: "The ROI we've seen with AvlokAI is incredible. It's paid for itself many times over.",
        by: "Victor, Finance Analyst at ProfitPeak"
    },
    {
        tempId: 18,
        testimonial: "Their platform is so robust, yet easy to use. It's the perfect balance.",
        by: "Yuki, Tech Lead at BalancedTech"
    },
    {
        tempId: 19,
        testimonial: "We've tried many solutions, but AvlokAI stands out in terms of reliability and performance.",
        by: "Zoe, Performance Manager at ReliableSystems"
    }
];

interface TestimonialCardProps {
    position: number;
    testimonial: typeof testimonials[0];
    handleMove: (steps: number) => void;
    cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
    position,
    testimonial,
    handleMove,
    cardSize
}) => {
    const isCenter = position === 0;

    return (
        <div
            onClick={() => handleMove(position)}
            className={cn(
                "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
                isCenter
                    ? "z-10 border-accent"
                    : "z-0 border-border hover:border-accent/50"
            )}
            style={{
                width: cardSize,
                height: cardSize,
                background: isCenter ? 'var(--accent)' : 'var(--card)',
                color: isCenter ? 'var(--background)' : 'var(--foreground)',
                clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
                transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
                boxShadow: isCenter ? "0px 8px 0px 4px var(--border)" : "0px 0px 0px 0px transparent"
            }}
        >
            <span
                className="absolute block origin-top-right rotate-45"
                style={{
                    right: -2,
                    top: 48,
                    width: SQRT_5000,
                    height: 2,
                    background: 'var(--border)'
                }}
            />

            <h3 className="text-base sm:text-xl font-medium">
                &ldquo;{testimonial.testimonial}&rdquo;
            </h3>
            <p
                className="absolute bottom-8 left-8 right-8 mt-2 text-sm italic"
                style={{
                    color: isCenter ? 'rgba(10,10,11,0.7)' : 'var(--muted)'
                }}
            >
                - {testimonial.by}
            </p>
        </div>
    );
};

export const StaggerTestimonials: React.FC = () => {
    const [cardSize, setCardSize] = useState(365);
    const [testimonialsList, setTestimonialsList] = useState(testimonials);

    const handleMove = (steps: number) => {
        const newList = [...testimonialsList];
        if (steps > 0) {
            for (let i = steps; i > 0; i--) {
                const item = newList.shift();
                if (!item) return;
                newList.push({ ...item, tempId: Math.random() });
            }
        } else {
            for (let i = steps; i < 0; i++) {
                const item = newList.pop();
                if (!item) return;
                newList.unshift({ ...item, tempId: Math.random() });
            }
        }
        setTestimonialsList(newList);
    };

    useEffect(() => {
        const updateSize = () => {
            const { matches } = window.matchMedia("(min-width: 640px)");
            setCardSize(matches ? 365 : 290);
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return (
        <section className="py-24 px-6">
            {/* Section heading */}
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-semibold mb-4">
                    Trusted by teams who{' '}
                    <span className="gradient-text">ship with confidence.</span>
                </h2>
                <p className="text-lg text-muted max-w-2xl mx-auto">
                    From startups to enterprises — hear from the teams that replaced manual chaos with production-grade automation.
                </p>
            </div>

            {/* Testimonial cards */}
            <div
                className="relative w-full overflow-hidden"
                style={{ height: 600, background: 'var(--background)' }}
            >
                {testimonialsList.map((testimonial, index) => {
                    const position = testimonialsList.length % 2
                        ? index - (testimonialsList.length + 1) / 2
                        : index - testimonialsList.length / 2;
                    return (
                        <TestimonialCard
                            key={testimonial.tempId}
                            testimonial={testimonial}
                            handleMove={handleMove}
                            position={position}
                            cardSize={cardSize}
                        />
                    );
                })}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                    <button
                        onClick={() => handleMove(-1)}
                        className={cn(
                            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
                            "border-2 border-border hover:bg-accent hover:text-background hover:border-accent",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                        )}
                        style={{ background: 'var(--card)' }}
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={() => handleMove(1)}
                        className={cn(
                            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
                            "border-2 border-border hover:bg-accent hover:text-background hover:border-accent",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                        )}
                        style={{ background: 'var(--card)' }}
                        aria-label="Next testimonial"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </section>
    );
};
