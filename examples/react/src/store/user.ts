import { Store } from "@yoki/core";

interface UserState {
  profile: {
    id: number | null;
    name: string;
    email: string;
  } | null;
  preferences: {
    theme: "light" | "dark";
    notifications: boolean;
  };
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  preferences: {
    theme: "light",
    notifications: true,
  },
  isAuthenticated: false,
  loading: false,
  error: null,
};

type Action = {
  login: typeof login;
  logout: typeof logout;
  updatePreferences: typeof updatePreferences;
};

// Actions
export const login = async (email: string) => {
  userStore.setState({ loading: true, error: null });
  try {
    // 模拟 API 调用
    const data = {
      profile: {
        id: 1,
        name: "John Doe",
        email,
      },
      isAuthenticated: true,
    };
    userStore.setState({
      profile: data.profile,
      isAuthenticated: true,
      loading: false,
    });
  } catch (error) {
    userStore.setState({
      error: error instanceof Error ? error.message : "Login failed",
      loading: false,
    });
  }
};

export const logout = () => {
  userStore.setState({
    profile: null,
    isAuthenticated: false,
  });
};

export const updatePreferences = (
  preferences: Partial<UserState["preferences"]>
) => {
  () => ({ performance: performance });
};

export const userStore = new Store<UserState & Action>({
  ...initialState,
  login,
  logout,
  updatePreferences,
});
