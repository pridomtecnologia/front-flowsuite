document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.getElementById("app-container");

  const modules = [
    {
      name: "layout",
      path: "modules/core/layout/layout.html",
      container: appContainer,
      isLayout: true,
    },
    {
      name: "dashboard",
      path: "modules/dashboard/dashboard.html",
      container: "#content-container",
      script: "modules/dashboard/dashboard.js",
      init: "setupDashboardEventListeners",
    },
    {
      name: "projetos",
      path: "modules/projetos/projetos.html",
      container: "#content-container",
      script: "modules/projetos/projetos.js",
      init: "setupProjetosEventListeners",
    },
    {
      name: "financeiro",
      path: "modules/financeiro/financeiro.html",
      container: "#content-container",
      script: "modules/financeiro/financeiro.js",
      init: "setupFinanceiroEventListeners",
    },
    {
      name: "autoral",
      path: "modules/autoral/autoral.html",
      container: "#content-container",
      script: "modules/autoral/autoral.js",
      init: "setupAutoralEventListeners",
    },
    {
      name: "royalties",
      path: "modules/royalties/royalties.html",
      container: "#content-container",
      script: "modules/royalties/royalties.js",
      init: "setupRoyaltiesEventListeners",
    },
    {
      name: "cadastro",
      path: "modules/cadastro/cadastro.html",
      container: "#content-container",
      script: "modules/cadastro/cadastro.js",
      init: "setupCadastroEventListeners",
    },
  ];

  const loadHtml = (url, container) =>
    fetch(url)
      .then((res) => res.text())
      .then((data) => {
        const target =
          typeof container === "string"
            ? document.querySelector(container)
            : container;
        if (target)
          container === appContainer
            ? (target.innerHTML = data)
            : (target.innerHTML += data);
      });

  const loadScript = (url) =>
    new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${url}"]`)) return resolve();
      const script = document.createElement("script");
      script.src = url;
      script.onload = resolve;
      script.onerror = () =>
        reject(new Error(`Erro ao carregar script: ${url}`));
      document.body.appendChild(script);
    });

  async function initializeApp() {
    try {
      await loadHtml(modules.find((m) => m.isLayout).path, appContainer);
      await Promise.all(
        modules
          .filter((m) => !m.isLayout)
          .map((m) => loadHtml(m.path, m.container))
      );
      await Promise.all(
        modules.filter((m) => m.script).map((m) => loadScript(m.script))
      );
      setupGlobalEventListeners();
      navigateTo(
        "dashboard-financeiro",
        document.querySelector(
          '.submenu-item[data-target="dashboard-financeiro"]'
        )
      );
    } catch (error) {
      console.error("Falha ao inicializar a aplicação:", error);
    }
  }

  function setupGlobalEventListeners() {
    document.body.addEventListener("click", (e) => {
      const closest = (selector) => e.target.closest(selector);
      if (closest("#toggle-sidebar")) toggleSidebar();
      const menuToggle = closest("[data-menu-toggle]");
      if (menuToggle) {
        e.preventDefault();
        handleMainMenuClick(menuToggle);
      }
      const submenuItem = closest(".submenu-item");
      if (submenuItem) {
        e.preventDefault();
        navigateTo(submenuItem.dataset.target, submenuItem);
      }
    });
  }

  window.navigateTo = (targetId, clickedElement) => {
    document
      .querySelectorAll(".submenu-item, .menu-item-group")
      .forEach((i) => i.classList.remove("active"));
    if (clickedElement) {
      const parentMenuGroup = clickedElement.closest(".menu-item-group");
      clickedElement.classList.add("active");
      if (parentMenuGroup) {
        parentMenuGroup.classList.add("active");
        if (parentMenuGroup.querySelector("ul")) {
          parentMenuGroup.querySelector("ul").classList.remove("hidden");
          parentMenuGroup
            .querySelector(".submenu-arrow")
            ?.classList.add("rotate-180");
        }
      }
    }

    document
      .querySelectorAll(".content-wrapper")
      .forEach((d) => d.classList.add("hidden"));
    const targetElement = document.getElementById(targetId);
    if (targetElement) targetElement.classList.remove("hidden");

    const titleMap = {
      "dashboard-financeiro": "Dashboard Financeiro",
      "dashboard-projetos": "Dashboard de Projetos",
      "dashboard-royalties": "Dashboard de Royalties",
      "dashboard-autoral": "Dashboard Autoral",
      "orcamento-lista": "Orçamentos",
      "jobs-lista": "Jobs",
      "fechamento-projeto": "Fechamento de Projeto",
      "contas-pagar": "Contas a Pagar",
      "contas-receber": "Contas a Receber",
      bancos: "Bancos",
      "cadastro-cliente": "Cadastro de Cliente",
      "cadastro-artista": "Cadastro de Artista",
      "cadastro-musica": "Cadastro de Música",
      "cadastro-fornecedor": "Cadastro de Fornecedor",
      "cadastro-funcionario": "Cadastro de Funcionário",
      "royalties-inventario": "Inventário de Royalties",
    };
    document.getElementById("page-title").textContent =
      titleMap[targetId] || "FlowSuite";

    const moduleName = clickedElement
      ?.closest(".menu-item-group")
      ?.querySelector("[data-menu-toggle]")?.dataset.menuToggle;
    if (moduleName) {
      const module = modules.find((m) => m.name === moduleName);
      if (module && module.init && typeof window[module.init] === "function") {
        window[module.init]();
      }
    }

    feather.replace();
  };

  function handleMainMenuClick(menuToggle) {
    const submenu = menuToggle.nextElementSibling;
    const arrow = menuToggle.querySelector(".submenu-arrow");
    submenu.classList.toggle("hidden");
    arrow.classList.toggle("rotate-180");
  }

  function toggleSidebar() {
    document.getElementById("sidebar")?.classList.toggle("collapsed");
    document.getElementById("sidebar")?.classList.toggle("w-64");
    document.getElementById("sidebar")?.classList.toggle("w-20");
  }

  initializeApp();
});
