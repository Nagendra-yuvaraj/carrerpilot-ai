// CareerPilot AI Application Logic

// ==========================================
// 1. GLOBAL APP STATE
// ==========================================
const userState = {
  name: "Guest Candidate",
  role: "AI Engineer",
  company: "OpenAI",
  education: "Self-taught Developer",
  skills: "Python, TensorFlow, React, TypeScript, SQL",
  experience: "Associate Engineer, 2 yrs",
  goals: "Land a role modeling real-world LLM frameworks and tooling.",
  xp: 450,
  level: 1,
  streak: 5,
  operationalMode: "cloud", // 'cloud' or 'standalone'
  sandboxUrl: "https://api.careerpilot.ai/sandbox",
  focusTargets: {
    resume: false,
    mock: false,
    tip: true
  },
  milestoneHistory: [
    // Pre-populate with a couple of logs to look natural
    { date: "2026-06-15 14:30", type: "Resume Check", role: "AI Engineer", score: 55 },
    { date: "2026-06-25 11:00", type: "Mock Interview", role: "Full Stack Developer", score: 70 }
  ]
};

// Career quotes for Daily Strategy tip generator
const careerTips = [
  "Always research the exact tech stack of your target firm using LinkedIn profiles of their current engineers before you enter the interview room.",
  "When answering behavioral questions, align your STAR narrative with the leadership principles of the company (e.g., Ownership at Amazon, Bias for Action at Netflix).",
  "Optimize your resume keywords for parser compliance, but keep spacing clean. Parsers hate complex two-column tables or header images.",
  "In system design interviews, always start with high-level constraints (DAU, QPS, Storage) before drawing database layers.",
  "Negotiating salary isn't a conflict; it's a collaborative problem-solving session. Never accept the first offer without requesting a review window.",
  "When writing cover letters, highlight a specific problem the team is facing and explain briefly how your specific background solves it.",
  "Don't just list Python or React on your resume. Link to a repository showing production-grade modular design, unit tests, and CI/CD actions.",
  "In coding interviews, talk through your trade-offs out loud. A correct solution explained poorly ranks lower than a sub-optimal one explained brilliantly."
];

// Roadmaps Predefined Database
const roadmapsDb = {
  "Frontend Development": {
    meta: "Master modern user interfaces, client-side rendering, and performance optimizations.",
    tiers: [
      { name: "Tier 1: Foundations & Responsive UI", items: ["HTML5 semantic structures & accessibility (a11y)", "CSS Grid/Flexbox layouts & responsive design", "Vanilla ES6+ JavaScript, DOM Manipulation, Fetch API"] },
      { name: "Tier 2: Reactive Frameworks & Tooling", items: ["React core hooks, component life cycles, and context routing", "TypeScript types, interfaces, and compiler setups", "CSS Frameworks: TailwindCSS vs CSS Modules"] },
      { name: "Tier 3: Staging & Performance Tuning", items: ["State management models (Zustand, Redux Toolkit)", "Next.js server-side rendering (SSR) & Static Generation", "Web Vitals analysis, bundle optimization, and CDN deploy"] }
    ],
    project: { title: "Project: Interactive Data Visualization Dashboard", desc: "Build a responsive Next.js application that fetches real-time REST API datasets, parses records into visual charts, manages active filters, and supports server-side export functionality." }
  },
  "Backend Development": {
    meta: "Construct modular APIs, database controllers, authentication, and secure servers.",
    tiers: [
      { name: "Tier 1: Server Basics & Scripting", items: ["Node.js event loop & runtime environment basics", "Building REST HTTP servers using Express or Fastify", "Relational database designs (PostgreSQL, MySQL)"] },
      { name: "Tier 2: Security & Authentication", items: ["JWT & OAuth2 session auth structures", "Object-Relational Mapping (Prisma, Sequelize)", "API validation, middlewares, and error handling layers"] },
      { name: "Tier 3: Distributed Architectures", items: ["Caching layers (Redis key-value configurations)", "Containerizing environments with Docker scripts", "Message queues (RabbitMQ, Kafka) for microservices"] }
    ],
    project: { title: "Project: Secure Distributed User API", desc: "Architect a Node.js microservice validating JWT parameters, querying pooled SQL DB entries, caching requests via Redis, and exposing documented OpenAPI definitions." }
  },
  "Full Stack Development": {
    meta: "Interactive 3-tier study roadmap, recommended projects, and milestones.",
    tiers: [
      { name: "Tier 1: Foundations & Core Architecture", items: ["HTML5, Semantic structure, CSS layout systems (Flexbox, Grid)", "Modern Vanilla JS (ES6+, asynchronous APIs, modules)", "Git version control, repositories, workflow management"] },
      { name: "Tier 2: Intermediate Framework Integration", items: ["React, state hooks, routers, styling integrations", "Node.js / Express backend servers, RESTful routing models", "Database design: SQL (PostgreSQL) vs NoSQL (MongoDB)"] },
      { name: "Tier 3: Advanced Optimization & Scaling", items: ["Production Deployments (Vercel, AWS Cloud)", "CI/CD Pipeline setups & secure container configurations (Docker)"] }
    ],
    project: { title: "Project: Full-Stack E-Commerce API Platform", desc: "Create a REST API backend with Express and PostgreSQL, write database seed scripts, construct a secure user session token model using JWT, and deploy with container staging variables." }
  },
  "Data Science & Analytics": {
    meta: "Analyze large-scale datasets, run statistical models, and build visual summaries.",
    tiers: [
      { name: "Tier 1: Scripting & Math Core", items: ["Python structures, Numpy, and Pandas library operations", "Linear algebra, probability, and descriptive statistics", "Data gathering: SQL queries and BeautifulSoup scrapers"] },
      { name: "Tier 2: Data Wrangling & Analysis", items: ["Data cleaning, missing records imputation, scaling", "Visualizations: Matplotlib, Seaborn, and Tableau integrations", "Exploratory Data Analysis (EDA) report templates"] },
      { name: "Tier 3: Machine Learning & Modeling", items: ["Supervised ML: Regressions, Decision Trees, Random Forests", "Unsupervised clustering (K-Means, PCA dimensional reduction)", "Deploying models via Flask or Streamlit web endpoints"] }
    ],
    project: { title: "Project: Predictive Analytics Market Dashboard", desc: "Develop a Jupyter/Streamlit application performing ETL pipelines on housing dataset records, fitting predictive random forests, and plotting localized sales demand maps." }
  },
  "AI/ML Engineering": {
    meta: "Train neural networks, implement transformer architectures, and deploy LLMs.",
    tiers: [
      { name: "Tier 1: Mathematical Foundations & PyTorch", items: ["Calculus, gradients, backpropagation mechanics", "PyTorch tensor operations, custom dataset models", "Fitting Feedforward and Convolutional Neural Networks"] },
      { name: "Tier 2: NLP & Large Language Models", items: ["Sequence models: RNNs, LSTMs, Attention mechanisms", "Transformer architectures (Self-Attention, Multi-Head)", "HuggingFace API, tokenizer pipelines, pipeline parameters"] },
      { name: "Tier 3: AI in Production & Finetuning", items: ["LoRA / QLoRA parameter efficient finetuning techniques", "Vector Databases (Pinecone, ChromaDB) & RAG setup", "Deploying models with vLLM, Triton, or ONNX runtimes"] }
    ],
    project: { title: "Project: Custom PDF RAG Assistant", desc: "Design a pipeline that ingests custom PDFs, splits segments, embeds chunks using HuggingFace models, stores indices in Pinecone, and replies to user prompts using a localized LLM context framework." }
  },
  "Cybersecurity": {
    meta: "Secure systems, analyze vulnerabilities, and construct defensive perimeters.",
    tiers: [
      { name: "Tier 1: Networking & System Basics", items: ["TCP/IP stack, routing protocols, ports, DNS maps", "Linux OS administration, bash scripting, file permissions", "Cryptographic essentials: Hashing, Symmetric vs Asymmetric"] },
      { name: "Tier 2: Security Assessment & Offense", items: ["Vulnerability scanning using Nmap and Nessus utilities", "Penetration testing methodologies and OWASP Top 10 exploits", "Wireless security analysis and packet sniffing (Wireshark)"] },
      { name: "Tier 3: Defense, Auditing & SIEM", items: ["Firewall rule configurations and Intrusion Detection (IDS)", "Setting up SIEM logs (Splunk, Elastic Stack) monitoring", "Incident response strategies, disaster recovery design blueprints"] }
    ],
    project: { title: "Project: Penetration Audit & Firewall Setup", desc: "Configure a sandbox system containing mock vulnerabilities, execute localized scanning/exploitations, log actions on a SIEM dashboard, and draft remediation firewall script configs." }
  },
  "DevOps Engineering": {
    meta: "Automate build/deploy pipelines, orchestrate servers, and optimize cloud scale.",
    tiers: [
      { name: "Tier 1: OS, Shell & VM Automation", items: ["Advanced Linux scripting (Bash, Python automated tasks)", "Virtualization mechanisms and Docker container structures", "Infrastructure provisioning basics (Terraform scripts)"] },
      { name: "Tier 2: CI/CD Pipelines & Configs", items: ["GitHub Actions, GitLab CI, or Jenkins build controllers", "Configuration management templates (Ansible playbooks)", "Kubernetes basics: Pods, Services, Ingress controllers"] },
      { name: "Tier 3: Observability & Cloud Operations", items: ["Prometheus, Grafana server metric plotting setups", "Cloud architecture orchestration (AWS, GCP, or Azure)", "Auto-scaling groups, load balancing, zero-downtime rolling deploys"] }
    ],
    project: { title: "Project: Multi-Stage GitOps Staging Pipeline", desc: "Configure a Git repository executing container build actions on commit, pushing tags to DockerHub, provisioning VPC clusters via Terraform, and running rolling deployments in staging." }
  },
  "UI/UX Design": {
    meta: "Design modern user interfaces, outline wireframes, and test user personas.",
    tiers: [
      { name: "Tier 1: Design Core & Layout Principles", items: ["Typography hierarchies, color theories, spacing grids", "User Research: creating user personas and empathy mapping", "Information architecture (IA) structuring & sitemaps"] },
      { name: "Tier 2: Wireframing & Figma Prototypes", items: ["Low-fidelity wireframing & conceptual layout sketching", "Figma design systems: components, auto-layouts, variants", "Creating clickable high-fidelity interactive flow prototypes"] },
      { name: "Tier 3: Testing & Hand-off Specifications", items: ["Conducting usability testing sessions & analysis logs", "Design systems documentation & redline design handoffs", "Analyzing interface heatmaps, scroll rates, conversion UI elements"] }
    ],
    project: { title: "Project: Responsive FinTech App Design System", desc: "Construct a comprehensive Figma design system featuring auto-layout buttons, dialog containers, form grids, prototyping complete login-to-dashboard user flows, and conducting audit tests." }
  }
};

// ==========================================
// 2. BOOTSTRAP / INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  initAppState();
  injectViewHeaders();
  setupLogin();
  setupInlineEditing();
  setupDashboardTip();
  setupFocusChecklist();
  setupResumeAnalyser();
  setupMockInterview();
  setupCareerCoach();
  setupSkillsMatrix();
  setupRoadmaps();
  setupMatchLetters();
  setupAssessmentsSalary();
  setupMyProfile();
  setupAdminDesk();
  
  // Render initial charts
  drawSVGCharts();
  
  // Add initial system logs
  logAdminEvent("sys", "CareerPilot AI Engine booted successfully.");
  logAdminEvent("sys", "Developer API Sandbox listening on local context.");
  logAdminEvent("api", "Fetched user state records for candidate guest@careerpilot.ai.");
});

// ==========================================
// 3. NAVIGATION / ROUTING SYSTEM
// ==========================================
function setupNavigation() {
  const menuItems = document.querySelectorAll(".sidebar-menu .menu-item");
  const panels = document.querySelectorAll(".workspace-content .view-panel");

  function switchTab(viewName) {
    // Remove active class from buttons & sections
    menuItems.forEach(item => item.classList.remove("active"));
    panels.forEach(panel => panel.classList.remove("active"));

    // Find and activate target menu item
    const targetMenuItem = Array.from(menuItems).find(item => item.getAttribute("data-view") === viewName);
    if (targetMenuItem) targetMenuItem.classList.add("active");

    // Find and activate target panel
    const targetPanel = document.getElementById(`view-${viewName}`);
    if (targetPanel) {
      targetPanel.classList.add("active");
      
      // Trigger SVG re-renders to adjust for container sizes
      if (viewName === "progress-history" || viewName === "admin-desk") {
        setTimeout(drawSVGCharts, 100);
      }
    }
    
    logAdminEvent("sys", `Routed active workspace viewport to: /${viewName}`);
  }

  menuItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const viewName = item.getAttribute("data-view");
      switchTab(viewName);
    });
  });

  // Handle in-app internal navigation links (e.g. "Optimize Resume >")
  document.addEventListener("click", (e) => {
    const targetLink = e.target.closest("[data-link]");
    if (targetLink) {
      e.preventDefault();
      const linkView = targetLink.getAttribute("data-link");
      switchTab(linkView);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
  
  // Global reference to routing for code accessibility
  window.navigateToView = switchTab;
}

// ==========================================
// 4. SYNCHRONIZE STATE & UI
// ==========================================
function initAppState() {
  updateUIFromState();
}

function injectViewHeaders() {
  const viewsToHeader = {
    "resume-analyser": "AI Resume Analyser",
    "mock-interview": "AI Mock Interview Simulator",
    "career-coach": "Career Pilot AI Coach",
    "skills-matrix": "Skills Alignment Matrix",
    "roadmaps": "Learning Roadmaps Track",
    "match-letters": "Job Match & Cover Letters",
    "progress-history": "Progress & Milestone History",
    "assessments-salary": "Assessments & Salary Predictor"
  };

  for (const [viewId, title] of Object.entries(viewsToHeader)) {
    const panel = document.getElementById(`view-${viewId}`);
    if (panel) {
      // Create header bar element
      const headerBar = document.createElement("div");
      headerBar.className = "view-header-bar";
      headerBar.innerHTML = `
        <h1 class="view-header-title">${title}</h1>
        <div class="view-header-stats">
          <span class="header-stat-pill rank">Lvl 1 Pilot</span>
          <span class="header-stat-pill streak">🔥 <span class="streak-display">5</span> Day Streak</span>
          <img class="header-avatar sidebar-avatar-display" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face" alt="User Avatar">
        </div>
      `;
      // Prepend to panel
      panel.insertBefore(headerBar, panel.firstChild);
    }
  }
}

function updateUIFromState() {
  // Sync name displays
  document.querySelectorAll(".username-display").forEach(el => el.textContent = userState.name);
  document.querySelectorAll(".sidebar-username-display").forEach(el => el.textContent = userState.name);
  
  // Sync target role/company displays
  document.querySelectorAll(".target-role-display").forEach(el => el.textContent = userState.role);
  document.querySelectorAll(".target-company-display").forEach(el => el.textContent = userState.company);
  
  // Sync stats figures
  document.querySelectorAll(".xp-display").forEach(el => el.textContent = userState.xp);
  document.querySelectorAll(".streak-display").forEach(el => el.textContent = userState.streak);
  document.querySelectorAll(".level-display").forEach(el => el.textContent = `Lvl ${userState.level}`);

  // Sync checkboxes
  const focusResume = document.getElementById("chk-focus-resume");
  const focusMock = document.getElementById("chk-focus-mock");
  const focusTip = document.getElementById("chk-focus-tip");
  
  if (focusResume) focusResume.checked = userState.focusTargets.resume;
  if (focusMock) focusMock.checked = userState.focusTargets.mock;
  if (focusTip) focusTip.checked = userState.focusTargets.tip;

  // Toggle checked class in parent elements
  [focusResume, focusMock, focusTip].forEach(chk => {
    if (chk) {
      const parent = chk.closest(".checkbox-item");
      if (chk.checked) {
        parent.classList.add("checked");
      } else {
        parent.classList.remove("checked");
      }
    }
  });

  // Calculate focus progress fraction & fill
  const total = 3;
  let checkedCount = 0;
  if (userState.focusTargets.resume) checkedCount++;
  if (userState.focusTargets.mock) checkedCount++;
  if (userState.focusTargets.tip) checkedCount++;

  const progressFraction = document.getElementById("dashboard-progress-fraction");
  const progressFill = document.getElementById("dashboard-progress-fill");
  
  if (progressFraction) progressFraction.textContent = `${checkedCount}/${total}`;
  if (progressFill) progressFill.style.width = `${(checkedCount / total) * 100}%`;

  // Render Milestone Logs Table in History Tab
  renderMilestoneTable();
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast-notification");
  const msgEl = document.getElementById("toast-message");
  if (!toast) return;

  msgEl.textContent = message;
  toast.style.display = "flex";

  // Customize color theme
  if (type === "success") {
    toast.style.borderColor = "var(--accent-teal)";
    toast.querySelector("svg").style.color = "var(--accent-teal)";
  } else {
    toast.style.borderColor = "var(--accent-indigo)";
    toast.querySelector("svg").style.color = "var(--accent-indigo)";
  }

  setTimeout(() => {
    toast.style.display = "none";
  }, 4000);
}

function awardXP(points, activityName) {
  userState.xp += points;
  showToast(`+${points} XP: ${activityName}!`);
  
  // Level up mechanic (Every 600 XP levels up)
  const computedLevel = Math.floor(userState.xp / 600) + 1;
  if (computedLevel > userState.level) {
    userState.level = computedLevel;
    setTimeout(() => {
      showToast(`🎉 Level Up! You are now Level ${userState.level}!`, "success");
      logAdminEvent("sys", `User candidate guest@careerpilot.ai advanced to level ${userState.level}`);
    }, 1500);
  }
  
  updateUIFromState();
}

// ==========================================
// 5. DASHBOARD FUNCTIONALITIES
// ==========================================
function setupDashboardTip() {
  const quoteEl = document.getElementById("dashboard-daily-quote");
  const btnTip = document.getElementById("btn-dashboard-gpt-tip");

  if (!btnTip || !quoteEl) return;

  btnTip.addEventListener("click", () => {
    // Pick random tip different from current
    let newTip = careerTips[Math.floor(Math.random() * careerTips.length)];
    while (`"${newTip}"` === quoteEl.textContent) {
      newTip = careerTips[Math.floor(Math.random() * careerTips.length)];
    }

    btnTip.disabled = true;
    logAdminEvent("api", "POST /v1/chat/completions requested for DailyTip");

    // Text typing simulation effect
    quoteEl.textContent = "";
    quoteEl.style.borderRight = "2px solid var(--accent-purple)";
    let i = 0;
    const txt = `"${newTip}"`;
    
    function typeWriter() {
      if (i < txt.length) {
        quoteEl.textContent += txt.charAt(i);
        i++;
        setTimeout(typeWriter, 12);
      } else {
        quoteEl.style.borderRight = "none";
        btnTip.disabled = false;
        logAdminEvent("sys", "Rendered new Daily Strategy quote guidelines.");
      }
    }
    typeWriter();
  });
}

function setupFocusChecklist() {
  const checklist = document.getElementById("dashboard-checklist");
  if (!checklist) return;

  checklist.addEventListener("change", (e) => {
    const chk = e.target;
    if (!chk) return;

    const id = chk.id;
    const isChecked = chk.checked;
    
    let activityName = "";
    let xpAward = 25;

    // Check which checkbox was toggled
    if (id === "chk-focus-resume") {
      userState.focusTargets.resume = isChecked;
      activityName = isChecked ? "Checked Resume Audit" : "Deselected Resume Audit";
    } else if (id === "chk-focus-mock") {
      userState.focusTargets.mock = isChecked;
      activityName = isChecked ? "Completed Mock Target" : "Deselected Mock Target";
    } else if (id === "chk-focus-tip") {
      userState.focusTargets.tip = isChecked;
      activityName = isChecked ? "Read Career Challenge tip" : "Deselected Career tip";
    }

    // Award small XP on checking, subtract on unchecking
    if (isChecked) {
      awardXP(xpAward, activityName);
    } else {
      userState.xp = Math.max(0, userState.xp - xpAward);
      updateUIFromState();
    }

    // Check if user completed 3/3 target
    let checkedCount = 0;
    if (userState.focusTargets.resume) checkedCount++;
    if (userState.focusTargets.mock) checkedCount++;
    if (userState.focusTargets.tip) checkedCount++;

    if (checkedCount === 3 && isChecked) {
      setTimeout(() => {
        awardXP(150, "Completed all Today's Focus targets! Weekly bonus");
        logAdminEvent("sys", "User satisfied focus checklist goal requirements.");
      }, 1000);
    }
  });
}

// ==========================================
// 6. RESUME ANALYSER
// ==========================================
function setupResumeAnalyser() {
  const btnVerify = document.getElementById("btn-resume-verify");
  const loader = document.getElementById("resume-loading");
  const emptyState = document.getElementById("resume-empty-state");
  const resultContent = document.getElementById("resume-result-content");
  
  const resumeTextarea = document.getElementById("resume-paste-text");
  const roleInput = document.getElementById("resume-target-role");

  // Tab views
  const btnTabAnalyzer = document.getElementById("btn-tab-analyzer");
  const btnTabBuilder = document.getElementById("btn-tab-builder");
  const subviewAnalyzer = document.getElementById("subview-analyzer");
  const subviewBuilder = document.getElementById("subview-builder");

  if (btnTabAnalyzer && btnTabBuilder) {
    btnTabAnalyzer.addEventListener("click", () => {
      btnTabAnalyzer.classList.add("active");
      btnTabBuilder.classList.remove("active");
      subviewAnalyzer.classList.remove("hidden");
      subviewBuilder.classList.add("hidden");
    });

    btnTabBuilder.addEventListener("click", () => {
      btnTabBuilder.classList.add("active");
      btnTabAnalyzer.classList.remove("active");
      subviewBuilder.classList.remove("hidden");
      subviewAnalyzer.classList.add("hidden");
    });
  }

  // Handle resume analyzer builder demo
  const btnBuildDemo = document.getElementById("btn-build-resume-demo");
  if (btnBuildDemo) {
    btnBuildDemo.addEventListener("click", () => {
      showToast("Generating standard LaTeX resume template...");
      logAdminEvent("api", "POST /v1/resume/templates generated");
      setTimeout(() => {
        showToast("Resume compiled! Saved in Downloads directory (Simulated).", "success");
      }, 1500);
    });
  }

  if (!btnVerify || !loader || !emptyState || !resultContent) return;

  btnVerify.addEventListener("click", () => {
    const resumeText = resumeTextarea.value.trim();
    const targetRole = roleInput.value.trim() || "AI Engineer";

    if (!resumeText) {
      alert("Please paste your resume text details to proceed.");
      return;
    }

    // Show Loader
    loader.style.display = "flex";
    resultContent.classList.add("hidden");
    emptyState.classList.add("hidden");
    
    logAdminEvent("api", `POST /v1/resume/analyze TargetRole: "${targetRole}"`);

    // Simulate 2 seconds API delay
    setTimeout(() => {
      loader.style.display = "none";
      resultContent.classList.remove("hidden");
      
      // Calculate realistic score
      // Base score is length dependent, plus random factor
      let base = 60;
      if (resumeText.length > 500) base += 10;
      if (resumeText.toLowerCase().includes("python")) base += 5;
      if (resumeText.toLowerCase().includes("pytorch")) base += 5;
      const finalScore = Math.min(95, base + Math.floor(Math.random() * 15));

      // Update Dashboard Metric & State
      userState.xp += 40;
      document.querySelectorAll(".ats-rating-display").forEach(el => el.textContent = finalScore);
      
      // Add milestone log
      const dateStr = new Date().toISOString().slice(0,16).replace("T", " ");
      userState.milestoneHistory.push({
        date: dateStr,
        type: "Resume Check",
        role: targetRole,
        score: finalScore
      });

      // Award checklist progress
      userState.focusTargets.resume = true;
      awardXP(40, "Resume ATS Scanned successfully");
      
      // Render radial progress
      const circleFill = document.getElementById("resume-progress-circle");
      const scoreText = document.getElementById("resume-progress-text");
      if (circleFill && scoreText) {
        scoreText.textContent = `${finalScore}%`;
        const circumference = 2 * Math.PI * 36; // ~226
        const offset = circumference - (circumference * finalScore / 100);
        circleFill.style.strokeDashoffset = offset;
      }

      // Populate gaps dynamically
      const gapContainer = document.getElementById("resume-keyword-gaps");
      const tipsContainer = document.getElementById("resume-optimization-tips");
      if (gapContainer && tipsContainer) {
        gapContainer.innerHTML = "";
        tipsContainer.innerHTML = "";
        
        let gaps = ["Docker / Containerization", "Kubernetes configs", "Microservices Design"];
        if (targetRole.toLowerCase().includes("ai") || targetRole.toLowerCase().includes("machine")) {
          gaps = ["PyTorch Deep Learning", "Large Language Model tuning", "Vector Store indices (Pinecone)"];
        } else if (targetRole.toLowerCase().includes("front")) {
          gaps = ["Next.js App router styling", "TailwindCSS components styling", "State engines (Redux / Zustand)"];
        }

        gaps.forEach(gap => {
          const tag = document.createElement("span");
          tag.className = "gap-keyword";
          tag.textContent = gap;
          gapContainer.appendChild(tag);
        });

        // Tip list
        const tips = [
          `Quantify bullet points with metrics (e.g., 'orchestrated REST models, improving API query latency by 32%').`,
          `Include direct keywords: '${gaps[0]}' to satisfy parser filters.`,
          `Formatting: Avoid tables or decorative SVGs within structural details.`
        ];

        tips.forEach((tip, idx) => {
          const bullet = document.createElement("div");
          bullet.className = "bullet-item";
          
          const iconColor = idx === 0 ? "text-accent-orange" : "text-accent-teal";
          const iconSvg = idx === 0 
            ? `<svg class="${iconColor}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
            : `<svg class="${iconColor}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
          
          bullet.innerHTML = `${iconSvg} <span>${tip}</span>`;
          tipsContainer.appendChild(bullet);
        });
      }

      logAdminEvent("sys", `Finished resume scan parser. ATS alignment matches target role: "${targetRole}" with score ${finalScore}%`);
      drawSVGCharts(); // Update progression chart
    }, 2000);
  });
}

// ==========================================
// 7. MOCK INTERVIEW SIMULATOR
// ==========================================
function setupMockInterview() {
  const btnBoot = document.getElementById("btn-boot-mock");
  const setupPane = document.getElementById("mock-setup-pane");
  const arenaPane = document.getElementById("mock-arena-pane");
  const btnExit = document.getElementById("btn-exit-mock");

  const diffButtons = document.querySelectorAll("#mock-difficulty .segment-btn");
  const voiceToggle = document.getElementById("btn-toggle-voice");
  const voiceStatus = document.getElementById("voice-mode-status");

  // Arena items
  const qIndexEl = document.getElementById("arena-q-index");
  const qTextEl = document.getElementById("arena-question-text");
  const answerInput = document.getElementById("arena-answer-input");
  const btnSubmit = document.getElementById("btn-submit-answer");
  const btnSimulateVoice = document.getElementById("btn-simulate-voice-input");
  const arenaLoader = document.getElementById("arena-loading");
  const arenaFeedback = document.getElementById("arena-feedback-block");

  // Feedback components
  const feedbackScoreCircle = document.getElementById("arena-feedback-circle");
  const feedbackScoreText = document.getElementById("arena-feedback-score");
  const feedbackJudgment = document.getElementById("arena-feedback-judgment");
  const feedbackModelAnswer = document.getElementById("arena-model-answer");
  const btnNextQ = document.getElementById("btn-next-question");

  let mockDifficulty = "Intermediate";
  let isVoiceMode = false;

  let interviewQuestions = [];
  let currentQIndex = 0;
  let interviewScores = [];

  // Difficulty segmented selector
  diffButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      diffButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      mockDifficulty = btn.getAttribute("data-level");
      logAdminEvent("sys", `Adjusted mock difficulty setting target to: ${mockDifficulty}`);
    });
  });

  // Voice toggle
  if (voiceToggle && voiceStatus) {
    voiceToggle.addEventListener("click", () => {
      isVoiceMode = !isVoiceMode;
      voiceStatus.textContent = isVoiceMode ? "Voice Activated" : "Text Only";
      voiceStatus.className = isVoiceMode ? "btn-primary" : "btn-secondary";
      
      const speakTip = document.getElementById("speak-tip");
      if (speakTip) {
        speakTip.textContent = isVoiceMode ? "Press 'Simulate Speech' to record answers" : "Type response below";
      }
      
      logAdminEvent("sys", `Toggled audio voice interface parameters. Active state: ${isVoiceMode}`);
    });
  }

  // Question database maps
  const mockQuestionsMap = {
    "AI Engineer": [
      { q: "Explain the difference between a Transformer's self-attention and cross-attention, and how you would optimize context length in a custom LLM model.", model: "Self-attention correlates different positions of a single sequence to compute a representation of the sequence, whereas cross-attention connects two different sequences (like in encoder-decoder frameworks). To optimize context length, you can leverage FlashAttention (to avoid quadratic memory complexity), RoPE (Rotary Position Embeddings) for extrapolation, and kv-caching to accelerate decoders." },
      { q: "How do you handle gradient explosion or vanishing gradient behaviors when training deep residual neural networks?", model: "Common remedies include initializing weights properly (e.g., He or Xavier initializers), applying Batch Normalization layers to normalize weights between layers, implementing residual skip connections to allow gradient flows, and utilizing gradient clipping during backwards propagation passes." },
      { q: "Describe how Retrieval Augmented Generation (RAG) works, and how you would design a retrieval model to handle high-concurrency database queries.", model: "RAG works by indexing documents into dense vectors, retrieving relevant vectors on user queries, inserting them as LLM prompt context, and executing generations. To handle high concurrency, implement caching layers (Redis), design cluster indexes in vector DBs, and leverage asynchronous pipelines." }
    ],
    "default": [
      { q: "What is your approach to handling database query optimizations when latency spikes to unacceptable levels in production?", model: "Analyze query execution plans (using EXPLAIN), verify indices map correctly to filters, implement database caching layers (Redis), pool database connections, and if read volume is high, scale out with read-replicas." },
      { q: "Explain how you would design a scalable rate-limiting service to prevent API spam attacks across multiple localized container endpoints.", model: "Use Token Bucket or Leaky Bucket algorithm paradigms, storing connection counts in Redis with expiring keys to support fast lookup. Set a gateway middleware intercepting requests before reaching servers." },
      { q: "Describe a complex technical challenge you faced recently. How did you identify the bottleneck, and what trade-offs did you make?", model: "Answer using STAR method: Situation (latency spike), Task (debug microservice dependencies), Action (traced network calls using APM logs), and Result (cached data nodes, improving response rates by 40% at cost of minor cache lag)." }
    ]
  };

  if (!btnBoot || !setupPane || !arenaPane || !btnExit) return;

  // Boot Mock Interview Click
  btnBoot.addEventListener("click", () => {
    const selectedRole = document.getElementById("mock-role").value;
    const selectedCategory = document.getElementById("mock-category").value;
    
    // Choose questions
    interviewQuestions = mockQuestionsMap[selectedRole] || mockQuestionsMap["default"];
    currentQIndex = 0;
    interviewScores = [];

    // Switch panels
    setupPane.classList.add("hidden");
    arenaPane.classList.remove("active", "hidden");
    arenaPane.offsetHeight; // force reflow
    arenaPane.classList.add("active");

    document.getElementById("arena-badge-category").textContent = selectedCategory.split(" ")[0];
    
    loadArenaQuestion();
    logAdminEvent("api", `POST /v1/interview/sessions TargetRole: "${selectedRole}" Diff: "${mockDifficulty}"`);
  });

  function loadArenaQuestion() {
    qIndexEl.textContent = `Question ${currentQIndex + 1} of ${interviewQuestions.length}`;
    qTextEl.textContent = interviewQuestions[currentQIndex].q;
    answerInput.value = "";
    arenaFeedback.classList.add("hidden");
    btnSubmit.disabled = false;
    btnSimulateVoice.disabled = false;
  }

  // Simulate Speech Button Click
  if (btnSimulateVoice) {
    btnSimulateVoice.addEventListener("click", () => {
      // Pre-fill realistic answer based on role
      const selectedRole = document.getElementById("mock-role").value;
      if (currentQIndex === 0 && selectedRole === "AI Engineer") {
        answerInput.value = "Transformers use self-attention to relate tokens in the same sequence. Cross attention aligns elements between two different inputs. To extend context limits, I would implement FlashAttention memory reduction, use RoPE embeddings, and optimize key-value memory caching on servers.";
      } else {
        answerInput.value = "In order to resolve database constraints and performance queries, I would profile latency pipelines, index necessary field parameters, cache hot results with Redis buffers, and scale read-replicas across secondary networks.";
      }
      showToast("Speech recognized & transcribed!", "success");
      logAdminEvent("sys", "Transcribed voice audio payload into textarea stream.");
    });
  }

  // Submit Answer
  btnSubmit.addEventListener("click", () => {
    const ans = answerInput.value.trim();
    if (!ans) {
      alert("Please compose a response before submitting.");
      return;
    }

    // Loader overlay
    arenaLoader.style.display = "flex";
    btnSubmit.disabled = true;
    btnSimulateVoice.disabled = true;
    
    logAdminEvent("api", `POST /v1/interview/evaluate AnswerLength: ${ans.length}`);

    // Simulate analysis delay
    setTimeout(() => {
      arenaLoader.style.display = "none";
      arenaFeedback.classList.remove("hidden");

      // Score logic: checks for technical density keywords
      let score = 70;
      if (ans.toLowerCase().includes("attention") || ans.toLowerCase().includes("index") || ans.toLowerCase().includes("cache")) score += 10;
      if (ans.toLowerCase().includes("flashattention") || ans.toLowerCase().includes("redis") || ans.toLowerCase().includes("lora")) score += 8;
      if (ans.length > 100) score += 5;
      score = Math.min(98, score);
      
      interviewScores.push(score);

      // Render circle progress feedback
      feedbackScoreText.textContent = `${score}%`;
      const circumference = 2 * Math.PI * 36;
      const offset = circumference - (circumference * score / 100);
      feedbackScoreCircle.style.strokeDashoffset = offset;

      // Adjust judgement label
      if (score >= 90) {
        feedbackJudgment.textContent = "Excellent! Expert-level understanding, precise metrics, and accurate terminology.";
      } else if (score >= 80) {
        feedbackJudgment.textContent = "Very Good. Solid tech stack description. Try adding quantitative metrics to outcomes.";
      } else {
        feedbackJudgment.textContent = "Good framework alignment, but missing some key scaling trade-offs. Review reference.";
      }

      feedbackModelAnswer.textContent = interviewQuestions[currentQIndex].model;

      // Update button text on last question
      if (currentQIndex === interviewQuestions.length - 1) {
        btnNextQ.textContent = "Finish Session";
      } else {
        btnNextQ.textContent = "Next Question >";
      }
    }, 1800);
  });

  // Next Question Button Click
  btnNextQ.addEventListener("click", () => {
    if (currentQIndex < interviewQuestions.length - 1) {
      currentQIndex++;
      loadArenaQuestion();
    } else {
      // Completed interview session!
      const totalScore = Math.round(interviewScores.reduce((a,b)=>a+b, 0) / interviewScores.length);
      
      // Update state parameters
      userState.xp += 100;
      document.querySelectorAll(".interview-readiness-display").forEach(el => el.textContent = totalScore);
      
      // Unlock Under Fire badge
      const badgeUnderFire = document.getElementById("badge-under-fire");
      if (badgeUnderFire) {
        badgeUnderFire.classList.remove("locked");
        badgeUnderFire.classList.add("unlocked");
      }

      // Add to milestones log
      const dateStr = new Date().toISOString().slice(0,16).replace("T", " ");
      userState.milestoneHistory.push({
        date: dateStr,
        type: "Mock Interview",
        role: document.getElementById("mock-role").value,
        score: totalScore
      });

      // Tick target checklist
      userState.focusTargets.mock = true;
      awardXP(100, "Completed full AI Mock Interview Session!");

      logAdminEvent("sys", `Finished Mock Interview session. Accumulated average readiness level: ${totalScore}%`);

      // Switch views
      arenaPane.classList.add("hidden");
      setupPane.classList.remove("hidden");
      drawSVGCharts(); // Update line chart
    }
  });

  btnExit.addEventListener("click", () => {
    if (confirm("Are you sure you want to exit the current practice session? Progress will be lost.")) {
      arenaPane.classList.add("hidden");
      setupPane.classList.remove("hidden");
      logAdminEvent("sys", "User terminated active mock interview session.");
    }
  });
}

// ==========================================
// 8. CAREER COACH
// ==========================================
function setupCareerCoach() {
  const messagesBox = document.getElementById("chat-messages-box");
  const chatInput = document.getElementById("chat-message-input");
  const btnSend = document.getElementById("btn-chat-send");
  const suggestionsPane = document.getElementById("chat-suggestions-pane");
  const btnNewConsult = document.getElementById("btn-new-chat");

  if (!messagesBox || !chatInput || !btnSend || !suggestionsPane) return;

  // Suggested questions tags click
  document.querySelectorAll(".suggestion-tag").forEach(btn => {
    btn.addEventListener("click", () => {
      const q = btn.getAttribute("data-q");
      chatInput.value = q;
      sendMessage();
    });
  });

  btnSend.addEventListener("click", sendMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // Start new consult session
  btnNewConsult.addEventListener("click", () => {
    messagesBox.innerHTML = `
      <div class="message-bubble assistant">
        <div class="bubble-content">
          Hello! I am CareerPilot AI, your elite personal career guide. I have reviewed your profile targeting <strong class="target-role-display">${userState.role}</strong> at <strong class="target-company-display">${userState.company}</strong>. Ask me anything about career switching, resume tailoring, skills, salary negotiation, or career roadmaps!
        </div>
        <div class="bubble-meta">Coach • Just Now</div>
      </div>
    `;
    suggestionsPane.classList.remove("hidden");
    logAdminEvent("sys", "Created new career coach conversation context.");
  });

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Append user bubble
    appendBubble("user", text);
    chatInput.value = "";
    suggestionsPane.classList.add("hidden");

    // Scroll
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // Show coach is typing (simulate lag)
    const typingBubble = document.createElement("div");
    typingBubble.className = "message-bubble assistant";
    typingBubble.innerHTML = `
      <div class="bubble-content" style="color: var(--text-muted);">CareerPilot Coach is composing response...</div>
    `;
    messagesBox.appendChild(typingBubble);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    logAdminEvent("api", `POST /v1/chat/completions UserQuery: "${text.substring(0,25)}..."`);

    setTimeout(() => {
      // Remove typing bubble
      messagesBox.removeChild(typingBubble);

      // Generate response based on semantic triggers
      let responseText = "That's an interesting question. Building competitive skills and framing quantitative project outcomes is key. Could you elaborate on your experience levels?";
      
      const q = text.toLowerCase();
      if (q.includes("skill") || q.includes("missing")) {
        responseText = `Based on your profile, to transition into **AI Engineering** at **OpenAI**, you must bridge these core gaps:\n1. **PyTorch Foundations**: Deep understanding of customized tensors and custom training loops.\n2. **Large Language Models**: Experience writing fine-tuning routines (QLoRA) and prompt chaining scripts.\n3. **Retrieval Architectures**: Building vector embedding index stores (Pinecone/ChromaDB).\nLet's start drafting a skills roadmap!`;
      } else if (q.includes("negotiate") || q.includes("salary")) {
        responseText = `To negotiate a competitive salary package at a top firm:\n1. **Secure leverage**: Try to align multiple parallel pipeline interview streams.\n2. **Communicate ranges accurately**: Let them say the figure first, or specify: *'Based on current market valuations, I align with a base salary of $175,000 to $210,000, depending on equity levels.'*\n3. **Focus on overall compensation**: Balance base rates, sign-on buffers, and long-term equity vests.`;
      } else if (q.includes("star") || q.includes("method")) {
        responseText = `The **STAR Method** structure keeps responses clean:\n- **Situation**: Define context. (e.g. *'During backend latency spikes...'*)\n- **Task**: Define goals. (e.g. *'I was tasked with bringing load levels back below 500ms...'*)\n- **Action**: Outline your work. (e.g. *'I optimized slow DB query configurations and indexed pools...'*)\n- **Result**: State metric outcomes. (e.g. *'This decreased user load times by 40%.'*)\nAlways specify numeric metrics!`;
      } else if (q.includes("transition") || q.includes("engineering")) {
        responseText = `Transitioning into AI Engineering requires a strong project showcase:\n1. **Deploy API applications**: Publish endpoints utilizing open LLMs and custom embedding nodes.\n2. **Contribute to Open Source**: Write enhancements for models, agents, or pipeline loaders.\n3. **Tailor credentials**: Reposition general software roles to highlight data processing, API pipelines, or database optimization loops.`;
      }

      appendBubble("assistant", responseText);
      messagesBox.scrollTop = messagesBox.scrollHeight;
      logAdminEvent("sys", "Generated streaming assistant response bubble.");
    }, 1500);
  }

  function appendBubble(sender, text) {
    const bubble = document.createElement("div");
    bubble.className = `message-bubble ${sender}`;
    
    // Parse simple markdown-like double stars and line breaks
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    bubble.innerHTML = `
      <div class="bubble-content">${formattedText}</div>
      <div class="bubble-meta">${sender === 'user' ? 'You' : 'Coach'} • ${time}</div>
    `;
    messagesBox.appendChild(bubble);
  }
}

// ==========================================
// 9. SKILLS MATRIX
// ==========================================
function setupSkillsMatrix() {
  const btnCompare = document.getElementById("btn-skills-compare");
  const loader = document.getElementById("skills-loading");
  const emptyState = document.getElementById("skills-empty-state");
  const resultContent = document.getElementById("skills-result-content");

  if (!btnCompare || !loader || !emptyState || !resultContent) return;

  btnCompare.addEventListener("click", () => {
    const company = document.getElementById("skills-target-company").value.trim() || "OpenAI";
    const role = document.getElementById("skills-target-role").value.trim() || "AI Engineer";
    const skillsText = document.getElementById("skills-user-list").value.trim();

    if (!skillsText) {
      alert("Please provide some skills to perform comparisons.");
      return;
    }

    loader.style.display = "flex";
    emptyState.classList.add("hidden");
    resultContent.classList.add("hidden");

    logAdminEvent("api", `POST /v1/skills/matrix TargetRole: "${role}"`);

    setTimeout(() => {
      loader.style.display = "none";
      resultContent.classList.remove("hidden");

      // Score alignment logic
      const userSkills = skillsText.split(",").map(s => s.trim().toLowerCase());
      
      let matched = [];
      let missing = [];

      // Requirement maps
      const requirements = {
        "ai engineer": ["python", "pytorch", "tensorflow", "transformers", "vector databases", "llm finetuning"],
        "frontend developer": ["html", "css", "javascript", "typescript", "react", "next.js", "tailwind"],
        "default": ["python", "sql", "git", "api design", "docker", "system design"]
      };

      const idealList = requirements[role.toLowerCase()] || requirements["default"];

      idealList.forEach(skill => {
        // Check if user has it
        const hasIt = userSkills.some(us => us.includes(skill) || skill.includes(us));
        if (hasIt) {
          matched.push(skill);
        } else {
          missing.push(skill);
        }
      });

      // Calculate score based on matches
      const score = Math.round((matched.length / idealList.length) * 100);
      document.querySelectorAll(".skills-alignment-display").forEach(el => el.textContent = score);

      // Render score circle
      const circleFill = document.getElementById("skills-progress-circle");
      const scoreText = document.getElementById("skills-progress-text");
      if (circleFill && scoreText) {
        scoreText.textContent = `${score}%`;
        const circumference = 2 * Math.PI * 36;
        const offset = circumference - (circumference * score / 100);
        circleFill.style.strokeDashoffset = offset;
      }

      // Populate verified vs missing tags
      const matchedContainer = document.getElementById("skills-verified-tags");
      const gapContainer = document.getElementById("skills-gap-tags");
      const bulletContainer = document.getElementById("skills-bullets");

      if (matchedContainer && gapContainer && bulletContainer) {
        matchedContainer.innerHTML = "";
        gapContainer.innerHTML = "";
        bulletContainer.innerHTML = "";

        if (matched.length === 0) {
          matchedContainer.innerHTML = `<span class="text-muted" style="font-size: 11px;">No matching core skills found.</span>`;
        } else {
          matched.forEach(skill => {
            const tag = document.createElement("span");
            tag.className = "matching-keyword";
            tag.textContent = skill.charAt(0).toUpperCase() + skill.slice(1);
            matchedContainer.appendChild(tag);
          });
        }

        if (missing.length === 0) {
          gapContainer.innerHTML = `<span class="pill-badge success">All core skills satisfied!</span>`;
        } else {
          missing.forEach(skill => {
            const tag = document.createElement("span");
            tag.className = "gap-keyword";
            tag.textContent = skill.charAt(0).toUpperCase() + skill.slice(1);
            gapContainer.appendChild(tag);
          });
        }

        // Add action recommendation bullets
        missing.slice(0,2).forEach(skill => {
          const bul = document.createElement("div");
          bul.className = "bullet-item";
          bul.innerHTML = `
            <svg class="text-accent-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Dedicate study time to master the foundations of: <strong>${skill.charAt(0).toUpperCase() + skill.slice(1)}</strong>.</span>
          `;
          bulletContainer.appendChild(bul);
        });

        if (missing.length === 0) {
          bulletContainer.innerHTML = `
            <div class="bullet-item">
              <svg class="text-accent-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Skills fully aligned! Ready to apply at target firm: <strong>${company}</strong>.</span>
            </div>
          `;
        }
      }

      logAdminEvent("sys", `Finished Skill Gap comparison audit. Match alignment index computed at ${score}%`);
    }, 1500);
  });
}

// ==========================================
// 10. LEARNING ROADMAPS
// ==========================================
function setupRoadmaps() {
  const selectorList = document.getElementById("roadmap-selector-list");
  const titleEl = document.getElementById("roadmap-title");
  const metaEl = document.getElementById("roadmap-meta");
  const tiersContainer = document.getElementById("roadmap-tiers-container");
  const projectBox = document.getElementById("roadmap-project-box");

  const customInput = document.getElementById("roadmap-custom-input");
  const btnCustomAdd = document.getElementById("btn-roadmap-custom-add");

  if (!selectorList || !titleEl || !metaEl || !tiersContainer || !projectBox) return;

  // Add click to existing buttons
  function attachTrackClick(btn) {
    btn.addEventListener("click", () => {
      selectorList.querySelectorAll(".roadmap-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const track = btn.getAttribute("data-track");
      loadTrackRoadmap(track);
    });
  }

  selectorList.querySelectorAll(".roadmap-btn").forEach(attachTrackClick);

  // Custom add
  if (btnCustomAdd && customInput) {
    btnCustomAdd.addEventListener("click", () => {
      const trackName = customInput.value.trim();
      if (!trackName) return;

      // Add to database if not exists
      if (!roadmapsDb[trackName]) {
        roadmapsDb[trackName] = {
          meta: `Custom study roadmap tailored for: ${trackName}.`,
          tiers: [
            { name: "Tier 1: Basic Foundations", items: [`Introduction and initial syntax for ${trackName}`, "Tooling, compilers, and sandbox setup steps"] },
            { name: "Tier 2: Intermediate Systems", items: [`Configuring local module dependencies for ${trackName}`, "Exposing functional routes and structural logic"] },
            { name: "Tier 3: Advanced Architectures", items: [`Optimizing staging scaling parameters`, `Deploying container packages containing ${trackName}`] }
          ],
          project: { title: `Project: Custom ${trackName} Application`, desc: `Design, package, and deploy a working application incorporating ${trackName} libraries, exposing clean REST services.` }
        };
      }

      // Add button to list
      const btn = document.createElement("button");
      btn.className = "roadmap-btn active";
      btn.setAttribute("data-track", trackName);
      btn.textContent = trackName;
      
      // Deactivate others
      selectorList.querySelectorAll(".roadmap-btn").forEach(b => b.classList.remove("active"));
      selectorList.appendChild(btn);
      attachTrackClick(btn);

      // Load it
      loadTrackRoadmap(trackName);
      customInput.value = "";

      showToast(`Generated custom learning track: ${trackName}!`, "success");
      logAdminEvent("sys", `Generated custom learning roadmap for: "${trackName}"`);
    });
  }

  function loadTrackRoadmap(trackName) {
    const data = roadmapsDb[trackName] || roadmapsDb["Full Stack Development"];

    titleEl.textContent = trackName;
    metaEl.textContent = data.meta;
    tiersContainer.innerHTML = "";

    data.tiers.forEach((tier, tierIdx) => {
      const tierEl = document.createElement("div");
      tierEl.className = "roadmap-tier";

      // Render items checklist
      let checklistHtml = "";
      tier.items.forEach((item, itemIdx) => {
        checklistHtml += `
          <label class="tier-item-checkbox">
            <input type="checkbox" data-tier="${tierIdx + 1}" data-index="${itemIdx}">
            <span>${item}</span>
          </label>
        `;
      });

      tierEl.innerHTML = `
        <div class="tier-dot"></div>
        <h3 class="tier-name">${tier.name}</h3>
        <div class="tier-items-list">
          ${checklistHtml}
        </div>
      `;
      
      tiersContainer.appendChild(tierEl);
    });

    // Populate project details
    projectBox.innerHTML = `
      <h4 class="roadmap-project-title">${data.project.title}</h4>
      <p class="roadmap-project-desc">${data.project.desc}</p>
    `;

    // Hook checkbox toggle styles
    tiersContainer.querySelectorAll("input[type='checkbox']").forEach(chk => {
      chk.addEventListener("change", () => {
        const item = chk.closest(".tier-item-checkbox");
        if (chk.checked) {
          item.classList.add("completed");
          awardXP(10, "Learned roadmap item skill");
        } else {
          item.classList.remove("completed");
          userState.xp = Math.max(0, userState.xp - 10);
          updateUIFromState();
        }
      });
    });

    logAdminEvent("sys", `Loaded roadmap timeline configurations for track: "${trackName}"`);
  }
}

// ==========================================
// 11. MATCH & LETTERS
// ==========================================
function setupMatchLetters() {
  const btnAnalyze = document.getElementById("btn-match-analyze");
  const btnLetter = document.getElementById("btn-match-letter");
  
  const loader = document.getElementById("match-loading");
  const loaderMsg = document.getElementById("match-loading-msg");
  
  const emptyState = document.getElementById("match-empty-state");
  const metricsContent = document.getElementById("match-metrics-content");
  const letterContent = document.getElementById("match-letter-content");

  const jdTextarea = document.getElementById("match-jd-text");
  const resumeDetailsInput = document.getElementById("match-resume-details");

  if (!btnAnalyze || !btnLetter || !loader || !emptyState || !metricsContent || !letterContent) return;

  btnAnalyze.addEventListener("click", () => {
    const jd = jdTextarea.value.trim();
    if (!jd) {
      alert("Please paste target job description requirements to analyze.");
      return;
    }

    loaderMsg.textContent = "Scanning Job Description requirements...";
    loader.style.display = "flex";
    emptyState.classList.add("hidden");
    metricsContent.classList.add("hidden");
    letterContent.classList.add("hidden");

    logAdminEvent("api", "POST /v1/match/analyze requested");

    setTimeout(() => {
      loader.style.display = "none";
      metricsContent.classList.remove("hidden");

      // Generate randomized realistic score
      let base = 55;
      if (jd.toLowerCase().includes("python")) base += 10;
      if (jd.toLowerCase().includes("pytorch")) base += 5;
      const finalScore = Math.min(95, base + Math.floor(Math.random() * 15));

      // Render Circle Progress
      const circleFill = document.getElementById("match-progress-circle");
      const scoreText = document.getElementById("match-progress-text");
      if (circleFill && scoreText) {
        scoreText.textContent = `${finalScore}%`;
        const circumference = 2 * Math.PI * 36;
        const offset = circumference - (circumference * finalScore / 100);
        circleFill.style.strokeDashoffset = offset;
      }

      // Populate gaps & recommendations
      const missingContainer = document.getElementById("match-missing-tags");
      const recommendationContainer = document.getElementById("match-bullets");

      if (missingContainer && recommendationContainer) {
        missingContainer.innerHTML = "";
        recommendationContainer.innerHTML = "";

        const missing = ["Vector Database Indices", "LangChain Prompt engineering", "Large Scale Cloud Scaling"];
        missing.forEach(tagText => {
          const span = document.createElement("span");
          span.className = "gap-keyword";
          span.textContent = tagText;
          missingContainer.appendChild(span);
        });

        const recs = [
          "Explicitly include 'vector search models' in projects overview descriptions.",
          "Add Docker container orchestration systems within technical skills section.",
          "Quantify database throughput scaling stats in professional experience description."
        ];

        recs.forEach(rec => {
          const bullet = document.createElement("div");
          bullet.className = "bullet-item";
          bullet.innerHTML = `
            <svg class="text-accent-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>${rec}</span>
          `;
          recommendationContainer.appendChild(bullet);
        });
      }

      logAdminEvent("sys", `Finished Job Description compatibility analyze. Match Score: ${finalScore}%`);
    }, 1500);
  });

  btnLetter.addEventListener("click", () => {
    const jd = jdTextarea.value.trim();
    if (!jd) {
      alert("Please paste target job description requirements to draft cover letter.");
      return;
    }

    loaderMsg.textContent = "Drafting AI Tailored Cover Letter...";
    loader.style.display = "flex";
    emptyState.classList.add("hidden");
    metricsContent.classList.add("hidden");
    letterContent.classList.add("hidden");

    logAdminEvent("api", "POST /v1/match/cover-letter requested");

    setTimeout(() => {
      loader.style.display = "none";
      letterContent.classList.remove("hidden");

      const company = document.getElementById("match-company").value.trim() || "OpenAI";
      const role = document.getElementById("match-role").value.trim() || "AI Engineer";
      
      const letterText = `Dear Hiring Team at ${company},

I am writing to express my strong interest in the ${role} position. With a solid foundation in Python, database engineering, and React frontend systems, I am excited about the opportunity to contribute to your building targets.

In my recent projects, I have implemented scalable backend API endpoints and constructed neural network configurations using TensorFlow libraries. I actively engage in training transformer architectures and managing database latency. I am eager to apply my problem-solving skills to the scaling goals at ${company}.

Thank you for your time and consideration. I look further to discuss how my credentials align with your needs.

Sincerely,
${userState.name}`;

      document.getElementById("match-letter-text").textContent = letterText;
      logAdminEvent("sys", "Generated customizable Cover Letter payload template.");
    }, 1600);
  });

  // Copy cover letter
  const btnCopy = document.getElementById("btn-copy-letter");
  if (btnCopy) {
    btnCopy.addEventListener("click", () => {
      const text = document.getElementById("match-letter-text").textContent;
      navigator.clipboard.writeText(text).then(() => {
        showToast("Cover Letter copied to clipboard!", "success");
        logAdminEvent("sys", "User copied Cover Letter text variables to clipboard.");
      });
    });
  }
}

// ==========================================
// 12. PROGRESS HISTORY LOGS & CHARTS
// ==========================================
function renderMilestoneTable() {
  const tbody = document.getElementById("history-log-tbody");
  const emptyState = document.getElementById("history-empty-state");
  const table = document.getElementById("history-log-table");

  if (!tbody || !emptyState || !table) return;

  if (userState.milestoneHistory.length === 0) {
    emptyState.classList.remove("hidden");
    table.classList.add("hidden");
  } else {
    emptyState.classList.add("hidden");
    table.classList.remove("hidden");

    tbody.innerHTML = "";
    
    // Reverse chronological order
    const logs = [...userState.milestoneHistory].reverse();
    
    logs.forEach(log => {
      const tr = document.createElement("tr");
      
      // Style result badge
      let scoreBadgeClass = "pill-badge warning";
      if (log.score >= 85) scoreBadgeClass = "pill-badge success";
      else if (log.score >= 70) scoreBadgeClass = "pill-badge purple";

      tr.innerHTML = `
        <td>${log.date}</td>
        <td><span class="pill-badge purple" style="background-color: rgba(139, 92, 246, 0.05); color: #c084fc;">${log.type}</span></td>
        <td>${log.role}</td>
        <td><span class="${scoreBadgeClass}">${log.score}%</span></td>
      `;
      tbody.appendChild(tr);
    });
  }
}

function drawSVGCharts() {
  const progressLinePath = document.getElementById("history-line-path");
  const progressHistoryPanel = document.getElementById("view-progress-history");
  const adminPanel = document.getElementById("view-admin-desk");
  
  if (!progressLinePath) return;

  // Render Line Chart based on userState.milestoneHistory (last 4 items)
  const historyItems = userState.milestoneHistory.slice(-4);
  if (historyItems.length >= 2) {
    // Generate new coordinates
    // X indices: 50, 150, 250, 350
    // Y: 30 (100%) to 165 (0%). Y = 165 - (135 * score/100)
    let pathD = "";
    const dots = document.querySelectorAll(".chart-dot");
    
    historyItems.forEach((item, idx) => {
      const x = 50 + idx * 100;
      const y = 165 - (135 * item.score / 100);
      
      if (idx === 0) pathD += `M ${x} ${y}`;
      else pathD += ` L ${x} ${y}`;

      // Update dot circles
      if (dots[idx]) {
        dots[idx].setAttribute("cx", x);
        dots[idx].setAttribute("cy", y);
        dots[idx].setAttribute("title", `${item.type} (${item.role}): ${item.score}%`);
      }
    });

    progressLinePath.setAttribute("d", pathD);
  }

  // Bar chart milestones heights updates based on mock database counters
  const barMock = document.getElementById("history-bar-mock");
  const barResume = document.getElementById("history-bar-resume");
  const barSkills = document.getElementById("history-bar-skills");

  if (barMock && barResume && barSkills) {
    const counts = { mock: 0, resume: 0, skills: 8 }; // skills default verified
    userState.milestoneHistory.forEach(item => {
      if (item.type.includes("Mock")) counts.mock++;
      else if (item.type.includes("Resume")) counts.resume++;
    });

    // Limit count scaling factors. Max Y scale is 8. Y starts from 30 to 165 (height 135)
    // Height = 135 * (Count/8). Y = 165 - Height
    const hMock = Math.min(135, 135 * (Math.max(1, counts.mock) / 8));
    const hResume = Math.min(135, 135 * (Math.max(1, counts.resume) / 8));
    const hSkills = 135; // default 8

    barMock.setAttribute("height", hMock);
    barMock.setAttribute("y", 165 - hMock);
    barMock.setAttribute("title", `Mock Interviews Completed: ${counts.mock}`);

    barResume.setAttribute("height", hResume);
    barResume.setAttribute("y", 165 - hResume);
    barResume.setAttribute("title", `Resume Scans Completed: ${counts.resume}`);
  }
}

// ==========================================
// 13. ASSESSMENTS & SALARY PREDICTOR
// ==========================================
function setupAssessmentsSalary() {
  // Quiz parameters
  const quizContainer = document.getElementById("assessment-quiz-container");
  const resultContainer = document.getElementById("assessment-result-container");
  const qIndicator = document.getElementById("quiz-q-indicator");
  const qText = document.getElementById("quiz-question-text");
  const options = document.querySelectorAll(".quiz-option");
  const btnNext = document.getElementById("btn-quiz-next");
  const btnReset = document.getElementById("btn-quiz-reset");

  const resultArchetype = document.getElementById("quiz-result-archetype");
  const resultDesc = document.getElementById("quiz-result-desc");

  const quizQuestions = [
    {
      q: "What describes your problem-solving style?",
      optA: "Analyzing technical details, performance benchmarks, and complex math code",
      optB: "Structuring products, analyzing customer loops, and managing roadmap priorities",
      optC: "Designing polished interfaces, drawing wireframes, and managing visual themes",
      optD: "Configuring security systems, deploying servers, and testing penetration vectors"
    },
    {
      q: "How do you handle system outage failures in production?",
      optA: "Trace heap stacks, debug computational structures, and re-compile memory clusters",
      optB: "Organize client communication, update timelines, and schedule team review sprints",
      optC: "Draft interface notifications, review accessibility states, and construct status grids",
      optD: "Analyze network traffic packets, redirect balance domains, and provision load redundancies"
    },
    {
      q: "What is your preferred way to collaborate on technical designs?",
      optA: "Authoring comprehensive RFCs and code specification templates",
      optB: "Leading sprint planning maps and outlining product milestones",
      optC: "Prototyping responsive flows and commenting on Figma mockups",
      optD: "Setting up CI/CD workflows and managing deploy script versions"
    }
  ];

  let currentQuizIdx = 0;
  let quizSelections = [];
  let selectedOption = null;

  options.forEach(opt => {
    opt.addEventListener("click", () => {
      options.forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      selectedOption = opt.getAttribute("data-ans");
    });
  });

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      if (!selectedOption) {
        alert("Please select an option to continue.");
        return;
      }

      quizSelections.push(selectedOption);
      selectedOption = null;
      options.forEach(o => o.classList.remove("selected"));

      if (currentQuizIdx < quizQuestions.length - 1) {
        currentQuizIdx++;
        // Load next question
        qIndicator.textContent = `Question ${currentQuizIdx + 1} of ${quizQuestions.length}`;
        qText.textContent = quizQuestions[currentQuizIdx].q;
        document.getElementById("quiz-opt-a").textContent = quizQuestions[currentQuizIdx].optA;
        document.getElementById("quiz-opt-b").textContent = quizQuestions[currentQuizIdx].optB;
        document.getElementById("quiz-opt-c").textContent = quizQuestions[currentQuizIdx].optC;
        document.getElementById("quiz-opt-d").textContent = quizQuestions[currentQuizIdx].optD;
        
        if (currentQuizIdx === quizQuestions.length - 1) {
          btnNext.textContent = "Finish Assessment";
        }
      } else {
        // Complete quiz
        quizContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");
        
        awardXP(80, "Completed Career Persona quiz");

        // Calculate archetype based on frequency
        const counts = { A: 0, B: 0, C: 0, D: 0 };
        quizSelections.forEach(ans => counts[ans]++);

        let maxVal = 0;
        let archetype = "Systems Architect";
        let desc = "You excel at resolving complex computational structures, deep mathematical logic, and modular algorithms. You structure backend systems with precision.";

        if (counts.B > counts.A && counts.B > counts.C && counts.B > counts.D) {
          archetype = "Technical Product Manager";
          desc = "You align technical timelines with design priorities, outline product dependencies, and drive structural release schedules across complex sprint loops.";
        } else if (counts.C > counts.A && counts.C > counts.B && counts.C > counts.D) {
          archetype = "Polished UX Engineer";
          desc = "You construct gorgeous interfaces, balance access grid standards, verify color structures, and maintain fluid frontend layout details.";
        } else if (counts.D > counts.A && counts.D > counts.B && counts.D > counts.C) {
          archetype = "Security & DevOps Guardian";
          desc = "You prioritize scalable staging infrastructure, secure network perimeter protocols, and build highly redundant deployment automation pipelines.";
        }

        resultArchetype.textContent = archetype;
        resultDesc.textContent = desc;

        logAdminEvent("sys", `Finished Career Persona quiz. Archetype calculated: "${archetype}"`);
      }
    });
  }

  if (btnReset) {
    btnReset.addEventListener("click", () => {
      currentQuizIdx = 0;
      quizSelections = [];
      selectedOption = null;
      btnNext.textContent = "Next Question";
      
      qIndicator.textContent = "Question 1 of 3";
      qText.textContent = quizQuestions[0].q;
      document.getElementById("quiz-opt-a").textContent = quizQuestions[0].optA;
      document.getElementById("quiz-opt-b").textContent = quizQuestions[0].optB;
      document.getElementById("quiz-opt-c").textContent = quizQuestions[0].optC;
      document.getElementById("quiz-opt-d").textContent = quizQuestions[0].optD;

      options.forEach(o => o.classList.remove("selected"));
      resultContainer.classList.add("hidden");
      quizContainer.classList.remove("hidden");
      
      logAdminEvent("sys", "Reset active quiz assessment engine.");
    });
  }

  // Salary Predictor
  const btnPredict = document.getElementById("btn-salary-predict");
  const salaryResult = document.getElementById("salary-result-container");

  if (btnPredict && salaryResult) {
    btnPredict.addEventListener("click", () => {
      const title = document.getElementById("salary-title").value;
      const exp = document.getElementById("salary-exp").value;
      const loc = document.getElementById("salary-loc").value;

      logAdminEvent("api", `GET /v1/salary/predict Title: "${title}" Region: "${loc}"`);

      // Determine ranges based on title and experience
      let baseMin = 90;
      let baseMax = 120;
      let currencySymbol = "$";
      let equityText = "0.02% - 0.08%";
      let demand = "Moderate";

      if (title.includes("AI") || title.includes("Science")) {
        baseMin = 130;
        baseMax = 180;
        demand = "High";
      }

      // Experience multiplier
      if (exp.includes("Mid")) {
        baseMin = Math.round(baseMin * 1.3);
        baseMax = Math.round(baseMax * 1.35);
        equityText = "0.05% - 0.15%";
      } else if (exp.includes("Senior")) {
        baseMin = Math.round(baseMin * 1.7);
        baseMax = Math.round(baseMax * 1.8);
        equityText = "0.15% - 0.35%";
        demand = "Critical";
      }

      // Location multiplier
      if (loc.includes("London")) {
        currencySymbol = "£";
        baseMin = Math.round(baseMin * 0.7);
        baseMax = Math.round(baseMax * 0.75);
      } else if (loc.includes("San Francisco") || loc.includes("Seattle")) {
        baseMin = Math.round(baseMin * 1.2);
        baseMax = Math.round(baseMax * 1.25);
      }

      // Show result
      salaryResult.classList.remove("hidden");
      document.getElementById("salary-range-value").textContent = `${currencySymbol}${baseMin.toLocaleString()} - ${currencySymbol}${baseMax.toLocaleString()}`;
      document.getElementById("salary-insights-text").innerHTML = `
        Estimated Base Salary range for **${exp.split(" ")[0]} ${title}** in **${loc}**.<br>Average Equity: <strong>${equityText}</strong>. Hiring Demand: <strong class="text-accent-teal">${demand}</strong>.
      `;

      logAdminEvent("sys", `Finished dynamic salary prediction engine. Valuation metrics calculated.`);
    });
  }
}

// ==========================================
// 13. MY PROFILE
// ==========================================
function setupMyProfile() {
  const btnSave = document.getElementById("btn-profile-save");
  
  if (!btnSave) return;

  btnSave.addEventListener("click", () => {
    const name = document.getElementById("profile-name-input").value.trim() || "Guest Candidate";
    const company = document.getElementById("profile-company-input").value.trim() || "OpenAI";
    const role = document.getElementById("profile-role-input").value.trim() || "AI Engineer";
    const education = document.getElementById("profile-education-input").value.trim();
    const skills = document.getElementById("profile-skills-input").value.trim();
    const exp = document.getElementById("profile-exp-input").value.trim();
    const objectives = document.getElementById("profile-objectives-input").value.trim();

    // Save in state variables
    userState.name = name;
    userState.company = company;
    userState.role = role;
    userState.education = education;
    userState.skills = skills;
    userState.experience = exp;
    userState.goals = objectives;

    // Apply values to UI
    updateUIFromState();
    
    showToast("Profile credentials updated successfully!", "success");
    logAdminEvent("sys", "Synchronized updated profile variables across dashboards.");
  });

  // API configurations
  const btnCloud = document.getElementById("btn-api-mode-cloud");
  const btnStandalone = document.getElementById("btn-api-mode-standalone");
  const urlInput = document.getElementById("profile-sandbox-url");
  const btnTest = document.getElementById("btn-test-connection");
  const btnApplyConfig = document.getElementById("btn-apply-sandbox");

  if (btnCloud && btnStandalone && urlInput && btnTest && btnApplyConfig) {
    btnCloud.addEventListener("click", () => {
      btnCloud.classList.add("active");
      btnStandalone.classList.remove("active");
      userState.operationalMode = "cloud";
      logAdminEvent("sys", "API operational target redirected to Cloud Connected API endpoint hosts.");
    });

    btnStandalone.addEventListener("click", () => {
      btnStandalone.classList.add("active");
      btnCloud.classList.remove("active");
      userState.operationalMode = "standalone";
      logAdminEvent("sys", "API operational target forced to Standalone Offline sandbox execution.");
    });

    btnTest.addEventListener("click", () => {
      btnTest.disabled = true;
      btnTest.textContent = "Testing...";
      logAdminEvent("api", `GET ${urlInput.value}/health check ping request`);

      setTimeout(() => {
        btnTest.disabled = false;
        btnTest.textContent = "Test Connection";
        showToast("Sandbox API active & listening! Status: 200 OK", "success");
      }, 1200);
    });

    btnApplyConfig.addEventListener("click", () => {
      userState.sandboxUrl = urlInput.value.trim();
      showToast("API sandbox custom parameters applied!", "success");
      logAdminEvent("sys", `Configured active api service url route to: ${userState.sandboxUrl}`);
    });
  }
}

// ==========================================
// 14. ADMIN DESK CONTROL PANEL
// ==========================================
function setupAdminDesk() {
  const tabAnalytics = document.getElementById("btn-admin-tab-analytics");
  const tabUsers = document.getElementById("btn-admin-tab-users");
  const tabLogs = document.getElementById("btn-admin-tab-logs");

  const panelAnalytics = document.getElementById("admin-subpanel-analytics");
  const panelUsers = document.getElementById("admin-subpanel-users");
  const panelLogs = document.getElementById("admin-subpanel-logs");

  const btnClearLogs = document.getElementById("btn-admin-clear-logs");

  if (!tabAnalytics || !tabUsers || !tabLogs || !panelAnalytics || !panelUsers || !panelLogs) return;

  tabAnalytics.addEventListener("click", () => {
    tabAnalytics.classList.add("active");
    tabUsers.classList.remove("active");
    tabLogs.classList.remove("active");

    panelAnalytics.classList.remove("hidden");
    panelUsers.classList.add("hidden");
    panelLogs.classList.add("hidden");
    
    // Draw SVG charts on viewport entry
    setTimeout(drawSVGCharts, 100);
  });

  tabUsers.addEventListener("click", () => {
    tabUsers.classList.add("active");
    tabAnalytics.classList.remove("active");
    tabLogs.classList.remove("active");

    panelUsers.classList.remove("hidden");
    panelAnalytics.classList.add("hidden");
    panelLogs.classList.add("hidden");
  });

  tabLogs.addEventListener("click", () => {
    tabLogs.classList.add("active");
    tabAnalytics.classList.remove("active");
    tabUsers.classList.remove("active");

    panelLogs.classList.remove("hidden");
    panelAnalytics.classList.add("hidden");
    panelUsers.classList.add("hidden");
  });

  if (btnClearLogs) {
    btnClearLogs.addEventListener("click", () => {
      const logsBox = document.getElementById("admin-logs-box");
      if (logsBox) {
        logsBox.innerHTML = "";
        logAdminEvent("sys", "Admin console cleared local log traces.");
      }
    });
  }
}

function logAdminEvent(tag, message) {
  const logsBox = document.getElementById("admin-logs-box");
  if (!logsBox) return;

  const logItem = document.createElement("div");
  logItem.className = "log-item";

  const timeStr = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  
  let tagClass = "sys";
  if (tag === "api") tagClass = "api";
  else if (tag === "err") tagClass = "err";

  logItem.innerHTML = `
    <span class="log-time">[${timeStr}]</span>
    <span class="log-tag ${tagClass}">${tag}</span>
    <span class="log-msg">${message}</span>
  `;

  logsBox.appendChild(logItem);
  logsBox.scrollTop = logsBox.scrollHeight;
}

// ==========================================
// 15. AUTHENTICATION & LOGIN GATEWAY
// ==========================================
function setupLogin() {
  const tabSignin = document.getElementById("btn-login-tab-signin");
  const tabSignup = document.getElementById("btn-login-tab-signup");
  const formSignin = document.getElementById("form-signin");
  const formSignup = document.getElementById("form-signup");
  const btnGuest = document.getElementById("btn-login-guest");
  
  const loginContainer = document.getElementById("login-container");
  const appContainer = document.querySelector(".app-container");

  if (!tabSignin || !tabSignup || !formSignin || !formSignup || !btnGuest) return;

  // Toggle Tabs
  tabSignin.addEventListener("click", () => {
    tabSignin.classList.add("active");
    tabSignup.classList.remove("active");
    formSignin.classList.remove("hidden");
    formSignup.classList.add("hidden");
  });

  tabSignup.addEventListener("click", () => {
    tabSignup.classList.add("active");
    tabSignin.classList.remove("active");
    formSignup.classList.remove("hidden");
    formSignin.classList.add("hidden");
  });

  // Common Transition Function
  function enterApp(name, role, email) {
    userState.name = name;
    userState.role = role;
    
    // Sync all view values
    updateUIFromState();
    
    // Pre-fill profile inputs to match
    document.getElementById("profile-name-input").value = name;
    document.getElementById("profile-role-input").value = role;
    
    // Trigger fade transition
    loginContainer.classList.add("fade-out");
    appContainer.classList.remove("hidden");
    
    // Log auth event
    logAdminEvent("sys", `Candidate session verified. User: "${name}" (${email || 'guest'}), Role: "${role}"`);
    
    setTimeout(() => {
      loginContainer.style.display = "none";
      showToast(`Welcome, ${name}! Session initialized.`, "success");
    }, 450);
  }

  // Sign In submission
  formSignin.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signin-email").value.trim() || "guest@careerpilot.ai";
    // Mock user names based on email matching
    let name = "Alex Mercer";
    let role = "AI Engineer";
    
    if (email === "guest@careerpilot.ai") {
      name = "Guest Candidate";
      role = "AI Engineer";
    } else {
      // derive name from email prefix
      const prefix = email.split("@")[0];
      name = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }
    
    enterApp(name, role, email);
  });

  // Sign Up submission
  formSignup.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const role = document.getElementById("signup-role").value.trim() || "AI Engineer";
    
    enterApp(name, role, email);
  });

  // Guest button
  btnGuest.addEventListener("click", () => {
    enterApp("Guest Candidate", "AI Engineer", "guest@careerpilot.ai");
  });
}

// ==========================================
// 16. INLINE TARGET EDITING
// ==========================================
function setupInlineEditing() {
  const editableRole = document.querySelector(".welcome-banner .target-role-display");
  const editableCompany = document.querySelector(".welcome-banner .target-company-display");

  if (!editableRole || !editableCompany) return;

  function makeEditable(element, stateKey, labelName) {
    element.addEventListener("click", () => {
      // If already editing, ignore
      if (element.querySelector("input")) return;

      const currentValue = userState[stateKey];
      element.innerHTML = `
        <span class="inline-edit-form">
          <input type="text" class="inline-edit-input" value="${currentValue}">
          <button class="inline-edit-btn" title="Save">✓</button>
        </span>
      `;

      const input = element.querySelector("input");
      const btn = element.querySelector("button");

      // Auto-focus and select
      input.focus();
      input.select();
      
      // Auto-adjust width of input based on content size
      input.style.width = `${Math.max(80, input.value.length * 8 + 12)}px`;
      input.addEventListener("input", () => {
        input.style.width = `${Math.max(80, input.value.length * 8 + 12)}px`;
      });

      function saveValue() {
        const newValue = input.value.trim();
        if (newValue) {
          userState[stateKey] = newValue;
          
          // Sync profile fields
          if (stateKey === "role") {
            document.getElementById("profile-role-input").value = newValue;
            // Also sync other role inputs in analyser, skills matrix, letters
            document.getElementById("resume-target-role").value = newValue;
            document.getElementById("skills-target-role").value = newValue;
            document.getElementById("match-role").value = newValue;
            document.getElementById("salary-title").value = newValue;
            document.getElementById("mock-role").value = newValue;
          } else if (stateKey === "company") {
            document.getElementById("profile-company-input").value = newValue;
            document.getElementById("skills-target-company").value = newValue;
            document.getElementById("match-company").value = newValue;
          }

          updateUIFromState();
          showToast(`${labelName} updated to "${newValue}"!`, "success");
          logAdminEvent("sys", `Updated target ${stateKey} value variables dynamically: "${newValue}"`);
        } else {
          // Restore
          updateUIFromState();
        }
      }

      // Save on button click
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        saveValue();
      });

      // Save on Enter, restore on Escape
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.stopPropagation();
          saveValue();
        } else if (e.key === "Escape") {
          e.stopPropagation();
          updateUIFromState();
        }
      });
      
      // Save on blur (clicking outside input)
      input.addEventListener("blur", () => {
        // Delay slightly to allow button click to register first if clicked
        setTimeout(() => {
          if (element.querySelector("input")) {
            saveValue();
          }
        }, 100);
      });
    });
  }

  makeEditable(editableRole, "role", "Dream Target Role");
  makeEditable(editableCompany, "company", "Dream Target Company");
}
