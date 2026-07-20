/* ============================================================
   DAYBREAK — AI Fashion Platform · Delivery Timeline
   Navigation + derived figures. Hours match the proposal exactly
   (Discovery 35 · POC 80 · MVP 245 · Community 135 · Retailer 270),
   so any total on this page can be checked against the proposal.
   ============================================================ */

/* ---- 1. Source numbers (single place to edit) ---- */
const buildRate = 1100; // R / hour, matches the proposal
const supportRate = 700; // R / hour, post-launch support

// Effort per phase, in hours — identical to the proposal's estimates.
const phaseHours = { p1: 35, p2: 80, p3: 245, p4: 135, p5: 270 };
const coreHours = phaseHours.p1 + phaseHours.p2 + phaseHours.p3; // Consumer MVP
const fullHours = coreHours + phaseHours.p4 + phaseHours.p5; // Full platform

// Two developers, each delivering ~35 focused hours a week.
const devsWorking = 2;
const focusedHoursPerDev = 35;
const weeklyCapacity = devsWorking * focusedHoursPerDev; // 70 h / week

// Calendar working-weeks per phase (see the schedule page for why these are
// larger than hours ÷ capacity: dependencies, QA loops, reviews, store review).
const phaseWeeks = { p1: 2, p2: 2, p3: 7, p4: 4, p5: 8 };
// One approval + deposit gap sits between phases.
const approvalGap = 1;
const coreCalendar = phaseWeeks.p1 + phaseWeeks.p2 + phaseWeeks.p3 + approvalGap * 2; // → MVP live
const fullCalendar =
  Object.values(phaseWeeks).reduce((a, b) => a + b, 0) + approvalGap * 4; // → full platform

const fmt = (v) => "R" + Math.round(v).toLocaleString("en-US");

/* ---- 2. Values bound to [data-fill] ---- */
const fills = {
  "build-rate": `R${buildRate}`,
  "support-rate": `R${supportRate}`,
  "devs": String(devsWorking),
  "hours-per-dev": String(focusedHoursPerDev),
  "weekly-capacity": String(weeklyCapacity),
  "full-hours": fullHours.toLocaleString("en-US"),
  "core-hours": coreHours.toLocaleString("en-US"),
  "core-calendar": String(coreCalendar),
  "full-calendar": String(fullCalendar),
  "core-months": (coreCalendar / 4.33).toFixed(1),
  "full-months": (fullCalendar / 4.33).toFixed(1),
  "pure-weeks": Math.round(fullHours / weeklyCapacity).toString(),
};
Object.entries(phaseHours).forEach(([k, h]) => {
  fills[`${k}-hours`] = String(h);
  fills[`${k}-weeks`] = String(phaseWeeks[k]);
});

document.querySelectorAll("[data-fill]").forEach((el) => {
  const key = el.dataset.fill;
  if (fills[key] != null) el.textContent = fills[key];
});

/* ---- 3. Page + navigation setup (mirrors the proposal) ---- */
const pages = [...document.querySelectorAll(".proposal-page")];
const sidenav = document.getElementById("sidenav");
const tbTitle = document.getElementById("tbTitle");
const countCurrent = document.getElementById("countCurrent");
const countTotal = document.getElementById("countTotal");
const progressFill = document.getElementById("progressFill");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const printBtn = document.getElementById("printBtn");

const pad = (n) => String(n).padStart(2, "0");
countTotal.textContent = pages.length;

let current = 0;

pages.forEach((page, i) => {
  const foot = page.querySelector(".page-num");
  if (foot) foot.textContent = `${pad(i + 1)} / ${pad(pages.length)}`;

  const item = document.createElement("button");
  item.className = "sidenav-item";
  item.dataset.index = i;
  item.innerHTML =
    `<span class="sidenav-tick"></span>` +
    `<span class="sidenav-num">${page.dataset.num || "—"}</span>` +
    `<span class="sidenav-label">${page.dataset.title || ""}</span>`;
  item.addEventListener("click", () => goTo(i));
  sidenav.appendChild(item);
});
const navItems = [...sidenav.children];

function goTo(index) {
  const i = Math.max(0, Math.min(pages.length - 1, index));
  pages[i].scrollIntoView({ behavior: "smooth", block: "start" });
}

function setActive(index) {
  if (index === current && tbTitle.textContent) return;
  current = index;
  const page = pages[index];
  tbTitle.textContent = page.dataset.title || "";
  countCurrent.textContent = pad(index + 1);
  progressFill.style.width = `${((index + 1) / pages.length) * 100}%`;
  navItems.forEach((item, i) => item.classList.toggle("active", i === index));
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === pages.length - 1;
}

const spy = new IntersectionObserver(
  (entries) => {
    entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      .slice(0, 1)
      .forEach((e) => setActive(pages.indexOf(e.target)));
  },
  { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
);
pages.forEach((p) => spy.observe(p));

const reveal = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("reveal-on");
        reveal.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
pages.forEach((p) => reveal.observe(p));

prevBtn.addEventListener("click", () => goTo(current - 1));
nextBtn.addEventListener("click", () => goTo(current + 1));
printBtn.addEventListener("click", () => window.print());

document.addEventListener("keydown", (event) => {
  if (["ArrowDown", "ArrowRight", "PageDown"].includes(event.key)) {
    event.preventDefault();
    goTo(current + 1);
  }
  if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) {
    event.preventDefault();
    goTo(current - 1);
  }
  if (event.key === "Home") {
    event.preventDefault();
    goTo(0);
  }
  if (event.key === "End") {
    event.preventDefault();
    goTo(pages.length - 1);
  }
});

setActive(0);
