import React from 'react'
import { useProductContext } from '../../../context/ProductContext';

export default function ProductsList() {
  const { products  ,loading} = useProductContext();

  return (
    <div className="flex flex-wrap gap-2 justify-centre mx-3 py-3">

  {loading ? (
    <div>
    <div className="text-xl w-full text-center font-bold">
      ...loading
    </div>
  </div>
  ): products? (
  products.map(product=> (

    <div key={product.id} className="relative  flex  w-[250px] max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
    <div className="relative w-full mx-3 mt-3  h-60 overflow-hidden rounded-xl">
      <img className="object-cover" src={product.images} alt="product image" />
      <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
    </div>
    <div className="mt-4 px-5 pb-5">
      <a href="#">
        <h5 className="text-xl tracking-tight text-slate-900">{product.name}</h5>
      </a>
      <div className="mt-2 mb-2 flex items-center justify-between">
        <p>
          <span className="text-3xl font-bold text-slate-900">{product.prix}$</span>
          <span className="text-sm text-slate-900 line-through">$687</span>
        </p>
      </div>
      <div className="flex mb-5 items-center font-bold text-green-600">
       {product.etat_du_stock} 
      </div>
      <a href="#" className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Add to cart
        </a>
      
    </div>
  </div>
  ))) : (
    <tr>
      <td colSpan="4">No users available</td>
    </tr>
  )}
 </div>
  )
}
