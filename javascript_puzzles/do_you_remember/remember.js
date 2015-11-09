var test_ref;
var solved = [];

function random_index(array)
{
    return Math.floor((Math.random()*(array.length)));
}

function random_array()
{
    var array = [];
    var rand_array = [];
    var nb_elems = 8;
    
    
    for (var i = 0; i < nb_elems; i++)
    {
        // a pair of each
        array.push(i);
        array.push(i);
    }
    //document.getElementById("output0").innerHTML = array;
    
    for (;array.length > 0;)
    {
        rand_array.push(array.splice(random_index(array), 1)[0]);
    }
    
    //document.getElementById("output").innerHTML = rand_array;

    return rand_array;
}



function assign_icons()
{
    var array = random_array();
    test_ref = null;
    solved = [];
    
    
    
    $(".div-table-col").attr("class", "div-table-col")
                       .css("opacity", "1");
                       
    setTimeout(function() {
                $(".div-table-col").css("opacity", "0");
                }, 150);

    $(".div-table-col").addClass(
        function (index)
        {
            var cl = "icon_" + array[index];
            return cl;
        }
    );
    
    $(".div-table-col").attr("id",
        function (index)
        {
            var cl = "icon_" + array[index];
            return cl;
        }
    );
}

function set_background()
{
    var backgrounds = [
        "Clouds.bmp",
        "Forest.bmp",
        "Setup.bmp",
    ];
    
    var bg_and_patterns = [
        "Clouds.bmp",
        "Forest.bmp",
        "Setup.bmp",
        "1STBOOT.BMP",
        "Black Thatch.bmp",
        "Blue Rivets.bmp",
        "Bubbles.bmp",
        "Carved Stone.bmp",
        "Circles.bmp",
        "Gold Weave.bmp",
        "Houndstooth.bmp",
        "IBMWALL.BMP",
        "Metal Links.bmp",
        "Pinstripe.bmp",
        "Red Blocks.bmp",
        "Stiches.bmp",
        "Straw Mat.bmp",
        "Tiles.bmp",
        "Triangles.bmp",
        "Waves.bmp"];
        
    var bg_filename = bg_and_patterns[random_index(bg_and_patterns)];
    var bg_path = "bg_patterns/" + bg_filename;
    
    $('.div-table').css('background-image', 'url("' + bg_path + '")');
    
    if (backgrounds.indexOf(bg_filename) === -1)
    {
        $('.div-table').css('background-size', 'auto');
    }
    else
    {
        $('.div-table').css('background-size', 'cover');
    }
    
}

$('.div-table-col').click(function() {
    
    if (solved.indexOf(this) >= 0)
    {
        return;
    }
    
    if (test_ref === null)
    {
        test_ref = this;
        $(this).css("opacity", "1");
    }
    else
    {
        $(this).css("opacity", "1");
        
        if (this === test_ref)
        {
            return;
        }
        else if ($(this).attr("id") == $(test_ref).attr("id"))
        {
            //alert("match!");
            solved.push(this);
            solved.push(test_ref);
            
            test_ref = null;
            
            if (solved.length === 16)
            {
                setTimeout(function() {
                
                $('.bsod').css("z-index", "10").css("background-color","#0000aa");
                
                
                setTimeout(function() {
                $('.bsod').css("z-index", "-10");
                $('.post').css("z-index", "10").css("background-color","#000000");
                
                setTimeout(function() {
                $('.post').css("z-index", "-10");
                $('.boot').css("z-index", "10").css("background-color","#000000");
                
                 setTimeout(function() {
                $('.boot').css("z-index", "-10");
                
                assign_icons();
                
                }, 2500);
                
                
                }, 1800);
                
                }, 1800);
                
                }, 750);
                
                //alert("entirely solved");
            }
        }
        else
        {
            //alert("no match");
            $(this).css("opacity", "1");
            $(test_ref).css("opacity", "0");
            test_ref = this;
        }

    }
});

/* not ncessary
$( ".div-table-col" ).hover(
function() {
if (solved.indexOf(this) < 0)
{
    $(this).css("cursor", "help");
}
}, function() {
$(this).css("cursor", "auto");
}
); */