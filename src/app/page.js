
export default function Home() {
  return (
      import React, { useState } from 'react';
import './Login.css'; // Importa estilos para el componente

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validar campos
        if (!email || !password) {
            setError('Por favor, completa todos los campos');
            return;
        }

        // Limpiar cualquier error previo
        setError('');

        // Realizar la petición al servidor
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Redirigir al usuario o manejar el inicio de sesión exitoso
                const data = await response.json();
                console.log('Login exitoso:', data);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Error en el inicio de sesión');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            setError('Error de red. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Iniciar Sesión</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;

  );
}
