makeboxes = function() {
   var boxes = new Array;
   var randImg = ['assets/images/102706941_897645fc02_b.jpg','assets/images/1471984989_957c7f7093_b-560x400.jpg','assets/images/1714127310_bd8df32bd3_b.jpg','assets/images/2065246941_e51172f8b5_b.jpg','assets/images/3710498218_22e62d11b2_o-650x400.jpg','assets/images/5318048862_108c0667ee_b-599x400.jpg','assets/images/IMG_20160507_141157.jpg','assets/images/IMG_20160507_150948.jpg', ];

   var randTxt = [
   'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut. Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
   'Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad ',
   'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
   'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.',
   'Duis aunt occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
   'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
   'Adipisicing elit, sed do eiusmod.',
   'Fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
   ];
   var amount = Math.floor(Math.random()*20); if (amount == 0) amount = 1;
   for(i=0;i<amount;i++){
      num = Math.floor(Math.random()*randTxt.length)
      div = $('<div></div>').addClass('item');
      h3 = '<div class="ht-content"><h3>'+randTxt[num]+'</h3></div>';
      if(num % 2 === 0) {
        div.addClass('ht-w-img');
        img = '<div class="ht-img"><img src="'+randImg[num]+'" ></div>';
        div.append(img);
      }
      else if(num % 3 === 0) {
        div.addClass('ht-twitter');
      }
      div.append(h3);
      boxes.push(div);
    }
    return boxes;
}

initHover = function () {
  jQuery('.item').on("mouseenter", function() {
    jQuery('p.innerc').empty();
    var card = jQuery(this);
    var overlay = jQuery('.overlay');
    var innerWrapper = jQuery('p.innerc');
    var urlData = card.find(".url-value").data("url");

    innerWrapper.text(jQuery(card, 'p').text().trim());
    overlay.css('display', 'block').appendTo(card);

    placeShareUrl(urlData);

  });
  jQuery('.share-this').on("click", function() {
    var href = jQuery(this).attr('href');
    var shareSocial = jQuery(this).data("social");

    switch (shareSocial){
      case "fb": facebookWindow(href); break;
      case "twitter": twitterWindow(href); break;
      case "google": googlePlusWindow(href); break;
      case "email": emailWindow(href); break;
    }
  });
}
placeShareUrl = function(url){
  jQuery('a.share-this').each(function() {
    jQuery(this).attr('href',url);
  });
}
facebookWindow = function(url){
  window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
  return false;
}
twitterWindow = function(url){
  window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + ':%20'  + encodeURIComponent(document.URL));
  return false;
}
googlePlusWindow = function(url){
  window.open('https://plus.google.com/share?url=' + encodeURIComponent(document.URL));
  return false;
}
emailWindow = function(url){
  window.open('mailto:?subject=' + encodeURIComponent(document.title) + '&body=' +  encodeURIComponent(document.URL));
  return false;
}


$(".ht-wall").gridalicious({
  gutter: 5,
  width: 300,
  animate: true
});

$(window).bind('scroll', function() {
  if($(window).scrollTop() >= $('.ht-wall').offset().top + $('.ht-wall').outerHeight() - window.innerHeight) {
    $("#ht-wall").gridalicious('append', makeboxes());
    initHover();
  }
});


initHover();
