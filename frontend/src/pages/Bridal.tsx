import Layout from '@/components/layout/Layout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Link } from 'react-router-dom';
import { Crown, Gem, Heart, Camera, Users, Sparkles } from 'lucide-react';
import heroBridalImg from '@/assets/hero-bridal.jpg';
import bridalPortraitImg from '@/assets/bridal-portrait.jpg';

const bridalPackages = [
  {
    name: 'Classic Bride',
    price: '₹25,000',
    features: [
      'Traditional Bridal Makeup',
      'Hairstyling with Extensions',
      'Trial Session',
      'Touch-up Kit',
      'Draping Assistance',
    ],
    popular: false,
  },
  {
    name: 'Royal Bride',
    price: '₹45,000',
    features: [
      'HD Airbrush Bridal Makeup',
      'Premium Hairstyling',
      '2 Trial Sessions',
      'Complete Touch-up Kit',
      'Saree/Lehenga Draping',
      'Family Member Makeup (2)',
      'On-location Service',
    ],
    popular: true,
  },
  {
    name: 'Destination Bride',
    price: '₹75,000',
    features: [
      'All Royal Bride Services',
      'Multiple Event Looks',
      'Travel & Stay Included',
      'Team of 3 Artists',
      'Pre-Wedding Shoot Makeup',
      'Groom Grooming',
      '24/7 Support',
    ],
    popular: false,
  },
];

const services = [
  { icon: Crown, title: 'Bridal Makeup', desc: 'Stunning looks for your special day' },
  { icon: Users, title: 'Groom Styling', desc: 'Complete grooming for the groom' },
  { icon: Sparkles, title: 'Pre-Bridal', desc: 'Skin prep and facials' },
  { icon: Gem, title: 'Mehendi', desc: 'Intricate henna designs' },
  { icon: Heart, title: 'Engagement', desc: 'Picture-perfect looks' },
  { icon: Camera, title: 'Reception', desc: 'Glamorous evening styles' },
];

const Bridal = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBridalImg}
            alt="Bridal makeup artistry"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>

        <div className="container-custom relative z-10 pt-20">
          <AnimatedSection className="max-w-2xl">
            <p className="text-accent font-medium tracking-wider uppercase mb-4">
              Bridal Services
            </p>
            <h1 className="heading-display text-background mb-6">
              Your Dream <br />
              <span className="text-primary italic">Bridal Look</span>
            </h1>
            <p className="text-lg text-background/80 mb-8">
              Every bride deserves to feel like royalty. Our expert bridal artists create 
              breathtaking looks that capture your unique beauty and make your wedding day 
              truly unforgettable.
            </p>
            <Link to="/booking" className="btn-gold">
              Book Bridal Consultation
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Bridal Services */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <p className="text-accent font-medium tracking-wider uppercase mb-3">
              What We Offer
            </p>
            <h2 className="heading-section mb-4">Complete Bridal Services</h2>
            <div className="divider-elegant" />
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <div className="card-service text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/50 flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-7 h-7 text-rose" />
                  </div>
                  <h3 className="font-heading text-xl font-medium mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <p className="text-accent font-medium tracking-wider uppercase mb-3">
              Bridal Packages
            </p>
            <h2 className="heading-section mb-4">Choose Your Perfect Package</h2>
            <div className="divider-elegant" />
            <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
              We offer carefully curated packages to suit every bride's needs and budget. 
              All packages include premium products and personalized service.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bridalPackages.map((pkg, index) => (
              <AnimatedSection key={pkg.name} delay={index * 0.15}>
                <div
                  className={`relative rounded-3xl p-8 h-full flex flex-col ${
                    pkg.popular
                      ? 'bg-foreground text-background shadow-elevated'
                      : 'bg-card border border-border'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="font-heading text-2xl font-semibold mb-2">{pkg.name}</h3>
                    <p className={`text-4xl font-heading font-bold ${pkg.popular ? 'text-accent' : 'text-rose'}`}>
                      {pkg.price}
                    </p>
                  </div>

                  <ul className="space-y-3 flex-1 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${pkg.popular ? 'bg-accent' : 'bg-rose'}`} />
                        <span className={pkg.popular ? 'text-background/80' : 'text-muted-foreground'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/booking"
                    className={pkg.popular ? 'btn-gold text-center' : 'btn-primary text-center'}
                  >
                    Book Now
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative">
                <img
                  src={bridalPortraitImg}
                  alt="Beautiful bride"
                  className="rounded-3xl shadow-elevated w-full"
                />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/30 rounded-3xl -z-10" />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <p className="text-accent font-medium tracking-wider uppercase mb-3">
                The Glamour Experience
              </p>
              <h2 className="heading-section mb-6">
                Every Bride Has a <span className="text-rose italic">Unique Story</span>
              </h2>
              <div className="divider-left" />
              <p className="text-muted-foreground leading-relaxed mb-6">
                We believe every bride deserves a personalized experience. Our team takes the 
                time to understand your vision, your wedding theme, and your personal style 
                to create a look that is uniquely yours.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                From intimate ceremonies to grand celebrations, we've had the honor of being 
                part of thousands of love stories, making each bride's dream come true.
              </p>
              <Link to="/gallery" className="btn-outline">
                View Bridal Gallery
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Bridal;
