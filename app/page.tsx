'use client'

import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import PopularCoursesSection from '@/components/sections/PopularCoursesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import PartnersSection from '@/components/sections/PartnersSection'
import StudentInquiryForm from '@/components/sections/StudentInquiryForm'
import LenisScroll from '@/components/LenisScroll'

export default function Home() {
  return (
    <>
      <LenisScroll />
      <div className="pt-16 w-full overflow-x-hidden">
        <HeroSection />
        <StatsSection />
        <PartnersSection />
        <PopularCoursesSection />
        <FeaturesSection />
        <TestimonialsSection />
        <StudentInquiryForm />
      </div>
    </>
  )
}