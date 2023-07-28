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



