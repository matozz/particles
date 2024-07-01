import { FC } from "react";
import { useGlobalController } from "./hook";

const GlobalController: FC = () => {
  useGlobalController();

  return null;
};

export default GlobalController;
