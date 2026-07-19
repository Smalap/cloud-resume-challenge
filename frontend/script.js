/* ============================================================
   Shivam Malap — Portfolio v2 interactions
   1. Live visitor counter  (API Gateway → Lambda → DynamoDB)
   2. Reveal-on-scroll animations
   3. Count-up stats in the About section
   4. Rotating specialty text in the hero
   All effects respect prefers-reduced-motion.
   ============================================================ */

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------
   1. LIVE VISITOR COUNTER
   Already wired to your API from Phase 7/8 — no changes needed.
   ------------------------------------------------------------ */
const API_URL = "https://0zotppc6uh.execute-api.us-east-1.amazonaws.com/count";

const countEl = document.getElementById("visitor-count");

function animateCount(el, target, { pad = 0, suffix = "" } = {}) {
  if (REDUCED_MOTION) {
    el.textContent = String(target).padStart(pad, "0") + suffix;
    return;
  }
  const duration = 900;
  const start = performance.now();
  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out
    const value = Math.floor(eased * target);
    el.textContent = String(value).padStart(pad, "0") + suffix;
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

async function loadVisitorCount() {
  if (!countEl) return;
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    const count = Number(data.count ?? 0);
    animateCount(countEl, count, { pad: 4 });
  } catch (err) {
    countEl.textContent = "n/a";
    console.error("[visitor counter] Could not reach the API:", err);
  }
}
loadVisitorCount();

/* ------------------------------------------------------------
   2. REVEAL ON SCROLL
   Elements with .reveal fade/slide in the first time they
   enter the viewport.
   ------------------------------------------------------------ */
const revealEls = document.querySelectorAll(".reveal");

if (REDUCED_MOTION || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
}

/* ------------------------------------------------------------
   3. COUNT-UP STATS
   .stat__num elements carry data-count and data-suffix;
   they animate up the first time they scroll into view.
   ------------------------------------------------------------ */
const statEls = document.querySelectorAll(".stat__num");

function formatStat(value, suffix) {
  // Add a thousands separator for big numbers (5,000+)
  const text = value >= 1000 ? value.toLocaleString("en-US") : String(value);
  return text + suffix;
}

function runStat(el) {
  const target = Number(el.dataset.count || 0);
  const suffix = el.dataset.suffix || "";
  if (REDUCED_MOTION) {
    el.textContent = formatStat(target, suffix);
    return;
  }
  const duration = 1100;
  const start = performance.now();
  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatStat(Math.floor(eased * target), suffix);
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

if (!("IntersectionObserver" in window) || REDUCED_MOTION) {
  statEls.forEach(runStat);
} else {
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runStat(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  statEls.forEach((el) => statObserver.observe(el));
}

/* ------------------------------------------------------------
   4. ROTATING SPECIALTY TEXT (hero)
   Cycles through what you build with. Edit the list freely.
   ------------------------------------------------------------ */
const ROLES = [
  "serverless architecture",
  "Microsoft Azure",
  "AWS Lambda + DynamoDB",
  "Flutter & Dart",
  "CI/CD pipelines",
];

const rotator = document.getElementById("role-rotator");

if (rotator && !REDUCED_MOTION) {
  let i = 0;
  setInterval(() => {
    rotator.classList.add("is-fading");
    setTimeout(() => {
      i = (i + 1) % ROLES.length;
      rotator.textContent = ROLES[i];
      rotator.classList.remove("is-fading");
    }, 300);
  }, 2600);
}

/* ------------------------------------------------------------
   Footer year (stays current automatically)
   ------------------------------------------------------------ */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
