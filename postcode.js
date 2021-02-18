function searchPostcode(onResult, onError) {
    new daum.Postcode({ 
        oncomplete: function(result) { 
            onResult(result);
        } 
    }).embed();
}
