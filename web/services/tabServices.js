import MerchantModel from '../models/Merchant.js';
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

export default {
  createTab,
};
