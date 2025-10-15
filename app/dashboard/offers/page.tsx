'use client'

import { motion } from 'framer-motion'
import { Tag, Clock, Gift, Sparkles, ArrowRight, Copy, Check } from 'lucide-react'
import { useState } from 'react'

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const offers = [
    {
      id: 1,
      title: 'New Student Special',
      description: 'Get 50% off on your first course enrollment',
      code: 'NEWSTUDENT50',
      discount: '50% OFF',
      validUntil: 'Oct 31, 2025',
      color: 'from-cyan-500/20 to-blue-500/20',
      borderColor: 'border-cyan-500/20',
      badgeColor: 'from-cyan-500 to-blue-500',
      icon: Sparkles
    },
    {
      id: 2,
      title: 'Bundle Deal',
      description: 'Enroll in 3 courses and get 1 free',
      code: 'BUNDLE3FOR2',
      discount: 'Buy 3 Get 1',
      validUntil: 'Nov 15, 2025',
      color: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-teal-500/20',
      badgeColor: 'from-emerald-500 to-teal-500',
      icon: Gift
    },
    {
      id: 3,
      title: 'Weekend Flash Sale',
      description: 'Limited time offer - 30% off all courses',
      code: 'WEEKEND30',
      discount: '30% OFF',
      validUntil: 'Oct 12, 2025',
      color: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/20',
      badgeColor: 'from-orange-500 to-red-500',
      icon: Tag
    },
    {
      id: 4,
      title: 'Referral Bonus',
      description: 'Refer a friend and both get 20% off',
      code: 'REFER20',
      discount: '20% OFF',
      validUntil: 'Dec 31, 2025',
      color: 'from-violet-500/20 to-purple-500/20',
      borderColor: 'border-purple-500/20',
      badgeColor: 'from-violet-500 to-purple-500',
      icon: Gift
    }
  ]

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary pt-28 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-text-primary">
              Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Offers & Deals</span>
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Save big on your learning journey with our special offers
            </p>
          </div>

          {/* Featured Offer Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-2xl p-10 mb-12 relative overflow-hidden border border-slate-500/20"
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-2.5 mb-5">
                <Sparkles className="w-6 h-6 text-yellow-300" />
                <span className="text-yellow-300 font-semibold text-sm tracking-wide">LIMITED TIME OFFER</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">
                First Month Free Trial
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl text-sm leading-relaxed">
                Start your learning journey with a completely free trial. Access all premium courses for 30 days with no commitment.
              </p>
              <button className="bg-white text-dark-primary px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl text-sm">
                Claim Free Trial
              </button>
            </div>
          </motion.div>

          {/* Offers Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {offers.map((offer, index) => {
              const Icon = offer.icon
              return (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${offer.color} backdrop-blur-xl border ${offer.borderColor} rounded-2xl p-8 hover:scale-105 transition-all duration-300 group`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 bg-dark-card/50 rounded-xl flex items-center justify-center border border-dark-border/30`}>
                      <Icon className="w-7 h-7 text-slate-300" />
                    </div>
                    <div className={`px-4 py-2 bg-gradient-to-r ${offer.badgeColor} rounded-full`}>
                      <span className="text-white text-sm font-bold">{offer.discount}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-text-primary mb-2.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-200 group-hover:to-slate-400 transition-all duration-300">
                    {offer.title}
                  </h3>
                  <p className="text-text-muted mb-5 text-sm leading-relaxed">
                    {offer.description}
                  </p>

                  <div className="flex items-center space-x-2 text-sm text-text-muted mb-6">
                    <Clock className="w-4 h-4" />
                    <span>Valid until {offer.validUntil}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-dark-secondary/50 border border-dark-border/50 rounded-xl px-5 py-4">
                      <p className="text-xs text-text-muted mb-1.5 font-medium">Promo Code</p>
                      <p className="text-slate-300 font-mono font-bold text-sm">{offer.code}</p>
                    </div>
                    <button
                      onClick={() => handleCopyCode(offer.code)}
                      className="p-4 bg-dark-card/50 hover:bg-dark-card border border-dark-border/50 hover:border-slate-500/30 rounded-xl transition-all duration-300 group/btn"
                    >
                      {copiedCode === offer.code ? (
                        <Check className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Copy className="w-5 h-5 text-text-muted group-hover/btn:text-text-primary group-hover/btn:scale-110 transition-all" />
                      )}
                    </button>
                  </div>

                  <button className="w-full mt-5 bg-dark-secondary/50 hover:bg-dark-secondary border border-dark-border/50 hover:border-slate-500/30 text-text-muted hover:text-text-primary px-6 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 group/apply text-sm">
                    <span>Apply Offer</span>
                    <ArrowRight className="w-4 h-4 group-hover/apply:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )
            })}
          </div>

          {/* Terms & Conditions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-dark-card/30 backdrop-blur-xl border border-dark-border/30 rounded-2xl p-8"
          >
            <h3 className="text-lg font-semibold text-text-primary mb-5">Terms & Conditions</h3>
            <ul className="space-y-3 text-text-muted text-sm leading-relaxed">
              <li>• Offers cannot be combined with other promotions</li>
              <li>• Promo codes are valid for one-time use per account</li>
              <li>• Discounts apply to course enrollment fees only</li>
              <li>• Offers are subject to availability and may expire without notice</li>
              <li>• Refund policies apply as per standard terms</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
