import { IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { BiLogOut, BiSolidDashboard } from "react-icons/bi";
import { FaBars, FaBox, FaCreditCard, FaSearch, FaShoppingCart, FaTruck } from "react-icons/fa";
import { FaBoxesStacked, FaGear, FaXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
function NavLink({ path = '', name = '', icon }) {
    const p = useLocation().pathname;
    const Icon = icon
    return (
        <Link className={`flex rounded-[10px] px-[10px] ${p === path ? 'text-white bg-black' : 'text-blue-gray-400'} text-[14px] items-center group justify-start gap-[20px] w-full min-h-[40px]`} to={path}>
            <Icon className="text-[20px] group-hover:mr-[15px] duration-300" />
            <span className="capitalize">{name}</span>
        </Link>
    )
}
function Navbar() {
    const [open, setOpen] = useState(false);
    const { username } = useSelector(e => e.user);
    const p = useLocation().pathname;
    useEffect(() => {
        setOpen(false);
    }, [p]);
    return (
        <>
            <div className={`flex items-center z-[3] justify-start duration-300 flex-col gap-[10px] w-[300px] lg:w-1/5 p-[10px] bg-white h-[100vh] fixed lg:relative top-0 ${open ? 'left-0' : 'left-[-300px] lg:left-0'}`}>
                {/*  */}
                <div className="flex items-center min-h-[50px] h-[50px] justify-between w-full relative bg-gray-50 p-[5px] rounded-[10px]">
                    <div className="flex items-center justify-center gap-1">
                        <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-gradient-to-b from-blue-400 to-blue-900">
                            <p className="text-white text-[20px] uppercase font-bold">{username?.[0]}</p>
                        </div>
                        <p className="text-[14px] uppercase font-bold">{username}</p>
                    </div>
                    {/*  */}
                    <div className={`absolute ${open ? 'right-[5px]' : 'right-[-60px]'} lg:hidden duration-300`}>
                        <IconButton onClick={() => setOpen(!open)}>
                            {!open ? <FaBars /> : <FaXmark />}
                        </IconButton>
                    </div>
                    {/*  */}
                </div>
                {/*  */}
                <div className={`flex select-none items-center justify-start gap-[10px] py-[5px] border-t flex-col w-full h-[100vh] overflow-y-scroll`}>
                    <NavLink path={'/'} name={"Dashboard"} icon={BiSolidDashboard} />
                    <NavLink path={'/orders'} name={"orders"} icon={FaShoppingCart} />
                    <NavLink path={'/search-order'} name={"search order"} icon={FaBox} />
                    <NavLink path={'/products'} name={"products"} icon={FaBoxesStacked} />
                    <NavLink path={'/shipping'} name={"shipping"} icon={FaTruck} />
                    <NavLink path={'/payments'} name={"payments"} icon={FaCreditCard} />
                    <NavLink path={'/users'} name={"users"} icon={FaBoxesStacked} />
                    <NavLink path={'/search-user'} name={"search user"} icon={FaSearch} />
                    <NavLink path={'/settings'} name={"settings"} icon={FaGear} />
                    <NavLink path={'/logout'} name={"logout"} icon={BiLogOut} />
                </div>
                {/*  */}
            </div>
            {/* closer */}
            <div onClick={() => setOpen(false)} className={`left-0 h-[100vh] z-[2] bg-[#0009] fixed top-0 duration-300 ${open ? 'w-full' : 'w-0'} lg:hidden`}></div>
        </>
    );
}

export default Navbar;