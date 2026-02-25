import { useEffect } from 'react';

export const useScrollAnimationTrigger = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          
          // Add 'in-view' class for CSS animations
          if (target.classList.contains('animate-on-scroll')) {
            target.classList.add('in-view');
          }
          if (target.classList.contains('animate-slide-left')) {
            target.classList.add('in-view');
          }
          if (target.classList.contains('animate-slide-right')) {
            target.classList.add('in-view');
          }
          if (target.classList.contains('animate-scale-fade')) {
            target.classList.add('in-view');
          }
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale-fade'
    );
    
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);
};