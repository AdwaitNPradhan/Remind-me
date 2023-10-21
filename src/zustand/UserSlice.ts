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
  clearUserState: () => void;
}

const CreateUserStore: StoreSlice<UserSlice> = (set, get) => ({
  user: {
    name: '',
    onBoarded: false,
  },
  onBoardUser: (name: string) => {
    set(() => ({
      user: { name: name, onBoarded: true },
    }));
  },
  removeUser: () => {
    set(() => ({
      user: { name: '', onBoarded: false },
    }));
  },
  clearUserState: () =>
    set(
      {
        user: { name: '', onBoarded: false },
      },
      true,
    ),
});

export default CreateUserStore;
