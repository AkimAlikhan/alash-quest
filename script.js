// Simple math equation generator
const equations = [
    { equation: "2x + 5 = 13", answer: 4 },
    { equation: "3x - 7 = 8", answer: 5 },
    { equation: "x + 9 = 15", answer: 6 },
    { equation: "4x - 3 = 17", answer: 5 },
    { equation: "2x + 8 = 20", answer: 6 },
    { equation: "5x - 2 = 23", answer: 5 },
    { equation: "x + 12 = 18", answer: 6 },
    { equation: "3x + 4 = 19", answer: 5 }
];

let currentEquation = equations[Math.floor(Math.random() * equations.length)];

// Command input functionality
document.addEventListener('DOMContentLoaded', function() {
    const commandInput = document.getElementById('commandInput');
    const terminalBody = document.querySelector('.terminal-body');
    const mathAnswer = document.getElementById('mathAnswer');
    const checkButton = document.getElementById('checkAnswer');
    const mathResult = document.getElementById('mathResult');
    const hintSection = document.getElementById('hintSection');
    
    // Set the current equation
    document.getElementById('mathEquation').textContent = currentEquation.equation;
    
    // Focus on input
    commandInput.focus();
    
    // Handle math answer check
    checkButton.addEventListener('click', function() {
        const userAnswer = parseInt(mathAnswer.value);
        
        if (userAnswer === currentEquation.answer) {
            mathResult.innerHTML = '<span class="correct">✓ Correct! Access granted...</span>';
            mathResult.className = 'correct';
            
            // Show hint after correct answer
            setTimeout(() => {
                hintSection.style.display = 'block';
                // Remove blinking class to make hint static
                const hintText = hintSection.querySelector('.blink');
                if (hintText) {
                    hintText.classList.remove('blink');
                    hintText.style.animation = 'none';
                }
                hintSection.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
            
        } else {
            mathResult.innerHTML = '<span class="incorrect">✗ Incorrect. Try again.</span>';
            mathResult.className = 'incorrect';
        }
    });
    
    // Handle Enter key in math input
    mathAnswer.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkButton.click();
        }
    });
    
    // Handle command input
    commandInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim();
            this.value = '';
            
            // Create new line for command
            const commandLine = document.createElement('div');
            commandLine.className = 'line';
            commandLine.innerHTML = `
                <span class="prompt">root@alash:~$</span> 
                <span class="command">${command}</span>
            `;
            
            // Add command line to terminal
            terminalBody.insertBefore(commandLine, commandInput.parentElement);
            
            // Process command
            processCommand(command, terminalBody, commandInput);
            
            // Scroll to bottom
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });
    
    // Add some initial typing effect
    setTimeout(() => {
        typeWriter('Welcome to the Alash Quest...', terminalBody);
    }, 500);
});

function processCommand(command, terminalBody, commandInput) {
    const output = document.createElement('div');
    output.className = 'output';
    
    switch (command.toLowerCase()) {
        case 'help':
            output.innerHTML = `
                <p>Available commands:</p>
                <p>• help - Show this help message</p>
                <p>• hint - Show the quest hint (requires solving math)</p>
                <p>• search - Search for clues</p>
                <p>• console - Access developer console</p>
                <p>• clear - Clear terminal</p>
                <p>• whoami - Show current user</p>
                <p>• new_equation - Generate new math problem</p>
            `;
            break;
            
        case 'hint':
            if (document.getElementById('hintSection').style.display === 'block') {
                output.innerHTML = `
                    <p class="blink">Hint: maybe search console??</p>
                    <p>Try opening your browser's developer tools...</p>
                `;
            } else {
                output.innerHTML = `
                    <p>Access denied. Solve the math equation first.</p>
                    <p>Type 'new_equation' to get a fresh problem.</p>
                `;
            }
            break;
            
        case 'new_equation':
            currentEquation = equations[Math.floor(Math.random() * equations.length)];
            document.getElementById('mathEquation').textContent = currentEquation.equation;
            document.getElementById('mathAnswer').value = '';
            document.getElementById('mathResult').innerHTML = '';
            output.innerHTML = `
                <p>New equation generated: ${currentEquation.equation}</p>
                <p>Solve for x to unlock the hint.</p>
            `;
            break;
            
        case 'search':
            output.innerHTML = `
                <p>Searching for clues...</p>
                <p>[SEARCH] Scanning system files...</p>
                <p>[FOUND] Hidden message in console.log</p>
                <p class="glitch-text">Check the browser console for more information!</p>
            `;
            console.log('🎯 Quest Clue: The answer lies in the search console!');
            console.log('🔍 Look for hidden messages in the developer tools...');
            break;
            
        case 'console':
            output.innerHTML = `
                <p>Accessing developer console...</p>
                <p class="glitch-text">[WARNING] Console access detected!</p>
                <p>Check your browser's developer tools (F12)</p>
            `;
            console.log('🚀 Welcome to the hidden console!');
            console.log('🎮 You found the secret area!');
            console.log('🏆 Quest Status: CONSOLE DISCOVERED');
            break;
            
        case 'clear':
            const lines = terminalBody.querySelectorAll('.line, .output');
            lines.forEach(line => {
                if (!line.contains(commandInput)) {
                    line.remove();
                }
            });
            return;
            
        case 'whoami':
            output.innerHTML = `
                <p>Current user: root</p>
                <p>System: Alash Quest Terminal</p>
                <p>Status: Quest in progress...</p>
            `;
            break;
            
        case 'ls':
            output.innerHTML = `
                <p>hint.txt</p>
                <p>quest_data.log</p>
                <p>math_problems/</p>
                <p>console_secrets/</p>
            `;
            break;
            
        case 'cat quest_data.log':
            output.innerHTML = `
                <p>[LOG] Quest initialized at ${new Date().toLocaleString()}</p>
                <p>[LOG] User accessed terminal interface</p>
                <p>[LOG] Math challenge system activated</p>
                <p>[LOG] Console access available</p>
                <p class="glitch-text">[SECRET] Solve the equation to proceed...</p>
            `;
            break;
            
        default:
            if (command) {
                output.innerHTML = `
                    <p>Command not found: ${command}</p>
                    <p>Type 'help' for available commands</p>
                `;
            }
    }
    
    if (output.innerHTML) {
        terminalBody.insertBefore(output, commandInput.parentElement);
    }
    
    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function typeWriter(text, container) {
    const output = document.createElement('div');
    output.className = 'output';
    container.insertBefore(output, document.getElementById('commandInput').parentElement);
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            output.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 30);
}

// Add some console messages for the quest
console.log("Жауап: Оян, қазақ!");
console.log("Ответ: Оян, қазақ!")
// Simple right-click prevention
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    console.log('%c🚫 Right-click disabled in quest terminal!', 'color: #ff0000; font-size: 12px;');
    return false;
});