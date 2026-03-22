// Footer.jsx

export default function Footer() {
  return (
    <footer className="mt-12 sm:mt-16 md:mt-20 bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-sm sm:text-base">
              QP
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
              Quick Pick
            </h2>
          </div>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            Create polls, gather opinions, and make smarter decisions — instantly.
          </p>
        </div>

        {/* PRODUCT */}
        <div>
          <h3 className="text-white text-xs sm:text-sm font-semibold mb-3 sm:mb-4 uppercase tracking-wide">
            Product
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
            <li><a href="#" className="hover:text-white transition">Features</a></li>
            <li><a href="#" className="hover:text-white transition">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition">Use Cases</a></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-white text-xs sm:text-sm font-semibold mb-3 sm:mb-4 uppercase tracking-wide">
            Company
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
            <li><a href="#" className="hover:text-white transition">About</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-white text-xs sm:text-sm font-semibold mb-3 sm:mb-4 uppercase tracking-wide">
            Connect
          </h3>

          <div className="flex flex-col gap-2 sm:gap-3 text-xs sm:text-sm">
            <a href="https://github.com/AmitKumar-990" className="hover:text-white transition">GitHub</a>
            <a href="https://www.linkedin.com/in/amitgupta44/" className="hover:text-white transition">LinkedIn</a>
            <a href="#" className="hover:text-white transition">Instagram</a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-xs text-gray-400 gap-2">

          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Quick Pick. All rights reserved.
          </p>

          <div className="flex gap-3 sm:gap-4">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}