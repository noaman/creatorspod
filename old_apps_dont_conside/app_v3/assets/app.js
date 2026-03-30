const PERSONA_COPY = {
  creator: {
    name: "Creator",
    autonomy: ["Assistive", "Co-pilot", "Autopilot"],
    digest:
      "Trend scan complete. The system found three short-form ideas with high repurpose potential and queued drafts for your approval.",
  },
  brand: {
    name: "Brand / Agency",
    autonomy: ["Guarded", "Orchestrated", "Campaign autopilot"],
    digest:
      "Influencer scoring updated, brand voice checks passed, and the next launch sprint has two high-confidence asset bundles ready.",
  },
  executive: {
    name: "Executive",
    autonomy: ["Draft support", "Strategic assist", "Authority autopilot"],
    digest:
      "Calendar-aware publishing is active. The system prepared pre-event, live-event, and post-event narratives with compliance review enabled.",
  },
};

function selectAll(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

function getTheme() {
  return localStorage.getItem("creators-pod-theme") || "light";
}

function setTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("creators-pod-theme", theme);
  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  selectAll("[data-theme-toggle]").forEach((button) => {
    button.setAttribute("aria-label", label);
    button.textContent = theme === "dark" ? "Light" : "Dark";
  });
}

function initializeThemeToggle() {
  setTheme(getTheme());
  selectAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(nextTheme);
    });
  });
}

function initializeTabs() {
  const groups = selectAll("[data-tab-group]");
  groups.forEach((group) => {
    const buttons = selectAll("[data-tab-button]", group);
    let panelScope = group;
    let panels = selectAll("[data-tab-panel]", panelScope);

    while (!panels.length && panelScope.parentElement) {
      panelScope = panelScope.parentElement;
      panels = selectAll("[data-tab-panel]", panelScope);
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.dataset.tabButton;
        buttons.forEach((item) => item.setAttribute("aria-selected", item === button ? "true" : "false"));
        panels.forEach((panel) => {
          const isActive = panel.dataset.tabPanel === target;
          panel.dataset.active = isActive ? "true" : "false";
        });
      });
    });
  });
}

function initializeSegmentedControls() {
  selectAll("[data-segmented]").forEach((group) => {
    const buttons = selectAll("button", group);
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((item) => item.setAttribute("aria-pressed", item === button ? "true" : "false"));
        const targetSelector = group.dataset.segmentedTarget;
        const output = targetSelector ? document.querySelector(targetSelector) : null;
        if (output && button.dataset.segmentValue) {
          output.textContent = button.dataset.segmentValue;
        }
      });
    });
  });
}

function initializeLandingPersonaCards() {
  const cards = selectAll("[data-persona-card]");
  const detailName = document.querySelector("[data-persona-name]");
  const detailDigest = document.querySelector("[data-persona-digest]");
  const detailMode = document.querySelector("[data-persona-mode]");
  const detailLink = document.querySelector("[data-persona-link]");

  if (!cards.length || !detailName || !detailDigest || !detailMode || !detailLink) {
    return;
  }

  const updateDetails = (personaKey) => {
    const persona = PERSONA_COPY[personaKey];
    const card = cards.find((item) => item.dataset.personaCard === personaKey);
    if (!persona || !card) {
      return;
    }

    cards.forEach((item) => item.classList.toggle("is-active", item === card));
    detailName.textContent = persona.name;
    detailDigest.textContent = persona.digest;
    detailMode.textContent = persona.autonomy[1];
    detailLink.setAttribute("href", card.dataset.personaHref || "#");
  };

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => updateDetails(card.dataset.personaCard));
    card.addEventListener("focusin", () => updateDetails(card.dataset.personaCard));
    card.addEventListener("click", () => updateDetails(card.dataset.personaCard));
  });

  updateDetails(cards[0].dataset.personaCard);
}

function initializeOnboarding() {
  const flow = document.querySelector("[data-onboarding-flow]");
  if (!flow) {
    return;
  }

  const steps = selectAll("[data-step]", flow);
  const progressBar = document.querySelector("[data-progress-fill]");
  const progressLabel = document.querySelector("[data-progress-label]");
  const nextButton = document.querySelector("[data-next-step]");
  const prevButton = document.querySelector("[data-prev-step]");
  const completeButton = document.querySelector("[data-complete-onboarding]");
  const autonomyOutput = document.querySelector("[data-autonomy-output]");
  const autonomyRange = document.querySelector("[data-autonomy-range]");
  let currentIndex = 0;

  const setStep = (index) => {
    currentIndex = Math.max(0, Math.min(index, steps.length - 1));
    steps.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === currentIndex));
    const progress = ((currentIndex + 1) / steps.length) * 100;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
    if (progressLabel) {
      progressLabel.textContent = `Step ${currentIndex + 1} of ${steps.length}`;
    }
    if (prevButton) {
      prevButton.disabled = currentIndex === 0;
    }
    if (nextButton) {
      nextButton.hidden = currentIndex === steps.length - 1;
    }
    if (completeButton) {
      completeButton.hidden = currentIndex !== steps.length - 1;
    }
  };

  if (autonomyRange && autonomyOutput) {
    const updateAutonomy = () => {
      const personaKey = document.body.dataset.persona || "creator";
      const levels = PERSONA_COPY[personaKey]?.autonomy || PERSONA_COPY.creator.autonomy;
      autonomyOutput.textContent = levels[Math.min(Number(autonomyRange.value), levels.length - 1)];
    };
    autonomyRange.addEventListener("input", updateAutonomy);
    updateAutonomy();
  }

  selectAll("[data-step-target]").forEach((button) => {
    button.addEventListener("click", () => setStep(Number(button.dataset.stepTarget)));
  });

  if (prevButton) {
    prevButton.addEventListener("click", () => setStep(currentIndex - 1));
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => setStep(currentIndex + 1));
  }

  if (completeButton) {
    completeButton.addEventListener("click", () => {
      completeButton.textContent = "First run ready";
      completeButton.disabled = true;
    });
  }

  setStep(0);
}

function initializeDashboard() {
  const shell = document.querySelector("[data-dashboard]");
  if (!shell) {
    return;
  }

  const personaKey = document.body.dataset.persona || "creator";
  const autonomyRange = document.querySelector("[data-dashboard-autonomy]");
  const autonomyOutput = document.querySelector("[data-dashboard-autonomy-output]");
  const digestOutput = document.querySelector("[data-dashboard-digest]");
  const agentCards = selectAll("[data-agent-progress]");
  const pulseButton = document.querySelector("[data-run-cycle]");

  if (autonomyRange && autonomyOutput) {
    const updateAutonomy = () => {
      const levels = PERSONA_COPY[personaKey]?.autonomy || PERSONA_COPY.creator.autonomy;
      autonomyOutput.textContent = levels[Math.min(Number(autonomyRange.value), levels.length - 1)];
    };
    autonomyRange.addEventListener("input", updateAutonomy);
    updateAutonomy();
  }

  if (digestOutput) {
    digestOutput.textContent = PERSONA_COPY[personaKey]?.digest || PERSONA_COPY.creator.digest;
  }

  if (pulseButton) {
    pulseButton.addEventListener("click", () => {
      pulseButton.textContent = "Cycle running...";
      pulseButton.disabled = true;

      agentCards.forEach((card, index) => {
        const progress = card.querySelector("span");
        const currentValue = Number(card.dataset.agentProgress || 0);
        const nextValue = Math.min(currentValue + 6 + index * 2, 100);
        card.dataset.agentProgress = String(nextValue);
        if (progress) {
          progress.style.width = `${nextValue}%`;
        }
      });

      window.setTimeout(() => {
        pulseButton.textContent = "Run another cycle";
        pulseButton.disabled = false;
      }, 900);
    });
  }
}

function initializeYearStamp() {
  selectAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeThemeToggle();
  initializeTabs();
  initializeSegmentedControls();
  initializeLandingPersonaCards();
  initializeOnboarding();
  initializeDashboard();
  initializeYearStamp();
});
