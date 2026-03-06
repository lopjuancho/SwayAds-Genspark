import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))

// Main landing page
app.get('/', (c) => {
  return c.html(landingPage())
})

// Spanish landing page
app.get('/es', (c) => {
  return c.html(landingPageES())
})

function landingPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SwayAds – AI-Powered Advertising for Local Businesses</title>
  <meta name="description" content="Launch Facebook, Instagram & Google ads in minutes. AI-powered advertising platform built for local businesses."/>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    * { font-family: 'Inter', sans-serif; }
    html { scroll-behavior: smooth; }

    /* Brand gradient */
    .sway-gradient { background: linear-gradient(135deg, #7B2FF7 0%, #4F8EF7 100%); }
    .sway-text { background: linear-gradient(135deg, #7B2FF7 0%, #4F8EF7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .sway-border { border-image: linear-gradient(135deg, #7B2FF7, #4F8EF7) 1; }

    /* Glassmorphism */
    .glass { background: rgba(255,255,255,0.07); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.12); }

    /* Nav */
    .nav-scroll { background: rgba(255,255,255,0.97); backdrop-filter: blur(20px); box-shadow: 0 1px 0 rgba(0,0,0,0.08); }

    /* Animated gradient hero bg */
    .hero-bg {
      background: linear-gradient(135deg, #0a0118 0%, #0d0530 40%, #0a1628 70%, #050d1a 100%);
      position: relative; overflow: hidden;
    }
    .hero-bg::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(123,47,247,0.35) 0%, transparent 60%),
                  radial-gradient(ellipse 60% 40% at 80% 60%, rgba(79,142,247,0.2) 0%, transparent 50%),
                  radial-gradient(ellipse 40% 30% at 20% 80%, rgba(123,47,247,0.15) 0%, transparent 50%);
    }
    .hero-glow { filter: blur(80px); opacity: 0.4; }

    /* Floating cards animation */
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    .float-1 { animation: float 4s ease-in-out infinite; }
    .float-2 { animation: float2 5s ease-in-out infinite 1s; }
    .float-3 { animation: float 6s ease-in-out infinite 0.5s; }

    /* Section backgrounds */
    .section-dark { background: #07010f; }
    .section-gray { background: #f8f9fb; }
    .section-white { background: #ffffff; }

    /* Cards */
    .feature-card { transition: transform 0.3s, box-shadow 0.3s; }
    .feature-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(123,47,247,0.15); }

    /* Pricing card hover */
    .pricing-card { transition: transform 0.3s, box-shadow 0.3s; }
    .pricing-card:hover { transform: translateY(-6px); }

    /* Buttons */
    .btn-primary { background: linear-gradient(135deg, #7B2FF7, #4F8EF7); transition: opacity 0.2s, transform 0.2s; }
    .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
    .btn-outline { border: 2px solid rgba(255,255,255,0.3); transition: all 0.2s; }
    .btn-outline:hover { border-color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.08); }

    /* Mock ad cards */
    .ad-card { border-radius: 12px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.15); transition: transform 0.3s; }
    .ad-card:hover { transform: scale(1.03); }

    /* Testimonial */
    .testimonial-card { transition: transform 0.3s; }
    .testimonial-card:hover { transform: translateY(-4px); }

    /* Stars */
    .stars { color: #FFC107; }

    /* Platform badges */
    .platform-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; }

    /* FAQ */
    .faq-item details summary { cursor: pointer; list-style: none; }
    .faq-item details summary::-webkit-details-marker { display: none; }
    .faq-item details[open] .faq-icon { transform: rotate(45deg); }
    .faq-icon { transition: transform 0.3s; }

    /* Scroll reveal — only animate on first load, not between same-color sections */
    .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    /* Sections that follow each other with same bg get no gap */
    section + section { margin-top: 0; }

    /* Gradient border card */
    .gradient-border { position: relative; border-radius: 16px; }
    .gradient-border::before { content: ''; position: absolute; inset: 0; border-radius: 16px; padding: 1px; background: linear-gradient(135deg, #7B2FF7, #4F8EF7); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }

    /* Mobile menu */
    #mobile-menu { display: none; }
    #mobile-menu.open { display: flex; }

    /* Ticker */
    @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    .ticker-inner { animation: ticker 20s linear infinite; display: flex; }

    /* Number counter */
    .counter { font-variant-numeric: tabular-nums; }

    /* ── Logo ── */
    .logo-img { height: 42px; width: auto; object-fit: contain; display: block; }
    .logo-fallback { display: none; align-items: center; gap: 4px; }

    /* ── Video Section ── */
    .video-section-bg {
      background: linear-gradient(160deg, #06000f 0%, #0e0530 50%, #060d1f 100%);
      position: relative; overflow: hidden;
    }
    .video-section-bg::before {
      content:''; position:absolute; inset:0;
      background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(123,47,247,0.18) 0%, transparent 70%);
    }

    /* Video container with glow border */
    .video-wrapper {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 0 0 1px rgba(123,47,247,0.4),
                  0 0 60px rgba(123,47,247,0.25),
                  0 30px 80px rgba(0,0,0,0.5);
    }
    .video-wrapper::before {
      content: '';
      position: absolute; inset: 0;
      border-radius: 20px;
      padding: 1.5px;
      background: linear-gradient(135deg, #7B2FF7, #4F8EF7, #7B2FF7);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      z-index: 2; pointer-events: none;
    }

    /* Play button */
    @keyframes pulse-ring {
      0%   { transform: scale(1);   opacity: 0.6; }
      100% { transform: scale(1.8); opacity: 0; }
    }
    .play-btn {
      position: absolute; top: 50%; left: 50%;
      transform: translate(-50%,-50%);
      width: 80px; height: 80px;
      background: rgba(255,255,255,0.95);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; z-index: 10;
      transition: transform 0.2s, background 0.2s;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    }
    .play-btn:hover { transform: translate(-50%,-50%) scale(1.1); background: #fff; }
    .play-btn::before {
      content: '';
      position: absolute;
      width: 80px; height: 80px;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      animation: pulse-ring 1.8s ease-out infinite;
    }
    .play-btn i { color: #7B2FF7; font-size: 28px; margin-left: 4px; }

    /* Step pills in video section */
    .vstep {
      display: flex; align-items: flex-start; gap: 14px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 14px; padding: 16px;
      transition: background 0.3s, border-color 0.3s;
    }
    .vstep:hover { background: rgba(123,47,247,0.12); border-color: rgba(123,47,247,0.4); }
    .vstep-num {
      width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      font-weight: 900; font-size: 14px; color: #fff;
    }

    /* Video modal */
    #video-modal {
      display: none; position: fixed; inset: 0; z-index: 9999;
      background: rgba(0,0,0,0.92); backdrop-filter: blur(10px);
      align-items: center; justify-content: center;
      padding: 20px;
    }
    #video-modal.open { display: flex; }
    #video-modal .modal-box {
      position: relative; width: 90vw; max-width: 960px;
      border-radius: 20px; overflow: hidden;
      box-shadow: 0 0 0 1px rgba(123,47,247,0.5),
                  0 0 80px rgba(123,47,247,0.35),
                  0 40px 100px rgba(0,0,0,0.7);
    }
    #video-modal video {
      width: 100%; display: block;
      border-radius: 20px; background: #000;
    }
    #video-modal .close-btn {
      position: absolute; top: -48px; right: 0;
      background: rgba(255,255,255,0.15); border: none;
      color: #fff; width: 38px; height: 38px; border-radius: 50%;
      cursor: pointer; font-size: 18px; display: flex;
      align-items: center; justify-content: center;
      transition: background 0.2s, transform 0.2s;
    }
    #video-modal .close-btn:hover { background: rgba(255,255,255,0.3); transform: rotate(90deg); }
  </style>
</head>
<body class="bg-white text-gray-900 antialiased">

<!-- ============================================================
     NAVIGATION
     ============================================================ -->
<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 md:h-18">
      <!-- Logo -->
      <div class="flex items-center gap-2 flex-shrink-0">
        <a href="/" class="flex items-center gap-2">
          <img
            src="https://www.genspark.ai/api/files/s/fCLFvPGj"
            alt="SwayAds"
            id="nav-logo-img"
            class="logo-img"
            onload="this.style.opacity='1'"
            onerror="this.style.display='none'; document.getElementById('nav-logo-fallback').style.display='flex'"
            style="opacity:0; transition:opacity 0.3s; height:44px; width:auto; filter:brightness(0) invert(1)"
          />
          <span id="nav-logo-fallback" class="logo-fallback">
            <span class="text-2xl font-black"><span class="sway-text">Sway</span><span class="text-gray-900">Ads</span></span>
          </span>
        </a>
      </div>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-8" id="nav-links">
        <a href="#features" class="text-sm font-medium text-white/80 hover:text-white transition-colors nav-link">Features</a>
        <a href="#how-it-works" class="text-sm font-medium text-white/80 hover:text-white transition-colors nav-link">How It Works</a>
        <a href="#watch" class="text-sm font-medium text-white/80 hover:text-white transition-colors nav-link flex items-center gap-1">
          <span class="w-4 h-4 rounded-full sway-gradient inline-flex items-center justify-center"><i class="fas fa-play text-white" style="font-size:7px;margin-left:1px"></i></span>
          Watch Demo
        </a>
        <a href="#pricing" class="text-sm font-medium text-white/80 hover:text-white transition-colors nav-link">Pricing</a>
        <a href="#testimonials" class="text-sm font-medium text-white/80 hover:text-white transition-colors nav-link">Reviews</a>
        <a href="#faq" class="text-sm font-medium text-white/80 hover:text-white transition-colors nav-link">FAQ</a>
      </div>

      <!-- CTA Buttons -->
      <div class="hidden md:flex items-center gap-3">
        <a href="https://my.swayads.com" class="text-sm font-semibold text-white/80 hover:text-white transition-colors px-4 py-2 nav-link" id="nav-login">Log In</a>
        <a href="https://my.swayads.com" class="btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg">
          Start Free Trial
        </a>
      </div>

      <!-- Mobile hamburger -->
      <button id="menu-btn" class="md:hidden p-2 rounded-lg text-white hover:bg-white/10" onclick="toggleMenu()">
        <i class="fas fa-bars text-xl"></i>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div id="mobile-menu" class="flex-col bg-white border-t border-gray-100 px-4 py-4 gap-4 md:hidden">
    <a href="#features" class="text-sm font-medium text-gray-700 py-2 border-b border-gray-50" onclick="toggleMenu()">Features</a>
    <a href="#how-it-works" class="text-sm font-medium text-gray-700 py-2 border-b border-gray-50" onclick="toggleMenu()">How It Works</a>
    <a href="#watch" class="text-sm font-medium text-gray-700 py-2 border-b border-gray-50 flex items-center gap-2" onclick="toggleMenu()">
      <i class="fas fa-play-circle text-purple-500"></i> Watch Demo
    </a>
    <a href="#pricing" class="text-sm font-medium text-gray-700 py-2 border-b border-gray-50" onclick="toggleMenu()">Pricing</a>
    <a href="#testimonials" class="text-sm font-medium text-gray-700 py-2 border-b border-gray-50" onclick="toggleMenu()">Reviews</a>
    <a href="#faq" class="text-sm font-medium text-gray-700 py-2 border-b border-gray-50" onclick="toggleMenu()">FAQ</a>
    <a href="https://my.swayads.com" class="btn-primary text-white text-sm font-semibold px-5 py-3 rounded-full text-center mt-2">Start Free Trial</a>
  </div>
</nav>

<!-- ============================================================
     HERO SECTION
     ============================================================ -->
<section class="hero-bg min-h-screen flex flex-col justify-center pt-16 pb-0 relative">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div class="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">

      <!-- Left: Text Content -->
      <div class="text-center lg:text-left relative z-10">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
          <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span class="text-white/90 text-sm font-medium">AI-Powered · Launch in Minutes</span>
        </div>

        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
          Launch Profitable<br/>
          <span class="sway-text">Local Ad Campaigns</span><br/>
          in Minutes, Not Months
        </h1>

        <p class="text-lg text-white/70 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
          SwayAds uses AI to build, launch & optimize Facebook, Instagram and Google ads for local businesses — no marketing degree required. Go live in under 5 minutes.
        </p>

        <!-- Platform logos row -->
        <div class="flex items-center justify-center lg:justify-start gap-3 mb-8 flex-wrap">
          <span class="platform-badge bg-blue-600/20 text-blue-300 border border-blue-500/30">
            <i class="fab fa-facebook-f text-blue-400"></i> Facebook
          </span>
          <span class="platform-badge bg-pink-600/20 text-pink-300 border border-pink-500/30">
            <i class="fab fa-instagram text-pink-400"></i> Instagram
          </span>
          <span class="platform-badge bg-red-600/20 text-red-300 border border-red-500/30">
            <i class="fab fa-google text-red-400"></i> Google
          </span>
          <span class="platform-badge bg-gray-600/20 text-gray-300 border border-gray-500/30">
            + More
          </span>
        </div>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <a href="https://my.swayads.com" class="btn-primary text-white font-bold px-8 py-4 rounded-full text-base shadow-2xl shadow-purple-500/30 flex items-center justify-center gap-2">
            <i class="fas fa-rocket"></i> Start Free Trial
          </a>
          <a href="#how-it-works" class="btn-outline text-white font-semibold px-8 py-4 rounded-full text-base flex items-center justify-center gap-2">
            <i class="fas fa-play-circle"></i> See How It Works
          </a>
        </div>

        <!-- Social proof micro -->
        <div class="mt-8 flex items-center gap-4 justify-center lg:justify-start">
          <div class="flex -space-x-2">
            <img src="https://i.pravatar.cc/32?img=1" alt="" class="w-8 h-8 rounded-full border-2 border-purple-500"/>
            <img src="https://i.pravatar.cc/32?img=2" alt="" class="w-8 h-8 rounded-full border-2 border-purple-500"/>
            <img src="https://i.pravatar.cc/32?img=3" alt="" class="w-8 h-8 rounded-full border-2 border-purple-500"/>
            <img src="https://i.pravatar.cc/32?img=4" alt="" class="w-8 h-8 rounded-full border-2 border-purple-500"/>
          </div>
          <div>
            <div class="stars text-sm">★★★★★</div>
            <p class="text-white/60 text-xs">Trusted by 2,400+ local businesses</p>
          </div>
        </div>
      </div>

      <!-- Right: Floating Ad Preview Cards -->
      <div class="relative hidden lg:flex items-center justify-center min-h-[540px]">
        <!-- Background glow blobs -->
        <div class="absolute w-72 h-72 rounded-full sway-gradient hero-glow top-10 left-10"></div>
        <div class="absolute w-48 h-48 rounded-full bg-blue-500 hero-glow bottom-10 right-10"></div>

        <!-- Central dashboard card -->
        <div class="glass rounded-2xl p-5 w-72 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 float-1 z-20">
          <div class="flex items-center justify-between mb-4">
            <span class="text-white font-bold text-sm">Campaign Dashboard</span>
            <span class="text-green-400 text-xs font-semibold bg-green-400/15 px-2 py-0.5 rounded-full">● Live</span>
          </div>
          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs text-white/60 mb-1"><span>Reach</span><span class="text-white font-semibold">12,480</span></div>
              <div class="h-1.5 bg-white/10 rounded-full"><div class="h-1.5 rounded-full sway-gradient" style="width:78%"></div></div>
            </div>
            <div>
              <div class="flex justify-between text-xs text-white/60 mb-1"><span>Clicks</span><span class="text-white font-semibold">843</span></div>
              <div class="h-1.5 bg-white/10 rounded-full"><div class="h-1.5 rounded-full bg-blue-400" style="width:62%"></div></div>
            </div>
            <div>
              <div class="flex justify-between text-xs text-white/60 mb-1"><span>Leads</span><span class="text-green-400 font-semibold">47</span></div>
              <div class="h-1.5 bg-white/10 rounded-full"><div class="h-1.5 rounded-full bg-green-400" style="width:45%"></div></div>
            </div>
          </div>
          <div class="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
            <span class="text-white/60 text-xs">Cost per lead</span>
            <span class="text-green-400 font-bold text-sm">$4.20</span>
          </div>
        </div>

        <!-- Tree Service Ad Card - top right -->
        <div class="ad-card bg-white w-52 absolute top-4 right-4 float-2 z-10">
          <div class="relative h-28 overflow-hidden">
            <img src="https://assets.cdn.filesafe.space/QMSEyMqE0DaJ2AFN7ipH/media/69aa90eb618c8df1281d50ae.jfif" alt="Tree Service" class="w-full h-full object-cover"/>
            <div class="absolute top-2 left-2">
              <span class="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded font-semibold">Sponsored</span>
            </div>
          </div>
          <div class="p-3">
            <a href="https://reytreeservice.com" rel="dofollow" target="_blank" class="text-xs font-bold text-gray-900 hover:text-blue-600">🌳 Rey Tree Service</a>
            <p class="text-xs text-gray-500 mt-0.5">Free Estimates · Licensed & Insured</p>
            <div class="mt-2 text-xs text-blue-600 font-semibold">Call Now for 20% Off</div>
          </div>
        </div>

        <!-- Lawn Care ad card - bottom left -->
        <div class="ad-card bg-white w-52 absolute bottom-8 left-0 float-3 z-10">
          <div class="relative h-28 overflow-hidden">
            <img src="https://assets.cdn.filesafe.space/QMSEyMqE0DaJ2AFN7ipH/media/69aa8f20618c8d56441d1d1f.jfif" alt="Lawn Care" class="w-full h-full object-cover"/>
            <div class="absolute top-2 left-2">
              <span class="text-xs bg-green-600 text-white px-1.5 py-0.5 rounded font-semibold">Google Ad</span>
            </div>
          </div>
          <div class="p-3">
            <p class="text-xs font-bold text-gray-900">🌿 GreenCut Lawn Care</p>
            <p class="text-xs text-gray-500 mt-0.5">Weekly · Monthly Plans Available</p>
            <div class="mt-2 text-xs text-green-600 font-semibold">Get a Free Quote Today</div>
          </div>
        </div>

        <!-- AI badge floating -->
        <div class="glass rounded-xl px-4 py-3 absolute top-2 left-2 z-30 float-1">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-full sway-gradient flex items-center justify-center">
              <i class="fas fa-brain text-white text-xs"></i>
            </div>
            <span class="text-white text-xs font-semibold">AI writing ad copy...</span>
          </div>
          <div class="mt-1.5 flex gap-1">
            <span class="h-1.5 w-8 bg-purple-400 rounded-full animate-pulse"></span>
            <span class="h-1.5 w-5 bg-blue-400 rounded-full animate-pulse delay-100"></span>
            <span class="h-1.5 w-6 bg-purple-300 rounded-full animate-pulse delay-200"></span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Ticker bar -->
  <div class="w-full bg-white/5 border-t border-white/10 py-3 overflow-hidden">
    <div class="ticker-inner whitespace-nowrap text-white/50 text-sm font-medium">
      <span class="mx-8">🌳 Tree Services</span>
      <span class="mx-8">🎉 Party Rentals</span>
      <span class="mx-8">🌿 Lawn Care</span>
      <span class="mx-8">🏠 Remodeling</span>
      <span class="mx-8">🔨 Roofing</span>
      <span class="mx-8">🚗 Auto Repair</span>
      <span class="mx-8">🍕 Restaurants</span>
      <span class="mx-8">💆 Salons & Spas</span>
      <span class="mx-8">🐾 Pet Services</span>
      <span class="mx-8">🏥 Dental Clinics</span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span class="mx-8">🌳 Tree Services</span>
      <span class="mx-8">🎉 Party Rentals</span>
      <span class="mx-8">🌿 Lawn Care</span>
      <span class="mx-8">🏠 Remodeling</span>
      <span class="mx-8">🔨 Roofing</span>
      <span class="mx-8">🚗 Auto Repair</span>
      <span class="mx-8">🍕 Restaurants</span>
      <span class="mx-8">💆 Salons & Spas</span>
      <span class="mx-8">🐾 Pet Services</span>
      <span class="mx-8">🏥 Dental Clinics</span>
    </div>
  </div>
</section>

<!-- ============================================================
     STATS BAR
     ============================================================ -->
<section class="bg-white py-14 border-b border-gray-100">
  <div class="max-w-6xl mx-auto px-4">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div>
        <div class="text-4xl font-black sway-text counter">2,400+</div>
        <div class="text-gray-500 text-sm mt-1 font-medium">Local Businesses</div>
      </div>
      <div>
        <div class="text-4xl font-black sway-text counter">$4.2M+</div>
        <div class="text-gray-500 text-sm mt-1 font-medium">Ad Spend Managed</div>
      </div>
      <div>
        <div class="text-4xl font-black sway-text counter">320%</div>
        <div class="text-gray-500 text-sm mt-1 font-medium">Avg. ROI Increase</div>
      </div>
      <div>
        <div class="text-4xl font-black sway-text counter">&lt;5 min</div>
        <div class="text-gray-500 text-sm mt-1 font-medium">To Launch First Ad</div>
      </div>
    </div>
    <!-- Platform logos — proper colored icons -->
    <div class="mt-10">
      <p class="text-center text-gray-400 text-xs uppercase tracking-widest font-semibold mb-5">Launches ads on all major platforms</p>
      <div class="flex items-center justify-center gap-6 flex-wrap">
        <!-- Facebook -->
        <div class="flex flex-col items-center gap-1.5 group">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-[#1877F2] shadow-md group-hover:scale-110 transition-transform">
            <i class="fab fa-facebook-f text-white text-xl"></i>
          </div>
          <span class="text-xs text-gray-400 font-medium">Facebook</span>
        </div>
        <!-- Instagram -->
        <div class="flex flex-col items-center gap-1.5 group">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform" style="background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)">
            <i class="fab fa-instagram text-white text-xl"></i>
          </div>
          <span class="text-xs text-gray-400 font-medium">Instagram</span>
        </div>
        <!-- Google -->
        <div class="flex flex-col items-center gap-1.5 group">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-white border border-gray-200 shadow-md group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" class="w-6 h-6"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          </div>
          <span class="text-xs text-gray-400 font-medium">Google</span>
        </div>
        <!-- TikTok -->
        <div class="flex flex-col items-center gap-1.5 group">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-black shadow-md group-hover:scale-110 transition-transform">
            <i class="fab fa-tiktok text-white text-xl"></i>
          </div>
          <span class="text-xs text-gray-400 font-medium">TikTok</span>
        </div>
        <!-- LinkedIn -->
        <div class="flex flex-col items-center gap-1.5 group">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-[#0A66C2] shadow-md group-hover:scale-110 transition-transform">
            <i class="fab fa-linkedin-in text-white text-xl"></i>
          </div>
          <span class="text-xs text-gray-400 font-medium">LinkedIn</span>
        </div>
        <!-- YouTube -->
        <div class="flex flex-col items-center gap-1.5 group">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-[#FF0000] shadow-md group-hover:scale-110 transition-transform">
            <i class="fab fa-youtube text-white text-xl"></i>
          </div>
          <span class="text-xs text-gray-400 font-medium">YouTube</span>
        </div>
        <!-- X/Twitter -->
        <div class="flex flex-col items-center gap-1.5 group">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-black shadow-md group-hover:scale-110 transition-transform">
            <i class="fab fa-x-twitter text-white text-xl"></i>
          </div>
          <span class="text-xs text-gray-400 font-medium">X / Twitter</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     PROBLEM SECTION
     ============================================================ -->
<section class="section-gray py-20 lg:py-28">
  <div class="max-w-6xl mx-auto px-4">
    <div class="text-center mb-14 reveal">
      <span class="text-red-500 text-sm font-bold uppercase tracking-widest">The Problem</span>
      <h2 class="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-4">Running Ads Is Hard.<br/>Especially When You're Busy.</h2>
      <p class="text-gray-500 text-lg max-w-2xl mx-auto">Most local business owners waste thousands of dollars on ineffective ads — or give up entirely. Here's what they deal with every day:</p>
    </div>

    <div class="grid md:grid-cols-3 gap-6 reveal">
      <!-- Pain point 1 -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
        <div class="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
          <i class="fas fa-clock text-red-500 text-xl"></i>
        </div>
        <h3 class="font-bold text-gray-900 text-lg mb-2">No Time to Learn</h3>
        <p class="text-gray-500 text-sm leading-relaxed">Between managing crews, customers, and operations — who has 40+ hours to master Facebook Ads Manager?</p>
        <div class="mt-4 bg-red-50 rounded-lg p-3 text-xs text-red-600 font-medium">
          "I spent 3 weeks trying to figure out Facebook ads and never got a single lead." – Tree Service Owner
        </div>
      </div>

      <!-- Pain point 2 -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
        <div class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
          <i class="fas fa-dollar-sign text-orange-500 text-xl"></i>
        </div>
        <h3 class="font-bold text-gray-900 text-lg mb-2">Wasted Budget</h3>
        <p class="text-gray-500 text-sm leading-relaxed">Running ads to the wrong audience burns cash fast. Bad targeting + weak copy = money down the drain.</p>
        <div class="mt-4 bg-orange-50 rounded-lg p-3 text-xs text-orange-600 font-medium">
          "I spent $800 on Google ads and got zero calls. I was targeting the whole country." – Roofer
        </div>
      </div>

      <!-- Pain point 3 -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-yellow-100">
        <div class="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center mb-4">
          <i class="fas fa-chart-line text-yellow-500 text-xl"></i>
        </div>
        <h3 class="font-bold text-gray-900 text-lg mb-2">Can't Track Results</h3>
        <p class="text-gray-500 text-sm leading-relaxed">Agencies send confusing reports. You have no idea if your $1,500/month is actually working or not.</p>
        <div class="mt-4 bg-yellow-50 rounded-lg p-3 text-xs text-yellow-600 font-medium">
          "My agency couldn't even tell me my cost per lead. I had no clue what I was paying for." – Party Rental
        </div>
      </div>
    </div>

    <!-- Arrow to solution -->
    <div class="text-center mt-10 reveal">
      <div class="inline-flex flex-col items-center gap-2">
        <p class="text-gray-400 font-medium text-sm">There's a better way</p>
        <div class="w-8 h-8 rounded-full sway-gradient flex items-center justify-center animate-bounce">
          <i class="fas fa-arrow-down text-white text-sm"></i>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     FEATURES SECTION
     ============================================================ -->
<section id="features" class="section-white py-20 lg:py-28">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-16 reveal">
      <span class="sway-text text-sm font-bold uppercase tracking-widest">Features</span>
      <h2 class="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-4">Everything You Need to<br/>Dominate Local Advertising</h2>
      <p class="text-gray-500 text-lg max-w-2xl mx-auto">One platform. All your ad channels. Built for busy business owners who need results, not complexity.</p>
    </div>

    <!-- Feature 1: AI Campaign Builder -->
    <div class="grid lg:grid-cols-2 gap-12 items-center mb-20 reveal">
      <div class="order-2 lg:order-1">
        <div class="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
          <i class="fas fa-brain"></i> AI Campaign Builder
        </div>
        <h3 class="text-2xl md:text-3xl font-black text-gray-900 mb-4">Your AI Ad Expert,<br/>Available 24/7</h3>
        <p class="text-gray-500 leading-relaxed mb-6">Just tell SwayAds about your business and target area. Our AI instantly generates high-converting ad copy, selects the best audience, sets your budget, and launches across platforms — while you focus on your work.</p>
        <ul class="space-y-3">
          <li class="flex items-center gap-3"><div class="w-5 h-5 rounded-full sway-gradient flex items-center justify-center flex-shrink-0"><i class="fas fa-check text-white text-xs"></i></div><span class="text-gray-700 text-sm">AI writes proven ad copy for your industry</span></li>
          <li class="flex items-center gap-3"><div class="w-5 h-5 rounded-full sway-gradient flex items-center justify-center flex-shrink-0"><i class="fas fa-check text-white text-xs"></i></div><span class="text-gray-700 text-sm">Smart geo-targeting to reach your local area</span></li>
          <li class="flex items-center gap-3"><div class="w-5 h-5 rounded-full sway-gradient flex items-center justify-center flex-shrink-0"><i class="fas fa-check text-white text-xs"></i></div><span class="text-gray-700 text-sm">Auto-optimization based on real performance data</span></li>
          <li class="flex items-center gap-3"><div class="w-5 h-5 rounded-full sway-gradient flex items-center justify-center flex-shrink-0"><i class="fas fa-check text-white text-xs"></i></div><span class="text-gray-700 text-sm">Launch to Facebook, Instagram & Google simultaneously</span></li>
        </ul>
      </div>
      <div class="order-1 lg:order-2">
        <div class="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
          <!-- AI Builder Mock UI -->
          <div class="bg-white rounded-xl shadow-lg p-5">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 rounded-lg sway-gradient flex items-center justify-center">
                <i class="fas fa-brain text-white text-sm"></i>
              </div>
              <div>
                <p class="font-bold text-gray-900 text-sm">AI Campaign Builder</p>
                <p class="text-gray-400 text-xs">Building your campaign...</p>
              </div>
              <span class="ml-auto text-green-500 text-xs font-semibold bg-green-50 px-2 py-0.5 rounded-full">● Active</span>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <i class="fas fa-building text-purple-600 w-5"></i>
                <div>
                  <p class="text-xs font-semibold text-gray-800">Business Type</p>
                  <p class="text-xs text-gray-500">Tree Service — Dallas, TX (15mi radius)</p>
                </div>
                <i class="fas fa-check-circle text-green-500 ml-auto"></i>
              </div>
              <div class="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <i class="fas fa-users text-purple-600 w-5"></i>
                <div>
                  <p class="text-xs font-semibold text-gray-800">Target Audience</p>
                  <p class="text-xs text-gray-500">Homeowners, 30–65, within service area</p>
                </div>
                <i class="fas fa-check-circle text-green-500 ml-auto"></i>
              </div>
              <div class="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <i class="fas fa-edit text-blue-600 w-5"></i>
                <div class="flex-1">
                  <p class="text-xs font-semibold text-gray-800">AI-Generated Headline</p>
                  <p class="text-xs text-blue-700 font-medium">"Dallas's Most Trusted Tree Service — Free Estimate Today!"</p>
                </div>
                <i class="fas fa-spinner fa-spin text-blue-400 ml-auto text-xs"></i>
              </div>
              <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <i class="fas fa-dollar-sign text-gray-400 w-5"></i>
                <div>
                  <p class="text-xs font-semibold text-gray-800">Daily Budget</p>
                  <p class="text-xs text-gray-500">$15/day → Est. 8–12 leads/month</p>
                </div>
              </div>
            </div>
            <button class="w-full mt-4 btn-primary text-white text-sm font-bold py-2.5 rounded-lg">
              <i class="fas fa-rocket mr-2"></i> Launch Campaign
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Feature 2: Ad Templates -->
    <div class="grid lg:grid-cols-2 gap-12 items-center mb-20 reveal">
      <div>
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
          <!-- Templates Grid Mock -->
          <p class="text-sm font-bold text-gray-700 mb-3">Ad Templates Library</p>
          <div class="grid grid-cols-2 gap-3">
            <!-- Template 1: Roofing -->
            <div class="ad-card bg-white cursor-pointer">
              <div class="relative h-24">
                <img src="https://assets.cdn.filesafe.space/QMSEyMqE0DaJ2AFN7ipH/media/69aa8f2036702f99410c3319.jfif" alt="Roofing" class="w-full h-full object-cover"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                  <p class="text-white text-xs font-bold leading-tight">Storm Damage? We Fix It Fast</p>
                </div>
              </div>
              <div class="p-2 flex items-center justify-between">
                <span class="text-xs text-gray-600 font-medium">🔨 Roofing</span>
                <span class="text-xs text-purple-600 font-semibold">4.9★</span>
              </div>
            </div>
            <!-- Template 2: Party Rentals -->
            <div class="ad-card bg-white cursor-pointer">
              <div class="relative h-24">
                <img src="https://assets.cdn.filesafe.space/QMSEyMqE0DaJ2AFN7ipH/media/69aa8ec036702f360f0c276a.png" alt="Tiky Jumps Party Rentals" class="w-full h-full object-cover"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                  <p class="text-white text-xs font-bold leading-tight">Book Your Party Today!</p>
                </div>
              </div>
              <div class="p-2 flex items-center justify-between">
                <span class="text-xs text-gray-600 font-medium">🎉 Party Rentals</span>
                <span class="text-xs text-purple-600 font-semibold">4.8★</span>
              </div>
            </div>
            <!-- Template 3: Remodeling -->
            <div class="ad-card bg-white cursor-pointer">
              <div class="relative h-24">
                <img src="https://assets.cdn.filesafe.space/QMSEyMqE0DaJ2AFN7ipH/media/69aa8f20618c8d5aa91d1d20.jfif" alt="Remodeling" class="w-full h-full object-cover"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                  <p class="text-white text-xs font-bold leading-tight">Transform Your Home This Fall</p>
                </div>
              </div>
              <div class="p-2 flex items-center justify-between">
                <span class="text-xs text-gray-600 font-medium">🏠 Remodeling</span>
                <span class="text-xs text-purple-600 font-semibold">4.9★</span>
              </div>
            </div>
            <!-- Template 4: Lawn Care -->
            <div class="ad-card bg-white cursor-pointer">
              <div class="relative h-24">
                <img src="https://assets.cdn.filesafe.space/QMSEyMqE0DaJ2AFN7ipH/media/69aa8f207bdf38526e92b945.jfif" alt="Lawn Care" class="w-full h-full object-cover"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                  <p class="text-white text-xs font-bold leading-tight">Get a Perfect Lawn Every Week</p>
                </div>
              </div>
              <div class="p-2 flex items-center justify-between">
                <span class="text-xs text-gray-600 font-medium">🌿 Lawn Care</span>
                <span class="text-xs text-purple-600 font-semibold">5.0★</span>
              </div>
            </div>
          </div>
          <p class="text-xs text-center text-gray-400 mt-3">200+ ready-to-use templates across 30+ industries</p>
        </div>
      </div>
      <div>
        <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
          <i class="fas fa-layer-group"></i> Done-For-You Templates
        </div>
        <h3 class="text-2xl md:text-3xl font-black text-gray-900 mb-4">200+ Proven Ad Templates for Local Services</h3>
        <p class="text-gray-500 leading-relaxed mb-6">Skip the blank page. Choose from hundreds of battle-tested templates built specifically for tree services, roofing, lawn care, party rentals, remodeling, and more. Customize with your info and launch instantly.</p>
        <ul class="space-y-3">
          <li class="flex items-center gap-3"><div class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0"><i class="fas fa-check text-white text-xs"></i></div><span class="text-gray-700 text-sm">Industry-specific copy proven to convert</span></li>
          <li class="flex items-center gap-3"><div class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0"><i class="fas fa-check text-white text-xs"></i></div><span class="text-gray-700 text-sm">Seasonal promotions auto-suggested</span></li>
          <li class="flex items-center gap-3"><div class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0"><i class="fas fa-check text-white text-xs"></i></div><span class="text-gray-700 text-sm">Mobile-optimized images included</span></li>
          <li class="flex items-center gap-3"><div class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0"><i class="fas fa-check text-white text-xs"></i></div><span class="text-gray-700 text-sm">A/B test multiple versions automatically</span></li>
        </ul>
      </div>
    </div>

    <!-- Feature 3: Reporting Dashboard -->
    <div class="grid lg:grid-cols-2 gap-12 items-center reveal">
      <div class="order-2 lg:order-1">
        <div class="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
          <i class="fas fa-chart-bar"></i> Reporting Dashboard
        </div>
        <h3 class="text-2xl md:text-3xl font-black text-gray-900 mb-4">Crystal-Clear Reports.<br/>No Spreadsheets Needed.</h3>
        <p class="text-gray-500 leading-relaxed mb-6">See exactly where your money is going and what's coming back. Real-time metrics on impressions, clicks, calls, and leads — all in a simple dashboard you can understand in 30 seconds.</p>
        <ul class="space-y-3">
          <li class="flex items-center gap-3"><div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"><i class="fas fa-check text-white text-xs"></i></div><span class="text-gray-700 text-sm">Real-time performance across all platforms</span></li>
          <li class="flex items-center gap-3"><div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"><i class="fas fa-check text-white text-xs"></i></div><span class="text-gray-700 text-sm">Lead tracking with phone call attribution</span></li>
          <li class="flex items-center gap-3"><div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"><i class="fas fa-check text-white text-xs"></i></div><span class="text-gray-700 text-sm">Cost per lead & ROI calculations</span></li>
          <li class="flex items-center gap-3"><div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"><i class="fas fa-check text-white text-xs"></i></div><span class="text-gray-700 text-sm">Weekly email digest with insights</span></li>
        </ul>
      </div>
      <div class="order-1 lg:order-2">
        <div class="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6">
          <!-- Dashboard Mock -->
          <div class="bg-white rounded-xl shadow-lg p-4">
            <div class="flex items-center justify-between mb-4">
              <p class="font-bold text-gray-900 text-sm">Performance Overview</p>
              <select class="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600">
                <option>Last 30 days</option>
              </select>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-4">
              <div class="bg-purple-50 rounded-lg p-2.5 text-center">
                <p class="text-xl font-black text-purple-700">124</p>
                <p class="text-xs text-gray-500 mt-0.5">Total Leads</p>
                <p class="text-xs text-green-600 font-semibold">+28%</p>
              </div>
              <div class="bg-blue-50 rounded-lg p-2.5 text-center">
                <p class="text-xl font-black text-blue-700">$3.40</p>
                <p class="text-xs text-gray-500 mt-0.5">Cost/Lead</p>
                <p class="text-xs text-green-600 font-semibold">-18%</p>
              </div>
              <div class="bg-green-50 rounded-lg p-2.5 text-center">
                <p class="text-xl font-black text-green-700">412%</p>
                <p class="text-xs text-gray-500 mt-0.5">ROI</p>
                <p class="text-xs text-green-600 font-semibold">+65%</p>
              </div>
            </div>
            <!-- Mini bar chart -->
            <div class="mt-2">
              <p class="text-xs text-gray-500 mb-2 font-medium">Weekly Leads</p>
              <div class="flex items-end gap-1 h-16">
                <div class="flex-1 bg-purple-200 rounded-t-sm" style="height:40%"></div>
                <div class="flex-1 bg-purple-300 rounded-t-sm" style="height:55%"></div>
                <div class="flex-1 bg-purple-400 rounded-t-sm" style="height:70%"></div>
                <div class="flex-1 bg-purple-500 rounded-t-sm" style="height:60%"></div>
                <div class="flex-1 sway-gradient rounded-t-sm" style="height:90%"></div>
                <div class="flex-1 bg-purple-400 rounded-t-sm" style="height:75%"></div>
                <div class="flex-1 bg-purple-200 rounded-t-sm" style="height:45%"></div>
              </div>
              <div class="flex justify-between text-xs text-gray-400 mt-1">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
            <!-- Platform breakdown -->
            <div class="mt-3 space-y-1.5">
              <div class="flex items-center gap-2"><span class="text-xs text-gray-600 w-20">Facebook</span><div class="flex-1 h-1.5 bg-gray-100 rounded-full"><div class="h-1.5 bg-blue-500 rounded-full" style="width:65%"></div></div><span class="text-xs font-semibold text-gray-700 w-8">65%</span></div>
              <div class="flex items-center gap-2"><span class="text-xs text-gray-600 w-20">Instagram</span><div class="flex-1 h-1.5 bg-gray-100 rounded-full"><div class="h-1.5 bg-pink-500 rounded-full" style="width:22%"></div></div><span class="text-xs font-semibold text-gray-700 w-8">22%</span></div>
              <div class="flex items-center gap-2"><span class="text-xs text-gray-600 w-20">Google</span><div class="flex-1 h-1.5 bg-gray-100 rounded-full"><div class="h-1.5 bg-red-400 rounded-full" style="width:13%"></div></div><span class="text-xs font-semibold text-gray-700 w-8">13%</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     AD EXAMPLES SECTION (Real Business Types)
     ============================================================ -->
<section class="section-dark py-20 lg:py-28">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-14 reveal">
      <span class="text-purple-400 text-sm font-bold uppercase tracking-widest">Real Ad Examples</span>
      <h2 class="text-3xl md:text-4xl font-black text-white mt-3 mb-4">See What Your Ads Could Look Like</h2>
      <p class="text-white/60 text-lg max-w-2xl mx-auto">SwayAds creates platform-ready ads for every local service industry. Here are real examples powered by our AI.</p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal">

      <!-- Tree Services -->
      <div class="glass rounded-2xl overflow-hidden feature-card">
        <div class="relative">
          <img src="https://assets.cdn.filesafe.space/QMSEyMqE0DaJ2AFN7ipH/media/69aa90eb618c8df1281d50ae.jfif" alt="Rey Tree Service Memphis" class="w-full h-44 object-cover"/>
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">Facebook Ad</span>
          </div>
          <div class="absolute top-3 right-3">
            <span class="bg-black/50 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm">🌳 Tree Services</span>
          </div>
        </div>
        <div class="p-5">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm">R</div>
            <div>
              <a href="https://reytreeservice.com" rel="dofollow" target="_blank" class="text-white font-bold text-sm hover:text-green-400">Rey Tree Service</a>
              <p class="text-white/40 text-xs">Sponsored · Memphis, TN</p>
            </div>
          </div>
          <h4 class="text-white font-bold text-sm leading-snug mb-1">🌳 Memphis's #1 Tree Service — FREE Estimate!</h4>
          <p class="text-white/60 text-xs leading-relaxed">Storm damage? Overgrown trees? Our certified arborists are ready to help. Licensed, insured & trusted by 500+ homeowners in Memphis. Call today!</p>
          <div class="mt-4 flex items-center justify-between">
            <a href="https://reytreeservice.com" rel="dofollow" target="_blank" class="text-white/50 text-xs hover:text-green-400">📞 reytreeservice.com</a>
            <button class="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Call Now</button>
          </div>
          <div class="mt-3 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
            <div><p class="text-white font-bold text-sm">2.4k</p><p class="text-white/40 text-xs">Reach</p></div>
            <div><p class="text-white font-bold text-sm">187</p><p class="text-white/40 text-xs">Clicks</p></div>
            <div><p class="text-green-400 font-bold text-sm">14</p><p class="text-white/40 text-xs">Calls</p></div>
          </div>
        </div>
      </div>

      <!-- Party Rentals -->
      <div class="glass rounded-2xl overflow-hidden feature-card">
        <div class="relative">
          <img src="https://assets.cdn.filesafe.space/QMSEyMqE0DaJ2AFN7ipH/media/69aa8ec036702f360f0c276a.png" alt="Tiky Jumps Memphis" class="w-full h-44 object-cover"/>
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded">Instagram</span>
          </div>
          <div class="absolute top-3 right-3">
            <span class="bg-black/50 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm">🎉 Party Rentals</span>
          </div>
        </div>
        <div class="p-5">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">T</div>
            <div>
              <a href="https://tikyjumps.com" rel="dofollow" target="_blank" class="text-white font-bold text-sm hover:text-purple-400">Tiky Jumps</a>
              <p class="text-white/40 text-xs">Sponsored · Memphis, TN</p>
            </div>
          </div>
          <h4 class="text-white font-bold text-sm leading-snug mb-1">🎪 Make Your Event Unforgettable! Bounce Houses + More</h4>
          <p class="text-white/60 text-xs leading-relaxed">Tables, chairs, tents, inflatables & more. Book your event today and get 10% off! Same-day delivery available. Memphis's favorite party rental company.</p>
          <div class="mt-4 flex items-center justify-between">
            <a href="https://tikyjumps.com" rel="dofollow" target="_blank" class="text-white/50 text-xs hover:text-purple-400">🌐 tikyjumps.com</a>
            <button class="bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Get a Quote</button>
          </div>
          <div class="mt-3 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
            <div><p class="text-white font-bold text-sm">5.1k</p><p class="text-white/40 text-xs">Reach</p></div>
            <div><p class="text-white font-bold text-sm">342</p><p class="text-white/40 text-xs">Clicks</p></div>
            <div><p class="text-green-400 font-bold text-sm">28</p><p class="text-white/40 text-xs">Leads</p></div>
          </div>
        </div>
      </div>

      <!-- Roof Services -->
      <div class="glass rounded-2xl overflow-hidden feature-card">
        <div class="relative">
          <img src="https://assets.cdn.filesafe.space/QMSEyMqE0DaJ2AFN7ipH/media/69aa8f2036702f99410c3319.jfif" alt="Storm Damage Roofing" class="w-full h-44 object-cover"/>
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">Google Ad</span>
          </div>
          <div class="absolute top-3 right-3">
            <span class="bg-black/50 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm">🔨 Roofing</span>
          </div>
        </div>
        <div class="p-5">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm">P</div>
            <div>
              <p class="text-white font-bold text-sm">ProRoof Solutions</p>
              <p class="text-white/40 text-xs">Sponsored · Phoenix, AZ</p>
            </div>
          </div>
          <h4 class="text-white font-bold text-sm leading-snug mb-1">⚡ Storm Damage? Fast Roof Repairs — Same Day Available</h4>
          <p class="text-white/60 text-xs leading-relaxed">Hail, wind, or leak damage? Our crew responds fast. Insurance claims assistance included. 10-year workmanship warranty on all repairs.</p>
          <div class="mt-4 flex items-center justify-between">
            <div class="text-white/50 text-xs">🏠 Free Inspection</div>
            <button class="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Schedule Now</button>
          </div>
          <div class="mt-3 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
            <div><p class="text-white font-bold text-sm">3.8k</p><p class="text-white/40 text-xs">Reach</p></div>
            <div><p class="text-white font-bold text-sm">219</p><p class="text-white/40 text-xs">Clicks</p></div>
            <div><p class="text-green-400 font-bold text-sm">19</p><p class="text-white/40 text-xs">Calls</p></div>
          </div>
        </div>
      </div>

      <!-- Lawn Care -->
      <div class="glass rounded-2xl overflow-hidden feature-card">
        <div class="relative">
          <img src="https://assets.cdn.filesafe.space/QMSEyMqE0DaJ2AFN7ipH/media/69aa8f20618c8d56441d1d1f.jfif" alt="Lawn Care" class="w-full h-44 object-cover"/>
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">Facebook Ad</span>
          </div>
          <div class="absolute top-3 right-3">
            <span class="bg-black/50 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm">🌿 Lawn Care</span>
          </div>
        </div>
        <div class="p-5">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm">G</div>
            <div>
              <p class="text-white font-bold text-sm">GreenCut Lawn Care</p>
              <p class="text-white/40 text-xs">Sponsored · Austin, TX</p>
            </div>
          </div>
          <h4 class="text-white font-bold text-sm leading-snug mb-1">🌿 Professional Lawn Care — First Cut Just $29!</h4>
          <p class="text-white/60 text-xs leading-relaxed">Weekly, bi-weekly & monthly plans. Includes mowing, edging, blowing, and weed control. Serving Austin homeowners for 8 years.</p>
          <div class="mt-4 flex items-center justify-between">
            <div class="text-white/50 text-xs">📲 Book Online</div>
            <button class="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Get Quote</button>
          </div>
          <div class="mt-3 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
            <div><p class="text-white font-bold text-sm">4.2k</p><p class="text-white/40 text-xs">Reach</p></div>
            <div><p class="text-white font-bold text-sm">298</p><p class="text-white/40 text-xs">Clicks</p></div>
            <div><p class="text-green-400 font-bold text-sm">32</p><p class="text-white/40 text-xs">Leads</p></div>
          </div>
        </div>
      </div>

      <!-- Remodeling -->
      <div class="glass rounded-2xl overflow-hidden feature-card">
        <div class="relative">
          <img src="https://assets.cdn.filesafe.space/QMSEyMqE0DaJ2AFN7ipH/media/69aa8f2036702f24f60c331a.jfif" alt="Elite Remodeling" class="w-full h-44 object-cover"/>
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded">Instagram</span>
          </div>
          <div class="absolute top-3 right-3">
            <span class="bg-black/50 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm">🏠 Remodeling</span>
          </div>
        </div>
        <div class="p-5">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-sm">E</div>
            <div>
              <p class="text-white font-bold text-sm">Elite Home Remodeling</p>
              <p class="text-white/40 text-xs">Sponsored · San Antonio, TX</p>
            </div>
          </div>
          <h4 class="text-white font-bold text-sm leading-snug mb-1">🏡 Kitchen & Bath Remodeling — Financing Available</h4>
          <p class="text-white/60 text-xs leading-relaxed">Transform your home with our expert remodeling team. No money down options, licensed contractors, and 5-star rated on Google. Free design consultation.</p>
          <div class="mt-4 flex items-center justify-between">
            <div class="text-white/50 text-xs">🔑 Free Consultation</div>
            <button class="bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Book Now</button>
          </div>
          <div class="mt-3 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
            <div><p class="text-white font-bold text-sm">6.7k</p><p class="text-white/40 text-xs">Reach</p></div>
            <div><p class="text-white font-bold text-sm">412</p><p class="text-white/40 text-xs">Clicks</p></div>
            <div><p class="text-green-400 font-bold text-sm">41</p><p class="text-white/40 text-xs">Leads</p></div>
          </div>
        </div>
      </div>

      <!-- Rey Tree Service 2nd card -->
      <div class="glass rounded-2xl overflow-hidden feature-card">
        <div class="relative">
          <img src="https://assets.cdn.filesafe.space/QMSEyMqE0DaJ2AFN7ipH/media/69aa90ebb2a2747e9cb64ed3.jfif" alt="Rey Tree Service Memphis" class="w-full h-44 object-cover"/>
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">Google Ad</span>
          </div>
          <div class="absolute top-3 right-3">
            <span class="bg-black/50 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm">🌳 Tree Services</span>
          </div>
        </div>
        <div class="p-5">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-sm">R</div>
            <div>
              <a href="https://reytreeservice.com" rel="dofollow" target="_blank" class="text-white font-bold text-sm hover:text-green-400">Rey Tree Service</a>
              <p class="text-white/40 text-xs">Sponsored · Memphis, TN</p>
            </div>
          </div>
          <h4 class="text-white font-bold text-sm leading-snug mb-1">🌳 Tree Removal & Trimming — Free Same-Day Quote</h4>
          <p class="text-white/60 text-xs leading-relaxed">Emergency tree removal, stump grinding, trimming & pruning. Fully licensed & insured. Serving Memphis & surrounding areas since 2010.</p>
          <div class="mt-4 flex items-center justify-between">
            <a href="https://reytreeservice.com" rel="dofollow" target="_blank" class="text-white/50 text-xs hover:text-green-400">🌐 reytreeservice.com</a>
            <button class="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Get Quote</button>
          </div>
          <div class="mt-3 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
            <div><p class="text-white font-bold text-sm">3.1k</p><p class="text-white/40 text-xs">Reach</p></div>
            <div><p class="text-white font-bold text-sm">241</p><p class="text-white/40 text-xs">Clicks</p></div>
            <div><p class="text-green-400 font-bold text-sm">22</p><p class="text-white/40 text-xs">Calls</p></div>
          </div>
        </div>
      </div>

      <!-- Tiky Jumps 2nd card -->
      <div class="glass rounded-2xl overflow-hidden feature-card">
        <div class="relative">
          <img src="https://assets.cdn.filesafe.space/QMSEyMqE0DaJ2AFN7ipH/media/69aa9212b2a274061db6700b.png" alt="Tiky Jumps Memphis" class="w-full h-44 object-cover"/>
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">Facebook Ad</span>
          </div>
          <div class="absolute top-3 right-3">
            <span class="bg-black/50 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm">🎉 Party Rentals</span>
          </div>
        </div>
        <div class="p-5">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-sm">T</div>
            <div>
              <a href="https://tikyjumps.com" rel="dofollow" target="_blank" class="text-white font-bold text-sm hover:text-yellow-400">Tiky Jumps</a>
              <p class="text-white/40 text-xs">Sponsored · Memphis, TN</p>
            </div>
          </div>
          <h4 class="text-white font-bold text-sm leading-snug mb-1">🎪 Bounce Houses, Tables & Tents — Book for Your Party!</h4>
          <p class="text-white/60 text-xs leading-relaxed">Memphis's go-to party rental company. Inflatables, tables, chairs, tents & more. Affordable prices. Easy online booking. Reserve today!</p>
          <div class="mt-4 flex items-center justify-between">
            <a href="https://tikyjumps.com" rel="dofollow" target="_blank" class="text-white/50 text-xs hover:text-yellow-400">🌐 tikyjumps.com</a>
            <button class="bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Book Now</button>
          </div>
          <div class="mt-3 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
            <div><p class="text-white font-bold text-sm">6.3k</p><p class="text-white/40 text-xs">Reach</p></div>
            <div><p class="text-white font-bold text-sm">489</p><p class="text-white/40 text-xs">Clicks</p></div>
            <div><p class="text-green-400 font-bold text-sm">37</p><p class="text-white/40 text-xs">Leads</p></div>
          </div>
        </div>
      </div>

      <!-- Generic CTA card -->
      <div class="gradient-border bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center feature-card">
        <div class="w-14 h-14 rounded-full sway-gradient flex items-center justify-center mb-4">
          <i class="fas fa-plus text-white text-xl"></i>
        </div>
        <h4 class="text-white font-bold text-lg mb-2">Your Business Here</h4>
        <p class="text-white/60 text-sm mb-6">30+ industries supported. Launch your first AI-powered ad today.</p>
        <a href="https://my.swayads.com" class="btn-primary text-white text-sm font-bold px-6 py-3 rounded-full">
          <i class="fas fa-rocket mr-2"></i> Start Free Trial
        </a>
      </div>

    </div>
  </div>
</section>

<!-- ============================================================
     HOW IT WORKS
     ============================================================ -->
<section id="how-it-works" class="section-white py-20 lg:py-28">
  <div class="max-w-6xl mx-auto px-4">
    <div class="text-center mb-14 reveal">
      <span class="sway-text text-sm font-bold uppercase tracking-widest">How It Works</span>
      <h2 class="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-4">From Zero to Live Ads<br/>in 3 Simple Steps</h2>
      <p class="text-gray-500 text-lg max-w-xl mx-auto">No agency. No learning curve. Just results.</p>
    </div>

    <div class="relative">
      <!-- Connecting line desktop -->
      <div class="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300 mx-16"></div>

      <div class="grid md:grid-cols-3 gap-8 reveal">
        <!-- Step 1 -->
        <div class="flex flex-col items-center text-center relative">
          <div class="w-16 h-16 rounded-2xl sway-gradient flex items-center justify-center mb-6 shadow-lg shadow-purple-200 relative z-10">
            <i class="fas fa-building text-white text-2xl"></i>
          </div>
          <div class="w-7 h-7 rounded-full bg-white border-2 border-purple-300 flex items-center justify-center text-purple-600 font-black text-sm mb-4">1</div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Tell Us About Your Business</h3>
          <p class="text-gray-500 text-sm leading-relaxed">Enter your business type, service area, and budget. SwayAds's AI instantly understands what you do and who your best customers are.</p>
          <div class="mt-4 bg-purple-50 rounded-xl p-3 w-full">
            <p class="text-xs text-purple-700 font-medium">Takes less than 2 minutes ⚡</p>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="flex flex-col items-center text-center relative">
          <div class="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-200 relative z-10">
            <i class="fas fa-magic text-white text-2xl"></i>
          </div>
          <div class="w-7 h-7 rounded-full bg-white border-2 border-blue-300 flex items-center justify-center text-blue-600 font-black text-sm mb-4">2</div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">AI Builds Your Campaigns</h3>
          <p class="text-gray-500 text-sm leading-relaxed">Our AI writes compelling ad copy, selects the perfect audience, designs creatives, and sets up tracking — all automatically, optimized for your industry.</p>
          <div class="mt-4 bg-blue-50 rounded-xl p-3 w-full">
            <p class="text-xs text-blue-700 font-medium">AI handles the heavy lifting 🤖</p>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="flex flex-col items-center text-center relative">
          <div class="w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center mb-6 shadow-lg shadow-green-200 relative z-10">
            <i class="fas fa-chart-rocket text-white text-2xl"></i>
          </div>
          <div class="w-7 h-7 rounded-full bg-white border-2 border-green-300 flex items-center justify-center text-green-600 font-black text-sm mb-4">3</div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Watch Leads Roll In</h3>
          <p class="text-gray-500 text-sm leading-relaxed">Your ads go live across Facebook, Instagram & Google. Track every lead, call, and dollar in your simple dashboard. AI keeps optimizing automatically.</p>
          <div class="mt-4 bg-green-50 rounded-xl p-3 w-full">
            <p class="text-xs text-green-700 font-medium">Continuous AI optimization 📈</p>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center mt-12 reveal">
      <a href="https://my.swayads.com" class="btn-primary text-white font-bold px-10 py-4 rounded-full text-base shadow-xl shadow-purple-200 inline-flex items-center gap-3">
        <i class="fas fa-rocket"></i>
        Start Your First Campaign Free
        <i class="fas fa-arrow-right text-sm"></i>
      </a>
      <p class="text-gray-400 text-sm mt-3">No credit card required · Setup in 5 minutes</p>
    </div>
  </div>
</section>

<!-- ============================================================
     VIDEO SECTION — HOW IT WORKS
     ============================================================ -->
<section id="watch" class="video-section-bg py-20 lg:py-28">
  <div class="max-w-7xl mx-auto px-4 relative z-10">

    <!-- Header -->
    <div class="text-center mb-14 reveal">
      <span class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
        <i class="fas fa-play-circle text-purple-400"></i>
        <span class="text-white/80 text-sm font-medium">2-Minute Demo</span>
      </span>
      <h2 class="text-3xl md:text-5xl font-black text-white mt-2 mb-4 leading-tight">
        See SwayAds in Action
      </h2>
      <p class="text-white/60 text-lg max-w-xl mx-auto">
        Watch how a local business launches a complete ad campaign in under 5 minutes — no agency, no guesswork.
      </p>
    </div>

    <div class="grid lg:grid-cols-5 gap-10 items-center">

      <!-- Video Player (3/5 width) -->
      <div class="lg:col-span-3 reveal">
        <div class="video-wrapper" id="video-container">
          <!-- Native HTML5 video with poster frame -->
          <div class="relative cursor-pointer" id="video-thumbnail" onclick="openVideoModal()">
            <!-- Video element (muted autoplay for thumbnail preview) -->
            <video
              id="preview-video"
              class="w-full aspect-video object-cover block"
              muted
              playsinline
              preload="metadata"
              src="https://firebasestorage.googleapis.com/v0/b/plai-v3.appspot.com/o/Resource%2Fresource%20tab_7_%20product%20overview.mp4?alt=media&token=ccbb5611-0ea3-49a3-a27a-064c52022fe4#t=0.1"
            ></video>
            <!-- Dark overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>
            <!-- Bottom caption -->
            <div class="absolute bottom-5 left-5 right-16 pointer-events-none">
              <p class="text-white font-bold text-base md:text-lg drop-shadow">SwayAds Product Overview</p>
              <p class="text-white/60 text-sm mt-1">AI-Powered Advertising Platform · Full Demo</p>
            </div>
            <!-- HD badge -->
            <div class="absolute top-4 right-4 bg-black/70 text-white text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm pointer-events-none">
              HD
            </div>
            <!-- Play button -->
            <button class="play-btn" onclick="openVideoModal()">
              <i class="fas fa-play"></i>
            </button>
          </div>
        </div>

        <!-- Video note -->
        <div class="flex items-center justify-center gap-3 mt-5">
          <div class="flex -space-x-2">
            <img src="https://i.pravatar.cc/24?img=11" class="w-6 h-6 rounded-full border border-purple-500"/>
            <img src="https://i.pravatar.cc/24?img=5"  class="w-6 h-6 rounded-full border border-purple-500"/>
            <img src="https://i.pravatar.cc/24?img=8"  class="w-6 h-6 rounded-full border border-purple-500"/>
          </div>
          <p class="text-white/50 text-sm">Watched by <span class="text-white/80 font-semibold">4,200+ business owners</span></p>
        </div>
      </div>

      <!-- Steps sidebar (2/5 width) -->
      <div class="lg:col-span-2 space-y-4 reveal">

        <div class="vstep">
          <div class="vstep-num sway-gradient">1</div>
          <div>
            <p class="text-white font-bold text-sm mb-1">Enter Your Business Info</p>
            <p class="text-white/50 text-xs leading-relaxed">Tell us your business type, city, and monthly budget. Takes less than 60 seconds.</p>
            <span class="inline-block mt-2 text-xs text-purple-400 font-semibold">⏱ ~1 min</span>
          </div>
        </div>

        <div class="vstep">
          <div class="vstep-num bg-blue-500">2</div>
          <div>
            <p class="text-white font-bold text-sm mb-1">AI Generates Your Campaigns</p>
            <p class="text-white/50 text-xs leading-relaxed">Our AI writes the ad copy, picks your audience, selects creatives and sets up tracking — instantly.</p>
            <span class="inline-block mt-2 text-xs text-blue-400 font-semibold">⏱ ~2 min</span>
          </div>
        </div>

        <div class="vstep">
          <div class="vstep-num bg-green-500">3</div>
          <div>
            <p class="text-white font-bold text-sm mb-1">Review & Launch</p>
            <p class="text-white/50 text-xs leading-relaxed">Approve with one click. Your ads go live on Facebook, Instagram & Google simultaneously.</p>
            <span class="inline-block mt-2 text-xs text-green-400 font-semibold">⏱ ~30 sec</span>
          </div>
        </div>

        <div class="vstep">
          <div class="vstep-num" style="background:linear-gradient(135deg,#f59e0b,#ef4444)">4</div>
          <div>
            <p class="text-white font-bold text-sm mb-1">AI Keeps Optimizing</p>
            <p class="text-white/50 text-xs leading-relaxed">24/7 automated A/B testing and budget reallocation. Your cost per lead drops over time automatically.</p>
            <span class="inline-block mt-2 text-xs text-yellow-400 font-semibold">⚡ Ongoing</span>
          </div>
        </div>

        <a href="https://my.swayads.com" class="flex items-center justify-center gap-2 w-full btn-primary text-white font-bold py-3.5 rounded-xl text-sm shadow-lg mt-2">
          <i class="fas fa-rocket"></i>
          Try It Yourself — Free
          <i class="fas fa-arrow-right text-xs"></i>
        </a>
      </div>
    </div>

    <!-- Platform row -->
    <div class="mt-14 text-center reveal">
      <p class="text-white/30 text-xs uppercase tracking-widest font-semibold mb-5">Launches campaigns simultaneously on</p>
      <div class="flex items-center justify-center gap-8 flex-wrap">
        <div class="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
          <i class="fab fa-facebook-f text-blue-400 text-xl"></i>
          <span class="text-sm font-semibold">Facebook</span>
        </div>
        <div class="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
          <i class="fab fa-instagram text-pink-400 text-xl"></i>
          <span class="text-sm font-semibold">Instagram</span>
        </div>
        <div class="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
          <i class="fab fa-google text-red-400 text-xl"></i>
          <span class="text-sm font-semibold">Google</span>
        </div>
        <div class="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
          <i class="fab fa-tiktok text-white/60 text-xl"></i>
          <span class="text-sm font-semibold">TikTok <span class="text-xs text-purple-400">(soon)</span></span>
        </div>
        <div class="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
          <i class="fab fa-youtube text-red-500 text-xl"></i>
          <span class="text-sm font-semibold">YouTube <span class="text-xs text-purple-400">(soon)</span></span>
        </div>
      </div>
    </div>

  </div>
</section>

<!-- Video Modal -->
<div id="video-modal" onclick="closeVideoModal(event)">
  <div class="modal-box">
    <button class="close-btn" onclick="closeVideoModal()"><i class="fas fa-times"></i></button>
    <video
      id="modal-video"
      controls
      autoplay
      playsinline
      preload="none"
      src=""
      style="max-height:85vh"
    >
      Your browser does not support the video tag.
    </video>
  </div>
</div>

<!-- ============================================================
     PRICING
     ============================================================ -->
<section id="pricing" class="section-gray py-20 lg:py-28">
  <div class="max-w-7xl mx-auto px-4">

    <!-- Header -->
    <div class="text-center mb-6 reveal">
      <span class="sway-text text-sm font-bold uppercase tracking-widest">Pricing</span>
      <h2 class="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-4">Simple, Transparent Pricing</h2>
      <p class="text-gray-500 text-lg max-w-xl mx-auto">No hidden fees. No long-term contracts. Cancel anytime.</p>
    </div>

    <!-- Tab switcher: DIY / Managed -->
    <div class="flex justify-center mb-12 reveal">
      <div class="inline-flex bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm gap-1">
        <button id="tab-diy" onclick="switchTab('diy')"
          class="px-7 py-2.5 rounded-xl text-sm font-bold transition-all bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md">
          🤖 DIY — Self-Serve
        </button>
        <button id="tab-managed" onclick="switchTab('managed')"
          class="px-7 py-2.5 rounded-xl text-sm font-bold transition-all text-gray-500 hover:text-gray-700">
          🎯 Managed — Done For You
        </button>
      </div>
    </div>

    <!-- ── DIY PLANS ── -->
    <div id="diy-plans">

      <!-- DIY label -->
      <div class="text-center mb-8 reveal">
        <span class="inline-flex items-center gap-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-4 py-1.5 text-sm font-semibold">
          <i class="fas fa-robot"></i> You run the ads — AI does the heavy lifting
        </span>
      </div>

      <div class="grid md:grid-cols-3 gap-6 reveal">

        <!-- DIY Starter -->
        <div class="pricing-card bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="p-8">
            <div class="flex items-center justify-between mb-1">
              <p class="text-sm font-bold text-gray-500 uppercase tracking-wide">Starter</p>
              <span class="text-xs bg-blue-50 text-blue-600 font-semibold px-2.5 py-1 rounded-full">DIY</span>
            </div>
            <div class="flex items-end gap-1 mt-3 mb-1">
              <span class="text-4xl font-black text-gray-900">$147</span>
              <span class="text-gray-400 text-sm mb-1.5">/mo</span>
            </div>
            <p class="text-gray-500 text-sm mb-1">One-time setup: <span class="font-semibold text-gray-700">$147 DIY</span></p>
            <!-- Channels -->
            <div class="mt-4 mb-5 p-3 bg-gray-50 rounded-xl">
              <p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Channels</p>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="flex items-center gap-1.5 text-xs font-semibold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
                  <i class="fab fa-facebook-f text-blue-600"></i> Facebook
                </span>
                <span class="flex items-center gap-1.5 text-xs font-semibold bg-pink-100 text-pink-700 px-2.5 py-1 rounded-full">
                  <i class="fab fa-instagram text-pink-600"></i> Instagram
                </span>
              </div>
            </div>
            <ul class="space-y-2.5 mb-8">
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>Unlimited campaigns</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>AI creatives</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>AI meme generator</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>AI avatars</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>Templates library</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>Audience generator</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>Ad creative generator</li>
            </ul>
            <a href="https://my.swayads.com" class="block w-full text-center border-2 border-purple-600 text-purple-600 font-bold py-3 rounded-xl hover:bg-purple-50 transition-colors text-sm">
              Get Started
            </a>
          </div>
        </div>

        <!-- DIY Growth — Most Popular -->
        <div class="pricing-card relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-300/40" style="background:linear-gradient(160deg,#1a0533,#0d1a3a);">
          <div class="sway-gradient text-white text-xs font-bold text-center py-2 tracking-widest uppercase">
            ⭐ Most Popular
          </div>
          <div class="p-8">
            <div class="flex items-center justify-between mb-1">
              <p class="text-sm font-bold text-white/60 uppercase tracking-wide">Growth</p>
              <span class="text-xs bg-white/10 text-white/80 font-semibold px-2.5 py-1 rounded-full">DIY</span>
            </div>
            <div class="flex items-end gap-1 mt-3 mb-1">
              <span class="text-4xl font-black text-white">$247</span>
              <span class="text-white/50 text-sm mb-1.5">/mo</span>
            </div>
            <p class="text-white/50 text-sm mb-1">One-time setup: <span class="font-semibold text-white/70">$147 DIY</span></p>
            <!-- Channels -->
            <div class="mt-4 mb-5 p-3 bg-white/5 rounded-xl border border-white/10">
              <p class="text-xs font-bold text-white/40 uppercase tracking-wide mb-2">Channels</p>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="flex items-center gap-1.5 text-xs font-semibold bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-full">
                  <i class="fab fa-facebook-f"></i> Facebook
                </span>
                <span class="flex items-center gap-1.5 text-xs font-semibold bg-pink-500/20 text-pink-300 px-2.5 py-1 rounded-full">
                  <i class="fab fa-instagram"></i> Instagram
                </span>
                <span class="flex items-center gap-1.5 text-xs font-semibold bg-red-500/20 text-red-300 px-2.5 py-1 rounded-full">
                  <i class="fab fa-google"></i> Google
                </span>
              </div>
            </div>
            <ul class="space-y-2.5 mb-8">
              <li class="flex items-center gap-2.5 text-sm text-white/80"><i class="fas fa-check text-purple-400 w-4 flex-shrink-0"></i>Everything in Starter</li>
              <li class="flex items-center gap-2.5 text-sm text-white/80"><i class="fas fa-check text-purple-400 w-4 flex-shrink-0"></i>Cross-platform campaigns</li>
              <li class="flex items-center gap-2.5 text-sm text-white/80"><i class="fas fa-check text-purple-400 w-4 flex-shrink-0"></i>AI optimization</li>
              <li class="flex items-center gap-2.5 text-sm text-white/80"><i class="fas fa-check text-purple-400 w-4 flex-shrink-0"></i>Advanced targeting</li>
            </ul>
            <a href="https://my.swayads.com" class="block w-full text-center btn-primary text-white font-bold py-3 rounded-xl text-sm shadow-lg">
              Get Started
            </a>
          </div>
        </div>

        <!-- DIY Pro -->
        <div class="pricing-card bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="p-8">
            <div class="flex items-center justify-between mb-1">
              <p class="text-sm font-bold text-gray-500 uppercase tracking-wide">Pro</p>
              <span class="text-xs bg-purple-50 text-purple-600 font-semibold px-2.5 py-1 rounded-full">DIY</span>
            </div>
            <div class="flex items-end gap-1 mt-3 mb-1">
              <span class="text-4xl font-black text-gray-900">$497</span>
              <span class="text-gray-400 text-sm mb-1.5">/mo</span>
            </div>
            <p class="text-gray-500 text-sm mb-1">One-time setup: <span class="font-semibold text-gray-700">$147 DIY</span></p>
            <!-- Channels -->
            <div class="mt-4 mb-5 p-3 bg-gray-50 rounded-xl">
              <p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">11 Channels</p>
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"><i class="fab fa-facebook-f mr-1"></i>Meta</span>
                <span class="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full"><i class="fab fa-google mr-1"></i>Google</span>
                <span class="text-xs font-semibold bg-black text-white px-2 py-0.5 rounded-full"><i class="fab fa-tiktok mr-1"></i>TikTok</span>
                <span class="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"><i class="fab fa-linkedin-in mr-1"></i>LinkedIn</span>
                <span class="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full"><i class="fas fa-music mr-1"></i>Spotify</span>
                <span class="text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Bing</span>
                <span class="text-xs font-semibold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Snapchat</span>
                <span class="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Direct Mail</span>
                <span class="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">+ Future</span>
              </div>
            </div>
            <ul class="space-y-2.5 mb-8">
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>Omnichannel campaigns</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>Unlimited creatives</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>Full AI creative studio</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>Advanced optimization tools</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>Full template library</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>Audience generator</li>
            </ul>
            <a href="https://my.swayads.com" class="block w-full text-center border-2 border-gray-900 text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm">
              Get Started
            </a>
          </div>
        </div>

      </div><!-- /diy grid -->
    </div><!-- /diy-plans -->

    <!-- ── MANAGED PLANS ── -->
    <div id="managed-plans" class="hidden">

      <!-- Managed label -->
      <div class="text-center mb-8 reveal">
        <span class="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded-full px-4 py-1.5 text-sm font-semibold">
          <i class="fas fa-headset"></i> Our experts run everything — you just approve
        </span>
      </div>

      <div class="grid md:grid-cols-3 gap-6 reveal">

        <!-- Managed Starter -->
        <div class="pricing-card bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="h-1.5 sway-gradient"></div>
          <div class="p-8">
            <div class="flex items-center justify-between mb-1">
              <p class="text-sm font-bold text-gray-500 uppercase tracking-wide">Managed Starter</p>
              <span class="text-xs bg-green-50 text-green-600 font-semibold px-2.5 py-1 rounded-full">Managed</span>
            </div>
            <div class="flex items-end gap-1 mt-3 mb-4">
              <span class="text-4xl font-black text-gray-900">$497</span>
              <span class="text-gray-400 text-sm mb-1.5">/mo</span>
            </div>
            <!-- Channels -->
            <div class="mb-5 p-3 bg-gray-50 rounded-xl">
              <p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Platforms</p>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="flex items-center gap-1.5 text-xs font-semibold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
                  <i class="fab fa-facebook-f"></i> Facebook
                </span>
                <span class="flex items-center gap-1.5 text-xs font-semibold bg-pink-100 text-pink-700 px-2.5 py-1 rounded-full">
                  <i class="fab fa-instagram"></i> Instagram
                </span>
              </div>
            </div>
            <ul class="space-y-2.5 mb-8">
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>Campaign setup included</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>2 campaigns</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>4 ad sets</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>Biweekly optimization</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>AI creative testing</li>
              <li class="flex items-start gap-2.5 text-sm text-gray-500 mt-3 pt-3 border-t border-gray-100">
                <i class="fas fa-star text-yellow-400 w-4 mt-0.5 flex-shrink-0"></i>
                <span>Best for local businesses getting started</span>
              </li>
            </ul>
            <a href="https://my.swayads.com" class="block w-full text-center border-2 border-purple-600 text-purple-600 font-bold py-3 rounded-xl hover:bg-purple-50 transition-colors text-sm">
              Get Started
            </a>
          </div>
        </div>

        <!-- Managed Growth — Most Popular -->
        <div class="pricing-card relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-300/40" style="background:linear-gradient(160deg,#1a0533,#0d1a3a);">
          <div class="sway-gradient text-white text-xs font-bold text-center py-2 tracking-widest uppercase">
            ⭐ Most Popular
          </div>
          <div class="p-8">
            <div class="flex items-center justify-between mb-1">
              <p class="text-sm font-bold text-white/60 uppercase tracking-wide">Managed Growth</p>
              <span class="text-xs bg-white/10 text-white/80 font-semibold px-2.5 py-1 rounded-full">Managed</span>
            </div>
            <div class="flex items-end gap-1 mt-3 mb-4">
              <span class="text-4xl font-black text-white">$747</span>
              <span class="text-white/50 text-sm mb-1.5">/mo</span>
            </div>
            <!-- Channels -->
            <div class="mb-5 p-3 bg-white/5 rounded-xl border border-white/10">
              <p class="text-xs font-bold text-white/40 uppercase tracking-wide mb-2">Platforms</p>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="flex items-center gap-1.5 text-xs font-semibold bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-full">
                  <i class="fab fa-facebook-f"></i> Meta
                </span>
                <span class="flex items-center gap-1.5 text-xs font-semibold bg-red-500/20 text-red-300 px-2.5 py-1 rounded-full">
                  <i class="fab fa-google"></i> Google
                </span>
              </div>
            </div>
            <ul class="space-y-2.5 mb-8">
              <li class="flex items-center gap-2.5 text-sm text-white/80"><i class="fas fa-check text-purple-400 w-4 flex-shrink-0"></i>Campaign setup included</li>
              <li class="flex items-center gap-2.5 text-sm text-white/80"><i class="fas fa-check text-purple-400 w-4 flex-shrink-0"></i>4 campaigns</li>
              <li class="flex items-center gap-2.5 text-sm text-white/80"><i class="fas fa-check text-purple-400 w-4 flex-shrink-0"></i>8 ad sets</li>
              <li class="flex items-center gap-2.5 text-sm text-white/80"><i class="fas fa-check text-purple-400 w-4 flex-shrink-0"></i>Weekly optimization</li>
              <li class="flex items-center gap-2.5 text-sm text-white/80"><i class="fas fa-check text-purple-400 w-4 flex-shrink-0"></i>AI creative testing</li>
              <li class="flex items-center gap-2.5 text-sm text-white/80"><i class="fas fa-check text-purple-400 w-4 flex-shrink-0"></i>Conversion tracking</li>
            </ul>
            <a href="https://my.swayads.com" class="block w-full text-center btn-primary text-white font-bold py-3 rounded-xl text-sm shadow-lg">
              Get Started
            </a>
          </div>
        </div>

        <!-- Managed Scale -->
        <div class="pricing-card bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="h-1.5 bg-gradient-to-r from-orange-400 to-red-500"></div>
          <div class="p-8">
            <div class="flex items-center justify-between mb-1">
              <p class="text-sm font-bold text-gray-500 uppercase tracking-wide">Managed Scale</p>
              <span class="text-xs bg-orange-50 text-orange-600 font-semibold px-2.5 py-1 rounded-full">Managed</span>
            </div>
            <div class="flex items-end gap-1 mt-3 mb-4">
              <span class="text-4xl font-black text-gray-900">$997</span>
              <span class="text-gray-400 text-sm mb-1.5">/mo</span>
            </div>
            <!-- Channels -->
            <div class="mb-5 p-3 bg-gray-50 rounded-xl">
              <p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Platforms</p>
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"><i class="fab fa-facebook-f mr-1"></i>Meta</span>
                <span class="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full"><i class="fab fa-google mr-1"></i>Google</span>
                <span class="text-xs font-semibold bg-black text-white px-2 py-0.5 rounded-full"><i class="fab fa-tiktok mr-1"></i>TikTok</span>
              </div>
            </div>
            <ul class="space-y-2.5 mb-8">
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>6 campaigns</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>12 ad sets</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>Weekly optimization</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>Creative testing</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>Scaling strategy</li>
              <li class="flex items-center gap-2.5 text-sm text-gray-700"><i class="fas fa-check text-green-500 w-4 flex-shrink-0"></i>Detailed reporting</li>
            </ul>
            <a href="https://my.swayads.com" class="block w-full text-center border-2 border-gray-900 text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm">
              Get Started
            </a>
          </div>
        </div>

      </div><!-- /managed grid -->
    </div><!-- /managed-plans -->

    <!-- ── ADD-ONS ── -->
    <div class="mt-12 reveal">
      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="px-8 py-5 border-b border-gray-100 flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl sway-gradient flex items-center justify-center flex-shrink-0">
            <i class="fas fa-plus text-white text-sm"></i>
          </div>
          <div>
            <h3 class="font-bold text-gray-900">Add-Ons</h3>
            <p class="text-gray-400 text-xs">Customize any plan with extra power</p>
          </div>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          <div class="p-6 text-center hover:bg-purple-50/50 transition-colors">
            <div class="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-3">
              <i class="fas fa-bullhorn text-purple-600"></i>
            </div>
            <p class="text-2xl font-black text-gray-900 mb-0.5">$150<span class="text-gray-400 text-sm font-normal">/mo</span></p>
            <p class="text-sm font-semibold text-gray-700">Extra Campaign</p>
            <p class="text-xs text-gray-400 mt-1">Add more campaigns to any plan</p>
          </div>
          <div class="p-6 text-center hover:bg-blue-50/50 transition-colors">
            <div class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-3">
              <i class="fas fa-layer-group text-blue-600"></i>
            </div>
            <p class="text-2xl font-black text-gray-900 mb-0.5">$200<span class="text-gray-400 text-sm font-normal">/mo</span></p>
            <p class="text-sm font-semibold text-gray-700">Extra Platform</p>
            <p class="text-xs text-gray-400 mt-1">Expand to an additional ad channel</p>
          </div>
          <div class="p-6 text-center hover:bg-green-50/50 transition-colors">
            <div class="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-3">
              <i class="fas fa-image text-green-600"></i>
            </div>
            <p class="text-2xl font-black text-gray-900 mb-0.5">$100<span class="text-gray-400 text-sm font-normal">/mo</span></p>
            <p class="text-sm font-semibold text-gray-700">Creative Production</p>
            <p class="text-xs text-gray-400 mt-1">Extra ad creatives each month</p>
          </div>
          <div class="p-6 text-center hover:bg-orange-50/50 transition-colors">
            <div class="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center mx-auto mb-3">
              <i class="fas fa-file-alt text-orange-600"></i>
            </div>
            <p class="text-2xl font-black text-gray-900 mb-0.5">$300<span class="text-gray-400 text-sm font-normal"> once</span></p>
            <p class="text-sm font-semibold text-gray-700">Landing Page Build</p>
            <p class="text-xs text-gray-400 mt-1">High-converting page for your ads</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Guarantee -->
    <div class="mt-8 text-center bg-white rounded-2xl p-6 border border-green-100 shadow-sm reveal">
      <div class="flex items-center justify-center gap-3 flex-wrap">
        <i class="fas fa-shield-alt text-green-500 text-2xl"></i>
        <div class="text-left">
          <p class="font-bold text-gray-900">30-Day Money-Back Guarantee</p>
          <p class="text-gray-500 text-sm">If you don't get results in 30 days, we'll refund you. No questions asked.</p>
        </div>
      </div>
    </div>

  </div>
</section>

<!-- ============================================================
     TESTIMONIALS
     ============================================================ -->
<section id="testimonials" class="section-white py-20 lg:py-28">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-14 reveal">
      <span class="sway-text text-sm font-bold uppercase tracking-widest">Customer Reviews</span>
      <h2 class="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-4">Local Business Owners<br/>Love SwayAds</h2>
      <div class="flex items-center justify-center gap-2 mt-4">
        <div class="stars text-xl">★★★★★</div>
        <span class="text-gray-700 font-bold">4.9/5</span>
        <span class="text-gray-400 text-sm">from 400+ reviews</span>
      </div>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal">

      <!-- Testimonial 1 -->
      <div class="testimonial-card bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div class="stars text-sm mb-3">★★★★★</div>
        <p class="text-gray-700 text-sm leading-relaxed mb-4">"SwayAds completely changed my business. I used to spend $2,000/month on an agency and barely got 5 calls. Now I spend $300 on ads and get 30+ leads per month. The AI literally knows what to say to homeowners."</p>
        <div class="flex items-center gap-3">
          <img src="https://i.pravatar.cc/48?img=11" alt="" class="w-10 h-10 rounded-full"/>
          <div>
            <p class="font-bold text-gray-900 text-sm">Carlos Rey</p>
            <p class="text-gray-400 text-xs">🌳 <a href="https://reytreeservice.com" rel="dofollow" target="_blank" class="hover:underline">Rey Tree Service</a> · Memphis, TN</p>
          </div>
        </div>
      </div>

      <!-- Testimonial 2 -->
      <div class="testimonial-card bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div class="stars text-sm mb-3">★★★★★</div>
        <p class="text-gray-700 text-sm leading-relaxed mb-4">"As a party rental company, summers are our busiest season. SwayAds helped me set up Facebook and Instagram campaigns in one afternoon that brought in $18,000 in bookings. Literally paid for itself 60x over."</p>
        <div class="flex items-center gap-3">
          <img src="https://i.pravatar.cc/48?img=5" alt="" class="w-10 h-10 rounded-full"/>
          <div>
            <p class="font-bold text-gray-900 text-sm">Juan C.</p>
            <p class="text-gray-400 text-xs">🎉 <a href="https://tikyjumps.com" rel="dofollow" target="_blank" class="hover:underline">Tiky Jumps</a> · Memphis, TN</p>
          </div>
        </div>
      </div>

      <!-- Testimonial 3 -->
      <div class="testimonial-card bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div class="stars text-sm mb-3">★★★★★</div>
        <p class="text-gray-700 text-sm leading-relaxed mb-4">"After Hurricane Harvey we had more leads than we could handle. I typed in 'roofing company, Pearland TX' and within 10 minutes I had 3 ads live across Google, Facebook, and Instagram. Incredible tool."</p>
        <div class="flex items-center gap-3">
          <img src="https://i.pravatar.cc/48?img=8" alt="" class="w-10 h-10 rounded-full"/>
          <div>
            <p class="font-bold text-gray-900 text-sm">Jake Thompson</p>
            <p class="text-gray-400 text-xs">🔨 ProRoof Solutions · Pearland, TX</p>
          </div>
        </div>
      </div>

      <!-- Testimonial 4 -->
      <div class="testimonial-card bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div class="stars text-sm mb-3">★★★★★</div>
        <p class="text-gray-700 text-sm leading-relaxed mb-4">"My lawn care business was relying only on word of mouth. SwayAds set up a Google Ads campaign and I went from 12 regular clients to 47 clients in 3 months. The cost per lead is just $3.80 — unbeatable."</p>
        <div class="flex items-center gap-3">
          <img src="https://i.pravatar.cc/48?img=15" alt="" class="w-10 h-10 rounded-full"/>
          <div>
            <p class="font-bold text-gray-900 text-sm">DeShawn Williams</p>
            <p class="text-gray-400 text-xs">🌿 GreenCut Lawn Care · Austin, TX</p>
          </div>
        </div>
      </div>

      <!-- Testimonial 5 -->
      <div class="testimonial-card bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div class="stars text-sm mb-3">★★★★★</div>
        <p class="text-gray-700 text-sm leading-relaxed mb-4">"I was quoted $5,000/month by a marketing agency. SwayAds does the same job — honestly better — for $97/month. The AI-generated copy outperforms anything I've seen. My kitchen remodel leads tripled."</p>
        <div class="flex items-center gap-3">
          <img src="https://i.pravatar.cc/48?img=19" alt="" class="w-10 h-10 rounded-full"/>
          <div>
            <p class="font-bold text-gray-900 text-sm">Sandra Rodriguez</p>
            <p class="text-gray-400 text-xs">🏠 Elite Home Remodeling · San Antonio, TX</p>
          </div>
        </div>
      </div>

      <!-- Testimonial 6 -->
      <div class="testimonial-card bg-gradient-to-br from-purple-700 to-blue-700 rounded-2xl p-6">
        <div class="stars text-sm mb-3">★★★★★</div>
        <p class="text-white/90 text-sm leading-relaxed mb-4">"SwayAds isn't just an ad tool — it's like having a full-time marketing director who works 24/7, never takes a day off, and costs less than one hour of agency time. Every local business needs this."</p>
        <div class="flex items-center gap-3">
          <img src="https://i.pravatar.cc/48?img=25" alt="" class="w-10 h-10 rounded-full border-2 border-white/40"/>
          <div>
            <p class="font-bold text-white text-sm">Robert Chen</p>
            <p class="text-white/60 text-xs">🚗 Precision Auto Repair · Phoenix, AZ</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ============================================================
     FAQ
     ============================================================ -->
<section id="faq" class="section-gray py-20 lg:py-28">
  <div class="max-w-3xl mx-auto px-4">
    <div class="text-center mb-14 reveal">
      <span class="sway-text text-sm font-bold uppercase tracking-widest">FAQ</span>
      <h2 class="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-4">Frequently Asked Questions</h2>
    </div>

    <div class="space-y-3 reveal">

      <div class="faq-item bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <details>
          <summary class="flex items-center justify-between p-5 font-semibold text-gray-900 text-sm">
            Do I need any marketing experience to use SwayAds?
            <i class="fas fa-plus faq-icon text-purple-500 flex-shrink-0 ml-4"></i>
          </summary>
          <div class="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
            Not at all! SwayAds was designed specifically for business owners with zero marketing experience. Just tell us your business type, service area, and budget — our AI handles everything else. Most customers launch their first ad in under 5 minutes.
          </div>
        </details>
      </div>

      <div class="faq-item bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <details>
          <summary class="flex items-center justify-between p-5 font-semibold text-gray-900 text-sm">
            Which ad platforms does SwayAds support?
            <i class="fas fa-plus faq-icon text-purple-500 flex-shrink-0 ml-4"></i>
          </summary>
          <div class="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
            SwayAds currently supports Facebook Ads, Instagram Ads, Google Ads (Search & Display), and we're adding TikTok Ads and YouTube Ads in Q2 2026. You can manage all platforms from one single dashboard.
          </div>
        </details>
      </div>

      <div class="faq-item bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <details>
          <summary class="flex items-center justify-between p-5 font-semibold text-gray-900 text-sm">
            How much should I budget for ads on top of the subscription?
            <i class="fas fa-plus faq-icon text-purple-500 flex-shrink-0 ml-4"></i>
          </summary>
          <div class="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
            We recommend starting with at least $10–$20/day ($300–$600/month) in ad spend. This is separate from your SwayAds subscription and goes directly to Facebook/Google. Most local businesses see their first leads within 24–48 hours. SwayAds does NOT take a percentage of your ad spend.
          </div>
        </details>
      </div>

      <div class="faq-item bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <details>
          <summary class="flex items-center justify-between p-5 font-semibold text-gray-900 text-sm">
            Can I cancel anytime?
            <i class="fas fa-plus faq-icon text-purple-500 flex-shrink-0 ml-4"></i>
          </summary>
          <div class="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
            Yes, absolutely. There are no long-term contracts or cancellation fees. You can cancel your subscription anytime from your account settings. We also offer a 30-day money-back guarantee — if you're not happy, just contact us.
          </div>
        </details>
      </div>

      <div class="faq-item bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <details>
          <summary class="flex items-center justify-between p-5 font-semibold text-gray-900 text-sm">
            How is SwayAds different from hiring a marketing agency?
            <i class="fas fa-plus faq-icon text-purple-500 flex-shrink-0 ml-4"></i>
          </summary>
          <div class="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
            Traditional agencies charge $1,500–$5,000/month + take 15–20% of your ad spend. SwayAds starts at $49/month with zero ad spend commissions. Our AI optimizes campaigns 24/7, while agencies typically check in once a week. Plus, you own your accounts and data — always.
          </div>
        </details>
      </div>

      <div class="faq-item bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <details>
          <summary class="flex items-center justify-between p-5 font-semibold text-gray-900 text-sm">
            Does SwayAds work for businesses outside the US?
            <i class="fas fa-plus faq-icon text-purple-500 flex-shrink-0 ml-4"></i>
          </summary>
          <div class="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
            Yes! SwayAds works in any country where Facebook Ads, Instagram, and Google Ads are available. Our geo-targeting works for any city, region, or country in the world.
          </div>
        </details>
      </div>

      <div class="faq-item bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <details>
          <summary class="flex items-center justify-between p-5 font-semibold text-gray-900 text-sm">
            What industries does SwayAds support?
            <i class="fas fa-plus faq-icon text-purple-500 flex-shrink-0 ml-4"></i>
          </summary>
          <div class="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
            SwayAds supports 30+ local service industries including: tree services, lawn care, roofing, remodeling, party rentals, HVAC, plumbing, painting, cleaning services, auto repair, restaurants, dental, legal, real estate, and many more. New industry templates are added monthly.
          </div>
        </details>
      </div>

    </div>
  </div>
</section>

<!-- ============================================================
     FINAL CTA SECTION
     ============================================================ -->
<section class="hero-bg py-24 relative overflow-hidden">
  <div class="absolute inset-0 opacity-20">
    <div class="absolute top-10 left-10 w-64 h-64 rounded-full sway-gradient blur-3xl"></div>
    <div class="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-blue-500 blur-3xl"></div>
  </div>
  <div class="max-w-3xl mx-auto px-4 text-center relative z-10">
    <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
      <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
      <span class="text-white/90 text-sm font-medium">Join 2,400+ local businesses already growing with SwayAds</span>
    </div>
    <h2 class="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
      Ready to Stop Guessing<br/>and Start Growing?
    </h2>
    <p class="text-white/70 text-lg mb-10 max-w-xl mx-auto">
      Launch your first AI-powered ad campaign in minutes. No marketing experience needed. Your competitors are already advertising — don't let them win.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="https://my.swayads.com" class="btn-primary text-white font-bold px-10 py-4 rounded-full text-lg shadow-2xl shadow-purple-500/40 flex items-center justify-center gap-3">
        <i class="fas fa-rocket"></i>
        Start Free 14-Day Trial
      </a>
      <a href="https://my.swayads.com" class="btn-outline text-white font-semibold px-8 py-4 rounded-full text-base flex items-center justify-center gap-2">
        <i class="fas fa-calendar-alt"></i>
        Book a Demo
      </a>
    </div>
    <p class="text-white/40 text-sm mt-5">No credit card required · Cancel anytime · 30-day money-back guarantee</p>
  </div>
</section>

<!-- ============================================================
     FOOTER
     ============================================================ -->
<footer class="bg-gray-950 text-white py-16">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid md:grid-cols-4 gap-10 mb-12">
      <div class="md:col-span-1">
        <div class="flex items-center gap-2 mb-4">
          <img
            src="https://www.genspark.ai/api/files/s/fCLFvPGj"
            alt="SwayAds"
            style="height:40px;width:auto;object-fit:contain;opacity:0;transition:opacity 0.3s"
            onload="this.style.opacity='1'"
            onerror="this.style.display='none'; document.getElementById('footer-logo-fallback').style.display='flex'"
          />
          <span id="footer-logo-fallback" style="display:none" class="items-center">
            <span class="text-xl font-black"><span class="sway-text">Sway</span><span class="text-white">Ads</span></span>
          </span>
        </div>
        <p class="text-gray-400 text-sm leading-relaxed mb-4">AI-powered advertising platform helping local businesses compete and win online.</p>
        <div class="flex gap-4">
          <a href="#" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-600 transition-colors"><i class="fab fa-facebook-f text-sm"></i></a>
          <a href="#" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 transition-colors"><i class="fab fa-instagram text-sm"></i></a>
          <a href="#" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-500 transition-colors"><i class="fab fa-twitter text-sm"></i></a>
          <a href="#" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-700 transition-colors"><i class="fab fa-linkedin-in text-sm"></i></a>
        </div>
      </div>

      <div>
        <h4 class="font-bold text-sm mb-4 text-white/80 uppercase tracking-wide">Product</h4>
        <ul class="space-y-2.5">
          <li><a href="#features" class="text-gray-400 text-sm hover:text-white transition-colors">Features</a></li>
          <li><a href="#pricing" class="text-gray-400 text-sm hover:text-white transition-colors">Pricing</a></li>
          <li><a href="#how-it-works" class="text-gray-400 text-sm hover:text-white transition-colors">How It Works</a></li>
          <li><a href="https://my.swayads.com" class="text-gray-400 text-sm hover:text-white transition-colors">Dashboard</a></li>
        </ul>
      </div>

      <div>
        <h4 class="font-bold text-sm mb-4 text-white/80 uppercase tracking-wide">Industries</h4>
        <ul class="space-y-2.5">
          <li><a href="https://my.swayads.com" class="text-gray-400 text-sm hover:text-white transition-colors">Tree Services</a></li>
          <li><a href="https://my.swayads.com" class="text-gray-400 text-sm hover:text-white transition-colors">Lawn Care</a></li>
          <li><a href="https://my.swayads.com" class="text-gray-400 text-sm hover:text-white transition-colors">Roofing</a></li>
          <li><a href="https://my.swayads.com" class="text-gray-400 text-sm hover:text-white transition-colors">Party Rentals</a></li>
          <li><a href="https://my.swayads.com" class="text-gray-400 text-sm hover:text-white transition-colors">Remodeling</a></li>
        </ul>
      </div>

      <div>
        <h4 class="font-bold text-sm mb-4 text-white/80 uppercase tracking-wide">Company</h4>
        <ul class="space-y-2.5">
          <li><a href="#" class="text-gray-400 text-sm hover:text-white transition-colors">About Us</a></li>
          <li><a href="#" class="text-gray-400 text-sm hover:text-white transition-colors">Blog</a></li>
          <li><a href="#" class="text-gray-400 text-sm hover:text-white transition-colors">Privacy Policy</a></li>
          <li><a href="#" class="text-gray-400 text-sm hover:text-white transition-colors">Terms of Service</a></li>
          <li><a href="https://my.swayads.com" class="text-gray-400 text-sm hover:text-white transition-colors">Contact</a></li>
        </ul>
      </div>
    </div>

    <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-gray-500 text-sm">© 2026 SwayAds. All rights reserved.</p>
      <div class="flex items-center gap-2 text-gray-500 text-sm">
        <i class="fas fa-lock text-green-500"></i>
        <span>Secured with 256-bit SSL</span>
        <span class="mx-2">·</span>
        <i class="fas fa-shield-alt text-green-500"></i>
        <span>SOC 2 Compliant</span>
      </div>
    </div>
  </div>
</footer>

<!-- ============================================================
     JAVASCRIPT
     ============================================================ -->
<script>
  // ── Navbar scroll + logo color ──
  const navbar    = document.getElementById('navbar');
  const navLogo   = document.getElementById('nav-logo-img');
  const navLinks  = document.querySelectorAll('.nav-link');
  const menuBtn   = document.getElementById('menu-btn');

  function setNavDark() {
    // Dark hero bg: white text + white logo
    navbar.classList.remove('nav-scroll');
    if (navLogo) navLogo.style.filter = 'brightness(0) invert(1)';
    navLinks.forEach(l => { l.style.color = 'rgba(255,255,255,0.8)'; });
    if (menuBtn) menuBtn.style.color = '#fff';
  }
  function setNavLight() {
    // Scrolled: white bg + colored logo + dark text
    navbar.classList.add('nav-scroll');
    if (navLogo) navLogo.style.filter = 'none';
    navLinks.forEach(l => { l.style.color = '#4b5563'; });
    if (menuBtn) menuBtn.style.color = '#374151';
  }

  setNavDark(); // default on load
  window.addEventListener('scroll', () => {
    window.scrollY > 20 ? setNavLight() : setNavDark();
  });

  // ── Mobile menu toggle ──
  function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('open');
  }

  // ── Pricing toggle ──
  // ── Pricing tab switcher: DIY / Managed ──
  function switchTab(tab) {
    const diyPlans     = document.getElementById('diy-plans');
    const managedPlans = document.getElementById('managed-plans');
    const diyBtn       = document.getElementById('tab-diy');
    const managedBtn   = document.getElementById('tab-managed');

    if (tab === 'diy') {
      diyPlans.classList.remove('hidden');
      managedPlans.classList.add('hidden');
      diyBtn.classList.add('bg-gradient-to-r','from-purple-600','to-blue-500','text-white','shadow-md');
      diyBtn.classList.remove('text-gray-500');
      managedBtn.classList.remove('bg-gradient-to-r','from-purple-600','to-blue-500','text-white','shadow-md');
      managedBtn.classList.add('text-gray-500');
    } else {
      managedPlans.classList.remove('hidden');
      diyPlans.classList.add('hidden');
      managedBtn.classList.add('bg-gradient-to-r','from-purple-600','to-blue-500','text-white','shadow-md');
      managedBtn.classList.remove('text-gray-500');
      diyBtn.classList.remove('bg-gradient-to-r','from-purple-600','to-blue-500','text-white','shadow-md');
      diyBtn.classList.add('text-gray-500');
    }
  }

  // ── Video modal (native HTML5 MP4) ──
  const VIDEO_SRC = 'https://firebasestorage.googleapis.com/v0/b/plai-v3.appspot.com/o/Resource%2Fresource%20tab_7_%20product%20overview.mp4?alt=media&token=ccbb5611-0ea3-49a3-a27a-064c52022fe4';

  function openVideoModal() {
    const modal = document.getElementById('video-modal');
    const vid   = document.getElementById('modal-video');
    vid.src = VIDEO_SRC;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    vid.play().catch(() => {});
  }

  function closeVideoModal(e) {
    // Only close if clicking the dark backdrop or the X button
    if (e && e.target !== document.getElementById('video-modal') && !e.target.closest('.close-btn')) return;
    const modal = document.getElementById('video-modal');
    const vid   = document.getElementById('modal-video');
    modal.classList.remove('open');
    vid.pause();
    vid.src = '';
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const modal = document.getElementById('video-modal');
      if (modal.classList.contains('open')) {
        closeVideoModal({ target: modal });
      }
    }
  });

  // ── Preview: show first frame on hover ──
  const previewVid = document.getElementById('preview-video');
  if (previewVid) {
    previewVid.addEventListener('loadedmetadata', () => {
      previewVid.currentTime = 0.1;
    });
  }

  // ── Scroll reveal ── (lower threshold so elements between sections always trigger)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // stop watching once visible
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });
  // Immediately show any reveal elements already in viewport on load
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    } else {
      observer.observe(el);
    }
  });

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
</script>

</body>
</html>`
}

export default app
