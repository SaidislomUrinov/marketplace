import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReq } from "./utils/reqs";
import { updateUser } from "./contexts/user";

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
    <div className="flex"></div>
  );
}

export default App;