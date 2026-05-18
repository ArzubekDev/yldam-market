"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Bell,
  Package,
  Truck,
  Zap,
  Star,
  Gift,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

const CATEGORIES = [
  { label: "Электроника", icon: "⚡" },
  { label: "Одежда и мода", icon: "👗" },
  { label: "Дом и сад", icon: "🏡" },
  { label: "Спорт", icon: "🏃" },
  { label: "Красота", icon: "💄" },
  { label: "Детям", icon: "🧸" },
  { label: "Авто", icon: "🚗" },
  { label: "Книги", icon: "📚" },
];

const NAV_LINKS = [
  { label: "Акции", href: "/sale", badge: "HOT" },
  { label: "Новинки", href: "/new" },
  { label: "Бренды", href: "/brands" },
  { label: "Доставка", href: "/delivery" },
];

export default function YldamHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className="w-full sticky top-0 z-50 font-sans">
      {/* ── Top announcement bar ── */}
      <div className="bg-[#0A2463] text-white text-xs py-1.5 px-4 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#F5A623]" />
            Бесплатная доставка от 5 000 сом
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#F5A623]" />
            Экспресс-доставка за 2 часа
          </span>
        </div>
        <div className="flex items-center gap-4 text-white/70">
          <Link href="/seller" className="hover:text-white transition-colors">
            Стать продавцом
          </Link>
          <span>|</span>
          <Link href="/app" className="hover:text-white transition-colors">
            Скачать приложение
          </Link>
          <span>|</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Бишкек
          </span>
        </div>
      </div>

      {/* ── Main header ── */}
      <div
        className={cn(
          "bg-white transition-shadow duration-300",
          isScrolled ? "shadow-md" : "shadow-sm"
        )}
      >
        <div className=" mx-auto px-4 sm:px-6 lg:px-4">
          <div className="flex items-center gap-4 h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="relative">
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-[#F5A623] to-[#E8892E] flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <span className="text-white font-extrabold text-lg md:text-xl leading-none tracking-tight">Y</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#0A2463] rounded-full flex items-center justify-center">
                  <Star className="w-1.5 h-1.5 text-[#F5A623] fill-[#F5A623]" />
                </div>
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[#0A2463] font-extrabold text-lg md:text-xl tracking-tight">
                  yldam
                </span>
                <span className="text-[#F5A623] font-bold text-[10px] md:text-xs tracking-[0.18em] uppercase">
                  market
                </span>
              </div>
            </Link>

            {/* Category dropdown — desktop */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="hidden lg:flex items-center gap-2 border-[#E2E8F0] text-[#0A2463] font-semibold hover:bg-[#F5A623]/10 hover:border-[#F5A623] hover:text-[#E8892E] transition-all h-10 px-4 rounded-xl"
                >
                  <Menu className="w-4 h-4" />
                  Каталог
                  <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 mt-2 p-2 rounded-2xl border-0 shadow-xl"
                align="start"
              >
                {CATEGORIES.map((cat) => (
                  <DropdownMenuItem
                    key={cat.label}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-[#F5A623]/10 hover:text-[#E8892E] font-medium text-sm text-[#1A202C]"
                  >
                    <span className="text-base">{cat.icon}</span>
                    {cat.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer font-semibold text-sm text-[#0A2463] hover:bg-[#0A2463]/5">
                  <Gift className="w-4 h-4" />
                  Все категории
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search bar */}
            <div
              className={cn(
                "flex-1 relative transition-all duration-200",
                searchFocused ? "flex-[1.2]" : "flex-1"
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-0 rounded-2xl overflow-hidden border-2 transition-all duration-200",
                  searchFocused
                    ? "border-[#F5A623] shadow-[0_0_0_4px_rgba(245,166,35,0.15)]"
                    : "border-[#E2E8F0] hover:border-[#CBD5E0]"
                )}
              >
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Найти товары, бренды, категории..."
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-11 text-[15px] placeholder:text-gray-400 bg-[#FAFAFA] px-4 rounded-none"
                />
                <button
                  className="h-11 px-5 bg-[#F5A623] hover:bg-[#E8892E] active:bg-[#D4781A] text-white flex items-center gap-2 transition-colors font-semibold text-sm shrink-0"
                  aria-label="Поиск"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden md:inline">Найти</span>
                </button>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1 md:gap-2 shrink-0">
              {/* Notifications — desktop */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex relative text-[#4A5568] hover:text-[#0A2463] hover:bg-[#EBF4FF] rounded-xl h-11 w-11"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F5A623]" />
              </Button>

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-[#4A5568] hover:text-[#E8892E] hover:bg-[#FFF7ED] rounded-xl h-11 w-11"
              >
                <Heart className="w-5 h-5" />
                <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-[1rem] px-1 text-[10px] bg-[#F5A623] text-white border-white border hover:bg-[#E8892E]">
                  3
                </Badge>
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-[#4A5568] hover:text-[#0A2463] hover:bg-[#EBF4FF] rounded-xl h-11 w-11"
              >
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-[1rem] px-1 text-[10px] bg-[#0A2463] text-white border-white border hover:bg-[#0A2463]">
                  7
                </Badge>
              </Button>

              {/* Account — desktop */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="hidden md:flex items-center gap-2 border-[#E2E8F0] text-[#0A2463] hover:bg-[#EBF4FF] hover:border-[#93C5FD] rounded-xl h-11 px-3 font-semibold"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0A2463] flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm hidden lg:inline">Войти</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52 mt-2 p-2 rounded-2xl border-0 shadow-xl" align="end">
                  <div className="px-3 py-2 mb-1">
                    <p className="text-xs text-gray-400">Не авторизованы</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-xl px-3 py-2.5 font-semibold text-[#0A2463] hover:bg-[#EBF4FF] cursor-pointer">
                    Войти
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl px-3 py-2.5 font-medium text-[#4A5568] hover:bg-gray-50 cursor-pointer">
                    Зарегистрироваться
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-xl px-3 py-2.5 text-sm text-[#4A5568] hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                    <Package className="w-4 h-4" /> Мои заказы
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl px-3 py-2.5 text-sm text-[#4A5568] hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                    <Heart className="w-4 h-4" /> Избранное
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile menu */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-[#0A2463] hover:bg-[#EBF4FF] rounded-xl h-11 w-11"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between px-5 py-4 border-b bg-[#0A2463]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#F5A623] flex items-center justify-center">
                          <span className="text-white font-extrabold text-sm">Y</span>
                        </div>
                        <div>
                          <p className="text-white font-extrabold text-base leading-none">yldam</p>
                          <p className="text-[#F5A623] font-bold text-[9px] tracking-widest uppercase">market</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setMobileOpen(false)}
                        className="text-white/60 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto py-4 px-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-3">Категории</p>
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.label}
                          href="#"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FFF7ED] text-[#1A202C] font-medium text-sm mb-0.5"
                          onClick={() => setMobileOpen(false)}
                        >
                          <span>{cat.icon}</span>
                          {cat.label}
                        </Link>
                      ))}
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-3">Навигация</p>
                        {NAV_LINKS.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#EBF4FF] text-[#0A2463] font-semibold text-sm mb-0.5"
                            onClick={() => setMobileOpen(false)}
                          >
                            {link.label}
                            {link.badge && (
                              <span className="text-[10px] font-bold bg-[#F5A623] text-white px-1.5 py-0.5 rounded-full">
                                {link.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 border-t">
                      <Button className="w-full bg-[#0A2463] hover:bg-[#071A4F] text-white rounded-xl h-11 font-semibold">
                        Войти в аккаунт
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom nav bar ── */}
      <div className="hidden md:block bg-[#0A2463] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 h-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-1.5 px-4 h-full text-white/80 hover:text-white hover:bg-white/10 transition-all text-sm font-medium rounded-none"
              >
                {link.label}
                {link.badge && (
                  <span className="text-[10px] font-bold bg-[#F5A623] text-white px-1.5 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            <div className="ml-auto flex items-center gap-1">
              <Link
                href="/track"
                className="flex items-center gap-1.5 px-3 h-full text-white/70 hover:text-white hover:bg-white/10 transition-all text-xs font-medium"
              >
                <Package className="w-3.5 h-3.5" />
                Отследить заказ
              </Link>
              <Link
                href="/delivery"
                className="flex items-center gap-1.5 px-3 h-full text-white/70 hover:text-white hover:bg-white/10 transition-all text-xs font-medium"
              >
                <Truck className="w-3.5 h-3.5" />
                Доставка
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}