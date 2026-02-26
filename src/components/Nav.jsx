import { TbMilitaryRankFilled } from "react-icons/tb";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Nav = () => {
  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 py-4">
      <div className="max-w-7xl mx-auto flex justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-600/20 text-emerald-500 text-xl">
            <TbMilitaryRankFilled />
          </div>
          <h1 className="text-white text-lg md:text-xl font-bold tracking-wide">
            عداد خدمتي العسكرية
          </h1>
        </div>

        <div className="flex gap-3 items-center justify-center">
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-4 py-2 rounded-xl transition duration-200 shadow-lg shadow-emerald-600/20 cursor-pointer">
            عن المشروع
          </button>

          <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-4 py-2 rounded-xl transition duration-200 shadow-lg shadow-emerald-600/20 cursor-pointer">
            إعادة تعيين
          </button>
          <a
            href="https://github.com/YoussifHassan8"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="relative text-zinc-400 text-[28px] hover:text-white transition-colors duration-300" />
          </a>
          <a
            href="https://www.linkedin.com/in/youssif-hassan-702082254/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="relative text-zinc-400 text-[28px] hover:text-blue-400 transition-colors duration-300" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
