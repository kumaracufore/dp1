import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("HOME");
  const [menuOpen, setMenuOpen] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);
  const experiencesRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const sandParticlesRef = useRef<HTMLDivElement>(null);
  const hieroglyphicsRef = useRef<HTMLDivElement>(null);
  const eagleVisionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (headingRef.current && experiencesRef.current && sectionRef.current) {
      // Create blade slice effect
      gsap.set(experiencesRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Initial pause
      tl.to({}, { duration: 0.5 }) // Add a small delay before starting

        // Blade animation sequence
        .to(experiencesRef.current, {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          duration: 1,
          ease: "power2.inOut",
        })
        .to(experiencesRef.current, {
          clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
          duration: 1,
          ease: "power2.out",
        })
        .to(experiencesRef.current, {
          color: "#FFD700",
          textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
          duration: 0.5,
        })
        // Add a pause at the end of the animation
        .to({}, { duration: 0.5 });

      // Particle effects
      const particles = gsap.to(experiencesRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          if (experiencesRef.current) {
            createParticle(experiencesRef.current);
          }
        },
        duration: 2,
      });

      return () => {
        particles.kill();
      };
    }
  }, []);

  useEffect(() => {
    if (sectionRef.current && heroRef.current) {
      // Create hieroglyphic symbols
      const symbols = ["𓂀", "𓃭", "𓅓", "𓆣", "𓇯", "𓈖", "𓉔", "𓊖"];
      const hieroglyphicsContainer = document.createElement("div");
      hieroglyphicsContainer.className = "hieroglyphics-container";
      sectionRef.current.appendChild(hieroglyphicsContainer);

      // Create multiple hieroglyphic elements
      for (let i = 0; i < 20; i++) {
        const symbol = document.createElement("div");
        symbol.className = "hieroglyphic-symbol";
        symbol.textContent =
          symbols[Math.floor(Math.random() * symbols.length)];
        hieroglyphicsContainer.appendChild(symbol);

        // Random position and timing
        gsap.set(symbol, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          opacity: 0,
          scale: 0,
        });

        // Animate symbols
        gsap.to(symbol, {
          opacity: 0.3,
          scale: 1,
          duration: 1,
          delay: i * 0.2,
          ease: "power2.out",
        });
      }

      // Eagle Vision pulse effect
      const eagleVision = document.createElement("div");
      eagleVision.className = "eagle-vision";
      sectionRef.current.appendChild(eagleVision);

      gsap.to(eagleVision, {
        scale: 1.5,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power1.out",
      });

      // Sand particles
      const createSandParticle = () => {
        const particle = document.createElement("div");
        particle.className = "sand-particle";
        sectionRef.current?.appendChild(particle);

        const startX = Math.random() * window.innerWidth;
        const endX = startX + (Math.random() - 0.5) * 200;

        gsap.fromTo(
          particle,
          {
            x: startX,
            y: -20,
            opacity: 0.8,
            scale: Math.random() * 0.5 + 0.5,
          },
          {
            y: window.innerHeight + 20,
            x: endX,
            opacity: 0,
            duration: 3 + Math.random() * 2,
            ease: "none",
            onComplete: () => {
              particle.remove();
              if (sectionRef.current) createSandParticle();
            },
          }
        );
      };

      // Create initial sand particles
      for (let i = 0; i < 20; i++) {
        createSandParticle();
      }

      return () => {
        hieroglyphicsContainer.remove();
        eagleVision.remove();
      };
    }
  }, []);

  // Function to create particle effects
  const createParticle = (element: HTMLElement) => {
    const particle = document.createElement("div");
    particle.className = "blade-particle";
    document.body.appendChild(particle);

    const rect = element.getBoundingClientRect();
    const x = rect.left + Math.random() * rect.width;
    const y = rect.top + Math.random() * rect.height;

    gsap.set(particle, {
      x,
      y,
      scale: Math.random() * 0.5 + 0.5,
    });

    gsap.to(particle, {
      duration: Math.random() * 1 + 0.5,
      x: x + (Math.random() - 0.5) * 100,
      y: y - 50 - Math.random() * 50,
      opacity: 0,
      scale: 0,
      ease: "power2.out",
      onComplete: () => particle.remove(),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F4E1] to-[#FFE17B] text-[#3B5998] font-sans">
      <style>
        {`
          @keyframes dustFade {
            0% {
              opacity: 1;
              transform: scale(1);
              filter: blur(0);
            }
            100% {
              opacity: 0;
              transform: scale(1.2);
              filter: blur(4px);
            }
          }
          .dust-fade {
            animation: none;
          }
          .dust-fade:hover {
            animation: dustFade 1.5s ease-out forwards;
          }
          .dust-fade:hover ~ .hidden-text {
            opacity: 1;
          }
          .hidden-text {
            opacity: 0;
            transition: opacity 0.3s ease-in;
          }

          /* Custom Scrollbar */
          ::-webkit-scrollbar {
            width: 4px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(59, 89, 152, 0.1);
          }
          
          ::-webkit-scrollbar-thumb {
            background: #FFD700;
            border-radius: 2px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #3B5998;
          }

          /* Firefox */
          * {
            scrollbar-width: thin;
            scrollbar-color: #FFD700 rgba(59, 89, 152, 0.1);
          }

          .blade-particle {
            position: fixed;
            width: 4px;
            height: 4px;
            background: #FFD700;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
          }

          .heading-slice {
            position: relative;
            display: inline-block;
          }

          .heading-slice::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent, rgba(255, 215, 0, 0.2), transparent);
            transform: translateX(-100%);
          }

          .section-pin {
            position: relative;
            z-index: 1;
          }

          .hieroglyphic-symbol {
            position: absolute;
            color: #FFD700;
            font-size: 2rem;
            pointer-events: none;
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
          }

          .hieroglyphics-container {
            position: absolute;
            inset: 0;
            z-index: 2;
            overflow: hidden;
          }

          .eagle-vision {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
            pointer-events: none;
            z-index: 1;
          }

          .sand-particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: linear-gradient(to bottom, #FFD700, #8B4513);
            border-radius: 50%;
            pointer-events: none;
            z-index: 2;
          }

          @keyframes eaglePulse {
            0% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.5;
            }
            100% {
              transform: translate(-50%, -50%) scale(1.5);
              opacity: 0;
            }
          }

          .hero-content {
            position: relative;
            z-index: 3;
          }

          .hero-background {
            position: absolute;
            inset: 0;
            z-index: 0;
            background-color: #C9B396FF;
            overflow: hidden;
          }

          .hero-background::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="%23FFD700" opacity="0.1">𓂀</text><text x="20%" y="30%" dominant-baseline="middle" text-anchor="middle" font-size="15" fill="%23FFD700" opacity="0.1">𓃭</text><text x="80%" y="70%" dominant-baseline="middle" text-anchor="middle" font-size="25" fill="%23FFD700" opacity="0.1">𓅓</text><text x="40%" y="80%" dominant-baseline="middle" text-anchor="middle" font-size="18" fill="%23FFD700" opacity="0.1">𓆣</text><text x="70%" y="20%" dominant-baseline="middle" text-anchor="middle" font-size="22" fill="%23FFD700" opacity="0.1">𓇯</text></svg>');
            background-size: 100px 100px;
            opacity: 0.15;
            animation: scrollHieroglyphs 60s linear infinite;
          }

          .hero-background::after {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at center, transparent 0%, #C9B396FF 100%);
            z-index: 1;
          }

          @keyframes scrollHieroglyphs {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 100px 100px;
            }
          }
        `}
      </style>
      {/* Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#1a237e]/95 shadow-lg backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="relative flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#" className="group flex items-center space-x-2">
                <div className="w-8 h-8 relative">
                  <div className="absolute inset-0 bg-[#FFD700] transform rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
                  <i className="fas fa-ankh absolute inset-0 flex items-center justify-center text-[#1a237e] text-xl group-hover:scale-110 transition-transform duration-500"></i>
                </div>
                <span
                  className={`text-xl font-bold tracking-wider ${
                    isScrolled ? "text-[#FFD700]" : "text-[#FFD700]"
                  } group-hover:text-[#FFF] transition-colors duration-300`}
                >
                  MEDJAY
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {["HOME", "PROJECTS", "SKILLS", "ABOUT", "CONTACT"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setActiveTab(item)}
                    className={`text-sm font-medium tracking-wider hover:text-[#FFD700] transition-colors duration-300
                    ${
                      activeTab === item
                        ? "text-[#FFD700]"
                        : isScrolled
                        ? "text-white"
                        : "text-white"
                    }`}
                  >
                    {item}
                  </a>
                )
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`p-2 rounded-lg ${
                  isScrolled ? "text-[#FFD700]" : "text-[#FFD700]"
                } hover:bg-[#FFD700]/10 transition-colors duration-300`}
              >
                <i
                  className={`fas ${menuOpen ? "fa-times" : "fa-bars"} text-xl`}
                ></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`px-4 py-2 space-y-1 ${
              isScrolled
                ? "bg-[#1a237e]/95 backdrop-blur-sm"
                : "bg-[#1a237e]/95"
            }`}
          >
            {["HOME", "PROJECTS", "SKILLS", "ABOUT", "CONTACT"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => {
                  setActiveTab(item);
                  setMenuOpen(false);
                }}
                className={`block w-full px-4 py-2 text-sm font-medium tracking-wider transition-colors duration-300 ${
                  activeTab === item
                    ? "text-[#FFD700]"
                    : "text-white hover:text-[#FFD700]"
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden section-pin"
      >
        <div className="hero-background">
          {/* Additional decorative hieroglyphic layers */}
          <div
            className="absolute inset-0 z-1"
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="10%" y="40%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="%23FFD700" opacity="0.1">𓈖</text><text x="60%" y="60%" dominant-baseline="middle" text-anchor="middle" font-size="15" fill="%23FFD700" opacity="0.1">𓉔</text><text x="30%" y="20%" dominant-baseline="middle" text-anchor="middle" font-size="25" fill="%23FFD700" opacity="0.1">𓊖</text></svg>')`,
              backgroundSize: "120px 120px",
              opacity: 0.1,
              transform: "rotate(45deg)",
              animation: "scrollHieroglyphs 80s linear infinite reverse",
            }}
          ></div>
          <div
            className="absolute inset-0 z-2"
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="40%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="30" fill="%23FFD700" opacity="0.1">𓂀</text></svg>')`,
              backgroundSize: "150px 150px",
              opacity: 0.08,
              animation: "scrollHieroglyphs 100s linear infinite",
            }}
          ></div>
        </div>
        <div
          ref={heroRef}
          className="container mx-auto px-6 z-10 flex flex-col md:flex-row items-center hero-content"
        >
          <div className="w-full md:w-1/2 text-white space-y-6 py-20 md:py-0">
            <div className="inline-block border-[#FFD700] mb-2 relative">
              <h2 className="text-[#FFE17B] text-xl dust-fade cursor-pointer">
                Hidden One
              </h2>
              <h2 className="text-[#FFE17B] text-xl hidden-text absolute top-0 left-0"></h2>
            </div>
            <h1
              ref={headingRef}
              className="text-5xl md:text-6xl font-bold leading-tight"
            >
              Crafting Digital{" "}
              <span ref={experiencesRef} className="heading-slice">
                Experiences
              </span>{" "}
              With Purpose
            </h1>
            <p className="text-lg md:text-xl text-[#FFE17B] max-w-lg">
              "Nothing is true, everything is permitted" in design. I
              synchronize ancient wisdom with Animus technology to create
              interfaces that transcend time itself.
            </p>
            <div className="flex space-x-4 pt-4">
              <button className="bg-[#FF8936] hover:bg-[#F7B05B] text-white px-8 py-3 rounded-md transition-all duration-300 font-medium cursor-pointer whitespace-nowrap !rounded-button">
                View Projects
              </button>
              <button className="border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 px-8 py-3 rounded-md transition-all duration-300 font-medium cursor-pointer whitespace-nowrap !rounded-button">
                Contact Me
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <i className="fas fa-chevron-down text-2xl"></i>
        </div>
      </section>
      {/* Projects Section */}
      <section className="py-20 bg-[#f7e9d7]/80">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#3B5998] mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto"></div>
            <p className="mt-6 text-lg max-w-2xl mx-auto text-[#3B5998]">
              Initiate synchronization with my memories through the Animus to
              discover designs that bridge the gap between the Brotherhood's
              past and future.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Abstergo Analytics Dashboard",
                category: "Animus Interface",
                image:
                  "https://readdy.ai/api/search-image?query=Video%20game%20style%20Egyptian%20wall%20painting%20showing%20ancient%20data%20visualization%20and%20hieroglyphic%20symbols%2C%20stylized%20dashboard%20elements%20integrated%20into%20temple%20wall%20art%2C%20non%20photorealistic%20game%20art%20style%20with%20rich%20colors%20and%20patterns%2C%20inspired%20by%20gaming%20interfaces&width=600&height=400&seq=2&orientation=landscape",
              },
              {
                title: "Brotherhood Marketplace",
                category: "Eagle Vision UX",
                image:
                  "https://readdy.ai/api/search-image?query=Ancient%20Egyptian%20wall%20mural%20in%20video%20game%20style%20showing%20marketplace%20scenes%2C%20stylized%20hieroglyphic%20product%20displays%20and%20trading%20activities%2C%20digital%20game%20art%20aesthetic%20with%20rich%20colors%2C%20non%20photorealistic%20temple%20wall%20painting%20style%20with%20commercial%20elements&width=600&height=400&seq=3&orientation=landscape",
              },
              {
                title: "Leap of Faith Navigator",
                category: "Synchronization Design",
                image:
                  "https://readdy.ai/api/search-image?query=Video%20game%20style%20Egyptian%20wall%20art%20depicting%20travel%20scenes%20along%20the%20Nile%2C%20ancient%20map%20elements%20and%20navigation%20symbols%20in%20temple%20mural%20style%2C%20stylized%20game%20interface%20elements%20integrated%20into%20wall%20paintings%2C%20non%20photorealistic%20digital%20art%20with%20rich%20cultural%20patterns&width=600&height=400&seq=4&orientation=landscape",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3B5998]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6">
                      <span className="text-[#FFE17B] text-sm font-medium tracking-wider">
                        {project.category}
                      </span>
                      <h3 className="text-white text-xl font-bold mt-1">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#3B5998] group-hover:text-[#FF8936] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-[#3c2a1a] mt-2">
                    A unique design solution blending ancient aesthetics with
                    modern functionality.
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-[#3B5998] font-medium">
                      {project.category}
                    </span>
                    <button className="text-[#FF8936] hover:text-[#F7B05B] transition-colors duration-300 cursor-pointer whitespace-nowrap !rounded-button">
                      View Details <i className="fas fa-arrow-right ml-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="border-2 border-[#3B5998] text-[#3B5998] hover:bg-[#3B5998] hover:text-white px-8 py-3 rounded-md transition-all duration-300 font-medium cursor-pointer whitespace-nowrap !rounded-button">
              View All Projects
            </button>
          </div>
        </div>
      </section>
      {/* Skills Section */}
      <section className="py-20 bg-[#1A1A1A] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Ancient%20Egyptian%20temple%20wall%20with%20Abstergo%20Industries%20symbols%20seamlessly%20integrated%20into%20hieroglyphics%2C%20mysterious%20dark%20atmosphere%20with%20golden%20light%20streams%2C%20technological%20patterns%20merged%20with%20sacred%20geometry%2C%20Assassins%20Creed%20Origins%20inspired%20architectural%20details&width=1920&height=1080&seq=5&orientation=landscape')`,
          }}
        ></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block">
              <i className="fas fa-microchip text-[#FFD700] text-4xl mb-4"></i>
              <h2 className="text-4xl font-bold text-[#FFD700] mb-4">
                Animus Skill Matrix
              </h2>
            </div>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto"></div>
            <p className="mt-6 text-lg max-w-2xl mx-auto text-gray-300">
              Synchronization status of design capabilities, enhanced through
              the Animus technology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                {
                  name: "Interface Synchronization",
                  level: 90,
                  color: "#3B5998",
                },
                {
                  name: "User Experience Analysis",
                  level: 85,
                  color: "#FFD700",
                },
                {
                  name: "Interactive Protocol Design",
                  level: 80,
                  color: "#3B5998",
                },
                {
                  name: "Visual Matrix Composition",
                  level: 95,
                  color: "#FFD700",
                },
              ].map((skill, index) => (
                <div
                  key={index}
                  className="bg-black/50 p-6 rounded-lg backdrop-blur-sm border border-gray-800"
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-[#3B5998] flex items-center">
                      <i className="fas fa-microchip mr-2 text-[#FFD700]"></i>
                      {skill.name}
                    </span>
                    <span className="text-[#FFD700] font-mono">
                      Sync: {skill.level}%
                    </span>
                  </div>
                  <div className="h-3 bg-[#3B5998]/20 rounded-full overflow-hidden relative">
                    <div
                      className="h-full rounded-full relative overflow-hidden"
                      style={{ width: `${skill.level}%` }}
                    >
                      <div
                        className="absolute inset-0 animate-pulse"
                        style={{
                          background: `linear-gradient(90deg, ${skill.color}, #FFFFFF, ${skill.color})`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: "Figma Protocol", icon: "fa-figma", level: "Master" },
                { name: "Adobe Matrix", icon: "fa-adobe", level: "Expert" },
                { name: "Sketch Engine", icon: "fa-sketch", level: "Advanced" },
                {
                  name: "PS Neural Net",
                  icon: "fa-layer-group",
                  level: "Master",
                },
                {
                  name: "Vector Synthesis",
                  icon: "fa-bezier-curve",
                  level: "Expert",
                },
                {
                  name: "Reality Engine",
                  icon: "fa-vr-cardboard",
                  level: "Advanced",
                },
                { name: "Code Matrix", icon: "fa-code", level: "Expert" },
                { name: "Logic Core", icon: "fa-microchip", level: "Master" },
              ].map((tool, index) => (
                <div
                  key={index}
                  className="bg-black/50 p-6 rounded-lg backdrop-blur-sm border border-gray-800 hover:border-[#FF1A1A] transition-all duration-300 group"
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#3B5998]/20 to-[#FFD700]/20 rounded-full mb-4 mx-auto group-hover:from-[#3B5998]/40 group-hover:to-[#FFD700]/40">
                    <i
                      className={`fas ${tool.icon} text-2xl text-[#3B5998] group-hover:text-[#FFD700] transition-colors duration-300`}
                    ></i>
                  </div>
                  <h3 className="font-medium text-center text-gray-300 group-hover:text-white">
                    {tool.name}
                  </h3>
                  <div className="mt-2 text-center">
                    <span className="text-xs font-mono text-[#00FFFF]">
                      {tool.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <i className="fas fa-eagle text-[#FFD700] text-2xl mr-2"></i>
                <h2 className="text-xl font-bold">MEDJAY</h2>
              </div>
              <p className="text-gray-400 max-w-md">
                Working in the dark to serve the light. Creating digital
                experiences that synchronize the Creed's ancient wisdom with
                modern innovation. Nothing is true, everything is permitted.
              </p>
              <div className="flex space-x-4 mt-6">
                {[
                  "fa-twitter",
                  "fa-instagram",
                  "fa-dribbble",
                  "fa-linkedin-in",
                ].map((icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#3B5998] flex items-center justify-center hover:bg-[#FFD700] transition-colors duration-300 cursor-pointer"
                  >
                    <i className={`fab ${icon} text-white`}></i>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#FFE17B]">
                Navigation
              </h3>
              <ul className="space-y-2">
                {["Home", "Projects", "Skills", "About", "Contact"].map(
                  (item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300 cursor-pointer"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#FFE17B]">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-3 text-[#FFD700]"></i>
                  <span>Bureau of Alexandria, Egypt</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-envelope mt-1 mr-3 text-[#FFD700]"></i>
                  <span>medjay@hidden-ones.design</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-phone mt-1 mr-3 text-[#FFD700]"></i>
                  <span>+20 123 456 7890</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 Hidden Ones Bureau. Safety and peace be upon you.
            </p>
            <div className="mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-500 hover:text-[#FFD700] text-sm transition-colors duration-300 cursor-pointer"
              >
                Privacy Policy
              </a>
              <span className="mx-2 text-gray-700">|</span>
              <a
                href="#"
                className="text-gray-500 hover:text-[#FFD700] text-sm transition-colors duration-300 cursor-pointer"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#FFD700] text-[#3B5998] flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap !rounded-button ${
          isScrolled ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <i className="fas fa-chevron-up"></i>
      </button>
    </div>
  );
};

export default App;
