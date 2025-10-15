'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Star, Quote } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

const TestimonialsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'Tech Corp',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'EDUNUTSHELL transformed my career completely. The AI-powered learning paths helped me master full-stack development in just 6 months. The platform is intuitive and the support is exceptional.',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Data Scientist',
      company: 'Analytics Pro',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'The quality of courses and the interactive learning experience is unmatched. I went from a complete beginner to landing my dream job in data science. Highly recommended!',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      company: 'Design Studio',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'What sets EDUNUTSHELL apart is the personalized learning experience. The AI recommendations were spot-on, and the community support made learning enjoyable and effective.',
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Product Manager',
      company: 'Innovation Labs',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'The comprehensive curriculum and real-world projects prepared me perfectly for my current role. The certification I earned here opened doors I never thought possible.',
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'Marketing Specialist',
      company: 'Growth Agency',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'Flexible learning schedule and top-notch content quality. I could learn at my own pace while working full-time. The investment in my education paid off tremendously.',
    },
  ]

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
            What Our <span className="gradient-text">Students</span> Say
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Hear from thousands of successful learners
            who have transformed their careers with EDUNUTSHELL.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-neon-blue/30',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-neon-blue',
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="testimonials-swiper pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="card-dark h-full relative">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-20">
                    <Quote className="w-8 h-8 text-neon-blue" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-text-primary font-semibold">
                        {testimonial.name}
                      </h4>
                      <p className="text-text-muted text-sm">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { metric: '4.9/5', label: 'Average Rating' },
              { metric: '50K+', label: 'Reviews' },
              { metric: '98%', label: 'Would Recommend' },
              { metric: '95%', label: 'Course Completion' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                  {stat.metric}
                </div>
                <div className="text-text-secondary text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .testimonials-swiper .swiper-pagination {
          bottom: 0 !important;
        }
        .testimonials-swiper .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          margin: 0 6px !important;
          border-radius: 50% !important;
          transition: all 0.3s ease !important;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          transform: scale(1.2) !important;
        }
      `}</style>
    </section>
  )
}

export default TestimonialsSection