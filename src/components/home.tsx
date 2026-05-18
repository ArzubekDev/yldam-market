import { PRODUCTS } from "@/consts";
import Card from "./Card";



const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-8 text-2xl font-bold text-gray-900">Наши товары</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {PRODUCTS.map(p => <Card key={p.id} product={p} />)}
      </div>
    </div>
  );
};

export default Home;
