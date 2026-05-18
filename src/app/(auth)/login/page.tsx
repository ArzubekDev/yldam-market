'use client';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function LoginComponent() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!executeRecaptcha) return;

    // v3 — пользователь ничего не видит, токен получается автоматически
    const token = await executeRecaptcha('login');

    await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'recaptcha': token,
      },
      body: JSON.stringify({ email, password }),
    });
  };

  return (
    <div className="mt-20 w-full max-w-md mx-auto bg-white rounded-2xl border border-slate-100 p-8 shadow-xl font-sans">
      {/* Заголовок */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Войти в аккаунт</h2>
        <p className="text-sm text-slate-400 mt-2">
          Рады видеть вас снова в{' '}
          <span className="font-semibold text-blue-900">
            Yldam <span className="text-amber-500 font-bold">Market</span>
          </span>
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600">Электронная почта</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              placeholder="example@mail.com"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-900 focus:bg-white transition-all text-slate-800"
            />
          </div>
        </div>

        {/* Пароль */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-600">Пароль</label>
            <a href="#" className="text-xs font-medium text-amber-500 hover:underline">
              Забыли пароль?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-900 focus:bg-white transition-all text-slate-800"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Кнопка войти */}
        <button
          type="submit"
          className="w-full bg-[#0A2463] hover:bg-blue-950 text-white font-medium py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-900/10 mt-6"
        >
          Войти
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Разделитель */}
      <div className="relative flex py-5 items-center">
        <div className="grow border-t border-slate-100"></div>
        <span className="shrink mx-4 text-slate-400 text-xs">или войти через</span>
        <div className="grow border-t border-slate-100"></div>
      </div>

      {/* Социальные кнопки */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 py-2.5 rounded-xl text-sm font-medium text-slate-700 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.11C18.432 2.022 15.618 1 12.24 1 5.48 1 0 6.48 0 13.2s5.48 12.2 12.24 12.2c7.055 0 11.75-4.96 11.75-11.96 0-.81-.087-1.425-.195-1.955H12.24z"
            />
          </svg>
          Google
        </button>
        <button className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 py-2.5 rounded-xl text-sm font-medium text-slate-700 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.64.74-1.2 1.88-1.05 3 .11.01.23.02.35.02.93 0 2.1-.56 2.65-1.47z" />
          </svg>
          Apple
        </button>
      </div>

      <p className="text-center text-xs text-slate-500 mt-6">
        Ещё нет аккаунта?{' '}
        <button type="button" className="text-amber-500 font-semibold hover:underline">
          Зарегистрироваться
        </button>
      </p>
    </div>
  );
}
