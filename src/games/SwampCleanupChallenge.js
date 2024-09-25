import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Spa, LocalFlorist, Grass, Waves,
  Pets, EmojiPeople, Castle, Flag,
  AccessibilityNew, Fastfood, CakeOutlined, ShoppingCart
} from '@mui/icons-material';
import { green, red } from '@mui/material/colors';

const SwipeArea = styled(Box)(({ theme }) => ({
  height: '60vh',
  overflowY: 'hidden',
  position: 'relative',
  backgroundColor: '#2f4f4f',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
}));

const ItemCard = styled(Card)(({ theme }) => ({
  position: 'absolute',
  width: '80%',
  left: '10%',
  transition: 'transform 0.5s ease-out',
}));

const swampItems = [
  { icon: <Spa />, name: "Ogre-sized mudpath", belongs: true, description: "Shrek's red carpet" },
  { icon: <LocalFlorist />, name: "Swamp rat", belongs: true, description: "Fiona's little helper" },
  { icon: <Grass />, name: "Donkey's shedding", belongs: true, description: "Free fertilizer!" },
  { icon: <Waves />, name: "Slug slime", belongs: true, description: "Nature's hair gel" },
  { icon: <Pets />, name: "Dragon's scale", belongs: true, description: "Donkey's wedding souvenir" },
  { icon: <EmojiPeople />, name: "Fairy godmother", belongs: false, description: "No magic allowed here!" },
  { icon: <Castle />, name: "Lord Farquaad's crown", belongs: false, description: "Too short for this swamp" },
  { icon: <Flag />, name: "DuLoc flag", belongs: false, description: "Not in my backyard!" },
  { icon: <AccessibilityNew />, name: "Prince Charming's hair gel", belongs: false, description: "Too fancy for this mud" },
  { icon: <Fastfood />, name: "Puss in Boots' catnip", belongs: false, description: "No felines allowed" },
  { icon: <CakeOutlined />, name: "Gingy", belongs: false, description: "Run, run as fast as you can!" },
  { icon: <ShoppingCart />, name: "Donkey's waffle cart", belongs: false, description: "Business venture gone wrong" },
];

const SwampCleanupChallenge = () => {
  const [currentItem, setCurrentItem] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);

  useEffect(() => {
    if (!gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setGameOver(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameOver]);

  useEffect(() => {
    if (!gameOver && !currentItem) {
      setCurrentItem(swampItems[Math.floor(Math.random() * swampItems.length)]);
    }
  }, [currentItem, gameOver]);

  const handleSwipe = (belongs) => {
    if (gameOver) return;

    setSwipeDirection(belongs ? 'right' : 'left');
    
    setTimeout(() => {
      if (belongs === currentItem.belongs) {
        setScore((prevScore) => prevScore + 10);
      } else {
        setScore((prevScore) => Math.max(0, prevScore - 5));
      }
      setCurrentItem(null);
      setSwipeDirection(null);
    }, 500);
  };

  const restartGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setCurrentItem(null);
  };

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h4" gutterBottom>Shrek's Swamp Cleanup</Typography>
      <Typography variant="h6">Score: {score}</Typography>
      <Typography variant="h6">Time Left: {timeLeft}s</Typography>

      <SwipeArea>
        {currentItem && (
          <ItemCard 
            sx={{ 
              transform: swipeDirection === 'left' 
                ? 'translateX(-150%) rotate(-30deg)' 
                : swipeDirection === 'right'
                ? 'translateX(150%) rotate(30deg)'
                : 'none'
            }}
          >
            <CardContent>
              <IconButton size="large" color="primary">
                {currentItem.icon}
              </IconButton>
              <Typography variant="h6">{currentItem.name}</Typography>
              <Typography variant="body2">{currentItem.description}</Typography>
            </CardContent>
          </ItemCard>
        )}
      </SwipeArea>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            fullWidth 
            onClick={() => handleSwipe(false)}
            sx={{ backgroundColor: red[500], '&:hover': { backgroundColor: red[700] } }}
          >
            Get Out of My Swamp!
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            fullWidth 
            onClick={() => handleSwipe(true)}
            sx={{ backgroundColor: green[500], '&:hover': { backgroundColor: green[700] } }}
          >
            Keep in Swamp
          </Button>
        </Grid>
      </Grid>

      {gameOver && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5">Game Over!</Typography>
          <Typography variant="h6">Final Score: {score}</Typography>
          <Button variant="contained" onClick={restartGame} sx={{ mt: 2 }}>
            Play Again
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SwampCleanupChallenge;