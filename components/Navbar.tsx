import Link from 'next/link';
import { useRouter } from 'next/router';
import Dropdown from './Dropdown';


export const Navbar = () =>{
    
    const router= useRouter();
    const route=router.pathname;

    const categorySlugs = [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology",
    ];
    
    
    return (
        <div className="w-full h-12 bg-gray-950 fixed flex gap-10 pl-10 items-center">
            <Link href="/" className={`duration-300 ${route=== "/" ? "text-gray-500":" text-gray-600"} `}>Breaking</Link>
            <Link href="/search" className={`duration-300 ${route=== "/search" ? "text-gray-500":" text-gray-600"} `}>Search</Link>
            <Dropdown menuLabel={"Categories"} items={categorySlugs} />
        </div>
    )
}
export default Navbar 