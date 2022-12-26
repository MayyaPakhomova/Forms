const text = document.querySelector('.h1-animation');
if(text){
text.innerHTML = text.textContent.replace(/\S/g, '<span class ="h1-span">$&</span>');
text.addEventListener('mouseover', function(e) {
  e.target.classList.add('smoke');
  setTimeout(() => {
    e.target.classList.remove('smoke');
  }, 5000);

});
}


const policyText  = document.querySelector('.policy__text ');
if(policyText){
  policyText.addEventListener('mouseover', (e) => {
    policyText.classList.add('active');
  });
  policyText.addEventListener('mouseout', (e) => {
    policyText.classList.remove('active');
  });
}
