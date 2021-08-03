$(document).ready(function() {

    var orderList = [];
    var userName = "";
    
    if (orderList.length == 0){
        console.log(orderList.length);
        $( "#submitOrder" ).prop( "disabled", true );
    }

    function updateOrderList(){
        if(orderList.length == 0){
            $( "#submitOrder" ).prop( "disabled", true );
        } else {
            $( "#submitOrder" ).prop( "disabled", false );
            $( "#orderMessage" ).addClass("active");
            $("#orderMessage").text("");
            orderList.forEach(function (item, index) {
                console.log(item);
                var itemNum = index + 1;
                $("#orderMessage").append("<p>"+itemNum+". "+item+"</p>");
            });
            console.log(orderList);
        }
        return false;
    };


    //Initail set up to order, opens initial modal and content to visible 
    $(".modal0, .modal-content0").addClass("active");

    //Cannot Proceed, redirect back to homepage
    $("#cancel").click(function(event) {
        window.location.replace('orderingApp.html');
        event.stopImmediatePropagation();
    });

    //Allow ordering procces
    $("#submit0").click(function(event) {
        if ($("#name").val().trim().length >= 3){
            $(".modal0, .modal-content0").removeClass("active");
            userName = $("#name").val();
            // Handle the capitalization of name entered
            userName = userName.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });
            $("#cartContainer").children("h2").text("Hello, " + userName);
        } else {
            alert("Please enter a valid name to continue. \n Must contain at least 3 characters.");
        }
        event.stopImmediatePropagation();
    });

    // Detect when enter is pressed
    $("#name").keypress(function (e) {
        var key = e.which;
        if(key == 13)  
         {
           $("#submit0").click();
           return false;  
         }
       }); 

    // Wings Trigger Modal Pop-Up
    $( "#1" ).click(function(event) {

        //Set modal and content to visible 
        $(".modal1, .modal-content1").addClass("active");

        //Initally disables add to order button and wing sauce
        $("#submit1").prop("disabled", true);
        $("#sauceOptions :input").prop("disabled", true);

        //Close Modal, reset modal and content to hidden
        $(".close1").click(function() {
            console.log("close button clicked")
            $(".modal1, .modal-content1").removeClass("active");
            resetWingModal();

            $("input[name='wings']").unbind();
            $(this).off();
            $("#submit1").off();
        });

        //Submit User Input and reset modal
        $("#submit1").click(function() {
            console.log("submit button clicked");
            
            var wingOrder = $('input[name="wings"]:checked').val() + " Flavors: ";

            var wingSauces = $('input[name="sauce"]:checked');

            if(wingSauces.length > 0) {
                $(wingSauces).each(function() {
                    wingOrder += $(this).val() + ", ";
                });
                orderList.push(wingOrder);
                updateOrderList();
                $(".modal1, .modal-content1").removeClass("active");
                resetWingModal();
                $("input[name='wings']").unbind();
                $(this).off();
                $(".close").off();
            } else {
                alert("You must choose at least (1) wing flavor to add to order.");
            }
        });

                
        //Set wings sauce limt
        $("input[name='wings']").change(function(){
            var radioButtons = $("#wingRadio input:radio");
            var selectedIndex = radioButtons.index(radioButtons.filter(':checked'));
            console.log("SELECTED INDEX " +selectedIndex);
            $("#sauceOptions :input").prop("disabled", false);
            $("#sauceOptions :input").prop('checked', false);
            console.log("Outside: " + $("#sauceOptions :input").siblings(':checked').length);
            $("#submit1").prop("disabled", false);

            if(selectedIndex == 0){
                $("#sauceContainer").children( "h4" ).text(" *Choose up to (2) flavors. ");
                $("#sauceOptions :input").prop('checked', false);
                
                var limit = 2;
                $("#sauceOptions :input").click(function() {
                    if($("#sauceOptions :input").siblings(':checked').length > limit) {
                        $(this).prop('checked', false);
                    }
                });
            } else {
                $("#sauceOptions :input").unbind();
                $("#sauceContainer").children( "h4" ).text(" *Choose up to (4) flavors. ");
                $("#sauceOptions :input").prop('checked', false);

                var limit = 4;
                console.log("line 64: " + $("#sauceOptions :input").siblings(':checked').length);
                $("#sauceOptions :input").click(function() {
                    console.log("Linr 66: " + $("#sauceOptions :input").siblings(':checked').length);
                    if($("#sauceOptions :input").siblings(':checked').length > 4) {
                        $(this).prop('checked', false);
                    }
                });
            }
        });
    });
    
    // Chicken Tenders Trigger Modal Pop-Up
    $( "#2" ).click(function(event) {
        
        //Set modal and content to visible 
        $(".modal2, .modal-content2").addClass("active");
        
        //Reset modal and content to hidden and reset values
        $(".close2").click(function(event) {
            $(".modal2, .modal-content2").removeClass("active");
            $('input[name="sides"]').prop('checked', false);
            $('#drinks').prop('selectedIndex',-1);
            event.stopPropagation();
        });

        $("#submit2").click(function(event) {
            orderList.push("5 pcs Chicken Tenders");
            updateOrderList();

            $(".modal2, .modal-content2").removeClass("active");
            $('input[name="sides"]').prop('checked', false);
            $('#drinks').prop('selectedIndex',-1);
            event.stopImmediatePropagation();
        });
        
    });
    
    // Seasoned Fries Trigger Modal Pop-Up
    $( "#3" ).click(function(event) {

        //Set modal and content to visible 
        $(".modal3, .modal-content3").addClass("active");

        //Reset modal and content to hidden and reset values
        $(".close3").click(function(event) {
            $(".modal3, .modal-content3").removeClass("active");
            event.stopImmediatePropagation();
        })

        $("#submit3").click(function(event) {
            orderList.push("Seasoned Fries");
            updateOrderList();
            $(".modal3, .modal-content3").removeClass("active");
            event.stopImmediatePropagation();
        })
        
        event.stopImmediatePropagation();
    });
    
    // Pickles Trigger Modal Pop-Up
    $( "#4" ).click(function(event) {

        //Set modal and content to visible 
        $(".modal4, .modal-content4").addClass("active");

        //Reset modal and content to hidden and reset values
        $(".close4").click(function(event) {
            $(".modal4, .modal-content4").removeClass("active");
            event.stopImmediatePropagation();
        })

        $("#submit4").click(function(event) {
            orderList.push("Fried Dill Pickles");
            updateOrderList();
            $(".modal4, .modal-content4").removeClass("active");
            event.stopImmediatePropagation();
        })

        event.stopImmediatePropagation();
    }); 

    // Water Trigger Modal Pop-Up
    $( "#5" ).click(function(event) {

        //Set modal and content to visible 
        $(".modal5, .modal-content5").addClass("active");
        
        //Reset modal and content to hidden and reset values
        $(".close5").click(function(event) {
            $(".modal5, .modal-content5").removeClass("active");
            event.stopImmediatePropagation();
        });

        $("#submit5").click(function(event) {
            orderList.push("Water Bottle");
            updateOrderList();
            $(".modal5, .modal-content5").removeClass("active");
            console.log("line 203");
            event.stopImmediatePropagation();
        });

        event.stopImmediatePropagation();
    });

    // Soft Drink Trigger Modal Pop-Up
    $( "#6" ).click(function(event) {
        //Set modal and content to visible 
        $(".modal6, .modal-content6").addClass("active");

        //Reset modal and content to hidden and reset values
        $(".close6").click(function(event) {
            $(".modal6, .modal-content6").removeClass("active");
            
        })

        $("#submit6").click(function(event) {
            var selectedDrink = $("#drinks").children("option:selected").text();
            console.log(selectedDrink);
            orderList.push(selectedDrink);
            updateOrderList();
            $("#drinks").prop('selectedIndex',0);
            $(".modal6, .modal-content6").removeClass("active");
            event.stopImmediatePropagation();
        })

        event.stopImmediatePropagation();
    });

    // Cancel Order Trigger Modal Pop-ups
    $("#cancelOrder").click(function() {
        $(".modal7, .modal-content7").addClass("active");
        return false;
    });

    $("#submitOrder").click(function() {
        window.location.replace('submission.html');
        return false;
    });
    
    $("#submit7").click(function() {
        window.location.replace('orderingApp.html');
        return false;
    });

    $("#submit8").click(function() {
        $(".modal7, .modal-content7").removeClass("active");
        return false;
    });

    $("#returnBtn").click(function() {
        $("#cancelOrder").click();
        return false;
    });

    $("#subRestart").click(function() {
        window.location.replace('orderingApp.html');
        return false;
    });

    //Reset Wing Modal
    function resetWingModal(){
        $(".modal1, .modal-content1").removeClass("active");
        $('input[name="wings"]').prop('checked', false);
        $('input[name="sides"]').prop('checked', false);
        $("#sauceOptions :input").prop('checked', false);
        $("#sauceContainer").children("h4").text("*Choose wing quantity.");
        $('#drinks').prop('selectedIndex',-1);
    }

    
});