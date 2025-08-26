"use client";
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';
import ContactForm from '../ContactForm';
import Logo from '../logo'; 

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Page Header (includes Navbar and OnlyDust banner) */}
      <PageHeader 
        title="Contact Us"
        description="We'd love to hear from you! Whether you have feedback, a technical question, or want to contribute, we're all ears."
      />

      {/* Main Content - Contact Form Section */}
      <main 
        className="bg-black relative"
        style={{
          width: '1440px',
          maxWidth: '100vw',
          margin: '0 auto',
          minHeight: '767px',
        }}
      >
        <div 
          className="flex flex-col items-start gap-[10px]"
          style={{
            padding: '100px',
            width: '100%',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end w-full">
            {/* Contact Form */}
            <div className="w-full" style={{ position: 'relative', zIndex: 10 }}>
              <ContactForm />
            </div>

            {/* ZeroXBridge Logo */}
            <div className="flex justify-end items-end w-full"> 
              <div 
                className="flex items-end justify-end ml-10 w-[400px] h-[400px] lg:w-[500px] lg:h-[600px]"
                style={{
                  opacity: '0.2',
                  pointerEvents: 'none',
                  overflow: 'hidden',
                }}
              >
                <Logo className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}