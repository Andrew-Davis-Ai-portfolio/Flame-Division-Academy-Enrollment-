// Flame Division Academy — Enrollment TTS helper

document.addEventListener("DOMContentLoaded", () => {
  const tts = {
    supported:
      "speechSynthesis" in window &&
      typeof window.SpeechSynthesisUtterance !== "undefined",
    synth: "speechSynthesis" in window ? window.speechSynthesis : null,
    current: null,
  };

  const introEl = document.getElementById("offer-intro");
  const btnIntro = document.getElementById("btn-offer-tts");
  const statusIntro = document.getElementById("offer-tts-status");

  function speak(text) {
    if (!tts.supported || !text) return;
    try {
      if (tts.current) {
        tts.synth.cancel();
        tts.current = null;
      }
      const u = new window.SpeechSynthesisUtterance(text);
      u.onend = () => (tts.current = null);
      u.onerror = () => (tts.current = null);
      tts.current = u;
      tts.synth.speak(u);
    } catch (err) {
      console.warn("TTS error:", err);
    }
  }

  function showUnavailable(el) {
    if (!el) return;
    el.textContent = "Voice mode is not available on this device or browser.";
  }

  if (!tts.supported && statusIntro) {
    showUnavailable(statusIntro);
  }

  if (btnIntro) {
    btnIntro.addEventListener("click", () => {
      if (!tts.supported) {
        showUnavailable(statusIntro);
        return;
      }
      const text = introEl ? introEl.innerText : "";
      speak(text);
      if (statusIntro) {
        statusIntro.textContent = "Reading enrollment overview...";
      }
    });
  }
});
