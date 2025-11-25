import { Instagram, Phone, Mail, User } from 'lucide-react';

const TikTokIcon = ({ size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Redes Sociales</h3>
            <p>Soluciones web profesionales para tu negocio</p>
            <div className="social-links">
              <a 
                href="https://www.instagram.com/hexalogic_?igsh=bG40aGc2dmNycGp4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link" 
                title="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://www.tiktok.com/@hexalogic_?_r=1&_t=ZS-91B6UL93YsJ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link" 
                title="TikTok"
              >
                <TikTokIcon size={24} />
              </a>
            </div>
            <p className="copyright">© 2025. All rights reserved.</p>
          </div>

          <div className="footer-section">
            <h3>CONTACTOS</h3>
            <div className="contact-info">
              <Phone size={20} style={{ flexShrink: 0 }} />
              <span>+57 323 453 1280</span>
            </div>
            <div className="contact-info">
              <Mail size={20} style={{ flexShrink: 0 }} />
              <span>hexalogic20@gmail.com</span>
            </div>
            <div className="contact-info">
              <User size={20} style={{ flexShrink: 0 }} />
              <span>Equipo HexaLogic</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
