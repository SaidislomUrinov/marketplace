import { FaSadTear } from "react-icons/fa";

function NoData() {
    return (
        <div className="flex items-center justify-center w-full h-[60vh] flex-col">
            <FaSadTear className="text-blue-gray-600 text-[50px]" />
            <p className="text-black font-semibold">No data available</p>
        </div>
    );
}

export default NoData;