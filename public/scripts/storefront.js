/* GLOBAL VARIABLES UP HERE */
var items = [];

//AjaxRequest contructor
//- method = "GET", "POST", "PUT", "DELETE"
//- url = json endpoint url
//- onSuccess = callback method called on successful request
function AjaxRequest(method, url, onSuccess) {
	this.ajaxInfo = {
		method: method,
		url: url,
		dataType: 'json',
		success: onSuccess
	};

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
		items[child_id] = child.name;
		var str = `<p class="product-name">${child.name}</p>`
				+ `<p class="product-price">$${child.price}</p>`
				+ `<p class="product-tags">${child.tags}</p>`;
		$('#select-products').append(`<div>${str}</div>`);
	});
	//
	// toppingTypes.forEach((topping) => {
	// 	addPlusButtonEvent(topping,toppings);
	// });
	//
	// breadTypes.forEach((bread) => {
	// 	$(`#select-bread`).append(`<p><input type="radio" name="breadType" value="${bread}"><label for="${bread}">${bread}</label></p>`);
	// });
	//
	// $("#select-bread input:nth(0)").prop("checked", true);
} // end of initializeToppings()

//main script starting point. executes when document is ready
$(() => {
	console.log('Go forth and code!');
	var mainDomain = 'http://localhost:3000/api';
	(new AjaxRequest('GET', `${mainDomain}/items`, initializeItems)).execute();
});// end of document ready
