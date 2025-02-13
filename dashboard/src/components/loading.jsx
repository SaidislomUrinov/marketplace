import { Spinner } from "@material-tailwind/react";

function Loading() {
    return (
        <div className="flex items-center justify-center w-full h-[60vh] flex-col">
            <Spinner className="w-[30px] h-[30px]" />
            <p className="text-blue-gray-800">Retrieving data</p>
        </div>
    );
}

export default Loading;