const express = require('express');
const app = express();

app.use(express.json());

app.post('/functions/bisectionLookup', (req, res) => {
  const { arr, target } = req.body.input;

  if (!Array.isArray(arr)) {
    return res.status(400).json({ error: 'Invalid array input. Must be an array of numbers.' });
  }

  if (typeof target !== 'number') {
    return res.status(400).json({ error: 'Invalid target input. Target must be a number.' });
  }

  const binarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) return mid;
      if (arr[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  };

  const index = binarySearch(arr, target);
  res.json({ output: index });
});

app.get('/functions/bisectionLookup', (req, res) => {
  res.json({
    name: 'bisectionLookup',
    description: 'Performs binary search on a sorted array of numbers.',
    input: {
      type: 'object',
      properties: {
        arr: {
          type: 'array',
          description: 'A sorted array of numbers.',
          example: [1, 3, 5, 7, 9]
        },
        target: {
          type: 'number',
          description: 'The value to search for in the array.',
          example: 5
        }
      },
      required: ['arr', 'target']
    },
    output: {
      type: 'object',
      properties: {
        output: {
          type: 'number',
          description: 'The index of the target in the array, or -1 if not found.',
          example: 2
        }
      },
      required: ['output']
    }
  });
});

app.listen(3000, () => {
  console.log('bisectionLookup running at http://localhost:3000');
});

