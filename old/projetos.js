function setupProjetosEventListeners() {
  const container = document.getElementById("orcamento-lista");
  if (!container || container.dataset.listenersAttached === "true") {
    return;
  }

  document
    .getElementById("content-container")
    .addEventListener("click", (e) => {
      const closest = (selector) => e.target.closest(selector);

      if (closest("#novo-orcamento-btn") || closest(".editar-orcamento-btn")) {
        e.preventDefault();
        showOrcamentoDetailScreen();
      }
      if (closest("#voltar-lista-btn")) {
        e.preventDefault();
        showOrcamentoListScreen();
      }
      if (closest(".orcamento-tab-button")) {
        handleOrcamentoTabClick(closest(".orcamento-tab-button"));
      }
      if (closest(".add-item-btn")) {
        adicionarLinha(closest(".add-item-btn"));
      }
      if (closest(".duplicate-row")) {
        duplicarLinha(closest(".duplicate-row"));
      }
      if (closest(".delete-row")) {
        deleteLinha(closest(".delete-row"));
      }
      if (closest(".group-toggle")) {
        toggleGroup(closest(".group-toggle"));
      }
      if (closest("#toggle-valores-panel")) {
        toggleValoresPanel();
      }
    });

  document
    .getElementById("orcamento-detalhe")
    ?.addEventListener("input", (e) => {
      if (e.target.matches(".orcamento-input")) {
        calcularLinha(e.target.closest("tr"));
      }
      if (e.target.matches(".resumo-input")) {
        calcularResumoFinal();
      }
    });

  container.dataset.listenersAttached = "true";
}

const orcamentoEstrutura = [
  {
    grupo: "001 - PRÉ-PRODUÇÃO",
    itens: [
      "Pesquisa",
      "Roteirista",
      "Shooting Board",
      "Tradução",
      "Impressão / Xerox",
      "Estudo Parte Teste de VT 1",
      "Estudo Parte Teste de VT 2",
      "Operador de camera Teste VT 1",
      "Operador de camera Teste VT 2",
      "Câmera Teste de VT",
      "Luz para Teste de VT",
      "Maquiador",
      "Camareira de Teste - VT",
      "Direção TVT",
      "Editor",
      "Ajudante para TVT 1",
      "Ajudante para TVT 2",
      "Cache Presença",
      "HD para TVT",
      "Verba Alimentação",
      "Verba Pre Produção",
      "Telefones",
      "Xerox",
      "Outros",
      "Transf. Borderô",
    ],
  },
  {
    grupo: "002 - PRODUÇÃO",
    itens: [
      "Taxa de Locações - PJ 1",
      "Taxa de Locações - Pf 2",
      "Impostos s/ Locações - PF",
      "Base para filmagem 1",
      "Base para filmagem 2",
      "Gratificações",
      "Policiamento",
      "Verba Objeto 1",
      "Verba Objeto 2",
      "Verba Figurino1",
      "Verba Figurino2",
      "Lavanderia",
      "Compra de produto pra Filmagem",
      "Aluguel de Veículos para a Cena",
      "Envelopamento do carro dourado",
      "Seguro de carros",
      "Animais",
      "Alimentos p filmagem",
      "Teleprompter",
      "Banheiro Químico",
      "Camarim",
      "Play Back",
      "Caixa de Produção 1",
      "Caixa de Produção 2",
      "Mapas Meteorologicos",
      "Caminhão Pipa",
      "Ambulancia",
      "Verba de Produção",
      "Outros",
      "Transf. Borderô",
    ],
  },
  {
    grupo: "003 - CENOGRAFIA",
    itens: [
      "Estúdio - Diárias Filmagens",
      "Estúdio - Diárias Preparação e pré light",
      "Material Construção",
      "Aderecista",
      "Cenotecnico",
      "Pintor",
      "Tinta",
      "Ar Condicionado",
      "Bombeiro para montagem de cenário",
      "Outros Gastos com Cenografia",
      "Transf. Borderô",
    ],
  },
  {
    grupo: "004 - TRANSPORTES",
    itens: [
      "Carros de de Pre Produção",
      "Carros de de Produção",
      "Carros de de Prod. Figurino",
      "Carros de Pre Prod. de Figurino",
      "Carros de Pre Prod de Objetos",
      "Carros de Prod de Objetos",
      "Carros de Prod de Locação",
      "Carros Alimentação",
      "Carros de Filmagem",
      "Carros de Camera",
      "Carro de Agencia / Cliente",
      "Carro de Diretor",
      "Onibus",
      "Pick-up",
      "Caminhão",
      "Taxi Estacionamento Pedagio",
      "Guincho",
      "Aluguel de Carros",
      "Motoboy",
      "Combustível",
      "Currier",
      "Outros",
      "Transf. Borderô",
    ],
  },
  {
    grupo: "005 - EQUIPE DE FILMAGEM",
    itens: [
      "Diretor",
      "Diretor de Fotografia",
      "Operador de Steady",
      "1º Ass. Câmera 1",
      "2º Ass. Câmera 1",
      "Video assist 1",
      "Logger 1",
      "Assistente de Direção",
      "Diretor de produção 1",
      "1a. Assist Produção 1",
      "2a. Assist Produção",
      "Platô",
      "Produtor de Arte",
      "Assist de Arte",
      "Produtor de Objetos",
      "Produtor de Figurino",
      "Costureira",
      "Camareira",
      "Produtor de Elenco",
      "Produtor de Locação",
      "Maquiador",
      "Ass. Maquiador",
      "Cabeleireiro",
      "Manicure",
      "Preparador de Mockup",
      "Técnico de Efeitos Especiais",
      "Piloto",
      "Eletricista 1",
      "Ajudantes",
      "Transf. Borderô com equipe",
    ],
  },
  {
    grupo: "006 - ELENCO",
    itens: [
      "Ator Principal 1",
      "Ator Principal 2",
      "Atores Coadjuvantes 1",
      "Modelo 1",
      "Modelo 2",
      "Crianças 1",
      "Figuração Especial",
      "Outros Gastos com Elenco",
      "Transf. Borderô",
    ],
  },
  {
    grupo: "007 - ALIMENTAÇÃO",
    itens: [
      "Alimentação de Pre / Pós Prod.",
      "Alimentação de Filmagem 1",
      "Alimentação de Filmagem 2",
      "Verba de Manutenção Filmagem",
      "Cache de Manutenção",
      "Transf. Borderô",
    ],
  },
  {
    grupo: "008 - HOTEL",
    itens: [
      "Hotel Pré-pesquisa",
      "Hotel Equipe",
      "Hotel Cliente",
      "Hotel Agencia",
      "Hotel Celebridade",
      "Pernoiem Equipe",
      "Transf. Borderô",
    ],
  },
  {
    grupo: "009 - PASSAGENS AÉREAS",
    itens: [
      "Agencia",
      "Cliente",
      "Equipe - Filmagem",
      "Excesso de Bagagem",
      "Outras despesas de passagens",
      "Transf. Borderô",
    ],
  },
  {
    grupo: "010 - EQUIPAMENTO DE FILMAGEM",
    itens: [
      "Câmera 1",
      "Acessórios de Camera",
      "Lentes 1",
      "Motion Control",
      "Travelling",
      "Rádios",
      "Transf. Borderô",
    ],
  },
  {
    grupo: "011 - ILUMINAÇÃO",
    itens: [
      "Luz 1",
      "Gerador Grande",
      "Gerador Pq",
      "Estrutura de Iluminação",
      "Transf. Borderô",
    ],
  },
  {
    grupo: "012 - PRODUÇÃO DE SOM",
    itens: ["Trilha Sonora", "Locução", "Estúdio de Som", "Transf. Borderô"],
  },
  {
    grupo: "013 - FINALIZAÇÃO",
    itens: [
      "Edição",
      "Motion",
      "Correção de Cor",
      "Montador",
      "Stock Shot",
      "Cópia de Trabalho",
      "Transf. Borderô",
    ],
  },
  {
    grupo: "014 - OUTROS",
    itens: [
      "Condecine",
      "Sindicine",
      "Seguro",
      "Sated",
      "Assessoria Jurídica",
      "Testagem COVID-19",
    ],
  },
  {
    grupo: "015 - OUTROS FORA DA TAXA",
    itens: ["Fora Taxa 1", "Fora Taxa 2", "Fora Taxa 3"],
  },
];

function showOrcamentoDetailScreen() {
  navigateTo(
    "orcamento-detalhe",
    document.querySelector('.submenu-item[data-target="orcamento-lista"]')
  );
  handleOrcamentoTabClick(
    document.querySelector('.orcamento-tab-button[data-target="tab-planilha"]')
  );
}

function showOrcamentoListScreen() {
  navigateTo(
    "orcamento-lista",
    document.querySelector('.submenu-item[data-target="orcamento-lista"]')
  );
}

function handleOrcamentoTabClick(clickedTab) {
  document
    .querySelectorAll(".orcamento-tab-button")
    .forEach((b) => b.classList.remove("active"));
  clickedTab.classList.add("active");
  document
    .querySelectorAll(".orcamento-tab-content")
    .forEach((c) => c.classList.add("hidden"));
  const targetId = clickedTab.dataset.target;
  const targetContent = document.getElementById(targetId);
  if (targetContent) {
    targetContent.classList.remove("hidden");
    if (
      targetId === "tab-planilha" &&
      !targetContent.querySelector("table").querySelector("tbody")
    ) {
      renderPlanilhaDeCusto(targetContent.querySelector("table"));
    }
  }
}

function toggleGroup(groupHeader) {
  const groupName = groupHeader.dataset.group;
  const icon = groupHeader.querySelector("i");
  groupHeader.classList.toggle("expanded");
  document
    .querySelectorAll(`.item-row[data-group="${groupName}"]`)
    .forEach((row) => {
      row.classList.toggle("hidden");
    });
}

function renderPlanilhaDeCusto(table) {
  if (!table || table.querySelector("tbody")) return;
  let html = `<thead class="bg-slate-100"><tr><th class="p-2 w-2/12 text-left">Descrição</th><th class="p-2 w-1/12 text-right">Qtd</th><th class="p-2 w-1/12 text-right">Vlr. Unit.</th><th class="p-2 w-1/12 text-right">Dias</th><th class="p-2 w-1/12">Unid.</th><th class="p-2 w-1/12 text-right">Total</th><th class="p-2 w-3/12">Obs.</th><th class="p-2 w-1/12"></th></tr></thead><tbody>`;
  orcamentoEstrutura.forEach((secao) => {
    html += `<tr class="bg-slate-200 font-bold group-toggle cursor-pointer" data-group="${secao.grupo}"><td class="p-2" colspan="7"><div class="flex items-center gap-2"><i data-feather="chevron-right" width="16" height="16"></i>${secao.grupo}</div></td><td class="p-2 text-center"><button type="button" class="add-item-btn text-blue-600"><i data-feather="plus-circle" class="w-4 h-4"></i></button></td></tr>`;
    secao.itens.forEach((item, index) => {
      html += createRowHtml(
        `${secao.grupo.split(" ")[0]}.${String(index + 1).padStart(
          3,
          "0"
        )} - ${item}`,
        secao.grupo
      );
    });
    html += `<tr class="bg-slate-100 font-semibold"><td colspan="5" class="p-2 text-right">Total ${secao.grupo}</td><td class="p-2 text-right font-mono group-total" data-group-total="${secao.grupo}">R$ 0,00</td><td colspan="2"></td></tr>`;
  });
  html += `</tbody><tfoot class="bg-slate-800 text-white font-bold"><tr><td colspan="5" class="p-3 text-right text-lg">TOTAL PLANILHA</td><td id="orcamento-total-geral" class="p-3 text-right text-lg font-mono">R$ 0,00</td><td colspan="2"></td></tr></tfoot>`;
  table.innerHTML = html;
  feather.replace();
  calcularTotalPlanilha();
}

function createRowHtml(descricao = "Novo Item", grupo) {
  return `<tr class="border-b item-row hidden" data-group="${grupo}"><td class="p-2"><input type="text" class="w-full bg-slate-50 p-1 rounded" value="${descricao}"></td><td><input type="number" class="orcamento-input w-full text-right bg-slate-50 p-1 rounded" data-col="quantidade" value="1" min="0"></td><td><input type="number" class="orcamento-input w-full text-right bg-slate-50 p-1 rounded" data-col="valor_unitario" value="0" min="0" step="0.01"></td><td><input type="number" class="orcamento-input w-full text-right bg-slate-50 p-1 rounded" data-col="qtd_dias" value="1" min="0"></td><td><input type="text" class="w-full bg-slate-50 p-1 rounded" value="diárias"></td><td class="text-right font-mono p-2" data-col="valor_total">R$ 0,00</td><td><input type="text" class="w-full bg-slate-50 p-1 rounded"></td><td class="text-center"><div class="flex items-center justify-center gap-2"><button type="button" class="duplicate-row text-slate-500"><i data-feather="copy" class="w-4 h-4"></i></button><button type="button" class="delete-row text-red-500"><i data-feather="trash-2" class="w-4 h-4"></i></button></div></td></tr>`;
}

function adicionarLinha(button) {
  const groupRow = button.closest("tr");
  const groupName = groupRow.dataset.group;
  groupRow.insertAdjacentHTML(
    "afterend",
    createRowHtml("Novo Item", groupName)
  );
  feather.replace();
}

function duplicarLinha(button) {
  const row = button.closest("tr");
  const newRow = row.cloneNode(true);
  row.after(newRow);
  feather.replace();
  calcularTotalPlanilha();
}

function deleteLinha(button) {
  button.closest("tr").remove();
  calcularTotalPlanilha();
}

function calcularLinha(row) {
  const quantidade =
    parseFloat(row.querySelector('[data-col="quantidade"]').value) || 0;
  const valorUnitario =
    parseFloat(row.querySelector('[data-col="valor_unitario"]').value) || 0;
  const qtdDias =
    parseFloat(row.querySelector('[data-col="qtd_dias"]').value) || 0;
  const total = quantidade * valorUnitario * qtdDias;
  row.querySelector('[data-col="valor_total"]').textContent =
    total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  calcularTotalPlanilha();
}

function calcularTotalPlanilha() {
  let totalGeral = 0;
  document.querySelectorAll('[data-group-row="true"]').forEach((groupRow) => {
    let groupTotal = 0;
    const groupName = groupRow.dataset.group;
    let nextRow = groupRow.nextElementSibling;
    while (nextRow && nextRow.classList.contains("item-row")) {
      const valor =
        parseFloat(
          nextRow
            .querySelector('[data-col="valor_total"]')
            .textContent.replace("R$", "")
            .replace(/\./g, "")
            .replace(",", ".")
            .trim()
        ) || 0;
      groupTotal += valor;
      nextRow = nextRow.nextElementSibling;
    }
    const totalCell = document.querySelector(
      `.group-total[data-group-total="${groupName}"]`
    );
    if (totalCell)
      totalCell.textContent = groupTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    totalGeral += groupTotal;
  });
  document.getElementById("orcamento-total-geral").textContent =
    totalGeral.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const custoProducaoEl = document.getElementById("resumo-custo-producao");
  if (custoProducaoEl) {
    custoProducaoEl.dataset.valor = totalGeral;
    calcularResumoFinal();
  }
}

function calcularResumoFinal() {
  const custoProducaoEl = document.getElementById("resumo-custo-producao");
  const custoProducao = parseFloat(custoProducaoEl.dataset.valor) || 0;
  custoProducaoEl.textContent = custoProducao.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  let totalAcumulado = custoProducao;

  document
    .querySelectorAll('.resumo-input[data-calculo="percentual"]')
    .forEach((input) => {
      const baseEl = document.getElementById(input.dataset.base);
      const baseValue = parseFloat(baseEl.dataset.valor) || 0;
      const percent = parseFloat(input.value) || 0;
      const resultadoEl = document.querySelector(
        `[data-resultado="${
          input.closest("tr").querySelector("[data-resultado]").dataset
            .resultado
        }"]`
      );

      const valorCalculado = baseValue * (percent / 100);
      if (resultadoEl) {
        resultadoEl.textContent = valorCalculado.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        resultadoEl.dataset.valor = valorCalculado;
      }
    });

  const totalSemHonorariosEl = document.getElementById(
    "resumo-total-sem-honorarios"
  );
  totalSemHonorariosEl.dataset.valor = custoProducao;
  totalSemHonorariosEl.textContent = custoProducao.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  let totalFinal = custoProducao;
  document
    .querySelectorAll("#resumo-valores [data-resultado]")
    .forEach((el) => {
      totalFinal += parseFloat(el.dataset.valor) || 0;
    });

  document.getElementById("resumo-total-geral").textContent =
    totalFinal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function toggleValoresPanel() {
  const valoresCol = document.getElementById("valores-col");
  const planilhaCol = document.getElementById("planilha-col");
  const isHidden = valoresCol.classList.toggle("hidden");
  planilhaCol.classList.toggle("lg:col-span-2", !isHidden);
  planilhaCol.classList.toggle("lg:col-span-3", isHidden);
}
