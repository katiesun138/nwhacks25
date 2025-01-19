import { twMerge } from "tailwind-merge";

export default function BentoGrid({
    items
}:{
    items: React.ReactNode[]
} ) {
    return (
      <div className="flex flex-col sm:grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        {items.map((item, index) => (
            <BentoItem
            key={index}
            className={
                index === 0 ? "col-span-3" :
                index === 1 ? "col-span-2" :
                index === 2 ? "row-span-2" :
                index === 5 ? "row-span-2 col-span-2" :
                index === 6 ? "col-span-2" : ""
            }
            >
            {item}
            </BentoItem>
        ))}
      </div>
    );
}


function BentoItem({
    children,
    className,
}:{
    children?: React.ReactNode
    className?: string
}) {
    return <div className={twMerge(`border-2 border-zinc-400 rounded-lg p-4 min-h-[250px] ` + className)}>{children}</div>
}