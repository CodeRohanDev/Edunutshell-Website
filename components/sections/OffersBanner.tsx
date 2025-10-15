'use client'

import { motion } from 'framer-motion'
import { Sparkles, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const OffersBanner = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-accent-blue/15 to-neon-purple/15">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-dark relative overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/8 to-neon-purple/8 animate-pulse" />
          
          <div className="relative z-10 text-center py-8">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              <Sparkles className="w-12 h-12 text-yellow-400" />
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Limited Time <span className="gradient-text">Special Offer!</span>
            </h2>
            
            <p className="text-text-secondary text-lg mb-6 max-w-2xl mx-auto">
              Get 50% OFF on all premium courses. Unlock unlimited learning opportunities today!
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <div className="flex items-center space-x-2 text-accent-blue">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Offer ends in: 2 days 14 hours</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/courses" className="btn-primary group">
                <span>Browse Courses</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/dashboard/payment" className="btn-secondary">
                View Plans
              </Link>
            </div>
            
            <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-text-muted">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent-blue rounded-full" />
                <span>No hidden fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent-blue rounded-full" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent-blue rounded-full" />
                <span>Money-back guarantee</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default OffersBanner
