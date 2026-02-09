import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';
import bridalImg from '@/assets/bridal-portrait.jpg';
import heroBridalImg from '@/assets/hero-bridal.jpg';
import babyShowerImg from '@/assets/baby-shower.jpg';
import nailArtImg from '@/assets/nail-art.jpg';
import skincareImg from '@/assets/skincare-treatment.jpg';
import salonImg from '@/assets/salon-interior.jpg';

const categories = ['All', 'Bridal', 'Baby Shower', 'Nail Art', 'Skin Care'];

const galleryImages = [
  { id: 1, src: bridalImg, category: 'Bridal', title: 'Royal Bridal Look' },
  { id: 2, src: heroBridalImg, category: 'Bridal', title: 'Traditional Bride' },
  { id: 3, src: babyShowerImg, category: 'Baby Shower', title: 'Radiant Mother-to-be' },
  { id: 4, src: nailArtImg, category: 'Nail Art', title: 'Gold Accent Nails' },
  { id: 5, src: skincareImg, category: 'Skin Care', title: 'Facial Treatment' },
  { id: 6, src: salonImg, category: 'Skin Care', title: 'Our Salon' },
  { id: 7, src: bridalImg, category: 'Bridal', title: 'Contemporary Bride' },
  { id: 8, src: heroBridalImg, category: 'Bridal', title: 'Bridal Makeup Session' },
  { id: 9, src: nailArtImg, category: 'Nail Art', title: 'Bridal Nail Design' },
  { id: 10, src: babyShowerImg, category: 'Baby Shower', title: 'Soft Glam Look' },
  { id: 11, src: skincareImg, category: 'Skin Care', title: 'Spa Day' },
  { id: 12, src: bridalImg, category: 'Bridal', title: 'South Indian Bride' },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages =
    activeCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-cream">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <p className="text-accent font-medium tracking-wider uppercase mb-3">
              Our Work
            </p>
            <h1 className="heading-display mb-6">
              Beauty <span className="text-rose italic">Gallery</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our portfolio of stunning transformations. Each image tells a story of 
              beauty, elegance, and the artistry of our talented team.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter & Gallery */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Category Filter */}
          <AnimatedSection className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-rose text-rose-foreground shadow-lg'
                    : 'bg-card border border-border text-foreground hover:border-rose hover:text-rose'
                }`}
              >
                {category}
              </button>
            ))}
          </AnimatedSection>

          {/* Gallery Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div
                    onClick={() => setSelectedImage(image)}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer card-elegant"
                  >
                    <div className="aspect-[4/5] image-zoom">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-accent text-sm font-medium">{image.category}</span>
                      <h3 className="text-background font-heading text-xl font-medium">
                        {image.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-foreground/90 z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-contain rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent rounded-b-2xl">
                <span className="text-accent text-sm font-medium">{selectedImage.category}</span>
                <h3 className="text-background font-heading text-2xl font-medium">
                  {selectedImage.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/30 transition-colors"
                aria-label="Close lightbox"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
