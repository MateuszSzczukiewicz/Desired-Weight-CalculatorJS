const calcInitial = document.getElementById('calc-initial')
const calcInitialSpan = document.getElementById('calc-initial-span')
const calcDesired = document.getElementById('calc-desired')
const calcDesiredSpan = document.getElementById('calc-desired-span')
const calcHeight = document.getElementById('calc-height')
const calcHeightSpan = document.getElementById('calc-height-span')
const calcStart = document.getElementById('calc-start')
const calcEnd = document.getElementById('calc-end')
const calcCount = document.getElementById('calc-count')
const calcArticle = document.getElementById('calc-article')

const dateValue = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const todayDate = `${year}-${month}-${day}`;

    calcStart.value = todayDate;
    calcEnd.value = todayDate;
}

const initialSpanValue = () => {
    const value = calcInitial.value;

    calcInitialSpan.textContent = `${value} kg`
}

const desiredSpanValue = () => {
    const value = calcDesired.value;

    calcDesiredSpan.textContent = `${value} kg`
}

const heightSpanValue = () => {
    const value = calcHeight.value;

    calcHeightSpan.textContent = `${value} cm`
}

const calculateBMI = (weight, height) => {
        return (weight / Math.pow((height / 100), 2)).toFixed(1);
};

const getBMICategory = (bmi) => {
    switch (true) {
        case bmi < 18.5:
            return 'Underweight';
        case bmi < 25:
            return 'Normal weight';
        case bmi < 30:
            return 'Overweight';
        case bmi < 35:
            return 'Obese Class I';
        case bmi < 40:
            return 'Obese Class II';
        default:
            return 'Obese Class III';
    }
};

const countDays = () => {
    const startDate = new Date(calcStart.value);
    const endDate = new Date(calcEnd.value);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    return Math.round(daysDiff)
}

const countValue = () => {
    const initialWeight = parseFloat(calcInitial.value);
    const desiredWeight = parseFloat(calcDesired.value);
    const height = parseFloat(calcHeight.value);

    const fluctuate = initialWeight > desiredWeight ? 'lose' : 'gain';
    const goal = Math.abs(initialWeight - desiredWeight);
    const currentBMI = calculateBMI(initialWeight, height);
    const desiredBMI = calculateBMI(desiredWeight, height);
    const initialCategories = getBMICategory(parseFloat(currentBMI));
    const desiredCategories = getBMICategory(parseFloat(desiredBMI));
    const changePerDay = (goal / countDays()).toFixed(2);
    const changePerWeek = ((goal / countDays()) * 7).toFixed(2);

    if (calcInitial.value === calcDesired.value || calcStart.value === calcEnd.value) {
        calcArticle.textContent = 'Current and desired weight can\'t be equal, start and end date should be different'
    } else {
        calcArticle.innerHTML = `
            You want to <strong>${fluctuate}</strong> <strong>${goal} kg</strong>. <br>
            Your current BMI is <strong>${currentBMI}</strong> (${initialCategories}). <br>
            Your desired BMI is <strong>${desiredBMI}</strong> (${desiredCategories}). <br>
            You should <strong>${fluctuate} ${changePerDay} kg</strong> per day. <br>
            You should <strong>${fluctuate} ${changePerWeek} kg</strong> per week. <br>
    `;
    }
}

document.addEventListener('DOMContentLoaded', dateValue)
calcInitial.addEventListener('input', initialSpanValue)
calcDesired.addEventListener('input', desiredSpanValue)
calcHeight.addEventListener('input', heightSpanValue)
calcCount.addEventListener('click', countValue)