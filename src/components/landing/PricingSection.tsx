import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 5 team members',
      '10 projects',
      'Basic integrations',
      'Community support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per user/month',
    description: 'For growing teams that need more',
    features: [
      'Unlimited team members',
      'Unlimited projects',
      'Advanced integrations',
      'Priority support',
      'Advanced analytics',
      'Custom workflows',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact sales',
    description: 'For large organizations with specific needs',
    features: [
      'Everything in Pro',
      'SSO & SAML',
      'Dedicated account manager',
      '99.99% SLA',
      'Custom contracts',
      'On-premise option',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Choose the plan that's right for your team. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative p-6 sm:p-8 rounded-2xl border transition-shadow duration-300 ${
                plan.popular
                  ? 'bg-card border-primary shadow-lg scale-105'
                  : 'bg-card border-border hover:shadow-lg'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-4xl sm:text-5xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period !== 'forever' && plan.period !== 'contact sales' && (
                    <span className="text-muted-foreground ml-2">
                      /{plan.period.split('/')[0]}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className="w-full"
                variant={plan.popular ? 'default' : 'outline'}
                size="lg"
              >
                {plan.cta}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
