
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ICONS } from '../constants';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales incorrectas. Prueba de nuevo.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-100 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-100 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 opacity-50"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/80 backdrop-blur-2xl p-10 rounded-[3rem] shadow-2xl shadow-slate-200 border border-white">
          <div className="text-center mb-10">
            <div className="mx-auto h-16 w-16 bg-primary-600 text-white flex items-center justify-center rounded-[1.5rem] shadow-xl shadow-primary-200 mb-6">
              {React.cloneElement(ICONS.help as React.ReactElement, { className: 'h-8 w-8' })}
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Bienvenido a JapiJelp
            </h2>
            <p className="text-slate-500 mt-2 font-medium italic">Transforma tu soporte en post-venta</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Profesional</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition-all font-medium"
                  placeholder="ejemplo@tienda.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Contraseña</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm font-bold text-center bg-red-50 p-3 rounded-xl">{error}</p>}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isLoggingIn ? 'Iniciando...' : 'Entrar al Dashboard'}
            </button>
          </form>
          
          <p className="mt-8 text-center text-slate-400 text-sm font-medium">
            ¿No tienes cuenta? <span className="text-primary-600 font-bold cursor-pointer hover:underline">Contacta con ventas</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
