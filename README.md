# Docker Dev Tools

A tool I use for testing my Docker Swarm Visualizer.

## Deploy Stacks

Use `npm run deploy`.

Or do it manually:

- Visualizer: `docker stack deploy -c visualizer.stack.yml visualizer`
- Dev Tools: `docker stack deploy -c tools.stack.yml tools`
