import { app } from '../index.js';
import { Shopify, LATEST_API_VERSION } from '@shopify/shopify-api';

import tabServices from '../services/tabServices.js';

const getAllTabs = async (req, res) => {
  const session = await Shopify.Utils.loadCurrentSession(
    req,
    res,
    app.get('use-online-tokens')
  );
  try {
    const tabs = await tabServices.getAllTabs(session?.shop);

    res.status(200).send({
      status: 'success',
      message: `successully fetch items`,
      tabs,
    });
  } catch (error) {
    res.status(500).send('error occured, coud not fetch items');
  }
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
    res.status(500).send('error occured');
  }
};

const getTab = (req, res) => {
  res.status(200).send('done');
};

const editTab = (req, res) => {
  res.status(200).send('done');
};

const deleteTab = async (req, res) => {
  const session = await Shopify.Utils.loadCurrentSession(
    req,
    res,
    app.get('use-online-tokens')
  );
  const id = req.params.id;
  const shop = session?.shop;
  try {
    const response = await tabServices.deleteTab(shop, id);
    res.status(200).send({
      status: 'success',
      message: `deleted successfully`,
    });
  } catch (error) {
    res.status(500).send('error occured, something went wrong');
  }
};

export default {
  getAllTabs,
  createTab,
  getTab,
  editTab,
  deleteTab,
};
