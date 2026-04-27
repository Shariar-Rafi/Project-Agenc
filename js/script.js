$('.main_banner_slider').slick({
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    fade: true,
});

$('.main_slider').slick({
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow:`<i class="fa-solid fa-angle-left left"></i>`,
    nextArrow:`<i class="fa-solid fa-angle-right right"></i>`,
    centerMode: true,
    centerPadding: '0',
    responsive: [
        {
          breakpoint:  1300.00,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            centerMode: false,
          }
        },
        {
          breakpoint:  991.98,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            centerMode: false,
          }
        },
        {
          breakpoint: 767.98,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false,
          }
        },
        {
          breakpoint: 575.98,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false,
          }
        }
      ]
    
});

$(window).scroll(function () {
    var scrolling = $(this).scrollTop();

    if (scrolling > 100) {
        $('.navbar').addClass('sticky_nav');
    } else {
        $('.navbar').removeClass('sticky_nav');
    }
});

// Counter Animation Logic
const counterElements = document.querySelectorAll('.counter');

const startCounterAnimation = () => {
    counterElements.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 1500; // Animation duration in ms
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentCount = progress * target;

            if (target % 1 !== 0) {
                counter.innerText = currentCount.toFixed(1) + suffix;
            } else {
                counter.innerText = Math.floor(currentCount) + suffix;
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                counter.innerText = target + suffix;
            }
        };

        window.requestAnimationFrame(step);
    });
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounterAnimation();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const successPart = document.querySelector('#success_part');
if (successPart) {
    observer.observe(successPart);
}

// Scroll Reveal Logic
const revealElements = document.querySelectorAll('.reveal, .stagger-reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Once revealed, no need to observe anymore
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px" // Trigger slightly before it enters the viewport
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

