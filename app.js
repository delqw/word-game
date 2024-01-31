function generate() {
    const topic = document.getElementById('topic')
    const wordList = document.getElementById('wordList')
    const letterColor = document.getElementById('letterColor')
    // const wordBackgroundColor = document.getElementById('wordBackgroundColor')
    const sheetBackgroundColor = document.getElementById('sheetBackgroundColor')
    const gridSize = document.getElementById('gridSize')
    const language = document.getElementById('language')

    const topicPrint = document.getElementById('topic-print');
    topicPrint.innerHTML = topic.value
  
    const words = wordList.value.split(',').map((el) => el.trim())
  
    const wordListBox = document.getElementById('wordListBox');
    wordListBox.innerHTML = ''
  
    for (const word of words) {
       const wordItem = document.createElement('div');
       wordItem.classList.add('wordItem');
       wordItem.innerHTML = word
       wordListBox.appendChild(wordItem)
    }
  
    const wordSearchContainer = document.getElementById('wordSearchContainer');
    wordSearchContainer.innerHTML = ''
  
    const grid = []
  
    for (let i = 0; i < gridSize.value; i++) {
      grid[i] = new Array(parseInt(gridSize.value)).fill('');
    }
  
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.classList.remove('hide');
  
    wordSearchContainer.classList.remove('hide');
    wordListBox.classList.remove('hide');
  
    placeWordsInGrid(grid, words, language.value)
  
    for (let i = 0; i < gridSize.value; i++) {
      for (let j = 0; j < gridSize.value; j++) {
        if (!grid[i][j]) {
          grid[i][j] = getRandomLetter(language.value);
        }
      }
    }
    
    const table = document.createElement('table');
    for (let i = 0; i < gridSize.value; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < gridSize.value; j++) {
        const cell = document.createElement('td');
        cell.style.color = letterColor.value
        cell.style.backgroundColor = sheetBackgroundColor.value
        cell.innerText = grid[i][j];
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
  
    wordSearchContainer.appendChild(table);
  }
  
  function placeWordsInGrid(grid, words, lang) {
    for (const word of words) {
      let placed = false;
  
      while (!placed) {
        const direction = Math.floor(Math.random() * 2);
        const maxRow = direction === 0 ? grid.length : grid.length - word.length;
        const maxCol = direction === 1 ? grid[0].length : grid[0].length - word.length;
  
        const startRow = Math.floor(Math.random() * maxRow);
        const startCol = Math.floor(Math.random() * maxCol);
  
        if (canPlaceWord(grid, word, startRow, startCol, direction)) {
          for (let i = 0; i < word.length; i++) {
            const row = startRow + (direction === 1 ? i : 0);
            const col = startCol + (direction === 0 ? i : 0);
            grid[row][col] = word[i];
          }
          placed = true;
        }
      }
    }
  }
  
  function canPlaceWord(grid, word, row, col, direction) {
    for (let i = 0; i < word.length; i++) {
      const currentRow = row + (direction === 1 ? i : 0);
      const currentCol = col + (direction === 0 ? i : 0);
  
      if (grid[currentRow][currentCol] !== '') {
        return false;
      }
    }
    return true;
  }
  
  function getRandomLetter(lang) {
    const letters = {
      english: 'abcdefghijklmnopqrstuvwxyz'.split(''),
      hebrew: 'אבגדהוזחטיכלמנסעפצקרשת'.split('')
    }
  
    return letters[lang][Math.floor(Math.random() * letters[lang].length)]
  }
  
  function printWindow() {
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.classList.add('hide');

    const head = document.getElementById('head');
    head.classList.add('hide');

    const topicPrint = document.getElementById('topic-print');
    topicPrint.classList.remove('hide');

    window.print()

    downloadLink.classList.remove('hide');
    head.classList.remove('hide');
    topicPrint.classList.add('hide');
  }