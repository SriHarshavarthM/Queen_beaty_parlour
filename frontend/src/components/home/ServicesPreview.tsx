import { Link } from 'react-router-dom';
import AnimatedSection from '@/components/ui/AnimatedSection';
import skincareImg from '@/assets/skincare-treatment.jpg';
import nailArtImg from '@/assets/nail-art.jpg';
import bridalImg from '@/assets/bridal-portrait.jpg';
import babyShowerImg from '@/assets/baby-shower.jpg';

const services = [
  {
    title: 'Bridal Makeup',
    description: 'Stunning bridal looks that make your special day unforgettable.',
    image: bridalImg,
    link: '/bridal',
  },
  {
    title: 'Skin Care',
    description: 'Rejuvenating treatments for radiant, glowing skin.',
    image: skincareImg,
    link: '/services',
  },
  {
    title: 'Nail Art',
    description: 'Beautiful nail designs from classic to contemporary.',
    image: nailArtImg,
    link: '/services',
  },
  {
    title: 'Special Occasions',
    description: 'Baby showers, parties, and celebrations styled to perfection.',
    image: babyShowerImg,
    link: '/services',
  },
];

const ServicesPreview = () => {
  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <p className="text-accent font-medium tracking-wider uppercase mb-3">
            Our Services
          </p>
          <h2 className="heading-section mb-4">Beauty Services We Offer</h2>
          <div className="divider-elegant" />
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            From bridal transformations to everyday pampering, discover our range of 
            premium beauty services designed to make you feel extraordinary.
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.1}>
              <Link to={service.link} className="group block card-elegant overflow-hidden">
                <div className="relative aspect-[4/3] image-zoom">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="font-heading text-2xl md:text-3xl font-medium text-background mb-2">
                      {service.title}
                    </h3>
                    <p className="text-background/80">{service.description}</p>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection className="text-center mt-12">
          <Link to="/services" className="btn-outline">
            View All Services
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ServicesPreview;
