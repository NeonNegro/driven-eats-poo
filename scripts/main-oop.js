class Order {

    selections = {
        dish: null,
        drink: null,
        dessert: null,
    };

    selectedDish = null;
    selectedDrink = null;
    selectedDessert = null;

    btnConfirm = document.querySelector(".confirmar");
    btnCancel = document.querySelector(".cancelar");
    btnSendOrder = document.querySelector(".fazer-pedido");

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
            o.element.addEventListener("click", () =>{ this.selectMenuOption(o) })
        })

        this.btnConfirm.addEventListener("click", () => {
            //const selections = this.selections;
            //const totalPrice = this.totalPrice;
            //console.log(selections, totalPrice);
            this.sendZap()
        });
        this.btnCancel.addEventListener("click", this.cancelOrder);
        this.btnSendOrder.addEventListener("click", () =>{this.confirmOrder(this.selections)});
    }

    selectMenuOption(option) {
        const selected = document.querySelector(`.${option.className} .selected`);
        if(selected !== null)
            selected.classList.remove("selected");

        option.element.classList.add('selected');

        console.log(this.selections[option.className]);
        this.selections[option.className] = { name: option.name, price: option.price };
        console.log(this.selections[option.className]);
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

    confirmOrder(selections) {
        const modal = document.querySelector(".overlay");
        modal.classList.remove("escondido");
        document.querySelector(".confirmar-pedido .dish .nome").innerHTML =
        this.selections['dish'].name;
        document.querySelector(".confirmar-pedido .dish .preco").innerHTML =
        this.selections['dish'].price.toFixed(2);
      
        document.querySelector(".confirmar-pedido .drink .nome").innerHTML =
        this.selections['drink'].name;
        document.querySelector(".confirmar-pedido .drink .preco").innerHTML =
        this.selections['drink'].price.toFixed(2);
      
        document.querySelector(".confirmar-pedido .dessert .nome").innerHTML =
        this.selections['dessert'].name;
        document.querySelector(".confirmar-pedido .dessert .preco").innerHTML =
        this.selections['dessert'].price.toFixed(2);
      
        document.querySelector(".confirmar-pedido .total .preco").innerHTML =
          this.totalPrice.toFixed(2);
    }

    cancelOrder() {
        const modal = document.querySelector(".overlay");
        modal.classList.add("escondido");
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
    constructor(name, image, description, price, className, imageRoot = 'img/'){
        this.name = name;
        this.image = imageRoot + image;
        this.description = description;
        this.price = price;
        this.className = className;
        this.element = document.createElement("div");

        const menuOptionContainer = document.querySelector(`.opcoes.${className}`);
        this.createMenuOptionView();
        menuOptionContainer.appendChild(this.element);
    }

    selectMenuOption() {
        const selected = document.querySelector(`.${this.className} .selected`);
        if(selected !== null)
            selected.classList.remove("selected");

        this.element.classList.add('selected');

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




const order = new Order();
