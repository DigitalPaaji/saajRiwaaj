'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useGlobalContext } from '../../../../components/context/GlobalContext';
import Image from 'next/image';
import Similar from '../../../../components/user/SimilarSuggestions';

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
  Heart,
} from 'lucide-react';
import { FaHeart } from 'react-icons/fa';

export default function ProductDetail() {

   const [flipped, setFlipped] = useState([false, false, false]);

  const toggleFlip = (index) => {
    setFlipped((prev) =>
      prev.map((f, i) => (i === index ? !f : f))
    );
  };

  const cards = [
    {
      img: "/Images/shipping.webp",
      frontTitle: "Shipping Policy",
      frontSubtitle: "Free shipping on orders above ₹499",
      backContent: (
        <div className="list-disc list-inside text-sm space-y-1">
          <p>International delivery in 8-10 days</p>
          <p>Order Rakhi early to ensure timely delivery</p>
          <p className="italic text-stone-700">
            *Delivery times may vary by location
          </p>
        </div>
      ),
    },
    {
      img: "/Images/return.webp",
      frontTitle: "Returns & Refunds",
      frontSubtitle: "Easy 10-day returns",
      backContent: (
        <div className="list-disc list-inside text-sm space-y-1">
          <p>Rakhi items are non-returnable</p>
          <p>Lab-grown jewellery requires quality check</p>
          <p>All items with certificate & box must be returned</p>
        </div>
      ),
    },
    {
      img: "/Images/care.webp",
      frontTitle: "Care Instructions",
      frontSubtitle: "Handle with love & care",
      backContent: (
        <div className="list-disc list-inside text-sm space-y-1">
          <p>Avoid water, perfume, and hairspray</p>
          <p>Store in a dry, cool place separately</p>
          <p>Clean gently with a soft cloth</p>
          <p>Remove before physical activity</p>
        </div>
      ),
    },
  ];




  const { id } = useParams();
  const { refetchProductById, wishlist, addToWishlist, removeFromWishlist, addToCart } = useGlobalContext();
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

  if (!product) return  <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-12 xl:px-40 py-12 ">
      {/* Left: Image Skeleton */}
      <div className="w-full xl:w-1/2 space-y-4">
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-24 h-24 bg-gray-200 animate-pulse rounded-lg" />
            ))}
          </div>
          <div className="flex-1 h-[400px] xl:h-[600px] bg-gray-200 animate-pulse rounded-md" />
        </div>
      </div>

      {/* Right: Details Skeleton */}
      <div className="w-full xl:w-1/2 flex flex-col gap-6">
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 animate-pulse w-2/3 rounded" />
          <div className="h-4 bg-gray-200 animate-pulse w-1/3 rounded" />
        </div>
        <div className="h-6 bg-gray-200 animate-pulse w-1/4 rounded" />
        <div className="flex gap-4">
          <div className="h-10 bg-gray-200 animate-pulse flex-1 rounded" />
          <div className="h-10 bg-gray-200 animate-pulse flex-1 rounded" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-4 bg-gray-200 animate-pulse rounded w-full" />
          ))}
        </div>
        <div className="h-40 bg-gray-200 animate-pulse rounded" />
      </div>
    </div>;


  return (
    <div>
 <div className="relative flex flex-col items-center lg:flex-row lg:items-start justify-center flex-wrap lg:flex-nowrap gap-6 px-4 md:px-12 xl:px-24 py-12 ">
      {/* Left: Sticky Images */}
      <div className="w-full xl:w-1/2 lg:sticky lg:top-24  ">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Thumbnails */}
    
{/* Thumbnails */}
<div className="flex   md:flex-col gap-4 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
  {product.images.map((img, idx) => (
    <Image
      key={idx}
      src={img}
      alt={`Thumbnail ${idx + 1}`}
      width={100}
      height={100}
      className={`w-24 h-24 object-cover rounded-tl-2xl rounded-br-2xl cursor-pointer transition-all duration-200 ${
        selectedImage === img ? 'border-2 border-[#B67032]' : ''
      }`}
      onClick={() => setSelectedImage(img)}
    />
  ))}
</div>

          {/* Main Image */}
         <div
  className="relative w-full h-[400px] xl:h-[600px] overflow-hidden  rounded-md  cursor-zoom-in "
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


<div className="w-full xl:w-1/2 flex flex-col gap-2  ">

  {/* Title */}
 <div className="flex justify-between items-start">
  {/* LEFT SIDE (name + category) */}
  <div>
    <h1 className="text-2xl md:text-4xl font-serif text-stone-900">
      {product.name}
    </h1>
    <p className="lg:text-md text-stone-700 mt-2 capitalize">
      {product.category?.name}{" "}
      {product.subcategory?.name && `→ ${product.subcategory.name}`}
    </p>
  </div>

  {/* RIGHT SIDE (wishlist icon) */}
<button
  onClick={() =>
    wishlist?.some((w) => w._id === product._id)
      ? removeFromWishlist(product._id)
      : addToWishlist(product._id)
  }
  className="cursor-pointer"
>
  {wishlist?.some((w) => w._id === product._id) ? (
    <FaHeart className="w-6 h-6 text-red-500" /> // filled icon
  ) : (
    <Heart className="w-6 h-6 text-stone-700" /> // outline icon
  )}
</button>
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
            className="lg:text-md bg-[#f3eae4] text-[#B67032] p-2 rounded-lg"
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
          <span className="line-through text-stone-600 lg:text-xl">₹{product.price}</span>
          <span className="text-green-600 lg:text-md ">({product.discount}% OFF)</span>
        </>
      )}
    </div>

    <span className="lg:text-md text-stone-700">Inclusive of all taxes</span>
  </div>
  {/* CTA Buttons */}
  <div className="flex flex-col md:flex-row gap-4">
    <button onClick={() => addToCart(product)} className="cursor-pointer w-full flex items-center justify-center gap-2 bg-[#B67032] text-white px-4 py-3 rounded hover:bg-[#a95c2e] transition text-sm font-medium tracking-wide">
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
  <div className="mt-4">
  <div className="flex items-center gap-2 text-stone-800">
    <h3 className="text-lg font-mosetta font-semibold text-[#B67032] tracking-wide">Description</h3>

    



    
  </div>

  {/* Paragraphs */}
  {product.description?.paragraphs?.map((para, idx) => (
    <p key={idx} className="lg:text-md  text-stone-800 mt-2">
      {para}
    </p>
  ))}

  {/* Bullet Points */}
  {product.description?.bulletPoints?.length > 0 && (
    <ul className="list-disc ml-6 lg:text-md text-stone-800  space-y-2">
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
        <h3 className="text-md lg:text-xl font-serif ">Available Colors</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {product.colorVariants.map((v, i) => (
          <button
            key={i}
            className="border px-3 py-1 rounded-full bg-white text-gray-800 hover:bg-[#fff5f0] transition"
          >
            {v.colorName}
          </button>
        ))}
      </div>
    </div>
  )}


{/* Shipping Info Section */}
<div
  className="relative bg-cover md:bg-contain py-4"
  // style={{ backgroundImage: "url('/Images/bg4.png')" }}
>
  {/* Overlay for readability */}
  {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#ffffff1c]"></div> */}

  {/* Content */}
  <div className="relative z-10 grid md:grid-cols-3 mx-auto">
    {cards.map((card, i) => (
      <div
        key={i}
        className="group perspective cursor-pointer"
        onClick={() => toggleFlip(i)}
      >
        <div 
          className={`relative w-full h-52 transition-transform duration-700 preserve-3d ${
            flipped[i] ? "rotate-y-180" : ""
          } md:group-hover:rotate-y-180`}
        >
          {/* Front */}
          <div className="absolute inset-0 flex flex-col items-center justify-end  rounded-2xl backface-hidden p-6 text-center text-white">
            <img
              src={card.img}
              alt={card.frontTitle}
              className="w-24 h-auto object-cover mb-4"
            />
            <h3 className="text-md md:text-lg  font-mosetta text-black tracking-wide">
              {card.frontTitle}
            </h3>
            <p className="mt-2 text-sm text-gray-800">
              {card.frontSubtitle}
            </p>
          </div>

          {/* Back */}
          <div className="absolute inset-0  rounded-2xl backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-end text-white">
{/*            
                 <img
              src={card.img}
              alt={card.frontTitle}
              className="w-24 h-auto object-cover mb-4"
            /> */}
                     <h3 className="text-lg  font-mosetta text-black tracking-wide">
              {card.frontTitle}
            </h3>
            <p className="text-sm leading-relaxed text-gray-800">
              {card.backContent}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>




</div>




    </div>

        {product.category &&  (
  <Similar categoryId={product.category._id} categoryName = {product.category.name}/>
)}
    </div>
   
  );
}
