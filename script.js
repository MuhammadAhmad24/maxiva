gsap.registerPlugin(ScrollTrigger);

let introTl;
let cardsTl;

function initDesktopAnimations() {
    // pehle purani animations clean karo
    if (introTl) introTl.kill();
    if (cardsTl) cardsTl.kill();

    ScrollTrigger.getAll().forEach((st) => st.kill());

    // desktop initial states
    gsap.set(".intro-line", {
        y: 120,
        opacity: 0
    });

    gsap.set(".intro-divider", {
        scaleX: 0
    });

    const cardSettings = [
        { selector: ".card-1", startY: 340, exitY: -520 },
        { selector: ".card-2", startY: 390, exitY: -520 },
        { selector: ".card-3", startY: 440, exitY: -520 },
        { selector: ".card-4", startY: 490, exitY: -520 }
    ];

    cardSettings.forEach((card) => {
        gsap.set(card.selector, {
            y: card.startY,
            opacity: 0
        });
    });

    /* =========================
       INTRO ANIMATION
    ========================= */
    introTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".services-intro",
            start: "top 55%",
            end: "top 5%",
            scrub: 1
            // markers: true
        }
    });

    introTl
        .to(".intro-line-1", {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            duration: 1
        })
        .to(".intro-line-2", {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            duration: 1
        }, "-=0.7")
        .to(".intro-divider", {
            scaleX: 1,
            ease: "power2.out",
            duration: 0.8
        }, "-=0.45");

    /* =========================
       CARDS SHARED FLOW
    ========================= */
    cardsTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".cards-pin-section",
            start: "top top",
            end: "+=4200",
            scrub: 1.15,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
            // markers: true
        }
    });

    cardSettings.forEach((card, index) => {
        const enterStart = index * 0.38;

        cardsTl
            .to(card.selector, {
                y: 0,
                opacity: 1,
                duration: 1.15,
                ease: "power3.out"
            }, enterStart)
            .to(card.selector, {
                y: 30,
                duration: 0.42,
                ease: "power1.inOut"
            }, enterStart + 1.15)
            .to(card.selector, {
                y: card.exitY,
                opacity: 0,
                duration: 2.2,
                ease: "none"
            }, enterStart + 1.57);
    });

    ScrollTrigger.refresh();
}

function initMobileStatic() {
    // sari existing timelines / scrolltriggers kill karo
    if (introTl) introTl.kill();
    if (cardsTl) cardsTl.kill();

    ScrollTrigger.getAll().forEach((st) => st.kill());

    // inline transforms reset karo
    gsap.set(".intro-line", {
        clearProps: "all"
    });

    gsap.set(".intro-divider", {
        clearProps: "all"
    });

    gsap.set(".card-services", {
        clearProps: "all"
    });
}

function handleResponsiveAnimation() {
    if (window.innerWidth >= 1025) {
        initDesktopAnimations();
    } else {
        initMobileStatic();
    }
}

window.addEventListener("load", handleResponsiveAnimation);
window.addEventListener("resize", handleResponsiveAnimation);