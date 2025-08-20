import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

type DropdownProps = {
  menuLabel: string;
  items: string[];
};

export default function Dropdown({ menuLabel, items }: DropdownProps) {

  const router = useRouter();
  const title=router.query?.category?.toString()
 
  const [isOpen, setIsOpen]=React.useState(false);
  const itemsElements = items.map((item) => {
    
    return <DropdownMenuItem key={item} className={`${title===item ? "!bg-gray-600" : ""} m-[1px] w-full`}>
      <Link href={`/categories/${item}`}>
        {item}
      </Link>
    </DropdownMenuItem>
});


  return (
    <DropdownMenu onOpenChange={()=>setIsOpen(prev=>!prev)}>
      <DropdownMenuTrigger asChild>
        <button className={`flex items-center gap-1 border-0 cursor-pointer text-gray-600`}>
          {menuLabel}
          {isOpen ? <ChevronUpIcon className="w-4 h-4"/> : <ChevronDownIcon className="w-4 h-4" />}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel >{menuLabel}</DropdownMenuLabel>
        <DropdownMenuGroup>{itemsElements}</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
