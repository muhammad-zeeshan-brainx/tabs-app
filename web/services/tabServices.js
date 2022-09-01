import MerchantModel from '../models/Merchant.js';

const getAllTabs = async (shop) => {
  return new Promise((resolve, reject) => {
    MerchantModel.findOne({ shop: shop })
      .then((merchant) => {
        if (merchant) {
          resolve(merchant.tabs);
        } else {
          throw new Error(`no tabs for shop ${shop}`);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const createTab = async (shop, tabData) => {
  return new Promise((resolve, reject) => {
    MerchantModel.findOne({
      shop: shop,
    }).then((merchant) => {
      if (merchant?.tabs.push(tabData)) {
        merchant.save().then((tab) => {
          resolve(tab);
        });
      } else {
        const merchant = new MerchantModel();
        merchant.shop = shop;
        merchant.tabs.push(tabData);

        merchant
          .save()
          .then((tab) => {
            resolve(tab);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  });
};

const deleteTab = async (shop, id) => {
  return new Promise((resolve, reject) => {
    MerchantModel.findOne({ shop: shop })
      .then((merchant) => {
        const tabIndex = merchant.tabs.findIndex(
          (tab) => String(tab._id) === id
        );
        merchant.tabs.splice(tabIndex, 1);
        merchant
          .save()
          .then((response) => resolve(response))
          .catch((error) => reject(error, 'could not save tab to db'));
      })
      .catch((error) => {
        reject(error, 'could not find merchant');
      });
  });
};

export default {
  getAllTabs,
  createTab,
  deleteTab,
};
