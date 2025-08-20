document.addEventListener('DOMContentLoaded', function() {
  const steps = document.querySelectorAll('.form-step');
  const progress = document.querySelector('.form-progress-bar .progress');
  const projectMessage = document.getElementById('project-message');
  let currentStep = 0;
  const stepCount = steps.length;

  function showStep(idx) {
    steps.forEach((step, i) => {
      step.classList.toggle('active', i === idx);
    });
    progress.style.width = `${((idx+1)/stepCount)*100}%`;

    if(idx === 1) {
      projectMessage.innerHTML = `
        <h2>Just a little more…</h2>
        <p>To connect you with the right expert, we’ll just need your email and phone number.</p>
      `;
    } else if(idx === 2) {
      projectMessage.innerHTML = '';
    } else {
      projectMessage.innerHTML = `
        <h2>Because your dream deserves attention. Speak to our team now.</h2>
        <p>Your dream deserves more than just a plan — it deserves the right attention. Speak with us today and discover how simple it can be to bring your vision home.</p>
      `;
    }
  }

  document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const parentStep = btn.closest('.form-step');
      const inputs = parentStep.querySelectorAll('input');
      let allFilled = true;
      inputs.forEach(inp => { if(!inp.value.trim()) allFilled = false; });
      if(allFilled) {
        if (currentStep < stepCount - 1) {
          currentStep++;
          showStep(currentStep);
        }
      } else {
        inputs.forEach(inp => { if(!inp.value.trim()) inp.style.borderColor = "#da4d4d"; });
      }
    });
  });

  document.getElementById('projectForm').addEventListener('submit', function(e) {
    e.preventDefault();
    projectMessage.innerHTML = "<h2>Thank you!</h2><p>Your dream is in good hands. We’ll contact you soon.</p>";
    document.getElementById('projectForm').style.display = 'none';
    progress.style.width = "100%";
  });

  showStep(0);
});
