document.addEventListener('DOMContentLoaded', function() {

    let images = [
        './images/camera/slider/1.jpg',
        './images/camera/slider/2.jpg',
        './images/camera/slider/3.jpg',
        './images/camera/slider/4.jpg',
        './images/camera/slider/5.jpg',
        './images/camera/slider/6.jpg'
    ];

    let iLast = images.length;
    let dir = '';
    let fisrtLoad = 'true';
    let dotsCount = iLast;
    let NextImage = images[0];

    let state = localStorage.getItem('state');
        if (state === undefined) {
            state = 'true';
        }

    let i = localStorage.getItem('slideToRemember');
        if (i === undefined) {
            i = iLast-1;
        }

    // Create dots
    let dotsContainer = document.querySelector('.slider__dots');
    for (let k = dotsCount-1; k >= 0; k--) {
        let dotsElem = `<div class="dot" data-attr="${k}" ></div>`;
        dotsContainer.insertAdjacentHTML("afterBegin", dotsElem);
    }

    // Arrows
    let sliderImg = document.querySelector('.slider__img');
    let leftBtn = document.getElementById('leftbtn');
    let rightBtn = document.getElementById('rightbtn');

    // Dots
    let dots = document.querySelectorAll('.dot');

    // AutoScroll
    let scrollButton = document.querySelector('.autoshow__btn__mode');
    let scrollIcon = document.getElementById('sliderIcon');

    // Bar
    let sliderBar = document.getElementById('sliderBar');
    let width = 0;

    // ArrowsClick
    // ======================

    if ( fisrtLoad ) {
        scrollIcon.classList.remove('fa-pause');
        scrollIcon.classList.remove('fa-play');

        if (state == 'true') {
            scrollIcon.classList.add('fa-pause');
            sliderBar.classList.remove('hide');
            Loading();
        } else {
            scrollIcon.classList.add('fa-play');
            sliderBar.classList.add('hide');

            i++;

            sliderImg.setAttribute('src', images[i]);

            leftBtn.classList.remove('hide');
            rightBtn.classList.remove('hide');

            dots.forEach(findDot);
            function findDot(dot) {
                let currDot = dot;
                let currDotNum = dot.getAttribute("data-attr");

                if (currDotNum == i) {
                    currDot.classList.add("active");
                }
            }
        }
        firstLoad = 'false';
    }

    function switchDot(i) {
        dots.forEach(findDot);
        function findDot(dot) {
            let currDot = dot;
            let currDotNum = dot.getAttribute("data-attr");

            if ( currDotNum == i ) {
                dots.forEach(removeDotsClass)
                function removeDotsClass(dot) {
                    dot.classList.remove("active");
                };

                currDot.classList.add("active");
            }
        }
    }

    // ChangeImage
    // ======================

    function ChangeImg(dir) {
        if ( dir == 'next' ) {
            // Get next image
            i++;
            if(i == iLast){
                i = 0;
            }
            NextImage = images[i];

            // Switch dot
            switchDot(i);

        } else if ( dir == 'prev' ) {
            i--;
            if (i < 0) {
                i = iLast - 1;
            }
            NextImage = images[i];
            switchDot(i);
        }

        // Switch image
        sliderImg.setAttribute('src', NextImage);
        localStorage.setItem('slideToRemember', i-1);
        sliderBar.style.width = '0';
        width = 0;


        if (state == 'true') {
            PreLoading();
        }
    }

    leftBtn.addEventListener('click', function(){
       ChangeImg('prev');
    });

    rightBtn.addEventListener('click', function(){
       ChangeImg('next');
    });


    // DotsClick
    // ======================

    dots.forEach(onDotsClick);
    function onDotsClick(dot) {
        dot.addEventListener("click", function(){

            dots.forEach(removeDotsClass)
            function removeDotsClass(dot) {
                dot.classList.remove('active');
            };

            let currDot = dot;
            currDot.classList.add('active');

            let currDotNum = currDot.getAttribute('data-attr');
            i = currDotNum;
            sliderImg.setAttribute('src', images[i]);
            localStorage.setItem('slideToRemember', i-1);
        });
    }

    // AutoscrollClick
    // ======================

    function scrollButtonClick() {
        scrollIcon.classList.remove('fa-pause');
        scrollIcon.classList.remove('fa-play');

        if (state == 'true') {
            scrollIcon.classList.add('fa-play');
            state = 'false';
            localStorage.setItem('state', state);

            sliderBar.classList.add('hide');
            leftBtn.classList.remove('hide');
            rightBtn.classList.remove('hide');

        } else {
            scrollIcon.classList.add('fa-pause');
            state = 'true';
            localStorage.setItem('state', state);

            sliderBar.classList.remove('hide');
            leftBtn.classList.add('hide');
            rightBtn.classList.add('hide');
        }
    }

    scrollButton.addEventListener("click", scrollButtonClick);
    scrollButton.addEventListener('click', PreLoading);

    /*function throttle(f, t) {
        return function (args) {
        let previousCall = this.lastCall;
        this.lastCall = Date.now();
        if (previousCall === undefined || (this.lastCall - previousCall) > t) {
            f(args);
            }
        }
    }*/

    function PreLoading() {

        let barId = setInterval(Move, 30);
        function Move(){
            width++;
            sliderBar.style.width = width + '%';
            if (state == 'true') {
                if (width >= 100){

                    width = 0;

                    clearInterval(barId);

                    let timerId = setTimeout(Loading, 500);
                };
            } else {
                clearInterval(barId);
                width = 0;
                sliderBar.style.width = '0';
            }
        }
    }

    function Loading() {
        if (state == 'true') {
            ChangeImg('next');
        }

//        console.log(state);
//        console.log(i);
    }

    // Keyboard
    // ======================

    document.addEventListener('keydown', function(event) {
        if (state == 'false') {
            if (event.code == 'ArrowLeft') {
                ChangeImg('prev');
                console.log('left');
            }
            if (event.code == 'ArrowRight') {
                ChangeImg('next');
                console.log('right');
            }
        }
    });

}, false);
