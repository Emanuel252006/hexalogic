import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import '../styles/portafolio.css';
import imagenPortafolio from '../img/imgportafolio.jpg';
import imagenSoftwareNavarro from '../img/Screenshot 2025-11-25 182547.png';
import imagenSabor from '../img/imgsabor.jpeg';
import imagenProyecto from '../img/logoproyecto-removebg-preview.png';

const Portafolio = () => {
  const projects = [
    {
      id: 1,
      title: 'AsisControl',
      description: 'Sistema de asistencias y control de personal',
      category: 'Proyecto Formativo',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      technologies: ['React', 'Node.js', 'MySQL'],
      image: imagenSoftwareNavarro,
      link: 'https://softwarenavarro.com/'
    },
    {
      id: 2,
      title: 'Sabor',
      description: 'Panel de control intuitivo para gestión de datos empresariales con gráficos interactivos y reportes en tiempo real.',
      category: 'Proyecto Formativo',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      technologies: ['React', 'Node.js', 'MySQL'],
      image: imagenSabor
    },
    {
      id: 3,
      title: 'Scedesigns',
      description: 'App móvil para seguimiento de ejercicios con rutinas personalizadas, estadísticas y comunidad.',
      category: 'Proyecto Formativo',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      technologies: ['React', 'Node.js', 'MySQL'],
      image: imagenProyecto
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section 
        className="hero"
        style={{
          backgroundImage: `url(${imagenPortafolio})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container">
          <h1 style={{ color: '#ffffff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>Nuestro Portafolio</h1>
          <p style={{ color: '#ffffff', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)' }}>Descubre algunos de nuestros proyectos más destacados. Cada uno representa nuestro compromiso con la calidad y la innovación.</p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section" style={{ backgroundColor: '#f9fafb' }}>
        <div className="container">
          <div className="grid grid-3">
            {projects.map((project) => (
              <div key={project.id} className="card">
                <a 
                  href={project.link || "#"} 
                  target={project.link ? "_blank" : "_self"} 
                  rel={project.link ? "noopener noreferrer" : ""}
                  className="project-image-placeholder" 
                  style={project.image 
                    ? { 
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        display: 'block'
                      }
                    : { 
                        background: project.gradient,
                        cursor: 'pointer',
                        textDecoration: 'none',
                        display: 'block'
                      }
                  }
                >
                  {!project.image && <Eye size={48} color="white" />}
                  <div className="project-category-badge">{project.category}</div>
                </a>
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="mb-6" style={{ color: '#6b7280' }}>{project.description}</p>
                <div className="tech-tags">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para tu próximo proyecto?</h2>
          <p className="text-xl mb-8">Únete a nuestros clientes satisfechos y haz realidad tu visión digital</p>
          <Link to="/contacto" className="btn">Iniciar Proyecto</Link>
        </div>
      </section>
    </>
  );
};

export default Portafolio;
