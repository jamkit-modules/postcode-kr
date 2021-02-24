function searchPostcode(onResult, onError) {
    var layer = document.getElementById('layer');

    new daum.Postcode({ 
        oncomplete: function(result) { 
            onResult(result);
        },
        onresize: function(size) {
            layer.style.height = size.height + 'px';
        },
        width: '100%',
        height: '100%'
    }).embed(layer);
}
