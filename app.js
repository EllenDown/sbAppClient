$(document).ready(function() {
  $('nav#navMain').hide();
  $('#inventoryTable').hide();
  $('#inventory').hide();
  $('section#addItem').hide();
  $('section#deleteItem').hide();
  $('.modal').modal();
  $('select').material_select();
});

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
// $('.addButton').click(function() {
//   event.preventDefault();
  // $('#itemCategory').show();
  // $('#itemNameMens').hide();
  // $('#itemNameWomens').hide();
  // $('#itemNameAccessories').hide();
  // $('#itemSize').hide();
  // $('#itemQuantity').hide();

$('#itemCategory').change(function() {
  if ($(this).val() === "mens") {
    $('#itemNameMens').parent().removeClass('hide');
    $('#itemSize').parent().removeClass('hide');
    $('#itemQuantity').parent().removeClass('hide');
  }
  if ($(this).val() === "womens") {
      $('#itemNameWomens').parent().removeClass('hide');
      $('#itemSize').parent().removeClass('hide');
      $('#itemQuantity').parent().removeClass('hide');
  }
  if ($(this).val() === "accessories") {
      $('#itemNameAccessories').parent().removeClass('hide');
      $('#itemNameMens').parent().addClass('hide');
      $('#itemQuantity').parent().removeClass('hide');
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
  }
});
