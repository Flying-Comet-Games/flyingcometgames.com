import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@mui/material';
import { COLORS } from './types';

const MatchEffect = ({ points }) => (
  <motion.div
    initial={{ opacity: 1, y: 0, scale: 1 }}
    animate={{ opacity: 0, y: -50, scale: 1.5 }}
    exit={{ opacity: 0 }}
    className="absolute text-2xl font-bold text-[#FF6B6B] pointer-events-none"
    transition={{ duration: 0.5 }}
  >
    +{points}
  </motion.div>
);

const AnimatedTile = ({
  tile,
  isSelected,
  isPotentialMatch,
  onTileClick,
  row,
  col,
  fallDistance,
  isMatched,
  points
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          scale: 0,
          y: fallDistance ? -fallDistance * 100 : 0
        }}
        animate={{
          scale: isSelected ? 1.1 : 1,
          y: 0,
          rotate: isMatched ? [0, 10, -10, 0] : 0,
          boxShadow: isPotentialMatch ? '0 0 15px rgba(123, 167, 188, 0.8)' : 'none'
        }}
        exit={{
          scale: isMatched ? 1.2 : 0,
          opacity: 0,
          transition: { duration: 0.2 }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          y: { type: "spring", stiffness: 200, damping: 20, delay: col * 0.05 }
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Button
          onClick={() => onTileClick(row, col)}
          sx={{
            width: "100%",
            height: "100%",
            minWidth: "unset",
            p: 0,
            backgroundColor: isSelected ? COLORS.accent : "white",
            position: "relative",
            border: "1px solid rgba(0,0,0,0.1)",
            "&:hover": {
              backgroundColor: isSelected ? COLORS.accent : COLORS.background,
            },
            overflow: "visible",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5
          }}
        >
          {tile && (
            <>
              <span style={{ fontSize: "clamp(1rem, 4vw, 1.2rem)", lineHeight: 1 }}>
                {tile.symbol}
              </span>
              <span style={{
                fontSize: "clamp(0.8rem, 3.5vw, 0.9rem)",
                fontWeight: "bold",
                lineHeight: 1
              }}>
                {tile.value === "wild" ? "★" : tile.value}
              </span>
            </>
          )}
          {isMatched && points && <MatchEffect points={points} />}
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedTile;