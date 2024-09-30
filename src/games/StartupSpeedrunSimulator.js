import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, Paper, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { Person, AttachMoney, TrendingUp, MonetizationOn, Speed } from '@mui/icons-material';

const ResourceButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '140px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const WhiteTypography = styled(Typography)({
  color: 'white',
});

const GAME_DURATION = 180; // 3 minutes in seconds
const INITIAL_FUNDING = 750000; // $750k initial funding

const StartupSpeedrunSimulator = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(GAME_DURATION);
  const [resources, setResources] = useState({
    developers: 1,
    funding: INITIAL_FUNDING,
    users: 0,
    score: 0,
  });
  const [upgrades, setUpgrades] = useState({
    devProductivity: 1,
    fundingEfficiency: 1,
    viralCoefficient: 1,
  });
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [eventMessage, setEventMessage] = useState('');

  useEffect(() => {
    let timer;
    if (gameStarted && !gameOver) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setGameOver(true);
            return 0;
          }
          return prevTime - 1;
        });

        // Passive resource generation
        setResources((prev) => ({
          ...prev,
          users: prev.users + prev.developers * upgrades.devProductivity,
          funding: prev.funding + prev.users * upgrades.fundingEfficiency * 0.1,
          score: prev.score + prev.users + prev.funding * 0.001, // Score based on users and funding
        }));

        // Check for consequences
        checkConsequences();

        // Random positive events
        if (Math.random() < 0.05) { // 5% chance each second
          handleRandomPositiveEvent();
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameOver, upgrades, resources]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setTime(GAME_DURATION);
    setResources({
      developers: 1,
      funding: INITIAL_FUNDING,
      users: 0,
      score: 0,
    });
    setUpgrades({
      devProductivity: 1,
      fundingEfficiency: 1,
      viralCoefficient: 1,
    });
    setEventMessage('');
  };

  const handleResourceClick = (resource) => {
    setResources((prev) => {
      const newResources = { ...prev };
      switch (resource) {
        case 'developers':
          if (prev.funding >= 10000) {
            newResources.developers += 1;
            newResources.funding -= 10000;
          }
          break;
        case 'funding':
          newResources.funding += 1000 * upgrades.fundingEfficiency;
          break;
        case 'users':
          if (prev.funding >= 1000) {
            newResources.users += 100 * upgrades.viralCoefficient;
            newResources.funding -= 1000;
          }
          break;
      }
      return newResources;
    });
  };

  const buyUpgrade = (upgrade) => {
    setUpgrades((prev) => ({
      ...prev,
      [upgrade]: prev[upgrade] + 1,
    }));
    setResources((prev) => ({
      ...prev,
      funding: prev.funding - 50000,
    }));
    setShowUpgradeDialog(false);
  };

  const checkConsequences = () => {
    const { developers, users, funding } = resources;

    if (developers > 10 && users < 1000) {
      setEventMessage("Too many developers without enough users! Some developers left due to lack of work.");
      setResources(prev => ({
        ...prev,
        developers: Math.max(1, prev.developers - 2),
      }));
    }

    if (funding < 100000 && developers > 5) {
      setEventMessage("Low on funds! Had to lay off some developers to cut costs.");
      setResources(prev => ({
        ...prev,
        developers: Math.max(1, prev.developers - 1),
      }));
    }

    if (users > 100000 && developers < 5) {
      setEventMessage("User growth is outpacing development capacity! Some users left due to lack of updates.");
      setResources(prev => ({
        ...prev,
        users: prev.users * 0.9,
      }));
    }
  };

  const handleRandomPositiveEvent = () => {
    const events = [
      {
        name: 'Andrew Chen Tweet',
        condition: () => true, // Always possible
        effect: () => {
          setResources(prev => ({
            ...prev,
            users: prev.users + 10000 * upgrades.viralCoefficient
          }));
          setEventMessage("Andrew Chen tweeted about your startup! Gained 10,000 users!");
        }
      },
      {
        name: 'Venture Capital Interest',
        condition: () => resources.users > 50000,
        effect: () => {
          setResources(prev => ({
            ...prev,
            funding: prev.funding + 500000
          }));
          setEventMessage("VCs are impressed with your user growth! Received $500K in funding!");
        }
      },
      {
        name: 'Tech Conference Spotlight',
        condition: () => resources.developers > 5,
        effect: () => {
          setResources(prev => ({
            ...prev,
            users: prev.users * 1.5,
            funding: prev.funding + 100000
          }));
          setEventMessage("Your startup was featured at a major tech conference! Users increased by 50% and you gained $100K in funding!");
        }
      },
      {
        name: 'Viral Product Hunt Launch',
        condition: () => resources.users > 10000 && resources.developers > 3,
        effect: () => {
          setResources(prev => ({
            ...prev,
            users: prev.users * 2,
            funding: prev.funding + 250000
          }));
          setEventMessage("Your Product Hunt launch went viral! Users doubled and you gained $250K in funding!");
        }
      }
    ];

    const possibleEvents = events.filter(event => event.condition());
    if (possibleEvents.length > 0) {
      const event = possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
      event.effect();
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toFixed(0);
  };

  return (
    <Box sx={{ maxWidth: '100%', margin: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        Startup Speedrun Simulator
      </Typography>
      
      {!gameStarted ? (
        <>
          <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
            Starting Funds: ${formatNumber(INITIAL_FUNDING)}
          </Typography>
          <Button variant="contained" onClick={startGame}>Start Game</Button>
        </>
      ) : (
        <>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Time Left: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
            </Typography>
            <LinearProgress variant="determinate" value={(time / GAME_DURATION) * 100} />
          </Box>

          <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>
            Score: {formatNumber(resources.score)}
          </Typography>

          {eventMessage && (
            <Alert severity="info" sx={{ mb: 2 }} onClose={() => setEventMessage('')}>
              {eventMessage}
            </Alert>
          )}
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ResourceButton
                variant="contained"
                color="primary"
                onClick={() => handleResourceClick('developers')}
                disabled={resources.funding < 10000}
              >
                <Person sx={{ fontSize: 40, mb: 1 }} />
                <WhiteTypography sx={{ fontSize: '0.9rem', mb: 0.5 }}>Developers: {formatNumber(resources.developers)}</WhiteTypography>
                <WhiteTypography variant="caption">Hire for $10K</WhiteTypography>
              </ResourceButton>
            </Grid>
            <Grid item xs={6}>
              <ResourceButton
                variant="contained"
                color="secondary"
                onClick={() => handleResourceClick('funding')}
              >
                <MonetizationOn sx={{ fontSize: 40, mb: 1 }} />
                <WhiteTypography sx={{ fontSize: '0.9rem', mb: 0.5 }}>Funding: ${formatNumber(resources.funding)}</WhiteTypography>
                <WhiteTypography variant="caption">Generate $1K</WhiteTypography>
              </ResourceButton>
            </Grid>
            <Grid item xs={6}>
              <ResourceButton
                variant="contained"
                color="success"
                onClick={() => handleResourceClick('users')}
                disabled={resources.funding < 1000}
              >
                <TrendingUp sx={{ fontSize: 40, mb: 1 }} />
                <WhiteTypography sx={{ fontSize: '0.9rem', mb: 0.5 }}>Users: {formatNumber(resources.users)}</WhiteTypography>
                <WhiteTypography variant="caption">Acquire 100 for $1K</WhiteTypography>
              </ResourceButton>
            </Grid>
            <Grid item xs={6}>
              <ResourceButton
                variant="contained"
                color="info"
                onClick={() => setShowUpgradeDialog(true)}
                disabled={resources.funding < 50000}
              >
                <Speed sx={{ fontSize: 40, mb: 1 }} />
                <WhiteTypography sx={{ fontSize: '0.9rem', mb: 0.5 }}>Buy Upgrades</WhiteTypography>
                <WhiteTypography variant="caption">Cost: $50K</WhiteTypography>
              </ResourceButton>
            </Grid>
          </Grid>
          
          <Dialog open={showUpgradeDialog} onClose={() => setShowUpgradeDialog(false)}>
            <DialogTitle>
              <Typography>Buy Upgrades</Typography>
            </DialogTitle>
            <DialogContent>
              <Button onClick={() => buyUpgrade('devProductivity')} fullWidth sx={{ mb: 1 }}>
                <Typography>
                  Increase Dev Productivity (Current: {upgrades.devProductivity}x)
                </Typography>
              </Button>
              <Button onClick={() => buyUpgrade('fundingEfficiency')} fullWidth sx={{ mb: 1 }}>
                <Typography>
                  Increase Funding Efficiency (Current: {upgrades.fundingEfficiency}x)
                </Typography>
              </Button>
              <Button onClick={() => buyUpgrade('viralCoefficient')} fullWidth>
                <Typography>
                  Increase Viral Coefficient (Current: {upgrades.viralCoefficient}x)
                </Typography>
              </Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowUpgradeDialog(false)}>
                <Typography>Close</Typography>
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      
      {gameOver && (
        <Paper elevation={3} sx={{ p: 2, mt: 2, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <WhiteTypography variant="h5" gutterBottom>Game Over!</WhiteTypography>
          <WhiteTypography>Final Score: {formatNumber(resources.score)}</WhiteTypography>
          <WhiteTypography>Developers: {formatNumber(resources.developers)}</WhiteTypography>
          <WhiteTypography>Funding: ${formatNumber(resources.funding)}</WhiteTypography>
          <WhiteTypography>Users: {formatNumber(resources.users)}</WhiteTypography>
          <Button variant="contained" onClick={startGame} sx={{ mt: 2 }}>
            <WhiteTypography>Play Again</WhiteTypography>
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default StartupSpeedrunSimulator;