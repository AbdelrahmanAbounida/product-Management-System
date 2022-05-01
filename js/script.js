let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search_title_btn = document.getElementById("search-title-btn");
let search_cat_btn = document.getElementById("search-cat-btn");
let deletee = document.getElementById("delete");
let search_inpt = document.getElementById("search");
let total = document.getElementById("tot");
let updated_index = -1;
let search_mode = "search";
//
// ################################# Get Total ###############################
function getTotal() {
  let tot = +price.value + +taxes.value + +ads.value - +discount.value;
  let colors = ["#e61616", "#006400"];

  if (tot <= 0) {
    $(".total").css("background", colors[0]);
  } else {
    $(".total").css("background", colors[1]);
  }

  total.innerText = tot;
  return tot;
}

// ################################ Create ################################
var products;
if (localStorage.product != null) {
  products = JSON.parse(localStorage.product);
} else {
  products = [];
}

function createe() {
  if ($(this).hasClass("update-btn-new")) {
    // update
    $(".create-btn").css("background", "#ff4e00");
    $(".create-btn").removeClass("update-btn-new");
    create.innerHTML = "Create";

    let product = {
      id: products[updated_index].id,
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: document.getElementById("tot").innerText,
      category: category.value,
    };

    products[updated_index] = product;
    localStorage.product = JSON.stringify(products);
    updated_index = -1;
    count.style.display = "block";
  } else {
    // create

    if (title.value != "") {
      for (let i = 0; i < +count.value; i++) {
        let product = {
          id: generateID(),
          title: title.value,
          price: price.value,
          taxes: taxes.value,
          ads: ads.value,
          discount: discount.value,
          total: document.getElementById("tot").innerText,
          category: category.value,
        };
        products.push(product);
      }
    }
    localStorage.setItem("product", JSON.stringify(products));
  }
  clearData();
  getTotal();
  show();
}

// ################################# Generate ID ###############################
function generateID() {
  let counter = 0;
  try {
    counter = JSON.parse(localStorage.product).length;
  } catch (err) {
    counter = 1;
  }
  return counter;
}

// ################################# Clear Data ###############################
function clearData() {
  title.value = "";
  price.value = "";
  count.value = "";
  ads.value = "";
  taxes.value = "";
  discount.value = "";
  category.value = "";
  title.value = "";
  total.innerHTML = "";
}

// ################################# Show #####################################
function show() {
  let out;

  try {
    out = JSON.parse(localStorage.product);
  } catch (err) {
    out = [];
  }

  console.log(out);
  let res = "";

  for (let i = 0; i < out.length; i++) {
    res += ` <tr>
      <td>${out[i].id}</td>
      <td>${out[i].title}</td>
      <td>${out[i].price}</td>
      <td>${out[i].taxes}</td>
      <td>${out[i].ads}</td>
      <td>${out[i].discount}</td>
      <td>${out[i].total}</td>
      <td>${out[i].category}</td>
      <td><a class="btnt btn-up" onclick="updateItem(${i})" href="#">Update</a></td>
      <td><a class="btnt btn-del" onclick="removeItem(${i})" href="##">Delete</a></td>
  </tr> `;
  }

  document.getElementById("tbd").innerHTML = res;
  return res;
}

// ################################### Remove All Items ##############################
function removeAllItems() {
  localStorage.removeItem("product");
  products = [];
  show();
}

// ################################### Remove one Item ##############################
function removeItem(i) {
  console.log(i);
  products.splice(i, 1);
  console.log(products);
  localStorage.product = JSON.stringify(products);
  show();
}

// ################################### Update ##############################
function updateItem(i) {
  console.log(title);
  title.value = products[i].title;
  price.value = products[i].price;
  taxes.value = products[i].taxes;
  ads.value = products[i].ads;
  discount.value = products[i].discount;
  count.style.display = "none";
  total.value = getTotal();
  category.value = products[i].category;
  create.innerText = "Update";
  $(".create-btn").addClass("update-btn-new");
  $(".create-btn").css("background", "#174c8a");
  updated_index = i;
}

// ################################### search ##############################

function searchItem(id) {
  search_inpt.focus();
  if (id == "search-title-btn") {
    search_inpt.placeholder = "Search By Title";
    search_mode = "title";
  } else if (id == "search-cat-btn") {
    search_inpt.placeholder = "Search By Category";
    search_mode = "category";
  } else {
    search_inpt.placeholder = "Search";
    search_mode = "search";
  }
}

function searchTitleCategory() {
  let t = search_inpt.value;
  console.log(t);
  let fit = [];

  if (search_mode == "title") {
    for (let i = 0; i < products.length; i++) {
      if (products[i].title.toUpperCase().startsWith(t.toUpperCase())) {
        fit.push(products[i]);
      }
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      if (products[i].category.toUpperCase().startsWith(t.toUpperCase())) {
        fit.push(products[i]);
      }
    }
  }
  let res = "";

  for (let i = 0; i < fit.length; i++) {
    res += ` <tr>
        <td>${fit[i].id}</td>
        <td>${fit[i].title}</td>
        <td>${fit[i].price}</td>
        <td>${fit[i].taxes}</td>
        <td>${fit[i].ads}</td>
        <td>${fit[i].discount}</td>
        <td>${fit[i].total}</td>
        <td>${fit[i].category}</td>
        <td><a class="btnt btn-up" onclick="updateItem(${i})" href="#">Update</a></td>
        <td><a class="btnt btn-del" onclick="removeItem(${i})" href="##">Delete</a></td>
    </tr> `;
  }
  document.getElementById("tbd").innerHTML = res;
}

// ######################## Alert ###########################

// for deleate all
function checker() {
  deletee.addEventListener("mousedown", function (event) {
    if (products.length == 0) {
      swal("There are no products to delete");
    } else {
      swal({
        title: "Are you sure?",
        text: `Do You want to remove ${products.length} products`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal(`${products.length} products have been removed successfuly`, {
            icon: "success",
          });

          removeAllItems();
        }
      });
    }
  });
}

// for create
function alertcreate() {
  create.addEventListener("mousedown", function (event) {

    if (category.value == "") {
        swal({
          title: "Category name should be determined",
        });
      }
      

    if (price.value == "") {
      swal({
        title: "Please enter a Price value",
      });
    }
    if (taxes.value == "") {
      swal({
        title: "Please enter Taxes value",
      });
    }
    if (ads.value == "") {
      swal({
        title: "Please enter Ads value",
      });
    }
    if (discount.value == "") {
      swal({
        title: "Please enter discount value",
      });
    }
    if ($(this).hasClass("update-btn-new") == false) {
      if (count.value == "") {
        swal({
          title: "Please enter The required number of products",
        });
      }
    }

    if (title.value == "") {
        swal({
          title: "Please enter a Product Title",
        });
      }

      
  });
}

// ######################## all Actions ###########################

show();
checker();
alertcreate();
create.onclick = createe;

search_inpt.onkeyup = searchTitleCategory;
