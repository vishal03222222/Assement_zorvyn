import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Now with AI-powered features
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6">
              Work together,{' '}
              <span className="text-primary">seamlessly</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              FlowSync brings your team's work together in one shared space. 
              Collaborate in real-time, manage projects effortlessly, and ship faster.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="gap-2 text-base">
                Start Free Trial
                <ArrowRight size={18} />
              </Button>
              <Button variant="outline" size="lg" className="gap-2 text-base">
                <Play size={18} />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-10 pt-10 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by 10,000+ teams worldwide
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 opacity-60">
                {['Vercel', 'Stripe', 'Notion', 'Linear'].map((company) => (
                  <span key={company} className="text-foreground font-semibold text-lg">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-card">
              {/* Mock Dashboard */}
              <div className="aspect-[4/3] p-4 sm:p-6">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                
                {/* Content Grid */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="col-span-2 space-y-3">
                    <div className="h-8 bg-muted rounded-lg" />
                    <div className="h-24 sm:h-32 bg-muted rounded-lg" />
                    <div className="h-16 sm:h-20 bg-primary/20 rounded-lg" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-12 bg-muted rounded-lg" />
                    <div className="h-12 bg-muted rounded-lg" />
                    <div className="h-12 bg-muted rounded-lg" />
                    <div className="h-12 bg-accent rounded-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-20 h-20 sm:w-32 sm:h-32 bg-accent/30 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
