// Expense Tracking Code

// Function to handle the form input
function handleExpenseForm(event) {
    event.preventDefault();
    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = document.getElementById('expense-amount').value;
    addExpense(expenseName, expenseAmount);
}

// Function to add expense
function addExpense(name, amount) {
    const expenseList = document.getElementById('expense-list');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${name}: $${amount}`));
    expenseList.appendChild(li);
    updateChart();
}

// Chart functionality
let myChart;
function updateChart() {
    // Sample data
    const labels = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Others'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Expenses',
            data: [12, 19, 3, 5, 2], // Example data
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    const ctx = document.getElementById('myChart').getContext('2d');
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, config);
}

// Event listener to handle form submission
document.getElementById('expense-form').addEventListener('submit', handleExpenseForm);
