import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <a 
      href="https://api.whatsapp.com/send?phone=573234531280&text=Hola%20HexaLogic,%20me%20interesa%20conocer%20sus%20servicios" 
      target="_blank" 
      rel="noopener noreferrer"
      className="whatsapp-float" 
      title="WhatsApp"
    >
      <FaWhatsapp size={32} color="white" />
    </a>
  );
};

export default WhatsAppButton;
