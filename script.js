const API_ENDPOINTS = {
    naruto: 'https://api.jikan.moe/v4/anime/20/characters', // Naruto
    dragonBallZ: 'https://api.jikan.moe/v4/anime/813/characters', // Dragon Ball Z
    onePiece: 'https://api.jikan.moe/v4/anime/21/characters', // One Piece
  };
  
  // Fetch characters from all anime
  async function fetchAllCharacters() {
    try {
      const responses = await Promise.all([
        fetch(API_ENDPOINTS.naruto),
        fetch(API_ENDPOINTS.dragonBallZ),
        fetch(API_ENDPOINTS.onePiece),
      ]);
  
      const data = await Promise.all(responses.map((res) => res.json()));
  
      
      const allCharacters = data.flatMap((animeData) =>
        animeData.data.map((character) => ({
          name: character.character.name,
          image: character.character.images.jpg.image_url,
        }))
      );
  
      return allCharacters;
    } catch (error) {
      console.error('Error fetching characters:', error);
      return [];
    }
  }
  
  // Start the ultimate battle
  async function startBattle() {
    const battleDisplay = document.getElementById('battleDisplay');
    battleDisplay.innerHTML = '<p>Loading ultimate battle...</p>'; // Temporary loading message
  
    // Fetch all characters from the APIs
    const characters = await fetchAllCharacters();
    if (characters.length < 2) {
      alert('Not enough characters to start a battle.');
      return;
    }
  
    // Randomly select two characters
    const [character1, character2] = [
      characters[Math.floor(Math.random() * characters.length)],
      characters[Math.floor(Math.random() * characters.length)],
    ];
  
    // Ensure they are different characters
    if (character1.name === character2.name) {
      startBattle(); // Retry if same character is selected
      return;
    }
  
    // Randomly determine winner
    const winner = Math.random() > 0.5 ? character1 : character2;
    const loser = winner === character1 ? character2 : character1;
  
    // Display the battle result
    battleDisplay.innerHTML = `
      <div class="battle-images">
        <div>
          <img src="${character1.image}" alt="${character1.name}">
          <p>${character1.name}</p>
        </div>
        <div class="vs">VS</div>
        <div>
          <img src="${character2.image}" alt="${character2.name}">
          <p>${character2.name}</p>
        </div>
      </div>
      <div class="battle-result">
        <p>${winner.name} wins! ${loser.name} loses!</p>
      </div>
    `;
  }