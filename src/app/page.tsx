import { prisma } from "@/lib/prisma";
import { Header } from "@/components/layout/header";
import { ProductCard } from "@/components/products/product-card";

export const revalidate = 60;

export default async function HomePage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  const categories = await prisma.category.findMany();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Board Games Store
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the best board games for family, friends, and epic game nights
          </p>
        </section>

        <section className="mb-8">
          <div className="flex items-center gap-4 flex-wrap">
            <h2 className="text-2xl font-bold">Categories:</h2>
            {categories.map((category) => (
              <span
                key={category.id}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
              >
                {category.name}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">Featured Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products available yet.</p>
          </div>
        )}
      </main>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 Board Games Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
