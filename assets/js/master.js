const images = [
  {
    url: "./assets/img/1web.webp",
    thumb: "./assets/img/1icon.webp",
   
  },
  {
    url: "./assets/img/2web.webp",
    thumb: "./assets/img/2icon.webp",
    
  },
  {
    url: "./assets/img/3web.webp",
    thumb: "./assets/img/3icon.webp",
   
  }
];

const carousel = document.getElementById("carousel");
const thumbnailsContainer = document.getElementById("thumbnails");

let index = 0;
let thumbs = [];

// ایجاد thumbnail ها
images.forEach((image, i) => {
  const thumb = document.createElement("div");
  thumb.className = "thumb";
  thumb.style.backgroundImage = `url('${image.thumb}')`;
  thumb.dataset.index = i;
  thumb.addEventListener("click", () => {
    clearInterval(autoSlide);
    showSlide(i);
  });
  thumbnailsContainer.appendChild(thumb);
  thumbs.push(thumb);
});

function showSlide(i) {
  const { url, text } = images[i];
  carousel.style.backgroundImage = `url('${url}')`;
  
  index = i;

  // هایلایت کردن thumbnail فعال
  thumbs.forEach((thumb, tIndex) => {
    thumb.classList.toggle("active", tIndex === i);
  });
}

showSlide(index);
const autoSlide = setInterval(() => {
  const next = (index + 1) % images.length;
  showSlide(next);
}, 3000);

/* 📌 موبایل منو */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const hamburgerLines = hamburgerBtn.querySelector('.hamburgerLines');
const closeIcon = hamburgerBtn.querySelector('.closeIcon');

hamburgerBtn.addEventListener('click', () => {
  const isMenuClosed = mobileMenu.classList.contains('-translate-y-full');

  if (isMenuClosed) {
    // باز کردن منو
    mobileMenu.classList.remove('-translate-y-full', 'opacity-0');
    mobileMenu.classList.add('translate-y-0', 'opacity-100');

    // نمایش ضربدر و مخفی کردن سه خط
    hamburgerLines.classList.add('hidden');
    closeIcon.classList.remove('hidden');
  } else {
    // بستن منو
    mobileMenu.classList.add('-translate-y-full', 'opacity-0');
    mobileMenu.classList.remove('translate-y-0', 'opacity-100');

    // نمایش سه خط و مخفی کردن ضربدر
    hamburgerLines.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }
});



    // <!-- end-of---header///// -->/
    ////////////2nd-box////
const backgrounds = document.querySelectorAll('.parallax-bg');

window.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;

  backgrounds.forEach(bg => {
    const rect = bg.parentElement.getBoundingClientRect(); // قاب والد
    const progress = (windowHeight - rect.top) / (windowHeight + rect.height);

    const offset = progress * 150 - 25; 
    bg.style.transform = `translateY(${offset}px)`;
  });
});

  
    ////////////end-of-2nd-box////
    // parallax-section/
    class ScrollBgBox {
  constructor(section) {
    this.section = section;
    this.bg = section.querySelector('.bg-image');
    this.box = section.querySelector('.overlay-box');

    // پس‌زمینه رو از data-bg بگیریم
    const bgUrl = section.dataset.bg;
    if (bgUrl) {
      this.bg.style.backgroundImage = `url(${bgUrl})`;
    }

    // یک بار هم هنگام ساخت اجرا کنیم
    this.update = this.update.bind(this);
    window.addEventListener('scroll', this.update);
    this.update();
  }

  update() {
    const sectionRect = this.section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const progress = 1 - (sectionRect.bottom - windowHeight) / sectionRect.height;

    if (progress < 0.3) {
      this.box.style.opacity = 0;
    } 
    else if (progress >= 0.3 && progress <= 0.6) {
      const fadeProgress = (progress - 0.3) / 0.3;
      this.box.style.opacity = fadeProgress;
    } 
    else {
      this.box.style.opacity = 1;
    }
  }
}

// اجرا فقط بعد از بارگذاری کامل DOM
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.bg-section').forEach(section => {
    new ScrollBgBox(section);
  });
});
//////////////parallax --- card----//////

  // ساختن سوییپر و قرار دادنش در دامنه global
  const swiper = new Swiper('.swiper', {
    loop: false, // اگه بخوای دور بزنه میتونی بذاری true
    pagination: { el: '.swiper-pagination', clickable: true },
  });

  // گرفتن همه thumbnailها
  const thumb = document.querySelectorAll('.thumbnails img');

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      swiper.slideTo(index); // میره به اسلاید مورد نظر
    });
  });
   
    // end-of-parallax-section/

    // last-parallax---/
    document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('#workshop');
  if (!gallery) return;

  const imgs = Array.from(gallery.querySelectorAll('img'));
  if (imgs.length < 3) return;

  const img = imgs[2];

  let clone = null;
  let overlay = null;
  let startScroll = null;
  const duration = window.innerHeight * 1.0; // فاصله اسکرول برای تکمیل زوم
  let initialRect = null;
  let ticking = false;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function createClone(rect) {
    clone = img.cloneNode(true);
    clone.className = 'zoom-clone';
    clone.style.left = rect.left + 'px';
    clone.style.top = rect.top + 'px';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.opacity = '1';
    document.body.appendChild(clone);
    img.style.visibility = 'hidden';
    initialRect = rect;
  }

  function createOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'zoom-overlay';
    overlay.innerHTML = `
      <div class="zoom-overlay-inner">
       
        <p class="overlay-text">Venez en boutique pourcréer ensemble la </p>
        <h3 class="overlay-text">pièce de vos rêves</h3>
          <a href="#"
                class="bg-white text-black px-4 py-2 rounded-full text-xs font-semibold uppercase hover:bg-gray-200 transition">
                Venez à la boutique
            </a>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  function removeClone() {
    if (!clone) return;
    clone.remove();
    clone = null;
    if (overlay) {
      overlay.remove();
      overlay = null;
    }
    img.style.visibility = '';
    startScroll = null;
    initialRect = null;
  }

  function update() {
    ticking = false;

    const scrollY = window.scrollY;
    const rect = img.getBoundingClientRect();

    if (startScroll === null) {
      // انیمیشن زمانی شروع می‌شود که وسط عکس به وسط صفحه نمایش برسد
      startScroll = scrollY + rect.top + rect.height / 2 - window.innerHeight / 2;
    }

    let progress = (scrollY - startScroll) / duration;
    progress = Math.min(Math.max(progress, 0), 1.2); // کمی بیشتر از 1 برای اطمینان از تکمیل

    // اگر کاربر به بالای نقطه شروع اسکرول کند، کلون را حذف کن
    if (progress <= 0 && clone) {
      removeClone();
      return;
    }

    // اگر انیمیشن شروع شده ولی کلون ساخته نشده، آن را بساز
    if (progress > 0 && !clone) {
      createClone(rect);
      createOverlay();
    }

    if (!clone || !overlay) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // مقدار پیشرفت را برای انیمیشن زوم بین 0 و 1 محدود کن
    const zoomProgress = Math.min(Math.max(progress, 0), 1);

    const left = lerp(initialRect.left, 0, zoomProgress);
    const top = lerp(initialRect.top, 0, zoomProgress);
    const width = lerp(initialRect.width, vw, zoomProgress);
    const height = lerp(initialRect.height, vh, zoomProgress);

    clone.style.left = left + 'px';
    clone.style.top = top + 'px';
    clone.style.width = width + 'px';
    clone.style.height = height + 'px';

    // کنترل نمایش و محو شدن متن روی عکس
    const overlayShowStart = 0.5;
    let overlayOpacity = 0;
    if (progress > overlayShowStart) {
      overlayOpacity = (progress - overlayShowStart) / (1 - overlayShowStart);
      overlayOpacity = Math.min(overlayOpacity, 1);
    }
    overlay.style.opacity = overlayOpacity;

    const texts = overlay.querySelectorAll('.overlay-text');
    const step = (1 - overlayShowStart) / texts.length;

    texts.forEach((el, i) => {
      const textStart = overlayShowStart + i * step;
      let localProgress = (progress - textStart) / step;
      localProgress = Math.min(Math.max(localProgress, 0), 1);
      el.style.opacity = localProgress;
      el.style.transform = `translateY(${(1 - localProgress) * 40}px)`;
    });

    if (zoomProgress >= 1) {
      clone.classList.add('zoomed');
    } else {
      clone.classList.remove('zoomed');
    }

    // منطق محو شدن و حذف کلون بعد از اسکرول کاربر
    const extraScroll = vh * 0.5; // فاصله اضافی که کاربر باید اسکرول کند تا محو شدن شروع شود
    if (scrollY > startScroll + duration + extraScroll) {
      const fadeOutProgress = (scrollY - (startScroll + duration + extraScroll)) / 300; // سرعت محو شدن
      const opacity = 1 - Math.min(fadeOutProgress, 1);
      clone.style.opacity = opacity;
      overlay.style.opacity = opacity;

      if (opacity <= 0) {
        removeClone();
      }
    } else {
      // اطمینان از اینکه اگر کاربر به بالا اسکرول کرد، دوباره شفافیت 1 شود
      if (progress > 0) {
        clone.style.opacity = '1';
        // شفافیت overlay توسط منطق خودش کنترل می‌شود
      }
    }
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    removeClone();
  });
});
    //end-of- last-parallax---/
/*////// maya part--- */
   document.addEventListener('scroll', () => {
            const parallaxImage = document.getElementById('my-image');
            const parallaxSection = document.getElementById('parallax-section');
            const sectionRect = parallaxSection.getBoundingClientRect();

            if (sectionRect.top < window.innerHeight && sectionRect.bottom >= 0) {
                const scrollProgress = -sectionRect.top;
                const speed = 0.3;
                const movement = scrollProgress * speed;
                parallaxImage.style.transform = `translateY(${movement}px)`;
            }
        });
    /*end of  maya part--- */
    // footerrr///
  
window.addEventListener('scroll', function () {
    const footer = document.querySelector('.footer');
    const content = document.querySelector('.footer-content');
    const footerTop = footer.offsetTop;
    const footerHeight = footer.offsetHeight;
    const scrollY = window.scrollY + window.innerHeight;

    if (scrollY > footerTop && scrollY < footerTop + footerHeight) {
        let progress = (scrollY - footerTop) / footerHeight;
        let moveY = (progress - 0.5) * 400; // میزان جابجایی
        content.style.transform = `translateY(${moveY}px)`;
    }
});



