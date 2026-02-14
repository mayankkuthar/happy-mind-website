import { useState } from "react";
import { X } from "lucide-react";

interface ContactFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  reason: string;
  message: string;
  discoverSource: string;
}

const ContactFormModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    reason: "",
    message: "",
    discoverSource: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us! We'll get in touch with you soon.");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[101]"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md z-[102] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <p className="text-muted-foreground mb-6">We are transitioning our website, kindly share your details & we shall get in touch. 100% confidential & secure.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1">
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Amit"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-1">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Rathi"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-foreground mb-1">
                Mobile Number*
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="9136899581"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="reason" className="block text-sm font-medium text-foreground mb-1">
                Query For*
              </label>
              <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select a reason</option>
                <option value="personal_support">Personal Support</option>
                <option value="corporate_query">Corporate Query</option>
                <option value="solv_session_request">SOLV Session Request</option>
                <option value="counselling_support">Counselling Support</option>
                <option value="self_help_support">Self Help Support</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                Enter Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your message here..."
              ></textarea>
            </div>
            
            <div className="mb-6">
              <label htmlFor="discoverSource" className="block text-sm font-medium text-foreground mb-1">
                Select Preferred Reachout Slot*
              </label>
              <select
                id="discoverSource"
                name="discoverSource"
                value={formData.discoverSource}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select an option</option>
                <option value="Morning (9 am - 12 pm)">Morning (9 am - 12 pm)</option>
                <option value="Afternoon (12 pm - 4 pm)">Afternoon (12 pm - 4 pm)</option>
                <option value="Evening (4 pm - 8 pm)">Evening (4 pm - 8 pm)</option>
              </select>
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors font-medium"
              >
                Submit
              </button>
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactFormModal;