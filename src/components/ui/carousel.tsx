import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageOff } from "lucide-react";

interface CarouselProps {
   images: string[];
}

export function Carousel({ images }: CarouselProps) {
   const [currentIndex, setCurrentIndex] = useState(0);

   const validImages = images.filter((img) => !img.includes("noImage"));

   const goToNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % validImages.length);
   };

   const goToPrevious = () => {
      setCurrentIndex(
         (prevIndex) =>
            (prevIndex - 1 + validImages.length) % validImages.length
      );
   };

   if (validImages.length === 0) {
      return (
         <div className='relative w-full max-w-[365px] sm:max-w-[600px] lg:max-w-[1200px] mx-auto px-2 sm:px-4 h-[300px] sm:h-[400px] lg:h-[500px] bg-muted flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-400'>
            <ImageOff className='w-24 h-24 text-gray-400 mb-4' />
            <span className='text-lg sm:text-xl font-medium text-muted-foreground'>
               No Images Available
            </span>
         </div>
      );
   }

   return (
      <div className='w-full max-w-[365px] sm:max-w-[600px] lg:max-w-[1200px] mx-auto px-2 sm:px-4'>
         <div className='relative w-full aspect-video group rounded-lg overflow-hidden'>
            <Image
               src={validImages[currentIndex] || "/placeholder.svg"}
               alt={`Property image ${currentIndex + 1}`}
               fill
               className='object-cover rounded-lg'
               priority={currentIndex === 0}
            />

            {/* Navigation Buttons */}
            <Button
               variant='ghost'
               size='icon'
               className='absolute left-2 top-1/2 -translate-y-1/2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity bg-black/50 text-white hover:bg-black/70'
               onClick={goToPrevious}
               aria-label='Previous image'
            >
               <ChevronLeft className='h-6 w-6' />
            </Button>

            <Button
               variant='ghost'
               size='icon'
               className='absolute right-2 top-1/2 -translate-y-1/2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity bg-black/50 text-white hover:bg-black/70'
               onClick={goToNext}
               aria-label='Next image'
            >
               <ChevronRight className='h-6 w-6' />
            </Button>

            {/* Image Counter */}
            <div className='absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm'>
               {currentIndex + 1} / {validImages.length}
            </div>
         </div>

         {/* Thumbnail Strip */}
         <div className='flex justify-center space-x-2 overflow-x-auto px-2 py-2 sm:px-0'>
            {validImages.map((image, index) => (
               <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-md overflow-hidden ${
                     currentIndex === index ? "ring-2 ring-primary" : ""
                  }`}
                  aria-label={`View image ${index + 1}`}
               >
                  <Image
                     src={image || "/placeholder.svg"}
                     alt={`Thumbnail ${index + 1}`}
                     fill
                     className='object-cover'
                  />
               </button>
            ))}
         </div>
      </div>
   );
}
