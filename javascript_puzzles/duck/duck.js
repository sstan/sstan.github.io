var letters;
var dragSrcEl = null;

var x_i, x_f;
var y_i, y_f;
var dx, dy;

function handleMouseDown(e)
{
    x_i = e.screenX;
    y_i = e.screenY;

}

function handleDragStart(e)
{
    dragSrcEl = this;
    
    
    console.log("Drag Start");
    
    
    //e.dataTransfer.setData('text', this.id);
}

function handleDragOver(e)
{
    e.preventDefault();
    
    e.dataTransfer.dropEffect = 'move';
    
    return false;
}

function handleDragEnter(e)
{
    this.classList.add('over');
}

function handleDragLeave(e)
{
    this.classList.remove('over');
    
}

function handleDrop(e)
{
    e.preventDefault();
    
    if (e.stopPropagation)
    {
        e.stopPropagation();
    }
    
    if (dragSrcEl != this)
    {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
}

function handleDragEnd(e)
{
    [].forEach.call(letters, function (elem) {
        elem.classList.remove('over');
    });
    
    x_f = e.screenX;
    y_f = e.screenY;
    
    dx = x_f - x_i;
    dy = y_f - y_i;
    
    console.log("dx: " + dx + " dy: " + dy);
    var new_y = parseInt(dragSrcEl.style.top) + dy;
    var new_x = parseInt(dragSrcEl.style.left) + dx;
    
    dragSrcEl.style.top = new_y + "px";
    dragSrcEl.style.left = new_x + "px";
    
}

function handleDragMouseUp(e)
{
    console.log("mouseUp: y: " + e.clientY + " x: " + e.clientX);
    dragSrcEl.style.top = (e.clientY-offY) + 'px';
    dragSrcEl.style.left = (e.clientX-offX) + 'px';
}

function init_once()
{
 
     letters = document.querySelectorAll('.letter');
     
    [].forEach.call(letters, function (elem) {
        elem.addEventListener('dragstart', handleDragStart, false);
        elem.addEventListener('dragenter', handleDragEnter, false);
        elem.addEventListener('dragover', handleDragOver, false);
        elem.addEventListener('dragleave', handleDragLeave, false);
        elem.addEventListener('drop', handleDrop, false);
        elem.addEventListener('dragend', handleDragEnd, false);
        elem.addEventListener('mousedown', handleMouseDown, false);
        
    });
    
    document.getElementById("div_duck").addEventListener('dragover',
    function (e) {
        console.log("DRAG ENTER");
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.effectAllowed = 'move';
    });
    
    document.getElementById("center_picture_container").addEventListener('dragenter',
        function (e) {
        e.className = e.className + " over";
    });
    
    document.getElementById("center_picture_container").addEventListener('dragenter',
        function (e) {
        e.classList.add("over");
    });
    
    document.getElementById("center_picture_container").addEventListener('dragleave',
        function (e) {
        e.classList.remove("over");
    });
    

    place_letters();
}


function rand_place(max)
{
    return Math.floor((Math.random()*(max)));
}

function place_letters() {
    
    
    
    $( ".letter" ).each(function () {
        $(this).css("top", rand_place(200) + "px");
        $(this).css("left", rand_place(500) + "px");
    });

}