import { useEffect, useRef, useState } from "react";
import { API, deleteReq, getReq, postReq, putReq } from "../utils/reqs";
import { errorMsg, successMsg } from '../utils/msg';
import Loading from "../components/loading";
import NoData from "../components/nodata";
import { Button, Chip, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input, Menu, MenuHandler, MenuItem, MenuList, Switch, Typography } from "@material-tailwind/react";
import { FaEdit, FaImage, FaTrash } from "react-icons/fa";
import { FaT } from "react-icons/fa6";
import { BiDotsVertical } from "react-icons/bi";
function Categories() {
    const [state, setState] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        getReq('/category/list').then(res => {
            const { data } = res.data;
            setState(data);
        }).catch(() => {
            errorMsg("Failed to fetch categories");
        }).finally(() => {
            setLoad(true);
        });
    }, []);
    const [action, setAction] = useState({
        id: '',
        active: false,
        created: false,
        open: "",
        title: "",
        image: "",
        _id: "",
        newImage: "",
        products: 0
    });
    const [disabled, setDisabled] = useState(false);
    const closeAction = () => setAction({
        id: '',
        active: false,
        created: false,
        open: "",
        title: "",
        image: "",
        _id: "",
        newImage: "",
        products: 0
    });
    const addCategory = async () => {
        try {
            const { title, image } = action;
            setDisabled(true);
            if (!title || !image) {
                throw new Error("Fill all fields");
            }
            const res = await postReq("/category/add", { title, image });
            const { data, msg } = res.data;
            setState(prev => [data, ...prev]);
            closeAction();
            successMsg(msg);
        } catch (e) {
            errorMsg(e?.response?.data?.msg || e.message);
            console.log(e)
        } finally {
            return setDisabled(false);
        }
    };
    const editCategory = async () => {
        try {
            setDisabled(true);
            const { title, newImage, _id } = action;
            if (!title || !_id) {
                throw new Error("Fill all fields");
            }
            const res = await putReq(`/category/update`, { image: newImage || '', title }, { _id });
            const { data, msg } = res.data;
            setState(prev => prev.map(e => e._id === _id ? { ...e, ...data } : e));
            closeAction();
            successMsg(msg);
        } catch (e) {
            errorMsg(e?.response?.data?.msg || e.message);
        } finally {
            return setDisabled(false);
        }
    };
    const deleteCategory = async () => {
        try {
            setDisabled(true);
            const res = await deleteReq(`/category/delete`, { _id: action._id });
            const { msg } = res.data;
            setState(prev => prev.filter(e => e._id !== action._id));
            closeAction();
            successMsg(msg);
        } catch (e) {
            errorMsg(e?.response?.data?.msg || e.message);
        } finally {
            return setDisabled(false);
        }
    };
    const switchStatus = async (_id) => {
        try {
            const res = await putReq(`/category/switchStatus`, {}, { _id });
            const { msg } = res.data;
            setState(prev => prev.map(e => e._id === _id ? { ...e, active: !e.active } : e));
            successMsg(msg);
        } catch (e) {
            errorMsg(e?.response?.data?.msg || e.message);
        } finally {
        }
    };
    // 
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Sichqoncha harakatini kuchaytirish
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };
    return (
        <div className="flex items-center justify-start flex-col w-full">
            {!load && <Loading />}
            {load && !state.length &&
                <div className="flex items-center justify-center w-full h-[60vh] flex-col gap-1">
                    <NoData />
                    <Button onClick={() => setAction({ ...action, open: "add" })}>
                        Add new
                    </Button>
                </div>
            }{load && state?.[0] &&
                <div className="flex items-start flex-col gap-[10px] justify-start w-full">
                    <Button onClick={() => setAction({ ...action, open: "add" })}>
                        Add new
                    </Button>
                    {/*  */}
                    <div
                        ref={scrollRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        className="cursor-grab active:cursor-grabbing flex items-start justify-start w-full overflow-x-scroll flex-col gap-1">
                        {/* struct */}
                        <div className="flex select-none items-center justify-start bg-gradient-to-b from-blue-gray-500 to-blue-gray-900 rounded h-[30px]">
                            {/*  */}
                            <p className="w-[50px] border-r h-full font-semibold text-[14px] text-white flex items-center justify-center">#</p>
                            {/*  */}
                            <p className="w-[50px] border-r h-full font-semibold text-[14px] text-white flex items-center justify-center">ID</p>
                            {/*  */}
                            <p className="w-[200px] border-r h-full font-semibold text-[14px] text-white flex items-center justify-center">TITLE</p>
                            {/*  */}
                            <p className="w-[80px] border-r h-full font-semibold text-[14px] text-white flex items-center justify-center">IMAGE</p>
                            {/*  */}
                            <p className="w-[100px] border-r h-full font-semibold text-[14px] text-white flex items-center justify-center">PRODUCTS</p>
                            {/*  */}
                            <p className="w-[140px] border-r h-full font-semibold text-[14px] text-white flex items-center justify-center">CREATED</p>
                            {/*  */}
                            <p className="w-[100px] h-full font-semibold text-[14px] text-white flex items-center justify-center">STATUS</p>
                        </div>
                        {/* mapping */}
                        {state.map((s, i) => {
                            return (
                                <div key={i} className="flex items-center justify-start bg-white border rounded h-[50px]">
                                    {/*  */}
                                    <div className="w-[50px] border-r h-full flex items-center justify-center">
                                        <Menu placement="bottom-start">
                                            <MenuHandler>
                                                <IconButton variant="text" className="text-[20px]">
                                                    <BiDotsVertical />
                                                </IconButton>
                                            </MenuHandler>
                                            <MenuList className="border border-gray-300">
                                                <MenuItem onClick={() => setAction({
                                                    open: 'edit',
                                                    ...s
                                                })} className="flex items-center justify-start gap-3">
                                                    <FaEdit className="text-cyan-500" />
                                                    Edit
                                                </MenuItem>
                                                <MenuItem onClick={() => setAction({
                                                    open: 'delete',
                                                    ...s
                                                })} className="flex items-center justify-start gap-3">
                                                    <FaTrash className="text-red-500" />
                                                    Delete
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </div>
                                    {/*  */}
                                    <div className="w-[50px] border-r h-full flex items-center justify-center">
                                        <Chip variant="ghost" value={`${s.id}`} />
                                    </div>
                                    {/*  */}
                                    <p className="w-[200px] border-r h-full text-center text-[14px] flex items-center justify-center">
                                        {s.title}
                                    </p>
                                    {/*  */}
                                    <div className="w-[80px] border-r h-full flex items-center justify-center">
                                        <div className="flex items-center justify-center w-[40px] aspect-square overflow-hidden rounded-[10px]">
                                            <img src={API + s?.image} alt="" />
                                        </div>
                                    </div>
                                    {/*  */}
                                    <div className="w-[100px] border-r h-full flex items-center justify-center">
                                        <Chip variant="ghost" value={`${s.products}`} />
                                    </div>
                                    {/*  */}
                                    <p className="w-[140px] border-r h-full text-[14px] flex items-center justify-center">
                                        {s?.created}
                                    </p>
                                    {/*  */}
                                    <div className="w-[100px] h-full flex items-center justify-center">
                                        <Switch checked={s?.active} readOnly onClick={() => switchStatus(s._id)} color="green" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
            {/*  action modal */}
            <Dialog size="sm" open={action.open !== ''}>
                <DialogHeader>
                    <Typography className="flex items-center justify-center gap-1 font-semibold">
                        {action.open === 'add' ? "Add new category" : action.open === 'edit' ? "Edit category" : "Delete category"}
                    </Typography>
                </DialogHeader>
                <DialogBody className="flex items-center justify-start flex-col w-full gap-[10px] border-y">
                    {action.open !== 'delete' ?
                        <>
                            <div className="flex flex-col items-start justify-start gap-[4px] w-full">
                                {/* image */}
                                <label className="flex cursor-pointer items-center overflow-hidden justify-center w-[180px] aspect-square rounded-[10px] border bg-gray-100">
                                    {(!action.image && !action.newImage) ?
                                        <FaImage className="text-[40px]" />
                                        :
                                        action.open === 'edit' ?
                                            !action.newImage ?
                                                <img className="object-cover w-[180px] h-[180px]" src={API + action.image} alt="" />
                                                :
                                                <img className="object-cover w-[180px] h-[180px]" src={URL.createObjectURL(action.newImage)} alt="" />
                                            :
                                            <img className="object-cover w-[180px] h-[180px]" src={URL.createObjectURL(action.image)} alt="" />

                                    }
                                    <input type="file" accept="image/*" onChange={e => action.open === 'add' ? setAction({ ...action, image: e.target.files[0] }) : setAction({ ...action, newImage: e.target.files[0] })} className="hidden" />
                                </label>
                                <label>
                                    <span className="p-[10px_20px] flex items-center justify-center rounded-[8px] bg-black font-semibold text-[12px] text-white active:scale-95 uppercase cursor-pointer duration-200">
                                        {action.open === 'add' ? "Select category image" : "Select new image"}
                                    </span>
                                    <input type="file" accept="image/*" onChange={e => action.open === 'add' ? setAction({ ...action, image: e.target.files[0] }) : setAction({ ...action, newImage: e.target.files[0] })} className="hidden" />
                                </label>
                            </div>
                            {/* title */}
                            <Input label="Title" required onChange={e => setAction({ ...action, title: e.target.value })} value={action.title} icon={<FaT />} />
                        </>
                        :
                        <>
                            <p className="font-semibold text-black w-full">Are you sure you want to delete the category?</p>
                        </>
                    }
                </DialogBody>
                <DialogFooter className="gap-1">
                    <Button onClick={closeAction} variant="text" disabled={disabled}>
                        Close
                    </Button>
                    {action.open !== 'delete' ?
                        <>
                            <Button color="green" onClick={action.open === 'add' ? addCategory : editCategory} loading={disabled}>
                                {action.open === 'add' ? "Add" : "Save"}
                            </Button>
                        </>
                        :
                        <Button color="red" onClick={deleteCategory} loading={disabled}>
                            yes delete
                        </Button>
                    }
                </DialogFooter>
            </Dialog>
        </div>
    );
}

export default Categories;