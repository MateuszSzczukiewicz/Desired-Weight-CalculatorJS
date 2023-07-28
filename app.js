// JavaScript
class DesiredWeightCalculator {
    constructor() {
        this.calcInitial = document.getElementById('calc-initial');
        this.calcInitialSpan = document.getElementById('calc-initial-span');
        this.calcDesired = document.getElementById('calc-desired');
        this.calcDesiredSpan = document.getElementById('calc-desired-span');
        this.calcHeight = document.getElementById('calc-height');
        this.calcHeightSpan = document.getElementById('calc-height-span');
        this.calcStart = document.getElementById('calc-start');
        this.calcEnd = document.getElementById('calc-end');
        this.calcCount = document.getElementById('calc-count');
        this.calcArticle = document.getElementById('calc-article');
        this.initializeCalculator();
    }

    initializeCalculator() {
        this.dateValue();
        this.calcCount.addEventListener('click', this.countValue.bind(this));
        this.calcInitial.addEventListener('input', this.initialSpanValue.bind(this));
        this.calcDesired.addEventListener('input', this.desiredSpanValue.bind(this));
        this.calcHeight.addEventListener('input', this.heightSpanValue.bind(this));
    }

    dateValue() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayDate = `${year}-${month}-${day}`;
        this.calcStart.value = todayDate;
        this.calcEnd.value = todayDate;
    }

    initialSpanValue() {
        const value = this.calcInitial.value;
        this.calcInitialSpan.textContent = `${value} kg`;
    }

    desiredSpanValue() {
        const value = this.calcDesired.value;
        this.calcDesiredSpan.textContent = `${value} kg`;
    }

    heightSpanValue() {
        const value = this.calcHeight.value;
        this.calcHeightSpan.textContent = `${value} cm`;
    }

    calculateBMI(weight, height) {
        return (weight / Math.pow(height / 100, 2)).toFixed(1);
    }

    getBMICategory(bmi) {
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
    }

    countDays() {
        const startDate = new Date(this.calcStart.value);
        const endDate = new Date(this.calcEnd.value);
        const timeDiff = endDate.getTime() - startDate.getTime();
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
        return Math.round(daysDiff);
    }

    countValue() {
        const initialWeight = parseFloat(this.calcInitial.value);
        const desiredWeight = parseFloat(this.calcDesired.value);
        const height = parseFloat(this.calcHeight.value);
        const fluctuate = initialWeight > desiredWeight ? 'lose' : 'gain';
        const goal = Math.abs(initialWeight - desiredWeight);
        const currentBMI = this.calculateBMI(initialWeight, height);
        const desiredBMI = this.calculateBMI(desiredWeight, height);
        const initialCategories = this.getBMICategory(parseFloat(currentBMI));
        const desiredCategories = this.getBMICategory(parseFloat(desiredBMI));
        const changePerDay = (goal / this.countDays()).toFixed(2);
        const changePerWeek = ((goal / this.countDays()) * 7).toFixed(2);

        if (this.calcInitial.value === this.calcDesired.value || this.calcStart.value === this.calcEnd.value) {
            this.calcArticle.textContent = "Current and desired weight can't be equal, start and end date should be different";
        } else {
            this.calcArticle.innerHTML = `
            You want to ${fluctuate} <strong>${goal} kg</strong>. <br>
            Your current BMI is <strong>${currentBMI}</strong> (${initialCategories}). <br>
            Your desired BMI is <strong>${desiredBMI}</strong> (${desiredCategories}). <br>
            You should ${fluctuate} <strong>${changePerDay} kg</strong> per day. <br>
            You should ${fluctuate} <strong>${changePerWeek} kg</strong> per week. <br>
        `;
        }
    }
}

    const calculator = new DesiredWeightCalculator();
