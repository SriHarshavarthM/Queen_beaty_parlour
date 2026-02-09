import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Bride',
    content:
      'Glamour Studio made my wedding day absolutely magical. The bridal makeup was flawless and lasted throughout the entire ceremony and reception. The team understood exactly what I wanted and exceeded my expectations.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Anjali Patel',
    role: 'Regular Client',
    content:
      'I have been coming to Glamour Studio for over 3 years now. Their skin care treatments have transformed my skin completely. The staff is always friendly, professional, and makes every visit a relaxing experience.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Meera Kapoor',
    role: 'Baby Shower Client',
    content:
      'The team did an amazing job with my baby shower makeup. I felt so beautiful and confident. They were patient and understanding, making the whole experience stress-free and enjoyable.',
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-foreground text-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <Quote className="w-32 h-32" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10 rotate-180">
        <Quote className="w-32 h-32" />
      </div>

      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-12">
          <p className="text-accent font-medium tracking-wider uppercase mb-3">
            Testimonials
          </p>
          <h2 className="heading-section text-background">
            What Our Clients Say
          </h2>
          <div className="divider-elegant" />
        </AnimatedSection>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl md:text-2xl leading-relaxed text-background/90 mb-8 font-light italic">
                "{testimonials[current].content}"
              </p>

              {/* Author */}
              <div>
                <p className="font-heading text-xl font-semibold text-background">
                  {testimonials[current].name}
                </p>
                <p className="text-background/60">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-background/30 flex items-center justify-center hover:bg-background/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    current === index ? 'bg-accent w-8' : 'bg-background/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-background/30 flex items-center justify-center hover:bg-background/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
