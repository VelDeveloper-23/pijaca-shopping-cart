let AllTotal = 0;

function addToCart(element) {
  let mainEl = element.closest(".single-item"); //od funkcije addToCart uzimamo roditelja .single-item (div)
  let price = mainEl.querySelector(".price").innerText; //iz tog div-a izvlacimo cenu = $10, tako sto selektujemo klasu .price i njen tekst pomocu innerText-a
  let name = mainEl.querySelector("h3").innerText;
  let quantity = mainEl.querySelector("input").value; //za input uvek satvljamo .value
  let cartItems = document.querySelector(".cart-items"); //pozivamo prazan div gde ce sve pisati vezano za cenu i kupovinu

  //parseInt quantitu pretvara u broj
  if (parseInt(quantity) > 0) {
    price = price.substring(1); //substring (1)zabog $ na ceni..zbog kalkulatora
    price = parseInt(price);
    let total = price * parseInt(quantity);

    AllTotal += total;

    console.log(total);
    //u prazan div cartItems se html struktura
    cartItems.innerHTML += `<div class="cart-single-item">
      <h3>${name}</h3>
      
      <p>$${price} x ${quantity} = $<span>${total}</span></p>
      <button onclick="removeFromCart(this)" class="remove-item">Ukloni</button>
    
                          </div>`;

    document.querySelector(".total").innerText = `Total: $${AllTotal}`;

    // cartItems.innerHTML += `Proizvod: ${name} -
    //                         Cena: ${price} -
    //                         Kolicina: ${quantity}
    //                         Total: ${total}<br>`;

    element.innerText = "Dodato"; //kada se klikne dugme dodaj pojavljuje se tekst dodato
    element.setAttribute("disabled", "true"); //dugme postaje neaktivno
  } else {
    alert("Odaberi kolicinu");
  }

  // let input = element.previousElementSibling; previousElementSibling korisitmo da bi na klik dugmeta uzeli vrednost koja je iz prethodnog elementa
}
//brisanje iz korpe
function removeFromCart(element) {
  let mainEl = element.closest(".cart-single-item");
  let price = mainEl.querySelector("p span").innerText;
  let name = mainEl.querySelector("h3").innerText;
  let vegetables = document.querySelectorAll(".single-item"); //sve ovo gore uzimamo potrebne elemente

  AllTotal -= price;
  document.querySelector(".total").innerText = `Total: $${AllTotal}`;
  mainEl.remove(); //jedan ceo div je obrisan (krompir, dajiz, sangarepa)

  vegetables.forEach(function (vege) {
    let itemName = vege.querySelector(".si-content h3").innerText; //pozivamo krompir i cenu

    //ako je krompir(itemName) = krompiru(name), u input se upisuje 0, dugme postaje aktivno, i na nemu pise Dodaj
    if (itemName === name) {
      vege.querySelector(".actions input").value = 0;
      vege.querySelector(".actions button").removeAttribute("disabled");
      vege.querySelector(".actions button").innerText = "Dodaj";
    }
  });
}
