document.addEventListener("DOMContentLoaded", function () {
  const tabPagar = document.getElementById("tab-pagar");
  const tabReceber = document.getElementById("tab-receber");
  const contentArea = document.getElementById("financeiro-content");

  const pagarTableTemplate = `
        <div class="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">Situação</th>
                        <th scope="col" class="px-6 py-3">Fornecedor</th>
                        <th scope="col" class="px-6 py-3">Previsão</th>
                        <th scope="col" class="px-6 py-3 text-right">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    ${contasAPagarData
                      .map(
                        (item) => `
                        <tr class="bg-white border-b hover:bg-gray-50">
                            <td class="px-6 py-4">${item.situacao}</td>
                            <td class="px-6 py-4 font-medium text-gray-900">${
                              item.fornecedor
                            }</td>
                            <td class="px-6 py-4">${item.previsao}</td>
                            <td class="px-6 py-4 font-mono text-right">${item.valor.toLocaleString(
                              "pt-BR",
                              { style: "currency", currency: "BRL" }
                            )}</td>
                        </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>
        </div>
    `;

  const receberTableTemplate = `
        <div class="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">Situação</th>
                        <th scope="col" class="px-6 py-3">Cliente</th>
                        <th scope="col" class="px-6 py-3">Vencimento</th>
                        <th scope="col" class="px-6 py-3 text-right">Valor</th>
                    </tr>
                </thead>
                <tbody>
                     ${contasAReceberData
                       .map(
                         (item) => `
                        <tr class="bg-white border-b hover:bg-gray-50">
                            <td class="px-6 py-4">${item.situacao}</td>
                            <td class="px-6 py-4 font-medium text-gray-900">${
                              item.cliente
                            }</td>
                            <td class="px-6 py-4">${item.vencimento}</td>
                            <td class="px-6 py-4 font-mono text-right">${item.valor.toLocaleString(
                              "pt-BR",
                              { style: "currency", currency: "BRL" }
                            )}</td>
                        </tr>
                    `
                       )
                       .join("")}
                </tbody>
            </table>
        </div>
    `;

  function showPagar() {
    contentArea.innerHTML = pagarTableTemplate;
    tabPagar.className =
      "tab-btn border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm";
    tabReceber.className =
      "tab-btn border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm";
  }

  function showReceber() {
    contentArea.innerHTML = receberTableTemplate;
    tabReceber.className =
      "tab-btn border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm";
    tabPagar.className =
      "tab-btn border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm";
  }

  tabPagar.addEventListener("click", showPagar);
  tabReceber.addEventListener("click", showReceber);

  // Renderização inicial
  showPagar();
});
