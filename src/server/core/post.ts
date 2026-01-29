import { reddit, context } from '@devvit/web/server';

/**
 * Creates a new SnapMatch game post
 */
export const createPost = async () => {
  const subredditName = context.subredditName ?? 'snapmatch_dev';

  return await reddit.submitCustomPost({
    title: 'SnapMatch - Daily Puzzle',
    subredditName: subredditName,
  });
};
