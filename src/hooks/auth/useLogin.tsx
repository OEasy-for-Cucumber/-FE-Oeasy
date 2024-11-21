import { useMutation} from "@tanstack/react-query";
import instance from "../../api/axios"
import { useUserStore } from "../../zustand/authStore";

const login = async({ email, pw }: { email: string; pw: string }) => {
    const { data } = await instance.post("/login/oeasy", {
        email, pw
    })
    return data;
}

function useLogin() {
    const { setUser, setIsLoggedIn } = useUserStore();
    // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
        setUser(data);
        setIsLoggedIn(true);
        
        // queryClient.invalidateQueries(["userProfile"]);
    },
    onError: (error) => {
        console.error("인증 실패:", error);
    }
  })
}

export default useLogin
