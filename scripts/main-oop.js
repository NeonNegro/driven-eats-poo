class Order {

    selections = {
        dish: null,
        drink: null,
        dessert: null,
    };

    btnConfirm = document.querySelector(".confirmar");
    btnCancel = document.querySelector(".cancelar");
    btnSendOrder = document.querySelector(".fazer-pedido");
    modal = document.querySelector(".overlay");

    constructor() {
        this.options = [
            new Dish("Estrombelete de Frango", "frango_yin_yang.png", "Um pouco de batata, um pouco de salada", 14.9),
            new Dish("Asa de Boi", "frango_yin_yang.png", "Com molho shoyu", 15.9),
            new Dish("Carne de Monstro", "frango_yin_yang.png", "Com batata assada e farofa", 16.9),
            new Drink("Coquinha gelada", "coquinha_gelada.png", "Lata 350ml", 4.9),
            new Drink("Caldo de Cana", "coquinha_gelada.png", "Copo 600ml", 5.9),
            new Drink("Corote Gelado", "coquinha_gelada.png", "Garrafa 400ml", 6.9),
            new Dessert("Pudim", "pudim.png", "Gosto de doce de leite", 7.9),
            new Dessert("Flam", "pudim.png", "Gosto de chocolate", 8.9),
            new Dessert("Brigadeiro", "pudim.png", "3 unidades", 9.9)
        ]

        this.options.forEach( o => {
            o.element.addEventListener("click", () => { this.selectMenuOption(o) })
        })

        this.btnConfirm.addEventListener("click", () => this.sendZap());
        this.btnCancel.addEventListener("click", () => this.cancelOrder());
        this.btnSendOrder.addEventListener("click", () => this.confirmOrder());
    }

    selectMenuOption(option) {
        const selected = document.querySelector(`.${option.type} .selected`);
        if(selected !== null)
            selected.classList.remove("selected");

        option.element.classList.add('selected');

        this.selections[option.type] = { name: option.name, price: option.price };
        this.verifyOrder();
    }

    get totalPrice() {
        return (
          Number(this.selections['dish']?.price || 0) +
          Number(this.selections['drink']?.price || 0) +
          Number(this.selections['dessert']?.price || 0)
        );
    }

    verifyOrder() {
        if (this.selections['dish'] && this.selections['drink'] && this.selections['dessert']) {
            this.btnSendOrder.classList.add("ativo");
            this.btnSendOrder.disabled = false;
            this.btnSendOrder.innerHTML = "Fazer pedido";
        }
    }

    confirmOrder() {
        this.modal.classList.remove("escondido");

        for (const option in this.selections) {
            document.querySelector(`.confirmar-pedido .${option} .nome`).innerHTML =
            this.selections[option].name;
            document.querySelector(`.confirmar-pedido .${option} .preco`).innerHTML =
            this.selections[option].price.toFixed(2);
        }

        document.querySelector(".confirmar-pedido .total .preco").innerHTML =
          this.totalPrice.toFixed(2);
    }

    cancelOrder() {
        this.modal.classList.add("escondido");
    }

    
    sendZap() {
        const telefoneRestaurante = 553299999999;
        const encodedText = encodeURIComponent(
        `Olá, gostaria de fazer o pedido: \n- Prato: ${
            this.selections['dish'].name
        } \n- Bebida: ${this.selections['drink'].name} \n- Sobremesa: ${
            this.selections['dessert'].name
        } \nTotal: R$ ${this.totalPrice.toFixed(2)}`
        );
    
        const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${encodedText}`;
        window.open(urlWhatsapp);
    }
}


class MenuOption {
    constructor(name, image, description, price, type, imageRoot = 'img/'){
        this.name = name;
        this.image = imageRoot + image;
        this.description = description;
        this.price = price;
        this.type = type;
        this.element = document.createElement("div");

        const menuOptionContainer = document.querySelector(`.opcoes.${type}`);
        this.createMenuOptionView();
        menuOptionContainer.appendChild(this.element);
    }

    createMenuOptionView(){
            this.element.classList.add("opcao");
            this.element.innerHTML = `
                  <img src="${this.image}" />
                  <div class="titulo">${this.name}</div>
                  <div class="descricao">${this.description}</div>
                  <div class="fundo">
                      <div class="preco">R$ ${this.price.toFixed(2)}</div>
                      <div class="check">
                          <ion-icon name="checkmark-circle"></ion-icon>
                      </div>
                  </div>
              `;
    }
}

class Dish extends MenuOption {
    constructor(name, image, description, price, _imageRoot = 'img/'){
        super(name, image, description, price, 'dish', _imageRoot = 'img/');
    }
}

class Drink extends MenuOption {
    constructor(name, image, description, price, _imageRoot = 'img/'){
        super(name, image, description, price, 'drink', _imageRoot = 'img/');
    }
}

class Dessert extends MenuOption {
    constructor(name, image, description, price, _imageRoot = 'img/'){
        super(name, image, description, price, 'dessert', _imageRoot = 'img/');
    }
}


new Order();
