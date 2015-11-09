var selection = [null, null, null, null];
var selection_it = 0;
var game_state = 0; // 0 IN PROGRESS; 1 DONE
var won_once = 0;
var wait_flag = 0;

$('#kitty').click(function() {
    if (wait_flag === 0) return;
    
    $('.character').addClass('not_selected').removeClass('opacity_zero');
    $('#kitty').addClass('invisible').removeClass('visible');
    
    for (var k = 0; k < 4; k++)
    {
        $(selection[k]).addClass('selected').removeClass('not_selected');
    }
    game_state = 0;
});

$('.character').click(function () {
    // if it's already selected, do nothing.
    if (selection.indexOf(this) >= 0) return;
    if (game_state !== 0) return;

    if (selection[selection_it] !== null)
    {
        $(selection[selection_it]).removeClass('selected').addClass('not_selected');
    }

    selection[selection_it] = this;
    $(this).removeClass('not_selected').addClass('selected');
    
    var score = 0;
    for (var k = 0; k < 4; k++)
    {
        if (selection[k] === null) break;
        
        if ($(selection[k]).hasClass('c_kenny') ||
            $(selection[k]).hasClass('c_cartman') ||
            $(selection[k]).hasClass('c_stan') ||
            $(selection[k]).hasClass('c_kyle'))
        {
            score = (score < 4)? score+1: score;
        }
        else
        {
            score = (score <= 0)? 0: score-1;
        }
    }
    
    if (score == 4)
    {
        game_state = 1;
        
        $('.not_selected').addClass('opacity_zero').removeClass('not_selected');
            

            setTimeout(function() {
                $('.character').removeClass('selected')
                               .removeClass('not_selected')
                               .addClass('opacity_zero');
                if (won_once === 0)
                {
                    won_once = 1;
                    $('#kitty').removeClass('invisible').addClass('visible');
                }
                else
                {
                    $('#doge').removeClass('invisible').addClass('visible');
                }
            }, 1000);
            setTimeout(function() {
                wait_flag = 1;
                }, 2000);
    }
        
    selection_it = (selection_it + 1) % 4;
});