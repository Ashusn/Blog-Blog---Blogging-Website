import { Circle } from "./BlogCard";

export const BlogSkeleton = () => {
  return (
    <div>
      <div role="status" className=" animate-pulse">
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
      <div className="flex">
        
      <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div>
        
       
      <div className="h-2.5 bg-gray-200 rounded-full "></div>
      <div className="h-2.5 bg-gray-200 rounded-full "></div>
        <div className="flex pl-2 justify-center flex-col"></div>
        <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">  <div className="h-2.5 bg-gray-200 rounded-full "></div></div>
        
      </div>
      <div className="text-xl font-semibold pt-2">  <div className="h-2.5 bg-gray-200 rounded-full "></div></div>
      <div className="text-md font-thin">  <div className="h-2.5 bg-gray-200 rounded-full "></div></div>
      <div className=" text-slate-400 text-sm font-thin pt-4">  <div className="h-2.5 bg-gray-200 rounded-full "></div></div>
      
    </div>
      
        
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
