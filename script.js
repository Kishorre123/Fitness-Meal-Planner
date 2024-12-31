let navbar = document.querySelector('.header .navbar');
let menu  = document.querySelector('#menu');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}



$(document).ready(function(){

    $('.buttons').click(function(){

        $(this).addClass('active').siblings().removeClass('active');

        var filter = $(this).attr('data-filter')

        if(filter == 'all'){
            $('.diet .box').show(400);
        }
        else{
            $('.diet .box').not('.'+ filter).hide(200);
            $('.diet .box').filter('.'+ filter).show(400);
        }

    });

});


var swiper = new Swiper('.review-slider', {
    loop: true,
    grabCursor:true,
    spaceBetween:20,
    breakpoints:{
        0:{
            slidesPerView: 1,
        },
        640:{
            slidesPerView: 2,
        },
        768:{
            slidesPerView: 3,
        },
    },
});

let totalCalories = 0;

let mealData = {
    labels: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    datasets: [{
        label: 'Calories',
        data: [0, 0, 0, 0],
        backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
    }]
};

const ctx = document.getElementById('mealChart').getContext('2d');
const mealChart = new Chart(ctx, {
    type: 'bar',
    data: mealData,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

document.getElementById('add-meal-btn').onclick = function() {
    const mealName = document.getElementById('meal-name').value;
    const mealCaloriesInput = document.getElementById('meal-calories-input').value;
    const mealCalories = parseInt(mealCaloriesInput);

    if (mealName && mealCalories) {
        const mealList = document.getElementById('meal-list');
        const listItem = document.createElement('li');
        listItem.textContent = `${mealName}: ${mealCalories} kcal`;
        mealList.appendChild(listItem);

        totalCalories += mealCalories;
        document.getElementById('total-calories').innerText = totalCalories;

        if (mealName.toLowerCase().includes('breakfast')) {
            mealData.datasets[0].data[0] += mealCalories;
        } else if (mealName.toLowerCase().includes('lunch')) {
            mealData.datasets[0].data[1] += mealCalories;
        } else if (mealName.toLowerCase().includes('dinner')) {
            mealData.datasets[0].data[2] += mealCalories;
        } else {
            mealData.datasets[0].data[3] += mealCalories;
        }

        mealChart.update();

        let meals = JSON.parse(localStorage.getItem('meals')) || [];
        meals.push({ name: mealName, calories: mealCalories });
        localStorage.setItem('meals', JSON.stringify(meals));

 document.getElementById('meal-name').value = '';
        document.getElementById('meal-calories-input').value = '';
    }
};

document.getElementById('reset-meals-btn').onclick = function() {
    const mealList = document.getElementById('meal-list');
    mealList.innerHTML = ''; 

    totalCalories = 0;
    document.getElementById('total-calories').innerText = totalCalories;

    mealData.datasets[0].data = [0, 0, 0, 0];
    mealChart.update();

    localStorage.removeItem('meals');
};

document.getElementById('add-meal-btn').onclick = function() {
    const mealName = document.getElementById('meal-name').value;
    const mealCaloriesInput = document.getElementById('meal-calories-input').value;
    const mealCalories = parseInt(mealCaloriesInput);

    if (mealName && mealCalories) {
        
        const mealList = document.getElementById('meal-list');
        const listItem = document.createElement('li');
        listItem.textContent = `${mealName}: ${mealCalories} kcal`;
        mealList.appendChild(listItem);

        
        totalCalories += mealCalories;
        document.getElementById('total-calories').innerText = totalCalories;

        if (mealName.toLowerCase().includes('breakfast')) {
            mealData.datasets[0].data[0] += mealCalories; // Breakfast
        } else if (mealName.toLowerCase().includes('lunch')) {
            mealData.datasets[0].data[1] += mealCalories; // Lunch
        } else if (mealName.toLowerCase().includes('dinner')) {
            mealData.datasets[0].data[2] += mealCalories; // Dinner
        } else {
            mealData.datasets[0].data[3] += mealCalories; // Snack
        }

        mealChart.update();

 let meals = JSON.parse(localStorage.getItem('meals')) || [];
        meals.push({ name: mealName, calories: mealCalories });
        localStorage.setItem('meals', JSON.stringify(meals));

        document.getElementById('meal-name').value = '';
        document.getElementById('meal-calories-input').value = '';
    } else {
        alert("Please enter both meal name and calories.");
    }
};

window.onload = function() {
    
    let meals = JSON.parse(localStorage.getItem('meals')) || [];
    meals.forEach(meal => {
        const mealList = document.getElementById('meal-list');
        const listItem = document.createElement('li');
        listItem.textContent = `${meal.name}: ${meal.calories} kcal`;
        mealList.appendChild(listItem);

        totalCalories += meal.calories;

        if (meal.name.toLowerCase().includes('breakfast')) {
            mealData.datasets[0].data[0] += meal.calories;
        } else if (meal.name.toLowerCase().includes('lunch')) {
            mealData.datasets[0].data[1] += meal.calories;
        } else if (meal.name.toLowerCase().includes('dinner')) {
            mealData.datasets[0].data[2] += meal.calories;
        } else {
            mealData.datasets[0].data[3] += meal.calories;
        }
    });

    document.getElementById('total-calories').innerText = totalCalories;

    mealChart.update();
};

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = this[0].value;
    const email = this[1].value;
    const password = this[2].value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        alert('User  already exists. Please log in.');
    } else {
        
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! You can now log in.');
        window.location.href = 'login.html';
    }
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = this[0].value;
    const password = this[1].value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert('Login successful!');

        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password. Please try again.');
    }
});

document.getElementById('add-meal-btn').onclick = function() {
    const mealName = document.getElementById('meal-name').value;
    const mealCaloriesInput = document.getElementById('meal-calories-input').value;
    const mealCalories = parseInt(mealCaloriesInput);

    if (mealName && mealCalories) {
        
        const mealList = document.getElementById('meal-list');
        const listItem = document.createElement('li');
        listItem.textContent = `${mealName}: ${mealCalories} kcal`;
        mealList.appendChild(listItem);

        totalCalories += mealCalories;
        document.getElementById('total-calories').innerText = totalCalories;

        let meals = JSON.parse(localStorage.getItem('meals')) || [];
        meals.push({ name: mealName, calories: mealCalories });
        localStorage.setItem('meals', JSON.stringify(meals));

        document.getElementById('meal-name').value = '';
        document.getElementById('meal-calories-input').value = '';
    } else {
        alert("Please enter both meal name and calories.");
    }
};

window.onload = function() {
    let meals = JSON.parse(localStorage.getItem('meals')) || [];
    meals.forEach(meal => {
        const mealList = document.getElementById('meal-list');
        const listItem = document.createElement('li');
        listItem.textContent = `${meal.name}: ${meal.calories} kcal`;
        mealList.appendChild(listItem);
    });

    totalCalories = meals.reduce((total, meal) => total + meal.calories, 0);
    document.getElementById('total-calories').innerText = totalCalories;
};
