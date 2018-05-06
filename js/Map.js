var tileWidth = 32, tileHeight = 32;
var mapWidth = 32, mapHeight = 32;
var map = [];

var mapTilesTypes = ['Water', 'Sand', 'Dirt', 'Grass'];

function initMap() {
    mapTilesTypes.forEach((type) => {
        addLayer(type);
    });
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
}

function setTileValue(layer, x, y, value) {
    if (x < 0 || x >= mapWidth || y < 0 || y >= mapHeight) {
        return;
    }

    map[layer][y][x] = value;
}

function paintTile(layer, x, y, value) {
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
        top |= 1 << 3; // Set bit at position 3
        top |= 1 << 2; // Set bit at position 2
        setTileValue(layer, x, y - 1 , top);
    }

    if (topLeft != -1) {
        topLeft |= 1 << 3;
        setTileValue(layer, x - 1, y - 1 , topLeft);
    }

    if (topRight != -1) {
        topRight |= 1 << 2;
        setTileValue(layer, x + 1, y - 1 , topRight);
    }

    if (left != -1) {
        left |= 1 << 1;
        left |= 1 << 3;
        setTileValue(layer, x - 1, y, left);
    }

    if (right != -1) {
        right |= 1 << 0;
        right |= 1 << 2;
        setTileValue(layer, x + 1, y, right);
    }

    if (bottom != -1) {
        bottom |= 1 << 0;
        bottom |= 1 << 1;
        setTileValue(layer, x, y + 1 , bottom);
    }

    if (bottomLeft != -1) {
        bottomLeft |= 1 << 1;
        setTileValue(layer, x - 1, y + 1 , bottomLeft);
    }

    if (bottomRight != -1) {
        bottomRight |= 1 << 0;
        setTileValue(layer, x + 1, y + 1 , bottomRight);
    }

    setTileValue(layer, x, y, value);
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