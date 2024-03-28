class macro_counter {
    private goal: string;
    private gender: string;
    private age: number;
    private weight: number;
    private feet: number;
    private inches: number;
    private training: string;
    private name: string;
    private email: string;
    private calories: number;
    private protein: number;
    private carbs: number;
    private fats: number;
    private macros: Record<string, number>
    
    constructor(){
            this.goal = '';
            this.gender = '';
            this.age = 0;
            this.weight = 0;
            this.feet = 0;
            this.inches = 0;
            this.training = '';
            this.name = '';
            this.email = '';
            this.calories = 0;
            this.protein = 0;
            this.carbs = 0;
            this.fats = 0;
            this.macros = {}
    }
    public set_goal(goal: string): void{
        console.log(goal);
        this.goal = goal;
    }
    public set_gender(gender: string): void {
        console.log(gender);
        this.gender = gender;
    }
    public set_age(age: number): void {
        try {
            if(isNaN(age) || age >= 99 || age <= 7) {
                throw new Error('ERROR: Invalid Age');
            }
            this.age = age;
        }
        catch(error: any){
            console.log(age);
            console.error(error.message);
        }
    }
    public set_weight(weight: number): void {
        try {
            if(isNaN(weight) || weight <= 20 || weight >= 1000) {
                throw new Error ('ERROR: Invalid Weight');
            }
            this.weight = weight;
        }
        catch(error: any) {
            console.log(weight);
            console.error(error.message);
        }
    }

    public set_feet(feet: number): void {
        try {
            if(isNaN(feet) || feet >= 9 || feet <= 1) {
                throw new Error ('ERROR: Invalid Height(feet)');
            }
            this.feet = feet;
        }
        catch(error: any) {
            console.log(feet);
            console.error(error.message);
        }
    }
    public set_inches(inches: number): void {
        try {
            if(isNaN(inches) || inches >= 12) {
                throw new Error ('ERROR: Invalid Height(inches)');
            }
            this.inches = inches;
        }
        catch(error: any) {
            console.log(inches);
            console.error(error.message);
        }
    }
    public set_training(training: string): void {
        console.log(training);
        this.training = training;
    }
    public set_name(name: string): void {
        console.log(name);
        this.name = name;
    }
    public set_email(email: string): void {
        console.log(email);
        this.email = email;
    }
    public set_macros(macro: string, grams: number): void {
        this.macros[macro] = grams;
    }
    public get_calories(): number {
        return this.calories;
    }
    public get_macros(macro: string): number {
        return this.macros[macro]; 
    }
    public get_protein(): number {
        return this.protein;
    }
    public get_carbs(): number {
        return this.carbs;
    }
    public get_fats(): number {
        return this.fats;
    }
    public get_name(): string {
        return this.name;
    }
    public get_email(): string {
        return this.email;
    }
    public submit(): void{
        this.calculate();
    }

    private calculate(): number {
        var newBMR: any = 0;
        var temp_feet: any = this.feet;
        var temp_inches: any = this.inches;
        var temp_weight: any = this.weight;
        var temp_age: any = this.age;
        if (this.gender === 'Male') {
            newBMR = (4.536 * parseInt(temp_weight)) + (15.88 * ((12 * parseInt(temp_feet)) + parseInt(temp_inches))) 
                - (5 * parseInt(temp_age)) + 5;
        }
        else {
            newBMR = (4.536 * this.weight) + (15.88 * ((12 * this.feet) + this.inches)) 
                - (5 * this.age) - 161;
        }

        if (this.training === 'Basic') {
            console.log(newBMR);
            newBMR = parseInt(newBMR) * 1.375;
            console.log(newBMR);
        }
        else if (this.training === 'Intermediate') {
            newBMR = parseInt(newBMR) * 1.55;
        }
        else if (this.training === 'Advanced') {
            newBMR = parseInt(newBMR) * 1.725;
        }
        else if (this.training === 'none') {
            newBMR = parseInt(newBMR) * 1.2;
        }

        if(this.goal === 'Gain') {
            newBMR = parseInt(newBMR) + 500;
        }
        else if(this.goal === 'Maintain') {
            newBMR = parseInt(newBMR);
        }
        else if(this.goal === 'Lose') {
            newBMR = parseInt(newBMR) - 500;
        }
        console.log(newBMR);
        this.calories = newBMR;
        this.calculate_macros(newBMR);
        return newBMR;
    }
    private calculate_macros(newBMR: any) {
        //Protein 35%, Carbs 45%, Fats 20%
        var temp_protein: number = Math.round(parseInt(newBMR) * .35);
        this.protein = temp_protein;
        this.set_macros('protein', Math.round(temp_protein / 4));

        var temp_carbs: number = Math.round(parseInt(newBMR) * .45);
        this.carbs = temp_carbs;
        this.set_macros('carbs', Math.round(temp_carbs / 4));

        var temp_fats: number = Math.round(parseInt(newBMR) * .2);
        this.fats = temp_fats;
        this.set_macros('fats', Math.round(temp_fats / 9));
    }
}

const count = new macro_counter();

function toggleInput(value: string): void{
    const input = document.querySelector('.Training_Yes') as HTMLSelectElement;
    const yes_input = input.querySelectorAll('option');

    if (value === 'yes') {
        input.style.display = 'block';

        yes_input.forEach((option: HTMLOptionElement) => {
            option.removeAttribute('disabled');
        });
    }

    else {
        input.style.display = 'none';

        yes_input.forEach((option: HTMLOptionElement) => {
            option.setAttribute('disabled', 'disabled');
        });
    }
}

function toggleInputSubmit(): void{
    const input = document.querySelector('.Macros') as HTMLDivElement;
    input.style.display = 'block';

    const calories: HTMLDivElement = input.querySelector('.Calories') as HTMLDivElement;
    calories.textContent = 'Calories: ' + count.get_calories();

    const p: HTMLDivElement = input.querySelector('.Protein') as HTMLDivElement;
    p.textContent = `Protein: ${count.get_protein()} calories with ${count.get_macros('protein')} grams of protein`;
    
    const c: HTMLDivElement = input.querySelector('.Carbs') as HTMLDivElement;
    c.textContent = `Carbs: ${count.get_carbs()} calories with ${count.get_macros('carbs')} grams of carbs`;
    
    const f: HTMLDivElement = input.querySelector('.Fats') as HTMLDivElement;
    f.textContent = `Fats: ${count.get_fats()} calories with ${count.get_macros('fats')} grams of fat`;
}

function submitForm(): void {
    const formData = {
        name: count.get_name(),
        email: count.get_email(),
        calories: count.get_calories(),
        protein: count.get_macros('protein'),
        carbs: count.get_macros('carbs'),
        fats: count.get_macros('fats'),
        protein_cal: count.get_protein(),
        carbs_cal: count.get_carbs(),
        fats_cal: count.get_fats()
    };

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then((response: Response) => {
        if (response.ok) {
            toggleInputSubmit();
        } else {
            console.error('Failed to submit form');
        }
    })
    .catch((error: Error) => {
        console.error('Error submitting form:', error);
    });
}
