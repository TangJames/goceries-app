$(function() {

    getItems();
    function getItems() {
        $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/api/items',
            dataType: 'json',
            success: onGetItemSuccess,
            // error: onError
        });
    }
    function onGetItemSuccess(data) {
        data.forEach((value) => {
            $('.itemList').append("<p>Object ID: " + value._id + "</p>");
            $('.itemList').append("<p>Name: " + value.name + "</p>");
            $('.itemList').append("<p>Price: $" + value.price + "</p>");
            $('.itemList').append("<p>Tags: " + value.tags + "</p>");
            $('.itemList').append("<hr>");
        });
    }
    $('#getFirstItem').on('click', (e) => {
        removeItemsThenRefresh();
    });


    function postItems() {
        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/api/items',
            dataType: 'json',
            data: $('#postData').serialize(),
            success: onPostItemSuccess
        });
    }
    function onPostItemSuccess(data) {
        console.log(data);
    }
    $('#submitPost').on('click', function(e) {
        e.preventDefault();
        postItems();
        removeItemsThenRefresh();
        $(this).closest('form').find("input[type=text], textarea").val("");
    });



    function deleteItemById(id) {
        $.ajax({
            method: 'DELETE',
            url: `http://localhost:3000/api/items/${id}`,
            dataType: 'json',
            success: onDeleteSuccess
        });
    }
    function onDeleteSuccess(data) {
        console.log(data);
    }
    $('#submitDelete').on('click', function(e) {
        e.preventDefault();
        var splitString = $('#deleteData').serialize().split('=');
        var idAfterSplit = splitString[1];
        deleteItemById(idAfterSplit);
        removeItemsThenRefresh();
        $(this).closest('form').find("input[type=text], textarea").val("");
    });



    function updateItemById(options) {
        $.ajax({
            method: 'PUT',
            url: `http://localhost:3000/api/items/${options.id}`,
            dataType: 'json',
            data: options,
            success: onUpdateSuccess
        });
    }

    function onUpdateSuccess(data) {
        console.log(data);
    }

    $('#submitUpdate').on('click', function(e) {
        e.preventDefault();
        let options = {
            id: '',
            name: '',
            price: '',
            tags: ''
        };
        options.id = document.getElementById('getIdValue').value;
        options.name = document.getElementById('getNameVal').value;
        options.price = document.getElementById('getPriceVal').value;
        options.tags = document.getElementById('getTagVal').value;
        updateItemById(options);
        removeItemsThenRefresh();
        $(this).closest('form').find("input[type=text], textarea").val("");
    });







    // Util Function DRY
    function removeItemsThenRefresh() {
        $('.itemList p').empty();
        $('hr').remove();
        getItems();
    }


    $('.message a').click(function(){
       $('form').animate({height: "toggle", opacity: "toggle"}, "slower");
       if ($('h1').text() === 'Admin Login') {
        $('h1').text('Admin Signup');
       }
       else {
        $('h1').text('Admin Login');
       }

    });






});




