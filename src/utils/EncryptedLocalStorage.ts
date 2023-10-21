import EncryptedStorage from 'react-native-encrypted-storage';

const setItemInES = async (key: string, data: any) => {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('LS_ACT', e);
  }
};

const getItemInES = async (key: string) => {
  try {
    const jsonValue = await EncryptedStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('LS_ACT', e);
  }
};

const removeItemInES = async (key: string) => {
  try {
    await EncryptedStorage.removeItem(key, () => {});
  } catch (e) {
    console.error('LS_ACT', e);
  }
};
const removeAllItemsInES = async () => {
  try {
    await EncryptedStorage.clear();
  } catch (e) {
    console.error('LS_ACT', e);
  }
};
export { setItemInES, getItemInES, removeItemInES, removeAllItemsInES };
