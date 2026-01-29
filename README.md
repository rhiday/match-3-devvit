# SnapMatch

**A competitive match-3 puzzle game for Reddit** - powered by Devvit

## 🎮 Game Overview

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

## 📝 License

BSD-3-Clause
