"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { FaOpencart } from "react-icons/fa"
import useCartStore from "@/stores/useCartStore"

export function CarProducts() {


    const { cart, removeItemById, addProduct, getTotalCart } = useCartStore();

    const totalItems = cart.reduce((acc, item) => acc + item.amount, 0);


    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="w-10 h-10 flex items-center justify-center relative">

                    <FaOpencart className="text-white w-6 h-6 cursor-pointer" />
                    <span className='absolute top-1 right-0 w-4 h-4 flex items-center justify-center bg-blue-500 rounded-full text-xs text-white'>{totalItems}</span>
                </button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-lg">Products Car</SheetTitle>

                    <SheetDescription asChild>
                        {cart.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No products in the cart!
                            </p>
                        ) : (
                            <div className="flex flex-col gap-4 mt-6 max-h-[calc(100vh-180px)] overflow-y-auto p-2">
                                {cart.map((product: any) => (
                                    <div key={product.id} className="flex flex-row items-center justify-between">

                                        <div className="flex flex-col items-center gap-2">
                                            <p className="text-xs"><strong>{product.title}</strong></p>
                                            <img className="w-15 h-15" src={product.image} alt={product.title} />
                                        </div>

                                        <div className="flex flex-row items-center gap-3">
                                            <div className="flex flex-col items-center gap-2">
                                                <span>Price:</span>
                                                <p><strong>R${product.price.toFixed(2)}</strong></p>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <span>Quantity:</span>
                                                <div className="flex flex-row items-center gap-2">
                                                    <button onClick={() => removeItemById(product)} className="cursor-pointer select-none text-xl">-</button>
                                                    <p><strong>{product.amount}</strong></p>
                                                    <button onClick={() => addProduct(product)} className="cursor-pointer select-none text-xl">+</button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center gap-2">
                                                <span>Total:</span>
                                                <p><strong>R${product.total.toFixed(2)}</strong></p>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        )}
                    </SheetDescription>
                </SheetHeader>
                <SheetFooter className="flex flex-row items-center justify-start ">
                    <SheetTitle className="text-lg">Total Cart: </SheetTitle>
                    <SheetDescription className="text-lg">R$ {getTotalCart().toFixed(2)}</SheetDescription>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
