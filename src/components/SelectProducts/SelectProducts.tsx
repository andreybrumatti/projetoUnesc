"use client"

import { useRouter, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export type Category = "all products" | "jewelery" | "women's clothing" | "men's clothing";

export default function SelectProducts() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = (value: Category) => {
        const params = new URLSearchParams(searchParams);
        
        params.set("category", value);
        router.push(`/?${params.toString()}`);
    };

    return (
        <div>
            <Select onValueChange={handleChange}>
                <SelectTrigger className="shadow-none border-blue-300 text-blue-300">
                    <SelectValue  placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup className="text-blue-500 ">
                        <SelectItem className="hover:bg-blue-100 hover:text-blue-700" value="all products">All Products</SelectItem>
                        <SelectItem className="hover:bg-blue-100 hover:text-blue-700" value="jewelery">Jewelery</SelectItem>
                        <SelectItem className="hover:bg-blue-100 hover:text-blue-700" value="women's clothing">Women's clothing</SelectItem>
                        <SelectItem className="hover:bg-blue-100 hover:text-blue-700" value="men's clothing">Men's clothing</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}