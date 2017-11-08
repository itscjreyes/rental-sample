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

$(document).ready(function () {
	photoFeed.init();
});
