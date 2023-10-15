import { getItemInES, setItemInES } from '../utils/EncryptedLocalStorage';
import { StoreSlice } from '.';

interface User {
  name: string;
  onBoarded: boolean;
}
export interface UserSlice {
  user: User;
  onBoardUser: (name: string) => void;
  removeUser: () => void;
}

const CreateUserStore: StoreSlice<UserSlice> = (set, get) => ({
  user: {
    name: '',
    onBoarded: false,
  },
  onBoardUser: (name: string) => {
    console.log('asdafa', name);
    set(() => ({
      user: { name: name, onBoarded: true },
    }));
  },
  removeUser: () => {
    set(() => ({
      user: { name: '', onBoarded: false },
    }));
  },
});

export default CreateUserStore;
