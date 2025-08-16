import { useGameStore } from "../store/useGameStore";
import { useLogin } from "./mutations/useLogin";
import { useRegister } from "./mutations/useRegister";

export function useAuth() {
  const reset = useGameStore(state => state.reset);
  const user = useGameStore(state => state.user);

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    reset();
  };

  return {
    user,
    login: loginMutation.mutate,
    loginStatus: loginMutation.status,
    loginError: loginMutation.error,
    register: registerMutation.mutate,
    registerStatus: registerMutation.status,
    registerError: registerMutation.error,
    logout,
  };
}