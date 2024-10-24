import api from "@/api/api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/redux/auth/authSlice";
import { LoginFormSchema } from "@/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    try {
      const res = await api.post("/auth/login", values);
      dispatch(login(res.data.userId));
    } catch {
      toast.toast({
        title: "Login Failed",
        description: "Please check your credentials",
        variant: "destructive",
      });
    }
  }
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center pt-20 pb-8  relative overflow-hidden  antialiased px-12 xl:px-0">
      {/* background */}
      <div className="absolute bottom-0  left-0 w-[500px] h-[500px]  bg-[#a7dd32] rounded-full blur-[110px] opacity-30 transform translate-y-1/4 -translate-x-1/3" />
      <div className="absolute top-0  right-0 w-96 h-96 bg-[#6a61ebdd] rounded-full blur-[90px] opacity-30 transform translate-x-28" />

      {/* main */}
      <div className="w-full flex flex-col md:flex-row justify-center gap-36 items-center">
        {/* reft */}
        <div className="relative hidden md:block">
          <div className="h-[760px]  relative rounded-lg shadow-sm ">
            <img src="/pic.svg" alt="Office Space" className="h-full w-full" />
          </div>
        </div>

        {/* right */}
        <div className="w-full max-w-[340px] lg:max-w-md xl:max-w-lg tracking-wide z-50">
          <div className="space-y-2 mb-6 lg:mb-14">
            <h1 className="text-4xl font-semibold text-white">
              Let the journey begin
            </h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-200">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Email Address"
                        {...field}
                        className="bg-zinc-800/50 border-zinc-700 text-white py-7 rounded-sm"
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-zinc-500">
                      This email will be displayed with your inquiry.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-200">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        {...field}
                        className="bg-zinc-800/50 border-zinc-700 text-white py-7 rounded-sm"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 pt-2 text-center">
                <Button
                  type="submit"
                  className="bg-stone-800 hover:text-lime-600 text-lime-500 px-5"
                  size={"lg"}
                >
                  Login now
                </Button>
                <Link
                  className="text-zinc-400 hover:text-zinc-200 hover:underline underline-offset-2"
                  to="/register"
                >
                  New here? Click here to register.
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
