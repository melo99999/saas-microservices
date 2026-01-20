import { Router } from 'express';

const router = Router();

// Placeholder for getting a list of devices
router.get('/', (req, res) => {
  res.json({ message: 'List of devices' });
});

// Placeholder for getting a device
router.get('/:id', (req, res) => {
  res.json({ message: `Device ${req.params.id} details` });
});

// Placeholder for reserving a device
router.post('/:id/reserve', (req, res) => {
    res.json({ message: `Device ${req.params.id} reserved` });
});

export default router;
