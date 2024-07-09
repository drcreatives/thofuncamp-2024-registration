const form = document.querySelector('form'),
  nextBtn = form.querySelector('.nextBtn'),
  backBtn = form.querySelector('.backBtn'),
  allInput = form.querySelectorAll('.first input');
const submitBtn = document.getElementById('submitBtn');
const danger = document.getElementById('danger');
const success = document.getElementById('success');
const danger2 = document.getElementById('danger2');

nextBtn.addEventListener('click', () => {
  allInput.forEach((input) => {
    if (input.value != '') {
      form.classList.add('secActive');
    } else {
      form.classList.remove('secActive');
    }
  });
});

backBtn.addEventListener('click', () => form.classList.remove('secActive'));

form.addEventListener('submit', function (e) {
  e.preventDefault();

  var spinner =
    '<div class="spinner-border" role="status"> <span class="visually-hidden">Loading...</span></div>   Please Wait....';
  submitBtn.innerHTML = spinner;

  const formData = new FormData(form);

  const payload = new URLSearchParams(formData);

  fetch('https://gidiads-backend-poc-4qz44hapba-ew.a.run.app/api/v1/thofun/new', {
    method: 'POST',
    body: payload
  }).then((response) => {
    submitBtn.textContent = 'Submit';
    if (response.status === 200) {
      success.style.display = 'block';
      form.reset();
    }
    if (response.status === 400) {
      danger.style.display = 'block';
    }

    if (response.status === 500) {
      danger2.style.display = 'block';
    }
    console.log(response);
  });

  setTimeout(() => {
    success.style.display = 'none';
    danger.style.display = 'none';
    danger2.style.display = 'none';
  }, 7000);
});
