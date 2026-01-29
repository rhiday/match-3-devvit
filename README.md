# SnapMatch

**A competitive match-3 puzzle game for Reddit** - powered by Devvit

---

## 🎮 For Players

### What is SnapMatch?

SnapMatch is a fast-paced match-3 puzzle game where you compete against other Reddit users for the highest daily score. Like Wordle, everyone plays the same puzzle each day - but can you get the top score?

### How to Play
1. **Tap to Start** - You'll have 60 seconds
2. **Match tiles** - Click adjacent tiles to swap them and match 3+ of the same color
3. **Create combos** - Cascading matches multiply your score
4. **Beat the competition** - Climb the daily leaderboard

### Need Help or Want to Report an Issue?
- **Questions?** Post on r/SnapMatch
- **Found a bug?** [Report it on GitHub](https://github.com/yourusername/snapmatch/issues)
- **Contact:** u/YourUsername

### Legal
- [Privacy Policy](./PRIVACY.md) - How we handle your data
- [Terms of Service](./TERMS.md) - Rules and guidelines

---

## 🎮 For Developers

SnapMatch is an asynchronous multiplayer match-3 puzzle game where players compete for the highest score on daily puzzles. Like Wordle, everyone plays the same puzzle each day and competes on a global leaderboard.

### Features
- **Daily Puzzles**: Seeded board generation ensures everyone plays the same puzzle
- **60-Second Gameplay**: Fast-paced, timed matches
- **Chain Reactions**: Cascading tiles create combo multipliers
- **Global Leaderboards**: Compete with other players asynchronously
- **Personal Bests**: Track your top scores for each puzzle

## 🏗️ Tech Stack

- **Devvit**: Reddit's developer platform for immersive games
- **React 19**: Modern UI with hooks
- **TypeScript**: Full type safety
- **Tailwind CSS**: Responsive, mobile-first styling
- **Redis**: Persistent leaderboards and player data
- **Vite**: Lightning-fast development and builds

## 🚀 Getting Started

### Prerequisites
- Node.js 22+
- Reddit account connected to Reddit Developers

### Installation

1. Install dependencies:
```bash
npm install
```

2. Log into Reddit Developers:
```bash
npm run login
```

3. Start development server:
```bash
npm run dev
```

This launches the game locally on Reddit with live reloading.

## 📜 Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build client and server bundles
- `npm run deploy` - Upload new app version to Reddit
- `npm run launch` - Publish app for review
- `npm run check` - Type check, lint, and format code

## 🎯 How to Play

1. Click on tiles to match 3 or more of the same color
2. Create chain reactions for bonus points
3. Race against the 60-second timer
4. Beat your opponents on the daily leaderboard

## 📊 Scoring System

- **Base Score**: Match size × 10 points
  - Match-3 = 30 points
  - Match-4 = 40 points
  - Match-5 = 50 points
- **Chain Multiplier**: Cascading matches multiply your score
  - 1st chain = ×1
  - 2nd chain = ×2
  - 3rd chain = ×3

## 🗂️ Project Structure

```
src/
├── client/          # React frontend
│   ├── components/  # UI components (GameBoard, Tile, Leaderboard)
│   └── pages/       # Main game page
├── server/          # Express backend
│   └── storage/     # Redis services (leaderboards, puzzles)
└── shared/          # Shared game logic
    ├── game/        # Core game mechanics
    └── types.ts     # TypeScript interfaces
```

## 🔧 Development

Built with [Cursor](https://cursor.com) integration for AI-assisted development.

## 📞 Contact & Support

- **Reddit**: u/YourUsername
- **Community**: r/SnapMatch
- **Issues**: [GitHub Issues](https://github.com/yourusername/snapmatch/issues)
- **Privacy**: See [PRIVACY.md](./PRIVACY.md)
- **Terms**: See [TERMS.md](./TERMS.md)

## 📝 License

BSD-3-Clause - See [LICENSE](./LICENSE) for details
