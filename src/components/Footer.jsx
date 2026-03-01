import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-zinc-800 bg-zinc-950 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center space-y-3">
        <p className="text-zinc-500 text-sm flex items-center justify-center gap-2">
          يا رب يوسف يخلص جيش على خير
          <FaHeart className="text-red-500 animate-pulse" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
