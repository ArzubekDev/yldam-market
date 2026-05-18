'use client';
import { Eye, EyeOff, Lock, Mail, Phone, ShieldCheck, User } from 'lucide-react';
import React from 'react';

export default function RegisterComponent() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="mt-20 w-full max-w-md mx-auto bg-white rounded-2xl border border-slate-100 p-8 shadow-xl font-sans">
      {/* Заголовок */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Создать аккаунт</h2>
        <p className="text-sm text-slate-400 mt-2">
          Присоединяйтесь к покупкам на{' '}
          <span className="font-semibold text-blue-900">
            Yldam <span className="text-amber-500 font-bold">Market</span>
          </span>
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-3.5">
        {/* Имя */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600">Ваше имя</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-900 focus:bg-white transition-all text-slate-800"
            />
          </div>
        </div>

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

        {/* Телефон */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600">Номер телефона</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="tel"
              placeholder="+996 (555) 00-00-00"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-900 focus:bg-white transition-all text-slate-800"
            />
          </div>
        </div>

        {/* Пароль */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600">Придумайте пароль</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Минимум 6 символов"
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

        {/* Согласие с офертой */}
        <div className="flex items-start gap-2.5 pt-1">
          <input
            type="checkbox"
            id="terms"
            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-900 focus:ring-blue-900 accent-[#0A2463]"
          />
          <label htmlFor="terms" className="text-xs text-slate-500 leading-normal">
            Я согласен с{' '}
            <a href="#" className="text-blue-900 font-medium hover:underline">
              Условиями использования
            </a>{' '}
            и{' '}
            <a href="#" className="text-blue-900 font-medium hover:underline">
              Политикой конфиденциальности
            </a>
          </label>
        </div>

        {/* Кнопка регистрации */}
        <button
          type="submit"
          className="w-full bg-[#0A2463] hover:bg-blue-950 text-white font-medium py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-900/10 pt-4"
        >
          <ShieldCheck className="w-4 h-4" />
          Зарегистрироваться
        </button>
      </form>

      <p className="text-center text-xs text-slate-500 mt-5">
        Уже зарегистрированы?{' '}
        <button type="button" className="text-amber-500 font-semibold hover:underline">
          Войти в аккаунт
        </button>
      </p>
    </div>
  );
}
