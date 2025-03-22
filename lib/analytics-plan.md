# Pantone Color Match Game Analytics Plan

This document outlines the event tracking implemented in the Pantone Color Match game to monitor user engagement, behavior, and growth metrics.

## Implemented Event Tracking

### Session & Navigation

- `pantone_game_session_start` - Triggered when a user starts a game session
- `pantone_game_session_end` - Triggered when a user ends a game session
- `initial_mode_[classic|challenge|daily]` - Tracks which game mode users initially land on
- `navigate_to_[classic|challenge|daily]` - Tracks navigation between game modes
- `difficulty_change_[gameMode]_[difficulty]` - Tracks when users change difficulty levels

### Game Lifecycle

- `game_start_[gameMode]_[difficulty]` - Triggered when a new game starts
- `new_game_[gameMode]_[difficulty]` - Tracks when a user manually starts a new game
- `play_again_[gameMode]_[difficulty]` - Tracks when a user plays again after completing a game
- `card_flip_[gameMode]` - Tracks card interactions (first flip only to avoid excessive events)

### Game Completion

- `game_win_[gameMode]_[difficulty]` - Tracks successful game completions
- `game_loss_[gameMode]_[difficulty]_[reason]` - Tracks game losses with reason (timeout/max_moves)
- `game_complete_time_[seconds]s` - Tracks completion time metrics
- `game_complete_moves_[count]` - Tracks moves required to complete
- `daily_challenge_completed` - Tracks daily challenge completions
- `daily_challenge_attempted` - Tracks daily challenge attempts (without completion)

### Results & Sharing

- `results_view_win_[gameMode]_[difficulty]` - Tracks views of the win results modal
- `results_view_loss_[gameMode]_[difficulty]_[reason]` - Tracks views of the loss results modal
- `results_modal_dismissed` - Tracks when users dismiss the results modal
- `play_again_from_results_[gameMode]_[difficulty]` - Tracks "play again" clicks from results
- `share_results_[gameMode]_[difficulty]` - Tracks when users share their results
- `stats_reset` - Tracks when users reset their statistics

## Key Growth Metrics to Monitor

### User Engagement

1. **Session Metrics**
   - Average session duration (time between session_start and session_end)
   - Sessions per user
   - Return rate (% of users who come back to play again)

2. **Game Play Metrics**
   - Games played per session
   - Completion rate (wins / total games)
   - Distribution of game modes played
   - Distribution of difficulty levels selected
   - Win rates by game mode and difficulty

3. **Daily Challenge Metrics**
   - Daily challenge completion rate
   - Daily active users (DAU)
   - Monthly active users (MAU)
   - DAU/MAU ratio (stickiness)

### User Behavior

1. **Game Preferences**
   - Most popular game mode
   - Most popular difficulty level
   - Mode switching frequency
   - Initial mode vs subsequent mode choices

2. **Performance Metrics**
   - Average completion time by mode/difficulty
   - Average moves by mode/difficulty
   - Improvement over time (moves and time)

3. **Sharing Activity**
   - Share rate (shares / completions)
   - Most common sharing method
   - Correlation between sharing and return rate

### Growth & Retention

1. **Retention Metrics**
   - Day 1, 7, 30 retention rates
   - Churn rate by cohort
   - Relationship between game mode and retention

2. **Viral Growth**
   - K-factor (new users generated per existing user through shares)
   - Viral cycle time
   - Conversion rate from shared links

## Dashboard and Analysis Plan

1. **Daily Monitoring Dashboard**
   - Active users (DAU, WAU, MAU)
   - Game completions by mode and difficulty
   - Daily challenge completions
   - Average session time
   - Sharing activity

2. **Weekly Growth Analysis**
   - Week-over-week growth in key metrics
   - Mode/difficulty popularity trends
   - Retention cohort analysis
   - Performance metrics over time

3. **Monthly Strategic Analysis**
   - Feature impact analysis
   - User journey mapping
   - Drop-off point identification
   - A/B test planning for retention optimization

## Implementation Notes

The analytics implementation uses Simple Analytics (`saEvent` function) to track events without collecting personal user data. Events are structured in a hierarchical format that allows for easy filtering and segmentation during analysis.

Events follow the naming convention: `[action]_[object]_[context]_[details]` to ensure consistency and clarity in the data.
