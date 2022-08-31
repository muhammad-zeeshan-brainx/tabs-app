import express from 'express';
import tabsController from '../controllers/tabsController.js';

const router = express.Router();

router.get('/tabs', tabsController.getAllTabs);
router.post('/tabs/new', tabsController.createTab);
router.get('/tabs/:id', tabsController.getTab);
router.patch('/tabs/:id', tabsController.editTab);
router.delete('/tabs/:id', tabsController.deleteTab);

export default router;
