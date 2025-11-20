import { Link } from 'react-router-dom';
import { Monitor, Laptop, Smartphone, Shield, Wrench } from 'lucide-react';
import '../styles/servicios.css';

const Servicios = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Nuestros Servicios</h1>
          <p>Ofrecemos soluciones tecnológicas completas: desarrollo web, aplicaciones móviles, sistemas de escritorio, asesoramiento y soporte técnico.</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div className="card">
              <div className="service-icon-gradient" style={{ background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)' }}>
                <Monitor size={48} color="white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Desarrollo Web</h3>
              <p className="mb-6">Soluciones web completas con tecnologías modernas y bases de datos robustas.</p>
              <ul className="feature-list">
                <li>
                  <span className="check">✓</span>
                  <div>
                    <strong>Front-End:</strong> React, HTML, CSS
                  </div>
                </li>
                <li>
                  <span className="check">✓</span>
                  <div>
                    <strong>Back-End:</strong> Node.js
                  </div>
                </li>
                <li>
                  <span className="check">✓</span>
                  <div>
                    <strong>Bases de datos:</strong> SQL Server, MySQL y PostgreSQL
                  </div>
                </li>
              </ul>
            </div>

            <div className="card">
              <div className="service-icon-gradient" style={{ background: 'linear-gradient(45deg, #8b5cf6, #ec4899)' }}>
                <Laptop size={48} color="white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Desarrollo de Sistemas de Escritorio</h3>
              <p className="mb-6">Aplicaciones de escritorio robustas y eficientes para tu negocio.</p>
              <ul className="feature-list">
                <li>
                  <span className="check">✓</span>
                  Implementación con C#
                </li>
              </ul>
            </div>

            <div className="card">
              <div className="service-icon-gradient" style={{ background: 'linear-gradient(45deg, #10b981, #3b82f6)' }}>
                <Smartphone size={48} color="white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Desarrollo de Aplicaciones Móviles</h3>
              <p className="mb-6">Aplicaciones móviles nativas y multiplataforma para iOS y Android.</p>
              <ul className="feature-list">
                <li>
                  <span className="check">✓</span>
                  Samari Front
                </li>
                <li>
                  <span className="check">✓</span>
                  Java
                </li>
                <li>
                  <span className="check">✓</span>
                  Flutter
                </li>
              </ul>
            </div>

            <div className="card">
              <div className="service-icon-gradient" style={{ background: 'linear-gradient(45deg, #f59e0b, #ef4444)' }}>
                <Shield size={48} color="white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Asesoramiento Técnico</h3>
              <p className="mb-6">Consultoría especializada para optimizar tus proyectos tecnológicos.</p>
              <ul className="feature-list">
                <li>
                  <span className="check">✓</span>
                  Front-End
                </li>
                <li>
                  <span className="check">✓</span>
                  Back-End
                </li>
                <li>
                  <span className="check">✓</span>
                  Bases de datos
                </li>
              </ul>
            </div>

            <div className="card">
              <div className="service-icon-gradient" style={{ background: 'linear-gradient(45deg, #06b6d4, #3b82f6)' }}>
                <Wrench size={48} color="white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Soporte Técnico</h3>
              <p className="mb-6">Acompañamiento continuo para garantizar el funcionamiento óptimo de tus sistemas.</p>
              <ul className="feature-list">
                <li>
                  <span className="check">✓</span>
                  Disponibilidad de 8 horas diarias
                </li>
                <li>
                  <span className="check">✓</span>
                  5 días a la semana
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section" style={{ backgroundColor: '#f9fafb' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestro Proceso de Trabajo</h2>
            <p className="text-xl">Seguimos una metodología probada para garantizar el éxito de tu proyecto</p>
          </div>

          <div className="grid grid-4">
            <div className="text-center">
              <div className="process-icon">01</div>
              <h3 className="text-xl font-semibold mb-4">Consulta Inicial</h3>
              <p>Analizamos tus necesidades y objetivos para entender el alcance del proyecto.</p>
            </div>

            <div className="text-center">
              <div className="process-icon">02</div>
              <h3 className="text-xl font-semibold mb-4">Propuesta y Presupuesto</h3>
              <p>Creamos una propuesta detallada con cronograma y presupuesto transparente.</p>
            </div>

            <div className="text-center">
              <div className="process-icon">03</div>
              <h3 className="text-xl font-semibold mb-4">Diseño y Desarrollo</h3>
              <p>Trabajamos en el diseño y desarrollo siguiendo las mejores prácticas.</p>
            </div>

            <div className="text-center">
              <div className="process-icon">04</div>
              <h3 className="text-xl font-semibold mb-4">Testing y Lanzamiento</h3>
              <p>Realizamos pruebas exhaustivas antes del lanzamiento y te acompañamos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas más información?</h2>
          <p className="text-xl mb-8">Contacta con nosotros para una consulta gratuita y descubre cómo podemos ayudar a tu negocio</p>
          <Link to="/contacto" className="btn cta-button-white">Solicitar Consulta</Link>
        </div>
      </section>
    </>
  );
};

export default Servicios;
