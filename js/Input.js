var tileX, tileY = -1;
var mouseDown = false, mouseDragging = false;
var layerIndex;

function getLayerIndex() {
    var radios = document.querySelectorAll('input[type="radio"]:checked');
    var value = radios.length > 0 ? radios[0].value : null;

    var tileIndex = mapTilesTypes.indexOf(value);

    return tileIndex;
}

function radioButton(value) {
    layerIndex = value;
}

function fillButton() {
    fillLayer(map[0], layerIndex);
}

function onMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();

    mouseDown = true;
    paintTiles(e);
}

function onMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();

    mouseDown = false;
    mouseDragging = false;
}

function onMouseMove(e) {
    e.preventDefault();
    e.stopPropagation();

    if (mouseDown) {
        paintTiles(e);
    }
}

function paintTiles(e) {
    var x = Math.floor((event.offsetX) / tileWidth);
    var y = Math.floor((event.offsetY) / tileHeight);

    if (x != tileX || y != tileY) {
        tileX = x;
        tileY = y;
        changeTile(0, x, y, layerIndex);
    }
}