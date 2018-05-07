var tileWidth = 32, tileHeight = 32;
var mapWidth = 32, mapHeight = 32;
var map = [];

var mapTilesTypes = ['Water', 'Sand', 'Dirt', 'Grass'];

function initMap() {
    mapTilesTypes.forEach((type) => {
        addLayer(type);
    });

    fillLayer(map[0],15);
}

function addLayer(layerType) {
    var layer = [];

    for (var y = 0; y < mapHeight; y++) {
        layer[y] = [];
        for (var x = 0; x < mapWidth; x++) {
            layer[y][x] = 0;
        }
    }

    map.push(layer);
}

function fillLayer(layer, value) {
    for (var y = 0; y < mapHeight; y++) {
        for (var x = 0; x < mapWidth; x++) {
            layer[y][x] = value;
        }
    }
    redrawMap = true;
}

function setTileValue(layer, x, y, value) {
    if (x < 0 || x >= mapWidth || y < 0 || y >= mapHeight) {
        return;
    }

    map[layer][y][x] = value;
}

function setBit(num, bit) {
    return num | 1<<bit;
}

function clearBit(num, bit) {
    return num & ~(1<<bit);
}

function paintTile(layer, x, y) {
    //Top
    var top = getTileValue(layer, x, y - 1);
    //Top Left
    var topLeft = getTileValue(layer, x - 1, y - 1);
    //Top Right
    var topRight = getTileValue(layer, x + 1, y - 1);
    //Left
    var left = getTileValue(layer, x - 1, y);
    //Right
    var right = getTileValue(layer, x + 1, y);
    //Bottom
    var bottom = getTileValue(layer, x, y + 1);
    //Bottom Left
    var bottomLeft = getTileValue(layer, x - 1, y + 1);
    //Bottom Right
    var bottomRight = getTileValue(layer, x + 1, y + 1);

    if (top != -1) {
        top = clearTile ? clearBit(top, 3) : setBit(top, 3);
        top = clearTile ? clearBit(top, 2) : setBit(top, 2);
        setTileValue(layer, x, y - 1, top);
    }

    if (topLeft != -1) {
        topLeft = clearTile ? clearBit(topLeft, 3) : setBit(topLeft, 3);
        setTileValue(layer, x - 1, y - 1, topLeft);
    }

    if (topRight != -1) {
        topRight = clearTile ? clearBit(topRight, 2) : setBit(topRight, 2);
        setTileValue(layer, x + 1, y - 1, topRight);
    }

    if (left != -1) {
        left = clearTile ? clearBit(left, 1) : setBit(left, 1);
        left = clearTile ? clearBit(left, 3) : setBit(left, 3);
        setTileValue(layer, x - 1, y, left);
    }

    if (right != -1) {
        right = clearTile ? clearBit(right, 0) : setBit(right, 0);
        right = clearTile ? clearBit(right, 2) : setBit(right, 2);
        setTileValue(layer, x + 1, y, right);
    }

    if (bottom != -1) {
        bottom = clearTile ? clearBit(bottom, 0) : setBit(bottom, 0);
        bottom = clearTile ? clearBit(bottom, 1) : setBit(bottom, 1);
        setTileValue(layer, x, y + 1, bottom);
    }

    if (bottomLeft != -1) {
        bottomLeft = clearTile ? clearBit(bottomLeft, 1) : setBit(bottomLeft, 1);
        setTileValue(layer, x - 1, y + 1, bottomLeft);
    }

    if (bottomRight != -1) {
        bottomRight = clearTile ? clearBit(bottomRight, 0) : setBit(bottomRight, 0);
        setTileValue(layer, x + 1, y + 1, bottomRight);
    }

    if(clearTile) {
        setTileValue(layer, x, y, 0);
    } else {
        setTileValue(layer, x, y, 15);
    }

    redrawMap = true;
    
}

function getTileValue(layer, x, y) {
    if (x < 0 || x >= mapWidth || y < 0 || y >= mapHeight) {
        return -1;
    }

    return map[layer][y][x];
}

//TO-DO
function recalculateTiles(layer) {
    for (var y = 0; y < mapHeight; y++) {
        for (var x = 0; x < mapWidth; x++) {
            var currentTile = getTileValue(layer, x, y);

            if(currentTile != -1)
            {
                //Top
                var top = getTileValue(layer, x, y - 1);
                //Left
                var left = getTileValue(layer, x - 1, y);
                //Right
                var right = getTileValue(layer, x + 1, y);
                //Bottom
                var bottom = getTileValue(layer, x, y + 1);

                var newTileValue = 0;
            }
        }
    }
}