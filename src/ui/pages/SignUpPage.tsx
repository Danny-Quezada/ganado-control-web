import { UserModel } from "../../domain/models/UserModel";
import useUserStore from "../../stores/UserStore";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import ThemeButton from "../components/ThemeButton";
import { motion } from "framer-motion"; // usa framer-motion
import { Link, useNavigate } from "react-router-dom";
const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserModel>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      userId: 0,
      userIdAuth: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (user: UserModel) => signUp(user),
    onSuccess: () => {

      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error creating user");
    },
  });

  const onSubmit = (data: UserModel) => {
    mutation.mutate(new UserModel(0, data.name, data.email, "", data.password));
  };

  return (
    <section className="relative flex flex-col items-center justify-center h-[100dvh] px-4 dark:bg-gray-900 bg-gray-50">
      <ThemeButton />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
      >
        <div className="flex flex-col items-center justify-center mb-6 gap-3">
          <Logo />
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-center text-gray-800 dark:text-white"
          >
            Create an Account
          </motion.h1>
        </div>

        <form className="space-y-10" onSubmit={handleSubmit(onSubmit)} >
          <InputField
            required
            label="Name"
            error={errors.name}
            {...register("name", { required: "Name is required" })}
          />

          <InputField
            type="email"
            required
            label="Email"
            error={errors.email}
            {...register("email", { required: "Email is required" })}
          />

          <InputField
            required
            label="Password"
            type="password"
            error={errors.password}
            {...register("password", { required: "Password is required" })}
          />
<Link
            to="/login"
            className="text-sm text-principal mb-6"
          >
            Already have an account? Login
          </Link>
          <motion.button
            type="submit"
            disabled={mutation.isPending}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full px-4 py-2 mt-8 font-semibold text-white bg-principal rounded-lg hover:bg-green-300 transition-all duration-200 disabled:opacity-50 cursor-pointer"
          >
            {mutation.isPending ? "Creating Account..." : "Sign Up"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default SignUpPage;