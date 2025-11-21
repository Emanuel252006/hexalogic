import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {
  const location = useLocation();
  const [AnimationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    // Verificar si ya se ejecutó la animación en esta sesión
    const alreadyPlayed = sessionStorage.getItem('hexalogic-animation-played') === 'true';
    
    // Solo en la página de inicio
    if (location.pathname === '/') {
      if (alreadyPlayed) {
        setAnimationPlayed(true);
        document.body.classList.add('animation-played');
        document.documentElement.classList.add('animation-played');
      } else {
        // Marcar después de que termine la animación (2 segundos)
        setTimeout(() => {
          sessionStorage.setItem('hexalogic-animation-played', 'true');
          setAnimationPlayed(true);
          document.body.classList.add('animation-played');
          document.documentElement.classList.add('animation-played');
        }, 2000);
      }
    } else {
      // En otras páginas, el logo siempre debe ser estático
      setAnimationPlayed(true);
      document.body.classList.add('animation-played');
      document.documentElement.classList.add('animation-played');
    }
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="logo-section">
          <div className="logo-icon-container">
            <svg className="logo-icon" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <polygon 
                points="100,20 170,60 170,140 100,180 30,140 30,60" 
                fill="white" 
                stroke="#000000" 
                strokeWidth="8"
              />
              <circle cx="100" cy="100" r="18" fill="#4169E1"/>
            </svg>
          </div>
          <div className="logo-text-wrapper">
            <svg className="logo-text" viewBox="0 0 800 150" xmlns="http://www.w3.org/2000/svg">
              <text 
                x="10" 
                y="120" 
                fontFamily="Arial, sans-serif" 
                fontSize="120" 
                fontWeight="900" 
                fill="#000000" 
                letterSpacing="-2"
              >
                HEXALOGIC
              </text>
            </svg>
          </div>
        </div>
        <ul className="nav-menu">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>Inicio</Link>
          </li>
          <li>
            <Link to="/servicios" className={isActive('/servicios') ? 'active' : ''}>Servicios</Link>
          </li>
          <li>
            <Link to="/portafolio" className={isActive('/portafolio') ? 'active' : ''}>Portafolio</Link>
          </li>
          <li>
            <Link to="/contacto" className={isActive('/contacto') ? 'active' : ''}>Contacto</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

