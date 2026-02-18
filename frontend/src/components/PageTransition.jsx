import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

/**
 * Envuelve el contenido de la ruta y aplica una transición fade suave
 * al cambiar de página. Mantiene la experiencia poética y calmada.
 */
export default function PageTransition() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition">
      <Outlet />
    </div>
  );
}
