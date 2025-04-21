# Assassin's Creed Origins Inspired Portfolio

A modern, interactive portfolio website inspired by Assassin's Creed Origins, featuring immersive animations and Egyptian-themed design elements.

## Stage 1: Hero Section Implementation

### Current Features

#### 1. Scroll-Triggered Animations

- Blade slicing effect using GSAP ScrollTrigger
- Section pinning during animation sequence
- Custom particle effects during transitions
- Smooth scroll-based timing control

#### 2. Egyptian Theme Elements

- Floating hieroglyphic symbols (𓂀, 𓃭, 𓅓, 𓆣, 𓇯, 𓈖, 𓉔, 𓊖)
- Multi-layered hieroglyphic background
  - Base layer with scrolling patterns
  - Rotated middle layer with different symbols
  - Top layer featuring the Eye of Horus
- Desert sand particle effects

#### 3. Visual Effects

- Eagle Vision pulse animation
- Golden particle systems
- Dust fade animations
- Responsive background patterns

### Technical Implementation

#### Animation System

```typescript
// GSAP ScrollTrigger Configuration
scrollTrigger: {
  trigger: sectionRef.current,
  start: "top top",
  end: "+=200%",
  pin: true,
  pinSpacing: true,
  scrub: 1,
  anticipatePin: 1
}
```

#### Key Components

- Hero Section with pinned scrolling
- Multi-layered background system
- Particle generation system
- Interactive text animations

### Dependencies

- React with TypeScript
- GSAP (GreenSock Animation Platform)
- ScrollTrigger Plugin

### Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

### Next Steps (Upcoming)

- [ ] Add more AC Origins-themed interactions
- [ ] Implement navigation system
- [ ] Add project showcase section
- [ ] Enhance mobile responsiveness

### Contributing

Feel free to contribute to this project. Please make sure to:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

### License

MIT License - feel free to use this for your own portfolio!

Test-port
