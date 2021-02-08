var HC_SETTINGS = {
  activeClass: 'is-active',
  topbarHiddenClass: 'topbar--hidden',
  topbarFixedClass: 'topbar--fixed'
};

$(function() {
  var $window = $(window);
  var $topbar = $('[data-topbar]');
  var topbarHeight = parseInt($topbar.height());

  var bindEffects = function() {
    var scrolled = $window.scrollTop();
    if (scrolled > topbarHeight && scrolled < (topbarHeight * 2)) {
      $topbar.addClass(HC_SETTINGS.topbarHiddenClass);
    } else {
      $topbar
        .removeClass(HC_SETTINGS.topbarHiddenClass)
        .removeClass(HC_SETTINGS.topbarFixedClass);
    }

    if (scrolled > (topbarHeight * 2)) {
      $topbar
        .removeClass(HC_SETTINGS.topbarHiddenClass)
        .addClass(HC_SETTINGS.topbarFixedClass);
    }
  };

  $window.on('scroll.theme', bindEffects);
  
  // Redirect
  redirectDeletedPages();

  var $categoryPage = $('[data-category-page]');

  var categoryNav = {
    $el: $('[data-section-list]'),
    init: function() {
      var categoryPadding = parseInt($categoryPage.css('padding-top'));
      new Waypoint.Sticky({
        element: this.$el[0],
        stuckClass: 'section-list--fixed',
        offset: $topbar.outerHeight() + categoryPadding,
        handler: function () {
          this.$element.css('top', $topbar.outerHeight() + categoryPadding);
        }
      });

      $('.section__title').waypoint({
        offset: $topbar.outerHeight() + categoryPadding
      });

      this.$el.find('li:first').children('a').addClass(HC_SETTINGS.activeClass);
    }
  };

  if ($categoryPage.length > 0) {
    categoryNav.init();
  }

  if ($('[data-hero-unit="large"]').length === 0) {
    $('[data-menu]').children('[data-toggle-search]').removeClass('hidden');
  }

  var $searchBarMobile = $('[data-search-mobile]');
  var $closeButton = $('<button />', {
    'class': 'btn btn--default btn--search-topbar-close',
    'data-toggle-search': 'true',
    html: $('<span />', {'class': 'fa fa-close'})
  });

  $searchBarMobile.find('.search-box').append($closeButton);

  $(document).on('click', '[data-toggle-menu]', function() {
    $(this).toggleClass('tcon-transform');
    $('[data-menu]').toggle();
    $topbar.toggleClass('topbar--opened');
  });

  $(document).on('click', '[data-toggle-search]', function() {
    $searchBarMobile.toggleClass('search-box--mobile-active');
  });

  $(document).on('click', '[data-section-list-link]', function(e) {
    e.preventDefault();
    var sectionId = $(this).attr('href');
    var sectionTop = $(sectionId).offset().top;
    $('html, body').animate({ scrollTop: sectionTop - $topbar.outerHeight() + $categoryPage.css('padding-top') }, 500);
  });

  $(document).on('click', '[data-section-list-link]', function(e) {
    e.preventDefault();
    $('[data-section-list-link]').removeClass(HC_SETTINGS.activeClass);
    $(this).addClass(HC_SETTINGS.activeClass);
  });

  // Social share popups
  $('.share a').click(function(e) {
    e.preventDefault();
    window.open(this.href, '', 'height = 500, width = 500');
  });

  // Toggle the share dropdown in communities
  $('.share-label').on('click', function(e) {
    e.stopPropagation();
    var isSelected = this.getAttribute('aria-selected') == 'true';
    this.setAttribute('aria-selected', !isSelected);
    $('.share-label').not(this).attr('aria-selected', 'false');
  });

  $(document).on('click', function() {
    $('.share-label').attr('aria-selected', 'false');
  });

  // Submit search on select change
  $('#request-status-select, #request-organization-select')
    .on('change', function() {
      search();
    });

  // Submit search on input enter
  $('#quick-search').on('keypress', function(e) {
    if (e.which === 13) {
      search();
    }
  });

  function search() {
    window.location.search = $.param({
      query: $('#quick-search').val(),
      status: $('#request-status-select').val(),
      organization_id: $('#request-organization-select').val()
    });
  }
  
  // Deleted/Legacy Articles Redirection
  function redirectDeletedPages() {
    var urlDomain = 'help.woorank.com'
    var oldIDs = [
      "115004394765",
      "205342942",
      "205416651",
      "205342972",
      "205761232",
      "202809451",
      "208781989",
      "213930629",
      "202809461",
      "115001410945",
      "205416641",
      "205761392",
      "207766289",
      "205342902",
      "115003969529",
      "202809381",
      "205761342",
      "202571412",
      "115001329445",
      "202643061",
      "205761202",
      "205903741",
      "115000620805",
      "202571422",
      "202571862",
      "208004689",
      "202701911",
      "202701761",
      "202735862",
      "202809391",
      "115002266629",
      "202700621",
      "205761362",
      "115000911969",
      "115000921905",
      "115000921985",
      "115000922085",
      "115000922125",
      "115000922185",
      "115000922205",
      "115000922245",
      "115000912209",
      "115000922285",
      "115000922305",
      "115000922365",
      "115000944985",
      "115000945025",
      "115000923205",
      "115000923245",
      "115000923285",
      "202645121",
      "202809511",
      "205416671",
      "205416681",
      "115000298085",
      "202809491",
      "214234765",
      "206139331",
      "115000296389",
      "115002814985",
      "205761322",
      "212011189",
      "115000023849",
      "202645081",
      "202645341",
      "115005554089",
      "213037109",
      "202735872",
      "212484169",
      "202568932",
      "209138365"
    ];
    var newIDs = [
      "360000108009",
			"360000136585",
			"360000147389",
			"360000147389",
			"360000136325",
			"360000111305",
			"360000111265",
			"360000120589",
			"360000120669",
			"360000136065",
			"360000140325",
			"360000136425",
			"360000262349",
			"360000108469",
			"360000136505",
			"360000147209",
			"360000136045",
			"360000136145",
			"360000110209",
			"360000110209",
			"360000098765",
			"360000108209",
			"360000098085",
			"360000111325",
			"360000111325",
			"360000111325",
			"360000111325",
			"360000111325",
			"360000111325",
			"360000236369",
			"360000108929",
			"360000108929",
			"360000140185",
			"360000140185",
			"360000140185",
			"360000140185",
			"360000140185",
			"360000140185",
			"360000140185",
			"360000140185",
			"360000140185",
			"360000140185",
			"360000140185",
			"360000140185",
			"360000140185",
			"360000140185",
			"360000140185",
			"360000140185",
			"360000140185",
			"360000140185",
			"360000111365",
			"360000147349",
			"360000147349",
			"360000147229",
			"360000140405",
			"360000136385",
			"360000136385",
			"360000136385",
			"360000140445",
			"360000147249",
			"360000147269",
			"360000147309",
			"360000147189",
			"360000147089",
			"360000147089",
			"360000147089",
			"360000120709",
			"360000120709",
			"360000152209",
			"360000152209"
    ];
    
    for (var i = 0; i < oldIDs.length; i++) {
      if (window.location.href.indexOf(oldIDs[i]) > -1) {
        window.location.href = 'https://help.woorank.com/hc/en-us/articles/' + newIDs[i]; 
      }
    }
  }
});
