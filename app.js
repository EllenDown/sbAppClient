$(document).ready(function() {
  $('nav#navMain').hide();
  $('#inventoryTable').hide();
  $('#inventory').hide();
  $('section#addItem').hide();
  $('section#deleteItem').hide();
  $('.modal').modal();
  $('select').material_select();
});

$('#addInput').click(sendPostReqest)
$('#editInput').click(sendPutReqest)
$('#deleteInput').click(sendDeleteReqest)

$('#user_name').on('click', function(event){
  event.preventDefault()
});

$('#password').on('click', function(event){
  event.preventDefault()
});

$('#signIn').on('click', function(event) {
  event.preventDefault();
  $('section#signIn').hide();
  $('nav#navMain').fadeIn(2000);
  $('body').removeClass('hero');
  $('nav#navSignIn').hide();
  $('#inventoryTable').fadeIn(2000);
  $('#inventory').fadeIn(2000);
  $('section#addItem').hide();
  $('section#deleteItem').hide();
  $.get("http://localhost:8080/product")
      .then(appendInventory);
});

$('#addItem').on('click', function(event) {
  event.preventDefault();
  hideShowNavigation(true);
  $('nav#navMain').fadeIn(2000);
  $('nav#navSignIn').hide();
  $('#inventory').hide();
  $('section#addItem').fadeIn(2000);
  $('#inventoryTable').hide();
  $('section#deleteItem').hide();
});

$('#deleteItem').on('click', function(event) {
  event.preventDefault();
  hideShowNavigation(true);
  $('nav#navMain').fadeIn(2000);
  $('nav#navSignIn').hide();
  $('#inventory').hide();
  $('section#deleteItem').fadeIn(2000);
  $('#inventoryTable').hide();
  $('section#addItem').hide();
});


  function appendInventory(data) {
    var inventoryItems = data;
    for (var i=0; i < data.length; i++) {
      if (inventoryItems[i].category == 'Accessories') {
        inventoryItems[i].smallQuantityAvailable = '';
        inventoryItems[i].mediumQuantityAvailable = '';
        inventoryItems[i].largeQuantityAvailable = '';
        inventoryItems[i].xlQuantityAvailable = '';
      }
    }

    for (var i=0; i < inventoryItems.length; i++){
      var inventory = inventoryItems[i];

      $('#inventoryTable').append(
    `<tbody>
      <tr>
        <td>${inventory.id}</td>
        <td>${inventory.name}</td>
        <td>${inventory.category}</td>
        <td>${inventory.price}</td>
        <td>${inventory.totalQuantity}</td>
        <td>${inventory.smallQuantityAvailable}</td>
        <td>${inventory.mediumQuantityAvailable}</td>
        <td>${inventory.largeQuantityAvailable}</td>
        <td>${inventory.xlQuantityAvailable}</td>
      </tr>
    </tbody>`
  );
}
}

$('#itemCategory').change(function() {
  if ($(this).val() === "mens") {
    $('#itemSize').parent().removeClass('hide');
  }
  if ($(this).val() === "womens") {
      $('#itemSize').parent().removeClass('hide');
  }
});
$('#itemCategory2').change(function() {
  if ($(this).val() === "mens") {
    $('#itemNameMens2').parent().removeClass('hide');
    $('#itemSize2').parent().removeClass('hide');
    $('#itemQuantity2').parent().removeClass('hide');
  }
  if ($(this).val() === "womens") {
      $('#itemNameWomens2').parent().removeClass('hide');
      $('#itemSize2').parent().removeClass('hide');
      $('#itemQuantity2').parent().removeClass('hide');
  }
  if ($(this).val() === "accessories") {
      $('#itemNameAccessories2').parent().removeClass('hide');
      $('#itemQuantity2').parent().removeClass('hide');
      $('#itemNameWomens2').parent().addClass('hide');
      $('#itemNameMens2').parent().addClass('hide');
  }
});

$('#itemCategory3').change(function() {
  if ($(this).val() === "mens") {
    $('#itemNameMens3').parent().removeClass('hide');
    $('#itemSize3').parent().removeClass('hide');
    $('#itemQuantity3').parent().removeClass('hide');
  }
  if ($(this).val() === "womens") {
      $('#itemNameWomens3').parent().removeClass('hide');
      $('#itemSize3').parent().removeClass('hide');
      $('#itemQuantity3').parent().removeClass('hide');
  }
  if ($(this).val() === "accessories") {
      $('#itemNameAccessories3').parent().removeClass('hide');
      $('#itemQuantity3').parent().removeClass('hide');
  }
});

function sendPostReqest(event) {
  event.preventDefault();

  if ($('#itemCategory option:selected').val() === "mens" || "womens") {
    createNewAppItem();
  } if ($('#itemCategory option:selected').val() === "accessories") {
    createNewAccItem();
  }
}

function sendPutReqest(event) {
  event.preventDefault();
  if ($('#itemCategory option:selected').val() === "mens" || "womens") {
    createNewAppItem();
  } if ($('#itemCategory option:selected').val() === "accessories") {
    createNewAccItem();
  }
}

function sendDeleteReqest(event) {
  event.preventDefault();
  console.log("gone gone gone");
}

const categoryDelete = $('#itemCategory2 option:selected').val();
const nameDelete = $('#itemName2').val();
const sizeDelete = $('#itemSize2').val();
const quantityDelete = $('#itemQuantity2').val();

const categoryPut = $('#itemCategory').val();
const namePut = $('#itemNameMens3').val();
const sizePut = $('#itemSize3').val();
const quantityPut = $('#itemQuantity3').val();

const url = "http://localhost:8080/product"

function createNewAppItem() {
  const categoryPost = $('#itemCategory').val();
  const namePost = $('#itemName').val();
  const pricePost = $('#price').val();
  const smallQuantityPost = $('#smallQuantity').val();
  const mediumQuantityPost = $('#mediumQuantity').val();
  const largeQuantityPost = $('#largeQuantity').val();
  const xlQuantityPost = $('#xlQuantity').val();
  const totalQuantityPost = Number(smallQuantityPost) + Number(mediumQuantityPost) + Number(largeQuantityPost)
 + Number(xlQuantityPost);

  let productPost = {
    name: namePost,
    category: categoryPost,
    price: pricePost,
    totalQuantity: totalQuantityPost,
    smallQuantityAvailable: smallQuantityPost,
    mediumQuantityAvailable: mediumQuantityPost,
    largeQuantityAvailable: largeQuantityPost,
    xlQuantityAvailable: xlQuantityPost
  }
  $.post(url, productPost)
  .then(function(data) {
     console.log(data)
  })
}

function createNewAccItem() {
const categoryPost = $('#itemCategory').val();
const namePost = $('#itemName').val();
const pricePost = $('#price').val();
const totalQuantityPost = Number(smallQuantityPost) + Number(mediumQuantityPost) + Number(largeQuantityPost)
+ Number(xlQuantityPost);

let productPost = {
  name: namePost,
  category: categoryPost,
  price: pricePost,
  totalQuantity: totalQuantityPost,
}
$.post(url, productPost)
.then(function(data) {
   console.log(data)
   .then(function(response) {
     getNewItem(url)
   })
})
}

function getNewItem(url) {
  $.get(url).then(function(data){
    data.json()
.then(displayProduct)
})
}

function displayProduct(product) {
  for (var i=0; i < data.length; i++){
    var newItem = data[i];

    $('#inventoryTable').append(
  `
    <tr>
      <td>${newItem.id}</td>
      <td>${newItem.name}</td>
      <td>${newItem.category}</td>
      <td>${newItem.price}</td>
      <td>${newItem.totalQuantity}</td>
      <td>${newItem.smallQuantityAvailable}</td>
      <td>${newItem.mediumQuantityAvailable}</td>
      <td>${newItem.largeQuantityAvailable}</td>
      <td>${newItem.xlQuantityAvailable}</td>
    </tr>
  `
  );
  }
}

function sendPutRequest() {

}
