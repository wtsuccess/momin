import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ConnectWallet from "./ConnectWallet";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  return (
    <div className="flex items-center justify-between text-white px-5 py-2">
      <div className="relative">
        <FontAwesomeIcon icon={faGlobe} className="pr-4" size="xl" />
      </div>
      <div className="bg-[#40b126] border-[#198726] px-2 py-1 rounded-[2rem] hover:bg-[#198726]">
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Menu;
