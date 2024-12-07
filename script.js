document.addEventListener('DOMContentLoaded', () => {
   
const gargamelSound = new Audio('sounds/boy.mp3'); 
const smurfetteSound = new Audio('sounds/girl.mp3'); 


const backgroundMusic = new Audio('sounds/loop.mp3'); 
backgroundMusic.loop = true; 
backgroundMusic.volume = 0.5; 
backgroundMusic.play(); 


const canvas = document.getElementById('flowerCanvas');
    const ctx = canvas.getContext('2d');

    
    canvas.width = 300;
    canvas.height = 300;

   
    function drawFlower() {
       
        ctx.clearRect(0, 0, canvas.width, canvas.height);

       
        ctx.fillStyle = 'green';
        ctx.fillRect(145, 150, 10, 100); // x, y, width, height

      
        ctx.beginPath();
        ctx.arc(130, 180, 15, 0, Math.PI * 2); 
        ctx.fillStyle = 'lightgreen';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(170, 180, 15, 0, Math.PI * 2); 
        ctx.fillStyle = 'lightgreen';
        ctx.fill();

        
        ctx.beginPath();
        ctx.arc(150, 130, 30, 0, Math.PI * 2); // x, y, radius
        ctx.fillStyle = 'red';
        ctx.fill();

ctx.beginPath();
ctx.arc(120, 130, 20, 0, Math.PI * 2); 
ctx.fillStyle = 'pink';
ctx.fill();

ctx.beginPath();
ctx.arc(180, 130, 20, 0, Math.PI * 2); 
ctx.fillStyle = 'pink';
ctx.fill();
}

drawFlower(); 


    const mazeElement = document.querySelector('.maze');
    const mazeSize = 10; 
    const maze = [];
    let smurfettePosition = { x: 3, y: 3 }; 
    let gargamelPosition = { x: 5, y: 5 }; 
    const housePosition = { x: 9, y: 9 }; 

    
    for (let y = 0; y < mazeSize; y++) {
        const row = [];
        for (let x = 0; x < mazeSize; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (x === smurfettePosition.x && y === smurfettePosition.y) {
                cell.classList.add('smurfette'); 
            }
            if (x === gargamelPosition.x && y === gargamelPosition.y) {
                cell.classList.add('gargamel'); 
            }
            if (x === housePosition.x && y === housePosition.y) {
                cell.classList.add('house'); 
            }
            mazeElement.appendChild(cell);
            row.push(cell);
        }
        maze.push(row);
    }

  
    const moveCharacter = (character, position, newPosition) => {
        maze[position.y][position.x].classList.remove(character);
        maze[newPosition.y][newPosition.x].classList.add(character);
    };
    
    document.addEventListener('keydown', (e) => {
        const directions = {
            ArrowUp: { x: 0, y: -1 },
            ArrowDown: { x: 0, y: 1 }, 
            ArrowLeft: { x: -1, y: 0 }, 
            ArrowRight: { x: 1, y: 0 }, 
        };
        const direction = directions[e.key];
        if (!direction) return;

        const newX = smurfettePosition.x + direction.x;
        const newY = smurfettePosition.y + direction.y;

        if (
            newX >= 0 && newY >= 0 &&
            newX < mazeSize && newY < mazeSize
        ) {
            moveCharacter('smurfette', smurfettePosition, { x: newX, y: newY });
            smurfettePosition = { x: newX, y: newY };
        
          

            if (smurfettePosition.x === housePosition.x && smurfettePosition.y === housePosition.y) {
                backgroundMusic.pause();
                smurfetteSound.play(); 
                alert('Smurfette reached the house! You win!');
                clearInterval(gargamelInterval);
            }
        }
    });

const moveGargamel = () => {
    const dx = smurfettePosition.x - gargamelPosition.x;
    const dy = smurfettePosition.y - gargamelPosition.y;

    const newX = gargamelPosition.x + (dx !== 0 ? Math.sign(dx) : 0);
    const newY = gargamelPosition.y + (dy !== 0 ? Math.sign(dy) : 0);

    moveCharacter('gargamel', gargamelPosition, { x: newX, y: newY });
    gargamelPosition = { x: newX, y: newY };
 
    if (gargamelPosition.x === smurfettePosition.x && gargamelPosition.y === smurfettePosition.y) {
        backgroundMusic.pause();
        gargamelSound.play(); 
        alert('Gargamel caught Smurfette! Game Over.');
        clearInterval(gargamelInterval);
    }
};

const gargamelInterval = setInterval(moveGargamel, 1000); 
});
