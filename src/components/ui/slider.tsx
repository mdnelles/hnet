"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
   React.ElementRef<typeof SliderPrimitive.Root>,
   React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
   <SliderPrimitive.Root
      ref={ref}
      className={cn(
         "relative flex w-full touch-none select-none items-center h-6", // Ensure height is set
         className
      )}
      {...props}
   >
      <SliderPrimitive.Track className='relative h-2 w-full grow overflow-hidden rounded-full bg-gray-300 dark:bg-gray-700'>
         <SliderPrimitive.Range className='absolute h-full bg-blue-500 dark:bg-blue-400' />
      </SliderPrimitive.Track>
      {props.defaultValue?.map((_, index) => (
         <SliderPrimitive.Thumb
            key={index}
            className='block h-5 w-5 rounded-full border-2 border-blue-500 dark:border-blue-400 bg-white dark:bg-gray-800 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
         />
      ))}
   </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
