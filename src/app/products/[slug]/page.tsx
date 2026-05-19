import ProductDetails from '@/components/details';
import { PRODUCTS } from '@/consts';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug, // ← используем slug
  }));
}

const ProductDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  const product = PRODUCTS.find((p) => p.slug === slug); // ← ищем по slug

  if (!product) notFound();

  return (
    <main>
      <ProductDetails product={product} />
    </main>
  );
};

export default ProductDetailPage