import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Award, Users, Heart, Sparkles, Target, Eye } from 'lucide-react';
import salonImg from '@/assets/salon-interior.jpg';
import heroBridalImg from '@/assets/hero-bridal.jpg';

const values = [
  {
    icon: Heart,
    title: 'Passion',
    description: 'Every stroke of the brush is guided by our love for the art of beauty.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We never compromise on quality, using only premium products and techniques.',
  },
  {
    icon: Users,
    title: 'Care',
    description: 'Every client is family. We treat you with warmth, respect, and individual attention.',
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'We stay ahead with the latest trends, techniques, and beauty innovations.',
  },
];

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '5000+', label: 'Happy Brides' },
  { value: '50+', label: 'Expert Artists' },
  { value: '100%', label: 'Satisfaction Rate' },
];

const team = [
  { name: 'Priya Malhotra', role: 'Founder & Lead Artist', specialty: 'Bridal Makeup' },
  { name: 'Anita Sharma', role: 'Senior Makeup Artist', specialty: 'HD Airbrush' },
  { name: 'Meera Kapoor', role: 'Hair Stylist', specialty: 'Bridal Hairstyles' },
  { name: 'Kavita Nair', role: 'Skin Care Expert', specialty: 'Advanced Facials' },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <p className="text-accent font-medium tracking-wider uppercase mb-3">
                About Us
              </p>
              <h1 className="heading-display mb-6">
                The Story of <span className="text-rose italic">Glamour Studio</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Founded in 2009 by Priya Malhotra, Glamour Studio began as a small bridal 
                makeup studio with a big dream – to help every woman feel beautiful and 
                confident in her own skin.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Over 15 years later, we've grown into one of Mumbai's most trusted beauty 
                destinations, having transformed thousands of brides and women for their 
                most special moments.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="relative">
                <img
                  src={salonImg}
                  alt="Glamour Studio Interior"
                  className="rounded-3xl shadow-elevated w-full"
                />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/30 rounded-3xl -z-10" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-foreground text-background">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1} className="text-center">
                <p className="font-heading text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.value}
                </p>
                <p className="text-background/70">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-cream rounded-3xl p-8 md:p-10 h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary/50 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-rose" />
                </div>
                <h3 className="font-heading text-2xl font-semibold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide exceptional beauty services that enhance natural beauty, boost 
                  confidence, and create unforgettable experiences. We are committed to 
                  making every client feel special, valued, and beautiful.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="bg-cream rounded-3xl p-8 md:p-10 h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary/50 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-rose" />
                </div>
                <h3 className="font-heading text-2xl font-semibold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the most trusted and loved beauty destination in India, known for 
                  our artistry, innovation, and the meaningful relationships we build with 
                  every client who walks through our doors.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <p className="text-accent font-medium tracking-wider uppercase mb-3">
              What Drives Us
            </p>
            <h2 className="heading-section mb-4">Our Core Values</h2>
            <div className="divider-elegant" />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="bg-card rounded-3xl p-8 text-center h-full border border-border">
                  <div className="w-14 h-14 rounded-2xl bg-primary/50 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-7 h-7 text-rose" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <p className="text-accent font-medium tracking-wider uppercase mb-3">
              Meet Our Experts
            </p>
            <h2 className="heading-section mb-4">Our Talented Team</h2>
            <div className="divider-elegant" />
            <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
              Our team of certified professionals brings years of experience and a passion 
              for beauty to every client interaction.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <AnimatedSection key={member.name} delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-rose mx-auto mb-4 flex items-center justify-center">
                    <span className="font-heading text-4xl font-bold text-background">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-rose font-medium text-sm mb-1">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.specialty}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={heroBridalImg}
                alt="Bridal beauty"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/70" />
            </div>

            <AnimatedSection className="relative z-10 py-20 md:py-28 px-6 md:px-12 text-center">
              <h2 className="heading-section text-background mb-6 max-w-3xl mx-auto">
                Ready to Experience the Glamour Difference?
              </h2>
              <p className="text-background/80 max-w-2xl mx-auto mb-8 text-lg">
                Book your appointment today and let our expert team create the perfect look for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/booking" className="btn-gold">
                  Book Appointment
                </Link>
                <Link to="/contact" className="btn-outline border-background/30 text-background hover:border-background">
                  Get in Touch
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
