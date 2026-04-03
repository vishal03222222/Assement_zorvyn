import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "FlowSync transformed how our team collaborates. We've cut meeting time by 50% and ship features twice as fast.",
    author: 'Sarah Chen',
    role: 'Head of Product',
    company: 'TechCorp',
    avatar: 'SC',
  },
  {
    quote: "The real-time collaboration features are incredible. It's like having everyone in the same room, even when we're distributed globally.",
    author: 'Marcus Johnson',
    role: 'Engineering Lead',
    company: 'StartupXYZ',
    avatar: 'MJ',
  },
  {
    quote: "We evaluated 10+ tools before choosing FlowSync. Nothing else comes close in terms of UX and reliability.",
    author: 'Emily Rodriguez',
    role: 'CEO',
    company: 'DesignStudio',
    avatar: 'ER',
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Loved by teams everywhere
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            See why thousands of teams trust FlowSync for their collaboration needs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.author}
              className="p-6 sm:p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
