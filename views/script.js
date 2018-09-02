$(document).ready(function(){
  M.AutoInit();

  $('.collapsible').collapsible({
    onOpenStart: (e) => {
      if (e.firstChild.nextSibling.firstChild.innerHTML = "add") {
        e.firstChild.nextSibling.firstChild.innerHTML = "remove";
      }
    },
    onCloseStart: (e) => {
      if (e.firstChild.nextSibling.firstChild.innerHTML = "remove") {
        e.firstChild.nextSibling.firstChild.innerHTML = "add";
      }
    }
  });

  $('.tabs').tabs({
    swipeable: true
  });

  $(".tabs-content").css('height','2300px');
  $(document).scroll((e) => {
    $(".tabs-content").css('height','2300px');
  })

  $('#toStage').click((e) => {
    e.preventDefault();
    $('ul.tabs').tabs('select', 'stage');
  });

  var scrollTop = 0;
  $(window).scroll(function(){
    scrollTop = $(window).scrollTop();
    
    if (scrollTop >= 100) {
      $('.nav-titre').addClass('scrolled-nav');
    } else if (scrollTop < 100) {
      $('.nav-titre').removeClass('scrolled-nav');
    } 
  });
});
