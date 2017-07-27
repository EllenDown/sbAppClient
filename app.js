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
      .then(appendInventory)
      .then(deleteOnClick)
      .then(updateOnClick)
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
      const editButton =
      `<a id="${inventory.id}" class="edit btn-floating btn-large waves-effect modal-trigger waves-light black" href="#edit-modal"><i class="material-icons">edit</i></a>`
      const deleteButton = `<a id="${inventory.id}" class="deleteMe btn-floating btn-large waves-effect waves-light black"><i class="material-icons">delete</i></a>`
      const editForm = `<div id="modal${inventory.id}" class="modal">
        <div class="modal-content">
        <form id="${inventory.id}" class="editForm edit${inventory.id}">
          <select id="itemCategory3" class="edit">
             <option value="" disabled selected>Select Item Category</option>
             <option value="mens">Men's Apperal</option>
             <option value="womens">Women's Apperal</option>
             <option value="accessories">Accessories</option>
         </select>
          <select id="itemNameMens3" class="edit hide">
           <option value="" disabled selected>Select Item Name</option>
           <option value="1">Suffer Better Throwback T</option>
           <option value="2">Power and Light T</option>
           <option value="3">Suffer Better Totally Casual 3/4 Sleeve T</option>
           <option value="4">Suffer Better Hoody</option>
           <option value="5">Suffer Better Cycling Bib</option>
           <option value="6">Suffer Better Cycling Jersey</option>
         </select>
          <select id="itemNameWomens3" class="edit hide">
          <option value="" disabled selected>Select Item Name</option>
          <option value="1">Power and Light T</option>
          <option value="2">Suffer Better Throwback T</option>
          <option value="3">Suffer Better Semi-Tech T</option>
          <option value="4">Suffer Better New Look T</option>
          <option value="5">Suffer Better Tech T</option>
          <option value="6">Suffer Better High Tech T</option>
          <option value="7">Suffer Better Totally Casual 3/4 Sleeve T</option>
          <option value="8">Suffer Better Hoody</option>
        </select>
          <select id="itemNameAccessories3" class="edit hide">
          <option value="" disabled selected>Select Item Name</option>
          <option value="1">Suffer Better Buffs</option>
          <option value="2">Suffer Better Water Bottle / Sticker Package</option>
           <option value="3">Suffer Better Arm Warmers</option>
           <option value="4">Suffer Better Reversible Beanie</option>
           <option value="5">Skratch Labs - Exercise Nutrition</option>
           <option value="6">Power and Light Trucker Hat</option>
           <option value="7">Throwback Trucker Hat</option>
           <option value="8">Gift Card</option>
        </select>
          <select id="itemSize3" class="edit hide">
          <option value="" disabled selected>Select Item Size</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="xl">XL</option>
      </select>
          <div class="input-field col s6 hide">
            <input id="itemQuantity3" type="text" class="validate" value="quantity3">
            <label for="quantity">Enter Quantity to Add</label>
          </div>
          <button type="submit"> Update </button>
          </form>
          </div>
        </div>`
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
        <td>${editButton}${deleteButton}</td>
      </tr>
    </tbody>
    ${editForm}
    `
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

const url = "http://localhost:8080/product/"

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
  .then($.get("http://localhost:8080/product")
      .then(appendInventory));
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
   .then($.get("http://localhost:8080/product")
       .then(appendInventory))
})
}

function updateOnClick() {
  $('.editForm').click(function(){
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
    let id = $(this).attr('id');
    $.ajax({
     url: url + id,
     method: 'PUT',
     data:

   })
   .then(function(){
     window.location.reload();
   });
 });
}


 function deleteOnClick() {
       $('.deleteMe').click(function(){
         let id = $(this).attr('id');
         $.ajax({
          url: url + id,
          type: 'DELETE',
          contentType: 'application/json'
        })
        .then(function(){
          window.location.reload();
        });
      });
    }
