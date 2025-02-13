import { useEffect, useState } from "react";
import { getReq } from "../../utils/reqs";
import Loading from "../../components/loading";

function Add() {
    const [form, setForm] = useState({
        title: '',
        desc: '',
        quantity: 0,
        discount: 0,
        mainImage: '',
        category: '',
        price: 0,
        images: [],
        video: '',
        type: 'simple',
    });
    const [variants, setVariants] = useState([]);
    const [variant, setVariant] = useState({
        open: false,
        title: '',
        price: 0,
        color: '',
        image: 0,
        size: '',
        discount: 0,
    });
    const closeVariant = () => {
        setVariant({ ...variant, open: false, title: '', price: 0, color: '', image: 0, size: '', discount: 0 });
    };
    // 
    const [disabled, setDisabled] = useState(false);
    const [categories, setCategories] = useState(false);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        getReq('/category/list').then(res => {
            const { data } = res.data;
            setCategories(data);
            setLoad(true);
        })
    }, [])
    const submit = async () => { }
    return (
        <div className="flex items-center justify-start flex-col w-full">
            {!load && <Loading />}
            {load &&
                <>
                a
                </>
            }
        </div>
    );
}

export default Add;