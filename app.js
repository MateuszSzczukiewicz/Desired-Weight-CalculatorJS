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

const countValue = () => {
    const initialWeight = parseFloat(calcInitial.value);
    const desiredWeight = parseFloat(calcDesired.value);
    const height = parseFloat(calcHeight.value);

    const fluctuate = initialWeight > desiredWeight ? 'lose' : 'gain';
    const goal = Math.abs(initialWeight - desiredWeight);
    const currentBMI = (initialWeight / Math.pow((height / 100), 2)).toFixed(1);
    const desiredBMI = (desiredWeight / Math.pow((height / 100), 2)).toFixed(1);

    if (calcInitial.value === calcDesired.value || calcStart.value === calcEnd.value) {
        calcArticle.textContent = 'Current and desired weight can\'t be equal, start and end date should be different'
    } else {
        calcArticle.textContent = `
            You want ${fluctuate} ${goal} kg
            Your current BMI is ${currentBMI} (Overweight)
            Your desired BMI is ${desiredBMI} (Moderately obese)
            You should gain 0.80 kg per day
            You should loose 8.00 kg per week
        `
    }
}

document.addEventListener('DOMContentLoaded', dateValue)
calcInitial.addEventListener('input', initialSpanValue)
calcDesired.addEventListener('input', desiredSpanValue)
calcHeight.addEventListener('input', heightSpanValue)
calcCount.addEventListener('click', countValue)