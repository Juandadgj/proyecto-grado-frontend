import React from 'react'

const MainCard = ()  => {
  const [cardContent, setCardContent] = useState({
    title: 'Bienvenido',
    color: 'lightgray',
  });

  useEffect(() => {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const { title, color } = entry.target.dataset;
            setCardContent({ title, color });
          }
        });
      },
      {
        threshold: 0.5, // Cambia cuando la mitad de la sección esté visible
      }
    );

    sections.forEach((section) => observer.observe(section));

    // Cleanup al desmontar el componente
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div>
      {/* Tarjeta fija */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '20px',
          backgroundColor: cardContent.color,
          color: 'white',
          borderRadius: '10px',
        }}
      >
        <h2>{cardContent.title}</h2>
      </div>

      {/* Secciones de contenido */}
      <div style={{ paddingTop: '100px' }}>
        <div className="section" data-title="Introducción al LSE" data-color="blue" style={{ height: '100vh' }}>
          <h2>Introducción al Lenguaje de Señas Español (LSE)</h2>
        </div>
        <div className="section" data-title="Alfabeto y Números" data-color="green" style={{ height: '100vh' }}>
          <h2>Alfabeto y Números</h2>
        </div>
        <div className="section" data-title="Frases Comunes" data-color="red" style={{ height: '100vh' }}>
          <h2>Frases Comunes</h2>
        </div>
        <div className="section" data-title="Conversaciones Básicas" data-color="purple" style={{ height: '100vh' }}>
          <h2>Conversaciones Básicas</h2>
        </div>
      </div>
    </div>
  );
};

export default MainCard
