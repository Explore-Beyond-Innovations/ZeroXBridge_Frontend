'use client'

import Footer from '../components/footer'

const FooterPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-20 py-16">
        <h1 className="text-white text-2xl font-semibold mb-4">
          Footer Component Preview
        </h1>
        <p className="text-[#D4D4D4] mb-8">
          This page demonstrates the footer component in isolation.
        </p>
      </div>
      <Footer />
    </div>
  )
}

export default FooterPage