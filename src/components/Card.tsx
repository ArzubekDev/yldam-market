'use client';

import { type Product } from '@/consts';
import { cn } from '@/lib/utils';
import { Eye, Heart, ShoppingCart, Star, TrendingUp, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/button';

interface CardProps {
  product: Product;
  className?: string;
}

export default function Card({ product, className }: CardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [imageIdx, setImageIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const route = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted((prev) => !prev);
  };

  const formatPrice = (price: number) => price.toLocaleString('ru-KG') + ' ' + product.currency;

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setImageIdx((i) => (i + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setImageIdx((i) => (i - 1 + product.images.length) % product.images.length);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        'group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-orange-200 hover:shadow-[0_8px_32px_rgba(245,166,35,0.15)] transition-all duration-300',
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── IMAGE AREA ── */}
      <div className="relative overflow-hidden bg-slate-50 aspect-square">
        {product.images[imageIdx] ? (
          <Image
            src={product.images[imageIdx].url}
            alt={product.images[imageIdx].alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 text-5xl">
            📦
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div
          className={cn(
            'absolute inset-0 bg-linear-to-t from-black/20 to-transparent transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0',
          )}
        />

        {/* Image nav dots */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Предыдущее фото"
              className={cn(
                'absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-md transition-all duration-200 text-slate-600 hover:bg-white',
                isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2',
              )}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              aria-label="Следующее фото"
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-md transition-all duration-200 text-slate-600 hover:bg-white',
                isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2',
              )}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    setImageIdx(i);
                  }}
                  className={cn(
                    'rounded-full transition-all duration-200',
                    i === imageIdx ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/60',
                  )}
                  aria-label={`Фото ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.discount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-[#F5A623] text-white text-[11px] font-bold leading-none shadow-sm">
              −{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-[#0A2463] text-white text-[11px] font-bold leading-none shadow-sm">
              Новинка
            </span>
          )}
          {product.badge && !product.isNew && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-white/90 text-[#0A2463] text-[11px] font-bold leading-none shadow-sm border border-[#0A2463]/10">
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Убрать из избранного' : 'Добавить в избранное'}
          className={cn(
            'absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200',
            isWishlisted
              ? 'bg-[#F5A623] text-white scale-110'
              : 'bg-white/90 text-slate-400 hover:bg-white hover:text-[#F5A623]',
            !isHovered && !isWishlisted ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0',
          )}
        >
          <Heart className={cn('w-4 h-4', isWishlisted && 'fill-current')} />
        </button>

        {/* Express badge */}
        {product.isExpress && (
          <div className="absolute bottom-2 right-2.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#0A2463]/85 text-white text-[10px] font-semibold backdrop-blur-sm">
              <Zap className="w-2.5 h-2.5 fill-[#F5A623] stroke-[#F5A623]" />
              Экспресс
            </span>
          </div>
        )}
      </div>

      {/* ── INFO AREA ── */}
      <div className="flex flex-col flex-1 p-3.5 gap-2">
        {/* Brand */}
        <span className="text-[11px] font-semibold text-[#F5A623] uppercase tracking-wider">
          {product.brand}
        </span>

        {/* Name */}
        <h3 className="font-heading text-sm font-semibold text-[#0A2463] leading-snug line-clamp-2 group-hover:text-[#E8892E] transition-colors">
          {product.name}
        </h3>

        {/* Short desc */}
        <p className="text-[11.5px] text-slate-500 leading-relaxed line-clamp-2 font-sans">
          {product.shortDescription}
        </p>

        {/* Rating + reviews */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  'w-3 h-3',
                  star <= Math.round(product.rating)
                    ? 'fill-[#F5A623] text-[#F5A623]'
                    : 'fill-slate-200 text-slate-200',
                )}
              />
            ))}
          </div>
          <span className="text-[11px] font-semibold text-slate-700">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-[11px] text-slate-400">({product.reviewsCount})</span>
          {product.soldCount > 500 && (
            <>
              <span className="text-slate-200">·</span>
              <span className="flex items-center gap-0.5 text-[10px] text-slate-400">
                <TrendingUp className="w-2.5 h-2.5" />
                {product.soldCount.toLocaleString()} продаж
              </span>
            </>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="font-heading text-lg font-extrabold text-[#0A2463]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-slate-400 line-through font-sans">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock warning */}
        {product.stockLeft && product.stockLeft <= 5 && (
          <p className="text-[10.5px] text-red-500 font-semibold -mt-1">
            Осталось {product.stockLeft} шт.
          </p>
        )}

        {/* Delivery */}
        <p className="text-[10.5px] text-slate-400 font-sans -mt-1">
          {product.deliveryDays === 1
            ? 'Доставка завтра'
            : `Доставка за ${product.deliveryDays} дн.`}
          {product.warranty && <span className="ml-2 text-slate-300">· {product.warranty}</span>}
        </p>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className={cn(
            'mt-1 w-full flex items-center justify-center gap-2 h-10 rounded-xl font-semibold text-sm transition-all duration-200 font-sans',
            isAddedToCart
              ? 'bg-green-500 text-white scale-[0.98]'
              : 'bg-[#0A2463] hover:bg-[#071A4F] active:scale-[0.97] text-white',
          )}
        >
          {isAddedToCart ? (
            <>
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Добавлено!
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />В корзину
            </>
          )}
        </button>

        {/* Quick view */}
        <Button
          className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-md px-2.5 py-1 transition-all font-sans shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            route.push(`/products/${product.slug}`);
          }}
        >
          <Eye className="w-3.5 h-3.5 text-slate-500" />
          Быстрый просмотр
        </Button>
      </div>
    </Link>
  );
}
