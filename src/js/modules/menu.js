const menu = () => {
    const menuLinks = document.querySelectorAll("[data-goto]");
    const menuTrigger = document.querySelector(".menu__icon");
    const menuBlock = document.querySelector(".menu");

    menuTrigger.addEventListener("click", (e) => {
        menuBlock.classList.toggle("_active");
        menuTrigger.classList.toggle("_active");
        document.body.classList.toggle("_lock");

    })


    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener("click", onMenuLinkClick);
        })

        function onMenuLinkClick(e) {
            const menuLink = e.target;

            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBLock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBLock.getBoundingClientRect().top + pageYOffset;

                if (menuTrigger.classList.contains("_active")) {
                    document.body.classList.remove("_lock");
                    menuTrigger.classList.remove("_active");
                    menuBlock.classList.toggle("_active");
                }

                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                })
                e.preventDefault();
            }
        }
    }
}

export default menu;