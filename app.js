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
      // .then(updateOnClick)
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
      `<a id="editMe" data-id="${inventory.id}" data-category="${inventory.category}" class="btn-floating btn-large waves-effect modal-trigger waves-light black" href="#edit-modal"><i class="material-icons">edit</i></a>`
      const deleteButton = `<a id="${inventory.id}" class="deleteMe btn-floating btn-large waves-effect waves-light black"><i class="material-icons">delete</i></a>`

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
function edit() {
  $('#editMe').click(function(){
    console.log("hey")
    let category = $(this).attr('data-category');
    let id = $(this).attr('data-id');
    console.log('data-category')
    if (category === "Men's Apperal") {
      $('#itemNameMens3').parent().removeClass('hide');
      $('#itemPrice3').parent().removeClass('hide');
      $('#smallQuantity3').parent().removeClass('hide');
      $('#mediumQuantity3').parent().removeClass('hide');
      $('#largeQuantity3').parent().removeClass('hide');
      $('#xlQuantity3').parent().removeClass('hide');
      $('#itemQuantity3').parent().removeClass('hide');
    }
    if (category  === "Women's Apperal") {
        $('#itemNameWomens3').parent().removeClass('hide');
        $('#itemPrice3').parent().removeClass('hide');
        $('#smallQuantity3').parent().removeClass('hide');
        $('#mediumQuantity3').parent().removeClass('hide');
        $('#largeQuantity3').parent().removeClass('hide');
        $('#xlQuantity3').parent().removeClass('hide');
    }
    if (category  === "Accessories") {
        $('#itemNameAccessories3').parent().removeClass('hide');
        $('#itemPrice3').parent().removeClass('hide');
        $('#quantity3').parent().removeClass('hide');
    }
  })
}
    $.get(url+id, function(data){
      if (category === "mens") {
        $('#itemNameMens3').val(data.name);
        $('#itemPrice3').val(data.price);
        $('#smallQuantity3').val(data.smallQuantityAvailable);
        $('#mediumQuantity3').val(data.mediumQuantityAvailable);
        $('#largeQuantity3').val(data.largeQuantityAvailable);
        $('#xlQuantity3').val(data.xlQuantityAvailable);
      } if (category === "womens") {
        $('#itemNameWomens3').val(data.name);
        $('#itemPrice3').val(data.price);
        $('#smallQuantity3').val(data.smallQuantityAvailable);
        $('#mediumQuantity3').val(data.mediumQuantityAvailable);
        $('#largeQuantity3').val(data.largeQuantityAvailable);
        $('#xlQuantity3').val(data.xlQuantityAvailable);
      } if (category === "accessories") {
        $('#itemNameAccessories3').val(data.name);
        $('#itemPrice3').val(data.price);
        $('#quantity3').val(data.totalQuantity);
      }
    })
    .then(updateOnClick(id))
  });


function updateOnClick() {
  $('#updateButton').click(function(event){
      event.PreventDefault();
      let edit = {}
      function getRightData() {
        if (category === "mens") {
          return edit = {
          category: "Men's Apperal",
          name : $('#itemNameMens3').val(),
          price: $('#itemPrice3').val(),
          smallQuantityAvailable : $('#smallQuantity3').val(),
          mediumQuantityAvailable :$('#mediumQuantity3').val(),
          largeQuantityAvailable: $('#largeQuantity3').val(),
          xlQuantityAvailable: $('#xlQuantity3').val()
        }
      } if (category === "womens") {
        return edit = {
          category: "Women's Apperal",
          name: $('#itemNameWomens3').val(),
          price: $('#itemPrice3').val(),
          smallQuantityAvailable: $('#smallQuantity3').val(),
          mediumQuantityAvailable: ('#mediumQuantity3').val(),
          largeQuantityAvailable: $('#largeQuantity3').val(),
          xlQuantityAvailable: $('#xlQuantity3').val()
        }
        } if (category === "accessories") {
          return edit = {
          category: "Accessories",
          name: $('#itemNameAccessories3').val(),
          price: $('#itemPrice3').val(),
          totalQuantity: $('#quantity3').val()
        }
      }
    } return edit
        console.log(edit);
     $.ajax({
        url: url + id,
        method: 'PUT',
        data: edit
      })
     .then(function(){window.location.reload()})
   })
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
