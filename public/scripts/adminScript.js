

$(function() {




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
        });
    }
    $('#getFirstItem').on('click', (e) => {
        getItems();
        $('.itemList p').empty();
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
        $('.itemList p').empty();
        getItems();
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
        $('.itemList p').empty();
        getItems();
        $(this).closest('form').find("input[type=text], textarea").val("");
    });




    function updateItemById(id) {
        $.ajax({
            method: 'PUT',
            url: `http://localhost:3000/api/items/${id}`,
            dataType: 'json',
            // success: onUpdateSuccess
        });
    }

    $('#submitUpdate').on('click', function(e) {
        e.preventDefault();

    });













});




