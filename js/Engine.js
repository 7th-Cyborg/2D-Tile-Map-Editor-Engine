var ctx = null;
var canvas =  null;
var currentSecond = 0, frameCount = 0, framesLastSecond = 0;

function Init() {
    canvas = document.getElementById('map');

    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mousemove", onMouseMove, false);
    canvas.addEventListener("mouseout", onMouseUp, false);

    ctx = canvas.getContext("2d");
    requestAnimationFrame(Render);
    ctx.font = "bold 10pt sans-serif";
    initMap();
}

window.onload = function () {
    Init()
};

function Render() {
    if(ctx==null) { return; }

    var sec = Math.floor(Date.now()/1000);
	if(sec!=currentSecond)
	{
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
	}
    else { frameCount++; }
    
    for(var y = 0; y < mapHeight; y++)
	{
		for(var x = 0; x < mapWidth; x++)
		{
			switch(map[0][y][x])
			{
                case 0:
                    ctx.fillStyle = "#0099ff";
                    break;
                case 1:
                    ctx.fillStyle = "#ffffe6";
                    break;
                case 2:
                    ctx.fillStyle = "#734d26";
                    break;
                case 3:
                    ctx.fillStyle = "#339933";
                    break;
                default:
                    ctx.fillStyle = "#000000";
			}

			ctx.fillRect( x * tileWidth, y * tileHeight, tileWidth, tileHeight);
		}
	}

	ctx.fillStyle = "#ff0000";
	ctx.fillText("FPS: " + framesLastSecond, 10, 20);

	requestAnimationFrame(Render);
}