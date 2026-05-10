import { Leaf, ShoppingCart, User, Search, Headphones, Truck, Shield, Star } from 'lucide-react';

export default function App() {
  const topSellingPlants = [
    {
      name: "Monstera Deliciosa",
      price: "₹45.00",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1757912156751-c1d0f9f6bf45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=280"
    },
    {
      name: "Snake Plant",
      price: "₹32.00",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1757912156949-d1e2bd25bc52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=280"
    },
    {
      name: "Variegated Pothos",
      price: "₹38.00",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1757912157357-2fc30b93e2f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=280"
    },
    {
      name: "Dragon Scale Alocasia",
      price: "₹52.00",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1757912157676-590e84bfd5ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=280"
    },
    {
      name: "Zebra Plant",
      price: "₹28.00",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1757912157304-82d55b678717?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=280"
    },
    {
      name: "Philodendron",
      price: "₹42.00",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1757912156797-a2fea8c424b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=280"
    }
  ];

  const featuredPlants = [
    {
      name: "Peace Lily",
      description: "Air-purifying beauty",
      image: "https://images.unsplash.com/photo-1757912157970-dd4161976396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=210"
    },
    {
      name: "Rubber Plant",
      description: "Bold & resilient",
      image: "https://images.unsplash.com/photo-1757912157733-c8439a34997a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-emerald-500" />
              <span className="text-xl font-semibold">Earth's Exhale</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-300 hover:text-white transition">Home</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Shop</a>
              <a href="#" className="text-gray-300 hover:text-white transition">About</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Contact</a>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition">
                <User className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <span className="text-emerald-400 text-sm">Welcome to our green sanctuary</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Earth's<br />
              <span className="text-emerald-500">Exhale</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Transform your space with nature's finest. We bring you carefully curated houseplants
              that purify your air and elevate your living environment.
            </p>
            <div className="flex gap-6 mb-12">
              <div>
                <div className="text-3xl font-bold text-emerald-500">500+</div>
                <div className="text-gray-400 text-sm">Plant Varieties</div>
              </div>
              <div className="border-l border-gray-800 pl-6">
                <div className="text-3xl font-bold text-emerald-500">10K+</div>
                <div className="text-gray-400 text-sm">Happy Customers</div>
              </div>
              <div className="border-l border-gray-800 pl-6">
                <div className="text-3xl font-bold text-emerald-500">98%</div>
                <div className="text-gray-400 text-sm">Satisfaction Rate</div>
              </div>
            </div>
            <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-medium transition">
              Explore Collection
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
              <img
              src="https://images.unsplash.com/photo-1757912156970-2f39bb27f32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=560.6"
              alt="Featured plant"
              className="relative rounded-2xl w-[378px] h-[560.6px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">The Botanical Breathtakers</h2>
          <p className="text-gray-400">Handpicked selections for the discerning plant parent</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredPlants.map((plant, idx) => (
            <div key={idx} className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-8 hover:border-emerald-500/50 transition">
              <div className="flex items-center gap-6">
                <img src={plant.image} alt={plant.name} className="w-32 h-32 object-cover rounded-xl" />
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{plant.name}</h3>
                  <p className="text-gray-400 mb-4">{plant.description}</p>
                  <button className="text-emerald-500 hover:text-emerald-400 font-medium">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Selling Plants */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Top Selling Plants</h2>
          <p className="text-gray-400">Customer favorites that bring life to any space</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {topSellingPlants.map((plant, idx) => (
            <div key={idx} className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition group">
              <div className="relative overflow-hidden bg-gray-800/50">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                />
                <button className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur rounded-full hover:bg-emerald-500/20">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(plant.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}`} />
                  ))}
                  <span className="text-sm text-gray-400 ml-2">{plant.rating}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{plant.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-emerald-500">{plant.price}</span>
                  <button className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white rounded-lg transition font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Service */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headphones className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-400">Expert plant care advice anytime you need it</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-400">Safe shipping to ensure your plants arrive healthy</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">100% Secure</h3>
            <p className="text-gray-400">Safe payment processing for your peace of mind</p>
          </div>
        </div>
      </section>

      {/* Featured Product */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-3xl p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-emerald-500 font-medium mb-2 block">Featured This Month</span>
              <h2 className="text-5xl font-bold mb-6">Our Best of..!</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                The Dragon Scale Alocasia features stunning textured leaves that resemble dragon scales.
                This rare beauty is perfect for collectors and makes a bold statement in any room.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-300">Low maintenance & beginner-friendly</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-300">Thrives in indirect sunlight</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-300">Natural air purifier</span>
                </li>
              </ul>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-emerald-500">₹52.00</span>
                <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-medium transition">
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
              <img
                src="https://images.unsplash.com/photo-1757912156970-2f39bb27f32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=560.6"
                alt="Featured Dragon Scale Alocasia"
                className="relative rounded-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-6 h-6 text-emerald-500" />
                <span className="text-lg font-semibold">Earth's Exhale</span>
              </div>
              <p className="text-gray-400 text-sm">
                Bringing nature's beauty into your home, one plant at a time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">All Plants</a></li>
                <li><a href="#" className="hover:text-white transition">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition">Best Sellers</a></li>
                <li><a href="#" className="hover:text-white transition">Sale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Plant Care Guide</a></li>
                <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition">Returns</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Sustainability</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 Earth's Exhale. Committed to environmental sustainability.
            </p>
            <div className="flex gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}