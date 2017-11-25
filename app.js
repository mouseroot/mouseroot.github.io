$(document).ready(function(){
    var c = $("#c");
    var cx = c.get(0).getContext("2d");
    var x=0,y=0;
    
    var grid = [1,1,1,1,1,1,1,1,
                1,5,0,0,0,0,0,1,
                1,0,0,0,0,0,0,1,
                1,1,1,1,1,1,1,1,
                1,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,1,
                1,1,1,1,1,1,1,1];
    var pal = {
      1: "gray",
      0: "white",
      5: "red"
    };
    
    var gsize = 8;
    var tsize = 25;
    
    
    function bg(color) {
      cx.fillStyle = color;
      cx.fillRect(-100,-100,500,500);
    }
    function update() {
      
    }
    function draw() {
      bg("black");
      for(var i=0;i < grid.length;i++){
        var xx = (i % gsize);
        var yy = Math.floor(i / gsize);
        var ix = grid[i];
        cx.fillStyle = pal[ix];
        cx.fillRect(xx*tsize,yy*tsize,tsize,tsize);
      }
      cx.font = "15px Courier";
      cx.fillStyle = "yellow";
      cx.fillText(x + " " + y,5,15);
    }
    
    function render() {
      update();
      draw();
      requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);
    c.on("mouseover", function(e) {
      var r = c.get(0).getBoundingClientRect();
      var mx = e.clientX - r.left;
      var my = e.clientY - r.top;
      x = Math.floor(mx / ((tsize*gsize+1)/gsize));
      y = Math.floor(my / ((tsize*gsize+1)/gsize));
    });
    
});