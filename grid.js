$(document).ready(function(){
    var c = $("#c");
    var cx = c.get(0).getContext("2d");
    var x=0,y=0;
    var mx=0,my=0;
    var level = 0;
    function getPlayer(id,grid) {
      for(var i=0;i < grid.length;i++) {
        if(grid[i] == id) {
          return i;
        }
      }
    }

    function getObjects(id,grid) {
        obj = [];
        for(var i=0;i < grid.length;i++) {
            if(grid[i] == id) {
                obj.push(i);
            }
        }
        return obj;
    }

    function removeDuplicate(id,grid) {
        var obj = getObjects(id,grid);
        for(var i=1;i < obj.length;i++) {
            grid[obj[i]] = 1;
        }
    }

    //Load Grid
    grid = TileMaps["grid_map"].layers[level].data;

    var images = {
        "wall": new Image(),
        "floor": new Image(),
        "player": new Image(),
        "door": new Image(),
        "enemy": new Image(),
        "coin": new Image()
    };
    images["wall"].src = "wall.png";
    images["floor"].src = "grass.png";
    images["player"].src = "player.png";
    images["door"].src = "door.png"; 
    images["enemy"].src = "enemy.png";
    images["coin"].src = "coin.png";

    var pal = {
        1: images["floor"],
        2: images["wall"],
        3: images["player"],
        4: images["door"],
        5: images["enemy"],
        6: images["coin"]
    }
    var pos = getPlayer(3,grid);

    //Grid Size Load
    //var gsize = 15;
    gsize = TileMaps["grid_map"].layers[0].width;

    var tsize = 15;
    var offset = 0;
    
    function bg(color) {
        cx.fillStyle = color;
        cx.fillRect(-100,0,1000,1000);
    }
    
    function genGrid(size) {
        var g = [];
        for(var i=0;i < size*size;i++) {
            g.push(1);
        }
        return g;
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function updateEnemy(e) {
        //var e = getPlayer(5,grid);
        var ex = (e % gsize);
        var ey = Math.floor(e / gsize);
        var rd = getRandomInt(1,5);
        switch(rd) {
            //up
            case 1:
                if(grid[ex + gsize * ey+gsize] == 1) {
                    grid[ex + gsize * ey] = 1;
                    grid[ex + gsize * ey+gsize] = 5;
                }
                else if(grid[ex + gsize * ey-gsize] == 1) {
                    grid[ex + gsize * ey] = 1;
                    grid[ex + gsize * ey-gsize] = 5;
                }
            break;

            case 2:
                if(grid[ex + gsize * ey-gsize] == 1) {
                    grid[ex + gsize * ey] = 1;
                    grid[ex + gsize * ey-gsize] = 5;
                }
                else if(grid[ex + gsize * ey+gsize] == 1) {
                    grid[ex + gsize * ey] = 1;
                    grid[ex + gsize * ey+gsize] = 5;
                }
            break;


            case 3:
                if(grid[ex+1 + gsize * ey] == 1) {
                    grid[ex + gsize * ey] = 1;
                    grid[ex+1 + gsize * ey] = 5;
                }
                else if(grid[ex-1 + gsize * ey] == 1) {
                    grid[ex + gsize * ey] = 1;
                    grid[ex-1 + gsize * ey] = 5;
                }
            break;

            case 4:
                if(grid[ex-1 + gsize * ey] == 1) {
                    grid[ex + gsize * ey] = 1;
                    grid[ex-1 + gsize * ey] = 5;
                }
                else if(grid[ex+1 + gsize * ey] == 1) {
                    grid[ex + gsize * ey] = 1;
                    grid[ex+1 + gsize * ey] = 5;
                }
            break;
        }
    }

    var ic = 0;
    function update() {
        removeDuplicate(3,grid);
        pos = getPlayer(3,grid);
        x = (pos % gsize);
        y = Math.floor(pos / gsize);
        if(ic > 20) {
            var eList = getObjects(5,grid);
            for(var e in eList) {
                var ee = eList[e];
                updateEnemy(ee);
            }
            ic = 0;
        }
        ic++;
    }
    
    function draw() {
        //bg("#777");
        bg("green");
        for(var i=0;i < grid.length;i++){
            var xx = (i % gsize);
            var yy = Math.floor(i / gsize);
            var ix = grid[i];
            //cx.fillStyle = pal[ix];
            //cx.fillRect(offset+xx*tsize,offset+yy*tsize,tsize,tsize);
            cx.drawImage(pal[ix],xx*tsize,yy*tsize);
        }
    }
    
    //grid = genGrid(8);
    
    function render() {
        update();
        draw();
        requestAnimationFrame(render);
    }
    
    
    cx.translate(offset*2,0);
    requestAnimationFrame(render);
    c.on("click", function(e) {
        var r = c.get(0).getBoundingClientRect();
        mx = e.clientX - r.left;
        my = e.clientY - r.top;
        //x = Math.floor(mx / ((tsize*gsize+1)/gsize));
        //y = Math.floor(my / ((tsize*gsize+1)/gsize));
    });
    
    $(document).on("keydown",function(e){
    e.preventDefault();
    if(e.key == "ArrowDown") {
        if(grid[x + gsize * y+gsize] == 1) {
            grid[x + gsize * y] = 1;
            grid[x + gsize * y+gsize] = 3;
            //cx.translate(0,-tsize);
        }
        else if(grid[x + gsize * y+gsize] == 6) {
            grid[x + gsize * y] = 1
            grid[x + gsize * y+gsize] = 3;
           // cx.translate(0,-tsize);
        }
    }
    if(e.key == "ArrowUp") {
        if(grid[x + gsize * y-gsize] == 1) {
            grid[x + gsize * y] = 1;
            grid[x + gsize * y-gsize] = 3;
            //cx.translate(0,tsize);
        }
        else if(grid[x + gsize * y-gsize] == 6) {
            grid[x + gsize * y] = 1;
            grid[x + gsize * y-gsize] = 3;
            //cx.translate(0,tsize);
        }
    }
    if(e.key == "ArrowRight") {
        //If Floor
        if(grid[x+1 + gsize * y] == 1) {
            grid[x + gsize * y] = 1;
            grid[x+1 + gsize * y] = 3;
           //cx.translate(-tsize,0);
        }
        else if(grid[x+1 + gsize * y] == 6) {
            grid[x + gsize * y] = 1;
            grid[x+1 + gsize * y] = 3;
           // cx.translate(-tsize,0);
        }
        else if(grid[x+1 + gsize * y] == 4) {
            grid[x + gsize * y] = 1;
            grid[x+1 + gsize * y] = 3;
            level++;
            grid = TileMaps["grid_map"].layers[level].data;
        }
    }
    if(e.key == "ArrowLeft") {
        if(grid[x-1 + gsize * y] == 1) {
            grid[x + gsize * y] = 1;
            grid[x-1 + gsize * y] = 3;
           // cx.translate(tsize,0);
        }
        else if(grid[x-1 + gsize * y] == 6) {
            grid[x + gsize * y] = 1;
            grid[x-1 + gsize * y] = 3;
           // cx.translate(tsize,0);
        }
    }
    });
      

});