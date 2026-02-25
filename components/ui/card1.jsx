// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { StarIcon } from "lucide-react"
// export default function CardProduct(pro) {
//   return (
//       <Card className="w-60">
//         <CardContent className="p-3">
//           <div className="aspect-square rounded-md bg-gray-100 h- mb-2">
//             <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
//               Product Image
//             </div>
//           </div>
//           <CardTitle className="text-sm mb-1">{pro.product_title}</CardTitle>
//           <CardDescription className="text-xs mb-2 line-clamp-2">
//             {pro.product_description}
//           </CardDescription>
//           <div className="flex items-center justify-between">
//             <span className="text-sm font-bold">{pro.product_price}</span>
//             {/* <Button size="sm" className="text-xs px-2 py-1 h-7">Place Bid</Button> */}
//           </div>
//         </CardContent>
//       </Card>
//   )
// }
"use client";

export default function CardProduct() {
        const data = {
      title: "Noteworthy technology",
      description:
        "Here are the biggest enterprise technology acquisitions of 2025 so far, in reverse chronological order.",
      image: "/docs/images/blog/image-1.jpg",
      link: "",
      buttonText: "Read more",
    };
  return (
    <div className="aspect-square max-w-sm w-60 h-80 justify-between bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition">
      <div className="rounded-md w-full h-1/3 bg-gray-100  mb-2"></div>
      <div className="p-5 flex flex-col justify-evenly">
      <div>
          <h5 className="mb-2 text-md md:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {data.title}
          </h5>
      </div>
        <div>Hello</div>
          <div>
            {data.buttonText}
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
          </div>
      </div>
    </div>
  );
}
