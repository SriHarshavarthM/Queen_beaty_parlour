import Layout from '@/components/layout/Layout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Link } from 'react-router-dom';
import { Scissors, Sparkles, Hand, Baby, PartyPopper, Heart, Crown, Flower2 } from 'lucide-react';
import skincareImg from '@/assets/skincare-treatment.jpg';
import nailArtImg from '@/assets/nail-art.jpg';
import bridalImg from '@/assets/bridal-portrait.jpg';
import babyShowerImg from '@/assets/baby-shower.jpg';

const services = [
  {
    id: 'bridal',
    icon: Crown,
    title: 'Bridal Makeup',
    description: 'Your wedding day deserves nothing but perfection. Our expert bridal makeup artists create stunning looks that photograph beautifully and last all day.',
    image: bridalImg,
    features: ['HD Airbrush Makeup', 'Traditional & Contemporary Styles', 'Pre-Bridal Packages', 'Groom Grooming'],
    price: 'Starting ₹25,000',
  },
  {
    id: 'skincare',
    icon: Sparkles,
    title: 'Skin Care Treatments',
    description: 'Rejuvenate your skin with our premium treatments. From deep cleansing facials to advanced anti-aging therapies, we have solutions for every skin concern.',
    image: skincareImg,
    features: ['Hydrafacials', 'Chemical Peels', 'Anti-Aging Treatments', 'Acne Treatment'],
    price: 'Starting ₹2,500',
  },
  {
    id: 'nailart',
    icon: Hand,
    title: 'Nail Art & Manicure',
    description: 'Express yourself through beautiful nail designs. From elegant French tips to intricate nail art, our technicians bring your vision to life.',
    image: nailArtImg,
    features: ['Gel Extensions', 'Nail Art', 'Spa Manicure', 'Pedicure'],
    price: 'Starting ₹1,200',
  },
  {
    id: 'babyshower',
    icon: Baby,
    title: 'Baby Shower Makeup',
    description: 'Celebrate the joy of motherhood looking radiant. Our gentle makeup services ensure you look beautiful while feeling completely comfortable.',
    image: babyShowerImg,
    features: ['Pregnancy-Safe Products', 'Soft Glam Looks', 'Hair Styling', 'Photography Ready'],
    price: 'Starting ₹8,000',
  },
  {
    id: 'party',
    icon: PartyPopper,
    title: 'Party & Event Makeup',
    description: 'Stand out at every celebration with our party makeup services. From cocktail dinners to festive gatherings, we create looks that turn heads.',
    image: bridalImg,
    features: ['Evening Glam', 'Festival Looks', 'Sangeet Makeup', 'Reception Styling'],
    price: 'Starting ₹5,000',
  },
  {
    id: 'hair',
    icon: Scissors,
    title: 'Hair Services',
    description: 'Complete hair care from styling to treatments. Our stylists create stunning hairstyles that complement your look and personality.',
    image: skincareImg,
    features: ['Hair Styling', 'Treatments', 'Color & Highlights', 'Bridal Hairstyles'],
    price: 'Starting ₹1,500',
  },
];

const additionalServices = [
  { icon: Heart, title: 'Mehendi', description: 'Traditional henna artistry' },
  { icon: Flower2, title: 'Aromatherapy', description: 'Relaxing spa treatments' },
  { icon: Sparkles, title: 'Threading', description: 'Precise eyebrow shaping' },
  { icon: Crown, title: 'Saree Draping', description: 'Expert draping services' },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-cream">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <p className="text-accent font-medium tracking-wider uppercase mb-3">
              Our Services
            </p>
            <h1 className="heading-display mb-6">
              Premium Beauty <span className="text-rose italic">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover our comprehensive range of beauty services designed to pamper, 
              rejuvenate, and transform. Each treatment is crafted with care and executed 
              with expertise.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-custom space-y-20">
          {services.map((service, index) => (
            <AnimatedSection key={service.id} delay={0.1}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="image-zoom rounded-3xl overflow-hidden shadow-elevated">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/30 rounded-3xl -z-10" />
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="w-14 h-14 rounded-2xl bg-primary/50 flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-rose" />
                  </div>
                  <h2 className="heading-section mb-4">{service.title}</h2>
                  <div className="divider-left" />
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="grid grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-6">
                    <span className="font-heading text-xl text-accent font-semibold">
                      {service.price}
                    </span>
                    <Link to="/booking" className="btn-primary">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="heading-section mb-4">Additional Services</h2>
            <div className="divider-elegant" />
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <div className="card-service text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/50 flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-6 h-6 text-rose" />
                  </div>
                  <h3 className="font-heading text-lg font-medium mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="bg-foreground text-background rounded-3xl p-10 md:p-16 text-center">
            <h2 className="heading-section text-background mb-4">
              Ready to Book Your Experience?
            </h2>
            <p className="text-background/70 max-w-2xl mx-auto mb-8">
              Contact us today to schedule your appointment and let our experts take care of your beauty needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking" className="btn-gold">
                Book Appointment
              </Link>
              <Link to="/contact" className="btn-outline border-background/30 text-background hover:border-background">
                Contact Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
