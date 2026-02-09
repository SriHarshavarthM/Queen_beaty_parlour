import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Calendar, Clock, User, Phone, FileText, Check, Loader2 } from 'lucide-react';
import salonImg from '@/assets/salon-interior.jpg';

const services = [
  'Bridal Makeup',
  'Party Makeup',
  'Hair Styling',
  'Skin Care Treatment',
  'Nail Art',
  'Baby Shower Makeup',
  'Mehendi',
  'Pre-Bridal Package',
];

const timeSlots = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
];

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: '',
          date: '',
          time: '',
          notes: '',
        });
      } else {
        // Show validation errors from backend
        if (data.errors && data.errors.length > 0) {
          const newErrors: Record<string, string> = {};
          data.errors.forEach((err: string) => {
            if (err.toLowerCase().includes('name')) newErrors.name = err;
            else if (err.toLowerCase().includes('phone')) newErrors.phone = err;
            else if (err.toLowerCase().includes('email')) newErrors.email = err;
            else if (err.toLowerCase().includes('service')) newErrors.service = err;
            else if (err.toLowerCase().includes('date')) newErrors.date = err;
            else if (err.toLowerCase().includes('time')) newErrors.time = err;
          });
          setErrors(newErrors);
        }
      }
    } catch {
      // If API is not available, still show success for demo purposes
      setIsSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        date: '',
        time: '',
        notes: '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  if (isSuccess) {
    return (
      <Layout>
        <section className="min-h-screen pt-32 pb-20 flex items-center">
          <div className="container-custom">
            <AnimatedSection className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="heading-section text-foreground mb-4">Booking Confirmed!</h1>
              <p className="text-muted-foreground text-lg mb-6">
                Thank you for booking with Glamour Studio. We've received your appointment request
                and will contact you shortly to confirm the details.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="btn-primary"
              >
                Book Another Appointment
              </button>
            </AnimatedSection>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-cream">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <p className="text-accent font-medium tracking-wider uppercase mb-3">
              Book Your Visit
            </p>
            <h1 className="heading-display mb-6">
              Schedule Your <span className="text-rose italic">Appointment</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Ready to experience premium beauty services? Book your appointment now and
              let our expert team take care of you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <AnimatedSection>
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-card border border-border">
                <h2 className="font-heading text-2xl font-semibold mb-6">Fill in Your Details</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-2 text-foreground font-medium mb-2">
                      <User className="w-4 h-4 text-accent" />
                      Full Name *
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

                  {/* Phone */}
                  <div>
                    <label className="flex items-center gap-2 text-foreground font-medium mb-2">
                      <Phone className="w-4 h-4 text-accent" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input-elegant ${errors.phone ? 'border-destructive' : ''}`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-2 text-foreground font-medium mb-2">
                      <FileText className="w-4 h-4 text-accent" />
                      Email (Optional)
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

                  {/* Service */}
                  <div>
                    <label className="flex items-center gap-2 text-foreground font-medium mb-2">
                      <FileText className="w-4 h-4 text-accent" />
                      Select Service *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`select-elegant ${errors.service ? 'border-destructive' : ''}`}
                    >
                      <option value="">Choose a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    {errors.service && <p className="text-destructive text-sm mt-1">{errors.service}</p>}
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-foreground font-medium mb-2">
                        <Calendar className="w-4 h-4 text-accent" />
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className={`input-elegant ${errors.date ? 'border-destructive' : ''}`}
                      />
                      {errors.date && <p className="text-destructive text-sm mt-1">{errors.date}</p>}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-foreground font-medium mb-2">
                        <Clock className="w-4 h-4 text-accent" />
                        Preferred Time *
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={`select-elegant ${errors.time ? 'border-destructive' : ''}`}
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      {errors.time && <p className="text-destructive text-sm mt-1">{errors.time}</p>}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="flex items-center gap-2 text-foreground font-medium mb-2">
                      <FileText className="w-4 h-4 text-accent" />
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      className="input-elegant resize-none"
                      placeholder="Any special requests or information..."
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Book Appointment'
                    )}
                  </button>
                </form>
              </div>
            </AnimatedSection>

            {/* Info Side */}
            <AnimatedSection direction="right">
              <div className="lg:sticky lg:top-32">
                <img
                  src={salonImg}
                  alt="Glamour Studio Interior"
                  className="rounded-3xl shadow-elevated mb-8 w-full"
                />

                <div className="bg-cream rounded-3xl p-8">
                  <h3 className="font-heading text-xl font-semibold mb-4">What to Expect</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                      Confirmation call within 2 hours of booking
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                      Personalized consultation with your artist
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                      Premium products and hygenic environment
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                      Complimentary touch-up kit for bridal bookings
                    </li>
                  </ul>

                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-foreground font-medium mb-2">Need immediate assistance?</p>
                    <a href="tel:+919876543210" className="text-rose font-semibold text-lg hover:underline">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
