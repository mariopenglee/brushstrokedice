# Brushstroke Dice Bot

## Running the bot

```
node .
```

## If the bot won't start (port already in use / previous process still running)

Find and kill the old process:

```
lsof -i :3000
```

This shows the PID of whatever is holding port 3000. Kill it with:

```
kill <PID>
```

Or do it in one shot:

```
kill $(lsof -t -i :3000)
```

Then run `node .` again.
