import { Suspense, useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Float, MeshDistortMaterial, Sphere, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink, Code, Database, Globe, Rocket, X, CheckCircle2, ArrowRight, Grab, Hand, Menu, Download } from 'lucide-react'

function useFaviconAnimation() {
  useEffect(() => {
    const favicon = document.getElementById('favicon');
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    let frame = 0;
    
    // Scrolling title setup
    const baseTitle = "Faraz Shafi | Full-Stack Engineer ";
    let titleIndex = 0;

    const animate = () => {
      if (!favicon) return;
      
      const size = 32;
      ctx.clearRect(0, 0, size, size);
      
      // Calculate dynamic values
      const pulse = Math.sin(frame * 0.15);
      const rotation = frame * 0.1;
      const hue = (270 + Math.sin(frame * 0.05) * 30) % 360; // oscillate between purple and blue
      
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.rotate(rotation);
      
      // Draw outer glow
      const gradient = ctx.createRadialGradient(0, 0, 4, 0, 0, 16);
      gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, 1)`);
      gradient.addColorStop(1, `hsla(${hue}, 100%, 60%, 0)`);
      
      ctx.beginPath();
      ctx.arc(0, 0, 14 + pulse * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw rotating core square
      ctx.beginPath();
      const rectSize = 12 + pulse * 2;
      ctx.roundRect(-rectSize/2, -rectSize/2, rectSize, rectSize, 3);
      ctx.fillStyle = `hsla(${hue}, 100%, 70%, 1)`;
      ctx.fill();
      
      // Inner dot
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();

      favicon.href = canvas.toDataURL('image/png');
      
      // Title scrolling
      if (frame % 2 === 0) { // Faster title scroll
        document.title = baseTitle.substring(titleIndex) + baseTitle.substring(0, titleIndex);
        titleIndex = (titleIndex + 1) % baseTitle.length;
      }

      frame++;
    };

    const intervalId = setInterval(animate, 100);
    return () => {
      clearInterval(intervalId);
      document.title = "Faraz Shafi | Full-Stack Engineer"; // Reset title on unmount
    };
  }, []);
}

function InteractiveBackground() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#7000ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
        <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
        <Rig />
        <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
          <Sphere args={[1.5, 64, 64]} position={[3, -1, -2]}>
            <MeshDistortMaterial color="#200040" attach="material" distort={0.5} speed={2} roughness={0.2} metalness={0.8} />
          </Sphere>
        </Float>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[-3, 2, -3]}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#7000ff" wireframe />
          </mesh>
        </Float>
      </Canvas>
    </div>
  )
}

function Rig() {
  const { camera, mouse } = useThree()
  const vec = new THREE.Vector3()
  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 0.5, mouse.y * 0.5, camera.position.z), 0.05)
    camera.lookAt(0, 0, 0)
  })
}

function CustomCursor({ cursorState }) {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const isHovering = cursorState === 'hover';
  const isGrabbing = cursorState === 'grabbing';
  const isDownloading = cursorState === 'download';

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }
    window.addEventListener('pointermove', moveCursor)
    window.addEventListener('pointerdown', moveCursor)
    return () => {
      window.removeEventListener('pointermove', moveCursor)
      window.removeEventListener('pointerdown', moveCursor)
    }
  }, [])

  return (
    <motion.div
      className={`custom-cursor ${(isHovering || isGrabbing || isDownloading) ? 'hovering' : ''}`}
      style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
      animate={{
        scale: (isHovering || isGrabbing || isDownloading) ? 1.8 : 1,
        borderColor: (isHovering || isGrabbing || isDownloading) ? '#00ffff' : '#7000ff',
        backgroundColor: (isHovering || isGrabbing || isDownloading) ? 'rgba(0, 255, 255, 0.1)' : 'rgba(112, 0, 255, 0)'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <AnimatePresence>
        {(isHovering || isGrabbing || isDownloading) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="cursor-icon"
          >
            {isDownloading ? <Download size={18} color="#00ff88" /> : 
             isGrabbing ? <Hand size={18} color="#00ffff" /> : 
             <Grab size={18} color="#00ffff" />}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ProjectCard({ title, description, tags, image, github, index, onSelect }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]), { damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]), { damping: 20 });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="project-card"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - (rect.left + rect.width / 2));
          y.set(e.clientY - (rect.top + rect.height / 2));
        }}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        onClick={onSelect}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", cursor: 'pointer' }}
      >
        <div className="project-image-container" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', transform: "translateZ(50px)" }}>
          <div className="project-overlay">
            <div className="project-links">
              <a href={github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}><Github size={24} /></a>
              <ExternalLink size={24} />
            </div>
          </div>
        </div>
        <div className="project-content" style={{ transform: "translateZ(30px)" }}>
          <div className="project-tags">
            {tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="modal-content" initial={{ scale: 0.8, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.8, y: 50, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        <div className="modal-grid">
          <div className="modal-image" style={{ backgroundImage: `url(${project.image})` }}></div>
          <div className="modal-info">
            <div className="project-tags">{project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</div>
            <h2>{project.title}</h2>
            <p className="modal-desc">{project.longDescription}</p>
            <div className="features-list">
              <h3>Key Features</h3>
              {project.features.map((feature, i) => (
                <div key={i} className="feature-item"><CheckCircle2 size={18} color="var(--accent-color)" /><span>{feature}</span></div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-primary">Source Code</a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ResumeSection({ onCursorStateChange }) {
  const [isDropped, setIsDropped] = useState(false);
  const pdfRef = useRef();

  const lastDownloadTime = useRef(0);
  const handleDownload = () => {
    const now = Date.now();
    if (now - lastDownloadTime.current < 2000) return; // 2s debounce
    lastDownloadTime.current = now;

    const link = document.createElement('a');
    link.href = '/faraz-shafi-resume.pdf';
    link.download = 'Faraz_Shafi_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDropped(true);
    setTimeout(() => setIsDropped(false), 2000);
  };

  return (
    <section id="resume" className="resume-section">
      <div className="section-header">
        <span className="section-number">03</span>
        <h2>Professional Path</h2>
      </div>
      <div className="resume-grid" style={{ position: 'relative' }}>
        <div className="resume-visual-bg">
          <div 
            className="resume-3d-container-v2"
            onMouseEnter={() => onCursorStateChange('hover')}
            onMouseLeave={() => onCursorStateChange('default')}
          >
            <div className="drag-hint">DRAG RESUME TO DOWNLOAD</div>
          </div>
          <div className={`download-zone ${isDropped ? 'success' : ''}`}>
            <div className="zone-content">
              <motion.div
                animate={isDropped ? { scale: [1, 1.2, 1], rotate: [0, 360, 0] } : { y: [0, -10, 0] }}
                transition={{ repeat: isDropped ? 0 : Infinity, duration: 2 }}
              >
                {isDropped ? <CheckCircle2 size={80} color="#00ff88" /> : <Rocket size={80} color="var(--accent-color)" />}
              </motion.div>
              <h3>{isDropped ? 'Downloading...' : 'Drop Zone'}</h3>
              <p>Ready for impact? Drag the 3D resume here.</p>
            </div>
            <div className="zone-glow"></div>
          </div>
        </div>
        
        <div className="resume-canvas-overlay">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
              <DraggablePDF onDrop={handleDownload} onStateChange={onCursorStateChange} />
            </Suspense>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          </Canvas>
        </div>
      </div>
    </section>
  );
}

function DraggablePDF({ onDrop, onStateChange }) {
  const meshRef = useRef();
  const { viewport } = useThree();
  const { scene } = useGLTF('/document-3d/scene.gltf');
  
  const restingPos = useMemo(() => {
    if (viewport.width < 5) return [0, viewport.height / 4, 0]; // Centered in top box for mobile
    return [-viewport.width / 4, 0, 0]; // Centered in left box for desktop
  }, [viewport.width, viewport.height]);

  const [pos, setPos] = useState(restingPos);
  const [isDragging, setIsDragging] = useState(false);

  // Sync resting position when window resizes
  useEffect(() => {
    if (!isDragging) setPos(restingPos);
  }, [restingPos, isDragging]);

  // Responsive scale: smaller on mobile, larger on desktop
  const scale = viewport.width < 5 ? 0.3 : 0.8;

  // Clone the scene so we can modify it without affecting other instances (if any)
  const model = useMemo(() => scene.clone(), [scene]);

  useFrame((state) => {
    if (!meshRef.current) return;
    if (!isDragging) {
      // Subtle float animation when not being dragged
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1 + pos[1];
    }
  });

  return (
    <group>
      <primitive
        object={model}
        ref={meshRef}
        position={pos}
        rotation={[70, Math.PI/1  , -50]} // Rotate 90 degrees to make it vertical
        scale={[scale, scale, scale]} 
        onPointerDown={(e) => {
          e.stopPropagation();
          e.target.setPointerCapture(e.pointerId);
          setIsDragging(true);
          onStateChange('grabbing');
        }}
        onPointerMove={(e) => {
          if (isDragging) {
            // Use R3F's normalized pointer coordinates (-1 to 1)
            const x = e.pointer.x;
            const y = e.pointer.y;
            
            const newX = (x * viewport.width) / 2;
            const newY = (y * viewport.height) / 2;
            setPos([newX, newY, 0]);

            // Responsive threshold check
            const isOverDropZone = viewport.width < 5 
              ? newY < -viewport.height / 10  // Mobile: Dragged down
              : newX > viewport.width / 10;   // Desktop: Dragged right

            if (isOverDropZone) {
              onStateChange('download');
            } else {
              onStateChange('grabbing');
            }
          }
        }}
        onPointerUp={(e) => {
          if (!isDragging) return;
          e.target.releasePointerCapture(e.pointerId);
          setIsDragging(false);
          
          const isOverDropZone = viewport.width < 5 
            ? pos[1] < -viewport.height / 10
            : pos[0] > viewport.width / 10;

          if (isOverDropZone) {
            onDrop();
          }
          setPos(restingPos); // Snap back to zone center
          onStateChange('hover');
        }}
        onPointerOver={() => onStateChange('hover')}
        onPointerOut={() => onStateChange('default')}
        cursor="grab"
      />
    </group>
  );
}

function SkillCategory({ title, skills, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { damping: 20 });

  return (
    <motion.div
      className="skill-category-3d"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d" }}
    >
      <div className="skill-card-inner" style={{ transform: "translateZ(20px)" }}>
        <div className="skill-icon-3d" style={{ transform: "translateZ(60px)", marginBottom: '20px' }}>
          {index === 0 && <Code size={40} color="var(--accent-color)" />}
          {index === 1 && <Globe size={40} color="#00ffff" />}
          {index === 2 && <Database size={40} color="var(--accent-color)" />}
          {index === 3 && <Rocket size={40} color="#00ffff" />}
        </div>
        <h3 style={{ transform: "translateZ(40px)", fontSize: '1.5rem', marginBottom: '20px' }}>{title}</h3>
        <div className="skills-tags-3d" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', transform: "translateZ(30px)" }}>
          {skills.map((skill, i) => (
            <motion.span key={skill} className="skill-pill-3d" whileHover={{ scale: 1.1, translateZ: 20 }}>{skill}</motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function App() {
  useFaviconAnimation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [cursorState, setCursorState] = useState('default');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const projects = [
    {
      title: "Collaborative Code Editor",
      description: "Real-time peer-to-peer coding platform with multi-user synchronization.",
      longDescription: "A high-performance collaborative environment allowing developers to code together in real-time. Built with a focus on low latency and conflict resolution.",
      features: ["Real-time cursor tracking and code sync", "Conflict-free replicated data types (CRDTs)", "Integrated voice and text communication", "Multiple theme support with Monaco Editor"],
      tags: ["Next.js", "Socket.io", "GraphQL", "Monaco Editor"],
      image: "/editor.png",
      github: "https://github.com/farazshafi/CODIE"
    },
    {
      title: "PROGAD E-Commerce",
      description: "Scalable e-commerce system with real-time analytics and face-recognition auth.",
      longDescription: "A robust enterprise-grade e-commerce platform featuring advanced security and real-time inventory management.",
      features: ["Face-recognition based secure login", "Real-time sales and inventory dashboards", "Seamless Razorpay payment integration", "Automated PDF invoice generation"],
      tags: ["React", "Express", "Node.js", "Redis"],
      image: "/progad.png",
      github: "https://github.com/farazshafi/PROGAD"
    },
    {
      title: "AI Resume Builder",
      description: "Automated resume generator with AI-based content enhancement.",
      longDescription: "Leveraging Large Language Models to help users craft the perfect resume with ATS-optimized structures.",
      features: ["Google Gemini AI for content synthesis", "Real-time PDF preview and generation", "Multiple ATS-friendly templates", "Cloud-based storage for easy updates"],
      tags: ["Gemini AI", "Puppeteer", "Cloudinary", "Docker"],
      image: "/resume.png",
      github: "https://github.com/farazshafi/Resume-Builder"
    }
  ];

  const skillCategories = [
    { title: "Languages", skills: ["JavaScript", "TypeScript", "Python", "Go", "Bash"] },
    { title: "Frontend", skills: ["React", "Next.js", "Three.js", "Framer Motion", "Tailwind CSS"] },
    { title: "Backend", skills: ["Node.js", "Express", "GraphQL", "Go (net/http)", "WebSockets"] },
    { title: "DevOps", skills: ["Docker", "Kubernetes", "Nginx", "Linux/SSH", "CI/CD", "AWS"] }
  ];

  return (
    <div className="root-container">
      <CustomCursor cursorState={cursorState} />
      <InteractiveBackground />
      <AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence>
      <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="logo">FARAZ SHAFI</div>
        
        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#hero" onClick={() => setIsMenuOpen(false)}>Intro</a>
          <a href="#work" onClick={() => setIsMenuOpen(false)}>Projects</a>
          <a href="#skills" onClick={() => setIsMenuOpen(false)}>Stack</a>
          <a href="#resume" onClick={() => setIsMenuOpen(false)}>Resume</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </div>
      </nav>
      <main>
        <section id="hero">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="hero-text">
            <span className="hero-eyebrow">FULL-STACK ENGINEER</span>
            <h1 className="hero-title">Engineering <br /> <span className="text-gradient">Scalable Systems</span></h1>
            <p className="hero-description">5+ years of experience building production-ready applications with React, Node.js, and a focus on architecture and performance.</p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })}>View Projects</button>
              <div className="social-links">
                <a href="https://github.com/farazshafi/" target="_blank" rel="noreferrer"><Github size={28} className="social-icon" /></a>
                <a href="https://www.linkedin.com/in/farazshafi/" target="_blank" rel="noreferrer"><Linkedin size={28} className="social-icon" /></a>
                <a href="mailto:farazshafiofficial@gmail.com"><Mail size={28} className="social-icon" /></a>
              </div>
            </div>
          </motion.div>
        </section>
        <section id="work" className="section-dark">
          <div className="section-header"><span className="section-number">01</span><h2>Production Artifacts</h2></div>
          <div className="projects-grid">
            {projects.map((proj, i) => (
              <ProjectCard key={i} {...proj} index={i} onSelect={() => setSelectedProject(proj)} />
            ))}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="see-more-card">
              <div className="see-more-inner">
                <Rocket size={40} className="rocket-icon" />
                <h3>Exploring More?</h3>
                <p>I have +4 more specialized projects on my GitHub repositories.</p>
                <a href="https://github.com/farazshafi?tab=repositories" target="_blank" rel="noreferrer" className="see-more-btn">See More Architecture <ArrowRight size={18} /></a>
              </div>
            </motion.div>
          </div>
        </section>
        <section id="skills">
          <div className="section-header"><span className="section-number">02</span><h2>Technical Ecosystem</h2></div>
          <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {skillCategories.map((cat, i) => (<SkillCategory key={i} {...cat} index={i} />))}
          </div>
        </section>
        <ResumeSection onCursorStateChange={setCursorState} />
        <section id="contact" className="contact-section">
          <motion.div className="contact-card" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}>
            <span className="section-number">Available for New Challenges</span>
            <h2>Let's Connect</h2>
            <p>Based in Kerala, India. Open to remote opportunities and high-impact engineering roles.</p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
              <a href="mailto:farazshafiofficial@gmail.com" className="btn-outline">Email Me</a>
              <a href="https://www.linkedin.com/in/farazshafi/" target="_blank" rel="noreferrer" className="btn-outline">LinkedIn</a>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}

export default App
