import React from 'react'


const Home = () => {
  return (
    <div>
      
       
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-6xl bg-white p-10 shadow-2xl rounded-2xl text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to LL&L</h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Where technology meets style. LL&L is more than just a tech company—we bring 
          innovation, creativity, and community impact together. Whether it's top-notch 
          cloud services or stylish sunglasses that fund our mission, we're here to make a difference.
        </p>
        <div className="mt-8 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 justify-center">
         
          <a href="/product" className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition">
            Shop Now
          </a>
        </div>
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-gray-900">Our Services</h2>
          <p className="text-gray-700 mt-2">Explore our cloud solutions and business tech services designed to help you thrive.</p>
          <a href="/about" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            Learn More
          </a>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home