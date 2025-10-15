'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { Play, Sparkles, ArrowRight, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DemoSessionPage() {
  const router = useRouter()
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null)
  const [isBannerHovered, setIsBannerHovered] = useState(false)
  const controls = useAnimationControls()

  useEffect(() => {
    if (isBannerHovered) {
      controls.stop()
    } else {
      controls.start({
        x: -1920,
        transition: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        }
      })
    }
  }, [isBannerHovered, controls])

  const demoVideos = [
    {
      id: 1,
      title: 'Web Development Bootcamp',
      description: 'Learn modern web development with React, Next.js, and TypeScript',
      videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video IDs
      duration: '12:45',
      category: 'Web Development'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      description: 'Master data analysis, visualization, and machine learning basics',
      videoId: 'dQw4w9WgXcQ',
      duration: '15:30',
      category: 'Data Science'
    },
    {
      id: 3,
      title: 'Cloud Computing with AWS',
      description: 'Deploy scalable applications on Amazon Web Services',
      videoId: 'dQw4w9WgXcQ',
      duration: '18:20',
      category: 'Cloud Computing'
    },
    {
      id: 4,
      title: 'AI & Machine Learning',
      description: 'Build intelligent systems with neural networks and deep learning',
      videoId: 'dQw4w9WgXcQ',
      duration: '20:15',
      category: 'AI & ML'
    },
    {
      id: 5,
      title: 'Industrial Partnership Program',
      description: 'Real-world projects with leading tech companies',
      videoId: 'dQw4w9WgXcQ',
      duration: '10:50',
      category: 'Partnerships'
    },
    {
      id: 6,
      title: 'Internship Opportunities',
      description: 'Get hands-on experience with our internship programs',
      videoId: 'dQw4w9WgXcQ',
      duration: '14:25',
      category: 'Internships'
    }
  ]

  const offers = [
    'Get 20% off new courses',
    'Free demo sessions available',
    'Join our industrial programs now',
    'Limited time offer - Enroll today',
    'Certificate programs starting soon',
    'Expert mentorship included'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary pt-20">
      {/* Scrolling Offer Banner */}
      <div 
        className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 border-b border-slate-500/20 overflow-hidden cursor-pointer hover:from-slate-600 hover:via-slate-500 hover:to-slate-600 transition-all duration-300"
        onClick={() => router.push('/dashboard/offers')}
        onMouseEnter={() => setIsBannerHovered(true)}
        onMouseLeave={() => setIsBannerHovered(false)}
      >
        <div className="relative flex">
          <motion.div
            animate={controls}
            className="flex items-center space-x-12 py-4 whitespace-nowrap"
          >
            {[...offers, ...offers, ...offers].map((offer, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Sparkles className="w-4 h-4 text-yellow-300 flex-shrink-0" />
                <span className="text-white font-medium text-sm">{offer}</span>
                <span className="text-slate-400 mx-6">•</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-5 text-text-primary">
              Watch <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Demo Sessions</span>
            </h1>
            <p className="text-text-muted text-lg max-w-3xl mx-auto leading-relaxed">
              Explore our courses through engaging demo videos. Get a preview of what you'll learn and how our programs can transform your career.
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demoVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
                className="group"
              >
                <div className="bg-dark-card/30 backdrop-blur-xl border border-dark-border/30 rounded-2xl overflow-hidden hover:border-slate-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-500/10">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-dark-secondary/50 overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                    <div className="absolute top-3 right-3 bg-dark-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-dark-border/50">
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs text-slate-300 font-medium">{video.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-xs text-slate-400 font-medium px-2.5 py-1 bg-slate-500/10 rounded-lg border border-slate-500/20">
                        {video.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-200 group-hover:to-slate-400 transition-all duration-300">
                      {video.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed mb-5">
                      {video.description}
                    </p>
                    <button className="w-full bg-dark-secondary/50 hover:bg-gradient-to-r hover:from-slate-600 hover:to-slate-700 border border-dark-border/50 hover:border-slate-500/30 text-text-muted hover:text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 group/btn">
                      <Play className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      <span>Watch Demo</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-2xl p-10 text-center border border-slate-500/20"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto text-sm leading-relaxed">
              Book a personalized demo session with our expert instructors and get all your questions answered.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-white text-dark-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl flex items-center space-x-2 group">
                <span>Book Free Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-dark-primary transition-all duration-300">
                View All Courses
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
