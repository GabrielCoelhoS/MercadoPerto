document.addEventListener("DOMContentLoaded", () => {

  // =====================================================
  // MENU: Ação para o botão com 3 barras (☰)
  // =====================================================
  const menuBtn = document.getElementById("menu-btn");
  const headerMenu = document.getElementById("header-menu");

  // Ao clicar no botão, alterna a classe 'hidden'
  menuBtn.addEventListener("click", () => {
    headerMenu.classList.toggle("hidden");
  });

  // =====================================================
  // NOVOS ITENS DO MENU QUE ABREM MODAIS (TELAS INTERNAS)
  // =====================================================
  // Para os itens que redirecionam ("Relatório semanal de vendas" e "Conectar PDV/ERP")
  // os links já estão definidos no HTML. Os itens abaixo, identificados por IDs, abrem os modais.
  const gerenciarTemasItem = document.getElementById("gerenciar-temas");
  const adicionarMarketInfoItem = document.getElementById("adicionar-market-info");

  // Seleciona os modais correspondentes (certifique-se de que existam no HTML)
  const modalGerenciarTemas = document.getElementById("modal-gerenciar-temas");
  const modalMarketInfo = document.getElementById("modal-market-info");

  // Funções para abrir e fechar modais
  function openModal(modal) {
    modal.classList.remove("hidden");
  }
  function closeModal(modal) {
    modal.classList.add("hidden");
  }

  // Adiciona os eventos para os itens que abrem os modais
  if (gerenciarTemasItem) {
    gerenciarTemasItem.addEventListener("click", () => {
      openModal(modalGerenciarTemas);
    });
  }
  if (adicionarMarketInfoItem) {
    adicionarMarketInfoItem.addEventListener("click", () => {
      openModal(modalMarketInfo);
    });
  }

  // Fecha os modais ao clicar em qualquer botão com a classe .close-modal-btn
  document.querySelectorAll(".close-modal-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const modal = e.target.closest(".modal");
      closeModal(modal);
    });
  });

  // =====================================================
  // 1. EDIÇÃO DAS INFORMAÇÕES DO MERCADO
  // =====================================================
  const nomeMercado = document.getElementById("nome-mercado");
  const endereco = document.getElementById("endereco");
  const bairro = document.getElementById("bairro");
  const numero = document.getElementById("numero");
  const telefone = document.getElementById("telefone");
  const descricao = document.getElementById("descricao");
  const editButton = document.querySelector(".edit-btn");

  carregarInformacoes();

  function salvarInformacoes() {
    const nome = document.getElementById("edit-nome").value;
    const enderecoInfo = document.getElementById("edit-endereco").value;
    const bairroInfo = document.getElementById("edit-bairro").value;
    const numeroInfo = document.getElementById("edit-numero").value;
    const telefoneInfo = document.getElementById("edit-telefone").value;
    const descricaoInfo = document.getElementById("edit-descricao").value;

    localStorage.setItem("nomeMercado", nome);
    localStorage.setItem("endereco", enderecoInfo);
    localStorage.setItem("bairro", bairroInfo);
    localStorage.setItem("numero", numeroInfo);
    localStorage.setItem("telefone", telefoneInfo);
    localStorage.setItem("descricao", descricaoInfo);
  }

  function carregarInformacoes() {
    const nome = localStorage.getItem("nomeMercado");
    const enderecoInfo = localStorage.getItem("endereco");
    const bairroInfo = localStorage.getItem("bairro");
    const numeroInfo = localStorage.getItem("numero");
    const telefoneInfo = localStorage.getItem("telefone");
    const descricaoInfo = localStorage.getItem("descricao");

    if (nome) nomeMercado.innerHTML = `Nome mercado: ${nome}`;
    if (enderecoInfo) endereco.innerHTML = `Endereço: ${enderecoInfo}`;
    if (bairroInfo) bairro.innerHTML = `Bairro: ${bairroInfo}`;
    if (numeroInfo) numero.innerHTML = `Número: ${numeroInfo}`;
    if (telefoneInfo) telefone.innerHTML = `Telefone: ${telefoneInfo}`;
    if (descricaoInfo) descricao.innerHTML = `Descrição: ${descricaoInfo}`;
  }

  editButton.addEventListener("click", () => {
    if (editButton.innerHTML === "✎") {
      // Transforma as informações em inputs para edição
      nomeMercado.innerHTML = `<input type="text" id="edit-nome" value="${nomeMercado.innerHTML.replace("Nome mercado: ", "")}">`;
      endereco.innerHTML = `<input type="text" id="edit-endereco" value="${endereco.innerHTML.replace("Endereço: ", "")}">`;
      bairro.innerHTML = `<input type="text" id="edit-bairro" value="${bairro.innerHTML.replace("Bairro: ", "")}">`;
      numero.innerHTML = `<input type="text" id="edit-numero" value="${numero.innerHTML.replace("Número: ", "")}">`;
      telefone.innerHTML = `<input type="text" id="edit-telefone" value="${telefone.innerHTML.replace("Telefone: ", "")}">`;
      descricao.innerHTML = `<input type="text" id="edit-descricao" value="${descricao.innerHTML.replace("Descrição: ", "")}">`;
      editButton.innerHTML = "💾";
    } else {
      // Validação: verifica se todos os campos foram preenchidos
      const nomeValor = document.getElementById("edit-nome").value.trim();
      const enderecoValor = document.getElementById("edit-endereco").value.trim();
      const bairroValor = document.getElementById("edit-bairro").value.trim();
      const numeroValor = document.getElementById("edit-numero").value.trim();
      const telefoneValor = document.getElementById("edit-telefone").value.trim();
      const descricaoValor = document.getElementById("edit-descricao").value.trim();

      if (!nomeValor || !enderecoValor || !bairroValor || !numeroValor || !telefoneValor || !descricaoValor) {
        alert("Por favor, preencha todos os campos antes de salvar.");
        return;
      }

      salvarInformacoes();
      carregarInformacoes();
      editButton.innerHTML = "✎";
    }
  });

  // =====================================================
  // 2. MODAL PARA CADASTRO DE PRODUTOS
  // =====================================================
  const registerManuallyButton = document.getElementById("manual-register-btn");
  const manualProductModal = document.getElementById("manual-product-modal");
  const closeModalBtn = manualProductModal.querySelector(".close-modal-btn");
  const cancelProductBtn = document.getElementById("cancel-product-btn");
  const manualProductForm = document.getElementById("manual-product-form");

  function openModalProduct() {
    manualProductModal.classList.remove("hidden");
  }
  function closeModalProduct() {
    manualProductModal.classList.add("hidden");
  }
  registerManuallyButton.addEventListener("click", openModalProduct);
  closeModalBtn.addEventListener("click", closeModalProduct);
  cancelProductBtn.addEventListener("click", closeModalProduct);

  // =====================================================
  // 3. CADASTRO E EXIBIÇÃO DOS PRODUTOS
  // =====================================================
  function addProductToDOM(product) {
    const productsContainer = document.querySelector("#best-sellers .products");
    const newProductDiv = document.createElement("div");
    newProductDiv.classList.add("product");
    newProductDiv.setAttribute("data-id", product.id);

    // Imagem do produto
    const newImg = document.createElement("img");
    newImg.classList.add("produto-img");
    newImg.alt = product.productName || "Produto cadastrado";
    newImg.src = product.productImage ? product.productImage : "sem-imagem.png";

    // Informações do produto
    const pricePara = document.createElement("p");
    pricePara.textContent = product.productPrice || "R$0,00";

    const namePara = document.createElement("p");
    namePara.textContent = product.productName || "Nome não informado";

    const descPara = document.createElement("p");
    descPara.textContent = product.productDescription || "";

    const sessionPara = document.createElement("p");
    sessionPara.textContent = product.productSession
      ? `Sessão: ${product.productSession}`
      : "Sessão: Não definida";

    // Botão para excluir o produto
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Excluir";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      if (confirm("Tem certeza?")) {
        excluirProduto(product.id);
      }
    });

    newProductDiv.appendChild(newImg);
    newProductDiv.appendChild(pricePara);
    newProductDiv.appendChild(namePara);
    newProductDiv.appendChild(descPara);
    newProductDiv.appendChild(sessionPara);
    newProductDiv.appendChild(deleteBtn);

    productsContainer.appendChild(newProductDiv);
  }

  function salvarProdutoNoStorage(product) {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos.push(product);
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }

  function carregarProdutos() {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const productsContainer = document.querySelector("#best-sellers .products");
    productsContainer.innerHTML = "";
    produtos.forEach((produto) => {
      addProductToDOM(produto);
    });
  }

  function excluirProduto(id) {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos = produtos.filter((produto) => produto.id !== id);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    carregarProdutos();
  }

  carregarProdutos();

  manualProductForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const productName = document.getElementById("productName").value;
    const productDescription = document.getElementById("productDescription").value;
    const productPrice = document.getElementById("productPrice").value;
    const productStock = document.getElementById("productStock").value;
    const productSession = document.getElementById("productSession").value;
    const fileInput = document.getElementById("productImage");
    const productImageFile = fileInput.files[0];

    function processaProduto(productImageDataURL = null) {
      const product = {
        id: Date.now(),
        productName,
        productDescription,
        productPrice,
        productStock,
        productSession,
        productImage: productImageDataURL,
      };

      salvarProdutoNoStorage(product);
      addProductToDOM(product);
      closeModalProduct();
      manualProductForm.reset();
    }

    if (productImageFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        processaProduto(e.target.result);
      };
      reader.readAsDataURL(productImageFile);
    } else {
      processaProduto();
    }
  });

  // =====================================================
  // 4. CADASTRO DE NOVA CATEGORIA/SESSÃO
  // =====================================================
  const addCategoryButton = document.querySelector(".add-category");
  const categoryModal = document.getElementById("category-modal");
  const closeCategoryModalBtn = document.getElementById("close-category-modal");
  const cancelCategoryBtn = document.getElementById("cancel-category-btn");
  const saveCategoryBtn = document.getElementById("save-category-btn");

  function openCategoryModal() {
    categoryModal.classList.remove("hidden");
  }
  function closeCategoryModal() {
    categoryModal.classList.add("hidden");
    // Reseta os campos do modal de categoria
    document.getElementById("categoryImage").value = "";
    document.getElementById("categoryName").value = "";
  }

  addCategoryButton.addEventListener("click", openCategoryModal);
  closeCategoryModalBtn.addEventListener("click", closeCategoryModal);
  cancelCategoryBtn.addEventListener("click", closeCategoryModal);

  // Cria o card da nova categoria na área de categorias (versão com botão de exclusão)
  function addCategoryToDOM(newCategory) {
    const categoriesContainer = document.querySelector("#categories > div");
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category-wrapper");
    categoryDiv.setAttribute("data-id", newCategory.id);

    const categoryAnchor = document.createElement("a");
    categoryAnchor.classList.add("category");
    categoryAnchor.href = "#";

    const img = document.createElement("img");
    img.classList.add("category-img");
    img.alt = newCategory.name;
    img.src = newCategory.image ? newCategory.image : "sem-imagem.png";

    const span = document.createElement("span");
    span.textContent = newCategory.name;

    // Botão de exclusão
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Excluir";
    deleteBtn.classList.add("delete-category-btn");
    deleteBtn.addEventListener("click", () => {
      if (confirm("Tem certeza que deseja excluir esta sessão?")) {
        excluirCategoria(newCategory.id);
      }
    });

    categoryAnchor.appendChild(img);
    categoryAnchor.appendChild(span);
    categoryDiv.appendChild(categoryAnchor);
    categoryDiv.appendChild(deleteBtn);
    categoriesContainer.appendChild(categoryDiv);
  }

  // Ao salvar a nova categoria, processa os dados e atualiza a interface
  saveCategoryBtn.addEventListener("click", () => {
    const categoryNameInput = document.getElementById("categoryName");
    const categoryName = categoryNameInput.value.trim();
    if (!categoryName) {
      alert("Por favor, insira um nome para a sessão.");
      return;
    }
    const categoryImageInput = document.getElementById("categoryImage");
    const categoryImageFile = categoryImageInput.files[0];

    function processCategory(imageDataUrl = null) {
      const newCategory = {
        id: Date.now(),
        name: categoryName,
        image: imageDataUrl,
      };

      // Salva a nova categoria no localStorage (opcional)
      let categories = JSON.parse(localStorage.getItem("categories")) || [];
      categories.push(newCategory);
      localStorage.setItem("categories", JSON.stringify(categories));

      // Adiciona o novo card na área de categorias
      addCategoryToDOM(newCategory);

      // Adiciona a nova sessão como opção no select do cadastro de produtos
      const productSessionSelect = document.getElementById("productSession");
      const newOption = document.createElement("option");
      newOption.value = newCategory.name;
      newOption.textContent = newCategory.name;
      productSessionSelect.appendChild(newOption);

      closeCategoryModal();
    }

    if (categoryImageFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        processCategory(e.target.result);
      };
      reader.readAsDataURL(categoryImageFile);
    } else {
      processCategory();
    }
  });

  // Carrega categorias salvas (se houver) ao iniciar a página
  function carregarCategorias() {
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    const categoriesContainer = document.querySelector("#categories > div");
    categoriesContainer.innerHTML = "";
    storedCategories.forEach((category) => addCategoryToDOM(category));
  }

  carregarCategorias();

  // =====================================================
  // NOVA FUNCIONALIDADE: GERENCIAR TEMAS
  // =====================================================
  const applyThemeBtn = document.getElementById("apply-theme-btn");
  const themeColorInput = document.getElementById("theme-color");
  const marketInfoSection = document.getElementById("market-info");

  applyThemeBtn.addEventListener("click", () => {
    const selectedColor = themeColorInput.value;
    marketInfoSection.style.backgroundColor = selectedColor;
    localStorage.setItem("marketInfoBgColor", selectedColor);
  });

  const savedColor = localStorage.getItem("marketInfoBgColor");
  if (savedColor) {
    marketInfoSection.style.backgroundColor = savedColor;
  }

  // =====================================================
  // NOVA FUNCIONALIDADE: ADICIONAR INFORMAÇÕES NAS market-info
  // =====================================================
  const addInfoBtn = document.getElementById("add-info-btn");
  const infoKeyInput = document.getElementById("info-key");
  const infoValueInput = document.getElementById("info-value");

  addInfoBtn.addEventListener("click", () => {
    const infoKey = infoKeyInput.value.trim();
    const infoValue = infoValueInput.value.trim();
    if (infoKey === "" || infoValue === "") {
      alert("Por favor, preencha ambos os campos.");
      return;
    }
    const marketDetailsDiv = document.querySelector("#market-info .market-details");
    const newInfoPara = document.createElement("p");
    newInfoPara.classList.add("custom-info");
    newInfoPara.textContent = `${infoKey}: ${infoValue}`;
    marketDetailsDiv.appendChild(newInfoPara);

    let customMarketInfo = JSON.parse(localStorage.getItem("customMarketInfo")) || [];
    customMarketInfo.push({ key: infoKey, value: infoValue });
    localStorage.setItem("customMarketInfo", JSON.stringify(customMarketInfo));

    infoKeyInput.value = "";
    infoValueInput.value = "";
    closeModal(modalMarketInfo);
  });

  function carregarCustomMarketInfo() {
    let customMarketInfo = JSON.parse(localStorage.getItem("customMarketInfo")) || [];
    const marketDetailsDiv = document.querySelector("#market-info .market-details");
    customMarketInfo.forEach(info => {
      const p = document.createElement("p");
      p.classList.add("custom-info");
      p.textContent = `${info.key}: ${info.value}`;
      marketDetailsDiv.appendChild(p);
    });
  }
  carregarCustomMarketInfo();

});
