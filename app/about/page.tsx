'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { Target, Eye, Users, Lightbulb, Globe } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const AboutPage = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLHeadingElement>(null)
  const heroSubtextRef = useRef<HTMLParagraphElement>(null)
  const heroBgRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const visionRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)

  const milestones = [
    { year: '2020', title: 'Company Founded', description: 'Started with a vision to revolutionize digital learning' },
    { year: '2021', title: 'First 1000 Students', description: 'Reached our first major milestone in student enrollment' },
    { year: '2022', title: 'Global Expansion', description: 'Expanded to serve students in 50+ countries worldwide' },
    { year: '2023', title: 'AI Integration', description: 'Launched AI-powered personalized learning features' },
    { year: '2024', title: '15K+ Students', description: 'Growing community of learners across all domains' },
  ]

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from course content to student support.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a global community of learners who support and inspire each other.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuously innovating to provide cutting-edge learning experiences.',
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making quality education accessible to learners worldwide.',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section Animation
      if (heroTextRef.current && heroSubtextRef.current && heroBgRef.current) {
        // Split text into lines
        const splitText = new SplitType(heroTextRef.current, { types: 'lines' })
        
        // Wrap lines for animation
        gsap.set(splitText.lines, { overflow: 'hidden' })
        
        // Background zoom
        gsap.fromTo(heroBgRef.current,
          { scale: 1.2 },
          { 
            scale: 1, 
            duration: 2,
            ease: 'power2.out'
          }
        )

        // Headline line-by-line reveal
        gsap.fromTo(splitText.lines,
          { 
            y: 100,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.3
          }
        )

        // Subtext fade in
        gsap.fromTo(heroSubtextRef.current,
          { 
            y: 30,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            delay: 1.2
          }
        )
      }

      // Mission Section Animation
      if (missionRef.current) {
        const missionElements = missionRef.current.querySelectorAll('.animate-item')
        
        gsap.fromTo(missionElements,
          { 
            y: 60,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: missionRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
              scrub: 0.5
            }
          }
        )
      }

      // Vision Section Animation
      if (visionRef.current) {
        const visionElements = visionRef.current.querySelectorAll('.animate-item')
        
        gsap.fromTo(visionElements,
          { 
            y: 60,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: visionRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
              scrub: 0.5
            }
          }
        )
      }

      // Story Section Animation
      if (storyRef.current) {
        const storyTitle = storyRef.current.querySelector('.story-title')
        const storySubtext = storyRef.current.querySelector('.story-subtext')
        
        if (storyTitle) {
          const splitStoryTitle = new SplitType(storyTitle as HTMLElement, { types: 'lines' })
          
          gsap.fromTo(splitStoryTitle.lines,
            { 
              y: 50,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: storyRef.current,
                start: 'top 75%',
                end: 'top 25%',
                toggleActions: 'play reverse play reverse',
                scrub: 0.5
              }
            }
          )
        }

        if (storySubtext) {
          gsap.fromTo(storySubtext,
            { 
              y: 30,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: storyRef.current,
                start: 'top 70%',
                end: 'top 30%',
                toggleActions: 'play reverse play reverse',
                scrub: 0.5
              }
            }
          )
        }
      }

      // Timeline Animation
      if (timelineRef.current) {
        const timelineLine = timelineRef.current.querySelector('.timeline-line')
        const milestoneItems = timelineRef.current.querySelectorAll('.milestone-item')
        
        // Draw timeline line
        if (timelineLine) {
          gsap.fromTo(timelineLine,
            { 
              scaleY: 0,
              transformOrigin: 'top'
            },
            {
              scaleY: 1,
              duration: 1.5,
              ease: 'none',
              scrollTrigger: {
                trigger: timelineRef.current,
                start: 'top 60%',
                end: 'bottom 40%',
                toggleActions: 'play reverse play reverse',
                scrub: 1
              }
            }
          )
        }

        // Animate milestone items
        milestoneItems.forEach((item) => {
          const icon = item.querySelector('.milestone-icon')
          const card = item.querySelector('.milestone-card')
          
          gsap.fromTo(icon,
            { 
              scale: 0,
              opacity: 0
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                end: 'top 40%',
                toggleActions: 'play reverse play reverse',
                scrub: 0.5
              }
            }
          )

          if (card) {
            const cardElements = card.querySelectorAll('.card-element')
            
            gsap.fromTo(cardElements,
              { 
                y: 40,
                opacity: 0
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: item,
                  start: 'top 75%',
                  end: 'top 40%',
                  toggleActions: 'play reverse play reverse',
                  scrub: 0.5
                }
              }
            )
          }
        })
      }

      // Values Section Animation
      if (valuesRef.current) {
        const valueCards = valuesRef.current.querySelectorAll('.value-card')
        
        valueCards.forEach((card) => {
          gsap.fromTo(card,
            { 
              y: 60,
              opacity: 0,
              scale: 0.9
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 50%',
                toggleActions: 'play reverse play reverse',
                scrub: 0.5
              }
            }
          )
        })
      }

    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="section-padding bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary relative overflow-hidden">
        <div 
          ref={heroBgRef}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"
        />
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 ref={heroTextRef} className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Peeling Back the Layers of <span className="gradient-text">Education</span>
            </h1>
            <p ref={heroSubtextRef} className="text-xl text-text-secondary leading-relaxed">
              At EDUNUTSHELL, we're passionate about transforming the way people learn.
              Our mission is to make quality education accessible, engaging, and effective
              for learners around the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div ref={missionRef} className="card-dark">
              <div className="animate-item flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="animate-item text-text-secondary text-lg leading-relaxed">
                To equip learners with digital-age skills through innovative, hands-on learning
                experiences that bridge the gap between traditional education and industry demands.
                We believe in empowering individuals to unlock their potential and achieve their
                career aspirations.
              </p>
            </div>

            {/* Vision */}
            <div ref={visionRef} className="card-dark">
              <div className="animate-item flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="animate-item text-text-secondary text-lg leading-relaxed">
                To close the achievement gap in education by providing accessible, high-quality
                learning opportunities that prepare students for success in the digital economy.
                We envision a world where anyone, anywhere can access world-class education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section ref={storyRef} className="section-padding bg-dark-secondary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="story-title text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="story-subtext text-text-secondary text-lg max-w-3xl mx-auto">
              From a small startup to a global education platform, here's how we've grown
              to serve thousands of learners worldwide.
            </p>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-primary"></div>

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`milestone-item flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div className="milestone-card card-dark">
                    <div className="card-element text-accent-blue font-bold text-lg mb-2">{milestone.year}</div>
                    <h3 className="card-element text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="card-element text-text-secondary">{milestone.description}</p>
                  </div>
                </div>

                <div className="milestone-icon w-4 h-4 bg-gradient-primary rounded-full border-4 border-dark-secondary 
                               relative z-10 flex-shrink-0"></div>

                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-3xl mx-auto">
              These core values guide everything we do and shape the way we serve our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card card-dark text-center group"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6
                               group-hover:shadow-glow transition-all duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-text-secondary">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="section-padding bg-dark-secondary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powered by <span className="gradient-text">Passionate People</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-3xl mx-auto">
              Our diverse team of educators, technologists, and innovators work together
              to create exceptional learning experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Team Members' },
              { number: '15+', label: 'Countries' },
              { number: '100+', label: 'Expert Mentors' },
              { number: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-card rounded-3xl p-8 md:p-12 border border-dark-border text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join Our <span className="gradient-text">Learning Community</span>?
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Become part of our growing family of learners and start your journey
              towards achieving your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Start Learning Today
              </button>
              <button className="btn-secondary">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
