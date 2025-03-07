const menu = document.getElementById("menu");
const cartBtn = document.getElementById("card-btn");
const cartModal = document.getElementById("cart-modal");
const cartItensConteiner = document.getElementById("card-items");
const cartTotal = document.getElementById("card-total");
const checkoutBtn = document.getElementById("checkout-btn");
const clouseModalBtn = document.getElementById("close-modal-btn");
const cardCalt = document.getElementById("cart-caunt");
const aderessInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];

/* abri modal */

cartBtn.addEventListener("click", function () {
  updateCartModal()
  cartModal.style.display = "flex";

});
/* FECHA MODAL */

cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

clouseModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none";
});
menu.addEventListener("click", function (event) {
  let parentButton = event.target.closest(".add-to-card-btn");
  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const pricie = parseFloat(parentButton.getAttribute("data-pricie"));

    addtocart(name, pricie);
  }
});

function addtocart(name, pricie) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
    return;
  }
  cart.push({
    name,
    pricie,
    quantity: 1,
  });
  updateCartModal();
}

function updateCartModal() {
  cartItensConteiner.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cardItemElement = document.createElement("div");
    cardItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")
    cardItemElement.innerHTML =
      `<div class="flex items-center justify-between"> 
         <div>
            <pclass="font-bold">${item.name}</pclass=> 
            <p>Qtd:${item.quantity}</p>
            <p clas="font-midium mt-2">R$:${item.pricie.toFixed(2)}</p>
         </div>
        <div>

         <button class="remove-from-btn  bg-red-400 rounded-md px-4 py-1" data-name =${item.name}>Remover</button>

        </div>
    </div>`

    total += item.pricie * item.quantity

    cartItensConteiner.appendChild(cardItemElement)
   /*  bg-red-400 rounded-md px-4 py-1 */ 

  })

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  cardCalt.innerText = cart.length
};
cartItensConteiner.addEventListener("click", function (event) {


  if (event.target.classList.contains("remove-from-btn")) {

    const name = event.target.getAttribute("data-name")
    removeItemCart(name)

    
  }

});

function removeItemCart(name) {
  const index = cart.findIndex(item => item.name === name)
  if (index !== -1) {
    const item = cart[index]
    if (item.quantity > 1) {
      item.quantity -= 1
      updateCartModal()
      return;
    }
    cart.splice(index, 1);
    updateCartModal()
  }
}

