import toast from "react-hot-toast"

const errorMsg = (msg = 'Connection error') => {
    toast.error(msg);
};
const successMsg = (msg = 'Successfuly') => {
    toast.success(msg);
};

export { errorMsg, successMsg };