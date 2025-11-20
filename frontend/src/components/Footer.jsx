import { Instagram, Music2, Phone, Mail, User } from 'lucide-react';

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
                <Music2 size={24} />
              </a>
            </div>
            <p className="copyright">© 2025. All rights reserved.</p>
          </div>

          <div className="footer-section">
            <h3>SERVICIOS</h3>
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
