import { Link } from 'react-router-dom';
import AnimatedSection from '@/components/ui/AnimatedSection';
import salonImg from '@/assets/salon-interior.jpg';
import { Award, Users, Heart, Sparkles } from 'lucide-react';

const features = [
  { icon: Award, label: 'Award Winning' },
  { icon: Users, label: 'Expert Team' },
  { icon: Heart, label: 'Premium Products' },
  { icon: Sparkles, label: 'Personalized Care' },
];

const AboutPreview = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <AnimatedSection direction="left" className="relative">
            <div className="relative">
              <img
                src={salonImg}
                alt="Glamour Studio Interior"
                className="rounded-3xl shadow-elevated w-full"
              />
              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/30 rounded-3xl -z-10" />
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection direction="right">
            <p className="text-accent font-medium tracking-wider uppercase mb-3">
              About Us
            </p>
            <h2 className="heading-section mb-6">
              A Sanctuary for <br />
              <span className="text-rose italic">Self-Care & Beauty</span>
            </h2>
            <div className="divider-left" />
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              For over 15 years, Glamour Studio has been the premier destination for women 
              seeking exceptional beauty services. Our team of skilled artists combines 
              traditional techniques with modern trends to create looks that celebrate 
              your unique beauty.
            </p>
            
            <p className="text-muted-foreground leading-relaxed mb-8">
              From intimate bridal preparations to everyday pampering, we create an 
              environment where every client feels valued, comfortable, and beautiful.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-foreground">
                  <div className="w-10 h-10 rounded-xl bg-primary/50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-rose" />
                  </div>
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </div>

            <Link to="/about" className="btn-primary">
              Learn More About Us
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
