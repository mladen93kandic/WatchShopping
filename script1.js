var addButton = document.getElementById("addbutton");
addButton.addEventListener("click", setNewValues);
window.addEventListener("load", setStorageValues);
window.addEventListener("load", addDetailsAndBuyToLocal);
//localStorage.clear();
//PITAJ STEVANA ZASTO KAD OBRISEM LOKAL STORIZ GAZI FUNCKIJU ADD?
var arrOfWatches;
//console.log(window.localStorage.arrOfWatches);

function setStorageValues() {
    if (localStorage.getItem("arrOfWatches")) {
        arrOfWatches = JSON.parse(localStorage.getItem("arrOfWatches"));
        for (watch of arrOfWatches) {
            var productName = watch.name;
            var productDescription = watch.description;
            var productImage = watch.image;
            var productPrice = watch.price;
            addItem(productName, productDescription, productImage, productPrice);
        }
    } else {
        arrOfWatches = [];
        localStorage.setItem("arrOfWatches", JSON.stringify(arrOfWatches));
    }
}

function setNewValues() {
    var newWatchObj = {};
    var productName = document.getElementById("productname").value;
    var productDescription = document.getElementById("productdescription").value;
    var productImage = document.getElementById("productimage").value;
    var productPrice = document.getElementById("productprice").value;
    addItem(productName, productDescription, productImage, productPrice);
    newWatchObj.name = productName;
    newWatchObj.description = productDescription;
    newWatchObj.image = productImage;
    newWatchObj.price = productPrice;
    arrOfWatches.push(newWatchObj);
    localStorage.setItem("arrOfWatches", JSON.stringify(arrOfWatches));
    console.log(window.localStorage);

}



function addItem(productName, productDescription, productImage, productPrice) {
    var listProducts = document.getElementsByClassName("list-products")[0];
    var newDiv = document.createElement("div");
    newDiv.className = "product";
    var newP = document.createElement("p");
    newP.innerHTML = productName;
    newDiv.appendChild(newP);
    var newImg = document.createElement("img");
    if (productImage) { newImg.src = productImage } else { newImg.src = "SAT.jpg" }
    newDiv.appendChild(newImg);
    var newP1 = document.createElement("p");
    newP1.innerHTML = productDescription;
    newDiv.appendChild(newP1);
    var newP1 = document.createElement("p");
    newP1.innerHTML = "$" + productPrice;
    newDiv.appendChild(newP1);
    var newButton = document.createElement("button");
    newButton.classList = "details-button";
    newButton.addEventListener("click", showModalWindow1)
    newButton.innerHTML = "Details";
    newDiv.appendChild(newButton);
    var newButton1 = document.createElement("button");
    newButton1.classList = "buy-button";
    newButton1.addEventListener("click", addToChart);
    newButton1.innerHTML = "Buy";
    newDiv.appendChild(newButton1);
    listProducts.appendChild(newDiv);
    $(document).ready(function() {
        $(".details-button").click(function() {
            $(".modalwindow").show(1000);
        });
    });
    document.getElementById("productname").value = "";
    document.getElementById("productdescription").value = "";
    document.getElementById("productimage").value = "";
    document.getElementById("productprice").value = "";
}

function addDetailsAndBuyToLocal() {
    var details = document.getElementsByClassName("details-button");
    for (var k = 0; k < details.length; k++) {
        details[k].addEventListener("click", showModalWindow1);
        $(document).ready(function() {
            $(".details-button").click(function() {
                $(".modalwindow").show(1000);
            });
        });
    }
    var buyButton = document.getElementsByClassName("buy-button");
    for (var c = 0; c < buyButton.length; c++) {
        buyButton[c].addEventListener("click", addToChart);
    }
}

//ovo samo sluzi zbog ova prva dva sata koja su vec u html-u
function showModalWindow1(e) {
    var container = document.getElementsByClassName("container")[0];
    var modal = document.getElementsByClassName("modalwindow")[0];
    var current = e.target;
    var main = current.parentElement;
    modal.innerHTML += "<p>" + main.children[0].innerText + "</p>";
    if (main.children[1].src) { var imgsrc = main.children[1].src; } else { imgsrc = "SAT.jpg"; }
    modal.innerHTML += "<img src=\"" + imgsrc + "\"/>"
    modal.innerHTML += "<p>" + main.children[3].innerText + "</p>";
    container.style.display = "none";
    var hideModal = document.getElementById("exit");
    hideModal.addEventListener("click", exitModal);

}

function exitModal(e) {
    modal = document.getElementsByClassName("modalwindow")[0];
    modal.style.display = "none";
    modal.innerHTML = "";
    var addExit = document.createElement("div");
    addExit.id = "exit";
    addExit.innerHTML = "+";
    modal.appendChild(addExit);
    var container = document.getElementsByClassName("container")[0];
    container.style.display = "flex";
}

function addToChart(e) {
    var productsInfo = document.getElementsByClassName("product-info");
    var arrOfBoughtWatches = [];
    var main = e.target.parentElement;
    for (var e = 0; e < productsInfo.length; e++) {
        arrOfBoughtWatches.push((productsInfo[e].children[0].children[0].innerText).toLowerCase());
    }
    if (arrOfBoughtWatches.indexOf(main.children[0].innerText.toLowerCase()) === -1) {
        var shoppingCartProducts = document.getElementsByClassName("shopping-cart-products")[0];
        var shoppingCartProduct = document.createElement("div");
        shoppingCartProduct.className = "shopping-cart-product";
        var productInfo = document.createElement("div");
        productInfo.className = "product-info";
        var divInPI = document.createElement("div");
        divInPI.innerHTML += "<h3>" + main.children[0].innerText + "</h3>";
        divInPI.innerHTML += "<p>" + main.children[3].innerText + " &times;" + "<span class=\"times\">" + " 1" + "</span>" + "</p>"
        productInfo.appendChild(divInPI);
        productInfo.innerHTML += "<img src=\"" + main.children[1].src + "\"/>"
        shoppingCartProduct.appendChild(productInfo);
        var productCount = document.createElement("div");
        productCount.className = "product-count";
        productCount.innerHTML += "<button class=\"minus\">" + "-" + "</button>";
        productCount.innerHTML += "<button class=\"quantity\">" + "1" + "</button>";
        productCount.innerHTML += "<button class=\"plus\">" + "+" + "</button>";
        shoppingCartProduct.appendChild(productCount);
        shoppingCartProducts.appendChild(shoppingCartProduct);
        var total = document.getElementById("total");
        var totalPrice = Number(document.getElementById("total").innerText);
        var watchPrice = main.children[3].innerText;
        var watchPriceWithout$ = Number(watchPrice.slice(1, watchPrice.length));
        totalPrice = totalPrice + watchPriceWithout$;
        total.innerText = totalPrice;
        plusMinus();
    } else {}
}


function plusMinus() {
    var minus = document.getElementsByClassName("minus");
    var quantity = document.getElementsByClassName("quantity");
    var plus = document.getElementsByClassName("plus");
    for (let i = 0; i < minus.length; i++) {
        minus[i].addEventListener("click", minusFunc);
    }
    for (let i = 0; i < plus.length; i++) {
        plus[i].addEventListener("click", plusFunc);
    }
}

function minusFunc(e) {
    var quantityValue = Number(e.target.nextElementSibling.innerHTML);
    quantityValue--;
    if (quantityValue === 0) {
        var parent = e.target.parentElement.parentElement;
        var watchPrice = parent.children[0].children[0].children[1].innerText;
        var onlyWatchPrice = Number(watchPrice.slice(1, watchPrice.indexOf(" ")));
        var total = document.getElementById("total");
        var totalPrice = Number(document.getElementById("total").innerText);
        totalPrice = totalPrice - onlyWatchPrice;
        total.innerHTML = totalPrice;
        parent.parentElement.removeChild(parent);

    } else {
        var parent = e.target.parentElement.parentElement;
        var total = document.getElementById("total");
        var totalPrice = Number(document.getElementById("total").innerText);
        var watchPrice = parent.children[0].children[0].children[1].innerText;
        var onlyWatchPrice = Number(watchPrice.slice(1, watchPrice.indexOf(" ")));
        var quantity = e.target.nextElementSibling;
        quantityValue = Number(e.target.nextElementSibling.innerHTML);
        quantityValue--;
        quantity.innerHTML = quantityValue;
        var num = Number(e.target.parentElement.parentElement.children[0].children[0].children[1].children[0].innerHTML);
        num--;
        e.target.parentElement.parentElement.children[0].children[0].children[1].children[0].innerHTML = num;
        totalPrice = totalPrice - onlyWatchPrice;
        total.innerHTML = totalPrice;
    }
}

function plusFunc(e) {
    var quantity = e.target.previousElementSibling;
    var quantityValue = Number(e.target.previousElementSibling.innerHTML);
    quantityValue++;
    if (quantityValue <= 10) {
        quantity.innerHTML = quantityValue;
        var num = Number(e.target.parentElement.parentElement.children[0].children[0].children[1].children[0].innerHTML);
        num++;
        e.target.parentElement.parentElement.children[0].children[0].children[1].children[0].innerHTML = num;
        var watchPrice = e.target.parentElement.parentElement.children[0].children[0].children[1].innerHTML;
        var onlyWatchPrice = Number(watchPrice.slice(1, watchPrice.indexOf(" ")));
        var total = document.getElementById("total");
        var totalPrice = Number(document.getElementById("total").innerText);
        totalPrice = totalPrice + onlyWatchPrice;
        total.innerHTML = totalPrice;
    }

}


window.addEventListener("load", plusMinus);
$(document).ready(function() {
    $(".details-button").click(function() {
        $(".modalwindow").show(1000);
    });
});

function showModalWindow(e) {
    var totalPrice = Number(document.getElementById("total").innerText);
    var container = document.getElementsByClassName("container")[0];
    var modal = document.getElementsByClassName("modalwindow")[0];
    modal.innerHTML += "<h2> Čestitamo </h2>";
    modal.innerHTML += "<p> Uspješno ste obavili kupovinu </p>";
    modal.innerHTML += "<p> Ukupan iznos Vaše fakture je: " + totalPrice + " $ </p>";
    modal.innerHTML += "<p> Hvala Vam na povjerenju </p>"
    container.style.display = "none";
    var hideModal = document.getElementById("exit");
    hideModal.addEventListener("click", exitModal);

}
var purchase = document.getElementById("purchase");
purchase.addEventListener("click", showModalWindow);
$(document).ready(function() {
    $("#purchase").click(function() {
        $(".modalwindow").show(1000);
    });
});