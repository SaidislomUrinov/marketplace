import { useEffect, useState } from "react";
import { getReq } from "../../utils/reqs";
import { errorMsg } from "../../utils/msg";
import NoData from "../../components/nodata";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading";

function List() {
    const [state, setState] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        getReq('/product/list').then(res => {
            const { data } = res.data;
            setState(data);
        }).catch(() => {
            errorMsg("Failed to fetch categories");
        }).finally(() => {
            setLoad(true);
        });
    }, []);
    const nv = useNavigate();
    return (
        <div className="flex items-center justify-start flex-col w-full">
            {!load && <Loading />}
            {load && !state.length &&
                <div className="flex items-center justify-center w-full h-[60vh] flex-col gap-1">
                    <NoData />
                    <Button onClick={() => nv('#add')}>
                        Add new
                    </Button>
                </div>
            }{load && state?.[0] &&
                <div className="flex items-start flex-col gap-[10px] justify-start w-full">
                    <Button onClick={() => nv('#add')}>
                        Add new
                    </Button>
                </div>
            }
        </div>
    );
}

export default List;