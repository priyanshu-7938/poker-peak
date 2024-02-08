import { socketInit } from "@/socket";
import { useMemo } from "react";

const useSocket = () => {
  return useMemo(() => socketInit, []); // avoids reload everytime the state changes
};

export default useSocket;