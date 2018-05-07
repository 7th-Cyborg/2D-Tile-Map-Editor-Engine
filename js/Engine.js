var ctx = null;
var canvas = null;
var currentSecond = 0, frameCount = 0, framesLastSecond = 0;
var tileSetImage = new Image();
var redrawMap = true;

function Init() {
    canvas = document.getElementById('map');

    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mousemove", onMouseMove, false);
    canvas.addEventListener("mouseout", onMouseUp, false);

    ctx = canvas.getContext("2d");
    requestAnimationFrame(Render);
    ctx.font = "bold 10pt sans-serif";

    tileSetImage.src = 'image/tile-sets.png';
    initMap();
}

window.onload = function () {
    Init()
};

function Render() {
    if (ctx == null) { return; }

    var sec = Math.floor(Date.now() / 1000);
    if (sec != currentSecond) {
        currentSecond = sec;
        framesLastSecond = frameCount;
        frameCount = 1;
    }
    else { frameCount++; }

    if (redrawMap) {
        for (var y = 0; y < mapHeight; y++) {
            for (var x = 0; x < mapWidth; x++) {

                //TO-DO Loop
                var value = map[0][y][x];
                var value2 = map[1][y][x];
                var value3 = map[2][y][x];
                var value4 = map[3][y][x];

                ctx.drawImage(tileSetImage, tileWidth * value, 0 * tileHeight, tileWidth, tileHeight, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
                ctx.drawImage(tileSetImage, tileWidth * value2, 1 * tileHeight, tileWidth, tileHeight, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
                ctx.drawImage(tileSetImage, tileWidth * value3, 2 * tileHeight, tileWidth, tileHeight, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
                ctx.drawImage(tileSetImage, tileWidth * value4, 3 * tileHeight, tileWidth, tileHeight, x * tileWidth, y * tileHeight, tileWidth, tileHeight);

                if (showGrid) {
                    ctx.drawImage(tileSetImage, 0, 15 * tileHeight, tileWidth, tileHeight, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
                }


            }
        }
        redrawMap = false;
    }

    ctx.fillStyle = "#ff0000";
    ctx.fillText("FPS: " + framesLastSecond, 10, 20);

    requestAnimationFrame(Render);
}