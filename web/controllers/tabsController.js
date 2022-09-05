import { app } from '../index.js';
import { Shopify, LATEST_API_VERSION } from '@shopify/shopify-api';
import MerchantModel from '../models/Merchant.js';

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
    req.body.enable = true;
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

const getTab = async (req, res) => {
  const session = await Shopify.Utils.loadCurrentSession(
    req,
    res,
    app.get('use-online-tokens')
  );
  const id = req.params.id;
  try {
    const merchant = await MerchantModel.findOne({
      shop: session?.shop,
    }).exec();
    const tab = merchant.tabs.find((tab) => String(tab._id) === id);
    res.status(200).json({ status: 'success', tab });
  } catch (error) {
    res
      .status(200)
      .json({ status: 'Fail', message: 'could not find tab', error });
  }
};

const editTab = async (req, res) => {
  const session = await Shopify.Utils.loadCurrentSession(
    req,
    res,
    app.get('use-online-tokens')
  );
  const shop = session?.shop;
  const id = req.params.id;
  const data = req.body;

  try {
    const response = await tabServices.editTab(shop, id, data);
    res.status(200).send({
      status: 'success',
      message: `updated successfully`,
      tab: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('error occured, something went wrong');
  }
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

const changeTabVisibility = async (req, res) => {
  const session = await Shopify.Utils.loadCurrentSession(
    req,
    res,
    app.get('use-online-tokens')
  );
  const shop = session?.shop;
  const id = req.params.id;

  try {
    const response = await tabServices.changeTabVisibility(shop, id);
    res.status(200).send({
      status: 'success',
      message: `updated successfully`,
      tab: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('error occured, something went wrong');
  }
};

export default {
  getAllTabs,
  createTab,
  getTab,
  editTab,
  deleteTab,
  changeTabVisibility,
};
