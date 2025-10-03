import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Summer Collection",
    subtitle: "Save Up To 70%",
    description: "Discover amazing deals on your favorite products",
    gradient: "from-purple-600 via-pink-600 to-red-600",
    accentColor: "text-yellow-300",
    buttonVariant: "default" as const,
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Fresh & Trendy",
    description: "Be the first to get the latest collections",
    gradient: "from-blue-600 via-cyan-600 to-teal-600",
    accentColor: "text-pink-300",
    buttonVariant: "default" as const,
  },
  {
    id: 3,
    title: "Free Shipping",
    subtitle: "On All Orders $50+",
    description: "Fast delivery right to your doorstep",
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
    accentColor: "text-amber-300",
    buttonVariant: "default" as const,
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('next');
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setDirection('next');
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[450px] md:h-[550px] overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? "opacity-100 scale-100" 
              : direction === 'next'
                ? "opacity-0 -translate-x-full scale-95"
                : "opacity-0 translate-x-full scale-95"
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90`} />
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
          
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex items-center">
            <div className="max-w-3xl space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
                <span className="text-white/90 text-sm md:text-base font-medium tracking-wide uppercase">
                  Special Offer
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight animate-in fade-in slide-in-from-left-8 duration-700 delay-300" data-testid="text-hero-title">
                {slide.title}
              </h1>
              
              <p className={`text-3xl md:text-5xl lg:text-6xl font-bold ${slide.accentColor} animate-in fade-in slide-in-from-left-8 duration-700 delay-500`} data-testid="text-hero-subtitle">
                {slide.subtitle}
              </p>
              
              <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl animate-in fade-in slide-in-from-left-8 duration-700 delay-700" data-testid="text-hero-description">
                {slide.description}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4 animate-in fade-in slide-in-from-left-8 duration-700 delay-1000">
                <Button
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-white/90 font-bold text-base md:text-lg px-8 py-6 shadow-2xl shadow-black/50"
                  data-testid="button-shop-now"
                >
                  Shop Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/80 text-white hover:bg-white/20 backdrop-blur-sm font-semibold text-base md:text-lg px-8 py-6"
                  data-testid="button-learn-more"
                >
                  Explore More
                </Button>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
            <div className="absolute bottom-1/4 right-1/2 w-2 h-2 bg-white/50 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`transition-all duration-500 rounded-full ${
              index === currentSlide 
                ? "bg-white w-12 h-2 shadow-lg shadow-white/50" 
                : "bg-white/40 w-2 h-2 hover:bg-white/60 hover:w-8"
            }`}
            onClick={() => {
              setDirection(index > currentSlide ? 'next' : 'prev');
              setCurrentSlide(index);
            }}
            data-testid={`button-slide-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
