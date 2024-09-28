import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper, Button, LinearProgress, Tooltip, CircularProgress } from '@mui/material';
import { Scale, Plus, Minus, Truck, AlertTriangle } from 'lucide-react';
import { TILT_LEVELS, PACKAGE_TYPES, WEIGHT_INTERVAL, getTiltColor, bounceAnimation, shakeAnimation, dropAnimation, creakingAnimation } from './gameUtils';

const REMOVAL_COOLDOWN = 3000; // 3 seconds cooldown
const MAX_REMOVALS = 3;
const REMOVAL_REPLENISH_INTERVAL = 10000; // 10 seconds to replenish one removal
const MAX_PACKAGES_PER_SIDE = 8; // Maximum number of packages per side

const PackageBalanceGame = () => {
  const [leftPackages, setLeftPackages] = useState([]);
  const [rightPackages, setRightPackages] = useState([]);
  const [tilt, setTilt] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [warningFlash, setWarningFlash] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [gameSpeed, setGameSpeed] = useState(1);
  const [removalsLeft, setRemovalsLeft] = useState(MAX_REMOVALS);
  const [lastRemovalTime, setLastRemovalTime] = useState(0);
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const gameSpeedRef = useRef(1);
  const removalTimerRef = useRef(null);

  useEffect(() => {
    if (!gameStarted) return;

    const addPackage = () => {
      const side = Math.random() < 0.5 ? 'left' : 'right';
      const packageType = Object.keys(PACKAGE_TYPES)[Math.floor(Math.random() * 3)];
      const newPackage = {
        id: Date.now(),
        ...PACKAGE_TYPES[packageType]
      };

      if (side === 'left' && leftPackages.length < MAX_PACKAGES_PER_SIDE) {
        setLeftPackages(prev => [...prev, newPackage]);
      } else if (side === 'right' && rightPackages.length < MAX_PACKAGES_PER_SIDE) {
        setRightPackages(prev => [...prev, newPackage]);
      }
    };

    const intervalId = setInterval(() => {
      addPackage();
      gameSpeedRef.current = Math.min(gameSpeedRef.current + 0.1, 3);
      setGameSpeed(gameSpeedRef.current);
    }, WEIGHT_INTERVAL / gameSpeed);

    const replenishInterval = setInterval(() => {
      setRemovalsLeft(prev => Math.min(prev + 1, MAX_REMOVALS));
    }, REMOVAL_REPLENISH_INTERVAL);

    const animate = (time) => {
      if (previousTimeRef.current != undefined) {
        const deltaTime = time - previousTimeRef.current;

        const leftTotal = leftPackages.reduce((sum, p) => sum + p.value, 0);
        const rightTotal = rightPackages.reduce((sum, p) => sum + p.value, 0);

        const weightDiff = leftTotal - rightTotal;
        const newTilt = Math.atan2(weightDiff, 150) * (180 / Math.PI); // Adjusted for more realistic tilting
        setTilt(newTilt);

        if (Math.abs(newTilt) < TILT_LEVELS.SAFE) {
          setScore(prev => prev + deltaTime * 0.01 * gameSpeed);
        }

        if (Math.abs(newTilt) >= TILT_LEVELS.WARNING) {
          setWarningFlash(true);
          setTimeout(() => setWarningFlash(false), 500 / gameSpeed);
        }

        if (Math.abs(newTilt) >= TILT_LEVELS.GAME_OVER) {
          setGameOver(true);
          setGameStarted(false);
          clearInterval(intervalId);
          clearInterval(replenishInterval);
        }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestRef.current);
      clearInterval(intervalId);
      clearInterval(replenishInterval);
    };
  }, [leftPackages, rightPackages, gameStarted, gameSpeed]);

  const handlePackageAction = (side, action) => {
    if (gameOver) return;
    if (action === 'remove') {
      const currentTime = Date.now();
      if (removalsLeft > 0 && currentTime - lastRemovalTime >= REMOVAL_COOLDOWN) {
        if (side === 'left' && leftPackages.length > 0) {
          setLeftPackages(prev => prev.slice(0, -1));
          updateRemovalState();
        } else if (side === 'right' && rightPackages.length > 0) {
          setRightPackages(prev => prev.slice(0, -1));
          updateRemovalState();
        }
      }
    } else if (action === 'add') {
      const packageType = Object.keys(PACKAGE_TYPES)[Math.floor(Math.random() * 3)];
      const newPackage = {
        id: Date.now(),
        ...PACKAGE_TYPES[packageType]
      };
      if (side === 'left' && leftPackages.length < MAX_PACKAGES_PER_SIDE) {
        setLeftPackages(prev => [...prev, newPackage]);
      } else if (side === 'right' && rightPackages.length < MAX_PACKAGES_PER_SIDE) {
        setRightPackages(prev => [...prev, newPackage]);
      }
    }
  };

  const updateRemovalState = () => {
    setRemovalsLeft(prev => prev - 1);
    setLastRemovalTime(Date.now());
    if (removalTimerRef.current) clearTimeout(removalTimerRef.current);
    removalTimerRef.current = setTimeout(() => {
      setLastRemovalTime(0);
    }, REMOVAL_COOLDOWN);
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLeftPackages([]);
    setRightPackages([]);
    setTilt(0);
    setShowInstructions(false);
    gameSpeedRef.current = 1;
    setGameSpeed(1);
    setRemovalsLeft(MAX_REMOVALS);
    setLastRemovalTime(0);
  };

  const renderPackage = (pkg, index, side, totalPackages) => (
    <Tooltip title={`${pkg.label} Delivery: Weight ${pkg.value}`} arrow placement="top">
      <Box
        key={pkg.id}
        sx={{
          position: 'absolute',
          bottom: `${(index / totalPackages) * 100}%`,
          width: '80%',
          height: `${(1 / totalPackages) * 100}%`,
          maxHeight: `${pkg.height}px`,
          left: '10%',
          bgcolor: pkg.color,
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1rem',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease-out',
          animation: `${dropAnimation} ${0.5 / gameSpeed}s ease-out`,
          transform: `translateY(${tilt * (side === 'left' ? -1 : 1) * 0.5}px)`,
          '&::before': {
            content: `"${pkg.icon}"`,
            marginRight: '5px',
            fontSize: '1.2rem'
          }
        }}
      >
        {pkg.value}
      </Box>
    </Tooltip>
  );

  const renderRemovalButton = (side) => {
    const currentTime = Date.now();
    const cooldownProgress = Math.min((currentTime - lastRemovalTime) / REMOVAL_COOLDOWN * 100, 100);
    const disabled = removalsLeft === 0 || cooldownProgress < 100;

    return (
      <Tooltip title={disabled ? "Removal on cooldown" : "Remove Package"} arrow>
        <Box sx={{ position: 'relative' }}>
          <Button
            onClick={() => handlePackageAction(side, 'remove')}
            sx={{ minWidth: 'auto', p: 1 }}
            disabled={disabled}
          >
            <Minus size={24} />
          </Button>
          {disabled && cooldownProgress < 100 && (
            <CircularProgress
              variant="determinate"
              value={cooldownProgress}
              size={36}
              thickness={4}
              sx={{
                position: 'absolute',
                top: -4,
                left: -4,
                color: 'primary.main'
              }}
            />
          )}
        </Box>
      </Tooltip>
    );
  };

  return (
    <Box sx={{
      textAlign: 'center',
      py: 2,
      maxWidth: 600,
      margin: 'auto',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      backgroundImage: `url('/api/placeholder/600/400')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'overlay'
    }}>
      <Typography variant="h4" sx={{ mb: 2, color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Truck size={32} style={{ marginRight: '10px' }} /> Package Balance
      </Typography>

      {showInstructions && (
        <Paper elevation={3} sx={{ p: 2, mb: 2, bgcolor: 'rgba(255,255,255,0.9)' }}>
          <Typography variant="body1">
            Balance the packages on both sides. Click + to add a package, - to remove. Don't let it tilt too much!
          </Typography>
          <Button variant="contained" onClick={() => setShowInstructions(false)} sx={{ mt: 2 }}>
            Got it!
          </Button>
        </Paper>
      )}

      {gameStarted && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          padding: '10px 20px',
          bgcolor: 'rgba(255,255,255,0.8)',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Score:</Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              animation: `${bounceAnimation} 0.5s ease-out`
            }}
          >
            {Math.floor(score)}
          </Typography>
        </Box>
      )}

      {!gameStarted && !gameOver && (
        <Button
          variant="contained"
          onClick={startGame}
          sx={{
            mb: 2,
            fontSize: '1.2rem',
            padding: '10px 20px',
            borderRadius: '25px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
            }
          }}
        >
          Start Delivery
        </Button>
      )}

      {gameStarted && (
        <Box sx={{ position: 'relative', height: 350, mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={Math.min(Math.abs(tilt) / TILT_LEVELS.GAME_OVER * 100, 100)}
            sx={{
              mb: 2,
              height: 15,
              borderRadius: 10,
              bgcolor: 'rgba(255,255,255,0.5)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: getTiltColor(tilt),
                transition: 'all 0.3s ease-out'
              }
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 20,
              left: '50%',
              transform: `translateX(-50%) rotate(${tilt}deg)`,
              width: 400,
              height: 15,
              bgcolor: 'grey.700',
              borderRadius: '10px',
              transition: 'transform 0.1s ease-out',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              animation: warningFlash ? `${shakeAnimation} ${0.5 / gameSpeed}s ease-in-out` : 'none'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 60,
              height: 120,
              bgcolor: 'primary.main',
              borderRadius: '30px 30px 0 0',
              boxShadow: '0 -4px 8px rgba(0,0,0,0.2)',
              animation: Math.abs(tilt) > TILT_LEVELS.WARNING ? `${creakingAnimation} 0.5s ease-in-out infinite` : 'none',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                bgcolor: Math.abs(tilt) > TILT_LEVELS.WARNING ? 'rgba(231,76,60,0.7)' : 'rgba(255,255,255,0.2)',
                transition: 'background-color 0.3s ease-out'
              }
            }}
          />
<Typography variant="body2" sx={{ mt: 2 }}>
            Removals left: {removalsLeft}
          </Typography>
          {['left', 'right'].map(side => (
            <Paper
              key={side}
              elevation={3}
              sx={{
                position: 'absolute',
                bottom: 35,
                [side]: `calc(50% - 220px)`,
                width: 200,
                height: 250,
                bgcolor: warningFlash ? 'rgba(231,76,60,0.1)' : 'rgba(255,255,255,0.1)',
                overflow: 'hidden',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                p: 1,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                backgroundColor: 'rgba(255,255,255,0.8)'
              }}>
                <Tooltip title="Add Package" arrow>
                  <Button
                    onClick={() => handlePackageAction(side, 'add')}
                    sx={{ minWidth: 'auto', p: 1 }}
                    disabled={(side === 'left' ? leftPackages : rightPackages).length >= MAX_PACKAGES_PER_SIDE}
                  >
                    <Plus size={24} />
                  </Button>
                </Tooltip>
                {renderRemovalButton(side)}
              </Box>
              <Box sx={{ height: '100%', position: 'relative', paddingTop: '40px' }}>
                {(side === 'left' ? leftPackages : rightPackages).map((pkg, index, array) =>
                  renderPackage(pkg, index, side, array.length)
                )}
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      {gameOver && (
        <Box sx={{
          bgcolor: 'rgba(255,255,255,0.9)',
          p: 4,
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
        }}>
          <Typography variant="h5" color="error" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={32} style={{ marginRight: '10px' }} /> Game Over!
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Your final score: {Math.floor(score)}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            The packages tipped over! Better luck balancing next time.
          </Typography>
          <Button
            variant="contained"
            onClick={startGame}
            sx={{
              fontSize: '1.1rem',
              padding: '10px 20px',
              borderRadius: '25px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
              }
            }}
          >
            Try Again
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PackageBalanceGame;