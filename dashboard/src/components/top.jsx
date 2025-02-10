import { useLocation } from "react-router-dom";
const links = {
    dashboard: 'Dashboard',
    orders: 'orders',
    'search-order': 'search-order',
    products: 'products',
    shipping: 'shipping',
    payments: 'payments',
    users: 'users',
    'search-user': 'search-user',
    settings: 'settings',
    logout: 'logout',
}
function Top() {
    const p = useLocation().pathname?.replace('/', '');
    return (
        <div className="flex items-center justify-end lg:justify-start w-full bg-white h-[70px] min-h-[70px] px-[10px]">
            <p className="uppercase font-bold text-[22px]">{!p ? links?.['dashboard'] : links?.[p]}</p>
        </div>
    );
}

export default Top;