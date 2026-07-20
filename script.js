/* ============================================================
   DAYBREAK — AI Fashion Platform Proposal
   Editable data, navigation & reveal.
   Build pricing is once-off per phase — one fixed price per phase,
   no hourly billing. The hourly rate survives only for the optional
   ongoing support retainer after launch.
   ============================================================ */

/* ---- 1. Editable proposal data ---- */
const proposalData = {
  clientName: "Nolubabalo Nqakala",
  projectName: "AI Fashion Platform",
  proposalDate: "15 July 2026",
  proposalValidityDays: 14,
  hourlyRate: 700,
  currency: "ZAR",
  vatStatus: "Exclusive of VAT where applicable",
  companyName: "Daybreak",
  email: "contact@daybreaktechinnovations.com",
  website: "daybreaktech.agency",
  location: "Cape Town, South Africa",
};

/* ---- 2. Derived display values ---- */
const rateHour = `R${proposalData.hourlyRate} per hour`;
const fmt = (value) => "R" + Math.round(value).toLocaleString("en-US");

// Validity date computed from the issue date + validity days.
const issued = new Date(proposalData.proposalDate);
const validUntilDate = new Date(issued);
validUntilDate.setDate(issued.getDate() + proposalData.proposalValidityDays);
const validUntil = validUntilDate.toLocaleDateString("en-ZA", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/* One once-off price per phase, scoped and billed on its own. The hours
   and price are PLANNING ESTIMATES: they are reviewed and confirmed with
   the client in a scoping meeting before the phase begins, and may be
   revised then.

   hoursEst is the effort estimate behind each price. If a phase runs beyond
   its confirmed estimate because scope, complexity or requirements change,
   the additional hours are assessed and agreed with the client in writing
   before the work continues, and charged at the build rate — Daybreak does
   not absorb overruns arising from expanded scope.

   Every phase price is exactly hoursEst × buildRate, so any figure in this
   proposal can be derived in front of the client from two numbers. */
const buildRate = 1100;
/* Phase 05 (Retailer Platform) is deliberately left unpriced — its scope
   is difficult to estimate accurately today, so it is worked out and quoted
   separately once the earlier phases are delivered. It therefore carries no
   hoursEst and no once-off price, and does not appear in any total. */
const phases = {
  p1: { hoursEst: 35 },
  p2: { hoursEst: 80 },
  p3: { hoursEst: 245 },
  p4: { hoursEst: 135 },
};
Object.values(phases).forEach((p) => {
  p.onceOff = p.hoursEst * buildRate;
  /* Each phase begins on a 50% deposit; the balance is invoiced as the
     work progresses. */
  p.deposit = p.onceOff * 0.5;
});

/* BUILD-PHASE third-party cost — what the client pays the providers while
   the app is being built, before a single public user exists. Every line
   below is the "Development" column of the matching row on the Operating
   Costs page, so the two pages cannot drift apart. */
const buildInfra = {
  backend: 1500, // backend & database, development
  storage: 500, // image storage & processing, development
  mobileBuild: 1500, // mobile build & deployment
  monitoring: 1500, // analytics & error monitoring, development
};
const buildMonthly = Object.values(buildInfra).reduce((a, b) => a + b, 0);

/* IP success fee — Daybreak's participation in the upside it helps build.
   The phase prices buy the client clean ownership of the platform (see the
   Commercial Terms); this fee is a separate contractual obligation that
   triggers only on a liquidity event, so it never burdens the client while
   she is pre-revenue. Placeholder figures — confirm with legal counsel
   before issuing. */
const ipSuccess = {
  fundingTrigger: 2000000, // qualifying raise, R
  pct: 3, // % of transaction value
  multiple: 1.5, // × total development fees paid
};

/* Core app — Phases 01–03 (Discovery, AI Proof of Concept, Consumer MVP). */
const coreKeys = ["p1", "p2", "p3"];
const coreOnceOffTotal = coreKeys.reduce((sum, k) => sum + phases[k].onceOff, 0);

/* Full platform — Phases 01–04, adding Community. The Retailer Platform
   (Phase 05) is scoped and priced separately later, so it is not part of
   this total. */
const fullKeys = ["p1", "p2", "p3", "p4"];
const fullOnceOffTotal = fullKeys.reduce((sum, k) => sum + phases[k].onceOff, 0);

/* ---------------------------------------------------------------
   OPERATING-COST MODEL — fully transparent so the figures can be
   defended line by line if the client questions them.

   The dominant cost is AI virtual try-on. It is USAGE-BASED: every
   single try-on renders a brand-new photorealistic image on the
   provider's GPUs (FASHN.ai / Google / Amazon-class try-on), billed
   per image. It is a pass-through cost paid directly to the provider
   in the client's name — Daybreak earns nothing on it.

   Every monthly figure below is therefore built from three visible
   numbers: active users × try-ons per user × cost per image. Nothing
   is arbitrary — the client can recompute any total herself. --------- */
const perImageMax = 2.5; // R per generated try-on image (ceiling, incl. retries + forex)
const tryOnsPerUserMax = 12; // typical active user, per month
const monthlyAiPerUser = perImageMax * tryOnsPerUserMax; // R30 / active user / month

/* Non-AI infrastructure ceilings per tier (backend, image storage + CDN,
   background removal, email/push, monitoring) — these grow slowly; AI is
   what scales. */
const usageTiers = [
  { key: "pilot", label: "PILOT / BETA", users: 500, infra: 4000 },
  { key: "early", label: "EARLY GROWTH", users: 2000, infra: 16000 },
  { key: "scaling", label: "SCALING", users: 10000, infra: 60000 },
];

/* Ongoing support is billed hourly after launch, only for work actually
   requested, and is capped at supportHoursCap hours per month. It is not
   part of the running-cost tiers below — those are third-party costs the
   client pays to the providers directly. */
const supportHoursCap = 40;
const supportMonthlyCap = supportHoursCap * proposalData.hourlyRate;

usageTiers.forEach((t) => {
  t.tryOns = t.users * tryOnsPerUserMax;
  t.ai = t.users * monthlyAiPerUser;
  t.thirdParty = t.ai + t.infra;
});

/* The build sits on the same bar scale as the live tiers — that is the point:
   it shows the client how close to nothing the platform costs to run until
   real people are using it. */
const barStages = [
  { key: "build", thirdParty: buildMonthly },
  ...usageTiers,
];
const tierMaxThirdParty = Math.max(...barStages.map((t) => t.thirdParty));

/* ---- 3. Values bound to [data-fill] elements ---- */
const fills = {
  "client-name": proposalData.clientName,
  "rate-hour": rateHour,
  "validity-days": String(proposalData.proposalValidityDays),
  "valid-until": validUntil,
  "core-onceoff": fmt(coreOnceOffTotal),
  "full-onceoff": fmt(fullOnceOffTotal),
  "per-image": "R" + perImageMax.toFixed(2),
  "tryons-per-user": String(tryOnsPerUserMax),
  "ai-per-user": fmt(monthlyAiPerUser),
  "build-rate": `R${buildRate} per hour`,
  "support-hours-cap": String(supportHoursCap),
  "support-monthly-cap": fmt(supportMonthlyCap),
  "build-monthly": fmt(buildMonthly),
  "ip-trigger": fmt(ipSuccess.fundingTrigger),
  "ip-pct": ipSuccess.pct + "%",
  "ip-multiple": ipSuccess.multiple + "×",
};

usageTiers.forEach((t) => {
  fills[`tier-${t.key}-users`] = t.users.toLocaleString("en-US");
  fills[`tier-${t.key}-tryons`] = t.tryOns.toLocaleString("en-US");
  fills[`tier-${t.key}-ai`] = fmt(t.ai);
  fills[`tier-${t.key}-infra`] = fmt(t.infra);
  fills[`tier-${t.key}-thirdparty`] = fmt(t.thirdParty);
});

Object.entries(phases).forEach(([key, p]) => {
  fills[`${key}-onceoff`] = fmt(p.onceOff);
  fills[`${key}-hours`] = `~${p.hoursEst} hours`;
  fills[`${key}-deposit`] = fmt(p.deposit);
});

document.querySelectorAll("[data-fill]").forEach((el) => {
  const key = el.dataset.fill;
  if (fills[key] != null) el.textContent = fills[key];
});

// Development build-up bar — each phase segment is sized by its share of the
// full platform price, and the brackets span the totals they label, so the
// illustration can never disagree with the figures beside it.
document.querySelectorAll("[data-stack-phase]").forEach((el) => {
  const phase = phases[el.dataset.stackPhase];
  if (phase) el.style.width = `${(phase.onceOff / fullOnceOffTotal) * 100}%`;
});

const stackSpans = { core: coreOnceOffTotal, full: fullOnceOffTotal };
document.querySelectorAll("[data-stack-span]").forEach((el) => {
  const total = stackSpans[el.dataset.stackSpan];
  if (total) el.style.width = `${(total / fullOnceOffTotal) * 100}%`;
});

// Usage-tier growth bars — width is proportional to each tier's third-party
// monthly ceiling against the largest tier, so the bar is computed, not
// hand-set.
const tiersByKey = Object.fromEntries(barStages.map((t) => [t.key, t]));
document.querySelectorAll("[data-bar-stage]").forEach((el) => {
  const tier = tiersByKey[el.dataset.barStage];
  if (tier) el.style.width = `${(tier.thirdParty / tierMaxThirdParty) * 100}%`;
});

/* ---- 4. Page + navigation setup ---- */
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

// Build the sticky side index and keep footer page numbers in sync.
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

/* ---- 5. Scrollspy (active page) ---- */
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

/* ---- 6. Reveal-on-enter ---- */
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

/* ---- 7. Controls ---- */
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
