import { useState, useEffect } from "react";
import ContactFormModal from "./ContactFormModal";
import { Phone } from "lucide-react";

const FloatingContactButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openContactForm = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    window.addEventListener('open-contact-form', openContactForm);
    
    return () => {
      window.removeEventListener('open-contact-form', openContactForm);
    };
  }, []);

  return (
    <>
      <button
        onClick={toggleModal}
        className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Contact us"
      >
        <Phone className="h-6 w-6" />
      </button>
      
      <ContactFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default FloatingContactButton;