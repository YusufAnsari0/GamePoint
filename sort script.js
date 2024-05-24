document.addEventListener('DOMContentLoaded', () => {
    const numbersBox = document.getElementById('numbersBox');
    const result = document.getElementById('result');
    const popup = document.getElementById('popup');

    function createNumbers() {
        // Generate random numbers and shuffle them
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].sort(() => Math.random() - 0.5);
        
        // Clear the box and create number elements
        numbersBox.innerHTML = '';
        numbers.forEach(number => {
            const numberElement = document.createElement('div');
            numberElement.classList.add('number');
            numberElement.textContent = number;
            numberElement.draggable = true;
            numberElement.addEventListener('dragstart', handleDragStart);
            numberElement.addEventListener('dragover', handleDragOver);
            numberElement.addEventListener('drop', handleDrop);
            numbersBox.appendChild(numberElement);
        });
    }

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.textContent);
        e.dataTransfer.effectAllowed = 'move';
        e.target.classList.add('dragging');
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function handleDrop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        const draggingElement = document.querySelector('.dragging');
        e.target.classList.remove('dragging');
        if (e.target !== draggingElement && e.target.classList.contains('number')) {
            const draggedNumber = draggingElement.textContent;
            draggingElement.textContent = e.target.textContent;
            e.target.textContent = draggedNumber;
        }
    }

    window.checkOrder = function() {
        const numberElements = numbersBox.querySelectorAll('.number');
        let isSorted = true;
        for (let i = 0; i < numberElements.length - 1; i++) {
            if (parseInt(numberElements[i].textContent) > parseInt(numberElements[i + 1].textContent)) {
                isSorted = false;
                break;
            }
        }
        if (isSorted) {
            result.textContent = "Correct! The numbers are in order.";
            openPopup();
        } else {
            result.textContent = "Incorrect. Try again!";
        }
    };

    window.resetGame = function() {
        result.textContent = '';
        createNumbers();
    };

    window.openPopup = function() {
        popup.style.display = 'block';
    };

    window.closePopup = function() {
        popup.style.display = 'none';
    };

    // Initialize the game
    createNumbers();
});
