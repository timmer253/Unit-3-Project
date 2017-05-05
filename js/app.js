'use strict';
$(document).ready(function() {
// Construct the HTML in the Document, Assigning ID's as we go
    $('fieldset').each(function(index) {
        $(this).attr("id", "fieldset-" + (index+1));
    });

//"Other" field for job selection
    $('#fieldset-1').append("<input type='text' id='other-field' placeholder='Your Title...' name='otherJob'>");
    $("#other-field").hide();

//T Shirt Selection field
    $('#color').html("<option value='none'>Please select a T-shirt Theme</option>");
    $('#colors-js-puns').hide();

    var totalCost = 0;
    $('.activities').append("<p id='p2'> Total Cost Will Be: $" + totalCost + "</p>");

//////////////////////////GIVE FOCUS TO NAME FIELD//////////////////////////
    $('#name').focus();
//when other is selected, allow user to enter text
    $( "#title").change(function() {
        if ($("#title option:selected").text() == "Other") {
            $("#other-field").show();
        }
        else {
            $("#other-field").hide();
        }});

////////////////////T SHIRT SECTION///////////////////////////////////////
    var themeValid = false;
    $( "#design").change(function() {
        if ($("#design option:selected").text() === "Theme - JS Puns") {
            $('#colors-js-puns').show();
            $("#color").html("<option value='cornflowerblue'>Cornflower Blue</option><option value='darkslategrey'>Dark Slate Grey</option><option value='gold'>Gold</option>");
            themeValid = true;
            return themeValid
        }
        else if ($("#design option:selected").text() === 'Theme - I ♥ JS') {
            $('#colors-js-puns').show();
            $("#color").html("<option value='tomato'>Tomato</option><option value='steelblue'>Steel Blue</option><option value='dimgrey'>Dim Grey</option>");
            themeValid = true;
            return themeValid;
        }
       else {
            $('#colors-js-puns').hide();
            themeValid = false;
            return themeValid;
        }
        console.log(themeValid);
    });


// assign ID to activities based upon time of day
    $(".activities > label").each (function() {
        if ($(this).text().indexOf("Tuesday 9am-12pm") >= 0) {
            $(this).children().attr("id", "morningBox");
        }
        else if ($(this).text().indexOf("Tuesday 1pm-4pm") >= 0) {
            $(this).children().attr("id", "afternoonBox");
        }
        else if ($(this).text().indexOf("Wednesday") >= 0) {
            $(this).children().attr("id", "Wednesday");
        }
        else {
            $(this).children().attr("id", "wholeDayBox");
        }});

//////////////////////REGISTER FOR ACTIVITIES////////////////////////////////////
    $(".activities").find("input:checkbox").change(function() {
        $('#p2').remove();

// create a global 'this'
        let checkedBox = $(this);

// Default behavior for when boxes are checked
        if ($(this).prop('checked')) {
            if ($(this).attr("id") == "morningBox") {
                $(".activities > label").each (function() {
                    if ($(this).find("input").attr("id") == "morningBox") {
                        $(this).find("input:not(:checked)").attr('disabled', 'disabled');
                        $(this).find("input:not(:checked)").parent().append('<small id="Booked">&nbsp; &nbsp;Time slot unavailable</small>');
                    }
                });
                totalCost += 100;
            }
            // if checkbox related to an afternoon workshop is checked
                else if ($(this).attr("id") == "afternoonBox") {
                $(".activities > label").each (function() {
                    if ($(this).children().attr("id") === "afternoonBox") {
                        $(this).find("input:not(:checked)").attr('disabled', 'disabled');
                        $(this).find("input:not(:checked)").parent().append('<small id="Booked">&nbsp; &nbsp; Time slot unavailable</small>');
                    }
                });
                totalCost += 100;
            }
            else if ($(this).attr("id") == "wholeDayBox") {
                totalCost += 200;
            }
            else if ($(this).attr("id") == "Wednesday") {
                totalCost += 100;
            }
        }
        //Default behavior for unchecked boxes
        else if (!$(this).prop('checked')) {
            if ($(this).attr("id") == "morningBox") {
                $(".activities > label").each (function() {
                    if ($(this).find("input").attr("id") == "morningBox") {
                        $(this).find("input:not(:checked)").prop('disabled', false);
                        $(this).find('#Booked').remove();
                    }});
                totalCost -= 100;
            }
            else if ($(this).attr("id") == "afternoonBox") {
                $(".activities > label").each (function() {
                    if ($(this).children().attr("id") === "afternoonBox") {
                        $(this).find("input:not(:checked)").prop('disabled', false);
                        $(this).children('#Booked').remove();
                    }});
                totalCost -= 100;
            }
            else if ($(this).attr("id") == "wholeDayBox") {
                totalCost -= 200;
            }
            else if ($(this).attr("id") == "Wednesday") {
                totalCost -= 100;
            }

        }
        //Cost calculation behavior
        $('.activities').append("<p id='p2'>Total Cost Will Be: $" + totalCost + "</p>");
        if (totalCost === 0) { activitySelected = false;}
        else if (totalCost > 0) {activitySelected=true;}
        console.log(activitySelected);
    });

//////////////////////////////VALIDATION SECTION //////////////////////////////////
    var nameValid = false;
    var emailValid = false;
    var tShirtSelected = false;
    var activitySelected = false;
    var ccNumValid = false;
    var zipValid = false;
    var cValidate = false;
    var paymentValid = false;
    var creditCardSelected = !paymentValid;

// Payment Fieldset Validator
// Set CVV max length
    $('#cvv').attr('maxlength', 3);
    $( "p:contains('PayPal')").hide();
    $( "p:contains('Bitcoin')").hide();

    $("#payment").change(function() {
        if ($("#payment option:selected").text() == "Credit Card") {
            $( "#credit-card").show();
            $( "p:contains('PayPal')").hide();
            $( "p:contains('Bitcoin')").hide();
            paymentValid = false;
            return paymentValid;
        }
        else if ($("#payment option:selected").text() == "PayPal") {
            $( "p:contains('PayPal')").show();
            $( "p:contains('Bitcoin')").hide();
            $( "#credit-card").hide();
            paymentValid = true;
            return paymentValid;
        }
        else if ($("#payment option:selected").text() == "Bitcoin") {
            $( "p:contains('Bitcoin')").show();
            $( "p:contains('PayPal')").hide();
            $( "#credit-card").hide();
            paymentValid = true;
            return paymentValid;
        }
        else {
            $( "p:contains('PayPal')").hide();
            $( "p:contains('Bitcoin')").hide();
            $( "#credit-card").hide();
            paymentValid = false;
            creditCardSelected = false;
        }
    });

///////////////////////////////////// Form Validation/////////////////////////////////////////////////////////////
//event listener for name validation
    $("#name").keyup(function() {
        if ($("name").val() !== "") {
            nameValid = true;
            return nameValid;
        }});
//Email address validation
    var validateEmail = function(email) {
        var RegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return RegEx.test(email);
    };
// event listener for email validation
    $("#mail").keyup(function() {
        emailValid = validateEmail($(this).val());
        return emailValid;
    });
// use Credit Card Validation JQuery Plugin Function
    ccNumValid = $("#cc-num").validateCreditCard().valid;

    var validateNumber = function(number) {
        var REx = /^\d+$/;
        return REx.test(number);
    };

    $("#zip").keyup(function() {
        zipValid = validateNumber($(this).val());
        return zipValid;
    });

    $("#cvv").keyup(function() {
        var cvvValid = validateNumber($(this).val());
        var lengthValid = (String($(this).val()).length == 3);
        cValidate = (cvvValid && lengthValid);
        return cValidate;
    });

    var emailAddress = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    var creditCard = /\b\d{4}(| |-)\d{4}\1\d{4}\1\d{4}\b/g;
    var zipCode = /^\d{5}(?:[-\s]\d{4})?$/;
    var errorMessage ="";

    $('form').prepend('<p id="error-message"></p>');
    $('#error-message').hide();
    $('form').submit(function (e){
        e.preventDefault();

        if ( $('#name').val() === "" ) {
            console.log("Error!");
            $("html, body").animate({scrollTop: 0}, "slow");
            errorMessage = "<h2>Error!</h2> Please ensure you have entered all required fields.";
            $('#name').addClass('error');
            $('#name').focus();
        } else if ( !emailAddress.test($('#mail').val()) ) {
            $("html, body").animate({scrollTop: 0}, "slow");
            errorMessage = "<h2>Error!</h2> Please enter a valid email.";
            $('#mail').focus();
        } else if ($("#design option:selected").text() === "Select Theme"){
            $("html, body").animate({scrollTop: 0}, "slow");
            errorMessage = "<h2>Error!</h2> Please select a T-Shirt Design.";
            $('#design').focus();
        } else if ( $(".activities > label > input:checked").length === 0 ) {
            $("html, body").animate({scrollTop: 0}, "slow");
            errorMessage = "<h2>Error!</h2> Please select at least one activity.";
            $('.activities').focus();
        } else if ( $("#payment").val() === "select_method" )  {
            $("html, body").animate({scrollTop: 0}, "slow");
            errorMessage = "<h2>Error!</h2>Please select a payment method.";
            $('#payment').focus();
        } else if ( $("#payment").val() === "credit card" && !creditCard.test($("#cc-num").val()) )  {
            $("html, body").animate({scrollTop: 0}, "slow");
            errorMessage = "<h2>Error!</h2>Please enter a valid credit card number.";
            $('#cc-num').focus();
        } else if ( $("#payment").val() === "credit card" && !zipCode.test($("#zip").val()) )  {
            $("html, body").animate({scrollTop: 0}, "slow");
            errorMessage = "<h2>Error!</h2>Please enter your zip code.";
            $('#zip').focus();
        } else if ( $("#payment").val() === "credit card" && $("#cvv").val().length < 3)  {
            $("html, body").animate({scrollTop: 0}, "slow");
            errorMessage = "<h2>Error!</h2>Please enter a 3 digit CVV";
            $('#cvv').focus();
        } else {
            $("html, body").animate({scrollTop: 0}, "slow");
            errorMessage = "";
            alert("You have registered successfully.");
        }
        document.getElementById('error-message').innerHTML = errorMessage;
        $('#error-message').show();
    });
});