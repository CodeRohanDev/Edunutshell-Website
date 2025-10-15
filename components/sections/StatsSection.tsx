'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { Users, BookOpen, Globe, Award, TrendingUp, Star } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'

const StatsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [startCount, setStartCount] = useState(false)

  const stats = [
    {
      icon: Users,
      number: 15000,
      suffix: '+',
      label: 'Active Students',
      description: 'Learning worldwide',
      color: 'text-accent-blue',
    },
    {
      icon: BookOpen,
      number: 750,
      suffix: '+',
      label: 'Courses Available',
      description: 'Across all domains',
      color: 'text-accent-blue',
    },
    {
      icon: Globe,
      number: 85,
      suffix: '+',
      label: 'Countries Reached',
      description: 'Global presence',
      color: 'text-accent-gray',
    },
    {
      icon: Award,
      number: 12000,
      suffix: '+',
      label: 'Certificates Issued',
      description: 'Career advancement',
      color: 'text-yellow-400',
    },
    {
      icon: TrendingUp,
      number: 98,
      suffix: '%',
      label: 'Completion Rate',
      description: 'Student success',
      color: 'text-accent-blue',
    },
    {
      icon: Star,
      number: 4.9,
      suffix: '/5',
      label: 'Average Rating',
      description: 'Student satisfaction',
      color: 'text-accent-blue',
    },
  ]

  useEffect(() => {
    if (isInView) {
      setStartCount(true)
    }
  }, [isInView])



  return (
    <section ref={ref} className="section-padding bg-dark-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">Thousands</span> Worldwide
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Join our growing community of learners and professionals who are transforming
            their careers through our comprehensive educational platform.
          </p>
        </motion.div>

        {/* Stats Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="stats-swiper"
          >
            {stats.map((stat, index) => (
              <SwiperSlide key={index}>
                <div className="card-dark text-center group hover:scale-105 transition-transform duration-300 h-full">
                  <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl
                                  bg-gradient-to-br from-dark-border to-dark-card mb-4 md:mb-6
                                  group-hover:shadow-glow transition-all duration-300`}>
                    <stat.icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color}`} />
                  </div>

                  <div className="space-y-2">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text">
                      {startCount ? (
                        <CountUp
                          end={stat.number}
                          duration={2.5}
                          decimals={stat.suffix === '/5' ? 1 : 0}
                          suffix={stat.suffix}
                        />
                      ) : (
                        `0${stat.suffix}`
                      )}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-text-primary">
                      {stat.label}
                    </h3>
                    <p className="text-sm md:text-base text-text-secondary">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              'ISO 27001 Certified',
              'GDPR Compliant',
              'SOC 2 Type II',
              'Award Winner 2024',
            ].map((badge, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-dark-card/50 backdrop-blur-sm
                           border border-dark-border rounded-full px-4 py-2"
              >
                <div className="w-2 h-2 bg-accent-blue rounded-full animate-pulse" />
                <span className="text-text-secondary text-sm">{badge}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection