"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    stock: number;
    playerCount: string;
    playTime: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      stock: product.stock,
    });
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="aspect-square relative mb-4 bg-gray-100 rounded-md overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>{product.playerCount}</span>
            <span>•</span>
            <span>{product.playTime}</span>
          </div>
          <p className="text-2xl font-bold text-primary">{formatPrice(product.price)}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
