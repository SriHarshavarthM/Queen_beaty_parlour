import { Link } from 'react-router-dom';
import AnimatedSection from '@/components/ui/AnimatedSection';
import bridalImg from '@/assets/bridal-portrait.jpg';

const CTASection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={bridalImg}
              alt="Bridal beauty"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/70" />
          </div>

          {/* Content */}
          <div className="relative z-10 py-20 md:py-28 px-6 md:px-12 text-center">
            <AnimatedSection>
              <p className="text-accent font-medium tracking-wider uppercase mb-4">
                Ready to Feel Beautiful?
              </p>
              <h2 className="heading-section text-background mb-6 max-w-3xl mx-auto">
                Book Your Appointment Today and Experience the Glamour Difference
              </h2>
              <p className="text-background/80 max-w-2xl mx-auto mb-8 text-lg">
                Whether it's your wedding day, a special celebration, or simply time for 
                self-care, our expert team is ready to make you look and feel extraordinary.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/booking" className="btn-gold">
                  Book Appointment
                </Link>
                <Link to="/contact" className="btn-outline border-background/30 text-background hover:border-background hover:text-background">
                  Contact Us
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
