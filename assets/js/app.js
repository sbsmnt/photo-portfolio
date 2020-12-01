// Image Slider
const AllImages = {
	recent: [
		{ name: 'recent1', url: 'https://picsum.photos/seed/recent1/900/600' },
		{ name: 'recent2', url: 'https://picsum.photos/seed/recent2/900/600' },
		{ name: 'recent3', url: 'https://picsum.photos/seed/recent3/900/600' },
		{ name: 'recent4', url: 'https://picsum.photos/seed/recent4/900/600' },
		{ name: 'recent5', url: 'https://picsum.photos/seed/recent5/900/600' },
	],
	street: [
		{ name: 'street1', url: 'https://picsum.photos/seed/street1/900/600' },
		{ name: 'street2', url: 'https://picsum.photos/seed/street2/900/600' },
		{ name: 'street3', url: 'https://picsum.photos/seed/street3/900/600' },
		{ name: 'street4', url: 'https://picsum.photos/seed/street4/900/600' },
		{ name: 'street5', url: 'https://picsum.photos/seed/street5/900/600' },
	],
	urban: [
		{ name: 'urban1', url: 'https://picsum.photos/seed/urban1/900/600' },
		{ name: 'urban2', url: 'https://picsum.photos/seed/urban2/900/600' },
		{ name: 'urban3', url: 'https://picsum.photos/seed/urban3/900/600' },
		{ name: 'urban4', url: 'https://picsum.photos/seed/urban4/900/600' },
		{ name: 'urban5', url: 'https://picsum.photos/seed/urban5/900/600' },
	],
	landscape: [
		{
			name: 'landscape1',
			url: 'https://picsum.photos/seed/landscape1/900/600',
		},
		{
			name: 'landscape2',
			url: 'https://picsum.photos/seed/landscape2/900/600',
		},
		{
			name: 'landscape3',
			url: 'https://picsum.photos/seed/landscape3/900/600',
		},
		{
			name: 'landscape4',
			url: 'https://picsum.photos/seed/landscape4/900/600',
		},
		{
			name: 'landscape5',
			url: 'https://picsum.photos/seed/landscape5/900/600',
		},
	],
};

const prevButton = gallery.querySelector('.g-prev');
const nextButton = gallery.querySelector('.g-next');

const ImageSlider = () => {
	const gallery = document.getElementById('gallery');
	const homeGallery = document.querySelector('.home-gallery')

	const nextClickHandler = () => {
		const galleryImages =
			gallery.querySelectorAll('.gallery-image') &&
			Array.from(gallery.querySelectorAll('.gallery-image'));

		const currentImage = gallery.querySelector('.gallery-image.active');
		const currentImageIndx = galleryImages.indexOf(currentImage);

		if (galleryImages[currentImageIndx + 1]) {
			galleryImages[currentImageIndx + 1].classList.add('active');
			currentImage.classList.remove('active');

			prevButton.classList.contains('inactive') &&
				prevButton.classList.remove('inactive');

			currentImageIndx + 1 === galleryImages.length - 1 &&
				nextButton.classList.add('inactive');
		} else {
			nextButton.classList.add('inactive');
		}
	};

	const prevClickHandler = () => {
		const galleryImages =
			gallery.querySelectorAll('.gallery-image') &&
			Array.from(gallery.querySelectorAll('.gallery-image'));

		const currentImage = gallery.querySelector('.gallery-image.active');
		const currentImageIndx = galleryImages.indexOf(currentImage);

		if (galleryImages[currentImageIndx - 1]) {
			galleryImages[currentImageIndx - 1].classList.add('active');
			currentImage.classList.remove('active');

			nextButton.classList.contains('inactive') &&
				nextButton.classList.remove('inactive');

			currentImageIndx - 1 === 0 && prevButton.classList.add('inactive');
		} else {
			prevButton.classList.add('inactive');
		}
	};

	prevButton.addEventListener('click', prevClickHandler);
	nextButton.addEventListener('click', nextClickHandler);

	
	// Swipe events
	const swipeImages = () => {
		let xDown = 0;
		let xMove = 0;

		const handleGalleryTouchStart = (e) => {
			xDown = e.touches[0].clientX;
		};
		
		const handleGalleryTouchMove = (e) => {
			xMove = e.touches[0].clientX;
		};
		
		const handleGalleryTouchEnd = (e) => {
			if (xMove && xDown > xMove) nextClickHandler();
			if (xMove && xDown < xMove) prevClickHandler();
			
			xDown = 0;
			xMove = 0;
		};

		homeGallery.addEventListener('touchstart', handleGalleryTouchStart);
		homeGallery.addEventListener('touchmove', handleGalleryTouchMove);
		homeGallery.addEventListener('touchend', handleGalleryTouchEnd);
	}
	
	swipeImages();
};

const slideImages = (images) => {
	const galleryElement = document.querySelector('.home-gallery');
	const galleryWrapper = document.querySelector('.gwrapper');
	galleryWrapper.classList.contains('changing-gallery') &&
		galleryWrapper.classList.remove('changing-gallery');

	// console.log()

	galleryWrapper.classList.add('changing-gallery');
	const galleryTransition = document.querySelector('.changing-gallery');

	galleryElement.innerHTML = '';
	images.forEach((image, indx) => {
		const active = indx === 0 ? 'active' : '';
		galleryElement.innerHTML += `<div class="gallery-image ${active}">
      <img src="${image.url}" alt="${image.name}" />
    </div>`;
	});

	nextButton.classList.remove('inactive');
	prevButton.classList.add('inactive');

	galleryTransition.addEventListener('animationend', () => {
		galleryWrapper.classList.remove('changing-gallery');
	});
};

const mainMenuHandler = () => {
	const mainMenu = document.querySelector('#main-menu');
	const menuLinks = mainMenu.querySelectorAll('li')
		? Array.from(mainMenu.querySelectorAll('li'))
		: [];

	menuLinks.map((link) => {
		link.addEventListener('click', (e) => {
			const goToGallery = e.target.getAttribute('data-menu');
			AllImages[goToGallery] && slideImages(AllImages[goToGallery]);
		});
	});
};

const mobileMenuHandler = () => {
	const mobileMenuBtn = document.querySelector('#sm-menu');
	const mainMenu = document.querySelector('#main-menu');

	mobileMenuBtn.addEventListener('click', () => {
		// open menu
		if (mainMenu.classList.contains('open')) {
			mainMenu.classList.add('closing');
			const closignAmin = document.querySelector('.closing');

			closignAmin.addEventListener('animationend', (a) => {
				if (a.animationName === 'close-menu') {
					mainMenu.classList.remove('closing');
					mainMenu.classList.remove('open');
				}
			});
			return null;
		}
		mainMenu.classList.add('open');
	});
};

const setUp = () => {
	mainMenuHandler();
	mobileMenuHandler();
	slideImages(AllImages.recent);
	ImageSlider();
};

setUp();
