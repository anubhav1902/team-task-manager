import {
  Bell,
  Search,
} from "lucide-react";

function Navbar() {
  return (
    <div className="flex items-center justify-between mb-8">

      {/* Left */}
      <div>

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome back, Anubhav 👋
        </p>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="hidden md:flex items-center gap-3 bg-[#0f172a] border border-white/10 px-4 py-3 rounded-2xl">

          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-white placeholder:text-gray-500"
          />

        </div>

        {/* Notification */}
        <button className="relative bg-[#0f172a] border border-white/10 p-3 rounded-2xl hover:bg-white/5 transition">

          <Bell size={20} />

          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>

        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 bg-[#0f172a] border border-white/10 px-3 py-2 rounded-2xl">

          <img
            src="https://ui-avatars.com/api/?name=Anubhav+Garg"
            alt=""
            className="w-10 h-10 rounded-full"
          />

          <div className="hidden md:block">

            <h3 className="font-semibold">
              Anubhav
            </h3>

            <p className="text-xs text-gray-400">
              Admin
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Navbar;