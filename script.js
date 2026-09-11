/* ============================================================
   DAYBREAK — KLIYA
   Revised Commercial Proposal — MVP Integration & Technical
   Support (DB-KLIYA-MVP-REV2-110926).

   This proposal replaces the earlier Phase 01/02 Prototype &
   Technical Validation deck. Scope is now a single fixed-fee
   integration programme: connect approved third-party providers
   into the existing Kliya MVP, not build the product from
   scratch.

   Every hour and fee below is derived from one source — the
   workstream table — so the narrative pages and the commercial
   pages cannot disagree. The one number that is NOT derived is
   the fixed project fee itself: R230,000 is the commercially
   rounded price for the 209-hour estimate (R229,900 at
   R1,100/hour). The payment-schedule amounts ARE derived, as
   percentages of that fixed fee.
   ============================================================ */

/* ---- 1. Editable proposal data ---- */
const proposalData = {
  clientName: "Kliya",
  projectName: "Kliya",
  docRef: "DB-KLIYA-MVP-REV2-110926",
  issueDate: "11 September 2026",
  proposalValidityDays: 4,
  companyName: "Daybreak",
  email: "contact@daybreaktechinnovations.com",
  website: "daybreaktech.agency",
  location: "Cape Town, South Africa",
  deliveryWindow: "8–10 weeks of active delivery",
};

/* ---- 2. Derived display values ---- */
const fmt = (value) => "R" + Math.round(value).toLocaleString("en-US");
const hrs = (h) => `${h} hours`;

const issued = new Date(proposalData.issueDate);
const validUntilDate = new Date(issued);
validUntilDate.setDate(issued.getDate() + proposalData.proposalValidityDays);
const validUntil = validUntilDate.toLocaleDateString("en-ZA", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/* ---------------------------------------------------------------
   BUILD RATE — Daybreak's standard engineering rate. Unchanged
   from the original proposal.
   --------------------------------------------------------------- */
const buildRate = 1100;

/* ---------------------------------------------------------------
   WORKSTREAM LINE ITEMS

   [name, hours, included outcome]

   The commercial project fee is fixed at R230,000 — a
   commercially rounded figure for this 209-hour estimate. Hours
   are planning estimates mapped to the approved workstreams; the
   engagement is priced for delivery of the agreed scope and
   outcomes, not for consuming an arbitrary block of hours.
   --------------------------------------------------------------- */
const workstreamLines = [
  [
    "Integration architecture &amp; backend foundation",
    22,
    "Shared integration layer, service boundaries, auth/secrets pattern, request orchestration, baseline observability, data-mapping conventions and environment configuration.",
  ],
  [
    "Body Intelligence / body measurement",
    28,
    "Integrate one approved measurement provider; map supported body outputs into Kliya's body profile; persist required data; handle incomplete/failure states; document export/retention limitations.",
  ],
  [
    "Virtual Try-On",
    28,
    "Integrate one approved VTO provider into the existing journey; support required user/body and garment inputs; return/display results; isolate provider logic; capture latency/failure/usage information where available.",
  ],
  [
    "Garment / simulation / fit infrastructure",
    32,
    "Integrate one approved technically accessible provider; map required body/garment inputs; retrieve machine-readable fit signals where exposed; document asset-preparation, preprocessing and vendor dependencies.",
  ],
  [
    "PointAI validation &amp; lightweight path",
    10,
    "Validate commercial/technical access, required inputs and available outputs; implement a lightweight MVP path where access supports it, otherwise provide a documented blocker and exact next action.",
  ],
  [
    "Product ingestion / Garment Intelligence",
    27,
    "Support approved product inputs including URL/image/size chart/measurements/fabric/manual data; normalise into a common garment structure; retain data provenance; maintain fallback when retailer extraction is unreliable.",
  ],
  [
    "Affiliate commerce / creator attribution",
    25,
    "Implement one approved MVP affiliate network (Impact or CJ); support approved account model, link generation and available attribution/commission mapping; structure the interface so another network can be added later.",
  ],
  [
    "QA, security hardening, documentation &amp; handover",
    37,
    "Cross-workstream testing, failure-path validation, basic usage/cost visibility, sensitive-data handling checks, technical documentation, known-limitations register, handover and final acceptance support.",
  ],
];

const totalHours = workstreamLines.reduce((sum, l) => sum + l[1], 0);
const estimatedLabourBasis = totalHours * buildRate;

/* The commercial project fee — fixed, not derived from hours ×
   rate. This is the one number in the deck that is intentionally
   hand-set: it is the commercially rounded price Daybreak is
   charging, R100 above the raw estimate. */
const fixedFee = 230000;

/* ---------------------------------------------------------------
   PAYMENT SCHEDULE — three milestones, all derived as percentages
   of the fixed fee so the schedule can never drift from the total.
   --------------------------------------------------------------- */
const paymentMilestones = [
  {
    name: "Commencement deposit",
    trigger: "Agreement signed; before engineering starts",
    pct: 0.5,
  },
  {
    name: "Integration midpoint",
    trigger: "Core integration foundation + first accepted workstreams",
    pct: 0.3,
  },
  {
    name: "Final acceptance &amp; handover",
    trigger: "Before final source/documentation handover",
    pct: 0.2,
  },
];
paymentMilestones.forEach((m) => {
  m.amount = fixedFee * m.pct;
});
const depositAmount = paymentMilestones[0].amount;
const depositPct = paymentMilestones[0].pct * 100;

/* ---- 3. Values bound to [data-fill] elements ---- */
const fills = {
  "client-name": proposalData.clientName,
  "doc-ref": proposalData.docRef,
  "issue-date": proposalData.issueDate,
  "validity-days": String(proposalData.proposalValidityDays),
  "valid-until": validUntil,
  "build-rate": `R${buildRate.toLocaleString("en-US")} per hour`,
  "build-rate-short": `R${buildRate.toLocaleString("en-US")}/hour`,
  "delivery-window": proposalData.deliveryWindow,
  "total-hours": String(totalHours),
  "total-hours-long": `${totalHours} engineering hours`,
  "labour-basis": fmt(estimatedLabourBasis),
  "fixed-fee": fmt(fixedFee),
  "deposit-pct": `${depositPct}%`,
  "deposit-amount": fmt(depositAmount),
  "midpoint-pct": `${paymentMilestones[1].pct * 100}%`,
  "midpoint-amount": fmt(paymentMilestones[1].amount),
  "final-pct": `${paymentMilestones[2].pct * 100}%`,
  "final-amount": fmt(paymentMilestones[2].amount),
};

document.querySelectorAll("[data-fill]").forEach((el) => {
  const key = el.dataset.fill;
  if (fills[key] != null) el.textContent = fills[key];
});

/* ---- Workstream breakdown rows ----
   Rendered from workstreamLines so the visible line items, the
   sub-total and the estimated labour basis are all the same
   arithmetic. */
document.querySelectorAll("[data-lines]").forEach((host) => {
  if (host.dataset.lines !== "workstreams") return;

  const row = (name, hours, fee, note, cls) =>
    `<div class="cost-row${cls ? " " + cls : ""}">` +
    `<div class="cost-name">${name}` +
    (note ? `<span>${note}</span>` : "") +
    `</div>` +
    `<div class="cost-val">` +
    `<span class="cv-h">${hours}</span><b>${fee}</b>` +
    `</div></div>`;

  const items = workstreamLines
    .map(([name, hours, note], i) =>
      row(
        `<i class="cost-num">${String(i + 1).padStart(2, "0")}</i>${name}`,
        hrs(hours),
        fmt(hours * buildRate),
        note,
      ),
    )
    .join("");

  host.innerHTML =
    items +
    row(
      "ESTIMATED LABOUR BASIS",
      hrs(totalHours),
      fmt(estimatedLabourBasis),
      "",
      "total",
    );
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
