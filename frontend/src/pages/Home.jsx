import { Link } from 'react-router-dom';
import { Monitor, Laptop, Smartphone, Wrench } from 'lucide-react';
import '../styles/index.css';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Soluciones Tecnológicas Profesionales</h1>
          <p>Desarrollo web, aplicaciones móviles, sistemas de escritorio y soporte técnico. Tecnología de calidad para hacer crecer tu negocio.</p>
          <div className="hero-buttons">
            <Link to="/servicios" className="btn">Nuestros Servicios</Link>
            <Link to="/contacto" className="btn btn-outline">Contactar Ahora</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">¿Por qué elegirnos?</h2>
            <p className="text-xl">Ofrecemos servicios integrales de desarrollo con tecnologías modernas y soporte continuo</p>
          </div>

          <div className="grid grid-4">
            <div className="card text-center">
              <div className="service-icon blue">
                <Monitor size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Desarrollo Web</h3>
              <p>Soluciones web completas con tecnologías modernas y bases de datos robustas. Front-End, Back-End y bases de datos para proyectos escalables.</p>
            </div>

            <div className="card text-center">
              <div className="service-icon purple">
                <Laptop size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sistemas de Escritorio</h3>
              <p>Aplicaciones de escritorio robustas y eficientes para tu negocio. Implementación con tecnologías modernas para sistemas empresariales.</p>
            </div>

            <div className="card text-center">
              <div className="service-icon green">
                <Smartphone size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Apps Móviles</h3>
              <p>Aplicaciones móviles nativas y multiplataforma para iOS y Android. Desarrollo con tecnologías modernas para experiencias móviles excepcionales.</p>
            </div>

            <div className="card text-center">
              <div className="service-icon orange">
                <Wrench size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Soporte Técnico</h3>
              <p>Acompañamiento continuo para garantizar el funcionamiento óptimo de tus sistemas. Disponibilidad de 8 horas diarias durante 5 días a la semana.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar tu proyecto?</h2>
          <p className="text-xl mb-8">Contacta con nosotros y hagamos realidad tu proyecto tecnológico</p>
          <Link to="/contacto" className="btn">Empezar Proyecto</Link>
        </div>
      </section>
    </>
  );
};

export default Home;
