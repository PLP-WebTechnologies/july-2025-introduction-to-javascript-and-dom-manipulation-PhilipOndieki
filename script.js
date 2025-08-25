
// =====================================
// PART 1: JAVASCRIPT BASICS
// Variables, Data Types, Operators, Conditionals
// =====================================

// Global variables to store application state
let tasks = [];
let taskIdCounter = 0;
let currentTheme = 'light';

// User preferences - demonstrating different data types(Object)
const userPreferences = {
    maxTasks: 50,
    defaultPriority: 3,
    autoSave: true,
    theme: 'light'
};

// Check if we have too many tasks (conditional logic)
function checkTaskLimit() {
    if (tasks.length >= userPreferences.maxTasks) {
        alert(`You've reached the maximum of ${userPreferences.maxTasks} tasks!`);
        return false;
    }
    return true;
}

// Validate user input with conditionals
function validateTaskInput(taskText, priority) {
    // Check if task text is empty or just whitespace
    if (!taskText || taskText.trim() === '') {
        alert('Please enter a valid task!');
        return false;
    }
    
    // Check priority range
    if (priority < 1 || priority > 5) {
        alert('Priority must be between 1 and 5!');
        return false;
    }
    
    return true;
}

// =====================================
// PART 2: FUNCTIONS - Heart of Reusability
// Custom functions for common tasks
// =====================================

// Function 1: Create a new task object

// Create a new function,takes a text and priority as parameter. 
// Default is 3 if priority is not input
function createTask(text, priority = 3) {  
    return {
        id: ++taskIdCounter, //increment by one 
        text: text.trim(), // remove whitespaces from text
        priority: parseInt(priority), // Converts the given priority into an integer.
        completed: false, // New tasks are marked incomplete by default.
        dateCreated: new Date().toLocaleDateString() // Creates a date string in the user’s local format.
    };
}

// Function 2: Format priority level with descriptive text
function formatPriorityLevel(priority) {
    const levels = {
        1: 'Very Low',
        2: 'Low', 
        3: 'Medium',
        4: 'High',
        5: 'Very High'
    };
    return levels[priority]; // each numeric key maps to a descriptive string. Example: levels[3] → "Medium".


}

// Function 3: Calculate task statistics
function calculateTaskStats() {
    const totalTasks = tasks.length;
    /*
    const completedTasks = tasks.filter(function(task) {
    return task.completed;
    }).length;
    */
    //  the code is the same as what is below using arrow function 
    const completedTasks = tasks.filter(task => task.completed).length;
    const highPriorityTasks = tasks.filter(task => task.priority >= 4).length;
    const pendingTasks = totalTasks - completedTasks;
    
    return {
        total: totalTasks,
        completed: completedTasks,
        pending: pendingTasks,
        highPriority: highPriorityTasks,
        // if total tasks is greater than zero perfom the operation else return 0
        completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    };
}

// Function 4: Toggle task completion status
function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        updateTaskDisplay();
        updateStats();
    }
}

// =====================================
// PART 3: LOOPS - Power of Repetition
// Using different types of loops for various tasks
// =====================================

// Loop Example 1: Using forEach to update display
function updateTaskDisplay() {
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '';
    
    // forEach loop to iterate through all tasks
    tasks.forEach(task => {
        const listItem = createTaskElement(task);
        tasksList.appendChild(listItem);
    });
}

// Loop Example 2: Using for loop to find tasks by priority
function getTasksByPriority(targetPriority) {
    const matchingTasks = [];
    
    // Traditional for loop
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].priority === targetPriority) {
            matchingTasks.push(tasks[i]);
        }
    }
    
    return matchingTasks;
}

// Loop Example 3: Using while loop for countdown animation
function animateTaskCount(targetCount, currentElement) {
    let currentCount = parseInt(currentElement.textContent) || 0;
    
    // while loop for smooth counting animation
    const countInterval = setInterval(() => {
        if (currentCount < targetCount) {
            currentCount++;
            currentElement.textContent = currentCount;
        } else if (currentCount > targetCount) {
            currentCount--;
            currentElement.textContent = currentCount;
        } else {
            clearInterval(countInterval);
        }
    }, 50);
}

// =====================================
// PART 4: DOM MANIPULATION
// Making the page interactive
// =====================================

// DOM Interaction 1: Add new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');
    
    const taskText = taskInput.value;
    const priority = priorityInput.value || userPreferences.defaultPriority;
    
    // Validate input using our custom function
    if (!validateTaskInput(taskText, priority) || !checkTaskLimit()) {
        return;
    }
    
    // Create and add the task
    const newTask = createTask(taskText, priority);
    tasks.push(newTask);
    
    // Clear input fields
    taskInput.value = '';
    priorityInput.value = '';
    
    // Update the display
    updateTaskDisplay();
    updateStats();
}

// DOM Interaction 2: Delete task
function deleteTask(taskId) {
    // Filter out the task to delete
    tasks = tasks.filter(task => task.id !== taskId);
    updateTaskDisplay();
    updateStats();
}

// DOM Interaction 3: Clear all tasks
function clearAllTasks() {
    if (tasks.length === 0) {
        alert('No tasks to clear!');
        return;
    }
    
    if (confirm('Are you sure you want to delete all tasks?')) {
        tasks = [];
        updateTaskDisplay();
        updateStats();
    }
}

// DOM Interaction 4: Toggle theme
function toggleTheme() {
    const body = document.body;
    
    if (currentTheme === 'light') {
        body.classList.add('dark-theme');
        currentTheme = 'dark';
    } else {
        body.classList.remove('dark-theme');
        currentTheme = 'light';
    }
    
    // Update button text
    const toggleBtn = document.getElementById('toggleThemeBtn');
    toggleBtn.textContent = currentTheme === 'light' ? 'Dark Mode' : 'Light Mode';
}

// DOM Interaction 5: Show detailed statistics
function showDetailedStats() {
    const statsSection = document.getElementById('detailedStats');
    const statsContent = document.getElementById('statsContent');
    
    const stats = calculateTaskStats();
    
    // Generate detailed statistics HTML
    let statsHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px;">
            <div><strong>Total Tasks:</strong> ${stats.total}</div>
            <div><strong>Completed:</strong> ${stats.completed}</div>
            <div><strong>Pending:</strong> ${stats.pending}</div>
            <div><strong>High Priority:</strong> ${stats.highPriority}</div>
            <div><strong>Completion Rate:</strong> ${stats.completionRate}%</div>
        </div>
        <h4 style="margin-top: 20px;">Tasks by Priority:</h4>
        <ul style="margin-top: 10px;">
    `;
    
    // Use a for loop to show tasks by priority level
    for (let priority = 1; priority <= 5; priority++) {
        const tasksAtLevel = getTasksByPriority(priority);
        statsHTML += `<li>Priority ${priority} (${formatPriorityLevel(priority)}): ${tasksAtLevel.length} tasks</li>`;
    }
    
    statsHTML += '</ul>';
    statsContent.innerHTML = statsHTML;
    
    // Toggle visibility
    statsSection.classList.toggle('hidden');
}

// Helper function to create task DOM elements
function createTaskElement(task) {
    const listItem = document.createElement('li');
    listItem.className = 'task-item';
    
    if (task.completed) {
        listItem.classList.add('completed');
    }
    
    if (task.priority >= 4) {
        listItem.classList.add('high-priority');
    }
    
    listItem.innerHTML = `
        <div class="task-content">
            <strong>${task.text}</strong>
            <br>
            <small>Priority: ${formatPriorityLevel(task.priority)} | Created: ${task.dateCreated}</small>
        </div>
        <div class="task-actions">
            <button class="complete-btn" onclick="toggleTaskCompletion(${task.id})">
                ${task.completed ? 'Undo' : 'Complete'}
            </button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `;
    
    return listItem;
}

// Update statistics display
function updateStats() {
    const stats = calculateTaskStats();
    
    // Animate the counter updates
    animateTaskCount(stats.total, document.getElementById('totalTasks'));
    animateTaskCount(stats.completed, document.getElementById('completedTasks'));
    animateTaskCount(stats.highPriority, document.getElementById('highPriorityTasks'));
}

// =====================================
// EVENT LISTENERS - Making it all work together
// =====================================

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up all event listeners
    document.getElementById('addTaskBtn').addEventListener('click', addTask);
    document.getElementById('clearAllBtn').addEventListener('click', clearAllTasks);
    document.getElementById('showStatsBtn').addEventListener('click', showDetailedStats);
    document.getElementById('toggleThemeBtn').addEventListener('click', toggleTheme);
    
    // Allow Enter key to add tasks
    document.getElementById('taskInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Initialize with some sample data for demonstration
    if (tasks.length === 0) {
        const sampleTasks = [
            { text: 'Complete JavaScript assignment', priority: 4 },
            { text: 'Review DOM manipulation concepts', priority: 3 },
            { text: 'Practice coding loops and functions', priority: 5 }
        ];
        
        // Use forEach loop to add sample tasks
        sampleTasks.forEach(taskData => {
            const task = createTask(taskData.text, taskData.priority);
            tasks.push(task);
        });
        
        updateTaskDisplay();
        updateStats();
    }
    
    console.log('Task Manager App Initialized Successfully!');
    console.log('Features included: Variables, Conditionals, Functions, Loops, and DOM Manipulation');
});
