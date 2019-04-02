Stripe.setPublishableKey('pk_test_IMvfR5cuqvCHIshTiVyVYGW900LIEw7AuB');

var $form = $('#checkout');

$form.submit(function(event) {
    $('#payment-errors').addClass('d-none');
    $form.find('button').prop('disabled', true);
    console.log("21524632345");
    
    Stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiration-month').val(),
        exp_year: $('#card-expiration-year').val(),
        name: $('#card-holder').val()
    }, stripeResponseHandler);

    return false;
});

function stripeResponseHandler(status, response) {
    if(response.error) {
        $('#payment-errors').text(response.error.message);
        $('#payment-errors').removeClass('d-none');
        $form.find('button').prop('disabled', false);
    } else {
        var token = response.id;

        $form.append($('<input type="hidden" name="stripeToken" />').val(token));
        $form.get(0).submit();
    }
}
