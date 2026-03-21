export default function Footer() {
  return (
    <footer className="bg-gray-600 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-4xl font-semibold text-white">
            Quick Decision
          </h2>
          <p className="mt-3 text-lg text-gray-400">
            Build polls. Get opinions. Make smarter decisions faster.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-white text-xl font-medium mb-3">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Features</a></li>
            <li><a href="#" className="hover:text-white">Pricing</a></li>
            <li><a href="#" className="hover:text-white">Use Cases</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white text-xl font-medium mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white text-xl font-medium mb-3">Connect</h3>
          <div className="flex gap-4">
            
            <a href="#" className="hover:text-white transition">
              Github
            </a>
            <a href="#" className="hover:text-white transition">
              Linked
            </a>
            <a href="#" className="hover:text-white transition">
              Instagram
            </a>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Quick Decision. All rights reserved.
      </div>
    </footer>
  );
}