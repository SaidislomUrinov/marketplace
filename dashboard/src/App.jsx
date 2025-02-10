import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReq } from "./utils/reqs";
import { updateUser } from "./contexts/user";
import Auth from "./components/auth";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar";
import Top from "./components/top";

function App() {
  const dp = useDispatch();
  const { _id } = useSelector(e => e.user);
  const [load, setLoad] = useState();
  useEffect(() => {
    setLoad(false);
    getReq('/admin/verify').then(res => {
      const { data } = res.data;
      dp(updateUser(data));
    }).finally(() => {
      setLoad(true);
    })
  }, []);
  return (
    <div className="flex">
      {!_id && <Auth />}
      {_id && <div className="flex items-start justify-center w-full h-[100vh]">
        {/*  */}
        <Navbar />
        {/*  */}
        <div className="flex items-center justify-start flex-col gap-[10px] w-full lg:w-4/5 h-[100vh]">
          <Top />
          <div className="flex items-center pb-[10px] px-[10px] justify-start flex-col h-[100vh] w-full overflow-y-scroll">
            {/* routes */}
          </div>
        </div>
      </div>}
      <Toaster containerStyle={{ zIndex: '99999' }} toastOptions={{ style: { maxWidth: '600px' } }} />
    </div>
  );
}

export default App;