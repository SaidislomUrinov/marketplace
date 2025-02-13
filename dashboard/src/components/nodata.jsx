import { FaSadTear } from "react-icons/fa";

function NoData() {
    return (
        <div className="flex items-center justify-center w-full flex-col">
            <FaSadTear className="text-[50px]" />
            <p className="text-blue-gray-800 font-semibold">No data available</p>
        </div>
    );
}

export default NoData;