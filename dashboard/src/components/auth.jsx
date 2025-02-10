import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { FaAt, FaEye, FaEyeSlash } from "react-icons/fa";
import { errorMsg, successMsg } from "../utils/msg";
import { postReq } from "../utils/reqs";
import { useDispatch } from "react-redux";
import { updateUser } from "../contexts/user";

function Auth() {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [disabled, setDisabled] = useState(false);
    const dp = useDispatch();
    const submit = async () => {
        try {
            if (!form.password || !form.username) {
                throw new Error("Fill the rows");
            }
            setDisabled(true);
            const res = await postReq('/admin/signin', form);
            const { data, access, msg } = res.data;
            localStorage.setItem('access', access);
            successMsg(msg);
            setTimeout(() => {
                dp(updateUser(data));
            }, 500);
        } catch (e) {
            errorMsg(e?.response?.data?.msg || e.message);
        } finally {
            setDisabled(false);
        }
    };
    const [openPass, setOpenPass] = useState(false);
    return (
        <div className="flex items-center justify-center flex-col w-full h-[100vh]">
            <div className="flex shadow-md items-center justify-start flex-col w-[90%] sm:w-[500px] rounded-[20px] gap-[10px] p-[20px] bg-white">
                {/*  */}
                <p className="font-semibold text-[20px] uppercase">Login</p>
                {/* username */}
                <Input required variant="standard" label="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value.trim().toLowerCase() })} icon={<FaAt />} />
                {/* password */}
                <Input required type={openPass ? 'text' : 'password'} variant="standard" label="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} icon={!openPass ? <FaEye className="cursor-pointer" onClick={() => setOpenPass(true)} /> : <FaEyeSlash className="cursor-pointer" onClick={() => setOpenPass(false)} />} />
                {/* action */}
                <Button className="w-full" onClick={submit} loading={disabled}>Submit</Button>
            </div>
        </div>
    );
}

export default Auth;