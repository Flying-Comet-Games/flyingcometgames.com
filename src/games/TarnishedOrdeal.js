import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Person, SportsKabaddi, Security, Bolt, Favorite, Star,
  LocalHospital, Build, EmojiEvents, Shield
} from '@mui/icons-material';

const GameArea = styled(Box)(({ theme }) => ({
  height: '60vh',
  position: 'relative',
  backgroundColor: '#f0f0f0',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  border: '2px solid #ccc',
}));

const enemies = [
  { name: "Godrick the Grafted", icon: <SportsKabaddi />, health: 100, damage: 15, defense: 5 },
  { name: "Malenia, Blade of Miquella", icon: <Security />, health: 120, damage: 20, defense: 7 },
  { name: "Starscourge Radahn", icon: <Star />, health: 150, damage: 25, defense: 10 },
];

const initialPlayerStats = {
  health: 100,
  attack: 10,
  defense: 5,
  specialMeter: 0,
};

const TarnishedOrdeal = () => {
  const [playerStats, setPlayerStats] = useState(initialPlayerStats);
  const [currentEnemy, setCurrentEnemy] = useState(null);
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [story, setStory] = useState('');

  useEffect(() => {
    if (!gameOver && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      endRound();
    }
  }, [timeLeft, gameOver]);

  useEffect(() => {
    if (!currentEnemy && !gameOver) {
      const enemy = {...enemies[Math.floor(Math.random() * enemies.length)]};
      setCurrentEnemy({...enemy, maxHealth: enemy.health});
      setStory(`A wild ${enemy.name} appears! Prepare for battle, Tarnished one!`);
    }
  }, [currentEnemy, gameOver]);

  const attack = () => {
    if (gameOver || !currentEnemy) return;
    const enemyDefense = currentEnemy.defense || 0;  // Ensure defense is defined
    const damage = Math.max(1, playerStats.attack - Math.floor(enemyDefense / 2));
    setCurrentEnemy(e => ({...e, health: Math.max(0, e.health - damage)}));
    setPlayerStats(p => ({...p, specialMeter: Math.min(100, p.specialMeter + 10)}));
    takeDamage();
    checkEnemyDefeated();
  };

  const defend = () => {
    if (gameOver || !currentEnemy) return;
    setPlayerStats(p => ({...p, defense: p.defense + 2, specialMeter: Math.min(100, p.specialMeter + 15)}));
    setStory("You raise your shield, bracing for the enemy's attack.");
    takeDamage(0.5);
  };

  const useSpecial = () => {
    if (gameOver || playerStats.specialMeter < 100 || !currentEnemy) return;
    const damage = playerStats.attack * 2;
    setCurrentEnemy(e => ({...e, health: Math.max(0, e.health - damage)}));
    setPlayerStats(p => ({...p, specialMeter: 0}));
    setStory("You unleash a devastating special attack!");
    checkEnemyDefeated();
  };

  const takeDamage = (multiplier = 1) => {
    if (!currentEnemy) return;
    const damage = Math.max(1, Math.floor((currentEnemy.damage - playerStats.defense / 2) * multiplier));
    setPlayerStats(p => ({...p, health: Math.max(0, p.health - damage)}));
    if (playerStats.health - damage <= 0) {
      setGameOver(true);
      setStory("You have fallen in battle. The Lands Between remain in darkness.");
    }
  };

  const checkEnemyDefeated = () => {
    if (currentEnemy && currentEnemy.health <= 0) {
      setStory(`You have defeated ${currentEnemy.name}! Glory to the Tarnished!`);
      setCurrentEnemy(null);
      setShowUpgrade(true);
    }
  };

  const endRound = () => {
    setRound(r => r + 1);
    setTimeLeft(60);
    setCurrentEnemy(null);
    setShowUpgrade(true);
  };

  const upgrade = (stat) => {
    setPlayerStats(p => ({...p, [stat]: p[stat] + 5}));
    setShowUpgrade(false);
    if (round % 3 === 0) {
      setStory("As you grow stronger, you feel the call of the Elden Ring growing louder...");
    }
  };

  const restartGame = () => {
    setPlayerStats(initialPlayerStats);
    setCurrentEnemy(null);
    setRound(1);
    setTimeLeft(60);
    setGameOver(false);
    setShowUpgrade(false);
    setStory("You awaken once more in the Lands Between. Your quest begins anew.");
  };

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h4" gutterBottom>Tarnished's Ordeal</Typography>
      <Typography variant="h6">Round: {round} | Time Left: {timeLeft}s</Typography>

      <GameArea>
        <Box>
          <Typography variant="h6">Tarnished</Typography>
          <LinearProgress variant="determinate" value={(playerStats.health / initialPlayerStats.health) * 100} sx={{ mb: 1 }} />
          <Typography>Health: {playerStats.health}</Typography>
          <LinearProgress variant="determinate" value={playerStats.specialMeter} color="secondary" sx={{ mb: 1 }} />
          <Typography>Special: {playerStats.specialMeter}%</Typography>
        </Box>

        {currentEnemy && (
          <Box>
            <Typography variant="h6">{currentEnemy.name}</Typography>
            <LinearProgress variant="determinate" value={(currentEnemy.health / currentEnemy.maxHealth) * 100} color="error" />
            <Typography>Health: {currentEnemy.health}</Typography>
          </Box>
        )}

        <Typography variant="body2" sx={{ my: 2, minHeight: '3em' }}>{story}</Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Button variant="contained" onClick={attack} disabled={gameOver} fullWidth>
              Attack <Person />
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={defend} disabled={gameOver} fullWidth>
              Defend <Security />
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={useSpecial} disabled={gameOver || playerStats.specialMeter < 100} fullWidth>
              Special <Bolt />
            </Button>
          </Grid>
        </Grid>
      </GameArea>

      {gameOver && (
        <Button variant="contained" onClick={restartGame} sx={{ mt: 2 }}>
          Rise Again, Tarnished
        </Button>
      )}

      <Dialog open={showUpgrade}>
        <DialogTitle>Choose Your Upgrade</DialogTitle>
        <DialogContent>
          <Typography>As you absorb the power of your fallen foe, you feel strength coursing through you. Choose wisely, Tarnished one.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => upgrade('health')}><Favorite /> Health</Button>
          <Button onClick={() => upgrade('attack')}><Build /> Attack</Button>
          <Button onClick={() => upgrade('defense')}><Shield /> Defense</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TarnishedOrdeal;
