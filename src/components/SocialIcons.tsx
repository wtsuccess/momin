import React from "react";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SocialIcons = () => {
  return (
    <nav>
      <ul className="text-white px-1 rounded-3xl hidden bg-[#ff7700] py-[14px] sm:inline-block">
        <li className="py-3 px-2">
          <FontAwesomeIcon icon={faGlobe} size="xl" />
        </li>
        <li className="py-3 px-2">
          <FontAwesomeIcon icon={faTwitter} size="xl" />
        </li>
        <li className="py-3 px-2">
          <FontAwesomeIcon icon={faPaperPlane} size="xl" />
        </li>
        <li className="py-3 px-2">
          <FontAwesomeIcon icon={faGithub} size="xl" />
        </li>
      </ul>
    </nav>
  );
};

export default SocialIcons;
