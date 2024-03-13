// Inputs Variables
const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');

// Arrow Variable
const arrow = document.querySelector('.arrow');

// Result Span Variables
const yearRes = document.querySelector('.y-res');
const monthRes = document.querySelector('.m-res');
const dayRes = document.querySelector('.d-res');

// Current Date Variables
const currentYear = new Date().getFullYear();
const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth() + 1;

// Function Submit
function submit() {
    const dayValue = parseInt(day.value.trim());
    const monthValue = parseInt(month.value.trim());
    const yearValue = parseInt(year.value.trim());

    // If the value of input is not a number
    if (isNaN(dayValue) || isNaN(monthValue) || isNaN(yearValue)) {
        setError(day, 'Must be a valid date');
        setError(month, '');
        setError(year, '');
    // If the value is empty
    } else if (dayValue === '' || monthValue === '' || yearValue === '') { 
        setError(day, 'This field is required')
        setError(month, 'This field is required')
        setError(year, 'This field is required')
    } else {
        calculate();
    }
}

// Function Calculate
function calculate() {
    // Variables 
    const dayValue = parseInt(day.value.trim());
    const monthValue = parseInt(month.value.trim());
    const yearValue = parseInt(year.value.trim());
    const isValidDay = isValidDayOfMonth(yearValue, monthValue, dayValue);

    // Check if day is Valid
    if (!isValidDay || dayValue < 1 || dayValue > 31) {
        setError(day, 'Must be a valid day')
        setError(month, '')
        setError(year, '')
        return;
    } else {
        setSuccess(day);
    }

    // Check if Month is Valid
   if (monthValue < 1 || monthValue > 12) {
        setError(month, 'Must be a valid month')
        return;
    } else {
        setSuccess(month);
    }

    // Check if Year is Valid
    if (yearValue > currentYear) {
        setError(year, 'Must be in the past')
        return;
    } else {
        setSuccess(year);
    } 

    // Calculation
    let diffYears = currentYear - yearValue;
    let diffMonths = currentMonth - monthValue;
    let diffDays = currentDay - dayValue;

    // If the birthday didn't occur yet
    if (diffMonths < 0 || (diffMonths === 0 && diffDays < 0)) {
        diffYears--;
        // Adjust the month, if the current month is lesser than the value on the input
        diffMonths = (12 - monthValue) + currentMonth;
    } else {
        // Calculate normally
        diffMonths;
    }

    // Adjust the days
    if (diffDays < 0) {
        const daysInMonth = daysInMonthOfYear(currentYear, currentMonth);
        diffDays = daysInMonth + diffDays;
        diffMonths--;
    }

    // Show the results
    yearRes.innerText = diffYears;
    monthRes.innerText = Math.abs(diffMonths);
    dayRes.innerText = Math.abs(diffDays);

    // Check if day is valid
    function isValidDayOfMonth(yearI, monthI, dayI) {
        const daysInMonth = daysInMonthOfYear(yearI, monthI);
        if (dayI >= 1 && dayI <= daysInMonth) {
            return true;
        } else {
            return false;
        }
    }

    // Obtain the correct number os days of each month/year
    function daysInMonthOfYear(year, month) {
        switch (month) {
            case 1: // January
            case 3: // March
            case 5: // May
            case 7: // July
            case 8: // August
            case 10: // October
            case 12: // December
                return 31;
            case 4: // April
            case 6: // June
            case 9: // September
            case 11: // November
                return 30;
            case 2: // February
                if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                    return 29; // Leap Year
                } else {
                    return 28;
                }
            default:
                return -1;
        }
    }
}


// Set Error
function setError(input, message) {
    const inputControl = input.parentElement;
    const displayError = inputControl.querySelector('.error-msg');

    displayError.innerText = message;
    inputControl.className = 'input-control error'
}

// Set Success
function setSuccess(input) {
    const inputControl = input.parentElement;
    inputControl.className = 'input-control success'
}