const NewItemMake = () => {
  console.log('New Item Added');
};

const showOptions = () => {
  const optionBar = document.querySelector('.Option-bar');
  const arrow = document.getElementById('arrow');
  const isHidden = optionBar.classList.contains('hidden');
  if (isHidden) {
    optionBar.classList.remove('hidden');
    if (arrow) {
      arrow.style.transform = 'rotate(180deg)';
    }
  } else {
    optionBar.classList.add('hidden');
    if (arrow) {
      arrow.style.transform = 'rotate(0deg)';
    }
  }
};

const selectedOption = (event) => {
  const defaultOption = document.querySelector('.defaultOption');
  const item = event.target.closest('[data-value]');
  if (item) {
    const selectedValue = item.getAttribute('data-value');
    const defaultOption = document.querySelector('.defaultOption');
    
    if (defaultOption) {
      defaultOption.textContent = selectedValue;
    }
}};

export { NewItemMake, showOptions, selectedOption };
