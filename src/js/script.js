const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    speed: 1000,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});

const accTriggers = document.querySelectorAll(".faq__item-title");

makeAccordion(accTriggers);
changeAccordionItemState(accTriggers[0])

function makeAccordion(accTriggers) {
    accTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.target.classList.toggle("active");
            changeAccordionItemState(e.target);
        })
    })
}

function changeAccordionItemState(trigger) {
    if (trigger.classList.contains("active")) {
        trigger.nextElementSibling.style.maxHeight = trigger.nextElementSibling.scrollHeight + "px";
    } else {
        trigger.nextElementSibling.style.maxHeight = 0;
    }
}