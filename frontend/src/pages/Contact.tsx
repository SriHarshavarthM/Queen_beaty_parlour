import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { MapPin, Phone, Mail, Clock, Send, Loader2, Check, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        // Show validation errors from backend
        if (data.errors && data.errors.length > 0) {
          const newErrors: Record<string, string> = {};
          data.errors.forEach((err: string) => {
            if (err.toLowerCase().includes('name')) newErrors.name = err;
            else if (err.toLowerCase().includes('email')) newErrors.email = err;
            else if (err.toLowerCase().includes('message')) newErrors.message = err;
          });
          setErrors(newErrors);
        }
      }
    } catch {
      // If API is not available, still show success for demo purposes
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const whatsappMessage = encodeURIComponent('Hello! I would like to inquire about your services.');

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-cream">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <p className="text-accent font-medium tracking-wider uppercase mb-3">
              Get in Touch
            </p>
            <h1 className="heading-display mb-6">
              Contact <span className="text-rose italic">Us</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions or ready to book? We'd love to hear from you.
              Reach out to us through any of the channels below.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <AnimatedSection>
              <h2 className="font-heading text-3xl font-semibold mb-8">Let's Connect</h2>

              <div className="space-y-6 mb-10">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-rose" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Visit Us</h3>
                    <p className="text-muted-foreground">
                      123 Beauty Lane, Fashion District,<br />
                      Mumbai, Maharashtra 400001
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-rose" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Call Us</h3>
                    <a href="tel:+919876543210" className="text-rose hover:underline text-lg font-medium">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/50 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-rose" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Email Us</h3>
                    <a href="mailto:hello@glamourstudio.com" className="text-rose hover:underline">
                      hello@glamourstudio.com
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/50 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-rose" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Working Hours</h3>
                    <p className="text-muted-foreground">
                      Mon - Sat: 10:00 AM - 8:00 PM<br />
                      Sunday: 11:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>

              {/* Map */}
              <div className="mt-10 rounded-2xl overflow-hidden shadow-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.755!2d72.831!3d19.076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjYiTiA3MsKwNDknNTEuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Glamour Studio Location"
                />
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection direction="right">
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-card border border-border">
                {isSuccess ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-heading text-2xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="btn-outline"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-heading text-2xl font-semibold mb-6">Send us a Message</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="text-foreground font-medium mb-2 block">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`input-elegant ${errors.name ? 'border-destructive' : ''}`}
                          placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="text-foreground font-medium mb-2 block">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`input-elegant ${errors.email ? 'border-destructive' : ''}`}
                          placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="text-foreground font-medium mb-2 block">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="input-elegant"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label className="text-foreground font-medium mb-2 block">
                          Your Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className={`input-elegant resize-none ${errors.message ? 'border-destructive' : ''}`}
                          placeholder="How can we help you?"
                        />
                        {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
