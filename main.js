// main.js - simple interactions: slideshow + form demo

document.addEventListener('DOMContentLoaded', function(){
  // year in footer
  const years = document.querySelectorAll('[id^="year"]');
  years.forEach(el => el.textContent = new Date().getFullYear());

  // slideshow
  const slides = document.querySelectorAll('.slide');
  let idx = 0;
  if(slides.length){
    slides[0].classList.add('active');
    setInterval(()=> {
      slides[idx].classList.remove('active');
      idx = (idx+1) % slides.length;
      slides[idx].classList.add('active');
    }, 5000);
  }

  // registration demo (no backend) - store in localStorage
  const regForm = document.getElementById('regForm');
  if(regForm){
    regForm.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('fullname').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const course = document.getElementById('course').value;
      const start = document.getElementById('start').value;
      const pwd = document.getElementById('password').value;

      if(!name || !email || !phone || !course || !start || !pwd){
        document.getElementById('regMsg').textContent = 'Please complete all fields.';
        return;
      }

      // simple local storage "student"
      let students = JSON.parse(localStorage.getItem('det_students') || '[]');
      students.push({name,email,phone,course,start,created:new Date().toISOString()});
      localStorage.setItem('det_students', JSON.stringify(students));
      document.getElementById('regMsg').textContent = 'Registration successful! We will contact you.';
      regForm.reset();
    });
  }

  // login demo - checks localStorage
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', function(e){
      e.preventDefault();
      const uemail = document.getElementById('uemail').value.trim();
      const upassword = document.getElementById('upassword').value;
      // demo: check if any registered student has this email
      let students = JSON.parse(localStorage.getItem('det_students') || '[]');
      const found = students.find(s => s.email === uemail);
      if(found){
        document.getElementById('loginMsg').textContent = 'Login successful! (demo)';
        // redirect to index for demo
        setTimeout(()=> window.location.href = 'index.html', 800);
      } else {
        document.getElementById('loginMsg').textContent = 'No account found with this email. Please register.';
      }
    });
  }

  // contact form demo
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      document.getElementById('contactMsg').textContent = 'Message sent. We will contact you shortly.';
      contactForm.reset();
    });
  }
});