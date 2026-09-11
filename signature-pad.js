/* ============================================================
   DAYBREAK — draw-to-sign pads.

   Vanilla, dependency-free canvas signature capture, shared by
   index.html (Intent to Proceed) and agreement.html (Signatures).
   Each ".sig-line" that contains a ".sig-pad-wrap" gets an actual
   drawable canvas; the accompanying ".sig-clear" button (a sibling
   within the same .sig-line) resets it. Signatures live only in
   the current browser tab — there is no backend to persist them —
   but whatever is drawn is part of the page when it is printed or
   saved as a PDF.
   ============================================================ */
(function () {
  function initPad(canvas) {
    const ctx = canvas.getContext("2d");
    const ratio = window.devicePixelRatio || 1;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      ctx.scale(ratio, ratio);
      ctx.lineWidth = 1.8;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#111";
    }
    resize();

    let drawing = false;
    let last = null;

    const pos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    canvas.addEventListener("pointerdown", (e) => {
      drawing = true;
      last = pos(e);
      canvas.classList.add("signed");
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!drawing) return;
      const p = pos(e);
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      last = p;
    });
    ["pointerup", "pointerleave", "pointercancel"].forEach((ev) =>
      canvas.addEventListener(ev, () => {
        drawing = false;
      }),
    );

    return {
      clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.classList.remove("signed");
      },
    };
  }

  document.querySelectorAll(".sig-pad-wrap").forEach((wrap) => {
    const canvas = wrap.querySelector(".sig-pad");
    const hint = wrap.querySelector(".sig-pad-hint");
    if (!canvas) return;
    const pad = initPad(canvas);

    canvas.addEventListener("pointerdown", () => {
      if (hint) hint.classList.add("hidden");
    });

    const line = wrap.closest(".sig-line");
    const clearBtn = line ? line.querySelector(".sig-clear") : null;
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        pad.clear();
        if (hint) hint.classList.remove("hidden");
      });
    }
  });

  // Default every signature date field to today, editable by the signer.
  const today = new Date().toISOString().slice(0, 10);
  document.querySelectorAll('.sig-line input[type="date"]').forEach((el) => {
    if (!el.value) el.value = today;
  });
})();
