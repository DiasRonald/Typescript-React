import { accessOptions, userType } from "../src/models";

let content = document.getElementById ('content') as HTMLElement;
const button = document.querySelector ('button[id="add"]') as HTMLButtonElement; 
const accessRadio = document.getElementById ('accessRadio') as HTMLElement; 
button.addEventListener('click', addEmployee);

const accessOptionsValues = Object.values (accessOptions)

const getUser = async (): Promise<userType[]> => {
  const response: Response = await fetch ('http://localhost:5011/users');
  const users: userType [] = await response.json ();
  return users
}

const updateUserLayout = async (): Promise <void> => {
  const users: userType[] = await getUser ();
  
  users.map ((user: userType) => {
    content.innerHTML +=<string> createLine(user);
  });
};

updateUserLayout ();

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function addEmployee (): void {
  let fullName = document.querySelector ('#fullName') as HTMLInputElement;
  let register = document.querySelector ('#register') as HTMLInputElement;
  let admin = document.querySelector ('input[type="radio"]:checked') as HTMLInputElement;
  let active = document.querySelector ('#active') as HTMLInputElement;
  let addressHome = document.querySelector ('#addressHome') as HTMLInputElement;
  let addressWork = document.querySelector ('#addressWork') as HTMLInputElement;

  let user: userType = {
      fullName: fullName.value,
      register: register.value != '' ? register.value: undefined,
      active: active.checked,
      access: <accessOptions>admin.value
  }

  content.innerHTML += <string> createLine (
      user, 
      addressHome.value,
      addressWork.value
    );
  }


accessOptionsValues.forEach ((value: string, i: number) => {
  const capitalizedValue = capitalizeFirstLetter(value);
  accessRadio.innerHTML += `
  <div class="form-check">
    <input class="form-check-input" type="radio" name="access" id="accessRadio${i}" value="${value}">
    <label class="form-check-label" for="accessRadio${i}">
      ${capitalizedValue}
    </label>
  </div>
  `;
});

(<HTMLInputElement>document.getElementById('accessRadio0')).checked = true;


function createLine ({
  fullName,
  register = Math.random().toString(36).substring(7).toUpperCase(),
  active,
  access = accessOptions.undefined,
}: userType,
  ...address: string []): string {

  return `
    <div class="card mb-1">
      <div class="card-header">
        ${register}
      </div>
      <div class="card-body">
        <h5 class="card-title">${fullName}</h5>
        <a href="#" class="btn ${active ? 'btn-success' : 'btn-danger'}">${active ? 'Ativo' : 'Inativo'}</a>
      </div>
      ${
      address.length > 0 ?
        `<div class="card-body">
        <h6 class="card-title">${address.join('<br/>')}</h6>
      </div>` : ''
      }
      <div class="card-footer bg-transparent border-success">
        Acesso: ${access ? 'Não definido': access}
      </div>
    </div>`;
}

