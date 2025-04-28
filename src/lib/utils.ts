import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export type ProductsProps = {
  id: number,
  title: string,
  price: number,
  category: string,
  image: string,
  amount: number,
  total: number,
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchProdutos() {
  const response = await fetch('https://ecommerce-api-node-h268.onrender.com/api/products')

  if (!response.ok) throw new Error('Erro ao buscar produtos')

  const products: ProductsProps[] = await response.json()

  return products;
}


export async function getUsers() {
  try {
    const response = await fetch('https://ecommerce-api-node-h268.onrender.com/api/users');

    if (!response.ok) {
      console.error('Failed to fetch users:', response.statusText);
      throw new Error('Failed to fetch users');
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error in getUsers:', error);
    throw new Error('Internal Server Error');
  }
}


export async function sessionUser() {
  const response = await fetch('https://ecommerce-api-node-h268.onrender.com/api/users')

  if (!response.ok) throw new Error('Erro ao buscar usuário')

  const users = await response.json()

  return users;
}