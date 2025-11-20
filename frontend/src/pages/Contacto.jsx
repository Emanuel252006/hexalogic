import { useState } from 'react';
import { Phone, Mail, Clock } from 'lucide-react';
import { sendContactEmail } from '../services/api';
import '../styles/contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    servicio: '',
    mensaje: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar campos requeridos
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      setMessage({
        type: 'error',
        text: 'Por favor, completa todos los campos requeridos.'
      });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setMessage({
          type: 'success',
          text: result.message || '¡Mensaje enviado exitosamente! Te responderemos pronto.'
        });
        
        // Resetear formulario
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          empresa: '',
          servicio: '',
          mensaje: ''
        });

        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        throw new Error(result.message || 'Error al enviar el mensaje');
      }
    } catch (error) {
      let errorMessage = 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
      
      if (error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION_REFUSED')) {
        errorMessage = 'Error: El servidor no está corriendo. Por favor, ejecuta "npm start" en la carpeta backend.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setMessage({
        type: 'error',
        text: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Contactanos</h1>
          <p>¿Tienes un proyecto en mente? Estamos aquí para ayudarte. Contáctanos y comencemos a hacer realidad tu idea digital.</p>
        </div>
      </section>

      <div className="container contact-page-container">
        <div className="contact-page-grid">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Información de Contacto</h2>
            
            <div className="contact-info-section">
              <div className="contact-info-item-inline">
                <div className="contact-icon">
                  <Phone size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Teléfono</h3>
                  <p className="contact-detail">+57 323 453 1280</p>
                  <p className="contact-description">Llámanos para una consulta inmediata</p>
                </div>
              </div>

              <div className="contact-info-item-inline">
                <div className="contact-icon">
                  <Mail size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email</h3>
                  <p className="contact-detail">hexalogic20@gmail.com</p>
                  <p className="contact-description">Escríbenos y te respondemos en 24 horas</p>
                </div>
              </div>

              <div className="contact-info-item-inline">
                <div className="contact-icon">
                  <Clock size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Horarios</h3>
                  <p className="contact-detail">Lun - Vie: 8:00 - 18:00</p>
                  <p className="contact-description">Disponibilidad extendida para proyectos urgentes</p>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="why-choose-box">
              <h3 className="text-xl font-semibold mb-4">¿Por qué elegirnos?</h3>
              <ul className="why-choose-list">
                <li>
                  <span className="check">✓</span>
                  <span className="text">Respuesta en menos de 24 horas</span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span className="text">Consulta inicial gratuita</span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span className="text">Presupuesto transparente</span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span className="text">Soporte post-lanzamiento</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Envíanos un Mensaje</h2>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-grid">
                <div>
                  <label className="form-label">Nombre Completo *</label>
                  <input 
                    type="text" 
                    name="nombre" 
                    value={formData.nombre}
                    onChange={handleChange}
                    required 
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Email *</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    className="form-input"
                  />
                </div>
              </div>

              <div className="contact-form-grid">
                <div>
                  <label className="form-label">Teléfono</label>
                  <input 
                    type="tel" 
                    name="telefono" 
                    value={formData.telefono}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Empresa</label>
                  <input 
                    type="text" 
                    name="empresa" 
                    value={formData.empresa}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Servicio de Interés</label>
                <select 
                  name="servicio" 
                  value={formData.servicio}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="desarrollo-web">Desarrollo Web</option>
                  <option value="sistemas-escritorio">Desarrollo de Sistemas de Escritorio</option>
                  <option value="aplicaciones-moviles">Desarrollo de Aplicaciones Móviles</option>
                  <option value="asesoramiento-tecnico">Asesoramiento Técnico</option>
                  <option value="soporte-tecnico">Soporte Técnico</option>
                </select>
              </div>

              <div>
                <label className="form-label">Mensaje *</label>
                <textarea 
                  name="mensaje" 
                  value={formData.mensaje}
                  onChange={handleChange}
                  required 
                  rows="6" 
                  className="form-textarea" 
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </div>

              {message.text && (
                <div 
                  id="form-message" 
                  className={message.type}
                  style={{
                    display: 'block',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    textAlign: 'center',
                    backgroundColor: message.type === 'success' ? '#10b981' : '#ef4444',
                    color: 'white'
                  }}
                >
                  {message.text}
                </div>
              )}

              <button 
                type="submit" 
                className={`form-submit ${loading ? 'sending' : ''}`}
                disabled={loading}
              >
                <div className="svg-wrapper-1">
                  <div className="svg-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                    </svg>
                  </div>
                </div>
                <span>{loading ? 'Enviando...' : 'Enviar Mensaje'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacto;
