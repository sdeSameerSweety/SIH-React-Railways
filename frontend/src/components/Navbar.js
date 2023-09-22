import React from "react";
import {AiFillLock} from "react-icons/ai";
import {FiHelpCircle} from "react-icons/fi";
const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-[100%] pl-[2%] pt-[1%] pr-[2%] pb-[1%] border-b-2 border-gray-300">
      <div className="left-div flex justify-center items-center gap-8">
        <img src="/assets/images/railwaysLogo.png" className="w-16" />
        <div className="text-2xl font-bold font-ubuntu">IRCTC</div>
      </div>
      <div className="flex justify-center items-center gap-10">
        <div className="button">
          <div
            href="#_"
            class="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
          >
            <span class="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span class="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span class="relative z-20 flex items-center text-sm gap-2">
             <AiFillLock/>
              SIGN IN
            </span>
          </div>
        </div>

        <div className="button">
          <div
            href="#_"
            class="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
          >
            <span class="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span class="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span class="relative z-20 flex items-center text-sm gap-2">
              <FiHelpCircle/>
              Need help ?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
