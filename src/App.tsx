import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { RoiEstimator } from './components/RoiEstimator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ClickEffects } from './components/ClickEffects';
import { ScrollProgressBar } from './components/ScrollProgressBar';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('');
  const [contactMessage, setContactMessage] = useState<string>('');

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
  };

  const handleApplyRoiEstimate = (summary: string) => {
    setContactMessage(summary);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#F4F7FB] dark:bg-[#060D1A] text-slate-800 dark:text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-blue-600/20 selection:text-blue-600 dark:selection:text-blue-400 transition-colors duration-300">
        {/* Top Scroll Depth Progress Bar */}
        <ScrollProgressBar />

        {/* Global Click Ripple Effect */}
        <ClickEffects />

        {/* 3-Zone Top Bar Navigation with Dark/Light Toggle */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero />

          {/* Services Section */}
          <ServicesSection onSelectService={handleSelectService} />

          {/* Work Experience & Operational Background */}
          <ExperienceSection />

          {/* Projects / Production Automations Section */}
          <ProjectsSection onContactClick={() => setSelectedService('Custom Automation Pipeline')} />

          {/* Testimonials & Verified Outcomes */}
          <TestimonialsSection />

          {/* Interactive ROI & Time-Saved Calculator */}
          <RoiEstimator onApplyEstimate={handleApplyRoiEstimate} />

          {/* Contact & Consultation Booking */}
          <ContactSection
            initialService={selectedService}
            initialMessage={contactMessage}
          />
        </main>

        {/* Clean Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
