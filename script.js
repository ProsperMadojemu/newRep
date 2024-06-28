document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.landing-page-navbar');
    const loginbutton = document.querySelector('.btn-71');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('navbar-bg-change');
            loginbutton.classList.add('btn-71-bg-change');
        } else {
            navbar.classList.remove('navbar-bg-change');
            loginbutton.classList.remove('btn-71-bg-change');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Handling the image block click event
    const imageBlocks = document.querySelectorAll('.image-block');
    imageBlocks.forEach(imageBlock => {
        imageBlock.addEventListener('click', () => {
            // Remove the expanded class from all image blocks
            imageBlocks.forEach(block => block.classList.remove('expanded', 'no-hover'));
            // Add the expanded and no-hover classes to the clicked image block
            imageBlock.classList.add('expanded', 'no-hover');
        });
    });

    const carousel = document.querySelector('.promo-carousel');
    const firstImg = carousel.querySelectorAll('img')[0];
    const arrowIcons = document.querySelectorAll('.promo-container i');
    const promoSlider = document.querySelector('.landing-page-promo-slider');

    let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
    const scrollWidth = carousel.scrollWidth - carousel.clientWidth;

    const showHideIcons = () => {
        arrowIcons[0].style.display = carousel.scrollLeft === 0 ? 'none' : 'block';
        arrowIcons[1].style.display = carousel.scrollLeft === scrollWidth ? 'none' : 'block';
    };

    const setBackground = (imageSrc) => {
        promoSlider.style.backgroundImage = `url(${imageSrc})`;
    };

    const moveToNextImage = () => {
        const firstImgWidth = firstImg.clientWidth + 14;
        if (carousel.scrollLeft >= scrollWidth) {
            carousel.scrollLeft = 0;
        } else {
            carousel.scrollLeft += firstImgWidth;
        }
        const currentImg = carousel.querySelectorAll('img')[Math.round(carousel.scrollLeft / firstImgWidth)];
        setBackground(currentImg.src);
        showHideIcons();
    };

    arrowIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const firstImgWidth = firstImg.clientWidth + 14;
            carousel.scrollLeft += icon.id === 'left-icon' ? -firstImgWidth : firstImgWidth;
            const currentImg = carousel.querySelectorAll('img')[Math.round(carousel.scrollLeft / firstImgWidth)];
            setBackground(currentImg.src);
            setTimeout(showHideIcons, 60);
        });
    });

    const autoSlide = () => {
        moveToNextImage();
    };

    const dragStart = (e) => {
        isDragStart = true;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        // if (!isDragStart) return;
        // e.preventDefault();
        // isDragging = true;
        // carousel.classList.add('dragging');
        // positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        // carousel.scrollLeft = prevScrollLeft - positionDiff;
        // showHideIcons();
    };

    const dragStop = () => {
        isDragStart = false;
        carousel.classList.remove('dragging');
        if (!isDragging) return;
        isDragging = false;
        const currentImg = carousel.querySelectorAll('img')[Math.round(carousel.scrollLeft / (firstImg.clientWidth + 14))];
        setBackground(currentImg.src);
    };

    // Centering the image on click and updating the background
    const centerAndUpdateBackground = (targetImg) => {
        const carouselRect = carousel.getBoundingClientRect();
        const imgRect = targetImg.getBoundingClientRect();
        const offset = imgRect.left - carouselRect.left - (carouselRect.width / 2) + (imgRect.width / 2);
        carousel.scrollLeft += offset;
        showHideIcons();
        setBackground(targetImg.src);
    };

    // carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('touchstart', dragStart);
    // // carousel.addEventListener('mousemove', dragging);
    // carousel.addEventListener('touchmove', dragging);
    // carousel.addEventListener('mouseup', dragStop);
    carousel.addEventListener('mouseleave', dragStop);
    carousel.addEventListener('touchend', dragStop);

    showHideIcons();

    carousel.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', () => {
            centerAndUpdateBackground(img);
        });
    });

    setBackground(firstImg.src);

    const autoMoveCarousel = () => {
        moveToNextImage();
    };

    const autoSlideInterval = setInterval(autoMoveCarousel, 10000);

    arrowIcons.forEach(icon => {
        icon.addEventListener('mouseover', function () {
            this.style.animationDuration = '5s';
        });

        icon.addEventListener('mouseout', function () {
            this.style.animationDuration = '';
        });
    });

    document.getElementById('Login-Button').addEventListener('click', function () {
        window.location.href = '../pages/login.html'; // Specify the login URL
    });
});
