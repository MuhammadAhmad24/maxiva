gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

lenis.on('scroll', (e) => {
    ScrollTrigger.update();
}
);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
}
);

gsap.ticker.lagSmoothing(0);


document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    lenis.on('scroll', function () {
        if (lenis.animatedScroll > 80) {
            gsap.to('.brand', {
                opacity: 0,
                duration: 0.4,
                onComplete: function () {
                    document.querySelector('.brand').style.visibility = 'hidden';
                }
            });
        } else {
            gsap.to('.brand', {
                opacity: 1,
                duration: 0.4,
                onStart: function () {
                    document.querySelector('.brand').style.visibility = 'visible';
                }
            });
        }
    });

    const yearEl = document.querySelector(".copyright-year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const columns = document.querySelectorAll(".sitemap-column");

    let naturalHeights = [];

    function setNaturalHeights() {
        naturalHeights = [];
        columns.forEach(function (column) {
            const wrapper = column.querySelector(".sitemap-link-wrapper");
            if (wrapper) {
                naturalHeights.push(wrapper.scrollHeight);
            } else {
                naturalHeights.push(0);
            }
        });
    }

    setNaturalHeights();

    function initMobile() {
        columns.forEach(function (column) {
            const wrapper = column.querySelector(".sitemap-link-wrapper");
            if (wrapper) {
                wrapper.style.overflow = "hidden";
                wrapper.style.height = "0px";
                wrapper.style.paddingTop = "0";
                wrapper.style.paddingBottom = "0";
                wrapper.style.transition = "height 0.35s ease, padding 0.35s ease";
            }
            const svg = column.querySelector(".is-footer-accordian");
            if (svg) {
                const secondLine = svg.querySelectorAll("line")[1];
                if (secondLine) {
                    secondLine.style.transition = "opacity 0.35s ease";
                    secondLine.style.opacity = "1";
                }
            }
            column.classList.remove("is-open");
        });
    }

    function destroyMobile() {
        columns.forEach(function (column) {
            const wrapper = column.querySelector(".sitemap-link-wrapper");
            if (wrapper) {
                wrapper.style.overflow = "";
                wrapper.style.height = "";
                wrapper.style.paddingTop = "";
                wrapper.style.paddingBottom = "";
                wrapper.style.transition = "";
            }
            const svg = column.querySelector(".is-footer-accordian");
            if (svg) {
                const secondLine = svg.querySelectorAll("line")[1];
                if (secondLine) {
                    secondLine.style.opacity = "";
                    secondLine.style.transition = "";
                }
            }
            column.classList.remove("is-open");
        });
    }

    function handleToggle(index) {
        if (window.innerWidth > 991)
            return;

        const column = columns[index];
        const wrapper = column.querySelector(".sitemap-link-wrapper");
        const svg = column.querySelector(".is-footer-accordian");
        const secondLine = svg ? svg.querySelectorAll("line")[1] : null;
        const isOpen = column.classList.contains("is-open");

        columns.forEach(function (col, i) {
            const w = col.querySelector(".sitemap-link-wrapper");
            const s = col.querySelector(".is-footer-accordian");
            const sl = s ? s.querySelectorAll("line")[1] : null;
            if (col.classList.contains("is-open")) {
                col.classList.remove("is-open");
                if (w) {
                    w.style.height = "0px";
                    w.style.paddingTop = "0";
                    w.style.paddingBottom = "0";
                }
                if (sl)
                    sl.style.opacity = "1";
            }
        });

        if (!isOpen) {
            column.classList.add("is-open");
            if (wrapper) {
                wrapper.style.height = naturalHeights[index] + "px";
                wrapper.style.paddingTop = "1rem";
                wrapper.style.paddingBottom = "1rem";
            }
            if (secondLine)
                secondLine.style.opacity = "0";
        }
    }

    columns.forEach(function (column, index) {
        column.addEventListener("click", function () {
            handleToggle(index);
        });
    });

    function handleResponsive() {
        setNaturalHeights();

        if (window.innerWidth <= 991) {
            initMobile();
        } else {
            destroyMobile();
        }
    }

    handleResponsive();
    window.addEventListener("resize", handleResponsive);







    document.fonts.ready.then(() => {
        gsap.registerPlugin(ScrollToPlugin);

        if (window.scrollY > 80) {
            gsap.to('.header-button, .dropdown-toggle', {
                backgroundColor: "#EDECE6",
                color: "#3c2bff",
                borderColor: "#3c2bff",
                duration: 0.4
            });
        } else {
            gsap.to('.header-button, .dropdown-toggle', {
                backgroundColor: "#3c2bff",
                color: "#EDECE6",
                borderColor: "#EDECE6",
                duration: 0.4
            });
        }

        window.addEventListener('scroll', function () {
            if (window.scrollY > 80) {
                gsap.to('.header-button, .dropdown-toggle', {
                    backgroundColor: "#EDECE6",
                    color: "#3c2bff",
                    borderColor: "#3c2bff",
                    duration: 0.4
                });
            } else {
                gsap.to('.header-button, .dropdown-toggle', {
                    backgroundColor: "#3c2bff",
                    color: "#EDECE6",
                    borderColor: "#EDECE6",
                    duration: 0.4
                });
            }
        });

        const myText = new SplitType('.hero-heading');
        const myPara = new SplitType('.hero-paragraph');

        var heroTl = gsap.timeline({
            delay: 1.6
        });

        heroTl.fromTo(".hero-heading .char", {
            y: 196,
        },
            {
                y: 0,
                ease: "power1.out",
                stagger: 0.1,
            }).fromTo(".hero-paragraph .line", {
                opacity: 0,
                y: 30,
            }, {
                y: 0,
                opacity: 1,
                ease: "power1.out",
                stagger: 0.1,
            }).fromTo(".hero-hover-link", {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
            }, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 0.8,
                ease: "power1.out"
            }, "<");

        const footerText = new SplitType('.footer-text');

        gsap.fromTo(".footer-text .char", {
            y: 188
        }, {

            scrollTrigger: {
                trigger: ".footer-text",
                start: "top 80%",
            },
            y: 0,
            ease: "power1.out",
            stagger: 0.1,
        });

        ScrollTrigger.refresh();
    }
    );

    const firstRow = document.querySelector(".brands-wrapper:not(.is-reverse-wrapper)");
    const secondRow = document.querySelector(".brands-wrapper.is-reverse-wrapper");

    function createInfiniteMarquee(wrapper, direction = "left", speed = 50) {
        if (!wrapper) return;

        const track = wrapper.querySelector(".brands-track") || wrapper;
        const originalContent = track.innerHTML.trim();

        if (!originalContent) return;

        // duplicate only once
        if (!track.dataset.duplicated) {
            track.innerHTML += originalContent;
            track.dataset.duplicated = "true";
        }

        const setupAnimation = () => {
            gsap.killTweensOf(track);

            const singleSetWidth = track.scrollWidth / 2;

            gsap.set(track, {
                x: direction === "left" ? 0 : -singleSetWidth
            });

            const tween = gsap.to(track, {
                x: direction === "left" ? -singleSetWidth : 0,
                duration: singleSetWidth / speed,
                ease: "none",
                repeat: -1
            });

            wrapper.addEventListener("mouseenter", () => tween.pause());
            wrapper.addEventListener("mouseleave", () => tween.resume());
        };

        setupAnimation();

        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(setupAnimation, 150);
        });
    }

    createInfiniteMarquee(firstRow, "left", 50);
    createInfiniteMarquee(secondRow, "right", 50);

    ScrollTrigger.refresh();

    const heroArea = document.querySelector(".div-block-85");
    const leftEye = document.querySelector(".div-block-86 .image-73");
    const rightEye = document.querySelector(".div-block-86-copy .image-73");

    if (heroArea && leftEye && rightEye) {
        const maxMove = 8;

        function moveEyes(e) {
            const rect = heroArea.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            const angle = Math.atan2(deltaY, deltaX);
            const moveX = Math.cos(angle) * maxMove;
            const moveY = Math.sin(angle) * maxMove;

            leftEye.style.transform = `translate(${moveX}px, ${moveY}px)`;
            rightEye.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }

        function resetEyes() {
            leftEye.style.transform = `translate(0, 0)`;
            rightEye.style.transform = `translate(0, 0)`;
        }

        window.addEventListener("mousemove", moveEyes);
        heroArea.addEventListener("mouseleave", resetEyes);
    }



    const toggle = document.querySelector(".dropdown-toggle");
    const menu = document.querySelector(".mega-menu-wrapper");
    const closeBtn = document.querySelector(".close-menu-button");
    const body = document.body;

    if (toggle && menu) {
        function openMenu() {
            menu.classList.add("w--open");
            toggle.classList.add("is-active");
            body.classList.add("menu-open");
        }

        function closeMenu() {
            menu.classList.remove("w--open");
            toggle.classList.remove("is-active");
            body.classList.remove("menu-open");
        }

        toggle.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            menu.classList.contains("w--open") ? closeMenu() : openMenu();
        });

        if (closeBtn) {
            closeBtn.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                closeMenu();
            });
        }

        document.addEventListener("click", function (e) {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") closeMenu();
        });
    }


    const section = document.querySelector(".hero-transform");
    const heroMedia = document.getElementById("heroMedia");
    const finalMediaSlot = document.getElementById("finalMediaSlot");
    const textWrap = document.getElementById("textWrap");

    function getDelta() {
        const mediaRect = heroMedia.getBoundingClientRect();
        const slotRect = finalMediaSlot.getBoundingClientRect();

        const mediaCenterX = mediaRect.left + mediaRect.width / 2;
        const mediaCenterY = mediaRect.top + mediaRect.height / 2;

        const slotCenterX = slotRect.left + slotRect.width / 2;
        const slotCenterY = slotRect.top + slotRect.height / 2;

        return {
            x: slotCenterX - mediaCenterX,
            y: slotCenterY - mediaCenterY,
            scaleX: slotRect.width / mediaRect.width,
            scaleY: slotRect.height / mediaRect.height
        };
    }

    let heroTransformST = null;

    function resetAllScrollTriggers() {
        if (heroTransformST) {
            heroTransformST.kill();
            heroTransformST = null;
        }
        gsap.killTweensOf([heroMedia, textWrap, finalMediaSlot]);
    }

    function buildAnimation() {
        resetAllScrollTriggers();

        const isDesktop = window.innerWidth > 1024;

        if (!isDesktop) {
            // mobile/tablet par animation off
            gsap.set(heroMedia, {
                clearProps: "all",
                position: "relative",
                left: "auto",
                top: "auto",
                x: 0,
                y: 0,
                xPercent: 0,
                yPercent: 0,
                scaleX: 1,
                scaleY: 1,
                width: "100%",
                height: "auto",
                aspectRatio: "1.72 / 1",
                borderRadius: 0
            });

            gsap.set(finalMediaSlot, {
                opacity: 0,
                display: "none"
            });

            gsap.set(textWrap, {
                opacity: 1,
                y: 0
            });

            return;
        }

        // desktop animation on
        gsap.set(heroMedia, {
            clearProps: "all",
            position: "absolute",
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            width: "92vw",
            height: "82vh"
        });

        gsap.set(textWrap, {
            opacity: 0,
            y: 90
        });

        gsap.set(finalMediaSlot, {
            opacity: 0,
            display: "block"
        });

        const delta = getDelta();

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=180%",
                scrub: 1.2,
                pin: true,
                anticipatePin: 1
            }
        });

        heroTransformST = tl.scrollTrigger;

        tl.to(heroMedia, {
            xPercent: -50,
            yPercent: -50,
            x: delta.x,
            y: delta.y,
            scaleX: delta.scaleX,
            scaleY: delta.scaleY,
            ease: "power2.out",
            duration: 1
        }, 0);

        tl.to(textWrap, {
            opacity: 1,
            y: 0,
            ease: "expo.out",
            duration: 0.45
        }, 0.72);

        tl.to(finalMediaSlot, {
            opacity: 1,
            ease: "none",
            duration: 0.2
        }, 0.78);
    }

    window.addEventListener("load", () => {
        buildAnimation();
        ScrollTrigger.refresh();
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            buildAnimation();
            ScrollTrigger.refresh();
        }, 150);
    });

    // window.addEventListener("load", () => {
    //     const text = document.querySelector(".moving-text");
    //     const section = document.querySelector(".text-pin-section");
    //     let masterTl;

    //     function splitTextToChars(el) {
    //         const original = el.dataset.text || el.textContent;
    //         el.dataset.text = original;
    //         el.innerHTML = "";

    //         const frag = document.createDocumentFragment();

    //         [...original].forEach((char) => {
    //             const span = document.createElement("span");
    //             span.className = char === " " ? "char space" : "char";
    //             span.textContent = char === " " ? "\u00A0" : char;
    //             frag.appendChild(span);
    //         });

    //         el.appendChild(frag);
    //     }

    //     function randomOffset() {
    //         const direction = Math.random() > 0.5 ? 1 : -1;
    //         return gsap.utils.random(50, 180) * direction;
    //     }

    //     function createAnimation() {
    //         if (masterTl) masterTl.kill();

    //         splitTextToChars(text);

    //         const chars = text.querySelectorAll(".char");
    //         const viewportWidth = window.innerWidth;
    //         const textWidth = text.scrollWidth;

    //         const startX = viewportWidth;
    //         const endX = -textWidth;

    //         gsap.set(text, { x: startX });

    //         chars.forEach((char) => {
    //             if (!char.classList.contains("space")) {
    //                 gsap.set(char, {
    //                     y: randomOffset(),
    //                     rotate: gsap.utils.random(-8, 8),
    //                     opacity: 0
    //                 });
    //             }
    //         });

    //         masterTl = gsap.timeline({
    //             scrollTrigger: {
    //                 trigger: section,
    //                 start: "top top",
    //                 end: "+=" + (viewportWidth + textWidth + 1400),
    //                 scrub: 1,
    //                 pin: true,
    //                 anticipatePin: 1,
    //                 invalidateOnRefresh: true,
    //                 preventOverlaps: true
    //             }
    //         });

    //         masterTl.to(text, {
    //             x: endX,
    //             ease: "none",
    //             duration: 1
    //         }, 0);

    //         masterTl.to(chars, {
    //             y: 0,
    //             rotate: 0,
    //             opacity: 1,
    //             ease: "power3.out",
    //             stagger: {
    //                 each: 0.018,
    //                 from: "start"
    //             },
    //             duration: 0.22
    //         }, 0.02);

    //         ScrollTrigger.refresh();
    //     }

    //     createAnimation();

    //     let resizeTimer;
    //     window.addEventListener("resize", () => {
    //         clearTimeout(resizeTimer);
    //         resizeTimer = setTimeout(() => {
    //             createAnimation();
    //         }, 150);
    //     });
    // });


    // gsap.registerPlugin(ScrollTrigger);


//     window.addEventListener("load", () => {
//     const text = document.querySelector(".moving-text");
//     const wrap = document.querySelector(".text-pin-wrap");
//     const section = document.querySelector(".text-pin-section");

//     let revealTl;
//     let moveTl;

//     if (!text || !wrap || !section) return;

//     function splitTextToChars(el) {
//         const original = el.dataset.text || el.textContent;
//         el.dataset.text = original;
//         el.innerHTML = "";

//         const frag = document.createDocumentFragment();

//         [...original].forEach((char) => {
//             const span = document.createElement("span");
//             span.className = char === " " ? "char space" : "char";
//             span.textContent = char === " " ? "\u00A0" : char;
//             frag.appendChild(span);
//         });

//         el.appendChild(frag);
//     }

//     function randomOffset() {
//         const direction = Math.random() > 0.5 ? 1 : -1;
//         return gsap.utils.random(50, 180) * direction;
//     }

//     function createTextPinAnimation() {
//         if (revealTl) {
//             if (revealTl.scrollTrigger) revealTl.scrollTrigger.kill();
//             revealTl.kill();
//         }

//         if (moveTl) {
//             if (moveTl.scrollTrigger) moveTl.scrollTrigger.kill();
//             moveTl.kill();
//         }

//         splitTextToChars(text);

//         const chars = text.querySelectorAll(".char");
//         const viewportWidth = window.innerWidth;
//         const textWidth = text.scrollWidth;

//         const startX = viewportWidth;
//         const endX = -textWidth;

//         gsap.set(section, {
//             yPercent: 18
//         });

//         gsap.set(text, {
//             x: startX
//         });

//         chars.forEach((char) => {
//             if (!char.classList.contains("space")) {
//                 gsap.set(char, {
//                     y: randomOffset(),
//                     rotate: gsap.utils.random(-8, 8),
//                     opacity: 0
//                 });
//             }
//         });

//         // section neeche se upar aaye
//         revealTl = gsap.timeline({
//             scrollTrigger: {
//                 trigger: wrap,
//                 start: "top bottom",
//                 end: "top top",
//                 scrub: 1,
//                 invalidateOnRefresh: true
//             }
//         });

//         revealTl.to(section, {
//             yPercent: 0,
//             ease: "none"
//         });

//         // jab apni bari aaye tab horizontal text move kare
//         moveTl = gsap.timeline({
//             scrollTrigger: {
//                 trigger: wrap,
//                 start: "top top",
//                 end: "bottom bottom",
//                 scrub: 1,
//                 invalidateOnRefresh: true
//             }
//         });

//         moveTl.to(text, {
//             x: endX,
//             ease: "none",
//             duration: 1
//         }, 0);

//         moveTl.to(chars, {
//             y: 0,
//             rotate: 0,
//             opacity: 1,
//             ease: "power3.out",
//             stagger: {
//                 each: 0.018,
//                 from: "start"
//             },
//             duration: 0.22
//         }, 0.02);

//         ScrollTrigger.refresh();
//     }

//     createTextPinAnimation();

//     let resizeTimer;
//     window.addEventListener("resize", () => {
//         clearTimeout(resizeTimer);
//         resizeTimer = setTimeout(() => {
//             createTextPinAnimation();
//         }, 150);
//     });
// });




    let introTl;
    let cardsTl;

    function killCardsAnimations() {
    if (introTl) {
        if (introTl.scrollTrigger) introTl.scrollTrigger.kill();
        introTl.kill();
        introTl = null;
    }

    if (cardsTl) {
        if (cardsTl.scrollTrigger) cardsTl.scrollTrigger.kill();
        cardsTl.kill();
        cardsTl = null;
    }
}

    function initDesktopAnimations() {
        killCardsAnimations();
        

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
                end: () => "+=" + window.innerHeight * 3.2,
                scrub: 1.15,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                preventOverlaps: true
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
        killCardsAnimations();

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


    let textPinRevealST;
let textPinTl;

function killTextPinAnimation() {
    if (textPinRevealST) {
        if (textPinRevealST.scrollTrigger) textPinRevealST.scrollTrigger.kill();
        textPinRevealST.kill();
        textPinRevealST = null;
    }

    if (textPinTl) {
        if (textPinTl.scrollTrigger) textPinTl.scrollTrigger.kill();
        textPinTl.kill();
        textPinTl = null;
    }
}

function initTextPinAnimation() {
    killTextPinAnimation();

    const text = document.querySelector(".moving-text");
    const wrap = document.querySelector(".text-pin-wrap");
    const section = document.querySelector(".text-pin-section");

    if (!text || !wrap || !section) return;

    function splitTextToChars(el) {
        const original = el.dataset.text || el.textContent;
        el.dataset.text = original;
        el.innerHTML = "";

        const frag = document.createDocumentFragment();

        [...original].forEach((char) => {
            const span = document.createElement("span");
            span.className = char === " " ? "char space" : "char";
            span.textContent = char === " " ? "\u00A0" : char;
            frag.appendChild(span);
        });

        el.appendChild(frag);
    }

    function randomOffset() {
        const direction = Math.random() > 0.5 ? 1 : -1;
        return gsap.utils.random(50, 180) * direction;
    }

    splitTextToChars(text);

    const chars = text.querySelectorAll(".char");
    const viewportWidth = window.innerWidth;
    const textWidth = text.scrollWidth;
    const startX = viewportWidth;
    const endX = -textWidth;

    gsap.set(section, {
        yPercent: 18,
        opacity: 1
    });

    gsap.set(text, {
        x: startX
    });

    chars.forEach((char) => {
        if (!char.classList.contains("space")) {
            gsap.set(char, {
                y: randomOffset(),
                rotate: gsap.utils.random(-8, 8),
                opacity: 0
            });
        }
    });

    // pehle section niche se upar aaye
    textPinRevealST = gsap.timeline({
        scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "top 70%",
            scrub: 1,
            invalidateOnRefresh: true
        }
    });

    textPinRevealST.to(section, {
        yPercent: 0,
        ease: "none"
    });

    // phir apni bari par pin ho
    textPinTl = gsap.timeline({
        scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: "+=" + (viewportWidth + textWidth + 1200),
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });

    textPinTl.to(text, {
        x: endX,
        ease: "none",
        duration: 1
    }, 0);

    textPinTl.to(chars, {
        y: 0,
        rotate: 0,
        opacity: 1,
        ease: "power3.out",
        stagger: {
            each: 0.018,
            from: "start"
        },
        duration: 0.22
    }, 0.02);

    ScrollTrigger.refresh();
}

window.addEventListener("load", initTextPinAnimation);

window.addEventListener("resize", () => {
    clearTimeout(window.textPinResizeTimer);
    window.textPinResizeTimer = setTimeout(() => {
        initTextPinAnimation();
    }, 150);
});

const btn = document.getElementById("themeToggle");

// load saved theme
const savedTheme = localStorage.getItem("site-theme");

if (savedTheme === "white") {
    document.body.classList.add("white-theme");
} else {
    document.body.classList.add("dark-theme");
}

// toggle on click
btn.addEventListener("click", () => {
    if (document.body.classList.contains("dark-theme")) {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("white-theme");
        localStorage.setItem("site-theme", "white");
    } else {
        document.body.classList.remove("white-theme");
        document.body.classList.add("dark-theme");
        localStorage.setItem("site-theme", "dark");
    }
});
});