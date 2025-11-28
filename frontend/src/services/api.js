// En desarrollo, Vite proxy redirige /api a http://localhost:3000
// En producción, usa la variable de entorno o ruta relativa (mismo dominio)
// Si VITE_API_URL no está definido, usa ruta relativa (funciona cuando frontend y backend están en la misma instancia)
const API_BASE_URL = import.meta.env.PROD 
  ? (import.meta.env.VITE_API_URL || '')
  : '';

export const sendContactEmail = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Error del servidor' }));
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error;
  }
};

export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en health check:', error);
    throw error;
  }
};
