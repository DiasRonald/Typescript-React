function component() {
    const element = document.getElementById('content');
  
    if (element) {
      element.innerHTML = "<h1>Teste!</h1>";
      element.innerHTML += "<h1>Teste!</h1>";
      element.innerHTML += "<h1>Teste!</h1>";
      element.innerHTML += "<h1>Teste!</h1>";
      element.innerHTML += "<h1>Teste!</h1>";
    } else {
      console.error('Element with id "content" not found.');
    }
  
    return element;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    component();
  });
  