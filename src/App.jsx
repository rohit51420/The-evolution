import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import * as THREE from "three";
import "./index.css";

function App() {

  useEffect(() => {

    // ===== LENIS SMOOTH SCROLL =====
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);


    // ===== LOADER =====
    const timer = setTimeout(() => {
      const loader = document.getElementById("loader");

      if (loader) {
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";

        setTimeout(() => {
          loader.remove();
        }, 800);
      }

    }, 2200);



    // ===== CUSTOM CURSOR =====
    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursorRing");

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener("mousemove", e => {
      mx = e.clientX;
      my = e.clientY;

      if (cursor) {
        cursor.style.left = mx - 6 + "px";
        cursor.style.top = my - 6 + "px";
      }
    });

    function animateCursor() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;

      if (ring) {
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
      }

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document
      .querySelectorAll("button, a, .era-card, .tech-pill, .web3-node, .timeline-dot")
      .forEach(el => {
        el.addEventListener("mouseenter", () => {
          if (cursor) cursor.style.transform = "scale(2.5)";
        });
        el.addEventListener("mouseleave", () => {
          if (cursor) cursor.style.transform = "scale(1)";
        });
      });

    // ===== SCROLL TO =====
    window.scrollToSection = (id) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    // ===== REVEAL ANIMATION =====
    const revealEls = document.querySelectorAll(".section-reveal");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));

    // ===== SECTION DETECTION =====
    const sections = ["arpanet", "dotcom", "social", "modern", "future"];
    const years = ["1969", "1996", "2007", "2018", "2030+"];
    const dots = document.querySelectorAll(".timeline-dot");
    const yearEl = document.getElementById("yearIndicator");

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio > 0.4) {

          const idx = sections.indexOf(e.target.id);

          if (idx >= 0) {
            dots.forEach(d => d.classList.remove("active"));
            dots[idx]?.classList.add("active");

            if (yearEl) yearEl.textContent = years[idx];

            if (e.target.id === "dotcom") triggerDotcom();
            if (e.target.id === "modern") triggerModern();
          }
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    // ===== PARALLAX =====
    window.addEventListener("scroll", () => {

      const scrollY = window.scrollY;

      document.querySelectorAll(".parallax-layer").forEach(el => {
        const speed = parseFloat(el.dataset.speed) || 0.3;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });

    });

    // ===== DOTCOM EFFECT =====
    let dotcomTriggered = false;

    function triggerDotcom() {

      if (dotcomTriggered) return;
      dotcomTriggered = true;

      const tags = [
        "<blink>",
        "<marquee>",
        "<font>",
        "www.",
        ".com",
        "$$$",
        "FREE!",
        "CLICK HERE",
        "AOL",
        "Napster",
        "ICQ"
      ];

      const container = document.getElementById("dotcomChaos");

      tags.forEach(tag => {

        const el = document.createElement("div");

        el.className = "floating-tag";
        el.innerHTML = tag;

        el.style.left = Math.random() * 100 + "vw";
        el.style.animationDuration = 6 + Math.random() * 10 + "s";

        container?.appendChild(el);
      });

      const bar = document.getElementById("dotcomProgress");

      setTimeout(() => {
        if (bar) bar.style.width = "85%";
      }, 300);

    }

    // ===== MODERN WEB =====
    let modernTriggered = false;

    function triggerModern() {

      if (modernTriggered) return;

      modernTriggered = true;

      setTimeout(() => {
        const el = document.getElementById("speedFill");
        if (el) el.style.width = "95%";
      }, 400);

    }

    // ===== LIKE BUTTON =====
    let liked = false;

    window.handleLike = () => {

      const btn = document.getElementById("likeBtn");
      const icon = document.getElementById("likeIcon");
      const count = document.getElementById("likeCount");

      if (!btn || !icon || !count) return;

      const n = parseInt(count.textContent.replace(/,/g, ""));

      if (!liked) {
        liked = true;
        icon.textContent = "❤️";
        btn.classList.add("liked");
        count.textContent = (n + 1).toLocaleString();
      } else {
        liked = false;
        icon.textContent = "🤍";
        btn.classList.remove("liked");
        count.textContent = (n - 1).toLocaleString();
      }

    };

    // ===== STARS CANVAS =====
    const canvas = document.getElementById("starsCanvas");

    if (canvas) {

      const ctx = canvas.getContext("2d");
      let stars = [];

      function resizeCanvas() {

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        stars = [];

        for (let i = 0; i < 200; i++) {

          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.2,
            a: Math.random(),
            speed: Math.random() * 0.3 + 0.1
          });

        }

      }

      function drawStars() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(s => {

          s.a += s.speed * 0.01;

          if (s.a > 1) s.a = 0;

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,245,255,${s.a * 0.8})`;
          ctx.fill();

        });

        requestAnimationFrame(drawStars);

      }

      window.addEventListener("resize", resizeCanvas);

      resizeCanvas();
      drawStars();

    }

    // ===== 3D INTERNET NETWORK =====
const webglCanvas = document.getElementById("webglCanvas");

if (webglCanvas) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000010, 3, 10);

  const camera = new THREE.PerspectiveCamera(
    75,
    webglCanvas.clientWidth / webglCanvas.clientHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    canvas: webglCanvas,
    alpha: true,
  });

  renderer.setSize(webglCanvas.clientWidth, webglCanvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  camera.position.z = 5;

  // ===== NODES =====
  const nodes = [];
  const nodeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
  const nodeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f5ff,
    transparent: true,
    opacity: 0.9,
  });

  for (let i = 0; i < 40; i++) {
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);

    node.position.x = (Math.random() - 0.5) * 8;
    node.position.y = (Math.random() - 0.5) * 5;
    node.position.z = (Math.random() - 0.5) * 5;

    scene.add(node);
    node.userData = {
  speed: Math.random() * 0.02 + 0.005,
  offset: Math.random() * Math.PI * 2
};
    nodes.push(node);
  }

  // ===== LINES =====
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00f5ff,
    transparent: true,
    opacity: 0.08,
  });

  nodes.forEach((a, i) => {
    nodes.forEach((b, j) => {
      if (i < j && Math.random() > 0.93) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          a.position,
          b.position,
        ]);

        const line = new THREE.Line(geometry, lineMaterial);
        scene.add(line);
      }
    });
  });

  // ===== MOUSE =====
  let mouseX = 0;
  let mouseY = 0;
  const mouse = new THREE.Vector3();

  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ===== ANIMATE =====
  function animate() {
  requestAnimationFrame(animate);

  const time = Date.now() * 0.001;

  // 🌐 Scene rotation
  scene.rotation.y += 0.001 + mouseX * 0.002;
  scene.rotation.x += 0.0005 + mouseY * 0.002;

  // ✨ Nodes breathing effect
  nodes.forEach((node, i) => {
  const scale = 1 + Math.sin(time + i) * 0.3;
  node.scale.set(scale, scale, scale);

  // 🌊 floating motion
  node.position.y += Math.sin(time + node.userData.offset) * 0.002;
  node.position.x += Math.cos(time + node.userData.offset) * 0.002;

  // 🖱️ mouse interaction (MAGIC)
  const dx = node.position.x - mouseX * 3;
  const dy = node.position.y - mouseY * 2;

  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 1.5) {
    node.position.x += dx * 0.02;
    node.position.y += dy * 0.02;
  }
});
    scene.children.forEach((obj) => {
  if (obj.type === "Line") {
    obj.material.opacity = 0.05 + Math.sin(time * 2) * 0.03;
  }
});

  renderer.render(scene, camera);
}

  animate();

  // ===== RESIZE =====
  window.addEventListener("resize", () => {
    const width = webglCanvas.clientWidth;
    const height = webglCanvas.clientHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  // ===== MUSIC CONTROL =====
const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicToggle");

let isPlaying = false;

if (btn && music) {
  btn.addEventListener("click", () => {
    if (isPlaying) {
      music.pause();
      btn.innerText = "🔇";
    } else {
      music.play();
      btn.innerText = "🔊";
    }
    isPlaying = !isPlaying;
  });
}
}
    

  }, []);

  return (
    <>

      {/* Custom Cursor */}
      <div className="cursor" id="cursor"></div>
      <div className="cursor-ring" id="cursorRing"></div>

      {/* Loading Screen */}
      <div id="loader">
        <div className="loader-text">INITIALIZING INTERNET HISTORY...</div>
        <div className="loader-bar">
          <div className="loader-fill"></div>
        </div>
      </div>

      {/* Timeline Navigation */}
      <nav className="timeline-nav" id="timelineNav">
        <div className="timeline-dot active" data-label="1960s — ARPANET" data-section="arpanet"></div>
        <div className="timeline-dot" data-label="1990s — Dot-com" data-section="dotcom"></div>
        <div className="timeline-dot" data-label="2000s — Social Media" data-section="social"></div>
        <div className="timeline-dot" data-label="2010s — Modern Web" data-section="modern"></div>
        <div className="timeline-dot" data-label="Future — Web3" data-section="future"></div>
      </nav>

      {/* Year Indicator */}
      <div className="year-indicator" id="yearIndicator">1969</div>

      {/* ===== SECTION 1: ARPANET ===== */}
      <section id="arpanet">

        <div className="grid-bg parallax-layer" data-speed="0.3"></div>
        <div className="scanline"></div>

        <svg className="node-map" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          <g opacity="0.12" stroke="#00ff41" strokeWidth="1" fill="none">

            <line x1="200" y1="150" x2="500" y2="280" className="network-line"/>
            <line x1="500" y1="280" x2="800" y2="200" className="network-line"/>
            <line x1="800" y1="200" x2="1000" y2="400" className="network-line"/>
            <line x1="200" y1="150" x2="350" y2="500" className="network-line"/>
            <line x1="350" y1="500" x2="500" y2="280" className="network-line"/>
            <line x1="350" y1="500" x2="800" y2="200" className="network-line"/>

            <circle cx="200" cy="150" r="6" fill="#00ff41" opacity="0.6"/>
            <circle cx="500" cy="280" r="6" fill="#00ff41" opacity="0.6"/>
            <circle cx="800" cy="200" r="6" fill="#00ff41" opacity="0.6"/>
            <circle cx="1000" cy="400" r="6" fill="#00ff41" opacity="0.6"/>
            <circle cx="350" cy="500" r="6" fill="#00ff41" opacity="0.6"/>

            <text x="190" y="135" fontFamily="monospace" fontSize="11" fill="#00ff41" opacity="0.8">UCLA</text>
            <text x="490" y="265" fontFamily="monospace" fontSize="11" fill="#00ff41" opacity="0.8">SRI</text>
            <text x="810" y="185" fontFamily="monospace" fontSize="11" fill="#00ff41" opacity="0.8">UCSB</text>
            <text x="1010" y="385" fontFamily="monospace" fontSize="11" fill="#00ff41" opacity="0.8">UTAH</text>

          </g>
        </svg>

        <div className="arpanet-content">

          <div className="era-label section-reveal">ERA 01 — 1969</div>

          <h1 className="arpanet-title section-reveal">
            EVOLUTION<br/>OF THE<br/>INTERNET
          </h1>

          <div className="terminal-box section-reveal">

            <div className="terminal-line">$ CONNECTING TO ARPANET NODE...</div>

            <div className="terminal-line">
              $ PACKET_001 → UCLA → SRI: "lo" (SYSTEM CRASH)
            </div>

            <div className="terminal-line">
              $ PACKET_002 → UCLA → SRI: "login" (SUCCESS)
            </div>

            <div className="terminal-line">
              $ FIRST MESSAGE SENT: 1969-10-29 22:30 PST
              <span className="blink">▮</span>
            </div>

          </div>

          <p className="section-desc section-reveal">
            The internet began as a military experiment — four nodes, a single packet, and a message that changed everything.
          </p>

          <div className="scroll-hint section-reveal">
            ▼ &nbsp; SCROLL TO TRAVEL THROUGH TIME &nbsp; ▼
          </div>

        </div>
      </section>

      {/* ===== SECTION 2: DOTCOM ===== */}

      <section id="dotcom">

        <div className="dotcom-chaos" id="dotcomChaos"></div>

        <div className="dotcom-content">

          <div className="section-number section-reveal">
            ERA 02 — 1991–2001
          </div>

          <h2 className="dotcom-title section-reveal">
            DOT-COM<br/>FEVER! 🚀
          </h2>

          <p className="section-desc section-reveal">
            The web went public. Millions of websites bloomed overnight.
          </p>

          <div className="era-cards section-reveal">

            <div className="era-card">
              <div className="card-icon">🌐</div>
              <div className="card-year">1991</div>
              <div className="card-title">WWW GOES PUBLIC</div>
            </div>

            <div className="era-card">
              <div className="card-icon">📧</div>
              <div className="card-year">1996</div>
              <div className="card-title">HOTMAIL LAUNCHES</div>
            </div>

            <div className="era-card">
              <div className="card-icon">🔍</div>
              <div className="card-year">1998</div>
              <div className="card-title">GOOGLE IS BORN</div>
            </div>

            <div className="era-card">
              <div className="card-icon">💥</div>
              <div className="card-year">2001</div>
              <div className="card-title">THE BUBBLE BURSTS</div>
            </div>

          </div>

        </div>
      </section>

      {/* ===== SECTION 3 SOCIAL ===== */}

      <section id="social">

        <div className="social-content">

          <div className="section-number section-reveal">
            ERA 03 — 2004–2012
          </div>

          <h2 className="social-title section-reveal">
            EVERYONE<br/>CONNECTED
          </h2>

          <p className="section-desc section-reveal">
            Social media didn't just change the web — it changed humanity.
          </p>

          <button className="like-counter" id="likeBtn">
            <span id="likeIcon">🤍</span>
            <span id="likeCount">2,847,392</span>
            people liked the internet
          </button>

        </div>

      </section>

      {/* ===== MODERN WEB ===== */}

      <section id="modern">

        <div className="modern-bg-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        <div className="modern-content">

          <div className="section-number section-reveal">
            ERA 04 — 2012–2023
          </div>

          <h2 className="modern-title section-reveal">
            THE INTELLIGENT<br/>WEB
          </h2>

          <p className="section-desc section-reveal">
            Cloud computing, AI, streaming, PWAs — the web became the world's OS.
          </p>

        </div>

      </section>

      {/* ===== FUTURE ===== */}

      <section id="future">

        <canvas className="stars-canvas" id="starsCanvas"></canvas>
        <canvas id="webglCanvas"></canvas>

        <div className="future-content">

          <div className="section-number section-reveal">
            ERA 05 — 2024 → ∞
          </div>

          <h2 className="future-title section-reveal">
            THE OPEN<br/>INTERNET
          </h2>

          <div className="future-subtitle section-reveal">
            WEB3 · AI · DECENTRALIZED · EVERYWHERE
          </div>

          <div className="manifesto section-reveal">

            <p>The web began with 4 nodes in 1969</p>
            <p>Today: 5.4 billion users</p>
            <p>Tomorrow: Decentralised, intelligent</p>
            <p>You are not just a user. You are the internet.</p>

          </div>

          <a href="#arpanet" className="final-cta section-reveal">
            TRAVEL BACK TO THE BEGINNING
          </a>

        </div>

      </section>

      <audio id="bgMusic" loop>
  <source src="/music.mp3" type="audio/mp3" />
</audio>

<button id="musicToggle" className="music-btn">
  🔊
</button>

    </>
  );
}

export default App;