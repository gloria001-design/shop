
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { DressStyle, Product, ProductType } from "@/src/types/product";
import { createProductId, useCatalog } from "@/src/hooks/use-catalog";

const types: ProductType[] = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
const styles: DressStyle[] = ["Casual", "Formal", "Party", "Gym"];
const sizeOptions = ["Small", "Medium", "Large", "X-Large"];

const inputClass =
  "h-12 w-full rounded-full bg-muted px-5 text-sm outline-none ring-black/20 placeholder:text-black/40 focus:ring-2";

type Props = { product?: Product };

export function AdminProductForm({ product }: Props) {
  const router = useRouter();
  const { items, upsert } = useCatalog();

  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(String(product?.price ?? ""));
  const [originalPrice, setOriginalPrice] = useState(
    product?.originalPrice != null ? String(product.originalPrice) : "",
  );
  const [rating, setRating] = useState(String(product?.rating ?? "4.5"));
  const [image, setImage] = useState(product?.image ?? "");
  const [images, setImages] = useState((product?.images ?? []).join("\n"));
  const [type, setType] = useState<ProductType>(product?.type ?? "T-shirts");
  const [style, setStyle] = useState<DressStyle>(product?.style ?? "Casual");
  const [description, setDescription] = useState(product?.description ?? "");
  const [isNew, setIsNew] = useState(!!product?.isNew);
  const [isTopSelling, setIsTopSelling] = useState(!!product?.isTopSelling);
  const [sizes, setSizes] = useState<string[]>(product?.sizes ?? [...sizeOptions]);
  const [colorsText, setColorsText] = useState(
    (product?.colors ?? [{ name: "Black", hex: "#000000" }])
      .map((c) => `${c.name},${c.hex}`)
      .join("\n"),
  );
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const parsedPrice = Number(price);

    if (!name.trim() || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      setError("Name and a valid price are required.");
      return;
    }

    if (!image.trim()) {
      setError("Add a main image URL.");
      return;
    }

    const colors = colorsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [cName, hex] = line.split(",").map((p) => p.trim());
        return { name: cName || "Color", hex: hex || "#000000" };
      });

    if (colors.length === 0) {
      setError("Add at least one color as Name,#hex.");
      return;
    }

    const gallery = images
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const orig = originalPrice ? Number(originalPrice) : undefined;

    const next: Product = {
      id: product?.id ?? createProductId(name, items),
      name: name.trim(),
      price: parsedPrice,
      originalPrice: orig && !Number.isNaN(orig) ? orig : undefined,
      rating: Math.min(5, Math.max(0, Number(rating) || 0)),
      reviewsCount: product?.reviewsCount ?? 0,
      image: image.trim(),
      images: gallery.length ? gallery : [image.trim()],
      colors,
      sizes: sizes.length ? sizes : ["Large"],
      type,
      style,
      description: description.trim() || "New SHOP.CO piece.",
      isNew,
      isTopSelling,
    };

    upsert(next);
    router.push("/admin/products");
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-5">
      <div className="rounded-[20px] border border-black/10 p-5 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-2 block text-sm font-medium">Name</span>
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">Price</span>
            <input
              className={inputClass}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              inputMode="decimal"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">
              Original price (optional)
            </span>
            <input
              className={inputClass}
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              inputMode="decimal"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">Type</span>
            <select
              className={inputClass}
              value={type}
              onChange={(e) => setType(e.target.value as ProductType)}
            >
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">Dress style</span>
            <select
              className={inputClass}
              value={style}
              onChange={(e) => setStyle(e.target.value as DressStyle)}
            >
              {styles.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-2 block text-sm font-medium">
              Main image URL
            </span>
            <input
              className={inputClass}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-2 block text-sm font-medium">
              Gallery URLs (one per line)
            </span>
            <textarea
              className="min-h-24 w-full rounded-[20px] bg-muted px-5 py-3 text-sm outline-none ring-black/20 focus:ring-2"
              value={images}
              onChange={(e) => setImages(e.target.value)}
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-2 block text-sm font-medium">
              Colors (Name,#hex per line)
            </span>
            <textarea
              className="min-h-24 w-full rounded-[20px] bg-muted px-5 py-3 text-sm outline-none ring-black/20 focus:ring-2"
              value={colorsText}
              onChange={(e) => setColorsText(e.target.value)}
            />
          </label>

          <fieldset className="sm:col-span-2">
            <legend className="mb-2 block text-sm font-medium">Sizes</legend>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((s) => {
                const on = sizes.includes(s);

                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() =>
                      setSizes((prev) =>
                        on ? prev.filter((x) => x !== s) : [...prev, s],
                      )
                    }
                    className={`rounded-full px-5 py-2.5 text-sm ${
                      on ? "bg-black text-white" : "bg-muted text-black/60"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="block sm:col-span-2">
            <span className="mb-2 block text-sm font-medium">
              Description
            </span>
            <textarea
              className="min-h-28 w-full rounded-[20px] bg-muted px-5 py-3 text-sm outline-none ring-black/20 focus:ring-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isNew}
              onChange={(e) => setIsNew(e.target.checked)}
            />
            New arrival
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isTopSelling}
              onChange={(e) => setIsTopSelling(e.target.checked)}
            />
            Top selling
          </label>
        </div>

        {error && (
          <p className="mt-5 rounded-2xl bg-discount/10 px-4 py-3 text-sm text-discount">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            className="inline-flex h-12 items-center rounded-full bg-black px-8 text-sm font-medium text-white"
          >
            {product ? "Save product" : "Add product"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="inline-flex h-12 items-center rounded-full border border-black/10 px-6 text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
