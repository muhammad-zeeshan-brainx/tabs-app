import { app } from '../index.js';
import { Shopify, LATEST_API_VERSION } from '@shopify/shopify-api';

import tabServices from '../services/tabServices.js';

const getAllTabs = (req, res) => {
  res.status(200).send('done');
};

const createTab = async (req, res) => {
  const session = await Shopify.Utils.loadCurrentSession(
    req,
    res,
    app.get('use-online-tokens')
  );

  try {
    const tab = await tabServices.createTab(session?.shop, req.body);
    res.status(200).send({
      status: 'success',
      message: `successully created new tab`,
      tab,
    });
  } catch (error) {
    console.log('could not save tab', error);
    res.status(500).send('error occured');
  }
};

const getTab = (req, res) => {
  res.status(200).send('done');
};

const editTab = (req, res) => {
  res.status(200).send('done');
};

const deleteTab = (req, res) => {
  res.status(200).send('done');
};

export default {
  getAllTabs,
  createTab,
  getTab,
  editTab,
  deleteTab,
};
