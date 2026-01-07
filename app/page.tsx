"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] text-gray-800 font-sans">

      {/* NAVBAR */}
      <nav className="w-full bg-white/90 backdrop-blur shadow-sm px-8 py-0 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2">
          <img src="/images/logo-try.png" alt="Outfit Library" className="h-20 w-auto" />
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#features" className="hover:text-[#D7263D] transition">Features</a>
          <a href="#how" className="hover:text-[#D7263D] transition">How It Works</a>
          <a href="#community" className="hover:text-[#D7263D] transition">Community</a>
          <button className="bg-[#D7263D] text-white px-5 py-2 rounded-lg shadow hover:bg-[#B81F33] transition">
            Sign Up
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="px-8 lg:px-20 py-20 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">

        {/* Soft Background Pattern */}
        <div className="absolute left-0 top-0 w-40 h-40 bg-yellow-400 rounded-full opacity-20 blur-2xl" />
        <div className="absolute right-10 bottom-10 w-64 h-64 bg-red-300 rounded-full opacity-20 blur-3xl" />

        <div className="flex-1 relative z-10">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-[#046A38]">
            Your Wardrobe, Your <br />
            <span className="text-[#D7263D]">Style Assistant.</span>
          </h1>

          <p className="text-gray-700 mb-8 max-w-lg text-lg">
            Upload your wardrobe and let AI recommend outfits for any event—effortlessly.
          </p>

          <div className="flex gap-4">
            <button className="bg-[#D7263D] text-white px-6 py-3 rounded-lg shadow hover:bg-[#B81F33] transition">
              Find Your Next Outfit
            </button>
            <button className="bg-[#046A38] text-white px-6 py-3 rounded-lg shadow hover:bg-[#034E2A] transition">
              Upload Wardrobe
            </button>
          </div>
        </div>

        <div className="flex-1 relative z-10">
          <img
            src="/images/hero-image.png"
            alt="Event Outfits"
            className="rounded-xl shadow-xl border border-gray-300"
          />
        </div>
      </section>

        {/* Brand Story & Purpose Section */}
        <section className="w-full bg-black text-white px-8 lg:px-20 py-20 flex items-center gap-10">
          <div className="w-[30%] border-[#D7263D] border-4 rounded-lg p-1">
            <img src="/images/Vedorahat1.jpg" alt="Vedora Hat" />
          </div>
          <div className="max-w-4xl mx-auto text-center w-[60%] relative overflow-hidden rounded-xl">
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="https://v1.pinimg.com/videos/mc/720p/d5/7a/c6/d57ac6c2bacf231bf1c9f8a5b5ab34f1.mp4" type="video/mp4" />
            </video>
            {/* <div className="absolute inset-0 bg-black/40"></div> */}
            <div className="relative z-10 p-10 text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Our Story & Purpose
              </h2>

              <p className="text-gray-300 leading-relaxed text-lg mb-8 text-left bg-[rgba(222,221,221,0.1)] p-8 rounded-lg">
                Outfit Library was created to help people dress with confidence, 
                without the stress of “What should I wear?”  
                Whether it’s a wedding, birthday, office event, or a casual outing, 
                we believe choosing the right outfit should feel effortless.
              </p>

              <p className="text-gray-300 leading-relaxed text-lg mb-8 text-left bg-[rgba(222,221,221,0.1)] p-8 rounded-lg">
                Beyond styling, we help you organize your wardrobe digitally, making it easier to keep track of what you own, what you love, and what to wear next.
              </p>

              <p className="text-gray-300 leading-relaxed text-lg text-left bg-[rgba(222,221,221,0.1)] p-8 rounded-lg">
                With AI-powered recommendations, Outfit Library becomes your personal stylist,  
                guiding you with outfit ideas, color suggestions, and event-ready looks tailored just for you.
              </p>
            </div>
          </div>
        </section>
      {/* Digital Wardrobe Preview Section */}
        <section className="w-full px-8 lg:px-20 py-16 bg-green-50">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Your Digital Wardrobe
          </h2>
          <p className="text-gray-600 max-w-lg mb-10">
            Organize, tag, and access your outfits from anywhere. Upload new pieces,
            browse categories, and let your wardrobe come alive.
          </p>

          {/* Horizontal Scroll Container */}
          <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">

            {/* Upload Item Card */}
            <div className="min-w-[200px] h-[240px] bg-white border border-gray-200 rounded-xl 
              flex flex-col items-center justify-center shadow-sm hover:shadow-md transition">
              <div className="text-4xl text-green-600 mb-3">＋</div>
              <p className="text-gray-700 font-medium">Upload Item</p>
            </div>

            {/* Closet Grid Card */}
            <div className="min-w-[260px] h-[240px] bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
              <h3 className="font-semibold mb-3 text-gray-800">Closet Grid</h3>

              <div className="grid grid-cols-3 gap-2">
                <div className="h-16 bg-gray-200 rounded"><img className="h-full w-full object-cover" src="images/brown_dress.png" alt="" /></div>
                <div className="h-16 bg-gray-200 rounded"><img className="h-full w-full object-cover" src="images/Gold_shoes.jpg" alt="" /></div>
                <div className="h-16 bg-gray-200 rounded"><img className="h-full w-full object-cover" src="images/Bangles.jpg" alt="" /></div>
                <div className="h-16 bg-gray-200 rounded"><img className="h-full w-full object-cover" src="images/purse.jpg" alt="" /></div>
                <div className="h-16 bg-gray-200 rounded"><img className="h-full w-full object-cover" src="images/Jean.jpg" alt="" /></div>
                <div className="h-16 bg-gray-200 rounded"><img className="h-full w-full object-cover" src="images/Top.jpg" alt="" /></div>
              </div>
            </div>

            {/* Categories Card */}
            <div className="min-w-[220px] h-[240px] bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
              <h3 className="font-semibold mb-3 text-gray-800">Categories</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Tops</li>
                <li>• Gowns</li>
                <li>• Shoes</li>
                <li>• Bags</li>
                <li>• Accessories</li>
              </ul>
            </div>

            {/* Tagging Feature Card */}
            <div className="min-w-[240px] h-[240px] bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
              <h3 className="font-semibold text-gray-800 mb-3">Smart Tagging</h3>

              <div className="space-y-2">
                <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">
                  Wedding
                </span>
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                  Casual
                </span>
                <span className="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs">
                  Ankara
                </span>
              </div>

              <p className="text-gray-600 text-sm mt-4">
                Tags help AI match outfits to your events.
              </p>
            </div>

          </div>
        </section>

      {/* AI Styling Engine Section */}
<section className="w-full relative px-8 lg:px-20 py-20 overflow-hidden">

  {/* Soft Background Pattern */}
  <div className="absolute -left-10 -top-10 w-40 h-40 bg-yellow-400 rounded-full opacity-20 blur-2xl" />
  <div className="absolute right-0 bottom-0 w-64 h-64 bg-red-300 rounded-full opacity-20 blur-3xl" />

  <div className="relative z-10 max-w-5xl mx-auto p-10 lg:p-20 rounded-3xl bg-[#FFF8F0] text-gray-700">

    {/* Heading */}
    <h2 className="text-3xl lg:text-4xl font-bold mb-6">
      AI Styling Engine — Tailored For Every Event
    </h2>

    <p className="text-gray-700 max-w-2xl mb-12">
      Our intelligent styling engine analyzes your wardrobe, the event type,
      dress code, color harmony, and even cultural expectations to generate
      perfect outfit combinations — effortlessly.
    </p>

    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
  
      <div className="bg-green-50 p-6 rounded-xl">
        <img 
          src="/images/Wedding.png" 
          alt="Weddings" 
          className="w-full h-40 object-cover rounded-lg mb-3" 
        />
        <h3 className="font-semibold text-lg mb-2 text-gray-700">Weddings</h3>
        <p className="text-gray-700 text-sm">
          AI recommends elegant & culturally appropriate looks.
        </p>
      </div>

      <div className="bg-green-50 p-6 rounded-xl">
        <img 
          src="/images/Work.png" 
          alt="Office / Corporate" 
          className="w-full h-40 object-cover rounded-lg mb-3" 
        />
        <h3 className="font-semibold text-lg mb-2 text-gray-700">Office / Corporate</h3>
        <p className="text-gray-700 text-sm">
          Smart, polished outfits based on workplace formalities.
        </p>
      </div>

      <div className="bg-green-50 p-6 rounded-xl">
        <img 
          src="/images/Date.png" 
          alt="Date Nights" 
          className="w-full h-40 object-cover rounded-lg mb-3" 
        />
        <h3 className="font-semibold text-lg mb-2 text-gray-700">Date Nights</h3>
        <p className="text-gray-700 text-sm">
          Flattering, stylish combinations that fit your vibe.
        </p>
      </div>

    </div>

    {/* Example Event Demo */}
    <div className="mt-10 bg-[#F7EFE8] p-10 rounded-2xl flex flex-col lg:flex-row gap-10 items-center">

      {/* Left Side */}
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-4 text-gray-700">Example Event</h3>

        <p className="text-gray-700">
          <span className="font-semibold">Event:</span> Wedding — Color theme: Blush Pink & Gold
        </p>

        <p className="text-gray-700 mt-2">
          <span className="font-semibold">Your Wardrobe:</span> Chocolate gown, gold heels, pearl earrings
        </p>

        <p className="text-gray-700 mt-2">
          <span className="font-semibold">AI Suggestion:</span>
          Elegant fitted chocolate gown + gold heels + pearl accessories.
        </p>

        <button className="mt-6 px-6 py-3 rounded-lg bg-[#046A38] hover:bg-[#034E2A] transition text-white">
          Try AI Styling →
        </button>
      </div>

      {/* Right Side: Mockup */}
      <div className="flex-1 flex justify-center">
        <div className="bg-[#E8E1DA] w-64 rounded-xl text-gray-700">
          <h3>Outfit Mockup Preview</h3>
          <div className="w-full h-full">
          <img className="w-full object-cover rounded-xl" src="images/complete_image1.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/* Patterned Highlight Section */}
<section className="relative px-8 lg:px-20 py-20 bg-[#FFF8F0] overflow-hidden">
  {/* African-pattern background */}
  <div className="absolute inset-0 opacity-10 bg-[url('/images/african-pattern.svg')] bg-repeat" />

  <div className="relative z-10 max-w-6xl mx-auto text-center">
    <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-[#046A38]">
      Why Outfit Library Stands Out
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md">
        <img src="/images/digital_wardrobe.png" alt="Digital Wardrobe" className="mx-auto mb-4 w-20 h-16 rounded-full shadow-amber-300" />
        <h3 className="font-semibold text-lg mb-2 text-[#046A38]">Digital Wardrobe</h3>
        <p className="text-gray-700 text-sm">
          Organize, tag, and manage your outfits effortlessly.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md">
        <img src="/images/ai_generated.png" alt="AI Styling" className="mx-auto mb-4 w-30 h-16 rounded-full shadow-amber-300" />
        <h3 className="font-semibold text-lg mb-2 text-[#046A38]">AI Styling</h3>
        <p className="text-gray-700 text-sm">
          Personalized outfit recommendations based on event & style.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md">
        <img src="/images/style.png" alt="Style & Fashion" className="mx-auto mb-4 w-30 h-16 rounded-full shadow-amber-300" />
        <h3 className="font-semibold text-lg mb-2 text-[#046A38]">Style & Fashion</h3>
        <p className="text-gray-700 text-sm">
          Look stylish effortlessly with AI-curated combinations.
        </p>
      </div>
    </div>
  </div>
</section>

{/* Outfit Generator Showcase */}
<section className="px-8 lg:px-20 py-20 bg-[#F7EFE8] relative overflow-hidden">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-[#046A38] text-center">
      AI Outfit Generator
    </h2>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Before / After */}
      <div className="space-y-6">
        <div className="rounded-xl overflow-hidden border border-gray-200">
          <img src="/images/Wardrobe-before.png" alt="Wardrobe Before" className="w-full object-cover h-80" />
          <p className="p-4 text-gray-700 font-medium h-fit">Your uploaded wardrobe</p>
        </div>
        <div className="rounded-xl overflow-hidden border border-gray-200">
          <img src="/images/Wardrobe-after.png" alt="Wardrobe After" className="w-full object-cover h-80" />
          <p className="p-4 text-gray-700 font-medium h-fit">AI-generated full outfit</p>
        </div>
      </div>

      {/* Outfit Breakdown + Button */}
      <div className="flex flex-col justify-center gap-4">
        <ul className="space-y-2 text-gray-700">
          <li>👕 Shirt → Matching Trousers → Accessories → Shoes</li>
          <li>🎨 Color Harmony & Event Fit</li>
          <li>✨ Personalized style tips</li>
        </ul>

        <button className="mt-6 px-6 py-3 rounded-lg bg-[#D7263D] text-white hover:bg-[#B81F33] transition w-52">
          Regenerate Look
        </button>
      </div>
    </div>
  </div>
</section>

{/* Try Outfit Library Flow */}
<section className="px-8 lg:px-20 py-20 bg-[#FFF8F0] text-gray-700">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-[#046A38]">
      Try Outfit Library in 3 Simple Steps
    </h2>

    <div className="flex flex-col md:flex-row justify-between gap-8">
      <div className="flex-1 p-6 rounded-2xl bg-white/80 backdrop-blur-md">
        <img src="/images/icon-upload.svg" alt="Upload Clothes" className="mx-auto mb-4 w-16" />
        <h3 className="font-semibold text-lg mb-2 text-[#046A38]">Upload Clothes</h3>
        <p className="text-gray-700 text-sm">Add your wardrobe to Outfit Library.</p>
      </div>

      <div className="flex-1 p-6 rounded-2xl bg-white/80 backdrop-blur-md">
        <img src="/images/icon-event.svg" alt="Select Event" className="mx-auto mb-4 w-16" />
        <h3 className="font-semibold text-lg mb-2 text-[#046A38]">Select Event</h3>
        <p className="text-gray-700 text-sm">Choose the event type you’re dressing for.</p>
      </div>

      <div className="flex-1 p-6 rounded-2xl bg-white/80 backdrop-blur-md">
        <img src="/images/icon-ai.svg" alt="Get Styled" className="mx-auto mb-4 w-16" />
        <h3 className="font-semibold text-lg mb-2 text-[#046A38]">Get Styled by AI</h3>
        <p className="text-gray-700 text-sm">Receive AI-curated outfits instantly.</p>
      </div>
    </div>
  </div>
</section>

{/* User Testimonials */}
<section className="px-8 lg:px-20 py-20 bg-[#F7EFE8] text-gray-700 relative">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-[#046A38]">What Our Users Say</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md">
        <p className="text-gray-700 italic mb-4">“I stopped stressing about what to wear!”</p>
        <div className="flex items-center justify-center gap-3">
          <img src="/images/user1.jpg" alt="User 1" className="w-10 h-10 rounded-full object-cover" />
          <span className="text-gray-700 font-medium">Chinwe</span>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md">
        <p className="text-gray-700 italic mb-4">“The AI styling changed my Sundays!”</p>
        <div className="flex items-center justify-center gap-3">
          <img src="/images/user2.jpg" alt="User 2" className="w-10 h-10 rounded-full object-cover" />
          <span className="text-gray-700 font-medium">Tobi</span>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md">
        <p className="text-gray-700 italic mb-4">“I feel confident and stylish every day!”</p>
        <div className="flex items-center justify-center gap-3">
          <img src="/images/user3.jpg" alt="User 3" className="w-10 h-10 rounded-full object-cover" />
          <span className="text-gray-700 font-medium">Amara</span>
        </div>
      </div>
      <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md">
        <p className="text-gray-700 italic mb-4">“I feel confident and stylish every day!”</p>
        <div className="flex items-center justify-center gap-3">
          <img src="/images/user3.jpg" alt="User 3" className="w-10 h-10 rounded-full object-cover" />
          <span className="text-gray-700 font-medium">Amara</span>
        </div>
      </div>
      <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md">
        <p className="text-gray-700 italic mb-4">“I feel confident and stylish every day!”</p>
        <div className="flex items-center justify-center gap-3">
          <img src="/images/user3.jpg" alt="User 3" className="w-10 h-10 rounded-full object-cover" />
          <span className="text-gray-700 font-medium">Amara</span>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* FOOTER */}
<footer className="relative bg-black text-gray-200 px-8 lg:px-20 py-16 overflow-hidden">

  {/* Soft Pattern Background */}
  <div className="absolute inset-0 bg-[url('/images/african-pattern.svg')] bg-repeat opacity-10 pointer-events-none"></div>

  <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
    {/* Brand / Logo */}
    <div className="space-y-4">
      <img src="/images/logo-1.png" alt="Outfit Library" className="h-16 w-auto" />
      <p className="text-gray-300 text-sm">
        Outfit Library helps you organize your wardrobe and get AI-curated outfit recommendations for any event.
      </p>
      <div className="flex gap-3 text-xl text-[#D7263D]">
        <a href="#"><i className="fa-brands fa-facebook hover:text-[#046A38] transition"></i></a>
        <a href="#"><i className="fa-brands fa-twitter hover:text-[#046A38] transition"></i></a>
        <a href="#"><i className="fa-brands fa-instagram hover:text-[#046A38] transition"></i></a>
      </div>
    </div>

    {/* Company */}
    <div>
      <h4 className="font-semibold text-lg text-[#D7263D] mb-4">Company</h4>
      <ul className="space-y-2 text-gray-300">
        <li><a href="#" className="hover:text-[#046A38] transition">About Us</a></li>
        <li><a href="#" className="hover:text-[#046A38] transition">Careers</a></li>
        <li><a href="#" className="hover:text-[#046A38] transition">Blog</a></li>
        <li><a href="#" className="hover:text-[#046A38] transition">Press</a></li>
      </ul>
    </div>

    {/* Resources */}
    <div>
      <h4 className="font-semibold text-lg text-[#D7263D] mb-4">Resources</h4>
      <ul className="space-y-2 text-gray-300">
        <li><a href="#" className="hover:text-[#046A38] transition">Help Center</a></li>
        <li><a href="#" className="hover:text-[#046A38] transition">Tutorials</a></li>
        <li><a href="#" className="hover:text-[#046A38] transition">Community</a></li>
        <li><a href="#" className="hover:text-[#046A38] transition">Partners</a></li>
      </ul>
    </div>

    {/* Legal */}
    <div>
      <h4 className="font-semibold text-lg text-[#D7263D] mb-4">Legal</h4>
      <ul className="space-y-2 text-gray-300">
        <li><a href="#" className="hover:text-[#046A38] transition">Privacy Policy</a></li>
        <li><a href="#" className="hover:text-[#046A38] transition">Terms of Service</a></li>
        <li><a href="#" className="hover:text-[#046A38] transition">Cookie Policy</a></li>
      </ul>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
    © 2025 Outfit Library. All rights reserved.
  </div>
</footer>


    </div>
  );
}
