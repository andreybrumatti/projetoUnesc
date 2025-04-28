"use client"

import { useQuery } from "@tanstack/react-query";
import { fetchProdutos } from "@/lib/utils";
import { ProductsProps } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

import { MdAddShoppingCart } from "react-icons/md";

import useCartStore from "@/stores/useCartStore";

import { Category } from "../SelectProducts/SelectProducts";
import { toast } from "sonner"

export default function ListProducts() {

    const { addProduct } = useCartStore();

    const searchParams = useSearchParams();

    const category = searchParams.get("category" as Category);

    const { data, isLoading } = useQuery({
        queryKey: ['produtos'],
        queryFn: fetchProdutos
    })

    const filteredProducts = data?.filter(product => product.category === category);

    return (
        <div className="flex flex-col items-center justify-center">
            {isLoading && (
                <div className="flex justify-center items-center p-4 mt-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500" />
                </div>)}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">

                {!category || category === "all products" ? (
                    data?.map((product: ProductsProps) => (
                        <div className="flex flex-col items-center justify-center w-96 h-96 border shadow-md shadow-blue-300 rounded-lg p-10 gap-2" key={product.id}>
                            <h1 className="text-center">{product.title}</h1>
                            <img className="w-40 h-40" src={product.image} alt={product.title} />
                            <p>R${product.price.toFixed(2)}</p>
                            <button onClick={() => {
                                addProduct(product);
                                toast.success("Product added to cart")
                            }}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 cursor-pointer">
                                Add to Cart
                                <MdAddShoppingCart className="w-5 h-5" />
                            </button>
                        </div>
                    ))
                ) : (
                    filteredProducts?.map((product: ProductsProps) => (
                        <div className="flex flex-col items-center justify-center w-96 h-96 border shadow-md shadow-blue-300 rounded-lg p-10 gap-2" key={product.id}>
                            <h1 className="text-center">{product.title}</h1>
                            <img className="w-40 h-40" src={product.image} alt={product.title} />
                            <p>R${product.price.toFixed(2)}</p>
                            <button onClick={() => {
                                addProduct(product);
                                toast.success("Product added to cart")
                            }}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 cursor-pointer">
                                Add to Cart
                                <MdAddShoppingCart className="w-5 h-5" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}