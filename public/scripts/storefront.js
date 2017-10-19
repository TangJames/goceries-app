/* GLOBAL VARIABLES UP HERE */

var mainDomain = 'http://localhost:3000/api';
var products = [];
var cart_id = "";
var user_id = "";

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
	var productPrice = parseFloat(product.price).toFixed(2);
	return '<div>'
			+ `<img class="product-image" src="/images/${product._id}.jpg" />`
			+ `<p class="product-name">${product.name}</p>`
			+ `<p class="product-tags">${product.tags}</p>`
			+ `<span class="product-footer">`
			+ `<button class="add-product" value="${product._id}">Add to Cart</button>`
			+ `<span class="product-price">${productPrice}</span>`
			+ `</span>`
			+ '</div>';
} // end of getProductMarkup()

//create a single cart product's markeup with name, price, and quantity.
var getCartProductMarkup = (product,qty) => {
	var cartProductPrice = parseFloat(product.price).toFixed(2);
	var cartProductTotal = (cartProductPrice * qty).toFixed(2);

	return '<div class="cart-product">'
			+ '<span class="remove">×</span>'
			+ `<img class="product-image" src="/images/${product._id}.jpg" />`
			+ `<div class="cart-product-details">`
			+ `<span class="name">${product.name}</span> `
			+ `<div class="price">`
			+ `<span class="cart-product-price">${cartProductPrice}</span> × `
			+ `<input type='text' value='${qty}' name='${product._id}'/>`
			+ ` = `
			+ `<span class="cart-product-total">${cartProductTotal}</span>`
			+ `</div>`
			+ `</div>`
			+ '</div>';
} // end of getCartProductMarkup()

var addProductToCart = (product,qty) => {
	var key = product._id;
	var qtyInputRef = $(`#edit-cart input[name="${key}"]`);
	var existsInCart = qtyInputRef.val();
	console.log(existsInCart);
	//checks if product exists in the cart.
	if(existsInCart) { //If product exists in the cart, add 1 to the existing quantity
		qtyInputRef.val(parseInt(existsInCart)+1).change();
	} // end of if (existsInCart)
	else { //else product does not exist in the cart, add a new product entry into the cart
		//create product entry in the cart
		$('#edit-cart').append(getCartProductMarkup(product,qty));

		//adds a click event to recently added product in the cart.
		//when the [x] is clicked, the product is removed
		$(`#edit-cart span.remove:last`).on('click',function() {
			$(this).closest('div').remove();
			calculateOrderTotals();
		});

		//get references to the price and total price of the recently added
		//product into the cart
		var productTotalRef = $(`#edit-cart span.cart-product-total:last`);
		var productPriceRef = $(`#edit-cart span.cart-product-price:last`);

		//calculates total product price. product's price * qty
		$(`#edit-cart input[name="${key}"]`).on('input propertychange change paste',function(e) {
			e.preventDefault();
			qtyInputRef = $(`#edit-cart input[name="${key}"]`);
			if (qtyInputRef.val().length !== 0) {
				productTotalRef.text((parseInt(qtyInputRef.val()) *parseFloat(productPriceRef.text())).toFixed(2));
				calculateOrderTotals();
			}
		});


	}// end of else (existsInCart)
	calculateOrderTotals();
}

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
			addProductToCart(child,1);

		}); //end of click event for add product to cart

	}); // end of forEach

} // end of initializeProducts()

var calculateOrderTotals = () => {

	var subTotal = 0.0;
	var tax = 0.0;
	var orderTotal = 0.0;

	$('#edit-cart span.cart-product-total').each(function() {
		subTotal += parseFloat($(this).text());
	});
	tax = subTotal * 0.0825;
	orderTotal = subTotal + tax;
	$('#sub-total-value').text(subTotal.toFixed(2));

	$('#tax-total-value').text(tax.toFixed(2));
	$('#order-total-value').text(orderTotal.toFixed(2));
}

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

		if(valueSelected.length === 0){
			$(`.products-title h3`).text("Products");
			(new AjaxRequest('GET', `${mainDomain}/items`, null, initializeProducts)).execute();
		}
		else{
			$(`.products-title h3`).text(`${valueSelected}`);
			(new AjaxRequest('GET', `${mainDomain}/items/tags/${valueSelected}`, null, initializeProducts)).execute();
		}

		//check the first category automatically (most likely prompt text)
		$("#select-category input:nth(0)").prop("checked", true);
	});
}// end of initializeCategories()

var addCart = (resp) => {
	console.log("addCart");
	console.log(resp);
} // end of addCart()

var attemptCartRetrieval = (resp) => {
	console.log("attemptCartRetrieval");
	console.log(resp);
	cart_id = resp._id;
	resp.items.forEach((product, index) => {
		addProductToCart(product,resp.itemsQty[index]);
	});

	calculateOrderTotals();
} // end of attemptCartRetrieval()

//main script starting point. executes when document is ready
$(() => {

	var path =  window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';
	console.log(path);
	user_id = $('#user_id').text();

	//populate page with products
	(new AjaxRequest('GET', `${mainDomain}/items`, null, initializeProducts)).execute();

	//populate page with categories
	(new AjaxRequest('GET', `${mainDomain}/items/tags`, null, initializeCategories)).execute();

	//attempt to get an existing cart for the user logged in
	(new AjaxRequest('GET', `${mainDomain}/carts/open/${user_id}`, null, attemptCartRetrieval)).execute();

	//adds event to the #submit-cart button to complete a cart order.
	$('#submit-cart').on('click',function(e){
		e.preventDefault();
		var cart_products = $('#edit-cart input').serializeArray();
		var products = [];
		var productsQty = [];
		if(cart_products.length !== 0) {
			cart_products.forEach((product) => {
				products.push(product.name);
				productsQty.push(product.value);
			});
		}
		else {
			products = null;
			productsQty = null;
		}
		var newCart = {
			user: user_id,
			items : products,
			itemsQty : productsQty
		};

		console.log(cart_products);
		console.log(`${cart_id}`);
		if(cart_id.length === 0)
		(new AjaxRequest('POST', `${mainDomain}/carts`, newCart, addCart)).execute();
		else
		(new AjaxRequest('PUT', `${mainDomain}/carts/${cart_id}`, newCart, addCart)).execute();
	});
});// end of document ready
