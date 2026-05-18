"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Mail, 
  Lock, 
  Phone, 
  Briefcase, 
  FileText, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  Store,
  Eye,
  EyeOff
} from "lucide-react";

export default function SellerAuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [businessType, setBusinessType] = useState("ИП");

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col lg:flex-row font-sans">
      
      {/* ЛЕВАЯ СЕКЦИЯ: ФОРМЫ АВТОРИЗАЦИИ */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-lg">
          
          {/* Логотип и переключатель */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-[#0A2463] text-amber-500 p-2 rounded-xl font-black text-xl shadow-md">Y</div>
              <span className="text-xl font-bold text-slate-800">
                Yldam <span className="text-amber-500">Business</span>
              </span>
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isLogin ? "bg-white text-[#0A2463] shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Вход для партнеров
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  !isLogin ? "bg-white text-[#0A2463] shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Стать продавцом
              </button>
            </div>
          </div>

          {isLogin ? (
            /* --- ФОРМА ВХОДА ПРОДАВЦА --- */
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4 animate-fadeIn">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Личный кабинет продавца</h1>
                <p className="text-sm text-slate-500 mt-1">Управляйте своими продажами и заказами</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Рабочий Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    placeholder="partner@company.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#0A2463] focus:bg-white transition-all text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-600">Пароль</label>
                  <a href="#" className="text-xs font-medium text-amber-500 hover:underline">Забыли пароль?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#0A2463] focus:bg-white transition-all text-slate-800"
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

              <button type="submit" className="w-full bg-[#0A2463] hover:bg-blue-950 text-white font-medium py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-900/10 pt-4">
                Войти в панель вендора
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* --- ПРОФЕССИОНАЛЬНАЯ РЕГИСТРАЦИЯ ПРОДАВЦА --- */
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4 animate-fadeIn">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Заявка на открытие магазина</h1>
                <p className="text-sm text-slate-500 mt-1">Заполните данные для прохождения модерации</p>
              </div>

              {/* Выбор юридического статуса */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Форма организации</label>
                <div className="grid grid-cols-3 gap-2">
                  {["ИП", "ОсOO / ООО", "Самозанятый"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setBusinessType(type)}
                      className={`py-2 px-3 border rounded-xl text-xs font-medium transition-all ${
                        businessType === type
                          ? "border-[#0A2463] bg-blue-50/50 text-[#0A2463] font-semibold"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Две колонки: Название компании и ИНН */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Название компании / Бренда</label>
                  <div className="relative">
                    <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Glow Apparel"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#0A2463] focus:bg-white transition-all text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">ИНН / БИН организации</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="14 цифр номера"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#0A2463] focus:bg-white transition-all text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Категория товаров */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Основная категория товаров</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#0A2463] focus:bg-white transition-all text-slate-700 appearance-none">
                    <option>Электроника и гаджеты</option>
                    <option>Одежда, обувь и аксессуары</option>
                    <option>Бытовая техника</option>
                    <option>Красота и здоровье</option>
                    <option>Дом и сад</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    ▼
                  </div>
                </div>
              </div>

              {/* Контакты: Email и Телефон */}
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Контактный Email руководителя</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      placeholder="ceo@mybrand.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#0A2463] focus:bg-white transition-all text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Мобильный телефон для связи</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="+996 (700) 12-34-56"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#0A2463] focus:bg-white transition-all text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Пароль */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Придумайте надежный пароль</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Не менее 8 символов со спецзнаками"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#0A2463] focus:bg-white transition-all text-slate-800"
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

              <div className="flex items-start gap-2 pt-1">
                <input type="checkbox" id="seller-terms" className="mt-1 w-4 h-4 accent-[#0A2463] rounded" required />
                <label htmlFor="seller-terms" className="text-[11px] text-slate-500 leading-normal">
                  Я подтверждаю достоверность данных и принимаю{" "}
                  <a href="#" className="text-blue-900 font-semibold hover:underline">Договор оферты маркетплейса Yldam</a>, включая регламенты комиссий.
                </label>
              </div>

              <button type="submit" className="w-full bg-amber-500 hover:bg-amber-650 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-amber-500/10 mt-2">
                Отправить заявку на модерацию
              </button>
            </form>
          )}
          
        </div>
      </div>

      {/* ПРАВАЯ СЕКЦИЯ: ПРЕИМУЩЕСТВА И МАРКЕТИНГ */}
      <div className="w-full lg:w-[45%] bg-[#0A2463] text-white flex items-center px-8 sm:px-16 relative overflow-hidden">
        {/* Декоративные фоновые круги */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-800/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>

        <div className="w-full max-w-md z-10">
          <span className="bg-blue-800/60 border border-blue-700/50 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">
            B2B Партнерство
          </span>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-6 leading-tight">
            Продавайте там, где покупают миллионы
          </h2>
          <p className="text-slate-300 text-sm mt-4 leading-relaxed">
            Yldam Market предоставляет всю инфраструктуру для быстрого роста вашего бизнеса: от листинга товаров до логистики и аналитики.
          </p>

          {/* Карточки преимуществ */}
          <div className="space-y-5 mt-10">
            
            <div className="flex gap-4 items-start p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
              <div className="bg-amber-500/20 p-2.5 rounded-xl text-amber-400 shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Низкая комиссия от 3%</h4>
                <p className="text-xs text-slate-300 mt-1">Платите только за реальные доставленные заказы. Никаких скрытых платежей за размещение.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
              <div className="bg-blue-500/20 p-2.5 rounded-xl text-blue-400 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Огромный трафик ежедневно</h4>
                <p className="text-xs text-slate-300 mt-1">Ваш бренд увидят покупатели по всей стране с первого дня после прохождения модерации.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
              <div className="bg-green-500/20 p-2.5 rounded-xl text-green-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Быстрые выплаты и API-интеграция</h4>
                <p className="text-xs text-slate-300 mt-1">Выводите оборотные средства каждую неделю. Настраивайте синхронизацию остатков через 1С или МойСклад.</p>
              </div>
            </div>

          </div>

          {/* Инфо-счетчик */}
          <div className="grid grid-cols-2 gap-4 pt-8 mt-8 border-t border-white/10">
            <div>
              <p className="text-2xl font-black text-amber-400">15 минут</p>
              <p className="text-xs text-slate-400 mt-1">Среднее время создания магазина</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">более 5 000</p>
              <p className="text-xs text-slate-400 mt-1">Активных мерчантов платформы</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}