import { useState, useEffect } from 'react';
import { 
  Heart, 
  Activity, 
  Users, 
  Calendar, 
  Smartphone, 
  Brain,
  Shield,
  TrendingUp,
  Clock,
  User,
  Stethoscope,
  Apple,
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  Zap,
  Monitor,
  Bell,
  Globe,
  Target,
  Lightbulb,
  Play,
  ChevronDown,
  Plus,
  Minus,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import Navbar from './components/Navbar';

const App = () => {
  const [activeTab, setActiveTab] = useState('patients');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Intersection Observer for subtle animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.observe').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = {
    patients: [
      { icon: Activity, title: "Health Metrics Tracking", desc: "Monitor glucose, blood pressure, and weight with precision", color: "bg-emerald-50 text-emerald-600" },
      { icon: Calendar, title: "Smart Scheduling", desc: "Book appointments with real-time provider availability", color: "bg-blue-50 text-blue-600" },
      { icon: Brain, title: "AI Health Insights", desc: "Personalized recommendations based on your health data", color: "bg-purple-50 text-purple-600" },
      { icon: Apple, title: "Nutrition Guidance", desc: "Expert dietary advice from certified nutritionists", color: "bg-orange-50 text-orange-600" },
      { icon: Clock, title: "Medication Reminders", desc: "Never miss doses with intelligent notification system", color: "bg-red-50 text-red-600" },
      { icon: TrendingUp, title: "Progress Analytics", desc: "Visual insights into your health improvement journey", color: "bg-indigo-50 text-indigo-600" }
    ],
    doctors: [
      { icon: Calendar, title: "Practice Management", desc: "Streamlined scheduling and patient coordination", color: "bg-blue-50 text-blue-600" },
      { icon: Users, title: "Patient Records", desc: "Comprehensive health data and medical history access", color: "bg-green-50 text-green-600" },
      { icon: Shield, title: "Prescription Control", desc: "Secure medication management and monitoring", color: "bg-red-50 text-red-600" },
      { icon: Smartphone, title: "Patient Communication", desc: "Direct messaging and consultation platform", color: "bg-purple-50 text-purple-600" }
    ],
    nutritionists: [
      { icon: Apple, title: "Meal Planning Tools", desc: "Create personalized nutrition plans with ease", color: "bg-orange-50 text-orange-600" },
      { icon: TrendingUp, title: "Nutrition Analytics", desc: "Track patient adherence and dietary progress", color: "bg-green-50 text-green-600" }
    ]
  };

  const stats = [
    { number: "12,000+", label: "Active Users", icon: Users, color: "text-blue-600" },
    { number: "850+", label: "Healthcare Providers", icon: Stethoscope, color: "text-emerald-600" },
    { number: "98%", label: "Success Rate", icon: Award, color: "text-purple-600" },
    { number: "24/7", label: "AI Support", icon: Zap, color: "text-orange-600" }
  ];

  const testimonials = [
    { 
      name: "Dr. Sarah Johnson", 
      role: "Endocrinologist", 
      content: "DiaWellness has transformed how I manage my diabetic patients. The real-time data insights are invaluable.", 
      rating: 5,
      avatar: "SJ",
      location: "Mayo Clinic"
    },
    { 
      name: "Michael Chen", 
      role: "Patient", 
      content: "This platform helped me achieve better glucose control than I've had in years. The AI recommendations are spot-on.", 
      rating: 5,
      avatar: "MC",
      location: "San Francisco, CA"
    },
    { 
      name: "Lisa Rodriguez", 
      role: "Certified Nutritionist", 
      content: "The meal planning tools save me hours of work while providing better outcomes for my clients.", 
      rating: 5,
      avatar: "LR",
      location: "Johns Hopkins"
    }
  ];

  const journeySteps = [
    {
      step: "01",
      title: "Assessment",
      description: "Complete health evaluation and risk analysis",
      icon: Target,
      color: "bg-blue-500"
    },
    {
      step: "02",
      title: "Planning",
      description: "AI-powered personalized care plan creation",
      icon: Brain,
      color: "bg-purple-500"
    },
    {
      step: "03",
      title: "Monitoring",
      description: "Continuous health tracking and real-time alerts",
      icon: Monitor,
      color: "bg-emerald-500"
    },
    {
      step: "04",
      title: "Optimization",
      description: "Adaptive care adjustments based on progress",
      icon: TrendingUp,
      color: "bg-orange-500"
    }
  ];

  const faqData = [
    {
      question: "How does DiaWellness ensure data security and privacy?",
      answer: "We employ bank-level encryption, HIPAA compliance, and multi-factor authentication to protect your health data. All data is encrypted both in transit and at rest, with regular security audits conducted by third-party experts."
    },
    {
      question: "Can I integrate my existing glucose monitoring devices?",
      answer: "Yes! DiaWellness supports integration with over 50+ glucose monitors, CGMs, and health tracking devices including Dexcom, FreeStyle Libre, and major fitness trackers."
    },
    {
      question: "What makes your AI recommendations different?",
      answer: "Our AI is trained on millions of anonymized patient data points and validated by endocrinologists. It considers your unique health profile, lifestyle, and preferences to provide personalized, evidence-based recommendations."
    },
    {
      question: "How quickly can I see results?",
      answer: "Most users see improvements in glucose management within 2-4 weeks. Our platform provides daily insights, with comprehensive progress reports available weekly and monthly."
    },
    {
      question: "Is telehealth consultation included?",
      answer: "Yes, our premium plans include unlimited messaging with certified diabetes educators and scheduled video consultations with endocrinologists and nutritionists."
    }
  ];

  const innovationFeatures = [
    {
      icon: Brain,
      title: "Predictive Analytics",
      description: "AI predicts glucose spikes 3 hours in advance",
      metric: "89% accuracy"
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Contextual notifications based on activity and patterns",
      metric: "50% fewer alerts"
    },
    {
      icon: Globe,
      title: "Global Research",
      description: "Contributing to diabetes research worldwide",
      metric: "12 studies published"
    },
    {
      icon: Lightbulb,
      title: "Innovation Lab",
      description: "Continuous development of new features",
      metric: "Monthly updates"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className='w-11/12 mx-auto'>

    <Navbar/>
     </nav>
            {/* <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Reviews</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</a>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div> */}

      {/* Hero Section with Video Background Effect */}
      <section className="relative pt-5 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-8 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-emerald-200/25 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="observe">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium mb-6 border border-blue-100">
                <Zap className="w-4 h-4 mr-2 text-blue-600" />
                AI-Powered Diabetes Care
                <div className="ml-2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Smart Diabetes
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">Management</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform your diabetes care with intelligent monitoring, personalized insights, and seamless coordination between patients and healthcare providers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  HIPAA Compliant
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-500" />
                  FDA Recognized
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  4.9/5 Rating
                </div>
              </div>
            </div>
            
            {/* Interactive Dashboard Preview */}
            <div className="observe">
              <div className="relative">
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Live Health Dashboard</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-500 font-medium">Real-time</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="group flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Activity className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-gray-700 font-medium block">Glucose Level</span>
                          <span className="text-xs text-gray-500">Updated 2 min ago</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-blue-600">128</span>
                        <span className="text-sm text-gray-500 block">mg/dL</span>
                      </div>
                    </div>
                    <div className="group flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                          <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-gray-700 font-medium block">Blood Pressure</span>
                          <span className="text-xs text-gray-500">Normal range</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-emerald-600">118/78</span>
                        <span className="text-sm text-gray-500 block">mmHg</span>
                      </div>
                    </div>
                    <div className="group flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-gray-700 font-medium block">A1C Progress</span>
                          <span className="text-xs text-emerald-500">↓ 0.3% this month</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-purple-600">6.8%</span>
                        <span className="text-sm text-gray-500 block">Target: 7%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mini Chart Visualization */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">7-Day Glucose Trend</span>
                      <span className="text-xs text-emerald-600 font-medium">↓ 12% improvement</span>
                    </div>
                    <div className="flex items-end space-x-1 h-16">
                      {[40, 65, 45, 80, 55, 70, 60].map((height, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t opacity-80 hover:opacity-100 transition-opacity" style={{height: `${height}%`}}></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Floating Action Cards */}
                <div className="absolute -right-4 top-8 w-48 bg-white rounded-xl shadow-lg p-4 border border-gray-100 observe" style={{animationDelay: '1s'}}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Bell className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Smart Alert</div>
                      <div className="text-xs text-gray-500">Meal reminder in 30 min</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -left-4 bottom-8 w-48 bg-white rounded-xl shadow-lg p-4 border border-gray-100 observe" style={{animationDelay: '1.5s'}}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Goal Achieved</div>
                      <div className="text-xs text-gray-500">Weekly exercise target</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Stats Bar */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 observe">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-4 group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-300 shadow-sm`}>
                    <stat.icon className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-lg -z-10"></div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Care Journey Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Your Diabetes Care Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience a seamless, personalized approach to diabetes management with our four-step care methodology
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-emerald-200"></div>
            
            <div className="grid lg:grid-cols-4 gap-8">
              {journeySteps.map((step, index) => (
                <div key={index} className="relative observe" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="group text-center">
                    {/* Step Number */}
                    <div className="relative mb-6">
                      <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow`}>
                        <step.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-gray-100">
                        <span className="text-sm font-bold text-gray-600">{step.step}</span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 group-hover:shadow-xl transition-shadow">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                    
                    {/* Arrow for large screens */}
                    {index < journeySteps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 -right-4 text-gray-300">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Showcase */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #60A5FA 0%, transparent 50%), radial-gradient(circle at 75% 75%, #A78BFA 0%, transparent 50%)`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-6">
              <Lightbulb className="w-4 h-4 mr-2" />
              Innovation at the Forefront
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Cutting-Edge Technology
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Pioneering the future of diabetes care with advanced AI, predictive analytics, and breakthrough research
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {innovationFeatures.map((feature, index) => (
              <div key={index} className="group observe" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-blue-400/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{feature.description}</p>
                  <div className="text-blue-400 font-semibold text-sm">{feature.metric}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA in Innovation Section */}
          <div className="text-center mt-16 observe">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 mx-auto shadow-lg hover:shadow-xl">
              Explore Innovation Lab
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive Care Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored solutions for patients, healthcare providers, and nutritionists with specialized tools for effective diabetes management
            </p>
          </div>

          {/* Feature Tabs */}
          <div className="flex justify-center mb-12 observe">
            <div className="bg-gray-50 rounded-2xl p-2 shadow-inner border border-gray-200">
              <div className="flex space-x-2">
                {[
                  { key: 'patients', label: 'For Patients', icon: User },
                  { key: 'doctors', label: 'For Doctors', icon: Stethoscope },
                  { key: 'nutritionists', label: 'For Nutritionists', icon: Apple }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === tab.key
                        ? 'bg-white text-blue-600 shadow-lg border border-blue-100'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 observe">
            {features[activeTab].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials with Carousel */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from our community of patients, doctors, and nutritionists
            </p>
          </div>

          {/* Featured Testimonial Carousel */}
          <div className="mb-16 observe">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full -translate-y-32 translate-x-32"></div>
              
              <div className="relative">
                <div className="flex items-center gap-1 mb-6 justify-center">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 text-center mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="font-bold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                  <div className="text-sm text-gray-500 mt-1">{testimonials[currentTestimonial].location}</div>
                </div>
              </div>
              
              {/* Carousel Indicators */}
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial Grid */}
          <div className="grid md:grid-cols-3 gap-8 observe">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about DiaWellness
            </p>
          </div>

          <div className="space-y-4 observe">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                  <div className={`transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </div>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="observe">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Why Choose DiaWellness?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                DiaWellness combines cutting-edge AI technology with healthcare expertise to deliver personalized diabetes management solutions. Our platform bridges the gap between patients and healthcare providers, ensuring comprehensive care and better health outcomes.
              </p>
              <div className="space-y-4">
                {[
                  "AI-powered personalized recommendations",
                  "Real-time health monitoring and analytics",
                  "Seamless communication between all stakeholders",
                  "Evidence-based treatment protocols",
                  "Comprehensive medication management"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="observe">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <Heart className="w-8 h-8 text-red-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold text-gray-900">98%</div>
                    <div className="text-sm text-gray-600 font-medium">Health Improvement</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <TrendingUp className="w-8 h-8 text-emerald-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold text-gray-900">24/7</div>
                    <div className="text-sm text-gray-600 font-medium">AI Monitoring</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <Shield className="w-8 h-8 text-blue-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold text-gray-900">100%</div>
                    <div className="text-sm text-gray-600 font-medium">HIPAA Secure</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <Users className="w-8 h-8 text-purple-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold text-gray-900">12K+</div>
                    <div className="text-sm text-gray-600 font-medium">Active Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 observe">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Ready to Transform Your Diabetes Care?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of patients and healthcare providers who trust DiaWellness for comprehensive diabetes management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Schedule Demo
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span className="font-medium">FDA Recognized</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              <span className="font-medium">4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">
              Have questions? We're here to help you on your diabetes care journey
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Cards */}
            <div className="grid gap-6 lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-3">Speak with our care team</p>
                <a href="tel:+1-800-DIABETES" className="text-blue-600 font-semibold hover:text-blue-700">+1-800-DIABETES</a>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                  <Mail className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 mb-3">Get support via email</p>
                <a href="mailto:support@diawellness.com" className="text-emerald-600 font-semibold hover:text-emerald-700">support@diawellness.com</a>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-3">Healthcare Innovation Center</p>
                <p className="text-purple-600 font-semibold">San Francisco, CA</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors" placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors resize-none" placeholder="Tell us more about your inquiry..."></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2">
                  Send Message
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold">DiaWellness</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering better diabetes care through intelligent technology and compassionate healthcare. Join thousands of patients and providers transforming diabetes management.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="w-5 h-5 bg-blue-500 rounded"></div>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="w-5 h-5 bg-blue-400 rounded-full"></div>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="w-5 h-5 bg-pink-500 rounded"></div>
                </div>
              </div>
            </div>
            
            {/* Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">News</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">© 2025 DiaWellness. All rights reserved.</p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
            
            {/* Trust Badges in Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 pt-8 border-t border-gray-800">
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="w-4 h-4" />
                <span className="text-sm">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Award className="w-4 h-4" />
                <span className="text-sm">FDA Recognized</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">SOC 2 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .observe {
          opacity: 0;
          transform: translateY(30px);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default App;