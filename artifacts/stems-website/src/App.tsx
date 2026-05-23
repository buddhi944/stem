import React, { useState, useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Map, 
  Ruler, 
  ShieldCheck, 
  HardHat, 
  Eye,
  ChevronRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Linkedin,
  Facebook,
  Twitter,
  ArrowUpRight
} from "lucide-react";
import { useSubmitContact } from "@workspace/api-client-react";
import { SubmitContactBody } from "../../../lib/api-zod/src/generated/api";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Constants
const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Process", href: "#process" },
  { name: "Why Us", href: "#why-us" },
  { name: "Testimonials", href: "#testimonials" },
];

const SERVICES = [
  {
    title: "Structural Engineering",
    desc: "Comprehensive structural engineering solutions for commercial, residential, industrial, and infrastructure developments with advanced structural analysis and design methodologies.",
    icon: Building2
  },
  {
    title: "Building Consultancy",
    desc: "Professional consultancy services for construction projects including technical assessments, design recommendations, structural evaluations, and compliance guidance.",
    icon: Map
  },
  {
    title: "Project Management",
    desc: "End-to-end project management services ensuring timely execution, cost control, quality assurance, and effective coordination throughout the construction lifecycle.",
    icon: Ruler
  },
  {
    title: "Geo-technical Engineering",
    desc: "Advanced geo-technical engineering services including soil investigations, foundation recommendations, site analysis, and ground stability assessments.",
    icon: MapPin
  },
  {
    title: "Building Health Monitoring",
    desc: "Modern structural health monitoring systems and inspection services to evaluate building performance, durability, and long-term structural integrity.",
    icon: ShieldCheck
  },
  {
    title: "Peer Review of Buildings",
    desc: "Independent technical peer review services for structural designs ensuring compliance, safety, and engineering excellence across all project types.",
    icon: Eye
  }
];

const PROJECTS = [
  {
    id: 1,
    title: "Commercial Tower Development",
    category: "Commercial",
    desc: "A 45-story modern commercial tower with advanced lateral load resisting systems.",
    image: "/images/project-commercial.png"
  },
  {
    id: 2,
    title: "Residential Complex Project",
    category: "Residential",
    desc: "High-end residential complex with post-tensioned slab designs.",
    image: "/images/project-residential.png"
  },
  {
    id: 3,
    title: "Industrial Infrastructure",
    category: "Industrial",
    desc: "Large-scale logistics warehouse utilizing long-span steel structures.",
    image: "/images/project-industrial.png"
  },
  {
    id: 4,
    title: "Bridge Engineering Project",
    category: "Infrastructure",
    desc: "Modern cable-stayed bridge spanning 150 meters.",
    image: "/images/project-bridge.png"
  },
  {
    id: 5,
    title: "Airport Terminal Expansion",
    category: "Infrastructure",
    desc: "Complex roof truss structures for international airport terminal.",
    image: "/images/project-airport.png"
  },
  {
    id: 6,
    title: "Educational Campus Development",
    category: "Commercial",
    desc: "State-of-the-art university campus with green building standards.",
    image: "/images/project-educational.png"
  }
];

const PROCESS_STEPS = [
  {
    title: "Planning",
    desc: "Site assessment, feasibility study, requirement analysis"
  },
  {
    title: "Design",
    desc: "Structural design, engineering drawings, technical specifications"
  },
  {
    title: "Construction Supervision",
    desc: "On-site monitoring, quality control, safety compliance"
  },
  {
    title: "Project Completion",
    desc: "Final inspection, handover, documentation"
  }
];

const TESTIMONIALS = [
  {
    quote: "STEMS delivered exceptional structural engineering work on our commercial tower project. Their precision and expertise were evident at every stage.",
    author: "Rajiv Perera",
    role: "Director",
    company: "Ceylon Properties Ltd"
  },
  {
    quote: "We've partnered with STEMS for multiple residential developments. Their team's commitment to safety and quality is unmatched in Sri Lanka.",
    author: "Dilrukshi Silva",
    role: "CEO",
    company: "Urban Homes Pvt Ltd"
  },
  {
    quote: "The geotechnical assessment conducted by STEMS gave us complete confidence before breaking ground. Highly professional and thorough.",
    author: "Michael Fernando",
    role: "Project Manager",
    company: "Lanka Infrastructure"
  },
  {
    quote: "STEMS' peer review service identified critical improvements that saved our project significant costs. Truly expert engineers.",
    author: "Niroshan Jayawardena",
    role: "Director",
    company: "BuildRight Engineering"
  }
];

// Components
const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-[var(--stems-sky)] origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? "glass-nav py-3 shadow-md" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-white rounded-xl p-1.5 shadow-md">
            <img
              src="/images/stems-logo.png"
              alt="STEMS Consultants"
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[var(--stems-sky)] ${scrolled ? "text-[var(--stems-navy)]" : "text-white"}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a href="#contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[var(--stems-structural)] text-white hover:bg-[var(--stems-deep-steel)] h-10 px-4 py-2">
            Get In Touch
          </a>
        </div>

        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className={scrolled ? "text-black" : "text-white"} /> : <Menu className={scrolled ? "text-black" : "text-white"} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-4 flex flex-col md:hidden"
          >
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-3 text-[var(--stems-navy)] font-medium hover:bg-gray-50"
              >
                {link.name}
              </a>
            ))}
            <div className="px-6 pt-4 pb-2">
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium bg-[var(--stems-structural)] text-white h-10 px-4 py-2">
                Get In Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ContactForm = () => {
  const { toast } = useToast();
  const submitContactMutation = useSubmitContact();

  const form = useForm<z.infer<typeof SubmitContactBody>>({
    resolver: zodResolver(SubmitContactBody),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = (values: z.infer<typeof SubmitContactBody>) => {
    submitContactMutation.mutate({ data: values }, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Message sent successfully! We'll get back to you soon.",
        });
        form.reset();
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again later.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-[var(--stems-sky)]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" type="email" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-[var(--stems-sky)]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Phone (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="+94 77 123 4567" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-[var(--stems-sky)]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Subject</FormLabel>
              <FormControl>
                <Input placeholder="How can we help?" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-[var(--stems-sky)]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your message here..." className="min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-[var(--stems-sky)]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full bg-[var(--stems-sky)] text-[var(--stems-dark-navy)] hover:bg-white hover:text-[var(--stems-navy)] font-semibold"
          disabled={submitContactMutation.isPending}
        >
          {submitContactMutation.isPending ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
};

const HERO_IMAGES = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.png",
  "/images/hero-4.jpg",
  "/images/hero-5.jpg",
  "/images/hero-6.jpg",
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Sliding background images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${HERO_IMAGES[currentImage]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </AnimatePresence>

      {/* Deep blue gradient overlay for text visibility */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, rgba(4,41,74,0.93) 0%, rgba(6,59,109,0.88) 40%, rgba(13,94,168,0.70) 70%, rgba(13,94,168,0.45) 100%)",
        }}
      />

      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 z-10 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-[var(--stems-sky)] font-medium text-sm mb-6"
          >
            Leading Structural Engineering Consultancy in Sri Lanka
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-7xl font-heading font-bold text-white leading-tight mb-6"
          >
            Engineering Stronger Futures Through{" "}
            <span className="text-gradient">Structural Excellence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-xl text-[var(--stems-ice)]/90 max-w-2xl mb-8 md:mb-10 leading-relaxed"
          >
            Delivering innovative, reliable, and cost-effective structural engineering solutions through expertise, precision, and modern engineering practices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a
              href="#projects"
              className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--stems-sky)] px-8 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[var(--stems-dark-navy)]"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/60 px-8 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact Us
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 border-t border-white/20 pt-6 md:pt-8"
          >
            {[
              "40+ Years Experience",
              "1000+ Projects Completed",
              "Expert Engineering Team",
              "Trusted Industry Reputation",
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2 text-white text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-[var(--stems-sky)] shrink-0" />
                <span>{stat}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Image indicator dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentImage ? "bg-white w-6" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="min-h-screen bg-[var(--background)] font-sans text-[var(--foreground)] selection:bg-[var(--stems-sky)] selection:text-white overflow-x-hidden">
      <ProgressBar />
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-gradient-light">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-[var(--stems-structural)] font-bold tracking-wider text-sm mb-4">ABOUT STEMS</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[var(--stems-navy)] mb-6">
                Engineering Solutions That Build Better Futures
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                Welcome to STEMS Consultants Pte Ltd, a highly respected structural engineering consultancy firm specializing in civil and structural engineering solutions. With more than 40 years of industry expertise, our experienced engineering team delivers innovative, safe, and cost-effective structural solutions tailored to each client's unique requirements. From conceptual planning to project completion, we collaborate closely with architects, developers, and clients to ensure exceptional project delivery standards.
              </p>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-8 md:mb-10">
                <div>
                  <div className="text-4xl font-bold text-[var(--stems-structural)] mb-2">40+</div>
                  <div className="text-sm font-medium text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[var(--stems-structural)] mb-2">1000+</div>
                  <div className="text-sm font-medium text-gray-600">Projects Completed</div>
                </div>
              </div>

              <a href="#services" className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--stems-navy)] px-8 text-sm font-semibold text-white transition-colors hover:bg-[var(--stems-structural)]">
                More About Us
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative h-[380px] sm:h-[480px] md:h-[600px]"
            >
              <div className="absolute inset-0 bg-[var(--stems-navy)] rounded-2xl overflow-hidden shadow-2xl transform rotate-2">
                <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                <div className="p-8 h-full flex flex-col justify-center space-y-6">
                  <div className="glass-card p-6 rounded-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-2">Mission</h3>
                    <p className="text-white/80">Deliver innovative and sustainable engineering solutions with integrity and excellence.</p>
                  </div>
                  <div className="glass-card p-6 rounded-xl transform rotate-1 hover:rotate-0 transition-transform duration-300 ml-8">
                    <h3 className="text-xl font-bold text-white mb-2">Vision</h3>
                    <p className="text-white/80">To be the preferred engineering consultant building a better and smarter tomorrow.</p>
                  </div>
                  <div className="glass-card p-6 rounded-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-2">Values</h3>
                    <p className="text-white/80">Integrity, Innovation, Teamwork, Safety and Commitment to Excellence.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-10 md:mb-16">
            <div className="text-[var(--stems-structural)] font-bold tracking-wider text-sm mb-4">OUR SERVICES</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[var(--stems-navy)]">
              Comprehensive Engineering Solutions
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative p-6 md:p-8 rounded-2xl bg-[var(--stems-ice)] border border-[var(--stems-blueprint)] hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--stems-sky)]/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
                <service.icon className="w-12 h-12 text-[var(--stems-structural)] mb-6" />
                <h3 className="text-xl font-bold text-[var(--stems-navy)] mb-4">{service.title}</h3>
                <p className="text-gray-600 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                  {service.desc}
                </p>
                <div className="mt-6 flex items-center text-[var(--stems-structural)] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-[var(--stems-dark-navy)]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16">
            <div>
              <div className="text-[var(--stems-sky)] font-bold tracking-wider text-sm mb-4">FEATURED PROJECTS</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white">
                Building Landmarks, Creating Impact
              </h2>
            </div>
            <div className="mt-5 md:mt-0 flex flex-wrap gap-2">
              {["All", "Commercial", "Residential", "Industrial", "Infrastructure"].map(tab => (
                <button key={tab} className="px-4 py-2 rounded-full text-sm font-medium border border-white/20 text-white hover:bg-white hover:text-[var(--stems-navy)] transition-colors">
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--stems-dark-navy)] via-[var(--stems-navy)]/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[var(--stems-sky)] text-xs font-bold uppercase tracking-wider mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {project.desc}
                  </p>
                </div>
                <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12 md:mb-20">
            <div className="text-[var(--stems-structural)] font-bold tracking-wider text-sm mb-4">OUR PROCESS</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[var(--stems-navy)]">
              From Concept to Completion
            </h2>
          </div>

          <div className="relative">
            {/* Horizontal line — desktop only */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-1 bg-[var(--stems-blueprint)]" />
            {/* Vertical line — mobile only */}
            <div className="md:hidden absolute top-0 left-8 h-full w-0.5 bg-[var(--stems-blueprint)]" />

            <div className="grid md:grid-cols-4 gap-8 md:gap-6">
              {PROCESS_STEPS.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className="relative flex md:flex-col items-start md:items-center gap-5 md:gap-0 md:text-center"
                >
                  <div className="w-16 h-16 shrink-0 rounded-full bg-white border-4 border-[var(--stems-structural)] flex items-center justify-center text-xl font-bold text-[var(--stems-navy)] z-10 md:mb-6 shadow-lg">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--stems-navy)] mb-2 md:mb-3">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-16 md:py-24 bg-gradient-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <div className="text-white/80 font-bold tracking-wider text-sm mb-4">WHY CHOOSE US</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white">
              The STEMS Difference
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              "40+ Years of Industry Experience",
              "Cost-Effective Engineering Solutions",
              "Team of Chartered Expert Engineers",
              "Innovative Structural Design Approach",
              "Reliable & Timely Project Delivery",
              "Safety-First Engineering Practice"
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-card p-8 rounded-xl flex items-start gap-4 group hover:border-[var(--stems-sky)] transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[var(--stems-sky)]" />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-[var(--stems-sky)] transition-colors">
                  {feature}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-10 md:mb-16">
            <div className="text-[var(--stems-structural)] font-bold tracking-wider text-sm mb-4">CLIENT TESTIMONIALS</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[var(--stems-navy)]">
              Trusted by Industry Leaders
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 md:p-8 rounded-2xl bg-[var(--stems-ice)] border border-[var(--stems-blueprint)] relative"
              >
                <div className="text-4xl text-[var(--stems-sky)]/20 absolute top-6 right-8 font-serif">"</div>
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed relative z-10">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--stems-navy)] text-white flex items-center justify-center font-bold">
                    {t.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--stems-navy)]">{t.author}</h4>
                    <p className="text-sm text-gray-500">{t.role}, {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-[var(--stems-navy)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--stems-dark-navy)] transform -skew-x-12 translate-x-32 hidden lg:block" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16">
            <div>
              <div className="text-[var(--stems-sky)] font-bold tracking-wider text-sm mb-4">GET IN TOUCH</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 md:mb-8">
                Let's Build Something Great Together
              </h2>
              <p className="text-white/80 mb-8 md:mb-12 text-base md:text-lg">
                Ready to discuss your next project? Our team of expert engineers is here to provide innovative structural solutions tailored to your needs.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--stems-sky)]/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-[var(--stems-sky)]" />
                  </div>
                  <div>
                    <div className="text-xs md:text-sm text-white/60 mb-1">Call Us Directly</div>
                    <div className="text-base md:text-xl font-bold text-white">+94 011-2697808</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--stems-sky)]/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-[var(--stems-sky)]" />
                  </div>
                  <div>
                    <div className="text-xs md:text-sm text-white/60 mb-1">Email Us</div>
                    <div className="text-base md:text-xl font-bold text-white">info@stems.lk</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--stems-sky)]/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[var(--stems-sky)]" />
                  </div>
                  <div>
                    <div className="text-xs md:text-sm text-white/60 mb-1">Visit Our Office</div>
                    <div className="text-base md:text-xl font-bold text-white">Colombo, Sri Lanka</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--stems-dark-navy)] p-6 md:p-10 rounded-2xl border border-white/10 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#02182B] pt-14 md:pt-20 pb-10 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="bg-white rounded-xl p-1.5 shadow-md">
                  <img
                    src="/images/stems-logo.png"
                    alt="STEMS Consultants"
                    className="h-10 w-auto object-contain"
                  />
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Leading structural engineering consultancy in Sri Lanka, delivering innovative and cost-effective solutions for over 40 years.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[var(--stems-sky)] hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[var(--stems-sky)] hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[var(--stems-sky)] hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wider text-sm">QUICK LINKS</h4>
              <ul className="space-y-4">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-white/60 hover:text-[var(--stems-sky)] transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 tracking-wider text-sm">OUR SERVICES</h4>
              <ul className="space-y-4">
                {SERVICES.map((s, i) => (
                  <li key={i}>
                    <a href="#services" className="text-white/60 hover:text-[var(--stems-sky)] transition-colors text-sm">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 tracking-wider text-sm">CONTACT INFO</h4>
              <ul className="space-y-4">
                <li className="flex gap-3 text-white/60 text-sm">
                  <MapPin className="w-5 h-5 shrink-0 text-[var(--stems-sky)]" />
                  <span>Colombo, Sri Lanka</span>
                </li>
                <li className="flex gap-3 text-white/60 text-sm">
                  <Phone className="w-5 h-5 shrink-0 text-[var(--stems-sky)]" />
                  <span>+94 011-2697808</span>
                </li>
                <li className="flex gap-3 text-white/60 text-sm">
                  <Mail className="w-5 h-5 shrink-0 text-[var(--stems-sky)]" />
                  <span>info@stems.lk</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              © {new Date().getFullYear()} STEMS Consultants Pte Ltd. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/40">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </div>
    </QueryClientProvider>
  );
}
