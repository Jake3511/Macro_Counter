var macro_counter = /** @class */ (function () {
    function macro_counter() {
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
        this.macros = {};
    }
    macro_counter.prototype.set_goal = function (goal) {
        console.log(goal);
        this.goal = goal;
    };
    macro_counter.prototype.set_gender = function (gender) {
        console.log(gender);
        this.gender = gender;
    };
    macro_counter.prototype.set_age = function (age) {
        try {
            if (isNaN(age) || age >= 99 || age <= 7) {
                throw new Error('ERROR: Invalid Age');
            }
            this.age = age;
        }
        catch (error) {
            console.log(age);
            console.error(error.message);
        }
    };
    macro_counter.prototype.set_weight = function (weight) {
        try {
            if (isNaN(weight) || weight <= 20 || weight >= 1000) {
                throw new Error('ERROR: Invalid Weight');
            }
            this.weight = weight;
        }
        catch (error) {
            console.log(weight);
            console.error(error.message);
        }
    };
    macro_counter.prototype.set_feet = function (feet) {
        try {
            if (isNaN(feet) || feet >= 9 || feet <= 1) {
                throw new Error('ERROR: Invalid Height(feet)');
            }
            this.feet = feet;
        }
        catch (error) {
            console.log(feet);
            console.error(error.message);
        }
    };
    macro_counter.prototype.set_inches = function (inches) {
        try {
            if (isNaN(inches) || inches >= 12) {
                throw new Error('ERROR: Invalid Height(inches)');
            }
            this.inches = inches;
        }
        catch (error) {
            console.log(inches);
            console.error(error.message);
        }
    };
    macro_counter.prototype.set_training = function (training) {
        console.log(training);
        this.training = training;
    };
    macro_counter.prototype.set_name = function (name) {
        console.log(name);
        this.name = name;
    };
    macro_counter.prototype.set_email = function (email) {
        console.log(email);
        this.email = email;
    };
    macro_counter.prototype.set_macros = function (macro, grams) {
        this.macros[macro] = grams;
    };
    macro_counter.prototype.get_calories = function () {
        return this.calories;
    };
    macro_counter.prototype.get_macros = function (macro) {
        return this.macros[macro];
    };
    macro_counter.prototype.get_protein = function () {
        return this.protein;
    };
    macro_counter.prototype.get_carbs = function () {
        return this.carbs;
    };
    macro_counter.prototype.get_fats = function () {
        return this.fats;
    };
    macro_counter.prototype.get_name = function () {
        return this.name;
    };
    macro_counter.prototype.get_email = function () {
        return this.email;
    };
    macro_counter.prototype.submit = function () {
        this.calculate();
    };
    macro_counter.prototype.calculate = function () {
        var newBMR = 0;
        var temp_feet = this.feet;
        var temp_inches = this.inches;
        var temp_weight = this.weight;
        var temp_age = this.age;
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
        if (this.goal === 'Gain') {
            newBMR = parseInt(newBMR) + 500;
        }
        else if (this.goal === 'Maintain') {
            newBMR = parseInt(newBMR);
        }
        else if (this.goal === 'Lose') {
            newBMR = parseInt(newBMR) - 500;
        }
        console.log(newBMR);
        this.calories = newBMR;
        this.calculate_macros(newBMR);
        return newBMR;
    };
    macro_counter.prototype.calculate_macros = function (newBMR) {
        //Protein 35%, Carbs 45%, Fats 20%
        var temp_protein = Math.round(parseInt(newBMR) * .35);
        this.protein = temp_protein;
        this.set_macros('protein', Math.round(temp_protein / 4));
        var temp_carbs = Math.round(parseInt(newBMR) * .45);
        this.carbs = temp_carbs;
        this.set_macros('carbs', Math.round(temp_carbs / 4));
        var temp_fats = Math.round(parseInt(newBMR) * .2);
        this.fats = temp_fats;
        this.set_macros('fats', Math.round(temp_fats / 9));
    };
    return macro_counter;
}());
var count = new macro_counter();
function toggleInput(value) {
    var input = document.querySelector('.Training_Yes');
    var yes_input = input.querySelectorAll('option');
    if (value === 'yes') {
        input.style.display = 'block';
        yes_input.forEach(function (option) {
            option.removeAttribute('disabled');
        });
    }
    else {
        input.style.display = 'none';
        yes_input.forEach(function (option) {
            option.setAttribute('disabled', 'disabled');
        });
    }
}
function toggleInputSubmit() {
    var input = document.querySelector('.Macros');
    input.style.display = 'block';
    var calories = input.querySelector('.Calories');
    calories.textContent = 'Calories: ' + count.get_calories();
    var p = input.querySelector('.Protein');
    p.textContent = "Protein: ".concat(count.get_protein(), " calories with ").concat(count.get_macros('protein'), " grams of protein");
    var c = input.querySelector('.Carbs');
    c.textContent = "Carbs: ".concat(count.get_carbs(), " calories with ").concat(count.get_macros('carbs'), " grams of carbs");
    var f = input.querySelector('.Fats');
    f.textContent = "Fats: ".concat(count.get_fats(), " calories with ").concat(count.get_macros('fats'), " grams of fat");
}
function submitForm() {
    var formData = {
        name: count.get_name(),
        email: count.get_email(),
        calories: count.get_calories(),
        protein: count.get_macros('protein'),
        carbs: count.get_macros('carbs'),
        fats: count.get_macros('fats')
    };
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(function (response) {
        if (response.ok) {
            toggleInputSubmit();
        }
        else {
            console.error('Failed to submit form');
        }
    })
        .catch(function (error) {
        console.error('Error submitting form:', error);
    });
}
