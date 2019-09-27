import loadGoogleMapsApi from 'load-google-maps-api';
import 'jquery-mask-plugin';
import { CountUp } from 'CountUp.js';
import 'bootstrap';
import $ from 'jquery';
window.$ = window.jQuery = $;

try {
  loadGoogleMapsApi({
    key: 'AIzaSyCHoEqcdenjwimHiqQ2h5vCNh1C6Qbs6Hk'
  }).then(function(googleMaps) {
    new googleMaps.Map(document.querySelector('.map'), {
      center: {
        lat: 40.7484405,
        lng: -73.9944191
      },
      zoom: 12
    });
  }).catch(function(error) {
    console.error(error);
  });
} catch (e) {

}

$(function() {
  $('[data-toggle="tooltip"]').tooltip();
  $('input[name="Phone"]').mask('(000) 000-0000');


  // Dropdown Menu
  $('ul.nav li.dropdown').hover(function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(100);
  }, function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(100);
  });

  // Fixed Header
  $(window).scroll(function() {
    if ($(window).scrollTop() >= 250) {
      if ($('header.header.fixed-top').length === 0) {
        $('header.header').clone().appendTo('body').addClass('fixed-top');

        $('.dropdown-toggle').dropdown();

        $('ul.nav li.dropdown').hover(function() {
          $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(100);
        }, function() {
          $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(100);
        });
      }
    } else {
      if ($(window).scrollTop() < 1) {
        $('header.header.fixed-top').remove();
      }
    }
  });

  /// Invoke actions when scrolled into view.
  document.addEventListener('aos:in:fade-in-done', ({ detail }) => {
    $('input[name="Phone"]').mask('(000) 000-0000');
    $(detail).find('[data-count]').each(function() {
      var el = $(this).get(0);
      var count = $(this).data('count');
      var countUp = new CountUp(el, count, { duration: 6 });
      countUp.start();
    });

    $(detail).find('[data-animation]').hide().each(function(fadeInDiv) {
      var animation = $(this).data('animation');
      var delay = fadeInDiv * 300;
      var self = $(this);
      setTimeout(function() {
        self.show();
        self.addClass(animation).addClass('animated');
      }, delay);
    });
  });
  /// Return to top
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 100) {
      $('#return-to-top').fadeIn(200);
      return;
    }
    $('#return-to-top').fadeOut(200);
  });
  $('#return-to-top').click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
  });
});
