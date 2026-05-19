'use client';

import { type Product } from '@/consts';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Package,
  RotateCcw,
  Shield,
  ShoppingCart,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [imageIdx, setImageIdx] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [qty, setQty] = useState(1);

  const formatPrice = (price: number) =>
    price.toLocaleString('ru-KG') + ' ' + product.currency;

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 1800);
  };

const handlePayment = async () => {
  try {
    // Считаем общую стоимость: цена товара * количество
    const totalAmount = product.price * qty;

    const response = await fetch('/api/payments/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalAmount }), // Передаем реальную сумму
    });

    const data = await response.json();

    if (data.url) {
      // Перенаправляем на шлюз Finik
      window.location.href = data.url; 
    } else {
      alert('Ошибка при создании платежа');
    }
  } catch (error) {
    console.error("Payment error:", error);
    alert('Произошла ошибка при обработке платежа');
  }
};

  const prevImage = () =>
    setImageIdx((i) => (i - 1 + product.images.length) % product.images.length);
  const nextImage = () =>
    setImageIdx((i) => (i + 1) % product.images.length);

  const savings = product.originalPrice - product.price;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ── Breadcrumb ── */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-[12px] text-slate-400">
          <Link href="/" className="hover:text-[#0A2463] transition-colors">
            Главная
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#0A2463] transition-colors">
            Каталог
          </Link>
          <span>/</span>
          <span className="text-[#0A2463] font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-6xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT — Gallery */}
        <div className="flex flex-col gap-4">
          {/* Main image */}
          <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-100 aspect-square shadow-sm group">
            {product.images[imageIdx] ? (
              <Image
                src={product.images[imageIdx].url}
                alt={product.images[imageIdx].alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-200 text-8xl">
                📦
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.discount > 0 && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#F5A623] text-white text-xs font-bold shadow">
                  −{product.discount}%
                </span>
              )}
              {product.isNew && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#0A2463] text-white text-xs font-bold shadow">
                  Новинка
                </span>
              )}
              {product.isExpress && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0A2463]/85 text-white text-xs font-semibold backdrop-blur-sm">
                  <Zap className="w-3 h-3 fill-[#F5A623] stroke-[#F5A623]" />
                  Экспресс
                </span>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlisted((p) => !p)}
              aria-label="Избранное"
              className={cn(
                'absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-200',
                isWishlisted
                  ? 'bg-[#F5A623] text-white scale-110'
                  : 'bg-white/90 text-slate-400 hover:text-[#F5A623] hover:bg-white',
              )}
            >
              <Heart className={cn('w-5 h-5', isWishlisted && 'fill-current')} />
            </button>

            {/* Prev / Next */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Предыдущее фото"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-600" />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Следующее фото"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImageIdx(i)}
                  className={cn(
                    'flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200',
                    i === imageIdx
                      ? 'border-[#F5A623] scale-105 shadow-sm'
                      : 'border-slate-100 opacity-60 hover:opacity-100 hover:border-slate-300',
                  )}
                >
                  <div className="relative w-full h-full">
                    <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="64px" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Trust strip */}
          <div className="grid grid-cols-3 gap-3 mt-1">
            {[
              { icon: Shield, label: 'Гарантия', sub: product.warranty ?? '12 мес.' },
              { icon: RotateCcw, label: 'Возврат', sub: '14 дней' },
              { icon: Package, label: 'Доставка', sub: product.deliveryDays === 1 ? 'Завтра' : `${product.deliveryDays} дн.` },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 bg-white rounded-xl py-3 px-2 border border-slate-100 text-center"
              >
                <Icon className="w-5 h-5 text-[#F5A623]" />
                <span className="text-[11px] font-semibold text-[#0A2463]">{label}</span>
                <span className="text-[10px] text-slate-400">{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Info */}
        <div className="flex flex-col gap-5">
          {/* Brand */}
          <span className="text-xs font-bold text-[#F5A623] uppercase tracking-widest">
            {product.brand}
          </span>

          {/* Name */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A2463] leading-tight">
            {product.name}
          </h1>

          {/* Rating row */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    'w-4 h-4',
                    star <= Math.round(product.rating)
                      ? 'fill-[#F5A623] text-[#F5A623]'
                      : 'fill-slate-200 text-slate-200',
                  )}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-slate-700">{product.rating.toFixed(1)}</span>
            <span className="text-sm text-slate-400">({product.reviewsCount} отзывов)</span>
            {product.soldCount > 500 && (
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <TrendingUp className="w-3.5 h-3.5" />
                {product.soldCount.toLocaleString()} продаж
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed">{product.shortDescription}</p>

          {/* Divider */}
          <div className="border-t border-slate-100" />

          {/* Price block */}
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-[#0A2463]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {savings > 0 && (
              <span className="text-sm font-semibold text-green-600">
                Вы экономите {formatPrice(savings)}
              </span>
            )}
            {product.stockLeft && product.stockLeft <= 5 && (
              <p className="text-xs text-red-500 font-semibold">
                Осталось всего {product.stockLeft} шт. — поторопитесь!
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-600">Количество:</span>
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors text-lg font-bold"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-bold text-[#0A2463]">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stockLeft ?? 99, q + 1))}
                className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors text-lg font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* ── CTA buttons ── */}
          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            {/* Buy now — finik.kg integration point */}
            <button
              onClick={handlePayment}
              className="flex-1 h-13 rounded-xl bg-[#F5A623] hover:bg-[#E8952A] active:scale-[0.98] text-white font-bold text-base flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(245,166,35,0.4)] transition-all duration-200"
            >
              <Zap className="w-5 h-5 fill-white stroke-white" />
              Купить сейчас
            </button>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className={cn(
                'flex-1 h-13 rounded-xl font-bold text-base flex items-center justify-center gap-2 border-2 transition-all duration-200 active:scale-[0.98]',
                isAddedToCart
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'bg-white border-[#0A2463] text-[#0A2463] hover:bg-[#0A2463] hover:text-white',
              )}
            >
              {isAddedToCart ? (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Добавлено!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  В корзину
                </>
              )}
            </button>
          </div>

          {/* finik.kg badge */}
          <div className="flex items-center gap-2 bg-[#0A2463]/5 border border-[#0A2463]/10 rounded-xl px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-[#0A2463] flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 fill-[#F5A623] stroke-[#F5A623]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0A2463]">Оплата через finik.kg</p>
              <p className="text-[11px] text-slate-500">Быстро, безопасно, без комиссии</p>
            </div>
          </div>

          {/* Specs / attributes if available */}
          {product.badge && (
            <div className="border-t border-slate-100 pt-4">
              <h3 className="text-sm font-bold text-[#0A2463] mb-3">Особенности</h3>
              <div className="flex flex-wrap gap-2">
                {[product.badge].map((b) => (
                  <span
                    key={b}
                    className="px-3 py-1 text-xs font-semibold bg-white border border-slate-200 text-slate-600 rounded-lg"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}