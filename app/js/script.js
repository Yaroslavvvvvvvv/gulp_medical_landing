//Навігація по сайту
$(document).ready(function () {

    const hash = window.location.hash
    const header = $('header')
    const headerHeight = header.outerHeight()

    scrollToElement(hash)

    function scrollToElement(selectorToScrollElement, callback = null) {
        const body = $("html, body")

        if (!selectorToScrollElement) return

        const scrollTo = ($(selectorToScrollElement).offset().top) - headerHeight

        $('header nav .nav-item.active').removeClass('active')


        body.stop().animate({scrollTop: scrollTo}, 500, 'swing', () => {
            $(`a.nav-link[href="${selectorToScrollElement}"]`).parent().addClass('active')
            if (callback) callback()
        })
    }


    $('header nav .nav-item .nav-link').click(function () {
        scrollToElement($(this).attr('href'))
    })

    $('a.navbar-brand').click(function () {
        scrollToElement($(this).attr('href'), () => {
            window.location.hash = ''
        })
    })

    $(window).scroll(function () {
        const scrollTo = $(window).scrollTop()

        if (scrollTo >= headerHeight) header.addClass('shadow-sm')
        else header.removeClass('shadow-sm')
    });


})

// Слайдер в fifth_section
$(document).ready(function () {
    const $slides = $(".slide");
    let currentIndex = 0;

    function showSlide(index) {
        $slides.hide().eq(index).show();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + $slides.length) % $slides.length;
        showSlide(currentIndex);
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % $slides.length;
        showSlide(currentIndex);
    }

    $(".prev").on("click", prevSlide);
    $(".next").on("click", nextSlide);
});


//Make appointment
document.getElementById('goToTeam').addEventListener('click', function () {
    let teamElement = document.getElementById('team');
    teamElement.scrollIntoView({behavior: 'smooth'});
});

// блоки з другої секції
$(document).ready(function () {
    $(".learn_more").hover(
        function () {
            $(".highlighted-element").addClass("highlight");
        },
        function () {
            $(".highlighted-element").removeClass("highlight");
        },
    );
});


$(document).ready(function () {
    $(".more_learn").hover(
        function () {
            $(".registration-element").addClass("registration");
        },
        function () {
            $(".registration-element").removeClass("registration");
        },
    );
});

$(document).ready(function () {
    $(".third-learn").hover(
        function () {
            $(".consultation-element").addClass("consultation");
        },
        function () {
            $(".consultation-element").removeClass("consultation");
        },
    );
});
$(document).ready(function () {
    $(".last-learn").hover(
        function () {
            $(".treatment-element").addClass("treatment");
        },
        function () {
            $(".treatment-element").removeClass("treatment");
        },
    );
});














