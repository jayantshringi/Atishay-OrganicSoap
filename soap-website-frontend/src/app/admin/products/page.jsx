// src/app/admin/products/page.jsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Plus, ShieldCheck, Sparkles, Tag, Check, Eye } from 'lucide-react';
import { productsAPI } from '@/services/api';
import Spinner from '@/components/Spinner';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await productsAPI.getAll();
        setProducts(res?.data?.products || []);
      } catch (err) {
        console.error('Failed to load products for admin:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto my-8 sm:my-12 px-4 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-primary/10 pb-5">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-poppins font-bold text-primary hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin Dashboard</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-charcoal">
            Product Catalog Management
          </h1>
          <p className="text-xs text-charcoal-light font-inter">
            Active Ayurvedic melt-and-pour formulations and pricing catalog
          </p>
        </div>
      </div>

      {loading ? (
        <Spinner size="lg" text="Loading products catalog..." />
      ) : (
        <div className="bg-white rounded-extra border border-primary/15 shadow-subtle overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream/80 text-charcoal text-xs uppercase font-poppins font-bold border-b border-primary/10">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Target Skin</th>
                <th className="p-4">Price</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-dark text-xs font-inter font-medium">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-cream/30 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center relative overflow-hidden shrink-0 border border-primary/10">
                      {p.image ? (
                        <Image src={p.image} alt={p.name} fill className="object-contain" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-poppins font-bold text-charcoal">{p.name}</h4>
                      <p className="text-[10px] text-charcoal-muted line-clamp-1">{p.tagline}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="capitalize bg-cream px-2 py-0.5 rounded text-charcoal font-semibold border border-cream-dark">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-4 capitalize">{p.skinType} Skin</td>
                  <td className="p-4 font-poppins font-bold text-secondary text-sm">₹{p.price}</td>
                  <td className="p-4 font-bold text-charcoal">★ {p.rating || 4.9}</td>
                  <td className="p-4">
                    <Link
                      href={`/products/${p.slug || p.id}`}
                      className="inline-flex items-center gap-1 text-primary hover:underline font-bold text-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Live</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
