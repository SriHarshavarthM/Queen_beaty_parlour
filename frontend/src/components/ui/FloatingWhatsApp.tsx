import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingWhatsApp = () => {
    const phoneNumber = '919876543210'; // Indian phone number format
    const message = encodeURIComponent('Hello! I would like to inquire about your services at Glamour Studio.');

    return (
        <motion.a
            href={`https://wa.me/${phoneNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-7 h-7 text-white" fill="white" />

            {/* Pulse animation */}
            <span className="absolute w-full h-full rounded-full bg-green-500 animate-ping opacity-30" />
        </motion.a>
    );
};

export default FloatingWhatsApp;
