import express from 'express';
import { reddit, createServer, context, getServerPort } from '@devvit/web/server';
import { createPost } from './core/post';
import { saveGameResult, getDailyLeaderboard, getPlayerRank, isPersonalBest } from './storage/LeaderboardService';
import { getPlayerProfile, updatePlayerStats } from './storage/PlayerService';
import { getTodaysPuzzle } from './storage/PuzzleService';
import type { GameResult } from '../shared/types';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

const router = express.Router();

/**
 * Initialize game - get today's puzzle and player info
 */
router.get('/api/init', async (_req, res): Promise<void> => {
  const { postId } = context;

  if (!postId) {
    res.status(400).json({
      status: 'error',
      message: 'postId is required but missing from context',
    });
    return;
  }

  try {
    const [username, puzzle] = await Promise.all([
      reddit.getCurrentUsername(),
      getTodaysPuzzle(context),
    ]);

    const userId = context.userId ?? 'anonymous';
    const profile = await getPlayerProfile(context, userId, username ?? 'anonymous');

    res.json({
      type: 'init',
      postId,
      username: username ?? 'anonymous',
      userId,
      puzzle,
      profile,
    });
  } catch (error) {
    console.error(`API Init Error for post ${postId}:`, error);
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Initialization failed',
    });
  }
});

/**
 * Submit game score and get leaderboard
 */
router.post('/api/submit-score', async (req, res): Promise<void> => {
  const { postId, userId } = context;

  if (!postId || !userId) {
    res.status(400).json({
      status: 'error',
      message: 'postId and userId required',
    });
    return;
  }

  try {
    const { score, totalChains } = req.body as { score: number; totalChains: number };

    if (typeof score !== 'number' || typeof totalChains !== 'number') {
      res.status(400).json({
        status: 'error',
        message: 'Invalid score or totalChains',
      });
      return;
    }

    const username = await reddit.getCurrentUsername();
    const puzzle = await getTodaysPuzzle(context);
    const dateKey = puzzle.date;

    // Create game result
    const result: GameResult = {
      userId,
      username: username ?? 'anonymous',
      score,
      timestamp: Date.now(),
      boardSeed: puzzle.seed,
      totalChains,
    };

    // Save to Redis
    await saveGameResult(context, result);

    // Update player stats
    await updatePlayerStats(context, userId, score);

    // Get rank and leaderboard
    const [rank, leaderboard, personalBest] = await Promise.all([
      getPlayerRank(context, userId, dateKey),
      getDailyLeaderboard(context, dateKey, 10),
      isPersonalBest(context, userId, score),
    ]);

    res.json({
      status: 'success',
      rank,
      leaderboard,
      isPersonalBest: personalBest,
    });
  } catch (error) {
    console.error('Error submitting score:', error);
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to submit score',
    });
  }
});

/**
 * Get current leaderboard
 */
router.get('/api/leaderboard', async (_req, res): Promise<void> => {
  try {
    const puzzle = await getTodaysPuzzle(context);
    const leaderboard = await getDailyLeaderboard(context, puzzle.date, 10);

    res.json({
      status: 'success',
      leaderboard,
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch leaderboard',
    });
  }
});

/**
 * App install handler
 */
router.post('/internal/on-app-install', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();

    res.json({
      status: 'success',
      message: `Post created in subreddit ${context.subredditName} with id ${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? `Failed to create post: ${error.message}` : 'Failed to create post',
    });
  }
});

/**
 * Create post handler
 */
router.post('/internal/menu/post-create', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();

    res.json({
      navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? `Failed to create post: ${error.message}` : 'Failed to create post',
    });
  }
});


// Use router
app.use(router);

// Start server
const port = getServerPort();
const server = createServer(app);
server.on('error', (err) => console.error(`server error; ${err.stack}`));
server.listen(port);
