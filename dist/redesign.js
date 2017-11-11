'use strict';

var photoFeed = {};

photoFeed.getPhotos = function () {
	var instaURL = 'https://api.instagram.com/v1/users/self/media/recent/';
	var token = "3103774455.690e2ed.6d99262d475a428b9e23df1ff9e52c49";
	$.ajax({
		url: instaURL,
		method: 'GET',
		dataType: 'jsonp',
		data: {
			access_token: token
		},
		success: function success(res) {
			photoFeed.displayPhotos(res);
		}
	});
};

photoFeed.displayPhotos = function (res) {
	for (var i = 9; i--;) {
		var post = res.data[i];
		var photo = post.images.standard_resolution.url;
		var url = post.link;
		//throws everything into a div with a class of instaPhotos
		$('.mediaGrid').prepend('<a href="' + url + '" class="instaImage" style="background-image: url(' + photo + ')" target="_blank"></a>');
	};
};

photoFeed.init = function () {
	photoFeed.getPhotos();
};

var reApp = {};

reApp.init = function () {
	reApp.navigation();
};

reApp.navigation = function () {
	$('.hamburger').click(function () {
		$('.hamburger').toggleClass('showMenu');
		$('header nav').toggleClass('showMenu');
	});

	$('.itemHasChildren a').click(function (e) {
		e.preventDefault();

		$(this).next('.subMenu').addClass('showSubMenu');
	});

	$('.backSubMenu a').click(function (e) {
		e.preventDefault();

		$('.subMenu').removeClass('showSubMenu');
	});
};

$(document).ready(function () {
	photoFeed.init();
	reApp.init();
});