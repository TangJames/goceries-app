/* GLOBAL VARIABLES UP HERE */

var mainDomain = 'http://localhost:3000/api';
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

//create a single product's markeup with name, price, and tag(s)
var getProductMarkup = (product) => {
	return '<div>'
			+ `<p class="product-name">${product.name}<br/>`
			+ `<span class="product-tags">${product.tags}</span></p>`
			+ `<p class="product-price">$${product.price}</p>`
			+ `<button class="add-product" value="${product._id}">Add to Cart</button>`
			+ '</div>';
} // end of getProductMarkup()

//create a single cart product's markeup with name, price, and quantity.
var getCartProductMarkup = (product) => {
	// return '<p>'
	// 		+ '<span class="remove">×</span> '
	// 		+ `<span class="name">${products[key]}</span>`
	// 		+ `<input type='text' value='1' name='${key}'/>`
	// 		+ '</p>';
	var cartProductTotal = parseInt(product.price) * 1;
	return '<p>'
			+ '<span class="remove">×</span> '
			+ `<span class="name">${product.name}</span> <br />`
			+ `<span class="price">${product.price}</span>`
			+ `<input type='text' value='1' name='${product._id}'/>`
			+ `<span>=</span>`
			+ `<span class="price">${cartProductTotal}</span>`
			+ '</p>';
} // end of getCartProductMarkup()

//called by successful AjaxRequest. handles population of DOM element #select-products.
var initializeProducts = (resp) => {
	console.log(resp);
	//loops through each found product in the response
	resp.forEach((child) => {
		var child_id = `${child._id}`;
		products[child_id] = child.name;

		//add a single product's markup with name, price, and tag(s)
		$('#select-products').append(getProductMarkup(child));

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
				$('#edit-cart').append(getCartProductMarkup(child));

				//adds a click event to recently added product in the cart.
				//when the [x] is clicked, the product is removed
				$(`#edit-cart span.remove:last`).on('click',function() {
					$(this).closest('p').remove();
				});
			}// end of else (existsInCart)

		}); //end of click event for add product to cart

	}); // end of forEach
} // end of initializeProducts()

//called by successful AjaxRequest. handles population of DOM element #select-category.
var initializeCategories  = (resp) => {
	resp.forEach((category) => {
		$(`#select-category`).append(`<option value="${category}">${category}</option>`);
	});

	//check the first category automatically (most likely prompt text)
	$("#select-category input:nth(0)").prop("checked", true);

	$(`#select-category`).on('change', function(e) {
		e.preventDefault();
		$('#select-products').empty();
		var valueSelected = this.value;
		(new AjaxRequest('GET', `${mainDomain}/items/tags/${valueSelected}`, null, initializeProducts)).execute();
	});
}// end of initializeCategories()

var addCart = (resp) => {
	console.log(resp);
} // end of addCart()

//main script starting point. executes when document is ready
$(() => {
	console.log('Go forth and code!');
	//populate page with products
	(new AjaxRequest('GET', `${mainDomain}/items`, null, initializeProducts)).execute();

	//populate page with categories
	(new AjaxRequest('GET', `${mainDomain}/items/tags`, null, initializeCategories)).execute();

	//adds event to the #submit-cart button to complete a cart order.
	$('#submit-cart').on('click',function(e){
	    e.preventDefault();
		var cart_products = $('#edit-cart input').serializeArray();
		var products = [];
		var productsQty = [];
		cart_products.forEach((product) => {
			products.push(product.name);
			productsQty.push(product.value);
		});

		var newCart = {
			items : products,
			itemsQty : productsQty
		};

		(new AjaxRequest('POST', `${mainDomain}/carts`, newCart, addCart)).execute();

	});


});// end of document ready
