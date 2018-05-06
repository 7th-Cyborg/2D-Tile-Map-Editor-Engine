var tileX, tileY = -1;
var mouseDown = false, mouseDragging = false;
var layerIndex = 0;
var clearTile = false;
var showGrid = false;

function getLayerIndex() {
    var radios = document.querySelectorAll('input[type="radio"]:checked');
    var value = radios.length > 0 ? radios[0].value : null;

    var tileIndex = mapTilesTypes.indexOf(value);

    return tileIndex;
}

function radioButton(value) {
    layerIndex = value;
}

function clearTileCheckBox(e) {
    clearTile = event.target.checked;
}

function showGridCheckBox(e) {
    showGrid = event.target.checked;
}


function fillButton() {
    var value = clearTile ? 0 : 15;
    fillLayer(map[layerIndex], value);
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
        paintTile(layerIndex, x, y);
    }
}