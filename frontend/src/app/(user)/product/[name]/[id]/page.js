'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useGlobalContext } from '../../../../components/context/GlobalContext';
import Image from 'next/image';
import EarringsMarquee from '../../../../components/user/Earring';

import {
  PackageSearch,
  RefreshCcw,
  Factory,
  Sparkles,
  Info,
  Palette,
  Tags,
  ShieldCheck,
  ShoppingCart,
  CreditCard,
} from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const { refetchProductById } = useGlobalContext();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
// Add this above return in component
const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
const [isZoomed, setIsZoomed] = useState(false);

const handleMouseMove = (e) => {
  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - left) / width) * 100;
  const y = ((e.clientY - top) / height) * 100;
  setZoomPos({ x, y });
  setIsZoomed(true);
};

const handleMouseLeave = () => {
  setIsZoomed(false);
};

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await refetchProductById(id);
        if (data) {
          setProduct(data);
          setSelectedImage(data.images?.[0]);
        }
      })();
    }
  }, [id, refetchProductById]);

  if (!product) return <div className="p-12">Loading...</div>;

  return (
    <div>
 <div className="relative flex items-start justify-center flex-wrap lg:flex-nowrap md:gap-6 px-4 md:px-12 xl:px-40 py-24 bg-[#fffaf7]">
      {/* Left: Sticky Images */}
      <div className="w-full md:w-1/2 lg:sticky lg:top-24">
        <div className="flex gap-4">
          {/* Thumbnails */}
    
<div className="flex-col space-y-4">
            {product.images.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                width={400}
                height={400}
                className={`w-36 h-auto cursor-pointer  rounded-tl-2xl rounded-br-2xl object-cover ${
                  selectedImage === img ? 'ring-2 ring-[#B67032]' : ''
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          {/* Main Image */}
         <div
  className="relative w-full h-[600px] overflow-hidden  rounded-md  cursor-zoom-in "
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
  style={{
    backgroundImage: `url(${selectedImage})`,
    backgroundSize: isZoomed ? '150%' : 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: isZoomed ? `${zoomPos.x}% ${zoomPos.y}%` : 'center',
    transition: 'background-size 0.3s ease',
  }}
></div>


      
        </div>
      </div>

      {/* Right: Details */}


<div className="w-full md:w-1/2 flex flex-col gap-6  ">

  {/* Title */}
  <div>

    <h1 className="text-3xl md:text-4xl font-serif  text-stone-900">{product.name}</h1>
    <p className="text-md text-stone-500 mt-2 capitalize ">
      {product.category?.name} {product.subcategory?.name && `→ ${product.subcategory.name}`}
    </p>
  </div>
  {/* Tags */}
  {/* {product.tags?.length > 0 && (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-stone-800">
        <Tags className="w-5 h-5" />
        <h3 className="text-xl font-serif font-semibold">Tags</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {product.tags.map((tag, i) => (
          <span
            key={i}
            className="text-md bg-[#f3eae4] text-[#B67032] p-2 rounded-lg"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  )} */}

  {/* Price Section */}
  <div className="flex flex-col gap-1">
    <div className="flex items-end gap-3">
      <span className="text-[#B67032] text-2xl font-bold tracking-wide">₹{product.finalPrice}</span>
      {product.discount > 0 && (
        <>
          <span className="line-through text-stone-600 text-md">₹{product.price}</span>
          <span className="text-green-600 text-md ">({product.discount}% OFF)</span>
        </>
      )}
    </div>

    <span className="text-md text-stone-500">Inclusive of all taxes</span>
  </div>
  {/* CTA Buttons */}
  <div className="flex flex-col md:flex-row gap-4">
    <button className="w-full flex items-center justify-center gap-2 bg-[#B67032] text-white px-4 py-3 rounded hover:bg-[#a95c2e] transition text-sm font-medium tracking-wide">
      <ShoppingCart className="w-4 h-4" />
      Add to Cart
    </button>
    <button className="w-full flex items-center justify-center gap-2 border border-[#B67032] text-[#B67032] px-4 py-3 rounded hover:bg-[#fff4ed] transition text-sm font-medium tracking-wide">
      <CreditCard className="w-4 h-4" />
      Buy Now
    </button>
  </div>
{/* Description */}
{(product.description?.paragraphs?.length > 0 || product.description?.bulletPoints?.length > 0) && (
  <div className="space-y-4">
  <div className="flex items-center gap-2 text-stone-800">
    <Info className="w-5 h-5" />
    <h3 className="text-xl font-serif">Description</h3>
  </div>

  {/* Paragraphs */}
  {product.description?.paragraphs?.map((para, idx) => (
    <p key={idx} className="text-md  text-stone-600">
      {para}
    </p>
  ))}

  {/* Bullet Points */}
  {product.description?.bulletPoints?.length > 0 && (
    <ul className="list-disc ml-6 text-md text-stone-800  space-y-2">
      {product.description.bulletPoints.map((point, idx) => (
        <li key={idx}>{point}</li>
      ))}
    </ul>
  )}
</div>)}




  {/* Colors */}
  {product.colorVariants?.length > 0 && (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-stone-800">
        <Palette className="w-5 h-5" />
        <h3 className="text-xl font-serif ">Available Colors</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {product.colorVariants.map((v, i) => (
          <button
            key={i}
            className="border px-3 py-1 rounded-full bg-white text-gray-700 hover:bg-[#fff5f0] transition"
          >
            {v.colorName}
          </button>
        ))}
      </div>
    </div>
  )}


  {/* Shipping Info */}
  <div className="space-y-2">
    
    <div className="flex items-center gap-2 text-stone-800">
      <PackageSearch className="w-5 h-5" />
      <h3 className="text-2xl font-serif ">Shipping Policy</h3>
    </div>
      <h5 className='text-lg text-[#240b41] font-semibold mt-2'>Free shipping on orders above ₹499 within India</h5>
    <ul className="list-disc list-inside text-md leading-relaxed ">
      <li>International delivery in 8-10 days</li>
      <li>Order your Rakhi early to ensure timely delivery</li>
      <li className="text-sm italic text-stone-500">*Delivery times may vary by location</li>
    </ul>
  </div>

  {/* Return Policy */}
  <div className="space-y-2">
    
    <div className="flex items-center gap-2 text-stone-800">
      <RefreshCcw className="w-5 h-5" />
      <h3 className="text-2xl font-serif ">Returns & Refunds</h3>
    </div>
      <h5 className='text-lg text-[#240b41] font-semibold mt-2'>10-day return from date of delivery</h5>
    <ul className="list-disc list-inside text-md leading-relaxed">
      <li>Rakhi items are non-returnable</li>
      <li>Lab-grown diamond jewellery requires quality check</li>
      <li>All items including certificate & box must be returned</li>
    </ul>
  </div>

  {/* Care Instructions */}
  <div className="space-y-2">
    
    <div className="flex items-center gap-2 text-stone-800">
      <ShieldCheck className="w-5 h-5" />
      <h3 className="text-2xl font-serif ">Care Instructions</h3>
    </div>
      <h5 className='text-lg text-[#240b41] font-semibold mt-2'>Avoid water, perfume, and hairspray</h5>
    <ul className="list-disc list-inside text-md leading-relaxed">
      <li>Store in a dry, cool place separately</li>
      <li>Clean gently with a soft cloth</li>
      <li>Remove before physical activity</li>
    </ul>
  </div>




</div>




    </div>

        <EarringsMarquee/>
    </div>
   
  );
}
