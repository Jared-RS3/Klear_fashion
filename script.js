/* ============================================================
   DAYBREAK — KLIYA
   Prototype & Technical Validation Brief V6 — revised proposal data.

   Build pricing is once-off per phase. Every phase price in this
   proposal is derived here from two numbers only: the combined
   engineering hours for that phase and Daybreak's build rate of
   R1,100/hour. Nothing is hand-typed, so no figure on the page can
   drift away from the arithmetic behind it.

   The rate has NOT changed. The scope has.
   ============================================================ */

/* ---- 1. Editable proposal data ---- */
const proposalData = {
  clientName: "Nolubabalo Nqakala",
  projectName: "Kliya",
  proposalDate: "27 August 2026",
  proposalValidityDays: 14,
  /* Post-launch support rate only — this is NOT the build rate.
     The build rate lives in buildRate below. */
  hourlyRate: 700,
  currency: "ZAR",
  vatStatus: "Exclusive of VAT where applicable",
  companyName: "Daybreak",
  email: "contact@daybreaktechinnovations.com",
  website: "daybreaktech.agency",
  location: "Cape Town, South Africa",
  startDate: "27 August 2026",
  deliveryDate: "9 October 2026",
};

/* ---- 2. Derived display values ---- */
const rateHour = `R${proposalData.hourlyRate} per hour`;
const fmt = (value) => "R" + Math.round(value).toLocaleString("en-US");
const hrs = (h) => `${h} hours`;

// Validity date computed from the issue date + validity days.
const issued = new Date(proposalData.proposalDate);
const validUntilDate = new Date(issued);
validUntilDate.setDate(issued.getDate() + proposalData.proposalValidityDays);
const validUntil = validUntilDate.toLocaleDateString("en-ZA", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/* ---------------------------------------------------------------
   BUILD RATE — unchanged from the original proposal.

   All hours quoted below are COMBINED DAYBREAK ENGINEERING HOURS
   across a two-person team, not per-developer hours.
   --------------------------------------------------------------- */
const buildRate = 1100;

/* ---------------------------------------------------------------
   PHASE LINE ITEMS

   [name, combined hours, what the line covers]

   Each phase price is the sum of its line items × buildRate, so the
   breakdown pages and the commercial summary are computed from the
   same source and cannot disagree.
   --------------------------------------------------------------- */
const phaseLines = {
  p1: [
    [
      "Product Scope &amp; Technical Requirements Mapping",
      6,
      "Founder-brief decomposition · prototype requirements · technical requirements · functional requirements · scope boundaries · acceptance requirements · definition of Functional, API-powered, Rules-based, Simulated and Technical-POC capabilities",
    ],
    [
      "Consumer / Creator / Retailer Journey Architecture",
      6,
      "Consumer experience · creator experience · retailer experience · complete user-flow mapping · the relationship between the three Kliya ecosystem participants",
    ],
    [
      "Application &amp; System Architecture",
      8,
      "Frontend architecture · backend architecture · database structure · storage architecture · authentication architecture · integration layer · modular provider architecture · replaceable simulation architecture · development-environment planning · deployment architecture",
    ],
    [
      "Body-Scanning Technical Validation",
      10,
      "Evaluation of appropriate body-measurement providers · 3DLOOK and Size Stream evaluation · alternative providers where required · capture requirements · structured measurement outputs · body-shape outputs · privacy implications · image-retention requirements · Kliya Body Intelligence compatibility · body-data-to-simulation feasibility",
    ],
    [
      "Virtual Try-On Provider Validation",
      5,
      "API feasibility · image requirements · garment requirements · generation quality · latency · reliability · output ownership · commercial suitability · limitations. Virtual Try-On is positioned as visualisation, not as scientifically proven physical-fit prediction.",
    ],
    [
      "3D / Physics Simulation Technology Validation",
      12,
      "Technical evaluation of CLO 3D, Style3D and Browzwear — API access · server / headless operation · cloud execution · body-geometry support · garment formats · material properties · simulation outputs · tension data · strain data · collision information · fit-state information · latency · compute requirements · development feasibility · output ownership · lock-in risk · future replacement by proprietary Kliya technology",
    ],
    [
      "Garment Intelligence Architecture",
      5,
      "The structure used to represent garment composition · material · stretch · silhouette · cut · intended fit · structure · weight · thickness · garment measurements · retailer size-chart information · source · confidence",
    ],
    [
      "Fit-IQ V1 Technical Architecture",
      5,
      "The Kliya-owned V1 logic connecting Body Intelligence, Garment Intelligence and retailer sizing to High, Moderate or Low fit confidence, with supporting reasons and stated uncertainty. No unsupported percentage-level physical-fit accuracy is claimed.",
    ],
    [
      "Four-Garment Acceptance-Test Definition",
      3,
      "The controlled validation methodology across rigid structured cotton denim · high-stretch elastane / jersey · structured heavy wool / tailoring · fluid silk / satin-style material",
    ],
  ],
  p2: [
    [
      "Application Foundation, Repository, Database &amp; Deployment",
      15,
      "Kliya-owned repository setup · frontend foundation · backend foundation · database · application environments · deployment · secrets and environment handling · code organisation · core integration architecture",
    ],
    [
      "Authentication, Onboarding &amp; Privacy Consent",
      15,
      "Account creation · authentication · login · onboarding flow · profile creation · privacy consent · body-data consent · appropriate user-state handling",
    ],
    [
      "Body Intelligence Profile + Scanning Integration",
      25,
      "Selected measurement-provider integration · image and capture workflow · structured measurement handling · measurement normalisation · Body Intelligence Profile · persistence · error handling · connection to Fit-IQ · simulation-ready data bridge where technically feasible",
    ],
    [
      "Product URL / Image Import",
      20,
      "Retailer URL input · screenshot and image upload · public product-data extraction · manual fallback · image fallback · product metadata handling · blocked-extraction handling · confidence tracking",
    ],
    [
      "Garment Intelligence System",
      20,
      "Capturing or inferring composition · material · stretch · cut · silhouette · intended fit · structure · thickness · weight · sizing · measurements · size-chart information · source metadata · confidence metadata",
    ],
    [
      "Virtual Try-On Pipeline",
      25,
      "Person input · garment input · provider integration · generation requests · job and status handling · loading states · results · error handling · retry handling · generation history · generated-asset handling",
    ],
    [
      "Fit-IQ V1 Rules Engine",
      40,
      "Body-data, garment-data and retailer-size inputs · fit-rule implementation · intended-ease logic · material and stretch consideration · incomplete-data handling · confidence determination · High / Moderate / Low guidance · human-readable reasoning · stated uncertainty · modular architecture · documentation. This is new proprietary Kliya product logic that did not form part of the original AI Proof of Concept.",
      "feature",
    ],
    [
      "Size Comparison Functionality",
      10,
      "Comparing at least two garment sizes · Fit-IQ comparison · confidence changes · fit-reason changes · presentation to users",
    ],
    [
      "3D / Physics Simulation POC",
      40,
      "Selected simulation integration · controlled body geometry · garment geometry · material-property handling · simulation workflow · simulation results · integration into the Kliya prototype · technical experimentation · limitations handling. This is a Technical POC — not development of Kliya's own proprietary cloth-physics engine.",
      "feature",
    ],
    [
      "TrueDrape / Fit-State Mapping",
      15,
      "Representation of restrictive, snug, optimal and loose fit states using real available simulation or fit-state outputs. Pressure and tension information is never fabricated: where the selected provider does not expose exact tension, strain or pressure data, the closest technically defensible representation is used and the limitation is stated.",
    ],
    [
      "Four-Garment Technical Validation",
      15,
      "The controlled Phase 2 acceptance test against rigid denim, high-stretch jersey / elastane, structured wool / tailoring and fluid silk / satin — demonstrating, where available, source information · verified attributes · inferred attributes · visualisation · simulation output · Fit-IQ output · supported fit-state output · known limitations",
    ],
    [
      "Closet &amp; Saved Looks",
      10,
      "Owned garments · prospective purchases · saved garments · outfits · Saved Looks · closet management",
    ],
    [
      "Wardrobe Compatibility",
      5,
      "Prototype-level recommendation logic showing how a prospective purchase relates to items already owned",
    ],
    [
      "Creator Experience + Try This Look",
      10,
      "Prototype-level creator profiles · creator search · boards · collections · tagged garments · the Try This Look journey. Not expanded into a production-scale social network.",
    ],
    [
      "Retailer Prototype Experience",
      10,
      "Prototype-level retailer dashboard · retailer value proposition · mocked conversion data · mocked return data · mocked demand information. Not production retailer infrastructure.",
    ],
    [
      "Request Brand to Integrate",
      5,
      "Integration CTA · requested brand · product URL · garment / category · tester or user reference · timestamp · demand recording",
    ],
    [
      "Minimal Administration Controls",
      5,
      "Basic internal controls for users · garments · generations · content · integration requests",
    ],
    [
      "QA, Debugging &amp; End-to-End Testing",
      15,
      "Complete consumer flow · body capture · product import · Garment Intelligence · Virtual Try-On · Fit-IQ · simulation · fit mapping · size comparison · saving · creator flow · retailer flow · authentication · API failures · invalid inputs · missing data · responsiveness · deployment validation",
    ],
    [
      "Technical Documentation &amp; Handover",
      10,
      "Application architecture · database schemas · API wrappers · integration structure · Fit-IQ documentation · simulation integration · deployment process · environment setup · known limitations · future development considerations · future CTO / engineering-team handover",
    ],
  ],
};

/* Phase 02's itemised scope carries 310 hours of work. Ten of those hours
   are shared architecture already paid for elsewhere in the phase — the
   foundation, integration layer and provider abstraction are built once and
   reused across Body Intelligence, Garment Intelligence, VTO and simulation.
   That consolidation is shown as a visible line on the breakdown rather than
   quietly trimmed from a capability, so every line item below reads at its
   true effort and the phase still lands on the quoted 300 hours. */
const phases = {
  p1: {
    tag: "PHASE 01",
    name: "Discovery &amp; Technical Validation",
    adjustHours: 0,
    adjustLabel: "",
  },
  p2: {
    tag: "PHASE 02",
    name: "End-to-End Prototype &amp; Physics POC",
    adjustHours: -10,
    adjustLabel: "Shared-architecture consolidation",
  },
};

Object.entries(phases).forEach(([key, p]) => {
  p.lines = phaseLines[key];
  p.itemisedHours = p.lines.reduce((sum, line) => sum + line[1], 0);
  p.itemisedFee = p.itemisedHours * buildRate;
  p.hoursEst = p.itemisedHours + p.adjustHours;
  p.onceOff = p.hoursEst * buildRate;
  p.adjustFee = p.adjustHours * buildRate;
  /* Milestone billing: 50% deposit before the phase begins, then two 25%
     milestones. The phases stand alone — no 50% of the whole project is
     ever payable upfront. */
  p.deposit = p.onceOff * 0.5;
  p.milestone = p.onceOff * 0.25;
});

/* ---- Quoted project total — Phases 01 + 02 only ----
   Phase 03 (Consumer MVP / Beta) is deliberately NOT quoted here. It is
   scoped and priced separately once Phase 02 is delivered and its technical
   findings reviewed, so it carries no hours and no fee and appears in no
   total. */
const quotedKeys = ["p1", "p2"];
const quotedHours = quotedKeys.reduce((sum, k) => sum + phases[k].hoursEst, 0);
const quotedTotal = quotedKeys.reduce((sum, k) => sum + phases[k].onceOff, 0);

/* ---- Original vs revised scope ----
   The original Phase 01 + Phase 02 quotation, retained here purely for the
   like-for-like comparison on the "Why the investment has changed" page.
   These are the ONLY places the superseded figures may appear. */
const original = { hours: 135, total: 126500 };
const addedHours = quotedHours - original.hours;
const addedValue = addedHours * buildRate;

/* ---- 3. Values bound to [data-fill] elements ---- */
const fills = {
  "client-name": proposalData.clientName,
  "rate-hour": rateHour,
  "validity-days": String(proposalData.proposalValidityDays),
  "valid-until": validUntil,
  "build-rate": `R${buildRate.toLocaleString("en-US")} per hour`,
  "build-rate-short": `R${buildRate.toLocaleString("en-US")}/hour`,
  "start-date": proposalData.startDate,
  "delivery-date": proposalData.deliveryDate,
  "quoted-hours": String(quotedHours),
  "quoted-hours-long": `${quotedHours} combined engineering hours`,
  "quoted-total": fmt(quotedTotal),
  "orig-hours": String(original.hours),
  "orig-total": fmt(original.total),
  "added-hours": String(addedHours),
  "added-value": fmt(addedValue),
  "added-calc": `${addedHours} × ${fmt(buildRate)}`,
};

Object.entries(phases).forEach(([key, p]) => {
  fills[`${key}-onceoff`] = fmt(p.onceOff);
  fills[`${key}-hours`] = hrs(p.hoursEst);
  fills[`${key}-deposit`] = fmt(p.deposit);
  fills[`${key}-milestone`] = fmt(p.milestone);
});

document.querySelectorAll("[data-fill]").forEach((el) => {
  const key = el.dataset.fill;
  if (fills[key] != null) el.textContent = fills[key];
});

/* ---- Phase breakdown rows ----
   Rendered from phaseLines so the visible line items, the sub-total, the
   consolidation line and the phase total are all the same arithmetic. */
document.querySelectorAll("[data-lines]").forEach((host) => {
  const p = phases[host.dataset.lines];
  if (!p) return;

  const row = (name, hours, fee, note, cls) =>
    `<div class="cost-row${cls ? " " + cls : ""}">` +
    `<div class="cost-name">${name}` +
    (note ? `<span>${note}</span>` : "") +
    `</div>` +
    `<div class="cost-val">` +
    `<span class="cv-h">${hours}</span><b>${fee}</b>` +
    `</div></div>`;

  const items = p.lines
    .map(([name, hours, note, cls], i) =>
      row(
        `<i class="cost-num">${String(i + 1).padStart(2, "0")}</i>${name}`,
        hrs(hours),
        fmt(hours * buildRate),
        note,
        cls,
      ),
    )
    .join("");

  const adjustment = p.adjustHours
    ? row(
        "Sub-total — itemised scope",
        hrs(p.itemisedHours),
        fmt(p.itemisedFee),
        "",
        "sub",
      ) +
      row(
        p.adjustLabel,
        `\u2212${Math.abs(p.adjustHours)} hours`,
        `−${fmt(Math.abs(p.adjustFee))}`,
        "Foundation, integration layer and provider abstraction are built once and reused across the modules above, so the phase is quoted below the sum of its parts.",
        "sub",
      )
    : "";

  host.innerHTML =
    items +
    adjustment +
    row(`${p.tag} TOTAL`, hrs(p.hoursEst), fmt(p.onceOff), "", "total");
});

// Development build-up bar — each phase segment is sized by its share of the
// quoted project fee, and the bracket spans the total it labels, so the
// illustration can never disagree with the figures beside it.
document.querySelectorAll("[data-stack-phase]").forEach((el) => {
  const phase = phases[el.dataset.stackPhase];
  if (phase) el.style.width = `${(phase.onceOff / quotedTotal) * 100}%`;
});

const stackSpans = { quoted: quotedTotal };
document.querySelectorAll("[data-stack-span]").forEach((el) => {
  const total = stackSpans[el.dataset.stackSpan];
  if (total) el.style.width = `${(total / quotedTotal) * 100}%`;
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
