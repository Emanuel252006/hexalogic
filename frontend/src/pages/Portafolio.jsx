import { Link } from 'react-router-dom';
import { Eye, Folder } from 'lucide-react';
import '../styles/portafolio.css';

const Portafolio = () => {
  const projects = [
    {
      id: 1,
      title: 'E-commerce Moderno',
      description: 'Plataforma de comercio electrónico completa con carrito de compras, pagos integrados y panel administrativo.',
      category: 'E-commerce',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
    },
    {
      id: 2,
      title: 'Dashboard Empresarial',
      description: 'Panel de control intuitivo para gestión de datos empresariales con gráficos interactivos y reportes en tiempo real.',
      category: 'Dashboard',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Chart.js']
    },
    {
      id: 3,
      title: 'App Móvil Fitness',
      description: 'App móvil para seguimiento de ejercicios con rutinas personalizadas, estadísticas y comunidad.',
      category: 'Mobile App',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      technologies: ['React Native', 'Firebase', 'Redux']
    },
    {
      id: 4,
      title: 'Sitio Web Corporativo',
      description: 'Sitio web corporativo moderno y responsivo con CMS personalizado y optimización SEO.',
      category: 'Website',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      technologies: ['Next.js', 'Tailwind CSS', 'Contentful']
    },
    {
      id: 5,
      title: 'Plataforma de Aprendizaje',
      description: 'Sistema de gestión de aprendizaje online con videoconferencias, tareas y calificaciones.',
      category: 'Education',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      technologies: ['Angular', 'Express', 'Socket.io', 'AWS']
    },
    {
      id: 6,
      title: 'App de Delivery',
      description: 'Aplicación completa de delivery con geolocalización, pagos en tiempo real y tracking de pedidos.',
      category: 'Delivery',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      technologies: ['Flutter', 'Node.js', 'MongoDB', 'Google Maps']
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Nuestro Portafolio</h1>
          <p>Descubre algunos de nuestros proyectos más destacados. Cada uno representa nuestro compromiso con la calidad y la innovación.</p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section" style={{ backgroundColor: '#f9fafb' }}>
        <div className="container">
          <div className="grid grid-3">
            {projects.map((project) => (
              <div key={project.id} className="card">
                <div 
                  className="project-image-placeholder" 
                  style={{ background: project.gradient }}
                >
                  <Eye size={48} color="white" />
                  <div className="project-category-badge">{project.category}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="mb-6" style={{ color: '#6b7280' }}>{project.description}</p>
                <div className="tech-tags">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-actions">
                  <a href="#" className="btn">Ver Proyecto</a>
                  <a href="#" className="btn-icon">
                    <Folder size={20} />
                  </a>
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
