// Webbit Apple x Stripe Floating Glass Header & Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Sticky Floating Header Shrink on Scroll
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Mobile Slide-Out Drawer Controls
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (drawerClose && mobileDrawer) {
    drawerClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer) mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Hero Cloud Pills Toggle
  const cloudPills = document.querySelectorAll('.cloud-pill');
  cloudPills.forEach(pill => {
    pill.addEventListener('click', () => {
      cloudPills.forEach(p => p.classList.remove('pill-active'));
      pill.classList.add('pill-active');
    });
  });

  // Industry Tab Filter
  const upTabs = document.querySelectorAll('.up-tab');
  const indCards = document.querySelectorAll('.ind-pill-card');

  upTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      upTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.textContent.trim().toLowerCase();
      indCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (filterVal === 'all industries' || filterVal === 'all' || text.includes(filterVal.replace(' & saas', '').replace('real estate', 'estate'))) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Testimonial Category Tabs
  const testTabs = document.querySelectorAll('.test-tab');
  const quoteText = document.querySelector('.quote-text');
  const quoteAuthor = document.querySelector('.quote-author strong');
  const quoteRole = document.querySelector('.quote-author span');

  const testimonialsData = {
    "Real Estate": {
      quote: "Webbit transformed our qualified enquiry volume by +340% within 90 days using automated AI voice qualification and high-converting campaign landing pages.",
      author: "David Miller",
      role: "VP Growth, Apex Real Estate Developments"
    },
    "Healthcare AI": {
      quote: "The offshore engineering team from Webbit built our HIPAA-compliant AI scheduling assistant in under 6 weeks with outstanding code quality.",
      author: "Dr. Aris Thorne",
      role: "Founder & CEO, CarePulse Health"
    },
    "Offshore Support": {
      quote: "Scaling our BPO and back-office operations through Webbit's India delivery team saved us over 60% in overhead while maintaining 24/7 service coverage.",
      author: "Marcus Vance",
      role: "COO, GlobalLogistics Corp"
    }
  };

  testTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      testTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.textContent.trim();
      if (testimonialsData[cat] && quoteText) {
        quoteText.style.opacity = '0';
        setTimeout(() => {
          quoteText.textContent = `"${testimonialsData[cat].quote}"`;
          if (quoteAuthor) quoteAuthor.textContent = testimonialsData[cat].author;
          if (quoteRole) quoteRole.textContent = testimonialsData[cat].role;
          quoteText.style.opacity = '1';
        }, 150);
      }
    });
  });

  // IntersectionObserver Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // Interactive Card Mouse Spotlight Glow
  const glowCards = document.querySelectorAll('.featured-card-grid, .feature-card, .benefit-node-card, .ind-pill-card, .step-card, .impact-card');
  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ==========================================================================
  // ANIMATED COUNT-UP FOR IMPACT STATISTICS
  // ==========================================================================
  const statNumbers = document.querySelectorAll('.impact-number');
  if (statNumbers.length > 0) {
    const formatNumber = (num, prefix = '', suffix = '') => {
      return prefix + num.toLocaleString('en-US') + suffix;
    };

    const animateCountUp = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 2200;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentNum = Math.floor(easeProgress * target);

        el.textContent = formatNumber(currentNum, prefix, suffix);

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = formatNumber(target, prefix, suffix);
        }
      };

      requestAnimationFrame(updateCount);
    };

    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCountUp(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statNumbers.forEach(num => statObserver.observe(num));
  }

  // ==========================================================================
  // SUPER SMOOTH LENIS INERTIA MOMENTUM SCROLLING
  // ==========================================================================
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Smooth Anchor Links Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -80 });
          }
        }
      });
    });
  }

  // ==========================================================================
  // REACT BITS PILL NAV GSAP ANIMATION ENGINE
  // ==========================================================================
  const pillNavContainer = document.querySelector('.pill-nav-container');
  if (pillNavContainer && typeof gsap !== 'undefined') {
    const circleRefs = [];
    const tlRefs = [];
    const activeTweenRefs = [];
    const pills = pillNavContainer.querySelectorAll('.pill-list .pill');
    const logoImg = pillNavContainer.querySelector('.pill-logo svg, .pill-logo img');
    const logoAnchor = pillNavContainer.querySelector('.pill-logo');
    const mobileBtn = pillNavContainer.querySelector('.mobile-menu-button');
    const mobilePopover = pillNavContainer.querySelector('.mobile-menu-popover');
    const ease = 'power3.out';
    let isMobileMenuOpen = false;

    const layoutPills = () => {
      pills.forEach((pill, i) => {
        const circle = pill.querySelector('.hover-circle');
        const label = pill.querySelector('.pill-label');
        const hoverLabel = pill.querySelector('.pill-label-hover');
        if (!circle) return;

        circleRefs[i] = circle;
        const rect = pill.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        if (w === 0 || h === 0) return;

        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

        tlRefs[i]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 0.4, ease, overwrite: 'auto' }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 0.4, ease, overwrite: 'auto' }, 0);
        if (hoverLabel) {
          gsap.set(hoverLabel, { y: h + 20, opacity: 0 });
          tl.to(hoverLabel, { y: 0, opacity: 1, duration: 0.4, ease, overwrite: 'auto' }, 0);
        }

        tlRefs[i] = tl;

        pill.addEventListener('mouseenter', () => {
          activeTweenRefs[i]?.kill();
          activeTweenRefs[i] = tl.tweenTo(tl.duration(), { duration: 0.35, ease, overwrite: 'auto' });
        });

        pill.addEventListener('mouseleave', () => {
          activeTweenRefs[i]?.kill();
          activeTweenRefs[i] = tl.tweenTo(0, { duration: 0.25, ease, overwrite: 'auto' });
        });
      });
    };

    layoutPills();
    window.addEventListener('resize', layoutPills);
    if (document.fonts?.ready) {
      document.fonts.ready.then(layoutPills).catch(() => {});
    }

    // 360 Spin on Logo Hover
    if (logoAnchor && logoImg) {
      logoAnchor.addEventListener('mouseenter', () => {
        gsap.set(logoImg, { rotate: 0 });
        gsap.to(logoImg, { rotate: 360, duration: 0.4, ease: 'power2.out' });
      });
    }

    // Mobile Hamburger Toggle
    if (mobileBtn && mobilePopover) {
      const lines = mobileBtn.querySelectorAll('.hamburger-line');
      mobileBtn.addEventListener('click', () => {
        isMobileMenuOpen = !isMobileMenuOpen;

        if (isMobileMenuOpen) {
          if (lines.length >= 2) {
            gsap.to(lines[0], { rotation: 45, y: 3.5, duration: 0.3, ease });
            gsap.to(lines[1], { rotation: -45, y: -3.5, duration: 0.3, ease });
          }
          gsap.set(mobilePopover, { visibility: 'visible' });
          gsap.fromTo(mobilePopover, { opacity: 0, y: -10, scaleY: 0.95 }, { opacity: 1, y: 0, scaleY: 1, duration: 0.3, ease, transformOrigin: 'top center' });
        } else {
          if (lines.length >= 2) {
            gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
            gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
          }
          gsap.to(mobilePopover, { opacity: 0, y: -10, duration: 0.2, ease, onComplete: () => gsap.set(mobilePopover, { visibility: 'hidden' }) });
        }
      });
    }
  }

  // ==========================================================================
  // REACT BITS ROTATING TEXT GSAP ENGINE
  // ==========================================================================
  const rotatingBadge = document.getElementById('rotating-text-hero');
  if (rotatingBadge && typeof gsap !== 'undefined') {
    const rawWords = JSON.parse(rotatingBadge.getAttribute('data-words') || '[]');
    if (rawWords.length > 0) {
      let currentIndex = 0;
      const rotationInterval = 2400; // 2.4s

      const createWordHTML = (wordStr) => {
        const chars = Array.from(wordStr);
        return `<span class="text-rotate-word">` +
          chars.map(ch => ch === ' ' 
            ? `<span class="text-rotate-space"> </span>` 
            : `<span class="text-rotate-char">${ch}</span>`
          ).join('') +
          `</span>`;
      };

      setInterval(() => {
        const nextIndex = (currentIndex + 1) % rawWords.length;
        const currentChars = rotatingBadge.querySelectorAll('.text-rotate-char, .text-rotate-space');

        // Animate current chars OUT
        gsap.to(currentChars, {
          y: '-120%',
          opacity: 0,
          duration: 0.3,
          stagger: {
            each: 0.02,
            from: 'end'
          },
          ease: 'back.in(1.4)',
          onComplete: () => {
            currentIndex = nextIndex;
            rotatingBadge.innerHTML = createWordHTML(rawWords[currentIndex]);
            const newChars = rotatingBadge.querySelectorAll('.text-rotate-char, .text-rotate-space');

            // Animate new chars IN
            gsap.fromTo(newChars, 
              { y: '100%', opacity: 0 },
              {
                y: '0%',
                opacity: 1,
                duration: 0.4,
                stagger: 0.025,
                ease: 'back.out(1.5)'
              }
            );
          }
        });
      }, rotationInterval);
    }
  }

  // ==========================================================================
  // REACT BITS SCROLL VELOCITY ENGINE
  // ==========================================================================
  const row1 = document.querySelector('.velocity-row-1');
  const row2 = document.querySelector('.velocity-row-2');

  if (row1 && row2) {
    let x1 = 0;
    let x2 = 0;
    let baseSpeed = 1.2;
    let scrollVelocityFactor = 0;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      scrollVelocityFactor = delta * 0.15;
    }, { passive: true });

    const animateVelocity = () => {
      scrollVelocityFactor *= 0.92;
      const speed = baseSpeed + Math.abs(scrollVelocityFactor);

      // Row 1: Left to right
      x1 -= speed;
      const halfWidth1 = row1.scrollWidth / 2;
      if (x1 <= -halfWidth1) x1 = 0;
      row1.style.transform = `translate3d(${x1}px, 0, 0)`;

      // Row 2: Right to left
      x2 += speed;
      const halfWidth2 = row2.scrollWidth / 2;
      if (x2 >= 0) x2 = -halfWidth2;
      row2.style.transform = `translate3d(${x2}px, 0, 0)`;

      requestAnimationFrame(animateVelocity);
    };

    requestAnimationFrame(animateVelocity);
  }

  // ==========================================================================
  // MAGIC UI SMOOTH CURSOR ENGINE
  // ==========================================================================
  const cursorDot = document.getElementById('cursor-dot');
  const cursorFollower = document.getElementById('cursor-follower');

  if (cursorDot && cursorFollower && window.innerWidth > 768) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    if (typeof gsap !== 'undefined') {
      const xDotTo = gsap.quickTo(cursorDot, 'x', { duration: 0.08, ease: 'power3.out' });
      const yDotTo = gsap.quickTo(cursorDot, 'y', { duration: 0.08, ease: 'power3.out' });
      const xFollowerTo = gsap.quickTo(cursorFollower, 'x', { duration: 0.35, ease: 'power3.out' });
      const yFollowerTo = gsap.quickTo(cursorFollower, 'y', { duration: 0.35, ease: 'power3.out' });

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        xDotTo(mouseX);
        yDotTo(mouseY);
        xFollowerTo(mouseX);
        yFollowerTo(mouseY);
      }, { passive: true });
    } else {
      let followerX = mouseX;
      let followerY = mouseY;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }, { passive: true });

      const animateCursor = () => {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateCursor);
      };
      requestAnimationFrame(animateCursor);
    }

    // Hover scale effects on interactive elements
    const interactiveTargets = document.querySelectorAll('a, button, .pill, .btn-with-icon-pill, .impact-card, .service-row-card, .circular-text-wrap');
    interactiveTargets.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ==========================================================================
  // REACT BITS DOTFIELD CANVAS ANIMATION ENGINE
  // ==========================================================================
  const dotContainer = document.getElementById('dot-field-canvas-container');
  const dotCanvas = document.getElementById('dot-field-canvas');
  const glowCircle = document.getElementById('dot-field-glow-circle');

  if (dotContainer && dotCanvas) {
    const ctx = dotCanvas.getContext('2d', { alpha: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let dots = [];
    let mouse = { x: -9999, y: -9999, speed: 0, prevX: -9999, prevY: -9999 };
    let size = { w: 0, h: 0, offsetX: 0, offsetY: 0 };
    let engagement = 0;
    let glowOpacity = 0;
    let frameCount = 0;
    const dotRadius = 1.5;
    const dotSpacing = 14;
    const cursorRadius = 380;
    const bulgeStrength = 65;
    const TWO_PI = Math.PI * 2;

    const resizeDotCanvas = () => {
      const rect = dotContainer.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w === 0 || h === 0) return;

      dotCanvas.width = w * dpr;
      dotCanvas.height = h * dpr;
      dotCanvas.style.width = `${w}px`;
      dotCanvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      size = {
        w,
        h,
        offsetX: rect.left + window.scrollX,
        offsetY: rect.top + window.scrollY,
      };

      buildGridDots(w, h);
    };

    const buildGridDots = (w, h) => {
      const step = dotRadius + dotSpacing;
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      dots = new Array(rows * cols);
      let idx = 0;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[idx++] = { ax, ay, sx: ax, sy: ay };
        }
      }
    };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.pageX - size.offsetX;
      mouse.y = e.pageY - size.offsetY;
    }, { passive: true });

    setInterval(() => {
      const dx = mouse.prevX - mouse.x;
      const dy = mouse.prevY - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      mouse.speed += (dist - mouse.speed) * 0.5;
      if (mouse.speed < 0.001) mouse.speed = 0;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
    }, 20);

    const tickDotField = () => {
      frameCount++;
      const { w, h } = size;
      if (w === 0 || h === 0) {
        requestAnimationFrame(tickDotField);
        return;
      }

      const targetEng = Math.min(mouse.speed / 4, 1);
      engagement += (targetEng - engagement) * 0.08;
      if (engagement < 0.001) engagement = 0;
      const eng = engagement;

      glowOpacity += (eng - glowOpacity) * 0.08;
      if (glowCircle) {
        glowCircle.setAttribute('cx', mouse.x);
        glowCircle.setAttribute('cy', mouse.y);
        glowCircle.style.opacity = glowOpacity;
      }

      ctx.clearRect(0, 0, w, h);

      // Neon Lime to White Diagonal Gradient Fill
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, 'rgba(212, 255, 0, 0.45)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0.18)');
      ctx.fillStyle = grad;

      const crSq = cursorRadius * cursorRadius;
      const rad = dotRadius / 2;
      const len = dots.length;

      ctx.beginPath();

      for (let i = 0; i < len; i++) {
        const d = dots[i];
        if (!d) continue;
        const dx = mouse.x - d.ax;
        const dy = mouse.y - d.ay;
        const distSq = dx * dx + dy * dy;

        if (distSq < crSq && eng > 0.01) {
          const dist = Math.sqrt(distSq);
          const tFactor = 1 - dist / cursorRadius;
          const push = tFactor * tFactor * bulgeStrength * eng;
          const angle = Math.atan2(dy, dx);
          d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
          d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
        } else {
          d.sx += (d.ax - d.sx) * 0.1;
          d.sy += (d.ay - d.sy) * 0.1;
        }

        ctx.moveTo(d.sx + rad, d.sy);
        ctx.arc(d.sx, d.sy, rad, 0, TWO_PI);
      }

      ctx.fill();
      requestAnimationFrame(tickDotField);
    };

    resizeDotCanvas();
    window.addEventListener('resize', resizeDotCanvas);
    requestAnimationFrame(tickDotField);
  }

  // ==========================================================================
  // REACT BITS AURORA WEBGL SHADER ENGINE
  // ==========================================================================
  const auroraContainer = document.getElementById('aurora-canvas-container');
  const auroraCanvas = document.getElementById('aurora-canvas');

  if (auroraContainer && auroraCanvas) {
    const gl = auroraCanvas.getContext('webgl2') || auroraCanvas.getContext('webgl');

    if (gl) {
      const vertShaderSource = `
        attribute vec2 position;
        void main() {
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      const fragShaderSource = `
        precision highp float;
        uniform float uTime;
        uniform float uAmplitude;
        uniform vec3 uColorStops[3];
        uniform vec2 uResolution;
        uniform float uBlend;

        vec3 permute(vec3 x) {
          return mod(((x * 34.0) + 1.0) * x, 289.0);
        }

        float snoise(vec2 v){
          const vec4 C = vec4(
              0.211324865405187, 0.366025403784439,
              -0.577350269189626, 0.024390243902439
          );
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);

          vec3 p = permute(
              permute(i.y + vec3(0.0, i1.y, 1.0))
            + i.x + vec3(0.0, i1.x, 1.0)
          );

          vec3 m = max(
              0.5 - vec3(
                  dot(x0, x0),
                  dot(x12.xy, x12.xy),
                  dot(x12.zw, x12.zw)
              ), 
              0.0
          );
          m = m * m;
          m = m * m;

          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution;
          
          vec3 c0 = uColorStops[0];
          vec3 c1 = uColorStops[1];
          vec3 c2 = uColorStops[2];
          
          float factor = uv.x;
          vec3 rampColor;
          if (factor < 0.5) {
            rampColor = mix(c0, c1, factor * 2.0);
          } else {
            rampColor = mix(c1, c2, (factor - 0.5) * 2.0);
          }
          
          float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
          height = exp(height);
          height = (uv.y * 2.0 - height + 0.2);
          float intensity = 0.6 * height;
          
          float midPoint = 0.20;
          float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
          
          vec3 auroraColor = intensity * rampColor;
          gl_FragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
        }
      `;

      const createShader = (gl, type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error(gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vertShader = createShader(gl, gl.VERTEX_SHADER, vertShaderSource);
      const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragShaderSource);

      if (vertShader && fragShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
          -1, -1,
           1, -1,
          -1,  1,
          -1,  1,
           1, -1,
           1,  1,
        ]), gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const uTimeLoc = gl.getUniformLocation(program, 'uTime');
        const uAmpLoc = gl.getUniformLocation(program, 'uAmplitude');
        const uBlendLoc = gl.getUniformLocation(program, 'uBlend');
        const uResLoc = gl.getUniformLocation(program, 'uResolution');
        const uStopsLoc = gl.getUniformLocation(program, 'uColorStops');

        const hexToRGB = (hex) => {
          const r = parseInt(hex.slice(1, 3), 16) / 255;
          const g = parseInt(hex.slice(3, 5), 16) / 255;
          const b = parseInt(hex.slice(5, 7), 16) / 255;
          return [r, g, b];
        };

        const stops = ['#d4ff00', '#38bdf8', '#818cf8'].flatMap(hexToRGB);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        const resizeAurora = () => {
          const rect = auroraContainer.getBoundingClientRect();
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const w = rect.width * dpr;
          const h = rect.height * dpr;
          if (w === 0 || h === 0) return;

          auroraCanvas.width = w;
          auroraCanvas.height = h;
          gl.viewport(0, 0, w, h);
          gl.uniform2f(uResLoc, w, h);
        };

        resizeAurora();
        window.addEventListener('resize', resizeAurora);

        let startTime = performance.now();
        const renderAurora = (now) => {
          const t = (now - startTime) * 0.001;
          gl.uniform1f(uTimeLoc, t);
          gl.uniform1f(uAmpLoc, 1.2);
          gl.uniform1f(uBlendLoc, 0.6);
          gl.uniform3fv(uStopsLoc, new Float32Array(stops));

          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
          requestAnimationFrame(renderAurora);
        };

        requestAnimationFrame(renderAurora);
      }
    }
  }

  // ==========================================================================
  // REACT BITS CIRCULAR TEXT COMPONENT ENGINE
  // ==========================================================================
  const circularTextElements = document.querySelectorAll('.circular-text');

  circularTextElements.forEach(el => {
    const textStr = el.getAttribute('data-text') || 'WEBBIT*AI*AUTOMATION*';
    const spinDuration = parseFloat(el.getAttribute('data-spin-duration')) || 20;
    const onHoverMode = el.getAttribute('data-hover') || 'speedUp';
    const letters = Array.from(textStr);
    const totalLetters = letters.length;
    const angleStep = 360 / totalLetters;

    el.innerHTML = letters.map((letter, i) => {
      const rotationDeg = angleStep * i;
      const transform = `rotateZ(${rotationDeg}deg) translateY(-64px)`;
      return `<span style="transform: ${transform}; -webkit-transform: ${transform};">${letter === ' ' ? '&nbsp;' : letter}</span>`;
    }).join('');

    if (typeof gsap !== 'undefined') {
      const tween = gsap.to(el, {
        rotate: 360,
        duration: spinDuration,
        ease: 'none',
        repeat: -1
      });

      const parentWrap = el.closest('.circular-text-wrap') || el;

      parentWrap.addEventListener('mouseenter', () => {
        let targetTimeScale = 1;
        let scaleVal = 1;

        switch (onHoverMode) {
          case 'slowDown':
            targetTimeScale = 0.35;
            break;
          case 'speedUp':
            targetTimeScale = 4;
            break;
          case 'pause':
            tween.pause();
            return;
          case 'goBonkers':
            targetTimeScale = 12;
            scaleVal = 1.12;
            break;
          default:
            targetTimeScale = 4;
        }

        gsap.to(tween, { timeScale: targetTimeScale, duration: 0.4, ease: 'power2.out' });
        if (scaleVal !== 1) {
          gsap.to(el, { scale: scaleVal, duration: 0.3, ease: 'back.out(1.5)' });
        }
      });

      parentWrap.addEventListener('mouseleave', () => {
        if (onHoverMode === 'pause') {
          tween.play();
        } else {
          gsap.to(tween, { timeScale: 1, duration: 0.5, ease: 'power2.out' });
          gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' });
        }
      });
    }
  });
});
