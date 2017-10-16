/* GLOBAL VARIABLES UP HERE */
var products = [];

//AjaxRequest contructor
//- method = "GET", "POST", "PUT", "DELETE"
//- url = json endpoint url
//- data = data to send on a post or put/patch
//- onSuccess = callback method called on successful request
function AjaxRequest(method, url, data, onSuccess) {
	this.ajaxInfo = {
		method: method,
		url: url,
		dataType: 'json',
		success: onSuccess
	};

	if(data)
		this.ajaxInfo.data =  data;

	//AjaxRquest method to execute request
	this.execute = () => {
		$.ajax(this.ajaxInfo);
	}//end of execute()
}//end of AjaxRequest constructor

//called by successful AjaxRequest. handles population of DOM element #select-products.
var initializeItems = (resp) => {
	console.log(resp);
	//loops through each found item in the response
	resp.forEach((child) => {
		var child_id = `${child._id}`;
		products[child_id] = child.name;

		//create a single product with name, price, and tag(s)
		var prod 	= `<p class="product-name">${child.name}</p>`
					+ `<p class="product-price">$${child.price}</p>`
					+ `<p class="product-tags">${child.tags}</p>`
					+ `<button class="add-item" value="${child_id}">[+]</button>`;
		$('#select-products').append(`<div>${prod}</div>`);

		//add click event to the current product's button.
		//used to add product to the shopping cart
		$(`button[value="${child_id}"]`).on('click',function(e) {
			e.preventDefault();
			var key = $(this).val();
			var qtyInputRef = $(`#edit-cart input[name="${key}"]`);
			var existsInCart = qtyInputRef.val();

			//checks if product exists in the cart.
			if(existsInCart) { //If product exists in the cart, add 1 to the existing quantity
				qtyInputRef.val(parseInt(existsInCart)+1);
			} // end of if (existsInCart)
			else { //else product does not exist in the cart, add a new product entry into the cart
				//create product entry in the cart
				var cartProd 	= '<p>'
								+ '<span class="remove">[x]</span> '
								+ `${products[key]}`
								+ `<input type='text' value='1' name='${key}' size="3"/>`
								+ '</p>';
				$('#edit-cart').append(cartProd);

				//adds a click event to recently added product in the cart.
				//when the [x] is clicked, the product is removed
				$(`#edit-cart span:last`).on('click',function() {
					$(this).closest('p').remove();
				});
			}// end of else (existsInCart)

		}); //end of click event for add product to cart

	}); // end of forEach
} // end of initializeItems()

var addCart = (resp) => {
	console.log(resp);
}

//main script starting point. executes when document is ready
$(() => {
	console.log('Go forth and code!');
	var mainDomain = 'http://localhost:3000/api';
	(new AjaxRequest('GET', `${mainDomain}/items`, null, initializeItems)).execute();
	//
	$('#submit-cart').on('click',function(e){
	    e.preventDefault();
		var cart_items = $('#edit-cart input').serializeArray();
		var items = [];
		var itemsQty = [];
		cart_items.forEach((item) => {
			items.push(item.name);
			itemsQty.push(item.value);
		});

		var newCart = {
			items : items,
			itemsQty : itemsQty
		};

		(new AjaxRequest('POST', `${mainDomain}/carts`, newCart, addCart)).execute();

	});


});// end of document ready
