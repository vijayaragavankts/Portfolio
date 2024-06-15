import { Html } from "@react-three/drei";
import { Spin } from "antd";
const Loader = () => {
  return (
    <Html>
      <div className="flex justify-center items-center">
        {/* <div className="w-20 h-20 border-2 border-opacity-20 border-blue-500 rounded-full animate-spin"></div> */}
        <Spin size="large" align="center" />
      </div>
    </Html>
  );
};

export default Loader;
