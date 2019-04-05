particlesJS('particles-js', {
  particles: {
    number: {
      value: 955,
      density: {
        enable: true,
        value_area: 789.1476416322727,
      },
    },
    color: {
      value: '#ffffff',
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000',
      },
      polygon: {
        nb_sides: 5,
      },

    },
    opacity: {
      value: 0.58927153781200905,
      random: false,
      anim: {
        enable: true,
        speed: 0.5,
        opacity_min: 0,
        sync: false,
      },
    },
    size: {
      value: 1.8,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 100,
      color: '#ffffff',
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.2,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'bubble',
      },
      onclick: {
        enable: true,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 80,
        size: 1,
        duration: 3,
        opacity: 1,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});


// Side navbar

const toggleBtn = document.querySelector('.toggle');
const sidebar = document.querySelector('#sidebar');


toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});
