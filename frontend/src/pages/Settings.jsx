import MainLayout from "../layouts/MainLayout";

function Settings() {
  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your account and preferences ⚙️
        </p>

      </div>

      {/* Settings Layout */}
      <div className="grid grid-cols-3 gap-6">

        {/* Left Side */}
        <div className="col-span-2 space-y-6">

          {/* Profile Information */}
          <div className="bg-[#0f172a] border border-white/10 p-6 rounded-3xl">

            <h2 className="text-2xl font-semibold mb-6">
              Profile Information
            </h2>

            <div className="grid grid-cols-2 gap-6">

              <div>
                <label className="block mb-2 text-gray-400">
                  Full Name
                </label>

                <input
                  type="text"
                  defaultValue="Anubhav Garg"
                  className="w-full bg-[#020617] border border-white/10 p-4 rounded-2xl outline-none text-white"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-400">
                  Email Address
                </label>

                <input
                  type="email"
                  defaultValue="anubhav@example.com"
                  className="w-full bg-[#020617] border border-white/10 p-4 rounded-2xl outline-none text-white"
                />
              </div>

            </div>

            <div className="mt-6">

              <label className="block mb-2 text-gray-400">
                Role
              </label>

              <input
                type="text"
                defaultValue="Admin"
                disabled
                className="w-full bg-[#020617] border border-white/10 p-4 rounded-2xl outline-none text-gray-400"
              />

            </div>

            <button className="mt-6 bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition">
              Save Changes
            </button>

          </div>

          {/* Security */}
          <div className="bg-[#0f172a] border border-white/10 p-6 rounded-3xl">

            <h2 className="text-2xl font-semibold mb-6">
              Security
            </h2>

            <div className="space-y-4">

              <input
                type="password"
                placeholder="Current Password"
                className="w-full bg-[#020617] border border-white/10 p-4 rounded-2xl outline-none text-white"
              />

              <input
                type="password"
                placeholder="New Password"
                className="w-full bg-[#020617] border border-white/10 p-4 rounded-2xl outline-none text-white"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-[#020617] border border-white/10 p-4 rounded-2xl outline-none text-white"
              />

            </div>

            <button className="mt-6 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-2xl font-semibold transition">
              Update Password
            </button>

          </div>

        </div>

        {/* Right Side */}
        <div className="space-y-6">

          {/* Profile Card */}
          <div className="bg-[#0f172a] border border-white/10 p-6 rounded-3xl text-center">

            <img
              src="https://ui-avatars.com/api/?name=Anubhav+Garg&size=200"
              alt=""
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />

            <h2 className="text-2xl font-semibold">
              Anubhav Garg
            </h2>

            <p className="text-gray-400 mt-2">
              Full Stack Developer
            </p>

            <button className="mt-6 w-full bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition">
              Change Profile Photo
            </button>

          </div>

          {/* Preferences */}
          <div className="bg-[#0f172a] border border-white/10 p-6 rounded-3xl">

            <h2 className="text-2xl font-semibold mb-6">
              Preferences
            </h2>

            <div className="space-y-4">

              <div className="flex items-center justify-between">

                <span>Email Notifications</span>

                <input type="checkbox" defaultChecked />
              </div>

              <div className="flex items-center justify-between">

                <span>Dark Mode</span>

                <input type="checkbox" defaultChecked />
              </div>

              <div className="flex items-center justify-between">

                <span>Task Reminders</span>

                <input type="checkbox" defaultChecked />
              </div>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Settings;