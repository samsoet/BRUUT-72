import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Menu, X, Mail, Instagram, Send, CheckCircle, Loader2 } from 'lucide-react';

// ==================== NAVBAR ====================
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#0a0c0c]/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          <div className="flex items-center">
            <span className="font-bold text-2xl text-white tracking-wider">BRUUT '72</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {[
              { label: 'CONCEPT', href: '#concept' },
              { label: 'MENU', href: '#menu' },
              { label: 'OFFERTE', href: '#offerte' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-xs font-mono tracking-widest text-white/60 hover:text-yellow-400 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-yellow-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-[#0a0c0c]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 pt-20"
        >
          {[
            { label: 'CONCEPT', href: '#concept' },
            { label: 'MENU', href: '#menu' },
            { label: 'OFFERTE', href: '#offerte' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-4xl font-bold text-white hover:text-yellow-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </>
  );
}

// ==================== HERO SECTION ====================
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={ref} id="hero" className="relative h-screen min-h-[700px] flex items-end overflow-hidden bg-[#0e1010]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1010] via-[#0e1010]/30 to-transparent" />
      </div>

      <div className="absolute left-8 lg:left-16 top-0 bottom-0 w-px bg-yellow-500/30 z-10" />

      <motion.div style={{ opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 pb-16 lg:pb-24">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-6 mb-6 px-4 py-2 border border-white/20 bg-white/5 backdrop-blur-sm">
            <span className="font-mono text-xs text-white/50 tracking-widest">Jaar: 1974</span>
            <span className="w-px h-3 bg-white/20" />
            <span className="font-mono text-xs text-white/50 tracking-widest">Model: Citroën HY</span>
            <span className="w-px h-3 bg-white/20" />
            <span className="font-mono text-xs text-yellow-400 tracking-widest">Bruut 72</span>
          </div>

          <h1 className="font-bold text-white leading-none mb-4" style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}>
            BRUUT
          </h1>
          <div className="flex items-center gap-6 mb-8">
            <h2 className="font-bold text-yellow-400 leading-none" style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}>
              OESTERS & CHAMPAGNE
            </h2>
          </div>

          <p className="font-light text-lg text-white/70 leading-relaxed max-w-xl mb-10">
            De authentieke 1974 Citroën HY rijdt naar uw evenement. Live shucking, premium oesters, mousserende wijnen — een culinaire show die uw gasten niet vergeten.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo('#offerte')}
              className="font-bold text-sm tracking-widest uppercase px-8 py-4 bg-yellow-500 text-black hover:bg-white transition-all duration-300"
            >
              Vraag Offerte Aan
            </button>
            <button
              onClick={() => scrollTo('#menu')}
              className="font-bold text-sm tracking-widest uppercase px-8 py-4 bg-transparent border border-white/40 text-white hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300"
            >
              Bekijk Formules
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ==================== ABOUT SECTION ====================
function AboutSection() {
  const SPECS = [
    { label: 'BOUWJAAR', value: '1974' },
    { label: 'MODEL', value: 'CITROËN HY' },
    { label: 'CARROSSERIE', value: 'GOLVEND STAAL' },
    { label: 'CONCEPT', value: 'GASTRONOMY' },
  ];

  return (
    <section id="concept" className="bg-[#0e1010] py-24 lg:py-36 relative overflow-hidden">
      <div className="absolute left-8 lg:left-16 top-0 bottom-0 w-px bg-yellow-500/20" />

      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="mb-16 lg:mb-24">
          <span className="font-mono text-xs text-yellow-400 tracking-widest uppercase mb-4 block">— Chassis History</span>
          <h2 className="font-bold text-white leading-none mb-6" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
            DE MACHINE.<br />HET VERHAAL.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="font-light text-lg text-white/70 leading-relaxed mb-8">
              In 1974 verliet een Citroën HY de productielijn in Lyon. Vijftig jaar later rijdt hij door Vlaanderen als een rijdend monument voor gastronomie. De golvende stalen carrosserie die hem ooit iconisch maakte, is nu het decor voor de meest verfijnde oester- en champagnebeleving op locatie.
            </p>
            <p className="font-light text-lg text-white/70 leading-relaxed mb-10">
              <strong className="text-white">BRUUT '72</strong> is geen gewone foodtruck. Het is een culinaire show. Live oester-shucking voor uw gasten, premium Atlantische oesters, handgeselecteerde champagnes en tapas bereid met de precisie van een professioneel keukenbrigade.
            </p>

            <div className="grid grid-cols-2 gap-0 border border-white/10">
              {SPECS.map((spec, i) => (
                <div key={spec.label} className={`p-5 ${i % 2 === 0 ? 'border-r border-white/10' : ''} ${i < 2 ? 'border-b border-white/10' : ''}`}>
                  <p className="font-mono text-xs text-white/30 tracking-widest uppercase mb-1">{spec.label}</p>
                  <p className="font-bold text-yellow-400 text-base tracking-widest">{spec.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="w-full h-[500px] bg-gradient-to-br from-yellow-400 to-orange-600 opacity-30 rounded-lg" />
            <div className="absolute -bottom-4 -left-4 w-2/3 h-full border border-yellow-500/20" />
          </motion.div>
        </div>

        {/* Full-width section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative overflow-hidden h-64 lg:h-80 bg-[#1a1a1a] rounded-lg flex items-center justify-center"
        >
          <p className="font-bold text-white/20 text-center tracking-widest uppercase" style={{ fontSize: 'clamp(1rem, 4vw, 3rem)' }}>
            CRAFTED WITH STEEL. SERVED WITH PRECISION.
          </p>
        </motion.div>

        {/* USPs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-16 border border-white/10">
          {[
            { title: 'LIVE SHUCKING', desc: 'Uw gasten zien elke oester vers geopend worden. Een culinaire show die de sfeer maakt.' },
            { title: 'ALL-IN FORMULES', desc: 'Transparante prijzen, volledige ontzorging. Van levering tot afruimen — wij regelen alles.' },
            { title: 'OP MAAT', desc: 'Elk event is anders. Wij passen ons aanbod aan op uw wensen, locatie en gastenlijst.' },
          ].map((item, i) => (
            <div key={item.title} className={`p-8 ${i < 2 ? 'border-r border-white/10' : ''}`}>
              <span className="font-bold text-yellow-400 text-4xl leading-none block mb-4">0{i + 1}</span>
              <h4 className="font-bold text-white text-lg tracking-widest uppercase mb-3">{item.title}</h4>
              <p className="font-light text-sm text-white/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== MENU SECTION ====================
function MenuSection() {
  const [guestCount, setGuestCount] = useState(50);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const oesterFormules = [
    { name: '3 Oesters Klassiek', desc: 'Verse rauwe oesters, citroen & mignonette', price: 10 },
    { name: '3 Oesters Divers', desc: 'Rauwe, gegratineerde & tartaar variaties', price: 14 },
    { name: '6 Oesters Klassiek', desc: 'De klassieke selectie, puur & vers', price: 20 },
    { name: '6 Oesters Divers', desc: 'Zes oesters, drie bereidingen', price: 27 },
    { name: '9 Oesters Klassiek', desc: 'Het royale klassieke plateau', price: 29 },
    { name: '9 Oesters Divers', desc: 'Negen oesters, volledige beleving', price: 40 },
  ];

  const extras = [
    { name: '1 Glas Champagne', price: 9 },
    { name: 'Drank à Volonté', price: 32, note: 'per persoon' },
    { name: '1 Soort Tapas', price: 7, note: 'per persoon' },
    { name: '2 Soorten Tapas', price: 12, note: 'per persoon' },
    { name: 'Royale Tapas Ervaring', price: 14, note: '3 soorten, per persoon' },
  ];

  const estimatedPerPerson = 20 + 9 + 7;
  const totalEstimate = estimatedPerPerson * guestCount;

  return (
    <section id="menu" className="relative py-24 md:py-40 bg-[#0a0c0c]">
      <div className="absolute top-0 left-12 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-xs tracking-widest text-yellow-400 mb-4">FORMULES & PRIJZEN</p>
          <h2 className="font-bold text-5xl sm:text-6xl md:text-7xl text-white">HET MENU</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Oesters */}
          <div>
            <h3 className="font-bold text-2xl tracking-wider text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-yellow-400" />
              OESTERS
            </h3>
            <div className="space-y-1">
              {oesterFormules.map((item, i) => (
                <motion.div
                  key={item.name}
                  className="flex items-baseline justify-between py-4 border-b border-white/10 hover:border-yellow-400/30 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                >
                  <div>
                    <h4 className="font-bold text-lg tracking-wide text-white hover:text-yellow-400 transition-colors">
                      {item.name}
                    </h4>
                    <p className="font-light text-sm text-white/50 mt-1">{item.desc}</p>
                  </div>
                  <span className="font-mono text-lg text-yellow-400 font-bold ml-4 shrink-0">
                    €{item.price}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Extras + Estimator */}
          <div>
            <h3 className="font-bold text-2xl tracking-wider text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-yellow-400" />
              DRANK & TAPAS
            </h3>
            <div className="space-y-1 mb-12">
              {extras.map((item, i) => (
                <motion.div
                  key={item.name}
                  className="flex items-baseline justify-between py-4 border-b border-white/10 hover:border-yellow-400/30 transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                >
                  <div>
                    <h4 className="font-bold text-lg tracking-wide text-white hover:text-yellow-400 transition-colors">
                      {item.name}
                    </h4>
                    {item.note && (
                      <p className="font-light text-sm text-white/50 mt-1">{item.note}</p>
                    )}
                  </div>
                  <span className="font-mono text-lg text-yellow-400 font-bold ml-4 shrink-0">
                    €{item.price}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Price Estimator */}
            <motion.div
              className="bg-[#0e1010] border border-white/10 p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <p className="font-mono text-xs tracking-widest text-yellow-400 mb-2">PRIJSSCHATTING</p>
              <h4 className="font-bold text-2xl text-white mb-6">TOTAL ESTIMATOR</h4>

              <div className="mb-6">
                <div className="flex justify-between mb-3">
                  <span className="font-mono text-sm text-white/60">Aantal gasten</span>
                  <span className="font-bold text-2xl text-yellow-400">{guestCount}</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={200}
                  step={5}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="font-mono text-xs text-white/40">10</span>
                  <span className="font-mono text-xs text-white/40">200</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-light text-white/60">6 Oesters Klassiek pp</span>
                  <span className="font-mono text-white">€20</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-light text-white/60">1 Glas Champagne pp</span>
                  <span className="font-mono text-white">€9</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-light text-white/60">1 Soort Tapas pp</span>
                  <span className="font-mono text-white">€7</span>
                </div>
                <div className="border-t border-white/10 mt-4 pt-4 flex justify-between items-baseline">
                  <span className="font-bold text-lg text-white">GESCHAT TOTAAL</span>
                  <span className="font-bold text-3xl text-yellow-400">
                    €{totalEstimate.toLocaleString('nl-BE')}
                  </span>
                </div>
              </div>

              <p className="font-light text-xs text-white/50 mt-4 leading-relaxed">
                *Indicatieve prijs op basis van 6 oesters, 1 glas champagne en 1 tapas per persoon. Vraag een offerte op maat voor exacte prijzen.
              </p>

              <a
                href="#offerte"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#offerte')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group mt-6 w-full inline-flex items-center justify-center gap-3 bg-yellow-400 text-black font-bold text-sm tracking-widest px-8 py-4 hover:bg-white transition-all duration-300"
              >
                OFFERTE AANVRAGEN
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== OFFER FORM ====================
function OfferForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    event_date: '',
    location: '',
    guest_count: '',
    event_type: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission
    setTimeout(() => {
      console.log('Form submitted:', form);
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <section id="offerte" className="bg-[#0e1010] py-24 lg:py-36 relative">
        <div className="absolute left-8 lg:left-16 top-0 bottom-0 w-px bg-yellow-500/20" />
        <div className="max-w-7xl mx-auto px-8 lg:px-16 flex items-center justify-center min-h-[400px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <CheckCircle className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h3 className="font-bold text-white text-3xl lg:text-5xl tracking-widest uppercase mb-4">AANVRAAG ONTVANGEN</h3>
            <p className="font-light text-white/60 text-lg leading-relaxed max-w-md mx-auto">
              We nemen zo snel mogelijk contact op via email.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="offerte" className="bg-[#0e1010] py-24 lg:py-36 relative overflow-hidden">
      <div className="absolute left-8 lg:left-16 top-0 bottom-0 w-px bg-yellow-500/20" />

      <div className="relative max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs text-yellow-400 tracking-widest uppercase mb-6 block">— Offer Portal</span>
            <h2 className="font-bold text-white leading-none mb-8" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
              BRING THE<br />
              <span className="text-yellow-400">BRUUT</span><br />
              TO YOUR SITE.
            </h2>
            <p className="font-light text-lg text-white/60 leading-relaxed mb-10">
              Vertel ons over uw evenement. Wij stellen een offerte op maat samen — van intiem diner tot festival van 200+ gasten.
            </p>

            <div className="flex items-center gap-3 text-white/60">
              <Mail size={16} className="text-yellow-400" />
              <a href="mailto:Bruut72@gmail.com" className="font-mono text-sm tracking-wide hover:text-yellow-400 transition-colors">
                Bruut72@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-xs tracking-widest text-white/40 mb-2 block">NAAM *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Uw naam"
                    className="w-full bg-transparent border border-white/20 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs tracking-widest text-white/40 mb-2 block">EMAIL *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="email@voorbeeld.be"
                    className="w-full bg-transparent border border-white/20 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-xs tracking-widest text-white/40 mb-2 block">TELEFOON</label>
                  <input
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+32 ..."
                    className="w-full bg-transparent border border-white/20 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs tracking-widest text-white/40 mb-2 block">DATUM EVENT *</label>
                  <input
                    required
                    type="date"
                    value={form.event_date}
                    onChange={(e) => handleChange('event_date', e.target.value)}
                    className="w-full bg-transparent border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-xs tracking-widest text-white/40 mb-2 block">LOCATIE</label>
                  <input
                    value={form.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="Stad of adres"
                    className="w-full bg-transparent border border-white/20 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs tracking-widest text-white/40 mb-2 block">AANTAL GASTEN *</label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={form.guest_count}
                    onChange={(e) => handleChange('guest_count', e.target.value)}
                    placeholder="50"
                    className="w-full bg-transparent border border-white/20 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs tracking-widest text-white/40 mb-2 block">TYPE EVENT</label>
                <select
                  value={form.event_type}
                  onChange={(e) => handleChange('event_type', e.target.value)}
                  className="w-full bg-transparent border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                >
                  <option value="" className="bg-[#0e1010]">Selecteer type</option>
                  <option value="huwelijk" className="bg-[#0e1010]">Huwelijk</option>
                  <option value="bedrijfsevent" className="bg-[#0e1010]">Bedrijfsevent</option>
                  <option value="tuinfeest" className="bg-[#0e1010]">Tuinfeest</option>
                  <option value="jubileum" className="bg-[#0e1010]">Jubileum</option>
                  <option value="festival" className="bg-[#0e1010]">Festival</option>
                  <option value="andere" className="bg-[#0e1010]">Andere</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-xs tracking-widest text-white/40 mb-2 block">BERICHT</label>
                <textarea
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Vertel ons meer over uw event..."
                  rows={4}
                  className="w-full bg-transparent border border-white/20 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group w-full flex items-center justify-center gap-3 bg-yellow-400 text-black font-bold text-base tracking-widest py-4 hover:bg-white transition-all duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    VERZENDEN...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    OFFERTE AANVRAGEN
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ==================== FOOTER ====================
function Footer() {
  return (
    <footer className="bg-[#0a0c0c] relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-bold text-white/[0.03] leading-none whitespace-nowrap" style={{ fontSize: '20vw' }}>
          BRUUT 72
        </span>
      </div>

      <div className="absolute left-8 lg:left-16 top-0 bottom-0 w-px bg-yellow-500/20" />

      <div className="relative max-w-7xl mx-auto px-8 lg:px-16 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="mb-4">
              <span className="font-bold text-white text-3xl tracking-widest block">BRUUT</span>
              <span className="font-bold text-yellow-400 text-sm tracking-widest">'72 GASTRONOMY</span>
            </div>
            <p className="font-light text-sm text-white/40 leading-relaxed">
              Luxe oester- en champagnebeleving op locatie. Authentieke oldtimer + culinaire show.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm tracking-widest uppercase mb-6">CONTACT</h4>
            <div className="space-y-3">
              <a href="mailto:Bruut72@gmail.com" className="flex items-center gap-3 text-white/50 hover:text-yellow-400 transition-colors font-light text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                Bruut72@gmail.com
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/50 hover:text-yellow-400 transition-colors font-light text-sm">
                <Instagram className="w-4 h-4 flex-shrink-0" />
                @bruut72
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm tracking-widest uppercase mb-6">NAVIGATIE</h4>
            <div className="space-y-3">
              {[
                ['#concept', 'Concept'],
                ['#menu', 'Formules & Prijzen'],
                ['#offerte', 'Offerte Aanvragen'],
              ].map(([id, label]) => (
                <a
                  key={id}
                  href={id}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block font-light text-sm text-white/50 hover:text-yellow-400 transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-light text-xs text-white/25">
            © {new Date().getFullYear()} Bruut '72 Gastronomy. Alle rechten voorbehouden.
          </p>
          <p className="font-light text-xs text-white/25">
            1974 Citroën HY · Oesters & Champagne · Vlaanderen
          </p>
        </div>
      </div>
    </footer>
  );
}

// ==================== MAIN APP ====================
export default function App() {
  return (
    <div className="bg-[#0e1010] min-h-screen" style={{ backgroundColor: '#0e1010' }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <OfferForm />
      <Footer />
    </div>
  );
}
