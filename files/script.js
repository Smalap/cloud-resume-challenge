/* ============================================================
   Visitor counter
   ------------------------------------------------------------
   Right now this does nothing but show a placeholder, because
   the backend (API Gateway → Lambda → DynamoDB) doesn't exist yet.

   >>> PHASE 8 TODO <<<
   Once your API is live, paste its URL into API_URL below.
   That single line is all that connects this page to your
   serverless backend. Nothing else here needs to change.
   ============================================================ */

const API_URL = ""; // e.g. "https://abc123.execute-api.us-east-1.amazonaws.com/count"

const countEl = document.getElementById("visitor-count");

/* Smoothly counts up to the final number — small touch of polish. */
function animateCount(target) {
  const duration = 900;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out
    const value = Math.floor(eased * target);
    countEl.textContent = String(value).padStart(4, "0");
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

async function loadVisitorCount() {
  // No API wired up yet — leave the placeholder and explain in the console.
  if (!API_URL) {
    countEl.textContent = "——";
    console.info(
      "[visitor counter] No API_URL set yet. This gets filled in during Phase 8 " +
      "once API Gateway → Lambda → DynamoDB is live."
    );
    return;
  }

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();

    // Your Lambda will return something like { "count": 42 }.
    // Adjust the property name here if you name it differently.
    const count = data.count ?? data.visitors ?? 0;
    animateCount(Number(count));
  } catch (err) {
    countEl.textContent = "n/a";
    console.error("[visitor counter] Could not reach the API:", err);
  }
}

loadVisitorCount();
