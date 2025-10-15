'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'

const PartnersSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const partners = [
    {
      name: '',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      fallback: 'MS'
    },
    {
      name: '',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
      fallback: 'G'
    },
    {
      name: '',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      fallback: 'A'
    },
    {
      name: '',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
      fallback: 'IBM'
    },
    {
      name: '',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
      fallback: 'O'
    },
    {
      name: '',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
      fallback: 'SF'
    },
    {
      name: '',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg',
      fallback: 'Ad'
    },
    {
      name: '',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
      fallback: 'M'
    },
    {
      name: '',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
      fallback: 'N'
    },
    {
      name: '',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
      fallback: 'S'
    },
  ]

  const achievements = [
    {
      title: 'Industry Recognition',
      items: [
        'Best LMS Platform 2024',
        'Innovation in EdTech Award',
        'Top 10 Learning Platforms',
        'Excellence in AI Education',
      ],
    },
    {
      title: 'Certifications',
      items: [
        'ISO 27001 Certified',
        'GDPR Compliant',
        'SOC 2 Type II',
        'WCAG 2.1 AA Accessible',
      ],
    },
  ]

  return (
    <section ref={ref} className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Join the ranks of top companies and institutions that trust EDUNUTSHELL
            for their learning and development needs.
          </p>
        </motion.div>

        {/* Partners Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={2}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
            className="partners-swiper"
          >
            {partners.map((partner, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center justify-center h-28 bg-dark-card/50 
                              border border-dark-border rounded-xl hover:border-accent-blue/30
                              transition-all duration-300 group p-4 space-y-2">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-10 max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    onError={(e) => {
                      // Fallback to text logo if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallbackDiv = document.createElement('div');
                      fallbackDiv.className = 'w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300';
                      fallbackDiv.innerHTML = `<span class="text-white font-bold text-xs">${partner.fallback}</span>`;
                      target.parentNode?.appendChild(fallbackDiv);
                    }}
                  />
                  <span className="text-text-secondary text-sm font-medium tracking-wide font-mono group-hover:text-accent-blue transition-colors duration-300">
                    {partner.name}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {achievements.map((category, index) => (
            <div key={index} className="card-dark">
              <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center">
                <div className="w-2 h-2 bg-accent-blue rounded-full mr-3" />
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-text-secondary">
                    <div className="w-1.5 h-1.5 bg-gradient-primary rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Global Reach */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-gradient-card rounded-3xl p-8 md:p-12 border border-dark-border"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Global Impact & Reach
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '85+', label: 'Countries' },
              { number: '500+', label: 'Universities' },
              { number: '1000+', label: 'Companies' },
              { number: '50+', label: 'Languages' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <p className="text-text-secondary mt-8 max-w-2xl mx-auto">
            From startups to Fortune 500 companies, educational institutions to government
            agencies, EDUNUTSHELL is the trusted choice for professional development worldwide.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default PartnersSection