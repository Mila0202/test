document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    const totalPairs = 8; // Total number of pairs
    
    // List of image files (ensure these match your images)
    const cardImages = [
        'image1.jpg', 'image1.jpg', 'image2.jpg', 'image2.jpg', 
        'image3.jpg', 'image3.jpg', 'image4.jpg', 'image4.jpg',
        'image5.jpg', 'image5.jpg', 'image6.jpg', 'image6.jpg',
        'image7.jpg', 'image7.jpg', 'image8.jpg', 'image8.jpg'
    ];
    
    function createCard(image) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;
        card.style.backgroundImage = "url('images/card-back.jpg')"; // Back of the card
        card.addEventListener('click', flipCard);
        return card;
    }
    
    function initializeGame() {
        cards = [];
        flippedCards = [];
        matchedPairs = 0;
        status.textContent = '';
        
        // Shuffle card images
        const shuffledImages = cardImages.sort(() => Math.random() - 0.5);
        
        shuffledImages.forEach(image => {
            const card = createCard(image);
            cards.push(card);
            board.appendChild(card);
        });
    }
    
    function flipCard() {
        if (flippedCards.length === 2) return;
        
        const card = this;
        if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
        
        card.classList.add('flipped');
        card.style.backgroundImage = `url('images/${card.dataset.image}')`;
        flippedCards.push(card);
        
        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
    
    function checkForMatch() {
        const [card1, card2] = flippedCards;
        
        if (card1.dataset.image === card2.dataset.image) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            if (matchedPairs === totalPairs) {
                status.textContent = 'Congratulations! You found all pairs!';
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.style.backgroundImage = "url('images/card-back.jpg')";
                card2.style.backgroundImage = "url('images/card-back.jpg')";
            }, 1000);
        }
        
        flippedCards = [];
    }
    
    function resetGame() {
        board.innerHTML = '';
        initializeGame();
    }
    
    resetButton.addEventListener('click', resetGame);
    
    // Initialize the game when the page loads
    initializeGame();
});
