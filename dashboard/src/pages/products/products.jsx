import { useLocation } from "react-router-dom";
import List from "./list";
import Add from "./add";

function Products() {
    const h = useLocation().hash;
    return (
        <>
            {!h && <List />}
            {h === '#add' && <Add />}
        </>
    );
}

export default Products;