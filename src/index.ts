const button = document.querySelector ('button[id="add"]') as HTMLButtonElement; 
const accessRadio = document.getElementById ('accessRadio') as HTMLElement; 
button.addEventListener('click', addEmployee);

enum accessOptions {
  administrator = "administrador",
  manager = "gerente",
  employee = "funcionário"
}

const accessOptionsValues = Object.values (accessOptions)

accessOptionsValues.forEach ((value: string, i: number) => {
  accessRadio.innerHTML += `
  <div class="form-check">
    <input class="form-check-input capitalLetter" type="radio" name="access id="accessRadio${i}" value="${value}">
    <label class="form-check-label capitalLetter" for="accessRadio${i}">
      ${value}
    </label>
  </div>
  `;
});

function addEmployee (): void {
  let content = document.getElementById ('content') as HTMLElement;
  let fullName = document.querySelector ('#fullName') as HTMLInputElement;
  let register = document.querySelector ('#register') as HTMLInputElement;
  let admin = document.querySelector ('input[type="radio"]:checked') as HTMLInputElement;
  let active = document.querySelector ('#active') as HTMLInputElement;

  if (fullName && register && admin && active) {
    content.innerHTML += createLine(
      fullName.value,
      register.value,
      admin.value,
      active.checked
    );
  }
}

function createLine (fullName: string,
                     NrRegister: string | number,
                     admin: string,
                     active: boolean): string {
 return `
    <div class="card mb-1">
      <div class="card-header">
        ${NrRegister}
      </div>
      <div class="card-body">
        <h5 class="card-title">${fullName}</h5>
        <a href="#" class="btn ${active ? 'btn-success' : 'btn-danger'}">${active ? 'Ativo' : 'Inativo'}</a>
      </div>
      <div class="card-footer bg-transparent border-success">
        Acesso: ${admin}
      </div>
    </div>`;
  }


