# Flying Comet Games - Internal Development

## 🎮 Game Architecture

Each game follows a standard structure:
- Contained in its own component file
- Uses shared analytics tracking
- Implements consistent state management pattern
- Material-UI theme integration

### Game Components Structure
```
games/
├── ColorFlood.js        - Color flooding strategy game
├── StartupSpeedrun.js   - Resource management simulation
├── ColorDash.js         - Color/shape matching reaction game
├── AvoidBlocks.js       - Arcade-style avoidance game
└── EmojiQuest.js        - Grid-based puzzle adventure
```

## 🔧 Core Dependencies

```json
{
  "react": "^17.0.2",
  "react-router-dom": "^6.x",
  "@mui/material": "^5.x",
  "react-ga4": "^2.x",
  "react-spring": "^9.x",
  "recharts": "^2.x"
}
```

## 🎯 Development Guidelines

### State Management
- Use `useState` for simple state
- Each game tracks:
  - Game state (playing, paused, game over)
  - Score/progress
  - User interactions
  - Timer (where applicable)

### Analytics Implementation
```javascript
// Required tracking for each game:
incrementGamesPlayed('GameName');
incrementGamesCompleted('GameName');
logEvent('Game', 'Start', 'GameName');
logEvent('Game', 'SessionTime', 'GameName', timeInSeconds);
```

### Common Game Features
1. Start/Reset functionality
2. Score tracking
3. Share capability
4. Responsive controls
5. Progress saving
6. Analytics integration

## 🚀 Quick Start

Development server:
```bash
npm start
```

Build for production:
```bash
npm run build
```

Run tests:
```bash
npm test
```

## 🎨 Theme Usage

Access theme in components:
```javascript
const theme = useTheme();
// Primary: #F93854
// Secondary: #F4F1E0
// Background: #F4F1E0
```

## 📊 Analytics Events to Implement

Each game should track:
- Game start
- Game completion
- Session time
- Score/performance
- User interactions
- Share attempts

## 🐛 Known Issues

1. ColorFlood:
   - Performance degradation on larger grid sizes
   - Mobile touch response delay

2. StartupSpeedrun:
   - Resource calculation rounding errors
   - State update race condition on rapid clicks

3. AvoidBlocks:
   - Animation frame drops on older devices
   - Collision detection edge cases

## 🔄 Development Workflow

1. Branch naming:
   - feature/game-name-feature
   - fix/game-name-issue
   - refactor/game-name-component

2. Commit messages:
   - feat(game): description
   - fix(game): description
   - refactor(game): description

3. PR Process:
   - Use PR template
   - Include analytics impact
   - Test on mobile devices
   - Performance benchmark

## 🔍 Testing Checklist

- [ ] Mobile responsiveness
- [ ] Touch controls
- [ ] Analytics events firing
- [ ] Score calculation
- [ ] Game progression
- [ ] Share functionality
- [ ] State management
- [ ] Performance metrics

## 🎮 Game-Specific Notes

### ColorFlood
- Max grid size: 10x10
- Move limit: 22
- Color palette defined in COLORS array

### StartupSpeedrun
- Base duration: 180 seconds
- Initial funding: 750k
- Resource multipliers in separate config

### EmojiQuest
- Grid size: 8x8
- Max moves calculation: BASE + (level * 5)
- Pathfinding validation on grid generation

## 📈 Performance Optimization

Key areas to monitor:
- React render cycles
- Animation frame rate
- State update batching
- Asset loading
- Touch event handling
- Memory usage

## 🔗 Internal Links

- [Design System Documentation](internal-link)
- [Analytics Dashboard](internal-link)
- [Performance Monitoring](internal-link)
- [Bug Tracking](internal-link)
- [Release Schedule](internal-link)

## 💡 Development Tips

1. Use React.memo() for heavy render components
2. Implement useCallback for event handlers
3. Batch state updates where possible
4. Profile performance regularly
5. Test on low-end devices

## 📞 Support Contacts

- Technical Issues: eden@flyingcometgames.com
- Design Questions: calli@flyingcometgames.com