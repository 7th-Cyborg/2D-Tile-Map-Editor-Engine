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

function changeTile (layer, x, y, value) {
    map[layer][y][x] = value;
}