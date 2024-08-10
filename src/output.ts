import { accessOptions, UserType } from "../src/models";

class UserController {
    content: HTMLElement;
    accessRadio: HTMLElement;
    accessOptionsValues: string[];
    button: HTMLFormElement;

    constructor() {
        this.content = this.getElement('#content');
        this.accessRadio = this.getElement('#accessRadio');
        this.accessOptionsValues = Object.values(accessOptions);
        this.button = this.getFormElement('#add');

        this.button.addEventListener('click', this.addEmployee.bind(this));
        this.UserLayout();

        this.accessOptionsValues.forEach((value: string, i: number) => {
            const capitalizedValue = capitalizeFirstLetter(value);
            this.accessRadio.innerHTML += `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="access" id="accessRadio${i}" value="${value}">
                <label class="form-check-label" for="accessRadio${i}">
                ${capitalizedValue}
                </label>
            </div>
            `;
        });
        (this.getFormElement('#accessRadio0')).checked = true;
    }

    private getElement(selector: string): HTMLElement {
        return document.querySelector(selector) as HTMLElement;
    }

    private getFormElement(selector: string): HTMLFormElement {
        return document.querySelector(selector) as HTMLFormElement;
    }

    async UserLayout(): Promise<void> {
        const users: UserType[] = await this.getUser();

        users.forEach((user: UserType) => {
            this.content.innerHTML += this.createLine(user);
        });
    }

    async getUser(): Promise<UserType[]> {
        const response = await fetch('http://localhost:5011/users');
        const users: UserType[] = await response.json();
        return users;
    }

    addEmployee(): void {
        const formFields = [
            this.getFormElement('#fullName'),
            this.getFormElement('#register'),
            this.getFormElement('input[type="radio"]:checked'),
            this.getFormElement('#active'),
            this.getFormElement('#addressHome'),
            this.getFormElement('#addressWork')
        ];

        const [fullName, register, admin, active, addressHome, addressWork] = formFields;

        const user: UserType = {
            fullName: (fullName as HTMLFormElement).value,
            register: (register as HTMLFormElement).value !== '' ? (register as HTMLFormElement).value : undefined,
            active: (active as HTMLFormElement).checked,
            access: (admin as HTMLFormElement).value as accessOptions
        };

        this.content.innerHTML += this.createLine(user, (addressHome as HTMLFormElement).value, (addressWork as HTMLFormElement).value);
    }

    createLine({
        fullName,
        register = Math.random().toString(36).substring(7).toUpperCase(),
        active,
        access
    }: UserType, ...address: string[]): string {
        return `
        <div class="card mb-1">
            <div class="card-header">
            ${register}
            </div>
            <div class="card-body">
            <h5 class="card-title">${fullName}</h5>
            <a href="#" class="btn ${active ? 'btn-success' : 'btn-danger'}">${active ? 'Ativo' : 'Inativo'}</a>
            </div>
            ${address.length > 0 ? `
            <div class="card-body">
            <h6 class="card-title">${address.join('<br/>')}</h6>
            </div>` : ''}
            <div class="card-footer bg-transparent border-success">
            Acesso: ${access}
            </div>
        </div>`;
    }
}

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default new UserController