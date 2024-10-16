import Image from "next/image";
import logo from "../public/icon.jpg";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";

export default function NavBar() {
  return (
    <div className="flex flex-row justify-between items-center p-2">
      <div className="flex flex-row items-center gap-x-2">
        {/* <Image
          src={logo}
          alt="easy-ghclone"
          width={55}
          height={55}
          className="m-0 p-0"
        /> */}
        <div className="text-[20px] font-black">Easy-ghfetch</div>
      </div>
      <div className="flex items-center justify-center gap-x-2 sm:gap-x-4">
        <Link href="https://github.com/webbedpiyush/easy-ghfetchWeb">
        <FaGithub size={30}/>
        </Link>
        <ThemeSwitcher/>
      </div>
    </div>
  );
}
